/* site-account.js — "Log in" in the site header on every page (Nov 2026).
   Markup: <a href="/classcraft/arcade.html#log-in" class="btn-primary">Log in</a>
   in the header (the mobile drawer copies it, see script.js). Any link whose
   href ends "#log-in" is treated the same way.
     - Signed out: a press opens the arcade's own log-in / sign-up box
       (classcraft/arcade/auth.js, loaded only at that moment). If that file
       cannot load, the link simply goes to the arcade, where logging in works.
     - Signed in: the link shows the username and coin balance from this
       device's saved session, with the avatar they chose in front of it
       (the avatar list, classcraft/arcade/avatars-data.js, is fetched only
       for a signed-in visitor who has one). A press opens a small menu under it (19 Nov
       2026; it used to lead to the arcade): Choose avatar, Invite a friend,
       Give feedback (these three and Log out use auth.js, loaded at that
       moment), Revision Arcade, Velvet Worlds, Log out. With scripts off, or
       a new-tab click, the link still goes to the arcade.
     - The launch note (19 Nov 2026 to 26 Nov 2026, one week): a signed-in visitor sees one
       short pop-up, once per account per device, thanking them for their ideas
       and pointing to Velvet Worlds. Not on the game page itself. The arcade
       lobby loads this file for it. Safe to delete after NOTE.until, with the
       noteCheck() calls. Plausible: "Launch note: shown" / "opened" / "not now".
   Reads localStorage "aism-auth" and "aism-wallet" only; sends nothing itself.
   Plausible (if on the page): "Header log in: opened" {page};
   "Header account menu: opened" {page}; "Header account menu: chosen" {item}. */
