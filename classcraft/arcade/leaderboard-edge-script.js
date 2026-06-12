/* ============================================================================
   AISM ARCADE LEADERBOARD — Bunny Edge Script (standalone)
   ----------------------------------------------------------------------------
   Paste this whole file into: dash.bunny.net → Edge Platform → Scripting →
   Add Script → Standalone → name it "aism-leaderboard".

   Then connect the database: Database → aism-arcade → Access →
   Generate Tokens → "Add Secrets to an Edge Script" → pick aism-leaderboard.
   That injects DB_URL and DB_TOKEN as environment variables.

   Endpoints (all JSON):
     GET  /top?game=wager&week=current|2026-W25|all&n=10&device=<id>
            → { week, board:[{initials,score,topic,you}], you:{rank,score} }
     GET  /champion?week=current&device=<id>
            → { week, board:[{initials,points,games,you}] }  (F1 points, best 5)
     GET  /weeks?game=wager → { weeks:[...] }   (for archive browsing)
     POST /submit  body: {game, score, initials, topic, stem, device}
            → { ok, rank, best, board:[...] }
   ========================================================================== */
import * as BunnySDK from "https://esm.sh/@bunny.net/edgescript-sdk@0.11.2";
import { createClient } from "https://esm.sh/@libsql/client@0.14.0/web";

const env = (k) =>
  (typeof process !== "undefined" && process.env && process.env[k]) ||
  (typeof Deno !== "undefined" && Deno.env && Deno.env.get(k)) || "";

const db = createClient({ url: env("DB_URL"), authToken: env("DB_TOKEN") });

/* ── config ──────────────────────────────────────────────────────────────── */
const ALLOWED_ORIGINS = [
  "https://aistudymethod.co.uk",
  "https://www.aistudymethod.co.uk",
  "http://localhost:8765",
  "http://127.0.0.1:8765",
];
// game id → maximum believable score (anything above is rejected)
const GAME_CAPS = {
  "two-truths": 2000, "connections": 3000, "sequence": 1000, "wager": 200000,
  "higher-lower": 50000, "falling-words": 50000, "conveyor": 20000,
  "word-web": 5000, "reveal-race": 5000, "daily-drill": 1000,
  "quiz": 50000, "pairs": 50000, "hangman": 50000, "termguess": 50000,
  "anagram": 50000, "crossword": 50000, "pacman": 200000, "spaceinvaders": 200000,
};
// crude/slur 3-letter combos that can't go on a public board for teenagers
const BAD_INITIALS = new Set([
  "ASS","SEX","FUK","FUC","FCK","FKU","CUM","JIZ","TIT","DIK","DIC","COK",
  "COC","FAG","NIG","NGR","KKK","NAZ","POO","PEE","VAG","PUS","WTF","STD",
  "GOD","JEW","RAP","KYS","KMS","DIE","HOR","SLU","HOE","PIS","CNT","TWA",
]);
const MAX_N = 50;
const RATE_LIMIT = 8;            // submissions per IP per minute
const rate = new Map();          // ip → {count, resetAt}  (per-isolate, best effort)

/* ── helpers ─────────────────────────────────────────────────────────────── */
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
function rateLimited(req) {
  const ip = req.headers.get("cf-connecting-ip") ||
             req.headers.get("x-forwarded-for") || "unknown";
  const now = Date.now();
  const r = rate.get(ip);
  if (!r || now > r.resetAt) { rate.set(ip, { count: 1, resetAt: now + 60000 }); return false; }
  r.count++;
  if (rate.size > 5000) rate.clear();              // bounded memory
  return r.count > RATE_LIMIT;
}

/* ── board queries ───────────────────────────────────────────────────────── */
async function topBoard(game, week, n, device) {
  const isAll = week === "all";
  const sql = isAll
    ? `SELECT device_id, initials, MAX(score) AS score, topic FROM scores
       WHERE game = ? GROUP BY device_id ORDER BY score DESC LIMIT ?`
    : `SELECT device_id, initials, score, topic FROM scores
       WHERE game = ? AND week = ? ORDER BY score DESC LIMIT ?`;
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

// F1-style points across all games for one week; best 5 games count
const F1 = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
async function championBoard(week, device) {
  const rows = (await db.execute({
    sql: `SELECT game, device_id, initials, score FROM scores WHERE week = ?
          ORDER BY game, score DESC`,
    args: [week],
  })).rows;
  const perDevice = new Map();
  let game = null, rank = 0;
  for (const r of rows) {
    if (r.game !== game) { game = r.game; rank = 0; }
    rank++;
    if (rank > 10) continue;
    const pts = F1[rank - 1];
    const d = perDevice.get(r.device_id) || { initials: r.initials, pts: [] };
    d.initials = r.initials;
    d.pts.push(pts);
    perDevice.set(r.device_id, d);
  }
  const board = [...perDevice.entries()].map(([id, d]) => {
    const best5 = d.pts.sort((a, b) => b - a).slice(0, 5);
    return { device: id, initials: d.initials, points: best5.reduce((a, b) => a + b, 0), games: d.pts.length };
  }).sort((a, b) => b.points - a.points).slice(0, 25)
    .map((e, i) => ({ rank: i + 1, initials: e.initials, points: e.points, games: e.games, you: !!device && e.device === device }));
  return board;
}

/* ── handler ─────────────────────────────────────────────────────────────── */
async function handle(req) {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(req) });
  const url = new URL(req.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";

  try {
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
      if (rateLimited(req)) return json(req, 429, { error: "Easy, champion — try again in a minute." });
      let body;
      try { body = await req.json(); } catch (e) { return json(req, 400, { error: "bad json" }); }

      const game = String(body.game || "");
      if (!(game in GAME_CAPS)) return json(req, 400, { error: "unknown game" });
      const score = Math.floor(Number(body.score));
      if (!isFinite(score) || score < 0 || score > GAME_CAPS[game]) {
        return json(req, 400, { error: "score out of range" });
      }
      const initials = cleanInitials(body.initials);
      if (!initials) return json(req, 400, { error: "Pick three letters (those ones aren't allowed)." });
      const device = String(body.device || "");
      if (!/^[a-f0-9-]{16,64}$/i.test(device)) return json(req, 400, { error: "bad device id" });
      const topic = String(body.topic || "").slice(0, 80);
      const stem = String(body.stem || "").slice(0, 160);
      const week = currentWeek();

      await db.execute({
        sql: `INSERT INTO scores (game, week, device_id, initials, score, topic, stem)
              VALUES (?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(game, week, device_id) DO UPDATE SET
                plays = plays + 1,
                initials = excluded.initials,
                updated_at = strftime('%Y-%m-%dT%H:%M:%SZ','now'),
                score = CASE WHEN excluded.score > scores.score THEN excluded.score ELSE scores.score END,
                topic = CASE WHEN excluded.score > scores.score THEN excluded.topic ELSE scores.topic END,
                stem  = CASE WHEN excluded.score > scores.score THEN excluded.stem  ELSE scores.stem  END`,
        args: [game, week, device, initials, score, topic, stem],
      });

      const { board, you } = await topBoard(game, week, 10, device);
      return json(req, 200, { ok: true, week, rank: you ? you.rank : null, best: you ? you.score : score, board });
    }

    return json(req, 404, { error: "not found" });
  } catch (e) {
    return json(req, 500, { error: "server error", detail: String(e && e.message || e).slice(0, 200) });
  }
}

BunnySDK.net.http.serve(handle);
