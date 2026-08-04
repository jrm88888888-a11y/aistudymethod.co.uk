/* reel-chrome.js — shared "reel mode" chrome for the TikTok-recording arcade games.
 *
 * window.ReelChrome.apply({ subject, level, topicDisplay })
 *   Turns the current page into a centred 9:16 portrait stage with a branded
 *   top bar, ready for screen-recording. Called by a game engine when it detects
 *   ?reel=<key>. Dependency-light: uses ArcadeIcons if present, otherwise skips
 *   the mascot without error. No captions or overlays beyond the branding — the
 *   owner voices over.
 *
 * Contract exposed after apply():
 *   ReelChrome.stageEl  — the content area element directly under the branding
 *                         bar. It fills the rest of the portrait stage
 *                         (flex:1; position:relative; overflow:hidden; min-height:0).
 *                         Engines APPEND their canvas / #root into this element,
 *                         or size their canvas against it via getBoundingClientRect().
 *   ReelChrome.mount    — the same element as stageEl (an alias, an Element),
 *                         for engines that read a `.mount` hook.
 *   ReelChrome.barEl    — the branding bar element (read-only; do not draw into it).
 *   ReelChrome.applied  — boolean; true once apply() has run.
 *
 * apply() is idempotent: calling it again updates the topic chip text but does
 * not duplicate the stage or the bar. British English throughout.
 */
