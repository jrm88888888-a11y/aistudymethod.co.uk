/* seasonal.js — a time-limited plug for a seasonal mini-lesson, and its coin treat.
   Loaded by lesson-nav.js on every mini-lesson, so no per-lesson edits.
   Current campaign: Halloween Science, "The Glow Stick Mystery", with a one-off
   100-coin treat for finishing it.

   On the featured lesson itself:
     - when the completion screen opens (the lesson only moves on once each
       mission check is answered, so this means all 3 missions are done), a
       treat card: signed in -> the server adds the treat (once per account);
       signed out -> "Collect my treat" opens the arcade sign-up / log-in, and
       the treat (plus the lesson's unsaved coins) is collected on sign-in.
     - "finished it" is remembered on this device (aism-treat:<id>) until the
       treat is collected, so it is still collected if the student signs in
       later on another lesson page.
   On every other mini-lesson (until END, local time):
     - a card on the completion screen: finish the featured lesson for the treat;
     - on science lessons only (MATCH), a slim dismissible bar under the top bar;
     - neither is shown once the featured lesson is finished on this device.
   The server (aism-accounts /treat) decides whether the treat is still open
   (until TREAT_UNTIL) and pays it at most once per account.
   To remove for good: delete the loader lines in lesson-nav.js and this file.
   Plausible: "Seasonal plug: shown" (bar), "Seasonal plug: click" {where = bar | final},
   "Seasonal treat: earned" {signedIn}, "Seasonal treat: collect pressed",
   "Seasonal treat: collected" {where = lesson | later}. */
