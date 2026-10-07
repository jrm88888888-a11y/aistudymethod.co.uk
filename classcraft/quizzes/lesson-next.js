/* lesson-next.js — "What next?" card on the mini-lesson completion screen.
   Loaded by lesson-nav.js, so no per-lesson edits. Offers:
     1. the next mini-lesson in spec order for the same subject / level / board
     2. the Revision Arcade, preset to what was just studied
   Data: quizzes/lesson-next/<subject>-<level>-<board>.json, built by
   _dev/tools/build-lesson-next.py (re-run it when lessons or arcade topics change).
   Fires Plausible events: "Mini-lesson: completed", "Mini-lesson next: lesson",
   "Mini-lesson next: arcade". If anything is missing it does nothing. */
(function () {
  "use strict";
  var SUF = "-mini-lesson.html";
  var RX = /^(.+?)-(ks3|gcse|a-level|ibdp)-(edexcel-igcse|cambridge-igcse|general|edexcel|eduqas|wjec|ccea|aqa|ocr|hl|sl|ib)-(.+)$/;

  function track(name) { try { if (window.plausible) window.plausible(name); } catch (e) {} }
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }

  function watchCompletion(fin) {
    var sent = false;
    function check() {
      if (!sent && fin.classList.contains("active")) { sent = true; track("Mini-lesson: completed"); }
    }
    try { new MutationObserver(check).observe(fin, { attributes: true, attributeFilter: ["class"] }); } catch (e) {}
    check();
  }

  function injectStyle() {
    if (document.getElementById("lnx-style")) return;
    var s = document.createElement("style");
    s.id = "lnx-style";
    s.textContent =
      ".lnx{margin:18px auto 6px;padding:16px 16px 14px;max-width:560px;background:#fff8e6;border:3px solid #2c2840;border-radius:20px;" +
        "box-shadow:0 6px 0 rgba(44,40,64,.10);font-family:'Nunito',sans-serif;text-align:center}" +
      ".lnx h2{margin:0 0 10px;font-family:'Fredoka',sans-serif;font-size:1.15rem;color:#2c2840}" +
      ".lnx-row{display:flex;flex-direction:column;gap:10px}" +
      ".lnx a{display:block;padding:12px 14px;border-radius:14px;border:3px solid #2c2840;font-weight:800;font-size:1rem;line-height:1.3;" +
        "text-decoration:none;color:#2c2840;background:#fff;box-shadow:0 4px 0 rgba(44,40,64,.18);transition:transform .08s}" +
      ".lnx a:hover{transform:translateY(-1px)}" +
      ".lnx a:active{transform:translateY(2px);box-shadow:0 2px 0 rgba(44,40,64,.18)}" +
      ".lnx a.lnx-main{background:#0a6b5e;color:#fff}" +
      ".lnx a small{display:block;font-weight:700;font-size:.78rem;letter-spacing:.4px;text-transform:uppercase;opacity:.8;margin-bottom:2px}";
    document.head.appendChild(s);
  }

  function build(fin, data, slug) {
    var rows = (data && data.t) || [], at = -1;
    for (var k = 0; k < rows.length; k++) if (rows[k][0] === slug) { at = k; break; }
    if (at < 0) return;
    var me = rows[at], html = "";

    if (rows.length > 1) {
      var last = at === rows.length - 1, nx = rows[last ? 0 : at + 1];
      html += '<a class="lnx-main" data-lnx="lesson" href="' + esc(fileFor(nx[0])) + '"><small>' +
        (last ? "Back to the first lesson" : "Next lesson") + "</small>" + esc(nx[1]) + " ➡</a>";
    }

    var q = data.a || "", label, sub;
    if (q && me[2]) { q += "&topic=" + encodeURIComponent(me[0]); sub = "Practise what you just learned"; label = "🎮 Play games on " + esc(me[1]); }
    else if (q) { sub = "Practise in the Revision Arcade"; label = "🎮 Play games for this course"; }
    else { sub = "Take a break that still counts"; label = "🎮 Try the Revision Arcade"; }
    html += '<a data-lnx="arcade" href="../arcade.html' + (q ? "?" + esc(q) : "") + '"><small>' + sub + "</small>" + label + "</a>";

    injectStyle();
    var box = document.createElement("div");
    box.className = "lnx";
    box.innerHTML = "<h2>What next?</h2><div class=\"lnx-row\">" + html + "</div>";
    box.addEventListener("click", function (e) {
      var a = e.target && e.target.closest ? e.target.closest("a[data-lnx]") : null;
      if (a) track("Mini-lesson next: " + a.getAttribute("data-lnx"));
    });
    var anchor = fin.querySelector(".sharebox");
    if (anchor) fin.insertBefore(box, anchor); else fin.appendChild(box);
  }

  var group = "";
  function fileFor(slug) { return group + "-" + slug + SUF; }

  function init() {
    var fin = document.querySelector(".screen.final");
    if (!fin || fin.querySelector(".lnx")) return;
    watchCompletion(fin);
    var file = decodeURIComponent(location.pathname.split("/").pop() || "");
    if (file.slice(-SUF.length) !== SUF) return;
    var m = RX.exec(file.slice(0, -SUF.length));
    if (!m) return;
    group = m[1] + "-" + m[2] + "-" + m[3];
    fetch("../quizzes/lesson-next/" + group + ".json")
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { if (d) build(fin, d, m[4]); })
      .catch(function () {});
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
