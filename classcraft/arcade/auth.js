/* Velvet Arcade — accounts front end (client + corner UI + auth modal).
   Talks to the aism-accounts Bunny Edge Script. Self-contained: injects its
   own CSS, matches the arcade's retro theme. Load AFTER wallet.js if present.

   Public API (Arcade.auth):
     isLoggedIn(), user(), userId(), token(), wallet()
     register(username,password) -> {ok, recoveryKey} | {ok:false, error}
     login(username,password)     -> {ok} | {ok:false, error}
     recover(username,key,newPw)  -> {ok, recoveryKey} | {ok:false, error}
     logout()
     award(pct), buy(series,item), pull()   (used by wallet.js; authed)
     onChange(fn) -> unsubscribe
     mountCorner(target?)          top-corner auth/balance widget
     open(mode)                    open the auth modal ('login'|'register'|'recover')

   Config: window.AISM_ACCOUNTS_URL overrides the endpoint. Emits window event
   'aism-auth-change' {loggedIn, user, wallet} on any state change. */
(function () {
  "use strict";
  if (typeof window === "undefined") return;
  var Arcade = (window.Arcade = window.Arcade || {});
  if (Arcade.auth) return;

  var API = String(window.AISM_ACCOUNTS_URL || "https://aism-accounts-7aktx.bunny.run").replace(/\/+$/, "");
  var LS = "aism-auth"; // { token, userId, username }
  // Directory of THIS file (…/classcraft/arcade/), so avatar art + the avatar
  // dataset resolve correctly whether we're on the lobby, a game page or the
  // collection page. Defensive for the no-DOM test environment.
  var AUTH_BASE = (function () {
    try {
      var s = (document.currentScript && document.currentScript.src) || "";
      if (!s && document.getElementsByTagName) {
        var ss = document.getElementsByTagName("script");
        for (var i = ss.length - 1; i >= 0; i--) { if (ss[i].src && /arcade\/auth\.js(\?|#|$)/.test(ss[i].src)) { s = ss[i].src; break; } }
      }
      return s ? s.replace(/auth\.js([?#].*)?$/, "") : "";
    } catch (e) { return ""; }
  })();

  var state = load();      // logged-in session or null
  var walletSnap = null;   // latest wallet snapshot from the server

  function load() { try { return JSON.parse(localStorage.getItem(LS) || "null"); } catch (e) { return null; } }
  function save() { try { state ? localStorage.setItem(LS, JSON.stringify(state)) : localStorage.removeItem(LS); } catch (e) {} }
  function emit() {
    try { window.dispatchEvent(new CustomEvent("aism-auth-change", { detail: { loggedIn: !!state, user: state && state.username, wallet: walletSnap } })); } catch (e) {}
  }

  /* ---------------- network ---------------- */
  async function api(path, opts) {
    opts = opts || {};
    var headers = {};
    if (opts.body) headers["content-type"] = "application/json";
    if (opts.auth && state && state.token) headers["authorization"] = "Bearer " + state.token;
    var res;
    try {
      res = await fetch(API + path, { method: opts.method || "POST", headers: headers, body: opts.body ? JSON.stringify(opts.body) : undefined });
    } catch (e) { return { ok: false, status: 0, error: "network" }; }
    var data = null; try { data = await res.json(); } catch (e) {}
    if (!res.ok) {
      // An authed call returning 401 means the token is invalid/expired -> drop it.
      if (opts.auth && res.status === 401) { state = null; walletSnap = null; save(); emit(); }
      return { ok: false, status: res.status, error: (data && data.error) || ("http-" + res.status), data: data };
    }
    return { ok: true, status: res.status, data: data || {} };
  }
  function setSession(d) { state = { token: d.token, userId: d.userId, username: d.username }; walletSnap = d.wallet || null; save(); emit(); }

  /* ---------------- client API ---------------- */
  var auth = {
    API: API,
    isLoggedIn: function () { return !!(state && state.token); },
    user: function () { return state ? state.username : null; },
    userId: function () { return state ? state.userId : null; },
    token: function () { return state ? state.token : null; },
    wallet: function () { return walletSnap; },

    register: async function (username, password) {
      var r = await api("/register", { body: { username: username, password: password } });
      if (r.ok) { setSession(r.data); return { ok: true, recoveryKey: r.data.recoveryKey, wallet: r.data.wallet }; }
      return { ok: false, error: r.error, status: r.status };
    },
    login: async function (username, password) {
      var r = await api("/login", { body: { username: username, password: password } });
      if (r.ok) { setSession(r.data); return { ok: true, wallet: r.data.wallet }; }
      return { ok: false, error: r.error, status: r.status };
    },
    recover: async function (username, recoveryKey, newPassword) {
      var r = await api("/recover", { body: { username: username, recoveryKey: recoveryKey, newPassword: newPassword } });
      if (r.ok) { setSession(r.data); return { ok: true, recoveryKey: r.data.recoveryKey }; }
      return { ok: false, error: r.error, status: r.status };
    },
    logout: function () { state = null; walletSnap = null; save(); emit(); },

    pull: async function () { var r = await api("/pull", { method: "GET", auth: true }); if (r.ok) { walletSnap = r.data.wallet; emit(); } return r; },
    award: async function (pct) { var r = await api("/award", { body: { pct: pct }, auth: true }); if (r.ok) { walletSnap = r.data.wallet; emit(); return Object.assign({ ok: true }, r.data); } return { ok: false, error: r.error, status: r.status }; },
    buy: async function (series, item) { var r = await api("/buy", { body: { series: series, item: item }, auth: true }); if (r.ok) { walletSnap = r.data.wallet; emit(); return Object.assign({ ok: true }, r.data); } return { ok: false, error: r.error, status: r.status }; },

    onChange: function (fn) { var h = function (e) { fn(e && e.detail); }; window.addEventListener("aism-auth-change", h); return function () { window.removeEventListener("aism-auth-change", h); }; },

    // exposed for the UI + tests
    _genUsername: genUsername,
    _passwordError: passwordError,
  };

  /* ---------------- helpers: username + password ---------------- */
  var ADJ = ["nova", "swift", "brave", "clever", "sunny", "lunar", "cosmic", "turbo", "mighty", "zippy", "stellar", "pixel", "neon", "vivid", "witty", "jazzy", "rapid", "bold", "keen", "snappy", "amber", "misty"];
  var ANIMALS = ["otter", "falcon", "tiger", "panda", "koala", "lynx", "heron", "bison", "gecko", "raven", "moose", "shark", "wombat", "ferret", "badger", "marten", "osprey", "narwhal", "ibex", "tapir", "quokka", "puffin"];
  function rand(n) { return Math.floor(Math.random() * n); }
  function genUsername() { return ADJ[rand(ADJ.length)] + "-" + ANIMALS[rand(ANIMALS.length)] + "-" + (1000 + rand(9000)); }
  var COMMON = ["password", "password1", "password123", "12345678", "123456789", "qwerty", "qwerty123", "111111", "abc123", "iloveyou", "letmein", "welcome", "monkey", "dragon", "football", "sunshine", "passw0rd", "trustno1", "zxcvbnm", "changeme"];
  function passwordError(p) {
    if (typeof p !== "string" || p.length < 8) return "Use at least 8 characters.";
    if (p.length > 200) return "That's too long.";
    if (COMMON.indexOf(p.toLowerCase()) > -1) return "That password is too common — pick something harder to guess.";
    return null;
  }
  // friendly text for server error codes
  function errText(code) {
    return ({
      "username-invalid": "Username needs 3–20 letters, numbers or hyphens.",
      "username-taken": "That username's taken — try another.",
      "password-too-short": "Use at least 8 characters.",
      "password-too-common": "That password is too common — pick something harder to guess.",
      "password-too-long": "That password's too long.",
      "bad-credentials": "Username or password not recognised.",
      "password-required": "Enter a password.",
      "network": "Couldn't reach the server — check your connection.",
    })[code] || ("Something went wrong (" + code + ").");
  }

  /* ---------------- UI: styles ---------------- */
  function injectCss() {
    if (document.getElementById("aism-auth-css")) return;
    var s = document.createElement("style");
    s.id = "aism-auth-css";
    s.textContent = [
      ":root{--aism-px:'Press Start 2P',monospace;--aism-vt:'VT323',monospace}",
      /* corner widget */
      "#aism-auth-corner{position:fixed;top:16px;right:16px;z-index:99998;font-family:var(--aism-px);touch-action:none}",
      "#aism-auth-corner.dragging,#aism-auth-corner.dragging *{cursor:grabbing !important}",
      ".aism-btn{cursor:pointer;border:0;border-radius:999px;font-family:var(--aism-px);font-size:10px;letter-spacing:.5px}",
      ".aism-corner-login{display:flex;align-items:center;gap:9px;background:#1b1636;border:1px solid #f5c542;color:#f5c542;padding:11px 18px;box-shadow:0 6px 20px #0009}",
      ".aism-corner-in{display:flex;align-items:center;gap:11px;background:#1b1636;border:1px solid #3a3568;border-radius:999px;padding:5px 18px 5px 5px;box-shadow:0 6px 20px #0009;cursor:pointer;transition:border-color .15s}",
      ".aism-corner-in:hover{border-color:#5ee4e0}",
      ".aism-corner-in .bal{color:#f5c542;font-size:14px}",
      /* velvet pixel coin — corner (static, gentle glint; not rotating) */
      ".aism-coin{position:relative;flex:none;display:inline-block;line-height:0}",
      ".aism-coin>svg{display:block}",
      ".aism-coin::after{content:'';position:absolute;top:-1px;right:0;width:5px;height:5px;background:radial-gradient(circle,#fff 0,#fff 30%,transparent 60%);border-radius:50%;opacity:0;animation:aism-glint 3.6s ease-in-out infinite;pointer-events:none}",
      "@keyframes aism-glint{0%,58%{opacity:0;transform:scale(.4)}68%{opacity:.95;transform:scale(1)}82%,100%{opacity:0;transform:scale(.5)}}",
      "@media (prefers-reduced-motion:reduce){.aism-coin::after{animation:none;opacity:.5}}",
      /* end-card win note — reward moment, rotating coin (distinct from the calm corner) */
      ".aism-win{display:flex;align-items:center;justify-content:center;gap:10px;margin:2px 0 14px;font-family:var(--aism-px);font-size:13px;color:#f5c542;line-height:1.4}",
      ".aism-win b{color:#fff}",
      ".aism-win-cap{font-family:var(--aism-vt);font-size:14px;color:#8f88b8}",
      ".aism-coin-win{display:inline-block;flex:none;animation:aism-spin 1.1s linear infinite}",
      "@keyframes aism-spin{from{transform:rotateY(0)}to{transform:rotateY(360deg)}}",
      /* end-card cap notice — feedback when a game earns nothing because today's cap is hit */
      ".aism-cap{display:flex;align-items:center;justify-content:center;gap:9px;margin:2px 0 14px;font-family:var(--aism-vt);font-size:17px;color:#8f88b8;line-height:1.35;text-align:left}",
      ".aism-cap b{color:#c6a8ff;font-family:var(--aism-px);font-size:11px}",
      ".aism-coin-cap{display:inline-block;flex:none;opacity:.8;animation:aism-spin 1.8s linear infinite}",
      "@media (prefers-reduced-motion:reduce){.aism-coin-win,.aism-coin-cap{animation:none}}",
      /* dropdown */
      ".aism-menu{position:absolute;background:#1b1636;border:1px solid #332a5e;border-radius:12px;padding:10px;min-width:200px;box-shadow:0 8px 28px #000a}",
      ".aism-menu .row{font-family:var(--aism-vt);font-size:18px;color:#e8e4ff;padding:6px 8px}",
      ".aism-menu .row b{color:#f5c542}",
      ".aism-menu button{width:100%;margin-top:8px}",
      /* modal */
      ".aism-ov{position:fixed;inset:0;z-index:99999;background:#0b0920cc;display:flex;align-items:center;justify-content:center;padding:18px}",
      ".aism-modal{width:100%;max-width:420px;background:#1b1636;border:2px solid #5ee4e0;border-radius:16px;box-shadow:0 0 30px -8px #5ee4e0,0 18px 50px #000b;overflow:hidden;font-family:var(--aism-vt);color:#e8e4ff}",
      ".aism-modal h2{font-family:var(--aism-px);font-size:14px;color:#f5c542;text-shadow:2px 2px 0 #6b4e00;padding:18px 18px 4px}",
      ".aism-tabs{display:flex;gap:6px;padding:8px 18px 0}",
      ".aism-tab{flex:1;background:#131028;border:1px solid #332a5e;color:#8f88b8;border-radius:8px 8px 0 0;padding:9px;font-family:var(--aism-px);font-size:8px;cursor:pointer}",
      ".aism-tab.on{color:#131028;background:#5ee4e0;border-color:#5ee4e0}",
      ".aism-body{padding:16px 18px 20px}",
      ".aism-field{margin:0 0 13px}",
      ".aism-field label{display:block;font-family:var(--aism-px);font-size:8px;color:#8f88b8;letter-spacing:.5px;margin-bottom:6px}",
      ".aism-inrow{display:flex;gap:6px}",
      ".aism-input{width:100%;background:#131028;border:1px solid #332a5e;border-radius:8px;color:#e8e4ff;font-family:var(--aism-vt);font-size:20px;padding:10px 12px}",
      ".aism-input:focus{outline:2px solid #5ee4e0;outline-offset:1px}",
      ".aism-reroll{flex:none;background:#221b44;border:1px solid #332a5e;color:#5ee4e0;border-radius:8px;padding:0 12px;font-size:16px;cursor:pointer;font-family:var(--aism-vt)}",
      ".aism-hint{font-size:15px;color:#8f88b8;margin-top:5px}",
      ".aism-err{font-size:15px;color:#ff5e6c;margin-top:6px;min-height:1px}",
      ".aism-primary{background:#f5c542;color:#131028;padding:12px;width:100%;margin-top:4px}",
      ".aism-primary[disabled]{opacity:.5;cursor:default}",
      ".aism-alt{background:none;border:0;color:#5ee4e0;font-family:var(--aism-vt);font-size:16px;cursor:pointer;margin-top:12px;text-decoration:underline}",
      ".aism-x{position:absolute;top:14px;right:16px;background:none;border:0;color:#8f88b8;font-size:22px;cursor:pointer;font-family:var(--aism-vt)}",
      /* recovery-key screen */
      ".aism-rk{background:#131028;border:1px dashed #f5c542;border-radius:10px;padding:14px;text-align:center;margin:6px 0 12px}",
      ".aism-rk .key{font-family:var(--aism-px);font-size:13px;color:#f5c542;letter-spacing:1px;word-break:break-all;line-height:1.7}",
      ".aism-rk .cpy{margin-top:10px;background:#221b44;border:1px solid #f5c542;color:#f5c542;border-radius:8px;padding:8px 12px;font-family:var(--aism-px);font-size:8px;cursor:pointer}",
      ".aism-warn{font-size:17px;color:#ffd60a;line-height:1.3;margin:2px 0 12px}",
      ".aism-check{display:flex;gap:9px;align-items:flex-start;font-size:17px;color:#cfc9ef;line-height:1.3;cursor:pointer;margin-bottom:12px}",
      ".aism-check input{margin-top:3px;width:16px;height:16px;accent-color:#f5c542;flex:none}",
      /* avatar picker */
      ".aism-modal-wide{max-width:680px}",
      ".aism-av-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(118px,1fr));gap:10px;padding:8px 18px 20px;max-height:58vh;overflow:auto}",
      ".aism-av{background:#131028;border:2px solid #332a5e;border-radius:12px;padding:8px;cursor:pointer;text-align:center;color:#e8e4ff;font-family:var(--aism-vt)}",
      ".aism-av:hover{border-color:var(--f)}",
      ".aism-av.on{border-color:var(--f);box-shadow:inset 0 0 0 2px var(--f)}",
      ".aism-av.locked{cursor:default;opacity:.7;filter:saturate(.45)}",
      ".aism-av-pic{aspect-ratio:1;border-radius:8px;overflow:hidden;background:#221b44;display:flex;align-items:center;justify-content:center;margin-bottom:6px}",
      ".aism-av-pic img{width:100%;height:100%;object-fit:cover}",
      ".aism-av-lock{font-size:26px;opacity:.6}",
      ".aism-av-name{font-family:var(--aism-px);font-size:8px;color:var(--f);line-height:1.4;min-height:22px;display:flex;align-items:center;justify-content:center}",
      ".aism-av-meta{font-size:14px;color:#8f88b8;margin-top:3px;line-height:1.2}",
      ".aism-av-unlock{color:#ffd60a}",
      /* corner avatar thumbnail — big + clear */
      ".aism-av-mini{width:42px;height:42px;border-radius:50%;overflow:hidden;flex:none;background:#221b44;border:2px solid #5ee4e0;display:inline-flex;align-items:center;justify-content:center;line-height:0}",
      ".aism-av-mini img{width:100%;height:100%;object-fit:cover}",
      ".aism-av-mini.empty{border-style:dashed;border-color:#5a5388;color:#8f88b8;font-family:var(--aism-vt);font-size:22px}",
    ].join("\n");
    document.head.appendChild(s);
  }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }

  /* ---------------- Velvet Coin (pixel-art) ----------------
   * A brand-coloured (violet + cyan V) pixel coin, drawn in the same crisp
   * blocky style as the arcade's icon sprites. Self-contained so it works on
   * every page. Callers add a class (e.g. aism-coin-win) to spin it. */
  var COIN_MAP = [
    "....EEEE....",
    "..EELMMMEE..",
    ".EDLMMMMMDE.",
    ".EDVVMMVVDE.",
    "EDMMVVVVMMDE",
    "EDMMMVVMMMDE",
    ".EDMMMMMMDE.",
    ".EDMMMMMMDE.",
    ".EDMMMMMMDE.",
    ".EDDMMMMDDE.",
    "..EEDDDDEE..",
    "....EEEE...."
  ];
  var COIN_PAL = { E: "#34176a", D: "#5a2fb8", M: "#8b5cf6", L: "#b794ff", V: "#5ee4e0" };
  function coinSvg(size, cls) {
    var n = COIN_MAP.length, rects = "";
    for (var y = 0; y < n; y++) {
      var row = COIN_MAP[y];
      for (var x = 0; x < row.length;) {
        var ch = row.charAt(x);
        if (ch === ".") { x++; continue; }
        var s = x; while (x < row.length && row.charAt(x) === ch) x++;
        rects += '<rect x="' + s + '" y="' + y + '" width="' + (x - s) + '" height="1" fill="' + COIN_PAL[ch] + '"/>';
      }
    }
    return '<svg class="' + (cls || "") + '" width="' + size + '" height="' + size + '" viewBox="0 0 ' + n + " " + n +
      '" style="shape-rendering:crispEdges;image-rendering:pixelated;vertical-align:middle" aria-hidden="true">' + rects + "</svg>";
  }
  auth._coin = coinSvg; // exposed for preview/testing

  /* ---------------- UI: corner widget ---------------- */
  auth.mountCorner = function (target) {
    injectCss();
    var host = document.getElementById("aism-auth-corner");
    if (!host) { host = el("div"); host.id = "aism-auth-corner"; (target || document.body).appendChild(host); }

    // Draggable: default top-right (CSS), but the user can drag it off any
    // button and we remember where they left it.
    (function applyPos() {
      var p = null; try { p = JSON.parse(localStorage.getItem("aism-corner-pos") || "null"); } catch (e) {}
      if (p && typeof p.left === "number" && typeof p.top === "number") {
        var l = Math.min(Math.max(4, p.left), Math.max(4, window.innerWidth - 64));
        var t = Math.min(Math.max(4, p.top), Math.max(4, window.innerHeight - 44));
        host.style.left = l + "px"; host.style.top = t + "px"; host.style.right = "auto"; host.style.bottom = "auto";
      }
    })();
    if (!host._dragInit) {
      host._dragInit = true;
      host.addEventListener("pointerdown", function (e) {
        if (e.button != null && e.button !== 0) return;
        var r = host.getBoundingClientRect(), sx = e.clientX, sy = e.clientY, ox = r.left, oy = r.top, dragging = false;
        host._dragged = false;
        var mv = function (ev) {
          var dx = ev.clientX - sx, dy = ev.clientY - sy;
          if (!dragging && Math.abs(dx) + Math.abs(dy) > 5) { dragging = true; host._dragged = true; host.classList.add("dragging"); }
          if (dragging) {
            var nl = Math.min(Math.max(4, ox + dx), window.innerWidth - host.offsetWidth - 4);
            var nt = Math.min(Math.max(4, oy + dy), window.innerHeight - host.offsetHeight - 4);
            host.style.left = nl + "px"; host.style.top = nt + "px"; host.style.right = "auto"; host.style.bottom = "auto";
            ev.preventDefault();
          }
        };
        var up = function () {
          document.removeEventListener("pointermove", mv); document.removeEventListener("pointerup", up);
          host.classList.remove("dragging");
          if (dragging) {
            var r2 = host.getBoundingClientRect();
            try { localStorage.setItem("aism-corner-pos", JSON.stringify({ left: Math.round(r2.left), top: Math.round(r2.top) })); } catch (e) {}
            setTimeout(function () { host._dragged = false; }, 60); // let the click fire, then clear
          }
        };
        document.addEventListener("pointermove", mv); document.addEventListener("pointerup", up);
      });
    }

    function paint() {
      host.innerHTML = "";
      if (auth.isLoggedIn()) {
        var bal = (walletSnap && typeof walletSnap.coins === "number") ? walletSnap.coins : 0;
        var chip = el("div", "aism-corner-in");
        var av = auth.avatar();
        var avHtml = av
          ? '<span class="aism-av-mini"><img alt="" src="' + avatarImg(av, 256) + "\" onerror=\"this.parentNode.classList.add('empty');this.parentNode.textContent='+';\"></span>"
          : '<span class="aism-av-mini empty" title="Choose an avatar">+</span>';
        chip.innerHTML = avHtml + '<span class="aism-coin" aria-hidden="true">' + coinSvg(20, "") + '</span><span class="bal">' + bal + "</span>";
        chip.setAttribute("role", "button"); chip.setAttribute("tabindex", "0");
        chip.setAttribute("aria-label", "Account: " + (auth.user() || "") + ", " + bal + " coins");
        var open = function () { if (host._dragged) return; toggleMenu(host, chip); };
        chip.addEventListener("click", open);
        chip.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
        host.appendChild(chip);
      } else {
        var b = el("button", "aism-btn aism-corner-login");
        b.innerHTML = '<span class="aism-coin" aria-hidden="true">' + coinSvg(18, "") + '</span>Log in';
        b.addEventListener("click", function () { if (host._dragged) return; auth.open("login"); });
        host.appendChild(b);
      }
    }
    function toggleMenu(host, chip) {
      var ex = host.querySelector(".aism-menu"); if (ex) { ex.remove(); return; }
      var m = el("div", "aism-menu");
      var bal = (walletSnap && typeof walletSnap.coins === "number") ? walletSnap.coins : 0;
      var owned = (walletSnap && walletSnap.owned) ? walletSnap.owned.length : 0;
      m.innerHTML = '<div class="row"><b>' + esc(auth.user() || "") + '</b></div>' +
        '<div class="row">' + bal + ' coins · ' + owned + ' collected</div>';
      var mkItem = function (label, fn, href) {
        var b = href ? el("a", "aism-btn aism-corner-login") : el("button", "aism-btn aism-corner-login");
        b.style.cssText = "width:100%;margin-top:8px;justify-content:center;text-decoration:none;box-sizing:border-box";
        b.textContent = label;
        if (href) b.href = href; else b.addEventListener("click", fn);
        return b;
      };
      m.appendChild(mkItem("Choose avatar", function () { m.remove(); auth.openAvatars(); }));
      m.appendChild(mkItem("Element shop", null, AUTH_BASE + "elements.html"));
      m.appendChild(mkItem("Log out", function () { auth.logout(); m.remove(); }));
      host.appendChild(m);
      // Place the menu on whichever side keeps it on screen (the chip may have been dragged anywhere).
      var r = host.getBoundingClientRect();
      var below = r.top < window.innerHeight * 0.5;
      var rightSide = (r.left + r.width / 2) > window.innerWidth * 0.5;
      m.style.top = below ? (host.offsetHeight + 8) + "px" : "auto";
      m.style.bottom = below ? "auto" : (host.offsetHeight + 8) + "px";
      m.style.left = rightSide ? "auto" : "0";
      m.style.right = rightSide ? "0" : "auto";
      setTimeout(function () {
        var off = function (e) { if (!host.contains(e.target)) { m.remove(); document.removeEventListener("click", off); } };
        document.addEventListener("click", off);
      }, 0);
    }
    paint();
    auth.onChange(paint);
    if (Arcade.wallet && Arcade.wallet.onChange) Arcade.wallet.onChange(paint);
    return host;
  };

  /* ---------------- UI: modal ---------------- */
  auth.open = function (mode) {
    injectCss();
    close();
    var ov = el("div", "aism-ov"); ov.id = "aism-auth-ov";
    var modal = el("div", "aism-modal");
    ov.appendChild(modal);
    ov.addEventListener("mousedown", function (e) { if (e.target === ov) close(); });
    document.addEventListener("keydown", escClose);
    document.body.appendChild(ov);
    render(mode || "login");

    function escClose(e) { if (e.key === "Escape") close(); }
    function close2() { document.removeEventListener("keydown", escClose); ov.remove(); }
    auth._closeModal = close2;

    function render(m) {
      modal.innerHTML = "";
      var x = el("button", "aism-x", "✕"); x.setAttribute("aria-label", "Close"); x.addEventListener("click", close); modal.appendChild(x);
      modal.appendChild(el("h2", null, m === "recover" ? "Recover account" : "Velvet Arcade"));
      if (m !== "recover") {
        var tabs = el("div", "aism-tabs");
        [["login", "LOG IN"], ["register", "REGISTER"]].forEach(function (t) {
          var b = el("button", "aism-tab" + (m === t[0] ? " on" : ""), t[1]);
          b.addEventListener("click", function () { render(t[0]); });
          tabs.appendChild(b);
        });
        modal.appendChild(tabs);
      }
      modal.appendChild(m === "login" ? loginForm() : m === "register" ? registerForm() : recoverForm());
    }

    function field(labelText, inputEl, hint) {
      var f = el("div", "aism-field");
      var l = el("label", null, esc(labelText)); f.appendChild(l);
      f.appendChild(inputEl);
      if (hint) f.appendChild(el("div", "aism-hint", esc(hint)));
      return f;
    }
    function input(type, ph) { var i = el("input", "aism-input"); i.type = type; i.placeholder = ph || ""; i.autocomplete = "off"; i.autocapitalize = "off"; i.spellcheck = false; return i; }
    function errBox() { return el("div", "aism-err", ""); }
    function busy(btn, on, label) { btn.disabled = on; btn.textContent = on ? "…" : label; }

    function loginForm() {
      var body = el("div", "aism-body");
      var u = input("text", "your username"); var p = input("password", "your password");
      var err = errBox();
      var btn = el("button", "aism-btn aism-primary", "Log in");
      body.appendChild(field("Username", u));
      body.appendChild(field("Password", p));
      body.appendChild(err);
      body.appendChild(btn);
      var rec = el("button", "aism-alt", "Lost your password? Use your recovery key");
      rec.addEventListener("click", function () { render("recover"); });
      body.appendChild(rec);
      var go = async function () {
        err.textContent = ""; busy(btn, true, "Log in");
        var r = await auth.login(u.value.trim(), p.value);
        busy(btn, false, "Log in");
        if (r.ok) close(); else err.textContent = errText(r.error);
      };
      btn.addEventListener("click", go);
      p.addEventListener("keydown", function (e) { if (e.key === "Enter") go(); });
      return body;
    }

    function registerForm() {
      var body = el("div", "aism-body");
      var uWrap = el("div", "aism-inrow");
      var u = input("text", "username"); u.value = genUsername();
      var reroll = el("button", "aism-reroll", "↻"); reroll.title = "Give me another"; reroll.type = "button";
      reroll.addEventListener("click", function () { u.value = genUsername(); uErr.textContent = ""; });
      uWrap.appendChild(u); uWrap.appendChild(reroll);
      var uErr = el("div", "aism-err", "");
      var uf = field("Choose a username", uWrap, "We've suggested one — tap ↻ for another, or type your own. Not your real name.");
      uf.appendChild(uErr);

      var p = input("password", "at least 8 characters");
      var pf = field("Choose a password", p);
      var pErr = el("div", "aism-err", ""); pf.appendChild(pErr);

      var btn = el("button", "aism-btn aism-primary", "Create account");
      body.appendChild(uf); body.appendChild(pf); body.appendChild(btn);

      var go = async function () {
        uErr.textContent = ""; pErr.textContent = "";
        var pe = passwordError(p.value); if (pe) { pErr.textContent = pe; return; }
        busy(btn, true, "Create account");
        var r = await auth.register(u.value.trim(), p.value);
        busy(btn, false, "Create account");
        if (r.ok) { recoveryScreen(r.recoveryKey); }
        else if (r.error === "username-taken" || r.error === "username-invalid") uErr.textContent = errText(r.error);
        else pErr.textContent = errText(r.error);
      };
      btn.addEventListener("click", go);
      p.addEventListener("keydown", function (e) { if (e.key === "Enter") go(); });
      return body;
    }

    function recoverForm() {
      var body = el("div", "aism-body");
      var u = input("text", "your username");
      var k = input("text", "VLVT-XXXX-XXXX-…");
      var p = input("password", "new password (8+ chars)");
      var err = errBox();
      var btn = el("button", "aism-btn aism-primary", "Reset password");
      body.appendChild(field("Username", u));
      body.appendChild(field("Recovery key", k, "The VLVT- key you saved when you signed up."));
      body.appendChild(field("New password", p));
      body.appendChild(err);
      body.appendChild(btn);
      var back = el("button", "aism-alt", "← Back to log in"); back.addEventListener("click", function () { render("login"); });
      body.appendChild(back);
      var go = async function () {
        err.textContent = "";
        var pe = passwordError(p.value); if (pe) { err.textContent = pe; return; }
        busy(btn, true, "Reset password");
        var r = await auth.recover(u.value.trim(), k.value.trim(), p.value);
        busy(btn, false, "Reset password");
        if (r.ok) recoveryScreen(r.recoveryKey, true); else err.textContent = errText(r.error);
      };
      btn.addEventListener("click", go);
      return body;
    }

    function recoveryScreen(key, rotated) {
      modal.innerHTML = "";
      modal.appendChild(el("h2", null, rotated ? "New recovery key" : "Save your recovery key"));
      var body = el("div", "aism-body");
      body.appendChild(el("div", "aism-warn", rotated
        ? "Your password's reset and you're logged in. Your old key is now used up — here's a fresh one:"
        : "You're in! This key is the ONLY way back if you forget your password. There's no email reset. Save it somewhere safe now."));
      var rk = el("div", "aism-rk");
      rk.appendChild(el("div", "key", esc(key)));
      var cpy = el("button", "cpy", "Copy key");
      cpy.addEventListener("click", function () { try { navigator.clipboard.writeText(key); cpy.textContent = "Copied ✓"; } catch (e) { cpy.textContent = "Select & copy it"; } });
      rk.appendChild(cpy);
      body.appendChild(rk);
      var lab = el("label", "aism-check");
      var cb = el("input"); cb.type = "checkbox";
      lab.appendChild(cb); lab.appendChild(document.createTextNode(" I've saved my recovery key somewhere safe."));
      body.appendChild(lab);
      var done = el("button", "aism-btn aism-primary", "Start playing"); done.disabled = true;
      cb.addEventListener("change", function () { done.disabled = !cb.checked; });
      done.addEventListener("click", close);
      body.appendChild(done);
      modal.appendChild(body);
    }
  };

  function close() { if (auth._closeModal) { auth._closeModal(); auth._closeModal = null; } else { var o = document.getElementById("aism-auth-ov"); if (o) o.remove(); } }
  auth.close = close;

  /* ---------------- avatars ---------------- */
  function loadAvatars(cb) {
    if (window.VELVET_AVATARS) return cb();
    var s = document.createElement("script");
    s.src = AUTH_BASE + "avatars-data.js"; s.async = false;
    s.onload = function () { cb(); }; s.onerror = function () { cb(); };
    (document.head || document.documentElement).appendChild(s);
  }
  function avatarRec(id) { var arr = window.VELVET_AVATARS || []; for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i]; return null; }
  function avatarImg(id, size) { var a = avatarRec(id); return a ? AUTH_BASE + "assets/avatars/" + (size || 256) + "/" + String(a.id).padStart(2, "0") + "-" + a.slug + ".webp" : ""; }

  auth.avatar = function () { return walletSnap && walletSnap.avatar ? parseInt(walletSnap.avatar, 10) : null; };
  auth.avatarImg = avatarImg;
  auth.setAvatar = async function (id) {
    var r = await api("/avatar", { body: { avatar: id }, auth: true });
    if (r.ok) { walletSnap = r.data.wallet; emit(); return { ok: true }; }
    return { ok: false, error: r.error };
  };

  // tiny select sound (honours the arcade mute flag)
  var _ac2;
  function actx2() { try { if (!_ac2) _ac2 = new (window.AudioContext || window.webkitAudioContext)(); if (_ac2.state === "suspended") _ac2.resume(); return _ac2; } catch (e) { return null; } }
  function amuted() { try { return localStorage.getItem("aism-arcade-muted") === "1"; } catch (e) { return false; } }
  function atone(f, d, ty, w, v) { var ac = actx2(); if (!ac || amuted()) return; var t = ac.currentTime + (w || 0), o = ac.createOscillator(), g = ac.createGain(); o.type = ty || "square"; o.frequency.value = f; o.connect(g); g.connect(ac.destination); g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(v || .14, t + .008); g.gain.exponentialRampToValueAtTime(.0001, t + d); o.start(t); o.stop(t + d + .03); }
  function sfxSelect() { atone(880, .06, "square", 0, .12); atone(1245, .1, "triangle", .045, .12); }

  auth.openAvatars = function () { injectCss(); loadAvatars(renderAvatarPicker); };
  function renderAvatarPicker() {
    close();
    var ov = el("div", "aism-ov"); ov.id = "aism-auth-ov";
    var modal = el("div", "aism-modal aism-modal-wide");
    ov.appendChild(modal);
    ov.addEventListener("mousedown", function (e) { if (e.target === ov) close(); });
    document.addEventListener("keydown", escC);
    document.body.appendChild(ov);
    auth._closeModal = function () { document.removeEventListener("keydown", escC); ov.remove(); };
    function escC(e) { if (e.key === "Escape") close(); }

    var view = "all", fields = window.VELVET_AVATAR_FIELDS || {};
    render();
    function render() {
      modal.innerHTML = "";
      var x = el("button", "aism-x", "✕"); x.setAttribute("aria-label", "Close"); x.addEventListener("click", close); modal.appendChild(x);
      modal.appendChild(el("h2", null, "Choose your avatar"));
      var owned = (walletSnap && walletSnap.owned) ? walletSnap.owned.length : 0;
      var unlockedN = (window.VELVET_AVATARS || []).filter(function (a) { return window.velvetAvatarUnlocked ? velvetAvatarUnlocked(a, walletSnap) : true; }).length;
      var sub = el("div"); sub.style.cssText = "font-family:var(--aism-vt);font-size:16px;color:#8f88b8;padding:0 18px 4px";
      sub.innerHTML = "<b style='color:#5ee4e0'>" + unlockedN + "</b> of " + (window.VELVET_AVATARS || []).length + " unlocked — collect elements to unlock more.";
      modal.appendChild(sub);
      var chips = el("div", "aism-tabs"); chips.style.flexWrap = "wrap";
      [["all", "ALL"]].concat(Object.keys(fields).map(function (k) { return [k, fields[k].label.toUpperCase()]; })).forEach(function (t) {
        var b = el("button", "aism-tab" + (view === t[0] ? " on" : ""), t[1]);
        b.style.cssText = "flex:0 0 auto;border-radius:8px";
        b.addEventListener("click", function () { view = t[0]; render(); });
        chips.appendChild(b);
      });
      modal.appendChild(chips);
      var grid = el("div", "aism-av-grid"), cur = auth.avatar();
      (window.VELVET_AVATARS || []).filter(function (a) { return view === "all" || a.field === view; }).forEach(function (a) {
        var unlocked = window.velvetAvatarUnlocked ? velvetAvatarUnlocked(a, walletSnap) : true;
        var card = el("button", "aism-av" + (unlocked ? "" : " locked") + (cur === a.id ? " on" : ""));
        var f = fields[a.field] || {};
        card.style.setProperty("--f", f.color || "#8f88b8");
        card.innerHTML =
          '<div class="aism-av-pic">' + (unlocked
            ? '<img loading="lazy" alt="" src="' + avatarImg(a.id, 256) + "\" onerror=\"this.style.display='none'\">"
            : '<span class="aism-av-lock">🔒</span>') + "</div>" +
          '<div class="aism-av-name">' + esc(a.name) + "</div>" +
          '<div class="aism-av-meta">' + (unlocked ? esc((f.label || "") + " · " + a.dates)
            : '<span class="aism-av-unlock">' + esc(window.velvetAvatarUnlockLabel ? velvetAvatarUnlockLabel(a) : "Locked") + "</span>") + "</div>";
        if (unlocked) card.addEventListener("click", function () {
          if (card.classList.contains("on")) return;
          var on = card.parentNode ? card.parentNode.querySelectorAll(".aism-av.on") : [];
          for (var k = 0; k < on.length; k++) on[k].classList.remove("on");
          card.classList.add("on");            // instant highlight
          sfxSelect();
          auth.setAvatar(a.id).then(function (r) { if (!r.ok) render(); }); // background; revert on failure
        });
        grid.appendChild(card);
      });
      modal.appendChild(grid);
    }
  }

  /* ---------------- end-of-game award hook ----------------
   * Wraps Arcade.renderEndCard (the one shared end card across all cabinets).
   * Logged in  -> bank coins on the server, show "+N coins".
   * Logged out -> show "Rank X — worth N coins. Register to bank them" (the
   *   rate, not a claim; no anonymous banking). Double-award guarded by opts. */
  var GRADE_COINS = { S: 12, A: 9, B: 6, C: 3, D: 1 };
  function gradeLetter(pct) { pct = Number(pct); return pct >= 95 ? "S" : pct >= 80 ? "A" : pct >= 60 ? "B" : pct >= 40 ? "C" : "D"; }
  function coinDot() { return coinSvg(15, ""); }
  function insertLine(mount, node) { var w = mount.querySelector(".ar-watermark"); if (w && w.parentNode === mount) mount.insertBefore(node, w); else mount.appendChild(node); }
  // Win note sits near the TOP of the card (right after the grade) — "alongside
  // the grade", the reward beat. Rotating coin is deliberate here.
  function insertTop(mount, node) { mount.insertBefore(node, (mount.children && mount.children[1]) || null); }
  function winNote(mount, credited, capRemaining) {
    injectCss();
    var d = el("div", "aism-win");
    d.innerHTML = coinSvg(28, "aism-coin-win")
      + "<span>You won <b>" + credited + "</b> coin" + (credited === 1 ? "" : "s") + "!</span>"
      + (capRemaining != null && capRemaining <= 12 ? '<span class="aism-win-cap">' + capRemaining + " left today</span>" : "");
    insertTop(mount, d);
  }
  // Shown when a game earns 0 coins because today's 45-coin cap is already hit.
  // The point of the cap is to bound coins, never the play — so the copy says so.
  function capNote(mount) {
    injectCss();
    var d = el("div", "aism-cap");
    d.innerHTML = coinSvg(22, "aism-coin-cap")
      + "<span>Daily coin limit reached — <b>45/45</b> today. Keep playing; your coins reset tomorrow.</span>";
    insertTop(mount, d);
  }
  function registerCta(mount, letter, worth) {
    injectCss();
    var d = el("div"); d.style.cssText = "text-align:center;margin:4px 0 12px";
    d.innerHTML = '<div style="font-family:var(--aism-px);font-size:10px;color:#f5c542;margin-bottom:8px">' + coinDot() + " Rank " + letter + " — worth " + worth + " coins</div>";
    var b = el("button", "aism-btn", "▸ Register to bank them");
    b.style.cssText = "cursor:pointer;border:1px solid #5ee4e0;background:#221b44;color:#5ee4e0;border-radius:8px;padding:9px 14px;font-family:var(--aism-px);font-size:9px";
    b.addEventListener("click", function () { auth.open("register"); });
    d.appendChild(b);
    insertLine(mount, d);
  }
  var _lastCardOpts = null;
  function installEndCardHook() {
    if (!Arcade.renderEndCard || Arcade.renderEndCard.__authWrapped) return !!(Arcade.renderEndCard && Arcade.renderEndCard.__authWrapped);
    var inner = Arcade.renderEndCard;
    var wrapped = function (container, opts) {
      var out = inner.call(this, container, opts);
      try {
        if (opts && opts !== _lastCardOpts && typeof opts.pct === "number" && isFinite(opts.pct)) {
          _lastCardOpts = opts;
          var letter = (Arcade.grade ? Arcade.grade(opts.pct).letter : gradeLetter(opts.pct));
          var worth = GRADE_COINS[letter] || 0;
          var mount = container && container.querySelector ? container.querySelector(".ar-end-inner") : null;
          if (auth.isLoggedIn()) {
            auth.award(opts.pct).then(function (res) {
              if (!mount || !res || !res.ok) return;
              if (res.credited > 0) winNote(mount, res.credited, res.wallet && res.wallet.capRemaining);
              else capNote(mount); // grade was worth coins but the daily cap blocked them
            });
          } else if (mount && worth > 0) {
            registerCta(mount, letter, worth);
          }
        }
      } catch (e) { /* the end card must never break */ }
      return out;
    };
    wrapped.__authWrapped = true;
    Arcade.renderEndCard = wrapped;
    return true;
  }

  /* ---------------- boot ---------------- */
  function boot() {
    if (!installEndCardHook()) { var n = 0, t = function () { if (installEndCardHook() || ++n > 40) return; setTimeout(t, 50); }; setTimeout(t, 50); }
    if (!window.AISM_NO_CORNER) { try { auth.mountCorner(); } catch (e) {} }
    if (auth.isLoggedIn()) { auth.pull(); loadAvatars(function () { emit(); }); } // refresh from server + load avatar art
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();

  Arcade.auth = auth;
})();
