/* ============================================================
   AI Study Method — Shared utilities for View-stage engines
   ============================================================ */

window.VW = (function(){

  /* ── Synth audio (shared 'aism-muted' preference site-wide) ── */
  const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sfx = (() => {
    let actx = null, master = null;
    let muted = false;
    try { muted = localStorage.getItem('aism-muted') === '1'; } catch (e) {}
    function ensure() {
      try {
        if (!actx) {
          const AC = window.AudioContext || window.webkitAudioContext;
          if (!AC) return false;
          actx = new AC();
          master = actx.createGain();
          master.gain.value = 0.3;
          master.connect(actx.destination);
        }
        if (actx.state === 'suspended') actx.resume();
        return true;
      } catch (e) { return false; }
    }
    function tone(freq, dur, type, vol, endFreq) {
      if (muted || !ensure()) return;
      try {
        const t0 = actx.currentTime;
        const o = actx.createOscillator(), g = actx.createGain();
        o.type = type || 'sine';
        o.frequency.setValueAtTime(freq, t0);
        if (endFreq) o.frequency.exponentialRampToValueAtTime(Math.max(30, endFreq), t0 + dur);
        g.gain.setValueAtTime(vol || 0.12, t0);
        g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
        o.connect(g); g.connect(master);
        o.start(t0); o.stop(t0 + dur + 0.02);
      } catch (e) {}
    }
    return {
      unlock() { ensure(); },
      isMuted() { return muted; },
      toggleMute() {
        muted = !muted;
        try { localStorage.setItem('aism-muted', muted ? '1' : '0'); } catch (e) {}
        return muted;
      },
      ok()      { tone(587, 0.08, 'sine', 0.11); setTimeout(() => tone(740, 0.1, 'sine', 0.1), 70); },
      bad()     { tone(220, 0.16, 'sawtooth', 0.06, 160); },
      fanfare() { tone(523, 0.1, 'triangle', 0.13); setTimeout(() => tone(659, 0.1, 'triangle', 0.13), 100); setTimeout(() => tone(784, 0.2, 'triangle', 0.13), 200); },
    };
  })();

  function confetti() {
    if (REDUCED) return;
    let style = document.getElementById('vw-confetti-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'vw-confetti-style';
      style.textContent = '@keyframes vwConfettiFall{from{transform:translateY(-10vh) rotate(0)}to{transform:translateY(110vh) rotate(720deg)}}.vw-confetti{position:fixed;top:0;width:8px;height:12px;z-index:950;pointer-events:none;animation:vwConfettiFall linear both;}';
      document.head.appendChild(style);
    }
    const colours = ['#4ade9a', '#7b6fff', '#ffd166', '#ff5a5f', '#5ac8ff'];
    for (let i = 0; i < 40; i++) {
      const c = document.createElement('div');
      c.className = 'vw-confetti';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = colours[i % colours.length];
      c.style.animationDuration = (1.6 + Math.random() * 1.4) + 's';
      c.style.animationDelay = (Math.random() * 0.5) + 's';
      c.style.borderRadius = Math.random() < 0.5 ? '50%' : '2px';
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 3600);
    }
  }

  /* Mute button + audio unlock on first gesture */
  (function muteBtn() {
    function add() {
      if (document.getElementById('aism-mute')) return;
      const b = document.createElement('button');
      b.id = 'aism-mute';
      b.type = 'button';
      b.title = 'Toggle sound (M)';
      b.textContent = sfx.isMuted() ? '🔇' : '🔊';
      b.style.cssText = 'position:fixed;bottom:14px;right:14px;z-index:900;background:rgba(26,29,39,0.92);border:1px solid rgba(255,255,255,0.16);color:#e8eaf0;border-radius:10px;padding:8px 11px;font-size:15px;cursor:pointer;line-height:1;';
      b.addEventListener('click', () => { b.textContent = sfx.toggleMute() ? '🔇' : '🔊'; });
      document.body.appendChild(b);
    }
    if (document.body) add(); else window.addEventListener('DOMContentLoaded', add);
    document.addEventListener('keydown', e => {
      if ((e.key === 'm' || e.key === 'M') && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const b = document.getElementById('aism-mute');
        if (b) b.click();
      }
    });
    ['pointerdown', 'keydown', 'touchstart'].forEach(ev =>
      document.addEventListener(ev, () => sfx.unlock(), { once: true, capture: true }));
  })();

  function qs() {
    const o = {};
    const s = window.location.search.slice(1);
    s.split('&').forEach(p => {
      if (!p) return;
      const [k,v] = p.split('=');
      o[decodeURIComponent(k)] = decodeURIComponent((v||'').replace(/\+/g,' '));
    });
    return o;
  }

  async function loadCurriculum() {
    const params = qs();
    const subject = params.subject || 'biology';
    const level   = params.level   || 'gcse';
    const url = `curricula/${subject}-${level}.json`;
    try {
      const r = await fetch(url, { cache: 'no-cache' });
      if (!r.ok) throw new Error('Curriculum not found: ' + r.status);
      const c = await r.json();
      c._params = { subject, level };
      return c;
    } catch (e) {
      throw e;
    }
  }

  function setMeta(curriculum, engineName, engineBlurb) {
    document.getElementById('vw-crumb').textContent = `${curriculum.subjectDisplay} · ${curriculum.levelDisplay}`;
    document.getElementById('vw-title').textContent = `${curriculum.subjectDisplay} — ${engineName}`;
    document.getElementById('vw-sub').textContent = engineBlurb;
    document.title = `${curriculum.subjectDisplay} ${curriculum.levelDisplay} — ${engineName} — AI Study Method`;
  }

  function toast(text, kind) {
    const t = document.getElementById('vw-toast');
    if (!t) return;
    t.textContent = text;
    t.className = 'vw-toast show ' + (kind || '');
    if (kind === 'ok') sfx.ok();
    else if (kind === 'bad') sfx.bad();
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 2000);
  }

  function showEnd(emoji, title, stats) {
    const end = document.getElementById('vw-end');
    if (!end) return;
    document.getElementById('vw-end-emoji').textContent = emoji;
    document.getElementById('vw-end-title').textContent = title;
    const sd = document.getElementById('vw-end-stats');
    sd.innerHTML = '';
    (stats || []).forEach(s => {
      const el = document.createElement('div');
      el.className = 'vw-end-stat';
      el.innerHTML = `<div class="vw-end-stat-num">${s.value}</div><div class="vw-end-stat-label">${s.label}</div>`;
      sd.appendChild(el);
    });
    end.classList.add('visible');
    sfx.fanfare();
    confetti();
  }

  function hideEnd() {
    const end = document.getElementById('vw-end');
    if (end) end.classList.remove('visible');
  }

  function shuffle(a) {
    const r = a.slice();
    for (let i = r.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [r[i], r[j]] = [r[j], r[i]];
    }
    return r;
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function renderState(kind, msg) {
    const stage = document.querySelector('.vw-stage');
    if (!stage) return;
    if (kind === 'loading') {
      stage.innerHTML = `<div class="vw-state"><div class="spinner"></div><div class="msg">${esc(msg||'Loading curriculum…')}</div></div>`;
    } else if (kind === 'error') {
      stage.innerHTML = `<div class="vw-state"><div style="font-size:34px">🤔</div><div class="msg err">${esc(msg||'Could not load curriculum.')}</div><div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center"><button class="vw-btn primary" onclick="location.reload()">↻ Try again</button><a class="vw-btn" href="../../subjects.html">← Back to subjects</a></div></div>`;
    }
  }

  return { qs, loadCurriculum, setMeta, toast, showEnd, hideEnd, shuffle, esc, renderState, sfx, confetti };
})();
