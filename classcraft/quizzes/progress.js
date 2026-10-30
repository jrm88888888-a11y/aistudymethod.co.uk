/* progress.js — lesson progress, Velvet Coins for mini-lessons, the account
   chip in the lesson top bar, and progress marks on course pages.

   1. Coins on a mini-lesson (loaded by lesson-nav.js). Coins use the arcade's
      grade table (95%+ 12, 80% 9, 60% 6, 40% 3, else 1), scored on FIRST-TRY
      answers.
        - Mission lessons (any lesson with "Mission check" questions, i.e. an
          answer box carrying data-mission="mN"): coins are paid PER MISSION,
          the moment its Mission check is answered correctly, with a "+N" pop.
          A mission = the screens after the previous Mission check up to and
          including its own. Questions after the last Mission check are paid
          as "Final questions" when the lesson ends. (Oct 2026: a whole lesson
          used to pay at most 12, the same as one 2-minute arcade round.)
        - Other lessons: one payment when the completion screen opens.
        - Each mission/lesson pays once per day on this device.
        - Signed in: banked on the server through Arcade.auth.award(pct), so
          the server's 150-a-day cap applies exactly as in games.
        - Signed out: kept on this device as UNSAVED coins (shown as such),
          banked through the same /award call when the student creates an
          account or logs in, never past the daily cap.
      Only answers that follow a real click/keypress on that screen count, so
      a restored "resume" state can never pay for old answers.
   2. Account chip in the lesson top bar: avatar + coins + a menu (Choose
      avatar, Invite a friend, Element shop, Log out) when signed in; a small
      "Log in" / "N unsaved" button when signed out. The arcade's account
      script (arcade/auth.js) is loaded only when the student is signed in or
      presses the chip / a save button.
   3. End screen: what the coins are for, e.g. "3 more coins for Lithium".
   4. On any page that links to mini-lessons: a tick after each finished lesson.
   5. On revise and teacher course pages: a "Continue" strip.
   6. Feedback (Oct 2026): a "Report a mistake" flag in the lesson top bar
      (auth.js openReport, works signed in or out), "Give feedback" in the
      account menu, and a feedback-quest card under the end-screen coins for
      signed-in students who haven't claimed it (auth.js openFeedback; "Not now"
      hides the card for 7 days on this device).

   Storage (browser only; nothing is sent unless the student is signed in):
     aism-lp        {v:1, l:{<stem>:{b,s,f,d,t}}, last:{k,u,t,day,done,nx}}
     aism-lp-coins  {pend:[{k,p,c,d}], aw:{<stem> or <stem>#<mission>:day}}
   <stem> = the lesson file name without "-mini-lesson.html".

   Plausible events: "Mini-lesson: 2nd+ in course" {course},
   "Mini-lesson: returning", "Lesson coins: unsaved", "Lesson coins: save
   pressed", "Lesson coins: saved" {coins}, "Lesson coins: mission" {state},
   "Lesson chip: clicked" {state}, "Feedback quest: card shown", "Feedback quest:
   card dismissed". Registration itself is reported by auth.js. */