(function () {
  "use strict";
  var C = {
    id: "halloween-2026",
    end: new Date(2026, 10, 8),               // plug off: 8 Nov 2026, 00:00 local
    treatUntil: Date.UTC(2026, 10, 9),        // server stops paying: 9 Nov 2026, 00:00 UTC
    coins: 100,
    stem: "halloween-science-glow-sticks",
    page: "halloween-science-glow-sticks-mini-lesson.html",
    tag: "🎃 Halloween treat",
    q: "Finish The Glow Stick Mystery and win 100 bonus coins",
    sub: "How can a glow stick glow without getting hot? Three missions, a freezer experiment to try at home, and fireflies.",
    bar: "The Glow Stick Mystery: win 100 bonus coins",
    poster: "halloween-hooks/posters/halloween-glow-sticks-m1_16x9.jpg",
    match: /^(science-ks3-|chemistry-gcse-|physics-gcse-|biology-gcse-)/
  };
  var file = "";
  try { file = decodeURIComponent(location.pathname.split("/").pop() || ""); } catch (e) { return; }
  if (!/-mini-lesson\.html$/.test(file)) return;
  var onPage = file === C.page;
  var now = Date.now();
  if (now >= C.treatUntil && !onPage) return;

  var TK = "aism-treat:" + C.id;                // {e: day finished, d: 1 once collected}
  function rd(k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } }
  function wr(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function track(name, props) { try { if (window.plausible) window.plausible(name, { props: props || {} }); } catch (e) {} }
  function signedIn() { var a = rd("aism-auth"); return !!(a && a.token); }
  function treatState() { return rd(TK) || {}; }
  function finishedHere() {
    var t = treatState(); if (t.e || t.d) return true;
    var p = rd("aism-lp"); return !!(p && p.l && p.l[C.stem]);
  }
  function el(cls, html) { var d = document.createElement("div"); d.className = cls; d.innerHTML = html; return d; }

  var css = document.createElement("style");
  css.textContent =
    ".sz-bar{display:flex;align-items:center;gap:10px;background:#2B2A55;color:#fff;border:3px solid var(--ink,#2c2840);border-radius:16px;padding:8px 10px 8px 14px;margin:-4px 0 14px;font-family:'Fredoka',sans-serif;font-weight:500;font-size:.98rem;line-height:1.3}" +
    ".sz-bar a,.sz-bar span.t{color:#fff;text-decoration:none;flex:1}.sz-bar b{color:#FFC83D;font-weight:600}" +
    ".sz-bar button{all:unset;cursor:pointer;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.1rem;color:#fff;opacity:.75}" +
    ".sz-bar button:hover,.sz-bar button:focus-visible{opacity:1;background:rgba(255,255,255,.15)}" +
    ".sz-card{display:flex;gap:14px;align-items:center;text-align:left;text-decoration:none;color:var(--ink,#2c2840);background:#fff;border:3px solid var(--ink,#2c2840);border-radius:20px;padding:12px;margin:18px 0 4px;box-shadow:0 6px 0 rgba(44,40,64,.10)}" +
    ".sz-card img{width:132px;height:auto;border-radius:12px;border:2px solid var(--ink,#2c2840);flex-shrink:0}" +
    ".sz-card .t{display:block;font-family:'Fredoka',sans-serif;font-size:.8rem;font-weight:600;color:#6A30B8}" +
    ".sz-card .q{display:block;font-family:'Fredoka',sans-serif;font-weight:600;font-size:1.08rem;line-height:1.25;margin:2px 0 4px}" +
    ".sz-card .s{display:block;font-size:.92rem;color:var(--soft,#6b6580);line-height:1.35}" +
    ".sz-treat{margin:16px auto 6px;max-width:560px;padding:16px 16px 14px;border:3px solid var(--ink,#2c2840);border-radius:20px;background:#2B2A55;color:#fff;text-align:center;box-shadow:0 6px 0 rgba(44,40,64,.12)}" +
    ".sz-treat .tb{display:block;font-family:'Fredoka',sans-serif;font-weight:600;font-size:1.25rem;line-height:1.3}" +
    ".sz-treat .tb b{color:#FFC83D}" +
    ".sz-treat .ts{display:block;margin-top:6px;font-size:.95rem;line-height:1.4;color:#e4e0f5}" +
    ".sz-treat .tbtns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px}" +
    ".sz-treat button{font-family:'Fredoka',sans-serif;font-weight:600;font-size:1rem;border:3px solid #fff;border-radius:14px;padding:9px 14px;background:#FFC83D;color:#2c2840;cursor:pointer}" +
    ".sz-treat button.ghost{background:transparent;color:#fff}" +
    ".sz-treat button[disabled]{opacity:.6;cursor:default}" +
    ".sz-has-treat .lp-note .lp-btns{display:none}" +     /* one sign-up offer on the screen: the treat's (it saves lesson coins too) */
    "@media(max-width:480px){.sz-card img{width:96px}}";
  document.head.appendChild(css);

  /* ---------- the account script, loaded the same way progress.js loads it ---------- */
  var authP = null;
  function getAuth() {
    if (window.Arcade && window.Arcade.auth) return Promise.resolve(window.Arcade.auth);
    if (window.AismProgress && window.AismProgress.loadAuth) return window.AismProgress.loadAuth();
    if (authP) return authP;
    if (window.AISM_NO_CORNER === undefined) window.AISM_NO_CORNER = true;
    if (window.AISM_NO_SIGNUP_PROMPT === undefined) window.AISM_NO_SIGNUP_PROMPT = true;
    var me = document.querySelector('script[src*="quizzes/seasonal.js"]');
    var base = me && me.src ? me.src.replace(/quizzes\/seasonal\.js.*$/, "") : "../";
    authP = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = base + "arcade/auth.js?v=20261030a";
      s.onload = function () { (window.Arcade && window.Arcade.auth) ? resolve(window.Arcade.auth) : reject(new Error("no auth")); };
      s.onerror = function () { authP = null; reject(new Error("auth load failed")); };
      document.head.appendChild(s);
    });
    return authP;
  }

  /* Ask the server for the treat. Resolves to "paid" | "had" | "closed" | "out" | "error". */
  var claimP = null;
  function claim() {
    if (claimP) return claimP;
    claimP = getAuth().then(function (auth) {
      if (!auth.isLoggedIn()) return "out";
      var call = auth.treat ? auth.treat(C.id) : fetch(auth.API + "/treat", {     // an older cached auth.js without treat()
        method: "POST", headers: { "content-type": "application/json", authorization: "Bearer " + auth.token() },
        body: JSON.stringify({ campaign: C.id })
      }).then(function (r) { return r.json().then(function (d) { return r.ok ? Object.assign({ ok: true }, d) : { ok: false, status: r.status, error: d && d.error }; }); })
        .then(function (res) { if (res.ok && auth.pull) auth.pull(); return res; });
      return call.then(function (res) {
        if (res && res.ok) { wr(TK, { e: treatState().e || 1, d: 1 }); return res.paid ? "paid" : "had"; }
        if (res && (res.status === 410 || res.status === 400)) { wr(TK, { e: treatState().e || 1, d: 1 }); return "closed"; }
        if (res && res.status === 401) return "out";
        return "error";
      });
    }).catch(function () { return "error"; }).then(function (r) { claimP = null; return r; });
    return claimP;
  }

  /* ---------- featured lesson: the treat card ---------- */
  function treatCard(fin) {
    var t = treatState();
    if (!t.e) { t.e = Math.floor(Date.now() / 86400000); wr(TK, t); }
    if (Date.now() >= C.treatUntil) return;
    var card = el("sz-treat", "");
    var anchor = fin.querySelector(".nextpick") || fin.querySelector(".sharebox");
    if (anchor) fin.insertBefore(card, anchor); else fin.appendChild(card);
    function say(big, small, btns) {
      card.innerHTML = '<span class="tb">' + big + "</span>" + (small ? '<span class="ts">' + small + "</span>" : "") + (btns || "");
    }
    function result(r, where) {
      if (r === "paid") { say("🎃 Treat! <b>+" + C.coins + " bonus coins</b> added to your account.", "Happy Halloween. Spend them in the Revision Arcade."); track("Seasonal treat: collected", { where: where, campaign: C.id }); }
      else if (r === "had") say("🎃 You've already had your Halloween treat on this account.", "One treat per account. Thanks for solving the mystery again!");
      else if (r === "closed") say("🎃 The Halloween treat has ended.", "Thanks for solving The Glow Stick Mystery!");
      else if (r === "error") say("🎃 Your <b>" + C.coins + "-coin</b> treat is waiting.", "We couldn't reach the coin bank just now. It will be added next time you open a mini-lesson while signed in.");
      else offer();
    }
    function offer() {
      say("🎃 You've earned a Halloween treat: <b>" + C.coins + " bonus coins!</b>",
        "Collect it with a free Revision Arcade account: just a username and password, no email. Your lesson coins are saved too.",
        '<div class="tbtns"><button type="button" data-t="register">Collect my treat</button><button type="button" class="ghost" data-t="login">I have an account</button></div>');
    }
    if (t.d) { say("🎃 You've already collected your Halloween treat on this device.", "Thanks for solving the mystery again!"); return; }
    if (signedIn()) {
      track("Seasonal treat: earned", { signedIn: "yes", campaign: C.id });
      say("🎃 Adding your Halloween treat…", "");
      claim().then(function (r) { result(r, "lesson"); });
      return;
    }
    track("Seasonal treat: earned", { signedIn: "no", campaign: C.id });
    fin.classList.add("sz-has-treat");
    offer();
    card.addEventListener("click", function (e) {
      var b = e.target && e.target.closest ? e.target.closest("[data-t]") : null;
      if (!b) return;
      var mode = b.getAttribute("data-t");
      track("Seasonal treat: collect pressed", { mode: mode, campaign: C.id });
      [].forEach.call(card.querySelectorAll("button"), function (x) { x.disabled = true; });
      getAuth().then(function (auth) {
        [].forEach.call(card.querySelectorAll("button"), function (x) { x.disabled = false; });
        if (auth.isLoggedIn()) { say("🎃 Adding your Halloween treat…", ""); claim().then(function (r) { result(r, "lesson"); }); return; }
        var off = auth.onChange(function (d) {
          if (!d || !d.loggedIn) return;
          off();
          say("🎃 Adding your Halloween treat…", "");
          claim().then(function (r) { result(r, "lesson"); });
        });
        // The lesson-coins note's own button saves the lesson's coins as well; use it when it is there.
        var lp = fin.querySelector('.lp-note [data-lp="' + mode + '"]');
        if (lp && !lp.disabled) lp.click(); else auth.open(mode, { source: "seasonal treat" });
      }, function () {
        [].forEach.call(card.querySelectorAll("button"), function (x) { x.disabled = false; });
        say("🎃 Your <b>" + C.coins + "-coin</b> treat is waiting.", "Couldn't open sign-in just now. Try again in a moment; your treat is remembered on this device.");
      });
    });
  }

  /* ---------- finished earlier, signed in now: collect quietly ---------- */
  function collectLater() {
    var t = treatState();
    if (!t.e || t.d || !signedIn() || Date.now() >= C.treatUntil) return;
    claim().then(function (r) {
      if (r !== "paid") return;
      track("Seasonal treat: collected", { where: "later", campaign: C.id });
      var top = document.querySelector(".topbar");
      if (!top) return;
      var bar = el("sz-bar", '<span class="t"><b>🎃 Halloween treat collected:</b> +' + C.coins + " bonus coins added to your account.</span>" +
        '<button type="button" aria-label="Dismiss">×</button>');
      bar.setAttribute("role", "status");
      bar.querySelector("button").addEventListener("click", function () { bar.remove(); });
      top.parentNode.insertBefore(bar, top.nextSibling);
    });
  }

  /* ---------- other lessons: the plug ---------- */
  function seen() { try { return localStorage.getItem("aism-seasonal:" + C.id) === "x"; } catch (e) { return false; } }
  function hide() { try { localStorage.setItem("aism-seasonal:" + C.id, "x"); } catch (e) {} }
  var href = C.page;      // lessons live in the same folder
  function addBar() {
    if (seen() || !C.match.test(file)) return;
    var top = document.querySelector(".topbar");
    if (!top || document.querySelector(".sz-bar")) return;
    var bar = el("sz-bar", '<a href="' + href + '"><b>' + C.tag + "</b> · " + C.bar + " →</a>" +
      '<button type="button" aria-label="Dismiss">×</button>');
    bar.setAttribute("role", "note");
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

  function init() {
    if (onPage) {
      collectLater();
      var fin = document.querySelector(".screen.final");
      if (!fin) return;
      var fired = false;
      var check = function () { if (fired || !fin.classList.contains("active")) return; fired = true; try { treatCard(fin); } catch (e) {} };
      try { new MutationObserver(check).observe(fin, { attributes: true, attributeFilter: ["class"] }); } catch (e) {}
      check();
      return;
    }
    collectLater();
    if (new Date() >= C.end || finishedHere()) return;
    addBar(); addCard();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
