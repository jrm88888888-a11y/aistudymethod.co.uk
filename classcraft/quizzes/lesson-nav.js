/* lesson-nav.js — persistent section rail + progress for Learn mini-lessons.
   Drop-in (like share-score.js). Auto-detects teaching screens (no per-lesson
   edits) and shows a side list that brightens as the student advances and lets
   them jump to any section. Jumps go through the lesson's own show(), so gating,
   scoring and progress stay in sync. If it can't find the engine or enough
   sections, it does nothing. */
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

  function collect() {
    var screens = [].slice.call(document.querySelectorAll(".screen"));
    var items = [];
    screens.forEach(function (scr, i) {
      if (i === 0) return;                         // welcome
      if (scr.classList.contains("final")) return; // final/score
      if (isQuestionScreen(scr)) return;           // question / game / share
      var h = scr.querySelector("h2") || scr.querySelector("h1");
      if (!h) return;
      var label = cleanLabel(h);
      if (!label) return;
      items.push({ i: i, label: label });
    });
    return items;
  }

  function currentIndex() {
    var screens = document.querySelectorAll(".screen");
    for (var k = 0; k < screens.length; k++) if (screens[k].classList.contains("active")) return k;
    return 0;
  }

  function jumpTo(i) {
    if (typeof window.show === "function") { try { window.show(i); return; } catch (e) {} }
    var screens = document.querySelectorAll(".screen");
    for (var k = 0; k < screens.length; k++) screens[k].classList.remove("active");
    if (screens[i]) screens[i].classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function injectStyle() {
    if (document.getElementById("ln-style")) return;
    var s = document.createElement("style");
    s.id = "ln-style";
    s.textContent =
      ".ln-rail{position:fixed;left:16px;top:50%;transform:translateY(-50%);width:216px;max-height:88vh;overflow:auto;z-index:120;" +
        "background:#fff;border:3px solid #2c2840;border-radius:20px;box-shadow:0 10px 0 rgba(44,40,64,.10);padding:12px 10px;font-family:'Nunito',sans-serif}" +
      ".ln-head{display:flex;justify-content:space-between;align-items:center;font-family:'Fredoka',sans-serif;font-weight:600;font-size:.72rem;" +
        "letter-spacing:.5px;text-transform:uppercase;color:#6b6580;margin:2px 6px 8px;gap:8px;background:none;border:none;width:100%;cursor:default}" +
      ".ln-head .ct{color:#0a6b5e;font-weight:700}" +
      ".ln-head .cv{display:none}" +
      ".ln-list{display:flex;flex-direction:column;gap:2px}" +
      ".ln-i{display:flex;gap:9px;align-items:flex-start;text-align:left;background:none;border:none;border-radius:12px;padding:8px 9px;" +
        "cursor:pointer;color:#2c2840;font-weight:600;font-size:.9rem;line-height:1.25;width:100%;opacity:.4;transition:opacity .25s,background .15s}" +
      ".ln-i .dot{flex-shrink:0;width:17px;height:17px;border-radius:50%;border:2.5px solid #b9b3c9;margin-top:1px;display:flex;align-items:center;justify-content:center;font-size:.62rem;color:#fff}" +
      ".ln-i .lb{flex:1;min-width:0}" +
      ".ln-i:hover{background:#fff3d6;opacity:1}" +
      ".ln-i.ahead{opacity:1}" +
      ".ln-i.done{opacity:1;color:#0a6b5e}" +
      ".ln-i.done .dot{background:#0a6b5e;border-color:#0a6b5e}" +
      ".ln-i.here{opacity:1;background:#eef4ff;box-shadow:inset 0 0 0 2px #2b6cb0}" +
      ".ln-i.here .dot{background:#2b6cb0;border-color:#2b6cb0}" +
      "@media(max-width:1199px){" +
        ".ln-rail{top:10px;left:10px;transform:none;width:auto;max-width:90vw;padding:6px 8px}" +
        ".ln-head{cursor:pointer;margin:4px 4px}" +
        ".ln-head .cv{display:inline}" +
        ".ln-list{display:none;margin-top:6px;max-height:64vh;overflow:auto}" +
        ".ln-rail.ln-open .ln-list{display:flex}" +
      "}";
    document.head.appendChild(s);
  }

  function init() {
    var items = collect();
    if (items.length < 2) return;

    injectStyle();

    var rail = document.createElement("nav");
    rail.className = "ln-rail";
    rail.setAttribute("aria-label", "Lesson sections");

    var head = document.createElement("button");
    head.type = "button";
    head.className = "ln-head";
    head.innerHTML = '<span><span class="cv">☰ </span>Sections</span><span class="ct" id="ln-ct">1 / ' + items.length + "</span>";

    var list = document.createElement("div");
    list.className = "ln-list";

    var els = items.map(function (it, n) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "ln-i todo";
      b.dataset.i = it.i;
      b.innerHTML = '<span class="dot">✓</span><span class="lb">' +
        it.label.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</span>";
      b.addEventListener("click", function () {
        jumpTo(parseInt(b.dataset.i, 10));
        rail.classList.remove("ln-open"); // close the mobile drawer after choosing
      });
      list.appendChild(b);
      return b;
    });

    // Mobile: header toggles the list open/closed.
    head.addEventListener("click", function () {
      if (window.matchMedia && window.matchMedia("(max-width:1199px)").matches) rail.classList.toggle("ln-open");
    });

    rail.appendChild(head);
    rail.appendChild(list);
    document.body.appendChild(rail);

    var ctEl = document.getElementById("ln-ct");
    var furthest = 0;

    function update() {
      var ci = currentIndex();
      if (ci > furthest) furthest = ci;
      var curOrd = 0, furOrd = 0;
      items.forEach(function (it, n) { if (it.i <= ci) curOrd = n; if (it.i <= furthest) furOrd = n; });
      els.forEach(function (el, n) {
        el.classList.remove("done", "here", "ahead", "todo");
        if (n > furOrd) el.classList.add("todo");
        else if (n === curOrd) { el.classList.add("here"); el.setAttribute("aria-current", "true"); }
        else if (n < curOrd) el.classList.add("done");
        else el.classList.add("ahead");
        if (n !== curOrd) el.removeAttribute("aria-current");
      });
      if (ctEl) ctEl.textContent = (curOrd + 1) + " / " + items.length;
    }

    // React to every navigation (Next/Back and jumps) by wrapping the engine's show().
    if (typeof window.show === "function") {
      var _s = window.show;
      window.show = function (i) { _s(i); update(); };
    }
    update();
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
