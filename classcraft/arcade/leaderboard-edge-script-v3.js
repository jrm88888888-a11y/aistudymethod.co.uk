/* ============================================================================
   AISM ARCADE LEADERBOARD v3 — Bunny Edge Script (standalone)
   ----------------------------------------------------------------------------
   Successor to leaderboard-edge-script-v2.js (which is untouched and is the
   rollback). Paste this whole file into: dash.bunny.net → Edge Platform →
   Scripting → the existing "aism-leaderboard" script (replace contents).
   Database secrets (DB_URL / DB_TOKEN) and LB_SECRET are injected exactly as
   for v2 — no new environment variables.

   NEW in v3 (see classcraft/arcade/DEPLOY-leaderboard-v2.md, "v3 — crew
   codes" section, for rollout):
     • CREW CODES — /submit accepts an optional `crew`: exactly 4 chars A-Z0-9
       after uppercasing, profanity-screened with the same list as initials
       (any 3-letter window). Invalid crews are treated as ABSENT, never an
       error. Stored on the score row in a new `crew TEXT` column, added via
       a lazy, idempotent ALTER TABLE (same bootstrap pattern as submits_log;
       "duplicate column" errors are tolerated).
     • /top and /champion accept optional `crew=XXXX` — the board AND the
       requester's rank are computed over rows with that crew only. An
       invalid crew param falls back to the global board (never an error).
     • RANK-AROUND — /top (and /submit) responses gain an `around` array: up
       to 2 entries directly above and 1 directly below the requesting
       device, plus the device itself ({rank, initials, score, you}),
       computed with the same filters (crew-aware on /top). Responses are
       backward-compatible: fields are only ADDED, nothing is renamed or
       removed. `rank` values in `around`/`you` are competition ranks
       (count-of-strictly-better + 1), matching v2's `you.rank` semantics;
       board rows keep v2's positional ranks.

   Everything else (HMAC play tokens, shadow rejection, daily caps, champion
   coverage rule, week=all fixes) is carried over from v2 unchanged.

   Endpoints (all JSON):
     GET  /token?game=wager&device=<id>  → { tok, ts }
     GET  /top?game=wager&week=current|2026-W25|all&n=10&device=<id>&crew=9BIO
            → { week, board:[{initials,score,topic,you}], you:{rank,score},
                around:[{rank,initials,score,you}]|null, crew:"9BIO"|null }
     GET  /champion?week=current&device=<id>&crew=9BIO
            → { week, board:[{initials,points,games,you}], crew }  (F1, best 5)
     GET  /weeks?game=wager → { weeks:[...] }   (for archive browsing)
     POST /submit  body: {game, score, initials, topic, stem, device, tok, ts,
                          crew(optional)}
            → { ok, rank, best, board:[...], around:[...]|null }
   ========================================================================== */
import * as BunnySDK from "https://esm.sh/@bunny.net/edgescript-sdk@0.11.2";
import { createClient } from "https://esm.sh/@libsql/client@0.14.0/web";

const env = (k) =>
  (typeof process !== "undefined" && process.env && process.env[k]) ||
  (typeof Deno !== "undefined" && Deno.env && Deno.env.get(k)) || "";

const db = createClient({
  url: env("BUNNY_DATABASE_URL") || env("DB_URL"),
  authToken: env("BUNNY_DATABASE_AUTH_TOKEN") || env("DB_TOKEN"),
});

/* HMAC secret for play tokens.
   TODO(Billy): set LB_SECRET as an environment variable on this Edge Script
   (dash.bunny.net → the script → Environment Variables → add LB_SECRET with a
   long random value, e.g. output of `openssl rand -hex 32`), then DELETE the
   fallback below. The fallback only exists so the script doesn't 500 before
   the variable is configured — it provides NO security once this file is
   public in the repo. */
const LB_SECRET_FALLBACK = "TODO-set-LB_SECRET-env-var-before-going-live";
const LB_SECRET = env("LB_SECRET") || LB_SECRET_FALLBACK;

