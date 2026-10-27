/* lesson-next.js — the "What next?" card on the mini-lesson completion screen,
   plus the lesson's Plausible events. Loaded by lesson-nav.js, so no per-lesson
   edits. The card offers:
     1. the next mini-lesson in spec order for the same course, with its hook
        poster and mission question
     2. the Revision Arcade preset to the topic just studied, and the topic's
        Verify quiz when one exists
     3. every lesson in the course, in order, with the current one marked
        (progress.js adds a tick to the ones already finished)
   Data: quizzes/lesson-next/<subject>-<level>-<board>.json (h[slug] = [poster,
   question, thumb]; the card uses the thumb when there is one), built by
   tools/build-lesson-next.py (re-run it when lessons or arcade topics change).

   Plausible events (all carry props course, subject, level, board, topic):
     "Mini-lesson: started"    the student leaves the welcome screen
     "Mini-lesson: completed"  the completion screen opens
     "Mini-lesson next: <what>" a card link is followed: lesson, arcade, verify,
                               course (a lesson in the course list) or hub
   If anything is missing the card does nothing; the events still fire. */
(function () {
  "use strict";
  var SUF = "-mini-lesson.html";
  var RX = /^(.+?)-(ks3|gcse|a-level|ibdp)-(edexcel-igcse|cambridge-igcse|general|edexcel|eduqas|wjec|ccea|aqa|ocr|hl|sl|ib)-(.+)$/;
  var ctx = null;   // {course, subject, level, board, topic} from the file name

  function track(name, extra) {
    try {
      if (!window.plausible) return;
      var p = {};
      if (ctx) { p.course = ctx.course; p.subject = ctx.subject; p.level = ctx.level; p.board = ctx.board; p.topic = ctx.topic; }
      if (extra) for (var k in extra) p[k] = extra[k];
      window.plausible(name, { props: p });
    } catch (e) {}
  }
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }

  /* "started" when the welcome screen stops being active; "completed" when the
     final screen becomes active. Class observers, so they work however the
     lesson's own engine navigates. */
  function watchScreens() {
    var screens = document.querySelectorAll(".screen");
    if (!screens.length) return;
    var first = screens[0], fin = document.querySelector(".screen.final");
    var started = false, completed = false;
    function check() {
      if (!started && !first.classList.contains("active")) { started = true; track("Mini-lesson: started"); }
      if (fin && !completed && fin.classList.contains("active")) { completed = true; track("Mini-lesson: completed"); }
    }
    try {
      var mo = new MutationObserver(check);
      mo.observe(first, { attributes: true, attributeFilter: ["class"] });
      if (fin && fin !== first) mo.observe(fin, { attributes: true, attributeFilter: ["class"] });
    } catch (e) {}
    check();
  }

  function injectStyle() {
    if (document.getElementById("lnx-style")) return;
    var s = document.createElement("style");
    s.id = "lnx-style";
    s.textContent =
      ".lnx{margin:18px auto 6px;padding:16px 16px 14px;max-width:600px;background:#fff8e6;border:3px solid #2c2840;border-radius:20px;" +
        "box-shadow:0 6px 0 rgba(44,40,64,.10);font-family:'Nunito',sans-serif;text-align:center}" +
      ".lnx h2{margin:0 0 10px;font-family:'Fredoka',sans-serif;font-size:1.15rem;color:#2c2840}" +
      ".lnx-row{display:flex;flex-direction:column;gap:10px}" +
      ".lnx-row2{display:grid;grid-template-columns:1fr 1fr;gap:10px}" +
      ".lnx a{display:block;padding:12px 14px;border-radius:14px;border:3px solid #2c2840;font-weight:800;font-size:1rem;line-height:1.3;" +
        "text-decoration:none;color:#2c2840;background:#fff;box-shadow:0 4px 0 rgba(44,40,64,.18);transition:transform .08s}" +
      ".lnx a:hover{transform:translateY(-1px)}" +
      ".lnx a:active{transform:translateY(2px);box-shadow:0 2px 0 rgba(44,40,64,.18)}" +
      ".lnx a.lnx-main{background:#0a6b5e;color:#fff;display:flex;align-items:center;gap:14px;text-align:left;padding:10px}" +
      ".lnx a.lnx-main img{flex:0 0 136px;width:136px;aspect-ratio:16/9;object-fit:cover;border-radius:9px;border:2px solid rgba(255,255,255,.35);background:#083f37}" +
      ".lnx a.lnx-main .lnx-t{flex:1;min-width:0}" +
      ".lnx a.lnx-main .lnx-q{display:block;font-weight:600;font-size:.9rem;opacity:.9;margin-top:3px;font-style:italic}" +
      ".lnx a small{display:block;font-weight:700;font-size:.78rem;letter-spacing:.4px;text-transform:uppercase;opacity:.8;margin-bottom:2px}" +
      ".lnx-course{margin-top:14px;padding-top:12px;border-top:2px dashed #d9cfae;text-align:left}" +
      ".lnx-course p{margin:0 0 8px;font-size:.95rem;color:#2c2840;display:flex;justify-content:space-between;gap:10px;align-items:baseline;flex-wrap:wrap}" +
      ".lnx-course p a{display:inline;padding:0;border:0;box-shadow:none;background:none;color:#0a6b5e;font-size:.9rem;text-decoration:underline;text-underline-offset:3px}" +
      ".lnx-course ol{margin:0;padding:0;list-style:none;columns:2;column-gap:18px;font-size:.92rem;line-height:1.3}" +
      ".lnx-course li{break-inside:avoid;padding:4px 0 4px 26px;position:relative;color:#6b6580}" +
      ".lnx-course li .n{position:absolute;left:0;top:4px;width:20px;height:20px;border-radius:50%;background:#fff;border:2px solid #d9cfae;font-size:.7rem;font-weight:800;" +
        "display:flex;align-items:center;justify-content:center;color:#6b6580}" +
      ".lnx-course li a{display:inline;padding:0;border:0;box-shadow:none;background:none;font-weight:700;color:#2c2840}" +
      ".lnx-course li a:hover{text-decoration:underline;text-underline-offset:3px;transform:none}" +
      ".lnx-course li.here{color:#0a6b5e;font-weight:800}" +
      ".lnx-course li.here .n{background:#0a6b5e;border-color:#0a6b5e;color:#fff}" +
      ".lnx-course li.next .n{border-color:#0a6b5e;color:#0a6b5e}" +
      ".lnx-course li .lp-tick{margin-left:4px}" +
      "@media(max-width:520px){.lnx a.lnx-main{flex-direction:column;align-items:stretch}.lnx a.lnx-main img{width:100%;flex-basis:auto}" +
        ".lnx-row2{grid-template-columns:1fr}.lnx-course ol{columns:1}}";
    document.head.appendChild(s);
  }

  var group = "";
  // row[4] names the lesson file when it isn't <group>-<slug> (one file shared by two boards)
  function fileFor(row) { return (row[4] || group + "-" + row[0]) + SUF; }

  function build(fin, data, slug) {
    var rows = (data && data.t) || [], at = -1;
    for (var k = 0; k < rows.length; k++) if (rows[k][0] === slug) { at = k; break; }
    if (at < 0) return;
    var me = rows[at], hooks = data.h || {}, html = "", nxIdx = -1;
    var topicQ = data.a ? data.a + "&topic=" + encodeURIComponent(me[0]) : "";

    // 1. next lesson
    if (rows.length > 1) {
      var last = at === rows.length - 1; nxIdx = last ? 0 : at + 1;
      var nx = rows[nxIdx], h = hooks[nx[0]];
      try { window.__aismNext = { u: fileFor(nx), t: nx[1] }; if (window.AismProgress) window.AismProgress.noteNext(fileFor(nx), nx[1]); } catch (e) {}
      html += '<a class="lnx-main" data-lnx="lesson" href="' + esc(fileFor(nx)) + '">' +
        (h && h[0] ? '<img src="' + esc(h[2] ? "../../" + h[2] : h[0]) + '" alt="" loading="lazy" decoding="async">' : "") +
        '<span class="lnx-t"><small>' + (last ? "Back to the first lesson" : "Next lesson · " + (nxIdx + 1) + " of " + rows.length) + "</small>" +
        esc(nx[1]) + " ➡" + (h && h[1] ? '<span class="lnx-q">' + esc(h[1]) + "</span>" : "") + "</span></a>";
    }

    // 2. games on this topic (or the course / the arcade), and the Verify quiz
    var q = data.a || "", label, sub, row2 = "";
    if (q && me[2]) { q = topicQ; sub = "Practise what you just learned"; label = "🎮 Games on this topic"; }
    else if (q && data.af !== 0) { sub = "Practise in the Revision Arcade"; label = "🎮 Games for this course"; }
    else { q = ""; sub = "Take a break that still counts"; label = "🎮 Try the Revision Arcade"; }
    row2 += '<a data-lnx="arcade" href="../arcade.html' + (q ? "?" + esc(q) : "") + '"><small>' + sub + "</small>" + label + "</a>";
    var hasVerify = (data.v || []).indexOf(me[0]) >= 0 && topicQ;
    if (hasVerify) row2 += '<a data-lnx="verify" href="../verify/verify-quiz.html?' + esc(topicQ) + '"><small>Prove it stuck</small>✅ Verify quiz</a>';
    html += '<div class="' + (hasVerify ? "lnx-row2" : "lnx-row") + '">' + row2 + "</div>";

    // 3. the whole course
    var hub = "../../lessons/" + group + ".html";
    var list = "";
    for (var i = 0; i < rows.length; i++) {
      var cls = i === at ? "here" : (i === nxIdx ? "next" : "");
      list += '<li class="' + cls + '"><span class="n">' + (i + 1) + "</span>" +
        (i === at ? esc(rows[i][1]) + " <small style=\"display:inline;text-transform:none;letter-spacing:0;font-size:.8rem\">(this lesson)</small>"
                  : '<a data-lnx="course" href="' + esc(fileFor(rows[i])) + '">' + esc(rows[i][1]) + "</a>") + "</li>";
    }
    html += '<div class="lnx-course"><p><b>All ' + rows.length + " lessons in " + esc(data.d || "this course") + "</b>" +
      '<a data-lnx="hub" href="' + hub + '">Course page →</a></p><ol>' + list + "</ol></div>";

    injectStyle();
    var box = document.createElement("div");
    box.className = "lnx";
    box.innerHTML = "<h2>What next?</h2>" + html;
    box.addEventListener("click", function (e) {
      var a = e.target && e.target.closest ? e.target.closest("a[data-lnx]") : null;
      if (a) track("Mini-lesson next: " + a.getAttribute("data-lnx"));
    });
    var anchor = fin.querySelector(".sharebox");
    if (anchor) fin.insertBefore(box, anchor); else fin.appendChild(box);
    // the static sibling-links block (REL-START/END) now repeats the course list: keep it for crawlers, hide it from students
    var rel = fin.querySelector("nav.related"); if (rel) rel.style.display = "none";
    try { if (window.AismProgress) window.AismProgress.mark(box); } catch (e) {}
  }

  function init() {
    var file = decodeURIComponent(location.pathname.split("/").pop() || "");
    if (file.slice(-SUF.length) !== SUF) return;
    var m = RX.exec(file.slice(0, -SUF.length));
    // IB lessons shared by SL and HL are named without a board (geography-ibdp-core-unit-1-…): follow the SL course order
    var sh = m ? null : /^(.+?)-ibdp-((?:core|option)-.+)$/.exec(file.slice(0, -SUF.length));
    if (m || sh) {
      group = m ? m[1] + "-" + m[2] + "-" + m[3] : sh[1] + "-ibdp-sl";
      ctx = m ? { course: group, subject: m[1], level: m[2], board: m[3], topic: m[4] }
              : { course: group, subject: sh[1], level: "ibdp", board: "sl", topic: sh[2] };
    }
    watchScreens();
    var fin = document.querySelector(".screen.final");
    if (!fin || fin.querySelector(".lnx") || !ctx) return;
    fetch("../quizzes/lesson-next/" + group + ".json")
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { if (d) build(fin, d, ctx.topic); })
      .catch(function () {});
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
