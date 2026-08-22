/*
 * share-score.js — reusable share module for the AISM arcade.
 *
 * Renders an off-screen 1080×1080 score card to a PNG File and hands it to
 * navigator.share so students can drop the result into a private group chat
 * (WhatsApp, iMessage, Snap, IG DM). The OS share sheet owns target selection
 * — we never deep-link to a specific platform.
 *
 * Public API:
 *   Arcade.shareScore({ gameName, subject, level, topic, score, total, pct,
 *                       rank, rankLine, bigLabel, statLine })
 *       Builds the card image, attempts navigator.share({files,text}) with the
 *       challenge link folded into the caption text (a separate `url` field makes
 *       chat apps unfurl a second link-preview card alongside the image).
 *       Desktop / unsupported browsers: downloads the PNG + copies a challenge
 *       URL to the clipboard with a toast confirmation.
 *
 *   Arcade.shareElement({ sym, name, atomicNumber, mass, state, categoryLabel,
 *                         categoryColor, fact, by, ownedCount, total, url })
 *       The collection counterpart: renders a personalised periodic-tile card
 *       for an unlocked element and shares it through the same unified payload
 *       path (image + caption, no separate `url`). Used by the element shop.
 *
 *   Arcade.maybeShowChallenge()
 *       On game load, if the URL carries ?from=share&s=…&t=… params, injects
 *       a "Your mate scored X — beat them" banner above #root.
 *
 * Brief constraints honoured:
 *   - All canvas drawing is same-origin (no external fonts) so toBlob() works.
 *   - Uses navigator.canShare({files:[file]}) feature-detect before navigator.share.
 *   - Only fires from real user-gesture click handlers (the consumer wires it).
 *   - No platform-specific share intents.
 */
