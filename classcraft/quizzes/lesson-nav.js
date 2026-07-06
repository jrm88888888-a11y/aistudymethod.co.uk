/* lesson-nav.js — shared "jump to section" contents menu for Learn mini-lessons.
   Drop-in (like share-score.js). Auto-detects teaching screens (no per-lesson
   edits needed) and lets a student jump straight to a subtopic via the engine's
   own show() — so gating, scoring and progress all stay consistent.
   Safe by design: if it can't find the engine or enough sections, it does nothing. */
(function () {
  "use strict";

  function isQuestionScreen(scr) {
    // A question/interactive screen wraps its widget in .activity, or carries a
    // question data-attribute. Games (classify/sort/match) live inside .activity.
    return !!scr.querySelector(
      ".activity, [data-q], [data-num], [data-t], [data-share], .sharebox, .trophy"
    );
  }

  function cleanLabel(el) {
    var t = (el.textContent || "");
    // strip emoji / pictographs and tidy whitespace
    t = t.replace(/[←-⇿⌀-➿⬀-⯿️‍]/g, "");
    try { t = t.replace(/[\u{1F000}-\u{1FAFF}]/gu, ""); } catch (e) {}
    return t.replace(/\s+/g, " ").trim();
  }

  function collect() {
    var screens = [].slice.call(document.querySelectorAll(".screen"));
    var items = [];
    screens.forEach(function (scr, i) {
      if (i === 0) return;                       // welcome
      if (scr.classList.contains("final")) return; // final/score
      if (isQuestionScreen(scr)) return;         // question / game / share
      var h = scr.querySelector("h2") || scr.querySelector("h1");
      if (!h) return;
      var label = cleanLabel(h);
      if (!label) return;
      items.push({ i: i, label: label });
    });
    return { screens: screens, items: items };
  }

  function jumpTo(i) {
    // Prefer the lesson engine's own navigator so cur/gating/progress stay in sync.
    if (typeof window.show === "function") { try { window.show(i); return; } catch (e) {} }
    // Fallback (engine not global): toggle active + scroll, best effort.
    var screens = document.querySelectorAll(".screen");
    for (var k = 0; k < screens.length; k++) screens[k].classList.remove("active");
    if (screens[i]) screens[i].classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function currentIndex() {
    var screens = document.querySelectorAll(".screen");
    for (var k = 0; k < screens.length; k++) if (screens[k].classList.contains("active")) return k;
    return 0;
  }

  function injectStyle() {
    if (document.getElementById("ln-style")) return;
    var s = document.createElement("style");
    s.id = "ln-style";
    s.textContent =
      ".ln-btn{font-family:'Fredoka',sans-serif;font-weight:600;font-size:.9rem;background:#fff;color:#2c2840;border:2px solid #2c2840;border-radius:14px;padding:6px 12px;box-shadow:0 3px 0 #2c2840;cursor:pointer;display:inline-flex;align-items:center;gap:6px}" +
      ".ln-btn:active{transform:translateY(2px);box-shadow:0 1px 0 #2c2840}" +
      ".ln-wrap{position:relative;margin-left:auto}" +
      ".ln-panel{position:absolute;right:0;top:calc(100% + 8px);z-index:200;width:min(320px,86vw);max-height:60vh;overflow:auto;background:#fff;border:3px solid #2c2840;border-radius:18px;box-shadow:0 12px 0 rgba(44,40,64,.12);padding:8px;display:none}" +
      ".ln-panel.open{display:block}" +
      ".ln-panel h4{font-family:'Fredoka',sans-serif;font-weight:600;font-size:.78rem;letter-spacing:.4px;text-transform:uppercase;color:#6b6580;margin:6px 8px 8px}" +
      ".ln-item{display:block;width:100%;text-align:left;font-family:'Nunito',sans-serif;font-weight:600;font-size:.98rem;color:#2c2840;background:#fff;border:none;border-radius:12px;padding:9px 11px;cursor:pointer}" +
      ".ln-item:hover{background:#fff3d6}" +
      ".ln-item.here{background:#eef4ff;box-shadow:inset 0 0 0 2px #2b6cb0}" +
      ".ln-item .n{color:#6b6580;font-weight:700;margin-right:8px}";
    document.head.appendChild(s);
  }

  function init() {
    var data = collect();
    if (data.items.length < 2) return;           // not worth a menu

    injectStyle();

    var wrap = document.createElement("div");
    wrap.className = "ln-wrap";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ln-btn";
    btn.setAttribute("aria-haspopup", "true");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = "☰ Sections";

    var panel = document.createElement("div");
    panel.className = "ln-panel";
    panel.setAttribute("role", "menu");
    panel.innerHTML = "<h4>Jump to a section</h4>";
    data.items.forEach(function (it, n) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "ln-item";
      b.setAttribute("role", "menuitem");
      b.dataset.i = it.i;
      b.innerHTML = '<span class="n">' + (n + 1) + "</span>" +
        it.label.replace(/&/g, "&amp;").replace(/</g, "&lt;");
      b.addEventListener("click", function () {
        jumpTo(parseInt(b.dataset.i, 10));
        close();
      });
      panel.appendChild(b);
    });

    function markHere() {
      var ci = currentIndex();
      var best = null;
      panel.querySelectorAll(".ln-item").forEach(function (el) {
        el.classList.remove("here");
        if (parseInt(el.dataset.i, 10) <= ci) best = el; // nearest section at/above current
      });
      if (best) best.classList.add("here");
    }
    function open() { markHere(); panel.classList.add("open"); btn.setAttribute("aria-expanded", "true"); }
    function close() { panel.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
    function toggle() { panel.classList.contains("open") ? close() : open(); }

    btn.addEventListener("click", function (e) { e.stopPropagation(); toggle(); });
    document.addEventListener("click", function (e) { if (!wrap.contains(e.target)) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

    wrap.appendChild(btn);
    wrap.appendChild(panel);

    // Place it in the backstrip row (unobtrusive, top of the lesson).
    var strip = document.querySelector(".backstrip");
    if (strip) {
      strip.style.display = "flex";
      strip.style.alignItems = "center";
      strip.appendChild(wrap);
    } else {
      wrap.style.cssText = "position:fixed;top:12px;right:12px;z-index:900";
      document.body.appendChild(wrap);
    }
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
