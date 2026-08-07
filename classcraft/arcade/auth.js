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
      "#aism-auth-corner{position:fixed;top:12px;right:12px;z-index:99998;font-family:var(--aism-px)}",
      ".aism-btn{cursor:pointer;border:0;border-radius:999px;font-family:var(--aism-px);font-size:10px;letter-spacing:.5px}",
      ".aism-corner-login{display:flex;align-items:center;gap:8px;background:#131028;border:1px solid #f5c542;color:#f5c542;padding:8px 14px;box-shadow:0 2px 10px #0007}",
      ".aism-corner-in{display:flex;align-items:center;gap:9px;background:#131028;border:1px solid #332a5e;border-radius:999px;padding:6px 12px 6px 8px;box-shadow:0 2px 10px #0007;cursor:pointer}",
      ".aism-corner-in .bal{color:#f5c542;font-size:11px}",
      ".aism-corner-in .who{color:#8f88b8;font-size:8px;max-width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
      /* glitter coin */
      ".aism-coin{width:18px;height:18px;border-radius:50%;position:relative;flex:none;background:radial-gradient(circle at 35% 30%,#ffe479,#f5c542 55%,#b8860b);box-shadow:inset -2px -2px 0 #b8860b,0 0 6px #f5c54277}",
      ".aism-coin::after{content:'';position:absolute;top:1px;left:3px;width:6px;height:6px;background:radial-gradient(circle,#fff 0,#fff 30%,transparent 60%);border-radius:50%;opacity:0;animation:aism-glint 3.6s ease-in-out infinite}",
      "@keyframes aism-glint{0%,58%{opacity:0;transform:scale(.4)}68%{opacity:.95;transform:scale(1)}82%,100%{opacity:0;transform:scale(.5)}}",
      "@media (prefers-reduced-motion:reduce){.aism-coin::after{animation:none;opacity:.5}}",
      /* end-card win note — reward moment, rotating coin (distinct from the calm corner) */
      ".aism-win{display:flex;align-items:center;justify-content:center;gap:10px;margin:2px 0 14px;font-family:var(--aism-px);font-size:13px;color:#f5c542;line-height:1.4}",
      ".aism-win b{color:#fff}",
      ".aism-win-cap{font-family:var(--aism-vt);font-size:14px;color:#8f88b8}",
      ".aism-coin-win{width:26px;height:26px;border-radius:50%;flex:none;background:radial-gradient(circle at 35% 30%,#ffe479,#f5c542 58%,#b8860b);box-shadow:inset -3px -3px 0 #b8860b,0 0 10px #f5c54288;animation:aism-spin 1.1s linear infinite}",
      "@keyframes aism-spin{from{transform:rotateY(0)}to{transform:rotateY(360deg)}}",
      "@media (prefers-reduced-motion:reduce){.aism-coin-win{animation:none}}",
      /* end-card cap notice — feedback when a game earns nothing because today's cap is hit */
      ".aism-cap{display:flex;align-items:center;justify-content:center;gap:9px;margin:2px 0 14px;font-family:var(--aism-vt);font-size:17px;color:#8f88b8;line-height:1.35;text-align:left}",
      ".aism-cap b{color:#f5c542;font-family:var(--aism-px);font-size:11px}",
      ".aism-coin-cap{width:20px;height:20px;border-radius:50%;flex:none;background:radial-gradient(circle at 35% 30%,#d9c98f,#b8a24a 60%,#7a6a2a);box-shadow:inset -2px -2px 0 #7a6a2a;opacity:.85}",
      /* dropdown */
      ".aism-menu{position:absolute;top:46px;right:0;background:#1b1636;border:1px solid #332a5e;border-radius:12px;padding:10px;min-width:180px;box-shadow:0 8px 28px #000a}",
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
    ].join("\n");
    document.head.appendChild(s);
  }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }

  /* ---------------- UI: corner widget ---------------- */
  auth.mountCorner = function (target) {
    injectCss();
    var host = document.getElementById("aism-auth-corner");
    if (!host) { host = el("div"); host.id = "aism-auth-corner"; (target || document.body).appendChild(host); }
    function paint() {
      host.innerHTML = "";
      if (auth.isLoggedIn()) {
        var bal = (walletSnap && typeof walletSnap.coins === "number") ? walletSnap.coins : 0;
        var chip = el("div", "aism-corner-in");
        chip.innerHTML = '<span class="aism-coin" aria-hidden="true"></span><span class="bal">' + bal + '</span><span class="who">' + esc(auth.user() || "") + "</span>";
        chip.setAttribute("role", "button"); chip.setAttribute("tabindex", "0");
        chip.setAttribute("aria-label", "Account: " + (auth.user() || "") + ", " + bal + " coins");
        var open = function () { toggleMenu(host, chip); };
        chip.addEventListener("click", open);
        chip.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
        host.appendChild(chip);
      } else {
        var b = el("button", "aism-btn aism-corner-login");
        b.innerHTML = '<span class="aism-coin" aria-hidden="true"></span>Log in';
        b.addEventListener("click", function () { auth.open("login"); });
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
      var out = el("button", "aism-btn aism-corner-login"); out.style.justifyContent = "center"; out.textContent = "Log out";
      out.addEventListener("click", function () { auth.logout(); m.remove(); });
      m.appendChild(out);
      host.appendChild(m);
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

  /* ---------------- end-of-game award hook ----------------
   * Wraps Arcade.renderEndCard (the one shared end card across all cabinets).
   * Logged in  -> bank coins on the server, show "+N coins".
   * Logged out -> show "Rank X — worth N coins. Register to bank them" (the
   *   rate, not a claim; no anonymous banking). Double-award guarded by opts. */
  var GRADE_COINS = { S: 12, A: 9, B: 6, C: 3, D: 1 };
  function gradeLetter(pct) { pct = Number(pct); return pct >= 95 ? "S" : pct >= 80 ? "A" : pct >= 60 ? "B" : pct >= 40 ? "C" : "D"; }
  function coinDot() { return '<span style="display:inline-block;width:13px;height:13px;border-radius:50%;vertical-align:-2px;background:radial-gradient(circle at 35% 30%,#ffe479,#f5c542 60%,#b8860b);box-shadow:inset -1px -1px 0 #b8860b"></span>'; }
  function insertLine(mount, node) { var w = mount.querySelector(".ar-watermark"); if (w && w.parentNode === mount) mount.insertBefore(node, w); else mount.appendChild(node); }
  // Win note sits near the TOP of the card (right after the grade) — "alongside
  // the grade", the reward beat. Rotating coin is deliberate here.
  function insertTop(mount, node) { mount.insertBefore(node, (mount.children && mount.children[1]) || null); }
  function winNote(mount, credited, capRemaining) {
    injectCss();
    var d = el("div", "aism-win");
    d.innerHTML = '<span class="aism-coin-win" aria-hidden="true"></span>'
      + "<span>You won <b>" + credited + "</b> coin" + (credited === 1 ? "" : "s") + "!</span>"
      + (capRemaining != null && capRemaining <= 12 ? '<span class="aism-win-cap">' + capRemaining + " left today</span>" : "");
    insertTop(mount, d);
  }
  // Shown when a game earns 0 coins because today's 45-coin cap is already hit.
  // The point of the cap is to bound coins, never the play — so the copy says so.
  function capNote(mount) {
    injectCss();
    var d = el("div", "aism-cap");
    d.innerHTML = '<span class="aism-coin-cap" aria-hidden="true"></span>'
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
    if (auth.isLoggedIn()) { auth.pull(); } // refresh balance/collection from the server
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();

  Arcade.auth = auth;
})();
