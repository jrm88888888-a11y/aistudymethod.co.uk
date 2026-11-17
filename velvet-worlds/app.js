/* Velvet Worlds / Velvet Elements: the periodic-table page. Loaded by /velvet-worlds/index.html and (after the switch) /classcraft/arcade/elements.html. */
(function () {
  "use strict";
  /* One app, two addresses:
       /velvet-worlds/                      window.VW_MODE = "full"        the map, the worlds and the game
       /classcraft/arcade/elements.html     window.VW_MODE = "collection"  the collection only: no worlds, no game
     The collection mode exists so the Element Shop can use the periodic-table page before the game launches.
     At launch, set VW_MODE = "full" in elements.html. */
  var FULL = window.VW_MODE !== "collection";
  var BASE = "/velvet-worlds/";
  document.getElementById("vw-app").innerHTML = "<div class=\"wrap\" id=\"lobby\">\n  <a class=\"back\" href=\"/classcraft/arcade.html\">&larr; Arcade</a>\n  <header class=\"marquee\">\n    <div class=\"over\">AI STUDY METHOD PRESENTS</div>\n    <h1 id=\"mTitle\">VELVET WORLDS</h1>\n    <div class=\"sub\" id=\"mSub\">COLLECT AN ELEMENT &middot; OPEN ITS WORLD &middot; BUILD YOUR WEAPONS</div>\n  </header>\n\n  <div class=\"hud\">\n    <div class=\"cell coins\"><span id=\"coinGlyph\" aria-hidden=\"true\"></span><div><div class=\"k\">Velvet Coins</div><div class=\"v\" id=\"hCoins\">0</div></div></div>\n    <div class=\"cell prog\"><div class=\"top\"><span class=\"k\">Elements collected</span><span class=\"v\" id=\"hOwned\">0 / 118</span></div><div class=\"bar\"><i id=\"hBar\"></i></div><div class=\"cap\" id=\"hCap\"></div></div>\n    <div class=\"cell\" id=\"cellParts\"><div><div class=\"k\">Particles</div><div class=\"parts\" id=\"hParts\"></div></div></div>\n    <div class=\"acts\" id=\"acts\"><button type=\"button\" data-k=\"open:forge\">The Forge</button><button type=\"button\" data-k=\"open:bank\">Particle Bank</button><button type=\"button\" class=\"fbbtn\" data-k=\"fb\" id=\"fbBtn\">Give feedback &middot; +100</button></div>\n  </div>\n\n  <div id=\"note\" role=\"status\"></div>\n\n  <div class=\"cell\" id=\"notComputer\" style=\"display:none;margin-bottom:14px\"><div>\n    <b>The worlds need a computer.</b> You can collect elements here, but playing a world needs a keyboard and a mouse.\n    <a href=\"#\" id=\"tryAnyway\">I am on a computer: let me play</a></div>\n  </div>\n\n  <section class=\"hero\" id=\"hero\">\n    <img id=\"heroArt\" src=\"/classcraft/arcade/assets/elements/001-h.webp\" alt=\"\" width=\"96\" height=\"96\">\n    <div class=\"txt\">\n      <div class=\"wtabs\" id=\"worldTabs\"></div>\n      <div class=\"lab\" id=\"heroLab\">World 1 &middot; Hydrogen</div>\n      <h2 id=\"heroName\">The Castle</h2>\n      <p id=\"heroText\"></p>\n      <p class=\"soft\"><span id=\"heroSpec\"></span> &nbsp;&middot;&nbsp; <span id=\"heroFound\"></span></p>\n    </div>\n    <div class=\"play\">\n      <button class=\"go\" id=\"playBtn\" type=\"button\">Play</button>\n      <p class=\"soft\" id=\"playNote\" style=\"margin-top:8px\">First load is about 17 MB</p>\n    </div>\n  </section>\n\n  <section class=\"mapcard\">\n    <h2 id=\"mapTitle\">The map</h2>\n    <p class=\"soft\" id=\"mapLead\">Every element is a world. Collect an element with Velvet Coins from mini-lessons and the arcade (price = atomic number). Worlds are being built one at a time.</p>\n    <div class=\"filters\" id=\"filters\" role=\"group\" aria-label=\"Show elements\"></div>\n    <div class=\"map\" id=\"map\" role=\"group\" aria-label=\"Periodic table of worlds\"></div>\n    <div class=\"key\"><span id=\"keyWorld\"><b style=\"color:var(--yellow)\">Glowing</b> = a world you can play</span><span><b style=\"color:var(--yellow)\">Dashed</b> = you can afford it</span><span>Picture = collected</span><span class=\"wideonly\">Numbers above are groups (GCSE: 1 to 7 and 0); numbers at the side are periods</span></div>\n    <div class=\"legend\" id=\"legend\"></div>\n  </section>\n\n  <p class=\"credits\" id=\"credits\">Castle models: KayKit Dungeon Pack. Robots and sand crabs: Quaternius Sci-Fi Essentials Kit. Aliens: Quaternius Ultimate Monsters. Island models, blasters and sounds: Kenney (kenney.nl). Star positions on the Moon: Yale Bright Star Catalogue. Earth map: Natural Earth. Music: &ldquo;Loopable Dungeon Ambience&rdquo; by JaggedStone. All released under CC0 or in the public domain. Built with Godot. Lanthanum and actinium are shown in the main table, with elements 58 to 71 and 90 to 103 below, as on GCSE data sheets.</p>\n  <p class=\"credits\">Bracketed masses are the mass number of the longest-lived isotope (no stable isotopes exist). A trailing * marks a predicted state: that element has never been observed in bulk. Elements in the middle block and the two lower rows show no group number.</p>\n</div>\n\n<aside id=\"drawer\" aria-label=\"Details\"></aside>\n\n<div id=\"stage\">\n  <canvas id=\"canvas\" tabindex=\"0\">Your browser does not support the canvas tag.</canvas>\n  <button id=\"exit\" type=\"button\">Leave game</button>\n  <div class=\"over\" id=\"loadPanel\"><div class=\"panel\">\n    <h2 id=\"loadTitle\">Loading the castle&hellip;</h2>\n    <p class=\"soft\" id=\"loadText\">The first visit takes longest.</p>\n    <progress id=\"loadBar\" max=\"100\" value=\"0\"></progress>\n    <div class=\"row\" id=\"loadRow\" style=\"display:none\"><button type=\"button\" onclick=\"location.reload()\">Back</button></div>\n  </div></div>\n  <div class=\"over\" id=\"endPanel\"><div class=\"panel\">\n    <h2 id=\"endTitle\"></h2>\n    <p id=\"endText\"></p>\n    <p class=\"soft\" id=\"endSave\"></p>\n    <div class=\"row\">\n      <button class=\"go\" type=\"button\" id=\"againBtn\">Play again</button>\n      <button type=\"button\" id=\"labBtn\">Back to the map</button>\n      <button type=\"button\" class=\"fbbtn\" id=\"endFb\">Give feedback &middot; +100 coins</button>\n    </div>\n    <p class=\"soft\"><a id=\"endLesson\" href=\"/classcraft/adventures/chemistry-gcse-aqa-chemical-changes-mini-lesson.html\">Earn coins: Chemical changes mini-lesson</a></p>\n  </div></div>\n</div>\n<div id=\"fbModal\" class=\"fbm\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Feedback\"></div>\n<div id=\"vwToast\" role=\"status\" aria-live=\"polite\"></div>\n<div id=\"sharePrompt\" role=\"status\" aria-live=\"polite\"></div>\n";
  if (!FULL) {
    ["hero", "notComputer", "cellParts", "acts", "stage", "keyWorld", "credits"].forEach(function (id) { var e = document.getElementById(id); if (e) e.remove(); });
    document.getElementById("mTitle").textContent = "VELVET ELEMENTS";
    document.getElementById("mSub").innerHTML = "COLLECT ALL 118 &middot; EARN COINS IN THE ARCADE &middot; PRICE = ATOMIC NUMBER";
    document.getElementById("mapTitle").textContent = "The periodic table";
    document.getElementById("mapLead").textContent = "Collect an element with Velvet Coins from mini-lessons and the arcade. The price is its atomic number. Choose any element to see it.";
  }
  /* ---- where the game files are. The engine (index.js, index.wasm, index.audio*.js) is the
     same for every build made with one Godot version; the pack (index.pck) changes per build. */
  var VW_ENGINE_CDN = "https://aistudymethodpullzone.b-cdn.net/velvet-worlds/engine-4.7.2/index";   // Bunny: the heavy engine files
  var VW_ENGINE_SITE = BASE + "game/index";                                                          // the same files on this site, used if Bunny cannot be reached
  var VW_ENGINE = VW_ENGINE_CDN;
  var VW_PACK = BASE + "game/index.pck";
  var VW_BUILD = "20261117e";               // change whenever index.pck changes
  var VW_SIZES = { wasm: 39514754, pck: 6552460 };

  /* ---- these four tables must match the accounts server (game-test.mjs checks them) ---- */
  var GAME_WORLDS = {
    "1": { p: 14, n: 10, e: 14 },
    "2": { p: 14, n: 12, e: 14 },
    "3": { p: 15, n: 13, e: 15 },
  };
  var GAME_ATOMS = {
    H: { z: 1, n: 0 },
    C: { z: 6, n: 6 },
    O: { z: 8, n: 8 },
  };
  var GAME_WEAPONS = {
    "weapon-methane": { C: 1, H: 4 },
    "weapon-water": { H: 2, O: 1 },
    "weapon-glucose": { C: 6, H: 12, O: 6 },
  };
  var PARTICLE_PRICE = 2;

  /* ---- the worlds that exist so far (key = atomic number) ---- */
  var WORLD_INFO = {
    "1": { name: "The Castle", mission: "Collect the reactivity series", spec: "AQA GCSE Chemistry (8462), 4.4.1.2", enemies: "robots",
      hero: "Collect the eight metals of <b>the reactivity series</b> and put them in order. Search every corner for hidden particles." },
    "2": { name: "Pirate Island", mission: "Collect the noble gases", spec: "AQA GCSE Chemistry (8462), 4.1.2.4", enemies: "sand crabs",
      hero: "Collect the six <b>noble gases</b> and put them in order of boiling point. Sand crabs lie buried in the beach, and particles are hidden all over the island." },
    "3": { name: "The Moon", mission: "Collect the alkali metals", spec: "AQA GCSE Chemistry (8462), 4.1.2.5", enemies: "aliens",
      hero: "Collect five <b>alkali metals</b> and put them in order of reactivity. Gravity is one sixth of Earth's, so jump for the particles floating overhead. The stars are in their real places." }
  };
  var WORLD = "1";                               // the world the Play button starts (the player can switch)
  var ATOM_OF = { 1: "H", 6: "C", 8: "O" };      // atomic number -> key in GAME_ATOMS
  var ATOM_ISO = { H: "hydrogen-1", C: "carbon-12", O: "oxygen-16" };
  var WEAPON_INFO = {
    "blaster-starter": { name: "Starter Blaster", blurb: "Yours from the start. 20 ammo." },
    "weapon-methane": { name: "Methane Flare", formula: "CH<sub>4</sub>", blurb: "Fires nearly twice as fast." },
    "weapon-water": { name: "Water Cannon", formula: "H<sub>2</sub>O", blurb: "Starts with 40 ammo and carries 90." },
    "weapon-glucose": { name: "Glucose Gun", formula: "C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>", blurb: "One shot pops a robot, a sand crab or a flying alien. Slow, and each shot uses 2 ammo." },
    "blaster-supporter": { name: "Supporter Blaster", blurb: "A thank-you for supporting the site. Same power as the Starter." }
  };
  var PNAME = { p: "Protons", n: "Neutrons", e: "Electrons" };
  var LS_LOCAL = "vw-local", LS_PICK = "vw-blaster", ART = "/classcraft/arcade/";
  var ELS = typeof VELVET_ELEMENTS !== "undefined" ? VELVET_ELEMENTS : [], CATS = typeof VELVET_CATEGORIES !== "undefined" ? VELVET_CATEGORIES : {};
  var BYSYM = {}; ELS.forEach(function (el) { BYSYM[el.sym] = el; });

  var auth = (window.Arcade && window.Arcade.auth) || null;
  var $ = function (id) { return document.getElementById(id); };
  var game = null;          // the account's game state from the server, or null
  var bankOn = true;        // false if the server has no /game yet
  var sure = "";            // the button waiting for a second click
  var drawer = null;        // { kind: "el", n } | { kind: "forge" } | { kind: "bank" }
  var canPlay = true;       // false on a phone or tablet
  var engine = null, started = false, sendTimer = 0, pendingSend = null;
  var play = function () {};   // set below on the full game page

  function track(name, props) { try { if (typeof window.plausible === "function") window.plausible((FULL ? "Velvet Worlds: " : "Velvet Elements: ") + name, props ? { props: props } : undefined); } catch (e) {} }
  function signedIn() { return !!(auth && auth.isLoggedIn()); }
  function wallet() { return (signedIn() && auth.wallet()) || null; }
  function lsGet(k, d) { try { var v = JSON.parse(localStorage.getItem(k) || "null"); return v == null ? d : v; } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function note(text, bad) { var n = $("note"); n.textContent = text || ""; n.className = bad ? "bad" : ""; n.style.display = text ? "block" : "none"; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function vcoin(size) { return (auth && auth._coin) ? auth._coin(size) : ""; }

  /* ---- where an element sits in the table: [row, column]. Rows 1-7 are the periods; rows 9 and 10
     hold elements 58-71 and 90-103. Lanthanum and actinium sit in the main table, as on GCSE data sheets. */
  function pos(n) {
    if (n === 1) return [1, 1];
    if (n === 2) return [1, 18];
    if (n <= 10) return [2, n <= 4 ? n - 2 : n + 8];
    if (n <= 18) return [3, n <= 12 ? n - 10 : n];
    if (n <= 36) return [4, n - 18];
    if (n <= 54) return [5, n - 36];
    if (n <= 56) return [6, n - 54];
    if (n === 57) return [6, 3];
    if (n <= 71) return [9, n - 54];
    if (n <= 86) return [6, n - 68];
    if (n <= 88) return [7, n - 86];
    if (n === 89) return [7, 3];
    if (n <= 103) return [10, n - 86];
    return [7, n - 100];
  }
  window.vwPos = pos;   // read by the automated check

  /* ---- what the player has ---- */
  function ownsEl(n) { var w = wallet(); return !!(w && (w.owned || []).some(function (o) { return o.series === "periodic-table" && o.item === String(n); })); }
  function ownedCount() { var w = wallet(); return w ? (w.owned || []).filter(function (o) { return o.series === "periodic-table"; }).length : 0; }
  function coins() { var w = wallet(); return w ? (w.coins || 0) : 0; }
  function worldOpen(n) { return !!GAME_WORLDS[String(n)] && (ownsEl(n) || n === 1); }   // the Hydrogen world is open to everyone
  function setWorld(id) { if (GAME_WORLDS[id]) { WORLD = String(id); lsSet("vw-world", WORLD); } }
  function inBank() { return !!(signedIn() && game && bankOn); }
  function localFound(id) { id = id || WORLD; var l = lsGet(LS_LOCAL, {}); var w = (l.worlds && l.worlds[id]) || {}; return { p: +w.p || 0, n: +w.n || 0, e: +w.e || 0 }; }
  function setLocalFound(f) { var l = lsGet(LS_LOCAL, {}); l.worlds = l.worlds || {}; l.worlds[WORLD] = f; lsSet(LS_LOCAL, l); }
  function found(id) {
    id = id || WORLD;
    var a = localFound(id), b = (game && game.worlds && game.worlds[id]) || {}, s = GAME_WORLDS[id], o = {};
    ["p", "n", "e"].forEach(function (t) { o[t] = Math.min(s[t], Math.max(a[t], +b[t] || 0)); });
    return o;
  }
  function hand() { var g = inBank() ? game : found(); return { p: g.p || 0, n: g.n || 0, e: g.e || 0 }; }
  function picked() { var p = lsGet(LS_PICK, "blaster-starter"); return ownsWeapon(p) ? p : "blaster-starter"; }
  function ownsWeapon(id) {
    if (id === "blaster-starter") return true;
    if (id === "blaster-supporter") { var w = wallet(); return !!(w && (w.extras || []).some(function (o) { return o.series === "supporter"; })); }
    return !!(game && game.weapons && game.weapons.indexOf(id) > -1);
  }

  /* ---- the accounts server ---- */
  async function api(method, body) {
    if (!signedIn()) return { ok: false, error: "signed-out" };
    var res, data = null;
    try {
      res = await fetch(auth.API + "/game", { method: method, headers: Object.assign({ authorization: "Bearer " + auth.token() }, body ? { "content-type": "application/json" } : {}), body: body ? JSON.stringify(body) : undefined });
    } catch (e) { return { ok: false, error: "network" }; }
    try { data = await res.json(); } catch (e) {}
    if (data && data.game) game = data.game;
    if (res.status === 404 && data && data.error === "not-found") bankOn = false;
    return { ok: res.ok, status: res.status, error: data && data.error, data: data || {} };
  }
  async function refresh() {
    game = null;
    if (!started) { var sv = String(lsGet("vw-world", "1")); WORLD = worldOpen(+sv) ? sv : "1"; }   // back to the world last played, if it is still open
    if (FULL && signedIn()) {
      var r = await api("GET");
      if (r.ok) {   // bank anything found on this device before signing in
        for (var id in GAME_WORLDS) {
          if (!worldOpen(+id)) continue;
          var f = found(id), g = (game.worlds && game.worlds[id]) || { p: 0, n: 0, e: 0 };
          if (f.p > (g.p || 0) || f.n > (g.n || 0) || f.e > (g.e || 0)) await api("POST", { op: "collect", world: id, p: f.p, n: f.n, e: f.e });
        }
      } else if (r.error === "network") note("Could not reach the particle bank. Check your connection and reload.", true);
    }
    render();
  }
  var ERR = {
    "need-particles": "You need more particles for that.", "need-atoms": "You need more atoms for that.",
    "insufficient": "You need more Velvet Coins for that.", "already-owned": "You already have that.",
    "world-locked": "You need this world's element first.", "network": "Could not reach the server. Try again.",
    "signed-out": "Sign in first."
  };
  async function act(body, eventName, props) {
    var r = await api("POST", body);
    sure = "";
    if (r.ok) { note(""); track(eventName, props); if (body.op === "particles" && auth) auth.pull(); }
    else { note(ERR[r.error] || "That did not work. Try again.", true); track("refused", { op: body.op, reason: String(r.error || r.status) }); }
    render();
  }
  async function collectElement(n) {
    var el = ELS[n - 1], r = await auth.buy("periodic-table", String(n));
    if (r.ok) { note(""); track("element collected", { element: el.sym, number: String(n) }); }
    else if (r.error !== "already-owned") { toast(r.error === "insufficient" ? "Not enough coins for " + el.name : "Could not collect " + el.name, true); }
    render();
    if (r.ok) { sfxUnlock(); celebrate(n); sharePrompt(el); }
  }

  /* ---- carried over from the Element Shop: filters, collect sounds, celebration, share prompt ---- */
  var fView = "all", fCat = "all", toastTimer = 0, shareTimer = 0, ac = null;
  function matches(el) {
    if (fCat !== "all" && el.cat !== fCat) return false;
    if (fView === "owned") return ownsEl(el.n);
    if (fView === "afford") return signedIn() && !ownsEl(el.n) && coins() >= el.n;
    return true;
  }
  function buildFilters() {
    var chip = function (group, key, label, color) { var on = (group === "cat" ? fCat : fView) === key; return '<button type="button" class="chip" data-k="f:' + group + ":" + key + '" aria-pressed="' + on + '"' + (color ? ' style="--chipc:' + color + '"' : "") + ">" + label + "</button>"; };
    $("filters").innerHTML = chip("view", "all", "All") + chip("view", "owned", "Collected", "#39ff14") + chip("view", "afford", "Can afford", "#00f0ff") + '<span class="sep"></span>' + chip("cat", "all", "All 118") +
      Object.keys(CATS).map(function (k) { return chip("cat", k, CATS[k].label, CATS[k].color); }).join("");
  }
  function toast(msg, bad) { var t = $("vwToast"); t.textContent = msg; t.className = (bad ? "err " : "") + "show"; clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.className = bad ? "err" : ""; }, 2600); }
  function muted() { try { return localStorage.getItem("aism-arcade-muted") === "1"; } catch (e) { return false; } }
  function tone(freq, dur, type, when, vol) {
    try {
      if (muted()) return; if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === "suspended") ac.resume();
      var t = ac.currentTime + (when || 0), o = ac.createOscillator(), g = ac.createGain(); o.type = type || "square"; o.frequency.value = freq; o.connect(g); g.connect(ac.destination);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.15, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); o.start(t); o.stop(t + dur + 0.03);
    } catch (e) {}
  }
  function sfxClick() { tone(720, 0.07, "square", 0, 0.12); tone(480, 0.09, "square", 0.03, 0.08); }
  function sfxUnlock() { [523.25, 659.25, 783.99, 1046.5].forEach(function (f, i) { tone(f, 0.18, "triangle", i * 0.08, 0.16); }); }
  function celebrate(n) {
    var t = $("t" + n); if (t) { t.classList.add("just"); setTimeout(function () { t.classList.remove("just"); }, 650); }
    var art = document.querySelector("#drawer .art"); if (!art) return;
    for (var i = 0; i < 12; i++) {
      var sp = document.createElement("span"), ang = Math.random() * Math.PI * 2, dist = 30 + Math.random() * 60; sp.className = "spk";
      sp.style.left = (42 + Math.random() * 16) + "%"; sp.style.top = (42 + Math.random() * 16) + "%";
      sp.style.setProperty("--dx", Math.round(Math.cos(ang) * dist) + "px"); sp.style.setProperty("--dy", Math.round(Math.sin(ang) * dist) + "px");
      art.appendChild(sp); (function (s) { setTimeout(function () { s.remove(); }, 760); })(sp);
    }
  }
  function shareUrl(el) { var u = (auth && auth.user()) || ""; return "https://aistudymethod.com/classcraft/arcade/shared.html?el=" + el.n + (u ? "&by=" + encodeURIComponent(u) : ""); }
  async function shareElement(el) {
    var url = shareUrl(el), cat = CATS[el.cat] || {};
    track("share click", { element: el.sym });
    if (window.Arcade && window.Arcade.shareElement) return window.Arcade.shareElement({ sym: el.sym, name: el.name, atomicNumber: el.n, mass: el.mass, state: (el.state || "").replace("*", ""),
      categoryLabel: cat.label, categoryColor: cat.color, fact: el.fact, by: (auth && auth.user()) || "", ownedCount: ownedCount(), total: 118, url: url });
    var msg = "I just unlocked " + el.name + " on the Revision Arcade: " + ownedCount() + "/118 collected! Can you?";
    try { if (navigator.share) { await navigator.share({ title: "Revision Arcade", text: msg, url: url }); return; } } catch (e) { if (e && e.name === "AbortError") return; }
    try { await navigator.clipboard.writeText(msg + " " + url); toast("Share link copied!"); } catch (e) { try { window.open(url, "_blank"); } catch (e2) {} }
  }
  function sharePrompt(el) {
    var sp = $("sharePrompt");
    sp.innerHTML = "<span>You collected <b>" + esc(el.name) + '</b>! Show a friend?</span><button type="button" class="sp-share">Share</button><button type="button" class="sp-x" aria-label="Dismiss">&times;</button>';
    sp.querySelector(".sp-share").onclick = function () { shareElement(el); };
    sp.querySelector(".sp-x").onclick = function () { sp.className = ""; };
    sp.className = "show"; clearTimeout(shareTimer); shareTimer = setTimeout(function () { sp.className = ""; }, 8000);
  }

  /* ---- test feedback (Nov 2026): a short form sent through Formspree without the username, then 100 coins once per account ---- */
  var FORMSPREE = "https://formspree.io/f/mqevgjke", FB_CAMPAIGN = "velvet-test-2026", LS_RUNS = "vw-runs";
  var FB_Q = [
    ["level", "What are you studying?", [["ks3", "KS3"], ["gcse", "GCSE"], ["alevel", "A-level or IB"], ["other", "Something else"]]],
    ["fun", "How much fun was the game?", [["1", "1 &middot; none"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5 &middot; loads"]]],
    ["clear", "How easy was it to work out what to do?", [["1", "1 &middot; very hard"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5 &middot; very easy"]]],
    ["speed", "How did it run on your computer?", [["smooth", "Smoothly"], ["jerky", "A bit jerky"], ["slow", "Too slow to play"]]],
    ["forge", "Did you make a weapon in The Forge?", [["yes", "Yes"], ["stuck", "I tried but got stuck"], ["no", "I did not try"]]],
    ["lessons", "Would you do mini-lessons to earn coins for new worlds?", [["yes", "Yes"], ["maybe", "Maybe"], ["no", "No"]]]
  ];
  var FB_MORE = [["worlds", "More worlds"], ["weapons", "More weapons"], ["monsters", "More kinds of enemy"], ["harder", "Harder levels"], ["easier", "Easier levels"], ["moreq", "More questions"], ["fewerq", "Fewer questions"]];
  var fbAns = {}, fbTicks = {}, fbBusy = false;
  function fbKey() { return "vw-fb:" + ((auth && auth.userId()) || ""); }
  function fbState() { try { return localStorage.getItem(fbKey()) || ""; } catch (e) { return ""; } }      // "" | "sent" | "paid"
  function setFbState(v) { try { localStorage.setItem(fbKey(), v); } catch (e) {} }
  function runs() { var r = lsGet(LS_RUNS, {}); return { runs: +r.runs || 0, wins: +r.wins || 0 }; }
  function browserName() { var u = navigator.userAgent; return /Edg\//.test(u) ? "Edge" : /OPR\//.test(u) ? "Opera" : /Firefox\//.test(u) ? "Firefox" : /Chrome\//.test(u) ? "Chrome" : /Safari\//.test(u) ? "Safari" : "other"; }
  function fbClose() { $("fbModal").classList.remove("show"); }
  function fbRender(done) {
    var m = $("fbModal"), h = '<div class="fbx"><button type="button" class="x" data-k="fbclose" aria-label="Close">&times;</button>';
    if (done) h += "<h2>Thank you!</h2><p>" + done + '</p><div class="row" style="justify-content:center">' + btn("fbclose", "Close", "go") + "</div>";
    else if (!signedIn()) h += "<h2>Tell us what you think</h2><p>Sign in first, so we can add your 100 coins.</p>" + '<div class="row" style="justify-content:center">' + btn("signin", "Sign in or make an account", "go") + "</div>";
    else if (!runs().runs) h += "<h2>Tell us what you think</h2><p>Play a world first, then come back and tell us about it. It takes about a minute, and we add <b>100 coins</b> to your account.</p>" + '<div class="row" style="justify-content:center">' + btn("fbclose", "OK", "go") + "</div>";
    else {
      h += "<h2>Tell us what you think</h2><p class=\"soft\">Six taps and one box. It is sent without your username. Then we add <b>100 coins</b> to your account.</p>";
      FB_Q.forEach(function (q) { h += '<p class="fq">' + q[1] + '</p><div class="chips" role="radiogroup">' + q[2].map(function (o) { return '<button type="button" class="chip" data-k="fa:' + q[0] + ":" + o[0] + '" aria-pressed="' + (fbAns[q[0]] === o[0]) + '">' + o[1] + "</button>"; }).join("") + "</div>"; });
      h += '<p class="fq">What should we add next? <span class="soft">(pick any)</span></p><div class="chips">' + FB_MORE.map(function (o) { return '<button type="button" class="chip" data-k="ft:' + o[0] + '" aria-pressed="' + !!fbTicks[o[0]] + '">' + o[1] + "</button>"; }).join("") + "</div>";
      h += '<p class="fq"><label for="fbText">Anything confusing, broken or missing? Any ideas? <span class="soft">(optional)</span></label></p><textarea id="fbText" maxlength="1500" rows="3"></textarea>';
      h += '<p class="soft" id="fbMsg"></p><div class="row" style="justify-content:center">' + btn("fbsend", "Send and get 100 coins", "go") + "</div>";
    }
    var keep = $("fbText") ? $("fbText").value : "";
    m.innerHTML = h + "</div>"; m.classList.add("show");
    if ($("fbText") && keep) $("fbText").value = keep;
  }
  function fbOpen(where) { if (fbState()) { toast("You have already sent your feedback. Thank you!"); return; } track("feedback opened", { where: where }); fbRender(); }
  async function fbClaim(show) {
    var r = await auth.treat(FB_CAMPAIGN);
    if (r && r.ok) { setFbState("paid"); if (show) fbRender(r.paid ? "Your answers are on their way to us, and <b>" + (r.coins || 100) + " coins</b> have been added to your account." : "Your answers are on their way to us."); render(); return true; }
    if (show) fbRender("Your answers are on their way to us. Your 100 coins will be added the next time you open this page.");
    return false;
  }
  async function fbSend() {
    if (fbBusy) return;
    var missing = FB_Q.filter(function (q) { return !fbAns[q[0]]; });
    if (missing.length) { $("fbMsg").textContent = "Please answer: " + missing[0][1]; return; }
    fbBusy = true; $("fbMsg").textContent = "Sending...";
    var r = runs(), data = { form: "Velvet Worlds test", page: location.pathname, more: Object.keys(fbTicks).filter(function (k) { return fbTicks[k]; }).join(", "), ideas: ($("fbText").value || "").trim(),
      runs: r.runs, wins: r.wins, weapons_made: (game && game.weapons ? game.weapons.length : 0), elements: ownedCount(), weapon_in_hand: picked(), browser: browserName(), screen: window.innerWidth + "x" + window.innerHeight };
    FB_Q.forEach(function (q) { data[q[0]] = fbAns[q[0]]; });
    var ok = false;
    try { var res = await fetch(FORMSPREE, { method: "POST", headers: { "content-type": "application/json", accept: "application/json" }, body: JSON.stringify(data) }); ok = res.ok; } catch (e) {}
    fbBusy = false;
    if (!ok) { $("fbMsg").textContent = "That did not send. Check your connection and try again."; track("feedback failed"); return; }
    setFbState("sent"); track("feedback sent", { fun: data.fun, clear: data.clear, forge: data.forge, lessons: data.lessons, level: data.level });
    await fbClaim(true);
  }

  /* ---- drawing ---- */
  function btn(key, label, cls, disabled) { return '<button type="button" data-k="' + key + '"' + (cls ? ' class="' + cls + '"' : "") + (disabled ? " disabled" : "") + ">" + label + "</button>"; }
  function plural(n, w) { return n + " " + w + (n === 1 ? "" : "s"); }
  function costText(c) { return plural(c.z, "proton") + ", " + plural(c.n, "neutron") + ", " + plural(c.z, "electron"); }
  function recipeText(r) { return Object.keys(r).map(function (s) { return r[s] + " " + BYSYM[s].name.toLowerCase(); }).join(" + "); }
  function partsHtml(v, totals) { return ["p", "n", "e"].map(function (t) { return '<div><b><span class="dot ' + t + '"></span>' + v[t] + (totals ? " / " + totals[t] : "") + "</b>" + PNAME[t] + "</div>"; }).join(""); }

  function buildMap() {
    var h = "", g = { 1: "1", 2: "2", 13: "3", 14: "4", 15: "5", 16: "6", 17: "7", 18: "0" };
    for (var c = 1; c <= 18; c++) h += '<div class="glab" style="grid-area:1 / ' + (c + 1) + '">' + (g[c] || "") + "</div>";
    for (var p = 1; p <= 7; p++) h += '<div class="plab" style="grid-area:' + (p + 1) + ' / 1">' + p + "</div>";
    h += '<div class="gap" style="grid-area:9 / 1 / 10 / 20;height:8px"></div>';
    h += '<div class="fnote" style="grid-row:10">58 to 71</div><div class="fnote" style="grid-row:11">90 to 103</div>';
    ELS.forEach(function (el) {
      var rc = pos(el.n), col = (CATS[el.cat] || {}).color || "#6ab7ff";
      h += '<button type="button" class="tile" id="t' + el.n + '" data-k="el:' + el.n + '" style="grid-area:' + (rc[0] + 1) + " / " + (rc[1] + 1) + ";--c:" + col + '" aria-label="' + esc(el.name) + '"></button>';
    });
    $("map").innerHTML = h;
    $("legend").innerHTML = Object.keys(CATS).map(function (k) { return '<span><i style="background:' + CATS[k].color + '"></i>' + CATS[k].label + "</span>"; }).join("");
    $("coinGlyph").innerHTML = vcoin(26);
  }
  function renderMap() {
    var bal = coins(), si = signedIn();
    ELS.forEach(function (el) {
      var t = $("t" + el.n), own = ownsEl(el.n), cls = "tile";
      if (own) cls += " own"; else if (si && bal >= el.n) cls += " can";
      if (FULL && worldOpen(el.n)) cls += " world";
      if (drawer && drawer.kind === "el" && drawer.n === el.n) cls += " sel";
      if (!matches(el)) cls += " dim";
      var want = (own ? "o" : "x");
      if (t.getAttribute("data-s") !== want) {
        t.setAttribute("data-s", want);
        t.innerHTML = (own ? '<img loading="lazy" alt="" src="' + ART + velvetArtPath(el) + '">' : "") + '<span class="no">' + el.n + '</span><span class="sy">' + el.sym + "</span>";
      }
      t.className = cls;
    });
  }
  function elementPanel(n) {
    var el = ELS[n - 1], cat = CATS[el.cat] || {}, own = ownsEl(n), si = signedIn(), bal = coins(), w = GAME_WORLDS[String(n)], wi = WORLD_INFO[String(n)], h = "";
    h += '<div class="soft">No. ' + el.n + " &middot; " + esc(cat.label || "") + " &middot; " + esc(el.state) + "</div><h2>" + esc(el.name) + "</h2>";
    h += '<div class="art" style="--c:' + (cat.color || "") + '">' + (own ? '<img alt="" src="' + ART + velvetArtPath(el) + '">' : '<span class="q">?</span>') + "</div>";
    h += '<div class="stats"><div><div class="k">Number</div><b>' + el.n + '</b></div><div><div class="k">Mass</div><b>' + esc(el.mass) + '</b></div><div><div class="k">Group</div><b>' + (el.group == null ? "&ndash;" : el.group) + "</b></div></div>";
    if (own) h += "<p>" + esc(el.fact) + "</p>";
    else {
      h += '<p class="soft">Collect this element to see its picture and fact.</p><div class="row">';
      if (!si) h += btn("signin", "Sign in to collect");
      else if (bal >= n) h += btn("buyel:" + n, vcoin(16) + " Collect &middot; " + n, "go");
      else h += btn("", "Price " + n, "", true) + '<span class="soft">Earn ' + (n - bal) + " more coin" + (n - bal === 1 ? "" : "s") + " in lessons or the arcade</span>";
      h += "</div>";
    }
    if (!FULL) return h;
    h += "<h3>Its world</h3>";
    if (w && wi) {
      var f = found(String(n));
      h += "<p><b>" + esc(wi.name) + ".</b> " + esc(wi.mission) + '. <span class="soft">' + esc(wi.spec) + '</span></p><div class="counts">' + partsHtml(f, w) + "</div>";
      h += '<div class="row">' + (worldOpen(n) ? btn("play:" + n, "Play this world", "go", !canPlay) : '<span class="soft">Collect ' + esc(el.name) + " to open it.</span>") + "</div>";
    } else h += '<p class="soft">This world has not been built yet. Worlds are being added one at a time.</p>';
    var a = ATOM_OF[n];
    if (a) {
      var c = GAME_ATOMS[a], have = (inBank() && game.atoms && game.atoms[a]) || 0, hd = hand();
      h += "<h3>" + esc(el.name) + ' atoms</h3><p>One atom of ' + ATOM_ISO[a] + " needs " + costText(c) + '.</p><p class="soft">You have ' + plural(have, "atom") + ".</p>";
      h += '<div class="row">' + (inBank() ? btn("atom:" + a, "Build 1 atom", "", !(hd.p >= c.z && hd.n >= c.n && hd.e >= c.z)) : (si ? '<span class="soft">The particle bank is not switched on yet.</span>' : btn("signin", "Sign in to build atoms"))) + "</div>";
    }
    return h;
  }
  function forgePanel() {
    var ids = ["blaster-starter"].concat(Object.keys(GAME_WEAPONS)), cur = picked(), h = '<h2>The Forge</h2><p class="soft">Bond atoms into a compound to make its weapon. A weapon you make works in every world.</p>';
    if (ownsWeapon("blaster-supporter")) ids.push("blaster-supporter");
    if (inBank()) { var at = game.atoms || {}; h += '<p>Your atoms: ' + Object.keys(GAME_ATOMS).map(function (s) { return "<b>" + (at[s] || 0) + "</b> " + BYSYM[s].name.toLowerCase(); }).join(", ") + ".</p>"; }
    else h += '<div class="row">' + (signedIn() ? '<span class="soft">The particle bank is not switched on yet.</span>' : btn("signin", "Sign in to make weapons")) + "</div>";
    ids.forEach(function (id) {
      var info = WEAPON_INFO[id], r = GAME_WEAPONS[id], mine = ownsWeapon(id), b;
      if (mine) b = id === cur ? btn("", "In your hand", "", true) : btn("pick:" + id, "Use this", "pick");
      else b = btn("make:" + id, "Make it", "", !(inBank() && Object.keys(r).every(function (s) { return ((game.atoms || {})[s] || 0) >= r[s]; })));
      h += '<div class="item' + (id === cur ? " on" : "") + '"><img src="' + BASE + "img/" + id + '.webp" alt="" width="300" height="84"><h4>' + info.name + "</h4>" +
        (r ? '<p><span class="formula">' + info.formula + "</span> &nbsp;" + recipeText(r) + "</p>" : "") + "<p>" + info.blurb + '</p><div class="row">' + b + "</div></div>";
    });
    return h + '<p class="soft" style="margin-top:14px">Build atoms by choosing hydrogen, carbon or oxygen on the map.</p>';
  }
  function bankPanel() {
    var h = '<h2>Particle Bank</h2><p class="soft">Each world hides a fixed number of protons, neutrons and electrons. Find them all, then open another world.</p><div class="counts">' + partsHtml(hand()) + "</div>";
    if (!signedIn()) h += '<p><b>Sign in to keep your particles on your account and build with them.</b> Until then they are kept on this device only.</p><div class="row">' + btn("signin", "Sign in or make an account") + "</div>";
    else if (!inBank()) h += '<p class="soft">The particle bank is not switched on yet. You can still play, and what you find is kept on this device.</p>';
    else {
      var bal = coins(), cost = 5 * PARTICLE_PRICE;
      h += "<h3>Short of a few?</h3><p>A particle costs " + PARTICLE_PRICE + " Velvet Coins. Finding them in a world is free. You have " + bal + ' coins.</p><div class="row">' +
        ["p", "n", "e"].map(function (t) { var k = "buy:" + t; return sure === k ? btn(k, "Spend " + cost + " coins?", "sure") : btn(k, "5 " + PNAME[t].toLowerCase() + " &middot; " + cost, "", bal < cost); }).join("") + "</div>";
    }
    return h;
  }
  function renderDrawer() {
    var d = $("drawer");
    document.body.classList.toggle("vw-drawer", !!drawer);
    if (!drawer) { d.classList.remove("open"); return; }
    d.innerHTML = '<div class="dnav">' + (!FULL ? "" : '<button type="button" data-k="open:forge"' + (drawer.kind === "forge" ? ' class="cur"' : "") + '>The Forge</button><button type="button" data-k="open:bank"' + (drawer.kind === "bank" ? ' class="cur"' : "") + '>Particle Bank</button>') + '<button type="button" class="x" data-k="close" aria-label="Close">&times;</button></div>' + (drawer.kind === "el" ? elementPanel(drawer.n) : drawer.kind === "forge" ? forgePanel() : bankPanel());
    d.classList.add("open");
  }
  function render() {
    var w = wallet(), oc = ownedCount(), hd = hand(), f = found(), s = GAME_WORLDS[WORLD];
    $("hCoins").textContent = w ? (w.coins || 0) : 0;
    $("hOwned").textContent = oc + " / 118"; $("hBar").style.width = (oc / 118 * 100).toFixed(1) + "%";
    $("hCap").innerHTML = !signedIn() ? '<a href="#" data-k="signin">Log in</a> to start collecting. Your coins and elements save to your account.' :
      (w && typeof w.capRemaining === "number" ? "Earnable today: <b>" + w.capRemaining + "</b> / " + (w.dailyCap || 150) + " coins" : "");
    if (FULL) {
      var fs = fbState(); $("fbBtn").style.display = fs ? "none" : ""; if ($("endFb")) $("endFb").style.display = fs ? "none" : "";
      $("hParts").innerHTML = ["p", "n", "e"].map(function (t) { return '<span title="' + PNAME[t] + '"><span class="dot ' + t + '"></span>' + hd[t] + "</span>"; }).join("");
      var wi = WORLD_INFO[WORLD], wel = ELS[+WORLD - 1];
      $("heroLab").textContent = "World " + WORLD + " \u00b7 " + wel.name; $("heroName").textContent = wi.name; $("heroText").innerHTML = wi.hero; $("heroSpec").textContent = wi.spec;
      $("heroArt").src = ART + velvetArtPath(wel);
      $("worldTabs").innerHTML = Object.keys(GAME_WORLDS).map(function (id) {
        var open = worldOpen(+id), e2 = ELS[+id - 1];
        return '<button type="button" data-k="world:' + id + '" class="' + (id === WORLD ? "cur" : "") + (open ? "" : " locked") + '">' + id + " \u00b7 " + esc(WORLD_INFO[id].name) + (open ? "" : ' <span class="soft">\u00b7 collect ' + esc(e2.name) + " to open</span>") + "</button>";
      }).join("");
      $("heroFound").textContent = "Found here: " + f.p + "/" + s.p + " protons, " + f.n + "/" + s.n + " neutrons, " + f.e + "/" + s.e + " electrons";
    }
    renderMap(); renderDrawer();
  }
  document.addEventListener("click", function (ev) {
    var b = ev.target.closest && ev.target.closest("[data-k]"); if (!b || b.disabled) return;
    var k = b.getAttribute("data-k"), parts = k.split(":");
    if (k === "close") { drawer = null; sure = ""; render(); return; }
    if (k === "fb") { fbOpen("lobby"); return; }
    if (k === "fbclose") { fbClose(); return; }
    if (k === "fbsend") { fbSend(); return; }
    if (parts[0] === "fa") { fbAns[parts[1]] = parts[2]; fbRender(); return; }
    if (parts[0] === "ft") { fbTicks[parts[1]] = !fbTicks[parts[1]]; fbRender(); return; }
    if (parts[0] === "open") { drawer = { kind: parts[1] }; sure = ""; track("drawer", { which: parts[1] }); render(); return; }
    if (parts[0] === "el") { drawer = { kind: "el", n: +parts[1] }; sure = ""; render(); return; }
    if (k.indexOf("play:") === 0) { if (worldOpen(+k.slice(5))) { setWorld(k.slice(5)); drawer = null; render(); play(); } return; }
    if (k.indexOf("world:") === 0) { var wn = k.slice(6); if (worldOpen(+wn)) { setWorld(wn); track("world picked", { world: wn }); render(); } else { drawer = { kind: "el", n: +wn }; render(); } return; }
    if (k === "signin") { ev.preventDefault(); track("sign in click"); if (auth) auth.open("register", { source: FULL ? "velvet worlds" : "elements" }); return; }
    if (parts[0] === "pick") { lsSet(LS_PICK, parts[1]); track("weapon chosen", { item: parts[1] }); render(); return; }
    if (parts[0] === "buyel") { b.disabled = true; sfxClick(); collectElement(+parts[1]); return; }
    if (parts[0] === "f") { if (parts[1] === "cat") fCat = parts[2]; else fView = parts[2]; track("filter", { which: parts[2] }); buildFilters(); renderMap(); return; }
    if (parts[0] === "atom") { b.disabled = true; act({ op: "atom", el: parts[1], count: 1 }, "atom built", { el: parts[1] }); return; }
    if (parts[0] === "make") { b.disabled = true; act({ op: "make", item: parts[1] }, "weapon made", { item: parts[1] }); return; }
    if (parts[0] === "buy") {
      if (sure !== k) { sure = k; render(); return; }      // first click asks, second click spends
      var body = { op: "particles", p: 0, n: 0, e: 0 }; body[parts[1]] = 5; b.disabled = true;
      act(body, "particles bought", { kind: parts[1], count: 5 });
    }
  });
  document.addEventListener("keydown", function (ev) { if (ev.key === "Escape" && drawer && !started) { drawer = null; render(); } });

  if (FULL) (function () {
  /* ---- messages from the game (game.gd calls window.vwEvent with a JSON string) ---- */
  function sendFound(now) {
    clearTimeout(sendTimer);
    var go = function () { if (!pendingSend) return; var f = pendingSend; pendingSend = null; if (signedIn() && bankOn) api("POST", { op: "collect", world: WORLD, p: f.p, n: f.n, e: f.e }); };
    if (now) go(); else sendTimer = setTimeout(go, 1500);
  }
  window.vwEvent = function (text) {
    var m; try { m = JSON.parse(text); } catch (e) { return; }
    var p = m.props || {};
    if (m.event === "particles") { var f = { p: +p.p || 0, n: +p.n || 0, e: +p.e || 0 }; setLocalFound(f); pendingSend = f; sendFound(false); }
    else if (m.event === "run_started") { $("endPanel").classList.remove("show"); $("exit").style.display = "none"; track("run started", { blaster: String(p.blaster), signed_in: signedIn() ? "yes" : "no" }); }
    else if (m.event === "run_finished") {
      var rc = runs(); lsSet(LS_RUNS, { runs: rc.runs + 1, wins: rc.wins + (p.result === "win" ? 1 : 0) });
      var f2 = { p: +p.p || 0, n: +p.n || 0, e: +p.e || 0 }; setLocalFound(f2); pendingSend = f2; sendFound(true);
      $("endTitle").textContent = p.result === "win" ? "Collection complete!" : "The " + WORLD_INFO[WORLD].enemies + " got you";
      $("endText").textContent = "Particles found this run: " + (+p.particles_this_run || 0) + ". In this world so far: " + f2.p + " protons, " + f2.n + " neutrons, " + f2.e + " electrons.";
      $("endSave").textContent = signedIn() && bankOn ? "Saved to your account." : "Kept on this device. Sign in to save them to your account.";
      $("endPanel").classList.add("show"); $("exit").style.display = "block";
      var mins = Math.floor((+p.seconds || 0) / 60);
      track("run finished", { result: String(p.result), blaster: String(p.blaster), minutes: mins >= 10 ? "10+" : String(mins), pieces: p.pieces + "/" + p.pieces_total,
        first_try: p.asked ? Math.round(100 * p.right / p.asked / 10) * 10 + "%" : "none", particles: String(+p.particles_this_run || 0) });
    }
  };

  /* ---- starting the game ---- */
  function startState() { return { blaster: picked(), world: WORLD, collected: found() }; }
  
  function fail(msg, code) {
    $("loadTitle").textContent = "The game could not start"; $("loadText").textContent = msg; $("loadBar").style.display = "none"; $("loadRow").style.display = "flex";
    track("load failed", { error: code });
  }
  function loadScript(src) { return new Promise(function (ok, bad) { var s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = function () { bad(new Error("script")); }; document.head.appendChild(s); }); }
  play = async function () {
    if (started) return;
    started = true;
    window.vwState = startState();
    document.body.classList.add("vw-playing");
    $("loadTitle").textContent = "Loading " + WORLD_INFO[WORLD].name + "\u2026";
    $("loadPanel").classList.add("show");
    track("play", { blaster: window.vwState.blaster, world: WORLD, signed_in: signedIn() ? "yes" : "no" });
    var t0 = Date.now(), packUrl = VW_PACK + "?v=" + VW_BUILD;
    var boot = async function (base) {
      if (!window.Engine) await loadScript(base + ".js");
      var missing = window.Engine.getMissingFeatures({ threads: false });
      if (missing.length) { var m = new Error("missing features"); m.missing = missing; throw m; }
      var sizes = {}; sizes[base + ".wasm"] = VW_SIZES.wasm; sizes[packUrl] = VW_SIZES.pck;
      engine = new window.Engine({ canvas: $("canvas"), executable: base, canvasResizePolicy: 2, focusCanvas: true, fileSizes: sizes, args: [],
        onProgress: function (cur, tot) { if (tot > 0) $("loadBar").value = Math.min(100, Math.round(100 * cur / tot)); } });
      await Promise.all([engine.init(base), engine.preloadFile(packUrl, "index.pck")]);
    };
    try {
      var from = "bunny";
      try { await boot(VW_ENGINE); }
      catch (e1) {
        if (e1 && e1.missing) { fail("This browser is missing something the game needs: " + e1.missing.join("; "), "missing features"); return; }
        if (window.console) console.warn("Engine from Bunny failed, trying this site", e1);
        from = "site"; track("engine fallback", { error: String((e1 && e1.message) || e1).slice(0, 80) });
        await boot(VW_ENGINE_SITE);
      }
      await engine.start({ args: ["--main-pack", "index.pck"] });
      $("loadPanel").classList.remove("show");
      $("canvas").focus();
      var secs = Math.round((Date.now() - t0) / 1000);
      track("loaded", { seconds: secs < 5 ? "under 5" : secs < 15 ? "5 to 14" : secs < 40 ? "15 to 39" : "40+", engine: from });
    } catch (e) {
      if (window.console) console.error(e);
      fail("Something went wrong while loading. Check your connection and try again.", String((e && e.message) || e).slice(0, 80));
    }
  };
  $("playBtn").addEventListener("click", play);
  $("againBtn").addEventListener("click", function () {
    window.vwState = startState();
    $("endPanel").classList.remove("show"); $("exit").style.display = "none";
    if (typeof window.vwRestart === "function") window.vwRestart(); else location.reload();
    $("canvas").focus();
  });
  function leave() { sendFound(true); setTimeout(function () { location.reload(); }, 400); }
  $("labBtn").addEventListener("click", leave);
  $("endFb").addEventListener("click", function () { fbOpen("end panel"); });
  $("exit").addEventListener("click", leave);
  // "Leave game" shows whenever the mouse is free during a run (after Esc).
  document.addEventListener("pointerlockchange", function () { if (started && !$("loadPanel").classList.contains("show")) $("exit").style.display = document.pointerLockElement ? "none" : "block"; });
  ["endLesson"].forEach(function (id) { $(id).addEventListener("click", function () { track("lesson link", { where: id === "endLesson" ? "end panel" : "lobby" }); }); });

  /* ---- a keyboard and mouse are needed to play (collecting works anywhere) ---- */
  var fine = !window.matchMedia || window.matchMedia("(pointer: fine)").matches;
  if (!fine || window.innerWidth < 800) {
    canPlay = false;
    $("notComputer").style.display = "flex"; $("playBtn").disabled = true; $("playNote").textContent = "Needs a keyboard and mouse";
    track("not a computer");
    $("tryAnyway").addEventListener("click", function (ev) { ev.preventDefault(); canPlay = true; $("notComputer").style.display = "none"; $("playBtn").disabled = false; $("playNote").textContent = "First load is about 17 MB"; render(); });
  }
  })();

  buildMap();
  buildFilters();
  if (FULL && auth) setTimeout(function () { if (signedIn() && fbState() === "sent") fbClaim(false); }, 2500);   // feedback sent earlier but the coins were not added yet
  if (auth) auth.onChange(function () { if (!started) refresh(); });
  render();
  refresh();
})();
