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
 *       Builds the card image, attempts navigator.share({files,text,url}).
 *       Desktop / unsupported browsers: downloads the PNG + copies a challenge
 *       URL to the clipboard with a toast confirmation.
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
  // Subjects Arcade palette — pulled from the live marquee
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
   * Card renderer — Subjects Arcade marquee aesthetic
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
    ctx.fillText('THE VELVET METHOD™', headerStartX + badgeSize + 18, badgeY + 54);
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

    // POINTS label
    ctx.textAlign = 'center';
    ctx.fillStyle = PAL.magenta;
    ctx.font = '900 22px ' + MONO;
    ctx.fillText((opts.bigLabel || 'SCORE').toUpperCase(), W / 2, panelY + 50);

    // Huge yellow score — fills most of the panel
    const scoreText = (opts.score != null)
      ? (opts.total != null ? String(opts.score) + '/' + String(opts.total) : String(opts.score))
      : '—';
    drawMarqueeScore(ctx, scoreText, W / 2, panelY + 200, panelW - 60);

    /* ---------- 9. Rank letter (serif, white, yellow glow) --------------- */
    if (opts.rank) {
      ctx.shadowColor = PAL.yellow;
      ctx.shadowBlur = 38;
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.font = '900 100px ' + SERIF;
      ctx.fillText(String(opts.rank), W / 2, 866);
      ctx.shadowBlur = 0;
      if (opts.rankLine) {
        ctx.fillStyle = PAL.cyan;
        ctx.font = '600 18px ' + MONO;
        const line = String(opts.rankLine);
        const safe = line.length > 64 ? line.slice(0, 63) + '…' : line;
        ctx.fillText(safe, W / 2, 898);
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

    ctx.fillStyle = PAL.cyan;
    ctx.font = '700 18px ' + MONO;
    ctx.fillText('aistudymethod.co.uk', W / 2, 1024);
    ctx.fillStyle = PAL.textDim;
    ctx.font = '500 15px ' + MONO;
    ctx.fillText('· The Velvet Method™ ·', W / 2, 1050);

    const blob = await new Promise(resolve => c.toBlob(resolve, 'image/png', 0.95));
    if (!blob) throw new Error('toBlob returned null');
    return blob;
  }

  /* ----------------------------------------------------------------------- *
   * Helpers
   * ----------------------------------------------------------------------- */
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

  function drawStars(ctx, count, seed) {
    const rand = mulberry32(seed);
    for (let i = 0; i < count; i++) {
      const x = rand() * CARD_SIZE;
      const y = rand() * CARD_SIZE;
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
      // Magenta drop shadow (chunky neon offset)
      ctx.fillStyle = PAL.magenta;
      ctx.fillText(line, cx + 7, y + 7);
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
    // Drop shadow
    ctx.fillStyle = PAL.magenta;
    ctx.fillText(text, cx + 8, baseY + 8);
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
  async function fallbackDownloadAndCopy(blob, challengeUrl) {
    let downloaded = false, copied = false;
    if (blob) {
      try {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'aism-score.png';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
        downloaded = true;
      } catch (err) { /* swallow */ }
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(challengeUrl);
        copied = true;
      }
    } catch (err) { /* swallow — likely permissions */ }

    showToast(
      downloaded && copied ? 'Image saved. Challenge link copied — paste in any chat.'
      : downloaded ? 'Image saved. Drag it into a chat to share.'
      : copied ? 'Challenge link copied — paste in any chat.'
      : 'Share unavailable in this browser.'
    );
    return { method: 'fallback', downloaded, copied };
  }

  /* ----------------------------------------------------------------------- *
   * Public: Arcade.shareScore
   * ----------------------------------------------------------------------- */
  Arcade.shareScore = async function (opts) {
    if (!opts || typeof opts !== 'object') return { ok: false, error: 'no-opts' };

    const challengeUrl = buildChallengeUrl(opts);
    const text = buildShareText(opts);

    let blob = null;
    try {
      blob = await drawCard(opts);
    } catch (err) {
      console.warn('[shareScore] canvas/toBlob failed:', err);
      // No image — at minimum copy the URL.
      return fallbackDownloadAndCopy(null, challengeUrl);
    }

    const file = new File([blob], 'aism-score.png', { type: 'image/png' });

    // Mobile path: native share sheet with file.
    if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
      try {
        await navigator.share({ files: [file], text, url: challengeUrl });
        return { method: 'native-share', ok: true };
      } catch (err) {
        if (err && err.name === 'AbortError') {
          return { method: 'native-share', ok: false, cancelled: true };
        }
        // fall through to fallback so the user still gets something usable
      }
    }
    return fallbackDownloadAndCopy(blob, challengeUrl);
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
})();
