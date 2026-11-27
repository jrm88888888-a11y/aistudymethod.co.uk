/* lang-audio.js: in-lesson audio clips for language lessons (French now, Spanish later).
   Turns <div class="fr-audio" data-clip="F01-A1" data-text="…" hidden></div> into a small player.
   Files: /classcraft/adventures/<lang>-audio/<clip>.mp3 (+ -slow, -sections); manifest.json lists what exists. */
(function () {
  'use strict';
  var LANGS = { fr: { cls: 'fr-audio', base: '/classcraft/adventures/fr-audio/', name: 'French' },
                es: { cls: 'es-audio', base: '/classcraft/adventures/es-audio/', name: 'Spanish' } };
  var current = null;          // { audio, btn, timer }
  var manifests = {};

  function stop() {
    if (!current) return;
    try { current.audio.pause(); } catch (e) {}
    if (current.timer) clearTimeout(current.timer);
    if (current.btn) current.btn.classList.remove('la-playing');
    current = null;
  }
  // Play a list of urls in order with gaps (ms) between them.
  function playSeq(urls, gaps, btn) {
    stop();
    var i = 0, a = new Audio();
    current = { audio: a, btn: btn, timer: null };
    btn.classList.add('la-playing');
    var me = current;
    function next() {
      if (current !== me) return;
      if (i >= urls.length) { btn.classList.remove('la-playing'); current = null; return; }
      a.src = urls[i++]; var p = a.play(); if (p && p.catch) p.catch(function () { stop(); });
    }
    a.addEventListener('ended', function () {
      if (current !== me) return;
      me.timer = setTimeout(next, gaps[i - 1] || 0);
    });
    next();
  }

  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function btn(label, aria, fn) { var b = el('button', 'la-btn', label); b.type = 'button'; b.setAttribute('aria-label', aria); b.addEventListener('click', fn); return b; }

  function isQuestion(screen) { return !!(screen && screen.querySelector('.opts, [data-lab], .activity')); }

  function build(div, L, info) {
    var clip = div.getAttribute('data-clip'), text = div.getAttribute('data-text') || '';
    var base = L.base + encodeURIComponent(clip);
    var screen = div.closest('section.screen');
    var row = el('div', 'la-row'); row.setAttribute('role', 'group'); row.setAttribute('aria-label', L.name + ' audio');
    var url = function (suf) { return base + suf + '.mp3'; };
    var v = info.variants || [];
    var mode = info.mode || 'normal';

    if (mode.indexOf('replay:') === 0) {
      var ids = mode.slice(7).split(',');
      row.appendChild(btn('▶ Listen again', 'Play the ' + L.name + ' audio again', function () {
        playSeq(ids.map(function (x) { return L.base + encodeURIComponent(x) + '.mp3'; }), [1200], this);
      }));
    } else if (mode === 'dictation' && v.indexOf('sections') >= 0) {
      row.appendChild(btn('▶ Dictation', 'Play the dictation: whole sentence, then in sections, then whole again', function () {
        playSeq([url(''), url('-sections'), url('')], [1500, 1500], this);
      }));
      row.appendChild(btn('▶ Once', 'Play the sentence once', function () { playSeq([url('')], [], this); }));
    } else if (mode === 'twice') {
      row.appendChild(btn('▶ Listen (plays twice)', 'Play the ' + L.name + ' question twice, as in the exam', function () {
        playSeq([url(''), url('')], [3000], this);
      }));
    } else {
      var normal = btn('▶ Listen', 'Play the ' + L.name + ' audio', function () { playSeq([url('')], [], this); });
      var slow = v.indexOf('slow') >= 0 ? btn('🐢 Slow', 'Play the ' + L.name + ' audio slowly', function () { playSeq([url('-slow')], [], this); }) : null;
      if (slow && mode === 'slow-first') { row.appendChild(slow); row.appendChild(normal); }
      else { row.appendChild(normal); if (slow) row.appendChild(slow); }
    }

    if (text) {
      var tr = el('div', 'la-text', text); tr.setAttribute('lang', div.getAttribute('lang') || 'fr'); tr.hidden = true;
      var q = isQuestion(screen);
      if (q && screen) {
        // Questions: the words appear only once the student has answered.
        var reveal = function () { tr.hidden = false; tr.classList.add('la-after'); };
        var mo = new MutationObserver(function () {
          if (screen.querySelector('.opt.lock, .opt.correct, .opt.wrong')) { reveal(); mo.disconnect(); }
        });
        mo.observe(screen, { subtree: true, attributes: true, attributeFilter: ['class'] });
      } else {
        var t = btn('Show text', 'Show the ' + L.name + ' words', function () {
          tr.hidden = !tr.hidden; this.textContent = tr.hidden ? 'Show text' : 'Hide text';
        });
        t.classList.add('la-ghost'); row.appendChild(t);
      }
      div.appendChild(row); div.appendChild(tr);
    } else div.appendChild(row);

    if (screen) new MutationObserver(function () {
      if (!screen.classList.contains('active') && current && screen.contains(current.btn)) stop();
    }).observe(screen, { attributes: true, attributeFilter: ['class'] });

    div.hidden = false; div.classList.add('la-ready');
  }

  function css() {
    if (document.getElementById('la-css')) return;
    var s = el('style'); s.id = 'la-css';
    s.textContent =
      '.la-ready{margin:14px 0 4px}' +
      '.la-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}' +
      '.la-btn{min-height:44px;padding:8px 16px;border-radius:999px;border:2px solid var(--ink,#2c2840);background:var(--card,#fff);color:var(--ink,#2c2840);font:inherit;font-weight:700;cursor:pointer}' +
      '.la-btn:hover{transform:translateY(-1px)}' +
      '.la-btn:focus-visible{outline:3px solid #2e8bff;outline-offset:2px}' +
      '.la-btn.la-playing{background:#2e8bff;border-color:#2e8bff;color:#fff}' +
      '.la-btn.la-ghost{border-style:dashed;font-weight:600}' +
      '.la-text{margin-top:8px;padding:8px 12px;border-left:4px solid #2e8bff;font-style:italic;border-radius:6px;background:rgba(46,139,255,.08)}';
    document.head.appendChild(s);
  }

  function init() {
    Object.keys(LANGS).forEach(function (k) {
      var L = LANGS[k], nodes = document.querySelectorAll('.' + L.cls + '[data-clip]');
      if (!nodes.length) return;
      css();
      var m = manifests[k] || (manifests[k] = fetch(L.base + 'manifest.json?v=20261127').then(function (r) { return r.ok ? r.json() : {}; }, function () { return {}; }));
      m.then(function (man) {
        Array.prototype.forEach.call(nodes, function (d) {
          var info = man[d.getAttribute('data-clip')];
          if (!info) { if (window.console) console.warn('[lang-audio] no audio for', d.getAttribute('data-clip')); return; }
          build(d, L, info);
        });
      });
    });
    document.addEventListener('play', function (e) { if (e.target && e.target.tagName === 'VIDEO') stop(); }, true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