/* ── request-facing config ───────────────────────────────────────────────── */
const ALLOWED_ORIGINS = [
  "https://aistudymethod.co.uk",
  "https://www.aistudymethod.co.uk",
  "http://localhost:8765",
  "http://127.0.0.1:8765",
];
const MAX_N = 50;
const RATE_LIMIT = 8;            // submissions per IP per minute (first line only)
const TOKEN_RATE_LIMIT = 60;     // token fetches per IP per minute (1 per page load)
const rate = new Map();          // ip → {count, resetAt}  (per-isolate, best effort)
const tokenRate = new Map();

/* ============================================================================
   PURE LOGIC — everything between __PURE_START__ and __PURE_END__ has no
   Bunny / DB / Request dependencies. test/t-leaderboard-v3.mjs slices this
   region out of the file verbatim and runs it under node, so keep it
   dependency-free (crypto.subtle + TextEncoder are available in both runtimes).
   ========================================================================== */
// __PURE_START__

// game id → maximum believable score (anything above is rejected). Same as v1.
const GAME_CAPS = {
  "two-truths": 2000, "connections": 3000, "sequence": 1000, "wager": 200000,
  "higher-lower": 50000, "falling-words": 50000, "conveyor": 20000,
  "word-web": 5000, "reveal-race": 5000, "daily-drill": 1000,
  "quiz": 50000, "pairs": 50000, "hangman": 50000, "termguess": 50000,
  "anagram": 50000, "crossword": 50000, "pacman": 200000, "spaceinvaders": 200000,
  // odd-one: 10 rounds x (100 + 50 speed) x 2 streak multiplier = 3000 ceiling
  // (true max ~2475 — the multiplier only ramps to 2x from round 8).
  "odd-one": 3000,
  // boss-rush: stage1 5x100 + stage2 4x200 + boss (3 + misses<=2) hits x
  // (300 + 200 speed bonus) + 500 flawless bonus => hard max 3600. 4000 headroom.
  "boss-rush": 4000,
  // ghost-race: 10 rounds x (100 + 50 speed) = 1500 max. 2000 headroom.
  "ghost-race": 2000,
};

/* Score plausibility: max points per SECOND of play, per game.
   Derivation: RATE_CAPS[g] = ceil(GAME_CAPS[g] / 60) — i.e. we assume even a
   perfect player needs at least ~60 seconds of play to reach the maximum
   believable score for that game. This is deliberately loose (a real perfect
   run takes several minutes in every game), because the goal is to block
   absurd console submissions ("score 200000 after 20s"), not to calibrate
   skill ceilings. Combined with MIN_ELAPSED (20s), the largest score a
   freshly-minted token can post is GAME_CAPS/3. Tune per game if a legit
   pattern ever trips it. */
const RATE_CAPS = {
  "two-truths": 34,      // 2000/60
  "connections": 50,     // 3000/60
  "sequence": 17,        // 1000/60
  "wager": 3334,         // 200000/60
  "higher-lower": 834,   // 50000/60
  "falling-words": 834,  // 50000/60
  "conveyor": 334,       // 20000/60
  "word-web": 84,        // 5000/60
  "reveal-race": 84,     // 5000/60
  "daily-drill": 17,     // 1000/60
  "quiz": 834,           // 50000/60
  "pairs": 834,          // 50000/60
  "hangman": 834,        // 50000/60
  "termguess": 834,      // 50000/60
  "anagram": 834,        // 50000/60
  "crossword": 834,      // 50000/60
  "pacman": 3334,        // 200000/60
  "spaceinvaders": 3334, // 200000/60
  "odd-one": 50,         // 3000/60
  "boss-rush": 67,       // 4000/60
  "ghost-race": 34,      // 2000/60
};

/* Minimum believable play time per game, ms. The token is issued when the game
   page LOADS, so elapsed = load → submit; 20s is comfortably under any real
   completed run. Add per-game overrides here if a game ever legitimately
   finishes faster. */
const MIN_ELAPSED_DEFAULT_MS = 20000;
const MIN_ELAPSED_MS = {};        // e.g. { "daily-drill": 15000 }
const MAX_ELAPSED_MS = 2 * 60 * 60 * 1000;  // token expires after 2h

/* Persistent anti-Sybil cap: accepted submissions per device per UTC day.
   Enforced in the database (submits_log), so it survives isolate recycling
   and is shared across edge nodes — unlike the in-memory `rate` map. */
const DAILY_CAP = 40;

