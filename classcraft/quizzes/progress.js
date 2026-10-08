/* progress.js — lesson progress, Velvet Coins for mini-lessons, and progress
   marks on course pages. One file, three jobs:

   1. On a mini-lesson (loaded by lesson-nav.js): when the completion screen
      opens, remember the lesson (best %, stars, dates) and award coins.
        - Coins use the arcade's grade table (95%+ 12, 80% 9, 60% 6, 40% 3,
          else 1), once per lesson per day on this device.
        - Signed in: banked on the server through Arcade.auth.award(pct), so
          the server's 45-a-day cap and coin table apply, exactly as in games.
        - Signed out: kept on this device as UNSAVED coins (shown as such).
          They become real coins only if the student creates an account or
          logs in; they are then banked through the same /award call, never
          past the daily cap (anything over waits for another day).
      The arcade's account script (arcade/auth.js) is loaded only when the
      student is already signed in or presses "Save my coins".
   2. On any page that links to mini-lessons (lessons, revise pages, teacher
      course pages): a tick after each lesson link the student has finished.
   3. On revise and teacher course pages: a "Continue" strip pointing at the
      last lesson opened (or the next one, if it was finished), shown only on
      pages for the same course.

   Storage (browser only; nothing is sent unless the student saves coins):
     aism-lp        {v:1, l:{<stem>:{b,s,f,d,t}}, last:{k,u,t,day,done,nx}}
     aism-lp-coins  {pend:[{k,p,c,d}], aw:{<stem>:day}}
   <stem> = the lesson file name without "-mini-lesson.html".

   Plausible events: "Mini-lesson: 2nd+ in course" {course},
   "Mini-lesson: returning" (a completion on a later day than an earlier one),
   "Lesson coins: unsaved", "Lesson coins: save pressed", "Lesson coins: saved"
   {coins}. Registration itself is reported by auth.js with source "lesson". */
