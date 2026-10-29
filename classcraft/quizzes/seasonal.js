/* seasonal.js — a small, time-limited plug for a seasonal mini-lesson, shown on related
   mini-lessons only. Loaded by lesson-nav.js, so no per-lesson edits.
   Current campaign: Halloween Science, "The Glow Stick Mystery".
     - shown on KS3 Science and GCSE Biology / Chemistry / Physics mini-lessons
     - a slim bar under the lesson's top bar (dismissible; remembered on this device)
     - a card on the lesson's completion screen
     - switches itself off at END (local time); to remove it for good, delete the
       loader lines in lesson-nav.js and this file.
   Plausible: "Seasonal plug: shown" (bar), "Seasonal plug: click" (props where = bar | final). */
(function () {
  "use strict";
  var C = {
    id: "halloween-2026",
    end: new Date(2026, 10, 8),     // 8 Nov 2026, 00:00 local
    page: "halloween-science-glow-sticks-mini-lesson.html",
    tag: "🎃 Halloween Science",
    q: "How can a glow stick glow without getting hot?",
    bar: "Try The Glow Stick Mystery",
    sub: "Three missions, a freezer experiment to try at home, and fireflies.",
    poster: "halloween-hooks/posters/halloween-glow-sticks-m1_16x9.jpg",
    match: /^(science-ks3-|chemistry-gcse-|physics-gcse-|biology-gcse-)/
  };
  try {
    if (new Date() >= C.end) return;
    var file = (location.pathname.split("/").pop() || "");
    if (file === C.page || !C.match.test(file)) return;
  } catch (e) { return; }

  function track(name, props) { try { if (window.plausible) window.plausible(name, { props: props || {} }); } catch (e) {} }
  function seen() { try { return localStorage.getItem("aism-seasonal:" + C.id) === "x"; } catch (e) { return false; } }
  function hide() { try { localStorage.setItem("aism-seasonal:" + C.id, "x"); } catch (e) {} }
  var href = C.page;     // lessons live in the same folder

  var css = document.createElement("style");
  css.textContent =
    ".sz-bar{display:flex;align-items:center;gap:10px;background:#2B2A55;color:#fff;border:3px solid var(--ink,#2c2840);border-radius:16px;padding:8px 10px 8px 14px;margin:-4px 0 14px;font-family:'Fredoka',sans-serif;font-weight:500;font-size:.98rem;line-height:1.3}" +
    ".sz-bar a{color:#fff;text-decoration:none;flex:1}.sz-bar a b{color:#FFC83D;font-weight:600}" +
    ".sz-bar button{all:unset;cursor:pointer;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.1rem;color:#fff;opacity:.75}" +
    ".sz-bar button:hover,.sz-bar button:focus-visible{opacity:1;background:rgba(255,255,255,.15)}" +
    ".sz-card{display:flex;gap:14px;align-items:center;text-align:left;text-decoration:none;color:var(--ink,#2c2840);background:#fff;border:3px solid var(--ink,#2c2840);border-radius:20px;padding:12px;margin:18px 0 4px;box-shadow:0 6px 0 rgba(44,40,64,.10)}" +
    ".sz-card img{width:132px;height:auto;border-radius:12px;border:2px solid var(--ink,#2c2840);flex-shrink:0}" +
    ".sz-card .t{display:block;font-family:'Fredoka',sans-serif;font-size:.8rem;font-weight:600;color:#6A30B8}" +
    ".sz-card .q{display:block;font-family:'Fredoka',sans-serif;font-weight:600;font-size:1.08rem;line-height:1.25;margin:2px 0 4px}" +
    ".sz-card .s{display:block;font-size:.92rem;color:var(--soft,#6b6580);line-height:1.35}" +
    "@media(max-width:480px){.sz-card img{width:96px}}";
  document.head.appendChild(css);

  function addBar() {
    if (seen()) return;
    var top = document.querySelector(".topbar");
    if (!top || document.querySelector(".sz-bar")) return;
    var bar = document.createElement("div");
    bar.className = "sz-bar";
    bar.setAttribute("role", "note");
    bar.innerHTML = '<a href="' + href + '"><b>' + C.tag + "</b> · " + C.bar + " →</a>" +
      '<button type="button" aria-label="Dismiss">×</button>';
    bar.querySelector("a").addEventListener("click", function () { track("Seasonal plug: click", { where: "bar", campaign: C.id }); });
    bar.querySelector("button").addEventListener("click", function () { hide(); bar.remove(); });
    top.parentNode.insertBefore(bar, top.nextSibling);
    track("Seasonal plug: shown", { campaign: C.id });
  }
  function addCard() {
    var fin = document.querySelector(".screen.final");
    if (!fin || fin.querySelector(".sz-card")) return;
    var a = document.createElement("a");
    a.className = "sz-card";
    a.href = href;
    a.innerHTML = '<img src="' + C.poster + '" alt="" width="132" height="74" loading="lazy">' +
      '<span><span class="t">' + C.tag + '</span><span class="q">' + C.q + '</span><span class="s">' + C.sub + "</span></span>";
    a.addEventListener("click", function () { track("Seasonal plug: click", { where: "final", campaign: C.id }); });
    var share = fin.querySelector(".sharebox");
    if (share) fin.insertBefore(a, share); else fin.appendChild(a);
  }
  function init() { addBar(); addCard(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