/* Champion coverage rule — set to false to switch back to plain best-5.
   With it on: a device's best-5 games all count only if those games span at
   least 3 distinct stems (topics). A device grinding one topic across many
   game types gets at most 2 counted entries per stem (still up to 5 total),
   so farming the F1 board requires actually revising more than one topic. */
const REQUIRE_TOPIC_SPREAD = true;

// crude/slur 3-letter combos that can't go on a public board for teenagers
const BAD_INITIALS = new Set([
  "ASS","SEX","FUK","FUC","FCK","FKU","CUM","JIZ","TIT","DIK","DIC","COK",
  "COC","FAG","NIG","NGR","KKK","NAZ","POO","PEE","VAG","PUS","WTF","STD",
  "GOD","JEW","RAP","KYS","KMS","DIE","HOR","SLU","HOE","PIS","CNT","TWA",
]);

// ISO week key, UTC, Monday-start — e.g. "2026-W25"
function weekKey(date) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay() || 7;                  // Mon=1 … Sun=7
  d.setUTCDate(d.getUTCDate() + 4 - day);          // nearest Thursday
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return d.getUTCFullYear() + "-W" + String(week).padStart(2, "0");
}
const currentWeek = () => weekKey(new Date());

function resolveWeek(raw) {
  if (!raw || raw === "current") return currentWeek();
  if (raw === "all") return "all";
  return /^\d{4}-W\d{2}$/.test(raw) ? raw : null;
}
function cleanInitials(s) {
  const v = String(s || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 3);
  if (v.length !== 3) return null;
  if (BAD_INITIALS.has(v)) return null;
  return v;
}
/* NEW in v3: crew code — exactly 4 chars A-Z0-9 after uppercasing and
   stripping. Anything else (wrong length, or containing a banned 3-letter
   combo in any window) is treated as ABSENT (null), never an error, so a
   typo'd class code degrades to a normal global submission. */
function cleanCrew(s) {
  const v = String(s || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (v.length !== 4) return null;
  for (let i = 0; i + 3 <= v.length; i++) {
    if (BAD_INITIALS.has(v.slice(i, i + 3))) return null;
  }
  return v;
}
const DEVICE_RE = /^[a-f0-9-]{16,64}$/i;

/* ── play tokens (Web Crypto, no dependencies) ───────────────────────────── */
async function makeToken(secret, game, device, ts) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(game + "|" + device + "|" + ts));
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, "0")).join("");
}
async function verifyToken(secret, game, device, ts, tok) {
  if (!/^[0-9a-f]{64}$/.test(String(tok || ""))) return false;
  const expect = await makeToken(secret, game, device, ts);
  let diff = 0;                                     // constant-time-ish compare
  for (let i = 0; i < expect.length; i++) diff |= expect.charCodeAt(i) ^ tok.charCodeAt(i);
  return diff === 0;
}

/* Elapsed-time + score-rate plausibility for a token-carrying submission.
   Returns { ok, reason } — reason is for logs/tests only, never sent to the
   client (failed checks are shadow-rejected). */
function checkPlay({ game, score, ts, now }) {
  if (!isFinite(ts) || ts <= 0) return { ok: false, reason: "bad-ts" };
  const elapsed = now - ts;
  const minMs = MIN_ELAPSED_MS[game] || MIN_ELAPSED_DEFAULT_MS;
  if (elapsed < minMs) return { ok: false, reason: "too-fast" };
  if (elapsed > MAX_ELAPSED_MS) return { ok: false, reason: "token-expired" };
  const maxScore = (RATE_CAPS[game] || 1) * (elapsed / 1000);
  if (score > maxScore) return { ok: false, reason: "implausible-score" };
  return { ok: true };
}

/* ── top board + rank-around (pure) — NEW in v3 ──────────────────────────────
   rows: ordered SELECT (score DESC) of {device_id, initials, score, topic},
   one row per device (the week board is unique per device via the table's
   UNIQUE constraint; the all-time board is deduplicated in SQL). Returns:
     board  — top n, positional ranks (i+1), exactly the v2 shape.
     you    — {rank, score} for `device`, competition rank
              (count of strictly better + 1), exactly v2's semantics.
     around — up to 2 rows directly above + the device itself + 1 directly
              below, each {rank, initials, score, you}, competition ranks.
              null when the device has no row (e.g. shadow-rejected only). */
