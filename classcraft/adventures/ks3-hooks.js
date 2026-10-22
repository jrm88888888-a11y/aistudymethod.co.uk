/* ks3-hooks.js — hook videos, guesses and missions for the KS3 Science
   mini-lessons. One file for every lesson; each lesson only adds markup.

   Markup it looks for (all optional):

   1. Hook video slot
      <div class="ks3-hook" data-hook="ks3-atoms-1"
           data-landscape="https://…/play_720p.mp4"   16:9 file
           data-portrait="https://…/play_720p.mp4"    9:16 file (phones)
           data-poster="…jpg" data-poster-portrait="…jpg"
           data-captions="…vtt"
           data-title="Why is salt safe to eat?"></div>
      No video URL yet -> the slot is hidden on the live site, and shown as
      a labelled placeholder in review copies (<html data-ks3-review>).

   2. Guess (ungraded, never gates the Next button)
      <div class="ks3-guess" data-guess="ks3-atoms-1"
           data-reply="Locked in. Mission 1 will show you.">
        <p class="ks3-guess-q">Make a guess: why is salt safe to eat?</p>
        <button type="button" class="ks3-chip">…</button> …
        <p class="ks3-guess-reply" aria-live="polite"></p>
      </div>

   3. Mission map (opening screen) and the final-screen summary
      <ol class="ks3-missions"><li data-mission="m1">Why is salt safe…</li>…</ol>
      <p class="ks3-done"></p>     (final screen)

   4. Mission check: an ordinary lesson MCQ (.opts[data-q]) that also has
      data-mission="m1". Its key must be in the lesson's own setupMCQ list;
      this file never calls setupMCQ (that would double-score).
      <p class="ks3-yourguess" data-guess-of="ks3-atoms-1"></p> shows the
      student's earlier guess.

   Plausible events: "KS3 hook play", "KS3 hook complete" (90 % watched),
   "KS3 hook guess", "KS3 mission check".                                  */
