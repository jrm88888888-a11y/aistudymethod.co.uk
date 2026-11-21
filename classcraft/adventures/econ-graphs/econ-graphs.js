/*! econ-graphs.js: interactive economics graph labs for aistudymethod.com (predict, then check).
 * One engine for every lab. No external libraries. Configs are JSON (see graphs/README.md).
 * Public API: window.EconGraphs = { mount(el), mountAll(root), renderStatic(cfg), model(cfg, params), templates, version }
 */
(function () {
  'use strict';
  var VERSION = '1.0.0';
  var NS = 'http://www.w3.org/2000/svg';
  var MINUS = '−';

  /* ------------------------------------------------------------------ expressions */
  // A small safe expression language: numbers, 'strings', names (letters, digits, _ and .),
  // + - * / % ^, comparisons, && || !, a ? b : c, calls f(a, b), indexing t[i].
  function tokenize(src) {
    var s = String(src).replace(/−/g, '-').replace(/×/g, '*').replace(/÷/g, '/');
    var out = [], i = 0, n = s.length, m;
    while (i < n) {
      var c = s[i];
      if (c === ' ' || c === '\t' || c === '\n') { i++; continue; }
      if ((m = /^(\d+\.?\d*(e[+-]?\d+)?|\.\d+(e[+-]?\d+)?)/i.exec(s.slice(i)))) { out.push({ t: 'n', v: parseFloat(m[0]) }); i += m[0].length; continue; }
      if ((m = /^[A-Za-z_$][A-Za-z0-9_.$]*/.exec(s.slice(i)))) { out.push({ t: 'id', v: m[0] }); i += m[0].length; continue; }
      if (c === "'" || c === '"') {
        var j = i + 1, str = '';
        while (j < n && s[j] !== c) { str += s[j]; j++; }
        out.push({ t: 's', v: str }); i = j + 1; continue;
      }
      if ((m = /^(==|!=|<=|>=|&&|\|\|)/.exec(s.slice(i)))) { out.push({ t: 'op', v: m[0] }); i += 2; continue; }
      if ('+-*/%^<>!?:(),[]'.indexOf(c) >= 0) { out.push({ t: 'op', v: c }); i++; continue; }
      throw new Error('Bad character "' + c + '" in expression: ' + src);
    }
    return out;
  }
  var BIN = { '||': 1, '&&': 2, '==': 3, '!=': 3, '<': 4, '<=': 4, '>': 4, '>=': 4, '+': 5, '-': 5, '*': 6, '/': 6, '%': 6, '^': 8 };
  function parseExpr(src) {
    var toks = tokenize(src), p = 0;
    function peek() { return toks[p]; }
    function isOp(v) { var t = toks[p]; return t && t.t === 'op' && t.v === v; }
    function expect(v) { if (!isOp(v)) throw new Error('Expected "' + v + '" in: ' + src); p++; }
    function ternary() {
      var c = binary(0);
      if (isOp('?')) { p++; var a = ternary(); expect(':'); var b = ternary(); return { k: '?', c: c, a: a, b: b }; }
      return c;
    }
    function binary(minPrec) {
      var left = unary();
      for (;;) {
        var t = peek();
        if (!t || t.t !== 'op' || !(t.v in BIN)) break;
        var pr = BIN[t.v];
        if (pr < minPrec || (pr === minPrec && t.v !== '^' && minPrec > 0 && false)) break;
        if (pr < minPrec) break;
        p++;
        var right = t.v === '^' ? binary(pr) : binary(pr + 1);
        left = { k: 'b', o: t.v, a: left, b: right };
      }
      return left;
    }
    function unary() {
      if (isOp('-')) { p++; return { k: 'neg', a: unary() }; }
      if (isOp('+')) { p++; return unary(); }
      if (isOp('!')) { p++; return { k: 'not', a: unary() }; }
      var base = primary();
      if (isOp('^')) { p++; return { k: 'b', o: '^', a: base, b: unary() }; }
      return base;
    }
    function primary() {
      var t = toks[p++];
      if (!t) throw new Error('Unexpected end of expression: ' + src);
      var node;
      if (t.t === 'n') node = { k: 'n', v: t.v };
      else if (t.t === 's') node = { k: 's', v: t.v };
      else if (t.t === 'id') {
        if (isOp('(')) {
          p++; var args = [];
          if (!isOp(')')) { for (;;) { args.push(ternary()); if (isOp(',')) { p++; continue; } break; } }
          expect(')'); node = { k: 'call', f: t.v, args: args };
        } else node = { k: 'id', v: t.v };
      } else if (t.t === 'op' && t.v === '(') { node = ternary(); expect(')'); }
      else throw new Error('Unexpected "' + t.v + '" in: ' + src);
      while (isOp('[')) { p++; var ix = ternary(); expect(']'); node = { k: 'ix', a: node, i: ix }; }
      return node;
    }
    var ast = ternary();
    if (p < toks.length) throw new Error('Unexpected "' + toks[p].v + '" in: ' + src);
    return ast;
  }
  var CACHE = {};
  function compile(src) {
    if (typeof src === 'number') return function () { return src; };
    if (typeof src === 'boolean') return function () { return src; };
    var key = String(src);
    if (CACHE[key]) return CACHE[key];
    var ast = parseExpr(key);
    var fn = function (env) { return ev(ast, env); };
    CACHE[key] = fn;
    return fn;
  }
  function ev(n, env) {
    switch (n.k) {
      case 'n': case 's': return n.v;
      case 'id':
        if (n.v in env.v) return env.v[n.v];
        if (n.v === 'true') return true;
        if (n.v === 'false') return false;
        if (n.v === 'pi') return Math.PI;
        throw new Error('Unknown name: ' + n.v);
      case 'neg': return -ev(n.a, env);
      case 'not': return !ev(n.a, env);
      case '?': return ev(n.c, env) ? ev(n.a, env) : ev(n.b, env);
      case 'ix': { var arr = ev(n.a, env), i = Math.round(ev(n.i, env)); return arr[Math.max(0, Math.min(arr.length - 1, i))]; }
      case 'b': {
        if (n.o === '&&') return ev(n.a, env) && ev(n.b, env);
        if (n.o === '||') return ev(n.a, env) || ev(n.b, env);
        var a = ev(n.a, env), b = ev(n.b, env);
        switch (n.o) {
          case '+': return a + b; case '-': return a - b; case '*': return a * b; case '/': return a / b;
          case '%': return a % b; case '^': return Math.pow(a, b);
          case '==': return typeof a === 'number' && typeof b === 'number' ? Math.abs(a - b) < 1e-9 : a === b;
          case '!=': return typeof a === 'number' && typeof b === 'number' ? Math.abs(a - b) >= 1e-9 : a !== b;
          case '<': return a < b; case '<=': return a <= b + 1e-12; case '>': return a > b; case '>=': return a >= b - 1e-12;
        }
        break;
      }
      case 'call': {
        var f = n.f;
        if (env.fn && env.fn[f]) {
          var uf = env.fn[f], args = n.args.map(function (x) { return ev(x, env); });
          var sub = Object.create(env.v);
          for (var k = 0; k < uf.args.length; k++) sub[uf.args[k]] = args[k];
          return uf.body({ v: sub, fn: env.fn, cfg: env.cfg });
        }
        if (f === 'solve' || f === 'argmin' || f === 'argmax') return numeric(f, n.args, env);
        var vals = n.args.map(function (x) { return ev(x, env); });
        if (BUILTIN[f]) return BUILTIN[f].apply(env, vals);
        throw new Error('Unknown function: ' + f);
      }
    }
    throw new Error('Bad node');
  }
  // solve(g, lo, hi): root of user function g on [lo, hi] (bisection). argmin/argmax(g, lo, hi): golden-section search.
  function numeric(kind, args, env) {
    var name = args[0].v, uf = env.fn[name];
    if (!uf) throw new Error(kind + ' needs a user function, got ' + name);
    var lo = ev(args[1], env), hi = ev(args[2], env), extra = args.slice(3).map(function (x) { return ev(x, env); });
    function g(x) {
      var sub = Object.create(env.v); sub[uf.args[0]] = x;
      for (var k = 0; k < extra.length; k++) sub[uf.args[k + 1]] = extra[k];
      return uf.body({ v: sub, fn: env.fn, cfg: env.cfg });
    }
    if (kind === 'solve') {
      var flo = g(lo), fhi = g(hi);
      if (flo === 0) return lo; if (fhi === 0) return hi;
      if ((flo > 0) === (fhi > 0)) return NaN;
      for (var i = 0; i < 80; i++) { var mid = (lo + hi) / 2, fm = g(mid); if ((fm > 0) === (flo > 0)) { lo = mid; flo = fm; } else hi = mid; }
      return (lo + hi) / 2;
    }
    var sign = kind === 'argmin' ? 1 : -1, r = (Math.sqrt(5) - 1) / 2, a = lo, b = hi;
    var c = b - r * (b - a), d = a + r * (b - a), fc = sign * g(c), fd = sign * g(d);
    for (var j = 0; j < 90; j++) {
      if (fc < fd) { b = d; d = c; fd = fc; c = b - r * (b - a); fc = sign * g(c); }
      else { a = c; c = d; fc = fd; d = a + r * (b - a); fd = sign * g(d); }
    }
    return (a + b) / 2;
  }
  function groupInt(s) { return s.replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function fmtNum(x, dp, opts) {
    if (typeof x !== 'number') return String(x);
    if (!isFinite(x)) return x > 0 ? '∞' : (x < 0 ? MINUS + '∞' : '—');
    var trim = dp === undefined || dp === null;
    if (trim) dp = 2;
    var s = Math.abs(x).toFixed(dp);
    if (trim && s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, '');
    var parts = s.split('.');
    var noGroup = opts && opts.nogroup;
    s = (noGroup ? parts[0] : groupInt(parts[0])) + (parts[1] ? '.' + parts[1] : '');
    var neg = x < 0 && parseFloat(s.replace(/,/g, '')) !== 0;
    return (neg ? MINUS : '') + s;
  }
  var BUILTIN = {
    min: Math.min, max: Math.max, abs: Math.abs, sin: Math.sin, cos: Math.cos, tan: Math.tan, atan: Math.atan, sqrt: Math.sqrt, pow: Math.pow, exp: Math.exp,
    log: function (x, b) { return b ? Math.log(x) / Math.log(b) : Math.log(x); }, ln: Math.log, log10: function (x) { return Math.log(x) / Math.LN10; },
    floor: Math.floor, ceil: function (x) { return Math.ceil(x - 1e-9); }, sign: Math.sign || function (x) { return x > 0 ? 1 : x < 0 ? -1 : 0; },
    round: function (x, dp) { var m = Math.pow(10, dp || 0); return Math.round(x * m + (x >= 0 ? 1e-9 : -1e-9)) / m; },
    clamp: function (x, a, b) { return Math.max(a, Math.min(b, x)); },
    near: function (a, b, tol) { return Math.abs(a - b) <= (tol === undefined ? 1e-6 : tol); },
    len: function (a) { return a.length; },
    sum: function (a, i0, i1) { var s = 0; i0 = i0 || 0; i1 = (i1 === undefined) ? a.length - 1 : i1; for (var i = i0; i <= i1; i++) s += a[i]; return s; },
    at: function (a, i) { i = Math.round(i); return a[Math.max(0, Math.min(a.length - 1, i))]; },
    lerp: function (a, i) { // linear interpolation in a table at fractional index i
      var k = Math.max(0, Math.min(a.length - 1, i)), j = Math.floor(k); if (j >= a.length - 1) return a[a.length - 1];
      return a[j] + (a[j + 1] - a[j]) * (k - j);
    },
    pick: function (i) { var a = Array.prototype.slice.call(arguments, 1); i = Math.round(i); return a[Math.max(0, Math.min(a.length - 1, i))]; },
    fmt: function (x, dp) { return fmtNum(x, dp); },
    fmtn: function (x, dp) { return fmtNum(x, dp, { nogroup: 1 }); },
    sgn: function (x, dp) { var s = fmtNum(x, dp); return x > 0 && s !== fmtNum(0, dp) ? '+' + s : s; },
    money: function (x, dp) {
      var cur = (this.cfg && this.cfg.currency) || '';
      if (typeof x !== 'number') return String(x);
      var s = fmtNum(Math.abs(x), dp === undefined ? 2 : dp);
      return (x < 0 && s.replace(/[^1-9]/g, '') ? MINUS : '') + cur + s;
    },
    pct: function (x, dp) { return fmtNum(x, dp) + '%'; },
    spct: function (x, dp) { return BUILTIN.sgn(x, dp) + '%'; },
    str: function (x) { return String(x); },
    has: function (a, b) { return String(a).toLowerCase().indexOf(String(b).toLowerCase()) >= 0; }
  };

  /* ------------------------------------------------------------------ model */
  function isExpr(v) { return typeof v === 'string'; }
  function buildModel(cfg) {
    if (cfg._m) return cfg._m;
    var m = cfg.model || {};
    var fns = {};
    var fdefs = m.funcs || {};
    Object.keys(fdefs).forEach(function (k) {
      var d = fdefs[k];
      fns[k] = { args: String(d[0]).split(',').map(function (s) { return s.trim(); }).filter(Boolean), body: compile(d[1]) };
    });
    var vars = (m.vars || []).map(function (pr) { return { name: pr[0], f: compile(pr[1]) }; });
    cfg._m = { fns: fns, vars: vars };
    return cfg._m;
  }
  function startParams(cfg) {
    var p = {};
    (cfg.controls || []).forEach(function (c) { p[c.id] = c.start !== undefined ? c.start : (c.type === 'range' ? c.min : 0); });
    return p;
  }
  function evalModel(cfg, params, extra) {
    var mm = buildModel(cfg), m = cfg.model || {};
    var v = { _pred: 0, _rev: 0 }; // _pred / _rev: 1 once a prediction is made / the answer is shown (live labs only)
    var consts = m.consts || {};
    Object.keys(consts).forEach(function (k) { v[k] = consts[k]; });
    var tables = m.tables || {};
    Object.keys(tables).forEach(function (k) { v[k] = tables[k]; });
    var sp = startParams(cfg);
    Object.keys(sp).forEach(function (k) { v[k + '0'] = sp[k]; v[k] = sp[k]; });
    Object.keys(params || {}).forEach(function (k) { v[k] = params[k]; });
    if (extra) Object.keys(extra).forEach(function (k) { v[k] = extra[k]; });
    var env = { v: v, fn: mm.fns, cfg: cfg };
    mm.vars.forEach(function (d) {
      try { v[d.name] = d.f(env); } catch (e) { throw new Error('[' + (cfg.id || '') + '] var ' + d.name + ': ' + e.message); }
    });
    return env;
  }
  function E(env, x, dflt) {
    if (x === undefined || x === null) return dflt;
    if (typeof x === 'number' || typeof x === 'boolean') return x;
    return compile(x)(env);
  }
  // Text with {expr} parts.
  function T(env, s) {
    if (s === undefined || s === null) return '';
    s = String(s);
    if (s.indexOf('{') < 0) return s;
    return s.replace(/\{([^{}]+)\}/g, function (_, ex) {
      var r = compile(ex)(env);
      return typeof r === 'number' ? fmtNum(r) : String(r);
    });
  }

  /* ------------------------------------------------------------------ drawing */
  var PAL = { blue: '#2e8bff', orange: '#ff9f1c', red: '#ff5b6e', green: '#34c777', purple: '#9b5de5', yellow: '#ffc83d', grey: '#9aa0b4', teal: '#14b8a6', pink: '#e64fa8' };
  // stroke kinds
  var STROKE = { d: 'blue', s: 'orange', red: 'red', green: 'green', purple: 'purple', grey: 'grey', teal: 'teal', pink: 'pink', yellow: 'yellow', blue: 'blue', orange: 'orange' };
  // fill kinds: [colour, opacity]
  var FILL = {
    cs: ['blue', 0.22], ps: ['orange', 0.28], rev: ['yellow', 0.5], dwl: ['red', 0.38], gain: ['green', 0.32], loss: ['red', 0.3],
    profit: ['green', 0.35], cons: ['blue', 0.3], prod: ['orange', 0.35], grey: ['grey', 0.25], purple: ['purple', 0.25], teal: ['teal', 0.25],
    blue: ['blue', 0.25], orange: ['orange', 0.3], red: ['red', 0.3], green: ['green', 0.3], yellow: ['yellow', 0.45], pink: ['pink', 0.25]
  };
  var STYLE = '.dg-t{fill:var(--ink,#2c2840);font-size:13.5px;font-weight:800}' +
    '.dg-n{fill:var(--ink,#2c2840);font-size:13.5px;font-weight:600}' +
    '.dg-s{fill:var(--soft,#6b6580);font-size:13.5px;font-weight:700}' +
    '.dg-w{fill:#fff;font-size:13.5px;font-weight:800}' +
    '.dg-l{fill:none;stroke:var(--ink,#2c2840);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}' +
    '.dg-l1{fill:none;stroke:var(--ink,#2c2840);stroke-width:1.2;stroke-linecap:round}' +
    '.dg-g{fill:none;stroke:var(--soft,#6b6580);stroke-width:1;stroke-dasharray:3 4;opacity:.6}' +
    '.dg-card{fill:var(--card,#fff);stroke:var(--ink,#2c2840);stroke-width:2}' +
    '.dg-ink{fill:var(--ink,#2c2840)}' +
    '.dg-p{stroke:var(--ink,#2c2840);stroke-width:1.6}' +
    '.eg-dash{fill:none;stroke:var(--soft,#6b6580);stroke-width:1.3;stroke-dasharray:4 4}' +
    '.eg-halo{paint-order:stroke;stroke:var(--card,#fff);stroke-width:4px;stroke-linejoin:round}';
  function f2(x) { return (Math.round(x * 100) / 100).toString(); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function col(k, dflt) { if (!k) return dflt; if (k.charAt(0) === '#') return k; var c = STROKE[k] || k; return PAL[c] || 'var(--ink,#2c2840)'; }
  function textEl(x, y, s, cls, anchor, extra) {
    return '<text x="' + f2(x) + '" y="' + f2(y) + '" text-anchor="' + (anchor || 'middle') + '" class="' + (cls || 'dg-t') + ' eg-halo"' + (extra || '') + '>' + esc(s) + '</text>';
  }
  function arrowHead(x, y, ang, color, size, wide) {
    size = size || 9; wide = wide || 5;
    var bx = x - size * Math.cos(ang), by = y - size * Math.sin(ang), px = -Math.sin(ang) * wide, py = Math.cos(ang) * wide;
    return '<polygon points="' + f2(x) + ',' + f2(y) + ' ' + f2(bx + px) + ',' + f2(by + py) + ' ' + f2(bx - px) + ',' + f2(by - py) + '" style="fill:' + color + '"/>';
  }
  function arrowSvg(x1, y1, x2, y2, color, width, both) {
    var ang = Math.atan2(y2 - y1, x2 - x1), size = 9;
    var sx = x2 - (size - 1) * Math.cos(ang), sy = y2 - (size - 1) * Math.sin(ang);
    var ox = x1, oy = y1, s = '';
    if (both) { ox = x1 + (size - 1) * Math.cos(ang); oy = y1 + (size - 1) * Math.sin(ang); s += arrowHead(x1, y1, ang + Math.PI, color, size); }
    s += '<line x1="' + f2(ox) + '" y1="' + f2(oy) + '" x2="' + f2(sx) + '" y2="' + f2(sy) + '" style="stroke:' + color + ';stroke-width:' + (width || 2.2) + ';stroke-linecap:round"/>';
    return s + arrowHead(x2, y2, ang, color, size);
  }

  var uid = 0;
  // Visibility: el.if (expression) and el.show ('predicted' | 'checked' | 'start' = only before prediction)
  function visible(el, env, st) {
    if (el.show === 'checked' && !st.revealed) return false;
    if (el.show === 'predicted' && !st.predicted) return false;
    if (el.show === 'unchecked' && st.revealed) return false;
    if (el.if !== undefined && !E(env, el.if)) return false;
    return true;
  }

  function niceStep(range, target) {
    var raw = range / (target || 5), p = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10)), m = raw / p;
    return (m < 1.5 ? 1 : m < 3 ? 2 : m < 7 ? 5 : 10) * p;
  }

  // Render one xy panel to an SVG string.
  function renderXY(panel, env, st, idp) {
    var W = 320, H = E(env, panel.h, 260);
    var ml = panel.ml !== undefined ? panel.ml : 48, mr = panel.mr !== undefined ? panel.mr : 18, mt = panel.mt !== undefined ? panel.mt : (panel.title ? 46 : 26), mb = panel.mb !== undefined ? panel.mb : 54;
    var X = panel.x || {}, Y = panel.y || {};
    var x0 = E(env, X.min, 0), x1 = E(env, X.max, 10), y0 = E(env, Y.min, 0), y1 = E(env, Y.max, 10);
    var pw = W - ml - mr, ph = H - mt - mb;
    function sx(x) { return ml + (x - x0) / (x1 - x0) * pw; }
    function sy(y) { return mt + ph - (y - y0) / (y1 - y0) * ph; }
    var clip = 'egc' + idp;
    var out = [], top = [];
    out.push('<defs><clipPath id="' + clip + '"><rect x="' + f2(ml - 1) + '" y="' + f2(mt - 8) + '" width="' + f2(pw + 10) + '" height="' + f2(ph + 9) + '"/></clipPath></defs>');
    if (panel.title) out.push(textEl(W / 2, 16, T(env, panel.title), 'dg-t'));
    // grid / ticks
    var ticksX = X.ticks, ticksY = Y.ticks;
    function tickList(A, a0, a1) {
      if (A.ticks === false || A.ticks === undefined && !A.auto) return [];
      if (Array.isArray(A.ticks)) return A.ticks.map(function (t) { return typeof t === 'object' ? t : { v: t }; });
      var stp = A.step || niceStep(a1 - a0, A.n || 5), r = [];
      for (var t = Math.ceil(a0 / stp - 1e-9) * stp; t <= a1 + 1e-9; t += stp) r.push({ v: Math.round(t * 1e9) / 1e9 });
      return r;
    }
    var tx = tickList(X, x0, x1), ty = tickList(Y, y0, y1);
    var tdp = function (A) { return A.dp; };
    if (panel.grid) {
      tx.forEach(function (t) { out.push('<line x1="' + f2(sx(t.v)) + '" y1="' + f2(mt) + '" x2="' + f2(sx(t.v)) + '" y2="' + f2(mt + ph) + '" class="dg-g"/>'); });
      ty.forEach(function (t) { out.push('<line x1="' + f2(ml) + '" y1="' + f2(sy(t.v)) + '" x2="' + f2(ml + pw) + '" y2="' + f2(sy(t.v)) + '" class="dg-g"/>'); });
    }
    var tickLabX = [], tickLabY = [];
    // axes
    var axes = '<path d="M' + f2(ml) + ' ' + f2(mt - 6) + ' L' + f2(ml) + ' ' + f2(mt + ph) + ' L' + f2(ml + pw + 6) + ' ' + f2(mt + ph) + '" class="dg-l"/>';
    if (y0 < 0 && y1 > 0 && Y.zero !== false) axes += '<line x1="' + f2(ml) + '" y1="' + f2(sy(0)) + '" x2="' + f2(ml + pw) + '" y2="' + f2(sy(0)) + '" class="dg-l1"/>';
    if (x0 < 0 && x1 > 0 && X.zero !== false) axes += '<line x1="' + f2(sx(0)) + '" y1="' + f2(mt) + '" x2="' + f2(sx(0)) + '" y2="' + f2(mt + ph) + '" class="dg-l1"/>';
    out.push(axes);
    tx.forEach(function (t) {
      out.push('<line x1="' + f2(sx(t.v)) + '" y1="' + f2(mt + ph) + '" x2="' + f2(sx(t.v)) + '" y2="' + f2(mt + ph + 4) + '" class="dg-l1"/>');
      tickLabX.push({ p: sx(t.v), s: t.l !== undefined ? T(env, t.l) : fmtNum(t.v, tdp(X)) });
    });
    ty.forEach(function (t) {
      out.push('<line x1="' + f2(ml - 4) + '" y1="' + f2(sy(t.v)) + '" x2="' + f2(ml) + '" y2="' + f2(sy(t.v)) + '" class="dg-l1"/>');
      tickLabY.push({ p: sy(t.v), s: t.l !== undefined ? T(env, t.l) : fmtNum(t.v, tdp(Y)) });
    });
    // axis titles: y at the top left, x under the axis at the right
    if (Y.label) out.push(textEl(ml - 4, mt - 12, T(env, Y.label), 'dg-s', 'start'));
    var xTitle = X.label ? T(env, X.label) : '';
    var body = [];
    var labels = [], axX = [], axY = [], labObjs = [];
    function addLab() { labObjs.push(Array.prototype.slice.call(arguments)); }
    function stroke(el, dflt) { return col(el.k, dflt || 'var(--ink,#2c2840)'); }
    function lineStyle(el, dflt) {
      var c = stroke(el, dflt), w = el.w || (el.k ? 2.6 : 2);
      return 'style="fill:none;stroke:' + c + ';stroke-width:' + w + ';stroke-linecap:round;stroke-linejoin:round' + (el.dash ? ';stroke-dasharray:' + (el.dash === true ? '7 5' : el.dash) : '') + (el.op ? ';opacity:' + el.op : '') + '"';
    }
    function fillStyle(el) {
      var fk = FILL[el.k] || FILL.grey, c = el.k && el.k.charAt(0) === '#' ? el.k : PAL[fk[0]];
      var op = el.op !== undefined ? el.op : fk[1];
      return 'style="fill:' + c + ';fill-opacity:' + op + ';stroke:' + (el.edge ? c : 'none') + (el.edge ? ';stroke-width:1.2' : '') + '"' + (el.hatch ? '' : '');
    }
    function label(x, y, s, el, anchor) {
      if (!s) return;
      addLab(x + (el.dx || 0), y + (el.dy || 0), s, el.lc || 'dg-t', el.anchor || anchor || 'start', el.lk ? ' style="fill:' + col(el.lk) + '"' : (el.k && STROKE[el.k] && el.lcol !== false && el.t !== 'text' ? ' style="fill:' + col(el.k) + '"' : ''));
    }
    function inside(px, py) { return px >= ml - 0.5 && px <= ml + pw + 0.5 && py >= mt - 0.5 && py <= mt + ph + 0.5; }
    function sample(el) {
      var pts = [], n = el.n || 80, sub = Object.create(env.v), envs = { v: sub, fn: env.fn, cfg: env.cfg };
      var fx = el.y !== undefined && el.x === undefined ? 'y' : (el.x !== undefined && el.y === undefined ? 'x' : 'p');
      var a, b, fy;
      if (fx === 'y') { a = E(env, el.from, x0); b = E(env, el.to, x1); fy = compile(el.y); }
      else if (fx === 'x') { a = E(env, el.from, y0); b = E(env, el.to, y1); fy = compile(el.x); }
      else { a = E(env, el.from, 0); b = E(env, el.to, 1); }
      for (var i = 0; i <= n; i++) {
        var t = a + (b - a) * i / n, X1, Y1;
        if (fx === 'y') { sub.x = t; X1 = t; Y1 = fy(envs); }
        else if (fx === 'x') { sub.y = t; Y1 = t; X1 = fy(envs); }
        else { sub.t = t; X1 = compile(el.px)(envs); Y1 = compile(el.py)(envs); }
        if (isFinite(X1) && isFinite(Y1)) pts.push([sx(X1), sy(Y1)]);
      }
      return pts;
    }
    function pathOf(pts) {
      var d = '';
      for (var i = 0; i < pts.length; i++) {
        var px = Math.max(-2000, Math.min(2000, pts[i][0])), py = Math.max(-2000, Math.min(2000, pts[i][1]));
        d += (i ? 'L' : 'M') + f2(px) + ' ' + f2(py);
      }
      return d;
    }
    function endLabel(pts, el) {
      if (!el.lab) return;
      var s = T(env, el.lab), vis = pts.filter(function (p) { return inside(p[0], p[1]); });
      if (!vis.length) return;
      var where = el.lp || (el.dash && el.k === 'grey' ? 'start' : 'end'), p; // old (grey dashed) curves are labelled at the other end
      var byX = vis.slice().sort(function (a, b) { return a[0] - b[0] || b[1] - a[1]; });
      if (where === 'start') p = byX[0];
      else if (where === 'first') p = vis[0];
      else if (where === 'last') p = vis[vis.length - 1];
      else if (typeof where === 'number') p = vis[Math.round((vis.length - 1) * where)];
      else p = byX[byX.length - 1];
      var anchor = 'start', dx = 4, dy = 4, lw = s.length * 7.6;
      if (p[0] > ml + pw - 30 || p[0] + 4 + lw > W - 2) { anchor = 'end'; dx = -2; dy = p[1] < mt + 20 ? 14 : -6; }
      if (p[1] < mt + 4) dy = 12;
      if (p[1] > mt + ph - 8) { dy = -7; dx = anchor === 'end' ? -6 : 6; }
      addLab(p[0] + dx + (el.dx || 0), p[1] + dy + (el.dy || 0), s, 'dg-t', el.anchor || anchor, ' style="fill:' + (el.lk ? col(el.lk) : stroke(el)) + '"');
    }
    (panel.els || []).forEach(function (el) {
      if (!visible(el, env, st)) return;
      var t = el.t, s;
      if (t === 'fn' || t === 'curve') {
        var pts = sample(el);
        body.push('<path d="' + pathOf(pts) + '" ' + lineStyle(el) + ' clip-path="url(#' + clip + ')"/>');
        endLabel(pts, el);
      } else if (t === 'line' || t === 'seg') {
        var ax = sx(E(env, el.x1)), ay = sy(E(env, el.y1)), bx = sx(E(env, el.x2)), by = sy(E(env, el.y2));
        body.push('<path d="M' + f2(ax) + ' ' + f2(ay) + 'L' + f2(bx) + ' ' + f2(by) + '" ' + lineStyle(el) + ' clip-path="url(#' + clip + ')"/>');
        endLabel([[ax, ay], [bx, by]], el);
      } else if (t === 'hline' || t === 'vline') {
        var v = E(env, t === 'hline' ? el.y : el.x), a0 = E(env, el.from, t === 'hline' ? x0 : y0), a1 = E(env, el.to, t === 'hline' ? x1 : y1);
        var p1 = t === 'hline' ? [sx(a0), sy(v)] : [sx(v), sy(a0)], p2 = t === 'hline' ? [sx(a1), sy(v)] : [sx(v), sy(a1)];
        body.push('<path d="M' + f2(p1[0]) + ' ' + f2(p1[1]) + 'L' + f2(p2[0]) + ' ' + f2(p2[1]) + '" ' + lineStyle(el) + ' clip-path="url(#' + clip + ')"/>');
        if (el.lab) {
          var ls = T(env, el.lab);
          if (t === 'hline') {
            if (el.lp === 'start') addLab(p1[0] + 4 + (el.dx || 0), p1[1] - 5 + (el.dy || 0), ls, 'dg-t', 'start', ' style="fill:' + stroke(el) + '"');
            else if (el.lp === 'axis') axY.push({ p: sy(v) + (el.dy || 0), s: ls, st: ' style="fill:' + stroke(el) + '"' });
            else addLab(p2[0] - 2 + (el.dx || 0), p2[1] - 5 + (el.dy || 0), ls, 'dg-t', 'end', ' style="fill:' + stroke(el) + '"');
          } else {
            if (el.lp === 'axis') axX.push({ p: sx(v) + (el.dx || 0), s: ls, st: ' style="fill:' + stroke(el) + '"' });
            else addLab(p2[0] + 4 + (el.dx || 0), p2[1] + 6 + (el.dy || 0), ls, 'dg-t', el.anchor || 'start', ' style="fill:' + stroke(el) + '"');
          }
        }
      } else if (t === 'poly') {
        var ps = el.pts.map(function (q) { return f2(sx(E(env, q[0]))) + ',' + f2(sy(E(env, q[1]))); });
        body.unshift('<polygon points="' + ps.join(' ') + '" ' + fillStyle(el) + ' clip-path="url(#' + clip + ')"/>');
        if (el.lab) { var c = el.at || centroid(el.pts); label(sx(E(env, c[0])), sy(E(env, c[1])) + 4.5, T(env, el.lab), el, 'middle'); }
      } else if (t === 'rect') {
        var rx0 = E(env, el.x0), rx1 = E(env, el.x1), ry0 = E(env, el.y0), ry1 = E(env, el.y1);
        var X0 = Math.min(sx(rx0), sx(rx1)), X1 = Math.max(sx(rx0), sx(rx1)), Y0 = Math.min(sy(ry0), sy(ry1)), Y1 = Math.max(sy(ry0), sy(ry1));
        if (X1 - X0 > 0.01 && Y1 - Y0 > 0.01) body.unshift('<rect x="' + f2(X0) + '" y="' + f2(Y0) + '" width="' + f2(X1 - X0) + '" height="' + f2(Y1 - Y0) + '" ' + fillStyle(el) + (el.bar ? ' rx="2"' : '') + ' clip-path="url(#' + clip + ')"/>');
        if (el.lab && X1 - X0 > 0.01) label((X0 + X1) / 2, el.lab_at === 'top' ? Y0 - 5 : (Y0 + Y1) / 2 + 4.5, T(env, el.lab), el, 'middle');
      } else if (t === 'between') {
        var top1 = sample({ y: el.top, from: el.from, to: el.to, n: el.n || 60 }), bot = sample({ y: el.bot, from: el.from, to: el.to, n: el.n || 60 }).reverse();
        var all = top1.concat(bot);
        if (all.length > 2) body.unshift('<polygon points="' + all.map(function (q) { return f2(q[0]) + ',' + f2(q[1]); }).join(' ') + '" ' + fillStyle(el) + ' clip-path="url(#' + clip + ')"/>');
        if (el.lab && el.at) label(sx(E(env, el.at[0])), sy(E(env, el.at[1])) + 4.5, T(env, el.lab), el, 'middle');
      } else if (t === 'pt') {
        var cx = sx(E(env, el.x)), cy = sy(E(env, el.y));
        if (!inside(cx, cy) && !el.free) return;
        top.push('<circle cx="' + f2(cx) + '" cy="' + f2(cy) + '" r="' + (el.r || 5) + '" style="fill:' + (el.k ? col(el.k) : 'var(--ink,#2c2840)') + ';stroke:var(--card,#fff);stroke-width:1.5"/>');
        if (el.lab) label(cx + 7, cy - 6, T(env, el.lab), Object.assign({}, el, { k: undefined }), 'start');
      } else if (t === 'drop') {
        var dx = E(env, el.x), dy = E(env, el.y), X = sx(dx), Y = sy(dy);
        if (!isFinite(X) || !isFinite(Y)) return;
        X = Math.max(ml, Math.min(ml + pw, X)); Y = Math.max(mt, Math.min(mt + ph, Y));
        var d = '';
        if (el.xl !== undefined && el.xl !== false) d += 'M' + f2(X) + ' ' + f2(Y) + 'L' + f2(X) + ' ' + f2(mt + ph);
        if (el.yl !== undefined && el.yl !== false) d += 'M' + f2(X) + ' ' + f2(Y) + 'L' + f2(ml) + ' ' + f2(Y);
        body.push('<path d="' + d + '" class="eg-dash"' + (el.k ? ' style="stroke:' + col(el.k) + '"' : '') + '/>');
        if (el.xl) axX.push({ p: X + (el.xdx || 0), s: trimZeros(T(env, el.xl)), st: el.k ? ' style="fill:' + col(el.k) + '"' : '' });
        if (el.yl) axY.push({ p: Y + (el.ydy || 0), s: trimZeros(T(env, el.yl)), st: el.k ? ' style="fill:' + col(el.k) + '"' : '' });
        if (el.dot !== false) top.push('<circle cx="' + f2(X) + '" cy="' + f2(Y) + '" r="4.5" style="fill:' + (el.k ? col(el.k) : 'var(--ink,#2c2840)') + ';stroke:var(--card,#fff);stroke-width:1.5"/>');
      } else if (t === 'arrow' || t === 'dim') {
        var a1x = sx(E(env, el.x1)), a1y = sy(E(env, el.y1)), a2x = sx(E(env, el.x2)), a2y = sy(E(env, el.y2));
        if (Math.hypot(a2x - a1x, a2y - a1y) < (el.min || 6)) return;
        top.push(arrowSvg(a1x, a1y, a2x, a2y, col(el.k, 'var(--ink,#2c2840)'), el.w, t === 'dim'));
        if (el.lab) label((a1x + a2x) / 2, (a1y + a2y) / 2 + 4.5, T(env, el.lab), el, 'start');
      } else if (t === 'text') {
        var tx2 = E(env, el.x), ty2 = E(env, el.y);
        var px2 = el.abs ? tx2 : sx(tx2), py2 = el.abs ? ty2 : sy(ty2);
        addLab(px2 + (el.dx || 0), py2 + (el.dy || 0), T(env, el.s), el.c || 'dg-t', el.anchor || 'middle', el.k ? ' style="fill:' + col(el.k) + '"' : '');
      }
    });
    // axis labels: keep them apart (x: second row; y: spread vertically)
    function tw(str) { return String(str).length * 7.4 + 2; }
    axX.sort(function (a, b) { return a.p - b.p; });
    var rows = [-1e9, -1e9, -1e9];
    axX.forEach(function (a) {
      var w = tw(a.s), r = 0;
      while (r < 2 && a.p - w / 2 < rows[r] + 3) r++;
      rows[r] = a.p + w / 2;
      labels.push(textEl(a.p, mt + ph + 17 + r * 15, a.s, 'dg-t', 'middle', a.st));
    });
    if (xTitle) {
      var tl = ml + pw + 4 - tw(xTitle), busy = rows[1] > tl - 3 || rows[2] > tl - 3;
      out.push(textEl(ml + pw + 4, mt + ph + (busy ? 49 : 34), xTitle, 'dg-s', 'end'));
    }
    axY.sort(function (a, b) { return a.p - b.p; });
    for (var it = 0; it < 30; it++) {
      var moved = false;
      for (var q = 1; q < axY.length; q++) {
        var gap = axY[q].p - axY[q - 1].p;
        if (gap < 14) { var d2 = (14 - gap) / 2; axY[q].p += d2; axY[q - 1].p -= d2; moved = true; }
      }
      if (!moved) break;
    }
    axY.forEach(function (a) {
      if (tw(a.s) > ml - 6) labels.push(textEl(2, a.p + 4.5, a.s, 'dg-t', 'start', a.st));
      else labels.push(textEl(ml - 6, a.p + 4.5, a.s, 'dg-t', 'end', a.st));
    });
    // tick labels give way to the drop labels
    tickLabX.forEach(function (t) {
      var w = tw(t.s);
      if (axX.some(function (a) { return Math.abs(a.p - t.p) < (w + tw(a.s)) / 2 + 2; })) return;
      out.push(textEl(t.p, mt + ph + 17, t.s, 'dg-s'));
    });
    tickLabY.forEach(function (t) {
      if (axY.some(function (a) { return Math.abs(a.p - t.p) < 13; })) return;
      out.push(textEl(ml - 6, t.p + 4.5, t.s, 'dg-s', 'end'));
    });
    // in-plot labels: nudge apart when boxes overlap
    var placed = [];
    labObjs.forEach(function (a) {
      var x = a[0], y = a[1], w = String(a[2]).length * 7.6 + 2, anc = a[4] || 'middle';
      var lx = anc === 'start' ? x : anc === 'end' ? x - w : x - w / 2;
      function hit(yy) { return placed.some(function (b) { return lx < b.x + b.w && lx + w > b.x && yy - 11 < b.y && yy > b.y - 11; }); }
      var tries = [0, -13, 13, -26, 26], k = 0;
      while (k < tries.length && hit(y + tries[k])) k++;
      if (k < tries.length) y += tries[k];
      placed.push({ x: lx, w: w, y: y });
      labels.push(textEl(x, y, a[2], a[3], a[4], a[5]));
    });
    out.push('<g>' + body.join('') + '</g>');
    out.push('<g>' + top.join('') + '</g>');
    out.push('<g>' + labels.join('') + '</g>');
    if (panel.note) out.push(textEl(W - 4, H - 4, T(env, panel.note), 'dg-s', 'end', ' style="font-size:12px"'));
    return { w: W, h: H, body: out.join('') };
  }
  function centroid(pts) {
    var xs = pts.map(function (p) { return p[0]; }), ys = pts.map(function (p) { return p[1]; });
    function avg(a) { return a.every(function (q) { return typeof q === 'number'; }) ? a.reduce(function (s, q) { return s + q; }, 0) / a.length : '(' + a.map(function (q) { return '(' + q + ')'; }).join('+') + ')/' + a.length; }
    return [avg(xs), avg(ys)];
  }

  // Bar panel: items [{l, v, k, vl}], vertical bars with value labels.
  function renderBars(panel, env, st) {
    var W = 320, H = E(env, panel.h, 220), ml = panel.ml || 14, mr = 14, mt = panel.title ? 34 : 18, mb = panel.mb || 40;
    var items = (panel.items || []).filter(function (it) { return visible(it, env, st); });
    var lo = E(env, panel.min, 0), hi = E(env, panel.max, 1), pw = W - ml - mr, ph = H - mt - mb;
    function sy(v) { return mt + ph - (v - lo) / (hi - lo) * ph; }
    var out = [];
    if (panel.title) out.push(textEl(W / 2, 16, T(env, panel.title), 'dg-t'));
    var n = items.length || 1, slot = pw / n, bw = Math.min(64, slot * 0.6);
    var base = sy(Math.max(lo, Math.min(hi, 0)));
    (panel.lines || []).forEach(function (ln) {
      if (!visible(ln, env, st)) return;
      var y = sy(E(env, ln.v));
      out.push('<line x1="' + ml + '" y1="' + f2(y) + '" x2="' + (W - mr) + '" y2="' + f2(y) + '" style="stroke:' + col(ln.k, 'var(--soft,#6b6580)') + ';stroke-width:1.6;stroke-dasharray:6 4"/>');
      if (ln.lab) out.push(textEl(W - mr, ln.below ? y + 15 : y - 5, T(env, ln.lab), 'dg-s', 'end', ln.k ? ' style="fill:' + col(ln.k) + '"' : ''));
    });
    items.forEach(function (it, i) {
      var v = E(env, it.v), cx = ml + slot * (i + 0.5), y = sy(Math.max(lo, Math.min(hi, v)));
      var c = col(it.k || 'blue');
      var y0 = Math.min(y, base), hh = Math.abs(base - y);
      out.push('<rect x="' + f2(cx - bw / 2) + '" y="' + f2(y0) + '" width="' + f2(bw) + '" height="' + f2(Math.max(hh, 0.5)) + '" rx="3" style="fill:' + c + ';fill-opacity:' + (it.op || 0.8) + '"/>');
      var vl = it.vl !== undefined ? T(env, it.vl) : fmtNum(v);
      var vy = v >= 0 ? y0 - 6 : y0 + hh + 16;
      if (vy < mt - 2) vy = y0 + 16;
      out.push(textEl(cx, vy, vl, 'dg-t'));
      var lines = String(T(env, it.l)).split('|');
      lines.forEach(function (ln, j) { out.push(textEl(cx, H - mb + 18 + j * 15, ln, 'dg-s')); });
    });
    out.push('<line x1="' + ml + '" y1="' + f2(base) + '" x2="' + (W - mr) + '" y2="' + f2(base) + '" class="dg-l"/>');
    return { w: W, h: H, body: out.join('') };
  }

  // Payoff grid (2 players x 2 actions). cells[r][c] = [rowPayoff, colPayoff] expressions.
  function renderGrid(panel, env, st) {
    var W = 320, H = E(env, panel.h, 250), out = [];
    var gx = 92, gy = 62, cw = (W - gx - 8) / 2, ch = (H - gy - 10) / 2;
    var rowP = T(env, panel.rowPlayer), colP = T(env, panel.colPlayer);
    out.push(textEl(gx + cw, 18, colP, 'dg-t', 'middle', ' style="fill:' + PAL.purple + '"'));
    out.push(textEl(14, gy + ch, rowP, 'dg-t', 'middle', ' style="fill:' + PAL.blue + '" transform="rotate(-90 14 ' + f2(gy + ch) + ')"'));
    panel.cols.forEach(function (c, j) { out.push(textEl(gx + cw * (j + 0.5), gy - 12, T(env, c), 'dg-t')); });
    panel.rows.forEach(function (r, i) {
      String(T(env, r)).split('|').forEach(function (ln, k, all) { out.push(textEl(gx - 8, gy + ch * (i + 0.5) + 4.5 + (k - (all.length - 1) / 2) * 15, ln, 'dg-t', 'end')); });
    });
    // highlight: bitmask of equilibrium cells (bit r*2+c), shown when revealed (or once predicted if showEq = 'predicted')
    var hl = panel.highlight ? E(env, panel.highlight) : 0;
    var showEq = st.revealed || panel.showEq === true || (panel.showEq === 'predicted' && st.predicted);
    for (var i = 0; i < 2; i++) for (var j = 0; j < 2; j++) {
      var x = gx + cw * j, y = gy + ch * i, cell = panel.cells[i][j];
      var isEq = ((hl >> (i * 2 + j)) & 1) && showEq;
      out.push('<rect x="' + f2(x) + '" y="' + f2(y) + '" width="' + f2(cw) + '" height="' + f2(ch) + '" class="dg-card"' + (isEq ? ' style="fill:' + PAL.yellow + ';fill-opacity:.45"' : '') + '/>');
      var a = E(env, cell[0]), b = E(env, cell[1]);
      var pa = typeof a === 'number' ? fmtNum(a) : a, pb = typeof b === 'number' ? fmtNum(b) : b;
      if (panel.words) {
        out.push(textEl(x + cw / 2, y + ch / 2 - 4, T(env, panel.words[0]).replace('#', pa), 'dg-t', 'middle', ' style="fill:' + PAL.blue + '"'));
        out.push(textEl(x + cw / 2, y + ch / 2 + 14, T(env, panel.words[1]).replace('#', pb), 'dg-t', 'middle', ' style="fill:' + PAL.purple + '"'));
      } else {
        out.push(textEl(x + cw / 2 - 6, y + ch / 2 + 5, pa, 'dg-t', 'end', ' style="fill:' + PAL.blue + '"'));
        out.push(textEl(x + cw / 2, y + ch / 2 + 5, ',', 'dg-n'));
        out.push(textEl(x + cw / 2 + 6, y + ch / 2 + 5, pb, 'dg-t', 'start', ' style="fill:' + PAL.purple + '"'));
      }
    }
    (panel.marks || []).forEach(function (mk) { // best-response ticks: {r, c, who:'row'|'col', if}
      if (!visible(mk, env, st)) return;
      var x = gx + cw * mk.c, y = gy + ch * mk.r;
      if (mk.who === 'row') out.push(textEl(x + 14, y + 20, '✓', 'dg-t', 'middle', ' style="fill:' + PAL.blue + '"'));
      else out.push(textEl(x + cw - 14, y + 20, '✓', 'dg-t', 'middle', ' style="fill:' + PAL.purple + '"'));
    });
    return { w: W, h: H, body: out.join('') };
  }

  // Circular flow: boxes and flows. nodes {id:{x,y,w,h,l}}, flows [{from:[x,y], to:[x,y], w(expr width), k, lab, via:[[x,y]...]}], meters
  function renderFlow(panel, env, st) {
    var W = 320, H = E(env, panel.h, 300), out = [];
    if (panel.title) out.push(textEl(W / 2, 16, T(env, panel.title), 'dg-t'));
    (panel.flows || []).forEach(function (fl) {
      if (!visible(fl, env, st)) return;
      var w = Math.max(1.5, E(env, fl.w, 6)), c = col(fl.k || 'blue');
      var pts = [fl.from].concat(fl.via || []).concat([fl.to]).map(function (p) { return [E(env, p[0]), E(env, p[1])]; });
      var d = pts.map(function (p, i) { return (i ? 'L' : 'M') + f2(p[0]) + ' ' + f2(p[1]); }).join('');
      out.push('<path d="' + d + '" style="fill:none;stroke:' + c + ';stroke-width:' + f2(w) + ';stroke-linejoin:round;opacity:.85"/>');
      var a = pts[pts.length - 2], b = pts[pts.length - 1];
      out.push(arrowHead(b[0], b[1], Math.atan2(b[1] - a[1], b[0] - a[0]), c, 10 + w * 0.5, 5 + w * 0.6));
      if (fl.lab) {
        var at = fl.at ? [E(env, fl.at[0]), E(env, fl.at[1])] : [(pts[0][0] + pts[1][0]) / 2, (pts[0][1] + pts[1][1]) / 2];
        out.push(textEl(at[0], at[1], T(env, fl.lab), 'dg-t', fl.anchor || 'middle', ' style="fill:' + c + '"'));
      }
    });
    (panel.nodes || []).forEach(function (nd) {
      if (!visible(nd, env, st)) return;
      var x = E(env, nd.x), y = E(env, nd.y), w = E(env, nd.w, 100), h = E(env, nd.h, 40);
      out.push('<rect x="' + f2(x - w / 2) + '" y="' + f2(y - h / 2) + '" width="' + f2(w) + '" height="' + f2(h) + '" rx="10" class="dg-card"/>');
      String(T(env, nd.l)).split('|').forEach(function (ln, k, all) { out.push(textEl(x, y + 5 + (k - (all.length - 1) / 2) * 16, ln, k ? 'dg-n' : 'dg-t')); });
    });
    (panel.texts || []).forEach(function (tx) { if (visible(tx, env, st)) out.push(textEl(E(env, tx.x), E(env, tx.y), T(env, tx.s), tx.c || 'dg-t', tx.anchor || 'middle', tx.k ? ' style="fill:' + col(tx.k) + '"' : '')); });
    return { w: W, h: H, body: out.join('') };
  }

  var PANELS = { xy: renderXY, bars: renderBars, grid: renderGrid, flow: renderFlow };

  /* ------------------------------------------------------------------ templates */
  // A template supplies defaults and a state -> drawing function (panels from config + model).
  // Templates T01..T20 share the xy renderer; T16-T18 add their own panel kinds.
  var TEMPLATES = {};
  function register(id, def) { TEMPLATES[id] = def; }
  var TNAMES = {
    T01: 'Supply and demand shifts', T02: 'Elasticity and revenue', T03: 'Tax and subsidy incidence, deadweight loss', T04: 'Price ceilings and floors',
    T05: 'Externalities', T06: 'Production possibility curve', T07: 'Production and cost curves', T08: 'Market structures and profit',
    T09: 'Labour market', T10: 'AD/AS', T11: 'Multiplier', T12: 'Phillips curve', T13: 'Money market and loanable funds', T14: 'Foreign exchange market',
    T15: 'Tariffs and quotas', T16: 'Lorenz curve and Gini', T17: 'Game theory payoff grid', T18: 'Circular flow', T19: 'Indifference curves and budget line', T20: 'Keynesian cross'
  };
  Object.keys(TNAMES).forEach(function (id) {
    register(id, {
      name: TNAMES[id],
      draw: function (cfg, env, st, idp) { // state -> drawing
        return (cfg.panels || []).filter(function (p) { return visible(p, env, st); }).map(function (p, i) {
          var r = (PANELS[p.type || 'xy'])(p, env, st, idp + '-' + i);
          return { w: r.w, h: r.h, body: r.body, alt: T(env, p.alt || cfg.alt || '') };
        });
      }
    });
  });
  function drawPanels(cfg, env, st, idp) {
    var tpl = TEMPLATES[cfg.template] || TEMPLATES.T01;
    return tpl.draw(cfg, env, st, idp);
  }
  function trimZeros(str) { return String(str).replace(/(\d)\.0+(?![\d])/g, '$1'); }
  function svgOf(p, extraClass) {
    return '<svg xmlns="' + NS + '" class="dg eg-svg' + (extraClass || '') + '" viewBox="0 0 ' + p.w + ' ' + f2(p.h) + '" role="img" aria-label="' + esc(p.alt) + '"><style>' + STYLE + '</style>' + p.body + '</svg>';
  }

  // Static SVG of the starting state: all panels stacked, 320 wide. Used for graphs/fallback/*.svg.
  function renderStatic(cfg, params) {
    var env = evalModel(cfg, params || startParams(cfg));
    var ps = drawPanels(cfg, env, { predicted: false, revealed: false }, 'f' + (cfg.id || 'x').replace(/[^A-Za-z0-9]/g, ''));
    var y = 0, parts = [];
    ps.forEach(function (p) { parts.push('<g transform="translate(0 ' + f2(y) + ')">' + p.body + '</g>'); y += p.h + 6; });
    var alt = T(env, cfg.alt || cfg.title || 'Graph');
    return '<svg xmlns="' + NS + '" class="dg eg-static" viewBox="0 0 320 ' + f2(y - 6) + '" role="img" aria-label="' + esc(alt) + '" data-lab="' + esc(cfg.id || '') + '"><title>' + esc(T(env, cfg.title || '')) + '</title><style>' + STYLE + '</style>' + parts.join('') + '</svg>';
  }

  /* ------------------------------------------------------------------ the lab UI */
  function h(tag, attrs, kids) {
    var el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'text') el.textContent = attrs[k];
      else if (k === 'html') el.innerHTML = attrs[k];
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== false && attrs[k] !== undefined && attrs[k] !== null) el.setAttribute(k, attrs[k] === true ? '' : attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c) el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return el;
  }
  function md(s) { // **bold** only
    return esc(s).replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  }

  function Lab(root, cfg) {
    this.root = root; this.cfg = cfg; this.id = cfg.id || root.getAttribute('data-lab') || 'lab';
    this.params = startParams(cfg);
    this.st = { predicted: false, revealed: false, choice: null, wrong: 0, solved: false, moved: false };
    this.idp = 'L' + (++uid);
    this.build();
    this.update();
  }
  Lab.prototype.build = function () {
    var cfg = this.cfg, self = this, P = cfg.predict || {};
    var box = h('div', { class: 'eg-box' });
    if (cfg.title) box.appendChild(h('div', { class: 'eg-head' }, [h('span', { class: 'eg-badge', text: cfg.badge || 'Graph lab' }), h('span', { class: 'eg-title', text: cfg.title })]));
    if (cfg.intro) box.appendChild(h('p', { class: 'eg-intro', html: md(cfg.intro) }));
    if (cfg.illustrative !== false) box.appendChild(h('p', { class: 'eg-ill', text: cfg.illustrativeText || 'Illustrative data' }));
    this.figs = h('div', { class: 'eg-figs' });
    box.appendChild(this.figs);
    // prediction
    var pred = h('div', { class: 'eg-pred', role: 'group', 'aria-label': 'Your prediction' });
    pred.appendChild(h('p', { class: 'eg-q', html: '<span class="eg-step">1</span><span>' + md(P.q || 'Predict first.') + '</span>' }));
    var opts = h('div', { class: 'eg-opts' });
    this.optBtns = (P.options || []).map(function (o) {
      var b = h('button', { type: 'button', class: 'eg-opt', 'data-k': o.k, 'aria-pressed': 'false' }, [h('span', { class: 'eg-k', text: o.k }), h('span', { class: 'eg-ot', html: md(o.s) })]);
      b.addEventListener('click', function () { self.choose(o.k); });
      opts.appendChild(b);
      return b;
    });
    pred.appendChild(opts);
    box.appendChild(pred);
    // controls
    var cwrap = h('div', { class: 'eg-ctrls eg-locked' });
    this.lockNote = h('p', { class: 'eg-lock', text: P.lockText || 'Make your prediction to unlock the controls.' });
    cwrap.appendChild(h('p', { class: 'eg-q', html: '<span class="eg-step">2</span><span>' + md(cfg.task || 'Move the controls and watch the graph.') + '</span>' }));
    cwrap.appendChild(this.lockNote);
    this.ctrlEls = {};
    (cfg.controls || []).forEach(function (c) { cwrap.appendChild(self.buildControl(c)); });
    box.appendChild(cwrap);
    this.cwrap = cwrap;
    // readouts
    this.read = h('div', { class: 'eg-read', 'aria-live': 'polite', 'aria-atomic': 'false' });
    box.appendChild(this.read);
    // actions
    this.checkBtn = h('button', { type: 'button', class: 'eg-btn eg-check', text: cfg.checkText || 'Check my prediction', disabled: true, onclick: function () { self.check(); } });
    this.resetBtn = h('button', { type: 'button', class: 'eg-btn eg-ghost eg-reset', text: 'Reset', onclick: function () { self.reset(); } });
    box.appendChild(h('div', { class: 'eg-actions' }, [h('span', { class: 'eg-step', text: '3' }), this.checkBtn, this.resetBtn]));
    this.fb = h('div', { class: 'eg-fb', 'aria-live': 'polite' });
    box.appendChild(this.fb);
    this.box = box;
  };
  Lab.prototype.buildControl = function (c) {
    var self = this, id = this.idp + '-' + c.id, row;
    if (c.type === 'range') {
      var out = h('output', { class: 'eg-val', for: id });
      var inp = h('input', { type: 'range', id: id, min: c.min, max: c.max, step: c.step || 1, value: c.start, disabled: true, 'aria-describedby': id + '-v' });
      out.id = id + '-v';
      inp.addEventListener('input', function () { self.set(c.id, parseFloat(inp.value), true); });
      var marks = null;
      if (c.marks && c.marks.length) {
        marks = h('div', { class: 'eg-marks', 'aria-hidden': 'true' });
        c.marks.forEach(function (mk) {
          var pos = (mk.at - c.min) / (c.max - c.min) * 100;
          marks.appendChild(h('span', { class: 'eg-mark', style: 'left:calc(' + pos + '% + ' + (14 - pos * 0.28) + 'px)', title: mk.l || '' }, [h('i'), mk.l ? h('em', { text: mk.l }) : null]));
        });
      }
      row = h('div', { class: 'eg-ctrl eg-range' }, [h('label', { for: id }, [h('span', { class: 'eg-cl', text: c.label }), out]), inp, marks]);
      this.ctrlEls[c.id] = { input: inp, out: out, c: c };
    } else if (c.type === 'seg' || c.type === 'toggle') {
      var choices = c.type === 'toggle' ? [{ v: 0, l: c.off || 'Off' }, { v: 1, l: c.on || 'On' }] : c.options;
      var grp = h('div', { class: 'eg-seg', role: 'radiogroup', 'aria-label': c.label });
      var btns = choices.map(function (o) {
        var b = h('button', { type: 'button', role: 'radio', 'aria-checked': String(o.v === c.start), disabled: true, text: o.l });
        b.addEventListener('click', function () { self.set(c.id, o.v, true); });
        b.addEventListener('keydown', function (e) {
          var i = choices.indexOf(o), j = -1;
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = Math.min(choices.length - 1, i + 1);
          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = Math.max(0, i - 1);
          if (j >= 0 && j !== i) { e.preventDefault(); self.set(c.id, choices[j].v, true); btns[j].focus(); }
        });
        grp.appendChild(b);
        return b;
      });
      row = h('div', { class: 'eg-ctrl' }, [h('span', { class: 'eg-cl', text: c.label }), grp]);
      this.ctrlEls[c.id] = { btns: btns, choices: choices, c: c };
    } else if (c.type === 'step') {
      var val = h('output', { class: 'eg-val' });
      var nb = h('button', { type: 'button', class: 'eg-btn eg-small', disabled: true, text: c.btn || 'Next', onclick: function () { self.set(c.id, Math.min(c.max, self.params[c.id] + (c.step || 1)), true); } });
      var jb = c.jump ? h('button', { type: 'button', class: 'eg-btn eg-ghost eg-small', disabled: true, text: c.jump, onclick: function () { self.set(c.id, c.max, true); } }) : null;
      var bb = h('button', { type: 'button', class: 'eg-btn eg-ghost eg-small', disabled: true, text: c.back || 'Back', onclick: function () { self.set(c.id, Math.max(c.min || 0, self.params[c.id] - (c.step || 1)), true); } });
      row = h('div', { class: 'eg-ctrl eg-stepper' }, [h('span', { class: 'eg-cl', text: c.label }), val, h('div', { class: 'eg-row' }, [bb, nb, jb])]);
      this.ctrlEls[c.id] = { out: val, btns: [bb, nb].concat(jb ? [jb] : []), c: c, stepper: true };
    }
    if (c.if) row.setAttribute('data-if', c.if);
    return row;
  };
  Lab.prototype.env = function () { return evalModel(this.cfg, this.params, { _pred: this.st.predicted ? 1 : 0, _rev: this.st.revealed ? 1 : 0 }); };
  Lab.prototype.set = function (id, v, user) {
    this.params[id] = v;
    if (user) this.st.moved = true;
    this.update();
  };
  Lab.prototype.setLocked = function (locked) {
    var self = this;
    this.cwrap.classList.toggle('eg-locked', locked);
    this.lockNote.hidden = !locked;
    Object.keys(this.ctrlEls).forEach(function (k) {
      var ce = self.ctrlEls[k];
      if (ce.input) ce.input.disabled = locked;
      (ce.btns || []).forEach(function (b) { b.disabled = locked; });
    });
    this.checkBtn.disabled = locked || this.st.solved;
  };
  Lab.prototype.update = function () {
    var self = this, cfg = this.cfg, env;
    try { env = this.env(); } catch (e) { this.fail(e); return; }
    this.lastEnv = env;
    // controls
    Object.keys(this.ctrlEls).forEach(function (k) {
      var ce = self.ctrlEls[k], c = ce.c, v = self.params[k];
      var sub = { v: Object.create(env.v), fn: env.fn, cfg: env.cfg }; sub.v.v = v;
      var txt = c.fmt ? T(sub, c.fmt) : fmtNum(v);
      if (ce.input) { if (parseFloat(ce.input.value) !== v) ce.input.value = v; ce.out.textContent = txt; ce.input.setAttribute('aria-valuetext', txt); }
      if (ce.stepper) ce.out.textContent = txt;
      if (ce.choices) ce.btns.forEach(function (b, i) { b.setAttribute('aria-checked', String(ce.choices[i].v === v)); b.tabIndex = ce.choices[i].v === v ? 0 : -1; });
    });
    this.cwrap.querySelectorAll('[data-if]').forEach(function (row) { row.hidden = !E(env, row.getAttribute('data-if')); });
    // graph
    var ps = drawPanels(cfg, env, this.st, this.idp);
    var html = ps.map(function (p) { return svgOf(p); }).join('');
    this.figs.innerHTML = html;
    this.figs.classList.toggle('eg-two', ps.length > 1);
    // readouts
    var rows = (cfg.readouts || []).filter(function (r) { return visible(r, env, self.st); });
    var key = rows.map(function (r) { return T(env, r.l) + '\u0001' + T(env, r.v); }).join('\u0002');
    if (key !== this.readKey) {
      this.readKey = key;
      this.read.innerHTML = rows.map(function (r) {
        var cls = r.k ? ' style="--eg-rc:' + col(r.k) + '"' : '';
        return '<div class="eg-r' + (r.k ? ' eg-rk' : '') + (r.wide ? ' eg-rw' : '') + '"' + cls + '><span class="eg-rl">' + md(T(env, r.l)) + '</span><span class="eg-rv">' + md(trimZeros(T(env, r.v))) + '</span></div>';
      }).join('');
    }
    // live task hint
    if (this.st.predicted && !this.st.solved) {
      var ok = this.targetMet(env);
      this.checkBtn.classList.toggle('eg-ready', ok);
    }
  };
  Lab.prototype.targetMet = function (env) {
    var tg = this.cfg.target;
    if (!tg || !tg.expr) return this.st.moved || !(this.cfg.controls || []).length;
    try { return !!E(env, tg.expr); } catch (e) { return false; }
  };
  Lab.prototype.choose = function (k) {
    if (this.st.solved) return;
    var self = this;
    this.st.choice = k; this.st.predicted = true;
    this.optBtns.forEach(function (b) {
      var on = b.getAttribute('data-k') === k;
      b.classList.toggle('eg-sel', on); b.setAttribute('aria-pressed', String(on));
      b.classList.remove('eg-wrong');
    });
    this.setLocked(false);
    var tg = this.cfg.target || {};
    this.fb.className = 'eg-fb eg-info';
    this.fb.innerHTML = '<p>' + md('Prediction locked in: **' + k + '**. ' + (tg.do || 'Now move the controls.')) + '</p>';
    this.update();
  };
  Lab.prototype.check = function () {
    var cfg = this.cfg, P = cfg.predict || {}, env = this.lastEnv || this.env(), self = this;
    if (!this.st.predicted) return;
    if (!this.targetMet(env)) {
      this.fb.className = 'eg-fb eg-info';
      this.fb.innerHTML = '<p>' + md((cfg.target && cfg.target.hint) || ('First: ' + ((cfg.target && cfg.target.do) || 'move the controls.'))) + '</p>';
      return;
    }
    var k = this.st.choice, right = k === P.correct;
    var opt = (P.options || []).filter(function (o) { return o.k === k; })[0] || {};
    var good = (P.options || []).filter(function (o) { return o.k === P.correct; })[0] || {};
    var html;
    if (right) {
      this.st.solved = true; this.st.revealed = true;
      html = '<p class="eg-verdict">' + md('Correct: ' + P.correct + '.') + '</p>' + (opt.fb ? '<p>' + md(T(env, opt.fb)) + '</p>' : '') +
        (cfg.takeaway ? '<p class="eg-take">' + md(T(env, cfg.takeaway)) + '</p>' : '') + (cfg.explore ? '<p class="eg-more">' + md(T(env, cfg.explore)) + '</p>' : '');
      this.fb.className = 'eg-fb eg-ok';
      this.optBtns.forEach(function (b) { b.disabled = true; if (b.getAttribute('data-k') === k) b.classList.add('eg-right'); });
      this.checkBtn.disabled = true;
      this.checkBtn.classList.remove('eg-ready');
      this.checkBtn.textContent = 'Checked';
    } else {
      this.st.wrong++;
      var reveal = this.st.wrong >= 2;
      html = '<p class="eg-verdict">' + md('Not quite: you chose ' + k + '.') + '</p><p>' + md(T(env, opt.fb || 'Look again at what the graph shows.')) + '</p>';
      if (reveal) {
        this.st.revealed = true;
        html += '<p class="eg-take">' + md('The answer is **' + P.correct + '**' + (good.s ? ': ' + good.s : '') + '. ' + T(env, cfg.takeaway || '')) + '</p>';
      } else html += '<p class="eg-more">' + md('Look at the graph and the numbers, then pick another prediction.') + '</p>';
      this.fb.className = 'eg-fb eg-no';
      this.optBtns.forEach(function (b) { if (b.getAttribute('data-k') === k) { b.classList.add('eg-wrong'); b.classList.remove('eg-sel'); } });
    }
    this.fb.innerHTML = html;
    this.update();
  };
  Lab.prototype.reset = function () {
    this.params = startParams(this.cfg);
    this.st.moved = false;
    this.update();
  };
  Lab.prototype.fail = function (e) {
    if (window.console) console.error('[econ-graphs] ' + this.id + ': ' + e.message);
    this.fb.className = 'eg-fb eg-no';
    this.fb.textContent = 'This graph could not be drawn.';
  };

  /* ------------------------------------------------------------------ mounting */
  function findInlineConfig(el) {
    var s = el.querySelector('script.eg-config');
    if (!s && el.nextElementSibling && el.nextElementSibling.matches && el.nextElementSibling.matches('script.eg-config')) s = el.nextElementSibling;
    if (!s && el.previousElementSibling && el.previousElementSibling.matches && el.previousElementSibling.matches('script.eg-config')) s = el.previousElementSibling;
    return s ? JSON.parse(s.textContent) : null;
  }
  function start(el, cfg) {
    try {
      if (!cfg.id) cfg.id = el.getAttribute('data-lab');
      var lab = new Lab(el, cfg);
      var fbk = el.querySelector('.eg-fallback');
      if (fbk) fbk.parentNode.replaceChild(lab.box, fbk); else el.appendChild(lab.box);
      el.classList.add('eg-live');
      el._egLab = lab;
      return lab;
    } catch (e) {
      if (window.console) console.error('[econ-graphs] ' + (cfg && cfg.id) + ': ' + e.message);
      return null; // the static fallback stays
    }
  }
  function mount(el) {
    if (el._egLab || el._egPending) return el._egLab;
    var cfg = null;
    try { cfg = findInlineConfig(el); } catch (e) { if (window.console) console.error('[econ-graphs] bad inline config: ' + e.message); }
    if (cfg) return start(el, cfg);
    var url = el.getAttribute('data-config');
    if (url && window.fetch) {
      el._egPending = true;
      fetch(url).then(function (r) { return r.json(); }).then(function (c) { el._egPending = false; start(el, c); })
        .catch(function (e) { el._egPending = false; if (window.console) console.warn('[econ-graphs] could not load ' + url + ': ' + e.message); });
    }
    return null;
  }
  function mountAll(root) { Array.prototype.forEach.call((root || document).querySelectorAll('.eg-lab'), mount); }

  var API = { version: VERSION, mount: mount, mountAll: mountAll, renderStatic: renderStatic, register: register, templates: TEMPLATES,
    model: function (cfg, params) { var p = startParams(cfg); Object.keys(params || {}).forEach(function (k) { p[k] = params[k]; }); return evalModel(cfg, p).v; },
    startParams: startParams, compile: compile, fmt: fmtNum, text: function (cfg, params, s) { var p = startParams(cfg); Object.keys(params || {}).forEach(function (k) { p[k] = params[k]; }); return T(evalModel(cfg, p), s); } };
  if (typeof window !== 'undefined') {
    window.EconGraphs = API;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { mountAll(); });
    else mountAll();
  }
})();
