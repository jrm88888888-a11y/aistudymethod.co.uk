/* SNAB Topics 1-4 — data for _build_alevel_bio.js */
const SPEC = 'Edexcel A-level Biology A (Salters-Nuffield) 9BN0';

module.exports = [

/* ============================ TOPIC 1 ============================ */
{
  key: 'biology-a-level-edexcel', slug: 'lifestyle-health-risk',
  title: 'Lifestyle, Health & Risk', emoji: '❤️',
  spec: SPEC + ' · Topic 1: Lifestyle, Health and Risk',
  desc: 'A-level Salters-Nuffield Biology mini-lesson on Topic 1 Lifestyle, Health and Risk: mass transport and water as a solvent, blood vessel structure, the cardiac cycle, atherosclerosis, the blood clotting cascade, risk factors for CVD, correlation versus causation, carbohydrates and lipids, energy budgets and treatments for CVD.',
  overview3: ['heart &amp; vessels', 'atherosclerosis', 'risk &amp; diet'],
  intro: 'SNAB Topic 1 uses <b>cardiovascular disease</b> as the context for the biology of <b>mass transport</b>, the <b>cardiac cycle</b>, <b>atherosclerosis</b> and <b>blood clotting</b>, and for the mathematics of <b>risk</b> — including the difference between a correlation and a cause.',
  sortDone: 'Arteries carry blood at high pressure; veins rely on valves; capillaries are the exchange vessels.',
  matchDone: 'The clotting cascade is a chain of activations, and atheroma begins with endothelial damage.',
  recap: [
    '<b>Mass transport:</b> large, active animals have too small a SA:V ratio for diffusion alone, so they need a heart and a closed double circulation.',
    '<b>Water:</b> polar, so a superb solvent for ions, glucose and amino acids; high specific heat capacity buffers body temperature.',
    '<b>Cardiac cycle:</b> atrial systole → ventricular systole → diastole; valves open and close because of <b>pressure differences</b>.',
    '<b>Atherosclerosis:</b> endothelial damage → inflammation → LDL and macrophages → atheroma → plaque → narrowed lumen → raised blood pressure.',
    '<b>Clotting:</b> thromboplastin → prothrombin to thrombin → soluble fibrinogen to insoluble fibrin.',
    '<b>Risk:</b> relative risk = risk in exposed ÷ risk in unexposed. Correlation is <b>not</b> causation.',
    '<b>Diet:</b> monosaccharides, disaccharides (glycosidic bonds), triglycerides (ester bonds), saturated vs unsaturated; energy balance decides mass change.'
  ],
  recapTail: 'You have covered the whole of SNAB Topic 1. Press <b>Finish</b> to see your score.',
  screens: [
    { type:'teach', tag:'Mass transport · 1.1–1.2', h2:'Why big animals need a heart',
      html:`      <p>As an organism gets bigger its <b>surface area : volume ratio falls</b>, and its diffusion distances rise. Diffusion alone is far too slow to supply the metabolic demand of a mammal, so a <span class="hl k">mass transport system</span> is required: a muscular pump (the heart) moving a fluid (blood) through vessels.</p>
      <p>Mammals have a <b>closed double circulation</b>: blood passes through the heart <b>twice</b> per circuit. The <b>pulmonary</b> circuit is low-pressure (protecting the delicate alveolar capillaries); the <b>systemic</b> circuit is high-pressure, so blood reaches every tissue quickly.</p>
      <p class="note"><b>Water as the transport medium (1.2):</b> water is a <b>polar</b> molecule and forms hydrogen bonds, which makes it an excellent <b>solvent</b> for ions, glucose, amino acids and urea. Its <b>high specific heat capacity</b> means blood can absorb metabolic heat without a large temperature change, and its <b>cohesion</b> gives it the properties needed to flow through vessels as a continuous column.</p>`},
    { type:'teach', tag:'Blood vessels · 1.3', h2:'Arteries, veins and capillaries',
      html:`      <ul>
        <li><b>Artery</b> — thick wall, narrow lumen, a lot of <b>elastic tissue</b> and <b>smooth muscle</b>. Elastic recoil during diastole smooths the pulse and maintains flow.</li>
        <li><b>Vein</b> — thin wall, wide lumen, very little muscle or elastic tissue; blood is at <b>low pressure</b>, so <b>semilunar valves</b> and the squeezing action of skeletal muscle prevent backflow.</li>
        <li><b>Capillary</b> — one cell thick (<b>squamous endothelium</b>), giving a very short diffusion distance; huge total surface area; narrow lumen slows the red blood cells so exchange has time to happen.</li>
      </ul>
      <p class="note"><b>Exam framing:</b> never say "the artery has thick walls to carry blood" — say <b>why</b>: the thick, elastic wall <b>withstands and smooths</b> the high pressure surges produced by ventricular systole.</p>`},
    { type:'sort', h2:'Which vessel?', prompt:'Tap a feature, then tap the vessel it belongs to.',
      bins:['🩸 Artery','🫀 Vein','🔬 Capillary'],
      data:[['Thick layer of elastic tissue','a'],['Elastic recoil smooths the pulse','a'],['Narrow lumen, high pressure','a'],['Semilunar valves prevent backflow','b'],['Wide lumen, blood at low pressure','b'],['Wall one endothelial cell thick','c'],['Site of exchange with tissue fluid','c']] },
    { type:'teach', tag:'Cardiac cycle · 1.4', h2:'The cardiac cycle',
      html:`      <p>One cycle has three stages, and <b>every valve movement is caused by a pressure difference</b>:</p>
      <ul>
        <li><b>Atrial systole</b> — atria contract, pushing the last ~20&nbsp;% of blood through the open <b>atrioventricular (AV) valves</b> into the ventricles.</li>
        <li><b>Ventricular systole</b> — ventricles contract. Ventricular pressure rises above atrial pressure, so the <b>AV valves shut</b> (first heart sound). When ventricular pressure exceeds aortic/pulmonary artery pressure the <b>semilunar valves open</b> and blood is ejected.</li>
        <li><b>Diastole</b> — all chambers relax. Ventricular pressure falls below arterial pressure, so the <b>semilunar valves shut</b> (second heart sound); pressure then falls below atrial pressure and the AV valves reopen.</li>
      </ul>
      <div class="eqn">heart rate (bpm) = 60 ÷ length of one cardiac cycle (s)<small>the left ventricle wall is thickest because it must generate enough pressure for the whole systemic circuit</small></div>`},
    { type:'num', h2:'Your turn — heart rate from the cycle', q:'A pressure trace shows that one complete cardiac cycle lasts <b>0.80 s</b>. Calculate the heart rate in beats per minute.',
      unit:'bpm', answer:75, tol:0.5, hint:'60 ÷ 0.80.' },
    { type:'mcq', h2:'Why does the AV valve close?',
      q:'During ventricular systole, what causes the atrioventricular valve to snap shut?',
      why:'Valves are passive. The AV valve closes the instant ventricular pressure rises above atrial pressure — the pressure difference forces the cusps together. Nothing "pulls" them shut.',
      opts:[['The atrial muscle contracts and pulls it closed',0],['Ventricular pressure rises above atrial pressure',1],['The semilunar valve opens first and drags it shut',0],['The tendinous cords contract',0]] },
    { type:'teach', tag:'Atherosclerosis · 1.5', h2:'How an atheroma forms',
      html:`      <p>Atherosclerosis is a <b>sequence</b>, and the exam wants the sequence in order:</p>
      <ul>
        <li><b>Endothelial damage</b> — from high blood pressure, toxins in cigarette smoke, or high blood glucose.</li>
        <li><b>Inflammatory response</b> — white blood cells (chiefly <b>macrophages</b>) move into the artery wall.</li>
        <li>They accumulate <b>cholesterol from LDLs</b>, becoming foam cells; together with lipids and connective tissue this builds an <span class="hl t">atheroma</span>.</li>
        <li>Calcium salts and fibrous tissue harden it into a <b>plaque</b>. The lumen <b>narrows</b>, so blood pressure rises — which causes more endothelial damage. A <b>positive feedback</b> loop.</li>
        <li>A ruptured plaque triggers a <b>thrombus</b> (clot). In a coronary artery this causes a <b>myocardial infarction</b>; in the brain, a <b>stroke</b>.</li>
      </ul>`},
    { type:'teach', tag:'Blood clotting · 1.6', h2:'The clotting cascade',
      html:`      <p>Clotting is a <b>cascade</b> — each step activates the next, which amplifies the response:</p>
      <div class="eqn">thromboplastin released<br>prothrombin → thrombin<br>fibrinogen → fibrin<small>thromboplastin (from damaged tissue and platelets) activates the conversion of prothrombin to the enzyme thrombin; thrombin then catalyses the conversion of soluble fibrinogen into insoluble fibrin</small></div>
      <p>Ca²⁺ ions and vitamin K are required. The fibrin mesh traps red blood cells to form the clot. <b>Fibrin is insoluble; fibrinogen is soluble</b> — that one word is worth a mark.</p>`},
    { type:'match', h2:'Clotting and atheroma — match them up', prompt:'Tap a description on the left, then its term on the right.',
      headL:'Description', headR:'Term',
      pairs:[
        {l:'Enzyme that converts fibrinogen into fibrin', r:'Thrombin'},
        {l:'Soluble plasma protein that becomes the clot mesh', r:'Fibrinogen'},
        {l:'Fatty deposit of macrophages, lipids and cholesterol in the artery wall', r:'Atheroma'},
        {l:'The first event in atherosclerosis', r:'Endothelial damage'}] },
    { type:'teach', tag:'Risk · 1.7–1.10', h2:'Risk factors and the maths of risk',
      html:`      <p>Risk factors for CVD include <b>genetics, age, sex, diet high in saturated fat and salt, high blood pressure, smoking and inactivity</b>. Some are modifiable; age, sex and genotype are not.</p>
      <div class="eqn">relative risk = risk in exposed group ÷ risk in unexposed group<small>a relative risk of 1 means no extra risk; 4 means four times the risk</small></div>
      <p><b>Evaluating studies (1.9):</b> ask about <b>sample size</b>, whether the groups were <b>matched</b> for confounding variables, whether it was a <b>cohort</b> (forward-looking) or <b>case–control</b> study, how long it ran, and who funded it.</p>
      <p class="note"><b>Correlation ≠ causation.</b> A correlation only becomes evidence of cause when there is a <b>plausible mechanism</b>, a <b>dose–response</b> relationship, the cause <b>precedes</b> the effect, and the result is <b>reproducible</b>. People also misperceive risk: they overestimate risks that are unfamiliar, dramatic or outside their control.</p>`},
    { type:'num', h2:'Your turn — relative risk', q:'In a cohort study, <b>40 in every 1000</b> smokers developed CVD; in non-smokers the figure was <b>10 in every 1000</b>. Calculate the <b>relative risk</b> of CVD for smokers.',
      unit:'× (no units)', answer:4, tol:0.05, hint:'(40/1000) ÷ (10/1000).' },
    { type:'mcq', h2:'Reading a study',
      q:'A newspaper reports that people who drink coffee have a lower rate of CVD. Which statement is the best scientific evaluation?',
      why:'An observational correlation cannot establish cause: coffee drinkers may differ in diet, exercise or income (confounding variables). You would need a plausible mechanism, a dose–response relationship and controlled, reproducible data.',
      opts:[['Coffee must therefore prevent CVD',0],['The correlation may be caused by confounding variables, so cause is not established',1],['Coffee causes CVD, because correlation is reversible',0],['The study is worthless because it is observational',0]] },
    { type:'teach', tag:'Biological molecules · 1.12–1.14', h2:'Carbohydrates and lipids',
      html:`      <p><b>Carbohydrates.</b> <b>Monosaccharides</b> (glucose, fructose, galactose) join by a <b>condensation</b> reaction, forming a <span class="hl c">glycosidic bond</span> and releasing water. Two make a <b>disaccharide</b>: glucose + glucose → <b>maltose</b>; glucose + fructose → <b>sucrose</b>; glucose + galactose → <b>lactose</b>. Many make a <b>polysaccharide</b>.</p>
      <p><b>Lipids.</b> A <b>triglyceride</b> is one glycerol + three fatty acids, joined by three <b>condensation</b> reactions forming three <span class="hl y">ester bonds</span>.</p>
      <ul>
        <li><b>Saturated</b> fatty acids have <b>no C=C double bonds</b>: straight chains that pack closely, so they are solid at room temperature (mostly animal fats).</li>
        <li><b>Unsaturated</b> fatty acids have one or more <b>C=C double bonds</b>, producing kinks that stop close packing, so they are liquid oils (mostly plant).</li>
      </ul>
      <p class="note"><b>Cholesterol, HDL and LDL:</b> LDLs deliver cholesterol to tissues and, in excess, are taken up by the artery wall — a high LDL:HDL ratio is associated with atherosclerosis. HDLs carry cholesterol back to the liver.</p>`},
    { type:'num', h2:'Your turn — energy budget', q:'An athlete takes in <b>11 200 kJ</b> of energy in a day and expends <b>9 800 kJ</b>. Calculate the <b>energy surplus</b> for that day.',
      unit:'kJ', answer:1400, tol:1, hint:'surplus = intake − expenditure = 11 200 − 9 800.' },
    { type:'num', h2:'Your turn — BMI', q:'A patient has a mass of <b>84 kg</b> and a height of <b>1.75 m</b>. Calculate their body mass index (BMI = mass ÷ height²). Give your answer to <b>1 decimal place</b>.',
      unit:'kg m⁻²', answer:27.4, tol:0.15, hint:'1.75² = 3.0625, then 84 ÷ 3.0625.' },
    { type:'mcq', h2:'Bond check',
      q:'Which bond is formed when glycerol reacts with a fatty acid?',
      why:'Triglycerides form by condensation between the –OH of glycerol and the –COOH of a fatty acid, making an ester bond and releasing water. Glycosidic bonds join sugars; peptide bonds join amino acids.',
      opts:[['Glycosidic bond',0],['Peptide bond',0],['Ester bond',1],['Hydrogen bond',0]] },
    { type:'teach', tag:'Treatments · 1.16–1.18', h2:'Treating cardiovascular disease',
      html:`      <ul>
        <li><b>Antihypertensives</b> — lower blood pressure, reducing endothelial damage. Side effects: dizziness, fainting.</li>
        <li><b>Statins</b> — inhibit the enzyme that makes cholesterol in the liver, lowering LDL. Side effects: muscle pain, liver damage in a minority.</li>
        <li><b>Anticoagulants</b> (e.g. warfarin) — reduce clot formation, but risk uncontrolled bleeding.</li>
        <li><b>Platelet inhibitors</b> (e.g. low-dose aspirin) — reduce platelet aggregation; risk of stomach ulcers.</li>
      </ul>
      <p class="note"><b>Core practical 1</b> investigates the vitamin C content of fruit juice by titration with DCPIP. <b>Core practical 2</b> investigates the effect of caffeine on the heart rate of <i>Daphnia</i> — which raises the <b>ethical</b> question of whether invertebrates may be used in this way.</p>`},
    { type:'mcq', h2:'Choosing a treatment',
      q:'Which treatment lowers blood LDL cholesterol by inhibiting an enzyme in the liver?',
      why:'Statins inhibit HMG-CoA reductase, the enzyme catalysing a key step in cholesterol synthesis in the liver, so blood LDL falls. Anticoagulants act on the clotting cascade; antihypertensives lower blood pressure.',
      opts:[['Anticoagulant',0],['Statin',1],['Antihypertensive',0],['Platelet inhibitor',0]] }
  ]
},

/* ============================ TOPIC 2 ============================ */
{
  key: 'biology-a-level-edexcel', slug: 'genes-health',
  title: 'Genes &amp; Health', emoji: '🧬',
  spec: SPEC + ' · Topic 2: Genes and Health',
  desc: 'A-level Salters-Nuffield Biology mini-lesson on Topic 2 Genes and Health: gas exchange surfaces and Fick’s law, membrane structure and transport, DNA and RNA, transcription and translation, the genetic code, protein structure, enzyme action, DNA replication and Meselson–Stahl, mutation, cystic fibrosis, inheritance, the chi-squared test and genetic screening.',
  overview3: ['exchange &amp; membranes', 'DNA → protein', 'cystic fibrosis'],
  intro: 'SNAB Topic 2 uses <b>cystic fibrosis</b> to drive a tour of the molecular basis of life: <b>gas exchange</b> and <b>Fick&rsquo;s law</b>, the <b>fluid-mosaic membrane</b>, <b>DNA → RNA → protein</b>, <b>enzymes</b>, <b>mutation</b>, <b>inheritance</b> and <b>genetic screening</b>.',
  sortDone: 'Passive processes follow the gradient; active transport and endo/exocytosis need ATP.',
  matchDone: 'Transcription happens in the nucleus, translation on ribosomes — and the code is read in triplets.',
  recap: [
    '<b>Fick’s law:</b> rate of diffusion ∝ (surface area × concentration difference) ÷ diffusion distance.',
    '<b>Membrane:</b> fluid-mosaic — phospholipid bilayer with intrinsic and extrinsic proteins, cholesterol, glycoproteins and glycolipids.',
    '<b>Transport:</b> diffusion and facilitated diffusion (channel/carrier proteins) are passive; active transport, endocytosis and exocytosis need ATP.',
    '<b>DNA:</b> antiparallel double helix; A–T (2 H-bonds), C–G (3 H-bonds); replication is <b>semi-conservative</b> (Meselson &amp; Stahl).',
    '<b>Protein synthesis:</b> transcription (RNA polymerase, template/antisense strand) → mRNA → translation (ribosome, tRNA anticodon, peptide bond).',
    '<b>Genetic code:</b> triplet, non-overlapping, degenerate, (near-)universal.',
    '<b>CFTR:</b> a chloride channel. The Δ508 deletion loses one amino acid, so the protein misfolds and mucus becomes thick and sticky.',
    '<b>Genetics:</b> CF is autosomal recessive — two carriers have a 1 in 4 chance of an affected child. Test observed vs expected ratios with χ².'
  ],
  recapTail: 'You have covered the whole of SNAB Topic 2. Press <b>Finish</b> to see your score.',
  screens: [
    { type:'teach', tag:'Gas exchange · 2.1', h2:'Fick&rsquo;s law and the mammalian lung',
      html:`      <p>Every good gas exchange surface shares three properties: a <b>large surface area</b>, a <b>thin</b> exchange surface (short diffusion distance) and a <b>steep concentration difference</b> maintained by ventilation and blood flow.</p>
      <div class="eqn">rate of diffusion ∝ (surface area × concentration difference) ÷ diffusion distance<small>Fick&rsquo;s law — memorise it as a proportionality, not an equals sign</small></div>
      <p>In the lung, roughly 300–500 million <b>alveoli</b> provide a surface area of about 70&nbsp;m². The barrier is just <b>two squamous cells thick</b> (alveolar epithelium + capillary endothelium), under 1&nbsp;µm. Ventilation replaces alveolar air and the dense capillary network carries oxygenated blood away, so the concentration gradient is <b>maintained</b>.</p>`},
    { type:'num', h2:'Your turn — Fick&rsquo;s law', q:'In a diseased lung the total alveolar surface area <b>doubles</b> after treatment while the diffusion distance is <b>halved</b>. Assuming the concentration difference is unchanged, by what factor does the rate of diffusion increase?',
      unit:'× faster', answer:4, tol:0.05, hint:'Rate ∝ SA ÷ distance, so the factor is 2 ÷ 0.5.' },
    { type:'teach', tag:'Membranes · 2.2–2.4', h2:'The fluid-mosaic membrane and transport',
      html:`      <p>The <span class="hl k">fluid-mosaic model</span> (Singer &amp; Nicolson): a <b>phospholipid bilayer</b> — hydrophilic phosphate heads out, hydrophobic fatty-acid tails in — studded with proteins. <b>Cholesterol</b> sits between the tails, regulating fluidity. <b>Glycoproteins</b> and <b>glycolipids</b> act in cell recognition. It is a <b>model</b>: an interpretation of freeze-fracture and labelling data, not a photograph.</p>
      <ul>
        <li><b>Simple diffusion</b> — small, non-polar molecules (O₂, CO₂) pass straight through the bilayer, down the gradient. Passive.</li>
        <li><b>Facilitated diffusion</b> — polar molecules and ions pass through <b>channel</b> or <b>carrier</b> proteins, down the gradient. Passive.</li>
        <li><b>Osmosis</b> — net movement of free water molecules through a partially permeable membrane, from a less negative to a more negative water potential.</li>
        <li><b>Active transport</b> — a carrier protein moves a substance <b>against</b> its gradient, using <b>ATP</b>.</li>
        <li><b>Endocytosis / exocytosis</b> — bulk transport in vesicles; both require ATP.</li>
      </ul>
      <p class="note"><b>Core practical 3:</b> investigate membrane permeability using beetroot. Heat or ethanol disrupts the bilayer and denatures membrane proteins, so red betalain pigment leaks out — measured with a <b>colorimeter</b>.</p>`},
    { type:'sort', h2:'Does it need ATP?', prompt:'Tap a process, then tap the correct group.',
      bins:['➡️ Passive (down gradient)','⚡ Active (needs ATP)','🌊 Water only'],
      data:[['Simple diffusion of oxygen','a'],['Facilitated diffusion through a channel protein','a'],['Na⁺/K⁺ pump moving ions against the gradient','b'],['Endocytosis of a large particle','b'],['Exocytosis of a secreted protein','b'],['Osmosis through a partially permeable membrane','c']] },
    { type:'teach', tag:'Nucleic acids · 2.5', h2:'DNA and RNA structure',
      html:`      <p>A <b>mononucleotide</b> = a pentose sugar (deoxyribose or ribose) + a phosphate group + a nitrogenous base. Nucleotides join by <b>condensation</b> to give a sugar–phosphate backbone linked by <b>phosphodiester bonds</b>.</p>
      <ul>
        <li>DNA is a <b>double helix</b> of two <b>antiparallel</b> strands (5&prime;→3&prime; and 3&prime;→5&prime;).</li>
        <li><b>Complementary base pairing:</b> A–T (<b>two</b> hydrogen bonds), C–G (<b>three</b> hydrogen bonds). A purine always pairs with a pyrimidine, keeping the helix a constant width.</li>
        <li>RNA is <b>single-stranded</b>, has <b>ribose</b>, and uses <b>uracil</b> in place of thymine.</li>
      </ul>
      <p class="note">Many hydrogen bonds together make DNA <b>stable</b>, yet each one is individually weak — so the strands can be <b>separated</b> for replication and transcription. That is the whole trick of the molecule.</p>`},
    { type:'teach', tag:'Protein synthesis · 2.6–2.7', h2:'Transcription, translation and the code',
      html:`      <p><b>Transcription (in the nucleus):</b> DNA helicase unwinds the helix; <b>RNA polymerase</b> reads the <b>template (antisense) strand</b> 3&prime;→5&prime; and builds a complementary <b>mRNA</b> molecule. The <b>coding (sense) strand</b> has the same base sequence as the mRNA, but with T instead of U.</p>
      <p><b>Translation (on a ribosome):</b> mRNA binds to the ribosome; a <b>tRNA</b> with the complementary <b>anticodon</b> brings the amino acid specified by each <b>codon</b>. The ribosome catalyses formation of a <b>peptide bond</b> and moves on one codon, until it reaches a <b>stop codon</b>.</p>
      <div class="eqn">DNA → (transcription) → mRNA → (translation) → polypeptide<small>the genetic code is a TRIPLET code: 3 bases = 1 amino acid</small></div>
      <p>The code is <b>triplet</b>, <b>non-overlapping</b>, <b>degenerate</b> (most amino acids have more than one codon — so some substitutions are silent) and effectively <b>universal</b>, which is why genes can be transferred between species.</p>`},
    { type:'num', h2:'Your turn — from bases to amino acids', q:'A polypeptide is <b>146 amino acids</b> long. Calculate the minimum number of <b>DNA bases</b> in the coding sequence needed to specify it (ignore the stop codon).',
      unit:'bases', answer:438, tol:0.5, hint:'The code is a triplet code: 146 × 3.' },
    { type:'match', h2:'Match the molecular players', prompt:'Tap a job on the left, then the molecule that does it.',
      headL:'Job', headR:'Molecule / structure',
      pairs:[
        {l:'Builds mRNA from the DNA template strand', r:'RNA polymerase'},
        {l:'Carries a specific amino acid and has an anticodon', r:'tRNA'},
        {l:'Catalyses the formation of peptide bonds', r:'Ribosome'},
        {l:'Unwinds the DNA double helix by breaking hydrogen bonds', r:'DNA helicase'}] },
    { type:'teach', tag:'Proteins · 2.9', h2:'Protein structure — four levels',
      html:`      <p>An amino acid has a central carbon bonded to an <b>amine group (–NH₂)</b>, a <b>carboxyl group (–COOH)</b>, a hydrogen and a variable <b>R group</b>. Amino acids join by <b>condensation</b>, forming a <span class="hl el">peptide bond</span>.</p>
      <ul>
        <li><b>Primary</b> — the sequence of amino acids. This is coded for by the gene and <b>determines every level above it</b>.</li>
        <li><b>Secondary</b> — <b>α-helix</b> or <b>β-pleated sheet</b>, held by <b>hydrogen bonds</b> between the C=O and N–H of the backbone.</li>
        <li><b>Tertiary</b> — the overall 3-D fold, held by <b>hydrogen bonds, ionic bonds, disulfide bridges</b> (between cysteine R groups) and <b>hydrophobic interactions</b>.</li>
        <li><b>Quaternary</b> — two or more polypeptides, e.g. haemoglobin&rsquo;s four chains plus four haem prosthetic groups.</li>
      </ul>
      <p class="note">Change <b>one</b> amino acid in the primary structure and the R-group interactions change, so the tertiary structure — and therefore the <b>function</b> — can be destroyed. That is exactly what happens in cystic fibrosis and sickle-cell anaemia.</p>`},
    { type:'teach', tag:'Enzymes · 2.10', h2:'Enzyme action and inhibition',
      html:`      <p>Enzymes are <b>globular proteins</b> that act as <b>biological catalysts</b>: they <b>lower the activation energy</b> of a reaction. The substrate binds the <b>active site</b>, whose shape is complementary to it, forming an <b>enzyme–substrate complex</b>.</p>
      <p>The modern model is <span class="hl c">induced fit</span>: the active site is <b>flexible</b> and moulds around the substrate as it binds, straining its bonds and so lowering the activation energy. Specificity comes from the <b>tertiary structure</b> of the active site.</p>
      <ul>
        <li><b>Competitive inhibition</b> — the inhibitor is a similar shape to the substrate and binds the <b>active site</b>. Its effect is <b>reduced by increasing substrate concentration</b>; V<sub>max</sub> is unchanged.</li>
        <li><b>Non-competitive inhibition</b> — the inhibitor binds elsewhere (an <b>allosteric site</b>), changing the active site&rsquo;s shape. Adding substrate does <b>not</b> reverse it; V<sub>max</sub> falls.</li>
      </ul>
      <p class="note"><b>Intracellular</b> enzymes (e.g. catalase) work inside cells; <b>extracellular</b> enzymes (e.g. amylase, trypsin) are secreted. <b>Core practical 4</b> investigates the effect of an enzyme concentration or an inhibitor on rate.</p>`},
    { type:'mcq', h2:'Which inhibitor?',
      q:'Adding much more substrate almost completely restores the reaction rate. What kind of inhibitor is present?',
      why:'A competitive inhibitor binds the active site itself, so it competes with substrate. Flooding the system with substrate makes it far more likely that substrate, not inhibitor, occupies the active site — so the rate is restored and Vmax is unchanged.',
      opts:[['Non-competitive inhibitor',0],['Competitive inhibitor',1],['Irreversible inhibitor',0],['Allosteric activator',0]] },
    { type:'teach', tag:'Replication &amp; mutation · 2.11–2.12', h2:'Semi-conservative replication and mutation',
      html:`      <p><b>DNA replication:</b> <b>DNA helicase</b> breaks the hydrogen bonds and unwinds the helix. Free DNA nucleotides pair with the exposed bases, and <b>DNA polymerase</b> catalyses phosphodiester bonds, working only <b>5&prime;→3&prime;</b> — so one strand is made continuously (leading) and the other in fragments (lagging), joined by <b>DNA ligase</b>.</p>
      <p><b>Meselson &amp; Stahl (1958)</b> grew <i>E. coli</i> in heavy ¹⁵N, then switched to ¹⁴N. After <b>one</b> generation all the DNA was of <b>intermediate</b> density (ruling out conservative replication); after <b>two</b> generations there was a 1:1 mix of intermediate and light DNA (ruling out dispersive). Only <b>semi-conservative</b> replication fits both results.</p>
      <p class="note"><b>Mutations</b> arise from errors in replication. A <b>substitution</b> may be silent (the code is degenerate), missense or nonsense. A <b>deletion</b> or <b>insertion</b> of a number of bases not divisible by three causes a <b>frameshift</b>, changing every codon downstream.</p>`},
    { type:'teach', tag:'Cystic fibrosis · 2.14', h2:'CF — one gene, many consequences',
      html:`      <p>The <b>CFTR</b> protein is a <b>chloride ion channel</b> in the cell-surface membrane of epithelial cells. The commonest mutation, <b>Δ508</b>, deletes three bases, so <b>one amino acid (phenylalanine) is missing</b>. The protein misfolds and is destroyed before it reaches the membrane.</p>
      <p>With no working channel, Cl⁻ is not secreted, so water does not follow by osmosis. The mucus layer becomes <b>thick and sticky</b>:</p>
      <ul>
        <li><b>Lungs</b> — mucus blocks the airways and traps bacteria: repeated infection and lung damage.</li>
        <li><b>Pancreas</b> — the duct is blocked, so digestive enzymes cannot reach the gut: poor digestion and weight gain.</li>
        <li><b>Reproductive system</b> — the vas deferens or cervix is blocked: reduced fertility.</li>
      </ul>`},
    { type:'num', h2:'Your turn — inheritance probability', q:'Both parents are unaffected <b>carriers</b> of cystic fibrosis (Ff × Ff). Calculate the <b>percentage probability</b> that a child of theirs has cystic fibrosis.',
      unit:'%', answer:25, tol:0.5, hint:'A Punnett square gives FF : Ff : Ff : ff — one in four is ff.' },
    { type:'num', h2:'Your turn — chi-squared', q:'A monohybrid cross predicts a <b>3:1</b> ratio. From 120 offspring, <b>84</b> were tall and <b>36</b> were short. Calculate χ² = Σ (O − E)² ÷ E. Give your answer to <b>1 decimal place</b>.',
      unit:'χ²', answer:1.6, tol:0.06, hint:'Expected = 90 and 30. (84−90)²/90 = 0.4; (36−30)²/30 = 1.2.' },
    { type:'mcq', h2:'Interpreting your χ²',
      q:'Your χ² value is 1.6. With 1 degree of freedom, the critical value at p = 0.05 is 3.84. What do you conclude?',
      why:'χ² (1.6) is LESS than the critical value (3.84), so the probability that the difference is due to chance is greater than 5 %. You accept the null hypothesis: there is no significant difference between observed and expected — the data fit the 3:1 ratio.',
      opts:[['The difference is significant; reject the null hypothesis',0],['χ² is below the critical value, so accept the null hypothesis — the data fit a 3:1 ratio',1],['The experiment must be repeated because χ² is positive',0],['Degrees of freedom = number of offspring, so the test is invalid',0]] },
    { type:'teach', tag:'Screening &amp; ethics · 2.15–2.16', h2:'Genetic screening',
      html:`      <p><b>Screening</b> identifies carriers or affected embryos. Methods include <b>amniocentesis</b> (~15–16 weeks, ~1&nbsp;% miscarriage risk), <b>chorionic villus sampling</b> (~11 weeks, slightly higher risk, but an earlier result) and <b>pre-implantation genetic diagnosis (PGD)</b> during IVF, which avoids the question of terminating a pregnancy but is expensive and involves discarding embryos.</p>
      <p class="note"><b>Issues to discuss, not just list:</b> reliability of the result and the impact of a false positive; whether a positive result creates pressure to terminate; confidentiality and possible discrimination by insurers or employers; and the slippery slope towards selecting for non-medical traits.</p>`}
  ]
},

/* ============================ TOPIC 3 ============================ */
{
  key: 'biology-a-level-edexcel', slug: 'voice-of-the-genome',
  title: 'Voice of the Genome', emoji: '🔬',
  spec: SPEC + ' · Topic 3: Voice of the Genome',
  desc: 'A-level Salters-Nuffield Biology mini-lesson on Topic 3 Voice of the Genome: eukaryotic and prokaryotic ultrastructure, the protein secretion pathway, gametes and fertilisation, the cell cycle and mitosis, meiosis and genetic variation, linkage and sex linkage, stem cells and pluripotency, differential gene expression, epigenetics and the organisation of cells into tissues and organs.',
  overview3: ['ultrastructure', 'mitosis &amp; meiosis', 'stem cells &amp; epigenetics'],
  intro: 'SNAB Topic 3 asks how one fertilised egg becomes a whole organism. You will cover <b>cell ultrastructure</b>, the <b>protein secretion pathway</b>, <b>fertilisation</b>, <b>mitosis</b> and <b>meiosis</b>, <b>stem cells</b>, and how <b>differential gene expression</b> and <b>epigenetics</b> make cells different from one another.',
  sortDone: 'Prokaryotes have 70S ribosomes and a peptidoglycan wall but no membrane-bound organelles.',
  matchDone: 'The secretory pathway runs: ribosome → rER → vesicle → Golgi → vesicle → membrane.',
  recap: [
    '<b>Eukaryotic ultrastructure:</b> nucleus, nucleolus, rER, sER, Golgi, mitochondria, lysosomes, ribosomes (80S), centrioles.',
    '<b>Prokaryotic ultrastructure:</b> circular DNA, plasmids, 70S ribosomes, peptidoglycan (murein) cell wall, capsule, flagellum — no membrane-bound organelles.',
    '<b>Secretion pathway:</b> ribosome on rER → vesicle → Golgi (modifies and packages) → vesicle → exocytosis.',
    '<b>Fertilisation:</b> acrosome reaction → digestion of the zona pellucida → fusion of membranes → cortical reaction blocks polyspermy → fusion of haploid nuclei.',
    '<b>Mitosis:</b> IPMAT; two genetically identical diploid daughter cells for growth and repair.',
    '<b>Meiosis:</b> two divisions; four haploid, genetically different cells. Variation from <b>crossing over</b> (prophase I) and <b>independent assortment</b> (metaphase I), plus random fertilisation.',
    '<b>Stem cells:</b> totipotent → pluripotent → multipotent. Cells specialise by <b>differential gene expression</b>.',
    '<b>Epigenetics:</b> DNA methylation switches genes off; histone acetylation switches them on. These marks can be inherited through cell division.'
  ],
  recapTail: 'You have covered the whole of SNAB Topic 3. Press <b>Finish</b> to see your score.',
  screens: [
    { type:'teach', tag:'Ultrastructure · 3.2–3.3', h2:'Eukaryotic cell ultrastructure',
      html:`      <ul>
        <li><b>Nucleus</b> — bounded by a double membrane (nuclear envelope) with <b>nuclear pores</b> that let mRNA out. Contains <b>chromatin</b>.</li>
        <li><b>Nucleolus</b> — makes <b>ribosomal RNA</b> and assembles ribosomes.</li>
        <li><b>Rough ER</b> — flattened membrane sacs studded with <b>ribosomes</b>; site of synthesis and transport of proteins destined for secretion.</li>
        <li><b>Smooth ER</b> — no ribosomes; makes <b>lipids and steroids</b>.</li>
        <li><b>Golgi apparatus</b> — <b>modifies</b> proteins (e.g. adds carbohydrate to make glycoproteins), <b>packages</b> them into vesicles and makes <b>lysosomes</b>.</li>
        <li><b>Mitochondrion</b> — double membrane; the inner one folded into <b>cristae</b> bearing ATP synthase; the <b>matrix</b> holds the Krebs-cycle enzymes.</li>
        <li><b>Lysosome</b> — vesicle of <b>hydrolytic enzymes</b>.</li>
        <li><b>Centrioles</b> — organise the spindle in animal cells.</li>
      </ul>
      <p class="note"><b>Resolution vs magnification.</b> A light microscope resolves ~200&nbsp;nm; a <b>transmission electron microscope</b> resolves ~0.1&nbsp;nm because the wavelength of an electron beam is far shorter than that of light. That is why ultrastructure needs an EM — magnification alone would just give a bigger blur.</p>`},
    { type:'num', h2:'Your turn — magnification', q:'A mitochondrion is <b>2 µm</b> long. In an electron micrograph the image measures <b>40 mm</b> long. Calculate the magnification. (1 mm = 1000 µm)',
      unit:'×', answer:20000, tol:5, hint:'Convert first: 40 mm = 40 000 µm. Magnification = image ÷ actual = 40 000 ÷ 2.' },
    { type:'num', h2:'Your turn — actual size', q:'A bacterium is drawn <b>15 mm</b> long at a magnification of <b>×5000</b>. Calculate its actual length in <b>micrometres</b>.',
      unit:'µm', answer:3, tol:0.1, hint:'actual = image ÷ magnification = 15 ÷ 5000 = 0.003 mm; × 1000 to convert to µm.' },
    { type:'teach', tag:'Secretion · 3.3', h2:'The protein secretion pathway',
      html:`      <p>Trace an extracellular enzyme from gene to outside the cell:</p>
      <div class="eqn">nucleus → ribosome on rER → vesicle → Golgi → vesicle → cell-surface membrane<small>the Golgi modifies and packages; exocytosis releases</small></div>
      <ul>
        <li>The gene is <b>transcribed</b> in the nucleus; mRNA leaves through a nuclear pore.</li>
        <li>The mRNA is <b>translated</b> on a ribosome bound to the <b>rough ER</b>; the polypeptide enters the ER lumen and begins to fold.</li>
        <li>A <b>vesicle</b> buds off the rER and fuses with the <b>Golgi apparatus</b>.</li>
        <li>The Golgi <b>modifies</b> the protein (e.g. glycosylation) and packages it into a <b>secretory vesicle</b>.</li>
        <li>The vesicle moves along the cytoskeleton and fuses with the cell-surface membrane: <b>exocytosis</b> (ATP-requiring).</li>
      </ul>`},
    { type:'match', h2:'Organelle → job', prompt:'Tap a job on the left, then the organelle that does it.',
      headL:'Job', headR:'Organelle',
      pairs:[
        {l:'Modifies and packages proteins into vesicles', r:'Golgi apparatus'},
        {l:'Assembles ribosomes and makes rRNA', r:'Nucleolus'},
        {l:'Contains hydrolytic enzymes to digest material', r:'Lysosome'},
        {l:'Inner membrane folded into cristae; site of oxidative phosphorylation', r:'Mitochondrion'}] },
    { type:'teach', tag:'Prokaryotes · 3.4', h2:'Prokaryotic ultrastructure',
      html:`      <p>A prokaryote has <b>no nucleus and no membrane-bound organelles</b>. It does have:</p>
      <ul>
        <li>a single <b>circular DNA molecule</b>, free in the cytoplasm (the nucleoid), and often <b>plasmids</b>;</li>
        <li><b>70S ribosomes</b> (smaller than the eukaryotic 80S — which is why some antibiotics can target bacterial ribosomes without harming ours);</li>
        <li>a <b>cell wall of peptidoglycan (murein)</b>, sometimes a protective <b>capsule</b>, and often a <b>flagellum</b> for movement;</li>
        <li><b>mesosomes</b> — infoldings of the membrane — and, of course, a cell-surface membrane and cytoplasm.</li>
      </ul>`},
    { type:'sort', h2:'Prokaryote, eukaryote, or both?', prompt:'Tap a feature, then tap the cell type it belongs to.',
      bins:['🦠 Prokaryote only','🧫 Eukaryote only','🔁 Both'],
      data:[['Circular DNA free in the cytoplasm','a'],['Peptidoglycan (murein) cell wall','a'],['70S ribosomes','a'],['Nucleus with a double membrane','b'],['Golgi apparatus','b'],['Mitochondria','b'],['Cell-surface membrane','c'],['Cytoplasm and DNA','c']] },
    { type:'teach', tag:'Gametes &amp; fertilisation · 3.6–3.7', h2:'Gametes and fertilisation',
      html:`      <p><b>Sperm:</b> an <b>acrosome</b> full of hydrolytic (protease) enzymes; many <b>mitochondria</b> in the midpiece to supply ATP for the <b>flagellum</b>; a haploid nucleus and very little cytoplasm.<br>
      <b>Egg:</b> large, packed with food reserves; a <b>zona pellucida</b> (glycoprotein coat); <b>cortical granules</b> just beneath the membrane.</p>
      <p><b>Fertilisation in mammals:</b></p>
      <ul>
        <li>The sperm binds the zona pellucida; the <b>acrosome reaction</b> releases enzymes that <b>digest a path</b> through it.</li>
        <li>The sperm and egg <b>membranes fuse</b>; the sperm nucleus enters.</li>
        <li>The <b>cortical reaction</b>: cortical granules fuse with the egg membrane and their contents thicken the zona pellucida, making it impenetrable — this <b>prevents polyspermy</b>.</li>
        <li>The two haploid nuclei fuse: a <b>diploid zygote</b>.</li>
      </ul>`},
    { type:'teach', tag:'Cell cycle · 3.10', h2:'The cell cycle and mitosis',
      html:`      <p><b>Interphase</b> is by far the longest stage: <b>G1</b> (growth, organelles replicated), <b>S</b> (DNA <b>replicated</b> — each chromosome becomes two sister chromatids), <b>G2</b> (growth and checking). Then <b>mitosis</b>, then <b>cytokinesis</b>.</p>
      <ul>
        <li><b>Prophase</b> — chromosomes condense and become visible; nuclear envelope breaks down; spindle forms.</li>
        <li><b>Metaphase</b> — chromosomes line up on the <b>equator</b>, attached to spindle fibres by their centromeres.</li>
        <li><b>Anaphase</b> — centromeres divide; <b>sister chromatids are pulled to opposite poles</b> (an ATP-requiring process).</li>
        <li><b>Telophase</b> — chromosomes decondense; two nuclear envelopes re-form.</li>
      </ul>
      <div class="eqn">mitotic index = (cells in mitosis ÷ total cells) × 100&nbsp;%<small>a high mitotic index in a tissue sample can indicate rapid growth — or a tumour</small></div>
      <p class="note"><b>Core practical 5:</b> prepare and stain a root tip squash to observe the stages of mitosis, then calculate the mitotic index.</p>`},
    { type:'num', h2:'Your turn — mitotic index', q:'In a stained root tip squash you count <b>240 cells</b>, of which <b>36</b> are visibly in a stage of mitosis. Calculate the <b>mitotic index</b> as a percentage.',
      unit:'%', answer:15, tol:0.3, hint:'(36 ÷ 240) × 100.' },
    { type:'teach', tag:'Meiosis · 3.8–3.9', h2:'Meiosis and the sources of variation',
      html:`      <p>Meiosis has <b>two</b> divisions and produces <b>four haploid, genetically different</b> cells. Two mechanisms generate that variation:</p>
      <ul>
        <li><b>Crossing over (prophase I)</b> — homologous chromosomes pair up as bivalents; <b>chiasmata</b> form and equivalent sections of non-sister chromatids are exchanged, creating <b>new combinations of alleles</b> on a chromosome.</li>
        <li><b>Independent assortment (metaphase I)</b> — each homologous pair lines up on the equator <b>independently</b> of every other pair. For <i>n</i> pairs there are <b>2<sup>n</sup></b> possible combinations in the gametes.</li>
      </ul>
      <p>Add <b>random fertilisation</b> and the number of possible offspring genotypes becomes astronomical.</p>
      <p class="note"><b>Loci, linkage and sex linkage:</b> a <b>locus</b> is the position of a gene on a chromosome. Genes on the <b>same</b> chromosome are <b>linked</b> and tend to be inherited together (only crossing over separates them), so they do not assort independently. Genes on the X chromosome are <b>sex-linked</b>: males (XY) have only one copy, so a recessive X-linked allele (e.g. haemophilia) is always expressed in them.</p>`},
    { type:'num', h2:'Your turn — independent assortment', q:'Humans have <b>23</b> pairs of homologous chromosomes. Considering <b>independent assortment alone</b>, calculate the number of genetically different gametes that could be produced (2<sup>n</sup>).',
      unit:'gametes', answer:8388608, tol:1, hint:'2²³. Note 2¹⁰ = 1024, so 2²⁰ = 1 048 576 — then multiply by 2³ = 8.' },
    { type:'mcq', h2:'Mitosis or meiosis?',
      q:'A cell divides to give four cells, each with half the chromosome number of the parent and each genetically different. Which process, and at which stage did most of the variation arise?',
      why:'Four haploid, genetically distinct cells means meiosis. Crossing over occurs in prophase I (chiasmata between non-sister chromatids of homologous pairs) and independent assortment occurs in metaphase I — both happen in the FIRST division.',
      opts:[['Mitosis; variation arose in anaphase',0],['Meiosis; variation arose in the first division (prophase I and metaphase I)',1],['Meiosis; variation arose only in the second division',0],['Mitosis; variation arose from DNA replication errors',0]] },
    { type:'teach', tag:'Stem cells · 3.11–3.12', h2:'Stem cells and differential gene expression',
      html:`      <p>A <b>stem cell</b> is undifferentiated and can divide repeatedly.</p>
      <ul>
        <li><b>Totipotent</b> — can form <b>any</b> cell type <b>plus the placenta</b> (the zygote and cells of the very early embryo).</li>
        <li><b>Pluripotent</b> — can form any cell type of the body, but not the placenta (embryonic stem cells).</li>
        <li><b>Multipotent</b> — a limited range (adult stem cells, e.g. bone marrow → blood cells).</li>
      </ul>
      <p>Every body cell contains the <b>same genome</b>. Cells differ because of <span class="hl el">differential gene expression</span>: only some genes are <b>transcribed</b> in any one cell. <b>Transcription factors</b> bind to the promoter region of a gene and switch it on (or off), so a liver cell and a neurone read different parts of the same instruction manual.</p>
      <p class="note"><b>The ethics are contested, and SNAB wants you to argue, not list:</b> embryonic stem cells are the most useful but their extraction destroys an embryo; induced pluripotent stem cells (iPSCs) sidestep that but carry a risk of tumour formation. Society uses regulation (e.g. the 14-day rule) to balance the benefits against the objections.</p>`},
    { type:'teach', tag:'Epigenetics · 3.14–3.15', h2:'Epigenetics and phenotype',
      html:`      <p>Phenotype = <b>genotype × environment</b>. Height, skin colour and body mass are <b>polygenic</b> (many genes, each of small effect) and strongly environment-dependent, giving <b>continuous</b> variation.</p>
      <p><span class="hl c">Epigenetic</span> changes alter gene <b>expression without changing the DNA base sequence</b>:</p>
      <ul>
        <li><b>DNA methylation</b> — methyl groups added to cytosine in a promoter region <b>prevent transcription</b>: the gene is switched <b>off</b>.</li>
        <li><b>Histone modification</b> — <b>acetylation</b> of histones loosens the DNA&rsquo;s grip on them, making the gene <b>more accessible</b> to RNA polymerase: switched <b>on</b>. Deacetylation condenses the chromatin and switches it off.</li>
      </ul>
      <p>Environmental factors (diet, stress, toxins) can add or remove these marks, and the marks can be <b>copied and passed on when the cell divides</b> — and in some cases across generations.</p>`},
    { type:'mcq', h2:'Switching a gene off',
      q:'A gene is not transcribed in a liver cell even though the DNA sequence is intact. Which epigenetic change best explains this?',
      why:'Methylation of cytosine bases in the promoter region prevents transcription factors and RNA polymerase from binding, so the gene is silenced — with no change to the base sequence. Histone acetylation would have the opposite effect (switching genes ON).',
      opts:[['Acetylation of histones in that region',0],['Methylation of the gene&rsquo;s promoter region',1],['A frameshift mutation in the gene',0],['Deletion of the gene from the chromosome',0]] },
    { type:'teach', tag:'Organisation · 3.13', h2:'Cells → tissues → organs → systems',
      html:`      <p>Differentiated cells are organised into a hierarchy:</p>
      <ul>
        <li><b>Tissue</b> — a group of similar cells with a shared function (e.g. squamous epithelium, cardiac muscle).</li>
        <li><b>Organ</b> — several tissues working together (the heart contains cardiac muscle, connective tissue, epithelium and nervous tissue).</li>
        <li><b>Organ system</b> — several organs (the circulatory system: heart, arteries, veins, capillaries).</li>
      </ul>
      <p class="note">Each level of organisation exists because it allows <b>division of labour</b>: specialised structures do one job extremely well, which a single generalist cell never could.</p>`}
  ]
},

/* ============================ TOPIC 4 ============================ */
{
  key: 'biology-a-level-edexcel', slug: 'biodiversity-natural-resources',
  title: 'Biodiversity &amp; Natural Resources', emoji: '🌿',
  spec: SPEC + ' · Topic 4: Biodiversity and Natural Resources',
  desc: 'A-level Salters-Nuffield Biology mini-lesson on Topic 4 Biodiversity and Natural Resources: biodiversity, endemism, the heterozygosity index and index of diversity, niche and adaptation, natural selection, the Hardy-Weinberg equation, classification and the three domains, plant cell ultrastructure, starch and cellulose, plant fibres, drug testing, bacterial growth and conservation by zoos and seed banks.',
  overview3: ['measuring biodiversity', 'selection &amp; classification', 'plants as a resource'],
  intro: 'SNAB Topic 4 is about the <b>variety of life</b> and how we <b>measure</b>, <b>classify</b>, <b>use</b> and <b>conserve</b> it. Expect real index calculations, the <b>Hardy&ndash;Weinberg equation</b>, plant cell ultrastructure, and the biology behind plant fibres and modern drug testing.',
  sortDone: 'Starch and cellulose are both glucose polymers — but α-glucose coils and β-glucose forms straight, strong chains.',
  matchDone: 'Species richness counts species; an index of diversity also weights their relative abundance.',
  recap: [
    '<b>Biodiversity:</b> measured as <b>species richness</b> (how many species), <b>genetic diversity</b> (heterozygosity index H) and an <b>index of diversity</b> D that also accounts for abundance.',
    '<b>D = N(N − 1) ÷ Σ n(n − 1)</b>, where N = total organisms and n = organisms of each species. A larger D means greater diversity.',
    '<b>Niche:</b> the role and position of a species in its habitat. Two species cannot occupy the same niche indefinitely.',
    '<b>Natural selection:</b> variation → selection pressure → differential survival and reproduction → change in <b>allele frequency</b>.',
    '<b>Hardy–Weinberg:</b> p + q = 1 and p² + 2pq + q² = 1. Assumes a large population, random mating, no migration, no mutation and no selection.',
    '<b>Classification:</b> domain, kingdom, phylum, class, order, family, genus, species. Three domains: Bacteria, Archaea, Eukarya (from rRNA evidence).',
    '<b>Plant cells:</b> cellulose cell wall, chloroplasts, amyloplasts, vacuole, plasmodesmata, middle lamella, pits.',
    '<b>Starch vs cellulose:</b> α-glucose (1,4 links, coiled, compact store) vs β-glucose (alternate residues flipped 180°, straight chains, H-bonded into microfibrils).'
  ],
  recapTail: 'You have covered the whole of SNAB Topic 4. Press <b>Finish</b> to see your score.',
  screens: [
    { type:'teach', tag:'Biodiversity · 4.1–4.2', h2:'Measuring biodiversity',
      html:`      <p><b>Biodiversity</b> can be considered at three levels: the diversity of <b>habitats</b>, the number of <b>species</b>, and the <b>genetic diversity within</b> a species. An <b>endemic</b> species is one found naturally in one geographical area and nowhere else — endemics are especially vulnerable to extinction.</p>
      <div class="eqn">H = number of heterozygotes ÷ number of individuals in the population<small>heterozygosity index — a measure of genetic diversity WITHIN a species</small></div>
      <div class="eqn">D = N(N − 1) ÷ Σ n(n − 1)<small>index of diversity — N is the total number of organisms of ALL species; n is the number of organisms of EACH species</small></div>
      <p><b>Species richness</b> is just a count of species. An index of diversity is better because it also takes <b>abundance</b> into account: a wood with 100 oaks and 1 birch is far less diverse than one with 50 of each, even though both have a richness of 2.</p>`},
    { type:'num', h2:'Your turn — heterozygosity index', q:'In a population of <b>200</b> individuals, <b>48</b> are heterozygous at a particular locus. Calculate the <b>heterozygosity index (H)</b>. Give your answer to <b>2 decimal places</b>.',
      unit:'H', answer:0.24, tol:0.01, hint:'H = 48 ÷ 200.' },
    { type:'num', h2:'Your turn — index of diversity', q:'A quadrat contains <b>12</b> of species A, <b>8</b> of species B and <b>5</b> of species C. Calculate the index of diversity D = N(N−1) ÷ Σ n(n−1). Give your answer to <b>2 decimal places</b>.',
      unit:'D', answer:2.88, tol:0.05, hint:'N = 25 so N(N−1) = 600. Σ n(n−1) = (12×11) + (8×7) + (5×4) = 132 + 56 + 20 = 208.' },
    { type:'teach', tag:'Niche &amp; adaptation · 4.3–4.4', h2:'Niche, adaptation and natural selection',
      html:`      <p>A <span class="hl k">niche</span> is the role and position a species has in its environment: what it eats, when it is active, what eats it, what it tolerates. If two species occupy the same niche, one will out-compete the other (competitive exclusion) — so coexisting species always differ somewhere.</p>
      <p>Adaptations come in three flavours:</p>
      <ul>
        <li><b>Anatomical</b> — e.g. the marram grass rolled leaf, sunken stomata and thick cuticle that reduce transpiration.</li>
        <li><b>Physiological</b> — e.g. the kangaroo rat producing extremely concentrated urine.</li>
        <li><b>Behavioural</b> — e.g. nocturnality to avoid daytime heat.</li>
      </ul>
      <p><b>Natural selection, in order:</b> (1) there is genetic <b>variation</b> caused by mutation; (2) a <b>selection pressure</b> acts; (3) individuals with the advantageous allele are <b>more likely to survive and reproduce</b>; (4) they pass the allele on, so the <b>allele frequency in the population increases</b>. Evolution <b>is</b> that change in allele frequency.</p>
      <p class="note"><b>Never</b> write that an organism "adapts to" or "wants to" survive. Individuals do not adapt; <b>populations evolve</b>, because some individuals already happened to carry a useful allele.</p>`},
    { type:'teach', tag:'Hardy–Weinberg · 4.5', h2:'The Hardy–Weinberg equation',
      html:`      <p>Hardy–Weinberg lets you calculate <b>allele and genotype frequencies</b> and, crucially, lets you test whether a population <b>is</b> evolving.</p>
      <div class="eqn">p + q = 1<br>p² + 2pq + q² = 1<small>p = frequency of the dominant allele · q = frequency of the recessive allele<br>p² = homozygous dominant · 2pq = heterozygous · q² = homozygous recessive</small></div>
      <p>You almost always start from <b>q²</b>, because the homozygous recessive is the only genotype you can identify from the phenotype alone.</p>
      <p class="note"><b>The assumptions matter:</b> a large population, random mating, no migration in or out, no mutation, and no selection. If the observed frequencies <b>differ</b> from the predicted ones, one of those conditions has been broken — the population is <b>evolving</b>. Reproductive isolation lets allele frequencies in two populations diverge, which is the first step towards <b>speciation</b>.</p>`},
    { type:'num', h2:'Your turn — Hardy–Weinberg', q:'A recessive genetic condition affects <b>1 in 2500</b> people. Use p² + 2pq + q² = 1 to calculate the <b>percentage of the population who are carriers</b> (heterozygous). Give your answer to <b>2 decimal places</b>.',
      unit:'%', answer:3.92, tol:0.06, hint:'q² = 1/2500 = 0.0004, so q = 0.02 and p = 0.98. Carriers = 2pq = 2 × 0.98 × 0.02.' },
    { type:'mcq', h2:'Testing the assumptions',
      q:'A population’s observed genotype frequencies differ significantly from those predicted by Hardy–Weinberg. What is the best conclusion?',
      why:'Hardy–Weinberg predicts the genotype frequencies of a population that is NOT evolving. A significant deviation means at least one assumption (large population, random mating, no migration, no mutation, no selection) is broken — i.e. allele frequencies are changing, so the population is evolving.',
      opts:[['The equation has been applied incorrectly and must be redone',0],['At least one assumption is broken — allele frequencies are changing, so the population is evolving',1],['The population must be at genetic equilibrium',0],['The population must contain no heterozygotes',0]] },
    { type:'teach', tag:'Classification · 4.6', h2:'Classification and the three domains',
      html:`      <p>Taxonomic hierarchy: <b>Domain, Kingdom, Phylum, Class, Order, Family, Genus, Species</b>. Each group is nested inside the one above, and each species has a <b>binomial</b> name (genus + species), e.g. <i>Homo sapiens</i>.</p>
      <p>Woese&rsquo;s comparison of <b>ribosomal RNA</b> sequences showed that the "bacteria" were really two profoundly different groups, so a level <b>above</b> kingdom was added — the <b>three domains</b>: <b>Bacteria</b>, <b>Archaea</b> and <b>Eukarya</b>.</p>
      <p class="note"><b>How science works:</b> the change was not accepted because Woese said so. It was accepted after the data were published, <b>peer reviewed</b>, presented at conferences, criticised, and independently <b>reproduced</b> using other molecular evidence (DNA sequences, protein sequences, immunology). That is the process SNAB wants you to describe.</p>`},
    { type:'teach', tag:'Plant cells · 4.7–4.10', h2:'Plant cell ultrastructure, starch and cellulose',
      html:`      <p>On top of the standard eukaryotic organelles, a plant cell has: a <b>cellulose cell wall</b> with a <b>middle lamella</b> (calcium pectate) gluing adjacent walls together, <b>pits</b> and <b>plasmodesmata</b> (cytoplasmic channels between cells), <b>chloroplasts</b> (grana of thylakoids in a stroma), <b>amyloplasts</b> (starch stores) and a large <b>vacuole</b> with a tonoplast.</p>
      <ul>
        <li><b>Starch</b> — a polymer of <b>α-glucose</b>. <b>Amylose</b> has 1,4-glycosidic bonds only and coils into a compact helix; <b>amylopectin</b> is branched (1,6 bonds), so it can be hydrolysed quickly. Insoluble, so it does not affect water potential — a perfect <b>store</b>.</li>
        <li><b>Cellulose</b> — a polymer of <b>β-glucose</b>. Alternate residues are <b>flipped 180°</b>, giving <b>straight, unbranched</b> chains. Many hydrogen bonds cross-link them into <b>microfibrils</b>, which are laid down in different directions to give enormous <b>tensile strength</b>.</li>
      </ul>
      <p class="note"><b>Core practical 6/7/8 territory:</b> the tensile strength of plant fibres; the effect of mineral deficiency (nitrate for amino acids and nucleotides, calcium for the middle lamella, magnesium for chlorophyll) on plant growth; and the antimicrobial properties of plant extracts.</p>`},
    { type:'sort', h2:'Starch or cellulose?', prompt:'Tap a statement, then tap where it belongs.',
      bins:['🥔 Starch only','🌾 Cellulose only','🔁 Both'],
      data:[['Polymer of α-glucose','a'],['Coiled/branched, compact energy store','a'],['Polymer of β-glucose','b'],['Alternate residues rotated 180°','b'],['Hydrogen-bonded into microfibrils for tensile strength','b'],['Joined by glycosidic bonds','c'],['Insoluble polysaccharide of glucose','c']] },
    { type:'match', h2:'Match the measure to its meaning', prompt:'Tap a definition on the left, then the correct term.',
      headL:'Definition', headR:'Term',
      pairs:[
        {l:'The number of different species in a habitat', r:'Species richness'},
        {l:'Found naturally in one area of the world and nowhere else', r:'Endemic'},
        {l:'Proportion of individuals heterozygous at a locus', r:'Heterozygosity index'},
        {l:'The role and position of a species within its habitat', r:'Niche'}] },
    { type:'teach', tag:'Drug testing · 4.13', h2:'From folklore to clinical trials',
      html:`      <p>Historically, drugs were tested by trial and error — William Withering used a <b>digitalis soup</b> from foxglove, adjusting the dose until it worked without killing the patient. Modern testing is far more rigorous:</p>
      <ul>
        <li><b>Pre-clinical</b> — the drug is tested on cells, tissues and then animals to check for basic toxicity and to establish a dose.</li>
        <li><b>Phase I</b> — a small number of healthy volunteers: is it <b>safe</b>?</li>
        <li><b>Phase II</b> — a larger group of patients: does it <b>work</b>, and at what dose?</li>
        <li><b>Phase III</b> — a very large, <b>randomised, double-blind, placebo-controlled</b> trial comparing it with the current best treatment.</li>
      </ul>
      <p class="note"><b>Double-blind</b> means neither the patient nor the doctor knows who has the drug — that removes both the placebo effect and unconscious bias in reporting outcomes.</p>`},
    { type:'num', h2:'Your turn — bacterial growth', q:'A single bacterium is placed on nutrient agar and divides every <b>20 minutes</b> under optimal conditions. Assuming no limiting factors, calculate how many bacteria there are after <b>3 hours</b>.',
      unit:'bacteria', answer:512, tol:0.5, hint:'3 hours = 180 min ÷ 20 = 9 divisions. Number = 2⁹.' },
    { type:'teach', tag:'Conservation · 4.14–4.16', h2:'Growing microbes and conserving species',
      html:`      <p><b>Bacterial growth (4.14)</b> requires nutrients (a carbon source, nitrogen, minerals), a suitable <b>temperature</b> and <b>pH</b>, and — for aerobes — oxygen. A culture shows a <b>lag phase</b> (enzymes being made), an <b>exponential (log) phase</b>, a <b>stationary phase</b> (nutrients running out, waste accumulating) and a <b>death phase</b>. <b>Aseptic technique</b> keeps the culture pure. <b>Core practical 9</b> uses this to test the antimicrobial activity of plant extracts, measuring the <b>zone of inhibition</b>.</p>
      <p><b>Conservation (4.16):</b></p>
      <ul>
        <li><b>Zoos</b> — captive breeding, studbooks to maximise genetic diversity, reintroduction, research and education. Criticisms: the small gene pool, behavioural problems in captivity, poor reintroduction success, and cost.</li>
        <li><b>Seed banks</b> — cheap, store enormous genetic diversity in a tiny space, and seeds stay viable for decades when dried and frozen. Limitations: some species (e.g. many tropical trees) have <b>recalcitrant</b> seeds that cannot be dried; viability must be tested by periodic germination; a seed bank preserves the species but not the <b>habitat</b>.</li>
      </ul>`},
    { type:'mcq', h2:'Judging a conservation strategy',
      q:'Which is the strongest argument that a seed bank is a valuable conservation tool?',
      why:'The defining strength of a seed bank is that it stores huge genetic diversity very cheaply in a very small space, protected from habitat loss — although it does not conserve the habitat or the species’ ecological interactions, which is why it complements rather than replaces in-situ conservation.',
      opts:[['It preserves the species&rsquo; whole habitat and food web',0],['It stores very large genetic diversity cheaply in a small space, safe from habitat destruction',1],['It removes the need for any wild populations',0],['Seeds of all species can be dried and frozen indefinitely',0]] },
    { type:'mcq', h2:'Why is cellulose so strong?',
      q:'Which feature explains the tensile strength of cellulose?',
      why:'β-glucose monomers must flip 180° alternately to form glycosidic bonds, which gives straight, unbranched chains. These lie parallel and are cross-linked by very many hydrogen bonds into microfibrils — individually weak bonds, collectively immensely strong.',
      opts:[['Branching 1,6-glycosidic bonds every 20 residues',0],['Coiling into a compact helix held by ionic bonds',0],['Straight β-glucose chains cross-linked by many hydrogen bonds into microfibrils',1],['Its solubility, which lets it pack tightly',0]] }
  ]
}

];
