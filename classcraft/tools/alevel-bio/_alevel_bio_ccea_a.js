/* CCEA GCE Biology 1010 — AS units — data for _build_alevel_bio.js */
const SPEC = 'CCEA GCE Biology (1010)';

module.exports = [

/* ===================== UNIT AS 1 ===================== */
{
  key: 'biology-a-level-ccea', slug: 'molecules-cells',
  title: 'Molecules &amp; Cells', emoji: '🧫',
  spec: SPEC + ' · Unit AS 1: Molecules and Cells',
  desc: 'A-level CCEA Biology mini-lesson on Unit AS 1 Molecules and Cells: water and inorganic ions, carbohydrates, lipids, protein structure, prions, nucleic acids, DNA replication and Meselson–Stahl, enzymes and inhibition, viruses, cell ultrastructure of animal, plant, fungal and prokaryotic cells, cell physiology and water potential, the cell cycle, mitosis, meiosis and cancer, and tissues and organs including the ileum.',
  overview3: ['biological molecules', 'cells &amp; membranes', 'cell division'],
  intro: 'CCEA Unit AS 1 builds the whole molecular foundation of the course: <b>water and ions</b>, <b>carbohydrates, lipids and proteins</b>, <b>nucleic acids and DNA replication</b>, <b>enzymes</b>, <b>viruses</b>, <b>cell ultrastructure</b>, <b>cell physiology and water potential</b>, the <b>cell cycle</b>, and <b>tissues and organs</b>.',
  sortDone: 'Every level of protein structure above the primary sequence is held by a different set of bonds.',
  matchDone: 'Each biological molecule is a condensation polymer — but the bond has a different name each time.',
  recap: [
    '<b>Water:</b> polar, so an excellent solvent; H-bonding gives cohesion and a high specific heat capacity. <b>Ions:</b> Mg²⁺ in chlorophyll, Fe²⁺ in haemoglobin, PO₄³⁻ in ATP, nucleic acids and phospholipids, Ca²⁺ in calcium pectate.',
    '<b>Carbohydrates:</b> α-glucose → starch and glycogen (stores); β-glucose → cellulose (structural). Joined by <b>glycosidic bonds</b> in condensation reactions.',
    '<b>Lipids:</b> triglyceride = glycerol + 3 fatty acids joined by <b>ester bonds</b>. Phospholipids are the basis of membranes.',
    '<b>Proteins:</b> primary (peptide bonds) → secondary (α-helix / β-pleated sheet, H-bonds) → tertiary (H-, ionic, disulfide bonds and hydrophobic interactions) → quaternary. Fibrous (collagen) vs globular (enzymes). <b>Prions</b> are misfolded proteins rich in β-sheet.',
    '<b>DNA replication is semi-conservative</b> — helicase unwinds, DNA polymerase builds. Proved by <b>Meselson and Stahl</b> using ¹⁵N.',
    '<b>Enzymes:</b> globular proteins; lower activation energy; competitive vs non-competitive inhibition.',
    '<b>Cells:</b> plant (cellulose wall, chloroplasts, vacuole), fungal (chitin wall), animal (centrioles, no wall), prokaryotic (no membrane-bound organelles).',
    '<b>Water potential: ψ = ψ<sub>s</sub> + ψ<sub>p</sub>.</b> Pure water has ψ = 0; all solutions are negative. Water moves from higher (less negative) to lower (more negative) ψ.'
  ],
  recapTail: 'You have covered the whole of CCEA Unit AS 1. Press <b>Finish</b> to see your score.',
  screens: [
    { type:'teach', tag:'1.1 Molecules · water &amp; ions', h2:'Water and inorganic ions',
      html:`      <p>Water is a <b>polar</b> molecule: the oxygen is slightly negative and the hydrogens slightly positive, so water molecules <b>hydrogen bond</b> to each other and to other polar molecules. Consequences:</p>
      <ul>
        <li><b>Solvent</b> — polar solutes and ions dissolve, so metabolic reactions can take place and substances can be transported in blood, xylem and phloem.</li>
        <li><b>High specific heat capacity</b> — a large input of energy causes only a small temperature rise, buffering organisms against temperature change.</li>
        <li><b>High latent heat of vaporisation</b> — evaporation (sweating, transpiration) has a powerful cooling effect.</li>
        <li><b>Cohesion and surface tension</b> — allows the continuous column of water in the xylem.</li>
      </ul>
      <p class="note"><b>Inorganic ions (1.1.2):</b> <b>Mg²⁺</b> is a component of <b>chlorophyll</b>; <b>Fe²⁺</b> of <b>haemoglobin</b>; <b>PO₄³⁻</b> of <b>ATP, nucleic acids and phospholipids</b>; <b>Ca²⁺</b> forms <b>calcium pectate</b> in the middle lamella; <b>NO₃⁻</b> supplies the nitrogen for amino acids and nucleotides. Ions also act in <b>osmotic</b> and <b>buffering</b> systems.</p>`},
    { type:'teach', tag:'1.1 Molecules · carbohydrates &amp; lipids', h2:'Carbohydrates and lipids',
      html:`      <p><b>Monosaccharides:</b> α- and β-glucose and fructose share the formula <b>C₆H₁₂O₆</b>. A <b>condensation</b> reaction joins two of them, forming a <span class="hl c">glycosidic bond</span> and releasing water; <b>hydrolysis</b> reverses it.</p>
      <ul>
        <li><b>Maltose</b> = glucose + glucose; <b>sucrose</b> = glucose + fructose.</li>
        <li><b>Starch</b> and <b>glycogen</b> are storage polymers of <b>α-glucose</b>: coiled and branched, so compact, and insoluble, so they do not affect water potential. Glycogen is more highly branched than starch, so it can be hydrolysed even faster — which suits an animal.</li>
        <li><b>Cellulose</b> is a structural polymer of <b>β-glucose</b>: alternate residues are inverted, giving straight chains hydrogen-bonded into microfibrils.</li>
        <li><b>Pentoses</b> (ribose, deoxyribose) are components of nucleic acids and ATP.</li>
      </ul>
      <p><b>Lipids:</b> a <b>triglyceride</b> is glycerol + 3 fatty acids, joined by three condensation reactions forming three <b>ester bonds</b>. <b>Saturated</b> fatty acids have no C=C; <b>unsaturated</b> ones have one or more. A <b>phospholipid</b> has one fatty acid replaced by a <b>phosphate group</b>, making the head hydrophilic and the tails hydrophobic — which is why phospholipids spontaneously form a <b>bilayer</b>.</p>`},
    { type:'teach', tag:'1.1 Molecules · proteins', h2:'Protein structure — and prions',
      html:`      <p>Amino acids have an amine group, a carboxyl group, a hydrogen and a variable <b>R group</b>. Condensation forms a <b>peptide bond</b>.</p>
      <ul>
        <li><b>Primary</b> — the amino acid <b>sequence</b> (peptide bonds).</li>
        <li><b>Secondary</b> — <b>α-helix</b> or <b>β-pleated sheet</b>, held by <b>hydrogen bonds</b>.</li>
        <li><b>Tertiary</b> — the 3-D fold, held by <b>hydrogen bonds, ionic bonds, disulfide bridges</b> and <b>hydrophobic interactions</b>.</li>
        <li><b>Quaternary</b> — more than one polypeptide chain (haemoglobin: four chains, each with a haem prosthetic group).</li>
      </ul>
      <p><b>Fibrous vs globular:</b> <b>collagen</b> is fibrous — three polypeptides wound into a triple helix, giving high tensile strength; it is insoluble and structural. <b>Enzymes</b> are globular — a compact, roughly spherical fold with hydrophilic groups outward, so they are soluble and have a precisely shaped active site. <b>Conjugated</b> proteins carry a prosthetic group: haemoglobin (haem) and glycoproteins (carbohydrate).</p>
      <p class="note"><b>Prions (1.1.5):</b> a prion is a <b>protein</b> — no nucleic acid at all. A change in its <b>secondary structure</b> creates a form rich in <b>β-pleated sheet</b>, which converts normal protein into the abnormal form. The result is a <b>neurodegenerative</b> disease: scrapie in sheep, BSE in cattle and CJD in humans. Infection can follow from eating prion-rich tissue.</p>`},
    { type:'sort', h2:'Which bond, which level?', prompt:'Tap a bond or feature, then tap the level of protein structure it belongs to.',
      bins:['1️⃣ Primary','2️⃣ Secondary','3️⃣ Tertiary'],
      data:[['Peptide bonds between amino acids','a'],['The sequence of amino acids','a'],['α-helix and β-pleated sheet','b'],['Hydrogen bonds along the polypeptide backbone','b'],['Disulfide bridges between cysteine R groups','c'],['Ionic bonds and hydrophobic interactions','c'],['The precise 3-D shape of an active site','c']] },
    { type:'teach', tag:'1.1 Molecules · nucleic acids', h2:'Nucleic acids and semi-conservative replication',
      html:`      <p>A <b>nucleotide</b> = pentose sugar + nitrogenous base + phosphate, formed by condensation. Nucleotides polymerise into a strand with a sugar–phosphate backbone.</p>
      <p><b>DNA</b> is a double helix of <b>two antiparallel chains</b>, held by hydrogen bonds between complementary bases: <b>A–T</b> (2 H-bonds) and <b>C–G</b> (3 H-bonds). <b>RNA</b> is single-stranded, has ribose, and uses uracil instead of thymine.</p>
      <p><b>Replication (1.1.7)</b> is <b>semi-conservative</b>:</p>
      <ul>
        <li><b>DNA helicase</b> breaks the hydrogen bonds and unwinds the helix.</li>
        <li>Free nucleotides pair with the exposed bases on each strand.</li>
        <li><b>DNA polymerase</b> catalyses the phosphodiester bonds, producing two identical helices, each with <b>one original and one new strand</b>.</li>
      </ul>
      <p class="note"><b>Meselson and Stahl:</b> <i>E. coli</i> grown in heavy <b>¹⁵N</b> was transferred to <b>¹⁴N</b>. After one generation, all the DNA was of <b>intermediate</b> density — which immediately disproves <b>conservative</b> replication. After two generations there were equal amounts of <b>intermediate</b> and <b>light</b> DNA — which disproves <b>dispersive</b> replication (that would have given a single band of ever-lighter DNA). Only semi-conservative replication fits.</p>`},
    { type:'num', h2:'Your turn — chromatography Rf', q:'In the amino acid chromatography practical, a spot travels <b>3.2 cm</b> from the origin while the solvent front travels <b>8.0 cm</b>. Calculate the <b>R<sub>f</sub></b> value. Give your answer to <b>2 decimal places</b>.',
      unit:'Rf', answer:0.40, tol:0.01, hint:'Rf = distance moved by the spot ÷ distance moved by the solvent front = 3.2 ÷ 8.0.' },
    { type:'teach', tag:'1.2 Enzymes', h2:'Enzymes and inhibition',
      html:`      <p>Enzymes are <b>globular proteins</b> that act as biological catalysts by <b>lowering the activation energy</b>. The <b>active site</b> — whose shape derives from the tertiary structure — is complementary to the substrate, forming an <b>enzyme–substrate complex</b>. The <b>induced fit</b> model says the active site moulds itself around the substrate as it binds.</p>
      <ul>
        <li><b>Temperature:</b> rate rises with kinetic energy, then falls steeply past the optimum as bonds holding the tertiary structure break: <b>denaturation</b>.</li>
        <li><b>pH:</b> extremes of pH disrupt the ionic and hydrogen bonds of the tertiary structure, so the active site changes shape.</li>
        <li><b>Substrate concentration:</b> rate rises until all active sites are occupied — then the enzyme concentration becomes limiting and the rate plateaus.</li>
        <li><b>Competitive inhibitor</b> — similar shape to the substrate; binds the <b>active site</b>; the effect is <b>overcome by more substrate</b>.</li>
        <li><b>Non-competitive inhibitor</b> — binds elsewhere and <b>changes the shape of the active site</b>; <b>not</b> overcome by more substrate.</li>
      </ul>
      <p class="note"><b>Immobilised enzymes</b> (e.g. in alginate beads) can be recovered and reused, do not contaminate the product, and are more stable to changes in temperature and pH.</p>`},
    { type:'mcq', h2:'Identify the inhibitor',
      q:'An enzyme reaction is slowed by an inhibitor. Adding a large excess of substrate has no effect on the rate. What type of inhibitor is it?',
      why:'A competitive inhibitor competes for the active site, so flooding the system with substrate outcompetes it. If extra substrate makes NO difference, the inhibitor is not competing for the active site — it is binding elsewhere and distorting the active site: non-competitive.',
      opts:[['Competitive',0],['Non-competitive',1],['It must be a change in pH, not an inhibitor',0],['Substrate-level inhibitor',0]] },
    { type:'teach', tag:'1.3 Viruses · 1.4 Cells', h2:'Viruses and cell ultrastructure',
      html:`      <p><b>Viruses</b> are <b>non-cellular</b>: nucleic acid (DNA or RNA) inside a protein <b>capsid</b>, sometimes with a lipid envelope carrying attachment proteins. They have no cytoplasm, no ribosomes and no metabolism, so they are <b>obligate intracellular parasites</b> — they can only replicate by taking over a host cell.</p>
      <p><b>Eukaryotic ultrastructure:</b> nucleus (with nuclear envelope, pores and nucleolus), rough ER (protein synthesis and transport), smooth ER (lipid synthesis), Golgi (modification and packaging), mitochondria (cristae, matrix), lysosomes, 80S ribosomes.</p>
      <ul>
        <li><b>Plant cells</b> — cellulose cell wall, chloroplasts, a large vacuole, and the middle lamella of <b>calcium pectate</b>.</li>
        <li><b>Fungal cells</b> — protoplasm (often <b>multinucleate</b>) bounded by a wall of <b>chitin</b>. No chloroplasts.</li>
        <li><b>Animal cells</b> — no cell wall, no chloroplasts, but they do possess <b>centrioles</b>.</li>
        <li><b>Prokaryotic cells</b> — circular DNA, plasmids, 70S ribosomes, murein wall, <b>no membrane-bound organelles</b>.</li>
      </ul>`},
    { type:'num', h2:'Your turn — graticule calibration', q:'A stage micrometer is viewed at ×100. <b>50 eyepiece graticule divisions</b> line up with <b>0.5 mm</b> on the stage micrometer. Calculate the length, in <b>micrometres</b>, represented by <b>one eyepiece division</b> at this magnification.',
      unit:'µm', answer:10, tol:0.2, hint:'0.5 mm = 500 µm. One division = 500 ÷ 50.' },
    { type:'num', h2:'Your turn — actual cell size', q:'A cell measures <b>60 mm</b> across on a micrograph taken at a magnification of <b>×1500</b>. Calculate its actual diameter in <b>micrometres</b>.',
      unit:'µm', answer:40, tol:0.5, hint:'actual = 60 ÷ 1500 = 0.04 mm; × 1000 to get µm.' },
    { type:'teach', tag:'1.5 Cell physiology', h2:'Membranes, transport and water potential',
      html:`      <p>The <b>fluid-mosaic</b> membrane is a phospholipid bilayer with intrinsic (channel and carrier) and extrinsic proteins, cholesterol regulating fluidity, and glycoproteins and glycolipids for recognition. Transport across it: <b>simple diffusion</b>, <b>facilitated diffusion</b> (channel/carrier, passive), <b>osmosis</b>, <b>active transport</b> (carrier + ATP, against the gradient) and bulk transport (<b>endocytosis / exocytosis</b>).</p>
      <div class="eqn">ψ = ψ<sub>s</sub> + ψ<sub>p</sub><small>water potential = solute potential + pressure potential<br>pure water: ψ = 0 kPa. Adding solute makes ψ NEGATIVE.</small></div>
      <p>Water moves by osmosis from a <b>higher (less negative)</b> water potential to a <b>lower (more negative)</b> one.</p>
      <ul>
        <li><b>Plant cell in a dilute solution:</b> water enters, the vacuole swells, the wall pushes back — ψ<sub>p</sub> rises. The cell becomes <b>turgid</b>.</li>
        <li><b>Plant cell in a concentrated solution:</b> water leaves, the protoplast shrinks away from the wall — <b>plasmolysis</b>. At <b>incipient plasmolysis</b> ψ<sub>p</sub> = 0, so <b>ψ = ψ<sub>s</sub></b> — which is exactly how the practical measures the solute potential of the cells.</li>
        <li><b>Animal cells</b> have no wall, so in pure water they burst (<b>lysis</b>); in a concentrated solution they crenate.</li>
      </ul>`},
    { type:'num', h2:'Your turn — water potential', q:'A plant cell has a solute potential (ψ<sub>s</sub>) of <b>−800 kPa</b> and a pressure potential (ψ<sub>p</sub>) of <b>+300 kPa</b>. Calculate its <b>water potential</b>.',
      unit:'kPa', answer:-500, tol:1, hint:'ψ = ψs + ψp = (−800) + (+300).' },
    { type:'mcq', h2:'Which way does water move?',
      q:'Cell A has a water potential of −600 kPa. Cell B has a water potential of −350 kPa. Which way does water move by osmosis?',
      why:'Water always moves DOWN the water potential gradient — from the higher (less negative) water potential to the lower (more negative) one. −350 kPa is higher than −600 kPa, so water moves from B to A.',
      opts:[['From A to B, because A is more negative',0],['From B to A, down the water potential gradient',1],['No net movement, because both are negative',0],['From A to B, because water always moves towards zero',0]] },
    { type:'teach', tag:'1.6 Continuity of cells', h2:'The cell cycle, mitosis, meiosis and cancer',
      html:`      <p><b>Interphase</b> (G1 → S → G2) occupies most of the cycle; DNA is <b>replicated</b> in <b>S phase</b>. Then <b>mitosis</b> — <b>prophase</b> (chromosomes condense, nuclear envelope breaks down, spindle forms), <b>metaphase</b> (chromosomes align on the equator), <b>anaphase</b> (centromeres divide; chromatids pulled to the poles), <b>telophase</b> (nuclear envelopes re-form) — then <b>cytokinesis</b>. Two genetically identical diploid cells.</p>
      <p><b>Meiosis</b> has two divisions and produces <b>four haploid, genetically different</b> cells. Variation arises from <b>chiasma formation (crossing over) in prophase I</b> and from <b>independent assortment in metaphase I</b>.</p>
      <p class="note"><b>Cancer:</b> a disruption of the cell cycle. Mutations in <b>proto-oncogenes</b> (which become <b>oncogenes</b>, permanently stimulating division) or in <b>tumour suppressor genes</b> (which normally halt the cycle at checkpoints and trigger apoptosis) lead to <b>uncontrolled mitosis</b> and a tumour. Many anticancer drugs work precisely by disrupting rapidly dividing cells — for example by preventing spindle formation, which arrests the cell in metaphase.</p>`},
    { type:'match', h2:'Match the process to its bond or enzyme', prompt:'Tap a process on the left, then the correct answer on the right.',
      headL:'Process', headR:'Bond / enzyme',
      pairs:[
        {l:'Joining two monosaccharides by condensation', r:'Glycosidic bond'},
        {l:'Joining glycerol and a fatty acid', r:'Ester bond'},
        {l:'Joining two amino acids', r:'Peptide bond'},
        {l:'Unwinding the DNA helix by breaking hydrogen bonds', r:'DNA helicase'}] },
    { type:'teach', tag:'1.7 Tissues and organs', h2:'The ileum as a mammalian organ',
      html:`      <p>A <b>tissue</b> is a group of similar cells performing the same function; an <b>organ</b> contains several tissues working together.</p>
      <p>The <b>ileum</b> has five tissue layers: <b>mucosa</b>, <b>muscularis mucosa</b>, <b>submucosa</b>, <b>muscularis externa</b> and <b>serosa</b>.</p>
      <ul>
        <li>The <b>mucosa</b> is folded into <b>villi</b>, hugely increasing the <b>surface area</b> for absorption. Its <b>columnar epithelium</b> carries a <b>brush border of microvilli</b> — increasing the area again — and contains <b>goblet cells</b> secreting mucus.</li>
        <li>The epithelial cells have <b>numerous mitochondria</b>, because absorption of glucose and amino acids uses <b>active transport</b> (co-transport with Na⁺) alongside diffusion and pinocytosis.</li>
        <li>Each villus contains <b>blood capillaries</b> (which absorb monosaccharides and amino acids) and a <b>lacteal</b> (which absorbs fats). The rich blood supply <b>maintains the concentration gradient</b>.</li>
        <li><b>Crypts of Lieberkühn</b> contain the dividing <b>stem cells</b> that continually replace the epithelium, protected by the antimicrobial <b>Paneth cells</b> at the base.</li>
      </ul>`},
    { type:'mcq', h2:'Why so many mitochondria?',
      q:'The columnar epithelial cells of the ileum contain unusually large numbers of mitochondria. Why?',
      why:'Glucose and amino acids are absorbed against a concentration gradient by active transport (co-transported with sodium ions, which are then pumped out by the Na+/K+ pump). Active transport requires ATP, and ATP is produced by oxidative phosphorylation in the mitochondria.',
      opts:[['To make the mucus secreted by goblet cells',0],['To supply the ATP needed for active transport of glucose and amino acids',1],['To digest fat before it enters the lacteal',0],['To store the products of digestion',0]] }
  ]
},

/* ===================== UNIT AS 2 ===================== */
{
  key: 'biology-a-level-ccea', slug: 'organisms-biodiversity',
  title: 'Organisms &amp; Biodiversity', emoji: '🌾',
  spec: SPEC + ' · Unit AS 2: Organisms and Biodiversity',
  desc: 'A-level CCEA Biology mini-lesson on Unit AS 2 Organisms and Biodiversity: transport and exchange in plants (xylem, transpiration, translocation, xerophytes) and animals (heart, blood, haemoglobin dissociation curves, the breathing system and smoking), adaptation of organisms, ecological factors and niche, sampling techniques, biodiversity, classification and human impact on biodiversity.',
  overview3: ['plant transport', 'animal transport', 'biodiversity'],
  intro: 'CCEA Unit AS 2 covers <b>transport and exchange</b> in plants and animals — xylem and <b>transpiration</b>, phloem and <b>translocation</b>, the heart, <b>haemoglobin</b> and the breathing system — and then <b>adaptation</b>, <b>ecological sampling</b>, <b>biodiversity</b> and <b>human impact</b>.',
  sortDone: 'Xylem is dead and carries water up; phloem is living and carries assimilates in either direction.',
  matchDone: 'Every sampling method answers a different ecological question.',
  recap: [
    '<b>Transpiration stream:</b> evaporation from mesophyll → tension → <b>cohesion-tension</b> pulls a continuous column of water up the xylem, held together by hydrogen bonds and adhering to the walls.',
    '<b>Translocation:</b> mass flow. Sucrose is actively loaded at the source, lowering water potential; water follows from the xylem, raising hydrostatic pressure; sap flows to the sink where sucrose is unloaded.',
    '<b>Xerophytes:</b> thick cuticle, sunken stomata, rolled leaves, hairs — all reduce the water potential gradient and increase the diffusion distance.',
    '<b>Heart:</b> myogenic; SAN → AVN (delay) → bundle of His → Purkyne fibres. <b>Cardiac output = stroke volume × heart rate.</b>',
    '<b>Haemoglobin:</b> S-shaped dissociation curve (cooperative binding). The <b>Bohr shift</b> — high CO₂ / low pH — moves the curve <b>right</b>, so more oxygen is unloaded in respiring tissue.',
    '<b>Breathing system:</b> trachea → bronchi → bronchioles → alveolar ducts → alveoli. Smoking damages cilia and causes bronchitis, emphysema and lung cancer.',
    '<b>Ecological factors:</b> climatic, edaphic and biotic. Sampling: random quadrats, line and belt transects, pitfall traps, sweep nets, pooters.',
    '<b>Biodiversity</b> is threatened by habitat loss, over-exploitation, pollution and introduced species; conservation may be <b>in situ</b> or <b>ex situ</b>.'
  ],
  recapTail: 'You have covered the whole of CCEA Unit AS 2. Press <b>Finish</b> to see your score.',
  screens: [
    { type:'teach', tag:'2.1 Transport &amp; exchange · plants', h2:'Xylem and the transpiration stream',
      html:`      <p><b>Xylem vessels</b> are <b>dead</b>, hollow tubes with <b>no end walls</b> and lignified walls that are waterproof and prevent collapse under tension.</p>
      <p><b>Cohesion–tension theory:</b></p>
      <ul>
        <li>Water <b>evaporates</b> from the surfaces of the mesophyll cells and diffuses out through the <b>stomata</b>: transpiration.</li>
        <li>This lowers the water potential of the mesophyll, so water is drawn from the xylem, putting the column under <b>tension</b>.</li>
        <li>Water molecules stick to each other by <b>hydrogen bonding</b> (<b>cohesion</b>) so the whole column is pulled up as one, and stick to the lignified walls (<b>adhesion</b>).</li>
        <li>Water enters the root by osmosis through the root hair cells, and mineral ions are taken up by <b>active transport</b> — which lowers the water potential of the root further.</li>
      </ul>
      <p>Transpiration rate rises with <b>light intensity</b> (stomata open), <b>temperature</b> (more kinetic energy, steeper gradient), <b>air movement</b> (removes the humid boundary layer) and <b>falls</b> with high humidity.</p>
      <p class="note"><b>Xerophytes (2.1.15):</b> marram grass has a <b>thick waxy cuticle</b>, <b>stomata sunk in pits</b>, <b>hairs</b>, and <b>rolled leaves</b> — all of which trap humid air next to the stomata, reducing the water potential gradient, and lengthen the diffusion pathway. <b>Hydrophytes</b> go the other way: air spaces (aerenchyma) for buoyancy and oxygen supply, and stomata on the <b>upper</b> surface.</p>`},
    { type:'num', h2:'Your turn — potometer', q:'In a potometer, the air bubble moves <b>45 mm</b> along a capillary tube of radius <b>0.50 mm</b> in 5 minutes. Calculate the <b>volume of water taken up</b> (volume = πr²×distance; use π = 3.14). Give your answer to <b>1 decimal place</b>.',
      unit:'mm³', answer:35.3, tol:0.6, hint:'V = 3.14 × 0.50² × 45 = 3.14 × 0.25 × 45.' },
    { type:'teach', tag:'2.1 Transport &amp; exchange · phloem', h2:'Phloem and translocation',
      html:`      <p><b>Phloem</b> is <b>living</b>. <b>Sieve tube elements</b> have perforated <b>sieve plates</b> and lose most of their organelles; each is supported by a <b>companion cell</b> packed with mitochondria.</p>
      <p><b>Mass flow hypothesis:</b></p>
      <ul>
        <li>At the <b>source</b> (a photosynthesising leaf), sucrose is <b>actively loaded</b> into the sieve tube — the companion cell uses ATP to pump H⁺ out, and sucrose then enters by <b>co-transport</b> with H⁺.</li>
        <li>This <b>lowers the water potential</b> in the sieve tube, so water enters by <b>osmosis</b> from the xylem, raising the <b>hydrostatic pressure</b>.</li>
        <li>At the <b>sink</b> (a root, fruit or growing bud), sucrose is unloaded and used or stored, so water leaves and the pressure falls.</li>
        <li>Sap therefore flows <b>down a hydrostatic pressure gradient</b> from source to sink — which is why phloem transport can go up <b>or</b> down.</li>
      </ul>
      <p class="note"><b>Evidence:</b> aphid stylet experiments show that sap flows fastest near the source and contains sucrose; metabolic poisons and low oxygen stop translocation (proving that an <b>active</b> step is involved) but do not stop transpiration.</p>`},
    { type:'sort', h2:'Xylem or phloem?', prompt:'Tap a feature, then tap the tissue it belongs to.',
      bins:['🪵 Xylem','🍯 Phloem','🔁 Both'],
      data:[['Made of dead, hollow cells with no end walls','a'],['Lignified walls resist collapse under tension','a'],['Carries water and mineral ions upwards only','a'],['Sieve tube elements with perforated sieve plates','b'],['Companion cells rich in mitochondria','b'],['Transports sucrose from source to sink, in either direction','b'],['A vascular tissue found in the vascular bundle','c']] },
    { type:'teach', tag:'2.1 Transport &amp; exchange · animals', h2:'The heart and the cardiac cycle',
      html:`      <p>Mammals have a <b>closed double circulation</b>. The <b>left ventricle</b> has the thickest wall because it must generate enough pressure to force blood around the entire <b>systemic</b> circuit; the right ventricle only serves the low-pressure <b>pulmonary</b> circuit.</p>
      <p>The heart is <b>myogenic</b>. The <b>sinoatrial node (SAN)</b> in the right atrium sets the rhythm; the wave of excitation spreads over both atria (atrial systole), reaches the <b>atrioventricular node (AVN)</b>, which <b>delays</b> it so the atria empty first, then passes down the <b>bundle of His</b> to the apex and up the <b>Purkyne fibres</b>, so the ventricles contract from the bottom up.</p>
      <div class="eqn">cardiac output = stroke volume × heart rate<small>valves open and close purely because of pressure differences</small></div>`},
    { type:'num', h2:'Your turn — cardiac output', q:'At rest, a person has a stroke volume of <b>70 cm³</b> and a heart rate of <b>65 bpm</b>. Calculate their <b>cardiac output</b> in cm³ per minute.',
      unit:'cm³ min⁻¹', answer:4550, tol:5, hint:'cardiac output = 70 × 65.' },
    { type:'teach', tag:'2.1 Transport &amp; exchange · blood', h2:'Haemoglobin and the Bohr shift',
      html:`      <p><b>Haemoglobin</b> has four polypeptide chains, each with a haem group containing <b>Fe²⁺</b>, so it can carry four O₂ molecules. Binding is <b>cooperative</b>: the first oxygen changes the shape of the molecule, making the next easier to bind — which is why the <b>oxygen dissociation curve is S-shaped (sigmoid)</b>.</p>
      <ul>
        <li>At the <b>high partial pressure</b> of oxygen in the lungs, haemoglobin is almost fully <b>saturated</b> — it <b>loads</b> oxygen.</li>
        <li>At the <b>low partial pressure</b> in respiring tissue, saturation falls steeply — it <b>unloads</b> oxygen exactly where it is needed.</li>
      </ul>
      <p><b>The Bohr shift:</b> respiring tissue produces <b>CO₂</b>, which dissolves to form carbonic acid, <b>lowering the pH</b>. This changes haemoglobin&rsquo;s shape, reducing its affinity for oxygen, so the curve <b>shifts to the right</b>: <b>at any given pO₂, more oxygen is released</b>. The harder a tissue respires, the more oxygen it is given.</p>
      <p class="note"><b>Comparisons that carry marks:</b> <b>fetal</b> haemoglobin has a <b>higher</b> affinity (curve to the <b>left</b>) so it takes oxygen from the mother&rsquo;s blood across the placenta. <b>Myoglobin</b> has a very high affinity, acting as an oxygen store in muscle. Small mammals with a high metabolic rate have haemoglobin with a <b>lower</b> affinity (curve to the right), unloading oxygen readily.</p>`},
    { type:'mcq', h2:'The Bohr shift',
      q:'During exercise, the oxygen dissociation curve shifts to the right. What does this mean for the muscle?',
      why:'A rightward shift means a LOWER affinity for oxygen at any given partial pressure — so haemoglobin unloads MORE oxygen in the tissue. It is caused by the extra CO2 (and therefore lower pH) produced by respiring muscle, which is exactly where the extra oxygen is needed.',
      opts:[['Haemoglobin binds oxygen more strongly, so less is released',0],['Haemoglobin has a lower affinity for oxygen, so more oxygen is unloaded to the muscle',1],['Haemoglobin can no longer bind oxygen in the lungs',0],['The muscle stops respiring aerobically',0]] },
    { type:'teach', tag:'2.1 Transport &amp; exchange · breathing', h2:'The breathing system and smoking',
      html:`      <p><b>The respiratory tree:</b> trachea → bronchi → bronchioles → alveolar ducts → <b>alveoli</b>. Cartilage rings keep the trachea and bronchi open; the airways are lined by <b>ciliated epithelium</b> with <b>goblet cells</b>, so mucus traps particles and the cilia sweep it upwards.</p>
      <p><b>Ventilation:</b> in <b>inspiration</b> the <b>external intercostal muscles</b> contract, moving the ribcage up and out, and the <b>diaphragm</b> contracts and flattens — the thoracic volume increases, so pressure falls below atmospheric and air flows in. Quiet <b>expiration</b> is largely passive: the muscles relax and the elastic tissue recoils.</p>
      <p><b>The alveolus</b> is a superb exchange surface: about 300 million of them give a vast <b>surface area</b>; the wall is a single layer of <b>squamous epithelium</b>, giving a very short <b>diffusion distance</b>; and the dense capillary network plus continuous ventilation <b>maintains the concentration gradient</b>.</p>
      <p class="note"><b>Smoking (2.1.8):</b> tar <b>paralyses and destroys the cilia</b>, so mucus accumulates — the &ldquo;smoker&rsquo;s cough&rdquo; — and bacteria are not removed: chronic <b>bronchitis</b>. Enzymes released by the resulting inflammation destroy the alveolar walls, so the alveoli merge into large air spaces: <b>emphysema</b> drastically reduces the surface area for gas exchange. Carcinogens in tar cause mutations leading to <b>lung cancer</b>, and nicotine and carbon monoxide together raise the risk of <b>CVD</b>.</p>`},
    { type:'teach', tag:'2.2 Adaptation of organisms', h2:'Adaptation, ecological factors and niche',
      html:`      <p><b>Adaptation</b> is any behavioural, physiological or morphological feature that helps an organism meet an environmental challenge.</p>
      <p><b>Ecological factors that determine distribution:</b></p>
      <ul>
        <li><b>Climatic</b> — temperature range, water availability, light intensity, light quality, day length.</li>
        <li><b>Edaphic</b> (soil) — pH, availability of macronutrients and micronutrients, and soil aeration.</li>
        <li><b>Biotic</b> — competitors, predators, disease, and the accumulation of waste.</li>
      </ul>
      <p>An <b>ecological niche</b> is the role and position of a species in its habitat — everything it does and everything it needs. Two species cannot occupy the same niche indefinitely: one will out-compete the other.</p>`},
    { type:'teach', tag:'2.2.3 Sampling techniques', h2:'Sampling a habitat',
      html:`      <ul>
        <li><b>Random sampling</b> — lay out two tape measures as axes and use a <b>random number generator</b> for the coordinates. This avoids <b>bias</b>, so the sample is representative.</li>
        <li><b>Line transect</b> — record every species touching a line at set intervals: used to show <b>zonation</b> along an environmental gradient.</li>
        <li><b>Belt transect</b> — place quadrats along the line, giving quantitative abundance data along the gradient.</li>
        <li><b>Quadrats and pin frames</b> — estimate <b>density</b> (individuals per m²), <b>frequency</b> (the % of quadrats containing the species) and <b>percentage cover</b> (for plants that are hard to count individually).</li>
        <li><b>Pitfall traps, sweep nets and pooters</b> — for invertebrates.</li>
      </ul>
      <p class="note">Always record the <b>abiotic factors</b> at the same time (light meter, pH probe, thermometer, soil moisture) — otherwise you have a distribution with nothing to correlate it against. And take <b>many</b> samples: a larger sample size makes the mean more reliable and reduces the effect of chance.</p>`},
    { type:'num', h2:'Your turn — population density', q:'Using a quadrat of area <b>0.25 m²</b>, a student records a mean of <b>6</b> daisy plants per quadrat. Calculate the estimated <b>density</b> of daisies per square metre.',
      unit:'per m²', answer:24, tol:0.5, hint:'density = mean per quadrat ÷ quadrat area = 6 ÷ 0.25.' },
    { type:'num', h2:'Your turn — frequency', q:'A species is present in <b>24</b> out of <b>30</b> quadrats. Calculate its <b>percentage frequency</b>.',
      unit:'%', answer:80, tol:0.5, hint:'(24 ÷ 30) × 100.' },
    { type:'match', h2:'Which technique?', prompt:'Tap the question on the left, then the technique that answers it.',
      headL:'What you want to find out', headR:'Technique',
      pairs:[
        {l:'How abundance changes with distance up a rocky shore', r:'Belt transect'},
        {l:'The mean density of a plant in an apparently uniform field', r:'Random quadrats'},
        {l:'Which ground-dwelling beetles live in a woodland', r:'Pitfall traps'},
        {l:'Which small insects live in long grass', r:'Sweep net'}] },
    { type:'teach', tag:'2.3 Biodiversity', h2:'Biodiversity and classification',
      html:`      <p>All organisms share the same biochemical basis of life — the same four groups of biological molecules and, essentially, the same genetic code — which is powerful evidence of <b>common ancestry</b>.</p>
      <p><b>Classification</b> is <b>hierarchical</b>: domain, kingdom, phylum, class, order, family, genus, species — each group nested inside the one above, with no overlap. The <b>binomial</b> system gives every species a unique two-part Latin name. Modern classification is <b>phylogenetic</b>: it aims to reflect <b>evolutionary relationships</b>, and it is increasingly based on molecular evidence — DNA and rRNA sequences and protein comparisons — rather than appearance alone.</p>
      <p><b>Biodiversity</b> can be considered as the number of <b>species</b>, the <b>genetic diversity</b> within a species, and the range of <b>habitats</b>. It matters ecologically (a diverse ecosystem is more resilient), economically (food, medicines, tourism) and ethically.</p>`},
    { type:'teach', tag:'2.4 Human impact', h2:'Human impact on biodiversity',
      html:`      <p><b>Threats:</b></p>
      <ul>
        <li><b>Habitat destruction and fragmentation</b> — deforestation, drainage of wetlands, hedgerow removal. Small fragments hold small populations, which lose genetic diversity through <b>genetic drift</b> and inbreeding.</li>
        <li><b>Over-exploitation</b> — fishing and hunting faster than a population can reproduce.</li>
        <li><b>Pollution</b> — including <b>eutrophication</b>: fertiliser runs off into water; algae bloom; the bloom blocks the light so the plants below die; <b>saprobiotic bacteria</b> decompose them, multiply, and use up the dissolved oxygen; fish and invertebrates suffocate.</li>
        <li><b>Introduced species</b> — with no natural predators they out-compete natives.</li>
      </ul>
      <p><b>Conservation:</b> <b>in situ</b> (nature reserves, SSSIs, legal protection, restoring habitats) keeps species in their natural habitat and preserves their ecological interactions. <b>Ex situ</b> (zoos, botanic gardens, seed banks) is a safety net for species too threatened to survive in the wild, but is expensive, holds a small gene pool, and does not conserve the habitat.</p>`},
    { type:'mcq', h2:'Eutrophication',
      q:'Fertiliser runs into a lake and the fish die. What is the immediate cause of death?',
      why:'The algal bloom blocks light, so submerged plants die. Saprobiotic BACTERIA decomposing all that dead material multiply rapidly, and their aerobic respiration removes the dissolved oxygen from the water. The fish suffocate — they are not poisoned by the fertiliser itself.',
      opts:[['The nitrate in the fertiliser is directly toxic to fish',0],['Bacteria decomposing the dead algae and plants use up the dissolved oxygen',1],['The algae eat the fish',0],['The pH of the water falls to below 2',0]] }
  ]
},

/* ===================== UNIT AS 3 ===================== */
{
  key: 'biology-a-level-ccea', slug: 'practical-skills-as-biology',
  title: 'Practical Skills in AS Biology', emoji: '🔬',
  spec: SPEC + ' · Unit AS 3: Practical Skills in AS Biology',
  desc: 'A-level CCEA Biology mini-lesson on Unit AS 3 Practical Skills in AS Biology: qualitative reagents for biological molecules, chromatography and Rf values, enzyme experiments, the colorimeter and serial dilutions, the eyepiece graticule and stage micrometer, water potential and incipient plasmolysis, root tip squashes and mitosis, block diagrams, heart dissection, field sampling, and the analysis of accuracy, precision and error.',
  overview3: ['techniques', 'measurement', 'analysis'],
  intro: 'CCEA Unit AS 3 is assessed by <b>practical tasks</b> and a <b>written examination on practical skills</b>. This mini-lesson works through the AS techniques — <b>biochemical tests</b>, <b>chromatography</b>, <b>enzyme experiments</b>, the <b>colorimeter</b> and <b>serial dilutions</b>, the <b>graticule and stage micrometer</b>, <b>water potential</b> and <b>incipient plasmolysis</b>, <b>root tip squashes</b>, and <b>field sampling</b> — and the maths of <b>error and reliability</b> that the exam actually rewards.',
  sortDone: 'Each qualitative reagent tests for a different biological molecule — and gives a different colour change.',
  matchDone: 'Precision, accuracy, reliability and validity are four different things — do not confuse them.',
  recap: [
    '<b>Biochemical tests:</b> iodine (starch → blue-black), Benedict’s (reducing sugar → brick-red on heating), Biuret (protein → lilac/purple), glucose-specific test strips (glucose oxidase).',
    '<b>Chromatography: R<sub>f</sub> = distance moved by the spot ÷ distance moved by the solvent front.</b> Always measure to the <b>centre</b> of the spot, and never let the solvent touch the origin.',
    '<b>Graticule calibration:</b> line up the eyepiece graticule against a <b>stage micrometer</b> to find the length of one division — and recalibrate for <b>every</b> objective lens.',
    '<b>Serial dilution:</b> each 1 in 10 step multiplies the concentration by 0.1. Three steps → × 0.001.',
    '<b>Water potential:</b> find the concentration at which there is <b>no change in mass or length</b> — at that point the tissue’s water potential equals that of the solution. At <b>incipient plasmolysis</b> (50 % of cells plasmolysed), ψ<sub>p</sub> = 0, so ψ = ψ<sub>s</sub>.',
    '<b>Mitotic index = (cells in mitosis ÷ total cells) × 100 %.</b>',
    '<b>% error = (uncertainty ÷ measured value) × 100.</b> Use the largest apparatus reading you reasonably can, because that reduces the percentage error.',
    '<b>Accuracy</b> = closeness to the true value. <b>Precision</b> = how closely repeats agree. <b>Reliability</b> comes from repeats; <b>validity</b> comes from controlling the other variables.'
  ],
  recapTail: 'You have covered the AS practical skills. Press <b>Finish</b> to see your score.',
  screens: [
    { type:'teach', tag:'Qualitative reagents', h2:'Testing for biological molecules',
      html:`      <ul>
        <li><b>Starch</b> — add <b>iodine in potassium iodide</b>. Orange-brown → <b>blue-black</b>.</li>
        <li><b>Reducing sugars</b> — add <b>Benedict&rsquo;s reagent</b> and <b>heat in a water bath</b>. Blue → green → yellow → orange → <b>brick-red</b> precipitate. The colour is <b>semi-quantitative</b>: the more reducing sugar, the further along the sequence it goes.</li>
        <li><b>Non-reducing sugar</b> (e.g. sucrose) — a negative Benedict&rsquo;s test; then <b>hydrolyse</b> with dilute HCl and heat, <b>neutralise</b> with sodium hydrogencarbonate, and repeat Benedict&rsquo;s. A brick-red result now means a non-reducing sugar was present.</li>
        <li><b>Protein</b> — add <b>Biuret</b> reagent (sodium hydroxide then copper(II) sulfate). Blue → <b>lilac/purple</b>. No heating.</li>
        <li><b>Glucose specifically</b> — a test strip using <b>glucose oxidase</b>: unlike Benedict&rsquo;s, it does not respond to other reducing sugars.</li>
      </ul>
      <p class="note">To make a test <b>quantitative</b>, use a <b>colorimeter</b>: filter the Benedict&rsquo;s solution, measure the <b>absorbance</b>, and read the concentration off a <b>calibration curve</b> made from solutions of known concentration.</p>`},
    { type:'sort', h2:'Which reagent?', prompt:'Tap a result, then tap the test that produced it.',
      bins:['🟣 Biuret','🔴 Benedict’s','🟤 Iodine'],
      data:[['Tests for protein','a'],['Blue to lilac/purple, no heating needed','a'],['Brick-red precipitate on heating','b'],['Tests for reducing sugars','b'],['Orange-brown to blue-black','c'],['Tests for starch','c']] },
    { type:'teach', tag:'Chromatography', h2:'Chromatography and R<sub>f</sub> values',
      html:`      <p>Chromatography separates a mixture (here, amino acids) because the components have different <b>solubilities</b> in the solvent and different <b>affinities</b> for the paper.</p>
      <ul>
        <li>Draw the origin line in <b>pencil</b> (ink would run) and keep it <b>above</b> the solvent — if the solvent touches the origin, the sample simply dissolves away.</li>
        <li>Apply a small, <b>concentrated</b> spot; let it dry and reapply, several times, to get a strong result without a large diffuse spot.</li>
        <li>Run in a <b>sealed</b> container, so the atmosphere is saturated and the solvent does not evaporate off the paper.</li>
        <li>Mark the <b>solvent front</b> immediately, and develop the colourless amino acids with <b>ninhydrin</b>.</li>
      </ul>
      <div class="eqn">R<sub>f</sub> = distance moved by the spot ÷ distance moved by the solvent front<small>measure to the CENTRE of the spot · Rf has no units and is always less than 1</small></div>
      <p>Identify each amino acid by comparing its Rf with a table of known values <b>for that solvent</b> — Rf is only reproducible if the solvent, paper and temperature are the same.</p>`},
    { type:'num', h2:'Your turn — R<sub>f</sub> value', q:'An amino acid spot travels <b>2.4 cm</b> from the origin. The solvent front travels <b>6.0 cm</b>. Calculate the <b>R<sub>f</sub></b> value.',
      unit:'Rf', answer:0.40, tol:0.01, hint:'Rf = 2.4 ÷ 6.0.' },
    { type:'teach', tag:'Microscopy', h2:'The eyepiece graticule and stage micrometer',
      html:`      <p>An <b>eyepiece graticule</b> is a scale in the eyepiece — but its divisions are <b>arbitrary</b>: they mean a different real length at every magnification. To turn them into micrometres you must <b>calibrate</b> with a <b>stage micrometer</b>, a slide with a scale of known length (typically 1 mm divided into 100 divisions of 10 µm).</p>
      <ol style="margin:0 0 14px 2px;padding-left:22px">
        <li>Focus on the stage micrometer at the chosen objective.</li>
        <li>Line up the two scales and count how many eyepiece divisions correspond to a known length on the stage micrometer.</li>
        <li>Divide that known length by the number of eyepiece divisions: this gives the length of <b>one eyepiece division</b>.</li>
        <li><b>Recalibrate</b> for every objective — the eyepiece divisions do not change, but what they represent does.</li>
      </ol>
      <p>Then measure the specimen in eyepiece divisions and multiply.</p>`},
    { type:'num', h2:'Your turn — measuring a cell', q:'At ×400, one eyepiece graticule division represents <b>2.5 µm</b>. A cell spans <b>18</b> eyepiece divisions. Calculate the length of the cell.',
      unit:'µm', answer:45, tol:0.5, hint:'18 × 2.5.' },
    { type:'mcq', h2:'Calibration check',
      q:'A student calibrates the eyepiece graticule using the ×10 objective, then switches to the ×40 objective and uses the same calibration. What is wrong?',
      why:'The eyepiece graticule divisions stay the same size in the eyepiece, but at ×40 the specimen appears four times larger — so each division now represents a QUARTER of the length it did at ×10. Using the ×10 calibration at ×40 will overestimate the cell size by a factor of four. You must recalibrate for each objective.',
      opts:[['Nothing — the calibration is independent of magnification',0],['The graticule must be recalibrated: each division represents a different real length at each objective',1],['The stage micrometer must be recalibrated instead',0],['The cell will appear smaller, so the measurement will be too low',0]] },
    { type:'teach', tag:'Serial dilutions &amp; the colorimeter', h2:'Serial dilutions and the colorimeter',
      html:`      <p>A <b>serial dilution</b> makes a series of concentrations from one stock, each a fixed fraction of the last. For a <b>1 in 10</b> dilution, take <b>1 cm³</b> of solution and add <b>9 cm³</b> of distilled water, mix, then take 1 cm³ of <i>that</i> for the next tube. Each step multiplies the concentration by <b>0.1</b>.</p>
      <div class="eqn">C₁V₁ = C₂V₂<small>use this to work out how to make any dilution you need</small></div>
      <p>A <b>colorimeter</b> measures how much light of a chosen wavelength a solution absorbs.</p>
      <ul>
        <li>Select the <b>filter of the complementary colour</b> to the solution (a red solution absorbs most strongly in blue/green light).</li>
        <li><b>Zero the colorimeter</b> with a blank (distilled water, or the reagent alone) — this is the calibration step.</li>
        <li>Plot a <b>calibration curve</b> of absorbance against known concentration, then read your unknown off the line.</li>
      </ul>
      <p class="note">It is used to follow a <b>starch–amylase</b> reaction (absorbance falls as the blue-black colour disappears) and to quantify <b>membrane permeability in beetroot</b> (absorbance of the leaked pigment rises as the membrane is disrupted).</p>`},
    { type:'num', h2:'Your turn — serial dilution', q:'A stock solution of <b>1.0 mol dm⁻³</b> is diluted 1 in 10, <b>three times in succession</b>. Calculate the final concentration.',
      unit:'mol dm⁻³', answer:0.001, tol:0.00005, hint:'Each step × 0.1: 1.0 → 0.1 → 0.01 → ?' },
    { type:'teach', tag:'Water potential', h2:'Measuring water potential and incipient plasmolysis',
      html:`      <p><b>Average water potential of plant tissue</b> (e.g. potato): cut cylinders of equal size, record the initial mass or length, leave one in each of a range of sucrose concentrations, and re-measure. Plot <b>percentage change in mass</b> against concentration. Where the line crosses <b>zero change</b>, there was <b>no net osmosis</b> — so the water potential of the tissue <b>equals</b> the water potential of that solution.</p>
      <div class="eqn">% change in mass = (change in mass ÷ initial mass) × 100<small>using % change, not raw change, corrects for cylinders that started at slightly different masses</small></div>
      <p><b>Average solute potential at incipient plasmolysis:</b> place strips of epidermis in a range of sucrose concentrations and count the proportion of cells plasmolysed. At <b>incipient plasmolysis</b>, <b>50 %</b> of cells are just beginning to plasmolyse; the protoplast is no longer pushing on the wall, so <b>ψ<sub>p</sub> = 0</b> and therefore <b>ψ = ψ<sub>s</sub></b> — the cell&rsquo;s solute potential equals that of the external solution.</p>`},
    { type:'teach', tag:'Mitosis · root tip squash', h2:'The root tip squash',
      html:`      <ol style="margin:0 0 14px 2px;padding-left:22px">
        <li>Cut the <b>tip</b> (about 5 mm) of a growing root — this is the <b>meristem</b>, where mitosis is happening.</li>
        <li>Warm in <b>hydrochloric acid</b> to hydrolyse the middle lamella, so the cells separate and can be squashed into a single layer.</li>
        <li>Stain with <b>acetic orcein</b> (or toluidine blue), which binds to the chromosomes and makes them visible.</li>
        <li><b>Squash</b> gently under a coverslip so light passes through a single layer of cells.</li>
      </ol>
      <div class="eqn">mitotic index = (number of cells in mitosis ÷ total number of cells) × 100 %<small>count several fields of view, and count every cell — including those in interphase</small></div>`},
    { type:'num', h2:'Your turn — mitotic index', q:'In a root tip squash you count <b>500</b> cells, of which <b>65</b> are in a stage of mitosis. Calculate the <b>mitotic index</b> as a percentage.',
      unit:'%', answer:13, tol:0.3, hint:'(65 ÷ 500) × 100.' },
    { type:'teach', tag:'Analysis', h2:'Accuracy, precision, error and reliability',
      html:`      <ul>
        <li><b>Accuracy</b> — how close a measurement is to the <b>true</b> value.</li>
        <li><b>Precision</b> — how closely repeated measurements agree with each other. You can be precisely wrong: a badly calibrated balance gives precise but inaccurate results.</li>
        <li><b>Reliability</b> — comes from <b>repeats</b>, and from calculating a <b>mean</b> (discarding anomalies first).</li>
        <li><b>Validity</b> — comes from <b>controlling the other variables</b>, so that the effect you measure really is caused by your independent variable.</li>
      </ul>
      <div class="eqn">% error = (uncertainty ÷ measured value) × 100<small>uncertainty is usually half the smallest division of the instrument</small></div>
      <p class="note">This is why you should <b>use as large a measurement as is practical</b>: measuring 25.0 cm³ with a ±0.5 cm³ cylinder gives a 2 % error, but measuring 5.0 cm³ with the same cylinder gives a <b>10 %</b> error. A random error is reduced by repeating; a <b>systematic</b> error (e.g. a balance that reads 0.2 g high) is <b>not</b> — you must calibrate the instrument.</p>`},
    { type:'num', h2:'Your turn — percentage error', q:'A measuring cylinder has an uncertainty of <b>±0.5 cm³</b>. A student measures <b>25.0 cm³</b>. Calculate the <b>percentage error</b> in this measurement.',
      unit:'%', answer:2, tol:0.05, hint:'(0.5 ÷ 25.0) × 100.' },
    { type:'match', h2:'Match the term to its meaning', prompt:'Tap a meaning on the left, then the correct term.',
      headL:'Meaning', headR:'Term',
      pairs:[
        {l:'How close a measurement is to the true value', r:'Accuracy'},
        {l:'How closely repeated measurements agree with one another', r:'Precision'},
        {l:'Improved by repeating and taking a mean', r:'Reliability'},
        {l:'Achieved by controlling all the other variables', r:'Validity'}] },
    { type:'mcq', h2:'Designing it properly',
      q:'A student investigates the effect of temperature on amylase. Which change would most improve the <b>validity</b> of the experiment?',
      why:'Validity is about whether you are really measuring the effect of your independent variable. Buffering the pH removes a confounding variable — without it, any change in rate might be caused by pH rather than temperature. Repeating improves RELIABILITY, not validity.',
      opts:[['Repeat each temperature five times and take a mean',0],['Buffer every tube to the same pH, so pH cannot confound the result',1],['Use a more precise thermometer',0],['Use a bigger volume of starch',0]] }
  ]
}

];
