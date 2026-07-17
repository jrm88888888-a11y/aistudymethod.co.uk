/* ============================================================================
   AISM ARCADE LEADERBOARD v2 — Bunny Edge Script (standalone)
   ----------------------------------------------------------------------------
   Hardened successor to leaderboard-edge-script.js. Paste this whole file into:
   dash.bunny.net → Edge Platform → Scripting → the existing "aism-leaderboard"
   script (replace contents). Database secrets (DB_URL / DB_TOKEN) are injected
   the same way as v1: Database → aism-arcade → Access → Generate Tokens →
   "Add Secrets to an Edge Script".

   NEW in v2 (see classcraft/arcade/DEPLOY-leaderboard-v2.md for rollout):
     • GET /token?game=X&device=Y → { tok, ts }
         tok = HMAC-SHA256(LB_SECRET, `${game}|${device}|${ts}`) hex, ts = server ms.
         The client fetches this at PAGE LOAD (start of play) and echoes it back
         on /submit, so the server can verify real elapsed play time.
     • /submit anti-cheat gate: valid token + plausible elapsed time + score-rate
       cap. Submissions that fail the gate are SHADOW-REJECTED: the response
       looks like a success (board + plausible rank) but nothing is recorded —
       cheaters get no signal about which check tripped, and old cached clients
       (which send no token) never see an error.
     • Persistent per-device daily cap (40 accepted submissions / UTC day) via a
       small submits_log table — survives isolate recycling, unlike the
       in-memory limiter (which is kept as a cheap first line of defence).
     • Champion coverage rule (REQUIRE_TOPIC_SPREAD): best-5 games only all
       count if they span ≥3 distinct stems; otherwise max 2 entries per stem.
     • Bug fixes: week=all boards now return the topic of the row that holds
       the max score (was: arbitrary topic from GROUP BY); champion initials
       now come from the device's highest-scoring row that week (was: whichever
       row the aggregation happened to process last).

   Endpoints (all JSON):
     GET  /token?game=wager&device=<id>  → { tok, ts }
     GET  /top?game=wager&week=current|2026-W25|all&n=10&device=<id>
            → { week, board:[{initials,score,topic,you}], you:{rank,score} }
     GET  /champion?week=current&device=<id>
            → { week, board:[{initials,points,games,you}] }  (F1 points, best 5)
     GET  /weeks?game=wager → { weeks:[...] }   (for archive browsing)
     POST /submit  body: {game, score, initials, topic, stem, device, tok, ts}
            → { ok, rank, best, board:[...] }
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
   Bunny / DB / Request dependencies. test/t-leaderboard-v2.mjs slices this
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
/* Bug fix (v1 #4): the all-time board used `SELECT …, MAX(score), topic …
   GROUP BY device_id`, which returns an ARBITRARY row's topic/initials. Use a
   window function to pick the whole row that holds the device's max score
   (week DESC breaks exact-score ties in favour of the most recent). */
const SQL_TOP_ALL = `
  SELECT device_id, initials, score, topic FROM (
    SELECT device_id, initials, score, topic,
           ROW_NUMBER() OVER (PARTITION BY device_id ORDER BY score DESC, week DESC) AS rn
    FROM scores WHERE game = ?
  ) WHERE rn = 1 ORDER BY score DESC LIMIT ?`;
const SQL_TOP_WEEK = `
  SELECT device_id, initials, score, topic FROM scores
  WHERE game = ? AND week = ? ORDER BY score DESC LIMIT ?`;
const SQL_CHAMPION_WEEK = `
  SELECT game, device_id, initials, score, stem FROM scores
  WHERE week = ? ORDER BY game, score DESC`;
const SQL_UPSERT = `
  INSERT INTO scores (game, week, device_id, initials, score, topic, stem)
  VALUES (?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(game, week, device_id) DO UPDATE SET
    plays = plays + 1,
    initials = excluded.initials,
    updated_at = strftime('%Y-%m-%dT%H:%M:%SZ','now'),
    score = CASE WHEN excluded.score > scores.score THEN excluded.score ELSE scores.score END,
    topic = CASE WHEN excluded.score > scores.score THEN excluded.topic ELSE scores.topic END,
    stem  = CASE WHEN excluded.score > scores.score THEN excluded.stem  ELSE scores.stem  END`;
/* v1 has no schema bootstrap (the scores table was created in the Bunny
   Database dashboard), so submits_log is bootstrapped lazily here instead. */
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
  schemaReady = true;
}

/* ── board queries ───────────────────────────────────────────────────────── */
async function topBoard(game, week, n, device) {
  const isAll = week === "all";
  const sql = isAll ? SQL_TOP_ALL : SQL_TOP_WEEK;
  const args = isAll ? [game, n] : [game, week, n];
  const rows = (await db.execute({ sql, args })).rows;
  const board = rows.map((r, i) => ({
    rank: i + 1,
    initials: r.initials,
    score: Number(r.score),
    topic: r.topic || "",
    you: !!device && r.device_id === device,
  }));
  let you = null;
  if (device) {
    const mine = isAll
      ? await db.execute({ sql: `SELECT MAX(score) AS score FROM scores WHERE game = ? AND device_id = ?`, args: [game, device] })
      : await db.execute({ sql: `SELECT score FROM scores WHERE game = ? AND week = ? AND device_id = ?`, args: [game, week, device] });
    const s = mine.rows[0] && mine.rows[0].score != null ? Number(mine.rows[0].score) : null;
    if (s != null) {
      const better = isAll
        ? await db.execute({ sql: `SELECT COUNT(*) AS c FROM (SELECT device_id, MAX(score) m FROM scores WHERE game = ? GROUP BY device_id) WHERE m > ?`, args: [game, s] })
        : await db.execute({ sql: `SELECT COUNT(*) AS c FROM scores WHERE game = ? AND week = ? AND score > ?`, args: [game, week, s] });
      you = { rank: Number(better.rows[0].c) + 1, score: s };
    }
  }
  return { board, you };
}

async function championBoard(week, device) {
  const rows = (await db.execute({ sql: SQL_CHAMPION_WEEK, args: [week] })).rows;
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
      const { board, you } = await topBoard(game, week, n, device);
      return json(req, 200, { game, week, board, you });
    }

    if (req.method === "GET" && path === "/champion") {
      const week = resolveWeek(url.searchParams.get("week"));
      if (!week || week === "all") return json(req, 400, { error: "bad week" });
      const device = url.searchParams.get("device") || "";
      return json(req, 200, { week, board: await championBoard(week, device) });
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
      if (!initials) return json(req, 400, { error: "Pick three letters (those ones aren't allowed)." });
      const device = String(body.device || "");
      if (!DEVICE_RE.test(device)) return json(req, 400, { error: "bad device id" });
      const topic = String(body.topic || "").slice(0, 80);
      const stem = String(body.stem || "").slice(0, 160);
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
          await db.execute({ sql: SQL_UPSERT, args: [game, week, device, initials, score, topic, stem] });
          await db.execute({ sql: SQL_LOG_INSERT, args: [device, day, game, score] });
        }
      }

      const { board, you } = await topBoard(game, week, 10, device);
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
      return json(req, 200, { ok: true, week, rank: rankOut, best: you ? you.score : score, board });
    }

    return json(req, 404, { error: "not found" });
  } catch (e) {
    return json(req, 500, { error: "server error", detail: String(e && e.message || e).slice(0, 200) });
  }
}

BunnySDK.net.http.serve(handle);
