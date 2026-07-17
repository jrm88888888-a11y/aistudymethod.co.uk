/* Eduqas A-level Biology A400QS — data for _build_alevel_bio.js */
const SPEC = 'Eduqas A-level Biology (A400QS)';

module.exports = [

/* ===================== CORE CONCEPTS ===================== */
{
  key: 'biology-a-level-eduqas', slug: 'core-concepts-assessed-across-all-components',
  title: 'Core Concepts', emoji: '🧪',
  spec: SPEC + ' · Core Concepts (assessed across all three components)',
  desc: 'A-level Eduqas Biology mini-lesson on the Core Concepts: chemical elements and biological compounds, cell structure and organisation, cell membranes and transport including water potential, enzymes and enzyme inhibition, and nucleic acids and their functions including DNA replication, transcription and translation.',
  overview3: ['biological compounds', 'cells &amp; membranes', 'enzymes &amp; nucleic acids'],
  intro: 'The Eduqas <b>Core Concepts</b> are fundamental and <b>may be assessed in any of the three components</b>. They are: <b>biological compounds</b>, <b>cell structure and organisation</b>, <b>cell membranes and transport</b>, <b>enzymes</b>, and <b>nucleic acids and their functions</b>.',
  sortDone: 'Passive processes follow the gradient; active transport and bulk transport require ATP.',
  matchDone: 'Every biological polymer is built by condensation — but each has its own bond.',
  recap: [
    '<b>Water:</b> polar; hydrogen bonding gives it a high specific heat capacity, a high latent heat of vaporisation, cohesion and surface tension, and makes it an excellent solvent.',
    '<b>Carbohydrates:</b> α-glucose → starch/glycogen (store); β-glucose → cellulose (structure). <b>Glycosidic</b> bonds.',
    '<b>Lipids:</b> triglyceride = glycerol + 3 fatty acids, <b>ester</b> bonds. Phospholipids form the bilayer.',
    '<b>Proteins:</b> primary (peptide bonds) → secondary (H-bonds, α-helix/β-sheet) → tertiary (H-, ionic, disulfide bonds, hydrophobic interactions) → quaternary.',
    '<b>Cells:</b> eukaryotic ultrastructure (nucleus, rER, Golgi, mitochondria, lysosomes, chloroplasts); prokaryotic (70S ribosomes, murein wall, no membrane-bound organelles). <b>Magnification = image ÷ actual size.</b>',
    '<b>Membrane:</b> fluid-mosaic. Transport: diffusion, facilitated diffusion, osmosis, active transport, endocytosis and exocytosis. <b>ψ = ψ<sub>s</sub> + ψ<sub>p</sub></b>.',
    '<b>Enzymes:</b> globular proteins; lower activation energy; specificity from the tertiary structure of the active site. <b>Competitive</b> inhibition is overcome by more substrate; <b>non-competitive</b> is not.',
    '<b>Nucleic acids:</b> DNA is an antiparallel double helix (A–T, C–G); replication is semi-conservative; transcription → mRNA → translation on the ribosome.'
  ],
  recapTail: 'You have covered all five Eduqas Core Concepts. Press <b>Finish</b> to see your score.',
  screens: [
    { type:'teach', tag:'Core Concept 1 · biological compounds', h2:'Water, carbohydrates, lipids and proteins',
      html:`      <p><b>Water</b> is <b>polar</b> and hydrogen bonds to itself: hence its role as a <b>solvent</b>, its <b>high specific heat capacity</b> (temperature buffering), its <b>high latent heat of vaporisation</b> (cooling by evaporation), and its <b>cohesion</b> and surface tension.</p>
      <p><b>Carbohydrates:</b> monosaccharides join by <b>condensation</b>, forming a <b>glycosidic bond</b>. Starch and glycogen are branched, coiled, insoluble stores of <b>α-glucose</b>; cellulose is straight chains of <b>β-glucose</b> hydrogen-bonded into microfibrils.</p>
      <p><b>Lipids:</b> a triglyceride is glycerol + three fatty acids joined by three <b>ester bonds</b>. Saturated fatty acids have no C=C; unsaturated ones do. A <b>phospholipid</b> has a hydrophilic phosphate head and hydrophobic tails.</p>
      <p><b>Proteins:</b> amino acids join by <b>peptide bonds</b> (condensation). Primary → secondary (α-helix, β-pleated sheet; <b>hydrogen bonds</b>) → tertiary (hydrogen, ionic and <b>disulfide</b> bonds and hydrophobic interactions) → quaternary. <b>Fibrous</b> proteins (collagen) are structural and insoluble; <b>globular</b> proteins (enzymes, haemoglobin) are soluble and functional.</p>
      <p class="note"><b>Qualitative reagents:</b> iodine → blue-black for <b>starch</b>; Benedict&rsquo;s (heated) → brick-red for a <b>reducing sugar</b>; Biuret → purple for <b>protein</b>; emulsion test → white emulsion for <b>lipid</b>.</p>`},
    { type:'match', h2:'Which bond?', prompt:'Tap the molecules being joined, then the bond that joins them.',
      headL:'Molecules joined', headR:'Bond',
      pairs:[
        {l:'Two monosaccharides', r:'Glycosidic bond'},
        {l:'Glycerol and a fatty acid', r:'Ester bond'},
        {l:'Two amino acids', r:'Peptide bond'},
        {l:'Two nucleotides in a DNA strand', r:'Phosphodiester bond'}] },
    { type:'num', h2:'Your turn — peptide bonds', q:'A single polypeptide chain contains <b>124</b> amino acids. Calculate the number of <b>peptide bonds</b> in the chain.',
      unit:'peptide bonds', answer:123, tol:0.5, hint:'Each bond joins two amino acids, so a chain of n amino acids has n − 1 bonds.' },
    { type:'teach', tag:'Core Concept 2 · cell structure', h2:'Cell structure, organisation and microscopy',
      html:`      <p><b>Eukaryotic cells:</b> nucleus (envelope, pores, nucleolus), <b>rough ER</b> (protein synthesis and transport), <b>smooth ER</b> (lipid synthesis), <b>Golgi</b> (modification and packaging; makes lysosomes), <b>mitochondria</b> (cristae, matrix), <b>lysosomes</b>, <b>80S ribosomes</b>; plants also have a cellulose wall, chloroplasts and a vacuole.</p>
      <p><b>Prokaryotic cells:</b> circular DNA, plasmids, <b>70S ribosomes</b>, a <b>murein (peptidoglycan)</b> wall, sometimes a capsule and flagellum — and <b>no membrane-bound organelles</b>.</p>
      <p><b>Levels of organisation:</b> organelle → cell → tissue → organ → organ system → organism.</p>
      <div class="eqn">magnification = image size ÷ actual size<small>rearranged: actual size = image size ÷ magnification. Convert both to the SAME unit first!</small></div>
      <p class="note"><b>Magnification vs resolution:</b> magnification is how much bigger the image is; <b>resolution</b> is the smallest distance at which two points can still be distinguished. Resolution is limited by <b>wavelength</b> — which is why the electron microscope (resolving ~0.1 nm) beats the light microscope (~200 nm), and why simply magnifying a light image further just gives a bigger blur.</p>`},
    { type:'num', h2:'Your turn — magnification', q:'A drawing of an <i>Amoeba</i> measures <b>50 mm</b> across. The actual organism is <b>25 µm</b> across. Calculate the magnification of the drawing. (1 mm = 1000 µm)',
      unit:'×', answer:2000, tol:5, hint:'50 mm = 50 000 µm. Magnification = 50 000 ÷ 25.' },
    { type:'teach', tag:'Core Concept 3 · membranes and transport', h2:'The fluid-mosaic membrane, transport and water potential',
      html:`      <p>The <b>fluid-mosaic model</b>: a phospholipid bilayer with intrinsic (channel and carrier) proteins, extrinsic proteins, <b>cholesterol</b> regulating fluidity, and glycoproteins and glycolipids for recognition.</p>
      <ul>
        <li><b>Diffusion</b> — small non-polar molecules straight through the bilayer, down the gradient. Passive.</li>
        <li><b>Facilitated diffusion</b> — polar molecules and ions through <b>channel</b> or <b>carrier</b> proteins, down the gradient. Passive.</li>
        <li><b>Osmosis</b> — water down the <b>water potential</b> gradient through a partially permeable membrane (largely through <b>aquaporins</b>).</li>
        <li><b>Active transport</b> — a carrier protein plus <b>ATP</b>, moving a substance <b>against</b> its gradient.</li>
        <li><b>Endocytosis / exocytosis</b> — bulk transport in vesicles; both require ATP.</li>
      </ul>
      <div class="eqn">ψ = ψ<sub>s</sub> + ψ<sub>p</sub><small>pure water: ψ = 0. Adding solute makes ψ negative. Water moves from HIGHER (less negative) to LOWER (more negative) water potential.</small></div>
      <p class="note"><b>Plant cell:</b> in a dilute solution it becomes <b>turgid</b> (the wall pushes back, so ψ<sub>p</sub> rises); in a concentrated one, <b>plasmolysed</b>. An <b>animal</b> cell has no wall, so in pure water it <b>bursts</b>. This is why the practical determines water potential by finding the concentration at which there is <b>no change in mass or length</b>.</p>`},
    { type:'num', h2:'Your turn — water potential', q:'A cell has a solute potential (ψ<sub>s</sub>) of <b>−1200 kPa</b> and a pressure potential (ψ<sub>p</sub>) of <b>+400 kPa</b>. Calculate its <b>water potential</b>.',
      unit:'kPa', answer:-800, tol:1, hint:'ψ = ψs + ψp = (−1200) + (+400).' },
    { type:'sort', h2:'Does it need ATP?', prompt:'Tap a process, then tap the group it belongs to.',
      bins:['➡️ Passive (no ATP)','⚡ Active (needs ATP)','💧 Water only'],
      data:[['Simple diffusion of oxygen through the bilayer','a'],['Facilitated diffusion through a channel protein','a'],['A carrier protein pumping ions against the gradient','b'],['Endocytosis of a large particle','b'],['Exocytosis of a secreted enzyme','b'],['Osmosis through aquaporins','c']] },
    { type:'teach', tag:'Core Concept 4 · enzymes', h2:'Enzymes and inhibition',
      html:`      <p>Enzymes are <b>globular proteins</b> that <b>lower the activation energy</b> of a reaction. The <b>active site</b> is complementary to the substrate; its shape comes from the <b>tertiary structure</b>. The <b>induced fit</b> model says the active site changes shape slightly as the substrate binds, straining the substrate&rsquo;s bonds.</p>
      <ul>
        <li><b>Temperature</b> — rate rises with kinetic energy; past the optimum, the bonds holding the tertiary structure break and the enzyme is <b>denatured</b>.</li>
        <li><b>pH</b> — extremes disrupt the ionic and hydrogen bonds of the tertiary structure, changing the active site.</li>
        <li><b>Substrate concentration</b> — the rate rises, then plateaus when all the active sites are <b>saturated</b>.</li>
        <li><b>Competitive inhibitor</b> — similar shape to the substrate; binds the <b>active site</b>; effect <b>overcome</b> by adding more substrate.</li>
        <li><b>Non-competitive inhibitor</b> — binds elsewhere and <b>distorts the active site</b>; <b>not</b> overcome by more substrate.</li>
      </ul>
      <p class="note"><b>Immobilised enzymes</b> (trapped in alginate beads) can be reused, do not contaminate the product, and are more stable to changes in pH and temperature — which is why industry uses them.</p>`},
    { type:'num', h2:'Your turn — rate of reaction', q:'An enzyme-catalysed reaction produces <b>12 cm³</b> of gas in <b>90 seconds</b>. Calculate the mean rate of reaction in <b>cm³ per minute</b>.',
      unit:'cm³ min⁻¹', answer:8, tol:0.15, hint:'90 s = 1.5 minutes. Rate = 12 ÷ 1.5.' },
    { type:'mcq', h2:'Diagnose the inhibitor',
      q:'An inhibitor slows an enzyme reaction. Adding much more substrate restores the original maximum rate. Which type of inhibitor is it?',
      why:'A competitive inhibitor is a similar shape to the substrate and competes for the active site. Adding a large excess of substrate makes it far more likely that substrate binds first, so the maximum rate is restored — Vmax is unchanged, only more substrate is needed to reach it.',
      opts:[['Non-competitive',0],['Competitive',1],['Irreversible',0],['Allosteric activator',0]] },
    { type:'teach', tag:'Core Concept 5 · nucleic acids', h2:'DNA, RNA and replication',
      html:`      <p>A <b>nucleotide</b> = pentose sugar + phosphate + nitrogenous base. Nucleotides join by <b>phosphodiester bonds</b> to form a sugar–phosphate backbone.</p>
      <p><b>DNA</b> — an <b>antiparallel double helix</b>. <b>A–T</b> (two hydrogen bonds) and <b>C–G</b> (three). <b>RNA</b> — single-stranded, ribose, uracil instead of thymine.</p>
      <p><b>Semi-conservative replication:</b> <b>DNA helicase</b> breaks the hydrogen bonds; free nucleotides pair with the exposed bases; <b>DNA polymerase</b> joins them, always working <b>5&prime;→3&prime;</b> (hence a leading and a lagging strand). Each new molecule has <b>one original and one new strand</b> — as <b>Meselson and Stahl</b> proved using ¹⁵N and ¹⁴N.</p>`},
    { type:'teach', tag:'Core Concept 5 · protein synthesis', h2:'Transcription and translation',
      html:`      <p><b>Transcription (nucleus):</b> <b>RNA polymerase</b> reads the DNA <b>template strand</b> and builds a complementary mRNA. In eukaryotes the primary transcript is <b>spliced</b>: non-coding <b>introns</b> are removed and the coding <b>exons</b> joined. The mature mRNA leaves through a nuclear pore.</p>
      <p><b>Translation (ribosome):</b> each mRNA <b>codon</b> is recognised by the complementary <b>anticodon</b> of a tRNA carrying a specific amino acid. The ribosome catalyses <b>peptide bond</b> formation and moves along one codon at a time until it reaches a <b>stop codon</b>.</p>
      <p>The genetic code is <b>triplet</b>, <b>non-overlapping</b>, <b>degenerate</b> (so some base substitutions are silent) and effectively <b>universal</b> — which is why a human gene can be expressed in a bacterium.</p>
      <p class="note"><b>ATP</b> is the universal energy currency: hydrolysis of ATP → ADP + P<sub>i</sub> releases a readily usable quantity of energy, and the phosphate group can be transferred to another molecule to make it more reactive (<b>phosphorylation</b>). ATP is small, soluble, and easily and rapidly regenerated.</p>`},
    { type:'mcq', h2:'Where does it happen?',
      q:'In a eukaryotic cell, where does translation take place, and what is the role of tRNA?',
      why:'Translation happens on a ribosome (free in the cytoplasm or bound to the rough ER). tRNA carries a specific amino acid and has an anticodon complementary to the mRNA codon, so it delivers the correct amino acid to the correct position in the growing chain.',
      opts:[['In the nucleus; tRNA copies the DNA',0],['On a ribosome; tRNA carries a specific amino acid and has an anticodon complementary to the codon',1],['In the Golgi apparatus; tRNA modifies the protein',0],['On the smooth ER; tRNA joins the peptide bonds',0]] },
    { type:'mcq', h2:'Membrane structure',
      q:'Why is the model of the membrane described as "fluid mosaic"?',
      why:'"Fluid" because the phospholipids can move laterally within their layer — the bilayer is not a rigid sheet. "Mosaic" because the proteins are scattered through it in an irregular, patchwork pattern, of many different shapes and sizes.',
      opts:[['Because the membrane is liquid and dissolves in water',0],['Because the phospholipids can move laterally, and the proteins are scattered through the bilayer like tiles in a mosaic',1],['Because the proteins are arranged in a regular repeating grid',0],['Because it is made entirely of lipid',0]] }
  ]
},

/* ===================== COMPONENT 1 ===================== */
{
  key: 'biology-a-level-eduqas', slug: 'component-1-energy-for-life',
  title: 'Component 1 — Energy for Life', emoji: '⚡',
  spec: SPEC + ' · Component 1: Energy for Life',
  desc: 'A-level Eduqas Biology mini-lesson on Component 1 Energy for Life: the importance of ATP and chemiosmosis, photosynthesis (light-dependent reactions and the Calvin cycle), respiration (glycolysis, the link reaction, the Krebs cycle and oxidative phosphorylation), microbiology and bacterial growth, population size and ecosystems including energy flow and nutrient cycles, and human impact on the environment.',
  overview3: ['ATP &amp; chemiosmosis', 'photosynthesis &amp; respiration', 'ecosystems'],
  intro: 'Eduqas Component 1 follows energy through life: <b>ATP and chemiosmosis</b>, <b>photosynthesis</b>, <b>respiration</b>, <b>microbiology</b>, <b>population size and ecosystems</b>, and <b>human impact on the environment</b>.',
  sortDone: 'Glycolysis is in the cytoplasm; the Krebs cycle in the matrix; the electron transport chain on the inner membrane.',
  matchDone: 'Each stage of the nitrogen cycle is carried out by a different group of bacteria.',
  recap: [
    '<b>ATP:</b> the universal energy currency. Synthesised by <b>chemiosmosis</b> — a flow of protons through <b>ATP synthase</b> down an electrochemical gradient maintained by proton pumps.',
    '<b>Mitochondria and chloroplasts use the same trick:</b> both build a proton gradient across an inner membrane and use it to make ATP.',
    '<b>Light-dependent stage</b> (thylakoid): photoactivation, the electron transport chain, <b>photolysis of water</b> (releasing O₂), photophosphorylation, and the reduction of NADP.',
    '<b>Calvin cycle</b> (stroma): CO₂ + RuBP →(rubisco)→ 2 GP → TP (using ATP and reduced NADP); most TP regenerates RuBP.',
    '<b>Respiration:</b> glycolysis (cytoplasm, net 2 ATP) → link reaction → Krebs cycle (matrix) → oxidative phosphorylation (inner membrane, chemiosmosis, oxygen as the final electron acceptor).',
    '<b>Bacterial growth</b> is exponential: lag → log → stationary → death. Number after n divisions = 2ⁿ.',
    '<b>Ecosystems: NPP = GPP − R.</b> Around 10 % of energy is transferred between trophic levels; energy flow is one-way, nutrients cycle.',
    '<b>Human impact:</b> deforestation, eutrophication, greenhouse gases and overfishing all reduce biodiversity — but sustainable management can reverse this.'
  ],
  recapTail: 'You have covered the whole of Eduqas Component 1. Press <b>Finish</b> to see your score.',
  screens: [
    { type:'teach', tag:'Topic 1 · Importance of ATP', h2:'ATP and chemiosmosis',
      html:`      <p><b>ATP</b> is the <b>universal energy currency</b>: it is the immediate source of energy for active transport, muscle contraction, protein synthesis and nerve impulses. It is small, soluble, easily transported, and its hydrolysis releases a usefully sized packet of energy — and its phosphate group can be transferred to another molecule to make it more reactive.</p>
      <p><b>Chemiosmosis</b> is how it is made:</p>
      <ul>
        <li>Electrons pass down a chain of carriers, releasing energy at each step.</li>
        <li>That energy drives <b>proton pumps</b>, moving H⁺ across a membrane and creating an <b>electrochemical gradient</b> (a proton motive force).</li>
        <li>Protons flow back down the gradient <b>through ATP synthase</b>, and the energy released drives the phosphorylation of ADP + P<sub>i</sub> → <b>ATP</b>.</li>
      </ul>
      <p class="note"><b>The elegant point (spec 1(b)):</b> the <b>mitochondrion and the chloroplast do exactly the same thing</b>. Both use an electron transport chain to build a proton gradient across an inner membrane — into the intermembrane space in the mitochondrion, into the thylakoid space in the chloroplast — and both use ATP synthase to cash it in. Learn one mechanism and you have learnt both.</p>`},
    { type:'teach', tag:'Topic 2 · Photosynthesis', h2:'The light-dependent and light-independent reactions',
      html:`      <p><b>Light-dependent (thylakoid membranes):</b> chlorophyll is photoactivated and loses electrons, which pass along an electron transport chain, pumping protons into the thylakoid space. Chemiosmosis through ATP synthase generates <b>ATP</b> (photophosphorylation). <b>Photolysis of water</b> — <b>2H₂O → 4H⁺ + 4e⁻ + O₂</b> — replaces the lost electrons and releases <b>oxygen</b>. <b>NADP is reduced</b>.</p>
      <p><b>Light-independent — the Calvin cycle (stroma):</b></p>
      <ul>
        <li><b>Fixation:</b> CO₂ + <b>RuBP (5C)</b>, catalysed by <b>rubisco</b> → two molecules of <b>GP (3C)</b>.</li>
        <li><b>Reduction:</b> GP → <b>triose phosphate (3C)</b>, using <b>reduced NADP</b> and <b>ATP</b>.</li>
        <li><b>Regeneration:</b> most of the TP is used to regenerate RuBP; the rest makes hexoses, amino acids and lipids.</li>
      </ul>
      <p class="note"><b>Limiting factors:</b> light intensity, CO₂ concentration and temperature. Removing light stops the light-dependent stage, so ATP and reduced NADP run out: <b>GP accumulates</b> and <b>RuBP falls</b>. Removing CO₂ does the opposite: <b>RuBP accumulates</b> and <b>GP falls</b>. Being able to reason this out is worth a great many marks.</p>`},
    { type:'mcq', h2:'Limiting factors',
      q:'A photosynthesising plant is suddenly deprived of carbon dioxide. What happens to the levels of RuBP and GP?',
      why:'Without CO2, fixation stops, so no new GP is made — GP falls. But the light-dependent reactions keep supplying ATP and reduced NADP, so the existing GP is still converted to TP and RuBP is still regenerated. RuBP therefore ACCUMULATES.',
      opts:[['RuBP falls and GP rises',0],['RuBP rises and GP falls',1],['Both rise',0],['Both fall equally',0]] },
    { type:'teach', tag:'Topic 3 · Respiration', h2:'Glycolysis, Krebs and oxidative phosphorylation',
      html:`      <p><b>Glycolysis (cytoplasm):</b> glucose is phosphorylated using 2 ATP and split into two <b>triose phosphates</b>, which are oxidised to <b>pyruvate</b>, giving 4 ATP (<b>net 2</b>) and <b>2 reduced NAD</b>. It happens with or without oxygen.</p>
      <p><b>Link reaction (matrix):</b> pyruvate is <b>decarboxylated</b> and <b>dehydrogenated</b> to form <b>acetyl CoA</b>, releasing CO₂ and reduced NAD. Twice per glucose.</p>
      <p><b>Krebs cycle (matrix):</b> acetyl CoA (2C) + oxaloacetate (4C) → citrate (6C). Per turn: <b>2 CO₂, 3 reduced NAD, 1 reduced FAD, 1 ATP</b>. Two turns per glucose.</p>
      <p><b>Oxidative phosphorylation (inner membrane):</b> the reduced coenzymes are oxidised; electrons pass down the ETC; protons are pumped into the intermembrane space; <b>chemiosmosis</b> through ATP synthase makes the bulk of the ATP. <b>Oxygen is the final electron acceptor</b>, forming water.</p>
      <p class="note"><b>Anaerobic:</b> in muscle, pyruvate → <b>lactate</b>; in yeast, pyruvate → ethanal → <b>ethanol + CO₂</b>. In both cases the <b>point</b> is to <b>regenerate NAD</b> so glycolysis can continue. <b>Respiratory substrates:</b> lipids yield most energy per gram (they are the most reduced), then proteins, then carbohydrates.</p>`},
    { type:'sort', h2:'Where in the cell?', prompt:'Tap a stage, then tap where it happens.',
      bins:['🧫 Cytoplasm','🔥 Mitochondrial matrix','⚡ Inner mitochondrial membrane'],
      data:[['Glycolysis','a'],['Conversion of pyruvate to lactate or ethanol','a'],['The link reaction (pyruvate → acetyl CoA)','b'],['The Krebs cycle','b'],['The electron transport chain','c'],['Chemiosmosis through ATP synthase','c']] },
    { type:'num', h2:'Your turn — carbon dioxide per glucose', q:'Calculate the total number of <b>CO₂ molecules</b> released when one molecule of glucose is completely oxidised in aerobic respiration.',
      unit:'CO₂', answer:6, tol:0.1, hint:'Link reaction: 2. Krebs cycle: 2 per turn × 2 turns = 4. Glucose is C₆H₁₂O₆.' },
    { type:'teach', tag:'Topic 4 · Microbiology', h2:'Bacterial growth and aseptic technique',
      html:`      <p><b>Culturing bacteria</b> needs a suitable nutrient medium (a carbon and a nitrogen source, mineral ions), a suitable <b>temperature</b> and <b>pH</b>, and — for aerobes — oxygen.</p>
      <p><b>Aseptic technique:</b> flame the inoculating loop and the neck of the bottle; work close to a Bunsen flame (the updraught carries airborne microbes away); lift the Petri dish lid as little as possible; <b>tape the lid but do not seal it fully</b>, so that anaerobic pathogens are not favoured; incubate at <b>25 °C</b> in a school lab, well below body temperature, so that human pathogens are less likely to grow.</p>
      <p><b>The growth curve:</b></p>
      <ul>
        <li><b>Lag phase</b> — the bacteria are adapting and synthesising the enzymes they need; there is little division.</li>
        <li><b>Log (exponential) phase</b> — nutrients are plentiful, so the population <b>doubles</b> at a constant interval (the <b>mean generation time</b>). Plot it on a <b>log scale</b> and it becomes a straight line.</li>
        <li><b>Stationary phase</b> — nutrients run low and toxic waste accumulates; the death rate equals the reproduction rate.</li>
        <li><b>Death phase</b> — the death rate exceeds the reproduction rate.</li>
      </ul>
      <div class="eqn">N = N₀ × 2ⁿ<small>N₀ = starting number · n = number of divisions</small></div>`},
    { type:'num', h2:'Your turn — bacterial growth', q:'A single bacterium has a mean generation time of <b>30 minutes</b>. Assuming no limiting factors, calculate how many bacteria are present after <b>4 hours</b>.',
      unit:'bacteria', answer:256, tol:0.5, hint:'4 hours = 240 min ÷ 30 = 8 divisions. N = 2⁸.' },
    { type:'teach', tag:'Topic 5 · Population size and ecosystems', h2:'Populations, energy flow and nutrient cycles',
      html:`      <p><b>Population growth</b> is sigmoid: <b>lag → exponential → stationary</b> at the <b>carrying capacity</b>, where <b>density-dependent</b> factors (competition, predation, disease, waste) limit further growth. <b>Density-independent</b> factors (fire, flood, drought) act regardless of population size.</p>
      <div class="eqn">NPP = GPP − R<small>net primary productivity is what is left for the next trophic level after the plant’s own respiration</small></div>
      <p>Energy flow is <b>one-way</b> and lossy: only about <b>10 %</b> passes between trophic levels, because much is never eaten, some is egested, some excreted, and a lot is lost as <b>heat</b> in respiration.</p>
      <p><b>The nitrogen cycle:</b></p>
      <ul>
        <li><b>Nitrogen fixation</b> — <i>Rhizobium</i> (in legume root nodules) and free-living <i>Azotobacter</i> convert N₂ into ammonium.</li>
        <li><b>Ammonification</b> — <b>saprobiotic</b> bacteria and fungi decompose dead matter and urea, releasing ammonium.</li>
        <li><b>Nitrification</b> — <b>aerobic</b> nitrifying bacteria oxidise ammonium → nitrite (<i>Nitrosomonas</i>) → <b>nitrate</b> (<i>Nitrobacter</i>).</li>
        <li><b>Denitrification</b> — <b>anaerobic</b> denitrifying bacteria in waterlogged soil convert nitrate back to N₂.</li>
      </ul>`},
    { type:'num', h2:'Your turn — net primary productivity', q:'A field has a gross primary productivity of <b>15 000 kJ m⁻² yr⁻¹</b> and the plants respire away <b>6 000 kJ m⁻² yr⁻¹</b>. Calculate the <b>net primary productivity</b>.',
      unit:'kJ m⁻² yr⁻¹', answer:9000, tol:1, hint:'NPP = GPP − R = 15 000 − 6 000.' },
    { type:'num', h2:'Your turn — energy transfer', q:'Of that NPP of <b>9 000 kJ m⁻² yr⁻¹</b>, the primary consumers incorporate <b>900 kJ m⁻² yr⁻¹</b> into their biomass. Calculate the <b>percentage efficiency</b> of energy transfer.',
      unit:'%', answer:10, tol:0.2, hint:'(900 ÷ 9000) × 100.' },
    { type:'match', h2:'Match the bacterium to the process', prompt:'Tap the process on the left, then the organism or condition.',
      headL:'Process', headR:'Organism / condition',
      pairs:[
        {l:'Nitrogen fixation in the root nodules of legumes', r:'Rhizobium'},
        {l:'Oxidation of nitrite to nitrate', r:'Nitrobacter (aerobic)'},
        {l:'Decomposition of dead matter, releasing ammonium', r:'Saprobiotic bacteria and fungi'},
        {l:'Reduction of nitrate back to nitrogen gas', r:'Denitrifying bacteria (anaerobic)'}] },
    { type:'teach', tag:'Topic 6 · Human impact', h2:'Human impact on the environment',
      html:`      <ul>
        <li><b>Deforestation</b> — removes habitats, so biodiversity falls; less photosynthesis and the burning of timber both raise atmospheric CO₂; roots no longer bind the soil, so it erodes and leaches, and rivers silt up.</li>
        <li><b>Eutrophication</b> — fertiliser leaches into water; algae bloom; the bloom <b>blocks the light</b>, so submerged plants die; <b>saprobiotic bacteria</b> decomposing them multiply and their aerobic respiration <b>strips the dissolved oxygen</b> from the water; fish and invertebrates suffocate. Note that the fertiliser does not poison the fish — the bacteria suffocate them.</li>
        <li><b>Greenhouse gases</b> — CO₂ and CH₄ absorb outgoing long-wave infrared radiation and re-emit it, warming the lower atmosphere. Consequences include shifting species distributions, mismatched life cycles, and rising sea levels.</li>
        <li><b>Overfishing</b> — removing fish faster than they can reproduce. Managed by quotas, minimum net mesh sizes (so juveniles escape and can breed), and closed seasons and areas.</li>
      </ul>
      <p class="note"><b>Sustainability</b> means meeting present needs without compromising the ability of future generations to meet theirs: coppicing and selective felling, crop rotation with legumes, and fish quotas set from population data.</p>`},
    { type:'mcq', h2:'Eutrophication',
      q:'After fertiliser runs into a river, the fish die. What is the immediate cause?',
      why:'The algal bloom blocks light, so the plants beneath die. Saprobiotic bacteria decomposing the dead material multiply enormously, and their aerobic respiration removes the dissolved oxygen. The fish suffocate — they are not poisoned by the nitrate itself.',
      opts:[['The nitrate is directly toxic to the fish',0],['Bacteria decomposing the dead algae and plants remove the dissolved oxygen',1],['The algae physically block the fishes’ gills',0],['The water becomes too acidic',0]] },
    { type:'mcq', h2:'Why is the ATP yield of anaerobic respiration so low?',
      q:'Anaerobic respiration yields far less ATP than aerobic respiration. Why?',
      why:'Without oxygen as the final electron acceptor, the electron transport chain cannot run, so oxidative phosphorylation — which produces the great bulk of the ATP — is impossible. The link reaction and Krebs cycle also stop. Only glycolysis continues, with its net yield of 2 ATP.',
      opts:[['Glycolysis cannot happen without oxygen',0],['Without oxygen as the final electron acceptor, the electron transport chain and so oxidative phosphorylation cannot run — only glycolysis continues',1],['Lactate contains no energy',0],['The Krebs cycle runs backwards',0]] }
  ]
},

/* ===================== COMPONENT 2 ===================== */
{
  key: 'biology-a-level-eduqas', slug: 'component-2-continuity-of-life',
  title: 'Component 2 — Continuity of Life', emoji: '🧬',
  spec: SPEC + ' · Component 2: Continuity of Life',
  desc: 'A-level Eduqas Biology mini-lesson on Component 2 Continuity of Life: classification and evolutionary history, biodiversity and Simpson’s Diversity Index, DNA replication and mitosis, meiosis, sexual reproduction in humans and plants, monohybrid and dihybrid inheritance, the chi-squared test, sex linkage, mutation, epigenetics, variation and evolution, the Hardy-Weinberg principle, speciation, and applications of reproduction and genetics including DNA profiling, PCR and genetic engineering.',
  overview3: ['classification', 'reproduction &amp; inheritance', 'evolution'],
  intro: 'Eduqas Component 2 covers the <b>continuity of life</b>: <b>classification</b> and evolutionary history, <b>biodiversity</b>, <b>mitosis and meiosis</b>, <b>sexual reproduction</b> in humans and plants, <b>inheritance</b> and the <b>chi-squared test</b>, <b>variation and evolution</b> with the <b>Hardy&ndash;Weinberg principle</b>, and the <b>applications</b> of reproduction and genetics.',
  sortDone: 'Mitosis makes two identical diploid cells; meiosis makes four genetically different haploid cells.',
  matchDone: 'Each source of variation acts at a different point in the life cycle.',
  recap: [
    '<b>Classification:</b> domain, kingdom, phylum, class, order, family, genus, species. Three domains (Bacteria, Archaea, Eukarya) from rRNA evidence. Modern classification is <b>phylogenetic</b> and molecular.',
    '<b>Simpson’s Diversity Index: D = 1 − Σ(n/N)².</b> A value closer to 1 means greater diversity.',
    '<b>Mitosis:</b> two genetically identical diploid cells — growth, repair, asexual reproduction.',
    '<b>Meiosis:</b> four genetically different haploid cells. Variation from <b>crossing over</b> (prophase I), <b>independent assortment</b> (metaphase I) and <b>random fertilisation</b>.',
    '<b>Inheritance:</b> monohybrid (3:1), dihybrid (9:3:3:1), codominance, linkage, sex linkage (haemophilia, Duchenne muscular dystrophy).',
    '<b>χ² = Σ(O − E)²/E.</b> If χ² is less than the critical value at p = 0.05, accept the null hypothesis — the difference is due to chance.',
    '<b>Mutation:</b> gene mutation (sickle cell anaemia — a single base substitution) and chromosome mutation (Down’s syndrome — non-disjunction). <b>Epigenetics</b> controls gene expression without changing the base sequence.',
    '<b>Hardy–Weinberg: p + q = 1; p² + 2pq + q² = 1.</b> Requires a large population, random mating, and no mutation, migration or selection.'
  ],
  recapTail: 'You have covered the whole of Eduqas Component 2. Press <b>Finish</b> to see your score.',
  screens: [
    { type:'teach', tag:'Topic 1 · Evolutionary history', h2:'Classification and biodiversity',
      html:`      <p><b>Classification</b> is <b>hierarchical</b>: <b>domain, kingdom, phylum, class, order, family, genus, species</b>, with a <b>binomial</b> name for each species. Modern classification is <b>phylogenetic</b> — it aims to reflect <b>evolutionary relationships</b>, and is increasingly based on molecular evidence (DNA and rRNA sequences, protein comparison, immunology) rather than appearance, which can mislead through <b>convergent evolution</b>.</p>
      <p>The <b>three-domain</b> system (Bacteria, Archaea, Eukarya) replaced the five-kingdom system when <b>ribosomal RNA</b> sequencing revealed that the archaea are as different from bacteria as either is from us.</p>
      <p><b>Biodiversity</b> can be assessed at three levels: within a <b>habitat</b> (species richness and diversity indices), within a <b>species</b> (the proportion of <b>polymorphic loci</b> — the variety of alleles in the gene pool), and at the <b>molecular</b> level (DNA fingerprinting and sequencing).</p>
      <div class="eqn">Simpson&rsquo;s Diversity Index: D = 1 − Σ (n ÷ N)²<small>n = number of individuals of each species · N = total number of individuals<br>D lies between 0 and 1: the closer to 1, the greater the diversity</small></div>`},
    { type:'num', h2:'Your turn — Simpson&rsquo;s Diversity Index', q:'A sample of <b>50</b> organisms contains <b>25</b> of species A, <b>15</b> of species B and <b>10</b> of species C. Calculate Simpson&rsquo;s Diversity Index, D = 1 − Σ(n/N)². Give your answer to <b>2 decimal places</b>.',
      unit:'D', answer:0.62, tol:0.02, hint:'(25/50)² = 0.25; (15/50)² = 0.09; (10/50)² = 0.04. Σ = 0.38. D = 1 − 0.38.' },
    { type:'teach', tag:'Topic 2 · Copying genetic information', h2:'DNA replication and mitosis',
      html:`      <p><b>Semi-conservative replication:</b> <b>DNA helicase</b> unwinds the helix and breaks the hydrogen bonds; free nucleotides pair with the exposed bases; <b>DNA polymerase</b> forms the phosphodiester bonds, always working <b>5&prime;→3&prime;</b>. Each daughter molecule keeps one parental strand.</p>
      <p><b>The cell cycle:</b> interphase (G1 → <b>S</b>, where DNA replicates → G2), then mitosis, then cytokinesis.</p>
      <ul>
        <li><b>Prophase</b> — chromosomes condense and become visible as two sister chromatids; the nuclear envelope breaks down; the spindle forms.</li>
        <li><b>Metaphase</b> — chromosomes align on the equator.</li>
        <li><b>Anaphase</b> — centromeres divide and the chromatids are pulled to opposite poles.</li>
        <li><b>Telophase</b> — nuclear envelopes re-form; chromosomes decondense.</li>
      </ul>
      <p class="note"><b>Cancer</b> is a failure of the controls on this cycle: mutations in <b>proto-oncogenes</b> (making them oncogenes) or <b>tumour suppressor genes</b> allow uncontrolled mitosis. <b>Carcinogens</b> and <b>mutagens</b> increase the mutation rate and so the risk.</p>`},
    { type:'teach', tag:'Topics 3–4 · Sexual reproduction', h2:'Meiosis and sexual reproduction in humans and plants',
      html:`      <p><b>Meiosis</b> halves the chromosome number and generates variation. Two divisions produce <b>four haploid, genetically different</b> cells.</p>
      <ul>
        <li><b>Crossing over (prophase I)</b> — homologous chromosomes pair; chiasmata form and sections of non-sister chromatids are exchanged, creating <b>new allele combinations</b>.</li>
        <li><b>Independent assortment (metaphase I)</b> — each homologous pair aligns independently: <b>2ⁿ</b> combinations for n pairs.</li>
        <li><b>Random fertilisation</b> — any sperm may fuse with any egg.</li>
      </ul>
      <p><b>In humans:</b> spermatogenesis produces four small motile sperm from each primary spermatocyte and runs continuously from puberty; oogenesis produces <b>one</b> large ovum plus polar bodies, and is arrested part-way until ovulation. <b>Fertilisation:</b> the <b>acrosome reaction</b> digests a path through the zona pellucida; the membranes fuse; the <b>cortical reaction</b> then hardens the zona pellucida to <b>prevent polyspermy</b>; the haploid nuclei fuse to give a diploid zygote.</p>
      <p><b>In flowering plants:</b> the anther makes pollen; the ovule contains the embryo sac. Pollination is followed by the growth of the <b>pollen tube</b> down the style, and then by <b>double fertilisation</b> — one male nucleus fuses with the egg cell to form the diploid <b>zygote</b>, and the other fuses with two polar nuclei to form the <b>triploid endosperm</b>, the food store for the embryo.</p>`},
    { type:'sort', h2:'Mitosis or meiosis?', prompt:'Tap a statement, then tap the process it describes.',
      bins:['🔁 Mitosis','🎲 Meiosis','↔️ Both'],
      data:[['Produces two genetically identical diploid cells','a'],['Used for growth, repair and asexual reproduction','a'],['Produces four genetically different haploid cells','b'],['Crossing over and independent assortment occur','b'],['Involves two nuclear divisions','b'],['Preceded by DNA replication in S phase','c']] },
    { type:'teach', tag:'Topic 5 · Inheritance', h2:'Monohybrid, dihybrid, linkage and sex linkage',
      html:`      <ul>
        <li><b>Monohybrid</b> — one gene. Heterozygous × heterozygous gives a <b>3:1</b> phenotypic ratio.</li>
        <li><b>Codominance</b> — both alleles are expressed in the heterozygote (e.g. the AB blood group; roan cattle). Heterozygous × heterozygous gives <b>1:2:1</b>.</li>
        <li><b>Dihybrid</b> — two <b>unlinked</b> genes. Double heterozygotes give <b>9:3:3:1</b>.</li>
        <li><b>Linkage</b> — genes on the <b>same</b> chromosome are inherited together, so the parental combinations are far more common than expected and the recombinants are rare (they only arise by <b>crossing over</b>). A dihybrid cross that gives a strongly non-9:3:3:1 ratio is the classic sign of linkage.</li>
        <li><b>Sex linkage</b> — genes on the X chromosome. Males are XY and so <b>hemizygous</b>: a single recessive allele is expressed. <b>Haemophilia</b> and <b>Duchenne muscular dystrophy</b> are therefore far more common in males, and a carrier mother passes the allele to half of her sons.</li>
      </ul>
      <p class="note"><b>Mutation (spec 5(f)):</b> a <b>gene mutation</b> can be a single base <b>substitution</b> — in <b>sickle cell anaemia</b>, one base change substitutes valine for glutamic acid in the β-globin chain, so the haemoglobin polymerises and distorts the red cell. A <b>chromosome mutation</b> such as the <b>non-disjunction</b> that gives three copies of chromosome 21 causes <b>Down&rsquo;s syndrome</b>.</p>`},
    { type:'teach', tag:'Topic 5 · the chi-squared test', h2:'Testing your genetic ratios',
      html:`      <div class="eqn">χ² = Σ (O − E)² ÷ E<small>degrees of freedom = number of classes − 1</small></div>
      <ol style="margin:0 0 14px 2px;padding-left:22px">
        <li><b>Null hypothesis:</b> there is no significant difference between the observed and expected results — any difference is due to <b>chance</b>.</li>
        <li>Work out the <b>expected</b> numbers from the predicted ratio.</li>
        <li>Calculate χ².</li>
        <li>Compare with the <b>critical value</b> at <b>p = 0.05</b> for the correct degrees of freedom.</li>
        <li><b>Below</b> the critical value → <b>accept</b> the null hypothesis. <b>At or above</b> it → <b>reject</b> it: the difference is <b>significant</b>, so something else (such as <b>linkage</b>) is operating.</li>
      </ol>
      <p class="note">p = 0.05 means that a difference this large would arise by chance alone in fewer than 1 in 20 experiments. It is the conventional threshold in biology — not a natural law.</p>`},
    { type:'num', h2:'Your turn — chi-squared', q:'A monohybrid cross predicts a <b>3:1</b> ratio. From <b>200</b> offspring, <b>140</b> show the dominant phenotype and <b>60</b> the recessive. Calculate χ² = Σ (O − E)² ÷ E. Give your answer to <b>2 decimal places</b>.',
      unit:'χ²', answer:2.67, tol:0.06, hint:'Expected = 150 and 50. (140−150)²/150 = 0.667; (60−50)²/50 = 2.000.' },
    { type:'mcq', h2:'Interpreting your χ²',
      q:'Your χ² is 2.67. With 1 degree of freedom, the critical value at p = 0.05 is 3.84. What do you conclude?',
      why:'χ² (2.67) is less than the critical value (3.84), so there is a greater than 5 % probability that the difference arose by chance. You accept the null hypothesis: there is no significant difference, and the data are consistent with a 3:1 ratio.',
      opts:[['Reject the null hypothesis — the genes must be linked',0],['Accept the null hypothesis — the results are consistent with a 3:1 ratio',1],['The sample is too small for the test to be valid',0],['Degrees of freedom = 200, so the test cannot be used',0]] },
    { type:'teach', tag:'Topic 6 · Variation and evolution', h2:'Natural selection, Hardy–Weinberg and speciation',
      html:`      <p><b>Variation</b> is <b>continuous</b> (polygenic, strongly influenced by the environment — height, mass) or <b>discontinuous</b> (controlled by one or a few genes — blood group). Its ultimate source is <b>mutation</b>; sexual reproduction shuffles it.</p>
      <p><b>Natural selection:</b> variation → selection pressure → the better-adapted individuals survive and reproduce → the frequency of the advantageous allele <b>increases</b>. <b>Stabilising</b> selection favours the intermediate; <b>directional</b> selection favours one extreme; <b>disruptive</b> selection favours both extremes.</p>
      <div class="eqn">p + q = 1<br>p² + 2pq + q² = 1<small>p² = homozygous dominant · 2pq = heterozygous · q² = homozygous recessive</small></div>
      <p><b>The Hardy–Weinberg principle applies only if</b> the population is <b>large</b>, mating is <b>random</b>, and there is <b>no mutation, no migration and no selection</b>. If observed frequencies differ from predicted, one of those conditions is broken — the population is <b>evolving</b>.</p>
      <p class="note"><b>Speciation:</b> <b>allopatric</b> — a geographical barrier prevents gene flow; the two populations diverge under different selection pressures until they are reproductively isolated. <b>Sympatric</b> — reproductive isolation arises without a physical barrier (polyploidy, a change in flowering time, a behavioural change). <b>Genetic drift</b> — chance changes in allele frequency — has a far larger effect in <b>small</b> populations.</p>`},
    { type:'num', h2:'Your turn — Hardy–Weinberg', q:'In a population, <b>16 %</b> of individuals are homozygous recessive. Use p² + 2pq + q² = 1 to calculate the <b>percentage that is homozygous dominant</b>.',
      unit:'%', answer:36, tol:0.5, hint:'q² = 0.16, so q = 0.4 and p = 0.6. Homozygous dominant = p² = 0.6².' },
    { type:'match', h2:'Where does the variation come from?', prompt:'Tap a source of variation, then when it happens.',
      headL:'Source of variation', headR:'When it happens',
      pairs:[
        {l:'Chiasmata exchange sections of non-sister chromatids', r:'Crossing over — prophase I'},
        {l:'Homologous pairs align independently on the equator', r:'Independent assortment — metaphase I'},
        {l:'Any sperm may fuse with any egg', r:'Random fertilisation'},
        {l:'A change in the base sequence of DNA', r:'Mutation — the ultimate source'}] },
    { type:'teach', tag:'Topic 7 · Applications', h2:'DNA profiling, PCR and genetic engineering',
      html:`      <p><b>PCR</b> amplifies DNA: <b>denature (95 °C)</b> → <b>anneal primers (50–65 °C)</b> → <b>extend with Taq polymerase (72 °C)</b>. Each cycle <b>doubles</b> the amount of DNA, so <b>n</b> cycles gives <b>2ⁿ</b> copies.</p>
      <p><b>Gel electrophoresis:</b> DNA is negatively charged, so all fragments move towards the <b>anode</b>; the gel sieves them, so <b>shorter fragments travel further</b>. Comparing the pattern of bands from <b>short tandem repeats</b> gives a <b>DNA profile</b>, used in forensics, paternity testing and in establishing evolutionary relationships.</p>
      <p><b>Genetic engineering:</b> the gene is cut out with a <b>restriction enzyme</b> (leaving <b>sticky ends</b>), joined into a <b>plasmid vector</b> cut with the same enzyme using <b>DNA ligase</b>, and taken up by a host cell (<b>transformation</b>). <b>Marker genes</b> identify the transformed cells. This is how human insulin is made.</p>
      <p class="note"><b>Applications and ethics:</b> gene therapy, genetically modified crops (pest resistance, higher yield, Golden Rice), and stem cell therapy. The debate is real and you must be able to argue both sides: benefits to health and food security against the escape of transgenes, the loss of biodiversity, the welfare of GM animals, and questions about the destruction of embryos and about who controls and profits from the technology.</p>`},
    { type:'num', h2:'Your turn — PCR', q:'A single DNA molecule is amplified through <b>20 cycles</b> of PCR. Assuming 100 % efficiency, calculate the number of DNA molecules produced.',
      unit:'molecules', answer:1048576, tol:1, hint:'Each cycle doubles it: 2²⁰. Note 2¹⁰ = 1024, so 2²⁰ = 1024².' },
    { type:'mcq', h2:'Reading a DNA profile',
      q:'On a gel, a child has a band that is present in neither the mother’s nor the alleged father’s profile. What does this suggest?',
      why:'Every band in a child’s profile must be inherited from one parent or the other. A band present in the child but in neither adult means one of them is not the biological parent (or, far more rarely, a mutation or an error in the analysis has occurred) — so the result requires explanation, not dismissal.',
      opts:[['The alleged father is definitely the biological father',0],['A band must come from one parent or the other, so one of the tested adults is not the biological parent (or there has been a mutation or an error)',1],['The child has more DNA than either parent',0],['The gel has been run backwards',0]] }
  ]
},

/* ===================== COMPONENT 3 ===================== */
{
  key: 'biology-a-level-eduqas', slug: 'component-3-requirements-for-life-plus-one-option',
  title: 'Component 3 — Requirements for Life', emoji: '🫁',
  spec: SPEC + ' · Component 3: Requirements for Life (plus one option: A Immunology and Disease / B Human Musculoskeletal Anatomy / C Neurobiology and Behaviour)',
  desc: 'A-level Eduqas Biology mini-lesson on Component 3 Requirements for Life: adaptations for gas exchange and surface area to volume ratio, adaptations for transport in animals and plants, adaptations for nutrition, homeostasis and the kidney, the nervous system, plus an overview of the three options — Immunology and Disease, Human Musculoskeletal Anatomy, and Neurobiology and Behaviour.',
  overview3: ['exchange &amp; transport', 'homeostasis &amp; nerves', 'your option'],
  intro: 'Eduqas Component 3 covers <b>gas exchange</b>, <b>transport</b>, <b>nutrition</b>, <b>homeostasis and the kidney</b>, and the <b>nervous system</b> — and then <b>one option</b> chosen from <b>A: Immunology and Disease</b>, <b>B: Human Musculoskeletal Anatomy</b>, or <b>C: Neurobiology and Behaviour</b>. This lesson covers the core and introduces all three options.',
  sortDone: 'Ultrafiltration happens at the glomerulus; selective reabsorption in the proximal tubule; ADH acts on the collecting duct.',
  matchDone: 'Each of the three options takes the core biology of Component 3 further in its own direction.',
  recap: [
    '<b>SA:V ratio</b> falls as an organism gets bigger, so large or active organisms need <b>specialised exchange surfaces</b> and a <b>ventilation mechanism</b> and <b>mass transport system</b>.',
    '<b>Gas exchange surfaces</b> are large, thin and moist, with a maintained concentration gradient: alveoli, gills (countercurrent flow), tracheae, and the leaf mesophyll with its stomata.',
    '<b>Transport:</b> <b>cardiac output = stroke volume × heart rate</b>. Haemoglobin gives a sigmoid dissociation curve; the <b>Bohr shift</b> unloads more oxygen in respiring tissue. Plants: xylem (cohesion-tension) and phloem (mass flow).',
    '<b>Kidney:</b> ultrafiltration → selective reabsorption (PCT) → the loop of Henle sets up the medullary gradient → ADH controls water reabsorption in the collecting duct. Negative feedback.',
    '<b>Nervous system:</b> resting potential −70 mV; action potential (Na⁺ in, then K⁺ out); all-or-nothing; saltatory conduction; synaptic transmission by acetylcholine.',
    '<b>Option A — Immunology and Disease:</b> pathogens, antibiotics and antibiotic resistance, phagocytosis, the humoral and cell-mediated responses, antibodies, vaccination.',
    '<b>Option B — Human Musculoskeletal Anatomy:</b> bone and cartilage, the axial and appendicular skeleton, joints, and the sliding filament mechanism.',
    '<b>Option C — Neurobiology and Behaviour:</b> brain structure and imaging, neuroscience, and innate and learned behaviour.'
  ],
  recapTail: 'You have covered the Eduqas Component 3 core and all three options. Press <b>Finish</b> to see your score.',
  screens: [
    { type:'teach', tag:'Topic 1 · Adaptations for gas exchange', h2:'Surface area, volume and exchange surfaces',
      html:`      <p>As an organism gets larger, its <b>volume grows faster than its surface area</b>, so the <b>SA:V ratio falls</b> — and the diffusion distances become greater. A single-celled organism can rely on diffusion across its body surface; a mammal cannot.</p>
      <div class="eqn">cube of side <i>a</i>: SA = 6a² · V = a³ · SA:V = 6 ÷ a<small>double the size and you halve the SA:V ratio</small></div>
      <p>Large or metabolically active organisms therefore need a <b>specialised exchange surface</b>, which is always <b>large in area</b>, <b>thin</b> (a short diffusion distance), <b>moist</b>, and served by a mechanism that <b>maintains the concentration gradient</b>.</p>
      <ul>
        <li><b>Alveoli</b> — hundreds of millions of them; one squamous cell thick; ventilated by breathing and drained by a dense capillary network.</li>
        <li><b>Fish gills</b> — many filaments and lamellae; a <b>countercurrent</b> flow of water and blood in <b>opposite</b> directions, so a diffusion gradient is maintained <b>along the whole length</b> of the lamella. Roughly 80 % of the oxygen is extracted — far more than a parallel flow could achieve.</li>
        <li><b>Insect tracheal system</b> — air tubes carrying oxygen <b>directly</b> to the tissues; spiracles can close to reduce water loss.</li>
        <li><b>Leaf</b> — air spaces in the spongy mesophyll give a huge internal surface area; <b>stomata</b>, opened and closed by guard cells, control the trade-off between gas exchange and water loss.</li>
      </ul>`},
    { type:'num', h2:'Your turn — surface area : volume', q:'A cube-shaped organism has sides of <b>4 cm</b>. Surface area = 6 × side²; volume = side³. Calculate its surface area to volume ratio as a single number (SA ÷ V).',
      unit:': 1', answer:1.5, tol:0.05, hint:'SA = 6 × 4² = 96 cm². V = 4³ = 64 cm³. Ratio = 96 ÷ 64.' },
    { type:'mcq', h2:'Countercurrent flow',
      q:'Why does countercurrent flow in a fish gill extract so much more oxygen than a parallel flow would?',
      why:'In countercurrent flow, water and blood move in OPPOSITE directions. Blood that is already partly saturated always meets water that is even richer in oxygen, so a diffusion gradient exists along the WHOLE length of the lamella. With parallel flow, the two would reach equilibrium at about 50 % saturation and diffusion would then stop.',
      opts:[['It makes the water flow faster over the gills',0],['A diffusion gradient is maintained along the whole length of the lamella, because blood always meets water with a higher oxygen concentration',1],['It allows oxygen to be actively transported into the blood',0],['It reduces the diffusion distance to zero',0]] },
    { type:'teach', tag:'Topic 2 · Adaptations for transport', h2:'Mass transport in animals and plants',
      html:`      <p><b>Animals:</b> a <b>closed double circulation</b>. Cardiac muscle is <b>myogenic</b>; the <b>SAN</b> sets the rhythm, the <b>AVN</b> imposes a delay, and the <b>bundle of His</b> and <b>Purkyne fibres</b> make the ventricles contract from the apex upwards. Valves open and close purely because of <b>pressure differences</b>.</p>
      <div class="eqn">cardiac output = stroke volume × heart rate</div>
      <p><b>Haemoglobin</b> shows <b>cooperative binding</b>, hence the <b>sigmoid</b> dissociation curve: it loads oxygen at the high partial pressure in the lungs and unloads it steeply at the low partial pressure in respiring tissue. The <b>Bohr shift</b> — more CO₂, lower pH — moves the curve <b>right</b>, so still more oxygen is released where respiration is fastest. Fetal haemoglobin has a <b>higher</b> affinity (curve to the left), so it takes oxygen from the maternal blood.</p>
      <p><b>Plants:</b> <b>xylem</b> carries water up by <b>cohesion–tension</b>: evaporation from the leaves creates tension, and the continuous water column is pulled up, held together by <b>hydrogen bonding</b>. <b>Phloem</b> carries sucrose by <b>mass flow</b>: it is actively loaded at the source, water follows by osmosis, the hydrostatic pressure rises, and sap flows to the sink where sucrose is unloaded. <b>Xerophytes</b> (thick cuticle, sunken stomata, rolled leaves, hairs) reduce water loss.</p>`},
    { type:'num', h2:'Your turn — cardiac output', q:'A person has a stroke volume of <b>80 cm³</b> and a heart rate of <b>70 bpm</b>. Calculate their <b>cardiac output</b> in cm³ per minute.',
      unit:'cm³ min⁻¹', answer:5600, tol:5, hint:'cardiac output = 80 × 70.' },
    { type:'teach', tag:'Topic 3 · Adaptations for nutrition', h2:'Nutrition and digestion',
      html:`      <p><b>Modes of nutrition:</b> <b>autotrophic</b> (making organic compounds from inorganic ones — photoautotrophs such as plants; chemoautotrophs such as nitrifying bacteria) and <b>heterotrophic</b> — <b>holozoic</b> (ingesting, digesting and absorbing food, as animals do), <b>saprotrophic</b> (secreting enzymes onto dead matter and absorbing the products, as fungi do) and <b>parasitic</b>.</p>
      <p><b>The human gut:</b> carbohydrates are digested by <b>amylase</b> and membrane-bound <b>disaccharidases</b>; proteins by <b>endopeptidases</b> (breaking internal bonds and so creating many more ends), then <b>exopeptidases</b> and <b>dipeptidases</b>; lipids are <b>emulsified by bile salts</b> — increasing the surface area for <b>lipase</b> — and absorbed as micelles.</p>
      <p><b>The ileum</b> is adapted for absorption: <b>villi</b> and a brush border of <b>microvilli</b> give an enormous surface area; the epithelium is <b>one cell thick</b>; there are <b>many mitochondria</b> for the ATP needed for co-transport; and each villus has a dense capillary network (maintaining the gradient) and a <b>lacteal</b> for fats.</p>
      <p class="note"><b>Adaptations to diet:</b> a herbivore has broad, ridged molars and a very long gut with a caecum housing cellulose-digesting <b>mutualistic bacteria</b> (mammals make no cellulase of their own). A carnivore has carnassial teeth for shearing and a much shorter gut, because meat is far easier to digest.</p>`},
    { type:'teach', tag:'Topic 4 · Homeostasis and the kidney', h2:'The kidney and osmoregulation',
      html:`      <p><b>Ultrafiltration:</b> the afferent arteriole is wider than the efferent, so the <b>hydrostatic pressure</b> in the glomerulus is high. Water, glucose, amino acids, urea and ions are forced through the fenestrations, the <b>basement membrane</b> (the real filter) and the podocytes. <b>Blood cells and plasma proteins are too large</b> to pass.</p>
      <p><b>Selective reabsorption (proximal convoluted tubule):</b> all the glucose and amino acids are reabsorbed by <b>co-transport with Na⁺</b>; the cells have <b>microvilli</b> and <b>many mitochondria</b>. Water follows by osmosis.</p>
      <p><b>Loop of Henle:</b> a <b>countercurrent multiplier</b>. Na⁺ and Cl⁻ are pumped out of the ascending limb, making the medulla progressively more negative in water potential — so water can be drawn out of the <b>collecting duct</b> all the way down, producing urine more concentrated than blood.</p>
      <p><b>Osmoregulation:</b> a fall in blood water potential is detected by <b>osmoreceptors in the hypothalamus</b> → the <b>posterior pituitary</b> releases <b>ADH</b> → ADH inserts <b>aquaporins</b> into the collecting duct → more water is reabsorbed → a small volume of concentrated urine. <b>Negative feedback</b>.</p>`},
    { type:'num', h2:'Your turn — percentage reabsorbed', q:'The kidneys filter <b>125 cm³</b> of fluid per minute and produce <b>1.0 cm³</b> of urine per minute. Calculate the <b>percentage of the filtrate reabsorbed</b>. Give your answer to <b>1 decimal place</b>.',
      unit:'%', answer:99.2, tol:0.1, hint:'Reabsorbed = 125 − 1.0 = 124. Then (124 ÷ 125) × 100.' },
    { type:'sort', h2:'Where in the nephron?', prompt:'Tap a process, then tap where it happens.',
      bins:['🔵 Glomerulus','🟢 Proximal convoluted tubule','🟣 Collecting duct'],
      data:[['High hydrostatic pressure forces fluid out of the blood','a'],['Plasma proteins are held back by the basement membrane','a'],['Glucose reabsorbed by co-transport with sodium ions','b'],['Cells with microvilli and many mitochondria','b'],['ADH increases permeability by inserting aquaporins','c'],['Water is reabsorbed down the medullary gradient','c']] },
    { type:'teach', tag:'Topic 5 · The nervous system', h2:'Nerve impulses and synapses',
      html:`      <p><b>Resting potential (−70 mV):</b> the <b>Na⁺/K⁺ pump</b> moves 3 Na⁺ out for every 2 K⁺ in, and the membrane is far more permeable to K⁺.</p>
      <p><b>Action potential:</b> at the <b>threshold</b>, voltage-gated <b>Na⁺ channels open</b> and the membrane <b>depolarises</b> to about +40 mV; Na⁺ channels close, <b>K⁺ channels open</b>, and the membrane <b>repolarises</b>, with a brief hyperpolarisation. It is <b>all-or-nothing</b>; the <b>refractory period</b> ensures one-way conduction and sets the maximum firing frequency; a stronger stimulus gives a <b>higher frequency</b> of impulses, not a bigger one.</p>
      <p><b>Saltatory conduction:</b> myelin insulates the axon, so depolarisation occurs only at the <b>nodes of Ranvier</b> and the impulse <b>jumps</b> between them — much faster. Speed also rises with <b>axon diameter</b> and <b>temperature</b>.</p>
      <p><b>Synapse:</b> Ca²⁺ enters the pre-synaptic knob → vesicles of <b>acetylcholine</b> fuse with the membrane and release it → it diffuses across and binds receptors → Na⁺ channels open in the post-synaptic membrane → threshold reached. <b>Acetylcholinesterase</b> then hydrolyses the neurotransmitter, so the synapse is not permanently switched on.</p>`},
    { type:'num', h2:'Your turn — conduction velocity', q:'An impulse travels <b>0.90 m</b> along a myelinated axon in <b>0.015 s</b>. Calculate the conduction velocity.',
      unit:'m s⁻¹', answer:60, tol:0.5, hint:'speed = distance ÷ time = 0.90 ÷ 0.015.' },
    { type:'teach', tag:'Option A · Immunology and Disease', h2:'Option A — Immunology and Disease',
      html:`      <p><b>Disease:</b> pathogens include bacteria (TB, cholera), viruses (HIV, influenza), fungi and protoctists (malaria — <i>Plasmodium</i>, carried by the female <i>Anopheles</i> mosquito). Disease may be <b>endemic</b> (always present), <b>epidemic</b> or <b>pandemic</b>.</p>
      <p><b>Antibiotics:</b> <b>bactericidal</b> antibiotics kill (penicillin prevents the cross-linking of murein, so the wall fails and the cell bursts by osmosis); <b>bacteriostatic</b> ones inhibit growth. They do <b>not</b> work on viruses, which have no cell wall, no ribosomes of their own and no metabolism. <b>Resistance</b> evolves by natural selection: a chance mutation (e.g. producing β-lactamase) is favoured by the selection pressure of the antibiotic, and the allele spreads — including <b>horizontally, on plasmids</b>, between species.</p>
      <p><b>Immune response:</b> non-specific defences (barriers, inflammation, <b>phagocytosis</b>) and then the specific response — the <b>cell-mediated</b> response (T helper, T killer and T memory cells) and the <b>humoral</b> response (B plasma cells secreting antibodies; B memory cells giving a <b>faster, larger secondary response</b>). <b>Vaccination</b> creates that memory without the illness, and high uptake gives <b>herd immunity</b>.</p>`},
    { type:'teach', tag:'Option B · Human Musculoskeletal Anatomy', h2:'Option B — Human Musculoskeletal Anatomy',
      html:`      <p><b>Skeletal tissues:</b> <b>compact bone</b> is built from <b>Haversian systems (osteons)</b> — concentric lamellae of mineralised matrix around a central canal carrying blood vessels, with <b>osteocytes</b> in lacunae connected by canaliculi. <b>Cartilage</b> (hyaline, at joint surfaces) has chondrocytes in a firm but flexible matrix and no blood supply — which is why it heals so poorly.</p>
      <p><b>The skeleton:</b> the <b>axial</b> skeleton (skull, vertebral column, ribs, sternum) protects and supports; the <b>appendicular</b> skeleton (limbs and girdles) provides for movement. Its functions are <b>support, protection, movement</b> (a system of levers), <b>mineral storage</b> (calcium and phosphate) and <b>blood cell production</b> in the red marrow.</p>
      <p><b>Joints:</b> a <b>synovial</b> joint has articular cartilage, a synovial membrane secreting synovial fluid, and a fibrous capsule. <b>Ligaments</b> (bone to bone) are slightly elastic; <b>tendons</b> (muscle to bone) are inelastic, so the whole contraction is transmitted. Muscles work in <b>antagonistic pairs</b> (biceps = flexor, triceps = extensor), because muscles can only pull.</p>
      <p class="note"><b>Contraction:</b> the <b>sliding filament</b> mechanism — Ca²⁺ → troponin → tropomyosin moves → cross-bridges → power stroke → ATP detaches and re-cocks the myosin head. <b>Osteoporosis</b> (loss of bone density) and <b>osteoarthritis</b> (degeneration of the articular cartilage) are the conditions to know.</p>`},
    { type:'teach', tag:'Option C · Neurobiology and Behaviour', h2:'Option C — Neurobiology and Behaviour',
      html:`      <p><b>The brain:</b> the <b>cerebrum</b> (conscious thought, memory, language, voluntary movement, sensory processing — with its motor and sensory areas mapped as the homunculus); the <b>cerebellum</b> (balance, posture, fine coordination); the <b>hypothalamus</b> (homeostasis, and control of the pituitary); the <b>medulla oblongata</b> (heart rate, breathing, blood pressure).</p>
      <p><b>Imaging:</b> <b>CT</b> and <b>MRI</b> show <b>structure</b> (MRI without ionising radiation); <b>fMRI</b> and <b>PET</b> show <b>function</b> — which regions are active during a task, by tracking blood oxygenation or a radioactive tracer.</p>
      <p><b>Neuroscience:</b> synaptic transmission and neurotransmitters; <b>plasticity</b> — connections that are used are strengthened and those that are not are pruned, which is why the <b>critical period</b> in visual development matters so much.</p>
      <p><b>Behaviour:</b> <b>innate</b> behaviour is inherited, stereotyped and needs no learning — a <b>taxis</b> is a directional response (a woodlouse moving away from light is negative phototaxis), while a <b>kinesis</b> is a non-directional change in the <b>rate</b> of movement or turning (a woodlouse moves faster and turns less in dry air, so by chance it spends more time in damp air). <b>Learned</b> behaviour includes <b>habituation</b> (a declining response to a repeated harmless stimulus — which saves energy), <b>imprinting</b>, <b>classical</b> and <b>operant conditioning</b>, and <b>insight</b> learning.</p>`},
    { type:'match', h2:'Which option covers this?', prompt:'Tap a topic on the left, then the Eduqas option it belongs to.',
      headL:'Topic', headR:'Option',
      pairs:[
        {l:'Antibiotic resistance and the humoral immune response', r:'Option A — Immunology and Disease'},
        {l:'Haversian systems, synovial joints and osteoporosis', r:'Option B — Human Musculoskeletal Anatomy'},
        {l:'fMRI, taxes and kineses, and habituation', r:'Option C — Neurobiology and Behaviour'},
        {l:'The nephron, ADH and osmoregulation', r:'Core Component 3 — assessed for everyone'}] },
    { type:'mcq', h2:'Taxis or kinesis?',
      q:'A woodlouse moves more rapidly and turns less often in dry conditions, so it tends to end up in damp places. What kind of response is this?',
      why:'The woodlouse is not moving TOWARDS or AWAY FROM anything — it is simply changing its RATE of movement and turning in response to how dry it is. That non-directional response is a kinesis. A taxis would be a directed movement, such as moving directly away from a light source.',
      opts:[['Positive taxis',0],['Negative taxis',0],['Kinesis',1],['Classical conditioning',0]] }
  ]
}

];