(function () {
  "use strict";
  if (window.AismProgress) return;

  var LSK = "aism-lp", LSC = "aism-lp-coins", AUTH_LS = "aism-auth", WALLET_LS = "aism-wallet";
  var SUF = "-mini-lesson.html";
  var RX = /^(.+?)-(ks3|gcse|a-level|ibdp)-(edexcel-igcse|cambridge-igcse|general|edexcel|eduqas|wjec|ccea|aqa|ocr|hl|sl|ib)-(.+)$/;
  var GRADE = [[95, 12], [80, 9], [60, 6], [40, 3]];
  var DAILY_CAP = 150, MAX_PENDING = 60;
  var AUTH_V = "20261030a";
  var ELEMENTS = "Hydrogen,Helium,Lithium,Beryllium,Boron,Carbon,Nitrogen,Oxygen,Fluorine,Neon,Sodium,Magnesium,Aluminium,Silicon,Phosphorus,Sulfur,Chlorine,Argon,Potassium,Calcium,Scandium,Titanium,Vanadium,Chromium,Manganese,Iron,Cobalt,Nickel,Copper,Zinc,Gallium,Germanium,Arsenic,Selenium,Bromine,Krypton,Rubidium,Strontium,Yttrium,Zirconium,Niobium,Molybdenum,Technetium,Ruthenium,Rhodium,Palladium,Silver,Cadmium,Indium,Tin,Antimony,Tellurium,Iodine,Xenon,Caesium,Barium,Lanthanum,Cerium,Praseodymium,Neodymium,Promethium,Samarium,Europium,Gadolinium,Terbium,Dysprosium,Holmium,Erbium,Thulium,Ytterbium,Lutetium,Hafnium,Tantalum,Tungsten,Rhenium,Osmium,Iridium,Platinum,Gold,Mercury,Thallium,Lead,Bismuth,Polonium,Astatine,Radon,Francium,Radium,Actinium,Thorium,Protactinium,Uranium,Neptunium,Plutonium,Americium,Curium,Berkelium,Californium,Einsteinium,Fermium,Mendelevium,Nobelium,Lawrencium,Rutherfordium,Dubnium,Seaborgium,Bohrium,Hassium,Meitnerium,Darmstadtium,Roentgenium,Copernicium,Nihonium,Flerovium,Moscovium,Livermorium,Tennessine,Oganesson".split(",");

  var ME = document.currentScript || document.querySelector('script[src*="quizzes/progress.js"]');
  var BASE = ME && ME.src ? ME.src.replace(/quizzes\/progress\.js.*$/, "") : "/classcraft/";
  var SHOP = BASE + "arcade/elements.html";

  function worth(p) { for (var i = 0; i < GRADE.length; i++) if (p >= GRADE[i][0]) return GRADE[i][1]; return 1; }
  function today() { return Math.floor(Date.now() / 86400000); }   // UTC day, as the server counts it
  function rd(k, d) { try { var v = JSON.parse(localStorage.getItem(k) || "null"); return v || d; } catch (e) { return d; } }
  function wr(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function track(n, p) { try { if (window.plausible) window.plausible(n, p ? { props: p } : undefined); } catch (e) {} }
  function esc(t) { return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
  function stemOf(href) { var m = /([a-z0-9-]+)-mini-lesson\.html/.exec(href || ""); return m ? m[1] : null; }
  function groupOf(stem) { var m = RX.exec(stem || ""); return m ? m[1] + "-" + m[2] + "-" + m[3] : null; }
  function plural(n, w) { return n + " " + w + (n === 1 ? "" : "s"); }

  function prog() { var p = rd(LSK, null); if (!p || p.v !== 1 || !p.l) p = { v: 1, l: {}, last: null }; return p; }
  function coinsStore() { var c = rd(LSC, null); if (!c || !c.aw) c = { pend: [], aw: {} }; if (!c.pend) c.pend = []; return c; }
  function pendingTotal(c) { c = c || coinsStore(); var n = 0; c.pend.forEach(function (x) { n += x.c || 0; }); return n; }
  function session() { return rd(AUTH_LS, null); }
  function signedIn() { var a = session(); return !!(a && a.token); }
  function cachedWallet() {
    var a = session(), w = rd(WALLET_LS, null);
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
        "box-shadow:inset 0 0 0 1.5px #a87b12;vertical-align:-.12em;margin-right:5px;flex:none}" +
      /* account chip in the lesson top bar */
      "#lp-chip{font-family:'Fredoka',sans-serif;font-weight:600;font-size:.95rem;display:inline-flex;align-items:center;gap:6px;white-space:nowrap;" +
        "border:2px solid #2c2840;border-radius:999px;background:#fff;color:#2c2840;padding:3px 12px 3px 3px;cursor:pointer;line-height:1;min-height:34px;box-sizing:border-box}" +
      "#lp-chip:hover{background:#fff7ee}" +
      "#lp-chip:focus-visible{outline:3px solid #0a6b5e;outline-offset:2px}" +
      "#lp-chip .lp-coin{margin-right:0}" +
      "#lp-chip.out{padding:3px 12px;background:#0a6b5e;color:#fff;border-color:#2c2840}" +
      "#lp-chip.out:hover{background:#08594e}" +
      "#lp-chip.unsaved{background:#fffbea;color:#2c2840}" +
      "#lp-chip.unsaved:hover{background:#fff3c4}" +
      "#lp-chip .lp-av{width:26px;height:26px;border-radius:50%;overflow:hidden;border:2px solid #0a6b5e;background:#f0e7da;flex:none;display:inline-flex;align-items:center;justify-content:center;font-size:14px}" +
      "#lp-chip .lp-av img{width:100%;height:100%;object-fit:cover;display:block}" +
      "#lp-chip .lp-u{font-weight:500;opacity:.75;font-size:.85em}" +
      ".lp-menu{position:fixed;z-index:9990;min-width:220px;max-width:calc(100vw - 24px);background:#fff;border:3px solid #2c2840;border-radius:16px;" +
        "box-shadow:0 8px 0 rgba(44,40,64,.12),0 14px 30px rgba(44,40,64,.18);padding:10px;font-family:'Nunito',sans-serif;color:#2c2840;box-sizing:border-box}" +
      ".lp-menu .lp-mh{font-family:'Fredoka',sans-serif;font-weight:600;font-size:1.02rem;padding:4px 6px 0}" +
      ".lp-menu .lp-ms{font-size:.9rem;color:#6b6580;padding:2px 6px 8px}" +
      ".lp-menu button,.lp-menu a{display:block;width:100%;box-sizing:border-box;text-align:left;font-family:'Fredoka',sans-serif;font-weight:500;font-size:1rem;" +
        "border:0;background:none;color:#2c2840;padding:9px 8px;border-radius:10px;cursor:pointer;text-decoration:none}" +
      ".lp-menu button:hover,.lp-menu a:hover{background:#f6f0e6}" +
      ".lp-menu .lp-sep{height:1px;background:#e8e0d2;margin:6px 4px}" +
      /* "+N coins" pop at the end of a mission */
      ".lp-pop{position:fixed;left:50%;top:14px;z-index:9995;transform:translate(-50%,-140%);transition:transform .35s cubic-bezier(.2,1.3,.4,1),opacity .3s;" +
        "display:flex;align-items:center;gap:12px;background:#fffbea;border:3px solid #2c2840;border-radius:18px;padding:10px 18px 10px 12px;" +
        "box-shadow:0 6px 0 rgba(44,40,64,.14),0 12px 28px rgba(44,40,64,.18);font-family:'Nunito',sans-serif;color:#2c2840;width:max-content;max-width:calc(100vw - 24px);box-sizing:border-box}" +
      ".lp-pop.in{transform:translate(-50%,0)}" +
      ".lp-pop.out{opacity:0}" +
      ".lp-pop .lp-pn{font-family:'Fredoka',sans-serif;font-weight:700;font-size:1.6rem;display:flex;align-items:center;gap:6px;white-space:nowrap}" +
      ".lp-pop .lp-pn .lp-coin{width:1.05em;height:1.05em;margin:0}" +
      ".lp-pop .lp-pt{line-height:1.25}" +
      ".lp-pop .lp-pt b{font-family:'Fredoka',sans-serif;font-weight:600;font-size:1.02rem;display:block}" +
      ".lp-pop .lp-pt span{font-size:.9rem;color:#6b6580}" +
      ".lp-pop.quiet .lp-pn{font-size:1.25rem}" +
      "@media (prefers-reduced-motion:reduce){.lp-pop{transition:opacity .2s}}" +
      /* end-screen note */
      ".lp-note{margin:14px auto 4px;max-width:560px;padding:14px 16px;border:3px solid #2c2840;border-radius:18px;background:#fffbea;" +
        "font-family:'Nunito',sans-serif;font-size:1rem;line-height:1.45;text-align:center;box-shadow:0 5px 0 rgba(44,40,64,.10)}" +
      ".lp-note b{font-family:'Fredoka',sans-serif}" +
      ".lp-note .lp-big{font-family:'Fredoka',sans-serif;font-weight:600;font-size:1.15rem;color:#2c2840}" +
      ".lp-note .lp-sub{display:block;margin-top:4px;color:#6b6580;font-size:.92rem}" +
      ".lp-note .lp-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:10px}" +
      ".lp-note button{font-family:'Fredoka',sans-serif;font-weight:600;font-size:1rem;border:3px solid #2c2840;border-radius:14px;padding:9px 14px;" +
        "cursor:pointer;background:#0a6b5e;color:#fff;box-shadow:0 4px 0 rgba(44,40,64,.18)}" +
      ".lp-note button.ghost{background:#fff;color:#2c2840}" +
      ".lp-note .lp-el{display:block;margin-top:10px;padding-top:10px;border-top:2px dashed #e3d9c6;font-size:.95rem;color:#2c2840}" +
      ".lp-note .lp-el a{font-family:'Fredoka',sans-serif;font-weight:600;color:#0a6b5e;text-decoration:none;white-space:nowrap}" +
      ".lp-note .lp-el a:hover{text-decoration:underline}" +
      ".lp-note.lp-quest{background:#eefaf7;margin-top:12px}" +
      "#lp-flag{font-family:'Fredoka',sans-serif;font-weight:600;font-size:.85rem;display:inline-flex;align-items:center;gap:5px;white-space:nowrap;border:2px solid #2c2840;" +
        "border-radius:999px;background:#fff;color:#2c2840;padding:3px 10px;cursor:pointer;line-height:1;min-height:34px;box-sizing:border-box}" +
      "#lp-flag:hover{background:#fff7ee}" +
      "#lp-flag:focus-visible{outline:3px solid #0a6b5e;outline-offset:2px}" +
      "@media (max-width:520px){#lp-flag .lp-ft{display:none}}" +
      ".lp-strip{max-width:860px;margin:1.2rem auto 0;padding:12px 16px;border:1px solid rgba(10,107,94,.3);border-radius:12px;background:rgba(10,107,94,.06);" +
        "font-size:15px;line-height:1.5;display:flex;gap:10px;align-items:center;flex-wrap:wrap}" +
      ".lp-strip a{font-weight:700;color:#0a6b5e;text-decoration:none}" +
      ".lp-strip a:hover{text-decoration:underline}";
    document.head.appendChild(s);
  }

  /* ---------- ticks on lesson links ---------- */
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

  /* ---------- continue strip ---------- */
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
  var authP = null, AUTH = null;
  function loadAuth() {
    if (window.Arcade && window.Arcade.auth) { AUTH = window.Arcade.auth; return Promise.resolve(AUTH); }
    if (authP) return authP;
    if (window.AISM_NO_CORNER === undefined) window.AISM_NO_CORNER = true;
    if (window.AISM_NO_SIGNUP_PROMPT === undefined) window.AISM_NO_SIGNUP_PROMPT = true;
    authP = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = BASE + "arcade/auth.js?v=" + AUTH_V;
      s.onload = function () { if (window.Arcade && window.Arcade.auth) { AUTH = window.Arcade.auth; resolve(AUTH); } else reject(new Error("no auth")); };
      s.onerror = function () { authP = null; reject(new Error("auth load failed")); };
      document.head.appendChild(s);
    });
    return authP;
  }

  /* ---------- 2. account chip in the lesson top bar ---------- */
  function closeMenu() { var m = document.getElementById("lp-menu"); if (m) m.remove(); }
  /* "Report a mistake" flag, just before the chip. Works signed in or out. */
  function flag(bar, before) {
    if (document.getElementById("lp-flag")) return;
    var f = document.createElement("button");
    f.type = "button"; f.id = "lp-flag";
    f.innerHTML = '<span aria-hidden="true">⚑</span><span class="lp-ft">Report a mistake</span>';
    f.title = "Report a mistake on this screen";
    f.setAttribute("aria-label", "Report a mistake on this screen");
    bar.insertBefore(f, before);
    f.addEventListener("click", function () {
      var screens = [].slice.call(document.querySelectorAll(".screen"));
      var cur = document.querySelector(".screen.active") || screens[0];
      var h = cur ? cur.querySelector("h1,h2,h3") : null;
      var ctx = { page: location.pathname, screen: cur ? String(screens.indexOf(cur) + 1) : "",
        heading: h ? h.textContent.replace(/\s+/g, " ").trim().slice(0, 140) : "", lesson: stemOf(location.pathname) || "" };
      f.disabled = true;
      loadAuth().then(function (auth) { f.disabled = false; auth.openReport(ctx); }, function () { f.disabled = false; });
    });
  }
  function chip() {
    var bar = document.querySelector(".topbar"); if (!bar) return;
    css();
    var c = document.getElementById("lp-chip");
    if (!c) {
      c = document.createElement("button");
      c.type = "button";
      c.id = "lp-chip";
      var sc = bar.querySelector(".score");
      if (sc && sc.parentNode === bar) bar.insertBefore(c, sc.nextSibling); else bar.appendChild(c);
      c.addEventListener("click", onChipClick);
      if (/-mini-lesson\.html$/.test(location.pathname)) flag(bar, c);
    }
    var a = session();
    if (a && a.token) {
      var w = cachedWallet();
      var coins = (w && typeof w.coins === "number") ? w.coins : "…";
      var avId = w && w.avatar ? parseInt(w.avatar, 10) : null;
      var img = (avId && AUTH && AUTH.avatarImg) ? AUTH.avatarImg(avId, 256) : "";
      c.className = "in";
      c.innerHTML = '<span class="lp-av">' + (img ? '<img alt="" src="' + esc(img) + '">' : "🙂") + '</span><span class="lp-coin" aria-hidden="true"></span>' + esc(coins);
      c.title = "Your account: " + (a.username || "");
      c.setAttribute("aria-label", "Your account, " + coins + " coins");
      c.setAttribute("aria-haspopup", "menu");
    } else {
      var pend = pendingTotal();
      c.removeAttribute("aria-haspopup");
      if (pend > 0) {
        c.className = "unsaved";
        c.innerHTML = '<span class="lp-coin" aria-hidden="true"></span>' + pend + ' <span class="lp-u">unsaved</span>';
        c.title = "Velvet Coins earned on this device, not saved yet. Tap to save them with a free account.";
        c.setAttribute("aria-label", pend + " unsaved coins. Save them with a free account");
      } else {
        c.className = "out";
        c.innerHTML = '<span class="lp-coin" aria-hidden="true"></span>Log in';
        c.title = "Log in to collect Velvet Coins";
        c.setAttribute("aria-label", "Log in to collect Velvet Coins");
      }
    }
  }
  function onChipClick() {
    var c = document.getElementById("lp-chip");
    if (signedIn()) {
      track("Lesson chip: clicked", { state: "in" });
      if (document.getElementById("lp-menu")) { closeMenu(); return; }
      openMenu(c);
      return;
    }
    var pend = pendingTotal();
    track("Lesson chip: clicked", { state: pend > 0 ? "unsaved" : "out" });
    if (pend > 0) track("Lesson coins: save pressed");
    c.disabled = true;
    loadAuth().then(function (auth) {
      c.disabled = false;
      auth.open(pend > 0 ? "register" : "login", { source: "lesson" });
    }, function () { c.disabled = false; });
  }
  function openMenu(c) {
    closeMenu();
    var a = session() || {}, w = cachedWallet() || {};
    var owned = (w.owned || []).length;
    var m = document.createElement("div");
    m.id = "lp-menu"; m.className = "lp-menu"; m.setAttribute("role", "menu");
    m.innerHTML = '<div class="lp-mh">' + esc(a.username || "") + "</div>" +
      '<div class="lp-ms">' + (typeof w.coins === "number" ? plural(w.coins, "coin") : "…") + " · " + owned + " collected</div>" +
      '<button type="button" role="menuitem" data-a="avatar">Choose avatar</button>' +
      '<button type="button" role="menuitem" data-a="invite">Invite a friend</button>' +
      '<button type="button" role="menuitem" data-a="feedback">Give feedback' + (AUTH && AUTH.feedbackDone && AUTH.feedbackDone() ? "" : " · +100 coins") + '</button>' +
      '<a role="menuitem" href="' + esc(SHOP) + '">Element shop</a>' +
      '<div class="lp-sep"></div>' +
      '<button type="button" role="menuitem" data-a="logout">Log out</button>';
    document.body.appendChild(m);
    var r = c.getBoundingClientRect(), mw = m.offsetWidth;
    m.style.top = Math.round(r.bottom + 8) + "px";
    m.style.left = Math.round(Math.max(12, Math.min(window.innerWidth - mw - 12, r.right - mw))) + "px";
    m.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("[data-a]") : null;
      if (!b) return;
      var act = b.getAttribute("data-a");
      closeMenu();
      loadAuth().then(function (auth) {
        if (act === "avatar") auth.openAvatars();
        else if (act === "invite") auth.openInvite();
        else if (act === "feedback") auth.openFeedback({ where: "lesson menu" });
        else if (act === "logout") { auth.logout(); chip(); }
      });
    });
    setTimeout(function () {
      var off = function (e) {
        if (!document.getElementById("lp-menu")) { document.removeEventListener("click", off, true); return; }
        if (m.contains(e.target) || c.contains(e.target)) return;
        closeMenu(); document.removeEventListener("click", off, true);
      };
      document.addEventListener("click", off, true);
    }, 0);
    document.addEventListener("keydown", function k(e) { if (e.key === "Escape") { closeMenu(); document.removeEventListener("keydown", k); } });
  }

  /* ---------- paying coins ---------- */
  var claimP = null;
  function claimPending(auth) {
    if (claimP) return claimP;
    var c = coinsStore();
    if (!c.pend.length || !auth.isLoggedIn()) return Promise.resolve(null);
    var saved = 0;
    claimP = Promise.resolve(auth.pull()).then(function () {
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
      claimP = null;
      if (saved > 0) track("Lesson coins: saved", { coins: String(saved) });
      chip();
      return { saved: saved, left: pendingTotal() };
    }, function () { claimP = null; return null; });
    return claimP;
  }
  function keepPending(k, pct, w) {
    var cs = coinsStore();
    cs.pend.push({ k: k, p: pct, c: w, d: today() });
    while (cs.pend.length > MAX_PENDING) cs.pend.shift();
    wr(LSC, cs);
  }
  /* Pay for one mission (k = stem#mN) or one whole lesson (k = stem), once a day.
     Resolves {state, coins, rem}: state is "banked", "cap" (daily limit hit),
     "unsaved" (signed out: kept on this device), "held" (server unreachable:
     kept on this device) or "already" (paid earlier today). */
  function grant(k, pct) {
    var day = today(), c = coinsStore();
    if (c.aw[k] === day) return Promise.resolve({ state: "already", coins: 0 });
    var w = worth(pct);
    c.aw[k] = day;
    Object.keys(c.aw).forEach(function (x) { if (c.aw[x] < day - 2) delete c.aw[x]; });   // keep the guard map small
    wr(LSC, c);
    function unsaved(state) { keepPending(k, pct, w); if (state === "unsaved") track("Lesson coins: unsaved"); chip(); return { state: state, coins: w }; }
    if (!signedIn()) return Promise.resolve(unsaved("unsaved"));
    return loadAuth().then(function (auth) {
      if (!auth.isLoggedIn()) return unsaved("unsaved");
      return auth.award(pct).then(function (res) {
        if (!res || !res.ok) return unsaved(res && res.status === 401 ? "unsaved" : "held");
        var cr = res.credited || 0, rem = res.wallet ? res.wallet.capRemaining : null;
        chip();
        if (coinsStore().pend.length) claimPending(auth);
        return cr > 0 ? { state: "banked", coins: cr, rem: rem } : { state: "cap", coins: 0 };
      });
    }, function () { return unsaved("unsaved"); });
  }

  /* ---------- "+N coins" pop ---------- */
  var popT = null;
  function pop(title, r) {
    css();
    var old = document.getElementById("lp-pop"); if (old) old.remove();
    if (popT) { clearTimeout(popT); popT = null; }
    var d = document.createElement("div");
    d.id = "lp-pop";
    d.setAttribute("role", "status"); d.setAttribute("aria-live", "polite");
    var big, sub;
    if (r.state === "banked") { big = "+" + r.coins; sub = r.rem != null && r.rem <= 12 ? r.rem + " coins left today" : "Saved to your account"; }
    else if (r.state === "unsaved") { big = "+" + r.coins; sub = "Not saved yet. Tap “" + pendingTotal() + " unsaved” to keep them"; }
    else if (r.state === "held") { big = "+" + r.coins; sub = "Kept on this device, saved next time"; }
    else if (r.state === "cap") { big = "✓"; sub = "Daily coin limit reached (150). Keep learning!"; }
    else if (r.state === "saved") { big = "+" + r.coins; sub = "Saved to your account"; }
    else { big = "✓"; sub = "Coins for this already won today"; }
    if (big === "✓") d.className = "lp-pop quiet"; else d.className = "lp-pop";
    d.innerHTML = '<span class="lp-pn">' + (big === "✓" ? "✓" : '<span class="lp-coin" aria-hidden="true"></span>' + esc(big)) + "</span>" +
      '<span class="lp-pt"><b>' + esc(title) + "</b><span>" + esc(sub) + "</span></span>";
    document.body.appendChild(d);
    requestAnimationFrame(function () { requestAnimationFrame(function () { d.classList.add("in"); }); });
    popT = setTimeout(function () { d.classList.add("out"); setTimeout(function () { d.remove(); }, 400); }, r.state === "unsaved" ? 4200 : 3200);
  }

  /* ---------- 1. missions ---------- */
  /* Built once per lesson page. Returns null for lessons without Mission checks. */
  function missionPlan(screens) {
    var finIdx = -1;
    screens.forEach(function (s, i) { if (s.classList.contains("final")) finIdx = i; });
    if (finIdx < 0) finIdx = screens.length - 1;
    var byM = {};
    [].forEach.call(document.querySelectorAll("[data-mission]"), function (el) {
      if (el.tagName === "LI" || (el.closest && (el.closest(".ks3-missions") || el.closest(".ks3-guess")))) return;
      var key = el.getAttribute("data-q") || el.getAttribute("data-num") || el.getAttribute("data-t");
      if (!key) return;
      var idx = screens.indexOf(el.closest(".screen"));
      if (idx <= 0 || idx >= finIdx) return;
      var m = el.getAttribute("data-mission");
      if (!byM[m] || byM[m].idx < idx) byM[m] = { m: m, idx: idx, key: key };
    });
    var checks = Object.keys(byM).map(function (k) { return byM[k]; }).sort(function (a, b) { return a.idx - b.idx; });
    if (!checks.length) return null;
    var segs = [], prev = 0;
    checks.forEach(function (ch) {
      var li = document.querySelector('.ks3-missions li[data-mission="' + ch.m + '"] .ks3-mn');
      var label = li ? li.textContent.trim() : "Mission " + ch.m.replace(/^m/, "");
      segs.push({ id: ch.m, label: label, from: prev + 1, to: ch.idx, key: ch.key });
      prev = ch.idx;
    });
    var tail = { id: "end", label: "Final questions", from: prev + 1, to: finIdx - 1, key: null };
    return { segs: segs, tail: tail, finIdx: finIdx };
  }

  /* First-try verdicts. A question's feedback box (#fb-<key>) turns
     "feedback good" or "feedback bad" when the lesson marks an answer; the
     first verdict that follows a real click/keypress on that screen counts. */
  function watchAnswers(screens, onVerdict) {
    var lastAct = {};
    function act(e) {
      if (e && e.isTrusted === false) return;
      var s = e.target && e.target.closest ? e.target.closest(".screen") : null;
      if (s) lastAct[screens.indexOf(s)] = Date.now();
    }
    document.addEventListener("click", act, true);
    document.addEventListener("keydown", act, true);
    var seen = {};
    [].forEach.call(document.querySelectorAll("[data-q],[data-num],[data-t]"), function (q) {
      if (q.closest && q.closest(".ks3-guess")) return;
      var key = q.getAttribute("data-q") || q.getAttribute("data-num") || q.getAttribute("data-t");
      if (!key || seen[key]) return;
      var fb = document.getElementById("fb-" + key);
      var idx = screens.indexOf(q.closest(".screen"));
      if (!fb || idx < 0) return;
      seen[key] = true;
      var was = /\b(good|bad)\b/.exec(fb.className);
      was = was ? was[1] : "";
      try {
        new MutationObserver(function () {
          var v = /\b(good|bad)\b/.exec(fb.className); v = v ? v[1] : "";
          if (!v || v === was) { was = v; return; }
          was = v;
          if (!lastAct[idx] || Date.now() - lastAct[idx] > 3000) return;   // restored state, not an answer
          onVerdict(key, idx, v);
        }).observe(fb, { attributes: true, attributeFilter: ["class"] });
      } catch (e) {}
    });
  }

  var M = null;   // mission state for this page
  function missionsInit(stem, screens) {
    var plan = missionPlan(screens);
    if (!plan) return;
    M = { plan: plan, first: {}, idxOf: {}, done: {}, results: [], stem: stem };
    function segOf(idx) {
      for (var i = 0; i < plan.segs.length; i++) if (idx >= plan.segs[i].from && idx <= plan.segs[i].to) return plan.segs[i];
      return (idx >= plan.tail.from && idx <= plan.tail.to) ? plan.tail : null;
    }
    watchAnswers(screens, function (key, idx, v) {
      if (!(key in M.first)) { M.first[key] = v; M.idxOf[key] = idx; }
      var seg = segOf(idx);
      if (seg && seg.key === key && v === "good") payMission(seg);
    });
  }
  function payMission(seg) {
    if (!M || M.done[seg.id]) return null;
    var good = 0, n = 0;
    Object.keys(M.first).forEach(function (k) {
      var i = M.idxOf[k];
      if (i >= seg.from && i <= seg.to) { n++; if (M.first[k] === "good") good++; }
    });
    if (!n) return null;                      // nothing answered here on this visit
    M.done[seg.id] = true;
    var pct = Math.round(100 * good / n);
    var p = grant(M.stem + "#" + seg.id, pct).then(function (r) {
      r.label = seg.label;
      track("Lesson coins: mission", { state: r.state });
      pop(seg.label + (seg.id === "end" ? " done" : " complete"), r);
      return r;
    });
    M.results.push(p);
    return p;
  }

  /* ---------- 3. what coins are for ---------- */
  function elementLine() {
    var w = cachedWallet();
    if (w && typeof w.coins === "number") {
      var own = {};
      (w.owned || []).forEach(function (o) { if (o.series === "periodic-table") own[o.item] = 1; });
      var n = 0;
      for (var i = 1; i <= ELEMENTS.length; i++) if (!own[String(i)]) { n = i; break; }
      if (!n) return '<span class="lp-el">You\'ve collected every element. Legendary! <a href="' + esc(SHOP) + '">Your collection →</a></span>';
      var name = ELEMENTS[n - 1];
      return '<span class="lp-el">' + (w.coins >= n
        ? "You can buy <b>" + esc(name) + "</b> now (" + plural(n, "coin") + "). "
        : "<b>" + plural(n - w.coins, "more coin") + "</b> for <b>" + esc(name) + "</b>. ") +
        '<a href="' + esc(SHOP) + '">Element shop →</a></span>';
    }
    return '<span class="lp-el">Coins buy elements for your collection. <b>Helium</b> costs 2. <a href="' + esc(SHOP) + '">See the elements →</a></span>';
  }

  /* ---------- lesson completion ---------- */
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

    var fs = document.getElementById("finalScore");
    var mount = fs && fs.closest ? fs.closest("p") : null;
    var note = document.createElement("div");
    note.className = "lp-note";
    note.innerHTML = '<span class="lp-big"><span class="lp-coin"></span>Adding up your coins…</span>';
    css();
    if (mount && mount.parentNode) mount.parentNode.insertBefore(note, mount.nextSibling); else fin.appendChild(note);

    var results;
    if (M) {
      payMission(M.plan.tail);                // questions after the last Mission check
      results = M.results.slice();
    } else {
      results = [grant(stem, pct)];
    }
    Promise.all(results).then(function (rs) { render(note, rs); }, function () { render(note, []); });
  }

  function render(note, rs) {
    var tot = 0, banked = 0, unsaved = 0, held = 0, cap = false, already = 0, rem = null;
    rs.forEach(function (r) {
      if (!r) return;
      if (r.state === "banked") { banked += r.coins; rem = r.rem; }
      else if (r.state === "unsaved") unsaved += r.coins;
      else if (r.state === "held") held += r.coins;
      else if (r.state === "cap") cap = true;
      else if (r.state === "already") already++;
    });
    tot = banked + unsaved + held;
    var mission = !!M;
    var html;
    if (unsaved > 0 || (!signedIn() && pendingTotal() > 0)) {
      var pend = pendingTotal();
      html = '<span class="lp-big"><span class="lp-coin"></span>' +
        (unsaved > 0 ? "You earned <b>" + unsaved + "</b> coin" + (unsaved === 1 ? "" : "s") + (mission ? " in this lesson" : "") + "!" : "Your coins are waiting") + "</span>" +
        '<span class="lp-sub">You have <b>' + pend + "</b> coin" + (pend === 1 ? "" : "s") + " on this device, not saved yet. Save them with a free account: just a username and password, no email.</span>" +
        '<div class="lp-btns"><button type="button" data-lp="register">Save my coins</button><button type="button" class="ghost" data-lp="login">I have an account</button></div>';
    } else if (held > 0) {
      html = '<span class="lp-big"><span class="lp-coin"></span>Couldn\'t reach the coin bank just now</span>' +
        '<span class="lp-sub">Your ' + held + " coins are kept on this device and will be saved next time you finish a lesson.</span>";
    } else if (banked > 0) {
      html = '<span class="lp-big"><span class="lp-coin"></span>You won <b>' + banked + "</b> coin" + (banked === 1 ? "" : "s") + (mission ? " in this lesson" : "") + "!</span>" +
        (cap ? '<span class="lp-sub">Then you hit today\'s 150-coin limit. Your coins reset tomorrow.</span>'
             : rem != null && rem <= 12 ? '<span class="lp-sub">' + rem + " left today</span>" : "");
    } else if (cap) {
      html = '<span class="lp-big"><span class="lp-coin"></span>Daily coin limit reached: <b>150/150</b></span><span class="lp-sub">Keep learning. Your coins reset tomorrow.</span>';
    } else if (already > 0) {
      html = '<span class="lp-big"><span class="lp-coin"></span>Coins for this lesson already earned today</span>' +
        '<span class="lp-sub">Finish a different lesson, or come back tomorrow.</span>';
    } else {
      html = '<span class="lp-big"><span class="lp-coin"></span>Lesson complete!</span>';
    }
    note.innerHTML = html + elementLine();
    chip();
    wireSave(note);
    questCard(note);
  }

  /* ---------- 6. feedback-quest card under the coins ---------- */
  var FB_SNOOZE = "aism-fb-snooze";
  function questCard(note) {
    if (!signedIn() || document.querySelector(".lp-quest")) return;
    try { if (Date.now() < Number(localStorage.getItem(FB_SNOOZE) || 0)) return; } catch (e) {}
    loadAuth().then(function (auth) {
      if (!auth.feedbackStatus || (auth.feedbackDone && auth.feedbackDone())) return;
      return auth.feedbackStatus().then(function (st) {
        if (!st || !st.ok || st.claimed || !st.eligible || document.querySelector(".lp-quest")) return;
        var q = document.createElement("div");
        q.className = "lp-note lp-quest";
        q.innerHTML = '<span class="lp-big">Feedback quest: win <b>' + (st.coins || 100) + '</b> coins</span>' +
          '<span class="lp-sub">Tell us one thing that would make this site better for you. It takes a minute.</span>' +
          '<div class="lp-btns"><button type="button" data-q="go">Give feedback</button><button type="button" class="ghost" data-q="later">Not now</button></div>';
        note.parentNode.insertBefore(q, note.nextSibling);
        track("Feedback quest: card shown");
        q.addEventListener("click", function (e) {
          var b = e.target && e.target.closest ? e.target.closest("[data-q]") : null;
          if (!b) return;
          if (b.getAttribute("data-q") === "later") {
            try { localStorage.setItem(FB_SNOOZE, String(Date.now() + 7 * 86400000)); } catch (e2) {}
            track("Feedback quest: card dismissed"); q.remove(); return;
          }
          var off = auth.onChange(function () { if (auth.feedbackDone && auth.feedbackDone()) { off(); q.remove(); } });
          auth.openFeedback({ where: "lesson end" });
        });
      });
    }).catch(function () {});
  }

  function wireSave(note) {
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
            if (!r) { note.innerHTML = '<span class="lp-big">Signed in</span><span class="lp-sub">Your coins will be saved next time you finish a lesson.</span>' + elementLine(); return; }
            note.innerHTML = '<span class="lp-big"><span class="lp-coin"></span>Saved <b>' + r.saved + "</b> coin" + (r.saved === 1 ? "" : "s") + " to your account!</span>" +
              (r.left > 0 ? '<span class="lp-sub">' + r.left + " more will be saved on another day (you can bank up to 150 coins a day).</span>" : "") + elementLine();
          });
        });
        auth.open(mode, { source: "lesson" });
      }, function () {
        b.disabled = false;
        var s = note.querySelector(".lp-sub"); if (s) s.textContent = "Couldn't open sign-in just now. Your coins are still on this device.";
      });
    });
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
    try { missionsInit(stem, [].slice.call(document.querySelectorAll(".screen"))); } catch (e) { M = null; }
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
    // Signed in: load the account script for the chip's avatar and menu, and
    // bank any coins still unsaved on this device (e.g. signed up elsewhere).
    if (signedIn()) loadAuth().then(function (auth) { chip(); if (pendingTotal() > 0) return claimPending(auth); }).catch(function () {});
    window.addEventListener("aism-auth-change", function (e) {
      chip();
      var d = e && e.detail;
      if (d && d.loggedIn && pendingTotal() > 0 && AUTH) {
        claimPending(AUTH).then(function (r) { if (r && r.saved > 0) pop("Coins saved", { state: "saved", coins: r.saved }); });
      }
      if (d && !d.loggedIn) closeMenu();
    });
  }

  window.AismProgress = {
    all: function () { return prog().l; },
    get: function (stem) { return prog().l[stem] || null; },
    last: function () { return prog().last; },
    pendingCoins: function () { return pendingTotal(); },
    loadAuth: loadAuth,     // seasonal.js uses the same lazy loader
    mark: mark,
    // lesson-next.js reports the next lesson so the Continue strip can offer it
    noteNext: function (url, title) {
      try {
        var p = prog(), file = location.pathname.split("/").pop(), stem = file.slice(0, -SUF.length);
        if (!p.last || p.last.k !== stem) return;
        var a = document.createElement("a"); a.href = url;
        p.last.nx = { u: a.pathname, t: title }; wr(LSK, p);
      } catch (e) {}
    },
    _missionPlan: function () { return M ? M.plan : null; }   // for tests
  };

  function init() { lessonInit(); mark(document); strip(); }
  if (document.readyState !== "loading") init(); else document.addEventListener("DOMContentLoaded", init);
})();
