/* ==========================================================================
   ARCADE — shared engine for AI Study Method quiz games.
   Zero dependencies. Exposes a single global: window.Arcade

   API
   ---
   Arcade.escapeHtml(s)                  HTML-escape any value
   Arcade.shuffle(arr)                   Fisher-Yates, returns new array
   Arcade.fetchSpecJson(stem, dir)       spec fetch with colon-stem fallback
   Arcade.dayNumber()                    days since epoch (daily seeds)
   Arcade.seededShuffle(arr, seed)       deterministic shuffle (mulberry32)

   Arcade.sfx.correct(streak) .wrong() .click() .tick() .timeup() .coin()
             .riser() .fanfare() .swoosh() .heartbeat()
   Arcade.sfx.muted                      getter/setter, persisted
   Arcade.mountMuteButton()              floating 🔊/🔇 toggle

   Arcade.confettiBurst(opts)            one burst {x, y, count, colors}
   Arcade.confettiRain(ms)               celebratory rain for ms
   Arcade.shake()                        full-page shake
   Arcade.popText(text, x, y, color)     floating "+100" at viewport coords
   Arcade.popTextOver(el, text, color)   same, centred over an element
   Arcade.flashMsg(text, color)          big centre-screen word (NICE! / OOF)
   Arcade.streakCall(n)                  flashMsg for streak milestones
   Arcade.countUp(el, to, ms, suffix)    animated number
   Arcade.vibrate(pattern)               navigator.vibrate, safe no-op

   Arcade.grade(pct) -> {letter, cls, line}
   Arcade.renderEndCard(container, opts) shareable results card; wires buttons
       opts: {gameName, gameEmoji, topic, meta, pct, statHtml(optional),
              big, bigLabel, rows:[{v,l}], emojiGrid, bestKey, bestValue,
              insight, shareLines:[...], onAgain, hot(bool)}
   ========================================================================== */
