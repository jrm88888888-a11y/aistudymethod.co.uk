/* site-account.js — "Log in" in the site header on every page (Nov 2026).
   Markup: <a href="/classcraft/arcade.html#log-in" class="btn-primary">Log in</a>
   in the header (the mobile drawer copies it, see script.js). Any link whose
   href ends "#log-in" is treated the same way.
     - Signed out: a press opens the arcade's own log-in / sign-up box
       (classcraft/arcade/auth.js, loaded only at that moment). If that file
       cannot load, the link simply goes to the arcade, where logging in works.
     - Signed in: the link shows the username and coin balance from this
       device's saved session and leads to the arcade lobby (account menu).
   Reads localStorage "aism-auth" and "aism-wallet" only; sends nothing itself.
   Plausible (if on the page): "Header log in: opened" {page}. */
(function () {
  "use strict";
  if (typeof window === "undefined" || window.__aismSiteAccount) return;
  window.__aismSiteAccount = true;
  var AUTH_SRC = "/classcraft/arcade/auth.js?v=20261116";
  var SEL = 'a[href$="#log-in"]';

  function read(k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } }
  function session() { var s = read("aism-auth"); return s && s.token && s.username ? s : null; }
  function coins(s) {
    var w = read("aism-wallet");
    if (w && s && w.uid === s.userId && w.w && typeof w.w.coins === "number") return w.w.coins;
    return null;
  }
  function paint() {
    var s = session(), els = document.querySelectorAll(SEL);
    for (var i = 0; i < els.length; i++) {
      var a = els[i];
      if (s) {
        var c = coins(s);
        a.textContent = s.username + (c === null ? "" : " · " + c + " coins");
        a.setAttribute("aria-label", "Your account: " + s.username + (c === null ? "" : ", " + c + " coins"));
        a.setAttribute("data-sa", "in");
      } else {
        a.textContent = "Log in";
        a.removeAttribute("aria-label");
        a.setAttribute("data-sa", "out");
      }
    }
  }

  var authP = null;
  function loadAuth() {
    if (window.Arcade && window.Arcade.auth) return Promise.resolve(window.Arcade.auth);
    if (authP) return authP;
    if (window.AISM_NO_CORNER === undefined) window.AISM_NO_CORNER = true;
    if (window.AISM_NO_SIGNUP_PROMPT === undefined) window.AISM_NO_SIGNUP_PROMPT = true;
    authP = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = AUTH_SRC;
      s.onload = function () { if (window.Arcade && window.Arcade.auth) resolve(window.Arcade.auth); else reject(new Error("no auth")); };
      s.onerror = function () { authP = null; reject(new Error("auth load failed")); };
      document.head.appendChild(s);
    });
    return authP;
  }

  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest(SEL) : null;
    if (!a || session()) return;            // signed in: follow the link to the arcade lobby
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    e.preventDefault();
    var href = a.getAttribute("href");
    try { if (window.plausible) window.plausible("Header log in: opened", { props: { page: location.pathname } }); } catch (err) {}
    loadAuth().then(function (auth) { auth.open("login", { source: "header" }); })
      .catch(function () { location.href = href; });
  });

  window.addEventListener("aism-auth-change", paint);
  window.addEventListener("storage", function (e) { if (e.key === "aism-auth" || e.key === "aism-wallet") paint(); });
  function start() { paint(); setTimeout(paint, 0); setTimeout(paint, 400); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