function buildTop(rows, n, device) {
  const ranked = [];
  let lastScore = null, lastRank = 0;
  for (let i = 0; i < rows.length; i++) {
    const sc = Number(rows[i].score);
    if (sc !== lastScore) { lastRank = i + 1; lastScore = sc; }
    ranked.push({
      device_id: rows[i].device_id, initials: rows[i].initials,
      score: sc, topic: rows[i].topic || "", rank: lastRank,
    });
  }
  const board = ranked.slice(0, n).map((r, i) => ({
    rank: i + 1,                                    // positional, as in v2
    initials: r.initials,
    score: r.score,
    topic: r.topic,
    you: !!device && r.device_id === device,
  }));
  let you = null, around = null;
  if (device) {
    const idx = ranked.findIndex(r => r.device_id === device);
    if (idx >= 0) {
      you = { rank: ranked[idx].rank, score: ranked[idx].score };
      around = [];
      const from = Math.max(0, idx - 2);
      const to = Math.min(ranked.length - 1, idx + 1);
      for (let i = from; i <= to; i++) {
        around.push({
          rank: ranked[i].rank, initials: ranked[i].initials,
          score: ranked[i].score, you: i === idx,
        });
      }
    }
  }
  return { board, you, around };
}

/* ── champion aggregation (pure) ─────────────────────────────────────────────
   rows: SELECT of one week's scores, ordered by game then score DESC, with
   fields {game, device_id, initials, score, stem}. F1 points per in-game rank,
   best 5 games count (subject to the coverage rule above). */
const F1 = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
function aggregateChampion(rows, device, requireSpread) {
  const perDevice = new Map();
  let game = null, rank = 0;
  for (const r of rows) {
    if (r.game !== game) { game = r.game; rank = 0; }
    rank++;
    if (rank > 10) continue;
    const pts = F1[rank - 1];
    const d = perDevice.get(r.device_id) ||
      { initials: r.initials, bestScore: -Infinity, entries: [] };
    /* Bug fix (v1 #5): initials come from the device's HIGHEST-SCORING row
       this week, not from whichever row the loop happens to visit last. */
    const sc = Number(r.score);
    if (sc > d.bestScore) { d.bestScore = sc; d.initials = r.initials; }
    d.entries.push({ pts, stem: String(r.stem || "") });
    perDevice.set(r.device_id, d);
  }
  const board = [...perDevice.entries()].map(([id, d]) => {
    const entries = d.entries.slice().sort((a, b) => b.pts - a.pts);
    let counted;
    const distinctStems = new Set(entries.map(e => e.stem)).size;
    if (!requireSpread || distinctStems >= 3) {
      counted = entries.slice(0, 5);                // plain best-5
    } else {
      /* COVERAGE RULE: fewer than 3 distinct stems → at most 2 entries per
         stem count towards the total (still capped at 5). Flip
         REQUIRE_TOPIC_SPREAD to false to disable. */
      counted = [];
      const perStem = new Map();
      for (const e of entries) {
        const c = perStem.get(e.stem) || 0;
        if (c >= 2) continue;
        perStem.set(e.stem, c + 1);
        counted.push(e);
        if (counted.length >= 5) break;
      }
    }
    return {
      device: id, initials: d.initials,
      points: counted.reduce((a, b) => a + b.pts, 0),
      games: d.entries.length,
    };
  }).sort((a, b) => b.points - a.points).slice(0, 25)
    .map((e, i) => ({ rank: i + 1, initials: e.initials, points: e.points, games: e.games, you: !!device && e.device === device }));
  return board;
}

/* ── SQL (all libSQL/SQLite-compatible) ──────────────────────────────────── */
/* v3: board queries no longer take LIMIT — up to TOP_FETCH_MAX ordered rows
   are fetched and board/you/around are all computed from that single result
   in buildTop (one query instead of v2's up to three). The _CREW variants
   filter to one crew; `crew` on `scores` is added lazily (see SQL_ADD_CREW).
   Bug fix carried from v2 (#4): the all-time board uses a window function to
   return the whole row that holds each device's max score. */