(function () {
  'use strict';
  const Arcade = {};

  /* ---------------- utils ------------------------------------------------ */
  Arcade.escapeHtml = function (s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  Arcade.shuffle = function (arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  function mulberry32(seed) {
    let t = seed >>> 0;
    return function () {
      t += 0x6D2B79F5;
      let r = Math.imul(t ^ (t >>> 15), 1 | t);
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }
  Arcade.seededShuffle = function (arr, seed) {
    const rnd = mulberry32(seed);
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  Arcade.dayNumber = function () { return Math.floor(Date.now() / 86400000); };

  /* Last-mission breadcrumb — the arcade lobby records the launched game here
     so it can offer a one-tap CONTINUE chip on the next visit. Best-effort:
     storage failures are swallowed, a launch must never be blocked. */
  /* ── Analytics ──────────────────────────────────────────────────────────
     Fire-and-forget. Never blocks a launch, never throws, never retries.
     `synthetic` is NOT sent from here — the server decides that from a header
     the browser does not have, so real and phantom traffic stay separable. */
  Arcade.ANALYTICS_URL = 'https://aism-analytics-bm8gz.bunny.run';

  Arcade.sessionId = function () {
    try {
      let id = sessionStorage.getItem('aism-session');
      if (!id) {
        id = (crypto.randomUUID ? crypto.randomUUID()
             : String(Date.now()) + '-' + Math.random().toString(16).slice(2));
        sessionStorage.setItem('aism-session', id);
      }
      return id;
    } catch (e) { return null; }
  };

  Arcade.deviceType = function () {
    try {
      const w = Math.min(screen.width, screen.height);
      if (/Mobi|Android|iPhone/i.test(navigator.userAgent) && w < 768) return 'mobile';
      if (/iPad|Tablet|Android/i.test(navigator.userAgent)) return 'tablet';
      return 'desktop';
    } catch (e) { return ''; }
  };

  /* Campaign attribution: read once per session from the first URL that had
     it, so a TikTok link is still credited after the student navigates on. */
  Arcade.campaign = function () {
    try {
      const saved = sessionStorage.getItem('aism-campaign');
      if (saved) return JSON.parse(saved);
      const q = new URLSearchParams(location.search);
      let host = '';
      try { host = document.referrer ? new URL(document.referrer).hostname : ''; } catch (e) {}
      if (host && host.indexOf('aistudymethod.') > -1) host = '';   // internal, not a source
      const c = { utm_source: q.get('utm_source') || '', utm_campaign: q.get('utm_campaign') || '', referrer_host: host };
      sessionStorage.setItem('aism-campaign', JSON.stringify(c));
      return c;
    } catch (e) { return { utm_source: '', utm_campaign: '', referrer_host: '' }; }
  };

  Arcade.track = function (event, data) {
    try {
      if (!Arcade.ANALYTICS_URL || Arcade.ANALYTICS_URL.indexOf('PLACEHOLDER') > -1) return;
      const c = Arcade.campaign();
      const body = JSON.stringify(Object.assign({
        event: event,
        session_id: Arcade.sessionId(),
        device_id: (Arcade.lb && Arcade.lb.device) ? Arcade.lb.device() : null,
        device_type: Arcade.deviceType(),
        content_version: Arcade.CONTENT_VERSION || '',
        utm_source: c.utm_source, utm_campaign: c.utm_campaign,
        referrer_host: c.referrer_host,
      }, data || {}));
      const url = Arcade.ANALYTICS_URL + '/collect';
      // sendBeacon survives the page unload that follows a game launch.
      /* text/plain, NOT application/json: text/plain is a CORS-safelisted
         content type, so the request goes straight out with no preflight.
         application/json forces a preflight, which sendBeacon cannot perform
         reliably — the beacon reports success and the data silently never
         arrives. The server parses the body as JSON regardless of the header. */
      if (navigator.sendBeacon && navigator.sendBeacon(url, new Blob([body], { type: 'text/plain' }))) return;
      fetch(url, { method: 'POST', headers: { 'content-type': 'text/plain' }, body: body, keepalive: true }).catch(function () {});
    } catch (e) { /* analytics must never break the arcade */ }
  };

  /* Last-mission breadcrumb — the arcade lobby records the launched game here
     so it can offer a one-tap CONTINUE chip on the next visit. Best-effort:
     storage failures are swallowed, a launch must never be blocked. */
  Arcade.logMission = function (mission) {
    try { localStorage.setItem('aism-last-mission', JSON.stringify(mission)); } catch (e) { /* no-op */ }
    Arcade.track('game_launch', {
      game: mission && mission.game, subject: mission && mission.subject,
      level: mission && mission.level, board: mission && mission.board,
      topic: mission && mission.topic, topic_label: mission && mission.topicLabel,
    });
  };

  // Some on-disk stems contain a colon the URL param drops. Try the plain
  // stem first, then every possible colon-insertion before a dash.
  Arcade.stemCandidates = function (stem) {
    const cands = [stem];
    for (let i = 0; i < stem.length; i++) {
      if (stem[i] === '-') cands.push(stem.slice(0, i) + ':' + stem.slice(i));
    }
    return cands;
  };
  /* Spec-stem aliases: the subjects.html catalog builder emits stems with
     double-dashes collapsed (e.g. "banking-finance"); the spec files on disk
     keep the full form ("banking--finance", sometimes with a colon). Map the
     catalog stem to the real filename so quiz-game links resolve. Generated
     from _specs/ + resources.js var S — 467 entries. */
  Arcade.SPEC_ALIASES = {"art-design-a-level-critical-contextual-studies-adventure-1":"art-design-a-level-critical--contextual-studies-adventure-1","art-design-a-level-curating-exhibitions-adventure-1":"art-design-a-level-curating--exhibitions-adventure-1","art-design-a-level-drawing-painting-adventure-1":"art-design-a-level-drawing--painting-adventure-1","art-design-a-level-ethics-theory-adventure-1":"art-design-a-level-ethics--theory-adventure-1","art-design-a-level-mixed-media-installation-adventure-1":"art-design-a-level-mixed-media--installation-adventure-1","art-design-a-level-modernism-avant-garde-adventure-1":"art-design-a-level-modernism--avant-garde-adventure-1","art-design-a-level-postmodern-contemporary-adventure-1":"art-design-a-level-postmodern--contemporary-adventure-1","art-design-gcse-3d-mixed-media-adventure-1":"art-design-gcse-3d--mixed-media-adventure-1","art-design-gcse-annotation-analysis-adventure-1":"art-design-gcse-annotation--analysis-adventure-1","art-design-gcse-drawing-composition-adventure-1":"art-design-gcse-drawing--composition-adventure-1","art-design-gcse-photography-digital-adventure-1":"art-design-gcse-photography--digital-adventure-1","art-design-gcse-sculpture-3d-adventure-1":"art-design-gcse-sculpture--3d-adventure-1","art-design-ks3-colour-tone-adventure-1":"art-design-ks3-colour--tone-adventure-1","art-design-ks3-composition-pattern-adventure-1":"art-design-ks3-composition--pattern-adventure-1","art-design-ks3-line-shape-form-adventure-1":"art-design-ks3-line-shape--form-adventure-1","astronomy-a-level-black-holes-relativity-adventure-1":"astronomy-a-level-black-holes--relativity-adventure-1","astronomy-a-level-compact-objects-stellar-remnants-adventure-1":"astronomy-a-level-compact-objects--stellar-remnants-adventure-1","astronomy-a-level-cosmology-big-bang-adventure-1":"astronomy-a-level-cosmology--big-bang-adventure-1","astronomy-a-level-detectors-multi-wavelength-astronomy-adventure-1":"astronomy-a-level-detectors--multi-wavelength-astronomy-adventure-1","astronomy-a-level-exoplanets-astrobiology-adventure-1":"astronomy-a-level-exoplanets--astrobiology-adventure-1","astronomy-a-level-galaxies-active-galactic-nuclei-adventure-1":"astronomy-a-level-galaxies--active-galactic-nuclei-adventure-1","astronomy-a-level-stars-stellar-evolution-adventure-1":"astronomy-a-level-stars--stellar-evolution-adventure-1","astronomy-a-level-stellar-spectra-hr-diagram-adventure-1":"astronomy-a-level-stellar-spectra--hr-diagram-adventure-1","astronomy-gcse-black-holes-exotic-objects-adventure-1":"astronomy-gcse-black-holes--exotic-objects-adventure-1","astronomy-gcse-celestial-sphere-coordinates-adventure-1":"astronomy-gcse-celestial-sphere--coordinates-adventure-1","astronomy-gcse-galaxies-universe-adventure-1":"astronomy-gcse-galaxies--universe-adventure-1","astronomy-gcse-light-distance-measurement-adventure-1":"astronomy-gcse-light--distance-measurement-adventure-1","astronomy-gcse-lunar-solar-eclipses-adventure-1":"astronomy-gcse-lunar--solar-eclipses-adventure-1","astronomy-gcse-solar-system-missions-adventure-1":"astronomy-gcse-solar-system--missions-adventure-1","astronomy-gcse-spectra-stellar-classification-adventure-1":"astronomy-gcse-spectra--stellar-classification-adventure-1","astronomy-gcse-stars-stellar-life-adventure-1":"astronomy-gcse-stars--stellar-life-adventure-1","astronomy-ks3-day-night-seasons-adventure-1":"astronomy-ks3-day-night--seasons-adventure-1","astronomy-ks3-earth-moon-sun-adventure-1":"astronomy-ks3-earth-moon--sun-adventure-1","astronomy-ks3-gravity-orbits-adventure-1":"astronomy-ks3-gravity--orbits-adventure-1","astronomy-ks3-phases-tides-adventure-1":"astronomy-ks3-phases--tides-adventure-1","astronomy-ks3-planets-moons-adventure-1":"astronomy-ks3-planets--moons-adventure-1","astronomy-ks3-solar-lunar-eclipses-adventure-1":"astronomy-ks3-solar--lunar-eclipses-adventure-1","astronomy-ks3-stars-constellations-adventure-1":"astronomy-ks3-stars--constellations-adventure-1","astronomy-ks3-telescopes-observing-adventure-1":"astronomy-ks3-telescopes--observing-adventure-1","biology-a-level-cells-transport-adventure-1":"biology-a-level-cells--transport-adventure-1","biology-a-level-dna-replication-protein-synthesis-adventure-1":"biology-a-level-dna-replication--protein-synthesis-adventure-1","biology-a-level-ecology-populations-adventure-1":"biology-a-level-ecology--populations-adventure-1","biology-a-level-energy-respiration-adventure-1":"biology-a-level-energy--respiration-adventure-1","biology-a-level-genetics-gene-expression-adventure-1":"biology-a-level-genetics--gene-expression-adventure-1","biology-a-level-population-genetics-evolution-adventure-1":"biology-a-level-population-genetics--evolution-adventure-1","biology-ibdp-evolution-biodiversity-adventure-1":"biology-ibdp-evolution--biodiversity-adventure-1","biology-ks3-cells-organisation-adventure-1":"biology-ks3-cells--organisation-adventure-1","biology-ks3-diet-digestion-adventure-1":"biology-ks3-diet--digestion-adventure-1","biology-ks3-ecology-environment-adventure-1":"biology-ks3-ecology--environment-adventure-1","biology-ks3-microscopy-cell-specialisation-adventure-1":"biology-ks3-microscopy--cell-specialisation-adventure-1","biology-ks3-photosynthesis-respiration-adventure-1":"biology-ks3-photosynthesis--respiration-adventure-1","biology-ks3-reproduction-puberty-adventure-1":"biology-ks3-reproduction--puberty-adventure-1","biology-ks3-skeleton-muscles-adventure-1":"biology-ks3-skeleton--muscles-adventure-1","biology-ks3-variation-classification-adventure-1":"biology-ks3-variation--classification-adventure-1","business-studies-a-level-ansoff-porter-adventure-1":"business-studies-a-level-ansoff--porter-adventure-1","business-studies-a-level-bcg-product-portfolio-adventure-1":"business-studies-a-level-bcg--product-portfolio-adventure-1","business-studies-a-level-finance-accounting-adventure-1":"business-studies-a-level-finance--accounting-adventure-1","business-studies-a-level-swot-pestle-adventure-1":"business-studies-a-level-swot--pestle-adventure-1","business-studies-gcse-business-basics-startup-adventure-1":"business-studies-gcse-business-basics--startup-adventure-1","business-studies-gcse-ethics-sustainability-adventure-1":"business-studies-gcse-ethics--sustainability-adventure-1","business-studies-ibdp-business-organization-environment-adventure-1":"business-studies-ibdp-business-organization--environment-adventure-1","business-studies-ibdp-finance-accounts-adventure-1":"business-studies-ibdp-finance--accounts-adventure-1","business-studies-ibdp-globalization-business-ethics-adventure-1":"business-studies-ibdp-globalization--business-ethics-adventure-1","business-studies-ibdp-stakeholders-csr-adventure-1":"business-studies-ibdp-stakeholders--csr-adventure-1","business-studies-ibdp-strategy-decision-making-adventure-1":"business-studies-ibdp-strategy--decision-making-adventure-1","business-studies-ks3-customers-markets-adventure-1":"business-studies-ks3-customers--markets-adventure-1","business-studies-ks3-enterprise-startup-adventure-1":"business-studies-ks3-enterprise--startup-adventure-1","business-studies-ks3-finance-profit-adventure-1":"business-studies-ks3-finance--profit-adventure-1","business-studies-ks3-goods-services-adventure-1":"business-studies-ks3-goods--services-adventure-1","business-studies-ks3-marketing-customers-adventure-1":"business-studies-ks3-marketing--customers-adventure-1","business-studies-ks3-people-operations-adventure-1":"business-studies-ks3-people--operations-adventure-1","chemistry-a-level-acids-bases-buffers-adventure-1":"chemistry-a-level-acids-bases--buffers-adventure-1","chemistry-a-level-atomic-structure-bonding-adventure-1":"chemistry-a-level-atomic-structure--bonding-adventure-1","chemistry-a-level-energetics-entropy-adventure-1":"chemistry-a-level-energetics--entropy-adventure-1","chemistry-a-level-periodicity-period-3-adventure-1":"chemistry-a-level-periodicity--period-3-adventure-1","chemistry-a-level-redox-electrochemistry-adventure-1":"chemistry-a-level-redox--electrochemistry-adventure-1","chemistry-a-level-spectroscopy-analysis-adventure-1":"chemistry-a-level-spectroscopy--analysis-adventure-1","chemistry-a-level-thermodynamics-born-haber-adventure-1":"chemistry-a-level-thermodynamics--born-haber-adventure-1","chemistry-ibdp-acids-bases-adventure-1":"chemistry-ibdp-acids--bases-adventure-1","chemistry-ibdp-chemical-bonding-structure-adventure-1":"chemistry-ibdp-chemical-bonding--structure-adventure-1","chemistry-ibdp-energetics-thermochemistry-adventure-1":"chemistry-ibdp-energetics--thermochemistry-adventure-1","chemistry-ibdp-measurement-data-processing-adventure-1":"chemistry-ibdp-measurement--data-processing-adventure-1","chemistry-ks3-acids-alkalis-indicators-adventure-1":"chemistry-ks3-acids-alkalis--indicators-adventure-1","chemistry-ks3-atoms-molecules-adventure-1":"chemistry-ks3-atoms--molecules-adventure-1","chemistry-ks3-earth-atmosphere-adventure-1":"chemistry-ks3-earth--atmosphere-adventure-1","chemistry-ks3-elements-compounds-adventure-1":"chemistry-ks3-elements--compounds-adventure-1","chemistry-ks3-metals-materials-adventure-1":"chemistry-ks3-metals--materials-adventure-1","chemistry-ks3-rocks-the-rock-cycle-adventure-1":"chemistry-ks3-rocks--the-rock-cycle-adventure-1","computer-science-a-level-ai-machine-learning-adventure-1":"computer-science-a-level-ai--machine-learning-adventure-1","computer-science-a-level-algorithms-data-structures-adventure-1":"computer-science-a-level-algorithms--data-structures-adventure-1","computer-science-a-level-big-o-computational-complexity-adventure-1":"computer-science-a-level-big-o--computational-complexity-adventure-1","computer-science-a-level-databases-sql-adventure-1":"computer-science-a-level-databases--sql-adventure-1","computer-science-a-level-graphs-trees-adventure-1":"computer-science-a-level-graphs--trees-adventure-1","computer-science-a-level-programming-paradigms-adventure-1":"computer-science-a-level-programming--paradigms-adventure-1","computer-science-a-level-recursion-recursive-algorithms-adventure-1":"computer-science-a-level-recursion--recursive-algorithms-adventure-1","computer-science-gcse-boolean-logic-number-systems-adventure-1":"computer-science-gcse-boolean-logic--number-systems-adventure-1","computer-science-gcse-ethical-legal-environmental-issues-adventure-1":"computer-science-gcse-ethical-legal--environmental-issues-adventure-1","computer-science-gcse-networks-topologies-adventure-1":"computer-science-gcse-networks--topologies-adventure-1","computer-science-gcse-searching-sorting-algorithms-adventure-1":"computer-science-gcse-searching--sorting-algorithms-adventure-1","computer-science-gcse-sorting-searching-adventure-1":"computer-science-gcse-sorting--searching-adventure-1","computer-science-ibdp-modelling-simulation-hl-adventure-1":"computer-science-ibdp-modelling--simulation-hl-adventure-1","computer-science-ks3-algorithms-flowcharts-adventure-1":"computer-science-ks3-algorithms--flowcharts-adventure-1","computer-science-ks3-data-binary-adventure-1":"computer-science-ks3-data--binary-adventure-1","computer-science-ks3-digital-wellbeing-e-safety-adventure-1":"computer-science-ks3-digital-wellbeing--e-safety-adventure-1","computer-science-ks3-hardware-software-adventure-1":"computer-science-ks3-hardware--software-adventure-1","computer-science-ks3-internet-world-wide-web-adventure-1":"computer-science-ks3-internet--world-wide-web-adventure-1","computer-science-ks3-logic-gates-boolean-basics-adventure-1":"computer-science-ks3-logic-gates--boolean-basics-adventure-1","computer-science-ks3-networks-security-adventure-1":"computer-science-ks3-networks--security-adventure-1","computer-science-ks3-scratch-block-programming-adventure-1":"computer-science-ks3-scratch--block-programming-adventure-1","design-technology-a-level-design-movements-influential-designers-adventure-1":"design-technology-a-level-design-movements--influential-designers-adventure-1","design-technology-a-level-design-process-ethics-adventure-1":"design-technology-a-level-design-process--ethics-adventure-1","design-technology-a-level-manufacturing-systems-adventure-1":"design-technology-a-level-manufacturing--systems-adventure-1","design-technology-a-level-materials-composites-adventure-1":"design-technology-a-level-materials--composites-adventure-1","design-technology-a-level-modern-composites-technical-textiles-adventure-1":"design-technology-a-level-modern-composites--technical-textiles-adventure-1","design-technology-a-level-programmable-components-mechatronics-adventure-1":"design-technology-a-level-programmable-components--mechatronics-adventure-1","design-technology-a-level-smart-manufacturing-industry-40-adventure-1":"design-technology-a-level-smart-manufacturing--industry-40-adventure-1","design-technology-a-level-sustainable-design-lifecycle-analysis-adventure-1":"design-technology-a-level-sustainable-design--lifecycle-analysis-adventure-1","design-technology-gcse-materials-manufacturing-adventure-1":"design-technology-gcse-materials--manufacturing-adventure-1","design-technology-gcse-mechanical-electronic-systems-adventure-1":"design-technology-gcse-mechanical--electronic-systems-adventure-1","design-technology-gcse-polymers-plastics-adventure-1":"design-technology-gcse-polymers--plastics-adventure-1","design-technology-gcse-smart-modern-materials-adventure-1":"design-technology-gcse-smart--modern-materials-adventure-1","design-technology-gcse-sustainability-6-rs-adventure-1":"design-technology-gcse-sustainability--6-rs-adventure-1","design-technology-gcse-timbers-manufactured-boards-adventure-1":"design-technology-gcse-timbers--manufactured-boards-adventure-1","design-technology-ks3-designing-drawing-adventure-1":"design-technology-ks3-designing--drawing-adventure-1","design-technology-ks3-electronics-smart-materials-adventure-1":"design-technology-ks3-electronics--smart-materials-adventure-1","design-technology-ks3-food-preparation-nutrition-adventure-1":"design-technology-ks3-food-preparation--nutrition-adventure-1","design-technology-ks3-graphics-presentation-techniques-adventure-1":"design-technology-ks3-graphics--presentation-techniques-adventure-1","design-technology-ks3-hand-tools-workshop-safety-adventure-1":"design-technology-ks3-hand-tools--workshop-safety-adventure-1","design-technology-ks3-materials-properties-adventure-1":"design-technology-ks3-materials--properties-adventure-1","design-technology-ks3-mechanisms-forces-adventure-1":"design-technology-ks3-mechanisms--forces-adventure-1","design-technology-ks3-textiles-fibres-adventure-1":"design-technology-ks3-textiles--fibres-adventure-1","economics-a-level-exchange-rates-balance-adventure-1":"economics-a-level-exchange-rates--balance-adventure-1","economics-a-level-game-theory-oligopoly-adventure-1":"economics-a-level-game-theory--oligopoly-adventure-1","economics-a-level-international-trade-globalisation-adventure-1":"economics-a-level-international-trade--globalisation-adventure-1","economics-a-level-phillips-curve-inflation-adventure-1":"economics-a-level-phillips-curve--inflation-adventure-1","economics-gcse-banking-finance-adventure-1":"economics-gcse-banking--finance-adventure-1","economics-gcse-inflation-price-indices-adventure-1":"economics-gcse-inflation--price-indices-adventure-1","economics-gcse-production-productivity-adventure-1":"economics-gcse-production--productivity-adventure-1","economics-ibdp-monopoly-imperfect-competition-hl-adventure-1":"economics-ibdp-monopoly--imperfect-competition-hl-adventure-1","economics-ks3-choices-scarcity-adventure-1":"economics-ks3-choices--scarcity-adventure-1","economics-ks3-government-tax-adventure-1":"economics-ks3-government--tax-adventure-1","economics-ks3-jobs-earnings-adventure-1":"economics-ks3-jobs--earnings-adventure-1","economics-ks3-markets-trade-adventure-1":"economics-ks3-markets--trade-adventure-1","economics-ks3-money-banking-adventure-1":"economics-ks3-money--banking-adventure-1","economics-ks3-money-currency-adventure-1":"economics-ks3-money--currency-adventure-1","economics-ks3-supply-demand-basics-adventure-1":"economics-ks3-supply--demand-basics-adventure-1","english-language-a-level-gender-language-adventure-1":"english-language-a-level-gender--language-adventure-1","english-language-a-level-language-gender-adventure-1":"english-language-a-level-language--gender-adventure-1","english-language-a-level-language-occupation-adventure-1":"english-language-a-level-language--occupation-adventure-1","english-language-a-level-language-power-adventure-1":"english-language-a-level-language--power-adventure-1","english-language-gcse-language-power-adventure-1":"english-language-gcse-language--power-adventure-1","english-language-gcse-writing-descriptive-narrative-adventure-1":"english-language-gcse-writing---descriptive--narrative-adventure-1","english-language-gcse-writing-transactional-adventure-1":"english-language-gcse-writing---transactional-adventure-1","english-language-ks3-media-texts-adventure-1":"english-language-ks3-media--texts-adventure-1","english-language-ks3-reading-genre-adventure-1":"english-language-ks3-reading--genre-adventure-1","english-language-ks3-reading-skills-inference-adventure-1":"english-language-ks3-reading-skills--inference-adventure-1","english-language-ks3-writing-persuasion-adventure-1":"english-language-ks3-writing--persuasion-adventure-1","english-literature-a-level-aqa-atonement-modern-prose-adventure-1":"english-literature-a-level-aqa:-atonement-modern-prose-adventure-1","english-literature-a-level-aqa-othello-tragedy-adventure-1":"english-literature-a-level-aqa:-othello-tragedy-adventure-1","english-literature-a-level-aqa-post-2000-poetry-adventure-1":"english-literature-a-level-aqa:-post-2000-poetry-adventure-1","english-literature-a-level-aqa-tess-of-the-durbervilles-adventure-1":"english-literature-a-level-aqa:-tess-of-the-durbervilles-adventure-1","english-literature-a-level-drama-shakespeare-adventure-1":"english-literature-a-level-drama--shakespeare-adventure-1","english-literature-a-level-edexcel-dracula-gothic-adventure-1":"english-literature-a-level-edexcel:-dracula-gothic-adventure-1","english-literature-a-level-edexcel-frankenstein-gothic-adventure-1":"english-literature-a-level-edexcel:-frankenstein-gothic-adventure-1","english-literature-a-level-edexcel-hamlet-drama-adventure-1":"english-literature-a-level-edexcel:-hamlet-drama-adventure-1","english-literature-a-level-ocr-comparative-poetry-pairings-adventure-1":"english-literature-a-level-ocr:-comparative-poetry-pairings-adventure-1","english-literature-a-level-ocr-doctor-faustus-drama-adventure-1":"english-literature-a-level-ocr:-doctor-faustus-drama-adventure-1","english-literature-a-level-ocr-othello-ocr-drama-adventure-1":"english-literature-a-level-ocr:-othello-ocr-drama-adventure-1","english-literature-a-level-ocr-wuthering-heights-prose-adventure-1":"english-literature-a-level-ocr:-wuthering-heights-prose-adventure-1","english-literature-gcse-aqa-a-christmas-carol-adventure-1":"english-literature-gcse-aqa:-a-christmas-carol-adventure-1","english-literature-gcse-aqa-an-inspector-calls-adventure-1":"english-literature-gcse-aqa:-an-inspector-calls-adventure-1","english-literature-gcse-aqa-macbeth-key-quotes-adventure-1":"english-literature-gcse-aqa:-macbeth-key-quotes-adventure-1","english-literature-gcse-aqa-power-conflict-anthology-adventure-1":"english-literature-gcse-aqa:-power--conflict-anthology-adventure-1","english-literature-gcse-edexcel-a-christmas-carol-adventure-1":"english-literature-gcse-edexcel:-a-christmas-carol-adventure-1","english-literature-gcse-edexcel-an-inspector-calls-adventure-1":"english-literature-gcse-edexcel:-an-inspector-calls-adventure-1","english-literature-gcse-edexcel-romeo-and-juliet-adventure-1":"english-literature-gcse-edexcel:-romeo-and-juliet-adventure-1","english-literature-gcse-ocr-an-inspector-calls-adventure-1":"english-literature-gcse-ocr:-an-inspector-calls-adventure-1","english-literature-gcse-ocr-animal-farm-adventure-1":"english-literature-gcse-ocr:-animal-farm-adventure-1","english-literature-gcse-ocr-love-relationships-poetry-adventure-1":"english-literature-gcse-ocr:-love--relationships-poetry-adventure-1","english-literature-gcse-ocr-macbeth-themes-adventure-1":"english-literature-gcse-ocr:-macbeth-themes-adventure-1","english-literature-gcse-power-conflict-poetry-adventure-1":"english-literature-gcse-power--conflict-poetry-adventure-1","english-literature-ks3-character-narrator-adventure-1":"english-literature-ks3-character--narrator-adventure-1","english-literature-ks3-genre-archetype-adventure-1":"english-literature-ks3-genre--archetype-adventure-1","english-literature-ks3-language-metaphor-adventure-1":"english-literature-ks3-language--metaphor-adventure-1","english-literature-ks3-plot-structure-adventure-1":"english-literature-ks3-plot--structure-adventure-1","english-literature-ks3-romeo-juliet-basics-adventure-1":"english-literature-ks3-romeo--juliet-basics-adventure-1","english-literature-ks3-setting-atmosphere-adventure-1":"english-literature-ks3-setting--atmosphere-adventure-1","english-literature-ks3-theme-setting-adventure-1":"english-literature-ks3-theme--setting-adventure-1","environmental-science-a-level-atmospheric-chemistry-ozone-adventure-1":"environmental-science-a-level-atmospheric-chemistry--ozone-adventure-1","environmental-science-a-level-biodiversity-ecosystems-adventure-1":"environmental-science-a-level-biodiversity--ecosystems-adventure-1","environmental-science-a-level-climate-energy-adventure-1":"environmental-science-a-level-climate--energy-adventure-1","environmental-science-a-level-pollution-remediation-adventure-1":"environmental-science-a-level-pollution--remediation-adventure-1","environmental-science-a-level-population-resources-adventure-1":"environmental-science-a-level-population--resources-adventure-1","environmental-science-a-level-soil-science-land-degradation-adventure-1":"environmental-science-a-level-soil-science--land-degradation-adventure-1","environmental-science-gcse-biodiversity-ecosystems-adventure-1":"environmental-science-gcse-biodiversity--ecosystems-adventure-1","environmental-science-gcse-deforestation-land-use-adventure-1":"environmental-science-gcse-deforestation--land-use-adventure-1","environmental-science-gcse-energy-sustainability-adventure-1":"environmental-science-gcse-energy--sustainability-adventure-1","environmental-science-gcse-plastic-waste-microplastics-adventure-1":"environmental-science-gcse-plastic-waste--microplastics-adventure-1","environmental-science-ks3-biodiversity-wildlife-adventure-1":"environmental-science-ks3-biodiversity--wildlife-adventure-1","environmental-science-ks3-cycles-systems-adventure-1":"environmental-science-ks3-cycles--systems-adventure-1","environmental-science-ks3-food-chains-webs-adventure-1":"environmental-science-ks3-food-chains--webs-adventure-1","environmental-science-ks3-habitats-adaptations-adventure-1":"environmental-science-ks3-habitats--adaptations-adventure-1","environmental-science-ks3-pollution-acid-rain-adventure-1":"environmental-science-ks3-pollution--acid-rain-adventure-1","environmental-science-ks3-recycling-waste-adventure-1":"environmental-science-ks3-recycling--waste-adventure-1","environmental-science-ks3-soil-composting-adventure-1":"environmental-science-ks3-soil--composting-adventure-1","environmental-science-ks3-weather-climate-adventure-1":"environmental-science-ks3-weather--climate-adventure-1","food-technology-a-level-food-industry-manufacturing-adventure-1":"food-technology-a-level-food-industry--manufacturing-adventure-1","food-technology-a-level-macronutrients-energy-adventure-1":"food-technology-a-level-macronutrients--energy-adventure-1","food-technology-a-level-microbiology-spoilage-adventure-1":"food-technology-a-level-microbiology--spoilage-adventure-1","food-technology-a-level-special-diets-health-adventure-1":"food-technology-a-level-special-diets--health-adventure-1","food-technology-gcse-food-hygiene-haccp-adventure-1":"food-technology-gcse-food-hygiene--haccp-adventure-1","food-technology-gcse-food-provenance-sustainability-adventure-1":"food-technology-gcse-food-provenance--sustainability-adventure-1","food-technology-gcse-food-science-functions-adventure-1":"food-technology-gcse-food-science--functions-adventure-1","food-technology-gcse-sensory-analysis-evaluation-adventure-1":"food-technology-gcse-sensory-analysis--evaluation-adventure-1","food-technology-ks3-eatwell-guide-nutrients-adventure-1":"food-technology-ks3-eatwell-guide--nutrients-adventure-1","food-technology-ks3-kitchen-safety-hygiene-adventure-1":"food-technology-ks3-kitchen-safety--hygiene-adventure-1","food-technology-ks3-knife-skills-equipment-adventure-1":"food-technology-ks3-knife-skills--equipment-adventure-1","french-a-level-cinema-media-vocabulary-adventure-1":"french-a-level-cinema--media-vocabulary-adventure-1","french-a-level-politics-society-adventure-1":"french-a-level-politics--society-adventure-1","french-gcse-environment-issues-adventure-1":"french-gcse-environment--issues-adventure-1","french-gcse-holidays-travel-adventure-1":"french-gcse-holidays--travel-adventure-1","french-gcse-identity-relationships-adventure-1":"french-gcse-identity--relationships-adventure-1","french-ks3-colours-adjectives-adventure-1":"french-ks3-colours--adjectives-adventure-1","french-ks3-greetings-introductions-adventure-1":"french-ks3-greetings--introductions-adventure-1","french-ks3-numbers-days-adventure-1":"french-ks3-numbers--days-adventure-1","french-ks3-time-daily-routine-adventure-1":"french-ks3-time--daily-routine-adventure-1","geography-a-level-aqa-changing-places-adventure-1":"geography-a-level-aqa:-changing-places-adventure-1","geography-a-level-aqa-coastal-systems-adventure-1":"geography-a-level-aqa:-coastal-systems-adventure-1","geography-a-level-aqa-global-governance-adventure-1":"geography-a-level-aqa:-global-governance-adventure-1","geography-a-level-aqa-water-and-carbon-cycles-adventure-1":"geography-a-level-aqa:-water-and-carbon-cycles-adventure-1","geography-a-level-changing-places-development-adventure-1":"geography-a-level-changing-places--development-adventure-1","geography-a-level-edexcel-diverse-places-adventure-1":"geography-a-level-edexcel:-diverse-places-adventure-1","geography-a-level-edexcel-superpowers-adventure-1":"geography-a-level-edexcel:-superpowers-adventure-1","geography-a-level-edexcel-tectonic-processes-adventure-1":"geography-a-level-edexcel:-tectonic-processes-adventure-1","geography-a-level-edexcel-water-and-insecurity-adventure-1":"geography-a-level-edexcel:-water-and-insecurity-adventure-1","geography-a-level-global-systems-globalisation-adventure-1":"geography-a-level-global-systems--globalisation-adventure-1","geography-a-level-globalisation-tncs-adventure-1":"geography-a-level-globalisation--tncs-adventure-1","geography-a-level-hazard-risk-park-model-adventure-1":"geography-a-level-hazard-risk--park-model-adventure-1","geography-a-level-ocr-coastal-landscapes-adventure-1":"geography-a-level-ocr:-coastal-landscapes-adventure-1","geography-a-level-ocr-earth-life-support-systems-adventure-1":"geography-a-level-ocr:-earth-life-support-systems-adventure-1","geography-a-level-ocr-global-migration-adventure-1":"geography-a-level-ocr:-global-migration-adventure-1","geography-a-level-ocr-hazardous-earth-adventure-1":"geography-a-level-ocr:-hazardous-earth-adventure-1","geography-a-level-water-carbon-cycles-adventure-1":"geography-a-level-water--carbon-cycles-adventure-1","geography-gcse-aqa-changing-economic-world-adventure-1":"geography-gcse-aqa:-changing-economic-world-adventure-1","geography-gcse-aqa-resource-management-water-adventure-1":"geography-gcse-aqa:-resource-management-water-adventure-1","geography-gcse-aqa-tropical-rainforests-adventure-1":"geography-gcse-aqa:-tropical-rainforests-adventure-1","geography-gcse-aqa-uk-coastal-landscapes-adventure-1":"geography-gcse-aqa:-uk-coastal-landscapes-adventure-1","geography-gcse-edexcel-development-dynamics-india-adventure-1":"geography-gcse-edexcel:-development-dynamics-india-adventure-1","geography-gcse-edexcel-hazardous-earth-adventure-1":"geography-gcse-edexcel:-hazardous-earth-adventure-1","geography-gcse-edexcel-uk-evolving-landscape-adventure-1":"geography-gcse-edexcel:-uk-evolving-landscape-adventure-1","geography-gcse-edexcel-urbanising-world-mumbai-adventure-1":"geography-gcse-edexcel:-urbanising-world-mumbai-adventure-1","geography-gcse-global-cities-lagos-adventure-1":"geography-gcse-global-cities--lagos-adventure-1","geography-gcse-ocr-distinctive-landscapes-adventure-1":"geography-gcse-ocr:-distinctive-landscapes-adventure-1","geography-gcse-ocr-ecosystems-of-the-planet-adventure-1":"geography-gcse-ocr:-ecosystems-of-the-planet-adventure-1","geography-gcse-ocr-environmental-threats-adventure-1":"geography-gcse-ocr:-environmental-threats-adventure-1","geography-gcse-ocr-people-of-the-uk-adventure-1":"geography-gcse-ocr:-people-of-the-uk-adventure-1","geography-gcse-rivers-coasts-adventure-1":"geography-gcse-rivers--coasts-adventure-1","geography-gcse-urban-issues-megacities-adventure-1":"geography-gcse-urban-issues--megacities-adventure-1","geography-gcse-weather-climate-adventure-1":"geography-gcse-weather--climate-adventure-1","geography-ibdp-food-health-adventure-1":"geography-ibdp-food--health-adventure-1","geography-ibdp-oceans-coasts-adventure-1":"geography-ibdp-oceans--coasts-adventure-1","geography-ibdp-population-distribution-change-adventure-1":"geography-ibdp-population-distribution--change-adventure-1","geography-ibdp-power-place-networks-hl-adventure-1":"geography-ibdp-power-place--networks-hl-adventure-1","geography-ks3-ecosystems-environment-adventure-1":"geography-ks3-ecosystems--environment-adventure-1","geography-ks3-population-settlement-adventure-1":"geography-ks3-population--settlement-adventure-1","geography-ks3-rivers-coasts-adventure-1":"geography-ks3-rivers--coasts-adventure-1","geography-ks3-tectonics-hazards-adventure-1":"geography-ks3-tectonics--hazards-adventure-1","geography-ks3-volcanoes-eruptions-adventure-1":"geography-ks3-volcanoes--eruptions-adventure-1","geography-ks3-weather-climate-adventure-1":"geography-ks3-weather--climate-adventure-1","german-a-level-digital-society-media-adventure-1":"german-a-level-digital-society--media-adventure-1","german-a-level-immigration-integration-adventure-1":"german-a-level-immigration--integration-adventure-1","german-a-level-politics-democracy-adventure-1":"german-a-level-politics--democracy-adventure-1","german-a-level-reunification-ddr-adventure-1":"german-a-level-reunification--ddr-adventure-1","german-gcse-environment-global-issues-adventure-1":"german-gcse-environment--global-issues-adventure-1","german-gcse-future-plans-work-adventure-1":"german-gcse-future-plans--work-adventure-1","german-gcse-identity-relationships-adventure-1":"german-gcse-identity--relationships-adventure-1","german-gcse-local-area-town-adventure-1":"german-gcse-local-area--town-adventure-1","german-gcse-school-studies-adventure-1":"german-gcse-school--studies-adventure-1","german-ks3-colours-clothing-adventure-1":"german-ks3-colours--clothing-adventure-1","german-ks3-greetings-introductions-adventure-1":"german-ks3-greetings--introductions-adventure-1","german-ks3-hobbies-free-time-adventure-1":"german-ks3-hobbies--free-time-adventure-1","german-ks3-numbers-dates-adventure-1":"german-ks3-numbers--dates-adventure-1","history-a-level-ancient-medieval-adventure-1":"history-a-level-ancient--medieval-adventure-1","history-a-level-aqa-cold-war-1945-91-adventure-1":"history-a-level-aqa:-cold-war-1945-91-adventure-1","history-a-level-aqa-russia-1855-1964-adventure-1":"history-a-level-aqa:-russia-1855-1964-adventure-1","history-a-level-aqa-tudors-1485-1603-adventure-1":"history-a-level-aqa:-tudors-1485-1603-adventure-1","history-a-level-aqa-usa-1865-1975-adventure-1":"history-a-level-aqa:-usa-1865-1975-adventure-1","history-a-level-cold-war-20th-century-adventure-1":"history-a-level-cold-war--20th-century-adventure-1","history-a-level-early-modern-industrial-adventure-1":"history-a-level-early-modern--industrial-adventure-1","history-a-level-edexcel-britain-transformed-1918-97-adventure-1":"history-a-level-edexcel:-britain-transformed-1918-97-adventure-1","history-a-level-edexcel-civil-rights-race-in-usa-1850-2009-adventure-1":"history-a-level-edexcel:-civil-rights--race-in-usa-1850-2009-adventure-1","history-a-level-edexcel-maos-china-1949-76-adventure-1":"history-a-level-edexcel:-maos-china-1949-76-adventure-1","history-a-level-edexcel-russia-1894-1924-adventure-1":"history-a-level-edexcel:-russia-1894-1924-adventure-1","history-a-level-empire-decolonisation-adventure-1":"history-a-level-empire--decolonisation-adventure-1","history-a-level-ocr-russia-1894-1941-adventure-1":"history-a-level-ocr:-russia-1894-1941-adventure-1","history-a-level-ocr-stuart-britain-1603-1714-adventure-1":"history-a-level-ocr:-stuart-britain-1603-1714-adventure-1","history-a-level-ocr-tudors-1485-1603-adventure-1":"history-a-level-ocr:-tudors-1485-1603-adventure-1","history-a-level-ocr-witch-craze-1580-1750-adventure-1":"history-a-level-ocr:-witch-craze-1580-1750-adventure-1","history-a-level-russia-china-adventure-1":"history-a-level-russia--china-adventure-1","history-a-level-tudor-renaissance-adventure-1":"history-a-level-tudor--renaissance-adventure-1","history-a-level-usa-civil-rights-adventure-1":"history-a-level-usa--civil-rights-adventure-1","history-gcse-aqa-conflict-tension-1894-1918-adventure-1":"history-gcse-aqa:-conflict--tension-1894-1918-adventure-1","history-gcse-aqa-elizabethan-england-1568-1603-adventure-1":"history-gcse-aqa:-elizabethan-england-1568-1603-adventure-1","history-gcse-aqa-health-the-people-adventure-1":"history-gcse-aqa:-health--the-people-adventure-1","history-gcse-aqa-power-the-people-adventure-1":"history-gcse-aqa:-power--the-people-adventure-1","history-gcse-civil-rights-equality-adventure-1":"history-gcse-civil-rights--equality-adventure-1","history-gcse-cold-war-20th-century-adventure-1":"history-gcse-cold-war--20th-century-adventure-1","history-gcse-edexcel-early-elizabethan-england-1558-88-adventure-1":"history-gcse-edexcel:-early-elizabethan-england-1558-88-adventure-1","history-gcse-edexcel-medicine-through-time-adventure-1":"history-gcse-edexcel:-medicine-through-time-adventure-1","history-gcse-edexcel-superpower-relations-cold-war-adventure-1":"history-gcse-edexcel:-superpower-relations--cold-war-adventure-1","history-gcse-edexcel-weimar-nazi-germany-1918-39-adventure-1":"history-gcse-edexcel:-weimar--nazi-germany-1918-39-adventure-1","history-gcse-medieval-early-modern-adventure-1":"history-gcse-medieval--early-modern-adventure-1","history-gcse-ocr-living-under-nazi-rule-1933-45-adventure-1":"history-gcse-ocr:-living-under-nazi-rule-1933-45-adventure-1","history-gcse-ocr-migrants-to-britain-c.1250-present-adventure-1":"history-gcse-ocr:-migrants-to-britain-c.1250-present-adventure-1","history-gcse-ocr-power-monarchy-democracy-adventure-1":"history-gcse-ocr:-power:-monarchy--democracy-adventure-1","history-gcse-ocr-viet-nam-1955-75-adventure-1":"history-gcse-ocr:-viet-nam-1955-75-adventure-1","history-gcse-weimar-nazi-germany-adventure-1":"history-gcse-weimar--nazi-germany-adventure-1","history-ibdp-causes-effects-of-wars-adventure-1":"history-ibdp-causes--effects-of-wars-adventure-1","history-ibdp-rights-protest-adventure-1":"history-ibdp-rights--protest-adventure-1","history-ibdp-society-economy-750-1400-adventure-1":"history-ibdp-society--economy-750-1400-adventure-1","history-ks3-20th-century-war-adventure-1":"history-ks3-20th-century--war-adventure-1","history-ks3-empire-slavery-adventure-1":"history-ks3-empire--slavery-adventure-1","history-ks3-tudor-stuart-adventure-1":"history-ks3-tudor--stuart-adventure-1","maths-a-level-hypothesis-testing-distributions-adventure-1":"maths-a-level-hypothesis-testing--distributions-adventure-1","maths-a-level-mechanics-kinematics-adventure-1":"maths-a-level-mechanics---kinematics-adventure-1","maths-a-level-pure-algebra-proof-adventure-1":"maths-a-level-pure---algebra--proof-adventure-1","maths-a-level-pure-calculus-adventure-1":"maths-a-level-pure---calculus-adventure-1","maths-a-level-pure-sequences-series-adventure-1":"maths-a-level-pure---sequences--series-adventure-1","maths-a-level-pure-trigonometry-adventure-1":"maths-a-level-pure---trigonometry-adventure-1","maths-a-level-pure-vectors-adventure-1":"maths-a-level-pure---vectors-adventure-1","maths-ibdp-geometry-trigonometry-adventure-1":"maths-ibdp-geometry--trigonometry-adventure-1","maths-ibdp-number-algebra-adventure-1":"maths-ibdp-number--algebra-adventure-1","maths-ibdp-statistics-distributions-hl-adventure-1":"maths-ibdp-statistics--distributions-hl-adventure-1","maths-ibdp-statistics-probability-adventure-1":"maths-ibdp-statistics--probability-adventure-1","maths-ks3-angles-polygons-adventure-1":"maths-ks3-angles--polygons-adventure-1","maths-ks3-coordinates-linear-graphs-adventure-1":"maths-ks3-coordinates--linear-graphs-adventure-1","maths-ks3-data-handling-averages-adventure-1":"maths-ks3-data-handling--averages-adventure-1","maths-ks3-fractions-decimals-percentages-adventure-1":"maths-ks3-fractions-decimals--percentages-adventure-1","maths-ks3-geometry-measure-adventure-1":"maths-ks3-geometry--measure-adventure-1","maths-ks3-number-calculation-adventure-1":"maths-ks3-number--calculation-adventure-1","maths-ks3-ratio-probability-adventure-1":"maths-ks3-ratio--probability-adventure-1","maths-ks3-sequences-patterns-adventure-1":"maths-ks3-sequences--patterns-adventure-1","music-a-level-20th-century-modernism-adventure-1":"music-a-level-20th-century--modernism-adventure-1","music-a-level-analysis-aural-skills-adventure-1":"music-a-level-analysis--aural-skills-adventure-1","music-a-level-appraising-analysis-adventure-1":"music-a-level-appraising--analysis-adventure-1","music-a-level-jazz-styles-theory-adventure-1":"music-a-level-jazz-styles--theory-adventure-1","music-a-level-music-history-theory-adventure-1":"music-a-level-music-history--theory-adventure-1","music-a-level-notation-score-reading-adventure-1":"music-a-level-notation--score-reading-adventure-1","music-gcse-chords-harmony-adventure-1":"music-gcse-chords--harmony-adventure-1","music-gcse-film-game-music-adventure-1":"music-gcse-film--game-music-adventure-1","music-gcse-listening-appraising-adventure-1":"music-gcse-listening--appraising-adventure-1","music-ks3-genres-instruments-adventure-1":"music-ks3-genres--instruments-adventure-1","music-ks3-harmony-texture-adventure-1":"music-ks3-harmony--texture-adventure-1","music-ks3-notation-structure-adventure-1":"music-ks3-notation--structure-adventure-1","music-ks3-pitch-dynamics-adventure-1":"music-ks3-pitch--dynamics-adventure-1","music-ks3-rhythm-melody-adventure-1":"music-ks3-rhythm--melody-adventure-1","music-ks3-tempo-timing-adventure-1":"music-ks3-tempo--timing-adventure-1","music-ks3-voice-singing-adventure-1":"music-ks3-voice--singing-adventure-1","pe-a-level-anatomy-physiology-adventure-1":"pe-a-level-anatomy--physiology-adventure-1","pe-a-level-arousal-anxiety-adventure-1":"pe-a-level-arousal--anxiety-adventure-1","pe-a-level-levers-biomechanics-adventure-1":"pe-a-level-levers--biomechanics-adventure-1","pe-a-level-sport-society-adventure-1":"pe-a-level-sport--society-adventure-1","pe-a-level-vo2-max-aerobic-capacity-adventure-1":"pe-a-level-vo2-max--aerobic-capacity-adventure-1","pe-gcse-anatomy-physiology-adventure-1":"pe-gcse-anatomy--physiology-adventure-1","pe-gcse-health-fitness-adventure-1":"pe-gcse-health--fitness-adventure-1","pe-ks3-anatomy-movement-adventure-1":"pe-ks3-anatomy--movement-adventure-1","pe-ks3-fitness-training-adventure-1":"pe-ks3-fitness--training-adventure-1","pe-ks3-health-nutrition-adventure-1":"pe-ks3-health--nutrition-adventure-1","pe-ks3-healthy-eating-hydration-adventure-1":"pe-ks3-healthy-eating--hydration-adventure-1","pe-ks3-muscles-bones-adventure-1":"pe-ks3-muscles--bones-adventure-1","pe-ks3-outdoor-adventurous-activities-adventure-1":"pe-ks3-outdoor--adventurous-activities-adventure-1","pe-ks3-skill-tactics-adventure-1":"pe-ks3-skill--tactics-adventure-1","pe-ks3-team-sports-tactics-adventure-1":"pe-ks3-team-sports--tactics-adventure-1","pe-ks3-warm-up-cool-down-adventure-1":"pe-ks3-warm-up--cool-down-adventure-1","physics-a-level-capacitance-capacitors-adventure-1":"physics-a-level-capacitance--capacitors-adventure-1","physics-a-level-cosmology-hubbles-law-adventure-1":"physics-a-level-cosmology--hubbles-law-adventure-1","physics-a-level-further-mechanics-shm-adventure-1":"physics-a-level-further-mechanics--shm-adventure-1","physics-a-level-nuclear-particle-physics-adventure-1":"physics-a-level-nuclear--particle-physics-adventure-1","physics-a-level-particle-physics-quarks-adventure-1":"physics-a-level-particle-physics--quarks-adventure-1","physics-a-level-waves-optics-adventure-1":"physics-a-level-waves--optics-adventure-1","physics-ibdp-atomic-nuclear-particle-physics-adventure-1":"physics-ibdp-atomic-nuclear--particle-physics-adventure-1","physics-ibdp-circular-motion-gravitation-adventure-1":"physics-ibdp-circular-motion--gravitation-adventure-1","physics-ibdp-electricity-magnetism-adventure-1":"physics-ibdp-electricity--magnetism-adventure-1","physics-ibdp-measurements-uncertainties-adventure-1":"physics-ibdp-measurements--uncertainties-adventure-1","physics-ibdp-quantum-nuclear-physics-hl-adventure-1":"physics-ibdp-quantum--nuclear-physics-hl-adventure-1","physics-ks3-earth-space-adventure-1":"physics-ks3-earth--space-adventure-1","physics-ks3-electricity-magnetism-adventure-1":"physics-ks3-electricity--magnetism-adventure-1","physics-ks3-energy-stores-transfers-adventure-1":"physics-ks3-energy-stores--transfers-adventure-1","physics-ks3-forces-motion-adventure-1":"physics-ks3-forces--motion-adventure-1","physics-ks3-magnets-electromagnets-adventure-1":"physics-ks3-magnets--electromagnets-adventure-1","physics-ks3-pressure-density-adventure-1":"physics-ks3-pressure--density-adventure-1","physics-ks3-speed-distance-time-adventure-1":"physics-ks3-speed-distance--time-adventure-1","physics-ks3-waves-sound-adventure-1":"physics-ks3-waves--sound-adventure-1","psychology-a-level-issues-debates-adventure-1":"psychology-a-level-issues--debates-adventure-1","psychology-a-level-schizophrenia-depression-adventure-1":"psychology-a-level-schizophrenia--depression-adventure-1","psychology-a-level-statistics-methodology-adventure-1":"psychology-a-level-statistics--methodology-adventure-1","psychology-gcse-aggression-violence-adventure-1":"psychology-gcse-aggression--violence-adventure-1","psychology-gcse-brain-nervous-system-adventure-1":"psychology-gcse-brain--nervous-system-adventure-1","psychology-gcse-brain-neuropsychology-adventure-1":"psychology-gcse-brain--neuropsychology-adventure-1","psychology-gcse-conformity-obedience-adventure-1":"psychology-gcse-conformity--obedience-adventure-1","psychology-gcse-memory-perception-adventure-1":"psychology-gcse-memory--perception-adventure-1","psychology-gcse-mental-health-therapy-adventure-1":"psychology-gcse-mental-health--therapy-adventure-1","psychology-ks3-brain-behaviour-adventure-1":"psychology-ks3-brain--behaviour-adventure-1","psychology-ks3-development-attachment-adventure-1":"psychology-ks3-development--attachment-adventure-1","psychology-ks3-emotion-perception-adventure-1":"psychology-ks3-emotion--perception-adventure-1","psychology-ks3-emotions-feelings-adventure-1":"psychology-ks3-emotions--feelings-adventure-1","psychology-ks3-friendship-bullying-adventure-1":"psychology-ks3-friendship--bullying-adventure-1","psychology-ks3-learning-conditioning-adventure-1":"psychology-ks3-learning--conditioning-adventure-1","psychology-ks3-memory-learning-adventure-1":"psychology-ks3-memory--learning-adventure-1","psychology-ks3-senses-attention-adventure-1":"psychology-ks3-senses--attention-adventure-1","psychology-ks3-sleep-dreams-adventure-1":"psychology-ks3-sleep--dreams-adventure-1","religious-studies-a-level-aqa-christianity-study-of-religion-adventure-1":"religious-studies-a-level-aqa:-christianity:-study-of-religion-adventure-1","religious-studies-a-level-aqa-dialogues-religious-language-adventure-1":"religious-studies-a-level-aqa:-dialogues--religious-language-adventure-1","religious-studies-a-level-aqa-ethics-moral-theory-adventure-1":"religious-studies-a-level-aqa:-ethics--moral-theory-adventure-1","religious-studies-a-level-aqa-philosophy-of-religion-adventure-1":"religious-studies-a-level-aqa:-philosophy-of-religion-adventure-1","religious-studies-a-level-edexcel-new-testament-studies-adventure-1":"religious-studies-a-level-edexcel:-new-testament-studies-adventure-1","religious-studies-a-level-edexcel-philosophy-of-religion-adventure-1":"religious-studies-a-level-edexcel:-philosophy-of-religion-adventure-1","religious-studies-a-level-edexcel-religion-ethics-adventure-1":"religious-studies-a-level-edexcel:-religion--ethics-adventure-1","religious-studies-a-level-edexcel-study-of-religion-christianity-adventure-1":"religious-studies-a-level-edexcel:-study-of-religion:-christianity-adventure-1","religious-studies-a-level-ocr-developments-in-christian-thought-adventure-1":"religious-studies-a-level-ocr:-developments-in-christian-thought-adventure-1","religious-studies-a-level-ocr-philosophy-of-religion-adventure-1":"religious-studies-a-level-ocr:-philosophy-of-religion-adventure-1","religious-studies-a-level-ocr-religion-ethics-adventure-1":"religious-studies-a-level-ocr:-religion--ethics-adventure-1","religious-studies-a-level-ocr-religious-language-experience-adventure-1":"religious-studies-a-level-ocr:-religious-language--experience-adventure-1","religious-studies-gcse-aqa-existence-of-god-revelation-adventure-1":"religious-studies-gcse-aqa:-existence-of-god--revelation-adventure-1","religious-studies-gcse-aqa-islam-beliefs-practices-adventure-1":"religious-studies-gcse-aqa:-islam-beliefs--practices-adventure-1","religious-studies-gcse-aqa-religion-peace-conflict-adventure-1":"religious-studies-gcse-aqa:-religion-peace--conflict-adventure-1","religious-studies-gcse-crime-punishment-adventure-1":"religious-studies-gcse-crime--punishment-adventure-1","religious-studies-gcse-edexcel-christianity-beliefs-ethics-adventure-1":"religious-studies-gcse-edexcel:-christianity-beliefs--ethics-adventure-1","religious-studies-gcse-edexcel-crime-punishment-adventure-1":"religious-studies-gcse-edexcel:-crime--punishment-adventure-1","religious-studies-gcse-edexcel-human-rights-social-justice-adventure-1":"religious-studies-gcse-edexcel:-human-rights--social-justice-adventure-1","religious-studies-gcse-edexcel-peace-conflict-adventure-1":"religious-studies-gcse-edexcel:-peace--conflict-adventure-1","religious-studies-gcse-ethics-relationships-adventure-1":"religious-studies-gcse-ethics--relationships-adventure-1","religious-studies-gcse-ocr-islam-beliefs-practices-adventure-1":"religious-studies-gcse-ocr:-islam-beliefs--practices-adventure-1","religious-studies-gcse-ocr-religion-philosophy-ethics-adventure-1":"religious-studies-gcse-ocr:-religion-philosophy--ethics-adventure-1","religious-studies-gcse-peace-conflict-adventure-1":"religious-studies-gcse-peace--conflict-adventure-1","religious-studies-gcse-religion-society-adventure-1":"religious-studies-gcse-religion--society-adventure-1","religious-studies-ibdp-religion-human-nature-adventure-1":"religious-studies-ibdp-religion--human-nature-adventure-1","religious-studies-ibdp-religion-society-adventure-1":"religious-studies-ibdp-religion--society-adventure-1","religious-studies-ks3-ethics-morality-adventure-1":"religious-studies-ks3-ethics--morality-adventure-1","religious-studies-ks3-philosophy-big-questions-adventure-1":"religious-studies-ks3-philosophy--big-questions-adventure-1","religious-studies-ks3-sacred-texts-practices-adventure-1":"religious-studies-ks3-sacred-texts--practices-adventure-1","sociology-a-level-beliefs-secularisation-adventure-1":"sociology-a-level-beliefs--secularisation-adventure-1","sociology-a-level-crime-deviance-adventure-1":"sociology-a-level-crime--deviance-adventure-1","sociology-a-level-crime-subcultures-adventure-1":"sociology-a-level-crime--subcultures-adventure-1","sociology-a-level-education-class-adventure-1":"sociology-a-level-education--class-adventure-1","sociology-a-level-methods-methodology-adventure-1":"sociology-a-level-methods--methodology-adventure-1","sociology-a-level-stratification-differentiation-adventure-1":"sociology-a-level-stratification--differentiation-adventure-1","sociology-a-level-theory-methods-adventure-1":"sociology-a-level-theory--methods-adventure-1","sociology-gcse-crime-deviance-adventure-1":"sociology-gcse-crime--deviance-adventure-1","sociology-gcse-interactionism-labelling-theory-adventure-1":"sociology-gcse-interactionism--labelling-theory-adventure-1","sociology-gcse-power-politics-adventure-1":"sociology-gcse-power--politics-adventure-1","sociology-ks3-class-poverty-adventure-1":"sociology-ks3-class--poverty-adventure-1","sociology-ks3-crime-society-adventure-1":"sociology-ks3-crime--society-adventure-1","sociology-ks3-family-identity-adventure-1":"sociology-ks3-family--identity-adventure-1","sociology-ks3-globalisation-culture-adventure-1":"sociology-ks3-globalisation--culture-adventure-1","sociology-ks3-media-religion-adventure-1":"sociology-ks3-media--religion-adventure-1","sociology-ks3-norms-values-adventure-1":"sociology-ks3-norms--values-adventure-1","sociology-ks3-school-education-adventure-1":"sociology-ks3-school--education-adventure-1","sociology-ks3-youth-subcultures-adventure-1":"sociology-ks3-youth--subcultures-adventure-1","spanish-a-level-cinema-media-vocabulary-adventure-1":"spanish-a-level-cinema--media-vocabulary-adventure-1","spanish-a-level-politics-society-adventure-1":"spanish-a-level-politics--society-adventure-1","spanish-gcse-environment-issues-adventure-1":"spanish-gcse-environment--issues-adventure-1","spanish-gcse-identity-relationships-adventure-1":"spanish-gcse-identity--relationships-adventure-1","spanish-ks3-colours-adjectives-adventure-1":"spanish-ks3-colours--adjectives-adventure-1","spanish-ks3-greetings-introductions-adventure-1":"spanish-ks3-greetings--introductions-adventure-1","spanish-ks3-numbers-days-adventure-1":"spanish-ks3-numbers--days-adventure-1","spanish-ks3-sports-hobbies-adventure-1":"spanish-ks3-sports--hobbies-adventure-1"};
  Arcade.CONTENT_VERSION = '20260621'; // bump on any spec/vocab data change to bust browser cache
  // Widen a spec's concept pool with the topic's full vocab-pack term list (the
  // same, larger bank the vocab-hub games like Matching Pairs use). Spec files
  // only carry ~6 concepts, so games like Falling Words felt repetitive; the
  // vocab pack often has 12–18 terms for the same topic. Merge by term (spec
  // definitions win), only ever GROWING the pool. Fails safe to the spec as-is.
  Arcade.augmentConcepts = async function (spec, dir) {
    try {
      if (!spec || !spec.subject || !spec.level || !spec.topic_slug) return spec;
      const base = (dir || '../adventures/_specs').replace(/adventures\/_specs\/?$/, 'arcade/vocab');
      const r = await fetch(base + '/' + spec.subject + '-' + spec.level + '.json?v=' + Arcade.CONTENT_VERSION);
      if (!r.ok) return spec;
      const pack = await r.json();
      const t = pack.topics && pack.topics[spec.topic_slug];
      if (!t || !Array.isArray(t.terms)) return spec;
      const specC = (spec.concepts || []).filter(c => c && c.term && c.def);
      const seen = new Set(specC.map(c => String(c.term).toLowerCase()));
      const merged = specC.slice();
      for (const pair of t.terms) {
        if (Array.isArray(pair) && pair[0] && pair[1]) {
          const k = String(pair[0]).toLowerCase();
          if (!seen.has(k)) { seen.add(k); merged.push({ term: String(pair[0]), def: String(pair[1]) }); }
        }
      }
      if (merged.length > specC.length) spec.concepts = merged;
    } catch (e) { /* keep spec as-is */ }
    return spec;
  };

  Arcade.fetchSpecJson = async function (stem, dir) {
    if (Arcade.SPEC_ALIASES && Arcade.SPEC_ALIASES[stem]) stem = Arcade.SPEC_ALIASES[stem];
    for (const cand of Arcade.stemCandidates(stem)) {
      try {
        const r = await fetch(dir + '/' + encodeURIComponent(cand) + '.json?v=' + Arcade.CONTENT_VERSION);
        if (r.ok) { const j = await r.json(); await Arcade.augmentConcepts(j, dir); return j; }
      } catch (e) { /* try next */ }
    }
    return null;
  };

  Arcade.vibrate = function (pattern) {
    try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (e) {}
  };

  /* ---------------- sound: tiny WebAudio synth --------------------------- */
  const MUTE_KEY = 'aism-arcade-muted';
  let ctx = null;
  let muted = false;
  try { muted = localStorage.getItem(MUTE_KEY) === '1'; } catch (e) {}

  function audio() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx;
  }
  // Unlock audio on first gesture (iOS requirement).
  ['pointerdown', 'keydown', 'touchstart'].forEach(ev =>
    document.addEventListener(ev, function unlock() {
      audio();
      document.removeEventListener(ev, unlock);
    }, { once: true, passive: true }));

  function tone(freq, opts) {
    if (muted) return;
    const ac = audio();
    if (!ac) return;
    const o = opts || {};
    const t0 = ac.currentTime + (o.delay || 0);
    const dur = o.dur || 0.12;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = o.type || 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    if (o.glide) osc.frequency.exponentialRampToValueAtTime(o.glide, t0 + dur);
    const vol = o.vol || 0.16;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain).connect(ac.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }
  function noise(opts) {
    if (muted) return;
    const ac = audio();
    if (!ac) return;
    const o = opts || {};
    const dur = o.dur || 0.18;
    const t0 = ac.currentTime + (o.delay || 0);
    const len = Math.max(1, Math.floor(ac.sampleRate * dur));
    const buf = ac.createBuffer(1, len, ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ac.createBufferSource();
    src.buffer = buf;
    const filt = ac.createBiquadFilter();
    filt.type = o.filter || 'lowpass';
    filt.frequency.value = o.freq || 900;
    const gain = ac.createGain();
    gain.gain.value = o.vol || 0.12;
    src.connect(filt).connect(gain).connect(ac.destination);
    src.start(t0);
  }

  // Pentatonic ladder so longer streaks literally sound higher.
  const LADDER = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.7, 1318.5, 1568, 1760];

  Arcade.sfx = {
    get muted() { return muted; },
    set muted(v) {
      muted = !!v;
      try { localStorage.setItem(MUTE_KEY, muted ? '1' : '0'); } catch (e) {}
    },
    correct(streak) {
      const i = Math.min(Math.max((streak || 1) - 1, 0), LADDER.length - 3);
      tone(LADDER[i],     { type: 'triangle', dur: 0.09, vol: 0.18 });
      tone(LADDER[i + 2], { type: 'triangle', dur: 0.14, vol: 0.16, delay: 0.07 });
    },
    wrong() {
      tone(196, { type: 'sawtooth', dur: 0.22, vol: 0.1, glide: 110 });
      noise({ dur: 0.12, freq: 400, vol: 0.06 });
    },
    click()  { tone(880,  { type: 'sine', dur: 0.045, vol: 0.07 }); },
    tick()   { tone(1200, { type: 'sine', dur: 0.03,  vol: 0.05 }); },
    timeup() {
      tone(330, { type: 'square', dur: 0.16, vol: 0.09 });
      tone(247, { type: 'square', dur: 0.3,  vol: 0.09, delay: 0.14 });
    },
    coin() {
      tone(987.77, { type: 'square', dur: 0.06, vol: 0.08 });
      tone(1318.5, { type: 'square', dur: 0.18, vol: 0.08, delay: 0.055 });
    },
    swoosh() { noise({ dur: 0.22, freq: 2400, vol: 0.05, filter: 'bandpass' }); },
    heartbeat() {
      tone(80, { type: 'sine', dur: 0.09, vol: 0.22 });
      tone(70, { type: 'sine', dur: 0.12, vol: 0.18, delay: 0.18 });
    },
    riser() {
      for (let i = 0; i < 7; i++) tone(300 + i * 90, { type: 'sawtooth', dur: 0.07, vol: 0.045, delay: i * 0.05 });
    },
    fanfare() {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
        tone(f, { type: 'triangle', dur: i === 3 ? 0.5 : 0.13, vol: 0.16, delay: i * 0.11 }));
      noise({ dur: 0.4, freq: 3000, vol: 0.04, filter: 'highpass', delay: 0.33 });
    },
  };

  Arcade.mountMuteButton = function () {
    if (document.querySelector('.ar-mute')) return;
    const b = document.createElement('button');
    b.className = 'ar-mute';
    b.type = 'button';
    function sync() {
      b.textContent = muted ? '🔇' : '🔊';
      b.setAttribute('aria-label', muted ? 'Unmute sound effects' : 'Mute sound effects');
    }
    sync();
    b.addEventListener('click', () => {
      Arcade.sfx.muted = !muted;
      sync();
      if (!muted) Arcade.sfx.coin();
    });
    document.body.appendChild(b);
  };

  /* ---------------- confetti --------------------------------------------- */
  let confettiCanvas = null, confettiCtx2d = null, particles = [], confettiRAF = null;
  const COLORS = ['#00ffa3', '#00e5ff', '#ffd60a', '#ff2e88', '#8b5cf6', '#ffffff'];
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function confettiLayer() {
    if (!confettiCanvas) {
      confettiCanvas = document.createElement('canvas');
      confettiCanvas.id = 'ar-confetti';
      document.body.appendChild(confettiCanvas);
      confettiCtx2d = confettiCanvas.getContext('2d');
    }
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    return confettiCtx2d;
  }
  function confettiLoop() {
    const c = confettiCtx2d;
    c.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    particles = particles.filter(p => p.life > 0);
    if (!particles.length) { confettiRAF = null; return; }
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.18; p.vx *= 0.99;
      p.rot += p.vr; p.life -= 1;
      c.save();
      c.translate(p.x, p.y);
      c.rotate(p.rot);
      c.globalAlpha = Math.min(1, p.life / 30);
      c.fillStyle = p.color;
      c.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
      c.restore();
    }
    confettiRAF = requestAnimationFrame(confettiLoop);
  }
  Arcade.confettiBurst = function (opts) {
    if (reducedMotion) return;
    const o = opts || {};
    confettiLayer();
    const x = o.x != null ? o.x : window.innerWidth / 2;
    const y = o.y != null ? o.y : window.innerHeight * 0.35;
    const n = o.count || 60;
    const colors = o.colors || COLORS;
    for (let i = 0; i < n; i++) {
      const ang = Math.random() * Math.PI * 2;
      const v = 3 + Math.random() * 8;
      particles.push({
        x, y,
        vx: Math.cos(ang) * v, vy: Math.sin(ang) * v - 4,
        s: 5 + Math.random() * 7, rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 70 + Math.random() * 50,
      });
    }
    if (!confettiRAF) confettiRAF = requestAnimationFrame(confettiLoop);
  };
  Arcade.confettiRain = function (ms) {
    if (reducedMotion) return;
    confettiLayer();
    const end = Date.now() + (ms || 1600);
    (function drop() {
      for (let i = 0; i < 7; i++) {
        particles.push({
          x: Math.random() * window.innerWidth, y: -12,
          vx: (Math.random() - 0.5) * 2, vy: 2 + Math.random() * 3,
          s: 5 + Math.random() * 7, rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.25,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          life: 130,
        });
      }
      if (!confettiRAF) confettiRAF = requestAnimationFrame(confettiLoop);
      if (Date.now() < end) setTimeout(drop, 60);
    })();
  };

  /* ---------------- juice: shake, floats, flashes ------------------------- */
  Arcade.shake = function () {
    if (reducedMotion) return;
    document.body.classList.remove('ar-shake');
    void document.body.offsetWidth; // restart animation
    document.body.classList.add('ar-shake');
    setTimeout(() => document.body.classList.remove('ar-shake'), 400);
  };

  Arcade.popText = function (text, x, y, color) {
    const el = document.createElement('div');
    el.className = 'ar-float';
    el.textContent = text;
    el.style.left = (x - 20) + 'px';
    el.style.top = (y - 16) + 'px';
    el.style.color = color || '#00ffa3';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 950);
  };
  Arcade.popTextOver = function (el, text, color) {
    const r = el.getBoundingClientRect();
    Arcade.popText(text, r.left + r.width / 2, r.top, color);
  };

  Arcade.flashMsg = function (text, color) {
    const el = document.createElement('div');
    el.className = 'ar-flash-msg';
    el.textContent = text;
    el.style.color = color || '#00ffa3';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 900);
  };
  Arcade.streakCall = function (n) {
    const calls = { 3: ['ON FIRE 🔥', '#ffd60a'], 5: ['UNSTOPPABLE ⚡', '#00e5ff'], 7: ['GODLIKE 👑', '#ff2e88'], 10: ['LEGENDARY 💎', '#8b5cf6'] };
    if (calls[n]) {
      Arcade.flashMsg(calls[n][0], calls[n][1]);
      Arcade.sfx.riser();
      Arcade.vibrate([30, 40, 60]);
    }
  };

  Arcade.countUp = function (el, to, ms, suffix) {
    const dur = ms || 800;
    const start = performance.now();
    const from = 0;
    (function step(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(from + (to - from) * eased) + (suffix || '');
      if (t < 1) requestAnimationFrame(step);
    })(performance.now());
  };

  /* ---------------- grading + end card ------------------------------------ */
  Arcade.grade = function (pct) {
    if (pct >= 95) return { letter: 'S', cls: 's', line: 'Certified topic slayer.' };
    if (pct >= 80) return { letter: 'A', cls: 'a', line: 'Seriously sharp. One run from perfection.' };
    if (pct >= 60) return { letter: 'B', cls: 'b', line: 'Solid — the gaps are showing themselves.' };
    if (pct >= 40) return { letter: 'C', cls: 'c', line: 'Warmed up. Now go again and beat it.' };
    return { letter: 'D', cls: 'd', line: 'Brutal round. Revenge run?' };
  };

  // Shareable results card. Renders into `container` and wires buttons.
  /* ---------------------------------------------------------------------- *
   * Parent share — student sends their result + a link to the parent landing
   * page (for-parents.html), which carries the £25 course pitch. This is the
   * bridge from free player (the student) to buyer (the parent). Works in
   * every game: native share sheet on mobile, clipboard copy on desktop.
   * ---------------------------------------------------------------------- */
  Arcade.shareWithParents = async function (opts) {
    opts = opts || {};
    let url;
    try { url = new URL('../../for-parents.html', location.href); }
    catch (e) { url = new URL('https://aistudymethod.com/for-parents.html'); }
    const p = url.searchParams;
    if (opts.score != null) p.set('s', String(opts.score));
    if (opts.total != null) p.set('t', String(opts.total));
    if (opts.subject) p.set('subj', opts.subject);
    if (opts.level)   p.set('level', opts.level);
    if (opts.topic)   p.set('topic', opts.topic);
    p.set('utm_source', 'arcade');
    p.set('utm_medium', 'parent_share');
    p.set('utm_campaign', 'parent_invite');
    const link = url.toString();

    const scoreStr = opts.score != null
      ? (opts.total != null ? opts.score + '/' + opts.total : String(opts.score))
      : null;
    const topicBit = opts.topic ? (' ' + opts.topic) : '';
    const msg = '📚 I’ve been revising' + topicBit + ' on AI Study Method'
      + (scoreStr ? ' and just scored ' + scoreStr : '')
      + '! Can we get the full Velvet Method course? It teaches you to revise any subject'
      + ' using AI — built by teachers, £25 for life.';

    if (navigator.share) {
      try {
        await navigator.share({ title: 'AI Study Method', text: msg, url: link });
        return { ok: true, method: 'native-share' };
      } catch (err) {
        if (err && err.name === 'AbortError') return { ok: false, cancelled: true };
        // else fall through to clipboard
      }
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(msg + '\n' + link);
        return { ok: true, method: 'clipboard' };
      }
    } catch (err) { /* swallow */ }
    try { window.open(link, '_blank'); return { ok: true, method: 'open' }; }
    catch (err) { return { ok: false }; }
  };

  Arcade.renderEndCard = function (container, opts) {
    const e = Arcade.escapeHtml;
    const g = Arcade.grade(opts.pct);
    const hot = opts.hot || g.cls === 'd';

    let best = null, newBest = false;
    if (opts.bestKey != null && opts.bestValue != null) {
      try { best = parseInt(localStorage.getItem(opts.bestKey)); } catch (err) {}
      if (isNaN(best)) best = null;
      newBest = best === null || opts.bestValue > best;
      if (newBest) { try { localStorage.setItem(opts.bestKey, String(opts.bestValue)); } catch (err) {} }
    }

    /* Result log — a rolling history of runs (capped at 200, oldest dropped)
       that powers the arcade lobby REVENGE rail. Best-effort only: any
       storage or parse failure is swallowed, the end card must never break. */
    try {
      let hist = [];
      try { hist = JSON.parse(localStorage.getItem('aism-results') || '[]'); } catch (err2) { hist = []; }
      if (!Array.isArray(hist)) hist = [];
      hist.push({
        path: location.pathname,
        href: location.pathname + (location.search || ''),
        topic: opts.topic || null,
        pct: opts.pct,
        game: opts.gameName || null,
        ts: Date.now(),
      });
      if (hist.length > 200) hist = hist.slice(hist.length - 200);
      localStorage.setItem('aism-results', JSON.stringify(hist));
    } catch (err) { /* result log is best-effort */ }

    /* Near-miss line — when the run lands within 5 points below a rank
       threshold (Rank S 95 / Rank A 80 / Rank B 60), say exactly how close
       it was. Speaks "Rank" (gaming), never "grade" (school). */
    let nearMiss = '', nearGap = null, nearLetter = '';
    try {
      const pctNum = Number(opts.pct);
      if (isFinite(pctNum)) {
        const rungs = [[95, 'S'], [80, 'A'], [60, 'B']];
        for (let ri = 0; ri < rungs.length; ri++) {
          const gap = Math.round((rungs[ri][0] - pctNum) * 10) / 10;
          if (gap > 0 && gap <= 5) {
            nearGap = gap;
            nearLetter = rungs[ri][1];
            nearMiss = '<div class="ar-near-miss" style="font-size:12.5px;letter-spacing:.4px;color:var(--ar-gold,#ffd60a);margin:-8px 0 14px;">'
              + e(gap + '% from Rank ' + rungs[ri][1] + ' — one more run') + '</div>';
            break;
          }
        }
      }
    } catch (err) { nearMiss = ''; nearGap = null; nearLetter = ''; }

    /* Primary CTA — Play again carries the near-miss hook when one applies,
       so the card points the player at the replay, not just the share. */
    let againLabel = '▶ Play again';
    if (nearGap != null && nearLetter) {
      againLabel = '▶ Play again — ' + nearGap + '% from Rank ' + nearLetter;
    }

    container.innerHTML = `
      <div class="ar-end ${hot ? 'hot' : ''}">
        <div class="ar-end-inner">
          <h2>${e(opts.gameEmoji || '🎮')} ${e(opts.gameName)}</h2>
          <div class="ar-end-topic">${e(opts.topic)}${opts.meta ? ' · ' + e(opts.meta) : ''}</div>
          <div class="ar-rank-cap" style="font-family:var(--ar-mono,ui-monospace,Menlo,Consolas,monospace);font-size:10px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--ar-muted,#8a8fa3);margin-top:6px;">RANK</div>
          <div class="ar-grade ${g.cls}">${g.letter}</div>
          <div class="ar-grade-line">${e(g.line)}</div>
          ${nearMiss}
          ${opts.big != null ? `<div class="ar-end-big" id="ar-big">0</div><div class="ar-end-lbl">${e(opts.bigLabel || '')}</div>` : ''}
          ${opts.rows && opts.rows.length ? `<div class="ar-end-rows">${opts.rows.map(r => `<div class="ar-end-row"><b>${e(r.v)}</b><span>${e(r.l)}</span></div>`).join('')}</div>` : ''}
          ${opts.emojiGrid ? `<div class="ar-emoji-grid">${e(opts.emojiGrid)}</div>` : ''}
          ${newBest ? '<div class="ar-best">★ NEW PERSONAL BEST</div>'
            : best !== null ? `<div class="ar-best old">Personal best: ${e(best)}${opts.bestSuffix || '%'}</div>` : ''}
          ${opts.insight ? `<div class="ar-insight">${e(opts.insight)}</div>` : ''}
          <div class="ar-ctas">
            <button class="ar-btn" id="ar-again">${e(againLabel)}</button>
            <button class="ar-btn ar-btn-share" id="ar-share">🔥 Send it — reckon they beat that?</button>
            ${(function() {
              // When the player came in from arcade.html, send them back to it
              // with their subject/level/board/topic still selected. Falls back
              // to the subjects catalog if they reached the game any other way.
              let ret = '';
              try { ret = sessionStorage.getItem('aism-arcade-return'); } catch (e) {}
              if (ret !== null && ret !== undefined) {
                return '<a class="ar-btn ghost" href="../arcade.html' + ret + '">Back to arcade</a>';
              }
              return '<a class="ar-btn ghost" href="../../subjects.html">More games</a>';
            })()}
          </div>
          <button type="button" id="ar-parents" class="ar-parents-link" style="background:none;border:none;box-shadow:none;display:inline-block;margin-top:12px;padding:4px 8px;font-family:var(--ar-mono,ui-monospace,Menlo,Consolas,monospace);font-size:11px;font-weight:600;letter-spacing:1px;color:var(--ar-muted,#8a8fa3);text-decoration:underline;text-underline-offset:3px;cursor:pointer;">📲 Show your parents</button>
          <div class="ar-watermark">aistudymethod.com</div>
        </div>
      </div>
    `;

    const bigEl = container.querySelector('#ar-big');
    if (bigEl && typeof opts.big === 'number') {
      Arcade.countUp(bigEl, opts.big, 900, opts.bigSuffix || '');
    } else if (bigEl) {
      bigEl.textContent = opts.big;
    }

    if (opts.pct >= 80) { Arcade.confettiRain(1800); Arcade.sfx.fanfare(); }
    else if (opts.pct >= 60) { Arcade.confettiBurst({ count: 50 }); Arcade.sfx.coin(); }
    else { Arcade.sfx.timeup(); }
    if (newBest) setTimeout(() => Arcade.confettiBurst({ count: 80, y: window.innerHeight * 0.25 }), 500);

    container.querySelector('#ar-again').addEventListener('click', () => {
      Arcade.sfx.click();
      opts.onAgain && opts.onAgain();
    });

    const shareBtn = container.querySelector('#ar-share');
    shareBtn.addEventListener('click', async () => {
      Arcade.sfx.click();
      const SHARE_LABEL = '🔥 Send it — reckon they beat that?';
      // Modern path: build the PNG flex card via Arcade.shareScore. The opts
      // object already carries everything the card needs; games can pass an
      // `opts.share = { subject, level, total, statLine }` for extras the
      // base opts don't cover.
      if (Arcade.shareScore) {
        shareBtn.disabled = true;
        const orig = shareBtn.textContent;
        shareBtn.textContent = '… preparing';
        // Derive sensible defaults for any share field the consumer didn't pass.
        const sh = opts.share || {};
        // Fallback statLine: if rows[] exist, join the first two non-empty as a ribbon
        let defaultStat = null;
        if (Array.isArray(opts.rows) && opts.rows.length) {
          defaultStat = opts.rows
            .filter(r => r && r.v)
            .slice(0, 2)
            .map(r => r.v + (r.l ? ' ' + r.l : ''))
            .join('  ·  ');
        }
        // Fallback subject/level: split opts.meta on the centred-dot separator
        let defLevel = null, defSubject = null;
        if (opts.meta && typeof opts.meta === 'string') {
          const parts = opts.meta.split('·').map(p => p.trim()).filter(Boolean);
          if (parts.length >= 1) defLevel = parts[0];
          if (parts.length >= 2) defSubject = parts[1];
        }
        try {
          const r = await Arcade.shareScore({
            gameName: opts.gameName,
            subject: sh.subject != null ? sh.subject : defSubject,
            level:   sh.level   != null ? sh.level   : defLevel,
            topic:   opts.topic,
            score:   sh.score   != null ? sh.score   : opts.big,
            total:   sh.total   != null ? sh.total   : null,
            pct:     opts.pct,
            rank:    g.letter,
            rankLine: g.line,
            bigLabel: opts.bigLabel,
            statLine: sh.statLine != null ? sh.statLine : defaultStat,
          });
          if (r && r.ok) shareBtn.textContent = '✅ Sent!';
          else shareBtn.textContent = orig;
        } catch (err) {
          console.warn('[shareScore] failed', err);
          shareBtn.textContent = orig;
        } finally {
          setTimeout(() => { shareBtn.disabled = false; shareBtn.textContent = SHARE_LABEL; }, 1800);
        }
        return;
      }
      // Legacy fallback (used only if share-score.js failed to load): text share.
      const lines = (opts.shareLines && opts.shareLines.slice()) || [];
      lines.push('🎓 aistudymethod.com');
      const text = lines.join('\n');
      let ok = false;
      try {
        if (navigator.share) { await navigator.share({ text }); ok = true; }
        else if (navigator.clipboard) { await navigator.clipboard.writeText(text); ok = true; }
      } catch (err) {
        try { await navigator.clipboard.writeText(text); ok = true; } catch (err2) {}
      }
      if (ok) {
        shareBtn.textContent = '✅ Sent!';
        Arcade.sfx.coin();
        setTimeout(() => { shareBtn.textContent = SHARE_LABEL; }, 1800);
      }
    });

    // Parent share — bridge to the £25 course via for-parents.html
    const parentsBtn = container.querySelector('#ar-parents');
    if (parentsBtn) {
      const PARENT_LABEL = parentsBtn.textContent;
      parentsBtn.addEventListener('click', async () => {
        Arcade.sfx.click();
        parentsBtn.disabled = true;
        parentsBtn.textContent = '… preparing';
        const sh = opts.share || {};
        let defLevel = null, defSubject = null;
        if (opts.meta && typeof opts.meta === 'string') {
          const parts = opts.meta.split('·').map(x => x.trim()).filter(Boolean);
          if (parts.length >= 1) defLevel = parts[0];
          if (parts.length >= 2) defSubject = parts[1];
        }
        try {
          const r = await Arcade.shareWithParents({
            subject: sh.subject != null ? sh.subject : defSubject,
            level:   sh.level   != null ? sh.level   : defLevel,
            topic:   opts.topic,
            score:   sh.score   != null ? sh.score   : opts.big,
            total:   sh.total   != null ? sh.total   : null,
          });
          if (r && r.ok && r.method === 'clipboard') parentsBtn.textContent = '✅ Link copied!';
          else if (r && r.ok) parentsBtn.textContent = '✅ Shared!';
          else parentsBtn.textContent = PARENT_LABEL;
        } catch (err) {
          parentsBtn.textContent = PARENT_LABEL;
        } finally {
          setTimeout(() => { parentsBtn.disabled = false; parentsBtn.textContent = PARENT_LABEL; }, 2400);
        }
      });
    }

    return { grade: g, newBest };
  };

  /* ---------------- countdown timer controller ---------------------------- */
  // Drives an .ar-timer fill bar. Returns {stop, remaining, addTime}.
  Arcade.timer = function (fillEl, ms, callbacks) {
    const cb = callbacks || {};
    let total = ms, left = ms, last = performance.now(), raf = null, dead = false;
    let lastWholeSec = Math.ceil(ms / 1000);
    function step(now) {
      if (dead) return;
      left -= (now - last);
      last = now;
      const frac = Math.max(0, left / total);
      fillEl.style.transform = 'scaleX(' + frac + ')';
      fillEl.classList.toggle('warn', frac <= 0.5 && frac > 0.22);
      fillEl.classList.toggle('danger', frac <= 0.22);
      const whole = Math.ceil(left / 1000);
      if (whole !== lastWholeSec) {
        lastWholeSec = whole;
        if (whole <= 3 && whole > 0) Arcade.sfx.tick();
        cb.onSecond && cb.onSecond(whole);
      }
      if (left <= 0) {
        dead = true;
        fillEl.style.transform = 'scaleX(0)';
        cb.onEnd && cb.onEnd();
        return;
      }
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return {
      stop() { dead = true; if (raf) cancelAnimationFrame(raf); },
      get remaining() { return Math.max(0, left); },
      addTime(extra) { left = Math.min(total, left + extra); },
    };
  };

  /* ---------------- leaderboards (Bunny Edge + Bunny Database) ----------
     Set Arcade.LB_URL to the deployed edge-script hostname to go live, e.g.
       Arcade.LB_URL = 'https://aism-leaderboard.b-cdn.net';
     While empty, every leaderboard feature is a silent no-op.            */
  Arcade.LB_URL = 'https://aism-leaderboard-2dc3b.bunny.run';

  function lbGameId() {
    const base = (location.pathname.split('/').pop() || '').replace(/\.html$/, '');
    return base.replace(/^game-/, '');
  }
  const LB_LABELS = {
    'two-truths': 'Two Truths One Lie', 'odd-one': 'Odd One Out', 'connections': 'Connections Grid',
    'sequence': 'Sort the Sequence', 'wager': 'Wager', 'higher-lower': 'Higher or Lower',
    'falling-words': 'Falling Words', 'conveyor': 'Conveyor Belt', 'word-web': 'Word Web',
    'reveal-race': 'Reveal Race', 'daily-drill': 'Daily Drill', 'quiz': 'Vocab Quiz',
    'ghost-race': 'Ghost Race', 'claw': 'The Claw', 'coin-pusher': 'The Pusher',
    'pairs': 'Matching Pairs', 'hangman': 'System Breach', 'termguess': 'Term Guess',
    'anagram': 'Anagram', 'crossword': 'Crossword', 'pacman': 'Pac-Man Vocab',
    'spaceinvaders': 'Space Invaders', 'boss-rush': 'Boss Rush',
  };

  /* Play token — fetched once at page load (= start of play) so the server
     can verify elapsed play time when the score is submitted. Best-effort:
     if the fetch fails (offline, old v1 worker without /token) we simply
     submit without it, exactly as before. */
  let lbToken = null;
  function lbFetchToken() {
    try {
      if (!Arcade.LB_URL || !LB_LABELS[lbGameId()]) return;
      const p = new URLSearchParams({ game: lbGameId(), device: Arcade.lb.device() });
      fetch(Arcade.LB_URL + '/token?' + p)
        .then(r => (r.ok ? r.json() : null))
        .then(t => { if (t && t.tok && t.ts) lbToken = t; })
        .catch(() => {});
    } catch (e) { /* tokens are best-effort; never block the game */ }
  }

  Arcade.lb = {
    labels: LB_LABELS,
    enabled() { return !!Arcade.LB_URL && !!LB_LABELS[lbGameId()]; },
    device() {
      let id = null;
      try { id = localStorage.getItem('aism-device'); } catch (e) {}
      if (!id) {
        id = (crypto.randomUUID ? crypto.randomUUID()
          : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
              const r = Math.random() * 16 | 0;
              return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            }));
        try { localStorage.setItem('aism-device', id); } catch (e) {}
      }
      return id;
    },
    initials(v) {
      if (v !== undefined) { try { localStorage.setItem('aism-initials', v); } catch (e) {} }
      let s = 'AAA';
      try { s = localStorage.getItem('aism-initials') || 'AAA'; } catch (e) {}
      return s;
    },
    /* Crew code (class competition, v3 worker) — exactly 4 chars A-Z0-9 or
       empty. The server treats anything invalid as absent, so these are
       cosmetic guards, not security. */
    crewClean(v) {
      const s = String(v || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4);
      return s.length === 4 ? s : '';
    },
    crew(v) {
      if (v !== undefined) {
        try {
          if (v) localStorage.setItem('aism-crew', v);
          else localStorage.removeItem('aism-crew');
        } catch (e) {}
      }
      let s = '';
      try { s = this.crewClean(localStorage.getItem('aism-crew') || ''); } catch (e) {}
      return s;
    },
    /* Which board the player last looked at: 'crew' (MY CLASS) or 'all'. */
    crewView(v) {
      if (v !== undefined) { try { localStorage.setItem('aism-crew-view', v); } catch (e) {} }
      let s = 'crew';
      try { s = localStorage.getItem('aism-crew-view') || 'crew'; } catch (e) {}
      return s === 'all' ? 'all' : 'crew';
    },
    async top(game, opts) {
      const o = opts || {};
      const p = new URLSearchParams({ game, week: o.week || 'current', n: String(o.n || 10), device: this.device() });
      if (o.crew) p.set('crew', o.crew);
      const r = await fetch(Arcade.LB_URL + '/top?' + p);
      if (!r.ok) throw new Error('leaderboard unavailable');
      return r.json();
    },
    async champion(week) {
      const p = new URLSearchParams({ week: week || 'current', device: this.device() });
      const r = await fetch(Arcade.LB_URL + '/champion?' + p);
      if (!r.ok) throw new Error('leaderboard unavailable');
      return r.json();
    },
    async submit(data) {
      const body = { ...data, device: this.device() };
      if (lbToken) { body.tok = lbToken.tok; body.ts = lbToken.ts; }
      const r = await fetch(Arcade.LB_URL + '/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
      const out = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(out.error || 'submit failed');
      return out;
    },
    boardHtml(rows, kind) {
      const e = Arcade.escapeHtml;
      if (!rows || !rows.length) {
        return '<div class="ar-lb-empty">No runs yet this week — be the first on the board.</div>';
      }
      return '<ol class="ar-lb-list">' + rows.map(r => `
        <li class="${r.you ? 'you' : ''}">
          <span class="ar-lb-rank">${r.rank === 1 ? '👑' : '#' + r.rank}</span>
          <span class="ar-lb-name">${e(r.initials)}</span>
          <span class="ar-lb-meta">${e(kind === 'champion' ? (r.games + ' games') : (r.topic || ''))}</span>
          <span class="ar-lb-score">${e(String(kind === 'champion' ? r.points + ' pts' : r.score))}</span>
        </li>`).join('') + '</ol>';
    },
    /* [MY CLASS] / [EVERYONE] toggle shown above the board when a crew is
       set. Reuses .ar-btn with small inline overrides for the retro look. */
    toggleHtml(active) {
      const on = 'font-size:10px;padding:6px 12px;letter-spacing:1.5px;';
      const off = on + 'opacity:0.5;background:transparent;border:2px solid var(--ar-border-hi);color:var(--ar-text);box-shadow:none;';
      return '<div class="ar-lb-toggle" style="display:flex;gap:6px;justify-content:center;margin:2px 0 10px;">' +
        '<button type="button" class="ar-btn ar-lb-view" data-view="crew" style="' + (active === 'crew' ? on : off) + '">MY CLASS</button>' +
        '<button type="button" class="ar-btn ar-lb-view" data-view="all" style="' + (active === 'all' ? on : off) + '">EVERYONE</button></div>';
    },
    /* Chase line under the board, from a v3 response with `around` (entries
       around the player, each {rank, initials, score, you}). A v2 response
       has no `around`, so this degrades to nothing. Only rendered after the
       player has submitted. */
    chaseHtml(res) {
      try {
        if (!res || !Array.isArray(res.around)) return '';
        const e = Arcade.escapeHtml;
        const meIdx = res.around.findIndex(r => r && r.you);
        if (meIdx < 0) return '';
        const me = res.around[meIdx];
        const rank = Number(me.rank);
        const line = (txt) =>
          '<div class="ar-lb-chase" style="font-family:var(--ar-mono);font-size:11px;font-weight:700;letter-spacing:1.5px;color:var(--ar-cyan);margin-top:10px;">' + txt + '</div>';
        if (rank === 1) return line('YOU ARE #1 — DEFEND IT');
        if (!isFinite(rank) || rank <= 3) return '';   // already shining on the board
        const above = res.around[meIdx - 1];           // entry directly above
        if (!above) return '';
        const gap = Number(above.score) - Number(me.score);
        if (!isFinite(gap)) return '';
        if (gap <= 0) return line('YOU #' + e(String(rank)) + ' — LEVEL WITH ' + e(String(above.initials || '')) + ', ONE POINT TAKES IT');
        return line('YOU #' + e(String(rank)) + ' — ' + e(String(gap)) + ' PTS BEHIND ' + e(String(above.initials || '')));
      } catch (err) { return ''; }
    },
    /* Initials picker + submit + board, mounted under the end card. */
    mount(container, run) {
      const e = Arcade.escapeHtml;
      const saved = this.initials();
      const savedCrew = this.crew();
      container.innerHTML = `
        <div class="ar-lb">
          <div class="ar-lb-title">🏆 WEEKLY LEADERBOARD</div>
          <div class="ar-lb-sub">Enter your initials — best run this week counts</div>
          <div class="ar-lb-picker" role="group" aria-label="Enter three initials">
            ${[0, 1, 2].map(i => `
              <div class="ar-lb-slot">
                <button type="button" class="ar-lb-arrow" data-i="${i}" data-d="1" aria-label="Letter ${i + 1} up">▲</button>
                <div class="ar-lb-letter" data-i="${i}">${e(saved[i] || 'A')}</div>
                <button type="button" class="ar-lb-arrow" data-i="${i}" data-d="-1" aria-label="Letter ${i + 1} down">▼</button>
              </div>`).join('')}
            <button type="button" class="ar-btn ar-lb-go" id="ar-lb-go">SUBMIT</button>
          </div>
          <div class="ar-lb-crew" id="ar-lb-crew-row" style="margin-top:10px;">
            <label for="ar-lb-crew" style="display:block;font-family:var(--ar-mono);font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:var(--ar-muted);margin-bottom:4px;">Crew code (optional) — your class</label>
            <input type="text" id="ar-lb-crew" maxlength="4" value="${e(savedCrew)}" placeholder="e.g. 9BIO"
              autocomplete="off" autocapitalize="characters" spellcheck="false" aria-label="Crew code, four letters or numbers"
              style="width:96px;text-align:center;font-family:var(--ar-mono);font-size:16px;font-weight:700;letter-spacing:3px;color:var(--ar-cyan);background:var(--ar-card);border:2px solid rgba(0,229,255,0.45);border-radius:10px;padding:8px 6px;text-transform:uppercase;">
          </div>
          <div class="ar-lb-board" id="ar-lb-board"></div>
        </div>`;

      const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const letters = [...container.querySelectorAll('.ar-lb-letter')];
      container.querySelectorAll('.ar-lb-arrow').forEach(b =>
        b.addEventListener('click', () => {
          Arcade.sfx.tick();
          const el = letters[+b.dataset.i];
          const idx = (ALPHA.indexOf(el.textContent) + (+b.dataset.d) + ALPHA.length) % ALPHA.length;
          el.textContent = ALPHA[idx];
        }));

      const go = container.querySelector('#ar-lb-go');
      const board = container.querySelector('#ar-lb-board');
      const crewInput = container.querySelector('#ar-lb-crew');
      // Auto-uppercase and strip anything that is not A-Z0-9 as they type.
      try {
        crewInput.addEventListener('input', () => {
          const v = String(crewInput.value || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4);
          if (crewInput.value !== v) crewInput.value = v;
        });
      } catch (err) { /* cosmetic only */ }

      /* Board rendering — crew-aware (v3 worker) but degrades silently
         against the v2 worker: the crew param is ignored there (global board
         comes back) and there is no `around`, so no chase line renders. */
      const lb = this;
      let submitted = false;   // chase line only appears once the player is on the board
      let lastRes = null;      // last /submit response, fallback if a refetch fails
      let fetchSeq = 0;        // ignore stale in-flight fetches

      function renderBoard(res, view) {
        try {
          let html = '';
          if (lb.crew()) html += lb.toggleHtml(view);
          html += lb.boardHtml(res && res.board);
          if (submitted) html += lb.chaseHtml(res);
          board.innerHTML = html;
          board.querySelectorAll('.ar-lb-view').forEach(b =>
            b.addEventListener('click', () => {
              try { Arcade.sfx.click(); } catch (err) {}
              lb.crewView(b.dataset.view === 'crew' ? 'crew' : 'all');
              refreshBoard();
            }));
        } catch (err) { /* the end card must never break */ }
      }

      function refreshBoard() {
        try {
          const crew = lb.crew();
          const useCrew = !!crew && lb.crewView() === 'crew';
          const id = ++fetchSeq;
          lb.top(run.game, useCrew ? { crew } : {}).then(res => {
            if (id === fetchSeq) renderBoard(res, useCrew ? 'crew' : 'all');
          }).catch(() => {
            if (id === fetchSeq && lastRes) renderBoard(lastRes, 'all');
          });
        } catch (err) { /* silent */ }
      }

      go.addEventListener('click', async () => {
        const initials = letters.map(l => l.textContent).join('');
        go.disabled = true;
        go.textContent = '…';
        // Read + persist the optional crew code (empty clears it; anything
        // not exactly 4 chars A-Z0-9 is treated as absent).
        let crew = '';
        try {
          crew = this.crewClean(crewInput ? crewInput.value : '');
          this.crew(crew);
        } catch (err) { crew = ''; }
        try {
          const payload = { game: run.game, score: run.score, initials, topic: run.topic || '', stem: run.stem || '' };
          if (crew) payload.crew = crew;
          /* Analytics copy. The leaderboard payload has no subject/level/board,
             so recover them from the mission breadcrumb written at launch. */
          try {
            let m = {};
            try { m = JSON.parse(localStorage.getItem('aism-last-mission') || '{}') || {}; } catch (e) {}
            Arcade.track('score_submit', {
              game: run.game, score: run.score,
              subject: m.subject, level: m.level, board: m.board,
              topic: m.topic || run.topic || '', topic_label: m.topicLabel,
              max_score: run.max || null, correct: run.correct || null, total: run.total || null,
              duration_ms: run.durationMs || null, completed: 1,
            });
          } catch (e) {}
          const res = await this.submit(payload);
          this.initials(initials);
          submitted = true;
          lastRes = res;
          fetchSeq++;          // invalidate any in-flight initial board fetch
          Arcade.sfx.fanfare();
          if (res.rank && res.rank <= 3) Arcade.confettiBurst({ count: 70 });
          container.querySelector('.ar-lb-picker').innerHTML =
            `<div class="ar-lb-result">${res.rank === 1 ? '👑 #1 THIS WEEK!' : 'RANK #' + e(String(res.rank)) + ' THIS WEEK'}</div>`;
          try {
            const row = container.querySelector('#ar-lb-crew-row');
            if (row) row.style.display = 'none';
          } catch (err) { /* cosmetic only */ }
          if (crew && this.crewView() === 'crew') {
            refreshBoard();    // class view: refetch /top?crew=… (falls back to res)
          } else {
            renderBoard(res, 'all');
          }
        } catch (err) {
          go.disabled = false;
          go.textContent = 'SUBMIT';
          board.innerHTML = '<div class="ar-lb-empty">' + e(String(err.message || 'Could not reach the leaderboard.')) + '</div>';
        }
      });

      // show the current board straight away (class view by default when a
      // crew is remembered, with a MY CLASS / EVERYONE toggle)
      refreshBoard();
    },
  };

  // Grab a play token as soon as the library loads on a leaderboard game page,
  // stamping the start of play (the submit-time server check needs a believable
  // elapsed time between token issue and score submission).
  lbFetchToken();

  // Hook: every end card with a numeric best value gets the leaderboard UI.
  const _renderEndCard = Arcade.renderEndCard;
  Arcade.renderEndCard = function (container, opts) {
    const out = _renderEndCard(container, opts);
    try {
      if (Arcade.lb.enabled() && typeof opts.bestValue === 'number' && opts.bestValue > 0) {
        const inner = container.querySelector('.ar-end-inner');
        if (inner) {
          const mountEl = document.createElement('div');
          inner.insertBefore(mountEl, inner.querySelector('.ar-watermark'));
          Arcade.lb.mount(mountEl, {
            game: lbGameId(),
            score: Math.floor(opts.bestValue),
            topic: opts.topic || '',
            stem: (new URLSearchParams(location.search)).get('spec') || '',
          });
        }
      }
    } catch (e) { /* leaderboards must never break an end card */ }
    return out;
  };

  window.Arcade = Arcade;

  // Any game "← Back to subjects" link becomes "← Back to arcade", returning the
  // player to the arcade picker with their subject/level/board/topic restored
  // (the arcade saves its URL state to sessionStorage on launch and restores it).
  (function () {
    function arcadeHref() {
      var ret = '';
      try { ret = sessionStorage.getItem('aism-arcade-return') || ''; } catch (e) {}
      return '../arcade.html' + ret;
    }
    function rewire() {
      var as = document.getElementsByTagName('a');
      for (var i = 0; i < as.length; i++) {
        var a = as[i], t = (a.textContent || '').trim();
        if (/back to subjects$/i.test(t)) {
          a.setAttribute('href', arcadeHref());
          a.textContent = t.replace(/subjects/i, 'arcade');
        }
      }
    }
    function init() {
      rewire();
      try {
        var mo = new MutationObserver(function () { rewire(); });
        mo.observe(document.body, { childList: true, subtree: true });
      } catch (e) {}
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
  })();
})();
