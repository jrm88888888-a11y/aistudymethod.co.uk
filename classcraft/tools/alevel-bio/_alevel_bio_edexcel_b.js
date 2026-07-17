/* SNAB Topics 5-8 — data for _build_alevel_bio.js */
const SPEC = 'Edexcel A-level Biology A (Salters-Nuffield) 9BN0';

module.exports = [

/* ============================ TOPIC 5 ============================ */
{
  key: 'biology-a-level-edexcel', slug: 'on-the-wild-side',
  title: 'On the Wild Side', emoji: '🌍',
  spec: SPEC + ' · Topic 5: On the Wild Side',
  desc: 'A-level Salters-Nuffield Biology mini-lesson on Topic 5 On the Wild Side: ecosystems, niche, succession, the light-dependent reactions and the Calvin cycle, chloroplast structure, gross and net primary productivity, energy transfer efficiency, evidence for climate change, the effect of temperature on enzymes, evolution and speciation, and the carbon cycle.',
  overview3: ['ecosystems &amp; succession', 'photosynthesis', 'climate &amp; evolution'],
  intro: 'SNAB Topic 5 links <b>photosynthesis</b> — the light-dependent reactions and the <b>Calvin cycle</b> — to <b>productivity</b>, <b>energy flow</b>, <b>succession</b> and the biology of <b>climate change</b>, ending with <b>evolution and speciation</b>.',
  sortDone: 'The light-dependent reactions happen on the thylakoid membranes; the Calvin cycle happens in the stroma.',
  matchDone: 'Allopatric speciation needs geographical isolation; sympatric speciation does not.',
  recap: [
    '<b>Ecology terms:</b> habitat, population, community, ecosystem; a niche is the role of a species within it.',
    '<b>Succession:</b> pioneer species → colonisers change the abiotic conditions → intermediate communities → climax community. Diversity and biomass rise; a deflected succession (plagioclimax) is held back by human activity.',
    '<b>Light-dependent reactions</b> (thylakoid membranes): photoionisation of chlorophyll, electron transport chain, <b>photolysis</b> of water (2H₂O → 4H⁺ + 4e⁻ + O₂), <b>chemiosmosis</b> through ATP synthase, reduction of NADP.',
    '<b>Calvin cycle</b> (stroma): CO₂ + RuBP (5C) →(<b>rubisco</b>)→ 2 × GP (3C) →(reduced NADP + ATP)→ TP (3C); most TP regenerates RuBP.',
    '<b>NPP = GPP − R.</b> Energy transfer between trophic levels is typically ~10 % (and only ~1–3 % of incident light is fixed at all).',
    '<b>Climate change evidence:</b> ice cores, dendrochronology, pollen in peat bogs, direct CO₂ and temperature records.',
    '<b>Temperature and enzymes:</b> rate rises with temperature up to the optimum (more kinetic energy, more E–S complexes) then falls sharply as the tertiary structure — and so the active site — is denatured.',
    '<b>Speciation:</b> isolation reduces gene flow → different selection pressures / genetic drift → allele frequencies diverge → reproductive isolation → new species. Allopatric = geographical; sympatric = within the same area.'
  ],
  recapTail: 'You have covered the whole of SNAB Topic 5. Press <b>Finish</b> to see your score.',
  screens: [
    { type:'teach', tag:'Ecosystems · 5.1–5.3', h2:'Ecosystems, niche and distribution',
      html:`      <ul>
        <li><b>Habitat</b> — the place where an organism lives.</li>
        <li><b>Population</b> — all the individuals of one species in a habitat at one time.</li>
        <li><b>Community</b> — all the populations of all species in a habitat.</li>
        <li><b>Ecosystem</b> — the community <b>plus</b> the abiotic (non-living) environment, interacting as a unit.</li>
      </ul>
      <p>Numbers and distribution are set by <b>abiotic</b> factors (temperature, light, water, pH, mineral ions, oxygen) and <b>biotic</b> factors (competition, predation, disease). The <b>niche</b> concept explains why: each species can only persist where the whole set of conditions it requires is met, and where it is not out-competed.</p>
      <p class="note"><b>Core practical 10:</b> investigate the distribution of a species using <b>random quadrats</b> (for abundance in a uniform area — a random number generator gives the coordinates) or a <b>belt transect</b> (to record change along an environmental gradient, e.g. up a shore).</p>`},
    { type:'teach', tag:'Succession · 5.4', h2:'Succession',
      html:`      <p><b>Succession</b> is the change in a community over time.</p>
      <ul>
        <li><b>Pioneer species</b> (e.g. lichens on bare rock) colonise a hostile abiotic environment. They are adapted to extreme conditions and reproduce asexually or by wind-blown spores.</li>
        <li>They <b>change the abiotic conditions</b> — weathering the rock, and adding humus when they die — which makes the environment <b>less hostile</b> and suitable for the next species.</li>
        <li>Each new community <b>out-competes and replaces</b> the last. Soil depth, biomass and biodiversity all <b>increase</b>.</li>
        <li>The stable end point is the <b>climax community</b>, determined by the climate.</li>
      </ul>
      <p class="note">If grazing, burning or mowing stops the succession early, the result is a <b>plagioclimax</b> (deflected succession) — a heather moor or a chalk grassland, for example. Removing the grazing pressure lets succession resume.</p>`},
    { type:'teach', tag:'Photosynthesis · 5.5–5.7', h2:'The light-dependent reactions',
      html:`      <p>Overall: <b>6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</b> — the light energy is used to <b>reduce</b> carbon dioxide.</p>
      <p>The light-dependent reactions take place on the <b>thylakoid membranes</b> of the grana:</p>
      <ul>
        <li>Light strikes chlorophyll in a photosystem; two electrons are <b>excited</b> and leave (<b>photoionisation</b>).</li>
        <li>The electrons pass down an <b>electron transport chain</b> of carriers. The energy released is used to <b>pump protons (H⁺)</b> from the stroma into the <b>thylakoid space</b>, creating an electrochemical gradient.</li>
        <li><b>Chemiosmosis:</b> the protons flow back down the gradient through <b>ATP synthase</b>, and the energy released drives the phosphorylation of ADP → <b>ATP</b>. (Non-cyclic photophosphorylation.)</li>
        <li><b>Photolysis of water</b> replaces the lost electrons: <b>2H₂O → 4H⁺ + 4e⁻ + O₂</b>. The oxygen you breathe is the waste product of this step.</li>
        <li>NADP is <b>reduced</b> (accepting the electrons and H⁺) to <b>reduced NADP</b>.</li>
      </ul>
      <p><b>Products passed to the Calvin cycle: ATP and reduced NADP.</b></p>`},
    { type:'teach', tag:'Photosynthesis · 5.8–5.9', h2:'The Calvin cycle and the chloroplast',
      html:`      <p>The light-<b>independent</b> reactions take place in the <b>stroma</b>:</p>
      <ul>
        <li><b>Fixation:</b> CO₂ combines with the 5-carbon <b>ribulose bisphosphate (RuBP)</b>, catalysed by <b>rubisco</b>. The unstable 6C intermediate immediately splits into <b>two molecules of glycerate 3-phosphate (GP, 3C)</b>.</li>
        <li><b>Reduction:</b> GP is reduced to <b>triose phosphate (TP, 3C)</b>, using <b>reduced NADP</b> and energy from <b>ATP</b>.</li>
        <li><b>Regeneration:</b> five out of every six TP molecules are used, with more ATP, to <b>regenerate RuBP</b>. Only one in six leaves the cycle to make sugars, amino acids and lipids.</li>
      </ul>
      <div class="eqn">per turn: 1 CO₂ · 3 ATP · 2 reduced NADP<small>so making one hexose sugar takes 6 turns, 18 ATP and 12 reduced NADP</small></div>
      <p class="note"><b>Chloroplast structure fits function:</b> stacked thylakoids give a huge <b>surface area</b> for the photosystems and the ETC; the thylakoid space is small, so a proton gradient builds quickly; the stroma holds the Calvin-cycle enzymes and is where starch grains and lipid droplets accumulate. <b>Core practical 11</b> uses <b>DCPIP</b> as an artificial electron acceptor to follow dehydrogenase activity in isolated chloroplasts.</p>`},
    { type:'sort', h2:'Which stage of photosynthesis?', prompt:'Tap an event, then tap where it happens.',
      bins:['💡 Light-dependent (thylakoid)','🔄 Calvin cycle (stroma)','🔁 Both / links them'],
      data:[['Photolysis of water releasing O₂','a'],['Protons pumped into the thylakoid space','a'],['Chemiosmosis through ATP synthase','a'],['CO₂ combines with RuBP, catalysed by rubisco','b'],['GP is reduced to triose phosphate','b'],['RuBP is regenerated','b'],['ATP and reduced NADP','c']] },
    { type:'num', h2:'Your turn — turns of the Calvin cycle', q:'The Calvin cycle fixes one molecule of CO₂ per turn. Calculate how many <b>turns</b> are needed to produce one molecule of a <b>hexose</b> sugar (C₆H₁₂O₆).',
      unit:'turns', answer:6, tol:0.1, hint:'One CO₂ per turn, and a hexose contains 6 carbons.' },
    { type:'num', h2:'Your turn — ATP cost of a hexose', q:'Each turn of the Calvin cycle uses <b>3 ATP</b> (2 in the reduction of GP and 1 in the regeneration of RuBP). Calculate the total number of <b>ATP</b> molecules used to make one hexose sugar.',
      unit:'ATP', answer:18, tol:0.1, hint:'6 turns × 3 ATP per turn.' },
    { type:'teach', tag:'Productivity · 5.10–5.11', h2:'GPP, NPP and energy transfer',
      html:`      <p>Only about <b>1–3 %</b> of the light falling on a plant is converted into chemical energy at all — the rest is reflected, transmitted, of the wrong wavelength, or misses the chloroplasts.</p>
      <div class="eqn">NPP = GPP − R<small>GPP = gross primary productivity (total chemical energy fixed)<br>R = energy lost in the plant&rsquo;s own respiration<br>NPP = net primary productivity — the energy available to the next trophic level</small></div>
      <div class="eqn">% efficiency = (energy in this trophic level ÷ energy in the previous level) × 100<small>typically ~10 % between consumer levels</small></div>
      <p><b>Why is so much lost?</b> Not all the organism is eaten (roots, bones); not all that is eaten is digested (it is <b>egested</b>); some energy is excreted as urea; and a great deal is released as <b>heat</b> in respiration — especially in endotherms.</p>`},
    { type:'num', h2:'Your turn — net primary productivity', q:'A grassland has a gross primary productivity of <b>20 000 kJ m⁻² yr⁻¹</b>. The plants lose <b>8 000 kJ m⁻² yr⁻¹</b> in respiration. Calculate the <b>net primary productivity</b>.',
      unit:'kJ m⁻² yr⁻¹', answer:12000, tol:1, hint:'NPP = GPP − R = 20 000 − 8 000.' },
    { type:'num', h2:'Your turn — energy transfer efficiency', q:'Of that NPP of <b>12 000 kJ m⁻² yr⁻¹</b>, the primary consumers incorporate <b>1 080 kJ m⁻² yr⁻¹</b> into their biomass. Calculate the <b>percentage efficiency</b> of energy transfer.',
      unit:'%', answer:9, tol:0.2, hint:'(1080 ÷ 12000) × 100.' },
    { type:'mcq', h2:'Where does the energy go?',
      q:'Why is the energy transfer from primary consumers to secondary consumers usually only about 10 %?',
      why:'Most energy never makes it into the next level: parts of the prey are not eaten, indigestible material is egested, nitrogenous waste is excreted, and — the biggest loss in a mammal or bird — a great deal of energy is released as heat during respiration.',
      opts:[['Energy is destroyed at each trophic level',0],['Much is lost as heat in respiration, and in egestion and excretion',1],['Consumers only absorb 10 % of the food they eat because of their gut length',0],['The second law of thermodynamics fixes the figure at exactly 10 %',0]] },
    { type:'teach', tag:'Climate change · 5.12–5.15', h2:'Evidence, causes and effects',
      html:`      <p><b>Evidence for past climates:</b></p>
      <ul>
        <li><b>Ice cores</b> — trapped air bubbles give a direct record of past atmospheric CO₂; oxygen isotope ratios in the ice indicate past temperature.</li>
        <li><b>Dendrochronology</b> — tree ring width reflects growing conditions each year.</li>
        <li><b>Pollen in peat bogs</b> — the species present indicate the climate of the time.</li>
      </ul>
      <p><b>Anthropogenic causes:</b> combustion of fossil fuels and deforestation raise atmospheric <b>CO₂</b>; agriculture (cattle, rice paddies) and landfill raise <b>methane</b>. These are <b>greenhouse gases</b> — they absorb outgoing long-wave infrared radiation and re-emit it, warming the lower atmosphere.</p>
      <p><b>Effects (5.15):</b> changing rainfall and temperature alter <b>species distribution</b> (organisms shift polewards and to higher altitudes) and <b>life-cycle timing</b> — and if a plant flowers before its pollinator emerges, the mismatch harms both.</p>
      <p class="note"><b>Models and their limits (5.14):</b> predictions come from computer models that <b>extrapolate</b> beyond the data. Extrapolation is uncertain: models must simplify feedbacks (clouds, ocean circulation, permafrost methane) and cannot know future human emissions — so a <b>range</b> of scenarios is given, not a single number.</p>`},
    { type:'teach', tag:'Enzymes &amp; temperature · 5.16', h2:'Why temperature matters so much',
      html:`      <p>As temperature rises, molecules have more <b>kinetic energy</b>, so enzyme and substrate collide more often and with more energy: more <b>enzyme–substrate complexes</b> form per second, and the rate rises. Beyond the <b>optimum</b>, the extra vibration <b>breaks the hydrogen and ionic bonds</b> holding the tertiary structure. The <b>active site changes shape</b>, the substrate no longer fits, and the enzyme is <b>denatured</b> — the rate falls sharply and does not recover on cooling.</p>
      <div class="eqn">Q₁₀ = rate at (T + 10 °C) ÷ rate at T °C<small>for many enzyme reactions Q₁₀ ≈ 2 below the optimum: a 10 °C rise roughly doubles the rate</small></div>
      <p class="note">This is why climate change is a <b>biological</b> problem, not just a physical one: a few degrees changes metabolic rate, development rate, and therefore the distribution of every ectotherm on the planet.</p>`},
    { type:'teach', tag:'Evolution &amp; speciation · 5.17–5.19', h2:'Speciation',
      html:`      <p>Evolution is a <b>change in allele frequency</b> in a population over time, driven by natural selection acting on genetic variation created by <b>mutation</b>.</p>
      <p><b>Speciation</b> requires a barrier to <b>gene flow</b>:</p>
      <ul>
        <li><b>Allopatric</b> — a <b>geographical</b> barrier (a river, a mountain range, an ocean) separates two populations. Different selection pressures, mutations and genetic drift make their allele frequencies diverge until, even if reunited, they can no longer interbreed to produce fertile offspring.</li>
        <li><b>Sympatric</b> — reproductive isolation arises <b>without</b> geographical separation, e.g. by a change in flowering time (temporal isolation), a behavioural change in courtship, or polyploidy in plants.</li>
      </ul>
      <p class="note"><b>How science works (5.18, 5.20):</b> conclusions about controversial issues such as climate change are trusted because of <b>peer review</b>, publication in scientific journals, presentation at conferences, and independent <b>replication</b> — not because of a single dramatic paper.</p>`},
    { type:'match', h2:'Match the ecological term', prompt:'Tap a description on the left, then the correct term.',
      headL:'Description', headR:'Term',
      pairs:[
        {l:'Speciation caused by a geographical barrier splitting a population', r:'Allopatric speciation'},
        {l:'Speciation within the same area, e.g. by polyploidy', r:'Sympatric speciation'},
        {l:'The stable community at the end of a succession', r:'Climax community'},
        {l:'A succession halted by human activity such as grazing', r:'Plagioclimax'}] },
    { type:'mcq', h2:'Reducing atmospheric CO₂',
      q:'Which of these best explains how reforestation reduces atmospheric carbon dioxide?',
      why:'Growing trees photosynthesise, fixing CO2 into organic compounds. Because they build long-lived biomass (wood), the carbon is locked away for decades or centuries — the forest acts as a carbon sink. This only works while the biomass is accumulating and is reversed if the wood is burnt or decomposed.',
      opts:[['Trees absorb CO₂ through their roots and store it in the soil as carbonate',0],['Photosynthesis fixes CO₂ into long-lived biomass, so growing forest acts as a carbon sink',1],['Trees convert CO₂ directly into oxygen without any carbon being stored',0],['Trees stop respiring once they are mature, so no CO₂ is released',0]] }
  ]
},

/* ============================ TOPIC 6 — FORENSICS ============================ */
{
  key: 'biology-a-level-edexcel', slug: 'immunity-infection-forensics',
  title: 'Immunity, Infection &amp; Forensics', emoji: '🕵️',
  spec: SPEC + ' · Topic 6: Immunity, Infection and Forensics',
  desc: 'A-level Salters-Nuffield Biology mini-lesson on Topic 6 Immunity, Infection and Forensics: determining time of death from body temperature, rigor mortis, decomposition and forensic entomology; decomposers and the carbon cycle; DNA profiling using PCR and gel electrophoresis; bacteria versus viruses; TB and HIV; non-specific and specific immune responses; B and T cells; post-transcriptional mRNA processing; types of immunity; the evolutionary race; bacteriostatic and bactericidal antibiotics; and hospital-acquired infections.',
  overview3: ['forensics', 'infection', 'immunity'],
  intro: 'SNAB Topic 6 begins in the <b>mortuary</b>. You will learn how forensic scientists estimate the <b>time of death</b> — from body temperature, <b>rigor mortis</b>, <b>decomposition</b> and the <b>succession of insects</b> — and how <b>DNA profiling</b> using <b>PCR</b> and <b>gel electrophoresis</b> establishes identity. Then you meet the <b>pathogens</b> (TB and HIV), the <b>immune system</b> that fights them, and the <b>antibiotic resistance</b> arms race.',
  sortDone: 'Bacteria are cells with 70S ribosomes and a murein wall; viruses are non-cellular particles with a capsid.',
  matchDone: 'Time-of-death evidence: body temperature works over hours; insect succession works over weeks.',
  recap: [
    '<b>Time of death:</b> body temperature (cooling ≈ 1.5 °C per hour at first), <b>rigor mortis</b> (onset ~3–4 h, complete ~12 h, passes off ~36 h), the <b>extent of decomposition</b>, the <b>stage of succession</b> of decomposers, and <b>forensic entomology</b>.',
    '<b>Rigor mortis:</b> no aerobic respiration → no ATP → myosin heads cannot detach from actin → muscles lock. It passes off as enzymes from lysosomes break down the muscle.',
    '<b>Decomposition:</b> saprobiotic bacteria and fungi secrete extracellular enzymes and digest organic matter, releasing CO₂ — this recycles <b>carbon</b>.',
    '<b>PCR:</b> denature 95 °C → anneal primers 50–65 °C → extend with <b>Taq polymerase</b> 72 °C. Each cycle <b>doubles</b> the DNA: n cycles gives 2ⁿ copies.',
    '<b>Gel electrophoresis:</b> DNA is negatively charged, so it moves to the <b>anode (+)</b>; <b>short fragments travel furthest</b>. Profiles compare the number of repeats in VNTR/STR regions.',
    '<b>Bacteria vs viruses:</b> bacteria are prokaryotic cells (murein wall, 70S ribosomes, they reproduce alone); viruses are non-cellular — nucleic acid in a protein capsid — and can only replicate inside a host cell.',
    '<b>TB</b> infects macrophages and is walled off in tubercles; <b>HIV</b> is a retrovirus that uses <b>reverse transcriptase</b> and destroys <b>T helper cells</b>, causing AIDS.',
    '<b>Immunity:</b> non-specific (skin, stomach acid, lysozyme, inflammation, interferon, phagocytosis) then specific (T helper, T killer, T memory; B effector/plasma, B memory). <b>Bacteriostatic</b> antibiotics inhibit growth; <b>bactericidal</b> ones kill.'
  ],
  recapTail: 'You have covered the whole of SNAB Topic 6 — forensics included. Press <b>Finish</b> to see your score.',
  screens: [
    { type:'teach', tag:'Forensics · 6.1', h2:'Determining the time of death',
      html:`      <p>No single method is reliable on its own, so a forensic pathologist combines several:</p>
      <ul>
        <li><b>Body temperature (algor mortis)</b> — after death, metabolism stops and the body cools towards the ambient temperature. The initial rate is roughly <b>1.5 °C per hour</b>, but cooling follows a sigmoid curve and is affected by body mass, clothing, air movement and the surroundings — so it is only useful for roughly the first <b>24 hours</b>.</li>
        <li><b>Rigor mortis</b> — muscles stiffen from about <b>3–4 hours</b> after death, are fully rigid by about <b>12 hours</b>, and the rigidity passes off by around <b>36 hours</b>.</li>
        <li><b>Extent of decomposition</b> — autolysis, then putrefaction by gut bacteria; the abdomen greens and swells with gas, then the tissues liquefy.</li>
        <li><b>Stage of succession</b> — the community of decomposers on and around a corpse changes in a predictable sequence.</li>
        <li><b>Forensic entomology</b> — the species and life stage of the insects present.</li>
      </ul>
      <p class="note"><b>The biology of rigor mortis:</b> respiration stops, so no <b>ATP</b> is made. Without ATP, <b>myosin heads cannot detach from actin</b>, so the cross-bridges lock and the muscle cannot relax. Meanwhile lysosomes rupture and their enzymes begin to digest the muscle proteins — which is why rigor eventually <b>passes off</b>.</p>`},
    { type:'num', h2:'Your turn — time of death from body temperature', q:'A body is found with a core temperature of <b>32.5 °C</b>. Normal core temperature was <b>37.0 °C</b>. Assuming an initial cooling rate of <b>1.5 °C per hour</b>, estimate how many <b>hours</b> ago the person died.',
      unit:'hours', answer:3, tol:0.15, hint:'Temperature drop = 37.0 − 32.5 = 4.5 °C. Time = 4.5 ÷ 1.5.' },
    { type:'teach', tag:'Forensics · 6.1–6.2', h2:'Forensic entomology and decomposition',
      html:`      <p>A corpse is a habitat, and it undergoes its own <b>succession</b>. <b>Blowflies</b> (<i>Calliphora</i>) arrive within minutes to hours and lay eggs in the natural orifices and wounds. Eggs hatch into <b>1st, 2nd and 3rd instar larvae (maggots)</b>, which pupate and emerge as adults. Later, beetles and moths arrive to feed on the drier remains.</p>
      <p>Because insects are <b>ectotherms</b>, their development rate depends on <b>temperature</b>. Forensic entomologists therefore use <b>accumulated degree days (ADD)</b> — a species needs a fixed number of degree-days above a <b>base temperature</b> to reach each stage:</p>
      <div class="eqn">ADD = (mean temperature − base temperature) × number of days<small>rearranged: days = ADD required ÷ (mean temp − base temp)</small></div>
      <p><b>Decomposition and the carbon cycle (6.2):</b> <b>saprobiotic</b> (saprotrophic) bacteria and fungi secrete <b>extracellular enzymes</b> onto dead organic matter, digesting it and absorbing the soluble products. They <b>respire</b>, returning <b>CO₂</b> to the atmosphere — without decomposers, carbon and nitrogen would remain locked in dead bodies.</p>`},
    { type:'num', h2:'Your turn — forensic entomology', q:'A blowfly species needs <b>100 accumulated degree-days</b> above a base temperature of <b>10 °C</b> to reach pupation. The mean ambient temperature was <b>20 °C</b>. Calculate the minimum number of <b>days</b> since the eggs were laid.',
      unit:'days', answer:10, tol:0.2, hint:'Degree-days per day = 20 − 10 = 10. Days = 100 ÷ 10.' },
    { type:'mcq', h2:'Which method, and when?',
      q:'A body is found in woodland. It is heavily decomposed and third-instar blowfly larvae are present. Which is the most reliable way to estimate the time of death?',
      why:'Body temperature is only useful for roughly the first 24 hours, and rigor mortis has long passed off by this stage. Once a corpse is heavily decomposed, the life stage of the insects present — interpreted using accumulated degree-days and the local temperature record — is the most reliable estimate.',
      opts:[['Core body temperature, using the 1.5 °C per hour rule',0],['The degree of rigor mortis',0],['Forensic entomology — the insect life stage, corrected for temperature',1],['The colour of the skin alone',0]] },
    { type:'teach', tag:'Forensics · 6.3–6.4', h2:'DNA profiling and PCR',
      html:`      <p>Only about 2 % of human DNA codes for protein. The rest contains <b>short tandem repeats (STRs / VNTRs)</b> — short sequences repeated over and over. <b>The number of repeats at each locus varies enormously between individuals</b> (though half are shared with each parent). Comparing the repeat numbers at ~10–16 loci gives a profile that is, in practice, unique to an individual apart from identical twins.</p>
      <p><b>The polymerase chain reaction (PCR)</b> amplifies the tiny amounts of DNA found at a crime scene. Each cycle has three steps:</p>
      <ul>
        <li><b>Denature — 95 °C:</b> the hydrogen bonds break and the two strands separate.</li>
        <li><b>Anneal — 50–65 °C:</b> short <b>primers</b> bind to the ends of the target sequence.</li>
        <li><b>Extend — 72 °C:</b> <b>Taq polymerase</b> — a thermostable enzyme from a hot-spring bacterium, so it is <b>not denatured</b> at 95 °C — builds the complementary strand from free nucleotides.</li>
      </ul>
      <div class="eqn">copies after n cycles = 2ⁿ<small>each cycle DOUBLES the number of DNA molecules — this is exponential amplification</small></div>`},
    { type:'num', h2:'Your turn — PCR amplification', q:'A single DNA molecule is put through <b>10 cycles</b> of PCR. Assuming perfect efficiency, calculate the number of DNA molecules produced.',
      unit:'molecules', answer:1024, tol:1, hint:'Each cycle doubles the DNA: 2¹⁰.' },
    { type:'teach', tag:'Forensics · Core practical 14', h2:'Gel electrophoresis',
      html:`      <p>The amplified DNA is cut by <b>restriction enzymes</b> and separated by <b>gel electrophoresis</b>:</p>
      <ul>
        <li>DNA samples are loaded into wells at one end of an <b>agarose gel</b>, and a voltage is applied.</li>
        <li>DNA has a <b>negatively charged</b> phosphate backbone, so every fragment moves towards the <b>anode (positive electrode)</b>.</li>
        <li>The gel is a molecular sieve: <b>short fragments move furthest</b>, long fragments are held back. Fragments are therefore separated <b>by length</b>.</li>
        <li>The DNA is transferred to a membrane, and a radioactive or fluorescent <b>DNA probe</b> complementary to the repeat sequence binds to it, revealing the bands.</li>
      </ul>
      <p class="note"><b>Interpreting a profile:</b> a suspect matches only if <b>every band</b> lines up with the crime-scene sample. A child&rsquo;s bands must each be present in one parent or the other — that is how paternity and relatedness are established, and how the technique is used for plants and animals too.</p>`},
    { type:'mcq', h2:'Reading the gel',
      q:'On a gel, one DNA fragment has travelled much further from the well than another. What can you conclude?',
      why:'All DNA is negatively charged, so all fragments move to the anode. The gel matrix impedes long molecules more than short ones, so the distance travelled depends on LENGTH: the fragment that has travelled furthest is the shorter one.',
      opts:[['It is longer, so it carries more negative charge',0],['It is shorter, so it moves more easily through the gel matrix',1],['It is positively charged',0],['It contains more repeat sequences',0]] },
    { type:'teach', tag:'Infection · 6.5–6.6', h2:'Bacteria, viruses, TB and HIV',
      html:`      <p><b>Bacterium:</b> a living prokaryotic <b>cell</b> — cell wall of <b>murein (peptidoglycan)</b>, cell-surface membrane, cytoplasm, <b>70S ribosomes</b>, circular DNA, often plasmids. It reproduces independently by binary fission. Antibiotics can target it.</p>
      <p><b>Virus:</b> <b>non-cellular</b> — nucleic acid (DNA or RNA) inside a protein <b>capsid</b>, sometimes with a lipid envelope. No cytoplasm, no ribosomes, no metabolism. It can only replicate <b>inside a host cell</b> by taking over the host&rsquo;s machinery. Antibiotics do not work on viruses.</p>
      <p><b>TB (<i>Mycobacterium tuberculosis</i>):</b> inhaled in droplets; engulfed by <b>macrophages</b> but survives inside them because its waxy wall resists digestion. The immune system walls the bacteria into <b>tubercles</b> (granulomas), and the infection may stay <b>latent</b> for years. If immunity falls, the bacteria break out, destroying lung tissue — causing a persistent cough, blood in the sputum, fever and weight loss.</p>
      <p><b>HIV:</b> a <b>retrovirus</b>. Its gp120 attachment protein binds <b>CD4</b> receptors on <b>T helper cells</b>. <b>Reverse transcriptase</b> makes DNA from the viral RNA; <b>integrase</b> inserts it into the host genome, where it may lie latent. When active, new viruses bud off and <b>destroy the T helper cell</b>. As T helper numbers collapse, the specific immune response fails and the person develops <b>AIDS</b>: they die of opportunistic infections (such as TB), not of HIV directly.</p>`},
    { type:'sort', h2:'Bacterium or virus?', prompt:'Tap a feature, then tap where it belongs.',
      bins:['🦠 Bacterium only','🧪 Virus only','🔁 Both'],
      data:[['Cell wall made of murein (peptidoglycan)','a'],['70S ribosomes and cytoplasm','a'],['Reproduces by binary fission on its own','a'],['Protein capsid, no cytoplasm','b'],['Can only replicate inside a host cell','b'],['Reverse transcriptase (in retroviruses)','b'],['Contains nucleic acid','c'],['Can cause disease in humans','c']] },
    { type:'teach', tag:'Immunity · 6.7, 6.11', h2:'Barriers and the non-specific response',
      html:`      <p><b>Routes of entry (6.11):</b> the respiratory tract (inhalation), the digestive system (contaminated food and water), broken skin, the reproductive tract, and via a vector.</p>
      <p><b>Barriers:</b> intact <b>skin</b> (a physical barrier plus a dry, slightly acidic surface); <b>stomach acid</b> at about pH 2, which denatures the enzymes of most swallowed pathogens; <b>mucus and cilia</b> in the airways; and the <b>gut and skin flora</b> — harmless bacteria that <b>out-compete</b> pathogens for space and nutrients.</p>
      <p><b>Non-specific responses (6.7):</b></p>
      <ul>
        <li><b>Inflammation</b> — mast cells release <b>histamine</b>: vasodilation and increased capillary permeability bring more blood, plasma and white cells to the site (redness, heat, swelling).</li>
        <li><b>Lysozyme</b> — an enzyme in tears, saliva and mucus that <b>hydrolyses the murein</b> in bacterial cell walls, bursting them.</li>
        <li><b>Interferon</b> — released by virus-infected cells; it inhibits viral protein synthesis in neighbouring cells and activates the immune response.</li>
        <li><b>Phagocytosis</b> — a phagocyte is attracted by chemicals from the pathogen, engulfs it into a <b>phagosome</b>, which fuses with a <b>lysosome</b>. <b>Hydrolytic enzymes digest the pathogen</b>, and the phagocyte then displays the antigens on its surface, becoming an <b>antigen-presenting cell</b>.</li>
      </ul>`},
    { type:'teach', tag:'Immunity · 6.8–6.9', h2:'The specific immune response',
      html:`      <p>An <b>antigen</b> is a molecule (usually a protein or glycoprotein on a pathogen&rsquo;s surface) that triggers an immune response. An <b>antibody</b> is a Y-shaped <b>immunoglobulin</b> with two <b>variable regions</b> whose shape is <b>complementary to one specific antigen</b>, plus a constant region.</p>
      <p><b>Cell-mediated response (T cells):</b> an antigen-presenting cell displays the antigen. The <b>T helper cell</b> with the complementary receptor binds and is activated; it divides by mitosis and releases <b>cytokines</b> that stimulate phagocytes, <b>T killer cells</b> and B cells. <b>T killer cells</b> destroy infected body cells by releasing <b>perforin</b>. <b>T memory cells</b> remain.</p>
      <p><b>Humoral response (B cells):</b> the B cell with the complementary antibody binds the antigen and, stimulated by T helper cytokines, undergoes <b>clonal selection and expansion</b>. It differentiates into:</p>
      <ul>
        <li><b>B effector / plasma cells</b> — secrete thousands of antibodies per second; they agglutinate pathogens and mark them for phagocytosis. Short-lived.</li>
        <li><b>B memory cells</b> — long-lived. On <b>re-infection</b> the secondary response is <b>faster, stronger and longer-lasting</b>, so you show no symptoms. That is <b>immunity</b>.</li>
      </ul>`},
    { type:'match', h2:'Match the immune cell to its job', prompt:'Tap a job on the left, then the cell that does it.',
      headL:'Job', headR:'Cell',
      pairs:[
        {l:'Secretes large quantities of a specific antibody', r:'B effector (plasma) cell'},
        {l:'Releases cytokines that activate B cells and phagocytes', r:'T helper cell'},
        {l:'Destroys virus-infected body cells using perforin', r:'T killer cell'},
        {l:'Engulfs and digests a pathogen, then presents its antigens', r:'Phagocyte / macrophage'}] },
    { type:'teach', tag:'Immunity · 6.10, 6.12–6.13', h2:'Types of immunity, splicing and the evolutionary race',
      html:`      <p><b>Four types of immunity (6.12):</b></p>
      <ul>
        <li><b>Natural active</b> — you catch the disease and make your own antibodies and memory cells. Long-lasting.</li>
        <li><b>Artificial active</b> — <b>vaccination</b> with a dead, attenuated or subunit antigen: you make your own memory cells without the illness. Long-lasting. <b>Herd immunity</b> then protects the unvaccinated.</li>
        <li><b>Natural passive</b> — antibodies received across the placenta or in breast milk. Immediate, but short-lived (no memory cells).</li>
        <li><b>Artificial passive</b> — an injection of ready-made antibodies (e.g. antivenom, tetanus). Immediate but short-lived.</li>
      </ul>
      <p><b>One gene, many proteins (6.10):</b> a eukaryotic gene contains coding <b>exons</b> and non-coding <b>introns</b>. The primary mRNA transcript is edited in the nucleus: the introns are <b>spliced out</b>. Because exons can be joined in <b>different combinations</b> (alternative splicing), one gene can give rise to <b>several different polypeptides</b>.</p>
      <p class="note"><b>The evolutionary race (6.13):</b> pathogens evolve <b>evasion mechanisms</b> — HIV changes its surface antigens with each replication (antigenic variation), TB hides <i>inside</i> macrophages, and some bacteria have capsules that resist phagocytosis. Hosts respond with new defences. Neither side ever wins for long.</p>`},
    { type:'teach', tag:'Antibiotics · 6.14–6.15', h2:'Antibiotics, resistance and hospital infections',
      html:`      <p><b>Bacteriostatic</b> antibiotics <b>inhibit growth and reproduction</b> (e.g. by blocking protein synthesis at the 70S ribosome), leaving the immune system to finish the job. <b>Bactericidal</b> antibiotics <b>kill</b> the bacteria outright (e.g. penicillin, which inhibits the enzyme that cross-links murein, so the wall cannot be built and the cell bursts by osmosis).</p>
      <p><b>Resistance evolves by natural selection:</b> a chance <b>mutation</b> gives one bacterium resistance (e.g. it makes β-lactamase, which hydrolyses penicillin). The antibiotic is the <b>selection pressure</b>: susceptible bacteria die, the resistant one survives, reproduces and passes the allele on — including <b>horizontally, by plasmid transfer (conjugation)</b>, even to other species.</p>
      <p class="note"><b>Hospital-acquired infections (6.15):</b> hospitals concentrate vulnerable patients, invasive procedures and heavy antibiotic use, which selects strongly for resistant strains such as MRSA and <i>C. difficile</i>. The codes of practice follow directly: <b>hand hygiene</b>, isolation of infected patients, thorough cleaning, and <b>antibiotic stewardship</b> — narrow-spectrum drugs only where needed, complete the full course, and never prescribe antibiotics for viral infections.</p>`},
    { type:'num', h2:'Your turn — zone of inhibition', q:'In Core practical 15, an antibiotic disc produces a clear circular zone of inhibition of radius <b>7.0 mm</b>. Calculate its area, using A = πr² and π = 3.14. Give your answer to <b>1 decimal place</b>.',
      unit:'mm²', answer:153.9, tol:1.0, hint:'A = 3.14 × 7.0² = 3.14 × 49.' },
    { type:'mcq', h2:'Why does antibiotic resistance spread so fast?',
      q:'Which mechanism best explains how a resistance allele can spread between different species of bacteria?',
      why:'Resistance genes are often carried on plasmids, which can be transferred directly between bacteria — including between species — by conjugation. That HORIZONTAL transfer is why resistance spreads far faster than ordinary vertical inheritance would allow.',
      opts:[['Bacteria deliberately mutate in response to the antibiotic',0],['Plasmids carrying the resistance gene are transferred horizontally by conjugation',1],['Antibiotics cause bacteria to become immune during their lifetime',0],['Resistant bacteria are produced by meiosis',0]] }
  ]
},

/* ============================ TOPIC 7 ============================ */
{
  key: 'biology-a-level-edexcel', slug: 'run-for-your-life',
  title: 'Run for Your Life', emoji: '🏃',
  spec: SPEC + ' · Topic 7: Run for your Life',
  desc: 'A-level Salters-Nuffield Biology mini-lesson on Topic 7 Run for your Life: joints and antagonistic muscles, the sliding filament theory, glycolysis, the link reaction, the Krebs cycle, oxidative phosphorylation and chemiosmosis, anaerobic respiration and lactate, myogenic cardiac muscle and the ECG, cardiac output, the control of heart and ventilation rate, fast and slow twitch fibres, negative feedback, thermoregulation, and the ethics of performance-enhancing drugs.',
  overview3: ['muscle', 'respiration', 'homeostasis'],
  intro: 'SNAB Topic 7 is the biology of <b>exercise</b>: how muscle contracts by the <b>sliding filament</b> mechanism, how <b>respiration</b> supplies the ATP, how the heart and lungs are <b>controlled</b>, and how <b>negative feedback</b> holds the body in dynamic equilibrium.',
  sortDone: 'Glycolysis is in the cytoplasm; the link reaction and Krebs cycle are in the matrix; the ETC is on the cristae.',
  matchDone: 'Slow twitch fibres are aerobic and fatigue-resistant; fast twitch fibres are anaerobic and powerful.',
  recap: [
    '<b>Sliding filament:</b> Ca²⁺ moves tropomyosin off the actin binding sites → myosin head binds → power stroke → ATP binds and detaches the head → ATP hydrolysis recocks it. Actin and myosin <b>slide past</b> each other; they do not shorten.',
    '<b>Glycolysis</b> (cytoplasm): glucose → 2 pyruvate; <b>net 2 ATP</b> and 2 reduced NAD. Anaerobic and aerobic.',
    '<b>Link reaction</b> (matrix): pyruvate → acetyl CoA + CO₂ + reduced NAD.',
    '<b>Krebs cycle</b> (matrix): per turn — 2 CO₂, 3 reduced NAD, 1 reduced FAD, 1 ATP.',
    '<b>Oxidative phosphorylation</b> (inner membrane/cristae): electrons from reduced NAD/FAD pass down the ETC; protons are pumped into the intermembrane space; <b>chemiosmosis</b> through ATP synthase makes ATP. <b>Oxygen is the final electron acceptor</b>, forming water.',
    '<b>Anaerobic:</b> pyruvate + reduced NAD → lactate, which <b>regenerates NAD</b> so glycolysis can continue. Lactate is later oxidised or converted to glycogen in the liver — the oxygen debt.',
    '<b>Cardiac output = stroke volume × heart rate.</b> The heart is <b>myogenic</b>: SAN → AVN (delay) → bundle of His → Purkyne fibres.',
    '<b>Homeostasis:</b> negative feedback returns a factor to its set point; the hypothalamus controls thermoregulation (vasodilation/vasoconstriction, sweating, shivering).'
  ],
  recapTail: 'You have covered the whole of SNAB Topic 7. Press <b>Finish</b> to see your score.',
  screens: [
    { type:'teach', tag:'Movement · 7.1', h2:'Joints, tendons and antagonistic pairs',
      html:`      <p>A <b>synovial joint</b> (e.g. the elbow) has <b>cartilage</b> covering the bone ends to reduce friction and absorb shock, <b>synovial fluid</b> as a lubricant, a <b>synovial membrane</b> that secretes it, and a fibrous capsule.</p>
      <ul>
        <li><b>Ligaments</b> join <b>bone to bone</b>. They are slightly elastic, so they stabilise the joint but allow movement.</li>
        <li><b>Tendons</b> join <b>muscle to bone</b>. They are <b>inelastic</b> — so all of the muscle&rsquo;s contraction is transmitted to the bone rather than being wasted stretching the tendon.</li>
      </ul>
      <p>Muscles can only <b>pull</b>, never push, so they work in <b>antagonistic pairs</b>. At the elbow the <b>biceps</b> is the <b>flexor</b> (it contracts to bend the arm) and the <b>triceps</b> is the <b>extensor</b> (it contracts to straighten it). While one contracts, the other relaxes.</p>`},
    { type:'teach', tag:'Muscle · 7.2, 7.10', h2:'The sliding filament theory',
      html:`      <p>A myofibril is made of repeating <b>sarcomeres</b> — thin <b>actin</b> filaments and thick <b>myosin</b> filaments. In contraction the filaments <b>slide past one another</b>: the sarcomere and the <b>I band</b> and <b>H zone</b> shorten, while the <b>A band</b> (the length of the myosin) stays the <b>same</b>. The filaments themselves do <b>not</b> shorten.</p>
      <ol style="margin:0 0 14px 2px;padding-left:22px">
        <li>An action potential travels down the <b>T-tubules</b>, so the <b>sarcoplasmic reticulum releases Ca²⁺</b>.</li>
        <li>Ca²⁺ binds to <b>troponin</b>, which changes shape and pulls <b>tropomyosin</b> off the actin, <b>exposing the myosin-binding sites</b>.</li>
        <li>The myosin head binds actin: an <b>actin–myosin cross-bridge</b>.</li>
        <li><b>Power stroke</b> — the head flexes, pulling the actin past the myosin; ADP + Pi are released.</li>
        <li><b>ATP binds</b> to the myosin head, which <b>detaches</b> from actin. <b>ATPase</b> on the head hydrolyses that ATP, and the energy released <b>re-cocks</b> the head, ready to bind again further along.</li>
      </ol>
      <p class="note"><b>Two jobs for ATP:</b> detaching the head, and re-cocking it. Also, ATP is needed for the active transport of Ca²⁺ back into the sarcoplasmic reticulum so the muscle can <b>relax</b> — which is exactly why <b>rigor mortis</b> occurs when ATP runs out.</p>`},
    { type:'mcq', h2:'What does calcium actually do?',
      q:'What is the specific role of Ca²⁺ ions in muscle contraction?',
      why:'Ca2+ binds to TROPONIN, changing its shape. Troponin then moves TROPOMYOSIN away from the actin, exposing the myosin-binding sites so cross-bridges can form. Calcium does not bind myosin, and it does not provide energy.',
      opts:[['It provides the energy for the power stroke',0],['It binds troponin, which moves tropomyosin off the actin binding sites',1],['It binds directly to the myosin head and cocks it',0],['It hydrolyses ATP on the myosin head',0]] },
    { type:'teach', tag:'Respiration · 7.3–7.4', h2:'Glycolysis',
      html:`      <p>Respiration is a <b>many-stepped</b> pathway, each step catalysed by a specific <b>intracellular enzyme</b>. Overall it splits the respiratory substrate, releasing CO₂ as waste, and reunites the hydrogen with atmospheric oxygen, releasing a great deal of energy.</p>
      <p><b>Glycolysis (in the cytoplasm — and it is the same in aerobic and anaerobic respiration):</b></p>
      <ul>
        <li><b>Phosphorylation:</b> glucose (6C) is phosphorylated using <b>2 ATP</b>, making it more reactive; it splits into <b>two triose phosphate (3C)</b> molecules.</li>
        <li><b>Oxidation:</b> each triose phosphate is oxidised to <b>pyruvate (3C)</b>. <b>2 reduced NAD</b> are made, and <b>4 ATP</b> are made by <b>substrate-level phosphorylation</b>.</li>
      </ul>
      <div class="eqn">glucose → 2 pyruvate + net 2 ATP + 2 reduced NAD<small>4 ATP produced − 2 ATP invested = NET 2 ATP</small></div>`},
    { type:'num', h2:'Your turn — net ATP from glycolysis', q:'Glycolysis uses <b>2 ATP</b> in the phosphorylation stage and produces <b>4 ATP</b> by substrate-level phosphorylation. Calculate the <b>net ATP yield</b> of glycolysis per glucose molecule.',
      unit:'ATP', answer:2, tol:0.1, hint:'4 produced − 2 used.' },
    { type:'teach', tag:'Respiration · 7.5', h2:'The link reaction and the Krebs cycle',
      html:`      <p>If oxygen is available, pyruvate is actively transported into the <b>mitochondrial matrix</b>.</p>
      <p><b>Link reaction</b> (per pyruvate): pyruvate is <b>decarboxylated</b> (losing CO₂) and <b>dehydrogenated</b> (reducing NAD), and the 2C acetyl group joins coenzyme A to form <b>acetyl coenzyme A</b>. This happens <b>twice</b> per glucose.</p>
      <p><b>Krebs cycle</b> (per turn): acetyl CoA (2C) combines with <b>oxaloacetate (4C)</b> to form <b>citrate (6C)</b>. A series of decarboxylation and dehydrogenation reactions regenerates oxaloacetate, yielding:</p>
      <div class="eqn">per turn: 2 CO₂ · 3 reduced NAD · 1 reduced FAD · 1 ATP<small>the cycle turns TWICE per glucose molecule</small></div>
      <p class="note"><b>Why in the mitochondrion?</b> The matrix holds the enzymes of the link reaction and Krebs cycle, and the inner membrane holds the electron transport chain — so the reduced coenzymes are made right next to where their electrons are needed. Glycolysis needs none of that machinery, so it stays in the cytoplasm.</p>`},
    { type:'teach', tag:'Respiration · 7.6–7.7', h2:'Oxidative phosphorylation, chemiosmosis and lactate',
      html:`      <p>On the <b>inner mitochondrial membrane (the cristae)</b>:</p>
      <ul>
        <li>Reduced NAD and reduced FAD are <b>oxidised</b>, releasing hydrogen atoms which split into <b>protons and electrons</b>.</li>
        <li>The electrons pass along the <b>electron transport chain</b> of carriers, losing energy at each step.</li>
        <li>That energy is used to <b>pump protons</b> from the matrix into the <b>intermembrane space</b>, creating an <b>electrochemical gradient</b>.</li>
        <li><span class="hl c">Chemiosmosis:</span> protons diffuse back into the matrix through <b>ATP synthase</b>, and the energy released drives the phosphorylation of ADP to <b>ATP</b>.</li>
        <li><b>Oxygen is the final electron acceptor</b>: it combines with the electrons and protons to form <b>water</b>. Without it the whole chain backs up, no NAD is regenerated, and the Krebs cycle stops.</li>
      </ul>
      <p><b>Anaerobic respiration (7.7):</b> pyruvate accepts hydrogen from reduced NAD and is converted to <b>lactate</b> by lactate dehydrogenase. The <b>point</b> of this is to <b>regenerate NAD</b> so that glycolysis — and its small ATP yield — can keep going. Lactate lowers the pH and is toxic, causing fatigue. Afterwards, extra oxygen (the <b>oxygen debt / EPOC</b>) is used to oxidise some lactate back to pyruvate, while the liver converts the rest to <b>glucose and glycogen</b>.</p>`},
    { type:'sort', h2:'Where does it happen?', prompt:'Tap a stage, then tap where in the cell it occurs.',
      bins:['🧫 Cytoplasm','🔥 Mitochondrial matrix','⚡ Inner membrane (cristae)'],
      data:[['Glycolysis','a'],['Conversion of pyruvate to lactate','a'],['The link reaction','b'],['The Krebs cycle','b'],['Electron transport chain','c'],['Chemiosmosis through ATP synthase','c'],['Oxygen accepts electrons to form water','c']] },
    { type:'teach', tag:'The heart · 7.8', h2:'Myogenic muscle, the conduction system and the ECG',
      html:`      <p>Cardiac muscle is <b>myogenic</b> — it contracts of its own accord, without any nervous stimulation. The rhythm is set by the <b>sinoatrial node (SAN)</b>, the pacemaker, in the wall of the right atrium.</p>
      <ul>
        <li>The SAN fires; the wave of depolarisation spreads across <b>both atria</b>, which contract (<b>atrial systole</b>).</li>
        <li>A band of non-conducting tissue stops the wave reaching the ventricles directly. It reaches the <b>atrioventricular node (AVN)</b>, which imposes a short <b>delay</b> — so the atria finish emptying before the ventricles contract.</li>
        <li>The AVN passes the impulse down the <b>bundle of His</b> through the septum to the apex, then up the <b>Purkyne fibres</b>. The ventricles therefore contract <b>from the bottom upwards</b>, squeezing blood up into the arteries.</li>
      </ul>
      <p><b>The ECG:</b> the <b>P wave</b> = atrial depolarisation; the <b>QRS complex</b> = ventricular depolarisation; the <b>T wave</b> = ventricular repolarisation. <b>Tachycardia</b> = a resting rate above 100 bpm; <b>bradycardia</b> = below 60 bpm; <b>fibrillation</b> = a chaotic trace with no coordinated contraction; <b>ectopic beats</b> = extra beats.</p>`},
    { type:'num', h2:'Your turn — cardiac output', q:'An athlete has a stroke volume of <b>75 cm³</b> and a heart rate of <b>72 bpm</b>. Calculate their <b>cardiac output</b> in cm³ per minute.',
      unit:'cm³ min⁻¹', answer:5400, tol:5, hint:'cardiac output = stroke volume × heart rate = 75 × 72.' },
    { type:'teach', tag:'Control · 7.9', h2:'Controlling heart rate and ventilation',
      html:`      <p>Both are controlled by the <b>medulla oblongata</b>.</p>
      <p><b>Cardiovascular control centre:</b> during exercise, <b>chemoreceptors</b> in the aorta and carotid bodies detect a <b>fall in blood pH</b> (from dissolved CO₂), and <b>stretch receptors</b> in the muscles detect movement. Impulses go to the medulla, which sends more impulses down the <b>sympathetic (accelerator) nerve</b> to the SAN, increasing heart rate. When it is over, the <b>parasympathetic (vagus) nerve</b> slows it again. <b>Baroreceptors</b> detect blood pressure and correct it the same way.</p>
      <p><b>Ventilation centre:</b> the same rise in CO₂ increases the <b>rate and depth of breathing</b>, via impulses to the intercostal muscles and diaphragm.</p>
      <div class="eqn">minute ventilation = tidal volume × breathing rate<small>Core practical 17 uses a spirometer to measure tidal volume, breathing rate and oxygen consumption</small></div>
      <p class="note">Notice that the primary stimulus is the rise in <b>carbon dioxide</b>, not the fall in oxygen. CO₂ dissolves to form carbonic acid, so it changes blood pH — and pH is what the chemoreceptors are really monitoring.</p>`},
    { type:'num', h2:'Your turn — minute ventilation', q:'At rest, a student has a tidal volume of <b>0.50 dm³</b> and a breathing rate of <b>14 breaths per minute</b>. Calculate their <b>respiratory minute ventilation</b>.',
      unit:'dm³ min⁻¹', answer:7, tol:0.1, hint:'minute ventilation = 0.50 × 14.' },
    { type:'num', h2:'Your turn — percentage increase', q:'At rest, cardiac output is <b>5.4 dm³ min⁻¹</b>. During maximal exercise it reaches <b>21.6 dm³ min⁻¹</b>. Calculate the <b>percentage increase</b> in cardiac output.',
      unit:'%', answer:300, tol:2, hint:'increase = 21.6 − 5.4 = 16.2. Then (16.2 ÷ 5.4) × 100.' },
    { type:'match', h2:'Fast twitch or slow twitch?', prompt:'Tap a feature on the left, then the fibre type it describes.',
      headL:'Feature', headR:'Fibre type',
      pairs:[
        {l:'Many mitochondria, rich in myoglobin, dense capillary supply', r:'Slow twitch'},
        {l:'Contracts slowly but is fatigue-resistant — used by marathon runners', r:'Slow twitch (endurance)'},
        {l:'Few mitochondria, large glycogen store, high levels of glycolytic enzymes', r:'Fast twitch'},
        {l:'Contracts rapidly and powerfully but fatigues quickly — used by sprinters', r:'Fast twitch (power)'}] },
    { type:'teach', tag:'Homeostasis · 7.11–7.12', h2:'Negative feedback and thermoregulation',
      html:`      <p><span class="hl k">Homeostasis</span> is the maintenance of a constant internal environment within narrow limits, despite changes outside. It works by <b>negative feedback</b>: a receptor detects a deviation from the <b>set point</b>, a coordinator (usually the hypothalamus) processes it, and effectors act to <b>reverse</b> the change.</p>
      <p><b>Positive feedback</b> does the opposite — it <b>amplifies</b> the change. It is rare and usually used to complete a process quickly: the opening of sodium voltage-gated channels in an action potential, or oxytocin release in childbirth.</p>
      <p><b>Thermoregulation:</b> the <b>hypothalamus</b> monitors blood temperature.</p>
      <ul>
        <li><b>Too hot:</b> <b>vasodilation</b> of arterioles near the skin surface (more blood flows through the capillary loops, so more heat is radiated), <b>sweating</b> (evaporation of water requires latent heat, taken from the body), hairs lie flat.</li>
        <li><b>Too cold:</b> <b>vasoconstriction</b>, no sweating, <b>shivering</b> (involuntary muscle contraction releases heat from respiration), hairs erected to trap an insulating layer of air, and increased metabolic rate.</li>
      </ul>
      <p class="note"><b>Precision matters:</b> capillaries cannot dilate or constrict — they have no muscle. It is the <b>arterioles</b> (and the shunt vessels) that do the work.</p>`},
    { type:'mcq', h2:'Negative feedback in action',
      q:'Which of the following is an example of negative feedback?',
      why:'Negative feedback REVERSES a deviation from the set point: the rise in body temperature is detected, and the effector response (vasodilation, sweating) brings the temperature back DOWN. Amplifying a change — as in an action potential or in childbirth — is positive feedback.',
      opts:[['A rise in body temperature triggers sweating, which lowers body temperature',1],['Depolarisation opens more sodium channels, causing further depolarisation',0],['Oxytocin causes contractions, which cause more oxytocin to be released',0],['Blood clotting: platelets attract more platelets to the site',0]] },
    { type:'teach', tag:'Exercise, technology &amp; ethics · 7.13–7.16', h2:'Too much, too little, and the ethics of enhancement',
      html:`      <p><b>Too little exercise</b> increases the risk of obesity, CVD and type 2 diabetes. <b>Too much</b> causes wear and tear on joints (osteoarthritis) and <b>suppresses the immune system</b> — heavy endurance training temporarily lowers natural killer cell activity and levels of secretory antibodies, so infections are more common. In both cases the evidence is <b>correlational</b>, and you must be careful to distinguish correlation from cause.</p>
      <p><b>Medical technology (7.14):</b> keyhole surgery causes less tissue damage and speeds recovery; prostheses and hip replacements let people with injuries and disabilities take part in sport.</p>
      <p><b>Performance-enhancing substances (7.15):</b> anabolic steroids build muscle but cause liver damage, heart problems and aggression; erythropoietin (EPO) raises red blood cell count but thickens the blood and risks clots; creatine raises phosphocreatine stores. Arguments against use: it is <b>unfair</b>, it is <b>coercive</b> (others must dope to compete), and it is <b>harmful</b>. Arguments for: athletes are adults who consent; the line between a legal supplement and an illegal drug is arbitrary; bans are unevenly enforced.</p>
      <p class="note"><b>7.16 — genes can be switched on and off by transcription factors, including hormones.</b> A steroid hormone is lipid-soluble, so it diffuses straight through the membrane, binds a receptor in the cytoplasm, and the complex enters the nucleus and acts as a <b>transcription factor</b>, binding the promoter and increasing transcription of specific genes. That is precisely how anabolic steroids increase muscle protein synthesis.</p>`},
    { type:'mcq', h2:'Why does lactate production help?',
      q:'During intense exercise, what is the main benefit to the cell of converting pyruvate to lactate?',
      why:'Reduced NAD passes its hydrogen to pyruvate, forming lactate and REGENERATING NAD. Without free NAD, the oxidation step of glycolysis would stop — so this reaction is what allows glycolysis (and its net 2 ATP) to continue when oxygen is short. Lactate itself is a nuisance, not a benefit.',
      opts:[['Lactate is a better energy source than glucose',0],['It regenerates NAD, allowing glycolysis to continue and keep making ATP',1],['It produces a large amount of ATP directly',0],['It removes the oxygen debt immediately',0]] }
  ]
},

/* ============================ TOPIC 8 ============================ */
{
  key: 'biology-a-level-edexcel', slug: 'grey-matter',
  title: 'Grey Matter', emoji: '🧠',
  spec: SPEC + ' · Topic 8: Grey Matter',
  desc: 'A-level Salters-Nuffield Biology mini-lesson on Topic 8 Grey Matter: sensory, relay and motor neurones, myelination, the resting and action potential, synaptic transmission, rods and cones, phytochrome and IAA, nervous and hormonal coordination, brain regions, MRI, fMRI, CT and PET, the critical period, habituation, imbalances in brain chemicals, drugs and synapses, the Human Genome Project, genetically modified organisms, and nature versus nurture.',
  overview3: ['neurones &amp; synapses', 'the brain', 'genes &amp; behaviour'],
  intro: 'SNAB Topic 8 works out from a single <b>action potential</b> to the whole <b>brain</b>. You will cover the <b>resting and action potential</b>, <b>synapses</b>, <b>vision</b>, plant responses, brain <b>imaging</b>, <b>habituation</b>, the effects of drugs, and the genetics and ethics of the <b>Human Genome Project</b>.',
  sortDone: 'Resting potential is set by the Na⁺/K⁺ pump; the action potential is a wave of depolarisation and repolarisation.',
  matchDone: 'Each brain imaging technique answers a different question — structure, function, or metabolic activity.',
  recap: [
    '<b>Neurones:</b> sensory (receptor → CNS), relay (within CNS), motor (CNS → effector). <b>Schwann cells</b> form the myelin sheath; the gaps are the <b>nodes of Ranvier</b>, which allow <b>saltatory conduction</b>.',
    '<b>Resting potential (−70 mV):</b> the Na⁺/K⁺ pump moves 3 Na⁺ out for every 2 K⁺ in (active transport), and the membrane is far more permeable to K⁺ than Na⁺.',
    '<b>Action potential:</b> stimulus → threshold → voltage-gated Na⁺ channels open → <b>depolarisation</b> to about +40 mV → Na⁺ channels close and K⁺ channels open → <b>repolarisation</b> → hyperpolarisation → resting potential restored. All-or-nothing; intensity is coded by <b>frequency</b>.',
    '<b>Synapse:</b> Ca²⁺ enters → vesicles fuse → neurotransmitter diffuses across → binds receptors on the post-synaptic membrane → Na⁺ channels open. Synapses ensure <b>one-way</b> transmission.',
    '<b>Eye:</b> rods (rhodopsin, high sensitivity, many rods to one bipolar neurone → high sensitivity but low acuity, monochrome); cones (iodopsin, one-to-one → high acuity, colour, need bright light).',
    '<b>Plants:</b> IAA (auxin) causes cell elongation on the shaded side (phototropism); <b>phytochrome</b> P<sub>r</sub> ⇌ P<sub>fr</sub> controls flowering and germination.',
    '<b>Brain:</b> cerebral hemispheres, hypothalamus, cerebellum, medulla oblongata. Imaged with CT/MRI (structure), fMRI and PET (function/activity).',
    '<b>Nature and nurture:</b> studied using twin (MZ vs DZ concordance) and adoption studies; almost every trait is both.'
  ],
  recapTail: 'You have covered the whole of SNAB Topic 8. Press <b>Finish</b> to see your score.',
  screens: [
    { type:'teach', tag:'Neurones · 8.1–8.2', h2:'Neurones and the reflex arc',
      html:`      <ul>
        <li><b>Sensory neurone</b> — carries impulses from a receptor to the CNS. Cell body in the middle, on a side branch.</li>
        <li><b>Relay (intermediate) neurone</b> — within the CNS; connects sensory to motor. Short, unmyelinated.</li>
        <li><b>Motor neurone</b> — carries impulses from the CNS to an effector (muscle or gland). Large cell body in the CNS with many dendrites; a long axon.</li>
      </ul>
      <p><b>Schwann cells</b> wrap repeatedly around the axon, forming the <b>myelin sheath</b>. Myelin is a lipid, so it is an <b>electrical insulator</b>: the membrane can only depolarise at the gaps, the <b>nodes of Ranvier</b>. The impulse therefore <b>jumps from node to node</b> — <b>saltatory conduction</b> — which is far faster than the continuous conduction of an unmyelinated axon. Conduction is also faster in a <b>wider</b> axon and at a <b>higher temperature</b>.</p>
      <p><b>Reflex arc:</b> receptor → sensory neurone → relay neurone (in the spinal cord) → motor neurone → effector. It is <b>fast</b> (few synapses) and <b>involuntary</b> — the brain is informed afterwards, which is why you have already pulled your hand back before you feel the pain.</p>
      <p class="note"><b>The pupil reflex (8.2):</b> in bright light the <b>circular muscles</b> of the iris contract and the radial muscles relax, <b>constricting</b> the pupil (an antagonistic pair, controlled by the autonomic nervous system). In dim light the radial muscles contract and the pupil <b>dilates</b>.</p>`},
    { type:'num', h2:'Your turn — conduction velocity', q:'An impulse travels along a myelinated motor neurone <b>1.2 m</b> long in <b>0.020 s</b>. Calculate the conduction velocity.',
      unit:'m s⁻¹', answer:60, tol:0.5, hint:'speed = distance ÷ time = 1.2 ÷ 0.020.' },
    { type:'teach', tag:'Nerve impulse · 8.3', h2:'Resting potential and action potential',
      html:`      <p><b>Resting potential (about −70 mV):</b> the <b>sodium–potassium pump</b> actively transports <b>3 Na⁺ out</b> for every <b>2 K⁺ in</b>, using ATP. The membrane is far more <b>permeable to K⁺</b> than to Na⁺ (potassium leak channels are open), so K⁺ diffuses back out. The result is a net excess of positive charge <b>outside</b> — the inside is negative. The axon is <b>polarised</b>.</p>
      <p><b>Action potential:</b></p>
      <ol style="margin:0 0 14px 2px;padding-left:22px">
        <li>A stimulus opens a few Na⁺ channels; if the <b>threshold (about −55 mV)</b> is reached, <b>voltage-gated Na⁺ channels</b> open.</li>
        <li><b>Depolarisation:</b> Na⁺ floods in down its electrochemical gradient. This opens still more Na⁺ channels — <b>positive feedback</b> — and the potential rises to about <b>+40 mV</b>.</li>
        <li><b>Repolarisation:</b> Na⁺ channels close and <b>voltage-gated K⁺ channels</b> open; K⁺ leaves, restoring the negative interior.</li>
        <li><b>Hyperpolarisation:</b> the K⁺ channels are slow to close, so the potential briefly overshoots below −70 mV. The Na⁺/K⁺ pump then restores the resting potential.</li>
      </ol>
      <p class="note"><b>All-or-nothing:</b> either the threshold is reached and a full-sized action potential fires, or nothing happens. A <b>stronger stimulus does not make a bigger impulse</b> — it makes them <b>more frequent</b> (and recruits more neurones). During the <b>refractory period</b> the Na⁺ channels cannot reopen, which ensures the impulse travels in <b>one direction only</b> and sets the maximum firing frequency.</p>`},
    { type:'num', h2:'Your turn — the size of the change', q:'The resting potential of an axon is <b>−70 mV</b> and the peak of the action potential is <b>+40 mV</b>. Calculate the total change in potential difference during depolarisation.',
      unit:'mV', answer:110, tol:0.5, hint:'From −70 up to +40 is a change of 40 − (−70).' },
    { type:'num', h2:'Your turn — maximum firing frequency', q:'A neurone has an absolute refractory period of <b>3.0 ms</b>. Calculate the maximum number of action potentials it could conduct in <b>one second</b>. Give your answer to the nearest whole number.',
      unit:'impulses s⁻¹', answer:333, tol:1.5, hint:'3.0 ms = 0.003 s. Maximum frequency = 1 ÷ 0.003.' },
    { type:'sort', h2:'Resting or action potential?', prompt:'Tap an event, then tap where it belongs.',
      bins:['😴 Resting potential','⚡ Depolarisation','🔄 Repolarisation'],
      data:[['Na⁺/K⁺ pump moves 3 Na⁺ out and 2 K⁺ in','a'],['Membrane is far more permeable to K⁺ than Na⁺','a'],['Voltage-gated Na⁺ channels open','b'],['Potential rises towards +40 mV','b'],['Voltage-gated K⁺ channels open and K⁺ leaves','c'],['The inside of the axon becomes negative again','c']] },
    { type:'teach', tag:'Synapses · 8.4, 8.15', h2:'The synapse — and what drugs do to it',
      html:`      <p>Transmission across a <b>cholinergic synapse</b>:</p>
      <ol style="margin:0 0 14px 2px;padding-left:22px">
        <li>The action potential arrives and depolarises the pre-synaptic membrane, opening <b>voltage-gated Ca²⁺ channels</b>.</li>
        <li><b>Ca²⁺ enters</b>, causing vesicles of <b>acetylcholine</b> to move to and fuse with the membrane: exocytosis.</li>
        <li>The neurotransmitter <b>diffuses</b> across the synaptic cleft and binds <b>receptors</b> on the post-synaptic membrane.</li>
        <li>Na⁺ channels open; if enough neurotransmitter binds, the threshold is reached and a new action potential fires.</li>
        <li><b>Acetylcholinesterase</b> hydrolyses the acetylcholine, so the post-synaptic membrane repolarises and the synapse is not permanently switched on. The products are reabsorbed and recycled using ATP.</li>
      </ol>
      <p>Synapses ensure <b>unidirectional</b> transmission (only the pre-synaptic neurone has vesicles), and they allow <b>summation</b> (many weak stimuli combining), <b>divergence</b> and <b>convergence</b>.</p>
      <p class="note"><b>Drugs (8.15):</b> an <b>agonist</b> mimics the neurotransmitter (nicotine at acetylcholine receptors); an <b>antagonist</b> blocks the receptor; some drugs inhibit <b>reuptake</b> (cocaine blocks the reuptake of dopamine; <b>SSRIs</b> block the reuptake of serotonin, so it stays in the cleft for longer); others inhibit the breakdown enzyme (organophosphates inhibit acetylcholinesterase).</p>`},
    { type:'num', h2:'Your turn — total reflex time', q:'In a reflex, the impulse travels a total axon length of <b>1.2 m</b> at <b>60 m s⁻¹</b>, and crosses <b>3 synapses</b>, each of which adds a delay of <b>0.5 ms</b>. Calculate the total time taken, in milliseconds.',
      unit:'ms', answer:21.5, tol:0.2, hint:'Axon time = 1.2 ÷ 60 = 0.02 s = 20 ms. Synaptic delay = 3 × 0.5 = 1.5 ms.' },
    { type:'mcq', h2:'Why is transmission one-way?',
      q:'Why can an impulse only cross a synapse in one direction?',
      why:'Only the pre-synaptic neurone contains the vesicles of neurotransmitter, and only the post-synaptic membrane has the complementary receptors. Neurotransmitter therefore can only diffuse — and only be detected — in one direction.',
      opts:[['Because the synaptic cleft is charged',0],['Because only the pre-synaptic neurone has vesicles and only the post-synaptic membrane has receptors',1],['Because the refractory period stops the impulse arriving at all',0],['Because acetylcholinesterase only works in one direction',0]] },
    { type:'teach', tag:'Vision · 8.5', h2:'Detecting a stimulus — rods and cones',
      html:`      <p>A <b>receptor</b> is a <b>transducer</b>: it converts one form of energy (here, light) into a nerve impulse. Light bleaches the pigment in a photoreceptor, and the resulting change in membrane permeability generates a <b>generator potential</b>. If it reaches the threshold, the bipolar neurone fires.</p>
      <ul>
        <li><b>Rods</b> — contain <b>rhodopsin</b>, which is broken down by even low light intensity, so rods work in <b>dim light</b>. <b>Many rods synapse onto one bipolar neurone</b> (<b>retinal convergence</b>), so their generator potentials <b>summate</b> and reach the threshold in dim light: high <b>sensitivity</b>, but low <b>acuity</b> (the brain cannot tell which rod fired), and only monochrome vision.</li>
        <li><b>Cones</b> — contain <b>iodopsin</b>, which needs a <b>high light intensity</b> to be broken down. Each cone typically has its <b>own</b> bipolar neurone, so two nearby cones send separate impulses: high <b>visual acuity</b>. Three types (red, green, blue) give <b>colour</b> vision. Concentrated at the <b>fovea</b>.</li>
      </ul>`},
    { type:'teach', tag:'Plant responses · 8.6', h2:'IAA and phytochrome',
      html:`      <p><b>Phototropism:</b> <b>IAA (indoleacetic acid, an auxin)</b> is made at the shoot tip and transported down. It is redistributed <b>away from the light</b> to the shaded side, where it causes <b>cell elongation</b> (by loosening the cell wall). The shaded side grows faster, so the shoot bends <b>towards</b> the light — a <b>positive phototropic</b> response. In the root, the same auxin <b>inhibits</b> elongation, so roots show positive gravitropism.</p>
      <p><b>Phytochrome:</b> a light-sensitive pigment that exists in two interconvertible forms.</p>
      <div class="eqn">P<sub>r</sub> ⇌ P<sub>fr</sub><small>red light (660 nm) converts Pr → Pfr; far-red light (730 nm) — or darkness, slowly — converts Pfr → Pr</small></div>
      <p><b>P<sub>fr</sub> is the active form.</b> In daylight, Pfr accumulates. It promotes germination of light-sensitive seeds and controls flowering: in <b>long-day plants</b> Pfr <b>promotes</b> flowering; in <b>short-day plants</b> Pfr <b>inhibits</b> it — which is why what actually matters is the length of the <b>uninterrupted dark period</b>, during which Pfr slowly reverts to Pr.</p>`},
    { type:'teach', tag:'The brain · 8.7–8.9', h2:'Brain regions and brain imaging',
      html:`      <ul>
        <li><b>Cerebral hemispheres</b> — the largest region; folded to increase surface area. Conscious thought, memory, language, personality, voluntary movement and the processing of sensory information.</li>
        <li><b>Hypothalamus</b> — the homeostatic control centre: temperature, water balance, hunger, sleep; it also controls the pituitary gland, linking the nervous and <b>endocrine</b> systems.</li>
        <li><b>Cerebellum</b> — coordination of movement, balance and posture; fine motor control.</li>
        <li><b>Medulla oblongata</b> — the involuntary essentials: heart rate, ventilation rate, blood pressure, swallowing.</li>
      </ul>
      <p><b>Nervous vs hormonal coordination (8.7):</b> nervous — electrical impulses along neurones, very fast, very localised (a specific effector), short-lived effect. Hormonal — chemical messengers in the blood, slower, widespread (any cell with the right receptor), longer-lasting.</p>`},
    { type:'match', h2:'Match the imaging technique', prompt:'Tap what it shows on the left, then the technique.',
      headL:'What it reveals', headR:'Technique',
      pairs:[
        {l:'Detailed soft-tissue structure using a magnetic field and radio waves — no radiation', r:'MRI'},
        {l:'Which brain regions are active during a task, by tracking blood oxygenation in real time', r:'fMRI'},
        {l:'Metabolic activity, using an injected radioactive tracer such as labelled glucose', r:'PET'},
        {l:'Structure only, built from many X-ray images — fast, but uses ionising radiation', r:'CT'}] },
    { type:'teach', tag:'Development &amp; learning · 8.10–8.13', h2:'Critical periods, animal models and habituation',
      html:`      <p><b>The critical period (8.10):</b> a window early in development during which the nervous system must receive the right stimulation to develop normally. Hubel and Wiesel showed that if one eye of a kitten is deprived of light during this period, the neural connections serving that eye are lost and it remains functionally blind — even after the eye is reopened. In humans, an untreated squint or cataract in infancy can cause permanent <b>amblyopia</b>. The visual cortex shows <b>plasticity</b>: the connections that are used are strengthened, and those that are not are pruned.</p>
      <p><b>Animal models (8.11–8.12):</b> they made the discovery possible, but they raise real ethical problems. Arguments for: without them we would not understand visual development or have effective treatments; the animals&rsquo; welfare is regulated by law; the potential benefit is enormous. Arguments against: the animals cannot consent and suffer real harm; results in one species may not transfer to humans; and alternatives (cell culture, computer modelling, human imaging) increasingly exist.</p>
      <p><b>Habituation (8.13):</b> the simplest form of learning — a decreasing response to a <b>repeated, harmless</b> stimulus. Repeated stimulation means less Ca²⁺ enters the pre-synaptic neurone, so <b>less neurotransmitter is released</b>, the post-synaptic threshold is not reached, and the response fades. It is <b>adaptive</b>: it stops an animal wasting energy responding to a stimulus that carries no threat.</p>`},
    { type:'teach', tag:'Brain chemistry · 8.14–8.15', h2:'When brain chemicals go wrong',
      html:`      <p><b>Parkinson&rsquo;s disease</b> — the dopamine-secreting neurones of the <b>substantia nigra</b> die, so <b>dopamine levels fall</b>. Because dopamine is needed for the control of movement, the result is tremor, muscle rigidity and slow movement (bradykinesia). Treatments raise dopamine activity: <b>L-dopa</b> (a precursor that, unlike dopamine, can cross the blood–brain barrier and is then converted to dopamine), dopamine agonists, and MAO-B inhibitors which slow the breakdown of dopamine.</p>
      <p><b>Depression</b> is associated with low levels of <b>serotonin</b>. <b>SSRIs</b> (selective serotonin reuptake inhibitors) block the reuptake transporter, so serotonin stays in the synaptic cleft for longer and is more likely to bind post-synaptic receptors.</p>
      <p class="note">Note the careful language: <b>associated with</b>. A low serotonin level and depression correlate — establishing which causes which is much harder, and it is exactly the kind of point SNAB expects you to make.</p>`},
    { type:'teach', tag:'Genomes, GMOs &amp; nature/nurture · 8.16–8.19', h2:'From the genome to behaviour',
      html:`      <p><b>Genome sequencing (8.16):</b> the outcomes are used to identify genes associated with disease, to develop new drugs, and to move towards <b>personalised medicine</b> — matching a drug to a patient&rsquo;s genotype. Ethical questions: who owns the data, could insurers or employers use it, and how do you counsel someone about a risk rather than a certainty?</p>
      <p><b>Drugs from GM organisms (8.17–8.18):</b> a human gene (e.g. for insulin or a clotting factor) is cut out with a <b>restriction enzyme</b>, joined into a <b>plasmid vector</b> using <b>DNA ligase</b>, and taken up by a bacterium, which then makes the <b>human</b> protein. GM plants and animals (&ldquo;pharming&rdquo;) can make more complex proteins in milk or leaves. Benefits: pure, unlimited, no risk of disease transmission from donated human tissue, and no ethical objection from those who reject animal-derived insulin. Risks and objections: escape of the transgene into wild populations, unknown long-term effects, the welfare of GM animals, and the concentration of patents in a few companies.</p>
      <p><b>Nature and nurture (8.19):</b> the classic methods are <b>twin studies</b> — comparing concordance in <b>monozygotic</b> (genetically identical) and <b>dizygotic</b> twins, and especially MZ twins <b>reared apart</b> — and <b>adoption studies</b>, comparing a child with their biological and adoptive parents. A higher MZ than DZ concordance implies a genetic contribution; that concordance is never 100 % implies an environmental contribution. Almost every trait is both.</p>`},
    { type:'mcq', h2:'Interpreting a twin study',
      q:'For a particular trait, concordance is 62 % in monozygotic twins and 31 % in dizygotic twins. What is the best conclusion?',
      why:'MZ twins share 100 % of their alleles and DZ twins about 50 %, so a much higher MZ concordance indicates a substantial GENETIC contribution. But because MZ concordance is well below 100 %, genes cannot be the whole story — the environment must also contribute. Nature AND nurture.',
      opts:[['The trait is entirely genetically determined',0],['The trait is entirely environmentally determined',0],['Genes make a substantial contribution, but because MZ concordance is below 100 % the environment also contributes',1],['Twin studies cannot say anything about this trait',0]] }
  ]
}

];
