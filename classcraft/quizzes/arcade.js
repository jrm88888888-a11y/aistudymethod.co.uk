/* ==========================================================================
   ARCADE — shared engine for AI Study Method quiz games.
   Zero dependencies. Exposes a single global: window.Arcade

   API
   ---
   Arcade.escapeHtml(s)                  HTML-escape any value
   Arcade.shuffle(arr)                   Fisher-Yates, returns new array
   Arcade.fetchSpecJson(stem, dir)       spec fetch with colon-stem fallback
   Arcade.dayNumber()                    days since epoch (daily seeds)
   Arcade.seededShuffle(arr, seed)       deterministic shuffle (mulberry32)

   Arcade.sfx.correct(streak) .wrong() .click() .tick() .timeup() .coin()
             .riser() .fanfare() .swoosh() .heartbeat()
   Arcade.sfx.muted                      getter/setter, persisted
   Arcade.mountMuteButton()              floating 🔊/🔇 toggle

   Arcade.confettiBurst(opts)            one burst {x, y, count, colors}
   Arcade.confettiRain(ms)               celebratory rain for ms
   Arcade.shake()                        full-page shake
   Arcade.popText(text, x, y, color)     floating "+100" at viewport coords
   Arcade.popTextOver(el, text, color)   same, centred over an element
   Arcade.flashMsg(text, color)          big centre-screen word (NICE! / OOF)
   Arcade.streakCall(n)                  flashMsg for streak milestones
   Arcade.countUp(el, to, ms, suffix)    animated number
   Arcade.vibrate(pattern)               navigator.vibrate, safe no-op

   Arcade.grade(pct) -> {letter, cls, line}
   Arcade.renderEndCard(container, opts) shareable results card; wires buttons
       opts: {gameName, gameEmoji, topic, meta, pct, statHtml(optional),
              big, bigLabel, rows:[{v,l}], emojiGrid, bestKey, bestValue,
              insight, shareLines:[...], onAgain, hot(bool)}
   ========================================================================== */
