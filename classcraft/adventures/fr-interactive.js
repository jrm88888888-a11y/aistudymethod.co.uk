/* fr-interactive.js: French "Try it" lab engine, templates T01-T05.
   Turns <div class="fr-lab" data-lab="F29-I1"> + an adjacent
   <script type="application/json" class="fr-lab-spec"> into a lab.
   Spec format: SCHEMA.md. No dependencies. Never throws on a bad spec. */
(() => {
  'use strict';
  var DEF_AUDIO = '/classcraft/adventures/fr-audio/';
  var VOWEL = /^[aeiouyàâäéèêëîïôöùûüœæ]/i;
  var PUNCT = /^[.,!?;:…»)]$/;
  var NOHY = /^(et|cents?|milles?|millions?|milliards?)$/i;

  /* ---------- helpers ---------- */
  function h(tag, a, kids) {
    var n = document.createElement(tag), k;
    if (a) for (k in a) {
      var v = a[k];
      if (v == null || v === false) continue;
      if (k === 'text') n.textContent = v;
      else if (k === 'cls') n.className = v;
      else if (k === 'on') { for (var e in v) n.addEventListener(e, v[e]); }
      else n.setAttribute(k, v === true ? '' : v);
    }
    add(n, kids);
    return n;
  }
  function add(n, kids) {
    if (kids == null) return n;
    (Array.isArray(kids) ? kids : [kids]).forEach(c => {
      if (c == null || c === false) return;
      n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return n;
  }
  function btn(kids, cls, fn, a) {
    a = a || {}; a.type = 'button'; a.cls = 'frl-btn ' + (cls || ''); if (fn) a.on = { click: fn };
    return h('button', a, kids);
  }
  function each(l, f) { [].forEach.call(l, f); }
  function clear(n) { while (n.firstChild) n.removeChild(n.firstChild); return n; }
  function eq(a, b) { return a.length === b.length && a.every((x, i) => x === b[i]); }
  function norm(c) { return typeof c === 'string' ? { text: c } : c; }
  function val(c) { return c.value != null ? c.value : c.text; }
  // French typography: non-breaking space before ? ! : ; » and after «
  function fr(s) {
    return String(s).replace(/[  ]([?!:;»])/g, ' $1').replace(/« /g, '« ');
  }
  // *French* -> <i lang="fr">, **bold** -> <b>. isFr: whole string is French.
  function rich(s, isFr) {
    var f = document.createDocumentFragment(), re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g, last = 0, m;
    s = String(s == null ? '' : s);
    function tx(t) { return document.createTextNode(isFr ? fr(t) : t); }
    while ((m = re.exec(s))) {
      if (m.index > last) f.appendChild(tx(s.slice(last, m.index)));
      if (m[1] != null) f.appendChild(h('b', null, rich(m[1], isFr)));
      else f.appendChild(h('i', isFr ? null : { lang: 'fr' }, fr(m[2])));
      last = re.lastIndex;
    }
    if (last < s.length) f.appendChild(tx(s.slice(last)));
    return f;
  }
  function frSpan(s, cls) { return h('span', { lang: 'fr', cls: cls }, rich(s, true)); }
  function plain(s) { return String(s).replace(/\*\*?/g, ''); }

  // Join chip values (SCHEMA §5 morph, §6 words/number)
  function join(parts, mode, elide) {
    var out = '', glue = true;
    parts.forEach(p => {
      if (p == null) return;
      p = String(p);
      if (mode === 'morph') {
        var lead = p.charAt(0) === '-', v = p.replace(/^-/, '');
        var tr = /-$/.test(v); v = v.replace(/-$/, '');
        if (v === '') { if (tr) glue = true; return; }
        out += (out === '' || glue || lead) ? v : PUNCT.test(v) ? (/[?!;:»]/.test(v) ? '\u00a0' : '') + v : ' ' + v;
        glue = tr || /['’]$/.test(v);
        return;
      }
      if (p === '') return;
      if (mode === 'number') { out += out === '' ? p : ((NOHY.test(p) || NOHY.test(out.split(/[ -]/).pop())) ? ' ' : '-') + p; return; }
      if (out === '') out = p;
      else if (PUNCT.test(p)) out += (/[?!;:»]/.test(p) ? ' ' : '') + p;
      else if (p.charAt(0) === '-') out += /-$/.test(out) ? p.slice(1) : p;
      else if (glue) out += (/«$/.test(out) ? ' ' : '') + p;
      else {
        var w = (out.match(/(\S+)$/) || ['', ''])[1];
        if (elide && elide.indexOf(w.toLowerCase()) >= 0 && VOWEL.test(p)) out = out.slice(0, -w.length) + w.slice(0, -1) + "'" + p;
        else out += ' ' + p;
      }
      glue = /['’-]$/.test(p) || p === '«' || p === '(';
    });
    return out;
  }
  // a chip button: data-v holds the chip text (used by tests and builders)
  function chip(c, role, fn, extra) {
    var k = [];
    if (c.label) k.push(h('small', { cls: 'frl-cap' }, rich(c.label)));
    k.push(frSpan(c.text));
    var a = { 'data-v': c.text, 'aria-pressed': 'false' };
    for (var x in extra || {}) a[x] = extra[x];
    return btn(k, 'frl-chip frl-r-' + (c.role || role || 'word'), fn, a);
  }
  function press(b, on) { b.setAttribute('aria-pressed', on ? 'true' : 'false'); }
  function mark(n, ok) {
    n.classList.remove('frl-ok', 'frl-bad');
    var old = n.querySelector(':scope > .frl-m'); if (old) n.removeChild(old);
    if (ok == null) return;
    n.classList.add(ok ? 'frl-ok' : 'frl-bad');
    n.appendChild(h('span', { cls: 'frl-m', 'aria-label': ok ? 'correct' : 'wrong' }, ok ? '✓' : '✗'));
  }
  function says(list, test) {
    var o = [];
    (list || []).forEach(m => { if (test(m) && o.indexOf(m.say) < 0) o.push(m.say); });
    return o;
  }
  function row(kids, label) { return h('div', { cls: 'frl-row', 'data-row': '', role: 'group', 'aria-label': label || null }, kids); }

  /* ---------- audio (T05) ---------- */
  var probes = {};
  function audioUrl(root, clip) {
    var base = root.getAttribute('data-audio-base') || window.FR_AUDIO_BASE || DEF_AUDIO;
    return base + encodeURIComponent(clip) + '.mp3';
  }
  function probe(url) {
    if (!probes[url]) {
      probes[url] = (window.fetch && /^https?:/.test(location.protocol))
        ? fetch(url, { method: 'HEAD' }).then(r => r.ok, () => false)
        : Promise.resolve(false);
    }
    return probes[url];
  }
  function play(url) { try { var a = new Audio(url); var p = a.play(); if (p && p.catch) p.catch(() => {}); } catch (e) { /* no audio */ } }

  /* ---------- T01 Conjugator ---------- */
  function T01(ph) {
    return ph.items.map(it => {
      var slots = it.slots || ph.slots || [{ name: 'form', role: 'word' }];
      var sel = slots.map(() => null);
      var chipsOf = s => ((it.chips && it.chips[s.name]) || (ph.chips && ph.chips[s.name]) || []).map(norm);
      var boxes = slots.map(s => { return h('span', { cls: 'frl-box frl-r-' + (s.role || 'word'), lang: 'fr' }, '…'); });
      var built = h('p', { cls: 'frl-built', lang: 'fr' });
      var btns = [];
      var node = h('div', { cls: 'frl-item' });
      if (it.prompt) node.appendChild(h('p', { cls: 'frl-prompt' }, rich(it.prompt)));
      var line = h('p', { cls: 'frl-line' });
      if (it.prefix) line.appendChild(frSpan(it.prefix, 'frl-fix'));
      boxes.forEach(b => { line.appendChild(b); });
      if (it.suffix) line.appendChild(frSpan(it.suffix, 'frl-fix'));
      node.appendChild(line);
      slots.forEach((s, i) => {
        var cs = chipsOf(s);
        btns[i] = cs.map(c => {
          return chip(c, s.role, () => { if (!lock) { sel[i] = c; render(); } }, { 'data-slot': i });
        });
        node.appendChild(h('div', { cls: 'frl-slotrow' }, [h('p', { cls: 'frl-lab' }, rich(s.label || s.name)), row(btns[i], plain(s.label || s.name))]));
      });
      node.appendChild(built);
      var lock = false;
      function form(arr) { return join([it.prefix].concat(arr.map(c => c ? val(c) : '…'), [it.suffix]), 'morph'); }
      function render() {
        slots.forEach((s, i) => {
          boxes[i].textContent = sel[i] ? sel[i].text : '…'; mark(boxes[i], null);
          btns[i].forEach(b => { press(b, sel[i] && b.getAttribute('data-v') === sel[i].text); });
        });
        built.textContent = sel.some(Boolean) ? '→ ' + fr(form(sel)) : '';
      }
      return {
        node: node,
        check: () => {
          if (sel.some(c => !c)) return { state: 'empty' };
          var t = sel.map(c => c.text), ok = eq(t, it.answer);
          boxes.forEach((b, i) => { mark(b, t[i] === it.answer[i]); });
          return { state: ok ? 'ok' : 'bad', says: says(it.mistakes, m => {
            return m.match.length === t.length && m.match.every((x, i) => x === '*' || x === t[i]);
          }) };
        },
        reveal: () => {
          sel = slots.map((s, i) => { return chipsOf(s).filter(c => c.text === it.answer[i])[0]; });
          render(); boxes.forEach(b => { mark(b, true); });
        },
        answer: () => {
          return form(slots.map((s, i) => { return chipsOf(s).filter(c => c.text === it.answer[i])[0]; }));
        },
        lock: () => { lock = true; }
      };
    });
  }

  /* ---------- T02 Sentence builder ---------- */
  function m2(m, t) {
    if (m.seq && !eq(m.seq, t)) return false;
    if (m.has) {
      var found = false;
      for (var i = 0; i + m.has.length <= t.length; i++) if (eq(t.slice(i, i + m.has.length), m.has)) found = true;
      if (!found) return false;
    }
    if (m.uses && [].concat(m.uses).some(u => t.indexOf(u) < 0)) return false;
    if (m.lacks && [].concat(m.lacks).some(u => t.indexOf(u) >= 0)) return false;
    if (m.order) { var a = t.indexOf(m.order[0]), b = t.indexOf(m.order[1]); if (a < 0 || b < 0 || a > b) return false; }
    if (m.at) {
      var ats = Array.isArray(m.at[0]) ? m.at : [m.at];
      if (ats.some(p => t[p[0] - 1] !== p[1])) return false;
    }
    return true;
  }
  function T02(ph) {
    return ph.items.map(it => {
      var chips = (it.chips || ph.chips).map(norm);
      var elide = it.elide || ph.elide, mode = (it.join || ph.join) === 'number' ? 'number' : 'words';
      var frame = it.frame, labels = it.slots;
      var n = frame ? frame.split('{}').length - 1 : labels ? labels.length : 0;
      var fixed = n > 0, placed = [], target = -1, lock = false, dragI = null;
      for (var k = 0; k < n; k++) placed.push(null);
      var node = h('div', { cls: 'frl-item' });
      if (it.prompt) node.appendChild(h('p', { cls: 'frl-prompt' }, rich(it.prompt)));
      if (it.source) node.appendChild(h('p', { cls: 'frl-src' }, frSpan(it.source)));
      var ans = h('div', { cls: 'frl-ans' + (fixed ? '' : ' frl-row frl-drop'), 'data-row': fixed ? null : '', 'aria-label': 'Your sentence' });
      var tray = row(null, 'Chips');
      tray.classList.add('frl-tray');
      var prev = h('p', { cls: 'frl-built', lang: 'fr' });
      node.appendChild(ans); node.appendChild(prev);
      node.appendChild(h('p', { cls: 'frl-lab' }, 'Chips (tap to place, tap again to remove):'));
      node.appendChild(tray);
      node.appendChild(btn('Clear', 'frl-ghost', () => { if (!lock) { placed = placed.map(() => null).filter(() => fixed); render(); } }));
      function toks(arr) { return arr.map(i => i == null ? null : chips[i].text); }
      function sentence(arr) { return join(arr.map(i => i == null ? '___' : val(chips[i])).concat(it.end ? [it.end] : []), mode, elide); }
      function put(i, at) {
        if (lock) return;
        var was = placed.indexOf(i);
        if (fixed) {
          if (was >= 0) placed[was] = null;
          var t = at != null ? at : (target >= 0 && placed[target] == null ? target : placed.indexOf(null));
          if (t < 0) return;
          if (placed[t] != null && was >= 0) placed[was] = placed[t];
          placed[t] = i; target = -1;
        } else {
          if (was >= 0) placed.splice(was, 1);
          if (at == null || at > placed.length) placed.push(i); else placed.splice(at, 0, i);
        }
        render();
      }
      function take(pos) { if (lock) return; if (fixed) { placed[pos] = null; target = pos; } else placed.splice(pos, 1); render(); }
      function dz(el, at) {
        el.addEventListener('dragover', e => { e.preventDefault(); });
        el.addEventListener('drop', e => { e.preventDefault(); e.stopPropagation(); if (dragI != null) put(dragI, at); dragI = null; });
      }
      function dg(b, i) { b.draggable = true; b.addEventListener('dragstart', e => { dragI = i; try { e.dataTransfer.setData('text/plain', String(i)); } catch (x) { /* old browsers */ } }); }
      if (!fixed) dz(ans, null);
      function slotBtn(pos) {
        var i = placed[pos];
        var b = i == null
          ? btn('___', 'frl-slot', () => { target = pos; render(); }, { 'data-pos': pos + 1, 'aria-label': 'Empty slot ' + (pos + 1) + (target === pos ? ' (selected)' : '') })
          : chip(chips[i], 'word', () => { take(pos); }, { 'data-pos': pos + 1, 'aria-label': chips[i].text + ': tap to remove' });
        if (target === pos) b.classList.add('frl-target');
        if (i != null) dg(b, i);
        dz(b, pos);
        return b;
      }
      function render() {
        clear(ans);
        if (frame) {
          var parts = frame.split('{}'), p = h('p', { cls: 'frl-line', lang: 'fr' });
          parts.forEach((s, j) => { if (s) p.appendChild(h('span', null, fr(s))); if (j < n) p.appendChild(slotBtn(j)); });
          ans.appendChild(p);
        } else if (labels) {
          labels.forEach((l, j) => { ans.appendChild(h('div', { cls: 'frl-slotrow' }, [h('p', { cls: 'frl-lab' }, rich(l)), slotBtn(j)])); });
        } else {
          if (!placed.length) ans.appendChild(h('span', { cls: 'frl-hint' }, 'Tap chips to build the sentence here.'));
          placed.forEach((i, pos) => { var b = chip(chips[i], 'word', () => { take(pos); }, { 'data-pos': pos + 1 }); dg(b, i); dz(b, pos); ans.appendChild(b); });
        }
        clear(tray);
        chips.forEach((c, i) => {
          var used = placed.indexOf(i) >= 0;
          var b = chip(c, 'word', () => { put(i); }, { 'data-i': i, disabled: used || null });
          if (used) b.classList.add('frl-used');
          dg(b, i); tray.appendChild(b);
        });
        prev.textContent = (!fixed || labels) && placed.some(i => i != null) ? '→ ' + fr(sentence(placed)) : '';
      }
      render();
      return {
        node: node,
        check: () => {
          var t = toks(placed);
          if ((fixed && t.indexOf(null) >= 0) || !t.length) return { state: 'empty' };
          var ok = [it.answer].concat(it.alternatives || []).some(a => eq(a, t));
          var bs = ans.querySelectorAll('[data-pos]');
          if (!ok) each(bs, (b, j) => { mark(b, t[j] === it.answer[j]); });
          else each(bs, b => { mark(b, true); });
          return { state: ok ? 'ok' : 'bad', says: says(it.mistakes, m => m2(m, t)) };
        },
        reveal: () => {
          var used = [];
          placed = it.answer.map(a => {
            for (var i = 0; i < chips.length; i++) if (chips[i].text === a && used.indexOf(i) < 0) { used.push(i); return i; }
            return null;
          });
          render();
        },
        answer: () => {
          if (frame) { var j = 0; return frame.replace(/\{\}/g, () => it.answer[j++]); }
          return join(it.answer.concat(it.end ? [it.end] : []), mode, elide);
        },
        lock: () => { lock = true; }
      };
    });
  }

  /* ---------- T03 Agreement switch ---------- */
  function T03(ph) {
    return ph.rounds.map(r => {
      var tg = r.toggles.map(t => { return { name: t.name, label: t.label, states: t.states.map(norm) }; });
      var blanks = r.blanks.map(b => { return { name: b.name, stem: b.stem || '', role: b.role || 'agree', chips: b.chips.map(norm) }; });
      var cur = {}, picks = {}, lock = false, tbtn = {};
      tg.forEach(t => { cur[t.name] = t.states[0].text; });
      function key(c) { return tg.map(t => c[t.name]).join('|'); }
      var cases = {};
      r.cases.forEach(c => { cases[key(c.when)] = c; });
      function shown(c, b, v) {
        if (v == null) return '___';
        var ch = b.chips.filter(x => x.text === v)[0];
        return join([b.stem, ch ? val(ch) : v], 'morph');
      }
      function frameFor(c, pk, wrap) {
        var f = c.frame || r.frame, out = h('span', { lang: 'fr' });
        f.split(/(\{[^}]+\})/).forEach(s => {
          var m = s.match(/^\{([^}]+)\}$/);
          if (!m) { if (s) out.appendChild(h('span', null, rich(s, true))); return; }
          var b = blanks.filter(x => x.name === m[1])[0];
          if (b) out.appendChild(h('span', { cls: 'frl-box frl-r-' + b.role }, fr(shown(c, b, pk && pk[b.name]))));
          else if (c.when[m[1]] != null) out.appendChild(h('span', { cls: 'frl-tog' }, rich(c.when[m[1]], true)));
        });
        return wrap ? wrap(out) : out;
      }
      var node = h('div', { cls: 'frl-item' });
      if (r.prompt) node.appendChild(h('p', { cls: 'frl-prompt' }, rich(r.prompt)));
      tg.forEach(t => {
        tbtn[t.name] = t.states.map(s => {
          return btn([frSpan(s.text), s.note ? h('small', { cls: 'frl-cap' }, rich(s.note)) : null], 'frl-chip frl-r-subject',
            () => { cur[t.name] = s.text; render(); }, { 'data-toggle': t.name, 'data-state': s.text, 'aria-pressed': 'false' });
        });
        node.appendChild(h('div', { cls: 'frl-slotrow' }, [h('p', { cls: 'frl-lab' }, rich(t.label || t.name)), row(tbtn[t.name], plain(t.label || t.name))]));
      });
      var line = h('p', { cls: 'frl-line frl-big' });
      node.appendChild(line);
      var bb = {};
      blanks.forEach(b => {
        bb[b.name] = b.chips.map(c => {
          return chip(c, b.role, () => {
            var k = key(cur); if (lock || !cases[k]) return;
            (picks[k] = picks[k] || {})[b.name] = c.text; render();
          }, { 'data-blank': b.name });
        });
        node.appendChild(h('div', { cls: 'frl-slotrow' }, [h('p', { cls: 'frl-lab' }, rich(b.label || 'Choose the form')), row(bb[b.name], 'Forms')]));
      });
      var list = h('ul', { cls: 'frl-cases', 'aria-label': 'All cases' });
      node.appendChild(h('p', { cls: 'frl-lab' }, 'Your answers so far (tap one to switch to it):'));
      node.appendChild(list);
      function render() {
        var k = key(cur), c = cases[k];
        tg.forEach(t => { tbtn[t.name].forEach(b => { press(b, b.getAttribute('data-state') === cur[t.name]); }); });
        clear(line).appendChild(c ? frameFor(c, picks[k]) : h('span', { cls: 'frl-hint' }, 'This combination is not used here.'));
        blanks.forEach(b => { bb[b.name].forEach(x => { press(x, !!(picks[k] && picks[k][b.name] === x.getAttribute('data-v'))); }); });
        clear(list);
        r.cases.forEach(cs => {
          var kk = key(cs.when);
          list.appendChild(h('li', { 'data-case': kk }, btn(frameFor(cs, picks[kk]), 'frl-case', () => {
            tg.forEach(t => { cur[t.name] = cs.when[t.name]; }); render();
          })));
        });
      }
      render();
      return {
        node: node,
        check: () => {
          var miss = r.cases.some(c => { var p = picks[key(c.when)]; return !p || blanks.some(b => p[b.name] == null); });
          if (miss) return { state: 'empty', msg: 'Set the form for every case first (see the list).' };
          var ok = true;
          r.cases.forEach((c, i) => {
            var p = picks[key(c.when)], good = blanks.every(b => p[b.name] === c.answer[b.name]);
            ok = ok && good; mark(list.children[i], good);
          });
          return { state: ok ? 'ok' : 'bad', says: says(r.mistakes, m => {
            return r.cases.some(c => {
              var p = picks[key(c.when)];
              if (m.when) for (var w in m.when) if (c.when[w] !== m.when[w]) return false;
              return blanks.some(b => (!m.blank || m.blank === b.name) && p[b.name] === m.pick && c.answer[b.name] !== m.pick);
            });
          }) };
        },
        reveal: () => { r.cases.forEach(c => { picks[key(c.when)] = JSON.parse(JSON.stringify(c.answer)); }); render(); },
        answer: () => {
          return r.cases.map(c => frameFor(c, c.answer).textContent).join(' · ');
        },
        lock: () => { lock = true; }
      };
    });
  }

  /* ---------- T04 Tense timeline ---------- */
  function T04(ph) {
    var tl = ph.timeline, zones = (tl && tl.zones) || null;
    function step(items, label) {
      var st = items.map(() => { return { c: null, z: null }; }), lock = false, node = h('div', { cls: 'frl-item' });
      if (label) node.appendChild(h('p', { cls: 'frl-prompt' }, rich(label)));
      var ui = items.map((it, i) => {
        var chips = (it.chips || []).map(norm), u = { it: it, chips: chips };
        var blk = h('div', { cls: 'frl-gap', 'data-gap': i + 1 });
        if (it.prompt) blk.appendChild(h('p', { cls: 'frl-prompt' }, rich(it.prompt)));
        u.line = h('p', { cls: 'frl-line', lang: 'fr' }); blk.appendChild(u.line);
        if (chips.length) {
          u.cb = chips.map(c => { return chip(c, c.mark ? 'm-' + c.mark : 'word', () => { if (!lock) { st[i].c = c; render(); } }, { 'data-gap': i + 1 }); });
          blk.appendChild(row(u.cb, 'Forms'));
        }
        if (zones && it.zone) {
          u.zb = zones.map(z => { return btn(rich(z.label), 'frl-chip frl-zone', () => { if (!lock) { st[i].z = z.id; render(); } }, { 'data-zone': z.id, 'data-gap': i + 1, 'aria-pressed': 'false' }); });
          blk.appendChild(h('div', { cls: 'frl-slotrow' }, [h('p', { cls: 'frl-lab' }, rich(tl.zoneLabel || 'Where on the timeline?')), row(u.zb, 'Timeline zones')]));
        }
        node.appendChild(blk);
        return u;
      });
      var track = tl ? h('div', { cls: 'frl-tl', 'aria-hidden': 'true' }) : null;
      if (track) node.appendChild(track);
      function render() {
        ui.forEach((u, i) => {
          var c = st[i].c, f = u.it.frame || '___';
          clear(u.line);
          f.split(/(___|\{result\})/).forEach(s => {
            if (s === '___') u.line.appendChild(h('span', { cls: 'frl-box frl-r-' + (c && c.mark ? 'm-' + c.mark : 'word') }, c ? fr(c.text) : '___'));
            else if (s === '{result}') {
              var res = c && ('result' in c) ? c.result : undefined;
              u.line.appendChild(h('span', { cls: 'frl-box frl-res' + (res === null ? ' frl-bad' : '') },
                res === undefined ? '…' : res === null ? '✗ no result fits' : '🔒 ' + fr(res)));
            } else if (s) u.line.appendChild(h('span', null, rich(s, true)));
          });
          if (u.cb) u.cb.forEach(b => { press(b, c && b.getAttribute('data-v') === c.text); });
          if (u.zb) u.zb.forEach(b => { press(b, b.getAttribute('data-zone') === st[i].z); });
        });
        if (!track) return;
        clear(track);
        if (zones) {
          track.appendChild(h('div', { cls: 'frl-lane frl-zh' }, [h('span', { cls: 'frl-ll' }, ''), h('div', { cls: 'frl-tr' },
            zones.map(z => { return h('span', { cls: 'frl-zl' + (z.now ? ' frl-now' : '') }, plain(z.label)); }))]));
        }
        ui.forEach((u, i) => {
          var c = st[i].c, tr = h('div', { cls: 'frl-tr' }), n = zones ? zones.length : items.length;
          var col = zones ? zones.map(z => z.id).indexOf(st[i].z) : i;
          var mk = (c && c.mark) || (zones && col >= 0 && zones[col].mark) || (zones && col >= 0 ? 'dot' : null);
          if (zones) zones.forEach((z, j) => { if (z.now) tr.appendChild(h('span', { cls: 'frl-nowline', style: 'left:' + ((j + 0.5) / n * 100) + '%' })); });
          if (mk && col >= 0) {
            var full = mk === 'line' && !zones;
            var nowJ = zones ? zones.map(z => !!z.now).indexOf(true) : -1;
            var left = full ? 2 : (col / n) * 100, width = full ? 96 : 100 / n;
            if (mk === 'line' && zones && nowJ > col) width = (nowJ - col + 0.5) / n * 100;
            tr.appendChild(h('span', { cls: 'frl-mk frl-mk-' + mk, style: 'left:' + left + '%;width:' + width + '%;animation-delay:' + (i * 0.35) + 's' }));
          }
          track.appendChild(h('div', { cls: 'frl-lane' }, [h('span', { cls: 'frl-ll', lang: 'fr' }, fr(u.it.label || String(i + 1))), tr]));
        });
      }
      render();
      return {
        node: node,
        check: () => {
          var empty = ui.some((u, i) => (u.cb && u.it.answer != null && !st[i].c) || (u.zb && !st[i].z));
          if (empty) return { state: 'empty' };
          var ok = true, out = [];
          ui.forEach((u, i) => {
            var g = (u.it.answer == null || st[i].c.text === u.it.answer) && (!u.it.zone || st[i].z === u.it.zone);
            ok = ok && g; mark(u.line, g);
            says(u.it.mistakes, m => {
              return (m.pick == null || (st[i].c && st[i].c.text === m.pick)) && (m.zone == null || st[i].z === m.zone);
            }).forEach(s => { if (out.indexOf(s) < 0) out.push(s); });
          });
          if (ok && track) track.classList.add('frl-play');
          return { state: ok ? 'ok' : 'bad', says: out };
        },
        reveal: () => {
          ui.forEach((u, i) => {
            if (u.it.answer != null) st[i].c = u.chips.filter(c => c.text === u.it.answer)[0];
            if (u.it.zone) st[i].z = u.it.zone;
          });
          render(); if (track) track.classList.add('frl-play');
        },
        answer: () => {
          return ui.map(u => {
            var s = (u.it.frame || '___').replace('___', u.it.answer || '');
            var c = u.chips.filter(x => x.text === u.it.answer)[0];
            s = s.replace('{result}', c && c.result ? c.result : '');
            if (u.it.zone) s += ' → ' + plain(zones.filter(z => z.id === u.it.zone)[0].label);
            return s;
          }).join(' · ');
        },
        lock: () => { lock = true; }
      };
    }
    return ph.story ? [step(ph.items, ph.prompt)] : ph.items.map(it => step([it], null));
  }

  /* ---------- T05 Sound sorter ---------- */
  function T05(ph, spec, root) {
    return ph.rounds.map(r => {
      var bk = r.buckets, lock = false, sel = -1, node = h('div', { cls: 'frl-item' });
      var words = r.words.map(norm), where = words.map(() => r.mode === 'markup' ? [] : null);
      var audio = words.map(() => null);
      if (r.prompt) node.appendChild(h('p', { cls: 'frl-prompt' }, rich(r.prompt)));
      var hint = h('p', { cls: 'frl-hint' }, r.mode === 'markup' ? 'Tap a word, then tap a mark (tap again to remove it).' : 'Tap a word, then tap its bucket. Tap a sorted word to take it back.');
      node.appendChild(hint);
      function wordLabel(w, i) {
        if (r.hidden && audio[i] && where[i] == null) return h('span', null, '🔊 word ' + (i + 1));
        var t = w.text, k = w.hl ? t.indexOf(w.hl) : -1;
        if (k < 0) return frSpan(t);
        return h('span', { lang: 'fr' }, [t.slice(0, k), h('b', { cls: 'frl-hl' }, w.hl), t.slice(k + w.hl.length)]);
      }
      function wbtn(w, i) {
        var b = btn(wordLabel(w, i), 'frl-chip frl-word', () => {
          if (lock) return;
          if (r.mode !== 'markup' && where[i] != null) { where[i] = null; }
          sel = sel === i ? -1 : i; render();
        }, { 'data-word': w.text, 'data-n': i + 1, 'aria-pressed': sel === i ? 'true' : 'false' });
        var k = [b];
        if (r.mode === 'markup') b.setAttribute('data-marks', where[i].join(' '));
        if (audio[i]) k.push(btn('🔊', 'frl-say', () => { play(audio[i]); }, { 'aria-label': 'Play ' + w.text }));
        return h('span', { cls: 'frl-wrap' }, k);
      }
      var tray = row(null, 'Words'), bwrap = h('div', { cls: 'frl-buckets' }), text = null;
      if (r.mode === 'markup') { text = h('p', { cls: 'frl-line frl-mu', lang: 'fr' }); node.appendChild(text); }
      else node.appendChild(tray);
      node.appendChild(bwrap);
      function place(b) {
        if (lock || sel < 0) { hint.classList.add('frl-flash'); return; }
        if (r.mode === 'markup') {
          var a = where[sel], j = a.indexOf(b.id);
          if (j >= 0) a.splice(j, 1); else a.push(b.id);
        } else {
          where[sel] = b.id; if (audio[sel]) play(audio[sel]);
          sel = -1;
        }
        render();
      }
      function render() {
        clear(tray); clear(bwrap);
        if (r.mode === 'markup') {
          clear(text);
          var src = r.text, pos = 0, spots = words.map(w => {
            var at = -1, n = w.n || 1; for (var q = 0; q < n; q++) at = src.indexOf(w.text, at + 1); return at;
          });
          var order = words.map((w, i) => i).sort((a, b) => spots[a] - spots[b]);
          order.forEach(i => {
            if (spots[i] < pos) return;
            if (spots[i] > pos) text.appendChild(document.createTextNode(fr(src.slice(pos, spots[i]))));
            var wb = wbtn(words[i], i);
            if (where[i].length) wb.appendChild(h('span', { cls: 'frl-badges' }, where[i].map(id => {
              var m = bk.filter(x => x.id === id)[0]; return h('span', { cls: 'frl-badge' }, plain(m.short || m.label));
            })));
            text.appendChild(wb); pos = spots[i] + words[i].text.length;
          });
          text.appendChild(document.createTextNode(fr(src.slice(pos))));
        } else {
          words.forEach((w, i) => { if (where[i] == null) tray.appendChild(wbtn(w, i)); });
          if (!tray.children.length) tray.appendChild(h('span', { cls: 'frl-hint' }, 'All sorted.'));
        }
        bk.forEach(b => {
          var inside = h('div', { cls: 'frl-in' });
          if (r.mode !== 'markup') words.forEach((w, i) => { if (where[i] === b.id) inside.appendChild(wbtn(w, i)); });
          bwrap.appendChild(h('div', { cls: 'frl-bucket', 'data-b': b.id }, [
            btn([r.mode === 'markup' ? 'Mark: ' : 'Put in: ', rich(b.label)], 'frl-bh', () => { place(b); }, { 'data-bucket': b.id }), inside]));
        });
        if (sel >= 0) { var s = node.querySelector('[data-n="' + (sel + 1) + '"]'); if (s) press(s, true); }
      }
      words.forEach((w, i) => {
        if (!w.audio) return;
        var u = audioUrl(root, w.audio);
        probe(u).then(ok => { if (ok) { audio[i] = u; render(); } });
      });
      render();
      function exp(w) { return r.mode === 'markup' ? [].concat(w.bucket || []).sort() : w.bucket; }
      function good(w, i) { return r.mode === 'markup' ? eq(where[i].slice().sort(), exp(w)) : where[i] === w.bucket; }
      return {
        node: node,
        check: () => {
          if (r.mode === 'markup' ? where.every(a => !a.length) : where.indexOf(null) >= 0) return { state: 'empty' };
          sel = -1; render();
          var ok = true;
          words.forEach((w, i) => { var g = good(w, i); ok = ok && g; mark(node.querySelector('[data-n="' + (i + 1) + '"]'), g); });
          return { state: ok ? 'ok' : 'bad', says: says(r.mistakes, m => {
            return words.some((w, i) => {
              if (w.text !== m.word || (m.n && m.n !== i + 1)) return false;
              if (r.mode === 'markup') return m.missing ? where[i].indexOf(m.missing) < 0 : where[i].indexOf(m.bucket) >= 0 && exp(w).indexOf(m.bucket) < 0;
              return where[i] === m.bucket && w.bucket !== m.bucket;
            });
          }) };
        },
        reveal: () => { sel = -1; words.forEach((w, i) => { where[i] = r.mode === 'markup' ? exp(w).slice() : w.bucket; }); render(); },
        answer: () => {
          if (r.mode === 'markup') return words.filter(w => exp(w).length).map(w => w.text + ': ' + exp(w).join(', ')).join(' · ');
          return bk.map(b => { return plain(b.label) + ': ' + words.filter(w => w.bucket === b.id).map(w => w.text).join(', '); }).join(' · ');
        },
        lock: () => { lock = true; }
      };
    });
  }

  var BUILD = { T01: T01, T02: T02, T03: T03, T04: T04, T05: T05 };

  // quick sanity check; full checks in validate_specs.py
  function problem(s) {
    if (!s || typeof s !== 'object') return 'spec is not an object';
    if (!BUILD[s.template]) return 'unknown template ' + s.template;
    var p = s.predict;
    if (!p || !p.prompt || !Array.isArray(p.options) || p.options.length < 2) return 'predict needs a prompt and 2+ options';
    if (p.options.filter(o => o.id === p.answer).length !== 1) return 'predict.answer must match exactly one option id';
    var ph = Array.isArray(s.task) ? s.task : [s.task];
    for (var i = 0; i < ph.length; i++) {
      var t = ph[i]; if (!t) return 'task missing';
      var ty = t.type || s.template; if (!BUILD[ty]) return 'unknown phase type ' + ty;
      var list = (ty === 'T03' || ty === 'T05') ? t.rounds : t.items;
      if (!Array.isArray(list) || !list.length) return 'phase ' + (i + 1) + ' needs ' + ((ty === 'T03' || ty === 'T05') ? 'rounds' : 'items');
    }
    return null;
  }

  /* ---------- the lab ---------- */
  function Lab(root, spec) {
    var steps = [];
    (Array.isArray(spec.task) ? spec.task : [spec.task]).forEach(t => {
      steps = steps.concat(BUILD[t.type || spec.template](t, spec, root));
    });
    var fb = spec.feedback || {}, cur = 0, fails = 0, predicted = false;
    root.classList.add('frl');
    root.setAttribute('data-template', spec.template);
    clear(root);
    root.appendChild(h('p', { cls: 'frl-title' }, [h('span', { cls: 'frl-tag' }, 'Try it'), ' ', rich(spec.title)]));
    if (spec.intro) root.appendChild(h('p', { cls: 'frl-prompt' }, rich(spec.intro)));
    // predict
    var pfb = h('p', { cls: 'frl-pfb', 'aria-live': 'polite', role: 'status' });
    var obs = spec.predict.options.map(o => {
      return btn(rich(o.text), 'frl-opt', () => { choose(o); }, { 'data-opt': o.id, 'aria-pressed': 'false' });
    });
    root.appendChild(h('section', { cls: 'frl-pred' }, [h('p', { cls: 'frl-h' }, '1 · Predict'),
      h('p', { cls: 'frl-prompt' }, rich(spec.predict.prompt)), h('div', { cls: 'frl-opts', 'data-row': '', role: 'group', 'aria-label': 'Prediction' }, obs), pfb]));
    // task
    var prog = h('span', { cls: 'frl-prog' });
    var lockNote = h('p', { cls: 'frl-hint frl-locknote' }, 'Make your prediction first.');
    var stage = h('div', { cls: 'frl-stage', hidden: true });
    steps.forEach((s, i) => { s.node.classList.add('frl-step'); s.node.setAttribute('data-step', i + 1); if (i) s.node.hidden = true; stage.appendChild(s.node); });
    var out = h('div', { cls: 'frl-out', 'aria-live': 'polite', role: 'status' });
    var bCheck = btn('Check', 'frl-main', check, { 'data-act': 'check' });
    var bShow = btn('Show answer', 'frl-ghost', reveal, { 'data-act': 'show', hidden: true });
    var bNext = btn('Next →', 'frl-main', next, { 'data-act': 'next', hidden: true });
    var bAgain = btn('Start again', 'frl-ghost', again, { 'data-act': 'again', hidden: true });
    stage.appendChild(h('div', { cls: 'frl-bar' }, [bCheck, bShow, bNext, bAgain]));
    stage.appendChild(out);
    root.appendChild(h('section', { cls: 'frl-task' }, [h('p', { cls: 'frl-h' }, ['2 · Try it ', prog]), lockNote, stage]));
    function progress() { prog.textContent = steps.length > 1 ? '(' + (cur + 1) + ' of ' + steps.length + ')' : ''; }
    progress();
    function choose(o) {
      var ok = o.id === spec.predict.answer;
      obs.forEach(b => { press(b, b.getAttribute('data-opt') === o.id); mark(b, null); });
      mark(obs[spec.predict.options.indexOf(o)], ok);
      clear(pfb);
      add(pfb, [h('b', null, ok ? '✓ Good prediction. ' : '✗ Not quite. '), o.why ? rich(o.why) : null,
        ok ? null : h('span', { cls: 'frl-soft' }, ' Try another, or test it below.')]);
      if (!predicted) { predicted = true; stage.hidden = false; lockNote.hidden = true; root.setAttribute('data-predicted', ''); }
    }
    function say(sym, kids, cls) { clear(out); out.className = 'frl-out ' + (cls || ''); add(out, [h('b', null, sym), ' '].concat(kids)); }
    function check() {
      var s = steps[cur], r = s.check();
      if (r.state === 'empty') { say('…', [r.msg || 'Finish the task first: fill every slot.'], 'frl-o-empty'); return; }
      if (r.state === 'ok') {
        s.lock(); bCheck.hidden = true; bShow.hidden = true; fails = 0;
        if (cur < steps.length - 1) { say('✓', ['Correct!'], 'frl-o-ok'); bNext.hidden = false; bNext.focus(); }
        else finish('✓', 'Correct!');
        return;
      }
      fails++;
      var lines = r.says && r.says.length ? r.says.slice(0, 2) : [fb.fallback || 'Not yet. The ✗ marks show what to change.'];
      say('✗', lines.map((l, i) => { return h('span', { cls: 'frl-say-line' }, [i ? ' ' : '', rich(l)]); }), 'frl-o-bad');
      if (fails >= 2) bShow.hidden = false;
    }
    function reveal() {
      var s = steps[cur]; s.reveal(); s.lock(); fails = 0;
      bCheck.hidden = true; bShow.hidden = true;
      var line = ['Answer: ', frSpan(s.answer())];
      if (cur < steps.length - 1) { say('→', line, 'frl-o-show'); bNext.hidden = false; bNext.focus(); }
      else finish('→', null, line);
    }
    function finish(sym, word, line) {
      var k = line ? line.slice() : [word];
      if (fb.reveal) k.push(h('span', { cls: 'frl-say-line' }, rich(fb.reveal)));
      if (fb.takeaway) k.push(h('span', { cls: 'frl-take' }, [h('b', null, 'Takeaway: '), rich(fb.takeaway)]));
      say(sym, k, sym === '✓' ? 'frl-o-ok frl-o-done' : 'frl-o-show frl-o-done');
      bAgain.hidden = false; root.setAttribute('data-done', '');
    }
    function next() {
      steps[cur].node.hidden = true; cur++; steps[cur].node.hidden = false;
      bNext.hidden = true; bCheck.hidden = false; clear(out); progress();
      var f = steps[cur].node.querySelector('button:not([disabled])'); if (f) f.focus();
    }
    function again() {
      var fresh = clone(root, spec); root.parentNode.replaceChild(fresh, root); start(fresh, spec);
      var f = fresh.querySelector('button'); if (f) f.focus();
    }
    root.addEventListener('keydown', e => {
      var k = e.key; if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].indexOf(k) < 0) return;
      var t = e.target, g = t.closest && t.closest('[data-row]'); if (!g || t.tagName !== 'BUTTON') return;
      var bs = [].filter.call(g.querySelectorAll('button'), b => !b.disabled && !b.hidden);
      var i = bs.indexOf(t); if (i < 0) return;
      var j = k === 'Home' ? 0 : k === 'End' ? bs.length - 1 : (k === 'ArrowLeft' || k === 'ArrowUp') ? i - 1 : i + 1;
      if (j >= 0 && j < bs.length) { bs[j].focus(); e.preventDefault(); }
    });
    steps.forEach(s => {
      var l = s.lock; s.lock = () => { l(); each(s.node.querySelectorAll('button:not(.frl-say):not(.frl-case)'), b => { b.disabled = true; }); };
    });
  }
  function clone(root) {
    var n = document.createElement('div');
    n.className = 'fr-lab';
    ['data-lab', 'data-audio-base'].forEach(a => { if (root.hasAttribute(a)) n.setAttribute(a, root.getAttribute(a)); });
    return n;
  }
  function start(root, spec) {
    try { root.__frl = true; new Lab(root, spec); } catch (e) {
      clear(root); root.classList.remove('frl');
      console.error('[fr-lab] ' + root.getAttribute('data-lab') + ': could not build: ' + e.message);
    }
  }
  function findSpec(root) {
    var n = root.nextElementSibling;
    if (n && n.matches('script.fr-lab-spec')) return n;
    n = root.querySelector('script.fr-lab-spec'); if (n) return n;
    n = root.previousElementSibling;
    return n && n.matches('script.fr-lab-spec') ? n : null;
  }
  function init(root) {
    if (root.__frl) return;
    root.__frl = true;
    var id = root.getAttribute('data-lab'), sc = findSpec(root), spec, err;
    if (!sc) { console.warn('[fr-lab] ' + id + ': no spec found; leaving the page text as it is.'); return; }
    try { spec = JSON.parse(sc.textContent); err = problem(spec); } catch (e) { err = 'bad JSON: ' + e.message; }
    if (err) { console.warn('[fr-lab] ' + id + ': ' + err + '; lab not shown.'); return; }
    root.__spec = spec;
    start(root, spec);
  }
  function initAll(scope) {
    each((scope || document).querySelectorAll('.fr-lab[data-lab]'), init);
  }
  window.FrLab = { init: initAll, join: join, problem: problem };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => { initAll(); });
  else initAll();
})();
