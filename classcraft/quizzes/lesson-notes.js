/* lesson-notes.js — "Read as notes" view (print / save as PDF) for every
   mini-lesson, plus an "In this lesson" list on the older sectioned lessons.

   Why (Nov 2026): search visitors landing on a lesson saw little before Start.
   This lets them read the lesson as notes, print it or save it as a PDF, and
   still start the lesson from there.

   Loaded by lesson-nav.js, so no per-lesson edits.

   Old sectioned lessons (no .ks3-missions):
     welcome screen gets a numbered "In this lesson" list of the teaching
     sections and a secondary "Read as notes" button.
   Mission lessons (.ks3-missions):
     welcome screen gets only the "Read as notes" button, under the mission map
     (the map already lists the missions). Notes are grouped by mission, each
     headed "Mission N" + the mission question (AismProgress.missions(), else
     the screens tagged .tag.mission).

   Notes content: the welcome intro plus every teaching screen. Left out:
     - question screens (anything lesson-nav.js treats as one: .activity,
       [data-q], [data-num], [data-t], share, trophy), so no answers to checks;
     - hook videos and guess prompts (.ks3-hook, .ks3-guess, .ks3-yourguess);
     - buttons, inputs, scripts, audio clips, hidden boxes.
   Turned into print-friendly form:
     - stepped diagrams (figure.dg-fig[data-steps]): every step side by side;
     - before/after diagrams (.dg-reveal): both shown;
     - worked examples (.excard): every step and the answer shown;
     - economics graph labs (.eg-lab): title and graph at the starting values,
       controls and prediction questions removed.
   Every id in a copy gets a suffix (url(#id) / href="#id" rewritten) so SVG
   gradients, markers and clip paths keep working.

   Not shown at all when the visit comes from a teacher's assignment link
   (utm_source=assign, or from teach/session.html): those students do the
   lesson.

   Spec references (courses in SPEC_COURSES, data in quizzes/lesson-spec/):
     each mission row on the welcome map gets a "Spec 4.5.1.1 · …" chip that
     opens to the section titles; a footer links to the board's specification
     page; the notes view lists the sections under each mission heading and an
     "Also in this lesson" block for screens after the last mission. Section
     numbers and titles only, never the board's statement wording. Drawn on
     the map only after progress.js has built its mission list.

   Plausible events (goals must exist in Plausible to show on the dashboard):
     "Notes: opened"        {via: button | hash}
     "Notes: printed"       {via: button | shortcut}
     "Notes: start lesson"  "Start the lesson" in the notes view
     "Spec: opened"         a spec chip opened (no goal yet)
   #notes in the URL opens the notes view at load.
*/
(function () {
  "use strict";

  /* Spec references (Nov 2026). Courses with a mission -> spec-section map in
     quizzes/lesson-spec/<course>.json. Only these are fetched (no 404s
     elsewhere). Shown: reference + section title, linked to the board's own
     specification page; the board's statement wording is not reproduced. */
  var SPEC_COURSES = ["physics-gcse-aqa"];
  var ME = document.currentScript;
  var BASE = ME && ME.src ? ME.src.replace(/lesson-notes\.js.*$/, "") : "../quizzes/";

  function isQuestionScreen(scr) {
    return !!scr.querySelector(
      ".activity, [data-q], [data-num], [data-t], [data-share], .sharebox, .trophy"
    );
  }
  function cleanLabel(el) {
    var t = (el.textContent || "");
    try { t = t.replace(/[\u{1F000}-\u{1FAFF}←-⇿⌀-➿⬀-⯿️‍]/gu, ""); } catch (e) {}
    return t.replace(/\s+/g, " ").trim();
  }
  function track(name, props) {
    try { if (window.plausible) window.plausible(name, props ? { props: props } : undefined); } catch (e) {}
  }
  function all(root, sel) { return [].slice.call(root.querySelectorAll(sel)); }
  function drop(root, sel) { all(root, sel).forEach(function (x) { x.remove(); }); }

  /* Give every id under root a suffix and rewrite references inside root. */
  function renameIds(root, suffix) {
    var map = {};
    all(root, "[id]").forEach(function (x) { map[x.id] = x.id + suffix; x.id = x.id + suffix; });
    if (!Object.keys(map).length) return;
    all(root, "*").forEach(function (x) {
      for (var i = 0; i < x.attributes.length; i++) {
        var a = x.attributes[i], v = a.value;
        if (v.indexOf("#") < 0) continue;
        var nv = v.replace(/url\(\s*['"]?#([^'")\s]+)['"]?\s*\)/g, function (m, id) { return map[id] ? "url(#" + map[id] + ")" : m; });
        if ((a.name === "href" || a.name === "xlink:href") && nv.charAt(0) === "#" && map[nv.slice(1)]) nv = "#" + map[nv.slice(1)];
        if (nv !== v) x.setAttribute(a.name, nv);
      }
    });
  }

  /* Stepped diagram -> one copy per step, side by side. */
  function expandSteps(fig, n) {
    var svg = fig.querySelector("svg");
    if (!svg) return;
    var hi = +fig.getAttribute("data-hi") || +fig.getAttribute("data-steps") || 1;
    var lo = +fig.getAttribute("data-lo") || 1;
    if (hi <= lo) return;
    var row = document.createElement("div");
    row.className = "lnn-steps";
    for (var k = lo; k <= hi; k++) {
      var cell = document.createElement("div");
      cell.className = "lnn-step";
      var lab = document.createElement("div");
      lab.className = "lnn-steplab";
      lab.textContent = "Step " + (k - lo + 1);
      var c = svg.cloneNode(true);
      all(c, "[data-step]").forEach(function (g) {
        var a = +g.getAttribute("data-step"), u = g.hasAttribute("data-until") ? +g.getAttribute("data-until") : 1e9;
        g.style.display = (a <= k && k <= u) ? "inline" : "none";
      });
      renameIds(c, "-s" + n + "-" + k);
      cell.appendChild(lab); cell.appendChild(c); row.appendChild(cell);
    }
    svg.parentNode.replaceChild(row, svg);
  }

  var STRIP = ".ks3-hook, .ks3-guess, .ks3-yourguess, .ks3-missions, .lp-total, #resume, .resume, .dg-steps, .ex-ctl, " +
    ".eg-pred, .eg-ctrls, .eg-actions, .eg-fb, .eg-read, .eg-config, .fr-audio, [data-clip], audio, video, noscript, " +
    "button, input, select, textarea, .opts, .activity, .feedback, .nav, .ln-rail, .lp-coinnote, script, [data-q], .lnp";

  function cloneForNotes(node, n) {
    var c = node.cloneNode(true);
    c.removeAttribute("id");
    c.removeAttribute("data-teach"); c.removeAttribute("data-test"); c.removeAttribute("data-m"); c.removeAttribute("data-start");
    c.classList.remove("screen", "active");
    all(c, "figure.dg-fig[data-steps]").forEach(function (f, i) { expandSteps(f, n + "-" + i); });
    all(c, ".dg-reveal").forEach(function (x) { x.hidden = false; x.removeAttribute("hidden"); x.classList.add("lnn-after"); });
    all(c, ".ex-hide").forEach(function (x) { x.classList.remove("ex-hide"); });
    drop(c, STRIP);
    all(c, "[hidden]").forEach(function (x) { x.remove(); });
    renameIds(c, "-ln" + n);
    return c;
  }

  function css() {
    if (document.getElementById("lnotes-style")) return;
    var s = document.createElement("style");
    s.id = "lnotes-style";
    s.textContent =
      ".lnp{margin:16px 0 4px;background:#fffaf0;border:2px solid #efe2d2;border-radius:16px;padding:12px 14px}" +
      ".lnp.lnp-m{background:none;border:0;padding:0;margin:12px 0 4px}" +
      ".lnp h3{font-family:'Fredoka',sans-serif;font-weight:600;font-size:.8rem;letter-spacing:.5px;text-transform:uppercase;color:#6b6580;margin:0 0 6px}" +
      ".lnp ol{margin:0 0 0 1.3em;padding:0;columns:2;column-gap:22px;font-size:.92rem;line-height:1.35}" +
      ".lnp li{margin:0 0 4px;break-inside:avoid}" +
      "@media(max-width:560px){.lnp ol{columns:1}}" +
      ".lnp-row{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:10px}" +
      ".lnp-btn{font-family:'Fredoka',sans-serif;font-weight:600;font-size:.95rem;cursor:pointer;background:#fff;color:#2c2840;" +
        "border:2.5px solid #2c2840;border-radius:14px;padding:7px 14px;box-shadow:0 3px 0 #2c2840}" +
      ".lnp-btn:hover{background:#fff3d6}" +
      ".lnp-btn.go{background:#ffc83d}" +
      ".lnp-hint{font-size:.85rem;color:#6b6580}" +
      "#lnotes{display:none;background:#fff;border:3px solid #2c2840;border-radius:24px;box-shadow:0 10px 0 rgba(44,40,64,.10);padding:22px 24px;margin-bottom:14px}" +
      "body.ln-notes-on #lnotes{display:block}" +
      "body.ln-notes-on .stage,body.ln-notes-on .nav,body.ln-notes-on .ln-rail{display:none!important}" +
      "#lnotes .lnh{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;border-bottom:2px solid #efe2d2;padding-bottom:12px;margin-bottom:14px}" +
      "#lnotes .lnh .tt{font-family:'Fredoka',sans-serif;font-weight:700;font-size:1.05rem}" +
      "#lnotes .lnh .bt{display:flex;flex-wrap:wrap;gap:8px}" +
      "#lnotes .lns{padding:6px 0 14px;border-bottom:1px dashed #efe2d2;margin-bottom:12px}" +
      "#lnotes .lns:last-of-type{border-bottom:0}" +
      "#lnotes .lnm{margin:18px 0 10px;padding:10px 14px;border-radius:14px;background:#eef4ff;border:2px solid #2b6cb0}" +
      "#lnotes .lnm .k{font-family:'Fredoka',sans-serif;font-weight:700;font-size:.78rem;letter-spacing:.5px;text-transform:uppercase;color:#2b6cb0}" +
      "#lnotes .lnm .q{font-family:'Fredoka',sans-serif;font-weight:700;font-size:1.15rem;color:#2c2840;margin-top:2px}" +
      "#lnotes h1{font-size:1.7rem;margin:0 0 10px}" +
      "#lnotes h2{font-size:1.25rem;margin:4px 0 8px}" +
      "#lnotes ul,#lnotes ol{margin:6px 0 6px 1.3em}" +
      "#lnotes li{margin:0 0 6px;line-height:1.45}" +
      "#lnotes p{margin:6px 0;line-height:1.5}" +
      "#lnotes figure{margin:10px 0}#lnotes svg{max-width:100%;height:auto}" +
      "#lnotes .lnn-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;align-items:start}" +
      "#lnotes .lnn-step{text-align:center;border:1.5px solid #efe2d2;border-radius:12px;padding:6px}" +
      "#lnotes .lnn-step svg{width:100%;display:block;margin:0 auto}" +
      "#lnotes .lnn-steplab{font-family:'Fredoka',sans-serif;font-weight:600;font-size:.8rem;color:#6b6580;margin-bottom:4px}" +
      "#lnotes .lnn-after{margin-top:10px}" +
      "#lnotes .lnf{text-align:center;margin-top:16px;padding-top:14px;border-top:2px solid #efe2d2}" +
      "#lnotes .lnf p{color:#6b6580;font-size:.92rem;margin-bottom:10px}" +
      "#lnotes .lnsrc{font-size:.78rem;color:#6b6580;margin-top:14px}" +
      ".lsp{margin:5px 0 1px;font-size:.8rem;color:#6b6580;flex-basis:100%;width:100%}" +
      ".lsp summary{cursor:pointer;display:inline-block;font-family:'Fredoka',sans-serif;font-weight:600;font-size:.74rem;letter-spacing:.2px;" +
        "color:#4a3fa0;background:#f1efff;border:1.5px solid #cfc9f3;border-radius:10px;padding:1px 9px;list-style:none}" +
      ".lsp summary::-webkit-details-marker{display:none}" +
      ".lsp summary:hover{background:#e6e2ff}" +
      ".lsp .lsp-list{margin:6px 0 2px 2px;line-height:1.35;font-family:'Nunito',sans-serif;font-weight:600;font-size:.8rem;color:#4a4560}" +
      ".lsp .lsp-row{margin:0 0 3px;padding-left:10px;border-left:2px solid #cfc9f3}" +
      ".lsp b{font-family:'Fredoka',sans-serif;font-weight:600;color:#2c2840}" +
      ".lsp-foot{font-size:.8rem;color:#6b6580;margin:8px 0 0}" +
      ".lsp-foot a{color:#4a3fa0}" +
      "#lnotes .lnm-spec{margin-top:6px;font-size:.82rem;color:#2c2840;line-height:1.4}" +
      "#lnotes .lnm-spec b{font-family:'Fredoka',sans-serif;font-weight:600;color:#4a3fa0}" +
      "#lnotes .lnm.tail{background:#f6f4ff;border-color:#cfc9f3}" +
      "#lnotes .lnm.tail .k{color:#4a3fa0}" +
      "@media print{" +
        "body.ln-notes-on{background:#fff!important;padding:0!important;display:block!important}" +
        "body.ln-notes-on>*:not(.app){display:none!important}" +
        "body.ln-notes-on .app>*:not(#lnotes){display:none!important}" +
        "body.ln-notes-on .app{max-width:none}" +
        "#lnotes{border:0!important;box-shadow:none!important;padding:0!important;margin:0!important}" +
        "#lnotes .lnh .bt,#lnotes .lnf{display:none!important}" +
        "#lnotes .lns{break-inside:auto}#lnotes li,#lnotes figure,#lnotes .note,#lnotes .lnn-step,#lnotes table,#lnotes .excard{break-inside:avoid}" +
        "#lnotes h2,#lnotes .lnm{break-after:avoid}" +
        "*{-webkit-print-color-adjust:exact;print-color-adjust:exact}" +
      "}";
    document.head.appendChild(s);
  }

  /* Mission list: [{n, question, start, check}] from progress.js, else from the
     screens tagged as mission starts. */
  function missionList(screens) {
    try {
      var ms = window.AismProgress && window.AismProgress.missions && window.AismProgress.missions();
      if (ms && ms.length) return ms.map(function (m) { return { n: m.n, q: m.question || "", start: m.start, check: m.check }; });
    } catch (e) {}
    var out = [];
    var items = all(document, ".ks3-missions li");
    screens.forEach(function (scr, i) {
      if (i === 0 && items.length) { out.push({ n: 1, q: cleanLabel(items[0]).replace(/^Mission\s*1\s*/i, "").replace(/~?\d+\s*min.*$/i, "").trim(), start: 1 }); return; }
      if (scr.querySelector(".ks3-hook") && scr.querySelector(".tag.mission")) {
        var h = scr.querySelector("h2");
        out.push({ n: out.length + 1, q: h ? cleanLabel(h) : "", start: i });
      }
    });
    for (var k = 0; k < out.length; k++) out[k].check = k + 1 < out.length ? out[k + 1].start - 1 : 1e9;
    return out;
  }

  function init() {
    if (/[?&]utm_source=assign\b/.test(location.search) || /\/teach\/session\.html/.test(document.referrer || "")) return;
    var screens = all(document, ".screen");
    if (screens.length < 4) return;
    var welcome = screens[0];
    var missionMode = !!welcome.querySelector(".ks3-missions") || !!document.querySelector(".ks3-missions");
    var teach = [];
    screens.forEach(function (scr, i) {
      if (i === 0 || scr.classList.contains("final") || isQuestionScreen(scr)) return;
      if (scr.querySelector(".ks3-hook")) return;                 // mission start: becomes a divider
      var h = scr.querySelector("h2") || scr.querySelector("h1");
      if (!h || !cleanLabel(h)) return;
      teach.push({ scr: scr, i: i, label: cleanLabel(h) });
    });
    if (teach.length < 2) return;
    var app = document.querySelector(".app") || (welcome.closest && welcome.closest(".stage") || welcome).parentNode;
    if (!app) return;
    css();

    var title = cleanLabel(welcome.querySelector("h1") || document.querySelector("h1") || { textContent: document.title });
    var specEl = document.querySelector(".spec");
    var spec = specEl ? specEl.textContent.trim() : "";

    /* 1. welcome screen */
    var pv = document.createElement("div");
    pv.className = missionMode ? "lnp lnp-m" : "lnp";
    if (!missionMode) {
      var h3 = document.createElement("h3");
      h3.textContent = "In this lesson · " + teach.length + " sections";
      var ol = document.createElement("ol");
      teach.forEach(function (t) { var li = document.createElement("li"); li.textContent = t.label; ol.appendChild(li); });
      pv.appendChild(h3); pv.appendChild(ol);
    }
    var row = document.createElement("div");
    row.className = "lnp-row";
    var rb = document.createElement("button");
    rb.type = "button"; rb.className = "lnp-btn"; rb.textContent = "📄 Read as notes";
    var hint = document.createElement("span");
    hint.className = "lnp-hint"; hint.textContent = "The whole lesson on one page — print or save as PDF";
    row.appendChild(rb); row.appendChild(hint);
    pv.appendChild(row);
    var map = welcome.querySelector(".ks3-missions");
    var ps = welcome.querySelectorAll("p");
    var last = ps.length ? ps[ps.length - 1] : null;
    if (map && map.parentNode) map.parentNode.insertBefore(pv, map.nextSibling);
    else if (last && /\bStart\b/.test(last.textContent) && last.parentNode === welcome) welcome.insertBefore(pv, last);
    else welcome.appendChild(pv);

    /* 1b. spec references: fetched for mapped courses only; drawn on the
       mission map once progress.js has built its mission list (it reads the
       question text from the map rows once, so nothing is added before that). */
    var SP = null;
    function specLines(ids) {
      if (!SP || !ids || !ids.length) return null;
      var dv = document.createElement("div");
      dv.className = "lnm-spec";
      ids.forEach(function (id, i) {
        if (i) dv.appendChild(document.createTextNode(" · "));
        var b = document.createElement("b"); b.textContent = id;
        dv.appendChild(b);
        dv.appendChild(document.createTextNode(" " + (SP.d.sections[id] || "")));
      });
      return dv;
    }
    function specDetails(ids, label) {
      var det = document.createElement("details");
      det.className = "lsp";
      var sum = document.createElement("summary");
      sum.textContent = label + " " + ids.join(" · ");
      var ul = document.createElement("div");          // divs, not li: the mission map styles every li
      ul.className = "lsp-list";
      ids.forEach(function (id) {
        var li = document.createElement("div");
        li.className = "lsp-row";
        var b = document.createElement("b"); b.textContent = id;
        li.appendChild(b); li.appendChild(document.createTextNode(" " + (SP.d.sections[id] || "")));
        ul.appendChild(li);
      });
      det.appendChild(sum); det.appendChild(ul);
      det.addEventListener("toggle", function () { if (det.open) track("Spec: opened"); });
      return det;
    }
    function drawSpecOnMap() {
      if (!SP || !map || map.getAttribute("data-spec")) return;
      map.setAttribute("data-spec", "1");
      all(map, "li[data-mission]").forEach(function (li) {
        var ids = SP.l[li.getAttribute("data-mission")];
        if (ids && ids.length) li.appendChild(specDetails(ids, "Spec"));
      });
      var foot = document.createElement("div");
      foot.className = "lsp-foot";
      if (SP.l.tail && SP.l.tail.length) foot.appendChild(specDetails(SP.l.tail, "Also in this lesson:"));
      var p = document.createElement("p");
      p.className = "lsp-foot";
      p.appendChild(document.createTextNode("Spec numbers are sections of the " + SP.d.spec + " specification. "));
      var a = document.createElement("a"); a.href = SP.d.url; a.target = "_blank"; a.rel = "noopener"; a.textContent = "View the specification ↗";
      p.appendChild(a);
      foot.appendChild(p);
      map.parentNode.insertBefore(foot, map.nextSibling);
    }
    function whenMissionsReady(fn) {
      var tries = 0;
      (function wait() {
        var ok = false;
        try { ok = !!(window.AismProgress && window.AismProgress.missions && window.AismProgress.missions().length); } catch (e) {}
        if (ok || ++tries > 40) fn(); else setTimeout(wait, 150);
      })();
    }
    (function loadSpec() {
      var m = location.pathname.match(/([^\/]+)-mini-lesson\.html$/);
      if (!m || !window.fetch) return;
      var key = m[1], course = null;
      SPEC_COURSES.forEach(function (c) { if (key.indexOf(c + "-") === 0 && (!course || c.length > course.length)) course = c; });
      if (!course) return;
      fetch(BASE + "lesson-spec/" + course + ".json?v=20261126").then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
        if (!d || !d.lessons || !d.lessons[key]) return;
        SP = { d: d, l: d.lessons[key] };
        if (map) whenMissionsReady(drawSpecOnMap);
        if (box) {                                     // notes already built: rebuild with the spec lines
          var on = document.body.classList.contains("ln-notes-on");
          box.remove(); box = null; fitted = false;
          if (on) { build(); try { requestAnimationFrame(fitSteps); } catch (e) {} }
        }
      }).catch(function () {});
    })();

    /* 2. notes view (built on first open) */
    var box = null, printed = false;
    function build() {
      box = document.createElement("div");
      box.id = "lnotes";
      box.setAttribute("aria-label", "Lesson notes");
      var head = document.createElement("div");
      head.className = "lnh";
      head.innerHTML = '<span class="tt">📄 Notes</span><span class="bt">' +
        '<button type="button" class="lnp-btn go" data-a="start">▶ Start the lesson</button>' +
        '<button type="button" class="lnp-btn" data-a="print">🖨 Print / save as PDF</button>' +
        '<button type="button" class="lnp-btn" data-a="close">✕ Back</button></span>';
      box.appendChild(head);

      var intro = cloneForNotes(welcome, 0);
      drop(intro, ".tag");
      var ips = intro.querySelectorAll("p");
      if (ips.length && /\bStart\b/.test(ips[ips.length - 1].textContent)) ips[ips.length - 1].remove();
      if (spec) { var sp = document.createElement("p"); sp.className = "lnsrc"; sp.textContent = spec; intro.insertBefore(sp, intro.firstChild); }
      if (SP) {
        var sr = document.createElement("p"); sr.className = "lnsrc";
        sr.appendChild(document.createTextNode("Spec references below are section numbers from the " + SP.d.spec + " specification: "));
        var sa = document.createElement("a"); sa.href = SP.d.url; sa.target = "_blank"; sa.rel = "noopener"; sa.textContent = SP.d.url.replace(/^https?:\/\//, "");
        sr.appendChild(sa); intro.appendChild(sr);
      }
      intro.className = "lns";
      box.appendChild(intro);

      var missions = missionMode ? missionList(screens) : [];
      var shown = {};
      function missionFor(i) {
        for (var k = 0; k < missions.length; k++) {
          var m = missions[k], end = m.check != null ? m.check : 1e9;
          if (i >= m.start && i <= end) return m;
        }
        return null;
      }
      teach.forEach(function (t, n) {
        var m = missionFor(t.i);
        if (m && !shown[m.n]) {
          shown[m.n] = true;
          var d = document.createElement("div");
          d.className = "lnm";
          var k = document.createElement("div"); k.className = "k"; k.textContent = "Mission " + m.n;
          var q = document.createElement("div"); q.className = "q";
          var li = document.querySelector('.ks3-missions li[data-mission="m' + m.n + '"]');
          if (li) {                                   // keeps typeset maths (KaTeX) intact
            var lc = li.cloneNode(true);
            drop(lc, ".ks3-mn, .lp-mmeta, .lp-tick, a, button, .lsp");
            q.innerHTML = lc.innerHTML.trim();
          }
          if (!q.textContent.trim()) q.textContent = m.q;
          d.appendChild(k); if (q.textContent.trim()) d.appendChild(q);
          var sl = specLines(SP && SP.l["m" + m.n]);
          if (sl) d.appendChild(sl);
          box.appendChild(d);
        }
        if (!m && missions.length && SP && SP.l.tail && !shown.tail && t.i > missions[missions.length - 1].check) {
          shown.tail = true;                          // screens after the last mission
          var td = document.createElement("div");
          td.className = "lnm tail";
          var tk = document.createElement("div"); tk.className = "k"; tk.textContent = "Also in this lesson";
          td.appendChild(tk); td.appendChild(specLines(SP.l.tail));
          box.appendChild(td);
        }
        var c = cloneForNotes(t.scr, n + 1);
        c.className = "lns";
        box.appendChild(c);
      });

      var foot = document.createElement("div");
      foot.className = "lnf";
      foot.innerHTML = "<p>Notes are the start. Testing yourself is what makes it stick.</p>" +
        '<button type="button" class="lnp-btn go" data-a="start">▶ Start the lesson and test yourself</button>';
      box.appendChild(foot);

      var src = document.createElement("p");
      src.className = "lnsrc";
      src.textContent = (title ? title + " · " : "") + "aistudymethod.com" + location.pathname;
      box.appendChild(src);

      box.addEventListener("click", function (e) {
        var b = e.target.closest && e.target.closest("[data-a]");
        if (!b) return;
        var a = b.getAttribute("data-a");
        if (a === "close") close();
        else if (a === "print") { printed = true; track("Notes: printed", { via: "button" }); window.print(); }
        else if (a === "start") { track("Notes: start lesson"); close(); try { if (typeof window.show === "function") window.show(1); } catch (err) {} }
      });

      var stage = document.querySelector(".stage");
      if (stage && stage.parentNode === app) app.insertBefore(box, stage);
      else app.appendChild(box);
    }
    /* Crop each step of a stepped diagram to what it shows, keeping the scale of
       the original drawing (so steps still line up visually). Needs layout, so
       it runs once the notes are on screen. */
    var fitted = false;
    function fitSteps() {
      if (fitted || !box) return;
      fitted = true;
      all(box, ".lnn-step > svg").forEach(function (svg) {
        try {
          var live = svg.viewBox && svg.viewBox.baseVal;   // live object: copy before changing viewBox
          var vb = live ? { x: live.x, y: live.y, width: live.width, height: live.height } : null;
          var b = svg.getBBox();
          if (!vb || !vb.width || !b.width || !b.height) return;
          var p = 6, x = Math.max(vb.x, b.x - p), y = Math.max(vb.y, b.y - p);
          var w = Math.min(vb.x + vb.width, b.x + b.width + p) - x, h = Math.min(vb.y + vb.height, b.y + b.height + p) - y;
          if (w <= 0 || h <= 0) return;
          svg.setAttribute("viewBox", x + " " + y + " " + w + " " + h);
          svg.style.width = Math.min(100, 100 * w / vb.width).toFixed(1) + "%";
        } catch (e) {}
      });
    }
    function open(via) {
      if (!box) build();
      document.body.classList.add("ln-notes-on");
      try { requestAnimationFrame(fitSteps); } catch (e) { fitSteps(); }
      window.scrollTo({ top: 0 });
      track("Notes: opened", { via: via });
    }
    function close() {
      document.body.classList.remove("ln-notes-on");
      if (location.hash === "#notes") try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
      window.scrollTo({ top: 0 });
    }
    rb.addEventListener("click", function () { open("button"); });
    window.addEventListener("beforeprint", function () {
      if (document.body.classList.contains("ln-notes-on") && !printed) { printed = true; track("Notes: printed", { via: "shortcut" }); }
    });
    if (location.hash === "#notes") open("hash");
    window.AismNotes = { open: function () { open("api"); }, close: close };
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