(function () {
  "use strict";
  if (window.AismProgress) return;

  var LSK = "aism-lp", LSC = "aism-lp-coins", AUTH_LS = "aism-auth", WALLET_LS = "aism-wallet";
  var SUF = "-mini-lesson.html";
  var RX = /^(.+?)-(ks3|gcse|a-level|ibdp)-(edexcel-igcse|cambridge-igcse|general|edexcel|eduqas|wjec|ccea|aqa|ocr|hl|sl|ib)-(.+)$/;
  var GRADE = [[95, 12], [80, 9], [60, 6], [40, 3]];
  var DAILY_CAP = 45, MAX_PENDING = 60;

  var ME = document.currentScript || document.querySelector('script[src*="quizzes/progress.js"]');
  var BASE = ME && ME.src ? ME.src.replace(/quizzes\/progress\.js.*$/, "") : "/classcraft/";

  function worth(p) { for (var i = 0; i < GRADE.length; i++) if (p >= GRADE[i][0]) return GRADE[i][1]; return 1; }
  function today() { return Math.floor(Date.now() / 86400000); }   // UTC day, as the server counts it
  function rd(k, d) { try { var v = JSON.parse(localStorage.getItem(k) || "null"); return v || d; } catch (e) { return d; } }
  function wr(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function track(n, p) { try { if (window.plausible) window.plausible(n, p ? { props: p } : undefined); } catch (e) {} }
  function esc(t) { return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
  function stemOf(href) { var m = /([a-z0-9-]+)-mini-lesson\.html/.exec(href || ""); return m ? m[1] : null; }
  function groupOf(stem) { var m = RX.exec(stem || ""); return m ? m[1] + "-" + m[2] + "-" + m[3] : null; }

  function prog() { var p = rd(LSK, null); if (!p || p.v !== 1 || !p.l) p = { v: 1, l: {}, last: null }; return p; }
  function coinsStore() { var c = rd(LSC, null); if (!c || !c.aw) c = { pend: [], aw: {} }; if (!c.pend) c.pend = []; return c; }
  function pendingTotal(c) { c = c || coinsStore(); var n = 0; c.pend.forEach(function (x) { n += x.c || 0; }); return n; }
  function signedIn() { var a = rd(AUTH_LS, null); return !!(a && a.token); }
  function cachedWallet() {
    var a = rd(AUTH_LS, null), w = rd(WALLET_LS, null);
    return (a && a.token && w && w.uid === a.userId) ? w.w : null;
  }

  /* ---------- styles ---------- */
  function css() {
    if (document.getElementById("lp-style")) return;
    var s = document.createElement("style");
    s.id = "lp-style";
    s.textContent =
      ".lp-tick{display:inline-block;margin-left:6px;color:#0a6b5e;font-weight:800;font-size:.9em}" +
      ".lp-coin{display:inline-block;width:.95em;height:.95em;border-radius:50%;background:radial-gradient(circle at 35% 35%,#ffe28a,#f5c542 55%,#c9971a);" +
        "box-shadow:inset 0 0 0 1.5px #a87b12;vertical-align:-.12em;margin-right:5px}" +
      ".lp-chip{font-family:'Fredoka',sans-serif;font-weight:600;font-size:.95rem;display:flex;align-items:center;white-space:nowrap}" +
      ".lp-chip.unsaved{opacity:.75}" +
      ".lp-note{margin:14px auto 4px;max-width:560px;padding:14px 16px;border:3px solid #2c2840;border-radius:18px;background:#fffbea;" +
        "font-family:'Nunito',sans-serif;font-size:1rem;line-height:1.45;text-align:center;box-shadow:0 5px 0 rgba(44,40,64,.10)}" +
      ".lp-note b{font-family:'Fredoka',sans-serif}" +
      ".lp-note .lp-big{font-family:'Fredoka',sans-serif;font-weight:600;font-size:1.15rem;color:#2c2840}" +
      ".lp-note .lp-sub{display:block;margin-top:4px;color:#6b6580;font-size:.92rem}" +
      ".lp-note .lp-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:10px}" +
      ".lp-note button{font-family:'Fredoka',sans-serif;font-weight:600;font-size:1rem;border:3px solid #2c2840;border-radius:14px;padding:9px 14px;" +
        "cursor:pointer;background:#0a6b5e;color:#fff;box-shadow:0 4px 0 rgba(44,40,64,.18)}" +
      ".lp-note button.ghost{background:#fff;color:#2c2840}" +
      ".lp-strip{max-width:860px;margin:1.2rem auto 0;padding:12px 16px;border:1px solid rgba(10,107,94,.3);border-radius:12px;background:rgba(10,107,94,.06);" +
        "font-size:15px;line-height:1.5;display:flex;gap:10px;align-items:center;flex-wrap:wrap}" +
      ".lp-strip a{font-weight:700;color:#0a6b5e;text-decoration:none}" +
      ".lp-strip a:hover{text-decoration:underline}";
    document.head.appendChild(s);
  }

  /* ---------- 2. ticks on lesson links ---------- */
  function mark(root) {
    var l = prog().l, n = 0;
    (root || document).querySelectorAll('a[href*="-mini-lesson.html"]').forEach(function (a) {
      var k = stemOf(a.getAttribute("href"));
      if (!k || !l[k] || a.querySelector(".lp-tick") || a.classList.contains("tc-btn") || a.classList.contains("lnx-main")) return;
      css();
      var t = document.createElement("span");
      t.className = "lp-tick";
      t.textContent = "✓";
      t.title = "You finished this lesson";
      t.setAttribute("aria-label", "finished");
      a.appendChild(t);
      n++;
    });
    return n;
  }

  /* ---------- 3. continue strip ---------- */
  function strip() {
    if (/-mini-lesson\.html$/.test(location.pathname)) return;
    var p = prog(), last = p.last;
    if (!last || !last.k) return;
    var g = groupOf(last.k); if (!g) return;
    var links = [].slice.call(document.querySelectorAll('a[href*="-mini-lesson.html"]'));
    var sameCourse = links.some(function (a) { var k = stemOf(a.getAttribute("href")); return k && groupOf(k) === g; });
    if (!sameCourse) return;
    var html;
    if (last.done && last.nx && last.nx.u && !p.l[stemOf(last.nx.u)]) {
      html = '<span>✓ You finished <b>' + esc(last.t) + '</b>.</span><a href="' + esc(last.nx.u) + '">Next up: ' + esc(last.nx.t) + " →</a>";
    } else if (!last.done) {
      html = '<span>Pick up where you left off:</span><a href="' + esc(last.u) + '">' + esc(last.t) + " →</a>";
    } else return;
    css();
    var d = document.createElement("div");
    d.className = "lp-strip";
    d.innerHTML = html;
    var hero = document.querySelector(".page-hero");
    if (hero && hero.parentNode) hero.parentNode.insertBefore(d, hero.nextSibling);
    else document.body.insertBefore(d, document.body.firstChild);
  }

  /* ---------- account script (lazy) ---------- */
  var authP = null;
  function loadAuth() {
    if (window.Arcade && window.Arcade.auth) return Promise.resolve(window.Arcade.auth);
    if (authP) return authP;
    if (window.AISM_NO_CORNER === undefined) window.AISM_NO_CORNER = true;
    if (window.AISM_NO_SIGNUP_PROMPT === undefined) window.AISM_NO_SIGNUP_PROMPT = true;
    authP = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = BASE + "arcade/auth.js?v=20261008";
      s.onload = function () { (window.Arcade && window.Arcade.auth) ? resolve(window.Arcade.auth) : reject(new Error("no auth")); };
      s.onerror = function () { authP = null; reject(new Error("auth load failed")); };
      document.head.appendChild(s);
    });
    return authP;
  }

  /* ---------- top-bar coin chip (lessons) ---------- */
  function chip() {
    var bar = document.querySelector(".topbar"); if (!bar) return;
    var c = document.getElementById("lp-chip");
    var w = cachedWallet(), pend = pendingTotal();
    var txt = null, unsaved = false;
    if (w && typeof w.coins === "number") txt = w.coins;
    else if (pend > 0) { txt = pend + " unsaved"; unsaved = true; }
    if (txt == null) { if (c) c.remove(); return; }
    css();
    if (!c) {
      c = document.createElement("div");
      c.id = "lp-chip";
      var sc = bar.querySelector(".score");
      if (sc && sc.parentNode === bar) bar.insertBefore(c, sc.nextSibling); else bar.appendChild(c);
    }
    c.className = "lp-chip" + (unsaved ? " unsaved" : "");
    c.title = unsaved ? "Velvet Coins earned on this device, not saved to an account yet" : "Your Velvet Coins";
    c.innerHTML = '<span class="lp-coin" aria-hidden="true"></span>' + esc(txt);
  }

  /* ---------- claiming unsaved coins after sign-in ---------- */
  var claiming = false;
  function claimPending(auth) {
    var c = coinsStore();
    if (claiming || !c.pend.length || !auth.isLoggedIn()) return Promise.resolve(null);
    claiming = true;
    var saved = 0;
    return Promise.resolve(auth.pull()).then(function () {
      var w = auth.wallet(), rem = (w && typeof w.capRemaining === "number") ? w.capRemaining : DAILY_CAP;
      function next() {
        var cs = coinsStore();
        if (!cs.pend.length) return Promise.resolve();
        var it = cs.pend[0];
        if ((it.c || 0) > rem) return Promise.resolve();          // would exceed today's cap: keep for another day
        return auth.award(it.p).then(function (res) {
          if (!res || !res.ok) return;                            // network/server problem: keep the rest
          var cs2 = coinsStore(); cs2.pend.shift(); wr(LSC, cs2);
          saved += res.credited || 0;
          rem = (res.wallet && typeof res.wallet.capRemaining === "number") ? res.wallet.capRemaining : rem - (res.credited || 0);
          return next();
        });
      }
      return next();
    }).then(function () {
      claiming = false;
      if (saved > 0) track("Lesson coins: saved", { coins: String(saved) });
      chip();
      return { saved: saved, left: pendingTotal() };
    }, function () { claiming = false; return null; });
  }

  /* ---------- 1. lesson completion ---------- */
  function lessonTitle() {
    var t = (document.title || "").split(" — ")[0].split(" | ")[0].trim();
    if (!t) { var h = document.querySelector(".screen h1"); t = h ? h.textContent.trim() : "this lesson"; }
    return t;
  }

  function onComplete(fin, stem) {
    var day = today(), title = lessonTitle(), g = groupOf(stem);
    var sc = parseFloat((document.getElementById("finalScore") || {}).textContent) || 0;
    var mx = parseFloat((document.getElementById("finalMax") || {}).textContent) || 0;
    var pct = mx > 0 ? Math.max(0, Math.min(100, Math.round(sc / mx * 100))) : 100;
    var starsTxt = (document.getElementById("finalStars") || {}).textContent || "";
    var stars = (starsTxt.match(/⭐/g) || []).length;

    var p = prog(), prev = p.l[stem];
    var earlierDay = false, sameCourse = 0;
    Object.keys(p.l).forEach(function (k) {
      if (k === stem) return;
      if (p.l[k].d < day || p.l[k].f < day) earlierDay = true;
      if (g && groupOf(k) === g) sameCourse++;
    });
    if (prev && prev.f < day) earlierDay = true;
    p.l[stem] = { b: Math.max(prev ? prev.b : 0, pct), s: Math.max(prev ? prev.s : 0, stars), f: prev ? prev.f : day, d: day, t: title };
    p.last = { k: stem, u: location.pathname, t: title, day: day, done: true, nx: (p.last && p.last.k === stem && p.last.nx) || null };
    wr(LSK, p);
    if (!prev && sameCourse >= 1 && g) track("Mini-lesson: 2nd+ in course", { course: g });
    if (earlierDay) track("Mini-lesson: returning");

    var c = coinsStore();
    var mount = (document.getElementById("finalScore") || {}).closest ? document.getElementById("finalScore").closest("p") : null;
    var note = document.createElement("div");
    note.className = "lp-note";
    css();
    function place() { if (mount && mount.parentNode) mount.parentNode.insertBefore(note, mount.nextSibling); else fin.appendChild(note); }

    if (c.aw[stem] === day) {
      note.innerHTML = '<span class="lp-big"><span class="lp-coin"></span>Coins for this lesson already earned today</span>' +
        '<span class="lp-sub">Finish a different lesson, or come back tomorrow.</span>';
      place(); return;
    }
    var w = worth(pct);
    c.aw[stem] = day;
    // keep the guard map small
    Object.keys(c.aw).forEach(function (k) { if (c.aw[k] < day - 2) delete c.aw[k]; });

    if (signedIn()) {
      wr(LSC, c);
      note.innerHTML = '<span class="lp-big"><span class="lp-coin"></span>You won <b>' + w + "</b> coin" + (w === 1 ? "" : "s") + "!</span>";
      place();
      loadAuth().then(function (auth) {
        if (!auth.isLoggedIn()) throw new Error("signed out");
        return auth.award(pct).then(function (res) {
          if (!res || !res.ok) {
            if (res && res.status === 401) throw new Error("signed out");
            keepPending();      // network/server hiccup: keep the coins on this device, bank them next time
            note.innerHTML = '<span class="lp-big"><span class="lp-coin"></span>Couldn\'t reach the coin bank just now</span>' +
              '<span class="lp-sub">Your ' + w + ' coins are kept on this device and will be saved next time you finish a lesson.</span>';
            chip();
            return;
          }
          var cr = res.credited || 0, rem = res.wallet ? res.wallet.capRemaining : null;
          note.innerHTML = cr > 0
            ? '<span class="lp-big"><span class="lp-coin"></span>You won <b>' + cr + "</b> coin" + (cr === 1 ? "" : "s") + "!</span>" +
              (rem != null && rem <= 12 ? '<span class="lp-sub">' + rem + " left today</span>" : "")
            : '<span class="lp-big"><span class="lp-coin"></span>Daily coin limit reached: <b>45/45</b></span><span class="lp-sub">Keep learning. Your coins reset tomorrow.</span>';
          chip();
          return claimPending(auth);
        });
      }).catch(function () { addPending(); });
    } else {
      addPending();
    }

    function keepPending() {
      var cs = coinsStore();
      cs.aw[stem] = day;
      cs.pend.push({ k: stem, p: pct, c: w, d: day });
      while (cs.pend.length > MAX_PENDING) cs.pend.shift();
      wr(LSC, cs);
      return cs;
    }
    function addPending() {
      var cs = keepPending();
      var tot = pendingTotal(cs);
      track("Lesson coins: unsaved");
      note.innerHTML = '<span class="lp-big"><span class="lp-coin"></span>You earned <b>' + w + "</b> coin" + (w === 1 ? "" : "s") + "!</span>" +
        '<span class="lp-sub">You have <b>' + tot + "</b> coin" + (tot === 1 ? "" : "s") + " on this device, not saved yet. Save them with a free account: just a username and password, no email.</span>" +
        '<div class="lp-btns"><button type="button" data-lp="register">Save my coins</button><button type="button" class="ghost" data-lp="login">I have an account</button></div>';
      if (!note.parentNode) place();
      chip();
      note.addEventListener("click", function (e) {
        var b = e.target && e.target.closest ? e.target.closest("[data-lp]") : null;
        if (!b) return;
        var mode = b.getAttribute("data-lp");
        track("Lesson coins: save pressed");
        b.disabled = true;
        loadAuth().then(function (auth) {
          b.disabled = false;
          var off = auth.onChange(function (d) {
            if (!d || !d.loggedIn) return;
            off();
            note.innerHTML = '<span class="lp-big"><span class="lp-coin"></span>Saving your coins…</span>';
            claimPending(auth).then(function (r) {
              if (!r) { note.innerHTML = '<span class="lp-big">Signed in</span><span class="lp-sub">Your coins will be saved next time you finish a lesson.</span>'; return; }
              note.innerHTML = '<span class="lp-big"><span class="lp-coin"></span>Saved <b>' + r.saved + "</b> coin" + (r.saved === 1 ? "" : "s") + " to your account!</span>" +
                (r.left > 0 ? '<span class="lp-sub">' + r.left + " more will be saved on another day (you can bank up to 45 coins a day).</span>" : "");
            });
          });
          auth.open(mode, { source: "lesson" });
        }, function () {
          b.disabled = false;
          note.querySelector(".lp-sub").textContent = "Couldn't open sign-in just now. Your coins are still on this device.";
        });
      });
    }
  }

  function lessonInit() {
    var file = decodeURIComponent(location.pathname.split("/").pop() || "");
    if (file.slice(-SUF.length) !== SUF) return;
    var fin = document.querySelector(".screen.final");
    if (!fin) return;
    var stem = file.slice(0, -SUF.length);
    var p = prog();
    if (!(p.last && p.last.k === stem)) {
      p.last = { k: stem, u: location.pathname, t: lessonTitle(), day: today(), done: false, nx: null };
      wr(LSK, p);
    }
    if (window.__aismNext) window.AismProgress.noteNext(window.__aismNext.u, window.__aismNext.t);
    chip();
    var fired = false;
    function check() {
      if (fired || !fin.classList.contains("active")) return;
      fired = true;
      try { onComplete(fin, stem); } catch (e) {}
      setTimeout(function () { mark(fin); }, 400);
    }
    try { new MutationObserver(check).observe(fin, { attributes: true, attributeFilter: ["class"] }); } catch (e) {}
    check();
    // Signed in with coins still unsaved on this device (e.g. signed up on another page): bank them quietly.
    if (signedIn() && pendingTotal() > 0) loadAuth().then(function (auth) { return claimPending(auth); }).catch(function () {});
    else if (signedIn() && !cachedWallet()) loadAuth().then(function (auth) { return Promise.resolve(auth.pull()).then(chip); }).catch(function () {});
    window.addEventListener("aism-auth-change", chip);
  }

  window.AismProgress = {
    all: function () { return prog().l; },
    get: function (stem) { return prog().l[stem] || null; },
    last: function () { return prog().last; },
    pendingCoins: function () { return pendingTotal(); },
    mark: mark,
    // lesson-next.js reports the next lesson so the Continue strip can offer it
    noteNext: function (url, title) {
      try {
        var p = prog(), file = location.pathname.split("/").pop(), stem = file.slice(0, -SUF.length);
        if (!p.last || p.last.k !== stem) return;
        var a = document.createElement("a"); a.href = url;
        p.last.nx = { u: a.pathname, t: title }; wr(LSK, p);
      } catch (e) {}
    }
  };

  function init() { lessonInit(); mark(document); strip(); }
  if (document.readyState !== "loading") init(); else document.addEventListener("DOMContentLoaded", init);
})();
