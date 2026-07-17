/* CCEA GCE Biology 1010 — A2 units — data for _build_alevel_bio.js */
const SPEC = 'CCEA GCE Biology (1010)';

module.exports = [

/* ===================== UNIT A2 1 ===================== */
{
  key: 'biology-a-level-ccea', slug: 'physiology-coordination-control-ecosystems',
  title: 'Physiology, Co-ordination and Control, and Ecosystems', emoji: '🌱',
  spec: SPEC + ' · Unit A2 1: Physiology, Co-ordination and Control, and Ecosystems',
  desc: 'A-level CCEA Biology mini-lesson on Unit A2 1: homeostasis including the kidney, ultrafiltration, selective reabsorption, ADH and osmoregulation, thermoregulation and blood glucose control; immunity including phagocytosis, the humoral and cell-mediated responses, antibodies, vaccines and HIV; co-ordination and control in plants and animals including the action potential, synapses and muscle contraction; and ecosystems including energy flow, GPP and NPP, nutrient cycles, succession and population growth.',
  overview3: ['homeostasis &amp; kidney', 'immunity &amp; co-ordination', 'ecosystems'],
  intro: 'CCEA Unit A2 1 has <b>four</b> strands: <b>homeostasis</b> (including the kidney), <b>immunity</b>, <b>co-ordination and control</b> in plants and animals, and — sitting squarely in this unit for CCEA — <b>ecosystems</b>: energy flow, productivity, nutrient cycles, succession and population growth.',
  sortDone: 'Ultrafiltration happens at the glomerulus; selective reabsorption in the proximal tubule; water reabsorption is tuned by ADH in the collecting duct.',
  matchDone: 'The nervous system is fast and localised; the endocrine system is slower and widespread.',
  recap: [
    '<b>Kidney:</b> <b>ultrafiltration</b> at the glomerulus (high hydrostatic pressure; the basement membrane is the filter) → <b>selective reabsorption</b> in the proximal convoluted tubule (co-transport, microvilli, many mitochondria) → the <b>loop of Henle</b> sets up a salt gradient by countercurrent multiplication → <b>ADH</b> makes the collecting duct permeable via aquaporins.',
    '<b>Osmoregulation:</b> osmoreceptors in the hypothalamus detect a fall in blood water potential → posterior pituitary releases <b>ADH</b> → more water reabsorbed → small volume of concentrated urine. Negative feedback.',
    '<b>Blood glucose:</b> insulin (β cells) lowers it — glucose uptake and glycogenesis; glucagon (α cells) raises it — glycogenolysis and gluconeogenesis.',
    '<b>Immunity:</b> non-specific (barriers, inflammation, phagocytosis) then specific — <b>cell-mediated</b> (T helper, T killer, T memory) and <b>humoral</b> (B plasma cells secrete antibodies; B memory cells give the faster, larger secondary response).',
    '<b>Neurone:</b> resting potential −70 mV (Na⁺/K⁺ pump); action potential = depolarisation (Na⁺ in) then repolarisation (K⁺ out); all-or-nothing; saltatory conduction in myelinated axons.',
    '<b>Muscle:</b> sliding filament — Ca²⁺ → troponin → tropomyosin moves → cross-bridges → power stroke → ATP detaches the head.',
    '<b>Plants:</b> IAA (auxin) causes cell elongation on the shaded side, giving positive phototropism.',
    '<b>Ecosystems:</b> <b>NPP = GPP − R</b>; roughly 10 % transfer between trophic levels; nitrogen cycle (fixation, ammonification, nitrification, denitrification); succession to a climax community.'
  ],
  recapTail: 'You have covered the whole of CCEA Unit A2 1 — ecosystems included. Press <b>Finish</b> to see your score.',
  screens: [
    { type:'teach', tag:'4.1 Homeostasis · the kidney', h2:'Ultrafiltration and selective reabsorption',
      html:`      <p>The functional unit of the kidney is the <b>nephron</b>.</p>
      <p><b>Ultrafiltration (in the Bowman&rsquo;s capsule):</b> the <b>afferent</b> arteriole is <b>wider</b> than the <b>efferent</b> arteriole, so a very high <b>hydrostatic pressure</b> builds up in the glomerulus. This forces water, glucose, amino acids, urea and mineral ions out through the <b>fenestrations</b> of the capillary endothelium, through the <b>basement membrane</b> — the actual molecular sieve — and between the <b>podocytes</b>. <b>Blood cells and plasma proteins are too large</b> to pass, so they remain in the blood.</p>
      <p><b>Selective reabsorption (proximal convoluted tubule):</b> about 85 % of the filtrate is reabsorbed here. All the glucose and amino acids are reabsorbed by <b>co-transport with sodium ions</b>; the Na⁺ is then actively pumped out of the cell into the blood, maintaining the gradient. The PCT epithelium is beautifully adapted: <b>microvilli</b> (huge surface area), <b>many mitochondria</b> (ATP for active transport), and a rich capillary supply. Water follows by <b>osmosis</b>.</p>
      <p class="note"><b>Glucose in the urine</b> means the co-transporters have been <b>saturated</b> — the renal threshold has been exceeded, which is why it is a classic sign of untreated diabetes.</p>`},
    { type:'num', h2:'Your turn — percentage reabsorbed', q:'In a day, the kidneys filter <b>180 dm³</b> of fluid but produce only <b>1.5 dm³</b> of urine. Calculate the <b>percentage of the filtrate that is reabsorbed</b>. Give your answer to <b>1 decimal place</b>.',
      unit:'%', answer:99.2, tol:0.1, hint:'Reabsorbed = 180 − 1.5 = 178.5. Then (178.5 ÷ 180) × 100.' },
    { type:'teach', tag:'4.1 Homeostasis · loop of Henle &amp; ADH', h2:'The loop of Henle, ADH and osmoregulation',
      html:`      <p>The <b>loop of Henle</b> is a <b>countercurrent multiplier</b>. Sodium and chloride ions are actively pumped out of the <b>ascending limb</b> (which is impermeable to water) into the medulla. This makes the medulla tissue fluid <b>increasingly negative in water potential</b> the deeper you go. The <b>descending limb</b> is permeable to water, so water leaves it by osmosis, concentrating the filtrate as it descends.</p>
      <p>The point of it all: the <b>collecting duct</b> passes back down through that same steep gradient, so water can be reabsorbed from it all the way along — producing urine that is <b>more concentrated than the blood</b>. A desert mammal with a very long loop of Henle can produce extremely concentrated urine.</p>
      <p><b>Osmoregulation — negative feedback:</b></p>
      <ul>
        <li>The blood water potential <b>falls</b> (dehydration, salty meal).</li>
        <li><b>Osmoreceptors</b> in the <b>hypothalamus</b> detect it and stimulate the <b>posterior pituitary</b> to release <b>ADH</b>.</li>
        <li>ADH makes the <b>collecting duct more permeable to water</b> by inserting <b>aquaporins</b> into its membrane.</li>
        <li><b>More water is reabsorbed</b> → a small volume of concentrated urine → blood water potential rises back to normal.</li>
      </ul>`},
    { type:'sort', h2:'Where in the nephron?', prompt:'Tap a process, then tap where it happens.',
      bins:['🔵 Glomerulus / Bowman’s capsule','🟢 Proximal convoluted tubule','🟣 Collecting duct'],
      data:[['High hydrostatic pressure forces fluid out of the blood','a'],['The basement membrane holds back plasma proteins','a'],['Glucose reabsorbed by co-transport with Na⁺','b'],['Epithelium with microvilli and many mitochondria','b'],['ADH inserts aquaporins to increase water permeability','c'],['Water reabsorbed down the medullary water potential gradient','c']] },
    { type:'teach', tag:'4.1 Homeostasis · glucose &amp; temperature', h2:'Blood glucose and thermoregulation',
      html:`      <p><b>Blood glucose</b> is controlled by the <b>islets of Langerhans</b> in the pancreas:</p>
      <ul>
        <li><b>Too high</b> → <b>β cells</b> release <b>insulin</b> → more glucose channels inserted into muscle and liver cell membranes, so glucose is taken up; glucose is converted to <b>glycogen (glycogenesis)</b> and to fat; respiration increases. Blood glucose falls.</li>
        <li><b>Too low</b> → <b>α cells</b> release <b>glucagon</b> → the liver hydrolyses glycogen back to glucose (<b>glycogenolysis</b>) and makes glucose from non-carbohydrate sources (<b>gluconeogenesis</b>). Blood glucose rises.</li>
      </ul>
      <p><b>Type 1 diabetes</b> — the β cells are destroyed (autoimmune), so no insulin is made: treated with insulin injections. <b>Type 2</b> — the cells become less responsive to insulin (receptor insensitivity): managed by diet, exercise and drugs.</p>
      <p><b>Thermoregulation:</b> the <b>hypothalamus</b> monitors blood temperature. <b>Too hot</b> — <b>vasodilation</b> of skin arterioles, <b>sweating</b>, hairs flat. <b>Too cold</b> — <b>vasoconstriction</b>, <b>shivering</b>, hairs erected, increased metabolic rate. Both are <b>negative feedback</b>.</p>`},
    { type:'mcq', h2:'Negative feedback',
      q:'Blood water potential falls after a salty meal. Which sequence correctly describes the response?',
      why:'Osmoreceptors in the hypothalamus detect the fall in water potential; the posterior pituitary releases ADH; ADH makes the collecting duct more permeable to water (via aquaporins), so more water is reabsorbed and a small volume of concentrated urine is produced — restoring the blood water potential.',
      opts:[['Hypothalamus → less ADH → more dilute urine',0],['Hypothalamus → more ADH → collecting duct more permeable → concentrated urine',1],['Pancreas → insulin → more water reabsorbed',0],['Adrenal gland → adrenaline → less water reabsorbed',0]] },
    { type:'teach', tag:'4.2 Immunity', h2:'Phagocytosis and the specific immune response',
      html:`      <p><b>Non-specific defences:</b> skin, stomach acid, mucus and cilia, lysozyme, inflammation and <b>phagocytosis</b>. A phagocyte engulfs the pathogen into a <b>phagosome</b>, which fuses with a <b>lysosome</b>; hydrolytic enzymes digest it. The phagocyte then displays the antigens on its own surface as an <b>antigen-presenting cell</b> — the bridge between non-specific and specific immunity.</p>
      <p><b>Cell-mediated (T cells):</b> the <b>T helper cell</b> with the complementary receptor binds the presented antigen, is activated, and releases <b>cytokines</b> that stimulate phagocytes, <b>T killer cells</b> (which destroy infected cells) and B cells. <b>T memory cells</b> persist.</p>
      <p><b>Humoral (B cells):</b> the B cell with the complementary antibody binds the antigen; stimulated by T helper cytokines, it divides by mitosis (<b>clonal selection and expansion</b>) into <b>plasma cells</b> — which secrete large quantities of <b>antibody</b> — and <b>B memory cells</b>.</p>
      <p class="note"><b>Antibody structure:</b> a Y-shaped glycoprotein of four polypeptide chains, with two <b>variable regions</b> whose tertiary structure is <b>complementary to one specific antigen</b>, and a constant region. Antibodies <b>agglutinate</b> pathogens, <b>neutralise</b> toxins, and mark pathogens for phagocytosis (opsonisation).</p>`},
    { type:'teach', tag:'4.2 Immunity · vaccines &amp; HIV', h2:'Vaccination, immunity and HIV',
      html:`      <p><b>The secondary response:</b> memory cells mean that on re-infection, antibody is produced <b>faster, in far greater quantity, and for longer</b> — so the pathogen is destroyed before symptoms appear. That is <b>immunity</b>.</p>
      <ul>
        <li><b>Active immunity</b> — you make your own antibodies and memory cells. <b>Natural</b> (infection) or <b>artificial</b> (vaccination). Slow to develop, but long-lasting.</li>
        <li><b>Passive immunity</b> — you receive ready-made antibodies. <b>Natural</b> (placenta, breast milk) or <b>artificial</b> (antivenom). Immediate, but short-lived — no memory cells are made.</li>
      </ul>
      <p><b>Herd immunity:</b> if a high enough proportion of the population is vaccinated, the pathogen cannot spread, so even the unvaccinated are protected. <b>Antigenic variation</b> (as in influenza and HIV) is what defeats it: the surface antigens change, so existing memory cells no longer recognise the pathogen.</p>
      <p><b>HIV</b> binds <b>CD4</b> receptors on <b>T helper cells</b>. As a <b>retrovirus</b>, it uses <b>reverse transcriptase</b> to make DNA from its RNA, which is inserted into the host genome. Replication <b>destroys T helper cells</b>; without them, neither the humoral nor the cell-mediated response can be activated properly, and the person becomes vulnerable to the <b>opportunistic infections</b> that define <b>AIDS</b>.</p>`},
    { type:'mcq', h2:'Why does HIV cripple the immune system?',
      q:'HIV destroys T helper cells. Why is this so damaging?',
      why:'T helper cells are the coordinators. Their cytokines activate B cells (so antibodies are made), T killer cells and phagocytes. Destroy them and both the humoral AND the cell-mediated responses fail — which is why AIDS patients die of opportunistic infections.',
      opts:[['T helper cells are the only cells that make antibodies',0],['T helper cells release cytokines that activate B cells, T killer cells and phagocytes, so both responses fail',1],['T helper cells physically engulf all pathogens',0],['T helper cells produce the stomach acid that kills pathogens',0]] },
    { type:'teach', tag:'4.3 Co-ordination and control', h2:'Neurones, synapses and muscle',
      html:`      <p><b>Resting potential (−70 mV):</b> the <b>Na⁺/K⁺ pump</b> actively transports 3 Na⁺ out for every 2 K⁺ in, and the membrane is far more permeable to K⁺, which leaks back out. The inside is negative.</p>
      <p><b>Action potential:</b> at the <b>threshold</b>, voltage-gated <b>Na⁺ channels open</b> — Na⁺ floods in and the membrane <b>depolarises</b> to about +40 mV. The Na⁺ channels then close and voltage-gated <b>K⁺ channels open</b>, so K⁺ leaves and the membrane <b>repolarises</b> (with a brief hyperpolarisation). It is <b>all-or-nothing</b>: stimulus intensity is coded by the <b>frequency</b> of impulses, not their size. The <b>refractory period</b> ensures one-way conduction.</p>
      <p><b>Myelination:</b> myelin insulates the axon, so depolarisation can only occur at the <b>nodes of Ranvier</b> — the impulse jumps from node to node (<b>saltatory conduction</b>), which is much faster.</p>
      <p><b>Synapse:</b> Ca²⁺ enters the pre-synaptic knob → vesicles of <b>acetylcholine</b> fuse and release it → it diffuses across and binds receptors → Na⁺ channels open in the post-synaptic membrane → threshold reached → new action potential. <b>Acetylcholinesterase</b> then hydrolyses the transmitter.</p>
      <p><b>Muscle contraction — sliding filament:</b> Ca²⁺ released from the sarcoplasmic reticulum binds <b>troponin</b>, which moves <b>tropomyosin</b> off the actin binding sites. Myosin heads form <b>cross-bridges</b>, perform the <b>power stroke</b>, and <b>ATP</b> then binds to detach and re-cock each head. Actin and myosin slide past each other — the filaments themselves do not shorten.</p>
      <p class="note"><b>Plants (4.3(a)):</b> <b>IAA</b> (an auxin) made at the shoot tip is redistributed to the <b>shaded</b> side, where it causes <b>cell elongation</b>. The shaded side grows faster, so the shoot bends towards the light: <b>positive phototropism</b>. In roots, auxin <b>inhibits</b> elongation, producing positive gravitropism.</p>`},
    { type:'match', h2:'Nervous or hormonal?', prompt:'Tap a feature on the left, then the system it describes.',
      headL:'Feature', headR:'System',
      pairs:[
        {l:'Electrical impulses travelling along neurones', r:'Nervous — fast'},
        {l:'Acts on one specific effector; the effect is short-lived', r:'Nervous — localised'},
        {l:'Chemical messengers carried in the blood', r:'Hormonal — slower'},
        {l:'Acts on any cell with the right receptor; the effect is long-lasting', r:'Hormonal — widespread'}] },
    { type:'teach', tag:'4.4 Ecosystems · energy flow', h2:'Energy flow, GPP and NPP',
      html:`      <p>An <b>ecosystem</b> is a community plus its abiotic environment. Energy enters as light and is fixed by <b>producers</b>; it flows through <b>trophic levels</b> and is ultimately <b>lost as heat</b>. Energy flow is <b>one-way</b> — unlike nutrients, which cycle.</p>
      <div class="eqn">NPP = GPP − R<small>GPP = gross primary productivity (total energy fixed by the producers)<br>R = energy lost by the producers in respiration<br>NPP = net primary productivity — the energy available to the primary consumers</small></div>
      <div class="eqn">% energy transfer = (energy in the trophic level ÷ energy in the level below) × 100<small>typically ~10 % between consumer levels; only ~1–3 % of incident light is fixed at all</small></div>
      <p><b>Why so little gets through:</b> not all of the previous level is eaten; not all that is eaten is digested — some is <b>egested</b>; energy is lost in <b>excretion</b>; and a great deal is released as <b>heat</b> in respiration, especially in endotherms. This is why food chains rarely have more than four or five links, and why a hectare of land feeds far more people if it grows crops than if it grazes cattle.</p>`},
    { type:'num', h2:'Your turn — net primary productivity', q:'A woodland has a gross primary productivity of <b>36 000 kJ m⁻² yr⁻¹</b>; the plants lose <b>14 000 kJ m⁻² yr⁻¹</b> in respiration. Calculate the <b>net primary productivity</b>.',
      unit:'kJ m⁻² yr⁻¹', answer:22000, tol:1, hint:'NPP = GPP − R = 36 000 − 14 000.' },
    { type:'num', h2:'Your turn — energy transfer efficiency', q:'Of that NPP of <b>22 000 kJ m⁻² yr⁻¹</b>, the herbivores incorporate <b>1 760 kJ m⁻² yr⁻¹</b> into their biomass. Calculate the <b>percentage efficiency</b> of energy transfer.',
      unit:'%', answer:8, tol:0.15, hint:'(1760 ÷ 22000) × 100.' },
    { type:'teach', tag:'4.4 Ecosystems · nutrient cycles', h2:'The carbon and nitrogen cycles',
      html:`      <p><b>Carbon cycle:</b> CO₂ is removed from the atmosphere by <b>photosynthesis</b> and returned by <b>respiration</b> (of producers, consumers <b>and decomposers</b>), by <b>combustion</b>, and — over geological time — released from fossil fuels. <b>Decomposers</b> are essential: without saprobiotic bacteria and fungi, carbon would remain locked in dead organisms.</p>
      <p><b>Nitrogen cycle — four processes, and you must be able to name the organisms:</b></p>
      <ul>
        <li><b>Nitrogen fixation</b> — <b>N₂ → ammonium</b>. Free-living (<i>Azotobacter</i>) and symbiotic (<i>Rhizobium</i>, in the root nodules of legumes) bacteria.</li>
        <li><b>Ammonification</b> — <b>saprobiotic</b> bacteria and fungi decompose proteins and urea in dead matter, releasing <b>ammonium</b>.</li>
        <li><b>Nitrification</b> — an <b>aerobic</b>, two-step oxidation by <b>nitrifying</b> bacteria: ammonium → <b>nitrite</b> (<i>Nitrosomonas</i>) → <b>nitrate</b> (<i>Nitrobacter</i>). Nitrate is the form plants absorb.</li>
        <li><b>Denitrification</b> — <b>anaerobic</b> denitrifying bacteria in waterlogged soil convert <b>nitrate back to N₂</b>, which is why farmers <b>plough</b> and drain to aerate the soil.</li>
      </ul>`},
    { type:'teach', tag:'4.4 Ecosystems · succession &amp; populations', h2:'Succession and population growth',
      html:`      <p><b>Succession:</b> <b>pioneer species</b> colonise a hostile abiotic environment; they change it (weathering rock, adding humus) making it <b>less hostile</b>; new species colonise and <b>out-compete</b> them. Soil depth, biomass and biodiversity increase until a stable <b>climax community</b> is reached. Human activity (grazing, burning, mowing) can arrest it at a <b>plagioclimax</b>.</p>
      <p><b>Population growth</b> follows a <b>sigmoid (S-shaped)</b> curve:</p>
      <ul>
        <li><b>Lag phase</b> — few individuals, acclimatising.</li>
        <li><b>Exponential (log) phase</b> — resources are plentiful, so the population grows at its maximum rate.</li>
        <li><b>Stationary phase</b> — the population reaches the <b>carrying capacity</b>. <b>Density-dependent</b> factors (competition for food, space and light; predation; disease; accumulation of waste) increase the death rate until it equals the birth rate.</li>
      </ul>
      <div class="eqn">population growth rate (%) = (change in population ÷ original population) × 100<small>change = (births + immigration) − (deaths + emigration)</small></div>
      <p class="note"><b>Density-independent</b> factors — a flood, a fire, an unusually cold winter — hit a population regardless of its size, and can crash it well below the carrying capacity.</p>`},
    { type:'num', h2:'Your turn — population growth rate', q:'A population of <b>5 000</b> deer has <b>400</b> births and <b>250</b> deaths in a year, with no migration. Calculate the <b>percentage population growth rate</b> for that year.',
      unit:'%', answer:3, tol:0.1, hint:'Change = 400 − 250 = 150. Then (150 ÷ 5000) × 100.' },
    { type:'mcq', h2:'The nitrogen cycle',
      q:'A waterlogged field loses nitrate. Which bacteria are responsible, and why does ploughing help?',
      why:'Denitrifying bacteria are ANAEROBIC: in waterlogged soil, with little oxygen, they reduce nitrate back to nitrogen gas, which is lost to the atmosphere. Ploughing and draining aerate the soil, which inhibits the denitrifiers and favours the aerobic nitrifying bacteria that make nitrate.',
      opts:[['Nitrifying bacteria; ploughing gives them more ammonium',0],['Denitrifying bacteria, which are anaerobic; ploughing aerates the soil and inhibits them',1],['Nitrogen-fixing bacteria; ploughing kills them',0],['Saprobiotic fungi; ploughing removes the dead matter they need',0]] }
  ]
},

/* ===================== UNIT A2 2 ===================== */
{
  key: 'biology-a-level-ccea', slug: 'biochemistry-genetics-evolutionary-trends',
  title: 'Biochemistry, Genetics &amp; Evolutionary Trends', emoji: '⚗️',
  spec: SPEC + ' · Unit A2 2: Biochemistry, Genetics and Evolutionary Trends',
  desc: 'A-level CCEA Biology mini-lesson on Unit A2 2: glycolysis, the link reaction, the Krebs cycle, oxidative phosphorylation and chemiosmosis, anaerobic respiration and the respiratory quotient; photosynthesis including the Z-scheme, photophosphorylation, the Calvin cycle, rubisco, absorption and action spectra and the compensation point; DNA as the genetic code, transcription and translation; gene technology; monohybrid, dihybrid, codominant, epistatic and sex-linked inheritance; population genetics and the Hardy-Weinberg equation; selection and speciation; and the evolutionary trends shown by the Kingdoms Plantae and Animalia.',
  overview3: ['respiration &amp; photosynthesis', 'genetics', 'evolutionary trends'],
  intro: 'CCEA Unit A2 2 is the biochemical and genetic heart of the A2 course: <b>respiration</b> and <b>photosynthesis</b> in full detail, <b>DNA as the genetic code</b>, <b>gene technology</b>, <b>inheritance</b> and <b>population genetics</b> (Hardy&ndash;Weinberg), and the <b>evolutionary trends</b> from moss to angiosperm and from cnidarian to annelid.',
  sortDone: 'The light-dependent stage is on the thylakoids; the light-independent stage is in the stroma.',
  matchDone: 'Each stage of respiration has its own location and its own yield.',
  recap: [
    '<b>Glycolysis</b> (cytoplasm): glucose → 2 pyruvate; net 2 ATP + 2 reduced NAD.',
    '<b>Link reaction</b> (matrix): pyruvate → acetyl CoA + CO₂ + reduced NAD (×2 per glucose).',
    '<b>Krebs cycle</b> (matrix), per turn: 2 CO₂, 3 reduced NAD, 1 reduced FAD, 1 ATP.',
    '<b>Oxidative phosphorylation</b> (inner membrane): the ETC pumps H⁺ into the intermembrane space; <b>chemiosmosis</b> through ATP synthase makes ATP; <b>oxygen is the final electron acceptor</b>, forming water.',
    '<b>Anaerobic:</b> pyruvate → lactate (animals) or ethanol + CO₂ (yeast/plants) — the point is to <b>regenerate NAD</b>. <b>RQ = CO₂ produced ÷ O₂ consumed</b> (≈1.0 carbohydrate, ≈0.9 protein, ≈0.7 lipid).',
    '<b>Photosynthesis:</b> light-dependent stage on the <b>thylakoids</b> — photoactivation of PSII and PSI (the <b>Z-scheme</b>), photophosphorylation, photolysis of water, reduction of NADP. Light-independent stage in the <b>stroma</b> — CO₂ + RuBP → 2 GP, catalysed by <b>rubisco</b>; GP reduced to TP using NADPH and ATP; 5/6 of the TP regenerates RuBP.',
    '<b>Genetics:</b> monohybrid and dihybrid crosses, codominance, multiple alleles, lethal alleles, epistasis, sex linkage, polygenic inheritance.',
    '<b>Hardy–Weinberg: p + q = 1 and p² + 2pq + q² = 1.</b> Stabilising selection favours the intermediate; directional selection favours one extreme. Allopatric speciation follows geographical isolation.'
  ],
  recapTail: 'You have covered the whole of CCEA Unit A2 2. Press <b>Finish</b> to see your score.',
  screens: [
    { type:'teach', tag:'5.1 Respiration', h2:'Glycolysis, the link reaction and the Krebs cycle',
      html:`      <p><b>Glycolysis (cytoplasm):</b> glucose is <b>phosphorylated</b> using <b>2 ATP</b>, making it more reactive, and splits into two <b>triose phosphate</b> molecules. These are oxidised to <b>pyruvate</b>, producing <b>4 ATP</b> (substrate-level phosphorylation) and <b>2 reduced NAD</b>. <b>Net yield: 2 ATP.</b> Glycolysis is the same whether or not oxygen is present.</p>
      <p><b>Link reaction (mitochondrial matrix), per pyruvate:</b> <b>decarboxylation</b> (CO₂ removed) and <b>dehydrogenation</b> (NAD reduced) give a 2-carbon <b>acetyl</b> group, which joins coenzyme A → <b>acetyl CoA</b>. It happens <b>twice</b> per glucose.</p>
      <p><b>Krebs cycle (matrix), per turn:</b> acetyl CoA (2C) + <b>oxaloacetate (4C)</b> → <b>citrate (6C)</b>; a series of decarboxylations and dehydrogenations regenerates oxaloacetate.</p>
      <div class="eqn">per turn: 2 CO₂ · 3 reduced NAD · 1 reduced FAD · 1 ATP<small>the cycle turns TWICE per glucose</small></div>`},
    { type:'num', h2:'Your turn — carbon dioxide released', q:'Calculate the total number of <b>CO₂ molecules</b> released per glucose molecule by the <b>link reaction and the Krebs cycle</b> together.',
      unit:'CO₂', answer:6, tol:0.1, hint:'Link reaction: 1 CO₂ per pyruvate × 2 = 2. Krebs: 2 CO₂ per turn × 2 turns = 4.' },
    { type:'teach', tag:'5.1 Respiration', h2:'Oxidative phosphorylation, anaerobic respiration and RQ',
      html:`      <p><b>Oxidative phosphorylation (inner mitochondrial membrane):</b> reduced NAD and reduced FAD are oxidised; their <b>electrons</b> pass along the <b>electron transport chain</b>, releasing energy that <b>pumps protons</b> from the matrix into the <b>intermembrane space</b>. The protons then flow back through <b>ATP synthase</b> — <b>chemiosmosis</b> — and the energy released phosphorylates ADP to <b>ATP</b>. <b>Oxygen is the final electron acceptor</b>, combining with electrons and protons to form <b>water</b>. Without oxygen, the chain backs up, no NAD is regenerated, and the Krebs cycle stops.</p>
      <p><b>Anaerobic respiration:</b> only glycolysis can continue, and only if <b>NAD is regenerated</b>.</p>
      <ul>
        <li><b>Animals:</b> pyruvate + reduced NAD → <b>lactate</b> (lactate dehydrogenase).</li>
        <li><b>Yeast and plants:</b> pyruvate → <b>ethanal</b> + CO₂ → <b>ethanol</b>.</li>
        <li><b>Oxygen debt:</b> the extra oxygen needed afterwards to oxidise the accumulated lactate and resynthesise ATP.</li>
      </ul>
      <div class="eqn">RQ = CO₂ produced ÷ O₂ consumed<small>carbohydrate ≈ 1.0 · protein ≈ 0.9 · lipid ≈ 0.7 · an RQ above 1.0 indicates anaerobic respiration</small></div>
      <p class="note">A <b>respirometer</b> with soda lime absorbs the CO₂ produced, so any movement of the manometer fluid is caused purely by <b>oxygen uptake</b>. Run it without soda lime and the movement gives the <b>difference</b> between O₂ consumed and CO₂ produced — from which the RQ can be calculated.</p>`},
    { type:'num', h2:'Your turn — respiratory quotient', q:'A respirometer shows that a germinating seed consumes <b>2.5 cm³</b> of oxygen and produces <b>2.0 cm³</b> of carbon dioxide in the same time. Calculate the <b>RQ</b>.',
      unit:'RQ', answer:0.8, tol:0.02, hint:'RQ = CO₂ ÷ O₂ = 2.0 ÷ 2.5.' },
    { type:'match', h2:'Match the stage to its site and yield', prompt:'Tap a stage on the left, then its site and main product.',
      headL:'Stage', headR:'Site and yield',
      pairs:[
        {l:'Glycolysis', r:'Cytoplasm — net 2 ATP and 2 reduced NAD'},
        {l:'Link reaction', r:'Matrix — acetyl CoA, CO₂ and reduced NAD'},
        {l:'Krebs cycle', r:'Matrix — 2 CO₂, 3 reduced NAD, 1 reduced FAD, 1 ATP per turn'},
        {l:'Oxidative phosphorylation', r:'Inner membrane — chemiosmosis; oxygen is the final electron acceptor'}] },
    { type:'teach', tag:'5.2 Photosynthesis', h2:'The light-dependent stage and the Z-scheme',
      html:`      <p><b>Site: the thylakoid membranes.</b></p>
      <ul>
        <li>Light is absorbed by <b>photosystem II (PSII)</b>: chlorophyll is <b>photoactivated</b> and two electrons are excited to a higher energy level and captured by an electron acceptor.</li>
        <li>The electrons pass along an electron transport chain <b>from PSII to PSI</b>. The energy released is used to build a <b>proton gradient</b> across the thylakoid membrane, and protons flowing back through <b>ATP synthase</b> generate <b>ATP</b>: <b>photophosphorylation</b>. This whole path — up, down, up, down — is the <b>Z-scheme</b>.</li>
        <li>The electrons lost from PSII are <b>replaced from the dissociation of water</b>: <b>2H₂O → 4H⁺ + 4e⁻ + O₂</b> (photolysis). <b>Oxygen is the waste product.</b></li>
        <li>Light also photoactivates <b>PSI</b>; its excited electrons are passed to the final acceptor <b>NADP</b>, which, with H⁺ from the water, is reduced to <b>NADPH (reduced NADP)</b>.</li>
      </ul>
      <p><b>Products passed on: ATP and reduced NADP.</b></p>`},
    { type:'teach', tag:'5.2 Photosynthesis', h2:'The Calvin cycle, spectra and limiting factors',
      html:`      <p><b>Site: the stroma.</b></p>
      <ul>
        <li><b>Fixation:</b> CO₂ combines with <b>ribulose bisphosphate (RuBP, 5C)</b>, catalysed by <b>rubisco</b>, giving <b>two molecules of glycerate phosphate (GP, 3C)</b>.</li>
        <li><b>Reduction:</b> GP is reduced to <b>triose phosphate (TP, 3C)</b> using <b>NADPH</b> and <b>ATP</b>.</li>
        <li><b>Regeneration:</b> <b>five-sixths</b> of the TP is used, with more ATP, to <b>regenerate RuBP</b>; the remaining <b>one-sixth</b> is used to make hexose sugars and other compounds.</li>
      </ul>
      <p><b>Pigments (5.2.4):</b> an <b>absorption spectrum</b> shows how much light of each wavelength a pigment absorbs (chlorophyll a and b peak in the blue and red, reflecting green). An <b>action spectrum</b> shows the <b>rate of photosynthesis</b> at each wavelength. The close match between the two is strong evidence that these pigments are the ones actually driving photosynthesis.</p>
      <p class="note"><b>Limiting factors (5.2.5):</b> light intensity, CO₂ concentration and temperature. The <b>compensation point</b> is the light intensity at which the rate of <b>photosynthesis exactly equals the rate of respiration</b>, so there is no net gas exchange. <b>Gross</b> photosynthesis is the total fixed; <b>net</b> photosynthesis is what is left after the plant&rsquo;s own respiration.</p>`},
    { type:'sort', h2:'Light-dependent or Calvin cycle?', prompt:'Tap an event, then tap the stage it belongs to.',
      bins:['💡 Light-dependent (thylakoid)','🔄 Calvin cycle (stroma)','🔁 Links the two'],
      data:[['Photolysis of water releasing oxygen','a'],['Photoactivation of PSI and PSII (the Z-scheme)','a'],['Photophosphorylation of ADP to ATP','a'],['Rubisco catalyses the fixation of CO₂ onto RuBP','b'],['GP is reduced to triose phosphate','b'],['Five-sixths of the TP regenerates RuBP','b'],['ATP and reduced NADP','c']] },
    { type:'num', h2:'Your turn — pigment R<sub>f</sub>', q:'In a chromatogram of plant pigments, a pigment travels <b>6.6 cm</b> and the solvent front travels <b>11.0 cm</b>. Calculate the <b>R<sub>f</sub></b> value.',
      unit:'Rf', answer:0.60, tol:0.01, hint:'Rf = 6.6 ÷ 11.0.' },
    { type:'teach', tag:'5.3 DNA as the genetic code · 5.4 Gene technology', h2:'The genetic code and gene technology',
      html:`      <p>A <b>gene</b> is a sequence of bases coding for a sequence of amino acids. The code is <b>triplet</b>, <b>non-overlapping</b>, <b>degenerate</b> and <b>universal</b>.</p>
      <p><b>Transcription:</b> RNA polymerase reads the DNA <b>template strand</b> and builds a complementary mRNA. In eukaryotes, the primary transcript is <b>spliced</b>: <b>introns</b> are removed and <b>exons</b> joined.</p>
      <p><b>Translation:</b> on the ribosome, each mRNA <b>codon</b> is read by the complementary <b>anticodon</b> of a tRNA carrying a specific amino acid; <b>peptide bonds</b> join them into a polypeptide.</p>
      <p><b>Gene technology (5.4):</b></p>
      <ul>
        <li><b>Restriction enzymes</b> cut DNA at specific palindromic recognition sequences, often leaving <b>sticky ends</b>.</li>
        <li><b>DNA ligase</b> joins the gene into a <b>plasmid vector</b> cut with the <b>same</b> restriction enzyme, so the sticky ends are complementary — giving <b>recombinant DNA</b>.</li>
        <li>Bacteria take up the plasmid (<b>transformation</b>); <b>marker genes</b> identify the transformed cells.</li>
        <li><b>PCR</b> amplifies DNA: denature at 95 °C, anneal primers at 50–65 °C, extend with <b>Taq polymerase</b> at 72 °C. Each cycle <b>doubles</b> the DNA.</li>
        <li><b>Gel electrophoresis</b> separates fragments by size: DNA is negatively charged, so it moves to the <b>anode</b>, and <b>shorter fragments travel further</b>. This underpins <b>genetic fingerprinting</b>.</li>
      </ul>`},
    { type:'teach', tag:'5.5 Genes and patterns of inheritance', h2:'Inheritance — beyond the simple monohybrid',
      html:`      <ul>
        <li><b>Monohybrid</b> — one gene. Heterozygous × heterozygous gives the classic <b>3:1</b> phenotypic ratio (Mendel&rsquo;s <b>law of segregation</b>).</li>
        <li><b>Dihybrid</b> — two unlinked genes. Double heterozygotes give <b>9:3:3:1</b> (Mendel&rsquo;s <b>law of independent assortment</b>).</li>
        <li><b>Codominance</b> — both alleles are expressed in the heterozygote (roan cattle; the AB blood group). Note this is <b>not</b> blending.</li>
        <li><b>Multiple alleles</b> — more than two alleles exist in the population (ABO blood groups: I<sup>A</sup>, I<sup>B</sup>, I<sup>O</sup>).</li>
        <li><b>Lethal alleles</b> — a genotype that dies before birth, so an expected class is missing: a 3:1 cross becomes <b>2:1</b>.</li>
        <li><b>Test cross</b> — cross the unknown dominant phenotype with the <b>homozygous recessive</b>. Any recessive offspring proves the parent was heterozygous.</li>
        <li><b>Epistasis</b> — one gene <b>masks or modifies</b> the expression of another, distorting the 9:3:3:1 ratio (e.g. to 9:3:4 or 9:7).</li>
        <li><b>Sex linkage</b> — genes on the X chromosome. Males (XY) are <b>hemizygous</b>, so a single recessive allele is expressed: haemophilia and red-green colour blindness are far more common in males, and a carrier mother passes the allele to half her sons.</li>
        <li><b>Polygenic inheritance</b> — many genes with small additive effects, plus the environment, give <b>continuous</b> variation.</li>
      </ul>`},
    { type:'mcq', h2:'Sex linkage',
      q:'A woman who is a carrier for haemophilia (X<sup>H</sup>X<sup>h</sup>) has children with an unaffected man (X<sup>H</sup>Y). What proportion of their SONS would be expected to have haemophilia?',
      why:'The sons receive Y from the father and either X^H or X^h from the mother, with equal probability. A son with X^h Y is hemizygous — he has no second X to mask it — so he has haemophilia. That is half of the sons (and a quarter of ALL the children).',
      opts:[['None',0],['One quarter of the sons',0],['One half of the sons',1],['All of the sons',0]] },
    { type:'teach', tag:'5.6 Population genetics', h2:'Hardy–Weinberg, selection and speciation',
      html:`      <p>The <b>gene pool</b> is the total of all the alleles in a population.</p>
      <div class="eqn">p + q = 1<br>p² + 2pq + q² = 1<small>p = frequency of the dominant allele; q = the recessive.<br>p² = homozygous dominant; 2pq = heterozygous; q² = homozygous recessive.</small></div>
      <p>The <b>Hardy–Weinberg principle</b> describes a population at <b>genetic equilibrium</b>, with alleles combining randomly at fertilisation. It only applies if the population is <b>large</b>, mating is <b>random</b>, and there is <b>no mutation, no migration and no selection</b>. If those conditions are broken, allele or genotype frequencies change — and that <b>change in allele frequency is evolution</b>.</p>
      <p><b>Selection (5.6.4):</b> <b>fitness</b> is the set of features allowing an organism to survive and reproduce in its environment. Selection is the <b>differential perpetuation of alleles</b>.</p>
      <ul>
        <li><b>Stabilising selection</b> favours the <b>modal / intermediate</b> variants (e.g. human birth mass), reducing variation and maintaining the status quo.</li>
        <li><b>Directional selection</b> favours <b>one extreme</b>, shifting the mean — for example antibiotic resistance in bacteria, or industrial melanism.</li>
      </ul>
      <p class="note"><b>Speciation (5.6.5):</b> a species is a group of common ancestry that can normally interbreed to produce <b>fertile</b> offspring. In <b>allopatric</b> speciation a <b>geographical</b> barrier separates two populations; different selection pressures and mutations make them diverge genetically until <b>reproductive isolating mechanisms</b> maintain the divergence even if they meet again. <b>Heterozygotes are important reservoirs of variation</b>, because they carry recessive alleles that selection cannot see.</p>`},
    { type:'num', h2:'Your turn — Hardy–Weinberg', q:'In a population, <b>9 %</b> of individuals show a recessive phenotype. Use p² + 2pq + q² = 1 to calculate the <b>percentage of the population that is heterozygous</b>.',
      unit:'%', answer:42, tol:0.5, hint:'q² = 0.09, so q = 0.3 and p = 0.7. Heterozygotes = 2pq = 2 × 0.7 × 0.3.' },
    { type:'mcq', h2:'Which kind of selection?',
      q:'In a population of birds on a windy island, birds with very long wings and birds with very short wings both survive less well than birds with average wings. What type of selection is this?',
      why:'Both extremes are selected against and the intermediate (modal) phenotype is favoured. That is stabilising selection: it reduces variation and holds the mean where it is. Directional selection would favour ONE extreme and shift the mean.',
      opts:[['Directional selection',0],['Stabilising selection',1],['Disruptive selection',0],['Artificial selection',0]] },
    { type:'teach', tag:'5.7 Kingdom Plantae', h2:'Evolutionary trends — moss, fern, angiosperm',
      html:`      <p>The trend from moss to flowering plant is a story of <b>increasing adaptation to life on land</b>.</p>
      <ul>
        <li><b>Moss</b> — multicellular but <b>not differentiated</b> into true leaves, stem and roots. <b>No cuticle or stomata</b> (except in the spore-producing structures) and <b>no vascular tissue</b>, so support comes only from <b>turgor</b>. <b>Rhizoids</b> attach it but do not penetrate deeply, so mosses are restricted to <b>moist</b> habitats where water is near the surface. Dispersal by <b>spores</b> that need moist conditions to germinate.</li>
        <li><b>Fern</b> — better adapted to land: well differentiated, with <b>true roots, stems and leaves</b> and a <b>vascular system</b>. It has a <b>waterproof cuticle</b> and fine control over <b>stomata</b>. Support comes from turgor <b>and</b> from <b>lignified xylem</b>. Still dispersed by <b>spores</b> that need moisture.</li>
        <li><b>Angiosperm (flowering plant)</b> — has all the fern&rsquo;s water-retention and support features, but more highly evolved: extensive <b>xylem tissue forming wood</b>, and <b>xerophytic adaptations</b> for dry habitats. Crucially, dispersal is by <b>seeds</b> with a tough outer coat that <b>withstands desiccation</b> — so reproduction is no longer tied to water.</li>
      </ul>`},
    { type:'teach', tag:'5.8 Kingdom Animalia', h2:'Evolutionary trends — Cnidaria, Platyhelminthes, Annelida',
      html:`      <ul>
        <li><b>Phylum Cnidaria</b> (hydra, jellyfish) — multicellular and <b>radially symmetrical</b>. Supported by the <b>aqueous medium</b> and by a <b>hydrostatic skeleton</b> formed by the fluid-filled <b>enteron</b>. A single body opening.</li>
        <li><b>Phylum Platyhelminthes</b> (planarian, liver fluke) — <b>bilaterally symmetrical</b> and <b>flattened dorso-ventrally</b> (which keeps every cell close to the surface, so diffusion suffices). A <b>single opening</b> to the gut. <b>No specialised skeletal system</b>; supported by the body tissue itself.</li>
        <li><b>Phylum Annelida</b> (earthworm, lugworm) — bilaterally symmetrical and <b>segmented</b>, with a fluid-filled <b>coelom</b> acting as a hydrostatic skeleton against which the circular and longitudinal muscles can work antagonistically. A <b>through-gut</b> with a separate mouth and anus, allowing continuous feeding and regional specialisation of the gut.</li>
      </ul>
      <p class="note"><b>The trend to read off:</b> radial → bilateral symmetry; a single gut opening → a through-gut; no skeleton → a hydrostatic skeleton; unsegmented → segmented. Each step supports greater size, greater activity and greater specialisation.</p>`}
  ]
},

/* ===================== UNIT A2 3 ===================== */
{
  key: 'biology-a-level-ccea', slug: 'practical-skills-in-biology',
  title: 'Practical Skills in Biology', emoji: '📊',
  spec: SPEC + ' · Unit A2 3: Practical Skills in Biology',
  desc: 'A-level CCEA Biology mini-lesson on Unit A2 3 Practical Skills in Biology: the respirometer and respiratory quotient, redox indicators such as methylene blue and DCPIP, chromatography of plant pigments and Rf values, ecological sampling, experimental design, the chi-squared test, statistical analysis, uncertainty and percentage error, and the evaluation of data.',
  overview3: ['A2 techniques', 'statistics', 'evaluation'],
  intro: 'CCEA Unit A2 3 assesses your <b>practical skills</b> across the A2 course. This mini-lesson works through the A2 techniques — the <b>respirometer and RQ</b>, <b>redox indicators</b> (methylene blue and DCPIP), <b>pigment chromatography</b>, and <b>ecological sampling</b> — and the <b>statistics and evaluation</b> that the written paper actually rewards.',
  sortDone: 'Every A2 practical has a controlled variable, a measured variable, and a source of error you must be able to name.',
  matchDone: 'Each statistical test answers a different question — pick the test that matches your data.',
  recap: [
    '<b>Respirometer:</b> soda lime absorbs CO₂, so manometer movement measures <b>oxygen uptake</b>. Include a <b>control</b> tube with glass beads to correct for changes in temperature and atmospheric pressure.',
    '<b>RQ = CO₂ produced ÷ O₂ consumed.</b> ≈1.0 carbohydrate; ≈0.9 protein; ≈0.7 lipid; >1.0 indicates anaerobic respiration.',
    '<b>Redox indicators:</b> <b>methylene blue</b> and <b>DCPIP</b> are artificial <b>hydrogen/electron acceptors</b> — they become <b>colourless when reduced</b>, so the time taken to decolourise measures dehydrogenase activity.',
    '<b>R<sub>f</sub> = distance moved by the pigment ÷ distance moved by the solvent front.</b>',
    '<b>χ² = Σ (O − E)² ÷ E</b>, with degrees of freedom = (number of classes − 1). If χ² is <b>less than</b> the critical value at p = 0.05, accept the null hypothesis: the difference is due to chance.',
    '<b>% error = (uncertainty ÷ measured value) × 100.</b> Random errors are reduced by repeating; systematic errors are not — the instrument must be calibrated.',
    '<b>Anomalies</b> should be identified and excluded from the mean, and the reason given — never quietly deleted.',
    '<b>Correlation is not causation.</b> A statistically significant correlation still needs a plausible mechanism before you can claim a cause.'
  ],
  recapTail: 'You have covered the A2 practical skills. Press <b>Finish</b> to see your score.',
  screens: [
    { type:'teach', tag:'Respirometer', h2:'Using a respirometer',
      html:`      <p>A respirometer measures the gas exchange of a small organism (germinating seeds, maggots, woodlice) sealed in a tube connected to a manometer.</p>
      <ul>
        <li><b>With soda lime:</b> the CO₂ produced is <b>absorbed</b>, so the only change in gas volume is caused by <b>oxygen consumption</b>. The manometer fluid moves <b>towards the organism</b>, and the distance moved gives the volume of O₂ taken up.</li>
        <li><b>Without soda lime:</b> the change reflects the <b>difference</b> between O₂ consumed and CO₂ produced — and combining the two runs lets you calculate the <b>RQ</b>.</li>
        <li><b>Control tube:</b> an identical tube containing <b>glass beads</b> of the same volume. It has no respiring organism, so any movement in it must be caused by changes in <b>temperature or atmospheric pressure</b> — and your reading is corrected accordingly.</li>
        <li>Keep the whole apparatus in a <b>water bath</b> at constant temperature: the gas laws mean even a small temperature change moves the manometer fluid far more than respiration does.</li>
      </ul>
      <div class="eqn">RQ = CO₂ produced ÷ O₂ consumed<small>carbohydrate ≈ 1.0 · protein ≈ 0.9 · lipid ≈ 0.7 · above 1.0 → anaerobic respiration</small></div>`},
    { type:'num', h2:'Your turn — respiratory quotient', q:'A respirometer shows that an organism consumes <b>5.0 cm³</b> of oxygen and produces <b>3.5 cm³</b> of carbon dioxide in the same period. Calculate its <b>RQ</b>.',
      unit:'RQ', answer:0.7, tol:0.02, hint:'RQ = CO₂ ÷ O₂ = 3.5 ÷ 5.0.' },
    { type:'mcq', h2:'Identify the substrate',
      q:'An organism has an RQ of 0.7. Which respiratory substrate is it mainly using?',
      why:'Lipids are highly reduced and contain relatively little oxygen, so their oxidation consumes a great deal of O2 relative to the CO2 produced — giving an RQ of about 0.7. Carbohydrate gives about 1.0 and protein about 0.9.',
      opts:[['Carbohydrate',0],['Protein',0],['Lipid',1],['It must be respiring anaerobically',0]] },
    { type:'teach', tag:'Redox indicators', h2:'Methylene blue and DCPIP',
      html:`      <p>Both are <b>artificial hydrogen (electron) acceptors</b> — they take the place of the natural coenzymes, and they change colour when reduced. That makes an invisible reaction visible and timeable.</p>
      <ul>
        <li><b>Methylene blue</b> (respiration) — blue when oxidised, <b>colourless when reduced</b>. Add it to a yeast suspension: <b>dehydrogenase</b> enzymes strip hydrogen from the respiratory substrate and pass it to the dye, so the faster respiration is going, the <b>faster the blue colour disappears</b>. Layer oil on top or use a stoppered tube, because oxygen re-oxidises the dye back to blue.</li>
        <li><b>DCPIP</b> (photosynthesis — the <b>Hill reaction</b>) — blue when oxidised, <b>colourless when reduced</b>. Add it to a suspension of isolated <b>chloroplasts</b> and illuminate them: DCPIP substitutes for NADP, accepting the electrons from the light-dependent reaction. The time taken to decolourise is a measure of the rate of the light-dependent stage. Keep the chloroplasts cold and in an isotonic buffer so they are not damaged, and include a <b>dark control</b>, which should stay blue.</li>
      </ul>
      <p class="note">The <b>dark control</b> is the single most important control here: if the tube kept in darkness also decolourises, then something other than the light-dependent reaction is reducing the dye, and your result is worthless.</p>`},
    { type:'num', h2:'Your turn — pigment R<sub>f</sub>', q:'In a chromatogram of chloroplast pigments, one pigment travels <b>4.5 cm</b> and the solvent front travels <b>9.0 cm</b>. Calculate the <b>R<sub>f</sub></b> value.',
      unit:'Rf', answer:0.50, tol:0.01, hint:'Rf = 4.5 ÷ 9.0.' },
    { type:'teach', tag:'Statistics', h2:'The chi-squared test',
      html:`      <p>Use <b>chi-squared</b> when you have <b>categorical (counted) data</b> and want to know whether your <b>observed</b> results differ significantly from the results you <b>expected</b> — the classic case being a genetic cross.</p>
      <div class="eqn">χ² = Σ (O − E)² ÷ E<small>degrees of freedom = (number of categories − 1)</small></div>
      <ol style="margin:0 0 14px 2px;padding-left:22px">
        <li>State the <b>null hypothesis</b>: there is <b>no significant difference</b> between the observed and expected results; any difference is due to <b>chance</b>.</li>
        <li>Calculate the <b>expected</b> numbers from the predicted ratio.</li>
        <li>Calculate χ².</li>
        <li>Find the <b>critical value</b> in the table at <b>p = 0.05</b> and the correct degrees of freedom.</li>
        <li><b>χ² less than the critical value</b> → <b>accept</b> the null hypothesis: the difference is due to chance. <b>χ² greater than or equal to the critical value</b> → <b>reject</b> it: the difference is <b>significant</b>, and something else (linkage, epistasis, selection) is going on.</li>
      </ol>
      <p class="note">p = 0.05 means there is a <b>5 % probability</b> that a difference this large could have arisen by chance alone. It is a convention, not a law of nature — and χ² needs reasonably large numbers to be valid.</p>`},
    { type:'num', h2:'Your turn — chi-squared', q:'A dihybrid cross predicts a <b>9:3:3:1</b> ratio. From <b>160</b> offspring the observed numbers are <b>100, 26, 28 and 6</b>. Calculate χ² = Σ (O − E)² ÷ E. Give your answer to <b>2 decimal places</b>.',
      unit:'χ²', answer:3.38, tol:0.06, hint:'Expected = 90, 30, 30, 10. Terms: 100/90 = 1.111; 16/30 = 0.533; 4/30 = 0.133; 16/10 = 1.600.' },
    { type:'mcq', h2:'Interpreting your chi-squared',
      q:'Your χ² is 3.38. With 3 degrees of freedom, the critical value at p = 0.05 is 7.82. What do you conclude?',
      why:'χ² (3.38) is LESS than the critical value (7.82), so the probability that the difference arose by chance is greater than 5 %. You accept the null hypothesis: there is no significant difference, and the data are consistent with the 9:3:3:1 ratio.',
      opts:[['The difference is significant, so the genes must be linked',0],['Accept the null hypothesis — the data are consistent with a 9:3:3:1 ratio',1],['The experiment is invalid because the numbers are not equal',0],['Degrees of freedom should be 160, so the test cannot be used',0]] },
    { type:'match', h2:'Which statistical tool?', prompt:'Tap the question on the left, then the right tool.',
      headL:'The question you are asking', headR:'Tool',
      pairs:[
        {l:'Do my observed genetic ratios differ significantly from the expected ratios?', r:'Chi-squared test'},
        {l:'How spread out are my repeat measurements around the mean?', r:'Standard deviation'},
        {l:'What is the typical value of my repeated readings?', r:'Arithmetic mean'},
        {l:'How much of my measurement could be down to the instrument?', r:'Percentage error'}] },
    { type:'teach', tag:'Uncertainty and error', h2:'Uncertainty, accuracy and precision',
      html:`      <ul>
        <li><b>Accuracy</b> — how close a reading is to the <b>true value</b>.</li>
        <li><b>Precision</b> — how closely repeated readings agree with each other. A miscalibrated balance gives precise but <b>inaccurate</b> results.</li>
        <li><b>Random error</b> — varies unpredictably; reduced by taking many <b>repeats</b> and a mean.</li>
        <li><b>Systematic error</b> — the same size and direction every time (a zero error, a balance reading 0.2 g high). Repeats will <b>not</b> help; you must <b>calibrate</b>.</li>
      </ul>
      <div class="eqn">% error = (uncertainty ÷ measured value) × 100<small>uncertainty is usually half the smallest scale division</small></div>
      <p class="note">Always take the <b>largest practical measurement</b>, because the percentage error falls as the measured value rises. Identify <b>anomalies</b>, exclude them from the mean, and <b>say why</b> — an anomaly you cannot explain is a finding, not an embarrassment.</p>`},
    { type:'num', h2:'Your turn — percentage error', q:'A balance has an uncertainty of <b>±0.005 g</b>. A student weighs a sample as <b>2.50 g</b>. Calculate the <b>percentage error</b>.',
      unit:'%', answer:0.2, tol:0.01, hint:'(0.005 ÷ 2.50) × 100.' },
    { type:'teach', tag:'Experimental design', h2:'Designing an A2 investigation',
      html:`      <ul>
        <li><b>Independent variable</b> — the one you change. Choose a sensible <b>range</b> and at least <b>five</b> values, so a trend can be seen.</li>
        <li><b>Dependent variable</b> — the one you measure, as objectively and precisely as the apparatus allows.</li>
        <li><b>Controlled variables</b> — everything else that could affect the result: temperature (water bath), pH (buffer), volume and concentration of solutions, and the age, mass and species of the organism. Controlling them is what makes the experiment <b>valid</b>.</li>
        <li><b>Control experiment</b> — an identical set-up with the key factor removed (boiled enzyme, glass beads, a tube kept in the dark). It proves that your result is really caused by what you think it is.</li>
        <li><b>Replicates</b> — repeats make the mean more <b>reliable</b> and let you spot anomalies.</li>
      </ul>
      <p class="note"><b>Ethics and safety</b> are marked too: risk-assess the reagents, handle organisms humanely and return them to their habitat, and follow aseptic technique with microorganisms.</p>`},
    { type:'sort', h2:'Which kind of variable?', prompt:'Tap an item, then tap the type of variable it is in an investigation into the effect of temperature on enzyme activity.',
      bins:['🎚️ Independent','📏 Dependent','🔒 Controlled'],
      data:[['The temperature of the water bath','a'],['The volume of oxygen produced per minute','b'],['The time taken for the colour to change','b'],['The pH, fixed with a buffer','c'],['The concentration of the substrate','c'],['The volume of enzyme solution used','c']] },
    { type:'num', h2:'Your turn — rate from a colorimeter', q:'In a starch–amylase reaction, the absorbance falls from <b>0.80</b> to <b>0.20</b> over <b>4.0 minutes</b>. Calculate the <b>mean rate of change of absorbance</b> per minute.',
      unit:'per min', answer:0.15, tol:0.005, hint:'Change = 0.80 − 0.20 = 0.60. Rate = 0.60 ÷ 4.0.' },
    { type:'mcq', h2:'Evaluating a conclusion',
      q:'A student finds a strong, statistically significant correlation between soil nitrate concentration and plant height in a field. What is the strongest valid conclusion?',
      why:'A significant correlation in field data shows an association, not a cause: soil nitrate might co-vary with water availability, light, pH or soil depth. To establish cause you need a plausible mechanism and a controlled experiment in which only nitrate is varied.',
      opts:[['Nitrate concentration causes the increase in plant height',0],['The two are associated, but a controlled experiment is needed before cause can be claimed',1],['Plant height causes the increase in soil nitrate',0],['The correlation must be a coincidence because it is only field data',0]] }
  ]
}

];
