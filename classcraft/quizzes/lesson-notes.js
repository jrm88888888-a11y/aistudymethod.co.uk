/* lesson-notes.js — "In this lesson" preview + "Read as notes" view for the
   older sectioned mini-lessons (Nov 2026).

   Why: search visitors landing on an old lesson saw one sentence, a small
   diagram and a Start button; everything else sat behind Start. This file
   shows them what the lesson contains and lets them read it as notes (and
   print / save as PDF) without leaving the page.

   Scope: ONLY lessons without a mission map (.ks3-missions). Mission lessons
   are untouched. Loaded by lesson-nav.js, so no per-lesson edits.

   What it does:
     1. Welcome screen: a numbered "In this lesson" list of the teaching
        sections and a secondary "Read as notes" button. Start stays the main
        button.
     2. Notes view: the welcome text plus every teaching screen, stacked.
        Question screens (anything lesson-nav.js treats as a question screen:
        .activity, [data-q], [data-num], [data-t], share, trophy) are left out,
        so no answers are shown. Buttons and inputs are stripped from clones.
     3. Print / save as PDF: print CSS that prints only the notes.
     4. #notes in the URL opens the notes view at load.

   Plausible events (goals must exist in Plausible to show on the dashboard):
     "Notes: opened"        {via: button | hash}
     "Notes: printed"       {via: button | shortcut}
     "Notes: start lesson"  the "Start the lesson" button in the notes view
*/
(function () {
  "use strict";

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

  /* Clone a node for the notes view: drop interactive bits, and give every id a
     suffix (rewriting url(#id) / href="#id" inside the clone) so SVG gradients,
     markers and clip paths keep working while the originals are hidden. */
  var STRIP = "button, input, select, textarea, .opts, .activity, .feedback, .nav, .ln-rail, .lp-coinnote, script, [data-q]";
  function cloneForNotes(node, n) {
    var c = node.cloneNode(true);
    c.removeAttribute("id");
    c.classList.remove("screen", "active");
    [].slice.call(c.querySelectorAll(STRIP)).forEach(function (x) { x.remove(); });
    var suffix = "-ln" + n;
    var map = {};
    [].slice.call(c.querySelectorAll("[id]")).forEach(function (x) { map[x.id] = x.id + suffix; x.id = x.id + suffix; });
    if (Object.keys(map).length) {
      [].slice.call(c.querySelectorAll("*")).forEach(function (x) {
        for (var i = 0; i < x.attributes.length; i++) {
          var a = x.attributes[i], v = a.value;
          if (v.indexOf("#") < 0) continue;
          var nv = v.replace(/url\(\s*['"]?#([^'")\s]+)['"]?\s*\)/g, function (m, id) { return map[id] ? "url(#" + map[id] + ")" : m; });
          if ((a.name === "href" || a.name === "xlink:href") && nv.charAt(0) === "#" && map[nv.slice(1)]) nv = "#" + map[nv.slice(1)];
          if (nv !== v) x.setAttribute(a.name, nv);
        }
      });
    }
    return c;
  }

  function css() {
    if (document.getElementById("lnotes-style")) return;
    var s = document.createElement("style");
    s.id = "lnotes-style";
    s.textContent =
      ".lnp{margin:16px 0 4px;background:#fffaf0;border:2px solid #efe2d2;border-radius:16px;padding:12px 14px}" +
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
      "#lnotes h1{font-size:1.7rem;margin:0 0 10px}" +
      "#lnotes h2{font-size:1.25rem;margin:4px 0 8px}" +
      "#lnotes ul,#lnotes ol{margin:6px 0 6px 1.3em}" +
      "#lnotes li{margin:0 0 6px;line-height:1.45}" +
      "#lnotes p{margin:6px 0;line-height:1.5}" +
      "#lnotes figure{margin:10px 0}#lnotes svg{max-width:100%;height:auto}" +
      "#lnotes .lnf{text-align:center;margin-top:16px;padding-top:14px;border-top:2px solid #efe2d2}" +
      "#lnotes .lnf p{color:#6b6580;font-size:.92rem;margin-bottom:10px}" +
      "#lnotes .lnsrc{font-size:.78rem;color:#6b6580;margin-top:14px}" +
      "@media print{" +
        "body.ln-notes-on{background:#fff!important;padding:0!important;display:block!important}" +
        "body.ln-notes-on>*:not(.app){display:none!important}" +
        "body.ln-notes-on .app>*:not(#lnotes){display:none!important}" +
        "body.ln-notes-on .app{max-width:none}" +
        "#lnotes{border:0!important;box-shadow:none!important;padding:0!important;margin:0!important}" +
        "#lnotes .lnh .bt,#lnotes .lnf{display:none!important}" +
        "#lnotes .lns{break-inside:auto}#lnotes li,#lnotes figure,#lnotes .note{break-inside:avoid}" +
        "#lnotes h2{break-after:avoid}" +
        "*{-webkit-print-color-adjust:exact;print-color-adjust:exact}" +
      "}";
    document.head.appendChild(s);
  }

  function init() {
    if (document.querySelector(".ks3-missions")) return;          // mission lessons: not ours
    var screens = [].slice.call(document.querySelectorAll(".screen"));
    if (screens.length < 4) return;
    var welcome = screens[0];
    var teach = [];
    screens.forEach(function (scr, i) {
      if (i === 0 || scr.classList.contains("final") || isQuestionScreen(scr)) return;
      var h = scr.querySelector("h2") || scr.querySelector("h1");
      if (!h || !cleanLabel(h)) return;
      teach.push({ scr: scr, label: cleanLabel(h) });
    });
    if (teach.length < 2) return;
    var app = document.querySelector(".app") || (welcome.closest && welcome.closest(".stage") || welcome).parentNode;
    if (!app) return;
    css();

    var title = cleanLabel(welcome.querySelector("h1") || document.querySelector("h1") || { textContent: document.title });
    var specEl = document.querySelector(".spec");
    var spec = specEl ? specEl.textContent.trim() : "";

    /* 1. welcome preview */
    var pv = document.createElement("div");
    pv.className = "lnp";
    var h3 = document.createElement("h3");
    h3.textContent = "In this lesson · " + teach.length + " sections";
    var ol = document.createElement("ol");
    teach.forEach(function (t) { var li = document.createElement("li"); li.textContent = t.label; ol.appendChild(li); });
    var row = document.createElement("div");
    row.className = "lnp-row";
    var rb = document.createElement("button");
    rb.type = "button"; rb.className = "lnp-btn"; rb.textContent = "📄 Read as notes";
    var hint = document.createElement("span");
    hint.className = "lnp-hint"; hint.textContent = "All sections on one page — print or save as PDF";
    row.appendChild(rb); row.appendChild(hint);
    pv.appendChild(h3); pv.appendChild(ol); pv.appendChild(row);
    var ps = welcome.querySelectorAll("p");
    var last = ps.length ? ps[ps.length - 1] : null;
    if (last && /\bStart\b/.test(last.textContent) && last.parentNode === welcome) welcome.insertBefore(pv, last);
    else welcome.appendChild(pv);

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
      [].slice.call(intro.querySelectorAll(".lnp, .tag")).forEach(function (x) { x.remove(); });
      var ips = intro.querySelectorAll("p");
      if (ips.length && /\bStart\b/.test(ips[ips.length - 1].textContent)) ips[ips.length - 1].remove();
      if (spec) { var sp = document.createElement("p"); sp.className = "lnsrc"; sp.textContent = spec; intro.insertBefore(sp, intro.firstChild); }
      intro.className = "lns";
      box.appendChild(intro);

      teach.forEach(function (t, n) {
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
    function open(via) {
      if (!box) build();
      document.body.classList.add("ln-notes-on");
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