const TOP_FETCH_MAX = 1000;
const SQL_TOP_ALL = `
  SELECT device_id, initials, score, topic FROM (
    SELECT device_id, initials, score, topic,
           ROW_NUMBER() OVER (PARTITION BY device_id ORDER BY score DESC, week DESC) AS rn
    FROM scores WHERE game = ?
  ) WHERE rn = 1 ORDER BY score DESC LIMIT ${TOP_FETCH_MAX}`;
const SQL_TOP_ALL_CREW = `
  SELECT device_id, initials, score, topic FROM (
    SELECT device_id, initials, score, topic,
           ROW_NUMBER() OVER (PARTITION BY device_id ORDER BY score DESC, week DESC) AS rn
    FROM scores WHERE game = ? AND crew = ?
  ) WHERE rn = 1 ORDER BY score DESC LIMIT ${TOP_FETCH_MAX}`;
const SQL_TOP_WEEK = `
  SELECT device_id, initials, score, topic FROM scores
  WHERE game = ? AND week = ? ORDER BY score DESC LIMIT ${TOP_FETCH_MAX}`;
const SQL_TOP_WEEK_CREW = `
  SELECT device_id, initials, score, topic FROM scores
  WHERE game = ? AND week = ? AND crew = ? ORDER BY score DESC LIMIT ${TOP_FETCH_MAX}`;
const SQL_CHAMPION_WEEK = `
  SELECT game, device_id, initials, score, stem FROM scores
  WHERE week = ? ORDER BY game, score DESC`;
const SQL_CHAMPION_WEEK_CREW = `
  SELECT game, device_id, initials, score, stem FROM scores
  WHERE week = ? AND crew = ? ORDER BY game, score DESC`;
/* v3: the upsert now writes `crew` (may be null). On conflict the crew moves
   with the submission whenever one was provided (a student who joins or
   corrects their class mid-week gets re-filed), and is kept otherwise. */
const SQL_UPSERT = `
  INSERT INTO scores (game, week, device_id, initials, score, topic, stem, crew)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(game, week, device_id) DO UPDATE SET
    plays = plays + 1,
    initials = excluded.initials,
    crew = CASE WHEN excluded.crew IS NOT NULL THEN excluded.crew ELSE scores.crew END,
    updated_at = strftime('%Y-%m-%dT%H:%M:%SZ','now'),
    score = CASE WHEN excluded.score > scores.score THEN excluded.score ELSE scores.score END,
    topic = CASE WHEN excluded.score > scores.score THEN excluded.topic ELSE scores.topic END,
    stem  = CASE WHEN excluded.score > scores.score THEN excluded.stem  ELSE scores.stem  END`;
/* v1 has no schema bootstrap (the scores table was created in the Bunny
   Database dashboard), so submits_log is bootstrapped lazily here instead —
   and v3 adds the `crew` column to `scores` the same lazy way. libSQL/SQLite
   has no ADD COLUMN IF NOT EXISTS, so the ALTER below is expected to fail
   with a "duplicate column" error on every run after the first; ensureSchema
   tolerates exactly that error. */
const SQL_LOG_TABLE = `
  CREATE TABLE IF NOT EXISTS submits_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    device_id TEXT NOT NULL,
    day TEXT NOT NULL,
    game TEXT NOT NULL,
    score INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
  )`;
const SQL_LOG_INDEX = `
  CREATE INDEX IF NOT EXISTS idx_submits_log_device_day ON submits_log (device_id, day)`;
const SQL_LOG_COUNT = `SELECT COUNT(*) AS c FROM submits_log WHERE device_id = ? AND day = ?`;
const SQL_LOG_INSERT = `INSERT INTO submits_log (device_id, day, game, score) VALUES (?, ?, ?, ?)`;
const SQL_ADD_CREW = `ALTER TABLE scores ADD COLUMN crew TEXT`;
const isDuplicateColumnError = (e) =>
  /duplicate column/i.test(String(e && e.message || e));

const utcDay = (d) => (d || new Date()).toISOString().slice(0, 10);

// __PURE_END__

/* ── request helpers ─────────────────────────────────────────────────────── */
function corsHeaders(req) {
  const origin = req.headers.get("origin") || "";
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "access-control-allow-origin": allow,
    "access-control-allow-methods": "GET, POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  };
}
const json = (req, status, obj) =>
  new Response(JSON.stringify(obj), { status, headers: corsHeaders(req) });

