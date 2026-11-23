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
  /* The game has its own domain, velvetworlds.com (22 Nov 2026). Its page loads this file and sets
     window.AISM_SITE = "https://aistudymethod.com", so that links back to the site are whole addresses.
     On aistudymethod.com AISM_SITE is not set and SITE is "". */
  var SITE = String(window.AISM_SITE || "").replace(/\/+$/, "");
  var GAME_URL = "/velvet-worlds/";   // on aistudymethod.com: the page that sends a student to the game's domain
  document.getElementById("vw-app").innerHTML = "<div class=\"wrap\" id=\"lobby\">\n  <a class=\"back\" href=\"/\">&larr; AI Study Method</a>\n  <header class=\"marquee\">\n    <div class=\"over\">AI STUDY METHOD PRESENTS</div>\n    <h1 id=\"mTitle\">VELVET WORLDS</h1>\n    <div class=\"sub\" id=\"mSub\">COLLECT AN ELEMENT &middot; OPEN ITS WORLD &middot; BUILD YOUR WEAPONS</div>\n  </header>\n\n  <div class=\"hud\">\n    <div class=\"cell start\" id=\"cellPlay\"><button class=\"go\" id=\"playBtn\" type=\"button\">Play</button><div class=\"cap\" id=\"playNote\"></div></div>\n    <div class=\"cell\" id=\"cellCourse\"><div><div class=\"k\">Your course</div><div class=\"coursechip\" id=\"courseChip\"></div></div></div>\n    <div class=\"cell coins\"><span id=\"coinGlyph\" aria-hidden=\"true\"></span><div><div class=\"k\">Velvet Coins</div><div class=\"v\" id=\"hCoins\">0</div></div></div>\n    <div class=\"cell prog\"><div class=\"top\"><span class=\"k\">Elements collected</span><span class=\"v\" id=\"hOwned\">0 / 118</span></div><div class=\"bar\"><i id=\"hBar\"></i></div><div class=\"cap\" id=\"hCap\"></div></div>\n    <div class=\"cell\" id=\"cellParts\"><div><div class=\"k\">Particles</div><div class=\"parts\" id=\"hParts\"></div></div></div>\n    <div class=\"acts\" id=\"acts\"><button type=\"button\" data-k=\"open:forge\">The Forge</button><button type=\"button\" data-k=\"open:shop\">The Shop</button><button type=\"button\" class=\"fbbtn\" data-k=\"fb\" id=\"fbBtn\">Give feedback &middot; +100</button></div>\n  </div>\n\n  <div id=\"note\" role=\"status\"></div>\n\n  <div class=\"cell\" id=\"notComputer\" style=\"display:none;margin-bottom:14px\"><div>\n    <b>The worlds need a computer.</b> You can collect elements here, but playing a world needs a keyboard and a mouse.\n    <a href=\"#\" id=\"tryAnyway\">I am on a computer: let me play</a></div>\n  </div>\n\n  <section class=\"mapcard\">\n    <h2 id=\"mapTitle\">The map</h2>\n    <p class=\"soft\" id=\"mapLead\">Every element is a world. Collect an element with Velvet Coins from mini-lessons and the arcade (price = atomic number). Worlds are being built one at a time.</p>\n    <div class=\"filters\" id=\"filters\" role=\"group\" aria-label=\"Show elements\"></div>\n    <div class=\"map\" id=\"map\" role=\"group\" aria-label=\"Periodic table of worlds\"></div>\n    <div class=\"key\"><span id=\"keyWorld\"><b style=\"color:var(--yellow)\">Glowing</b> = a world you can play</span><span><b style=\"color:var(--yellow)\">Dashed</b> = you can afford it</span><span>Picture = collected</span><span class=\"wideonly\">Numbers above are groups (GCSE: 1 to 7 and 0); numbers at the side are periods</span></div>\n    <div class=\"legend\" id=\"legend\"></div>\n  </section>\n\n  <p class=\"credits\" id=\"credits\">Castle models: KayKit Dungeon Pack. Robots and sand crabs: Quaternius Sci-Fi Essentials Kit. Aliens and monsters: Quaternius Ultimate Monsters, Modular Sci-Fi MegaKit, Cyberpunk Game Kit and Cute Fish Pack. Dinosaurs: Quaternius Animated Dinosaur Pack. People, animals and fish that wander the worlds: Quaternius Ultimate Animated Character Pack, Ultimate Animated Animals, Ultimate Monsters, Cute Animated Monsters, Ultimate Space Kit, Animated Fish, Cute Fish and Easy Animated Enemy packs. Trees and rocks in worlds 5 to 9: Quaternius Stylized Nature MegaKit. Farm: Quaternius Crops, Farm Buildings and Animated Animals packs, Kenney Car Kit. Island models, blasters and sounds: Kenney (kenney.nl). Star positions on the Moon: Yale Bright Star Catalogue. Earth map: Natural Earth. Music: &ldquo;Loopable Dungeon Ambience&rdquo; by JaggedStone; world music from OpenGameArt.org by Thimras, yd, The Cynic Project, congusbongus, Kistol, Cleyton Kauffman, TokyoGeisha, &Eacute;crivain, Zane Little Music, Juhani Junkala, Julie Damsgaard (Spring Spring), Of Far Different Nature, MintoDog, nene, Trex0n and section31. All released under CC0 or in the public domain. Built with Godot. Lanthanum and actinium are shown in the main table, with elements 58 to 71 and 90 to 103 below, as on GCSE data sheets.</p>\n  <p class=\"credits\">Bracketed masses are the mass number of the longest-lived isotope (no stable isotopes exist). A trailing * marks a predicted state: that element has never been observed in bulk. Elements in the middle block and the two lower rows show no group number.</p>\n</div>\n\n<aside id=\"drawer\" aria-label=\"Details\"></aside>\n\n<div id=\"stage\">\n  <canvas id=\"canvas\" tabindex=\"0\">Your browser does not support the canvas tag.</canvas>\n  <button id=\"exit\" type=\"button\">Leave game</button>\n  <div class=\"over\" id=\"loadPanel\"><div class=\"panel\">\n    <h2 id=\"loadTitle\">Loading the castle&hellip;</h2>\n    <p class=\"soft\" id=\"loadText\">The first visit takes longest.</p>\n    <progress id=\"loadBar\" max=\"100\" value=\"0\"></progress>\n    <div class=\"shuttle\" id=\"loadShuttle\" style=\"display:none\" role=\"progressbar\" aria-label=\"Setting the level up\"><i></i></div>\n    <div class=\"row\" id=\"loadRow\" style=\"display:none\"><button type=\"button\" onclick=\"location.reload()\">Back</button></div>\n  </div></div>\n  <div class=\"over\" id=\"endPanel\"><div class=\"panel\">\n    <h2 id=\"endTitle\"></h2>\n    <p id=\"endText\"></p>\n    <p class=\"soft\" id=\"endSave\"></p>\n    <div class=\"row\">\n      <button class=\"go\" type=\"button\" id=\"nextBtn\" style=\"display:none\">Next level</button>\n      <button class=\"go\" type=\"button\" id=\"againBtn\">Play again</button>\n      <button type=\"button\" id=\"labBtn\">Back to the map</button>\n      <button type=\"button\" class=\"fbbtn\" id=\"endFb\">Give feedback &middot; +100 coins</button>\n    </div>\n    <p class=\"soft\" id=\"endLessonRow\" style=\"display:none\"><a id=\"endLesson\" href=\"#\" target=\"_blank\" rel=\"noopener\" data-lesson=\"end panel\"></a></p>\n  </div></div>\n</div>\n<div id=\"fbModal\" class=\"fbm\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Feedback\"></div>\n<div id=\"vwToast\" role=\"status\" aria-live=\"polite\"></div>\n<div id=\"sharePrompt\" role=\"status\" aria-live=\"polite\"></div>\n";
  /* On the game's domain the page sits under a hub (velvetworlds.com/) that lists the game types. The page sets
     window.VW_HUB_URL (the hub's address) and window.VW_GAME_NAME (this game's name there, "Velvet Blaster"). */
  if (SITE) {
    var backLink = document.querySelector("#lobby .back");
    if (backLink) { backLink.href = window.VW_HUB_URL || SITE + "/"; if (window.VW_HUB_URL) backLink.innerHTML = "&larr; Velvet Worlds"; }
    if (FULL && window.VW_HUB_URL) { var overLine = document.querySelector("#lobby .marquee .over"); if (overLine) overLine.textContent = "VELVET WORLDS PRESENTS"; }
    if (FULL && window.VW_GAME_NAME) document.getElementById("mTitle").textContent = String(window.VW_GAME_NAME).toUpperCase();
  }
  if (!FULL) {
    ["cellPlay", "cellCourse", "notComputer", "cellParts", "acts", "stage", "keyWorld", "credits"].forEach(function (id) { var e = document.getElementById(id); if (e) e.remove(); });
    document.getElementById("mTitle").textContent = "VELVET ELEMENTS";
    document.getElementById("mSub").innerHTML = "COLLECT ALL 118 &middot; EARN COINS IN THE ARCADE &middot; PRICE = ATOMIC NUMBER";
    document.getElementById("mapTitle").textContent = "The periodic table";
    document.getElementById("mapLead").textContent = "Collect an element with Velvet Coins from mini-lessons and the arcade. The price is its atomic number. Choose any element to see it.";
    document.getElementById("mapLead").insertAdjacentHTML("beforeend", ' Each element you collect also opens a world in <a href="' + GAME_URL + '">Velvet Worlds</a>, our game for home.');
  }
  /* ---- where the game files are. The engine (index.js, index.wasm, index.audio*.js) is the
     same for every build made with one Godot version; the pack (index.pck) changes per build. */
  var VW_ENGINE_CDN = "https://aistudymethodpullzone.b-cdn.net/velvet-worlds/engine-4.7.2/index";   // Bunny: the heavy engine files
  var VW_ENGINE_SITE = BASE + "game/index";                                                          // the same files on this site, used if Bunny cannot be reached
  var VW_ENGINE = VW_ENGINE_CDN;
  var VW_PACK = BASE + "game/index.pck";
  var VW_BUILD = "20261123e";   // (app.js itself: the ?v= in blaster/index.html)               // change whenever index.pck changes
  var VW_SIZES = { wasm: 39514754, pck: 4853672, worlds: { "2": 3597492, "3": 551780, "4": 2671776, "5": 1430088, "6": 701796, "7": 1806860, "8": 1207880, "9": 2508708, "10": 1539732, "11": 2324860, "12": 983096, "13": 600696, "14": 397124, "15": 440088, "16": 816392, "17": 534904, "18": 268380, "19": 528356, "20": 645480, "21": 410728, "22": 552792, "23": 572656, "24": 1635344 },   // each world after the first has its own pack, fetched when it is opened
    music: { "sailors-chant": 822794, "spacelife-14": 781949, "town-theme": 898921, "lasso-lady": 736725, "snowfall": 490840, "underwater-theme": 1079810, "creepy": 946048, "midnight-drive": 947137, "carnival-rides": 271701, "rhythm-factory": 1174949, "chiptune-level-1": 870810, "factory-ambiance": 952644, "fire-level": 966584, "funky-house": 786640, "joyful-jungle": 1074353, "mysterious": 965289, "beach-sports-theme": 375654, "hyperflight-racing": 665883, "fridge-is-hungry": 915000, "winning-the-race": 1107855 } };   // bytes of each world music track (game/music/<name>.ogg)
  /* The music each world plays (worlds 1 and 6 use the track inside the main pack). The names must match "music" in the
     game's WORLDS table (game.gd); _dev/velvet-worlds/check_music.py compares the two and the files. A track is a plain
     Ogg file fetched with the world that uses it, so a track shared by two worlds is downloaded once. */
  /* Harmless characters ("friends"): people, animals and fish that wander a world. Each play draws three kinds from the
     world's pool and fetches one small pack for each (game/friends/friend-<Kind>.pck); the game sets down two of each
     (friends.gd in the game). A kind must never be a model that is an enemy in any world. */
  var WORLD_FRIENDS = {"1": ["Wizard", "Chef_Male", "Cat", "Chicken", "Donkey"], "2": ["Pirate_Male", "Pirate_Female", "Dog", "Chicken", "Pigeon"], "3": ["Astronaut_BarbaraTheBee", "Astronaut_FernandoTheFlamingo", "Astronaut_FinnTheFrog", "Astronaut_RaeTheRedPanda"], "4": ["Bull", "Donkey", "Horse_White", "Chicken", "ShibaInu", "Cowboy_Male", "Cowboy_Female"], "5": ["Cowboy_Male", "Cowboy_Female", "Fox", "Donkey", "Bull", "Stag"], "6": ["Wizard", "Cat", "Rat", "Fox"], "7": ["Penguin", "Husky", "Wolf", "Stag", "Deer"], "8": ["Koi", "Puffer", "Goldfish", "Betta", "Cowfish", "ButterflyFish", "Dolphin"], "9": ["Deer", "Fox", "Stag", "Pigeon", "Rat"], "10": ["Suit_Male", "Suit_Female", "Casual2_Female", "Casual3_Male", "Cat", "Pigeon"], "11": ["Worker_Male", "Chef_Male", "Pigeon", "Cat", "Dog", "Rat"], "12": ["Casual_Male", "Casual_Female", "OldClassy_Female", "Casual2_Male", "ShibaInu", "Chicken"], "13": ["Worker_Male", "Worker_Female", "Dog", "Rat", "Cat"], "14": ["Suit_Male", "Suit_Female", "Casual3_Female", "Cat"], "15": ["Worker_Male", "Worker_Female", "Cat", "Rat", "Pigeon"], "16": ["Fox", "Wolf", "Donkey", "Stag"], "17": ["Casual2_Male", "Casual3_Female", "Casual_Female", "Penguin", "Dog"], "18": ["Worker_Female", "Worker_Male", "Cat", "Dog"], "19": ["Deer", "Stag", "Fox", "Chicken", "Pigeon"], "20": ["Apatosaurus", "Parasaurolophus", "Stegosaurus", "Worker_Male", "Dog"], "21": ["Casual_Male", "Casual2_Female", "Casual3_Male", "OldClassy_Male", "Pigeon", "ShibaInu"], "22": ["Worker_Male", "Suit_Female", "Pigeon", "Dog", "Fox"], "23": ["Worker_Female", "Worker_Male", "Cat", "Rat", "Chicken"], "24": ["Worker_Male", "Worker_Female", "Cat", "Husky"]};
  var FRIEND_SIZES = {"Apatosaurus": 237692, "Astronaut_BarbaraTheBee": 313908, "Astronaut_FernandoTheFlamingo": 296496, "Astronaut_FinnTheFrog": 315664, "Astronaut_RaeTheRedPanda": 303176, "Betta": 137248, "Bull": 259680, "ButterflyFish": 132912, "Casual2_Female": 283584, "Casual2_Male": 199392, "Casual3_Female": 325328, "Casual3_Male": 237072, "Casual_Female": 282096, "Casual_Male": 277644, "Cat": 108068, "Chef_Male": 253640, "Chicken": 124164, "Cowboy_Female": 285184, "Cowboy_Male": 198860, "Cowfish": 131380, "Deer": 232416, "Dog": 98836, "Dolphin": 91684, "Donkey": 252656, "Fox": 231980, "Goldfish": 140376, "Horse_White": 262956, "Husky": 231760, "Koi": 136908, "OldClassy_Female": 290040, "OldClassy_Male": 252688, "Parasaurolophus": 183668, "Penguin": 229292, "Pigeon": 111520, "Pirate_Female": 350848, "Pirate_Male": 190172, "Puffer": 164640, "Rat": 283532, "ShibaInu": 221736, "Stag": 281296, "Stegosaurus": 254332, "Suit_Female": 286700, "Suit_Male": 280168, "Wizard": 278544, "Wolf": 237568, "Worker_Female": 261488, "Worker_Male": 182348};
  var curFriends = [];
  function drawFriends() { var pool = (WORLD_FRIENDS[WORLD] || []).slice(), out = []; while (pool.length && out.length < 3) out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]); return out; }
  var WORLD_MUSIC = { "2": "sailors-chant", "3": "spacelife-14", "4": "town-theme", "5": "lasso-lady", "7": "snowfall", "8": "underwater-theme", "9": "creepy", "10": "midnight-drive", "11": "sailors-chant", "12": "carnival-rides", "13": "rhythm-factory", "14": "chiptune-level-1", "15": "factory-ambiance", "16": "fire-level", "17": "funky-house", "18": "rhythm-factory", "19": "joyful-jungle", "20": "mysterious", "21": "beach-sports-theme", "22": "hyperflight-racing", "23": "fridge-is-hungry", "24": "winning-the-race" };

  /* ---- these four tables must match the accounts server (game-test.mjs checks them) ---- */
  var GAME_WORLDS = {
    "1": { p: 14, n: 10, e: 14 },
    "2": { p: 14, n: 12, e: 14 },
    "3": { p: 15, n: 13, e: 15 },
    "4": { p: 15, n: 14, e: 15 },
    "5": { p: 16, n: 14, e: 16 },
    "6": { p: 16, n: 15, e: 16 },
    "7": { p: 17, n: 15, e: 17 },
    "8": { p: 17, n: 16, e: 17 },
    "9": { p: 18, n: 16, e: 18 },
    "10": { p: 18, n: 17, e: 18 },
    "11": { p: 19, n: 17, e: 19 },
    "12": { p: 19, n: 18, e: 19 },
    "13": { p: 20, n: 18, e: 20 },
    "14": { p: 20, n: 19, e: 20 },
    "15": { p: 21, n: 19, e: 21 },
    "16": { p: 21, n: 20, e: 21 },
    "17": { p: 22, n: 20, e: 22 },
    "18": { p: 22, n: 21, e: 22 },
    "19": { p: 23, n: 21, e: 23 },
    "20": { p: 23, n: 22, e: 23 },
    "21": { p: 24, n: 22, e: 24 },
    "22": { p: 24, n: 23, e: 24 },
    "23": { p: 25, n: 23, e: 25 },
    "24": { p: 25, n: 24, e: 25 },
  };
  var GAME_ATOMS = {
    H: { z: 1, n: 0 },
    C: { z: 6, n: 6 },
    O: { z: 8, n: 8 },
    Mg: { z: 12, n: 12 },
    N: { z: 7, n: 7 },
    Na: { z: 11, n: 12 },
    S: { z: 16, n: 16 },
    Cl: { z: 17, n: 18 },
  };
  var GAME_ATOM_NEEDS = { Mg: "12", N: "7", Na: "11", S: "16", Cl: "17" };   // an atom only an account owning its element can build
  var GAME_WEAPONS = {
    "weapon-methane": { C: 1, H: 4 },
    "weapon-water": { H: 2, O: 1 },
    "weapon-glucose": { C: 6, H: 12, O: 6 },
    "weapon-co2": { C: 1, O: 2 },
    "weapon-h2s": { H: 2, S: 1 },
    "weapon-nacl": { Na: 1, Cl: 1 },
    "weapon-h2so4": { H: 2, S: 1, O: 4 },
    "weapon-epibatidine": { C: 11, H: 13, Cl: 1, N: 2 },
    "weapon-capsaicin": { C: 18, H: 27, N: 1, O: 3 },
  };
  var PARTICLE_PRICE = 2;
  // The Shop (Nov 2026): the same table as GAME_ITEMS on the accounts server. Never rename an id.
  var GAME_ITEMS = {
    "item-pop": { recipe: { H: 2 }, makes: 1 },
    "item-flash": { recipe: { Mg: 1 }, makes: 5 },
    "boost-ammo": { price: 5 },
    "boost-shield": { price: 10 },
    "boost-life": { price: 15 },
    "look-shot-red": { price: 50, keep: true },
    "look-shot-lime": { price: 50, keep: true },
    "look-shot-cyan": { price: 50, keep: true },
    "look-shot-violet": { price: 50, keep: true },
    "look-shot-pink": { price: 50, keep: true },
    "look-shot-white": { price: 50, keep: true },
    "look-pop-confetti": { price: 100, keep: true },
    "look-pop-stars": { price: 100, keep: true },
    "look-pop-bubbles": { price: 100, keep: true },
    "look-skin-crimson": { price: 150, keep: true },
    "look-skin-ocean": { price: 150, keep: true },
    "look-skin-emerald": { price: 150, keep: true },
    "look-skin-gold": { price: 300, keep: true },
  };
  var ITEM_HOLD_MAX = 99;                      // the most of one used-up item an account can hold (as on the server)
  var CARRY_MAX = { "item-pop": 3, "item-flash": 2 };   // the most taken into one run (as in the game: player.gd)

  /* ---- courses: the worlds are the same for everyone; the mission pack (pieces, final task, questions)
     changes with the course. Packs are built from the site's banks by _dev/velvet-worlds/build_packs.py
     into /velvet-worlds/packs/<library>/ (index.json lists the worlds that have a pack; wN.json is the pack). ---- */
  var PACKS = BASE + "packs/", PACKS_V = "20261122c", LS_COURSE = "vw-course", LS_WINS = "vw-wins";
  var LEVELS = [
    { id: "ks3", label: "KS3", subjects: { chemistry: "ks3-science" }, note: "Chemistry topics only so far." },
    { id: "gcse", label: "GCSE", subjects: { biology: "gcse-biology", chemistry: "gcse-chemistry", physics: "gcse-physics" }, boards: [["aqa", "AQA"], ["other", "Another board"]], tiers: [["foundation", "Foundation"], ["higher", "Higher"]],
      note: "These questions follow the AQA specifications. Much of the content is shared with other boards, but some of it will differ from yours." },
    { id: "ib", label: "IB Diploma", subjects: { biology: "ib-biology", chemistry: "ib-chemistry", physics: "ib-physics" }, tiers: [["foundation", "SL"], ["higher", "HL"]] },
    { id: "alevel", label: "A-level", subjects: { biology: "alevel-biology", chemistry: "alevel-chemistry", physics: "alevel-physics" }, boardLibs: true,
      boards: [["aqa", "AQA"], ["ocr", "OCR A"], ["edexcel", "Edexcel"], ["eduqas", "Eduqas"], ["ccea", "CCEA"]] },   // one library per board: alevel-<subject>-<board>
    { id: "ap", label: "AP", subjects: { biology: "ap-biology", chemistry: "ap-chemistry", "physics-1": "ap-physics-1", "physics-2": "ap-physics-2", "physics-c-mechanics": "ap-physics-c-mechanics", "physics-c-em": "ap-physics-c-em" } }
  ];
  var SUBJECT_NAMES = { biology: "Biology", chemistry: "Chemistry", physics: "Physics", "physics-1": "Physics 1", "physics-2": "Physics 2", "physics-c-mechanics": "Physics C: Mechanics", "physics-c-em": "Physics C: E&M" };
  var LS_STARS = "vw-stars";   // the best grade (1 bronze, 2 silver, 3 gold) per course library and world, on this device; levels 2 and 3 under "world.2" and "world.3"
  /* Levels (19 Nov 2026): a world has up to three levels, one star for each, and the star is bronze, silver or gold.
     VW_LEVELS lists the worlds whose levels 2 and 3 are built, with the kind of challenge of each (the game's
     maps_wings.gd; tools/build_wings.py prints this line); every other world has level 1 only.
     KINDS (22 Nov 2026): the name of each kind, what the player does, and the tip shown while the game loads. */
  var VW_LEVELS = { "4": ["search", "boss"], "5": ["gauntlet", "boss"], "6": ["hunt", "waves"], "7": ["gauntlet", "rescue"], "8": ["hunt", "boss"], "12": ["hunt", "boss"], "13": ["gauntlet", "boss"], "16": ["hunt", "boss"], "20": ["hunt", "boss"], "22": ["gauntlet", "boss"] };
  var KINDS = {
    hunt: ["Hunt", "enemies in the new wing carry the pieces", "go through the open gate into the new wing. The enemies with a green cube over them carry the pieces: pop them and pick the pieces up."],
    search: ["Search", "the pieces are hidden in crates in the new wing", "go through the open gate into the new wing. The pieces are hidden inside some of the crates there: break the crates open to find them."],
    gauntlet: ["Gauntlet", "the pieces lie deep in the new wing", "go through the open gate into the new wing. The pieces lie at its far side: get through to them."],
    waves: ["Waves", "survive three waves in the far wing", "go through both gates to the far wing. Three waves come, and pieces arrive each time you clear one."],
    boss: ["Boss", "a boss in the far wing holds every piece", "go through both gates to the far wing. A boss holds every piece and drops one each time you wear it down. It calls for help twice."],
    rescue: ["Rescue", "free the friends locked in pens in the far wing", "go through both gates to the far wing. Friends are locked in pens: shoot the gold lock on each pen and the friend hands over pieces. Opening a pen sets off an alarm."]
  };
  function kindOf(n, level) { var k = VW_LEVELS[String(n)]; return (level > 1 && k && KINDS[k[level - 2]]) || null; }
  function levelName(n, level) { var k = kindOf(n, level); return level === 1 ? "Find the pieces" : k ? k[0] + ": " + k[1] : level === 2 ? "A new wing opens" : "The far wing opens"; }
  var LEVEL = 1;   // the level being played
  var GRADES = ["", "Bronze", "Silver", "Gold"];
  var BAKED_LIB = "gcse-chemistry";   // this course's first worlds are built into the game (WORLD_INFO gives their mission)
  var course = normCourse(lsGet(LS_COURSE, null)), courseIndex = null, courseIndexFor = "", curPack = null, packTaken = false;

  /* ---- the worlds that exist so far (key = atomic number) ---- */
  var WORLD_INFO = {
    "1": { name: "The Castle", mission: "Collect the reactivity series", spec: "AQA GCSE Chemistry (8462), 4.4.1.2", enemies: "robots",
      hero: "Collect the eight metals of <b>the reactivity series</b> and put them in order. Search every corner for hidden particles." },
    "2": { name: "Pirate Island", mission: "Collect the noble gases", spec: "AQA GCSE Chemistry (8462), 4.1.2.4", enemies: "sand crabs",
      hero: "Collect the six <b>noble gases</b> and put them in order of boiling point. Sand crabs lie buried in the beach, and particles are hidden all over the island." },
    "3": { name: "The Moon", mission: "Collect the alkali metals", spec: "AQA GCSE Chemistry (8462), 4.1.2.5", enemies: "aliens",
      hero: "Collect five <b>alkali metals</b> and put them in order of reactivity. Gravity is one sixth of Earth's, so jump for the particles floating overhead. The stars are in their real places." },
    "4": { name: "The Farm", mission: "Collect the story of the atom", spec: "AQA GCSE Chemistry (8462), 4.1.1.3", enemies: "monsters",
      hero: "Collect six ideas about <b>the model of the atom</b> and put them in the order they were developed. Mushroom monsters and giant bees have moved in among the crops. The cows are friendly." },
    "5": { name: "Borax Canyon", mission: "Collect six formulas by relative formula mass", spec: "AQA GCSE Chemistry (8462), 4.3.1.2", enemies: "cactus monsters",
      hero: "Collect six formulas and put them in order of <b>relative formula mass</b>. Quicksand slows you down; the mine rails speed you up. Something with claws guards the canyon." },
    "6": { name: "The Crystal Cave", mission: "Collect five numbers about carbon", spec: "AQA GCSE Chemistry (8462), 4.2.3", enemies: "cave creatures",
      hero: "Collect five numbers about <b>diamond, graphite and Buckminsterfullerene</b> and put them in order. It is dark: your torch and the glowing crystals are the only light." },
    "7": { name: "The Frozen Tundra", mission: "Collect the history of the atmosphere", spec: "AQA GCSE Chemistry (8462), 4.9.1", enemies: "yetis",
      hero: "Collect six events in <b>the history of the Earth's atmosphere</b> and put them in order. The ice is slippery, and the yetis know it." },
    "8": { name: "The Coral Reef", mission: "Collect four substances by reactivity", spec: "AQA GCSE Chemistry (8462), 4.4.1.3", enemies: "fish",
      hero: "Collect gold, iron, carbon and aluminium and put them in order of reactivity, using <b>how each metal is extracted</b>. You are underwater: watch your air and refill it at the bubble vents." },
    "9": { name: "The Toxic Swamp", mission: "Collect the halogens", spec: "AQA GCSE Chemistry (8462), 4.1.2.6", enemies: "slimes",
      hero: "Collect five <b>halogens</b> and put them in order of reactivity. The green pools burn, and every slime you pop splits in two." },
    "10": { name: "Neon City", mission: "Collect five sizes, nucleus to dust", spec: "AQA GCSE Chemistry (8462), 4.1.1.5 and 4.2.4.1", enemies: "ninjas",
      hero: "Collect five things, from the nucleus of an atom to a speck of dust, and put them in <b>order of size</b>. Jump pads throw you onto the roofs, where some particles are hidden." },
    "11": { name: "The Harbour", mission: "Collect five ions and atoms by charge", spec: "AQA GCSE Chemistry (8462), 4.2.1.2", enemies: "crabs",
      hero: "Collect four ions and an atom and put them in order of <b>charge</b>. The tide floods the channels and drains them again, so short cuts open and close." },
    "12": { name: "The Night Fair", mission: "Collect the steps for making a salt", spec: "AQA GCSE Chemistry (8462), 4.4.2.3", enemies: "demons",
      hero: "Collect the five steps for <b>making a pure, dry sample of a soluble salt</b> and put them in order. The demons come in three waves." },
    "13": { name: "The Scrapyard", mission: "Collect the steps for extracting aluminium", spec: "AQA GCSE Chemistry (8462), 4.4.3.3", enemies: "scrap robots",
      hero: "Collect five steps in <b>the extraction of aluminium by electrolysis</b> and put them in order. Conveyor belts carry you along whether you like it or not." },
    "14": { name: "Inside the Computer", mission: "Collect four molecules by number of bonds", spec: "AQA GCSE Chemistry (8462), 4.2.1.4", enemies: "glitch bugs",
      hero: "Collect four molecules and put them in order of <b>the number of covalent bonds</b> in each. Teleport pads come in pairs: step on one and you arrive at the other." },
    /* Worlds 15 onwards have no mission of their own: every course, AQA GCSE Chemistry included, plays its pack there. tip = the world's twist. */
    "15": { name: "The Match Works", enemies: "demons", tip: "Fire strips flare up every few seconds: cross when they are out." },
    "16": { name: "The Volcano", enemies: "rock creatures", tip: "Lava burns. Steam vents throw you into the air, where some particles hang." },
    "17": { name: "The Water Park", enemies: "pool pests", tip: "Water slides carry you along." },
    "18": { name: "The Welding Shop", enemies: "robots", tip: "The lights cut out every few seconds. Your torch comes on when they do." },
    "19": { name: "The Banana Jungle", enemies: "jungle creatures", tip: "Mud slows you down. Vine pads throw you up to the particles overhead." },
    "20": { name: "The Bone Dig", enemies: "dinosaurs", tip: "The dinosaurs come in three waves." },
    "21": { name: "The Stadium at Night", enemies: "pitch invaders", tip: "Sprint along the running track to move faster." },
    "22": { name: "The Airfield", enemies: "drones", tip: "Jet engines blow in gusts and push you across the wind lanes." },
    "23": { name: "The Spring Works", enemies: "orcs", tip: "Spring pads throw you onto the machines, where some particles are hidden." },
    "24": { name: "The Chrome Garage", enemies: "shell robots", tip: "Cars cross the two lanes: look before you step out." }
  };
  var WORLD = "1";                               // the world being played (chosen in an element's panel, or by the top bar's Play / Continue)
  var ATOM_OF = { 1: "H", 6: "C", 7: "N", 8: "O", 11: "Na", 12: "Mg", 16: "S", 17: "Cl" };      // atomic number -> key in GAME_ATOMS
  var ATOM_ISO = { H: "hydrogen-1", C: "carbon-12", O: "oxygen-16", Mg: "magnesium-24", N: "nitrogen-14", Na: "sodium-23", S: "sulfur-32", Cl: "chlorine-35" };
  // The Shop's words. `swatch` is the colour shown beside a look (the game holds the same colours: game.gd).
  var SHOP_INFO = {
    "item-pop": { name: "Hydrogen Pop", formula: "H<sub>2</sub>", blurb: "Throw it. Everything close to where it goes off takes 3 hits, and crates break. Hydrogen gas burns with a squeaky pop: that is the test for it." },
    "item-flash": { name: "Magnesium Flash", formula: "Mg", blurb: "Throw it. Enemies near the flash are stunned for 4 seconds (a boss for less). Magnesium burns with a bright white flame." },
    "boost-ammo": { name: "Ammo pack", blurb: "Start the run with 20 more ammo." },
    "boost-shield": { name: "Shield", blurb: "Takes the first 50 damage of the run." },
    "boost-life": { name: "Extra life", blurb: "Once in the run, come back at half health." },
    "look-shot-red": { name: "Red shots", swatch: "#ff4033" }, "look-shot-lime": { name: "Lime shots", swatch: "#99ff40" }, "look-shot-cyan": { name: "Cyan shots", swatch: "#4df2ff" },
    "look-shot-violet": { name: "Violet shots", swatch: "#b373ff" }, "look-shot-pink": { name: "Pink shots", swatch: "#ff80cc" }, "look-shot-white": { name: "White shots", swatch: "#ffffff" },
    "look-pop-confetti": { name: "Confetti pop", swatch: "linear-gradient(90deg,#ff4d59,#ffcc33,#59d966,#4d99ff,#cc73ff)" }, "look-pop-stars": { name: "Star pop", swatch: "#ffe64d" }, "look-pop-bubbles": { name: "Bubble pop", swatch: "#b3e6ff" },
    "look-skin-crimson": { name: "Crimson blaster", swatch: "#cc1f29" }, "look-skin-ocean": { name: "Ocean blaster", swatch: "#1a73d9" }, "look-skin-emerald": { name: "Emerald blaster", swatch: "#1ab366" }, "look-skin-gold": { name: "Gold blaster", swatch: "#ffc733" }
  };
  var LOOK_GROUPS = [["shot", "Shot colours", "The colour of your shots."], ["pop", "Pop effects", "What you see when an enemy pops."], ["skin", "Blaster skins", "The colour of the blaster in your hand."]];
  var LS_LOOKS = "vw-looks", LS_BOOSTS = "vw-boosts";   // the looks in use {shot, pop, skin} and the boosts ticked for the next run, on this device
  var WEAPON_INFO = {
    "blaster-starter": { name: "Starter Blaster", blurb: "Yours from the start. 20 ammo." },
    "weapon-methane": { name: "Methane Flare", formula: "CH<sub>4</sub>", blurb: "Fires nearly twice as fast." },
    "weapon-water": { name: "Water Cannon", formula: "H<sub>2</sub>O", blurb: "Starts with 40 ammo and carries 90." },
    "weapon-glucose": { name: "Glucose Gun", formula: "C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>", blurb: "One shot pops most enemies; the biggest take more. Slow, and each shot uses 2 ammo." },
    "weapon-capsaicin": { name: "Chilli Cannon", formula: "C<sub>18</sub>H<sub>27</sub>NO<sub>3</sub>", blurb: "Fires chillies in an arc. A hit makes the enemy overheat: for 3 seconds it runs about, cannot hurt you and loses health. Each shot uses 2 ammo." },
    // soon: the server knows the recipe, but the game does not have the gun yet, so it cannot be made from here.
    "weapon-epibatidine": { name: "Frog Launcher", formula: "C<sub>11</sub>H<sub>13</sub>ClN<sub>2</sub>", soon: true },
    "weapon-h2so4": { name: "Acid Sprayer", formula: "H<sub>2</sub>SO<sub>4</sub>", soon: true },
    "weapon-nacl": { name: "Salt Scatter", formula: "NaCl", soon: true },
    "weapon-co2": { name: "Dry Ice Blaster", formula: "CO<sub>2</sub>", soon: true },
    "weapon-h2s": { name: "Rotten Egg Blaster", formula: "H<sub>2</sub>S", soon: true },
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

  /* ---- the course the player is studying ---- */
  function levelOf(id) { for (var i = 0; i < LEVELS.length; i++) if (LEVELS[i].id === id) return LEVELS[i]; return null; }
  function normCourse(c) {
    c = c || {};
    var lv = levelOf(c.level);
    if (!lv || lv.soon) lv = levelOf("gcse");
    var subject = lv.subjects[c.subject] ? c.subject : (lv.subjects.chemistry ? "chemistry" : Object.keys(lv.subjects)[0]);
    return { level: lv.id, subject: subject, board: lv.boards ? (lv.boards.some(function (b) { return b[0] === c.board; }) ? c.board : lv.boards[0][0]) : "", tier: lv.tiers ? (c.tier === "higher" ? "higher" : "foundation") : "", chosen: !!c.chosen };
  }
  function courseLib() { var lv = levelOf(course.level), lib = lv.subjects[course.subject]; return lv.boardLibs ? lib + "-" + course.board : lib; }
  function boardLabel() { var lv = levelOf(course.level), b = lv.boards && lv.boards.filter(function (x) { return x[0] === course.board; })[0]; return b ? b[1] : ""; }
  /* Stars for a won run: one for winning, one for the final task right first time, one for at least 80% of questions right first time. */
  function starsFor(p) { return p.result !== "win" ? 0 : 1 + (+p.attempts === 1 ? 1 : 0) + (+p.asked > 0 && +p.right / +p.asked >= 0.8 ? 1 : 0); }
  function starKey(n, level) { return String(n) + (level > 1 ? "." + level : ""); }
  function starsAt(n, level) {   // the grade on this device or on the account, whichever is better
    var a = lsGet(LS_STARS, {})[courseLib()], srv = game && (level === 1 ? game.stars : game["stars" + level]), b = srv && srv[courseLib()];
    return Math.max((a && +a[starKey(n, level)]) || 0, (b && +b[String(n)]) || 0);
  }
  function gradeAt(n, level) { return starsAt(n, level) || (level === 1 && wonHere(n) ? 1 : 0); }   // a win from before stars were kept counts as bronze
  function levelsOf(n) { return VW_LEVELS[String(n)] ? 3 : 1; }
  function levelOpen(n, level) { return level === 1 || (level <= levelsOf(n) && gradeAt(n, level - 1) > 0); }   // each level opens when the one before is finished
  function levelPack(n, level) { var lp = courseIndex && courseIndex.levelPacks && courseIndex.levelPacks[String(n)]; return !!(level > 1 && lp && lp.indexOf(level) >= 0); }   // does this course have its own pack for this level?
  /* The top bar's Play / Continue (19 Nov 2026, when the lobby box went): the first level not yet finished, going through the
     open worlds in order; when everything open is finished, the world last played. null if no open world has anything for this course. */
  function nextPlay() {
    var ids = Object.keys(GAME_WORLDS).filter(function (id) { return worldOpen(+id) && !!missionFor(+id); });
    if (!ids.length) return null;
    var fresh = !ids.some(function (id) { return gradeAt(+id, 1) > 0; });
    for (var i = 0; i < ids.length; i++) for (var L = 1; L <= levelsOf(+ids[i]); L++) if (!gradeAt(+ids[i], L)) return { world: ids[i], level: L, fresh: fresh };
    var last = String(lsGet("vw-world", ids[0]));
    return { world: ids.indexOf(last) >= 0 ? last : ids[0], level: 1, fresh: false };
  }
  function newPlayer() {   // has never won a world, in any course: Hydrogen is marked "Start here"
    var w = lsGet(LS_WINS, {}), g = (game && game.wins) || {};
    return ![w, g].some(function (o) { return Object.keys(o).some(function (lib) { return Object.keys(o[lib] || {}).length > 0; }); });
  }
  function starHtml(g) { return '<span class="lstar g' + g + '">' + (g ? "\u2605" : "\u2606") + '</span><span class="soft">' + (g ? GRADES[g] : "No star yet") + "</span>"; }
  function courseName() {
    var lv = levelOf(course.level), t = lv.tiers && lv.tiers.filter(function (x) { return x[0] === course.tier; })[0];
    return (lv.id === "gcse" && course.board === "aqa" ? "AQA " : lv.id === "alevel" ? boardLabel() + " " : "") + lv.label + " " + (lv.id === "ks3" ? "Science" : SUBJECT_NAMES[course.subject]) + (t ? " \u00b7 " + t[1] : "") + (lv.id === "gcse" && course.board !== "aqa" ? " \u00b7 AQA questions" : "");
  }
  function setCourse(change) {
    course = normCourse(Object.assign({}, course, change, { chosen: true }));
    lsSet(LS_COURSE, course);
    saveCourse();
    track("course chosen", { course: courseLib(), tier: course.tier || "none", board: course.board || "none" });
    loadCourseIndex();
  }
  function loadCourseIndex() {
    var lib = courseLib();
    if (courseIndexFor === lib) return;
    courseIndexFor = lib; courseIndex = null;
    fetch(PACKS + lib + "/index.json?v=" + PACKS_V).then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
      .then(function (data) { if (courseIndexFor === lib) { courseIndex = data; render(); } })
      .catch(function () { if (courseIndexFor === lib) { courseIndex = { name: "", worlds: {}, failed: true }; render(); } });
  }
  /* What world n holds for the chosen course: { title, spec, hero, baked }, or null if it has nothing yet. */
  function missionFor(n) {
    var id = String(n), wi = WORLD_INFO[id], lib = courseLib();
    if (!wi) return null;
    if (lib === BAKED_LIB && wi.spec) return { title: wi.mission, spec: wi.spec, hero: wi.hero, baked: true };
    var w = courseIndex && courseIndex.worlds && courseIndex.worlds[id];
    if (!w) return null;
    return { title: "Match the key terms: " + w.title, spec: courseIndex.name + ", " + w.spec, baked: false,
      hero: "Find the four key terms of <b>" + esc(w.title) + "</b> and match each one to its definition at the base. Answer questions at the terminals for ammo and health." + (wi.tip ? " " + esc(wi.tip) : "") };
  }
  /* "Learn it first": the mini-lessons that teach world n for the chosen course, as [{url, lesson, mission, title}].
     _dev/velvet-worlds/build_lesson_links.py writes them into each library's index.json (lessons; lessonsHL for IB HL pages;
     bakedLessons for the worlds whose mission is built into the game). mission is null where only the lesson could be shown,
     and a world with no provable lesson has an empty list. Links open in a new tab, so the game and its loaded world stay open. */
  function lessonsFor(n) {
    var id = String(n), wi = WORLD_INFO[id];
    if (!wi || !courseIndex || courseIndex.failed) return [];
    if (courseLib() === BAKED_LIB && wi.spec) return (courseIndex.bakedLessons && courseIndex.bakedLessons[id]) || [];
    var w = courseIndex.worlds && courseIndex.worlds[id];
    if (!w) return [];
    return (course.tier === "higher" && w.lessonsHL) || w.lessons || [];
  }
  function siteUrl(url) { return SITE && typeof url === "string" && url.charAt(0) === "/" ? SITE + url : url; }   // a lesson address in a pack starts with "/": on the game's domain it needs the site in front
  function lessonLink(url, where, n, label) { return '<a href="' + esc(siteUrl(url)) + '" target="_blank" rel="noopener" data-lesson="' + where + '" data-w="' + n + '">' + label + "</a>"; }
  function learnHtml(n, where) {
    var ls = lessonsFor(n);
    if (!ls.length) return "";
    var rest = ls.slice(3), seen = {}, more = [], h = "<h3>Learn it first</h3><ul>";
    ls.slice(0, 3).forEach(function (e) {
      h += "<li>" + lessonLink(e.url, where, n, e.mission ? "<b>Mission " + e.mission + ":</b> " + esc(e.title) : "<b>" + esc(e.lesson) + "</b>") + ' <span class="soft">' + (e.mission ? esc(e.lesson) : "mini-lesson") + "</span></li>";
    });
    rest.forEach(function (e) { var u = e.url.split("#")[0]; if (!seen[u]) { seen[u] = 1; more.push(lessonLink(u, where, n, esc(e.lesson))); } });
    return h + "</ul>" + (rest.length ? '<p class="soft">and ' + rest.length + " more in " + more.join(", ") + "</p>" : "") +
      '<p class="soft">Each opens in a new tab.' + (course.level === "gcse" && course.board !== "aqa" ? " These are AQA lessons." : "") + "</p>";
  }
  function wonHere(n) { var w = lsGet(LS_WINS, {})[courseLib()], g = game && game.wins && game.wins[courseLib()]; return !!((w && w[String(n)]) || (g && g[String(n)])); }
  function saveCourse() { if (signedIn() && bankOn) api("POST", { op: "course", level: course.level, subject: course.subject, board: course.board, tier: course.tier }); }   // an older accounts script answers bad-op: harmless
  async function syncCourse() {   // after signing in: take the course from the account if none was chosen here, and send up wins made on this device
    if (game.course && !course.chosen) { course = normCourse(Object.assign({}, game.course, { chosen: true })); lsSet(LS_COURSE, course); loadCourseIndex(); }
    else if (course.chosen && !game.course) await api("POST", { op: "course", level: course.level, subject: course.subject, board: course.board, tier: course.tier });
    var local = lsGet(LS_WINS, {});
    for (var lib in local) for (var w in local[lib]) {
      if (game && game.wins && game.wins[lib] && game.wins[lib][w]) continue;
      var r = await api("POST", { op: "win", lib: lib, world: w, stars: +((lsGet(LS_STARS, {})[lib] || {})[w]) || 1 });
      if (!r.ok && r.error === "bad-op") return;   // the accounts script does not know wins yet
    }
    var kept = lsGet(LS_STARS, {});   // then the stars of levels 2 and 3 earned on this device, level 2 first (the account refuses level 3 without it)
    for (var lv = 2; lv <= 3; lv++) for (var lib2 in kept) for (var key in kept[lib2]) {
      var m = /^(\d+)\.(\d)$/.exec(key); if (!m || +m[2] !== lv) continue;
      var srv = game && game["stars" + lv] && game["stars" + lv][lib2];
      if (srv && +srv[m[1]] >= +kept[lib2][key]) continue;
      await api("POST", { op: "win", lib: lib2, world: m[1], level: lv, stars: +kept[lib2][key] });
    }
  }
  function coursePanel() {
    var lv = levelOf(course.level), ids = Object.keys(GAME_WORLDS), ready = ids.filter(function (id) { return !!missionFor(+id); }).length;
    var pick = function (group, key, label, on, off) { return '<button type="button" class="chip" data-k="course:' + group + ":" + key + '" aria-pressed="' + on + '"' + (off ? " disabled" : "") + ">" + label + "</button>"; };
    var h = '<h2>Your course</h2><p class="soft">Every world can be played for any course. The questions and the pieces you collect change with it. Your elements, particles and weapons stay the same.</p>';
    h += '<h3>Level</h3><div class="row">' + LEVELS.map(function (l) { return pick("level", l.id, l.label + (l.soon ? " (soon)" : ""), l.id === course.level, l.soon); }).join("") + "</div>";
    h += '<h3>Subject</h3><div class="row">' + Object.keys(lv.subjects).map(function (sub) { return pick("subject", sub, lv.id === "ks3" ? "Science" : SUBJECT_NAMES[sub], sub === course.subject); }).join("") + "</div>";
    if (lv.boards) h += '<h3>Exam board</h3><div class="row">' + lv.boards.map(function (b) { return pick("board", b[0], b[1], b[0] === course.board); }).join("") + "</div>";
    if (lv.tiers) h += "<h3>" + (lv.id === "ib" ? "SL or HL" : "Tier") + '</h3><div class="row">' + lv.tiers.map(function (t) { return pick("tier", t[0], t[1], t[0] === course.tier); }).join("") + "</div>";
    if (lv.note && (lv.id !== "gcse" || course.board !== "aqa")) h += '<p class="soft">' + lv.note + "</p>";
    h += "<p><b>" + esc(courseName()) + ".</b> " + (courseIndex ? (courseIndex.failed && courseLib() !== BAKED_LIB ? "The list of worlds for this course could not be loaded. Check your connection and reload." : ready + " of the " + ids.length + " worlds built so far are ready for this course.") : "Checking which worlds are ready\u2026") + "</p>";
    return h + '<div class="row">' + btn("close", "Done", "go") + "</div>";
  }

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
  function shopOn() { return !!(inBank() && game.items); }   // false with an accounts server from before the Shop: its new parts are then left out
  function itemCount(id) { return (inBank() && game.items && +game.items[id]) || 0; }
  function ownsLook(id) { return !!(inBank() && game.looks && game.looks.indexOf(id) > -1); }
  function lookKind(id) { return id.split("-")[1]; }
  function looksInUse() { var l = lsGet(LS_LOOKS, {}), out = []; LOOK_GROUPS.forEach(function (g) { if (l[g[0]] && ownsLook(l[g[0]])) out.push(l[g[0]]); }); return out; }
  function boostsOn() { var b = lsGet(LS_BOOSTS, {}); return Object.keys(GAME_ITEMS).filter(function (id) { return id.indexOf("boost-") === 0 && b[id] && itemCount(id) > 0; }); }
  function carried() { var o = {}; Object.keys(CARRY_MAX).forEach(function (id) { o[id] = Math.min(CARRY_MAX[id], itemCount(id)); }); return o; }
  /* What making one batch of a thrown item takes from here: the atoms still to build, the particles still to
     buy for them, and what those cost. `element` is the atomic number of an element that must be collected first. */
  function makePlan(id) {
    var recipe = GAME_ITEMS[id].recipe, at = (game && game.atoms) || {}, hd = hand(), need = { p: 0, n: 0, e: 0 }, atoms = {}, element = 0;
    Object.keys(recipe).forEach(function (s) {
      var short = Math.max(0, recipe[s] - (+at[s] || 0)); if (!short) return;
      atoms[s] = short; need.p += GAME_ATOMS[s].z * short; need.n += GAME_ATOMS[s].n * short; need.e += GAME_ATOMS[s].z * short;
      if (GAME_ATOM_NEEDS[s] && !ownsEl(+GAME_ATOM_NEEDS[s])) element = +GAME_ATOM_NEEDS[s];
    });
    var buy = { p: Math.max(0, need.p - hd.p), n: Math.max(0, need.n - hd.n), e: Math.max(0, need.e - hd.e) }, count = buy.p + buy.n + buy.e;
    return { atoms: atoms, buy: buy, count: count, coins: count * PARTICLE_PRICE, element: element, full: itemCount(id) + (GAME_ITEMS[id].makes || 1) > ITEM_HOLD_MAX };
  }
  function ownsWeapon(id) {
    if (id === "blaster-starter") return true;
    if (id === "blaster-supporter") { var w = wallet(); return !!(w && (w.extras || []).some(function (o) { return o.series === "supporter"; })); }
    return !!(game && game.weapons && game.weapons.indexOf(id) > -1);
  }

  /* ---- the accounts server ---- */
  var apiSeq = 0, apiShown = 0;   // requests to /game in the order they were sent, and the latest whose answer is held
  async function api(method, body) {
    if (!signedIn()) return { ok: false, error: "signed-out" };
    var res, data = null, seq = ++apiSeq;
    try {
      res = await fetch(auth.API + "/game", { method: method, headers: Object.assign({ authorization: "Bearer " + auth.token() }, body ? { "content-type": "application/json" } : {}), body: body ? JSON.stringify(body) : undefined });
    } catch (e) { return { ok: false, error: "network" }; }
    try { data = await res.json(); } catch (e) {}
    if (data && data.game && seq > apiShown) { game = data.game; apiShown = seq; }   // an answer asked for earlier never replaces a later one
    if (res.status === 404 && data && data.error === "not-found") bankOn = false;
    return { ok: res.ok, status: res.status, error: data && data.error, data: data || {} };
  }
  async function refresh() {
    if (!signedIn()) game = null;   // signed in: keep what is known until the fresh state arrives (it takes seconds on the live server)
    if (!started) { var sv = String(lsGet("vw-world", "1")); WORLD = worldOpen(+sv) ? sv : "1"; }   // back to the world last played, if it is still open
    if (FULL && signedIn()) {
      var r = await api("GET");
      if (r.ok) {   // bank anything found on this device before signing in
        await syncCourse();
        for (var id in GAME_WORLDS) {
          if (!worldOpen(+id)) continue;
          var f = found(id), g = (game.worlds && game.worlds[id]) || { p: 0, n: 0, e: 0 };
          if (f.p > (g.p || 0) || f.n > (g.n || 0) || f.e > (g.e || 0)) await api("POST", { op: "collect", world: id, p: f.p, n: f.n, e: f.e });
        }
      } else if (r.error === "network") note("Could not reach the server. Check your connection and reload.", true);
    }
    render();
  }
  var ERR = {
    "need-particles": "You need more particles for that.", "need-atoms": "You need more atoms for that.",
    "insufficient": "You need more Velvet Coins for that.", "already-owned": "You already have that.",
    "world-locked": "You need this world's element first.", "network": "Could not reach the server. Try again.",
    "signed-out": "Sign in first.", "need-element": "Collect that element first.", "full": "You are holding as many of those as an account can."
  };
  /* The Shop: make one batch of a thrown item in one press. Buys the particles that are short (the button said
     how many coins), builds the atoms that are short, then makes the item. Each step is its own request; if one
     is refused the steps before it stand (particles or atoms are kept), and the reason is shown. */
  async function makeItem(id) {
    var plan = makePlan(id), r = { ok: true }, step = "craft";
    if (plan.count) { step = "particles"; r = await api("POST", { op: "particles", p: plan.buy.p, n: plan.buy.n, e: plan.buy.e }); }
    for (var s in plan.atoms) { if (!r.ok) break; step = "atom"; r = await api("POST", { op: "atom", el: s, count: plan.atoms[s] }); }
    if (r.ok) { step = "craft"; r = await api("POST", { op: "craft", item: id, count: 1 }); }
    sure = "";
    if (r.ok) { note(""); track("item made", { item: id, coins: String(plan.coins) }); }
    else { note(ERR[r.error] || "That did not work. Try again.", true); track("refused", { op: step, reason: String(r.error || r.status) }); }
    if (plan.count && auth) auth.pull();   // coins were spent: bring the balance up to date
    render();
  }
  async function shopBuy(id) {
    var r = await api("POST", { op: "shop", item: id, count: 1 });
    sure = "";
    if (r.ok) {
      note(""); track(GAME_ITEMS[id].keep ? "look bought" : "boost bought", { item: id });
      if (GAME_ITEMS[id].keep) { var l = lsGet(LS_LOOKS, {}); l[lookKind(id)] = id; lsSet(LS_LOOKS, l); }   // a look just bought goes straight into use
      else { var b = lsGet(LS_BOOSTS, {}); b[id] = true; lsSet(LS_BOOSTS, b); }                               // a boost just bought is ticked for the next run
      if (auth) auth.pull();
    } else { note(ERR[r.error] || "That did not work. Try again.", true); track("refused", { op: "shop", reason: String(r.error || r.status) }); }
    render();
  }
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
      if (FULL && el.n === 1 && newPlayer()) cls += " start";
      if (drawer && drawer.kind === "el" && drawer.n === el.n) cls += " sel";
      if (!matches(el)) cls += " dim";
      /* Stars on the tile (23 Nov 2026): once a level of this world is finished, one star for each level built, along the bottom,
         in the colour of its grade; a level not yet finished is a hollow star. For the course chosen, as in the element's panel. */
      var gs = FULL && GAME_WORLDS[String(el.n)] ? [1, 2, 3].slice(0, levelsOf(el.n)).map(function (L) { return gradeAt(el.n, L); }) : [];
      if (!gs.some(function (g) { return g > 0; })) gs = [];
      var want = (own ? "o" : "x") + gs.join("");
      if (t.getAttribute("data-s") !== want) {
        t.setAttribute("data-s", want);
        t.innerHTML = (own ? '<img loading="lazy" alt="" src="' + ART + velvetArtPath(el) + '">' : "") + '<span class="no">' + el.n + '</span><span class="sy">' + el.sym + "</span>" +
          (gs.length ? '<span class="tstars" aria-hidden="true">' + gs.map(function (g) { return '<i class="g' + g + '">' + (g ? "\u2605" : "\u2606") + "</i>"; }).join("") + "</span>" : "");
      }
      var lab = el.name + (gs.length ? ". Stars: " + gs.map(function (g, i) { return "level " + (i + 1) + " " + (g ? GRADES[g].toLowerCase() : "not finished"); }).join(", ") : "");
      if (t.getAttribute("aria-label") !== lab) t.setAttribute("aria-label", lab);
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
      var ms = missionFor(n);
      /* what the lobby box used to show for the chosen world is here now: the world's name, what to do in it, the specification line and the particles found */
      h += '<p><b id="heroName">' + esc(wi.name) + "</b>" + (ms && wonHere(n) ? " <b>\u2713 Completed</b>" : "") + "</p>";
      h += '<p id="heroText">' + (ms ? ms.hero : !courseIndex ? "Loading your course\u2026" : "<b>Not ready for " + esc(courseName()) + " yet.</b> Choose another world, or change your course.") + "</p>";
      h += '<p class="soft" id="heroSpec">' + esc(ms ? ms.spec : courseName()) + '</p><div class="counts" id="heroFound">' + partsHtml(f, w) + "</div>";
      h += '<div class="levels">' + [1, 2, 3].map(function (L) {   // one row for each level: its star, and Play (level 1 keeps the key "play:N")
        var built = L <= levelsOf(n), g = built ? gradeAt(n, L) : 0;
        var act = !built ? '<span class="soft">Coming soon</span>' : !worldOpen(n) ? (L === 1 ? '<span class="soft">Collect ' + esc(el.name) + " to open it.</span>" : "") :
          levelOpen(n, L) ? btn("play:" + n + (L > 1 ? ":" + L : ""), L === 1 ? "Play this world" : "Play level " + L, "go", !canPlay || !ms) : '<span class="soft">Finish level ' + (L - 1) + " first</span>";
        return '<div class="lrow' + (built ? "" : " soon") + '"><div class="lname"><b>Level ' + L + '</b> <span class="soft">' + levelName(n, L) + '</span></div><div class="lgrade">' + (built ? starHtml(g) : "") + '</div><div class="lact">' + act + "</div></div>";
      }).join("") + "</div>";
      if (ms) h += '<div class="learn" id="heroLearn">' + learnHtml(n, "drawer") + "</div>";
    } else h += '<p class="soft">This world has not been built yet. Worlds are being added one at a time.</p>';
    var a = ATOM_OF[n];
    if (a && GAME_ATOM_NEEDS[a] && !shopOn() && signedIn()) a = null;   // magnesium atoms came with the Shop: not offered against an older accounts server
    if (a) {
      var c = GAME_ATOMS[a], have = (inBank() && game.atoms && game.atoms[a]) || 0, hd = hand();
      h += "<h3>" + esc(el.name) + ' atoms</h3><p>One atom of ' + ATOM_ISO[a] + " needs " + costText(c) + '.</p><p class="soft">You have ' + plural(have, "atom") + ".</p>";
      var needEl = GAME_ATOM_NEEDS[a] && !ownsEl(+GAME_ATOM_NEEDS[a]);   // magnesium: only with the element collected
      h += '<div class="row">' + (needEl ? '<span class="soft">Collect ' + esc(el.name) + " to build its atoms.</span>" : inBank() ? btn("atom:" + a, "Build 1 atom", "", !(hd.p >= c.z && hd.n >= c.n && hd.e >= c.z)) : (si ? '<span class="soft">The Shop is not switched on yet.</span>' : btn("signin", "Sign in to build atoms"))) + "</div>";
    }
    return h;
  }
  function forgePanel() {
    var all = Object.keys(GAME_WEAPONS).filter(function (id) { return WEAPON_INFO[id]; });   // guns that can be made first, then those still to come
    var ids = ["blaster-starter"].concat(all.filter(function (id) { return !WEAPON_INFO[id].soon; })), cur = picked(), h = '<h2>The Forge</h2><p class="soft">Bond atoms into a compound to make its weapon. A weapon you make works in every world.</p>';
    if (ownsWeapon("blaster-supporter")) ids.push("blaster-supporter");
    ids = ids.concat(all.filter(function (id) { return WEAPON_INFO[id].soon; }));
    if (inBank()) { var at = game.atoms || {}; h += '<p>Your atoms: ' + Object.keys(GAME_ATOMS).map(function (s) { return "<b>" + (at[s] || 0) + "</b> " + BYSYM[s].name.toLowerCase(); }).join(", ") + ".</p>"; }
    else h += '<div class="row">' + (signedIn() ? '<span class="soft">The Shop is not switched on yet.</span>' : btn("signin", "Sign in to make weapons")) + "</div>";
    ids.forEach(function (id) {
      var info = WEAPON_INFO[id], r = GAME_WEAPONS[id], mine = ownsWeapon(id), b;
      if (info.soon) { h += '<div class="item"><h4>' + info.name + ' <span class="have">Coming soon</span></h4><p><span class="formula">' + info.formula + "</span> &nbsp;" + recipeText(r) + "</p></div>"; return; }
      if (mine) b = id === cur ? btn("", "In your hand", "", true) : btn("pick:" + id, "Use this", "pick");
      else b = btn("make:" + id, "Make it", "", !(inBank() && Object.keys(r).every(function (s) { return ((game.atoms || {})[s] || 0) >= r[s]; })));
      h += '<div class="item' + (id === cur ? " on" : "") + '"><img src="' + BASE + "img/" + id + '.webp" alt="" width="300" height="84"><h4>' + info.name + "</h4>" +
        (r ? '<p><span class="formula">' + info.formula + "</span> &nbsp;" + recipeText(r) + "</p>" : "") + "<p>" + info.blurb + '</p><div class="row">' + b + "</div></div>";
    });
    return h + '<p class="soft" style="margin-top:14px">Build atoms by choosing an element on the map: ' + Object.keys(GAME_ATOMS).map(function (s) { return BYSYM[s].name.toLowerCase(); }).join(", ") + '. Thrown items, boosts and looks are in the Shop.</p>';
  }
  /* The Shop (Nov 2026). It took the Particle Bank's place: the counts and the particle buttons are here now. */
  function shopPanel() {
    var bal = coins(), h = '<h2>The Shop</h2><p class="soft">Each world hides a fixed number of protons, neutrons and electrons. Spend them, and your Velvet Coins, here.</p>' +
      '<div class="counts"><div><b>' + bal + "</b>Velvet Coins</div>" + partsHtml(hand()) + "</div>";
    if (!signedIn()) return h + '<p><b>Sign in to keep your particles on your account and to use the Shop.</b> Until then your particles are kept on this device only.</p><div class="row">' + btn("signin", "Sign in or make an account") + "</div>";
    if (!inBank()) return h + '<p class="soft">The Shop is not switched on yet. You can still play, and what you find is kept on this device.</p>';
    if (!shopOn()) return h + particlesPart(bal);   // an accounts server from before the Shop: particles only, as the Particle Bank was
    // thrown items
    h += '<h3>Thrown items</h3><p class="soft">Made from atoms. In a world, press F to throw and Q to change item. You only use one up when you throw it.</p>';
    Object.keys(CARRY_MAX).forEach(function (id) {
      var info = SHOP_INFO[id], spec = GAME_ITEMS[id], plan = makePlan(id), k = "craft:" + id, label = "Make " + spec.makes, b;
      if (plan.element) b = btn("el:" + plan.element, "Collect " + esc(ELS[plan.element - 1].name) + " first &middot; " + plan.element + " coins");
      else if (plan.full) b = btn("", "You cannot hold more", "", true);
      else if (!plan.count) b = btn(k, label, "pick");
      else if (sure === k) b = btn(k, "Spend " + plan.coins + " coins?", "sure");
      else b = btn(k, label + " &middot; buy " + plural(plan.count, "particle") + " for " + plan.coins + " coins", "", bal < plan.coins);
      h += '<div class="item"><h4>' + info.name + ' <span class="have">You have ' + itemCount(id) + "</span></h4><p><span class=\"formula\">" + info.formula + "</span> &nbsp;" + recipeText(spec.recipe) + (spec.makes > 1 ? " makes " + spec.makes : "") +
        "</p><p>" + info.blurb + '</p><p class="soft">A run carries up to ' + CARRY_MAX[id] + '.</p><div class="row">' + b + "</div></div>";
    });
    // boosts
    h += '<h3>Boosts</h3><p class="soft">Tick the ones to take into your next run. A boost is used up when the run starts.</p>';
    var on = lsGet(LS_BOOSTS, {});
    ["boost-ammo", "boost-shield", "boost-life"].forEach(function (id) {
      var info = SHOP_INFO[id], price = GAME_ITEMS[id].price, n = itemCount(id), ticked = n > 0 && on[id];
      h += '<div class="item' + (ticked ? " on" : "") + '"><h4>' + info.name + ' <span class="have">You have ' + n + "</span></h4><p>" + info.blurb + '</p><div class="row">' +
        btn("shopbuy:" + id, "Buy 1 &middot; " + price + " coins", "", bal < price || n >= ITEM_HOLD_MAX) + (n > 0 ? btn("boost:" + id, ticked ? "&#10003; In your next run" : "Take into your next run", ticked ? "pick" : "") : "") + "</div></div>";
    });
    // looks
    var inUse = lsGet(LS_LOOKS, {});
    LOOK_GROUPS.forEach(function (g) {
      h += "<h3>" + g[1] + '</h3><p class="soft">' + g[2] + ' Bought once and kept.</p><div class="looks">';
      Object.keys(GAME_ITEMS).filter(function (id) { return id.indexOf("look-" + g[0] + "-") === 0; }).forEach(function (id) {
        var info = SHOP_INFO[id], price = GAME_ITEMS[id].price, mine = ownsLook(id), cur = mine && inUse[g[0]] === id, k = "shopbuy:" + id, b;
        if (mine) b = btn("look:" + id, cur ? "&#10003; In use" : "Use this", cur ? "pick" : "");
        else if (sure === k) b = btn(k, "Spend " + price + " coins?", "sure");
        else b = btn(k, price + " coins", "", bal < price);
        h += '<div class="look' + (cur ? " on" : "") + '"><span class="swatch" style="background:' + info.swatch + '"></span><b>' + info.name + "</b>" + b + "</div>";
      });
      h += "</div>";
    });
    return h + particlesPart(bal);
  }
  function particlesPart(bal) {   // this was the Particle Bank
    var cost = 5 * PARTICLE_PRICE;
    return "<h3>Particles</h3><p>A particle costs " + PARTICLE_PRICE + ' Velvet Coins. Finding them in a world is free.</p><div class="row">' +
      ["p", "n", "e"].map(function (t) { var k = "buy:" + t; return sure === k ? btn(k, "Spend " + cost + " coins?", "sure") : btn(k, "5 " + PNAME[t].toLowerCase() + " &middot; " + cost, "", bal < cost); }).join("") + "</div>";
  }
  function renderDrawer() {
    var d = $("drawer");
    document.body.classList.toggle("vw-drawer", !!drawer);
    if (!drawer) { d.classList.remove("open"); return; }
    d.innerHTML = '<div class="dnav">' + (!FULL ? "" : '<button type="button" data-k="open:forge"' + (drawer.kind === "forge" ? ' class="cur"' : "") + '>The Forge</button><button type="button" data-k="open:shop"' + (drawer.kind === "shop" ? ' class="cur"' : "") + '>The Shop</button>') + '<button type="button" class="x" data-k="close" aria-label="Close">&times;</button></div>' + (drawer.kind === "el" ? elementPanel(drawer.n) : drawer.kind === "forge" ? forgePanel() : drawer.kind === "course" ? coursePanel() : shopPanel());
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
      $("courseChip").innerHTML = "<b>" + esc(courseName()) + "</b> " + btn("open:course", course.chosen ? "Change" : "Choose your course", course.chosen ? "" : "pick");
      if (!started) {   // the top bar's button: Play for a new player, Continue after a first win; the note says where it leads
        var nx = nextPlay(), pb = $("playBtn");
        pb.textContent = nx && !nx.fresh ? "Continue" : "Play"; pb.disabled = !canPlay || !nx;
        $("playNote").textContent = !canPlay ? "Needs a keyboard and mouse" : nx ? WORLD_INFO[nx.world].name + (levelsOf(+nx.world) > 1 ? ", level " + nx.level : "") + " \u00b7 first load about 16 MB" : courseIndex ? "Not ready for your course yet" : "Loading your course\u2026";
      }
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
    if (parts[0] === "course") { var change = {}; change[parts[1]] = parts[2]; setCourse(change); render(); return; }
    if (parts[0] === "open") { drawer = { kind: parts[1] }; sure = ""; track("drawer", { which: parts[1] }); render(); return; }
    if (parts[0] === "el") { drawer = { kind: "el", n: +parts[1] }; sure = ""; render(); return; }
    if (parts[0] === "play") { var pl = +parts[2] || 1; if (worldOpen(+parts[1]) && pl <= levelsOf(+parts[1]) && levelOpen(+parts[1], pl)) { setWorld(parts[1]); LEVEL = pl; drawer = null; render(); play(); } return; }
    if (k === "signin") { ev.preventDefault(); track("sign in click"); if (auth) auth.open("register", { source: FULL ? "velvet worlds" : "elements" }); return; }
    if (parts[0] === "pick") { lsSet(LS_PICK, parts[1]); track("weapon chosen", { item: parts[1] }); render(); return; }
    if (parts[0] === "buyel") { b.disabled = true; sfxClick(); collectElement(+parts[1]); return; }
    if (parts[0] === "f") { if (parts[1] === "cat") fCat = parts[2]; else fView = parts[2]; track("filter", { which: parts[2] }); buildFilters(); renderMap(); return; }
    if (parts[0] === "atom") { b.disabled = true; act({ op: "atom", el: parts[1], count: 1 }, "atom built", { el: parts[1] }); return; }
    if (parts[0] === "make") { b.disabled = true; act({ op: "make", item: parts[1] }, "weapon made", { item: parts[1] }); return; }
    if (parts[0] === "craft") {   // a thrown item: when particles have to be bought, the first click asks and the second spends
      if (makePlan(parts[1]).count && sure !== k) { sure = k; render(); return; }
      b.disabled = true; makeItem(parts[1]); return;
    }
    if (parts[0] === "shopbuy") {   // a look asks first; a boost (5 to 15 coins) is bought at once
      if (GAME_ITEMS[parts[1]].keep && sure !== k) { sure = k; render(); return; }
      b.disabled = true; shopBuy(parts[1]); return;
    }
    if (parts[0] === "boost") { var bo = lsGet(LS_BOOSTS, {}); bo[parts[1]] = !bo[parts[1]]; lsSet(LS_BOOSTS, bo); track("boost ticked", { item: parts[1], on: bo[parts[1]] ? "yes" : "no" }); render(); return; }
    if (parts[0] === "look") { var lo = lsGet(LS_LOOKS, {}), lk = lookKind(parts[1]); lo[lk] = lo[lk] === parts[1] ? "" : parts[1]; lsSet(LS_LOOKS, lo); track("look chosen", { item: lo[lk] || "none" }); render(); return; }
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
  /* Take used-up Shop items off the account, one request after another, then tell the game what is left
     (it reads window.vwState afresh when R restarts the level). */
  var useQueue = Promise.resolve();
  function useItems(ids) {
    if (!ids.length || !signedIn() || !bankOn) return;
    ids.forEach(function (id) { useQueue = useQueue.then(function () { return api("POST", { op: "use", item: id, count: 1 }); }); });
    useQueue = useQueue.then(function () { if (started) window.vwState = startState(); });
  }
  window.vwEvent = function (text) {
    var m; try { m = JSON.parse(text); } catch (e) { return; }
    var p = m.props || {};
    if (m.event === "pack") { packTaken = !!p.from_page; if (p.refused) track("pack refused", { reason: String(p.refused).slice(0, 60), course: courseLib(), world: WORLD }); }
    else if (m.event === "run_started" && curPack && !packTaken) {   // the game did not take this course's pack (an older game file, or a pack it refused): stop, do not play another course's mission
      $("loadPanel").classList.add("show"); fail("This world could not load the questions for your course. Reload the page and try again.", "pack not taken");
    }
    else if (m.event === "level_ready") { if (+p.restart > 0 && restartTimer !== null) { var took = Date.now() - (window.vwRestartAsked || Date.now()); restartDone();
      track("restarted", { seconds: took < 2000 ? "under 2" : took < 5000 ? "2 to 4" : took < 10000 ? "5 to 9" : "10+", world: WORLD }); } }
    else if (m.event === "particles") { var f = { p: +p.p || 0, n: +p.n || 0, e: +p.e || 0 }; setLocalFound(f); pendingSend = f; sendFound(false); }
    else if (m.event === "run_started") { $("endPanel").classList.remove("show"); $("exit").style.display = "none"; track("run started", { blaster: String(p.blaster), signed_in: signedIn() ? "yes" : "no", boosts: String(p.boosts || "none") });
      useItems(String(p.boosts || "").split(",").filter(function (id) { return id.indexOf("boost-") === 0 && GAME_ITEMS[id]; })); }   // the boosts taken into this run are used up now
    else if (m.event === "item_used") { if (CARRY_MAX[p.item]) useItems([String(p.item)]); }   // a Pop or a Flash was thrown
    else if (m.event === "run_finished") {
      var rc = runs(); lsSet(LS_RUNS, { runs: rc.runs + 1, wins: rc.wins + (p.result === "win" ? 1 : 0) });
      if (p.result === "win") { var ws = lsGet(LS_WINS, {}), lib = courseLib(); ws[lib] = ws[lib] || {}; ws[lib][WORLD] = 1; lsSet(LS_WINS, ws);
        var lvl = Math.min(3, Math.max(1, +p.level || LEVEL)), sk = starKey(WORLD, lvl);
        var got = starsFor(p), st = lsGet(LS_STARS, {}); st[lib] = st[lib] || {}; st[lib][sk] = Math.max(+st[lib][sk] || 0, got); lsSet(LS_STARS, st);
        if (signedIn() && bankOn) api("POST", lvl > 1 ? { op: "win", lib: lib, world: WORLD, level: lvl, stars: got } : { op: "win", lib: lib, world: WORLD, stars: got }); }   // on this device, and on the account when signed in
      var f2 = { p: +p.p || 0, n: +p.n || 0, e: +p.e || 0 }; setLocalFound(f2); pendingSend = f2; sendFound(true);
      $("endTitle").textContent = p.result === "win" ? "Collection complete!" : "The " + WORLD_INFO[WORLD].enemies + " got you";
      $("endText").textContent = "Particles found this run: " + (+p.particles_this_run || 0) + ". In this world so far: " + f2.p + " protons, " + f2.n + " neutrons, " + f2.e + " electrons.";
      if (p.result === "win") { var lv2 = Math.min(3, Math.max(1, +p.level || LEVEL));
        $("endText").textContent += " Level " + lv2 + ": " + GRADES[starsFor(p)] + " star. (Bronze for finishing; silver with the final task right first time or 8 in 10 questions right first time; gold with both.)" +
          (lv2 < levelsOf(+WORLD) ? " Level " + (lv2 + 1) + " is now open." : ""); }
      var nk = p.result === "win" && LEVEL < levelsOf(+WORLD) && levelOpen(+WORLD, LEVEL + 1) ? kindOf(+WORLD, LEVEL + 1) : null;   // the next level, straight from the end panel
      $("nextBtn").style.display = nk ? "" : "none"; $("againBtn").className = nk ? "" : "go";
      if (nk) $("nextBtn").textContent = "Next: level " + (LEVEL + 1) + " \u00b7 " + nk[0];
      var first = lessonsFor(+WORLD)[0];   // the world's own lesson (was one fixed link for every world and course)
      $("endLessonRow").style.display = first ? "" : "none";
      if (first) { $("endLesson").href = siteUrl(first.url); $("endLesson").setAttribute("data-w", WORLD); $("endLesson").textContent = "Earn coins: " + first.lesson + (first.mission ? ", Mission " + first.mission : "") + " mini-lesson"; }
      var usedUp = [[+p.pops || 0, "Hydrogen Pop"], [+p.flashes || 0, "Magnesium Flash"]].filter(function (u) { return u[0] > 0; }).map(function (u) { return u[0] + " " + u[1] + (u[0] === 1 ? "" : u[1] === "Magnesium Flash" ? "es" : "s"); });
      if (usedUp.length) $("endText").textContent += " Thrown this run: " + usedUp.join(", ") + ".";
      $("endSave").textContent = signedIn() && bankOn ? "Saved to your account." : "Kept on this device. Sign in to save them to your account.";
      $("endPanel").classList.add("show"); $("exit").style.display = "block";
      var mins = Math.floor((+p.seconds || 0) / 60);
      track("run finished", { course: courseLib(), level: String(+p.level || LEVEL), result: String(p.result), blaster: String(p.blaster), minutes: mins >= 10 ? "10+" : String(mins), pieces: p.pieces + "/" + p.pieces_total,
        first_try: p.asked ? Math.round(100 * p.right / p.asked / 10) * 10 + "%" : "none", particles: String(+p.particles_this_run || 0), pops: String(+p.pops || 0), flashes: String(+p.flashes || 0) });
    }
  };

  /* ---- starting the game ---- */
  /* The guns this account owns: the game lets the player change between them during a run (G, 1 to 9, the wheel). */
  function ownedWeapons() { return Object.keys(GAME_WEAPONS).concat(["blaster-supporter"]).filter(ownsWeapon); }
  function startState() { var st = { blaster: picked(), weapons: ownedWeapons(), world: WORLD, level: LEVEL, collected: found(), friends: curFriends }; if (curPack) st.pack = curPack;
    if (shopOn()) { st.items = carried(); st.boosts = boostsOn(); st.looks = looksInUse(); }   // the Shop: thrown items carried, boosts ticked, looks in use
    return st; }
  
  function fail(msg, code) {
    if ($("loadTips")) $("loadTips").style.display = "none";
    $("loadTitle").textContent = "The game could not start"; $("loadText").textContent = msg; $("loadBar").style.display = "none"; $("loadRow").style.display = "flex";
    track("load failed", { error: code });
  }
  function loadScript(src) { return new Promise(function (ok, bad) { var s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = function () { bad(new Error("script")); }; document.head.appendChild(s); }); }
  /* The questions and pieces of WORLD at LEVEL, into curPack (null where the game's built-in collection is used). False if they could not be fetched. */
  async function loadPack(ms) {
    curPack = null; packTaken = false;
    var ownPack = levelPack(+WORLD, LEVEL);   // a pack written for this level of this course; otherwise the level uses the world's level 1 pack
    if (!ms.baked || ownPack) {   // this course's pack for this world: fetched now and handed to the game in window.vwState
      try {
        var pr = await fetch(PACKS + courseLib() + "/" + (ownPack ? "l" + LEVEL + "-" : "") + "w" + WORLD + ".json?v=" + PACKS_V);   // a level's own pack is lN-wM.json
        if (!pr.ok) throw new Error("http " + pr.status);
        var got = await pr.json();
        if (course.tier !== "higher") got.questions = got.questions.filter(function (q) { return q.tier !== "higher"; });   // Higher and HL questions only for those who chose them
        curPack = got;
      } catch (e0) { return false; }
    }
    return true;
  }
  play = async function () {
    var ms = missionFor(+WORLD);
    if (started || !ms) return;
    started = true;
    document.body.classList.add("vw-playing");
    $("loadTitle").textContent = "Loading " + WORLD_INFO[WORLD].name + "\u2026";
    $("loadPanel").classList.add("show");
    var tips = $("loadTips");   // what to do, shown while the game loads (the first feedback forms: one player of two did not know)
    if (!tips) { tips = document.createElement("ul"); tips.id = "loadTips"; tips.className = "howto"; $("loadBar").parentNode.insertBefore(tips, $("loadBar")); }
    tips.style.display = "";
    tips.innerHTML = "";
    if (LEVEL > levelsOf(+WORLD) || !levelOpen(+WORLD, LEVEL)) LEVEL = 1;
    if (!(await loadPack(ms))) { fail("The questions for this world could not be loaded. Check your connection and try again.", "pack"); return; }
    var task = curPack ? String((curPack.assemble || {}).type) : (ms.baked ? "order" : "match");
    var kd = kindOf(+WORLD, LEVEL);
    tips.innerHTML = (kd ? "<li>Level " + LEVEL + ", " + kd[0] + ": " + kd[2] + "</li>" : "<li>Find the pieces hidden around the world.</li>") +
      "<li>Answer questions at the terminals for ammo and health.</li><li>Take the pieces to the base and " + (task === "order" ? "put them in order" : task === "group" ? "sort them into their groups" : "match each term to its definition") +
      ".</li><li>Protons, neutrons and electrons are hidden everywhere, some inside crates.</li>";
    curFriends = drawFriends();
    window.vwState = startState();
    track("play", { blaster: window.vwState.blaster, world: WORLD, level: String(LEVEL), signed_in: signedIn() ? "yes" : "no", course: courseLib() });
    var t0 = Date.now(), packUrl = VW_PACK + "?v=" + VW_BUILD;
    var boot = async function (base) {
      if (!window.Engine) await loadScript(base + ".js");
      var missing = window.Engine.getMissingFeatures({ threads: false });
      if (missing.length) { var m = new Error("missing features"); m.missing = missing; throw m; }
      var sizes = {}; sizes[base + ".wasm"] = VW_SIZES.wasm; sizes[packUrl] = VW_SIZES.pck;
      var worldPack = WORLD === "1" ? null : "world" + WORLD + ".pck", worldUrl = worldPack && BASE + "game/" + worldPack + "?v=" + VW_BUILD;
      if (worldPack) sizes[worldUrl] = VW_SIZES.worlds[WORLD] || 0;
      var music = WORLD_MUSIC[WORLD], musicUrl = music && BASE + "game/music/" + music + ".ogg?v=" + VW_BUILD;
      if (music) sizes[musicUrl] = VW_SIZES.music[music] || 0;
      var friendUrl = function (k) { return BASE + "game/friends/friend-" + k + ".pck?v=" + VW_BUILD; };
      curFriends.forEach(function (k) { sizes[friendUrl(k)] = FRIEND_SIZES[k] || 0; });
      engine = new window.Engine({ canvas: $("canvas"), executable: base, canvasResizePolicy: 2, focusCanvas: true, fileSizes: sizes, args: [],
        onProgress: function (cur, tot) { if (tot > 0) $("loadBar").value = Math.min(100, Math.round(100 * cur / tot)); } });
      await Promise.all([engine.init(base), engine.preloadFile(packUrl, "index.pck")].concat(worldPack ? [engine.preloadFile(worldUrl, worldPack)] : [])
        .concat(music ? [engine.preloadFile(musicUrl, "music-" + music + ".ogg").catch(function (e) { track("music failed", { track: music, world: WORLD }); })] : [])
        .concat(curFriends.map(function (k) { return engine.preloadFile(friendUrl(k), "friend-" + k + ".pck").catch(function (e) { track("friend failed", { kind: k, world: WORLD }); }); })));   // a world without one of its characters is better than no game   // no music is better than no game
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
      var holdFor = lsGet("vw-howto", 0) ? 0 : Math.max(0, 6000 - (Date.now() - t0));   // first run on this device: leave the instructions up for at least six seconds
      await new Promise(function (go) { setTimeout(go, holdFor); });
      lsSet("vw-howto", 1);
      $("loadPanel").classList.remove("show");
      $("canvas").focus();
      var secs = Math.round((Date.now() - t0) / 1000);
      track("loaded", { seconds: secs < 5 ? "under 5" : secs < 15 ? "5 to 14" : secs < 40 ? "15 to 39" : "40+", engine: from });
    } catch (e) {
      if (window.console) console.error(e);
      fail("Something went wrong while loading. Check your connection and try again.", String((e && e.message) || e).slice(0, 80));
    }
  };
  $("playBtn").addEventListener("click", function () { var nx = nextPlay(); if (!nx) return; setWorld(nx.world); LEVEL = nx.level; track("top bar play", { world: nx.world, level: String(nx.level), first: nx.fresh ? "yes" : "no" }); play(); });   // the top bar's Play / Continue: the next level not yet finished
  /* Play again: the game rebuilds the level, and while it does the page cannot respond. Put a
     panel up first (its bar is a CSS transform animation, which keeps moving while the page is
     busy), let the browser paint it, then tell the game. The game says "level_ready" when done. */
  var restartTimer = null;
  function restartDone() { if (restartTimer === null) return; clearTimeout(restartTimer); restartTimer = null;
    $("loadPanel").classList.remove("show"); $("loadShuttle").style.display = "none"; $("loadBar").style.display = ""; $("canvas").focus(); }
  function restartGame(title) {
    window.vwState = startState();
    $("endPanel").classList.remove("show"); $("exit").style.display = "none";
    if (typeof window.vwRestart !== "function") { location.reload(); return; }
    if ($("loadTips")) $("loadTips").style.display = "none";
    $("loadTitle").textContent = title; $("loadText").textContent = "This takes a few seconds.";
    $("loadBar").style.display = "none"; $("loadShuttle").style.display = ""; $("loadRow").style.display = "none"; $("loadPanel").classList.add("show");
    clearTimeout(restartTimer); restartTimer = setTimeout(restartDone, 20000);   // never leave the panel up if the game says nothing
    var t0 = Date.now();
    requestAnimationFrame(function () { requestAnimationFrame(function () { setTimeout(function () { window.vwRestartAsked = t0; window.vwRestart(); }, 30); }); });
  }
  $("againBtn").addEventListener("click", function () { restartGame("Setting the level up again\u2026"); });
  /* Next level (22 Nov 2026): the same game, restarted at the next level of this world, with that level's own pack if the course has one. */
  var nextBusy = false;
  $("nextBtn").addEventListener("click", async function () {
    var nl = LEVEL + 1, ms = missionFor(+WORLD);
    if (nextBusy || !ms || nl > levelsOf(+WORLD) || !levelOpen(+WORLD, nl)) return;
    if (typeof window.vwRestart !== "function") { location.reload(); return; }
    nextBusy = true; LEVEL = nl;
    var ok = await loadPack(ms);
    nextBusy = false;
    if (!ok) { LEVEL = nl - 1; await loadPack(ms); $("endText").textContent = "The questions for level " + nl + " could not be loaded. Check your connection and try again."; return; }
    var kd = kindOf(+WORLD, LEVEL);
    track("next level", { world: WORLD, level: String(LEVEL), kind: kd ? kd[0] : "", course: courseLib() });
    restartGame("Setting up level " + LEVEL + (kd ? ": " + kd[0] : "") + "\u2026");
  });
  function leave() { sendFound(true); setTimeout(function () { location.reload(); }, 400); }
  $("labBtn").addEventListener("click", leave);
  $("endFb").addEventListener("click", function () { fbOpen("end panel"); });
  $("exit").addEventListener("click", leave);
  // "Leave game" shows whenever the mouse is free during a run (after Esc).
  document.addEventListener("pointerlockchange", function () { if (started && !$("loadPanel").classList.contains("show")) $("exit").style.display = document.pointerLockElement ? "none" : "block"; });
  document.addEventListener("click", function (ev) {
    var a = ev.target.closest && ev.target.closest("a[data-lesson]");
    if (a) track("lesson link", { where: a.getAttribute("data-lesson"), course: courseLib(), world: a.getAttribute("data-w") || WORLD, to: /#m\d+$/.test(a.getAttribute("href")) ? "mission" : "lesson" });
  });

  /* ---- a keyboard and mouse are needed to play (collecting works anywhere) ---- */
  var fine = !window.matchMedia || window.matchMedia("(pointer: fine)").matches;
  if (!fine || window.innerWidth < 800) {
    canPlay = false;
    $("notComputer").style.display = "flex"; $("playBtn").disabled = true; $("playNote").textContent = "Needs a keyboard and mouse";   // render() keeps them so while canPlay is false
    track("not a computer");
    $("tryAnyway").addEventListener("click", function (ev) { ev.preventDefault(); canPlay = true; $("notComputer").style.display = "none"; render(); });
  }
  })();

  if (FULL) loadCourseIndex();
  buildMap();
  buildFilters();
  if (FULL && auth) setTimeout(function () { if (signedIn() && fbState() === "sent") fbClaim(false); }, 2500);   // feedback sent earlier but the coins were not added yet
  if (auth) auth.onChange(function () { if (!started) refresh(); });
  render();
  refresh();
})();