(function () {
  'use strict';
  var REVIEW = document.documentElement.hasAttribute('data-ks3-review');
  var LESSON = (location.pathname.split('/').pop() || '').replace('-mini-lesson.html', '');
  var LIBRARY = '680127';
  var TAG = /-ibdp-/.test(LESSON) ? 'IB' : /-gcse-/.test(LESSON) ? 'GCSE' : 'KS3';   // analytics event prefix   // Bunny Stream library (fallback player only)

  function track(name, props) {
    try { if (window.plausible) window.plausible(name, { props: props || {} }); } catch (e) {}
  }
  function store(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; }
  }
  function portraitScreen() {
    try { return window.matchMedia('(max-width: 600px) and (orientation: portrait)').matches; } catch (e) { return false; }
  }

  /* ---------------------------------------------------------------- video */
  var players = [];
  function buildHook(slot) {
    var id = slot.dataset.hook || 'hook';
    var tall = portraitScreen() && slot.dataset.portrait;
    var src = tall ? slot.dataset.portrait : slot.dataset.landscape;
    var poster = (tall && slot.dataset.posterPortrait) || slot.dataset.poster || '';
    slot.classList.toggle('tall', !!tall);
    if (!src) {
      if (!REVIEW) { slot.hidden = true; return; }
      slot.innerHTML = '<div class="ks3-ph"><span class="ks3-ph-icon">🎬</span>' +
        '<b>Hook video</b><span>' + (slot.dataset.title || id) + '</span>' +
        '<small>(placeholder in review copy: video not made yet)</small></div>';
      return;
    }
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ks3-poster';
    btn.setAttribute('aria-label', 'Play the video: ' + (slot.dataset.title || ''));
    if (poster) { btn.style.backgroundImage = 'url("' + poster + '")'; btn.classList.add('has-art'); }
    btn.innerHTML = '<span class="ks3-play">▶</span>';
    slot.appendChild(btn);
    var host = src.match(/^https?:\/\/[^/]+/);
    function warm() {
      if (!host || document.querySelector('link[data-ks3-pc]')) return;
      var l = document.createElement('link');
      l.rel = 'preconnect'; l.href = host[0]; l.dataset.ks3Pc = '1';
      document.head.appendChild(l);
    }
    btn.addEventListener('pointerenter', warm, { once: true });
    btn.addEventListener('focus', warm, { once: true });
    btn.addEventListener('touchstart', warm, { once: true, passive: true });
    btn.addEventListener('click', function () {
      var v = document.createElement('video');
      v.controls = true; v.playsInline = true; v.preload = 'auto';
      v.setAttribute('playsinline', '');
      if (poster) v.poster = poster;
      v.src = src;
      if (slot.dataset.captions) {
        var t = document.createElement('track');
        t.kind = 'captions'; t.srclang = 'en'; t.label = 'English';
        t.src = slot.dataset.captions;
        v.appendChild(t);
      }
      var sentDone = false;
      v.addEventListener('timeupdate', function () {
        if (!sentDone && v.duration && v.currentTime / v.duration >= 0.9) {
          sentDone = true; track(TAG + ' hook complete', { hook: id, lesson: LESSON });
        }
      });
      v.addEventListener('error', function () {
        // MP4 failed: fall back to Bunny's own player (HLS, adaptive quality)
        var g = src.match(/\/([0-9a-f-]{36})\/play_\d+p\.mp4/);
        if (g && LIBRARY) {
          var f = document.createElement('iframe');
          f.src = 'https://iframe.mediadelivery.net/embed/' + LIBRARY + '/' + g[1] + '?autoplay=true';
          f.allow = 'autoplay; fullscreen; picture-in-picture';
          f.allowFullscreen = true; f.title = slot.dataset.title || 'Hook video';
          f.loading = 'eager';
          slot.innerHTML = ''; slot.appendChild(f);
          return;
        }
        slot.innerHTML = '<div class="ks3-ph"><b>The video could not load.</b>' +
          '<span>You can carry on with the lesson.</span></div>';
      });
      slot.replaceChild(v, btn);
      players.push(v);
      var p = v.play(); if (p && p.catch) p.catch(function () {});
      track(TAG + ' hook play', { hook: id, lesson: LESSON });
    });
  }

  /* -------------------------------------------------------------- guesses */
  function buildGuess(box) {
    var id = box.dataset.guess;
    var chips = [].slice.call(box.querySelectorAll('.ks3-chip'));
    var reply = box.querySelector('.ks3-guess-reply');
    var prev = store('ks3-guess:' + id);
    chips.forEach(function (c) {
      c.setAttribute('aria-pressed', 'false');
      if (prev && c.textContent.trim() === prev) mark(c, false);
      c.addEventListener('click', function () { mark(c, true); });
    });
    function mark(c, fresh) {
      chips.forEach(function (x) { x.classList.remove('sel'); x.setAttribute('aria-pressed', 'false'); });
      c.classList.add('sel'); c.setAttribute('aria-pressed', 'true');
      if (reply) reply.textContent = box.dataset.reply || 'Locked in.';
      if (fresh) {
        store('ks3-guess:' + id, c.textContent.trim());
        track(TAG + ' hook guess', { hook: id, choice: c.textContent.trim().slice(0, 80) });
        fillYourGuess();
      }
    }
  }
  function fillYourGuess() {
    [].forEach.call(document.querySelectorAll('.ks3-yourguess'), function (p) {
      var g = store('ks3-guess:' + p.dataset.guessOf);
      p.textContent = g ? 'Your guess: “' + g + '”' : "You didn't make a guess. Have a go now.";
    });
  }

  /* ------------------------------------------------------------- missions */
  var passed = {};
  function tick(m) {
    passed[m] = true;
    [].forEach.call(document.querySelectorAll('.ks3-missions li[data-mission="' + m + '"]'),
      function (li) { li.classList.add('done'); });
    renderDone();
  }
  function renderDone() {
    var map = document.querySelector('.ks3-missions');
    var out = document.querySelector('.ks3-done');
    if (!map || !out) return;
    var items = map.querySelectorAll('li[data-mission]');
    var n = 0;
    [].forEach.call(items, function (li) { if (passed[li.dataset.mission]) n++; });
    out.textContent = 'Missions complete: ' + n + ' of ' + items.length + ' ' +
      [].map.call(items, function (li) { return passed[li.dataset.mission] ? '✅' : '⬜'; }).join(' ');
  }
  function watchChecks() {
    [].forEach.call(document.querySelectorAll('.opts[data-mission]'), function (box) {
      var m = box.dataset.mission, first = true;
      box.addEventListener('click', function (e) {
        var b = e.target.closest && e.target.closest('.opt');
        if (!b || passed[m]) return;
        var ok = b.dataset.correct === '1';
        if (first) { track(TAG + ' mission check', { mission: m, lesson: LESSON, first_try: ok ? 'yes' : 'no' }); first = false; }
        if (ok) tick(m);
      });
    });
  }

  /* -------------------------------------- pause video when the screen changes */
  function wrapShow() {
    if (typeof window.show !== 'function') return;
    var orig = window.show;
    window.show = function (i) {
      players.forEach(function (v) { try { v.pause(); } catch (e) {} });
      return orig.apply(this, arguments);
    };
  }

  function init() {
    [].forEach.call(document.querySelectorAll('.ks3-hook'), buildHook);
    [].forEach.call(document.querySelectorAll('.ks3-guess'), buildGuess);
    fillYourGuess();
    watchChecks();
    renderDone();
    wrapShow();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