function limited(req, map, max) {
  const ip = req.headers.get("cf-connecting-ip") ||
             req.headers.get("x-forwarded-for") || "unknown";
  const now = Date.now();
  const r = map.get(ip);
  if (!r || now > r.resetAt) { map.set(ip, { count: 1, resetAt: now + 60000 }); return false; }
  r.count++;
  if (map.size > 5000) map.clear();                // bounded memory
  return r.count > max;
}

let schemaReady = false;
async function ensureSchema() {
  if (schemaReady) return;
  await db.execute({ sql: SQL_LOG_TABLE, args: [] });
  await db.execute({ sql: SQL_LOG_INDEX, args: [] });
  /* Lazy, idempotent column add (once per isolate). SQLite has no
     ADD COLUMN IF NOT EXISTS: the second and every later bootstrap throws
     "duplicate column name: crew", which is the expected steady state and is
     swallowed here. Any OTHER error is rethrown (the caller's fallback keeps
     the request alive on the global, crew-less path). */
  try {
    await db.execute({ sql: SQL_ADD_CREW, args: [] });
  } catch (e) {
    if (!isDuplicateColumnError(e)) throw e;
  }
  schemaReady = true;
}

/* Crew-filtered reads need the crew column to exist even before the first v3
   submit has run the bootstrap. If the schema cannot be ensured, degrade to
   the global (crew-less) board rather than erroring. */
async function crewIfReady(crew) {
  if (!crew) return null;
  try { await ensureSchema(); return crew; } catch (e) { return null; }
}

/* ── board queries ───────────────────────────────────────────────────────── */
async function topBoard(game, week, n, device, crew) {
  const isAll = week === "all";
  const sql = isAll ? (crew ? SQL_TOP_ALL_CREW : SQL_TOP_ALL)
                    : (crew ? SQL_TOP_WEEK_CREW : SQL_TOP_WEEK);
  const args = isAll ? (crew ? [game, crew] : [game])
                     : (crew ? [game, week, crew] : [game, week]);
  const rows = (await db.execute({ sql, args })).rows;
  return buildTop(rows, n, device);
}

async function championBoard(week, device, crew) {
  const sql = crew ? SQL_CHAMPION_WEEK_CREW : SQL_CHAMPION_WEEK;
  const args = crew ? [week, crew] : [week];
  const rows = (await db.execute({ sql, args })).rows;
  return aggregateChampion(rows, device, REQUIRE_TOPIC_SPREAD);
}