(function () {
  'use strict';
  const Arcade = {};

  /* ---------------- utils ------------------------------------------------ */
  Arcade.escapeHtml = function (s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  Arcade.shuffle = function (arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  function mulberry32(seed) {
    let t = seed >>> 0;
    return function () {
      t += 0x6D2B79F5;
      let r = Math.imul(t ^ (t >>> 15), 1 | t);
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }
  Arcade.seededShuffle = function (arr, seed) {
    const rnd = mulberry32(seed);
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  Arcade.dayNumber = function () { return Math.floor(Date.now() / 86400000); };

  // Some on-disk stems contain a colon the URL param drops. Try the plain
  // stem first, then every possible colon-insertion before a dash.
  Arcade.stemCandidates = function (stem) {
    const cands = [stem];
    for (let i = 0; i < stem.length; i++) {
      if (stem[i] === '-') cands.push(stem.slice(0, i) + ':' + stem.slice(i));
    }
    return cands;
  };
  Arcade.fetchSpecJson = async function (stem, dir) {
    for (const cand of Arcade.stemCandidates(stem)) {
      try {
        const r = await fetch(dir + '/' + encodeURIComponent(cand) + '.json');
        if (r.ok) return await r.json();
      } catch (e) { /* try next */ }
    }
    return null;
  };

  Arcade.vibrate = function (pattern) {
    try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (e) {}
  };

  /* ---------------- sound: tiny WebAudio synth --------------------------- */
  const MUTE_KEY = 'aism-arcade-muted';
  let ctx = null;
  let muted = false;
  try { muted = localStorage.getItem(MUTE_KEY) === '1'; } catch (e) {}

  function audio() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx;
  }
  // Unlock audio on first gesture (iOS requirement).
  ['pointerdown', 'keydown', 'touchstart'].forEach(ev =>
    document.addEventListener(ev, function unlock() {
      audio();
      document.removeEventListener(ev, unlock);
    }, { once: true, passive: true }));

  function tone(freq, opts) {
    if (muted) return;
    const ac = audio();
    if (!ac) return;
    const o = opts || {};
    const t0 = ac.currentTime + (o.delay || 0);
    const dur = o.dur || 0.12;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = o.type || 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    if (o.glide) osc.frequency.exponentialRampToValueAtTime(o.glide, t0 + dur);
    const vol = o.vol || 0.16;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain).connect(ac.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }
  function noise(opts) {
    if (muted) return;
    const ac = audio();
    if (!ac) return;
    const o = opts || {};
    const dur = o.dur || 0.18;
    const t0 = ac.currentTime + (o.delay || 0);
    const len = Math.max(1, Math.floor(ac.sampleRate * dur));
    const buf = ac.createBuffer(1, len, ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ac.createBufferSource();
    src.buffer = buf;
    const filt = ac.createBiquadFilter();
    filt.type = o.filter || 'lowpass';
    filt.frequency.value = o.freq || 900;
    const gain = ac.createGain();
    gain.gain.value = o.vol || 0.12;
    src.connect(filt).connect(gain).connect(ac.destination);
    src.start(t0);
  }

  // Pentatonic ladder so longer streaks literally sound higher.
  const LADDER = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.7, 1318.5, 1568, 1760];

  Arcade.sfx = {
    get muted() { return muted; },
    set muted(v) {
      muted = !!v;
      try { localStorage.setItem(MUTE_KEY, muted ? '1' : '0'); } catch (e) {}
    },
    correct(streak) {
      const i = Math.min(Math.max((streak || 1) - 1, 0), LADDER.length - 3);
      tone(LADDER[i],     { type: 'triangle', dur: 0.09, vol: 0.18 });
      tone(LADDER[i + 2], { type: 'triangle', dur: 0.14, vol: 0.16, delay: 0.07 });
    },
    wrong() {
      tone(196, { type: 'sawtooth', dur: 0.22, vol: 0.1, glide: 110 });
      noise({ dur: 0.12, freq: 400, vol: 0.06 });
    },
    click()  { tone(880,  { type: 'sine', dur: 0.045, vol: 0.07 }); },
    tick()   { tone(1200, { type: 'sine', dur: 0.03,  vol: 0.05 }); },
    timeup() {
      tone(330, { type: 'square', dur: 0.16, vol: 0.09 });
      tone(247, { type: 'square', dur: 0.3,  vol: 0.09, delay: 0.14 });
    },
    coin() {
      tone(987.77, { type: 'square', dur: 0.06, vol: 0.08 });
      tone(1318.5, { type: 'square', dur: 0.18, vol: 0.08, delay: 0.055 });
    },
    swoosh() { noise({ dur: 0.22, freq: 2400, vol: 0.05, filter: 'bandpass' }); },
    heartbeat() {
      tone(80, { type: 'sine', dur: 0.09, vol: 0.22 });
      tone(70, { type: 'sine', dur: 0.12, vol: 0.18, delay: 0.18 });
    },
    riser() {
      for (let i = 0; i < 7; i++) tone(300 + i * 90, { type: 'sawtooth', dur: 0.07, vol: 0.045, delay: i * 0.05 });
    },
    fanfare() {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
        tone(f, { type: 'triangle', dur: i === 3 ? 0.5 : 0.13, vol: 0.16, delay: i * 0.11 }));
      noise({ dur: 0.4, freq: 3000, vol: 0.04, filter: 'highpass', delay: 0.33 });
    },
  };

  Arcade.mountMuteButton = function () {
    if (document.querySelector('.ar-mute')) return;
    const b = document.createElement('button');
    b.className = 'ar-mute';
    b.type = 'button';
    function sync() {
      b.textContent = muted ? '🔇' : '🔊';
      b.setAttribute('aria-label', muted ? 'Unmute sound effects' : 'Mute sound effects');
    }
    sync();
    b.addEventListener('click', () => {
      Arcade.sfx.muted = !muted;
      sync();
      if (!muted) Arcade.sfx.coin();
    });
    document.body.appendChild(b);
  };

  /* ---------------- confetti --------------------------------------------- */
  let confettiCanvas = null, confettiCtx2d = null, particles = [], confettiRAF = null;
  const COLORS = ['#00ffa3', '#00e5ff', '#ffd60a', '#ff2e88', '#8b5cf6', '#ffffff'];
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function confettiLayer() {
    if (!confettiCanvas) {
      confettiCanvas = document.createElement('canvas');
      confettiCanvas.id = 'ar-confetti';
      document.body.appendChild(confettiCanvas);
      confettiCtx2d = confettiCanvas.getContext('2d');
    }
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    return confettiCtx2d;
  }
  function confettiLoop() {
    const c = confettiCtx2d;
    c.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    particles = particles.filter(p => p.life > 0);
    if (!particles.length) { confettiRAF = null; return; }
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.18; p.vx *= 0.99;
      p.rot += p.vr; p.life -= 1;
      c.save();
      c.translate(p.x, p.y);
      c.rotate(p.rot);
      c.globalAlpha = Math.min(1, p.life / 30);
      c.fillStyle = p.color;
      c.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
      c.restore();
    }
    confettiRAF = requestAnimationFrame(confettiLoop);
  }
  Arcade.confettiBurst = function (opts) {
    if (reducedMotion) return;
    const o = opts || {};
    confettiLayer();
    const x = o.x != null ? o.x : window.innerWidth / 2;
    const y = o.y != null ? o.y : window.innerHeight * 0.35;
    const n = o.count || 60;
    const colors = o.colors || COLORS;
    for (let i = 0; i < n; i++) {
      const ang = Math.random() * Math.PI * 2;
      const v = 3 + Math.random() * 8;
      particles.push({
        x, y,
        vx: Math.cos(ang) * v, vy: Math.sin(ang) * v - 4,
        s: 5 + Math.random() * 7, rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 70 + Math.random() * 50,
      });
    }
    if (!confettiRAF) confettiRAF = requestAnimationFrame(confettiLoop);
  };
  Arcade.confettiRain = function (ms) {
    if (reducedMotion) return;
    confettiLayer();
    const end = Date.now() + (ms || 1600);
    (function drop() {
      for (let i = 0; i < 7; i++) {
        particles.push({
          x: Math.random() * window.innerWidth, y: -12,
          vx: (Math.random() - 0.5) * 2, vy: 2 + Math.random() * 3,
          s: 5 + Math.random() * 7, rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.25,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          life: 130,
        });
      }
      if (!confettiRAF) confettiRAF = requestAnimationFrame(confettiLoop);
      if (Date.now() < end) setTimeout(drop, 60);
    })();
  };

  /* ---------------- juice: shake, floats, flashes ------------------------- */
  Arcade.shake = function () {
    if (reducedMotion) return;
    document.body.classList.remove('ar-shake');
    void document.body.offsetWidth; // restart animation
    document.body.classList.add('ar-shake');
    setTimeout(() => document.body.classList.remove('ar-shake'), 400);
  };

  Arcade.popText = function (text, x, y, color) {
    const el = document.createElement('div');
    el.className = 'ar-float';
    el.textContent = text;
    el.style.left = (x - 20) + 'px';
    el.style.top = (y - 16) + 'px';
    el.style.color = color || '#00ffa3';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 950);
  };
  Arcade.popTextOver = function (el, text, color) {
    const r = el.getBoundingClientRect();
    Arcade.popText(text, r.left + r.width / 2, r.top, color);
  };

  Arcade.flashMsg = function (text, color) {
    const el = document.createElement('div');
    el.className = 'ar-flash-msg';
    el.textContent = text;
    el.style.color = color || '#00ffa3';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 900);
  };
  Arcade.streakCall = function (n) {
    const calls = { 3: ['ON FIRE 🔥', '#ffd60a'], 5: ['UNSTOPPABLE ⚡', '#00e5ff'], 7: ['GODLIKE 👑', '#ff2e88'], 10: ['LEGENDARY 💎', '#8b5cf6'] };
    if (calls[n]) {
      Arcade.flashMsg(calls[n][0], calls[n][1]);
      Arcade.sfx.riser();
      Arcade.vibrate([30, 40, 60]);
    }
  };

  Arcade.countUp = function (el, to, ms, suffix) {
    const dur = ms || 800;
    const start = performance.now();
    const from = 0;
    (function step(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(from + (to - from) * eased) + (suffix || '');
      if (t < 1) requestAnimationFrame(step);
    })(performance.now());
  };

  /* ---------------- grading + end card ------------------------------------ */
  Arcade.grade = function (pct) {
    if (pct >= 95) return { letter: 'S', cls: 's', line: 'Certified topic slayer.' };
    if (pct >= 80) return { letter: 'A', cls: 'a', line: 'Seriously sharp. One run from perfection.' };
    if (pct >= 60) return { letter: 'B', cls: 'b', line: 'Solid — the gaps are showing themselves.' };
    if (pct >= 40) return { letter: 'C', cls: 'c', line: 'Warmed up. Now go again and beat it.' };
    return { letter: 'D', cls: 'd', line: 'Brutal round. Revenge run?' };
  };

  // Shareable results card. Renders into `container` and wires buttons.
  Arcade.renderEndCard = function (container, opts) {
    const e = Arcade.escapeHtml;
    const g = Arcade.grade(opts.pct);
    const hot = opts.hot || g.cls === 'd';

    let best = null, newBest = false;
    if (opts.bestKey != null && opts.bestValue != null) {
      try { best = parseInt(localStorage.getItem(opts.bestKey)); } catch (err) {}
      if (isNaN(best)) best = null;
      newBest = best === null || opts.bestValue > best;
      if (newBest) { try { localStorage.setItem(opts.bestKey, String(opts.bestValue)); } catch (err) {} }
    }

    container.innerHTML = `
      <div class="ar-end ${hot ? 'hot' : ''}">
        <div class="ar-end-inner">
          <h2>${e(opts.gameEmoji || '🎮')} ${e(opts.gameName)}</h2>
          <div class="ar-end-topic">${e(opts.topic)}${opts.meta ? ' · ' + e(opts.meta) : ''}</div>
          <div class="ar-grade ${g.cls}">${g.letter}</div>
          <div class="ar-grade-line">${e(g.line)}</div>
          ${opts.big != null ? `<div class="ar-end-big" id="ar-big">0</div><div class="ar-end-lbl">${e(opts.bigLabel || '')}</div>` : ''}
          ${opts.rows && opts.rows.length ? `<div class="ar-end-rows">${opts.rows.map(r => `<div class="ar-end-row"><b>${e(r.v)}</b><span>${e(r.l)}</span></div>`).join('')}</div>` : ''}
          ${opts.emojiGrid ? `<div class="ar-emoji-grid">${e(opts.emojiGrid)}</div>` : ''}
          ${newBest ? '<div class="ar-best">★ NEW PERSONAL BEST</div>'
            : best !== null ? `<div class="ar-best old">Personal best: ${e(best)}${opts.bestSuffix || '%'}</div>` : ''}
          ${opts.insight ? `<div class="ar-insight">${e(opts.insight)}</div>` : ''}
          <div class="ar-ctas">
            <button class="ar-btn" id="ar-again">▶ Run it back</button>
            <button class="ar-btn ghost" id="ar-share">📋 Copy result</button>
            <a class="ar-btn ghost" href="../../subjects.html">More games</a>
          </div>
          <div class="ar-watermark">aistudymethod.co.uk</div>
        </div>
      </div>
    `;

    const bigEl = container.querySelector('#ar-big');
    if (bigEl && typeof opts.big === 'number') {
      Arcade.countUp(bigEl, opts.big, 900, opts.bigSuffix || '');
    } else if (bigEl) {
      bigEl.textContent = opts.big;
    }

    if (opts.pct >= 80) { Arcade.confettiRain(1800); Arcade.sfx.fanfare(); }
    else if (opts.pct >= 60) { Arcade.confettiBurst({ count: 50 }); Arcade.sfx.coin(); }
    else { Arcade.sfx.timeup(); }
    if (newBest) setTimeout(() => Arcade.confettiBurst({ count: 80, y: window.innerHeight * 0.25 }), 500);

    container.querySelector('#ar-again').addEventListener('click', () => {
      Arcade.sfx.click();
      opts.onAgain && opts.onAgain();
    });

    const shareBtn = container.querySelector('#ar-share');
    shareBtn.addEventListener('click', async () => {
      const lines = (opts.shareLines && opts.shareLines.slice()) || [];
      lines.push('🎓 aistudymethod.co.uk');
      const text = lines.join('\n');
      let ok = false;
      try {
        if (navigator.share) { await navigator.share({ text }); ok = true; }
        else if (navigator.clipboard) { await navigator.clipboard.writeText(text); ok = true; }
      } catch (err) {
        try { await navigator.clipboard.writeText(text); ok = true; } catch (err2) {}
      }
      if (ok) {
        shareBtn.textContent = '✅ Copied!';
        Arcade.sfx.coin();
        setTimeout(() => { shareBtn.textContent = '📋 Copy result'; }, 1800);
      }
    });

    return { grade: g, newBest };
  };

  /* ---------------- countdown timer controller ---------------------------- */
  // Drives an .ar-timer fill bar. Returns {stop, remaining, addTime}.
  Arcade.timer = function (fillEl, ms, callbacks) {
    const cb = callbacks || {};
    let total = ms, left = ms, last = performance.now(), raf = null, dead = false;
    let lastWholeSec = Math.ceil(ms / 1000);
    function step(now) {
      if (dead) return;
      left -= (now - last);
      last = now;
      const frac = Math.max(0, left / total);
      fillEl.style.transform = 'scaleX(' + frac + ')';
      fillEl.classList.toggle('warn', frac <= 0.5 && frac > 0.22);
      fillEl.classList.toggle('danger', frac <= 0.22);
      const whole = Math.ceil(left / 1000);
      if (whole !== lastWholeSec) {
        lastWholeSec = whole;
        if (whole <= 3 && whole > 0) Arcade.sfx.tick();
        cb.onSecond && cb.onSecond(whole);
      }
      if (left <= 0) {
        dead = true;
        fillEl.style.transform = 'scaleX(0)';
        cb.onEnd && cb.onEnd();
        return;
      }
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return {
      stop() { dead = true; if (raf) cancelAnimationFrame(raf); },
      get remaining() { return Math.max(0, left); },
      addTime(extra) { left = Math.min(total, left + extra); },
    };
  };

  /* ---------------- leaderboards (Bunny Edge + Bunny Database) ----------
     Set Arcade.LB_URL to the deployed edge-script hostname to go live, e.g.
       Arcade.LB_URL = 'https://aism-leaderboard.b-cdn.net';
     While empty, every leaderboard feature is a silent no-op.            */
  Arcade.LB_URL = 'https://aism-leaderboard-2dc3b.bunny.run';

  function lbGameId() {
    const base = (location.pathname.split('/').pop() || '').replace(/\.html$/, '');
    return base.replace(/^game-/, '');
  }
  const LB_LABELS = {
    'two-truths': 'Two Truths One Lie', 'connections': 'Connections Grid',
    'sequence': 'Sort the Sequence', 'wager': 'Wager', 'higher-lower': 'Higher or Lower',
    'falling-words': 'Falling Words', 'conveyor': 'Conveyor Belt', 'word-web': 'Word Web',
    'reveal-race': 'Reveal Race', 'daily-drill': 'Daily Drill', 'quiz': 'Vocab Quiz',
    'pairs': 'Matching Pairs', 'hangman': 'System Breach', 'termguess': 'Term Guess',
    'anagram': 'Anagram', 'crossword': 'Crossword', 'pacman': 'Pac-Man Vocab',
    'spaceinvaders': 'Space Invaders',
  };

  Arcade.lb = {
    labels: LB_LABELS,
    enabled() { return !!Arcade.LB_URL && !!LB_LABELS[lbGameId()]; },
    device() {
      let id = null;
      try { id = localStorage.getItem('aism-device'); } catch (e) {}
      if (!id) {
        id = (crypto.randomUUID ? crypto.randomUUID()
          : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
              const r = Math.random() * 16 | 0;
              return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            }));
        try { localStorage.setItem('aism-device', id); } catch (e) {}
      }
      return id;
    },
    initials(v) {
      if (v !== undefined) { try { localStorage.setItem('aism-initials', v); } catch (e) {} }
      let s = 'AAA';
      try { s = localStorage.getItem('aism-initials') || 'AAA'; } catch (e) {}
      return s;
    },
    async top(game, opts) {
      const o = opts || {};
      const p = new URLSearchParams({ game, week: o.week || 'current', n: String(o.n || 10), device: this.device() });
      const r = await fetch(Arcade.LB_URL + '/top?' + p);
      if (!r.ok) throw new Error('leaderboard unavailable');
      return r.json();
    },
    async champion(week) {
      const p = new URLSearchParams({ week: week || 'current', device: this.device() });
      const r = await fetch(Arcade.LB_URL + '/champion?' + p);
      if (!r.ok) throw new Error('leaderboard unavailable');
      return r.json();
    },
    async submit(data) {
      const r = await fetch(Arcade.LB_URL + '/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...data, device: this.device() }),
      });
      const out = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(out.error || 'submit failed');
      return out;
    },
    boardHtml(rows, kind) {
      const e = Arcade.escapeHtml;
      if (!rows || !rows.length) {
        return '<div class="ar-lb-empty">No runs yet this week — be the first on the board.</div>';
      }
      return '<ol class="ar-lb-list">' + rows.map(r => `
        <li class="${r.you ? 'you' : ''}">
          <span class="ar-lb-rank">${r.rank === 1 ? '👑' : '#' + r.rank}</span>
          <span class="ar-lb-name">${e(r.initials)}</span>
          <span class="ar-lb-meta">${e(kind === 'champion' ? (r.games + ' games') : (r.topic || ''))}</span>
          <span class="ar-lb-score">${e(String(kind === 'champion' ? r.points + ' pts' : r.score))}</span>
        </li>`).join('') + '</ol>';
    },
    /* Initials picker + submit + board, mounted under the end card. */
    mount(container, run) {
      const e = Arcade.escapeHtml;
      const saved = this.initials();
      container.innerHTML = `
        <div class="ar-lb">
          <div class="ar-lb-title">🏆 WEEKLY LEADERBOARD</div>
          <div class="ar-lb-sub">Enter your initials — best run this week counts</div>
          <div class="ar-lb-picker" role="group" aria-label="Enter three initials">
            ${[0, 1, 2].map(i => `
              <div class="ar-lb-slot">
                <button type="button" class="ar-lb-arrow" data-i="${i}" data-d="1" aria-label="Letter ${i + 1} up">▲</button>
                <div class="ar-lb-letter" data-i="${i}">${e(saved[i] || 'A')}</div>
                <button type="button" class="ar-lb-arrow" data-i="${i}" data-d="-1" aria-label="Letter ${i + 1} down">▼</button>
              </div>`).join('')}
            <button type="button" class="ar-btn ar-lb-go" id="ar-lb-go">SUBMIT</button>
          </div>
          <div class="ar-lb-board" id="ar-lb-board"></div>
        </div>`;

      const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const letters = [...container.querySelectorAll('.ar-lb-letter')];
      container.querySelectorAll('.ar-lb-arrow').forEach(b =>
        b.addEventListener('click', () => {
          Arcade.sfx.tick();
          const el = letters[+b.dataset.i];
          const idx = (ALPHA.indexOf(el.textContent) + (+b.dataset.d) + ALPHA.length) % ALPHA.length;
          el.textContent = ALPHA[idx];
        }));

      const go = container.querySelector('#ar-lb-go');
      const board = container.querySelector('#ar-lb-board');
      go.addEventListener('click', async () => {
        const initials = letters.map(l => l.textContent).join('');
        go.disabled = true;
        go.textContent = '…';
        try {
          const res = await this.submit({ game: run.game, score: run.score, initials, topic: run.topic || '', stem: run.stem || '' });
          this.initials(initials);
          Arcade.sfx.fanfare();
          if (res.rank && res.rank <= 3) Arcade.confettiBurst({ count: 70 });
          container.querySelector('.ar-lb-picker').innerHTML =
            `<div class="ar-lb-result">${res.rank === 1 ? '👑 #1 THIS WEEK!' : 'RANK #' + e(String(res.rank)) + ' THIS WEEK'}</div>`;
          board.innerHTML = this.boardHtml(res.board);
        } catch (err) {
          go.disabled = false;
          go.textContent = 'SUBMIT';
          board.innerHTML = '<div class="ar-lb-empty">' + e(String(err.message || 'Could not reach the leaderboard.')) + '</div>';
        }
      });

      // show the current board straight away
      this.top(run.game).then(res => {
        if (!board.querySelector('.ar-lb-list')) board.innerHTML = this.boardHtml(res.board);
      }).catch(() => {});
    },
  };

  // Hook: every end card with a numeric best value gets the leaderboard UI.
  const _renderEndCard = Arcade.renderEndCard;
  Arcade.renderEndCard = function (container, opts) {
    const out = _renderEndCard(container, opts);
    try {
      if (Arcade.lb.enabled() && typeof opts.bestValue === 'number' && opts.bestValue > 0) {
        const inner = container.querySelector('.ar-end-inner');
        if (inner) {
          const mountEl = document.createElement('div');
          inner.insertBefore(mountEl, inner.querySelector('.ar-watermark'));
          Arcade.lb.mount(mountEl, {
            game: lbGameId(),
            score: Math.floor(opts.bestValue),
            topic: opts.topic || '',
            stem: (new URLSearchParams(location.search)).get('spec') || '',
          });
        }
      }
    } catch (e) { /* leaderboards must never break an end card */ }
    return out;
  };

  window.Arcade = Arcade;
})();
