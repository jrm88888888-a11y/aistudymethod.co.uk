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
   Nov 2026: the card sits straight under "Mini-lesson complete!" (it used to be
   below the fold on phones), the old static "Next: ..." line is hidden, and every
   other way off the completion screen is counted too, as
     "Mini-lesson next: <what>" share, restart, back (course page link in the
                               top bar or under the card), revise (revision
                               hub), teacher, coins (coin note link), promo
                               (seasonal plug / another course's lesson),
                               other (any other link; carries href)
   "Mini-lesson: completed" carries card=yes|no (no = no course data, card absent).
   Nov 2026, missions as the unit (progress.js §7 builds the mission list and
   dispatches window "aism-mission" events; this file names them for Plausible):
     "Mini-lesson: started"    + via = start (Start button) | resume (Continue) |
                               hash (#mN in the link) | open (Open on the map)
     "Mission: started"        {mission, of, via (as above, next = reached by Next,
                               strip = the mission-complete strip's Next button)}
     "Mission: completed"      {mission, of, first_try yes|no, score pct, mins =
                               active minutes on the mission} — the Mission check
                               answered correctly
     "Mini-lesson: completed"  + missions_done, of (mission lessons only)
     "Mission next: continue | save | leave" {mission, of} — the strip under a
                               Mission check once it is passed (via=strip on the
                               next "Mission: started" when "continue" is used)
   All of these need a matching Goal in Plausible to show up on the dashboard.
   If anything is missing the card does nothing; the events still fire. */
(function () {
  "use strict";
  var SUF = "-mini-lesson.html";
  var RX = /^(.+?)-(ks3|gcse|a-level|ibdp)-(edexcel-igcse|cambridge-igcse|general|edexcel|eduqas|wjec|ccea|aqa|ocr|hl|sl|ib)-(.+)$/;
  // AP courses (Nov 2026): lesson files are <prefix>-<slug>; the course key is <subject>-ap-<board>
  // (same table as AP_COURSES in tools/build-lesson-next.py). Longest prefix first.
  var AP = [["physics-ap-c-mechanics", "physics", "physics-c-mechanics"], ["physics-ap-c-em", "physics", "physics-c-em"],
            ["physics-ap-1", "physics", "physics-1"], ["physics-ap-2", "physics", "physics-2"], ["chemistry-ap", "chemistry", "collegeboard"]];
  function apMatch(stem) {
    for (var i = 0; i < AP.length; i++) if (stem.indexOf(AP[i][0] + "-") === 0)
      return [stem, AP[i][1], "ap", AP[i][2], stem.slice(AP[i][0].length + 1)];
    return null;
  }
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
    var P = function () { return window.AismProgress; };
    function via() {
      var v = P() && P().takeVia ? P().takeVia() : null;            // progress.js saw how the welcome screen was left
      if (v) return v;
      // opened straight into a mission before progress.js ran (a stray #mN on a lesson without missions does nothing)
      if (/^#m\d+$/.test(location.hash || "") && !(P() && P().missions && !P().missions().length)) return "hash";
      return "start";
    }
    function check() {
      if (!started && !first.classList.contains("active")) { var v = via(); started = true; track("Mini-lesson: started", { via: v }); }
      if (fin && !completed && fin.classList.contains("active")) {
        completed = true;
        var x = { card: fin.querySelector(".lnx") ? "yes" : "no" };
        try {
          var ms = P() && P().missions ? P().missions() : [];
          if (ms.length) { x.missions_done = String(P().missionsDone()); x.of = String(ms.length); }
        } catch (e) {}
        track("Mini-lesson: completed", x);
        exitsOn = true;
        setTimeout(function () { nudge(fin); }, 700);
      }
    }
    try {
      var mo = new MutationObserver(check);
      mo.observe(first, { attributes: true, attributeFilter: ["class"] });
      if (fin && fin !== first) mo.observe(fin, { attributes: true, attributeFilter: ["class"] });
    } catch (e) {}
    check();
    // per-mission events from progress.js (§7); it queues any sent before this listener existed
    function onMission(d) {
      if (!d || !d.mission) return;
      var p = { mission: String(d.mission), of: String(d.of) };
      if (d.type === "started") { p.via = d.via || "next"; track("Mission: started", p); }
      else if (d.type === "completed") { p.first_try = d.first_try || "no"; p.score = d.score || ""; if (d.mins) p.mins = d.mins; track("Mission: completed", p); }
      else if (d.type === "next" && d.what) track("Mission next: " + d.what, p);
    }
    window.addEventListener("aism-mission", function (e) { onMission(e && e.detail); });
    window.__aismMissionL = true;
    try { (window.__aismMissionQ || []).splice(0).forEach(onMission); } catch (e) {}
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
      if (a) { track("Mini-lesson next: " + a.getAttribute("data-lnx")); e.__lnx = true; }
    });
    // straight under the heading + stars, so the next step is on screen without scrolling
    var head = fin.querySelector(".stars3") || fin.querySelector("h1");
    if (head && head.parentNode === fin) fin.insertBefore(box, head.nextSibling);
    else { var anchor = fin.querySelector(".sharebox"); if (anchor) fin.insertBefore(box, anchor); else fin.appendChild(box); }
    // the static "Next: ..." line competes with the card (which already offers Verify, the arcade and the course page)
    var kids = fin.children;
    for (var j = 0; j < kids.length; j++) if (kids[j].tagName === "P" && /^\s*Next:/.test(kids[j].textContent)) kids[j].style.display = "none";
    // the static sibling-links block (REL-START/END) now repeats the course list: keep it for crawlers, hide it from students
    var rel = fin.querySelector("nav.related"); if (rel) rel.style.display = "none";
    try { if (window.AismProgress) window.AismProgress.mark(box); } catch (e) {}
  }

  /* Everything else a student can do from the completion screen. Only counted
     while that screen is showing, and only once per page (the first choice). */
  var exitsOn = false, exitDone = false;
  function kindOf(el) {
    if (el.closest(".sharebox") || el.hasAttribute("data-share")) return "share";
    if (el.classList.contains("restart")) return "restart";
    if (el.closest(".lnx") || el.closest("#lp-chip") || el.closest("#lp-menu")) return null;   // card already counted; coins chip has its own events
    if (el.closest(".sz-bar") && el.tagName !== "A") return null;                              // closing the seasonal bar isn't leaving
    if (el.closest(".sz-card") || el.closest(".sz-bar")) return "promo";                     // seasonal plug (seasonal.js counts it too)
    if (el.closest(".lp-note")) return el.tagName === "A" ? "coins" : null;                   // coin note's shop link (its save form isn't leaving)
    var a = el.closest("a");
    if (!a) return /assign/i.test(el.textContent || "") ? "teacher" : null;
    var h = a.getAttribute("href") || "";
    if (!h || /^(#|blob:|data:|javascript:)/i.test(h)) return null;                          // in-page links and generated downloads
    if (/\/lessons\//.test(h)) return "back";
    if (/\/revise\//.test(h)) return "revise";
    if (/-mini-lesson\.html/.test(h)) return group && h.indexOf(group + "-") >= 0 ? "course" : "promo";
    if (/arcade\.html/.test(h)) return "arcade";
    if (/verify/.test(h)) return "verify";
    if (/\/teach/.test(h)) return "teacher";
    return "other";
  }
  function watchExits() {
    document.addEventListener("click", function (e) {
      if (!exitsOn || exitDone || !e.isTrusted) return;   // only real clicks (share-score.js clicks a hidden download link)
      var el = e.target && e.target.closest ? e.target.closest("a,button") : null;
      if (!el) return;
      var k = kindOf(el);
      if (!k) return;
      exitDone = k !== "share";               // sharing isn't leaving: keep listening after it
      var extra = k === "other" ? { href: (el.getAttribute("href") || "").slice(0, 120) } : null;
      track("Mini-lesson next: " + k, extra);
    }, true);
  }
  // on small screens make sure the next-lesson button is in view once the final screen settles
  function nudge(fin) {
    try {
      var main = fin.querySelector(".lnx a.lnx-main") || fin.querySelector(".lnx");
      if (!main) return;
      var r = main.getBoundingClientRect();
      if (r.bottom > window.innerHeight - 8) {
        var y = window.pageYOffset + fin.querySelector(".lnx").getBoundingClientRect().top - 110;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      }
    } catch (e) {}
  }

  function init() {
    var file = decodeURIComponent(location.pathname.split("/").pop() || "");
    if (file.slice(-SUF.length) !== SUF) return;
    var m = RX.exec(file.slice(0, -SUF.length)) || apMatch(file.slice(0, -SUF.length));
    // IB lessons shared by SL and HL are named without a board (geography-ibdp-core-unit-1-…): follow the SL course order
    var sh = m ? null : /^(.+?)-ibdp-((?:core|option)-.+)$/.exec(file.slice(0, -SUF.length));
    if (m || sh) {
      group = m ? m[1] + "-" + m[2] + "-" + m[3] : sh[1] + "-ibdp-sl";
      ctx = m ? { course: group, subject: m[1], level: m[2], board: m[3], topic: m[4] }
              : { course: group, subject: sh[1], level: "ibdp", board: "sl", topic: sh[2] };
    }
    watchScreens();
    watchExits();
    var fin = document.querySelector(".screen.final");
    if (!fin || fin.querySelector(".lnx") || !ctx) return;
    fetch("../quizzes/lesson-next/" + group + ".json")
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d) return;
        build(fin, d, ctx.topic);
        // measured mission minutes (5th field = 1) for the welcome chips, rail and strip; progress.js may not have run yet
        try {
          var rows = d.m && d.m[ctx.topic];
          if (rows) { window.__aismMinutes = rows; if (window.AismProgress && window.AismProgress.useMinutes) window.AismProgress.useMinutes(rows); }
        } catch (e) {}
      })
      .catch(function () {});
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
