/* Topics 1-5 */
module.exports = [

/* ================= TOPIC 1 ================= */
{
  slug: 'atomic-structure-periodic-table',
  specTopic: 'Topic 1: Atomic Structure and the Periodic Table',
  title: 'Atomic Structure &amp; the Periodic Table',
  emoji: '⚛️',
  desc: 'Interactive Edexcel A-level Chemistry (9CH0) mini-lesson on Topic 1: sub-atomic particles, isotopes, mass spectra and relative atomic mass, first and successive ionisation energies, orbitals and electron configurations to Z = 36, and periodicity in melting temperature and ionisation energy.',
  intro: 'Topic 1 builds the model you will use for the whole A-level: <b>isotopes and mass spectra</b>, <b>ionisation energies</b> as evidence for shells and sub-shells, <b>orbitals</b> and electron configurations, and the <b>periodic trends</b> that follow from them.',
  pillars: [['mass', 'spectra'], ['ionisation', 'energies'], ['orbitals &amp;', 'sub-shells'], ['periodic', 'trends']],
  pillarCaption: 'evidence first, then the model, then the trends',
  screens: [
    { t: 'teach', tag: 'Atoms · isotopes', h: 'Particles, isotopes and relative masses', html: `      <p>An atom is a nucleus of <b>protons</b> (relative mass 1, charge +1) and <b>neutrons</b> (mass 1, charge 0), surrounded by <b>electrons</b> (mass 1/1836, charge −1).</p>
      <ul>
        <li><b>Atomic number Z</b> = protons. <b>Mass number A</b> = protons + neutrons.</li>
        <li><b>Isotopes</b> = atoms of the same element with the <b>same Z</b> but <b>different numbers of neutrons</b>. They have <b>identical chemical properties</b> (same electron configuration) but different masses, so they differ in physical properties such as density and rate of diffusion.</li>
      </ul>
      <p class="note"><b>Definitions Edexcel expects:</b><br><b>Relative isotopic mass</b> = mass of one atom of an isotope compared with 1/12 the mass of one atom of carbon-12.<br><b>Relative atomic mass (A<sub>r</sub>)</b> = the <b>weighted mean</b> mass of an atom of an element compared with 1/12 the mass of one atom of carbon-12.<br>For giant structures we quote a <b>relative formula mass</b> rather than a relative molecular mass.</p>` },

    { t: 'teach', tag: 'Mass spectrometry', h: 'Reading a mass spectrum', html: `      <p>A mass spectrometer ionises the sample and separates the ions by <b>mass/charge ratio (m/z)</b>. The peak positions give the isotope masses; the peak heights give their <b>relative abundances</b>.</p>
      <div class="eqn">A<sub>r</sub> = Σ(isotopic mass × % abundance) ÷ 100<small>Assume the ions are 1+ unless told otherwise, so m/z = relative mass.</small></div>
      <p>For a <b>diatomic</b> molecule the molecular ion region shows several peaks. Chlorine is 75% <sup>35</sup>Cl and 25% <sup>37</sup>Cl, so Cl<sub>2</sub><sup>+</sup> appears at m/z 70, 72 and 74.</p>
      <ul>
        <li>70 (<sup>35</sup>Cl–<sup>35</sup>Cl): 0.75 × 0.75 = 0.5625</li>
        <li>72 (<sup>35</sup>Cl–<sup>37</sup>Cl, either way round): 2 × 0.75 × 0.25 = 0.375</li>
        <li>74 (<sup>37</sup>Cl–<sup>37</sup>Cl): 0.25 × 0.25 = 0.0625</li>
      </ul>
      <p class="note"><b>Ratio 9 : 6 : 1.</b> Divide each probability by 0.0625 and you get exactly 9 : 6 : 1 — a favourite Edexcel prediction question.</p>` },

    { t: 'num', h: 'A<sub>r</sub> of chlorine from abundances', q: 'A mass spectrum of chlorine atoms shows <b>75.0%</b> of <sup>35</sup>Cl (relative isotopic mass 35.0) and <b>25.0%</b> of <sup>37</sup>Cl (relative isotopic mass 37.0). Calculate the relative atomic mass to 1 decimal place.', ans: '35.5', tol: '0.05', unit: '', hint: '(75.0 × 35.0 + 25.0 × 37.0) ÷ 100 = (2625 + 925) ÷ 100.' },

    { t: 'num', h: 'A<sub>r</sub> of boron', q: 'Boron is <b>19.9%</b> <sup>10</sup>B (mass 10.0) and <b>80.1%</b> <sup>11</sup>B (mass 11.0). Calculate A<sub>r</sub> to 2 decimal places.', ans: '10.80', tol: '0.02', unit: '', hint: '(19.9 × 10.0 + 80.1 × 11.0) ÷ 100 = (199 + 881.1) ÷ 100.' },

    { t: 'mcq', h: 'The Cl<sub>2</sub> molecular ion peaks', q: 'Using the 3 : 1 ratio of <sup>35</sup>Cl to <sup>37</sup>Cl, what are the relative heights of the Cl<sub>2</sub><sup>+</sup> peaks at m/z = 70, 72 and 74?', why: 'The probabilities are 0.75 x 0.75 = 0.5625, 2 x 0.75 x 0.25 = 0.375 and 0.25 x 0.25 = 0.0625, which simplify to 9 : 6 : 1. The 72 peak is doubled because the two different atoms can be either way round.', opts: [['9 : 6 : 1', 1], ['3 : 1 : 1', 0], ['1 : 2 : 1', 0], ['9 : 3 : 1', 0]] },

    { t: 'teach', tag: 'Ionisation energy', h: 'First and successive ionisation energies', html: `      <p><b>First ionisation energy</b>: the energy needed to remove one electron from each atom in <b>one mole of gaseous atoms</b> to form one mole of gaseous 1+ ions.</p>
      <div class="eqn">Na(g) → Na<sup>+</sup>(g) + e<sup>−</sup><small>State symbols matter — every species is gaseous, and it is always endothermic.</small></div>
      <p>The size of an ionisation energy depends on three things:</p>
      <ul>
        <li><b>Nuclear charge</b> — more protons, stronger attraction, higher IE.</li>
        <li><b>Atomic radius</b> — further out, weaker attraction, lower IE.</li>
        <li><b>Shielding</b> — more inner shells repel the outer electron, lowering the IE.</li>
      </ul>
      <p class="note"><b>Evidence for sub-shells:</b> across Period 3 the IE generally <b>rises</b> (nuclear charge up, radius down), but it <b>dips</b> at Al (the 3p electron is in a higher-energy sub-shell than 3s) and again at S (the first 3p pairing brings electron–electron repulsion). <b>Successive</b> IEs rise steadily, then jump sharply when a new, closer shell is broken into — which tells you the group number.</p>` },

    { t: 'mcq', h: 'The dip at aluminium', q: 'The first ionisation energy of aluminium is <b>lower</b> than that of magnesium, even though aluminium has one more proton. Why?', why: 'The electron removed from Al is a 3p electron, which is in a higher-energy sub-shell that is slightly further from the nucleus and shielded by the filled 3s pair, so it is easier to remove than the 3s electron taken from Mg.', opts: [['The electron removed from Al comes from the higher-energy 3p sub-shell, which is shielded by the full 3s sub-shell', 1], ['Aluminium has a smaller nuclear charge than magnesium', 0], ['Aluminium atoms are smaller, so the electron is held less tightly', 0], ['The 3p electron in aluminium is paired, so repulsion makes it easier to remove', 0]] },

    { t: 'num', h: 'Successive ionisation energies', q: 'The first four ionisation energies of an element (kJ mol<sup>−1</sup>) are <b>590, 1145, 4912, 6491</b>. The huge jump comes between the 2nd and 3rd. Which <b>group</b> of the Periodic Table is the element in?', ans: '2', tol: '0.1', unit: '(group number)', hint: 'Two electrons come off relatively easily; the third has to be pulled out of a full inner shell.' },

    { t: 'teach', tag: 'Orbitals', h: 'Orbitals, sub-shells and electron configurations', html: `      <p>An <b>orbital</b> is a region that can hold a maximum of <b>two electrons</b>, which must have <b>opposite spins</b>.</p>
      <ul>
        <li><b>s</b> sub-shell: 1 spherical orbital → 2 electrons</li>
        <li><b>p</b> sub-shell: 3 dumb-bell orbitals at right angles → 6 electrons</li>
        <li><b>d</b> sub-shell: 5 orbitals → 10 electrons</li>
      </ul>
      <p>Fill from the lowest energy up. The <b>4s sub-shell fills before 3d</b> (it is lower in energy in the empty atom) — and 4s electrons are <b>lost first</b> when an ion forms.</p>
      <p class="note"><b>Two exceptions to learn:</b> chromium is [Ar] 3d<sup>5</sup> 4s<sup>1</sup> and copper is [Ar] 3d<sup>10</sup> 4s<sup>1</sup> — a half-full or full d sub-shell is more stable than the expected 4s<sup>2</sup> arrangement.</p>
      <p>Edexcel expects configurations (1s notation and electrons-in-boxes) up to <b>Z = 36</b>, and ions for the <b>s and p blocks</b>.</p>` },

    { t: 'mcq', h: 'Configuration of chromium', q: 'What is the ground-state electron configuration of a chromium atom (Z = 24)?', why: 'Chromium is one of the two exceptions: a half-filled 3d sub-shell with a single 4s electron, [Ar] 3d5 4s1, is lower in energy than the expected [Ar] 3d4 4s2.', opts: [['[Ar] 3d<sup>5</sup> 4s<sup>1</sup>', 1], ['[Ar] 3d<sup>4</sup> 4s<sup>2</sup>', 0], ['[Ar] 3d<sup>6</sup>', 0], ['[Ar] 4s<sup>2</sup> 4p<sup>4</sup>', 0]] },

    { t: 'mcq', h: 'Making an iron(II) ion', q: 'Iron is [Ar] 3d<sup>6</sup> 4s<sup>2</sup>. What is the configuration of Fe<sup>2+</sup>?', why: 'The 4s electrons are removed first when a d-block ion forms, so Fe2+ is [Ar] 3d6, not [Ar] 3d4 4s2.', opts: [['[Ar] 3d<sup>6</sup>', 1], ['[Ar] 3d<sup>4</sup> 4s<sup>2</sup>', 0], ['[Ar] 3d<sup>5</sup> 4s<sup>1</sup>', 0], ['[Ar] 3d<sup>8</sup>', 0]] },

    { t: 'sort' },

    { t: 'teach', tag: 'Periodicity', h: 'Periodicity in Period 3', html: `      <p>Melting temperature across Period 3 is controlled by <b>structure and bonding</b>, not by a single smooth trend:</p>
      <ul>
        <li><b>Na → Al</b>: giant <b>metallic</b> lattices. More delocalised electrons per atom and a smaller ion, so the melting temperature <b>rises</b>.</li>
        <li><b>Si</b>: giant <b>covalent</b> lattice — strong covalent bonds throughout, so it has by far the <b>highest</b> melting temperature.</li>
        <li><b>P<sub>4</sub>, S<sub>8</sub>, Cl<sub>2</sub></b>: <b>simple molecular</b> — only weak <b>London forces</b> between molecules, so low melting temperatures. S<sub>8</sub> &gt; P<sub>4</sub> &gt; Cl<sub>2</sub> because the bigger the molecule, the more electrons and the stronger the London forces.</li>
        <li><b>Ar</b>: monatomic, so the weakest forces of all.</li>
      </ul>
      <p class="note"><b>Do not say</b> that covalent bonds break when P<sub>4</sub> or S<sub>8</sub> melts. Melting a simple molecular solid only overcomes the <b>intermolecular forces</b>.</p>` },

    { t: 'mcq', h: 'The peak at silicon', q: 'Why does silicon have the highest melting temperature in Period 3?', why: 'Silicon has a giant covalent (macromolecular) lattice: every atom is joined to four others by strong covalent bonds, and a very large number of these must be broken to melt it.', opts: [['It is a giant covalent lattice, so many strong covalent bonds must be broken', 1], ['It has the strongest London forces of any Period 3 element', 0], ['It has the greatest number of delocalised electrons per atom', 0], ['It has the smallest atomic radius in the period', 0]] },

    { t: 'num', h: 'm/z of a 2+ ion', q: 'In some mass spectrometers a small number of 2+ ions form. Calculate the <b>m/z</b> value of a <sup>24</sup>Mg<sup>2+</sup> ion.', ans: '12', tol: '0.1', unit: '', hint: 'm/z means mass divided by charge: 24 ÷ 2.' },

    { t: 'match' }
  ],
  sort: {
    h: 'Which block?', prompt: 'Tap a configuration, then tap the block of the Periodic Table it belongs to. The block is named after the sub-shell that is filling.',
    bins: [{ key: 's', label: '🟦 s-block' }, { key: 'p', label: '🟩 p-block' }, { key: 'd', label: '🟪 d-block' }],
    chips: [['K [Ar] 4s¹', 's'], ['Ca [Ar] 4s²', 's'], ['Al [Ne] 3s² 3p¹', 'p'], ['Si [Ne] 3s² 3p²', 'p'], ['Br [Ar] 3d¹⁰ 4s² 4p⁵', 'p'], ['Fe [Ar] 3d⁶ 4s²', 'd'], ['Cr [Ar] 3d⁵ 4s¹', 'd'], ['Zn [Ar] 3d¹⁰ 4s²', 'd']],
    doneMsg: 'All sorted — the block is set by the sub-shell being filled, so Br is p-block even though its 3d is full.'
  },
  match: {
    h: 'Definitions you must be able to write', prompt: 'Match each definition to the term Edexcel expects.', leftHead: 'Definition', rightHead: 'Term',
    pairs: [
      ['Energy to remove one electron from each atom in one mole of gaseous atoms', 'First ionisation energy'],
      ['Weighted mean mass of an atom compared with 1/12 the mass of a carbon-12 atom', 'Relative atomic mass'],
      ['Mass of one atom of a single isotope compared with 1/12 of a carbon-12 atom', 'Relative isotopic mass'],
      ['Atoms of the same element with different numbers of neutrons', 'Isotopes']
    ],
    doneMsg: 'All matched — learn these word for word; they are easy marks.'
  },
  recap: [
    ['Isotopes', 'same protons, different neutrons — identical chemistry, different mass'],
    ['Mass spectra', 'A<sub>r</sub> = Σ(mass × %abundance) ÷ 100; Cl<sub>2</sub> gives 70 : 72 : 74 in a 9 : 6 : 1 ratio'],
    ['Ionisation energy', 'depends on nuclear charge, radius and shielding; dips at Al (3p) and S (pairing)'],
    ['Successive IEs', 'a big jump reveals the group number'],
    ['Orbitals', 's = 2 e⁻, p = 6 e⁻, d = 10 e⁻; 4s fills before 3d and empties first; Cr and Cu are exceptions'],
    ['Periodicity', 'melting temperature follows structure: metallic → giant covalent (Si) → simple molecular']
  ]
},

/* ================= TOPIC 2 ================= */
{
  slug: 'bonding-structure',
  specTopic: 'Topic 2: Bonding and Structure',
  title: 'Bonding and Structure',
  emoji: '🔗',
  desc: 'Interactive Edexcel A-level Chemistry (9CH0) mini-lesson on Topic 2: ionic, covalent and dative bonding, electron-pair repulsion (VSEPR) shapes up to six electron pairs, electronegativity and polarity, London forces, permanent dipoles and hydrogen bonding, and the four types of structure.',
  intro: 'Topic 2 is the topic that explains <b>why substances behave as they do</b>: the three bond types as a <b>continuum</b>, <b>shapes</b> from electron-pair repulsion, <b>polarity</b>, the three <b>intermolecular forces</b>, and how structure controls physical properties.',
  pillars: [['bonding', 'types'], ['shapes', '(VSEPR)'], ['polarity &amp;', 'IMFs'], ['structure &amp;', 'properties']],
  pillarCaption: 'bonding → shape → forces → properties',
  screens: [
    { t: 'teach', tag: 'Bonding · ionic', h: 'Ionic bonding', html: `      <p><b>Ionic bonding</b> is the <b>electrostatic attraction between oppositely charged ions</b> in a giant lattice. It is <b>not</b> a bond between two ions only — every ion attracts all its oppositely charged neighbours.</p>
      <ul>
        <li>Melting temperature rises with <b>greater ionic charge</b> and <b>smaller ionic radius</b>: MgO (2+/2−, small ions) melts far higher than NaCl (1+/1−).</li>
        <li>Ionic solids do not conduct, because the ions are fixed. <b>Molten</b> or <b>aqueous</b> they do, because the ions are now mobile.</li>
      </ul>
      <p class="note"><b>Evidence for ions:</b> migration of coloured ions in electrolysis, and electron-density maps showing near-zero density between the ions.</p>` },

    { t: 'teach', tag: 'Bonding · covalent', h: 'Covalent and dative covalent bonding', html: `      <p>A <b>covalent bond</b> is a shared pair of electrons attracted to <b>both</b> nuclei. A <b>dative (coordinate)</b> bond is a covalent bond in which <b>both</b> electrons come from the <b>same</b> atom; it is drawn as an arrow from the donor.</p>
      <ul>
        <li><b>NH<sub>4</sub><sup>+</sup></b> — the lone pair on N is donated to H<sup>+</sup>. All four N–H bonds are then <b>identical</b>.</li>
        <li><b>Al<sub>2</sub>Cl<sub>6</sub></b> — a dimer held together by two dative bonds from lone pairs on bridging chlorine atoms.</li>
      </ul>
      <p class="note"><b>Bond length and strength:</b> the shorter the bond, the stronger it is. C≡C &lt; C=C &lt; C–C in length, and the reverse in bond enthalpy.</p>` },

    { t: 'mcq', h: 'Bonding in the ammonium ion', q: 'In NH<sub>4</sub><sup>+</sup>, one of the four N–H bonds is dative. What does experiment show about the four bonds?', why: 'Once the dative bond has formed, the electrons are indistinguishable from those in the other bonds. All four N-H bonds are identical in length and strength, and the ion is a regular tetrahedron with bond angles of 109.5 degrees.', opts: [['They are all identical in length and strength', 1], ['The dative bond is longer and weaker than the other three', 0], ['The dative bond is shorter and stronger than the other three', 0], ['The dative bond has no effect on the shape, which is trigonal pyramidal', 0]] },

    { t: 'teach', tag: 'Shapes · VSEPR', h: 'Electron-pair repulsion: shapes and angles', html: `      <p>Electron pairs around the central atom repel each other and get as <b>far apart as possible</b>. Crucially, <b>lone pairs repel more strongly than bonding pairs</b>, so each lone pair squeezes the bond angle down by roughly <b>2.5°</b>.</p>
      <div class="eqn">lone pair–lone pair &gt; lone pair–bond pair &gt; bond pair–bond pair<small>Count the pairs on the central atom, then subtract for lone pairs.</small></div>
      <ul>
        <li><b>2 pairs</b> — linear, 180° (BeCl<sub>2</sub>, CO<sub>2</sub>)</li>
        <li><b>3 pairs</b> — trigonal planar, 120° (BCl<sub>3</sub>)</li>
        <li><b>4 pairs, 0 lone</b> — tetrahedral, 109.5° (CH<sub>4</sub>, NH<sub>4</sub><sup>+</sup>)</li>
        <li><b>4 pairs, 1 lone</b> — trigonal pyramidal, 107° (NH<sub>3</sub>)</li>
        <li><b>4 pairs, 2 lone</b> — bent / non-linear, 104.5° (H<sub>2</sub>O)</li>
        <li><b>5 pairs</b> — trigonal bipyramidal, 120° and 90° (PCl<sub>5</sub>)</li>
        <li><b>6 pairs</b> — octahedral, 90° (SF<sub>6</sub>)</li>
      </ul>
      <p class="note"><b>Note:</b> a double bond counts as <b>one</b> region of electron density, which is why CO<sub>2</sub> is linear.</p>` },

    { t: 'num', h: 'The bond angle in water', q: 'Oxygen in H<sub>2</sub>O has <b>2 bonding pairs and 2 lone pairs</b>. Starting from the tetrahedral 109.5° and allowing about 2.5° of extra squeeze per lone pair, what bond angle would you quote for water?', ans: '104.5', tol: '0.6', unit: '°', hint: '109.5 − (2 × 2.5) = ?' },

    { t: 'num', h: 'The bond angle in BCl<sub>3</sub>', q: 'Boron in BCl<sub>3</sub> has <b>3 bonding pairs and no lone pairs</b>. State the Cl–B–Cl bond angle.', ans: '120', tol: '0.6', unit: '°', hint: 'Three regions of electron density in a plane, spread evenly: 360 ÷ 3.' },

    { t: 'mcq', h: 'The shape of SF<sub>6</sub>', q: 'Sulfur in SF<sub>6</sub> is surrounded by six bonding pairs. What is the shape and bond angle?', why: 'Six bonding pairs and no lone pairs give an octahedral shape with all bond angles equal to 90 degrees. Edexcel expects shapes up to six electron pairs, including SF6 and PCl5.', opts: [['Octahedral, 90°', 1], ['Trigonal bipyramidal, 120° and 90°', 0], ['Hexagonal planar, 60°', 0], ['Tetrahedral, 109.5°', 0]] },

    { t: 'teach', tag: 'Polarity', h: 'Electronegativity, polar bonds and polar molecules', html: `      <p><b>Electronegativity</b> is the ability of an atom to <b>attract the bonding electrons</b> in a covalent bond. It increases <b>across</b> a period and <b>up</b> a group; F is the most electronegative element.</p>
      <p>Bonding is a <b>continuum</b>: a small electronegativity difference gives a pure covalent bond, a larger one gives a <b>polar covalent</b> bond (δ+ / δ−), and a very large one gives ionic bonding.</p>
      <p class="note"><b>Polar bonds ≠ polar molecule.</b> CO<sub>2</sub> and CCl<sub>4</sub> contain very polar bonds, but the molecules are <b>symmetrical</b>, so the bond dipoles <b>cancel</b> and there is no overall dipole. H<sub>2</sub>O is bent and NH<sub>3</sub> is pyramidal, so their dipoles do <b>not</b> cancel and both molecules are polar.</p>` },

    { t: 'mcq', h: 'Why is CO<sub>2</sub> non-polar?', q: 'The C=O bond has a large electronegativity difference, yet carbon dioxide has no overall dipole. Why?', why: 'CO2 is linear and symmetrical, so the two equal bond dipoles act in exactly opposite directions and cancel. The molecule therefore has no net dipole moment even though each bond is polar.', opts: [['The molecule is linear and symmetrical, so the two bond dipoles cancel exactly', 1], ['Carbon and oxygen have the same electronegativity', 0], ['The double bonds prevent a dipole from forming', 0], ['The lone pairs on oxygen cancel the dipoles', 0]] },

    { t: 'teach', tag: 'IMFs', h: 'The three intermolecular forces', html: `      <ul>
        <li><b>London (dispersion) forces</b> — present between <b>all</b> molecules. Instantaneous dipoles induce dipoles in neighbours. Stronger when there are <b>more electrons</b> (bigger M<sub>r</sub>) and when molecules can <b>pack closely</b>, so straight-chain alkanes boil higher than branched isomers.</li>
        <li><b>Permanent dipole–dipole</b> — extra attraction between polar molecules, e.g. HCl, propanone.</li>
        <li><b>Hydrogen bonding</b> — the strongest. Needs H bonded directly to <b>N, O or F</b>, plus a <b>lone pair</b> on the N, O or F of a neighbour. Drawn as a dashed line, showing the lone pair and the near-<b>180°</b> alignment.</li>
      </ul>
      <p class="note"><b>Anomalous water:</b> ice is <b>less dense</b> than liquid water because hydrogen bonds hold the molecules in an open tetrahedral lattice. Water also has an unusually high boiling temperature, surface tension and specific heat capacity. Down group 7, HCl → HI boiling temperatures <b>rise</b> (London forces grow with electron count) but <b>HF is anomalously high</b> because of hydrogen bonding.</p>` },

    { t: 'num', h: 'Hydrogen bonds in ice', q: 'In ice each water molecule uses both of its δ+ hydrogen atoms and both of the lone pairs on its oxygen. How many hydrogen bonds does each H<sub>2</sub>O molecule form in the ice lattice?', ans: '4', tol: '0.1', unit: 'hydrogen bonds', hint: '2 hydrogen atoms + 2 lone pairs.' },

    { t: 'mcq', h: 'The HF anomaly', q: 'Boiling temperatures rise steadily from HCl to HBr to HI, yet HF boils much higher than all of them. Why?', why: 'HF molecules are hydrogen bonded: hydrogen is attached to the very electronegative fluorine, which also carries lone pairs. Hydrogen bonds are considerably stronger than the permanent dipole and London forces in the other hydrogen halides, so far more energy is needed to separate the molecules.', opts: [['HF molecules are held together by hydrogen bonds, which are stronger than the forces in HCl, HBr and HI', 1], ['HF has the largest number of electrons, so it has the strongest London forces', 0], ['The H–F covalent bond is the strongest, so more energy is needed to boil it', 0], ['HF is ionic whereas the others are covalent', 0]] },

    { t: 'sort' },

    { t: 'teach', tag: 'Structure', h: 'Four structures, four sets of properties', html: `      <ul>
        <li><b>Giant ionic</b> (NaCl, MgO) — high melting temperature; conducts only when molten or dissolved; often soluble in water.</li>
        <li><b>Giant covalent</b> (diamond, graphite, SiO<sub>2</sub>) — very high melting temperature; insoluble. <b>Diamond</b>: 4 bonds per C, tetrahedral, hard, does not conduct. <b>Graphite</b>: 3 bonds per C in layers, the 4th electron is <b>delocalised</b>, so it conducts in the plane of the layers and the weak forces <b>between</b> layers let it act as a lubricant. <b>Graphene</b>: a single graphite layer — enormous strength and conductivity.</li>
        <li><b>Giant metallic</b> — cations in a sea of delocalised electrons; conducts, malleable (layers slide without breaking the bonding).</li>
        <li><b>Simple molecular</b> (I<sub>2</sub>, CO<sub>2</sub>) — low melting temperature (only IMFs break), does not conduct.</li>
      </ul>
      <p class="note"><b>Solvent choice:</b> like dissolves like. Ionic and hydrogen-bonded solutes (NaCl, ethanol) dissolve in water; non-polar solutes (I<sub>2</sub>, hexane) dissolve in non-polar solvents.</p>` },

    { t: 'mcq', h: 'Why graphite conducts', q: 'Graphite conducts electricity but diamond does not. Why?', why: 'Each carbon in graphite forms only three covalent bonds, so one electron per atom is delocalised between the layers and free to move. In diamond every carbon uses all four outer electrons in covalent bonds, so none are free.', opts: [['Each carbon in graphite bonds to only three others, leaving one delocalised electron per atom', 1], ['Graphite contains ions that are free to move', 0], ['The layers in graphite are held together by covalent bonds', 0], ['Graphite has a lower melting temperature, so its electrons escape more easily', 0]] },

    { t: 'match' }
  ],
  sort: {
    h: 'What is the strongest force between the molecules?', prompt: 'Tap a substance, then tap the strongest intermolecular force present in it. (Remember: London forces exist in all of them.)',
    bins: [{ key: 'ldn', label: '🟦 London only' }, { key: 'pdd', label: '🟩 Permanent dipole' }, { key: 'hb', label: '🟪 Hydrogen bonding' }],
    chips: [['CH₄', 'ldn'], ['Br₂', 'ldn'], ['C₆H₁₄ hexane', 'ldn'], ['HCl', 'pdd'], ['CH₃Cl', 'pdd'], ['propanone CH₃COCH₃', 'pdd'], ['H₂O', 'hb'], ['NH₃', 'hb'], ['CH₃OH', 'hb']],
    doneMsg: 'All sorted — hydrogen bonding needs H bonded straight to N, O or F.'
  },
  match: {
    h: 'Shape and angle', prompt: 'Match each shape and bond angle to the molecule that has it.', leftHead: 'Shape and angle', rightHead: 'Molecule',
    pairs: [
      ['Linear, 180°', 'CO₂'],
      ['Trigonal planar, 120°', 'BCl₃'],
      ['Tetrahedral, 109.5°', 'CH₄'],
      ['Octahedral, 90°', 'SF₆']
    ],
    doneMsg: 'All matched — count the electron pairs, then subtract 2.5 degrees for every lone pair.'
  },
  recap: [
    ['Ionic', 'electrostatic attraction in a giant lattice; charge ↑ and radius ↓ → higher melting temperature'],
    ['Dative', 'both electrons from one atom (NH<sub>4</sub><sup>+</sup>, Al<sub>2</sub>Cl<sub>6</sub>); the resulting bonds are identical'],
    ['Shapes', '2 = 180°, 3 = 120°, 4 = 109.5°, 5 = 120/90°, 6 = 90°; −2.5° per lone pair'],
    ['Polarity', 'polar bonds can cancel in a symmetrical molecule (CO<sub>2</sub>, CCl<sub>4</sub>)'],
    ['IMFs', 'London &lt; permanent dipole &lt; hydrogen bonding; ice is less dense than water'],
    ['Structures', 'giant ionic, giant covalent, giant metallic, simple molecular — properties follow the structure']
  ]
},

/* ================= TOPIC 3 ================= */
{
  slug: 'redox-i',
  specTopic: 'Topic 3: Redox I',
  title: 'Redox I',
  emoji: '🔄',
  desc: 'Interactive Edexcel A-level Chemistry (9CH0) mini-lesson on Topic 3 Redox I: oxidation number rules including peroxides and metal hydrides, oxidation and reduction as electron transfer, oxidising and reducing agents, disproportionation, and building full ionic equations from half-equations.',
  intro: 'Redox I is the <b>bookkeeping</b> topic — and it has to be watertight, because Topics 4, 5, 14 and 15 all lean on it. Here you meet <b>oxidation numbers</b>, <b>half-equations</b> and <b>disproportionation</b>, applied to the <b>s and p blocks</b>.',
  pillars: [['oxidation', 'numbers'], ['electron', 'transfer'], ['half-', 'equations'], ['dispro-', 'portionation']],
  pillarCaption: 'count the electrons, then follow them',
  screens: [
    { t: 'teach', tag: 'Oxidation number', h: 'The rules, in order of priority', html: `      <ul>
        <li>An <b>uncombined element</b> is 0 (including O<sub>2</sub>, P<sub>4</sub>, S<sub>8</sub>).</li>
        <li>A <b>simple ion</b> takes the charge on the ion (Mg<sup>2+</sup> = +2, Cl<sup>−</sup> = −1).</li>
        <li>The sum of the oxidation numbers = the <b>overall charge</b> on the species.</li>
        <li>Group 1 = +1, Group 2 = +2, F = −1 always.</li>
        <li><b>Hydrogen = +1</b>, <b>except in metal hydrides</b> (NaH, CaH<sub>2</sub>) where it is <b>−1</b>.</li>
        <li><b>Oxygen = −2</b>, <b>except in peroxides</b> (H<sub>2</sub>O<sub>2</sub>) where it is <b>−1</b>, and in F<sub>2</sub>O where it is +2.</li>
      </ul>
      <p class="note"><b>Roman numerals</b> give the oxidation number of the named element: iron(III) chloride is FeCl<sub>3</sub>; sulfuric(VI) acid is H<sub>2</sub>SO<sub>4</sub>; chlorate(V) is ClO<sub>3</sub><sup>−</sup>.</p>` },

    { t: 'num', h: 'Sulfur in thiosulfate', q: 'Find the oxidation number of <b>sulfur</b> in the thiosulfate ion, S<sub>2</sub>O<sub>3</sub><sup>2−</sup>. Give the answer as a signed number, e.g. +4.', ans: '2', tol: '0.1', unit: '(sign + value)', hint: '2S + 3(−2) = −2, so 2S = +4.' },

    { t: 'num', h: 'Nitrogen in the ammonium ion', q: 'Find the oxidation number of <b>nitrogen</b> in NH<sub>4</sub><sup>+</sup>.', ans: '-3', tol: '0.1', unit: '(sign + value)', hint: 'N + 4(+1) = +1.' },

    { t: 'mcq', h: 'Oxygen in hydrogen peroxide', q: 'What is the oxidation number of oxygen in H<sub>2</sub>O<sub>2</sub>?', why: 'Hydrogen peroxide is a peroxide, the exception to the usual rule: each O is −1. Check it: 2(+1) + 2(−1) = 0, which matches the neutral molecule.', opts: [['−1', 1], ['−2', 0], ['0', 0], ['+1', 0]] },

    { t: 'teach', tag: 'Electron transfer', h: 'Oxidation, reduction and the agents', html: `      <div class="eqn">OIL RIG<small>Oxidation Is Loss of electrons (oxidation number increases) · Reduction Is Gain of electrons (oxidation number decreases)</small></div>
      <p>The <b>agent</b> is always the opposite of what happens to it:</p>
      <ul>
        <li>An <b>oxidising agent</b> <b>gains</b> electrons (so it is itself <b>reduced</b>).</li>
        <li>A <b>reducing agent</b> <b>loses</b> electrons (so it is itself <b>oxidised</b>).</li>
      </ul>
      <p>In Mg + 2HCl → MgCl<sub>2</sub> + H<sub>2</sub>, magnesium goes 0 → +2 (oxidised, so it is the reducing agent) and hydrogen goes +1 → 0 (reduced, so H<sup>+</sup> is the oxidising agent).</p>` },

    { t: 'mcq', h: 'Spot the oxidising agent', q: 'In the reaction Cl<sub>2</sub> + 2KBr → 2KCl + Br<sub>2</sub>, which species is the oxidising agent?', why: 'Chlorine goes from 0 in Cl2 to −1 in KCl, so it gains electrons and is reduced — which makes it the oxidising agent. Bromide is oxidised from −1 to 0, so Br− is the reducing agent.', opts: [['Cl<sub>2</sub>', 1], ['KBr', 0], ['KCl', 0], ['Br<sub>2</sub>', 0]] },

    { t: 'teach', tag: 'Half-equations', h: 'Building and combining half-equations', html: `      <p>To balance a half-equation in acid solution: balance the <b>atom being oxidised or reduced</b>, then balance <b>O with H<sub>2</sub>O</b>, then balance <b>H with H<sup>+</sup></b>, then balance the <b>charge with electrons</b>.</p>
      <div class="eqn">SO<sub>4</sub><sup>2−</sup> + 4H<sup>+</sup> + 2e<sup>−</sup> → SO<sub>2</sub> + 2H<sub>2</sub>O<small>Charge check: (−2) + (+4) + (−2) = 0 on the left, 0 on the right ✓</small></div>
      <p>To combine two half-equations, scale them so that the <b>electrons cancel exactly</b>, then add. For example, with the half-equations Zn → Zn<sup>2+</sup> + 2e<sup>−</sup> and 2H<sup>+</sup> + 2e<sup>−</sup> → H<sub>2</sub>, the two electrons cancel directly:</p>
      <div class="eqn">Zn + 2H<sup>+</sup> → Zn<sup>2+</sup> + H<sub>2</sub><small>Always check that atoms AND total charge balance on both sides.</small></div>` },

    { t: 'num', h: 'How many electrons?', q: 'Sulfur is reduced from <b>+6</b> in SO<sub>4</sub><sup>2−</sup> to <b>+4</b> in SO<sub>2</sub>. In the half-equation SO<sub>4</sub><sup>2−</sup> + 4H<sup>+</sup> + <i>n</i>e<sup>−</sup> → SO<sub>2</sub> + 2H<sub>2</sub>O, what is <i>n</i>?', ans: '2', tol: '0.1', unit: 'electrons', hint: 'The number of electrons equals the change in oxidation number: from +6 to +4.' },

    { t: 'teach', tag: 'Disproportionation', h: 'Disproportionation', html: `      <p><b>Disproportionation</b> is the simultaneous <b>oxidation and reduction of the same element</b> in a single reaction.</p>
      <div class="eqn">Cl<sub>2</sub> + 2NaOH → NaCl + NaClO + H<sub>2</sub>O<small>Cl goes 0 → −1 (in NaCl, reduced) AND 0 → +1 (in NaClO, oxidised)</small></div>
      <p>Other examples you should recognise:</p>
      <ul>
        <li>Chlorine with water: Cl<sub>2</sub> + H<sub>2</sub>O ⇌ HCl + HClO (0 → −1 and 0 → +1)</li>
        <li>Chlorine with <b>hot</b> concentrated alkali: 3Cl<sub>2</sub> + 6NaOH → 5NaCl + NaClO<sub>3</sub> + 3H<sub>2</sub>O (0 → −1 and 0 → +5)</li>
      </ul>` },

    { t: 'mcq', h: 'Is it disproportionation?', q: 'Which reaction is a disproportionation?', why: 'In 3Cl2 + 6NaOH the chlorine is simultaneously reduced from 0 to −1 (NaCl) and oxidised from 0 to +5 (NaClO3) — one element, two directions. In the other reactions two different elements change oxidation number.', opts: [['3Cl<sub>2</sub> + 6NaOH → 5NaCl + NaClO<sub>3</sub> + 3H<sub>2</sub>O', 1], ['Mg + 2HCl → MgCl<sub>2</sub> + H<sub>2</sub>', 0], ['Cl<sub>2</sub> + 2KI → 2KCl + I<sub>2</sub>', 0], ['2Mg + O<sub>2</sub> → 2MgO', 0]] },

    { t: 'num', h: 'Chlorine in bleach', q: 'Sodium chlorate(I), NaClO, is the active ingredient of bleach. What is the oxidation number of <b>chlorine</b> in NaClO?', ans: '1', tol: '0.1', unit: '(sign + value)', hint: '(+1) + Cl + (−2) = 0.' },

    { t: 'sort' },

    { t: 'mcq', h: 'Hydrogen in a metal hydride', q: 'What is the oxidation number of hydrogen in sodium hydride, NaH?', why: 'Sodium is a group 1 metal so it must be +1, and the compound is neutral, so hydrogen must be −1. Metal hydrides are the exception to the usual H = +1 rule.', opts: [['−1', 1], ['+1', 0], ['0', 0], ['−2', 0]] },

    { t: 'match' }
  ],
  sort: {
    h: 'Oxidising agent or reducing agent?', prompt: 'Tap a species, then tap what it normally acts as. Ask yourself: does it gain electrons, or lose them?',
    bins: [{ key: 'ox', label: '🟦 Oxidising agent' }, { key: 'red', label: '🟩 Reducing agent' }],
    chips: [['Cl₂', 'ox'], ['F₂', 'ox'], ['O₂', 'ox'], ['concentrated H₂SO₄', 'ox'], ['Mg', 'red'], ['Zn', 'red'], ['I⁻', 'red'], ['H₂', 'red']],
    doneMsg: 'All sorted — an oxidising agent takes electrons and is itself reduced.'
  },
  match: {
    h: 'Find the oxidation number', prompt: 'Match each species to the oxidation number of the element in bold.', leftHead: 'Species', rightHead: 'Oxidation number',
    pairs: [
      ['S in H₂SO₄', '+6'],
      ['Cl in HClO₃', '+5'],
      ['N in NO₂', '+4'],
      ['O in H₂O₂', '−1']
    ],
    doneMsg: 'All matched — set the sum equal to the overall charge and solve.'
  },
  recap: [
    ['Rules', 'element = 0; H = +1 except metal hydrides (−1); O = −2 except peroxides (−1); sum = overall charge'],
    ['OIL RIG', 'oxidation = loss of electrons = oxidation number increases'],
    ['Agents', 'oxidising agent gains electrons and is reduced; reducing agent loses electrons and is oxidised'],
    ['Half-equations', 'balance atoms, then O with H<sub>2</sub>O, then H with H<sup>+</sup>, then charge with e<sup>−</sup>'],
    ['Disproportionation', 'one element oxidised AND reduced in the same reaction (Cl<sub>2</sub> with water or alkali)']
  ]
},

/* ================= TOPIC 4 ================= */
{
  slug: 'inorganic-chemistry-periodic-table',
  specTopic: 'Topic 4: Inorganic Chemistry and the Periodic Table',
  title: 'Inorganic Chemistry &amp; the Periodic Table',
  emoji: '🧪',
  desc: 'Interactive Edexcel A-level Chemistry (9CH0) mini-lesson on Topic 4: Group 2 reactions and trends, solubility of hydroxides and sulfates, thermal stability of nitrates and carbonates, flame colours, Group 7 trends, displacement reactions, halides with concentrated sulfuric acid, and the silver nitrate and anion tests.',
  intro: 'Topic 4 is where trends become <b>observations you can predict</b>: Group 2 reactivity and solubility, thermal stability and <b>polarising power</b>, <b>flame colours</b> (which must be recalled), Group 7 oxidising power, and the classic <b>test-tube tests</b>.',
  pillars: [['Group 2', 'trends'], ['thermal', 'stability'], ['Group 7', 'redox'], ['ion', 'tests']],
  pillarCaption: 'trends explain observations — and observations identify ions',
  screens: [
    { t: 'teach', tag: 'Group 2', h: 'Group 2 reactions and reactivity', html: `      <p>Down Group 2 the atomic radius grows and shielding increases, so the outer electrons are lost more easily: the <b>first ionisation energy falls</b> and <b>reactivity increases</b>.</p>
      <ul>
        <li><b>With oxygen</b>: 2Mg + O<sub>2</sub> → 2MgO (a brilliant white flame).</li>
        <li><b>With chlorine</b>: Mg + Cl<sub>2</sub> → MgCl<sub>2</sub>.</li>
        <li><b>With water</b>: Ca + 2H<sub>2</sub>O → Ca(OH)<sub>2</sub> + H<sub>2</sub> (steady fizzing). Magnesium reacts only very slowly with cold water, but burns in <b>steam</b>: Mg + H<sub>2</sub>O(g) → MgO + H<sub>2</sub>.</li>
      </ul>
      <p class="note"><b>Oxides and hydroxides:</b> the oxides react with water to give alkaline hydroxides (CaO + H<sub>2</sub>O → Ca(OH)<sub>2</sub>) and with dilute acid to give a salt and water. Uses: Ca(OH)<sub>2</sub> to neutralise acid soils, Mg(OH)<sub>2</sub> as an antacid.</p>` },

    { t: 'teach', tag: 'Solubility', h: 'Solubility trends down Group 2', html: `      <ul>
        <li><b>Hydroxides become MORE soluble</b> down the group: Mg(OH)<sub>2</sub> is almost insoluble; Ba(OH)<sub>2</sub> dissolves well. So the solutions become <b>more alkaline</b> down the group.</li>
        <li><b>Sulfates become LESS soluble</b> down the group: MgSO<sub>4</sub> is soluble; <b>BaSO<sub>4</sub> is insoluble</b>.</li>
      </ul>
      <p class="note"><b>This is why the tests work.</b> BaSO<sub>4</sub> being insoluble is the basis of the <b>sulfate test</b> (acidified BaCl<sub>2</sub> → white precipitate) and of the barium meal used in medical imaging (Ba<sup>2+</sup> is toxic, but BaSO<sub>4</sub> is so insoluble that it is not absorbed).</p>` },

    { t: 'mcq', h: 'Solubility down the group', q: 'Which statement is correct about Group 2 compounds?', why: 'Hydroxide solubility increases down the group (so alkalinity increases) while sulfate solubility decreases, which is why barium sulfate is essentially insoluble and is used in the sulfate test.', opts: [['Hydroxides become more soluble down the group while sulfates become less soluble', 1], ['Both hydroxides and sulfates become more soluble down the group', 0], ['Hydroxides become less soluble down the group while sulfates become more soluble', 0], ['Both hydroxides and sulfates become less soluble down the group', 0]] },

    { t: 'teach', tag: 'Thermal stability', h: 'Thermal stability and polarising power', html: `      <p>Carbonates and nitrates decompose on heating:</p>
      <div class="eqn">MgCO<sub>3</sub> → MgO + CO<sub>2</sub><small>and 2Ca(NO₃)₂ → 2CaO + 4NO₂ + O₂ (brown NO₂ fumes)</small></div>
      <p>They become <b>MORE thermally stable down the group</b>. The reason is <b>polarising power</b>:</p>
      <ul>
        <li>A <b>small, highly charged</b> cation (Mg<sup>2+</sup>) has a high <b>charge density</b>, so it <b>polarises</b> (distorts) the big carbonate anion strongly.</li>
        <li>That distortion weakens a C–O bond, so the carbonate decomposes at a <b>lower</b> temperature.</li>
        <li>Down the group the cation is <b>bigger</b>, so it polarises less and the compound survives to a <b>higher</b> temperature.</li>
      </ul>
      <p class="note"><b>Group 1 vs Group 2:</b> Group 1 carbonates (except Li<sub>2</sub>CO<sub>3</sub>) are so stable that a Bunsen cannot decompose them, because the 1+ ions have far lower charge density than 2+ ions.</p>` },

    { t: 'num', h: 'Decomposing calcium carbonate', q: 'Heat <b>10.0 g</b> of CaCO<sub>3</sub> until it fully decomposes to CaO and CO<sub>2</sub>. Calculate the mass of CaO formed. (M<sub>r</sub>: CaCO<sub>3</sub> = 100.1, CaO = 56.1.) Give your answer in grams to 2 decimal places.', ans: '5.60', tol: '0.06', unit: 'g', hint: 'n(CaCO₃) = 10.0 ÷ 100.1 = 0.0999 mol. The ratio is 1 : 1, so mass = 0.0999 × 56.1.' },

    { t: 'teach', tag: 'Flame tests', h: 'Flame colours — these must be recalled', html: `      <ul>
        <li>Li<sup>+</sup> — <b>red</b></li>
        <li>Na<sup>+</sup> — <b>yellow / orange</b></li>
        <li>K<sup>+</sup> — <b>lilac</b></li>
        <li>Ca<sup>2+</sup> — <b>brick red</b> (orange-red)</li>
        <li>Sr<sup>2+</sup> — <b>crimson / red</b></li>
        <li>Ba<sup>2+</sup> — <b>pale (apple) green</b></li>
        <li>Mg<sup>2+</sup> — <b>no colour</b></li>
      </ul>
      <p class="note"><b>Why there is a colour:</b> heat <b>promotes</b> an electron to a higher energy level. When the electron <b>drops back down</b>, the energy difference is emitted as a photon of a particular frequency (E = hν), and each ion has a unique set of energy gaps. Mg<sup>2+</sup> shows nothing visible because its energy gaps are too large — the light emitted is outside the visible range.</p>` },

    { t: 'match' },

    { t: 'teach', tag: 'Group 7', h: 'Halogen trends and displacement', html: `      <p>Down Group 7 the atoms get <b>bigger</b> with <b>more shielding</b>, so an incoming electron is less strongly attracted: <b>electronegativity falls</b> and <b>oxidising power falls</b>. Meanwhile melting and boiling temperatures <b>rise</b> as London forces grow (Cl<sub>2</sub> gas → Br<sub>2</sub> liquid → I<sub>2</sub> solid).</p>
      <p>A more reactive halogen <b>displaces</b> a less reactive halide:</p>
      <ul>
        <li>Cl<sub>2</sub> + 2KBr → 2KCl + Br<sub>2</sub> (solution turns orange)</li>
        <li>Cl<sub>2</sub> + 2KI → 2KCl + I<sub>2</sub> (brown solution, grey-black solid)</li>
        <li>Br<sub>2</sub> + 2KI → 2KBr + I<sub>2</sub></li>
      </ul>
      <p class="note"><b>Shake with an organic solvent</b> (e.g. hexane) to be sure: chlorine gives a <b>pale green/colourless</b> layer, bromine an <b>orange/red</b> layer and iodine a <b>violet/purple</b> layer.</p>` },

    { t: 'mcq', h: 'Why oxidising power falls', q: 'Why is chlorine a stronger oxidising agent than iodine?', why: 'Oxidising power depends on how easily the halogen gains an electron. The chlorine atom is smaller with less shielding, so its nucleus attracts the incoming electron much more strongly than the larger, more shielded iodine atom does.', opts: [['The Cl atom is smaller with less shielding, so it attracts an incoming electron more strongly', 1], ['Chlorine has a larger nuclear charge than iodine', 0], ['Chlorine is a gas, so its molecules collide more often', 0], ['The Cl–Cl bond is weaker than the I–I bond', 0]] },

    { t: 'teach', tag: 'Halides + H₂SO₄', h: 'Solid halides with concentrated sulfuric acid', html: `      <p>Concentrated H<sub>2</sub>SO<sub>4</sub> is an <b>oxidising agent</b>, and <b>reducing power increases down Group 7</b>. So the products tell you which halide you have:</p>
      <ul>
        <li><b>NaF, NaCl</b> — <b>no redox</b>. You just get the hydrogen halide: NaCl + H<sub>2</sub>SO<sub>4</sub> → NaHSO<sub>4</sub> + HCl (steamy, misty fumes).</li>
        <li><b>NaBr</b> — HBr is formed and some of it <b>reduces</b> the acid to <b>SO<sub>2</sub></b> (S: +6 → +4), giving <b>brown Br<sub>2</sub></b> fumes and a choking gas.</li>
        <li><b>NaI</b> — HI is the strongest reducing agent, so it reduces sulfur all the way to <b>H<sub>2</sub>S</b> (S: +6 → −2), a <b>rotten-egg</b> smell, plus <b>purple I<sub>2</sub></b> vapour, S and SO<sub>2</sub>.</li>
      </ul>` },

    { t: 'mcq', h: 'Identifying the rotten-egg gas', q: 'Adding concentrated H<sub>2</sub>SO<sub>4</sub> to a solid sodium halide gives purple fumes, a yellow solid and a gas that smells of rotten eggs. Which halide, and which gas?', why: 'Only iodide is a strong enough reducing agent to reduce sulfur from +6 all the way down to −2 in H2S, the rotten-egg gas. The purple fumes are iodine and the yellow solid is sulfur.', opts: [['Sodium iodide; the gas is H<sub>2</sub>S', 1], ['Sodium bromide; the gas is SO<sub>2</sub>', 0], ['Sodium chloride; the gas is HCl', 0], ['Sodium iodide; the gas is SO<sub>2</sub>', 0]] },

    { t: 'teach', tag: 'Ion tests', h: 'The test-tube tests', html: `      <ul>
        <li><b>Halides</b>: add dilute HNO<sub>3</sub> (to remove carbonate), then AgNO<sub>3</sub>(aq). <b>AgCl white</b> (dissolves in <b>dilute</b> NH<sub>3</sub>) · <b>AgBr cream</b> (dissolves only in <b>concentrated</b> NH<sub>3</sub>) · <b>AgI yellow</b> (insoluble even in concentrated NH<sub>3</sub>).</li>
        <li><b>Carbonate</b>: add dilute acid → fizzing; the gas turns <b>limewater milky</b>.</li>
        <li><b>Sulfate</b>: add HCl(aq), then BaCl<sub>2</sub>(aq) → <b>white precipitate</b> of BaSO<sub>4</sub>.</li>
        <li><b>Ammonium</b>: warm with NaOH(aq) → NH<sub>3</sub> gas turns <b>damp red litmus blue</b>.</li>
      </ul>
      <div class="eqn">Ag<sup>+</sup>(aq) + Cl<sup>−</sup>(aq) → AgCl(s)<small>Test in this order: carbonate, then sulfate, then halide — each test removes ions that would confuse the next.</small></div>` },

    { t: 'num', h: 'Mass of the silver halide', q: 'Excess AgNO<sub>3</sub>(aq) is added to a solution containing <b>0.0100 mol</b> of chloride ions. Calculate the mass of AgCl precipitated. (M<sub>r</sub>(AgCl) = 143.4.) Give your answer in grams to 2 decimal places.', ans: '1.43', tol: '0.03', unit: 'g', hint: 'Ag⁺ + Cl⁻ → AgCl is 1 : 1, so mass = 0.0100 × 143.4.' },

    { t: 'sort' },

    { t: 'mcq', h: 'Chlorine and cold dilute alkali', q: 'Chlorine reacts with cold dilute NaOH to make household bleach. What is the equation, and what has happened to the chlorine?', why: 'Cl2 + 2NaOH gives NaCl + NaClO + H2O. Chlorine is simultaneously reduced (0 to −1 in NaCl) and oxidised (0 to +1 in NaClO), which is disproportionation. With HOT concentrated alkali you would instead get chlorate(V), NaClO3.', opts: [['Cl<sub>2</sub> + 2NaOH → NaCl + NaClO + H<sub>2</sub>O — the chlorine disproportionates', 1], ['Cl<sub>2</sub> + 2NaOH → 2NaCl + H<sub>2</sub>O + ½O<sub>2</sub> — the chlorine is reduced only', 0], ['3Cl<sub>2</sub> + 6NaOH → 5NaCl + NaClO<sub>3</sub> + 3H<sub>2</sub>O — the chlorine is oxidised only', 0], ['Cl<sub>2</sub> + NaOH → NaCl + HClO — no change in oxidation number', 0]] },

    { t: 'num', h: 'Hydroxide ions from barium hydroxide', q: 'Calculate the amount (in mol) of <b>OH<sup>−</sup></b> ions in <b>25.0 cm<sup>3</sup></b> of <b>0.0500 mol dm<sup>−3</sup></b> Ba(OH)<sub>2</sub>(aq). Give your answer in units of 10<sup>−3</sup> mol (i.e. type the number in front).', ans: '2.5', tol: '0.05', unit: '× 10⁻³ mol', hint: 'n(Ba(OH)₂) = 0.0500 × 0.0250 = 1.25 × 10⁻³ mol. Each formula unit releases TWO OH⁻.' },

    { t: 'mcq', h: 'Predicting for astatine', q: 'Astatine sits below iodine in Group 7. Using the trends, what would you predict for silver astatide, AgAt?', why: 'The colours of the silver halides darken down the group (white, cream, yellow) and their solubility in ammonia decreases (dilute, concentrated, insoluble). Astatine continues both trends: a darker precipitate that will not dissolve in ammonia.', opts: [['A dark precipitate that is insoluble in concentrated ammonia', 1], ['A white precipitate that dissolves in dilute ammonia', 0], ['No precipitate, because astatide ions are too large', 0], ['A cream precipitate that dissolves in dilute ammonia', 0]] }
  ],
  sort: {
    h: 'Down Group 2 — up or down?', prompt: 'Tap a property, then tap what it does as you go DOWN Group 2 from Mg to Ba.',
    bins: [{ key: 'up', label: '⬆️ Increases' }, { key: 'down', label: '⬇️ Decreases' }],
    chips: [['atomic radius', 'up'], ['reactivity with water', 'up'], ['solubility of the hydroxide', 'up'], ['thermal stability of the carbonate', 'up'], ['first ionisation energy', 'down'], ['solubility of the sulfate', 'down']],
    doneMsg: 'All sorted — hydroxides up, sulfates down: the one pair of trends that go opposite ways.'
  },
  match: {
    h: 'Flame colours', prompt: 'Match each ion to the colour it gives in a flame test. These are recall marks — no data sheet.', leftHead: 'Ion', rightHead: 'Flame colour',
    pairs: [
      ['Ca²⁺', 'Brick red'],
      ['Sr²⁺', 'Crimson'],
      ['Ba²⁺', 'Pale green'],
      ['K⁺', 'Lilac']
    ],
    doneMsg: 'All matched — the colour comes from electrons dropping back down after being promoted.'
  },
  recap: [
    ['Group 2', 'reactivity increases down the group as ionisation energy falls'],
    ['Solubility', 'hydroxides MORE soluble down the group; sulfates LESS soluble (BaSO<sub>4</sub> is the sulfate test)'],
    ['Thermal stability', 'increases down the group — bigger cation, less polarising power, less distortion of the anion'],
    ['Flame colours', 'Ca brick red · Sr crimson · Ba pale green · K lilac · Na yellow (recall these)'],
    ['Group 7', 'oxidising power falls, reducing power of the halide rises; NaBr → SO<sub>2</sub>, NaI → H<sub>2</sub>S'],
    ['Tests', 'AgCl white/dilute NH<sub>3</sub> · AgBr cream/conc NH<sub>3</sub> · AgI yellow/insoluble']
  ]
},

/* ================= TOPIC 5 ================= */
{
  slug: 'formulae-equations-amounts',
  specTopic: 'Topic 5: Formulae, Equations and Amounts of Substance',
  title: 'Formulae, Equations &amp; Amounts',
  emoji: '⚖️',
  desc: 'Interactive Edexcel A-level Chemistry (9CH0) mini-lesson on Topic 5: the mole and the Avogadro constant, empirical and molecular formulae, the ideal gas equation pV = nRT, concentration and titration calculations, percentage yield, atom economy, and percentage uncertainty.',
  intro: 'Topic 5 is the <b>engine room</b> of the whole A-level. Every calculation you will ever do starts by turning a measurement — a mass, a gas volume, a titre — into <b>moles</b>. Get this fluent and Papers 1, 2 and 3 all get easier.',
  pillars: [['moles &amp;', 'formulae'], ['gases', 'pV = nRT'], ['titrations'], ['yield &amp; atom', 'economy']],
  pillarCaption: 'measurement → moles → ratio → answer',
  screens: [
    { t: 'teach', tag: 'The mole', h: 'The mole and molar mass', html: `      <p>One mole contains the <b>Avogadro number</b> of particles, <b>L = 6.02 × 10<sup>23</sup> mol<sup>−1</sup></b>. The <b>molar mass</b> M is the mass of one mole in g mol<sup>−1</sup>, numerically equal to the relative formula mass.</p>
      <div class="eqn">n = m ÷ M<small>n in mol · m in g · M in g mol⁻¹ — and number of particles = n × L</small></div>
      <p class="note"><b>Be careful what you count.</b> 1 mol of CaCl<sub>2</sub> contains 1 mol of Ca<sup>2+</sup> but <b>2 mol</b> of Cl<sup>−</sup>, so it contains 3 × 6.02 × 10<sup>23</sup> ions in total.</p>` },

    { t: 'mcq', h: 'Counting particles', q: 'How many <b>ions</b> in total are there in 0.500 mol of MgCl<sub>2</sub>?', why: 'Each formula unit gives 3 ions (one Mg2+ and two Cl−), so 0.500 mol of MgCl2 contains 1.50 mol of ions. 1.50 x 6.02 x 10^23 = 9.03 x 10^23 ions.', opts: [['9.03 × 10<sup>23</sup>', 1], ['3.01 × 10<sup>23</sup>', 0], ['6.02 × 10<sup>23</sup>', 0], ['1.81 × 10<sup>24</sup>', 0]] },

    { t: 'teach', tag: 'Formulae', h: 'Empirical and molecular formulae', html: `      <p>The <b>empirical formula</b> is the simplest whole-number ratio of atoms; the <b>molecular formula</b> is the actual number in one molecule.</p>
      <p><b>Method:</b> divide the mass (or %) of each element by its A<sub>r</sub>, divide all the answers by the smallest, then scale to whole numbers. Then compare the empirical mass with the true M<sub>r</sub>.</p>
      <div class="work">
        <div class="wt">Worked example</div>
        <p>A compound is 40.0% C, 6.7% H, 53.3% O by mass.</p>
        <p>C: 40.0 ÷ 12.0 = 3.33 · H: 6.7 ÷ 1.0 = 6.7 · O: 53.3 ÷ 16.0 = 3.33</p>
        <p>Divide by 3.33 → C 1 : H 2 : O 1, so the empirical formula is <b>CH<sub>2</sub>O</b> (empirical mass 30.0).</p>
      </div>` },

    { t: 'num', h: 'From empirical to molecular', q: 'A compound has the empirical formula <b>CH<sub>2</sub>O</b> (empirical mass 30.0) and a relative molecular mass of <b>180.0</b>. What is the multiplier <i>n</i> in (CH<sub>2</sub>O)<sub><i>n</i></sub>?', ans: '6', tol: '0.1', unit: '', hint: 'n = M(molecular) ÷ M(empirical) = 180.0 ÷ 30.0.' },

    { t: 'teach', tag: 'Gases', h: 'Gas volumes and the ideal gas equation', html: `      <p>At <b>room temperature and pressure</b> one mole of any gas occupies about <b>24 dm<sup>3</sup></b> (24 000 cm<sup>3</sup>). For any other conditions use the <b>ideal gas equation</b>:</p>
      <div class="eqn">pV = nRT<small>p in Pa · V in m³ · T in K · R = 8.314 J K⁻¹ mol⁻¹</small></div>
      <p class="note"><b>Unit discipline is where the marks are lost.</b> 100 kPa = 1.00 × 10<sup>5</sup> Pa. 1 dm<sup>3</sup> = 1 × 10<sup>−3</sup> m<sup>3</sup>, and 1 cm<sup>3</sup> = 1 × 10<sup>−6</sup> m<sup>3</sup>. °C → K by adding 273.</p>
      <p>Rearranged as <b>M = mRT ÷ pV</b>, the same equation gives the <b>relative molecular mass of a volatile liquid</b> from the mass that fills a known volume — one of the standard Edexcel practical applications.</p>` },

    { t: 'num', h: 'Using pV = nRT', q: 'Calculate the volume occupied by <b>0.250 mol</b> of an ideal gas at <b>100 kPa</b> and <b>298 K</b>. (R = 8.314 J K<sup>−1</sup> mol<sup>−1</sup>.) Give your answer in <b>dm<sup>3</sup></b> to 2 decimal places.', ans: '6.19', tol: '0.06', unit: 'dm³', hint: 'V = nRT ÷ p = (0.250 × 8.314 × 298) ÷ (1.00 × 10⁵) m³. Then × 1000 to convert m³ → dm³.' },

    { t: 'mcq', h: 'Units in the gas equation', q: 'A student uses p = 100 kPa, V = 250 cm<sup>3</sup> and T = 25 °C directly in pV = nRT with R = 8.314. What is wrong?', why: 'For R = 8.314 J K−1 mol−1 the pressure must be in Pa (1.00 x 10^5), the volume in m3 (2.50 x 10^-4) and the temperature in K (298). Using kPa, cm3 and degrees Celsius gives an answer that is wrong by many orders of magnitude.', opts: [['All three units are wrong: p must be in Pa, V in m<sup>3</sup> and T in K', 1], ['Only the temperature is wrong; kPa and cm<sup>3</sup> are fine', 0], ['Nothing is wrong — the units cancel', 0], ['Only the volume is wrong; kPa and °C are acceptable', 0]] },

    { t: 'teach', tag: 'Titrations', h: 'Concentration and titration', html: `      <div class="eqn">n = c × V<small>c in mol dm⁻³ · V in dm³ (so divide a cm³ volume by 1000)</small></div>
      <p>To convert between the two concentration units: <b>concentration in g dm<sup>−3</sup> = concentration in mol dm<sup>−3</sup> × M</b>.</p>
      <p><b>The titration routine:</b> rinse the burette with the solution it will hold; use a pipette for the aliquot in the conical flask; add 2–3 drops of indicator; run in until the <b>end point</b>; repeat until titres are <b>concordant</b> (within 0.10 cm<sup>3</sup>) and average <b>only</b> the concordant ones.</p>
      <p class="note"><b>Indicators (Edexcel expects both):</b> <b>phenolphthalein</b> (colourless → pink) for a <b>strong base</b> titration; <b>methyl orange</b> (red → yellow) for a <b>strong acid</b> titration. Never use a universal indicator, and never use litmus.</p>` },

    { t: 'num', h: 'A titration calculation', q: '<b>25.0 cm<sup>3</sup></b> of NaOH(aq) is exactly neutralised by <b>22.50 cm<sup>3</sup></b> of <b>0.100 mol dm<sup>−3</sup></b> HCl. NaOH + HCl → NaCl + H<sub>2</sub>O. Calculate the concentration of the NaOH in mol dm<sup>−3</sup> (3 decimal places).', ans: '0.090', tol: '0.003', unit: 'mol dm⁻³', hint: 'n(HCl) = 0.100 × 0.02250 = 2.25 × 10⁻³ mol. The ratio is 1 : 1, so c(NaOH) = 2.25 × 10⁻³ ÷ 0.0250.' },

    { t: 'teach', tag: 'Yield &amp; economy', h: 'Percentage yield and atom economy', html: `      <div class="eqn">% yield = (actual ÷ theoretical) × 100<small>compare like with like: moles with moles, or mass with mass</small></div>
      <div class="eqn">atom economy = (M<sub>r</sub> of the desired product ÷ sum of M<sub>r</sub> of ALL products) × 100</div>
      <p>They measure different things:</p>
      <ul>
        <li><b>Yield</b> is a measure of how much you actually got out of <b>this</b> reaction (losses on transfer, side reactions, an equilibrium that does not go to completion).</li>
        <li><b>Atom economy</b> is fixed by the <b>equation itself</b>. An addition reaction has 100% atom economy; a substitution never does.</li>
      </ul>
      <p class="note"><b>Why industry cares:</b> a high atom economy means less waste to dispose of, fewer raw materials used, and a more sustainable, cheaper process.</p>` },

    { t: 'num', h: 'Atom economy of iron extraction', q: 'In the blast furnace: <b>Fe<sub>2</sub>O<sub>3</sub> + 3CO → 2Fe + 3CO<sub>2</sub></b>. Calculate the atom economy for <b>iron</b>. (M<sub>r</sub>: Fe<sub>2</sub>O<sub>3</sub> = 159.6, CO = 28.0, Fe = 55.8, CO<sub>2</sub> = 44.0.) Give the answer as a percentage to 1 decimal place.', ans: '45.8', tol: '0.6', unit: '%', hint: 'Desired product = 2 × 55.8 = 111.6. All products = 111.6 + (3 × 44.0) = 243.6.' },

    { t: 'num', h: 'Percentage yield', q: 'A preparation should give a theoretical <b>8.00 g</b> of product. A student isolates <b>6.40 g</b>. Calculate the percentage yield.', ans: '80', tol: '0.5', unit: '%', hint: '(6.40 ÷ 8.00) × 100.' },

    { t: 'mcq', h: 'Limiting reagent', q: '0.100 mol of Mg is added to 50.0 cm<sup>3</sup> of 2.00 mol dm<sup>−3</sup> HCl. Mg + 2HCl → MgCl<sub>2</sub> + H<sub>2</sub>. Which is limiting?', why: 'n(HCl) = 2.00 x 0.0500 = 0.100 mol. The equation needs 2 mol of HCl per mol of Mg, so 0.100 mol of Mg would need 0.200 mol of HCl. Only 0.100 mol is available, so the acid runs out first and HCl is limiting.', opts: [['HCl, because 0.100 mol of Mg needs 0.200 mol of HCl but only 0.100 mol is present', 1], ['Mg, because there are fewer moles of Mg than of HCl', 0], ['Neither — they are in exactly the right ratio', 0], ['Mg, because magnesium is the solid', 0]] },

    { t: 'sort' },

    { t: 'teach', tag: 'Uncertainty', h: 'Uncertainty and error', html: `      <div class="eqn">% uncertainty = (uncertainty ÷ measurement) × 100</div>
      <ul>
        <li>A burette reading has an uncertainty of <b>±0.05 cm<sup>3</sup></b>, but every titre needs <b>two</b> readings (start and finish), so the uncertainty in the titre is <b>±0.10 cm<sup>3</sup></b>.</li>
        <li>To <b>reduce</b> the percentage uncertainty, make the measured quantity <b>bigger</b> — use a bigger titre (a more dilute titrant), or weigh out more solid.</li>
      </ul>
      <p class="note"><b>Systematic vs random.</b> Repeating a measurement reduces the effect of <b>random</b> error, but repeats can never remove a <b>systematic</b> error, such as a burette that has not been rinsed with the titrant or a balance that reads high.</p>` },

    { t: 'num', h: 'Percentage uncertainty in a titre', q: 'A burette has an uncertainty of <b>±0.05 cm<sup>3</sup></b> per reading and a titre of <b>25.00 cm<sup>3</sup></b> is recorded. Calculate the percentage uncertainty in the <b>titre</b>. Give the answer to 2 decimal places.', ans: '0.40', tol: '0.02', unit: '%', hint: 'Two readings, so the uncertainty is 2 × 0.05 = 0.10 cm³. Then (0.10 ÷ 25.00) × 100.' },

    { t: 'match' }
  ],
  sort: {
    h: 'Which mole equation?', prompt: 'Tap the piece of data, then tap the equation you would use to turn it into moles.',
    bins: [{ key: 'mM', label: '🟦 n = m ÷ M' }, { key: 'cV', label: '🟩 n = c × V' }, { key: 'gas', label: '🟪 n = pV ÷ RT' }],
    chips: [['4.8 g of magnesium', 'mM'], ['10.0 g of CaCO₃', 'mM'], ['25.0 cm³ of 0.100 mol dm⁻³ HCl', 'cV'], ['50.0 cm³ of 2.00 mol dm⁻³ NaOH', 'cV'], ['120 cm³ of gas at 100 kPa and 298 K', 'gas'], ['a volatile liquid vaporised in a gas syringe', 'gas']],
    doneMsg: 'All sorted — always ask what you have been given: a mass, a solution, or a gas.'
  },
  match: {
    h: 'Definitions', prompt: 'Match each term to its definition.', leftHead: 'Term', rightHead: 'Definition',
    pairs: [
      ['Atom economy', 'Mr of the desired product ÷ Mr of all products, × 100'],
      ['Percentage yield', 'Actual amount of product ÷ theoretical amount, × 100'],
      ['Empirical formula', 'The simplest whole-number ratio of atoms in a compound'],
      ['Molar volume', 'The volume occupied by one mole of a gas (about 24 dm³ at RTP)']
    ],
    doneMsg: 'All matched — atom economy is fixed by the equation; yield depends on the practical.'
  },
  recap: [
    ['Moles', 'n = m ÷ M · n = c × V · pV = nRT (Pa, m³, K); L = 6.02 × 10<sup>23</sup> mol<sup>−1</sup>'],
    ['Formulae', 'empirical = simplest ratio; molecular = empirical × (M<sub>r</sub> ÷ empirical mass)'],
    ['Titration', 'concordant titres within 0.10 cm<sup>3</sup>; phenolphthalein for strong bases, methyl orange for strong acids'],
    ['Yield', '(actual ÷ theoretical) × 100 — practical losses'],
    ['Atom economy', '(desired M<sub>r</sub> ÷ total M<sub>r</sub> of products) × 100 — fixed by the equation'],
    ['Uncertainty', '(uncertainty ÷ measurement) × 100; a titre needs TWO burette readings']
  ]
}

];