(function () {
  "use strict";
  if (typeof window === "undefined" || window.__aismSiteAccount) return;
  window.__aismSiteAccount = true;
  var AUTH_SRC = "/classcraft/arcade/auth.js?v=20261119";
  var SEL = 'a[href$="#log-in"]';

  function read(k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } }
  function session() { var s = read("aism-auth"); return s && s.token && s.username ? s : null; }
  function coins(s) {
    var w = read("aism-wallet");
    if (w && s && w.uid === s.userId && w.w && typeof w.w.coins === "number") return w.w.coins;
    return null;
  }
  /* The chosen avatar: its number is in the saved wallet; the picture's file name needs the avatar list. */
  var AV_SRC = "/classcraft/arcade/avatars-data.js", avP = null;
  function avatarId(s) { var w = read("aism-wallet"); return w && s && w.uid === s.userId && w.w && w.w.avatar ? parseInt(w.w.avatar, 10) : null; }
  function avatarUrl(id) {
    var list = window.VELVET_AVATARS || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return "/classcraft/arcade/assets/avatars/256/" + String(list[i].id).padStart(2, "0") + "-" + list[i].slug + ".webp";
    return "";
  }
  function loadAvatars() {   // once; if auth.js (or anything else) is already fetching the list, wait for that fetch instead of starting another
    if (window.VELVET_AVATARS) return Promise.resolve();
    if (avP) return avP;
    avP = new Promise(function (done) {
      var s = document.querySelector('script[src*="avatars-data.js"]');
      if (!s) { s = document.createElement("script"); s.src = AV_SRC; s.async = false; document.head.appendChild(s); }
      s.addEventListener("load", done); s.addEventListener("error", function () { avP = null; done(); });
    });
    return avP;
  }
  function paint() {
    var s = session(), els = document.querySelectorAll(SEL);
    for (var i = 0; i < els.length; i++) {
      var a = els[i];
      if (s) {
        var c = coins(s), av = avatarId(s), url = av ? avatarUrl(av) : "", text = s.username + (c === null ? "" : " · " + c + " coins"), key = url + "|" + text;
        if (av && !url && !window.VELVET_AVATARS) loadAvatars().then(paint);   // the list is not here yet: paint again when it is
        if (a.getAttribute("data-sa-key") !== key) {   // only when something changed, so the picture is not fetched again on every paint
          a.textContent = "";
          if (url) {
            var img = document.createElement("img");
            img.src = url; img.alt = ""; img.width = 28; img.height = 28; img.className = "sa-av";
            img.style.cssText = "width:28px;height:28px;border-radius:50%;object-fit:cover;flex:none;margin:-4px 8px -4px -6px;vertical-align:middle;border:2px solid currentColor;background:#fff";
            img.onerror = function () { if (this.parentNode) this.parentNode.removeChild(this); };
            a.appendChild(img);
          }
          a.appendChild(document.createTextNode(text));
          a.setAttribute("data-sa-key", key);
        }
        a.setAttribute("aria-label", "Your account: " + s.username + (c === null ? "" : ", " + c + " coins") + ". Opens a menu.");
        a.setAttribute("aria-haspopup", "menu");
        a.setAttribute("aria-expanded", menu && menuFor === a ? "true" : "false");
        a.setAttribute("data-sa", "in");
      } else {
        a.textContent = "Log in"; a.removeAttribute("data-sa-key");
        a.removeAttribute("aria-label"); a.removeAttribute("aria-haspopup"); a.removeAttribute("aria-expanded");
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

  /* ---- the account menu (signed in) ---- */
  var menu = null, menuFor = null;
  var ITEMS = [
    ["Choose avatar", function (auth) { auth.openAvatars(); }],
    ["Invite a friend", function (auth) { auth.openInvite(); }],
    ["Give feedback", function (auth) { auth.openFeedback({ where: "site header" }); }],
    ["Revision Arcade", "/classcraft/arcade.html"],
    ["Velvet Worlds", "/velvet-worlds/"],
    ["Log out", function (auth) { auth.logout(); }]
  ];
  function track(name, props) { try { if (window.plausible) window.plausible(name, { props: props }); } catch (err) {} }
  function css() {
    if (document.getElementById("sa-menu-css")) return;
    var st = document.createElement("style"); st.id = "sa-menu-css";
    st.textContent = ".sa-menu{position:fixed;z-index:2147483000;min-width:220px;max-width:calc(100vw - 16px);box-sizing:border-box;padding:8px;background:#fff;border:3px solid #2a2740;border-radius:16px;box-shadow:0 5px 0 #2a2740;font:600 16px/1.2 'Nunito','DM Sans',system-ui,sans-serif}" +
      ".sa-menu a,.sa-menu button{display:block;width:100%;box-sizing:border-box;margin:0;padding:11px 14px;border:0;border-radius:10px;background:none;color:#2a2740;font:inherit;text-align:left;text-decoration:none;cursor:pointer}" +
      ".sa-menu a:hover,.sa-menu button:hover,.sa-menu a:focus-visible,.sa-menu button:focus-visible{background:#f7c948;outline:none}" +
      ".sa-menu .sa-sep{height:2px;margin:6px 8px;background:#e7e3da}";
    document.head.appendChild(st);
  }
  function place() {
    if (!menu || !menuFor) return;
    var r = menuFor.getBoundingClientRect(), w = menu.offsetWidth, h = menu.offsetHeight;
    var left = Math.max(8, Math.min(r.right - w, window.innerWidth - w - 8));
    var top = r.bottom + 10; if (top + h > window.innerHeight - 8 && r.top - h - 10 >= 8) top = r.top - h - 10;   // above the button if there is no room below
    if (r.width === 0 || r.right <= 0 || r.left >= window.innerWidth || r.bottom <= 0 || r.top >= window.innerHeight) {   // the link has gone from view (on a phone the drawer shuts when it is pressed): sit under the header, at the right
      var hd = document.querySelector("header, nav"), hb = hd ? hd.getBoundingClientRect().bottom : 0;
      left = Math.max(8, window.innerWidth - w - 8); top = Math.max(8, Math.min(hb, window.innerHeight * 0.4) + 8);
    }
    menu.style.left = left + "px"; menu.style.top = top + "px";
  }
  function closeMenu(focusBack) {
    if (!menu) return;
    var a = menuFor; menu.remove(); menu = null; menuFor = null;
    if (a) { a.setAttribute("aria-expanded", "false"); if (focusBack) a.focus(); }
  }
  function choose(item, href) {
    track("Header account menu: chosen", { item: item[0] });
    closeMenu(false);
    loadAuth().then(function (auth) { item[1](auth); }).catch(function () { location.href = href; });   // auth.js would not load: the arcade has the same choices
  }
  function openMenu(a) {
    css(); closeMenu(false);
    menu = document.createElement("div"); menu.className = "sa-menu"; menu.setAttribute("role", "menu"); menu.setAttribute("aria-label", "Your account");
    ITEMS.forEach(function (item, i) {
      if (i === ITEMS.length - 1) { var sep = document.createElement("div"); sep.className = "sa-sep"; menu.appendChild(sep); }
      var b;
      if (typeof item[1] === "string") { b = document.createElement("a"); b.href = item[1]; b.addEventListener("click", function () { track("Header account menu: chosen", { item: item[0] }); }); }
      else { b = document.createElement("button"); b.type = "button"; b.addEventListener("click", function () { choose(item, a.getAttribute("href")); }); }
      b.setAttribute("role", "menuitem"); b.textContent = item[0];
      menu.appendChild(b);
    });
    document.body.appendChild(menu); menuFor = a; a.setAttribute("aria-expanded", "true");
    place(); setTimeout(place, 80); setTimeout(place, 450);   // again once a closing drawer has finished moving
    var first = menu.querySelector("[role=menuitem]"); if (first) first.focus();
    track("Header account menu: opened", { page: location.pathname });
  }
  document.addEventListener("keydown", function (e) {
    if (!menu) return;
    if (e.key === "Escape") { e.preventDefault(); closeMenu(true); return; }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Home" && e.key !== "End") return;
    var its = menu.querySelectorAll("[role=menuitem]"), at = Array.prototype.indexOf.call(its, document.activeElement);
    e.preventDefault();
    its[e.key === "Home" ? 0 : e.key === "End" ? its.length - 1 : (at + (e.key === "ArrowDown" ? 1 : its.length - 1)) % its.length].focus();
  });
  window.addEventListener("resize", place);
  window.addEventListener("scroll", place, true);

  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest(SEL) : null;
    if (menu && !a && !(e.target.closest && e.target.closest(".sa-menu"))) closeMenu(false);   // a press anywhere else closes the menu
    if (!a) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    if (session()) {                        // signed in: the account menu, not a trip to the arcade
      e.preventDefault();
      if (menu && menuFor === a) closeMenu(false); else openMenu(a);
      return;
    }
    e.preventDefault();
    var href = a.getAttribute("href");
    try { if (window.plausible) window.plausible("Header log in: opened", { props: { page: location.pathname } }); } catch (err) {}
    loadAuth().then(function (auth) { auth.open("login", { source: "header" }); })
      .catch(function () { location.href = href; });
  });

  /* ---- the launch note: thanks for the ideas, and Velvet Worlds is here ---- */
  var NOTE = { id: "launch-2026-11", until: Date.UTC(2026, 10, 26), url: "/velvet-worlds/" };
  function noteCheck() {
    var s = session();
    if (!s || !s.userId || Date.now() >= NOTE.until || !document.body) return;
    if (/^\/velvet-worlds\//.test(location.pathname)) return;                                              // already there
    if (document.querySelector(".sa-note, #aism-auth-ov, .aism-sorry, .aism-modal")) return;                // another box is up: ask again on the next page
    var key = "aism-note:" + NOTE.id + ":" + s.userId;
    try { if (localStorage.getItem(key)) return; localStorage.setItem(key, "1"); } catch (e) { return; }   // once per account on this device
    if (!document.getElementById("sa-note-css")) {
      var st = document.createElement("style"); st.id = "sa-note-css";
      st.textContent = ".sa-note{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(26,26,46,.6);font-family:'Nunito','DM Sans',system-ui,sans-serif}" +
        ".sa-note .bx{box-sizing:border-box;width:100%;max-width:440px;max-height:calc(100vh - 32px);overflow:auto;background:#fff;color:#2a2740;border:3px solid #2a2740;border-radius:20px;box-shadow:0 6px 0 #2a2740;padding:22px 22px 18px;text-align:left}" +
        ".sa-note .tg{font-size:12px;font-weight:800;letter-spacing:2px;color:#0a6b5e;margin-bottom:4px}" +
        ".sa-note h2{font-family:'Fredoka','Nunito',system-ui,sans-serif;font-size:26px;font-weight:700;line-height:1.15;margin:0 0 10px;color:#2a2740}" +
        ".sa-note p{font-size:16px;line-height:1.45;margin:0 0 8px;color:#2a2740}" +
        ".sa-note ul{margin:0 0 10px;padding:0 0 0 20px}.sa-note li{font-size:16px;line-height:1.4;margin:0 0 6px;color:#2a2740}" +
        ".sa-note .bt{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}" +
        ".sa-note a,.sa-note button{font:700 16px 'Nunito','DM Sans',system-ui,sans-serif;border:3px solid #2a2740;border-radius:14px;padding:10px 18px;cursor:pointer;text-decoration:none;box-shadow:0 4px 0 #2a2740}" +
        ".sa-note a{background:#f7c948;color:#2a2740}.sa-note button{background:#fff;color:#2a2740}" +
        ".sa-note a:focus-visible,.sa-note button:focus-visible{outline:3px solid #4a3fa0;outline-offset:2px}";
      document.head.appendChild(st);
    }
    var d = document.createElement("div"), back = document.activeElement;
    d.className = "sa-note"; d.setAttribute("role", "dialog"); d.setAttribute("aria-modal", "true"); d.setAttribute("aria-labelledby", "sa-note-h");
    d.innerHTML = '<div class="bx"><div class="tg">THANK YOU</div><h2 id="sa-note-h">You asked. We built it.</h2>' +
      "<p>Ideas you sent us:</p><ul>" +
      "<li><b>An FPS game:</b> Velvet Worlds is here. The Element Shop is now part of it.</li>" +
      "<li><b>A new look for the site:</b> done.</li>" +
      "<li><b>A racing game:</b> on its way. We hope before Christmas.</li></ul>" +
      "<p>We shape this site around your feedback, so please keep it coming.</p>" +
      '<div class="bt"><a href="' + NOTE.url + '">Try Velvet Worlds</a><button type="button">Not now</button></div></div>';
    function shut(why) { document.removeEventListener("keydown", onKey, true); d.remove(); track("Launch note: " + why, { page: location.pathname }); try { if (back && back.focus) back.focus(); } catch (e) {} }
    function onKey(e) {
      if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); shut("not now"); }
      else if (e.key === "Tab") { var f = d.querySelectorAll("a,button"), i = Array.prototype.indexOf.call(f, document.activeElement); e.preventDefault(); f[(i + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus(); }   // keep the keys inside the box
    }
    d.querySelector("button").addEventListener("click", function () { shut("not now"); });
    d.querySelector("a").addEventListener("click", function () { track("Launch note: opened", { page: location.pathname }); });
    d.addEventListener("click", function (e) { if (e.target === d) shut("not now"); });
    document.addEventListener("keydown", onKey, true);
    document.body.appendChild(d);
    try { d.querySelector("a").focus(); } catch (e) {}
    track("Launch note: shown", { page: location.pathname });
  }

  window.addEventListener("aism-auth-change", function () { if (!session()) closeMenu(false); else { setTimeout(noteCheck, 1500); setTimeout(noteCheck, 7000); } paint(); });   // after a log-in on this device (twice: the log-in box may still be closing)
  window.addEventListener("storage", function (e) { if (e.key === "aism-auth" || e.key === "aism-wallet") paint(); });
  function start() { paint(); setTimeout(paint, 0); setTimeout(paint, 400); setTimeout(noteCheck, 1200); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
