# Deploying leaderboard v2 (anti-cheat hardening)

Files involved:
- `classcraft/arcade/leaderboard-edge-script-v2.js` — new worker (v1 in
  `leaderboard-edge-script.js` is untouched and is the rollback).
- `classcraft/quizzes/arcade.js` — client now prefetches a play token at page
  load and includes `{tok, ts}` in the `/submit` body when it has one.

## What changed (one paragraph)

`/submit` now only *records* a score when the body carries a valid play token
(`tok` = HMAC-SHA256 of `game|device|ts` under `LB_SECRET`, issued by the new
`GET /token` endpoint at page load), the elapsed time since issue is 20s–2h,
and the score fits a per-game points-per-second cap. Failing submissions are
**shadow-rejected**: the response looks like a success (board + plausible
rank) but nothing is written — so cheaters get no feedback and old clients
never see a broken end card. A persistent per-device cap of 40 accepted
submissions per UTC day is enforced via a new `submits_log` table (created
automatically by the worker on first submit). The `week=all` topic bug and the
champion-initials bug are fixed, and the F1 champion board now requires topic
spread (≥3 distinct stems, else max 2 counted games per stem — flip
`REQUIRE_TOPIC_SPREAD` in the script to disable).

## Deploy order — push the SITE first, then the worker

Reasoned against the actual implementation:

| Combination | Behaviour |
|---|---|
| new client + old (v1) worker | `GET /token` returns 404 → client swallows it and submits without a token, exactly as today. v1 accepts. **No loss, nothing breaks.** |
| old client + new (v2) worker | Old client sends no token → v2 shadow-rejects: end card still shows a board and a rank, **but the score is silently not recorded**. |

Nothing *crashes* in either order (the shadow-reject response is
success-shaped by design), but "worker first" silently drops every legitimate
score from clients still running the cached old `arcade.js` — and game pages
load `arcade.js` with **no cache-busting query string**, so stale copies can
live in browser caches for a while. Therefore:

1. **Push the site** (updated `classcraft/quizzes/arcade.js`). Against the v1
   worker this is a no-op behaviour-wise.
2. **Purge `classcraft/quizzes/arcade.js` from the Bunny CDN cache** so new
   page loads pick up the token-aware client immediately.
3. **Wait for client uptake** — ideally a day or two; a quiet evening is the
   pragmatic minimum. (Any browser that still has the old file cached after
   the worker flips will get shadow-rejected — cosmetically invisible, but
   their scores won't count until their cache refreshes.)
4. **Set the secret, then deploy the worker** (steps below).

## Worker deployment steps (Bunny Edge)

1. dash.bunny.net → Edge Platform → Scripting → open the existing
   **aism-leaderboard** script.
2. **Environment variables** → add:
   - `LB_SECRET` = a long random value, e.g. locally run
     `openssl rand -hex 32` and paste the output. *Do this BEFORE deploying
     the v2 code* — if `LB_SECRET` is unset, v2 falls back to a placeholder
     constant that is public in this repo (see the `TODO(Billy)` in the
     script), which means tokens provide no protection until the var is set.
   - `DB_URL` / `DB_TOKEN` should already be attached from v1 (Database →
     aism-arcade → Access → "Add Secrets to an Edge Script"). Verify they are.
3. Replace the script contents with the whole of
   `classcraft/arcade/leaderboard-edge-script-v2.js`. Deploy/publish.
4. The `submits_log` table is created automatically on the first accepted
   submission (`CREATE TABLE IF NOT EXISTS` + index). The existing `scores`
   table is untouched and must already exist (it does — v1 has been writing
   to it). For reference, the columns v2 relies on:
   `game, week, device_id, initials, score, topic, stem, plays, updated_at`,
   with a UNIQUE constraint on `(game, week, device_id)`.

## Smoke tests (curl)

Replace `$LB` with the deployed base URL, e.g.
`LB=https://aism-leaderboard-2dc3b.bunny.run`, and use any UUID-ish device id.

```sh
DEV=123e4567-e89b-42d3-a456-426614174000

# 1. token issuance — expect {"tok":"<64 hex>","ts":<ms>}
curl -s "$LB/token?game=wager&device=$DEV"

# 2. token for an unknown game — expect 400 {"error":"unknown game"}
curl -s "$LB/token?game=nope&device=$DEV"

# 3. boards — expect {"game":...,"week":"20XX-WXX","board":[...],"you":...}
curl -s "$LB/top?game=wager&week=current&n=10&device=$DEV"
curl -s "$LB/top?game=wager&week=all&n=10"      # topics must match best runs
curl -s "$LB/champion?week=current&device=$DEV"
curl -s "$LB/weeks?game=wager"

# 4. tokenless submit (simulates an old client / console cheater) — expect
#    HTTP 200 with ok:true and a board, but the score must NOT appear on
#    /top afterwards. THIS IS THE KEY CHECK that the anti-cheat gate is live.
curl -s -X POST "$LB/submit" -H 'content-type: application/json' \
  -d '{"game":"wager","score":199999,"initials":"ZZZ","device":"'$DEV'"}'
curl -s "$LB/top?game=wager&week=current" | grep -c ZZZ   # expect 0

# 5. real accepted submit: take tok+ts from step 1, wait ≥20 seconds, then
#    (score 500 is plausible for wager at any elapsed ≥ 20s)
curl -s -X POST "$LB/submit" -H 'content-type: application/json' \
  -d '{"game":"wager","score":500,"initials":"JRM","device":"'$DEV'","tok":"<tok>","ts":<ts>}'
curl -s "$LB/top?game=wager&week=current" | grep -c JRM   # expect 1

# 6. loud validation unchanged — expect 400
curl -s -X POST "$LB/submit" -H 'content-type: application/json' \
  -d '{"game":"wager","score":500,"initials":"FUK","device":"'$DEV'"}'
```

Then play one real game to the end card in a browser and submit initials:
the network tab should show `GET /token` at page load and the POST body
containing `tok`/`ts`; the rank banner should render as before.

## Rollback

Paste the contents of `classcraft/arcade/leaderboard-edge-script.js` (v1) back
into the Edge Script and deploy. The updated client is fully compatible with
v1 (`/token` 404s are swallowed; v1 ignores the extra `tok`/`ts` body fields),
so the site does NOT need to be rolled back. The `submits_log` table can be
left in place — v1 never touches it. Clean up the test rows from the smoke
test if you ran step 5 against production
(`DELETE FROM scores WHERE initials='JRM' AND device_id='123e4567-…'`).

## Honest limits (what v2 does and doesn't stop)

Stops: one-line console `fetch()` top scores; scores that outrun the per-game
points-per-second cap; instant submits; token reuse across games/devices;
unlimited per-device submission volume (40/day, DB-enforced across nodes);
single-topic F1 championship farming (coverage rule).

Doesn't stop: a patient cheater who fetches a token, waits ~a minute, and
submits a plausible-but-fake score; Sybil devices created slowly (each new
UUID still gets 40 accepted submissions/day — but topping the champion board
now needs 3+ stems × several games per fake device, which is real effort);
replaying one valid token for multiple ever-better submissions within its 2h
window (bounded by the daily cap and rate caps). Fixing those would need
server-issued device identity or signed gameplay traces — out of scope here.
