/* lesson-finder.js — the mini-lesson finder on index.html and lessons.html.
   Level → subject → exam board → every lesson in that course, in spec order,
   with its mission question. Data: classcraft/quizzes/lesson-next/index.json
   (the courses) and <course>.json (the lessons), both built by
   tools/build-lesson-next.py. Markup: a <div class="lf" data-lf> container;
   everything inside is rendered here. Preselect with ?course=<key>, or
   ?level=&subject=&board= (board optional), or data-level="gcse" on the container.
   Plausible: "Lesson finder: open lesson" {course, topic, page}. */
(function () {
  "use strict";
  var DATA = "classcraft/quizzes/lesson-next/";
  var LEVELS = [["ks3", "KS3"], ["gcse", "GCSE"], ["a-level", "A-Level"], ["ibdp", "IB"]];
  var BOARD_ORDER = ["aqa", "edexcel", "ocr", "eduqas", "wjec", "ccea", "cambridge-igcse", "edexcel-igcse", "general", "sl", "hl", "ib"];

  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
  function track(n, p) { try { if (window.plausible) window.plausible(n, { props: p }); } catch (e) {} }
  function param(k) { try { return new URLSearchParams(location.search).get(k) || ""; } catch (e) { return ""; } }

  function init(root) {
    var courses = [], byKey = {}, state = { level: "", subject: "", board: "" };
    var page = location.pathname.split("/").pop() || "index.html";
    var hub = root.hasAttribute("data-hub");

    root.innerHTML =
      '<div class="lf-steps">' +
        '<div class="lf-step"><span class="lf-n">1</span><span class="lf-lbl">Level</span><div class="lf-pills" data-lf-levels></div></div>' +
        '<div class="lf-step"><span class="lf-n">2</span><label class="lf-lbl" for="lf-subject">Subject</label><select id="lf-subject" data-lf-subject disabled><option value="">Choose a subject…</option></select></div>' +
        '<div class="lf-step"><span class="lf-n">3</span><label class="lf-lbl" for="lf-board">Exam board</label><select id="lf-board" data-lf-board disabled><option value="">—</option></select></div>' +
      "</div>" +
      '<div class="lf-out" data-lf-out aria-live="polite"></div>';
    var pills = root.querySelector("[data-lf-levels]"), subSel = root.querySelector("[data-lf-subject]"),
        boardSel = root.querySelector("[data-lf-board]"), out = root.querySelector("[data-lf-out]");

    LEVELS.forEach(function (l) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "lf-pill"; b.dataset.level = l[0]; b.textContent = l[1];
      b.addEventListener("click", function () { setLevel(l[0]); fillSubjects(); render(); });
      pills.appendChild(b);
    });
    subSel.addEventListener("change", function () { state.subject = subSel.value; state.board = ""; fillBoards(); render(); });
    boardSel.addEventListener("change", function () { state.board = boardSel.value; render(); });

    function setLevel(lv) {
      state.level = lv; state.subject = ""; state.board = "";
      [].forEach.call(pills.children, function (b) { b.classList.toggle("is-on", b.dataset.level === lv); b.setAttribute("aria-pressed", b.dataset.level === lv ? "true" : "false"); });
    }
    function subjectsFor(lv) {
      var seen = {}, list = [];
      courses.forEach(function (c) { if (c.l === lv && !seen[c.s]) { seen[c.s] = 1; list.push([c.s, c.sd]); } });
      return list.sort(function (a, b) { return a[1].localeCompare(b[1]); });
    }
    function boardsFor(lv, s) {
      return courses.filter(function (c) { return c.l === lv && c.s === s; })
        .sort(function (a, b) { return BOARD_ORDER.indexOf(a.b) - BOARD_ORDER.indexOf(b.b); });
    }
    function fillSubjects() {
      var list = subjectsFor(state.level);
      subSel.innerHTML = '<option value="">Choose a subject…</option>' + list.map(function (s) { return '<option value="' + esc(s[0]) + '">' + esc(s[1]) + "</option>"; }).join("");
      subSel.disabled = !list.length; subSel.value = state.subject;
      fillBoards();
    }
    function fillBoards() {
      var list = state.subject ? boardsFor(state.level, state.subject) : [];
      boardSel.innerHTML = list.map(function (c) { return '<option value="' + esc(c.b) + '">' + esc(c.bd) + " · " + c.n + " lesson" + (c.n === 1 ? "" : "s") + "</option>"; }).join("") || '<option value="">—</option>';
      boardSel.disabled = list.length < 2;
      if (list.length && (!state.board || !list.some(function (c) { return c.b === state.board; }))) state.board = list[0].b;
      boardSel.value = state.board || "";
    }
    function key() { return state.level && state.subject && state.board ? state.subject + "-" + state.level + "-" + state.board : ""; }

    function render() {
      var k = key();
      if (hub) {   // keep the course in the URL (and any utm_* tags, so analytics still see where the visit came from)
        try {
          var u = new URLSearchParams(location.search);
          ["course", "level", "subject", "board"].forEach(function (x) { u.delete(x); });
          if (k) u.set("course", k);
          var qs = u.toString();
          history.replaceState(null, "", location.pathname + (qs ? "?" + qs : ""));
        } catch (e) {}
      }
      if (!k) {
        out.innerHTML = state.level ? '<p class="lf-hint">Now pick a subject.</p>' : '<p class="lf-hint">Pick your level to see every mini-lesson for your course.</p>';
        return;
      }
      var c = byKey[k];
      out.innerHTML = '<p class="lf-hint">Loading ' + esc(c ? c.d : k) + "…</p>";
      fetch(DATA + k + ".json").then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
        if (!d || key() !== k) return;
        var rows = d.t || [], h = d.h || {};
        var html = '<div class="lf-head"><h3>' + esc(d.d) + "</h3><span>" + rows.length + " mini-lessons · in specification order</span></div><ol class=\"lf-list\">";
        rows.forEach(function (r, i) {
          var file = "classcraft/adventures/" + (r[4] || k + "-" + r[0]) + "-mini-lesson.html", q = h[r[0]];
          html += '<li><a href="' + esc(file) + '" data-topic="' + esc(r[0]) + '"><span class="lf-i">' + (i + 1) + "</span><span class=\"lf-t\"><b>" + esc(r[1]) + "</b>" +
            (q && q[1] ? "<em>" + esc(q[1]) + "</em>" : "") + '</span><span class="lf-go">Start →</span></a></li>';
        });
        html += "</ol>";
        html += '<p class="lf-more"><a href="lessons/' + esc(k) + '.html">' + esc(d.d) + ' course page →</a>' +
          (hub ? ' · <a href="subjects.html?subject=' + esc(d.s) + "&amp;level=" + esc(d.l) + "&amp;board=" + esc(d.b) + '">All six Velvet stages →</a>' +
                 (d.a ? ' · <a href="classcraft/arcade.html?' + esc(d.a) + '">Revision Arcade →</a>' : "")
               : ' · <a href="lessons.html">Every course →</a>') + "</p>";
        out.innerHTML = html;
        out.addEventListener("click", function (e) {
          var a = e.target && e.target.closest ? e.target.closest("a[data-topic]") : null;
          if (a) track("Lesson finder: open lesson", { course: k, topic: a.getAttribute("data-topic"), page: page });
        });
        try { if (window.AismProgress) window.AismProgress.mark(out); } catch (e) {}
      }).catch(function () { out.innerHTML = '<p class="lf-hint">Couldn’t load that course. <a href="subjects.html">Browse all subjects →</a></p>'; });
    }

    fetch(DATA + "index.json").then(function (r) { return r.json(); }).then(function (list) {
      courses = list.filter(function (c) { return c.n > 0; });
      courses.forEach(function (c) { byKey[c.k] = c; });
      var pre = param("course"), lv = param("level"), s = param("subject"), b = param("board");
      if (pre && byKey[pre]) { lv = byKey[pre].l; s = byKey[pre].s; b = byKey[pre].b; }
      setLevel(LEVELS.some(function (l) { return l[0] === lv; }) ? lv : (root.dataset.level || "gcse"));
      if (s && subjectsFor(state.level).some(function (x) { return x[0] === s; })) state.subject = s;
      if (b) state.board = b;
      fillSubjects();
      render();
    }).catch(function () { out.innerHTML = '<p class="lf-hint"><a href="subjects.html">Browse all subjects →</a></p>'; });
  }

  function boot() { [].forEach.call(document.querySelectorAll("[data-lf]"), init); }
  if (document.readyState !== "loading") boot(); else document.addEventListener("DOMContentLoaded", boot);
})();
