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
  // System monospaced + serif stacks — same-origin, no @font-face needed.
  const MONO  = '"SF Mono", Menlo, Consolas, "Liberation Mono", "Courier New", monospace';
  const SERIF = '"Times New Roman", Georgia, serif';

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
   * Card renderer — mock console-screen aesthetic
   * ----------------------------------------------------------------------- */
  // Returns Promise<Blob>. Throws on canvas/toBlob failure.
  async function drawCard(opts) {
    const c = document.createElement('canvas');
    c.width = CARD_SIZE;
    c.height = CARD_SIZE;
    const ctx = c.getContext('2d');

    // 1. Backdrop — dark CRT phosphor gradient
    const bg = ctx.createLinearGradient(0, 0, 0, CARD_SIZE);
    bg.addColorStop(0, '#0a1108');
    bg.addColorStop(1, '#050a04');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, CARD_SIZE, CARD_SIZE);

    // 2. Soft phosphor glow vignette under the centre
    const v = ctx.createRadialGradient(540, 600, 100, 540, 600, 720);
    v.addColorStop(0, 'rgba(0,255,102,0.10)');
    v.addColorStop(1, 'rgba(0,255,102,0)');
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, CARD_SIZE, CARD_SIZE);

    // 3. Frame: outer thick border + inner hairline, with corner brackets
    ctx.strokeStyle = '#00ff66';
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 40, CARD_SIZE - 80, CARD_SIZE - 80);
    ctx.strokeStyle = 'rgba(0,255,102,0.32)';
    ctx.lineWidth = 1;
    ctx.strokeRect(60, 60, CARD_SIZE - 120, CARD_SIZE - 120);

    ctx.strokeStyle = '#00ff66';
    ctx.lineWidth = 5;
    const BL = 60; // bracket arm length
    const cor = [
      [60, 60,  +1, +1], [CARD_SIZE - 60, 60,  -1, +1],
      [60, CARD_SIZE - 60, +1, -1], [CARD_SIZE - 60, CARD_SIZE - 60, -1, -1],
    ];
    cor.forEach(([x, y, dx, dy]) => {
      ctx.beginPath();
      ctx.moveTo(x + dx * BL, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + dy * BL);
      ctx.stroke();
    });

    // 4. Header — terminal banner
    ctx.fillStyle = '#00ff66';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.font = '700 30px ' + MONO;
    ctx.fillText('AISM ARCADE :: SCORE TRANSMISSION', CARD_SIZE / 2, 135);

    ctx.font = '500 18px ' + MONO;
    ctx.fillStyle = 'rgba(0,255,102,0.55)';
    ctx.fillText('▌▌  THE VELVET ARCADE  ▐▐', CARD_SIZE / 2, 170);

    // 5. Game / Subject / Topic readout — left-aligned terminal lines
    ctx.textAlign = 'left';
    ctx.font = '500 24px ' + MONO;
    const padX = 120;
    let cy = 240;
    function readout(label, value) {
      if (value == null || value === '') return;
      ctx.fillStyle = 'rgba(0,255,102,0.55)';
      ctx.fillText('> ' + label, padX, cy);
      ctx.fillStyle = '#a8ffc4';
      const labelW = ctx.measureText('> ' + label + '  ').width + 200;
      // Truncate value if it would exceed available width
      const maxW = CARD_SIZE - padX - 120 - labelW;
      let v = String(value);
      while (v.length > 4 && ctx.measureText(v).width > maxW) v = v.slice(0, -1);
      if (v.length < String(value).length) v = v.slice(0, -1) + '…';
      ctx.fillText(v, padX + labelW, cy);
      cy += 38;
    }
    readout('GAME    :', opts.gameName);
    readout('SUBJECT :', [opts.level, opts.subject].filter(Boolean).join(' '));
    readout('TOPIC   :', opts.topic);

    // 6. Score panel — central framed display
    const panelX = 140, panelY = 410, panelW = CARD_SIZE - 280, panelH = 290;
    ctx.fillStyle = 'rgba(0,255,102,0.06)';
    ctx.fillRect(panelX, panelY, panelW, panelH);
    ctx.strokeStyle = '#00ff66';
    ctx.lineWidth = 2;
    ctx.strokeRect(panelX, panelY, panelW, panelH);
    // dotted inner edge
    ctx.setLineDash([4, 6]);
    ctx.strokeStyle = 'rgba(0,255,102,0.35)';
    ctx.lineWidth = 1;
    ctx.strokeRect(panelX + 10, panelY + 10, panelW - 20, panelH - 20);
    ctx.setLineDash([]);

    // Big score number — shrink-to-fit
    ctx.fillStyle = '#00ff66';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,255,102,0.7)';
    ctx.shadowBlur = 24;
    const scoreText = (opts.score != null)
      ? (opts.total != null ? String(opts.score) + '/' + String(opts.total) : String(opts.score))
      : '—';
    let size = 200;
    do {
      ctx.font = '900 ' + size + 'px ' + MONO;
      if (ctx.measureText(scoreText).width <= panelW - 60) break;
      size -= 12;
    } while (size > 60);
    ctx.fillText(scoreText, CARD_SIZE / 2, panelY + 175);
    ctx.shadowBlur = 0;

    // Label under the score
    ctx.font = '600 22px ' + MONO;
    ctx.fillStyle = 'rgba(0,255,102,0.75)';
    ctx.fillText((opts.bigLabel || 'SCORE').toUpperCase(), CARD_SIZE / 2, panelY + 235);

    // 7. Rank letter — serif, glow
    if (opts.rank) {
      ctx.shadowColor = '#00ff66';
      ctx.shadowBlur = 36;
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.font = '900 140px ' + SERIF;
      ctx.fillText(String(opts.rank), CARD_SIZE / 2, 800);
      ctx.shadowBlur = 0;
      if (opts.rankLine) {
        ctx.fillStyle = 'rgba(0,255,102,0.75)';
        ctx.font = '500 22px ' + MONO;
        const line = String(opts.rankLine);
        const safe = line.length > 56 ? line.slice(0, 55) + '…' : line;
        ctx.fillText(safe, CARD_SIZE / 2, 838);
      }
    }

    // 8. Stat ribbon (optional)
    if (opts.statLine) {
      ctx.fillStyle = 'rgba(0,255,102,0.92)';
      ctx.font = '600 22px ' + MONO;
      ctx.textAlign = 'center';
      const sl = String(opts.statLine);
      const safe = sl.length > 64 ? sl.slice(0, 63) + '…' : sl;
      ctx.fillText(safe, CARD_SIZE / 2, 890);
    }

    // 9. Footer — challenge prompt + watermark
    ctx.fillStyle = '#00ff66';
    ctx.font = '700 26px ' + MONO;
    ctx.textAlign = 'center';
    ctx.fillText('> CHALLENGE_REPLY :: BEAT THIS SCORE', CARD_SIZE / 2, 970);

    ctx.fillStyle = 'rgba(0,255,102,0.65)';
    ctx.font = '500 20px ' + MONO;
    ctx.fillText('aistudymethod.co.uk  ·  The Velvet Method™', CARD_SIZE / 2, 1010);

    // 10. Scanline overlay — reinforces CRT feel without drowning the text
    ctx.fillStyle = 'rgba(0,0,0,0.16)';
    for (let y = 0; y < CARD_SIZE; y += 3) {
      ctx.fillRect(0, y, CARD_SIZE, 1);
    }

    const blob = await new Promise(resolve => c.toBlob(resolve, 'image/png', 0.95));
    if (!blob) throw new Error('toBlob returned null');
    return blob;
  }

  /* ----------------------------------------------------------------------- *
   * Plain-text caption that rides alongside the image in the share sheet
   * ----------------------------------------------------------------------- */
  function buildShareText(opts) {
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
      'background:#0a1108;color:#00ff66;padding:14px 22px;' +
      'border:2px solid #00ff66;border-radius:8px;' +
      'font-family:ui-monospace,Menlo,Consolas,monospace;' +
      'font-size:14px;letter-spacing:0.5px;z-index:99999;' +
      'box-shadow:0 0 24px rgba(0,255,102,0.4);' +
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
      'background:linear-gradient(135deg,#0a1108 0%,#112c14 100%);' +
      'border:2px solid #00ff66;border-radius:12px;padding:16px 22px;' +
      'margin:0 auto 18px;max-width:760px;color:#88ffaa;' +
      'font-family:ui-monospace,Menlo,Consolas,monospace;' +
      'box-shadow:0 0 24px rgba(0,255,102,0.18);' +
      'display:flex;align-items:center;gap:14px;flex-wrap:wrap;';
    banner.innerHTML =
      '<span style="font-size:22px;line-height:1;">⚔️</span>' +
      '<span style="font-weight:600;letter-spacing:0.5px;flex:1;min-width:200px;">' +
        'Your mate scored <b style="color:#00ff66;font-size:1.1em;">' +
        escapeHtml(scoreLabel) + '</b>' +
        (subjectLabel ? ' on <b style="color:#fff;">' + escapeHtml(subjectLabel) + '</b>' : '') +
      ' — beat them.</span>' +
      '<button id="aism-challenge-dismiss" type="button" aria-label="Dismiss challenge banner" ' +
        'style="background:none;border:1px solid #00ff66;color:#00ff66;border-radius:6px;' +
        'padding:6px 10px;font-family:inherit;font-size:11px;letter-spacing:1px;cursor:pointer;">' +
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