(function () {
  if (!window.Arcade) window.Arcade = {};

  /* Captured at module init — document.currentScript is null inside async
     callbacks, so the src must be grabbed now. Used to derive the
     arcade-icons.js URL for the one-shot lazy load at share time. */
  var SCRIPT_SRC = (document.currentScript && document.currentScript.src) || '';

  /* Parent share — bridge to the Velvet Method course via for-parents.html (the course pitch).
     Native share sheet on mobile; clipboard copy / open on desktop. Mirrors arcade.js.

     CONTEXT-AWARE — do not clobber an existing definition. Arcade game pages load
     quizzes/arcade.js first, which defines Arcade.shareWithParents tagged
     utm_source=arcade. If this module overwrote it, every arcade parent-share would
     be mis-attributed to `lesson` in analytics. Mini-lessons load this file alone,
     so they get the lesson-tagged version below. */
  if (!Arcade.shareWithParents) Arcade.shareWithParents = async function (opts) {
    opts = opts || {};
    var url;
    try { url = new URL('../../for-parents.html', location.href); }
    catch (e) { url = new URL('https://aistudymethod.com/for-parents.html'); }
    var p = url.searchParams;
    if (opts.score != null) p.set('s', String(opts.score));
    if (opts.total != null) p.set('t', String(opts.total));
    if (opts.subject) p.set('subj', opts.subject);
    if (opts.level)   p.set('level', opts.level);
    if (opts.topic)   p.set('topic', opts.topic);
    p.set('utm_source', 'lesson'); p.set('utm_medium', 'parent_share'); p.set('utm_campaign', 'parent_invite');
    var link = url.toString();
    var scoreStr = opts.score != null ? (opts.total != null ? opts.score + '/' + opts.total : String(opts.score)) : null;
    var topicBit = opts.topic ? (' ' + opts.topic) : '';
    var msg = '📚 I’ve been revising' + topicBit + ' on AI Study Method'
      + (scoreStr ? ' and just scored ' + scoreStr : '')
      + '! Can we get the full Velvet Method course? It teaches you to revise any subject'
      + ' using AI — built by teachers, £25 for life.';
    if (navigator.share) {
      try { await navigator.share({ title: 'AI Study Method', text: msg, url: link }); return { ok: true, method: 'native-share' }; }
      catch (err) { if (err && err.name === 'AbortError') return { ok: false, cancelled: true }; }
    }
    try { if (navigator.clipboard && navigator.clipboard.writeText) { await navigator.clipboard.writeText(msg + '\n' + link); if (window.Arcade.toast) Arcade.toast('Link copied — send it to a parent'); return { ok: true, method: 'clipboard' }; } } catch (err) {}
    try { window.open(link, '_blank'); return { ok: true, method: 'open' }; } catch (err) { return { ok: false }; }
  };


  const CARD_SIZE = 1080;
  // System monospaced + serif + bold-sans stacks — same-origin, no @font-face needed.
  // The bold-sans stack mimics the arcade marquee feel without bundling a pixel font;
  // we layer outline + shadow to land the arcade look.
  const MONO  = '"SF Mono", Menlo, Consolas, "Liberation Mono", "Courier New", monospace';
  const SERIF = '"Times New Roman", Georgia, serif';
  // Heavy display stack for the marquee headline + score. Just the family list —
  // size and weight are concatenated in by each caller (the previous version
  // baked in `900 italic 0 / 0` which made the whole shorthand invalid, so the
  // canvas silently kept the last successful font — that's why "AISTUDY METHOD"
  // was rendering huge in serif and "148" was tiny in the default fallback).
  const ARCADE_HEAD = '"Arial Black", "Helvetica Neue Black", Impact, "Franklin Gothic Heavy", sans-serif';
  // Revision Arcade palette — pulled from the live marquee
  const PAL = {
    bgTop:    '#1a1340',
    bgMid:    '#0d0a30',
    bgBot:    '#060418',
    star:     'rgba(255,255,255,0.85)',
    starDim:  'rgba(180,170,255,0.45)',
    border:   '#7e6dff',
    borderGlow: 'rgba(126,109,255,0.45)',
    yellow:   '#ffd24d',
    yellowDk: '#9a6a00',
    cyan:     '#5cffe4',
    cyanDim:  'rgba(92,255,228,0.72)',
    magenta:  '#ff5fa2',
    text:     '#ece8ff',
    textDim:  'rgba(236,232,255,0.62)',
    // Velvet "V" logo gradient stops
    vTeal:    '#5dbef0',
    vMid:     '#7a7adb',
    vPurple:  '#9b6dff',
  };

  /* ----------------------------------------------------------------------- *
   * Challenge URL builder
   * ----------------------------------------------------------------------- */
  // The URL the recipient taps. Same game, same spec, plus score params and
  // UTM tags so the challenge inflow shows up cleanly in analytics.
  function buildChallengeUrl(opts) {
    const url = new URL(location.href);
    // Wipe any pre-existing share/UTM params so a re-share isn't doubled up.
    ['s','t','pct','subj','level','from','utm_source','utm_medium','utm_campaign']
      .forEach(k => url.searchParams.delete(k));
    if (opts.score   != null) url.searchParams.set('s', String(opts.score));
    if (opts.total   != null) url.searchParams.set('t', String(opts.total));
    if (opts.pct     != null) url.searchParams.set('pct', String(opts.pct));
    if (opts.subject)         url.searchParams.set('subj', opts.subject);
    if (opts.level)           url.searchParams.set('level', opts.level);
    url.searchParams.set('from', 'share');
    url.searchParams.set('utm_source', 'share');
    url.searchParams.set('utm_medium', 'image');
    url.searchParams.set('utm_campaign', 'arcade');
    return url.toString();
  }

  /* ----------------------------------------------------------------------- *
   * Card renderer — Revision Arcade marquee aesthetic
   * Purple starfield backdrop, yellow pixel-style headline, cyan/magenta
   * accents, the Velvet "V" badge drawn programmatically (same-origin safe).
   * ----------------------------------------------------------------------- */
  // Returns Promise<Blob>. Throws on canvas/toBlob failure.
  async function drawCard(opts) {
    const c = document.createElement('canvas');
    c.width = CARD_SIZE;
    c.height = CARD_SIZE;
    const ctx = c.getContext('2d');
    const W = CARD_SIZE, H = CARD_SIZE;

    /* ---------- 1. Background gradient (deep purple → near-black) ----------- */
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0,    PAL.bgTop);
    bg.addColorStop(0.55, PAL.bgMid);
    bg.addColorStop(1,    PAL.bgBot);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    /* ---------- 2. Starfield — deterministic so re-renders look identical -- */
    drawStars(ctx, 140, 7);

    /* ---------- 3. Soft purple glow vignette behind centre block ------------ */
    const vg = ctx.createRadialGradient(W / 2, 560, 60, W / 2, 560, 620);
    vg.addColorStop(0, 'rgba(126,109,255,0.22)');
    vg.addColorStop(1, 'rgba(126,109,255,0)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);

    /* ---------- 4. Outer frame: thin lavender border + corner brackets ----- */
    // soft glow under the border
    ctx.shadowColor = PAL.borderGlow;
    ctx.shadowBlur = 18;
    ctx.strokeStyle = PAL.border;
    ctx.lineWidth = 2.5;
    roundRect(ctx, 36, 36, W - 72, H - 72, 22);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // corner brackets (chunky lavender)
    ctx.strokeStyle = PAL.border;
    ctx.lineWidth = 6;
    drawCornerBrackets(ctx, 36, 36, W - 72, H - 72, 56);

    /* ---------- 5. Header: V badge + "AI STUDY METHOD" wordmark -----------
       Compact header band: V badge at top-left of a centred group, wordmark
       to the right, sub-line beneath. Sized so it never crowds the marquee. */
    const badgeY = 70;
    const badgeSize = 88;
    const headerGroupW = 600;
    const headerStartX = (W - headerGroupW) / 2;
    drawVelvetBadge(ctx, headerStartX, badgeY, badgeSize);

    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = PAL.text;
    ctx.font = '900 36px ' + ARCADE_HEAD;
    ctx.fillText('AI STUDY METHOD', headerStartX + badgeSize + 18, badgeY + 6);
    ctx.fillStyle = PAL.cyan;
    ctx.font = '700 17px ' + MONO;
    ctx.fillText('THE VELVET METHOD®', headerStartX + badgeSize + 18, badgeY + 54);
    ctx.textBaseline = 'alphabetic';

    // "Score transmission" caption beneath, centred
    ctx.textAlign = 'center';
    ctx.fillStyle = PAL.cyanDim;
    ctx.font = '700 16px ' + MONO;
    ctx.fillText('· · ·  SCORE TRANSMISSION  · · ·', W / 2, badgeY + badgeSize + 30);

    /* ---------- 6. Game-name marquee (huge yellow + pink shadow) ----------
       This is the visual hero — student takes the screenshot for this. */
    const headlineText = (opts.gameName || 'Arcade Run').toUpperCase();
    drawMarqueeHeadline(ctx, headlineText, W / 2, 320);

    /* ---------- 7. Subject / topic strip (cyan caps + topic in white) ----- */
    const subjectLine = [opts.level, opts.subject].filter(Boolean).join(' · ');
    ctx.textAlign = 'center';
    if (subjectLine) {
      ctx.fillStyle = PAL.cyan;
      ctx.font = '700 22px ' + MONO;
      ctx.fillText(subjectLine.toUpperCase(), W / 2, 420);
    }
    if (opts.topic) {
      ctx.fillStyle = PAL.text;
      ctx.font = '900 30px ' + ARCADE_HEAD;
      const topic = String(opts.topic);
      const safeTopic = topic.length > 36 ? topic.slice(0, 35) + '…' : topic;
      ctx.fillText(safeTopic, W / 2, 462);
    }

    /* ---------- 8. Score panel: huge yellow score, lavender border ------- */
    const panelX = 110, panelY = 500, panelW = W - 220, panelH = 270;
    const sg = ctx.createLinearGradient(panelX, panelY, panelX, panelY + panelH);
    sg.addColorStop(0, 'rgba(126,109,255,0.22)');
    sg.addColorStop(1, 'rgba(126,109,255,0.05)');
    ctx.fillStyle = sg;
    roundRect(ctx, panelX, panelY, panelW, panelH, 22);
    ctx.fill();
    ctx.strokeStyle = PAL.border;
    ctx.lineWidth = 2.5;
    roundRect(ctx, panelX, panelY, panelW, panelH, 22);
    ctx.stroke();

    // POINTS label — sits just above the panel top edge. It used to render
    // inside the panel (panelY + 50) where the big score glyphs (up to 260px,
    // baseline panelY + 200, tops ≈ y 510) swallowed it; above the border
    // nothing can collide at any score width.
    ctx.textAlign = 'center';
    ctx.fillStyle = PAL.magenta;
    ctx.font = '900 19px ' + MONO;
    ctx.fillText((opts.bigLabel || 'SCORE').toUpperCase(), W / 2, panelY - 14);

    // Huge yellow score — fills most of the panel
    const scoreText = (opts.score != null)
      ? (opts.total != null ? String(opts.score) + '/' + String(opts.total) : String(opts.score))
      : '—';
    drawMarqueeScore(ctx, scoreText, W / 2, panelY + 200, panelW - 60);

    /* ---------- 8b. PLAYER tag — gives the card an owner ------------------
       Centred in the empty band between the panel bottom (y 770) and the
       rank line (y 884). That band is clear at every score width: the score
       lives inside the panel, the rank stamp bottom ends ≈ y 614, and the
       rank/stat lines start at 884 — so nothing can collide. 34px bold cyan
       mono stays readable in a ~300px chat thumbnail (≈ 9px). */
    const player = playerInitials();
    if (player) {
      ctx.textAlign = 'center';
      ctx.fillStyle = PAL.cyan;
      ctx.font = '900 34px ' + MONO;
      ctx.fillText('PLAYER: ' + player, W / 2, 822);
    }

    /* ---------- 8c. Mascot cameo — lower-left corner (ArcadeIcons only) --
       Cheer pose for rank S/A, idle otherwise. 24px grid × scale 6 = 144px,
       parked at (60, 866): clear of the rank stamp (upper-right of the
       panel), the centred rank/stat lines (their realistic widths never
       reach x 204), and the footer block (which starts ≈ x 380). Drawn
       before the text layers so type always wins if content ever grows.
       No-op on the ~8k mini-lesson pages that never load arcade-icons.js. */
    drawMascot(ctx, opts.rank, 60, 866, 150);

    /* ---------- 9. Rank badge — big stamped grade over the panel corner --
       The rank letter (especially an S) is the most memeable element for
       teens, so it gets a ~216px rotated stamp overlapping the top-right
       corner of the score panel — big enough to survive a ~300px WhatsApp/
       iMessage thumbnail, and it gives the card a "graded" feel. */
    if (opts.rank) {
      drawRankStamp(ctx, String(opts.rank), panelX + panelW - 62, panelY + 6);
      if (opts.rankLine) {
        ctx.textAlign = 'center';
        ctx.fillStyle = PAL.cyan;
        ctx.font = '600 20px ' + MONO;
        const line = String(opts.rankLine);
        const safe = line.length > 64 ? line.slice(0, 63) + '…' : line;
        ctx.fillText(safe, W / 2, 884);
      }
    }

    /* ---------- 10. Stat ribbon (magenta) — clearly below the rank ------ */
    if (opts.statLine) {
      ctx.fillStyle = PAL.magenta;
      ctx.font = '700 20px ' + MONO;
      const sl = String(opts.statLine);
      const safe = sl.length > 60 ? sl.slice(0, 59) + '…' : sl;
      ctx.textAlign = 'center';
      ctx.fillText(safe, W / 2, 938);
    }

    /* ---------- 11. Challenge tagline + footer --------------------------- */
    ctx.fillStyle = PAL.magenta;
    ctx.font = '900 24px ' + MONO;
    ctx.fillText('▼  BEAT THIS SCORE  ▼', W / 2, 986);

    // Footer URL — bold + bigger so it stays legible when the card is
    // screenshotted and re-forwarded (the challenge URL in the share text
    // doesn't survive that journey; this line is all that's left).
    ctx.fillStyle = PAL.cyan;
    ctx.font = '900 26px ' + MONO;
    ctx.fillText('aistudymethod.com', W / 2, 1024);
    ctx.fillStyle = PAL.textDim;
    ctx.font = '500 15px ' + MONO;
    ctx.fillText('· The Velvet Method® ·', W / 2, 1050);

    const blob = await new Promise(resolve => c.toBlob(resolve, 'image/png', 0.95));
    if (!blob) throw new Error('toBlob returned null');
    return blob;
  }

  /* ----------------------------------------------------------------------- *
   * Story card renderer — 1080×1920 (9:16) for IG/Snap stories
   * Same marquee aesthetic re-laid vertically; reuses every square-card
   * helper (stars, frame, badge, marquee headline/score, rank stamp), only
   * the composition coordinates differ. Same-origin only, like the square.
   * ----------------------------------------------------------------------- */
  const STORY_W = 1080, STORY_H = 1920;
  async function drawStoryCard(opts) {
    const c = document.createElement('canvas');
    c.width = STORY_W;
    c.height = STORY_H;
    const ctx = c.getContext('2d');
    const W = STORY_W, H = STORY_H;

    // Background gradient + starfield filling the full 9:16 height
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0,    PAL.bgTop);
    bg.addColorStop(0.55, PAL.bgMid);
    bg.addColorStop(1,    PAL.bgBot);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    drawStars(ctx, 250, 7, W, H);

    // Soft glow vignette behind the centre block
    const vg = ctx.createRadialGradient(W / 2, 880, 80, W / 2, 880, 900);
    vg.addColorStop(0, 'rgba(126,109,255,0.22)');
    vg.addColorStop(1, 'rgba(126,109,255,0)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);

    // Outer frame + corner brackets
    ctx.shadowColor = PAL.borderGlow;
    ctx.shadowBlur = 18;
    ctx.strokeStyle = PAL.border;
    ctx.lineWidth = 2.5;
    roundRect(ctx, 36, 36, W - 72, H - 72, 22);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = PAL.border;
    ctx.lineWidth = 6;
    drawCornerBrackets(ctx, 36, 36, W - 72, H - 72, 56);

    // Header: V badge + wordmark (dropped a little for story safe areas)
    const badgeY = 130;
    const badgeSize = 88;
    const headerGroupW = 600;
    const headerStartX = (W - headerGroupW) / 2;
    drawVelvetBadge(ctx, headerStartX, badgeY, badgeSize);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = PAL.text;
    ctx.font = '900 36px ' + ARCADE_HEAD;
    ctx.fillText('AI STUDY METHOD', headerStartX + badgeSize + 18, badgeY + 6);
    ctx.fillStyle = PAL.cyan;
    ctx.font = '700 17px ' + MONO;
    ctx.fillText('THE VELVET METHOD®', headerStartX + badgeSize + 18, badgeY + 54);
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'center';
    ctx.fillStyle = PAL.cyanDim;
    ctx.font = '700 16px ' + MONO;
    ctx.fillText('· · ·  SCORE TRANSMISSION  · · ·', W / 2, badgeY + badgeSize + 34);

    // Game-name marquee — more headroom in 9:16, so it sits lower
    const headlineText = (opts.gameName || 'Arcade Run').toUpperCase();
    drawMarqueeHeadline(ctx, headlineText, W / 2, 500);

    // Subject / topic strip
    const subjectLine = [opts.level, opts.subject].filter(Boolean).join(' · ');
    ctx.textAlign = 'center';
    if (subjectLine) {
      ctx.fillStyle = PAL.cyan;
      ctx.font = '700 22px ' + MONO;
      ctx.fillText(subjectLine.toUpperCase(), W / 2, 620);
    }
    if (opts.topic) {
      ctx.fillStyle = PAL.text;
      ctx.font = '900 30px ' + ARCADE_HEAD;
      const topic = String(opts.topic);
      const safeTopic = topic.length > 36 ? topic.slice(0, 35) + '…' : topic;
      ctx.fillText(safeTopic, W / 2, 664);
    }

    // PLAYER tag — its own clear band between the topic strip and the panel
    const player = playerInitials();
    if (player) {
      ctx.fillStyle = PAL.cyan;
      ctx.font = '900 40px ' + MONO;
      ctx.fillText('PLAYER: ' + player, W / 2, 760);
    }

    /* Mascot cameo — lower-left, scaled up for the 9:16 canvas (24px grid ×
       scale 10 = 240px). The band y 1580–1820 is empty at x < 320: the rank
       and stat lines end by y ≈ 1264 and the centred footer block never
       reaches left of x ≈ 360. Same ArcadeIcons-only degrade as the square. */
    drawMascot(ctx, opts.rank, 64, 1580, 240);

    // Score panel — same treatment as the square card, roomier
    const panelX = 110, panelY = 820, panelW = W - 220, panelH = 300;
    const sg = ctx.createLinearGradient(panelX, panelY, panelX, panelY + panelH);
    sg.addColorStop(0, 'rgba(126,109,255,0.22)');
    sg.addColorStop(1, 'rgba(126,109,255,0.05)');
    ctx.fillStyle = sg;
    roundRect(ctx, panelX, panelY, panelW, panelH, 22);
    ctx.fill();
    ctx.strokeStyle = PAL.border;
    ctx.lineWidth = 2.5;
    roundRect(ctx, panelX, panelY, panelW, panelH, 22);
    ctx.stroke();

    // Label just above the panel edge — same bleed-proof spot as the square
    ctx.textAlign = 'center';
    ctx.fillStyle = PAL.magenta;
    ctx.font = '900 19px ' + MONO;
    ctx.fillText((opts.bigLabel || 'SCORE').toUpperCase(), W / 2, panelY - 14);

    const scoreText = (opts.score != null)
      ? (opts.total != null ? String(opts.score) + '/' + String(opts.total) : String(opts.score))
      : '—';
    drawMarqueeScore(ctx, scoreText, W / 2, panelY + 225, panelW - 60);

    // Rank stamp over the panel's top-right corner, like the square card
    if (opts.rank) {
      drawRankStamp(ctx, String(opts.rank), panelX + panelW - 62, panelY + 6);
      if (opts.rankLine) {
        ctx.textAlign = 'center';
        ctx.fillStyle = PAL.cyan;
        ctx.font = '600 20px ' + MONO;
        const line = String(opts.rankLine);
        const safe = line.length > 64 ? line.slice(0, 63) + '…' : line;
        ctx.fillText(safe, W / 2, panelY + panelH + 90);
      }
    }

    // Stat ribbon
    if (opts.statLine) {
      ctx.fillStyle = PAL.magenta;
      ctx.font = '700 20px ' + MONO;
      const sl = String(opts.statLine);
      const safe = sl.length > 60 ? sl.slice(0, 59) + '…' : sl;
      ctx.textAlign = 'center';
      ctx.fillText(safe, W / 2, panelY + panelH + 144);
    }

    // Challenge tagline + footer URL — kept above the story-UI bottom zone
    ctx.fillStyle = PAL.magenta;
    ctx.font = '900 26px ' + MONO;
    ctx.fillText('▼  BEAT THIS SCORE  ▼', W / 2, 1570);
    ctx.fillStyle = PAL.cyan;
    ctx.font = '900 30px ' + MONO;
    ctx.fillText('aistudymethod.com', W / 2, 1626);
    ctx.fillStyle = PAL.textDim;
    ctx.font = '500 15px ' + MONO;
    ctx.fillText('· The Velvet Method® ·', W / 2, 1658);

    const blob = await new Promise(resolve => c.toBlob(resolve, 'image/png', 0.95));
    if (!blob) throw new Error('toBlob returned null');
    return blob;
  }

  /* ----------------------------------------------------------------------- *
   * Element card renderer — 1080×1080, same marquee aesthetic as the score
   * card, but the hero is a periodic-table tile for the unlocked element.
   * Fully canvas-drawn (no external art image) so toBlob() is never tainted,
   * exactly like the score card. Reuses every score-card helper: stars, frame,
   * badge, marquee headline, palette. Accent colour comes from the element's
   * category so each element's card reads distinctly.
   * ----------------------------------------------------------------------- */
  async function drawElementCard(opts) {
    const c = document.createElement('canvas');
    c.width = CARD_SIZE;
    c.height = CARD_SIZE;
    const ctx = c.getContext('2d');
    const W = CARD_SIZE, H = CARD_SIZE;
    const accent = opts.categoryColor || '#6ab7ff';

    // Background gradient + deterministic starfield (seed 7, like the score card)
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, PAL.bgTop);
    bg.addColorStop(0.55, PAL.bgMid);
    bg.addColorStop(1, PAL.bgBot);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    drawStars(ctx, 140, 7);

    // Glow vignette tinted by the element's category colour
    const vg = ctx.createRadialGradient(W / 2, 560, 60, W / 2, 560, 620);
    vg.addColorStop(0, hexA(accent, 0.20));
    vg.addColorStop(1, hexA(accent, 0));
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);

    // Outer frame + corner brackets
    ctx.shadowColor = PAL.borderGlow;
    ctx.shadowBlur = 18;
    ctx.strokeStyle = PAL.border;
    ctx.lineWidth = 2.5;
    roundRect(ctx, 36, 36, W - 72, H - 72, 22);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = PAL.border;
    ctx.lineWidth = 6;
    drawCornerBrackets(ctx, 36, 36, W - 72, H - 72, 56);

    // Header: V badge + wordmark (identical to the score card)
    const badgeY = 70, badgeSize = 88, headerGroupW = 600;
    const headerStartX = (W - headerGroupW) / 2;
    drawVelvetBadge(ctx, headerStartX, badgeY, badgeSize);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = PAL.text;
    ctx.font = '900 36px ' + ARCADE_HEAD;
    ctx.fillText('AI STUDY METHOD', headerStartX + badgeSize + 18, badgeY + 6);
    ctx.fillStyle = PAL.cyan;
    ctx.font = '700 17px ' + MONO;
    ctx.fillText('THE VELVET METHOD®', headerStartX + badgeSize + 18, badgeY + 54);
    ctx.textBaseline = 'alphabetic';

    // Caption
    ctx.textAlign = 'center';
    ctx.fillStyle = PAL.cyanDim;
    ctx.font = '700 16px ' + MONO;
    ctx.fillText('· · ·  ELEMENT UNLOCKED  · · ·', W / 2, badgeY + badgeSize + 30);

    // Element name marquee — the hero headline
    drawMarqueeHeadline(ctx, String(opts.name || 'Element').toUpperCase(), W / 2, 300);

    // Category strip (accent caps)
    if (opts.categoryLabel) {
      ctx.textAlign = 'center';
      ctx.fillStyle = accent;
      ctx.font = '700 22px ' + MONO;
      ctx.fillText(String(opts.categoryLabel).toUpperCase(), W / 2, 400);
    }

    // Periodic-table tile centrepiece
    drawElementTile(ctx, opts, accent, W / 2, 452);

    // "UNLOCKED BY <friend>" — gives the card an owner (like the score PLAYER tag)
    const by = String(opts.by || '').trim();
    if (by) {
      ctx.textAlign = 'center';
      ctx.fillStyle = PAL.cyan;
      ctx.font = '900 30px ' + MONO;
      const safeBy = by.length > 22 ? by.slice(0, 21) + '…' : by;
      ctx.fillText('UNLOCKED BY ' + safeBy.toUpperCase(), W / 2, 812);
    }

    // Progress ribbon
    const total = opts.total || 118;
    if (opts.ownedCount != null) {
      ctx.textAlign = 'center';
      ctx.fillStyle = PAL.magenta;
      ctx.font = '700 24px ' + MONO;
      ctx.fillText(opts.ownedCount + ' / ' + total + ' COLLECTED', W / 2, 862);
    }

    // Fact — wrapped to at most two centred serif lines
    if (opts.fact) {
      ctx.textAlign = 'center';
      ctx.fillStyle = PAL.textDim;
      ctx.font = '400 22px ' + SERIF;
      const words = String(opts.fact).split(/\s+/);
      const lines = [];
      let cur = '';
      words.forEach(function (wd) {
        const t = cur ? cur + ' ' + wd : wd;
        if (ctx.measureText(t).width > W - 180 && cur) { lines.push(cur); cur = wd; }
        else { cur = t; }
      });
      if (cur) lines.push(cur);
      const two = lines.slice(0, 2);
      if (lines.length > 2) two[1] = two[1].replace(/\s+\S*$/, '') + '…';
      two.forEach(function (ln, i) { ctx.fillText(ln, W / 2, 902 + i * 30); });
    }

    // Challenge tagline + footer (mirrors the score card)
    ctx.textAlign = 'center';
    ctx.fillStyle = PAL.magenta;
    ctx.font = '900 24px ' + MONO;
    ctx.fillText('▼  COLLECT THEM ALL  ▼', W / 2, 980);
    ctx.fillStyle = PAL.cyan;
    ctx.font = '900 26px ' + MONO;
    ctx.fillText('aistudymethod.com', W / 2, 1020);
    ctx.fillStyle = PAL.textDim;
    ctx.font = '500 15px ' + MONO;
    ctx.fillText('· The Velvet Method® ·', W / 2, 1046);

    const blob = await new Promise(resolve => c.toBlob(resolve, 'image/png', 0.95));
    if (!blob) throw new Error('toBlob returned null');
    return blob;
  }

  // The periodic-table cell: category-coloured rounded panel with the atomic
  // number (top-left), state (top-right), the big symbol, and the atomic mass.
  function drawElementTile(ctx, opts, accent, cx, tileY) {
    const w = 360, h = 300, x = cx - w / 2, y = tileY;
    // Panel fill + glow
    ctx.save();
    ctx.shadowColor = hexA(accent, 0.5);
    ctx.shadowBlur = 26;
    ctx.fillStyle = hexA(accent, 0.12);
    roundRect(ctx, x, y, w, h, 20);
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 3;
    roundRect(ctx, x, y, w, h, 20);
    ctx.stroke();

    // Atomic number — top-left
    if (opts.atomicNumber != null) {
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = accent;
      ctx.font = '900 40px ' + MONO;
      ctx.fillText(String(opts.atomicNumber), x + 22, y + 54);
    }
    // State — top-right
    if (opts.state) {
      ctx.textAlign = 'right';
      ctx.fillStyle = PAL.textDim;
      ctx.font = '700 18px ' + MONO;
      ctx.fillText(String(opts.state).toUpperCase(), x + w - 22, y + 48);
    }
    // Symbol — the hero glyph, shrink-to-fit, white with dark outline + glow
    const sym = String(opts.sym || '');
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let size = 150;
    ctx.font = '900 ' + size + 'px ' + ARCADE_HEAD;
    while (size > 60 && ctx.measureText(sym).width > w - 90) {
      size -= 8;
      ctx.font = '900 ' + size + 'px ' + ARCADE_HEAD;
    }
    const symY = y + h / 2 + 8;
    ctx.lineWidth = Math.max(8, size * 0.09);
    ctx.strokeStyle = '#0d0a30';
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
    ctx.strokeText(sym, cx, symY);
    ctx.save();
    ctx.shadowColor = accent;
    ctx.shadowBlur = 24;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(sym, cx, symY);
    ctx.restore();
    // Atomic mass — bottom
    if (opts.mass) {
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = PAL.text;
      ctx.font = '700 24px ' + MONO;
      ctx.fillText(String(opts.mass), cx, y + h - 26);
    }
    ctx.textBaseline = 'alphabetic';
  }

  // #rrggbb / #rgb → rgba() string. Used to tint panels/glows by category.
  function hexA(hex, a) {
    let h = String(hex || '').replace('#', '');
    if (h.length === 3) h = h.split('').map(function (x) { return x + x; }).join('');
    const r = parseInt(h.slice(0, 2), 16) || 0;
    const g = parseInt(h.slice(2, 4), 16) || 0;
    const b = parseInt(h.slice(4, 6), 16) || 0;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  /* ----------------------------------------------------------------------- *
   * Helpers
   * ----------------------------------------------------------------------- */
  // Player identity — the leaderboard initials saved under aism-initials.
  // Sanitised to at most 3 chars A-Z0-9. The placeholder default AAA means
  // "never chosen", so it is treated as absent and no PLAYER line renders.
  function playerInitials() {
    let raw = '';
    try { raw = localStorage.getItem('aism-initials') || ''; } catch (err) { raw = ''; }
    const clean = String(raw).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 3);
    if (!clean || clean === 'AAA') return '';
    return clean;
  }

  /* ----------------------------------------------------------------------- *
   * Mascot — pixel-art cameo via the ArcadeIcons library (arcade-icons.js).
   *
   * DEGRADE RULE: this module also ships on ~8,452 mini-lesson pages that
   * never load arcade-icons.js. The mascot is therefore drawn ONLY when
   * window.ArcadeIcons exists; when it does not, the card renders exactly
   * as it always has. drawMascot is a pure no-op in that case.
   * ----------------------------------------------------------------------- */
  // Cheer pose for the top ranks, idle pose otherwise.
  function mascotPoseFor(rank) {
    return (rank === 'S' || rank === 'A') ? 'mascot-cheer' : 'mascot';
  }

  // Draw the mascot with its top-left corner at (x, y), `target` px tall.
  // Silent no-op unless ArcadeIcons is present and knows the pose.
  function drawMascot(ctx, rank, x, y, target) {
    try {
      var icons = window.ArcadeIcons;
      if (!icons || typeof icons.drawOnCanvas !== 'function') return;
      var pose = mascotPoseFor(rank);
      if (!icons.has(pose)) pose = 'mascot';
      if (!icons.has(pose)) return;
      var grid = (typeof icons.size === 'function' && icons.size(pose)) || 24;
      // Integer scale keeps the pixel art crisp (24×24 grid → scale 6 = 144px).
      var scale = Math.max(1, Math.floor(target / grid));
      icons.drawOnCanvas(ctx, pose, x, y, scale);
    } catch (err) { /* cosmetic only — never let the mascot break a card */ }
  }

  /* One-shot lazy load of arcade-icons.js at share time. Derives the URL
     from this module's own script src (same directory), injects a script
     tag, and waits at most ~1.5s. Resolves either way; totally silent on
     failure — lesson pages where the file 404s just get the classic card. */
  var iconsLoadPromise = null;
  function ensureArcadeIcons() {
    if (window.ArcadeIcons) return Promise.resolve(true);
    if (iconsLoadPromise) return iconsLoadPromise;
    iconsLoadPromise = new Promise(function (resolve) {
      try {
        if (!SCRIPT_SRC || !/share-score\.js/.test(SCRIPT_SRC)) { resolve(false); return; }
        var url = SCRIPT_SRC.replace(/share-score\.js[^\/]*$/, 'arcade-icons.js');
        var s = document.createElement('script');
        var done = false;
        var finish = function () {
          if (done) return;
          done = true;
          resolve(!!window.ArcadeIcons);
        };
        var t = setTimeout(finish, 1500);
        s.onload = function () { clearTimeout(t); finish(); };
        s.onerror = function () { clearTimeout(t); finish(); };
        s.src = url;
        (document.head || document.documentElement).appendChild(s);
      } catch (err) { resolve(false); }
    });
    return iconsLoadPromise;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y,     x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x,     y + h, r);
    ctx.arcTo(x,     y + h, x,     y,     r);
    ctx.arcTo(x,     y,     x + w, y,     r);
    ctx.closePath();
  }

  function drawCornerBrackets(ctx, x, y, w, h, len) {
    const ends = [
      [x,     y,     +1, +1],
      [x + w, y,     -1, +1],
      [x,     y + h, +1, -1],
      [x + w, y + h, -1, -1],
    ];
    ends.forEach(([cx, cy, dx, dy]) => {
      ctx.beginPath();
      ctx.moveTo(cx + dx * len, cy);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx, cy + dy * len);
      ctx.stroke();
    });
  }

  // Deterministic pseudo-random so the same star pattern renders every time.
  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function drawStars(ctx, count, seed, w, h) {
    const rand = mulberry32(seed);
    const fieldW = w || CARD_SIZE, fieldH = h || CARD_SIZE;
    for (let i = 0; i < count; i++) {
      const x = rand() * fieldW;
      const y = rand() * fieldH;
      const size = 0.5 + rand() * 2.2;
      const bright = rand();
      ctx.fillStyle = bright > 0.7 ? PAL.star : PAL.starDim;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      // Occasional cross-sparkle
      if (bright > 0.92) {
        ctx.strokeStyle = PAL.starDim;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(x - size * 3, y); ctx.lineTo(x + size * 3, y);
        ctx.moveTo(x, y - size * 3); ctx.lineTo(x, y + size * 3);
        ctx.stroke();
      }
    }
  }

  // Velvet "V" badge — rounded square with teal→purple gradient + white V.
  function drawVelvetBadge(ctx, x, y, size) {
    // Soft outer glow
    ctx.save();
    ctx.shadowColor = PAL.vPurple;
    ctx.shadowBlur = 24;
    // Rounded square
    const r = size * 0.22;
    const grad = ctx.createLinearGradient(x, y, x + size, y + size);
    grad.addColorStop(0,    PAL.vTeal);
    grad.addColorStop(0.55, PAL.vMid);
    grad.addColorStop(1,    PAL.vPurple);
    ctx.fillStyle = grad;
    roundRect(ctx, x, y, size, size, r);
    ctx.fill();
    ctx.restore();
    // V letter (serif white)
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '900 ' + Math.round(size * 0.7) + 'px ' + SERIF;
    ctx.fillText('V', x + size / 2, y + size / 2 + size * 0.04);
    ctx.textBaseline = 'alphabetic';
  }

  // Rank stamp — a big rotated "graded" badge: dark disc, double yellow ring,
  // huge white serif letter with a yellow glow. Drawn last over the score
  // panel's top-right corner so it reads as stamped on top. Intentionally
  // allowed to overlap the panel border (that's the stamp effect); typical
  // scores are centred and never reach under it.
  function drawRankStamp(ctx, letter, cx, cy) {
    const R = 108;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-12 * Math.PI / 180);
    // Disc with a soft yellow glow
    ctx.shadowColor = 'rgba(255,210,77,0.55)';
    ctx.shadowBlur = 30;
    ctx.fillStyle = 'rgba(13,10,48,0.94)';
    ctx.beginPath();
    ctx.arc(0, 0, R, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    // Outer ring (chunky) + inner ring (thin) = rubber-stamp look
    ctx.strokeStyle = PAL.yellow;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(0, 0, R - 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,210,77,0.55)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, R - 22, 0, Math.PI * 2);
    ctx.stroke();
    // "RANK" caption
    ctx.textAlign = 'center';
    ctx.fillStyle = PAL.yellow;
    ctx.font = '900 17px ' + MONO;
    ctx.fillText('R A N K', 0, -54);
    // The letter itself — the hero of the stamp
    ctx.shadowColor = PAL.yellow;
    ctx.shadowBlur = 34;
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'middle';
    ctx.font = '900 132px ' + SERIF;
    ctx.fillText(letter, 0, 22);
    ctx.textBaseline = 'alphabetic';
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  // Marquee headline: chunky yellow with thick black outline + magenta drop
  // shadow. Wraps to two lines for multi-word names ("Two Truths One Lie")
  // and shrinks to fit a maximum width. Goes BIG by default because this is
  // the hero of the share card.
  function drawMarqueeHeadline(ctx, text, cx, baseY) {
    const MAX_WIDTH = CARD_SIZE - 130;
    let lines = [text];
    let size = 130;  // start big; shrink only if needed
    ctx.font = '900 ' + size + 'px ' + ARCADE_HEAD;
    if (ctx.measureText(text).width > MAX_WIDTH) {
      const words = text.split(' ');
      if (words.length > 1) {
        const mid = Math.ceil(words.length / 2);
        lines = [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
      }
    }
    // Shrink-to-fit on the widest line — but don't go below 60 so the
    // headline always reads as the dominant element.
    while (size > 60) {
      ctx.font = '900 ' + size + 'px ' + ARCADE_HEAD;
      if (Math.max.apply(Math, lines.map(function (l) { return ctx.measureText(l).width; })) <= MAX_WIDTH) break;
      size -= 6;
    }
    const lineH = Math.round(size * 0.95);
    const startY = baseY - ((lines.length - 1) * lineH) / 2;
    ctx.textAlign = 'center';
    lines.forEach(function (line, i) {
      const y = startY + i * lineH;
      // Magenta drop shadow — 4px at slightly lowered alpha reads as a neon
      // glow; the old 7px offset read as misregistered print.
      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = PAL.magenta;
      ctx.fillText(line, cx + 4, y + 4);
      ctx.restore();
      // Black outline (thick stroke)
      ctx.lineWidth = Math.max(8, size * 0.095);
      ctx.strokeStyle = '#1a0a00';
      ctx.lineJoin = 'round';
      ctx.miterLimit = 2;
      ctx.strokeText(line, cx, y);
      // Yellow fill
      ctx.fillStyle = PAL.yellow;
      ctx.fillText(line, cx, y);
      // Bright highlight along the upper half (gradient feel)
      const grad = ctx.createLinearGradient(0, y - size, 0, y + size * 0.3);
      grad.addColorStop(0, '#fff5b2');
      grad.addColorStop(1, 'rgba(255,210,77,0)');
      ctx.fillStyle = grad;
      ctx.fillText(line, cx, y);
    });
  }

  // Marquee score: same outline+fill treatment, but BIG so the score
  // dominates the panel — that's what the student is screenshotting to flex.
  function drawMarqueeScore(ctx, text, cx, baseY, maxWidth) {
    let size = 260;
    ctx.font = '900 ' + size + 'px ' + ARCADE_HEAD;
    while (size > 80 && ctx.measureText(text).width > maxWidth) {
      size -= 12;
      ctx.font = '900 ' + size + 'px ' + ARCADE_HEAD;
    }
    ctx.textAlign = 'center';
    // Drop shadow — 4px neon offset (8px read as a rendering glitch)
    ctx.save();
    ctx.globalAlpha = 0.85;
    ctx.fillStyle = PAL.magenta;
    ctx.fillText(text, cx + 4, baseY + 4);
    ctx.restore();
    // Outline
    ctx.lineWidth = Math.max(10, size * 0.08);
    ctx.strokeStyle = '#1a0a00';
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
    ctx.strokeText(text, cx, baseY);
    // Yellow fill
    ctx.fillStyle = PAL.yellow;
    ctx.fillText(text, cx, baseY);
    // Highlight gradient
    const grad = ctx.createLinearGradient(0, baseY - size, 0, baseY + size * 0.2);
    grad.addColorStop(0, '#fff5b2');
    grad.addColorStop(1, 'rgba(255,210,77,0)');
    ctx.fillStyle = grad;
    ctx.fillText(text, cx, baseY);
  }

  /* ----------------------------------------------------------------------- *
   * Plain-text caption that rides alongside the image in the share sheet
   * ----------------------------------------------------------------------- */
  function buildShareText(opts) {
    if (opts.shareText) return String(opts.shareText);
    const lines = [];
    const titleBits = [
      [opts.level, opts.subject].filter(Boolean).join(' '),
      opts.gameName,
    ].filter(Boolean);
    if (titleBits.length) lines.push(titleBits.join(' · '));
    if (opts.score != null) {
      const s = String(opts.score) + (opts.total != null ? '/' + opts.total : '');
      lines.push('Score: ' + s + (opts.rank ? '  ·  Rank ' + opts.rank : ''));
    }
    lines.push('Beat me 👇');
    return lines.join('\n');
  }

  /* ----------------------------------------------------------------------- *
   * Toast — used by the desktop fallback to confirm "image saved / link copied"
   * ----------------------------------------------------------------------- */
  function showToast(msg) {
    const t = document.createElement('div');
    t.textContent = msg;
    t.setAttribute('role', 'status');
    t.style.cssText =
      'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);' +
      'background:linear-gradient(135deg,#1a1340 0%,#0d0a30 100%);' +
      'color:#5cffe4;padding:14px 22px;' +
      'border:2px solid #7e6dff;border-radius:10px;' +
      'font-family:ui-monospace,Menlo,Consolas,monospace;' +
      'font-size:14px;letter-spacing:0.5px;z-index:99999;' +
      'box-shadow:0 8px 36px rgba(126,109,255,0.45);' +
      'opacity:0;transition:opacity 0.2s ease;max-width:90vw;text-align:center;';
    document.body.appendChild(t);
    requestAnimationFrame(() => { t.style.opacity = '1'; });
    setTimeout(() => {
      t.style.opacity = '0';
      setTimeout(() => t.remove(), 250);
    }, 3200);
  }
  // Re-export so consumers can fire toasts elsewhere too.
  if (!Arcade.toast) Arcade.toast = showToast;

  /* ----------------------------------------------------------------------- *
   * Fallback — download PNG + clipboard URL when native share isn't available
   * ----------------------------------------------------------------------- */
  async function fallbackDownloadAndCopy(blob, linkUrl, opts) {
    opts = opts || {};
    const filename  = opts.filename  || 'aism-score.png';
    const linkLabel = opts.linkLabel || 'Challenge link';
    let downloaded = false, copied = false;
    if (blob) {
      try {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
        downloaded = true;
      } catch (err) { /* swallow */ }
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(linkUrl);
        copied = true;
      }
    } catch (err) { /* swallow — likely permissions */ }

    showToast(
      downloaded && copied ? 'Image saved. ' + linkLabel + ' copied — paste in any chat.'
      : downloaded ? 'Image saved. Drag it into a chat to share.'
      : copied ? linkLabel + ' copied — paste in any chat.'
      : 'Share unavailable in this browser.'
    );
    return { method: 'fallback', downloaded, copied };
  }

  /* ----------------------------------------------------------------------- *
   * Unified native-share path — the single place that talks to
   * navigator.share, shared by shareScore and shareElement. Sends the card
   * image(s) + caption and NEVER a separate `url` field: a `url` alongside a
   * file makes WhatsApp/iMessage unfurl a second link-preview card next to the
   * image (the "scrappy double"). The link lives in the caption text instead,
   * where it stays tappable. Falls back to download + clipboard on desktop /
   * unsupported browsers. Fixing the double here fixes it for both share types.
   * ----------------------------------------------------------------------- */
  async function nativeShareOrFallback(files, captionText, primaryBlob, fallbackUrl, opts) {
    if (navigator.canShare && navigator.canShare({ files: files }) && navigator.share) {
      try {
        await navigator.share({ files: files, text: captionText });
        return { method: 'native-share', ok: true, cards: files.length };
      } catch (err) {
        if (err && err.name === 'AbortError') {
          return { method: 'native-share', ok: false, cancelled: true };
        }
        // fall through to fallback so the user still gets something usable
      }
    }
    return fallbackDownloadAndCopy(primaryBlob, fallbackUrl, opts);
  }

  /* ----------------------------------------------------------------------- *
   * Public: Arcade.shareScore
   * ----------------------------------------------------------------------- */
  Arcade.shareScore = async function (opts) {
    if (!opts || typeof opts !== 'object') return { ok: false, error: 'no-opts' };

    const challengeUrl = buildChallengeUrl(opts);
    // The challenge link rides INSIDE the caption text, not in a separate
    // navigator.share `url` field. When a share carries both an image file and a
    // `url`, WhatsApp/iMessage post the image AND unfurl the url into its own
    // link-preview card (the game page carries og:image), so the recipient gets
    // two visuals for one share — the "scrappy" double. A link inside a media
    // caption stays tappable, preserving the ?from=share challenge deep-link and
    // UTMs that maybeShowChallenge reads, without spawning that second preview.
    const text = buildShareText(opts) + '\n' + challengeUrl;

    // Mascot library — one lazy-load attempt at share time (never at page
    // load). Cosmetic: proceed with or without it, in total silence.
    try { await ensureArcadeIcons(); } catch (err) { /* swallow */ }

    let blob = null;
    try {
      blob = await drawCard(opts);
    } catch (err) {
      console.warn('[shareScore] canvas/toBlob failed:', err);
      // No image — at minimum copy the URL.
      return fallbackDownloadAndCopy(null, challengeUrl);
    }

    // A chat share sends the square card ONLY. The 9:16 story card is a
    // different medium (IG/Snap stories); attaching it to a chat share just
    // drops a second, redundant image into the thread. A caller that genuinely
    // targets a story can opt in with opts.includeStory — and even then the
    // story only rides along when the share target accepts both files.
    const file = new File([blob], 'aism-score.png', { type: 'image/png' });
    let files = [file];
    if (opts.includeStory) {
      try {
        const storyBlob = await drawStoryCard(opts);
        if (storyBlob) {
          const storyFile = new File([storyBlob], 'aism-score-story.png', { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file, storyFile] })) {
            files = [file, storyFile];
          }
        }
      } catch (err) { files = [file]; }
    }

    // Single unified payload path — image(s) + caption, never a separate `url`.
    return nativeShareOrFallback(files, text, blob, challengeUrl);
  };

  /* ----------------------------------------------------------------------- *
   * Public: Arcade.shareElement — the collection counterpart to shareScore.
   * Renders a personalised element card and shares it through the SAME unified
   * payload path (image + caption, no separate `url`), so the periodic-arcade
   * element share is now a real flex image in the chat instead of a bare link,
   * and inherits the double-preview fix automatically.
   *
   * opts: { sym, name, atomicNumber, mass, state, categoryLabel, categoryColor,
   *         fact, by, ownedCount, total, url, shareText }
   *   url      — the shared.html landing link (rides in the caption)
   *   by       — the sharer's username, stamped on the card
   *   shareText— optional caption override
   * ----------------------------------------------------------------------- */
  Arcade.shareElement = async function (opts) {
    if (!opts || typeof opts !== 'object') return { ok: false, error: 'no-opts' };

    const url = opts.url || (typeof location !== 'undefined' ? location.href : '');
    const name = opts.name || 'an element';
    const total = opts.total || 118;
    const caption = opts.shareText || (
      '🧪 I just unlocked ' + name + ' on the Revision Arcade'
      + (opts.ownedCount != null ? ' — ' + opts.ownedCount + '/' + total + ' collected!' : '!')
      + ' Can you?'
    );
    // Link in the caption, not a separate share `url` field (see nativeShareOrFallback).
    const text = caption + '\n' + url;

    let blob = null;
    try {
      blob = await drawElementCard(opts);
    } catch (err) {
      console.warn('[shareElement] canvas/toBlob failed:', err);
      return fallbackDownloadAndCopy(null, url, { linkLabel: 'Collection link' });
    }

    const file = new File([blob], 'aism-element.png', { type: 'image/png' });
    return nativeShareOrFallback([file], text, blob, url, {
      filename: 'aism-element.png', linkLabel: 'Collection link'
    });
  };

  /* ----------------------------------------------------------------------- *
   * Public: Arcade.maybeShowChallenge — landing banner for ?from=share visits
   * ----------------------------------------------------------------------- */
  Arcade.maybeShowChallenge = function (cfg) {
    const p = new URLSearchParams(location.search);
    if (p.get('from') !== 'share') return;
    const s = p.get('s'), t = p.get('t'), subj = p.get('subj'), level = p.get('level');
    if (s == null) return;
    if (document.getElementById('aism-challenge-banner')) return;

    const mount = (cfg && cfg.mountBefore) || document.getElementById('root');
    if (!mount || !mount.parentNode) return;

    const subjectLabel = [level, subj].filter(Boolean).join(' ').trim();
    const scoreLabel = t ? s + '/' + t : s;

    const banner = document.createElement('div');
    banner.id = 'aism-challenge-banner';
    banner.style.cssText =
      'background:linear-gradient(135deg,#1a1340 0%,#0d0a30 100%);' +
      'border:2px solid #7e6dff;border-radius:14px;padding:18px 24px;' +
      'margin:calc(var(--nav-h, 68px) + 16px) auto 18px;max-width:760px;color:#ece8ff;' +
      'font-family:ui-monospace,Menlo,Consolas,monospace;' +
      'box-shadow:0 10px 36px rgba(126,109,255,0.32);' +
      'display:flex;align-items:center;gap:14px;flex-wrap:wrap;';
    banner.innerHTML =
      '<span style="font-size:26px;line-height:1;">⚔️</span>' +
      '<span style="font-weight:600;letter-spacing:0.4px;flex:1;min-width:200px;font-size:15px;">' +
        '<span style="color:#ff5fa2;font-family:inherit;font-weight:900;letter-spacing:1.2px;font-size:11px;text-transform:uppercase;display:block;margin-bottom:4px;">Incoming challenge</span>' +
        'Your mate scored <b style="color:#ffd24d;font-size:1.15em;">' +
        escapeHtml(scoreLabel) + '</b>' +
        (subjectLabel ? ' on <b style="color:#5cffe4;">' + escapeHtml(subjectLabel) + '</b>' : '') +
      ' — beat them.</span>' +
      '<button id="aism-challenge-dismiss" type="button" aria-label="Dismiss challenge banner" ' +
        'style="background:none;border:1px solid #7e6dff;color:#5cffe4;border-radius:8px;' +
        'padding:8px 12px;font-family:inherit;font-size:11px;letter-spacing:1.2px;cursor:pointer;font-weight:700;">' +
        'DISMISS</button>';
    mount.parentNode.insertBefore(banner, mount);
    const dismiss = document.getElementById('aism-challenge-dismiss');
    dismiss.addEventListener('click', () => banner.remove());
  };

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ----------------------------------------------------------------------- *
   * Auto-init — arcade game pages include this module via a plain script tag
   * with no inline wiring, so show the challenge banner automatically.
   * Safe everywhere: maybeShowChallenge no-ops unless the URL carries
   * ?from=share, and it never mounts twice, so lesson pages that already
   * call it explicitly are unaffected.
   * ----------------------------------------------------------------------- */
  function autoInit() {
    try { Arcade.maybeShowChallenge(); } catch (err) { /* swallow */ }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
})();