(function () {
  'use strict';

  var STYLE_ID = 'reel-chrome-style';
  var STAGE_ID = 'reel-chrome-stage';

  var CSS = [
    /* palette: navy #0d0a30/#1a1340, lavender #7e6dff, yellow #ffd24d, cyan #5cffe4 */
    'html.reel-mode,html.reel-mode body{margin:0;padding:0;width:100%;height:100%;',
    '  background:#0d0a30;overflow:hidden;-webkit-tap-highlight-color:transparent}',
    'html.reel-mode body{display:flex;align-items:center;justify-content:center;',
    '  background-image:radial-gradient(ellipse 70% 45% at 50% -8%,rgba(126,109,255,.18),transparent),',
    '  radial-gradient(ellipse 55% 40% at 50% 108%,rgba(92,255,228,.08),transparent)}',
    /* hide all site marketing / page chrome so it never lands in a recording */
    'html.reel-mode nav,html.reel-mode header,html.reel-mode footer,',
    'html.reel-mode .aism-back-strip,html.reel-mode .back-strip,',
    'html.reel-mode .ar-header,html.reel-mode .ar-sub,html.reel-mode .hd{display:none!important}',

    /* the 9:16 portrait stage: letterboxed phone-width column on desktop,',
       edge-to-edge on a phone */
    '#' + STAGE_ID + '{position:relative;z-index:2147483000;',
    '  width:min(100vw,430px,56.25vh);aspect-ratio:9/16;max-height:100vh;',
    '  display:flex;flex-direction:column;overflow:hidden;',
    '  background:linear-gradient(180deg,#12103a,#0d0a30 60%);',
    '  box-shadow:0 0 0 2px rgba(126,109,255,.30),0 24px 70px rgba(0,0,0,.65);',
    '  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}',

    /* branding bar */
    '#' + STAGE_ID + ' .reel-bar{flex:0 0 auto;display:flex;align-items:center;',
    '  justify-content:space-between;gap:6px;height:128px;padding:8px 10px;',
    '  background:linear-gradient(180deg,rgba(26,19,64,.96),rgba(13,10,48,.96));',
    '  border-bottom:2px solid #7e6dff;box-shadow:0 2px 14px rgba(126,109,255,.35)}',
    '#' + STAGE_ID + ' .reel-brand{display:flex;align-items:center;gap:7px;flex:0 0 auto}',
    '#' + STAGE_ID + ' .reel-vtile{width:38px;height:38px;border-radius:9px;flex:0 0 auto;',
    '  background:linear-gradient(135deg,#1fb89a,#4f6bd8 55%,#8b5cf6);',
    '  display:flex;align-items:center;justify-content:center;',
    '  font-family:"Playfair Display",Georgia,serif;font-weight:700;font-size:23px;color:#fff;',
    '  box-shadow:0 0 14px rgba(79,107,216,.55),0 0 4px rgba(31,184,154,.6)}',
    '#' + STAGE_ID + ' .reel-word{display:flex;flex-direction:column;line-height:1.2}',
    '#' + STAGE_ID + ' .reel-word b{font-family:"Press Start 2P",monospace;font-size:6px;',
    '  letter-spacing:1px;color:#ece8ff;font-weight:400}',
    '#' + STAGE_ID + ' .reel-word span{font-family:"Press Start 2P",monospace;font-size:6px;',
    '  letter-spacing:1px;color:#5cffe4;margin-top:3px}',
    /* centre — chunky 3D pixel wordmark (SVG); flex-centred, glow via filter */
    '#' + STAGE_ID + ' .reel-marq{flex:1 1 auto;min-width:0;display:flex;',
    '  align-items:center;justify-content:center;padding:0 6px;overflow:hidden;',
    '  animation:reelFlick 4s infinite}',
    '#' + STAGE_ID + ' .reel-marq svg{display:block;width:100%;height:auto;max-height:108px;',
    '  filter:drop-shadow(0 0 6px rgba(255,210,77,.55)) drop-shadow(0 0 14px rgba(255,159,28,.35))}',
    '#' + STAGE_ID + ' .reel-mascot{flex:0 0 auto;line-height:0;width:48px;height:48px;',
    '  display:flex;align-items:center;justify-content:center}',
    '#' + STAGE_ID + ' .reel-mascot svg{display:block;filter:drop-shadow(0 0 6px rgba(126,109,255,.5))}',

    /* thin lavender rule + cyan topic chip */
    '#' + STAGE_ID + ' .reel-rule{flex:0 0 auto;height:2px;',
    '  background:linear-gradient(90deg,transparent,#7e6dff 20%,#7e6dff 80%,transparent)}',
    '#' + STAGE_ID + ' .reel-chip-row{flex:0 0 auto;display:flex;justify-content:center;',
    '  padding:6px 8px;background:rgba(13,10,48,.9)}',
    '#' + STAGE_ID + ' .reel-chip{font-family:"Press Start 2P",monospace;font-size:7px;',
    '  letter-spacing:1px;color:#5cffe4;padding:5px 10px;border-radius:5px;',
    '  border:1px solid rgba(92,255,228,.55);background:rgba(92,255,228,.08);',
    '  text-shadow:0 0 6px rgba(92,255,228,.5);text-align:center;line-height:1.5;',
    '  max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',

    /* play area — engines append canvas/#root here or size against it */
    '#' + STAGE_ID + ' .reel-content{flex:1 1 auto;min-height:0;position:relative;',
    '  overflow:hidden;display:flex;align-items:stretch;justify-content:center}',
    '#' + STAGE_ID + ' .reel-content > #root,',
    '#' + STAGE_ID + ' .reel-content > canvas{width:100%;height:100%;max-width:100%;max-height:100%}',

    '@keyframes reelFlick{0%,93%,96%,100%{opacity:1}94%{opacity:.78}95%{opacity:.93}}',
    '@media(prefers-reduced-motion:reduce){#' + STAGE_ID + ' .reel-marq{animation:none}}',
    '@media(max-width:600px){#' + STAGE_ID + '{box-shadow:none}}'
  ].join('\n');

  function el(tag, cls) {
    var e = document.createElement(tag);
    if (cls) { e.className = cls; }
    return e;
  }

  function chipText(opts) {
    var parts = [];
    if (opts.level) { parts.push(String(opts.level)); }
    if (opts.subject) { parts.push(String(opts.subject)); }
    if (opts.topicDisplay) { parts.push(String(opts.topicDisplay)); }
    return parts.join(' · ').toUpperCase();
  }

  /* ---------------------------------------------------------------------------
   * Chunky 3D pixel wordmark — "REVISION ARCADE".
   *
   * A tiny blocky bitmap font (7 wide x 9 tall cells, roughly 2-unit-thick
   * strokes) covering only the glyphs the two lines need: R E V I S O N A C D
   * and space. reelWordmarkSVG() paints, per lit pixel and back-to-front, a
   * dark outline, a purple side extruded down-and-right for depth, then the
   * bright-yellow face and a faint top-left highlight — so the letters read as
   * solid 3D arcade blocks. Hard pixels only (shape-rendering:crispEdges).
   * '#' marks a lit pixel; '.' is empty.
   * ------------------------------------------------------------------------- */
  var WM_FONT = {
    'S': ['.#####.', '#######', '##.....', '######.', '.#####.', '.....##', '##...##', '#######', '.#####.'],
    'U': ['##...##', '##...##', '##...##', '##...##', '##...##', '##...##', '##...##', '#######', '.#####.'],
    'B': ['######.', '######.', '##...##', '######.', '######.', '##...##', '##...##', '######.', '######.'],
    'J': ['..#####', '..#####', '....##.', '....##.', '....##.', '....##.', '##..##.', '######.', '.####..'],
    'E': ['#######', '#######', '##.....', '######.', '######.', '##.....', '##.....', '#######', '#######'],
    'C': ['.#####.', '#######', '##...##', '##.....', '##.....', '##.....', '##...##', '#######', '.#####.'],
    'T': ['#######', '#######', '...##..', '...##..', '...##..', '...##..', '...##..', '...##..', '...##..'],
    'A': ['..###..', '.#####.', '##...##', '##...##', '#######', '#######', '##...##', '##...##', '##...##'],
    'R': ['######.', '######.', '##...##', '######.', '######.', '##.##..', '##..##.', '##..##.', '##...##'],
    'D': ['#####..', '######.', '##...##', '##...##', '##...##', '##...##', '##...##', '######.', '#####..'],
    'V': ['##...##', '##...##', '##...##', '.#...#.', '.#...#.', '.#...#.', '..#.#..', '..#.#..', '...#...'],
    'I': ['#######', '#######', '...##..', '...##..', '...##..', '...##..', '...##..', '#######', '#######'],
    'O': ['.#####.', '#######', '##...##', '##...##', '##...##', '##...##', '##...##', '#######', '.#####.'],
    'N': ['##...##', '###..##', '###..##', '##.#.##', '##.#.##', '##.#.##', '##..###', '##..###', '##...##'],
    ' ': null
  };
  var WM_GW = 7, WM_GH = 9, WM_GAP = 2, WM_LINEGAP = 4, WM_DEPTH = 3;
  var WM_COL = { face: '#ffd24d', side: '#7a2bd6', line: '#0d0a30', hi: '#fff2a8' };
  var WM_LINES = ['REVISION', 'ARCADE'];

  function wmLineWidth(text) {
    return text.length * (WM_GW + WM_GAP) - WM_GAP;
  }

  /* stamp a line of glyphs into the face-pixel map (keys "x,y") */
  function wmStamp(text, ox, oy, face) {
    for (var i = 0; i < text.length; i++) {
      var g = WM_FONT[text.charAt(i)];
      var cx = ox + i * (WM_GW + WM_GAP);
      if (!g) { continue; }
      for (var y = 0; y < g.length; y++) {
        var row = g[y];
        for (var x = 0; x < row.length; x++) {
          if (row.charAt(x) === '#') { face[(cx + x) + ',' + (oy + y)] = 1; }
        }
      }
    }
  }

  /* merge a pixel set into horizontal run rects of one colour */
  function wmRuns(set, color, out) {
    var rows = {}, key, p, y;
    for (key in set) {
      p = key.split(',');
      (rows[p[1]] || (rows[p[1]] = [])).push(parseInt(p[0], 10));
    }
    for (y in rows) {
      var xs = rows[y].sort(function (a, b) { return a - b; });
      var run = 1;
      for (var i = 1; i <= xs.length; i++) {
        if (i < xs.length && xs[i] === xs[i - 1] + 1) { run++; continue; }
        out.push('<rect x="' + xs[i - run] + '" y="' + y + '" width="' + run +
          '" height="1" fill="' + color + '"/>');
        run = 1;
      }
    }
  }

  function reelWordmarkSVG() {
    var maxW = Math.max(wmLineWidth(WM_LINES[0]), wmLineWidth(WM_LINES[1]));

    /* face pixels, each line centred within the wider line */
    var face = {}, li;
    for (li = 0; li < WM_LINES.length; li++) {
      var lw = wmLineWidth(WM_LINES[li]);
      wmStamp(WM_LINES[li], Math.round((maxW - lw) / 2), li * (WM_GH + WM_LINEGAP), face);
    }

    var k, p, fx, fy, d, kk;

    /* extruded side: step each face pixel down-and-right, keep only new cells */
    var side = {};
    for (k in face) {
      p = k.split(','); fx = +p[0]; fy = +p[1];
      for (d = 1; d <= WM_DEPTH; d++) {
        kk = (fx + d) + ',' + (fy + d);
        if (!face[kk]) { side[kk] = 1; }
      }
    }

    /* solid = face + side; dark outline = any empty 8-neighbour of a solid cell */
    var all = {}, outline = {};
    for (k in face) { all[k] = 1; }
    for (k in side) { all[k] = 1; }
    for (k in all) {
      p = k.split(','); fx = +p[0]; fy = +p[1];
      for (var dy = -1; dy <= 1; dy++) {
        for (var dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) { continue; }
          kk = (fx + dx) + ',' + (fy + dy);
          if (!all[kk]) { outline[kk] = 1; }
        }
      }
    }

    /* lighter-yellow top rim: face pixels whose upper neighbour is empty — a
       subtle lit-sign highlight along the top-left facing edges of each letter */
    var hi = {};
    for (k in face) {
      p = k.split(','); fx = +p[0]; fy = +p[1];
      if (!face[fx + ',' + (fy - 1)]) { hi[k] = 1; }
    }

    /* bounds across every drawn layer (outline can reach -1) */
    var minX = 0, minY = 0, maxX = 0, maxY = 0, first = true, pool = [outline, side, face], pi;
    for (pi = 0; pi < pool.length; pi++) {
      for (k in pool[pi]) {
        p = k.split(','); fx = +p[0]; fy = +p[1];
        if (first) { minX = maxX = fx; minY = maxY = fy; first = false; }
        if (fx < minX) { minX = fx; } if (fx > maxX) { maxX = fx; }
        if (fy < minY) { minY = fy; } if (fy > maxY) { maxY = fy; }
      }
    }

    var rects = [];
    wmRuns(outline, WM_COL.line, rects);
    wmRuns(side, WM_COL.side, rects);
    wmRuns(face, WM_COL.face, rects);
    wmRuns(hi, WM_COL.hi, rects);

    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + minX + ' ' + minY +
      ' ' + (maxX - minX + 1) + ' ' + (maxY - minY + 1) +
      '" preserveAspectRatio="xMidYMid meet" style="shape-rendering:crispEdges;' +
      'image-rendering:pixelated" role="img" aria-label="Revision Arcade">' +
      rects.join('') + '</svg>';
  }

  var Reel = {
    applied: false,
    stageEl: null,
    mount: null,
    barEl: null
  };

  function apply(opts) {
    opts = opts || {};

    /* idempotent: on a repeat call just refresh the chip and return */
    if (Reel.applied && document.getElementById(STAGE_ID)) {
      var existingChip = document.querySelector('#' + STAGE_ID + ' .reel-chip');
      if (existingChip) { existingChip.textContent = chipText(opts); }
      return Reel;
    }

    document.documentElement.classList.add('reel-mode');

    /* inject stylesheet once */
    if (!document.getElementById(STYLE_ID)) {
      var st = document.createElement('style');
      st.id = STYLE_ID;
      st.textContent = CSS;
      document.head.appendChild(st);
    }

    /* build the portrait stage */
    var stage = el('div');
    stage.id = STAGE_ID;

    var bar = el('div', 'reel-bar');

    /* left — V logo mark + wordmark */
    var brand = el('div', 'reel-brand');
    var vtile = el('div', 'reel-vtile');
    vtile.textContent = 'V';
    vtile.setAttribute('aria-hidden', 'true');
    var word = el('div', 'reel-word');
    var wb = el('b');
    wb.textContent = 'AI STUDY';
    var ws = el('span');
    ws.textContent = 'METHOD';
    word.appendChild(wb);
    word.appendChild(ws);
    brand.appendChild(vtile);
    brand.appendChild(word);

    /* centre — chunky 3D pixel wordmark "SUBJECTS / ARCADE", stacked to fill the bar */
    var marq = el('div', 'reel-marq');
    marq.innerHTML = reelWordmarkSVG();

    /* right — pixel mascot (optional) */
    var mascot = el('div', 'reel-mascot');
    mascot.setAttribute('aria-hidden', 'true');
    if (window.ArcadeIcons && typeof window.ArcadeIcons.svg === 'function') {
      var svg = window.ArcadeIcons.svg('mascot', 48);
      if (svg) { mascot.innerHTML = svg; }
    }

    bar.appendChild(brand);
    bar.appendChild(marq);
    bar.appendChild(mascot);

    /* thin lavender rule */
    var rule = el('div', 'reel-rule');

    /* cyan topic chip */
    var chipRow = el('div', 'reel-chip-row');
    var chip = el('div', 'reel-chip');
    chip.textContent = chipText(opts);
    chipRow.appendChild(chip);

    /* play area */
    var content = el('div', 'reel-content');

    stage.appendChild(bar);
    stage.appendChild(rule);
    stage.appendChild(chipRow);
    stage.appendChild(content);

    document.body.appendChild(stage);

    /* if the game already has a #root, relocate it into the stage so even
       engines that only style #root get the portrait treatment for free */
    var root = document.getElementById('root');
    if (root && root !== content && !content.contains(root)) {
      content.appendChild(root);
    }

    Reel.applied = true;
    Reel.stageEl = content;
    Reel.mount = content;
    Reel.barEl = bar;
    return Reel;
  }

  Reel.apply = apply;
  window.ReelChrome = Reel;
})();