/* ── handler ─────────────────────────────────────────────────────────────── */
async function handle(req) {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(req) });
  const url = new URL(req.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";

  try {
    if (req.method === "GET" && path === "/token") {
      if (limited(req, tokenRate, TOKEN_RATE_LIMIT)) return json(req, 429, { error: "slow down" });
      const game = url.searchParams.get("game") || "";
      if (!(game in GAME_CAPS)) return json(req, 400, { error: "unknown game" });
      const device = url.searchParams.get("device") || "";
      if (!DEVICE_RE.test(device)) return json(req, 400, { error: "bad device id" });
      const ts = Date.now();
      const tok = await makeToken(LB_SECRET, game, device, ts);
      return json(req, 200, { tok, ts });
    }

    if (req.method === "GET" && path === "/top") {
      const game = url.searchParams.get("game") || "";
      if (!(game in GAME_CAPS)) return json(req, 400, { error: "unknown game" });
      const week = resolveWeek(url.searchParams.get("week"));
      if (!week) return json(req, 400, { error: "bad week" });
      const n = Math.min(MAX_N, Math.max(1, parseInt(url.searchParams.get("n") || "10", 10)));
      const device = url.searchParams.get("device") || "";
      // Invalid crew → treated as absent (global board), never an error.
      const crew = await crewIfReady(cleanCrew(url.searchParams.get("crew")));
      const { board, you, around } = await topBoard(game, week, n, device, crew);
      return json(req, 200, { game, week, board, you, around, crew });
    }

    if (req.method === "GET" && path === "/champion") {
      const week = resolveWeek(url.searchParams.get("week"));
      if (!week || week === "all") return json(req, 400, { error: "bad week" });
      const device = url.searchParams.get("device") || "";
      const crew = await crewIfReady(cleanCrew(url.searchParams.get("crew")));
      return json(req, 200, { week, board: await championBoard(week, device, crew), crew });
    }

    if (req.method === "GET" && path === "/weeks") {
      const game = url.searchParams.get("game") || "";
      if (!(game in GAME_CAPS)) return json(req, 400, { error: "unknown game" });
      const rows = (await db.execute({
        sql: `SELECT DISTINCT week FROM scores WHERE game = ? ORDER BY week DESC LIMIT 26`,
        args: [game],
      })).rows;
      return json(req, 200, { weeks: rows.map(r => r.week) });
    }

    if (req.method === "POST" && path === "/submit") {
      // First line: cheap in-memory per-IP limiter (per-isolate, best effort).
      if (limited(req, rate, RATE_LIMIT)) return json(req, 429, { error: "Easy, champion — try again in a minute." });
      let body;
      try { body = await req.json(); } catch (e) { return json(req, 400, { error: "bad json" }); }

      /* Loud validation (same as v1) — these are honest user errors, so the
         client is told what went wrong. */
      const game = String(body.game || "");
      if (!(game in GAME_CAPS)) return json(req, 400, { error: "unknown game" });
      const score = Math.floor(Number(body.score));
      if (!isFinite(score) || score < 0 || score > GAME_CAPS[game]) {
        return json(req, 400, { error: "score out of range" });
      }
      const initials = cleanInitials(body.initials);
      if (!initials) return json(req, 400, { error: "Pick three letters (those ones are not allowed)." });
      const device = String(body.device || "");
      if (!DEVICE_RE.test(device)) return json(req, 400, { error: "bad device id" });
      const topic = String(body.topic || "").slice(0, 80);
      const stem = String(body.stem || "").slice(0, 160);
      /* v3: optional crew — invalid (wrong length / profane) is simply absent,
         so a bad crew NEVER blocks a legitimate score submission. */
      const crew = cleanCrew(body.crew);
      const week = currentWeek();

      /* Anti-cheat gate — SILENT. A submission that fails any of these is
         "shadow-rejected": nothing is written, but the response is shaped
         exactly like a success (board + plausible rank), so a cheater gets no
         feedback about which check tripped, and old cached clients (no token)
         never see a broken end card. */
      let accept = false;
      const ts = Number(body.ts);
      if (body.tok && isFinite(ts) &&
          await verifyToken(LB_SECRET, game, device, ts, String(body.tok))) {
        accept = checkPlay({ game, score, ts, now: Date.now() }).ok;
      }

      if (accept) {
        await ensureSchema();
        // Persistent daily cap: shared across nodes, survives isolate recycling.
        const day = utcDay();
        const c = await db.execute({ sql: SQL_LOG_COUNT, args: [device, day] });
        if (Number(c.rows[0].c) >= DAILY_CAP) {
          accept = false;                            // shadow-reject the overflow
        } else {
          await db.execute({ sql: SQL_UPSERT, args: [game, week, device, initials, score, topic, stem, crew] });
          await db.execute({ sql: SQL_LOG_INSERT, args: [device, day, game, score] });
        }
      }

      /* The submit response stays GLOBAL (board/rank/around over everyone),
         exactly like v2 plus the added `around` — the client refetches
         /top?crew=… itself when it wants the class view. */
      const { board, you, around } = await topBoard(game, week, 10, device);
      let rankOut = you ? you.rank : null;
      if (rankOut == null) {
        // Shadow path with no existing row: report the rank this score WOULD
        // have, so the UI stays sensible ("RANK #7") without recording anything.
        const better = await db.execute({
          sql: `SELECT COUNT(*) AS c FROM scores WHERE game = ? AND week = ? AND score > ?`,
          args: [game, week, score],
        });
        rankOut = Number(better.rows[0].c) + 1;
      }
      return json(req, 200, { ok: true, week, rank: rankOut, best: you ? you.score : score, board, around });
    }

    return json(req, 404, { error: "not found" });
  } catch (e) {
    return json(req, 500, { error: "server error", detail: String(e && e.message || e).slice(0, 200) });
  }
}

BunnySDK.net.http.serve(handle);
