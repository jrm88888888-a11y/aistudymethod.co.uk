/* Topics 6-10 */
module.exports = [

/* ================= TOPIC 6 ================= */
{
  slug: 'organic-chemistry-i',
  specTopic: 'Topic 6: Organic Chemistry I',
  title: 'Organic Chemistry I',
  emoji: '⛽',
  desc: 'Interactive Edexcel A-level Chemistry (9CH0) mini-lesson on Topic 6 Organic Chemistry I: nomenclature and isomerism, alkanes and radical substitution, alkenes and electrophilic addition, Markovnikov, addition polymers, halogenoalkanes and nucleophilic substitution and elimination, and the reactions of alcohols.',
  intro: 'Organic I sets up every mechanism you will meet later: <b>radical substitution</b> in alkanes, <b>electrophilic addition</b> to alkenes, and <b>nucleophilic substitution</b> and <b>elimination</b> in halogenoalkanes, finishing with the reactions of <b>alcohols</b>.',
  pillars: [['alkanes'], ['alkenes'], ['halogeno-', 'alkanes'], ['alcohols']],
  pillarCaption: 'four families, four mechanisms, one map of organic chemistry',
  screens: [
    { t: 'teach', tag: 'Naming &amp; isomerism', h: 'Formulae, naming and isomerism', html: `      <p>Learn the five formula types: <b>empirical</b>, <b>molecular</b>, <b>general</b>, <b>structural</b> (CH<sub>3</sub>CH<sub>2</sub>OH), <b>displayed</b> and <b>skeletal</b>. Edexcel expects IUPAC naming up to <b>C10</b>.</p>
      <ul>
        <li><b>Structural isomers</b> — same molecular formula, different structure (chain, position or functional group). C<sub>4</sub>H<sub>10</sub> has 2; C<sub>5</sub>H<sub>12</sub> has 3.</li>
        <li><b>Stereoisomers</b> — same structure, different arrangement in space. At AS this means <b>E/Z isomerism</b> about a C=C, which arises because there is <b>no rotation</b> about the π bond.</li>
      </ul>
      <p class="note"><b>E/Z needs two things:</b> a C=C double bond, <b>and</b> two <b>different</b> groups on <b>each</b> of the two carbon atoms. Priority is decided by the <b>higher atomic number</b> attached directly to the carbon: same side = <b>Z</b> (zusammen), opposite sides = <b>E</b> (entgegen). <b>Cis-trans</b> is the special case where each carbon carries an H.</p>` },

    { t: 'mcq', h: 'Which shows E/Z isomerism?', q: 'Which molecule can exist as E and Z isomers?', why: 'But-2-ene, CH3CH=CHCH3, has a C=C with two different groups (a CH3 and an H) on each of the two double-bond carbons, and there is no rotation about the pi bond. In but-1-ene one carbon carries two H atoms, so swapping them gives the same molecule.', opts: [['But-2-ene, CH<sub>3</sub>CH=CHCH<sub>3</sub>', 1], ['But-1-ene, CH<sub>3</sub>CH<sub>2</sub>CH=CH<sub>2</sub>', 0], ['Butane, CH<sub>3</sub>CH<sub>2</sub>CH<sub>2</sub>CH<sub>3</sub>', 0], ['2-methylpropene, (CH<sub>3</sub>)<sub>2</sub>C=CH<sub>2</sub>', 0]] },

    { t: 'teach', tag: 'Alkanes', h: 'Alkanes: fuels, cracking and pollutants', html: `      <p>Alkanes (C<sub>n</sub>H<sub>2n+2</sub>) are saturated, non-polar and unreactive: strong C–C and C–H σ bonds and almost no bond polarity, so nucleophiles ignore them.</p>
      <ul>
        <li><b>Fractional distillation</b> separates crude oil by boiling temperature (longer chains → more electrons → stronger London forces → higher boiling temperature).</li>
        <li><b>Cracking</b> breaks long chains into shorter, more useful ones plus alkenes.</li>
        <li><b>Reforming</b> turns straight chains into branched chains and cyclic/aromatic compounds for better fuel performance.</li>
      </ul>
      <p class="note"><b>Pollutants:</b> incomplete combustion gives <b>CO</b> (toxic) and <b>C</b> (soot); high temperatures in the engine make <b>NO<sub>x</sub></b> from N<sub>2</sub> and O<sub>2</sub>; sulfur impurities give <b>SO<sub>2</sub></b> (acid rain). A <b>catalytic converter</b> deals with two of them at once: <b>2CO + 2NO → 2CO<sub>2</sub> + N<sub>2</sub></b>.</p>` },

    { t: 'mcq', h: 'The catalytic converter', q: 'Which equation correctly represents the main reaction inside a catalytic converter?', why: '2CO + 2NO gives 2CO2 + N2. It is balanced (2 C, 2 N, 4 O each side) and it removes two pollutants at once: carbon monoxide is oxidised and nitrogen monoxide is reduced.', opts: [['2CO + 2NO → 2CO<sub>2</sub> + N<sub>2</sub>', 1], ['CO + NO → CO<sub>2</sub> + N', 0], ['2CO + O<sub>2</sub> → 2CO<sub>2</sub> only', 0], ['CO + 2NO → CO<sub>2</sub> + N<sub>2</sub>O', 0]] },

    { t: 'teach', tag: 'Radical substitution', h: 'Free-radical substitution', html: `      <p>Alkanes react with halogens only in <b>UV light</b>, by <b>homolytic fission</b>: the bond breaks evenly and each atom keeps one electron, forming <b>radicals</b> (species with an unpaired electron).</p>
      <div class="eqn">Initiation: Cl<sub>2</sub> → 2Cl•<small>UV supplies the energy to break the Cl–Cl bond homolytically</small></div>
      <div class="eqn">Propagation: Cl• + CH<sub>4</sub> → •CH<sub>3</sub> + HCl<br>•CH<sub>3</sub> + Cl<sub>2</sub> → CH<sub>3</sub>Cl + Cl•<small>a radical is used up and a new radical is made — the chain keeps going</small></div>
      <div class="eqn">Termination: •CH<sub>3</sub> + Cl• → CH<sub>3</sub>Cl<small>two radicals combine, so no new radical is formed</small></div>
      <p class="note"><b>Why it is useless for synthesis:</b> you get a <b>mixture</b> — further substitution gives CH<sub>2</sub>Cl<sub>2</sub>, CHCl<sub>3</sub> and CCl<sub>4</sub>, and termination gives ethane (C<sub>2</sub>H<sub>6</sub>) as a by-product. Substitution can also happen at any position along a longer chain.</p>` },

    { t: 'mcq', h: 'Spot the propagation step', q: 'Which of these is a <b>propagation</b> step in the chlorination of methane?', why: 'A propagation step consumes one radical and generates another, so the chain continues. CH3 radical + Cl2 gives CH3Cl + Cl radical. Two radicals combining is termination, and splitting Cl2 with UV is initiation.', opts: [['•CH<sub>3</sub> + Cl<sub>2</sub> → CH<sub>3</sub>Cl + Cl•', 1], ['Cl<sub>2</sub> → 2Cl•', 0], ['•CH<sub>3</sub> + •CH<sub>3</sub> → C<sub>2</sub>H<sub>6</sub>', 0], ['Cl• + Cl• → Cl<sub>2</sub>', 0]] },

    { t: 'num', h: 'Balancing a combustion equation', q: 'Complete combustion of propane: C<sub>3</sub>H<sub>8</sub> + <i>x</i>O<sub>2</sub> → 3CO<sub>2</sub> + 4H<sub>2</sub>O. What is <i>x</i>?', ans: '5', tol: '0.1', unit: 'mol O₂', hint: 'Count the oxygen atoms on the right: (3 × 2) + 4 = 10 O atoms, and each O₂ gives 2.' },

    { t: 'teach', tag: 'Alkenes', h: 'Alkenes and electrophilic addition', html: `      <p>The C=C is a strong <b>σ</b> bond plus a weaker <b>π</b> bond formed by sideways overlap of p orbitals. That exposed π electron density makes alkenes <b>electron-rich</b>, so they attract <b>electrophiles</b> (electron-pair acceptors).</p>
      <p><b>The mechanism (curly arrows required):</b> the π electrons attack the δ+ end of the electrophile; the H–Br bond breaks <b>heterolytically</b>; a <b>carbocation</b> intermediate forms; the Br<sup>−</sup> then attacks the carbocation.</p>
      <p><b>Markovnikov:</b> with an unsymmetrical alkene, the major product comes from the <b>more stable carbocation</b>. Alkyl groups are electron-releasing, so stability runs <b>tertiary &gt; secondary &gt; primary</b>.</p>
      <ul>
        <li>+ H<sub>2</sub>/Ni → alkane · + Br<sub>2</sub> → dibromoalkane (<b>bromine water decolourises</b> — the test for a C=C)</li>
        <li>+ steam, H<sub>3</sub>PO<sub>4</sub> catalyst → alcohol</li>
        <li>+ acidified KMnO<sub>4</sub> → a <b>diol</b> (the purple colour disappears)</li>
      </ul>` },

    { t: 'mcq', h: 'Markovnikov', q: 'Propene reacts with HBr. Which is the <b>major</b> product, and why?', why: 'Adding H+ to the terminal carbon gives a secondary carbocation, CH3-CH+-CH3, which is stabilised by two electron-releasing alkyl groups. The bromide then attacks the middle carbon, giving 2-bromopropane. The primary carbocation route is higher in energy.', opts: [['2-bromopropane, because the intermediate is a more stable secondary carbocation', 1], ['1-bromopropane, because the intermediate is a more stable primary carbocation', 0], ['2-bromopropane, because bromine always adds to the end carbon', 0], ['An equal mixture, because both carbocations are equally stable', 0]] },

    { t: 'num', h: 'Mass of an addition product', q: 'Ethene reacts with bromine: C<sub>2</sub>H<sub>4</sub> + Br<sub>2</sub> → C<sub>2</sub>H<sub>4</sub>Br<sub>2</sub>. Calculate the maximum mass of 1,2-dibromoethane obtainable from <b>0.0500 mol</b> of ethene. (M<sub>r</sub>(C<sub>2</sub>H<sub>4</sub>Br<sub>2</sub>) = 187.8.) Give the answer in grams to 2 decimal places.', ans: '9.39', tol: '0.1', unit: 'g', hint: 'The ratio is 1 : 1, so mass = 0.0500 × 187.8.' },

    { t: 'teach', tag: 'Polymers', h: 'Addition polymers', html: `      <p>The π bond of an alkene opens up and the monomers join end to end. The <b>repeat unit</b> is drawn with the C=C changed to a C–C and a bond drawn out through the brackets on each side, with an <b>n</b> outside.</p>
      <p class="note"><b>Disposal:</b> most addition polymers are chemically <b>inert and non-biodegradable</b> (the C–C backbone is strong and non-polar). Options are <b>recycling</b> (sorting is the problem), <b>incineration</b> for energy (but toxic HCl from PVC must be removed), or use as a <b>feedstock</b> for new chemicals. Newer <b>biodegradable</b> and photodegradable polymers get round this.</p>` },

    { t: 'teach', tag: 'Halogenoalkanes', h: 'Nucleophilic substitution and elimination', html: `      <p>The C–X bond is <b>polar</b> (X is more electronegative), so the δ+ carbon is attacked by <b>nucleophiles</b> — species with a lone pair that donate an electron pair.</p>
      <ul>
        <li><b>KOH(aq)</b>, warm under reflux → <b>alcohol</b> (nucleophile OH<sup>−</sup>)</li>
        <li><b>KCN in ethanol</b>, reflux → <b>nitrile</b> — this adds a carbon and <b>lengthens the chain</b></li>
        <li><b>Excess NH<sub>3</sub> in ethanol</b>, sealed tube → <b>primary amine</b></li>
        <li><b>KOH in ETHANOL</b>, reflux → <b>alkene</b> (this is <b>elimination</b>; OH<sup>−</sup> acts as a <b>base</b> and removes an H<sup>+</sup>)</li>
      </ul>
      <p class="note"><b>Rate of hydrolysis</b> (measured with AgNO<sub>3</sub>/ethanol, timing the precipitate): <b>C–I fastest, C–F slowest</b>. This follows <b>bond enthalpy</b>, NOT electronegativity — the C–I bond is the weakest and so breaks most easily, even though the C–F bond is the most polar.</p>` },

    { t: 'mcq', h: 'Which hydrolyses fastest?', q: '1-chlorobutane, 1-bromobutane and 1-iodobutane are warmed with AgNO<sub>3</sub> in ethanol. Which gives a precipitate first, and why?', why: 'The rate is controlled by the carbon-halogen bond enthalpy. C-I is the weakest bond so it breaks most readily and 1-iodobutane hydrolyses fastest, giving the yellow AgI precipitate first. Bond polarity would predict the opposite order, so it cannot be the controlling factor.', opts: [['1-iodobutane, because the C–I bond has the lowest bond enthalpy', 1], ['1-chlorobutane, because the C–Cl bond is the most polar', 0], ['1-chlorobutane, because chlorine is the most electronegative', 0], ['All three at the same rate, because the same nucleophile attacks', 0]] },

    { t: 'num', h: 'Counting isomers', q: 'How many <b>structural isomers</b> (chain isomers) are there with the molecular formula <b>C<sub>5</sub>H<sub>12</sub></b>?', ans: '3', tol: '0.1', unit: 'isomers', hint: 'Pentane, 2-methylbutane and one more with a quaternary carbon.' },

    { t: 'teach', tag: 'Alcohols', h: 'Alcohols and their reactions', html: `      <p>Alcohols are classified by the number of carbons attached to the C–OH carbon: <b>primary</b> (1), <b>secondary</b> (2), <b>tertiary</b> (3).</p>
      <p><b>Oxidation with acidified K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub></b> (orange → green), written as [O]:</p>
      <ul>
        <li><b>Primary, distil straight away</b> → <b>aldehyde</b> (remove it before it can be oxidised again)</li>
        <li><b>Primary, heat under REFLUX</b> → <b>carboxylic acid</b></li>
        <li><b>Secondary, reflux</b> → <b>ketone</b> (and no further)</li>
        <li><b>Tertiary</b> → <b>no reaction</b> (no H on the C–OH carbon to remove)</li>
      </ul>
      <p class="note"><b>Other reactions:</b> with <b>PCl<sub>5</sub></b> → chloroalkane + steamy HCl fumes (a test for –OH); with <b>KBr and 50% concentrated H<sub>2</sub>SO<sub>4</sub></b> → bromoalkane; with <b>concentrated phosphoric acid</b>, heat → <b>alkene</b> (elimination/dehydration). Distinguish an aldehyde from a ketone afterwards with <b>Fehling's</b> or <b>Benedict's</b> solution — a brick-red precipitate means an aldehyde.</p>` },

    { t: 'mcq', h: 'Distil or reflux?', q: 'Propan-1-ol is warmed with acidified potassium dichromate(VI) and the product is <b>distilled off immediately</b>. What is the product?', why: 'Distilling immediately removes the aldehyde (propanal, boiling temperature 49 C) from the oxidising mixture before it can be oxidised any further. To get propanoic acid you must heat under reflux, which keeps the aldehyde in the flask.', opts: [['Propanal (an aldehyde)', 1], ['Propanoic acid (a carboxylic acid)', 0], ['Propanone (a ketone)', 0], ['Propene (elimination product)', 0]] },

    { t: 'sort' },

    { t: 'match' }
  ],
  sort: {
    h: 'Name that mechanism', prompt: 'Tap the reaction, then tap the mechanism it goes by. Look at the family of the organic reactant.',
    bins: [{ key: 'frs', label: '🟦 Radical substitution' }, { key: 'ea', label: '🟩 Electrophilic addition' }, { key: 'ns', label: '🟪 Nucleophilic substitution' }],
    chips: [['CH₄ + Cl₂ in UV light', 'frs'], ['C₂H₆ + Br₂ in UV light', 'frs'], ['ethene + Br₂', 'ea'], ['propene + HBr', 'ea'], ['ethene + steam, H₃PO₄', 'ea'], ['1-bromopropane + KOH(aq)', 'ns'], ['1-bromopropane + KCN in ethanol', 'ns'], ['1-bromobutane + excess NH₃', 'ns']],
    doneMsg: 'All sorted — alkanes need radicals, alkenes attract electrophiles, halogenoalkanes attract nucleophiles.'
  },
  match: {
    h: 'Reagent and conditions → product', prompt: 'Match each set of reagents and conditions to the product it gives.', leftHead: 'Reagents and conditions', rightHead: 'Product',
    pairs: [
      ['Primary alcohol + K₂Cr₂O₇/H₂SO₄, distil immediately', 'Aldehyde'],
      ['Primary alcohol + K₂Cr₂O₇/H₂SO₄, heat under reflux', 'Carboxylic acid'],
      ['Halogenoalkane + KOH in ethanol, reflux', 'Alkene (elimination)'],
      ['Halogenoalkane + KOH(aq), reflux', 'Alcohol (substitution)']
    ],
    doneMsg: 'All matched — with KOH the SOLVENT decides: water gives substitution, ethanol gives elimination.'
  },
  recap: [
    ['Isomerism', 'structural (chain/position/functional group) and E/Z from restricted rotation about C=C'],
    ['Alkanes', 'radical substitution in UV: initiation, propagation, termination — always gives a mixture'],
    ['Alkenes', 'electrophilic addition via a carbocation; Markovnikov = the more stable carbocation wins'],
    ['Halogenoalkanes', 'KOH(aq) → alcohol · KCN → nitrile (chain lengthening) · NH<sub>3</sub> → amine · KOH/ethanol → alkene'],
    ['Hydrolysis rate', 'C–I fastest — set by bond enthalpy, not polarity'],
    ['Alcohols', 'distil → aldehyde · reflux → carboxylic acid · secondary → ketone · tertiary → no reaction']
  ]
},

/* ================= TOPIC 7 ================= */
{
  slug: 'modern-analytical-techniques-i',
  specTopic: 'Topic 7: Modern Analytical Techniques I',
  title: 'Modern Analytical Techniques I',
  emoji: '📊',
  desc: 'Interactive Edexcel A-level Chemistry (9CH0) mini-lesson on Topic 7: mass spectrometry of organic compounds, molecular ion peaks and relative molecular mass, fragmentation patterns, the M+1 peak, and infrared spectroscopy for identifying functional groups.',
  intro: 'Topic 7 gives you two tools for working out <b>what a molecule is</b>: <b>mass spectrometry</b> (which gives M<sub>r</sub> from the molecular ion and structure from the fragments) and <b>infrared spectroscopy</b> (which gives the functional groups).',
  pillars: [['molecular', 'ion'], ['fragmen-', 'tation'], ['IR', 'absorptions'], ['identify the', 'compound']],
  pillarCaption: 'mass tells you how big; IR tells you what it is',
  screens: [
    { t: 'teach', tag: 'Mass spectrometry', h: 'The molecular ion peak', html: `      <p>In the mass spectrometer the molecule loses <b>one electron</b> to form the <b>molecular ion</b>, M<sup>+</sup> — a positively charged radical.</p>
      <div class="eqn">M(g) + e<sup>−</sup> → M<sup>+</sup>(g) + 2e<sup>−</sup><small>The peak with the highest m/z (ignoring M+1) gives the relative molecular mass directly.</small></div>
      <p class="note"><b>Careful:</b> the M<sup>+</sup> peak is <b>not always the tallest</b> — the tallest peak (the base peak) is the most <b>stable</b> fragment ion. Look for the peak at the highest m/z, not the highest one on the page.</p>` },

    { t: 'num', h: 'Find the M<sup>+</sup> peak', q: 'Propan-1-ol has the molecular formula <b>C<sub>3</sub>H<sub>8</sub>O</b>. At what m/z would you expect the molecular ion peak? (A<sub>r</sub>: C = 12, H = 1, O = 16.)', ans: '60', tol: '0.4', unit: 'm/z', hint: '(3 × 12) + (8 × 1) + 16.' },

    { t: 'teach', tag: 'Fragmentation', h: 'Reading the fragments', html: `      <p>The molecular ion breaks up into a <b>cation</b> (which is detected) and a <b>radical</b> (which is not). Only the charged fragment shows up.</p>
      <div class="eqn">M<sup>+</sup> → fragment<sup>+</sup> + radical•<small>Work out the mass of the LOST piece: M − fragment.</small></div>
      <p>Fragments worth knowing on sight:</p>
      <ul>
        <li><b>15</b> = CH<sub>3</sub><sup>+</sup> · <b>29</b> = C<sub>2</sub>H<sub>5</sub><sup>+</sup> or CHO<sup>+</sup> · <b>43</b> = C<sub>3</sub>H<sub>7</sub><sup>+</sup> or CH<sub>3</sub>CO<sup>+</sup></li>
        <li><b>45</b> = COOH<sup>+</sup> · <b>77</b> = C<sub>6</sub>H<sub>5</sub><sup>+</sup> (a phenyl group — the giveaway for an arene)</li>
      </ul>` },

    { t: 'num', h: 'Losing a methyl group', q: 'Butane has M<sup>+</sup> at m/z = 58. It readily loses a <b>•CH<sub>3</sub></b> radical. At what m/z does the resulting fragment ion appear?', ans: '43', tol: '0.4', unit: 'm/z', hint: '58 − 15.' },

    { t: 'mcq', h: 'Identify the compound', q: 'A compound has M<sup>+</sup> at m/z = 46 and strong peaks at 45, 31, 29 and 15. Which compound is it?', why: 'Mr = 46 fits ethanol, C2H5OH. The peak at 31 is CH2OH+, 29 is C2H5+, 15 is CH3+, and 45 is loss of one hydrogen. Methanoic acid also has Mr 46 but would give a strong 29 (CHO+) and 45 (COOH+) with no peak at 31 or 15.', opts: [['Ethanol, CH<sub>3</sub>CH<sub>2</sub>OH — the 31 peak is CH<sub>2</sub>OH<sup>+</sup>', 1], ['Propane, C<sub>3</sub>H<sub>8</sub>', 0], ['Ethanal, CH<sub>3</sub>CHO', 0], ['Ethanoic acid, CH<sub>3</sub>COOH', 0]] },

    { t: 'num', h: 'What was lost?', q: 'An ester has M<sup>+</sup> at m/z = 88 and a strong fragment at m/z = 43 (CH<sub>3</sub>CO<sup>+</sup>). What is the mass of the <b>neutral radical that was lost</b>?', ans: '45', tol: '0.4', unit: '', hint: '88 − 43. (The lost piece is •OC₂H₅.)' },

    { t: 'teach', tag: 'M+1 peak', h: 'The M+1 peak', html: `      <p>About <b>1.1%</b> of all carbon atoms are the isotope <sup>13</sup>C, so a small peak appears at <b>one mass unit above M<sup>+</sup></b>.</p>
      <div class="eqn">number of carbon atoms ≈ (height of M+1 ÷ height of M) × 100 ÷ 1.1</div>
      <p class="note">A compound whose M+1 peak is about <b>4.4%</b> of the height of the M<sup>+</sup> peak therefore contains <b>4</b> carbon atoms. A chlorine-containing compound instead shows an <b>M+2</b> peak about one third the height of M<sup>+</sup> (from <sup>37</sup>Cl), and bromine gives M and M+2 of <b>almost equal</b> height.</p>` },

    { t: 'num', h: 'Counting carbons from M+1', q: 'A compound has an M<sup>+</sup> peak of relative height 100 and an M+1 peak of relative height <b>4.4</b>. How many <b>carbon atoms</b> does the molecule contain?', ans: '4', tol: '0.2', unit: 'carbons', hint: '4.4 ÷ 1.1.' },

    { t: 'teach', tag: 'Infrared', h: 'Infrared spectroscopy', html: `      <p>Bonds <b>vibrate</b> (stretch and bend), and each bond absorbs infrared radiation of a characteristic <b>wavenumber</b> (cm<sup>−1</sup>). Edexcel gives you the wavenumber data — you have to <b>use</b> it.</p>
      <ul>
        <li><b>2850–3100</b> C–H (in alkanes, alkenes, aldehydes) — almost every organic spectrum has this</li>
        <li><b>1680–1750</b> <b>C=O</b> — sharp and very strong (aldehyde, ketone, acid, ester)</li>
        <li><b>3200–3600</b> <b>O–H in an alcohol</b> — broad</li>
        <li><b>2500–3300</b> <b>O–H in a carboxylic acid</b> — <b>very</b> broad, sitting on top of the C–H peaks</li>
        <li><b>3300–3500</b> N–H (amine) · <b>1000–1300</b> C–O</li>
      </ul>
      <p class="note"><b>The fingerprint region</b> (below about 1500 cm<sup>−1</sup>) is a complicated pattern unique to each compound. You do not interpret it peak by peak — you <b>match it against a database</b> to confirm identity.</p>` },

    { t: 'mcq', h: 'Reading an IR spectrum', q: 'An IR spectrum shows a <b>very broad</b> absorption from 2500–3300 cm<sup>−1</sup> and a <b>strong sharp</b> peak at 1710 cm<sup>−1</sup>. What is the compound?', why: 'A very broad absorption in the 2500-3300 range is the classic O-H of a carboxylic acid, and 1710 is a C=O. Both together means a carboxylic acid. An alcohol would show a broad O-H at 3200-3600 but no C=O; a ketone would show C=O but no O-H.', opts: [['A carboxylic acid', 1], ['An alcohol', 0], ['A ketone', 0], ['An alkene', 0]] },

    { t: 'mcq', h: 'Ethanol or ethanal?', q: 'Which single IR feature lets you tell <b>ethanol</b> from <b>ethanal</b>?', why: 'Ethanol has an O-H and no C=O; ethanal has a C=O and no O-H. So the presence of a strong sharp peak near 1700 (C=O) with no broad O-H identifies ethanal, and a broad 3200-3600 absorption with no C=O identifies ethanol.', opts: [['Ethanol has a broad O–H peak at 3200–3600 and no C=O; ethanal has a strong C=O near 1700 and no O–H', 1], ['Only ethanol shows a C–H absorption', 0], ['Only ethanal shows a peak in the fingerprint region', 0], ['Ethanol shows a C=O peak but ethanal does not', 0]] },

    { t: 'mcq', h: 'Confirming an ester', q: 'Which combination of IR absorptions is most consistent with an <b>ester</b> such as ethyl ethanoate?', why: 'An ester has a C=O (1680-1750) and a C-O single bond (1000-1300) but crucially NO O-H, so there is no broad absorption above 2500 other than the ordinary C-H peaks.', opts: [['A strong C=O near 1740 and a C–O absorption at 1000–1300, with <b>no</b> broad O–H', 1], ['A strong C=O near 1740 and a very broad O–H at 2500–3300', 0], ['A broad O–H at 3200–3600 and no C=O', 0], ['Only absorptions in the fingerprint region', 0]] },

    { t: 'sort' },

    { t: 'match' }
  ],
  sort: {
    h: 'Which peaks will the spectrum show?', prompt: 'Tap the compound, then tap the set of IR absorptions it will show (apart from the usual C–H).',
    bins: [{ key: 'co', label: '🟦 C=O only' }, { key: 'oh', label: '🟩 O–H only' }, { key: 'both', label: '🟪 C=O and broad O–H' }],
    chips: [['propanone', 'co'], ['ethanal', 'co'], ['ethanol', 'oh'], ['propan-2-ol', 'oh'], ['ethanoic acid', 'both'], ['propanoic acid', 'both']],
    doneMsg: 'All sorted — a carboxylic acid is the only one of the three with BOTH a C=O and a very broad O–H.'
  },
  match: {
    h: 'Name that fragment', prompt: 'Match each m/z value to the fragment ion that produces it.', leftHead: 'm/z of the fragment', rightHead: 'Fragment ion',
    pairs: [
      ['15', 'CH₃⁺'],
      ['29', 'C₂H₅⁺'],
      ['45', 'COOH⁺'],
      ['77', 'C₆H₅⁺ (phenyl)']
    ],
    doneMsg: 'All matched — a peak at 77 is a strong hint that a benzene ring is present.'
  },
  recap: [
    ['M<sup>+</sup> peak', 'the peak at the highest m/z gives M<sub>r</sub> — it is not necessarily the tallest'],
    ['Fragments', 'M<sup>+</sup> → cation + radical; 15 = CH<sub>3</sub><sup>+</sup>, 29 = C<sub>2</sub>H<sub>5</sub><sup>+</sup>, 45 = COOH<sup>+</sup>, 77 = C<sub>6</sub>H<sub>5</sub><sup>+</sup>'],
    ['M+1', 'from <sup>13</sup>C: number of carbons = (M+1 ÷ M) × 100 ÷ 1.1'],
    ['IR', 'C=O 1680–1750 · alcohol O–H 3200–3600 broad · acid O–H 2500–3300 very broad'],
    ['Fingerprint region', 'below 1500 cm<sup>−1</sup>: matched against a database, not read peak by peak']
  ]
},

/* ================= TOPIC 8 ================= */
{
  slug: 'energetics-i',
  specTopic: 'Topic 8: Energetics I',
  title: 'Energetics I',
  emoji: '🔥',
  desc: 'Interactive Edexcel A-level Chemistry (9CH0) mini-lesson on Topic 8 Energetics I: enthalpy changes and standard conditions, enthalpy definitions, calorimetry with q = mcΔT, Hess cycles and mean bond enthalpy calculations.',
  intro: 'Energetics I is about <b>measuring and calculating enthalpy changes</b>: the definitions, the calorimetry experiment (<b>q = mcΔT</b>), <b>Hess cycles</b> for the changes you cannot measure directly, and <b>mean bond enthalpies</b>.',
  pillars: [['definitions'], ['calorimetry', 'q = mcΔT'], ['Hess', 'cycles'], ['bond', 'enthalpies']],
  pillarCaption: 'if you cannot measure it directly, go round the cycle',
  screens: [
    { t: 'teach', tag: 'Enthalpy', h: 'Enthalpy and standard conditions', html: `      <p><b>Enthalpy change (ΔH)</b> is the heat energy change measured at <b>constant pressure</b>. Units: <b>kJ mol<sup>−1</sup></b>. Always give the <b>sign</b>.</p>
      <ul>
        <li><b>Exothermic, ΔH negative</b> — heat is given out, the surroundings warm up, the products are <b>lower</b> in energy than the reactants.</li>
        <li><b>Endothermic, ΔH positive</b> — heat is taken in, the surroundings cool down, the products are <b>higher</b> in energy.</li>
      </ul>
      <p class="note"><b>Standard conditions (the ⦵ symbol):</b> a pressure of <b>100 kPa</b>, a stated temperature (usually <b>298 K</b>), all substances in their <b>standard states</b>, and solutions at <b>1 mol dm<sup>−3</sup></b>. Note that Edexcel uses 100 kPa, not 1 atm.</p>` },

    { t: 'mcq', h: 'Standard conditions', q: 'Which set of conditions is the standard set used for ΔH<sup>⦵</sup> values?', why: 'Standard conditions for Edexcel are 100 kPa pressure, a stated temperature (normally 298 K), all substances in their standard states, and any solutions at 1 mol dm-3.', opts: [['100 kPa, 298 K, all substances in their standard states, solutions at 1 mol dm<sup>−3</sup>', 1], ['101 kPa, 273 K, all substances as gases', 0], ['100 kPa, 273 K, solutions at 0.1 mol dm<sup>−3</sup>', 0], ['Any pressure, 298 K, all substances as pure liquids', 0]] },

    { t: 'teach', tag: 'Definitions', h: 'The enthalpy definitions', html: `      <ul>
        <li><b>ΔH of formation (Δ<sub>f</sub>H<sup>⦵</sup>)</b> — the enthalpy change when <b>one mole</b> of a compound is formed from its <b>elements in their standard states</b>. (So Δ<sub>f</sub>H of an element is <b>zero</b>.)</li>
        <li><b>ΔH of combustion (Δ<sub>c</sub>H<sup>⦵</sup>)</b> — when <b>one mole</b> of a substance burns <b>completely in excess oxygen</b>.</li>
        <li><b>ΔH of neutralisation</b> — when an acid and an alkali react to form <b>one mole of water</b>.</li>
        <li><b>ΔH of reaction</b> — for the molar quantities in the equation as written.</li>
      </ul>
      <div class="eqn">2C(s) + 3H<sub>2</sub>(g) + ½O<sub>2</sub>(g) → C<sub>2</sub>H<sub>5</sub>OH(l)<small>The formation equation for ethanol. Note the half — you must make exactly ONE mole of the compound.</small></div>` },

    { t: 'mcq', h: 'Writing a formation equation', q: 'Which equation correctly represents the standard enthalpy of formation of methane?', why: 'Formation means exactly one mole of the compound made from its elements in their standard states: carbon as graphite (solid) and hydrogen as H2 gas. C(s) + 2H2(g) gives CH4(g) and is balanced.', opts: [['C(s) + 2H<sub>2</sub>(g) → CH<sub>4</sub>(g)', 1], ['C(g) + 4H(g) → CH<sub>4</sub>(g)', 0], ['CH<sub>4</sub>(g) → C(s) + 2H<sub>2</sub>(g)', 0], ['2C(s) + 4H<sub>2</sub>(g) → 2CH<sub>4</sub>(g)', 0]] },

    { t: 'teach', tag: 'Calorimetry', h: 'Measuring ΔH: q = mcΔT', html: `      <div class="eqn">q = m c ΔT<small>m = mass of the WATER (or solution) in g · c = 4.18 J g⁻¹ K⁻¹ · ΔT = temperature change in K</small></div>
      <p><b>Then</b> divide by the number of moles of the limiting reactant, convert to kJ, and add the sign:</p>
      <div class="eqn">ΔH = − q ÷ n<small>Negative if the temperature ROSE (exothermic).</small></div>
      <p class="note"><b>Why an experimental Δ<sub>c</sub>H is always less exothermic than the data book value:</b> heat is lost to the surroundings and the apparatus; combustion may be <b>incomplete</b> (soot on the beaker); some fuel <b>evaporates</b>; and the conditions are not standard. All of these make the measured temperature rise too small.</p>` },

    { t: 'num', h: 'Calorimetry calculation', q: 'Burning <b>0.0100 mol</b> of a fuel raises the temperature of <b>100 g</b> of water by <b>12.5 K</b>. (c = 4.18 J g<sup>−1</sup> K<sup>−1</sup>.) Calculate Δ<sub>c</sub>H in kJ mol<sup>−1</sup>. <b>Include the sign.</b>', ans: '-522.5', tol: '2', unit: 'kJ mol⁻¹', hint: 'q = 100 × 4.18 × 12.5 = 5225 J. Then ΔH = −(5225 ÷ 0.0100) J mol⁻¹ = −522 500 J mol⁻¹. Convert to kJ.' },

    { t: 'mcq', h: 'Why is the answer too small?', q: 'A student measures Δ<sub>c</sub>H(ethanol) as −900 kJ mol<sup>−1</sup>; the data book says −1367 kJ mol<sup>−1</sup>. Which explains the difference?', why: 'Every realistic error makes the measured temperature rise too small: heat is lost to the surroundings and the apparatus, combustion is incomplete (soot), and some ethanol evaporates. So the calculated value comes out LESS exothermic than the true one.', opts: [['Heat loss to the surroundings, incomplete combustion and evaporation of the fuel', 1], ['The specific heat capacity of water was too high', 0], ['Too much fuel was burned, so the temperature rose too far', 0], ['The reaction is actually endothermic under laboratory conditions', 0]] },

    { t: 'teach', tag: 'Hess', h: "Hess's Law", html: `      <p><b>Hess's Law:</b> the total enthalpy change for a reaction is <b>independent of the route</b> taken, provided the initial and final conditions are the same.</p>
      <div class="eqn">Δ<sub>r</sub>H = ΣΔ<sub>f</sub>H(products) − ΣΔ<sub>f</sub>H(reactants)<small>arrows point UP from the elements — formation data</small></div>
      <div class="eqn">Δ<sub>r</sub>H = ΣΔ<sub>c</sub>H(reactants) − ΣΔ<sub>c</sub>H(products)<small>arrows point DOWN to the combustion products — combustion data</small></div>
      <p class="note"><b>Do not memorise which is which — draw the cycle.</b> Put the reaction across the top, the elements (or the combustion products) at the bottom, and follow the arrows. Going against an arrow means changing the sign.</p>` },

    { t: 'num', h: 'A Hess cycle', q: 'Given Δ<sub>c</sub>H: C(s) = −394, H<sub>2</sub>(g) = −286, CH<sub>4</sub>(g) = −890 kJ mol<sup>−1</sup>. Calculate Δ<sub>f</sub>H of methane for C(s) + 2H<sub>2</sub>(g) → CH<sub>4</sub>(g). <b>Include the sign.</b>', ans: '-76', tol: '1.5', unit: 'kJ mol⁻¹', hint: 'ΔfH = ΣΔcH(reactants) − ΣΔcH(products) = [−394 + 2(−286)] − (−890).' },

    { t: 'teach', tag: 'Bond enthalpy', h: 'Mean bond enthalpies', html: `      <p><b>Mean bond enthalpy</b> is the energy needed to break <b>one mole</b> of a bond in the <b>gaseous</b> state, averaged over many different compounds. <b>Breaking bonds is endothermic; making bonds is exothermic.</b></p>
      <div class="eqn">ΔH = Σ(bonds broken) − Σ(bonds made)<small>all species must be gaseous for this to be valid</small></div>
      <p class="note"><b>Why the answer never quite agrees with the Hess value:</b> the values are <b>means</b> taken over many compounds, so the actual bond in this molecule is slightly different; and the method assumes <b>everything is a gas</b>, whereas the real reaction may involve liquids or solids (which involves extra enthalpy changes of vaporisation).</p>` },

    { t: 'num', h: 'Bond enthalpy calculation', q: 'For H<sub>2</sub>(g) + Cl<sub>2</sub>(g) → 2HCl(g), use these mean bond enthalpies (kJ mol<sup>−1</sup>): H–H = 436, Cl–Cl = 242, H–Cl = 431. Calculate ΔH. <b>Include the sign.</b>', ans: '-184', tol: '2', unit: 'kJ mol⁻¹', hint: 'Broken: 436 + 242 = 678. Made: 2 × 431 = 862. ΔH = 678 − 862.' },

    { t: 'mcq', h: 'Why the two methods disagree', q: 'A ΔH calculated from mean bond enthalpies rarely matches the value from a Hess cycle. Why?', why: 'Mean bond enthalpies are averaged over many different compounds, so the actual bond strength in this particular molecule differs slightly. The method also assumes every species is gaseous, which is often not true.', opts: [['The values are averages over many compounds, and the method assumes all species are gaseous', 1], ["Hess's Law does not apply to gases", 0], ['Bond breaking is exothermic, which the calculation ignores', 0], ['Mean bond enthalpies are measured under non-standard pressure', 0]] },

    { t: 'sort' },

    { t: 'match' }
  ],
  sort: {
    h: 'Exothermic or endothermic?', prompt: 'Tap the change, then tap whether it gives out or takes in energy.',
    bins: [{ key: 'exo', label: '🔥 Exothermic (ΔH −)' }, { key: 'endo', label: '❄️ Endothermic (ΔH +)' }],
    chips: [['combustion of methane', 'exo'], ['neutralising HCl with NaOH', 'exo'], ['condensing steam', 'exo'], ['thermal decomposition of CaCO₃', 'endo'], ['photosynthesis', 'endo'], ['melting ice', 'endo']],
    doneMsg: 'All sorted — bond breaking takes energy in, bond making gives energy out.'
  },
  match: {
    h: 'Enthalpy definitions', prompt: 'Match each term to the definition Edexcel wants.', leftHead: 'Term', rightHead: 'Definition',
    pairs: [
      ['Enthalpy of formation', 'One mole of a compound made from its elements in their standard states'],
      ['Enthalpy of combustion', 'One mole of a substance burned completely in excess oxygen'],
      ['Enthalpy of neutralisation', 'An acid and an alkali react to form one mole of water'],
      ['Mean bond enthalpy', 'Breaking one mole of a bond in the gaseous state, averaged over many compounds']
    ],
    doneMsg: 'All matched — every one of these is per MOLE of a specified substance.'
  },
  recap: [
    ['Standard conditions', '100 kPa, usually 298 K, standard states, 1 mol dm<sup>−3</sup> solutions'],
    ['Calorimetry', 'q = mcΔT (mass of WATER), then ΔH = −q ÷ n; errors always make it less exothermic'],
    ['Hess', 'ΔH is route-independent: Δ<sub>r</sub>H = ΣΔ<sub>f</sub>H(products) − ΣΔ<sub>f</sub>H(reactants)'],
    ['Bond enthalpy', 'ΔH = Σ(broken) − Σ(made); breaking is endothermic'],
    ['Limitations', 'bond enthalpies are means and assume all species are gaseous']
  ]
},

/* ================= TOPIC 9 ================= */
{
  slug: 'kinetics-i',
  specTopic: 'Topic 9: Kinetics I',
  title: 'Kinetics I',
  emoji: '⏱️',
  desc: 'Interactive Edexcel A-level Chemistry (9CH0) mini-lesson on Topic 9 Kinetics I: measuring rates, collision theory, activation energy, the Maxwell-Boltzmann distribution, and how catalysts work.',
  intro: 'Kinetics I is the <b>qualitative</b> half of rates: how you <b>measure</b> a rate, why <b>concentration, temperature, pressure and surface area</b> change it, and how the <b>Maxwell–Boltzmann distribution</b> explains temperature and catalysts.',
  pillars: [['measuring', 'rate'], ['collision', 'theory'], ['Maxwell–', 'Boltzmann'], ['catalysts']],
  pillarCaption: 'a reaction needs collisions — frequent, energetic and correctly aligned',
  screens: [
    { t: 'teach', tag: 'Measuring rate', h: 'What rate means and how to measure it', html: `      <p><b>Rate of reaction</b> = the change in the amount of a reactant or product per unit time. Practical methods:</p>
      <ul>
        <li><b>Gas volume</b> collected in a syringe against time</li>
        <li><b>Mass loss</b> on a balance (when a gas escapes)</li>
        <li><b>Colorimetry</b>, if a species is coloured</li>
        <li><b>Titrating</b> samples of the mixture at intervals (quenching first)</li>
      </ul>
      <p class="note"><b>Rates from a graph:</b> plot the quantity against time and draw a <b>tangent</b>. The <b>gradient of the tangent</b> is the rate at that instant. The tangent drawn at <b>t = 0</b> gives the <b>initial rate</b> — the most useful one, because concentrations are known exactly at that moment.</p>` },

    { t: 'num', h: 'Calculating a rate', q: 'A reaction produces <b>48 cm<sup>3</sup></b> of gas in the first <b>20 s</b>. Calculate the mean rate of reaction over that time in cm<sup>3</sup> s<sup>−1</sup>.', ans: '2.4', tol: '0.05', unit: 'cm³ s⁻¹', hint: '48 ÷ 20.' },

    { t: 'num', h: 'Rate from a mass loss', q: 'A flask loses <b>0.44 g</b> of CO<sub>2</sub> in <b>200 s</b>. Calculate the mean rate of mass loss, in units of <b>10<sup>−3</sup> g s<sup>−1</sup></b> (type the number in front).', ans: '2.2', tol: '0.05', unit: '× 10⁻³ g s⁻¹', hint: '0.44 ÷ 200 = 0.0022 g s⁻¹.' },

    { t: 'teach', tag: 'Collision theory', h: 'Collision theory', html: `      <p>For a reaction to happen, particles must <b>collide</b> with:</p>
      <ul>
        <li>energy <b>greater than or equal to the activation energy, E<sub>a</sub></b> (the minimum energy needed to start breaking bonds), <b>and</b></li>
        <li>the <b>correct orientation</b>.</li>
      </ul>
      <p>Only a <b>small fraction</b> of collisions succeed. So anything that increases the <b>frequency of successful collisions</b> increases the rate:</p>
      <ul>
        <li><b>Concentration or pressure up</b> → more particles per unit volume → <b>more frequent</b> collisions.</li>
        <li><b>Surface area up</b> (powder rather than lumps) → more particles exposed → more frequent collisions.</li>
        <li><b>Temperature up</b> → particles move faster (a few more collisions) <b>and — far more importantly —</b> a much greater <b>proportion</b> of them have E ≥ E<sub>a</sub>.</li>
      </ul>` },

    { t: 'mcq', h: 'Why concentration matters', q: 'Why does increasing the concentration of a solution increase the rate?', why: 'A higher concentration means more particles in the same volume, so collisions happen more often. The energy of each collision is unchanged - it is the collision FREQUENCY that rises, so the frequency of successful collisions rises too.', opts: [['There are more particles per unit volume, so collisions are more frequent', 1], ['The particles have more energy, so more collisions exceed E<sub>a</sub>', 0], ['The activation energy is lowered', 0], ['The particles move faster', 0]] },

    { t: 'teach', tag: 'Maxwell–Boltzmann', h: 'The Maxwell–Boltzmann distribution', html: `      <p>The curve shows how molecular energies are <b>spread out</b> in a gas at a given temperature. You must be able to describe it precisely:</p>
      <ul>
        <li>It starts at the <b>origin</b> — no molecule has zero energy.</li>
        <li>It has a <b>peak</b> at the most probable energy, and the <b>mean</b> energy lies a little to the right of the peak.</li>
        <li>It never touches the x-axis — there is <b>no maximum energy</b>.</li>
        <li>The <b>area under the curve</b> = the <b>total number of molecules</b>, so it stays the same at any temperature.</li>
      </ul>
      <p class="note"><b>Raising the temperature:</b> the peak moves to the <b>right</b> and becomes <b>lower and broader</b> (the area must stay constant). The shaded area to the right of E<sub>a</sub> — the molecules with enough energy to react — <b>increases sharply</b>. That is why a small temperature rise causes a large rate rise.</p>` },

    { t: 'mcq', h: 'Raising the temperature', q: 'What happens to the Maxwell–Boltzmann curve when the temperature is increased?', why: 'The peak moves right (higher most probable energy) and drops lower and broader, because the total area - the total number of molecules - is fixed. The proportion of molecules with E greater than or equal to Ea rises sharply, which is the main reason the rate increases.', opts: [['The peak shifts right and gets lower; the area to the right of E<sub>a</sub> increases sharply', 1], ['The whole curve shifts up, so the area under it increases', 0], ['The peak shifts right and gets higher, and E<sub>a</sub> falls', 0], ['The curve is unchanged but E<sub>a</sub> decreases', 0]] },

    { t: 'num', h: 'The rule of thumb', q: 'As a rough guide, the rate of many reactions <b>doubles</b> for every <b>10 K</b> rise in temperature. By what factor would the rate increase for a rise of <b>30 K</b>?', ans: '8', tol: '0.1', unit: '×', hint: '2 × 2 × 2.' },

    { t: 'teach', tag: 'Catalysts', h: 'Catalysts', html: `      <p>A <b>catalyst</b> increases the rate of a reaction by providing an <b>alternative reaction route with a lower activation energy</b>, and is <b>not used up</b> overall (it may be chemically changed during the reaction, but it is regenerated).</p>
      <ul>
        <li>On a <b>Maxwell–Boltzmann</b> diagram, the catalyst <b>moves the E<sub>a</sub> line to the left</b>, so a <b>much greater proportion</b> of molecules now have enough energy to react. The curve itself does <b>not</b> move.</li>
        <li>On a <b>reaction profile</b>, the catalysed route has a <b>lower hump</b> — but the <b>same ΔH</b>, because the reactants and products are unchanged.</li>
        <li><b>Heterogeneous</b> = different phase from the reactants (e.g. solid Fe in the Haber process); <b>homogeneous</b> = same phase.</li>
      </ul>
      <p class="note"><b>Why industry cares:</b> a catalyst lets a process run at a <b>lower temperature and pressure</b> for the same rate, which cuts energy costs and CO<sub>2</sub> emissions, and allows smaller, cheaper plant.</p>` },

    { t: 'mcq', h: 'What a catalyst actually does', q: 'Which statement about a catalyst is correct?', why: 'A catalyst provides an alternative route with a lower activation energy. It does not change the energy of the reactants or the products, so it cannot change delta H, and it does not give the molecules extra energy.', opts: [['It provides an alternative route with a lower activation energy; ΔH is unchanged', 1], ['It lowers the energy of the reactants, making ΔH more negative', 0], ['It gives the reactant molecules extra kinetic energy', 0], ['It shifts the Maxwell–Boltzmann curve to the right', 0]] },

    { t: 'mcq', h: 'Finding the initial rate', q: 'A student plots volume of gas against time and gets a curve. How do they find the <b>initial rate</b>?', why: 'The rate at any instant is the gradient of the curve at that point, so you draw a tangent at t = 0 and calculate its gradient. Using the total volume over the total time would give the mean rate for the whole reaction, not the initial rate.', opts: [['Draw a tangent to the curve at t = 0 and calculate its gradient', 1], ['Divide the total volume of gas by the total time', 0], ['Take the gradient of the flat part of the curve at the end', 0], ['Measure the volume of gas after exactly one minute', 0]] },

    { t: 'sort' },

    { t: 'match' }
  ],
  sort: {
    h: 'Does it speed the reaction up?', prompt: 'Marble chips are reacting with hydrochloric acid. Tap a change, then tap its effect on the rate.',
    bins: [{ key: 'inc', label: '⬆️ Increases the rate' }, { key: 'no', label: '➖ No effect on the rate' }],
    chips: [['using powdered marble', 'inc'], ['warming the acid', 'inc'], ['using more concentrated acid', 'inc'], ['using a larger flask', 'no'], ['using a larger volume of the same acid', 'no'], ['adding an inert gas above the mixture', 'no']],
    doneMsg: 'All sorted — only changes that alter collision frequency or collision energy change the rate.'
  },
  match: {
    h: 'Key terms', prompt: 'Match each term to its meaning.', leftHead: 'Term', rightHead: 'Meaning',
    pairs: [
      ['Activation energy', 'The minimum energy colliding particles need in order to react'],
      ['Catalyst', 'Provides an alternative route of lower activation energy and is not used up'],
      ['Heterogeneous catalyst', 'A catalyst in a different phase from the reactants'],
      ['Maxwell–Boltzmann distribution', 'The spread of molecular energies in a sample of gas']
    ],
    doneMsg: 'All matched — the area under the M-B curve is the total number of molecules.'
  },
  recap: [
    ['Rate', 'gradient of the tangent; at t = 0 it is the initial rate'],
    ['Collision theory', 'need E ≥ E<sub>a</sub> AND correct orientation'],
    ['Concentration/pressure/surface area', 'increase the frequency of collisions'],
    ['Temperature', 'mainly increases the PROPORTION of molecules with E ≥ E<sub>a</sub>'],
    ['M–B curve', 'starts at origin, never touches the axis, area = total molecules; higher T → lower, broader, shifted right'],
    ['Catalyst', 'alternative route, lower E<sub>a</sub>, ΔH unchanged, not used up']
  ]
},

/* ================= TOPIC 10 ================= */
{
  slug: 'equilibrium-i',
  specTopic: 'Topic 10: Equilibrium I',
  title: 'Equilibrium I',
  emoji: '⚖️',
  desc: 'Interactive Edexcel A-level Chemistry (9CH0) mini-lesson on Topic 10 Equilibrium I: dynamic equilibrium, Le Chatelier predictions for temperature, concentration and pressure, the industrial compromise, and deducing the expression for Kc.',
  intro: 'Equilibrium I is the <b>qualitative</b> half: what <b>dynamic equilibrium</b> really means, how <b>Le Chatelier</b> predicts the shift, why industry settles for a <b>compromise</b>, and how to <b>deduce a K<sub>c</sub> expression</b>. (Calculating K comes in Topic 11.)',
  pillars: [['dynamic', 'equilibrium'], ['Le', 'Chatelier'], ['industrial', 'compromise'], ['K', 'expression']],
  pillarCaption: 'the position moves — but only temperature changes K',
  screens: [
    { t: 'teach', tag: 'Dynamic equilibrium', h: 'What dynamic equilibrium means', html: `      <p>A reversible reaction reaches <b>dynamic equilibrium</b> in a <b>closed system</b> when:</p>
      <ul>
        <li>the <b>rate of the forward reaction = the rate of the backward reaction</b>, and</li>
        <li>the <b>concentrations of all species stay constant</b> (not equal — constant).</li>
      </ul>
      <p class="note"><b>Dynamic, not static.</b> Both reactions are still happening, at the same rate. And equilibrium can only be reached in a closed system: if a product escapes, the system can never reach equilibrium.</p>` },

    { t: 'mcq', h: 'Spot the correct statement', q: 'Which statement about a system at dynamic equilibrium is correct?', why: 'At equilibrium the forward and backward rates are equal, so all concentrations stay constant. They are almost never EQUAL to each other, and both reactions are still going - the system is dynamic, not stopped.', opts: [['The forward and backward rates are equal, so the concentrations remain constant', 1], ['The concentrations of reactants and products are equal', 0], ['Both reactions have stopped', 0], ['The amount of product equals the amount of reactant', 0]] },

    { t: 'teach', tag: 'Le Chatelier', h: "Le Chatelier's principle", html: `      <p><b>If a change is made to a system at equilibrium, the position of equilibrium shifts so as to oppose that change.</b></p>
      <div class="eqn">N<sub>2</sub>(g) + 3H<sub>2</sub>(g) ⇌ 2NH<sub>3</sub>(g)&nbsp;&nbsp;ΔH = −92 kJ mol<sup>−1</sup><small>4 moles of gas on the left, 2 on the right; the forward reaction is exothermic</small></div>
      <ul>
        <li><b>Increase the pressure</b> → shifts to the side with <b>fewer moles of gas</b> → <b>right</b>, so the yield of NH<sub>3</sub> rises.</li>
        <li><b>Increase the temperature</b> → shifts in the <b>endothermic</b> direction to absorb the heat → <b>left</b>, so the yield <b>falls</b>.</li>
        <li><b>Remove NH<sub>3</sub></b> as it forms → shifts <b>right</b> to replace it.</li>
        <li><b>Add a catalyst</b> → <b>no shift at all</b>. It speeds up both directions equally; equilibrium is simply reached <b>sooner</b>.</li>
      </ul>
      <p class="note"><b>A trap:</b> adding an <b>inert gas at constant volume</b> raises the total pressure but does <b>not</b> change the partial pressures of the reacting gases — so there is <b>no shift</b>.</p>` },

    { t: 'sort' },

    { t: 'mcq', h: 'Heating an exothermic equilibrium', q: 'For 2SO<sub>2</sub>(g) + O<sub>2</sub>(g) ⇌ 2SO<sub>3</sub>(g), ΔH = −196 kJ mol<sup>−1</sup>. What happens to the yield of SO<sub>3</sub> and the value of K when the temperature is <b>raised</b>?', why: 'Raising the temperature shifts the position in the endothermic direction - here, backwards - so the yield of SO3 falls. Temperature is the only thing that changes the value of K, and for an exothermic forward reaction K decreases as T rises.', opts: [['The yield of SO<sub>3</sub> falls and K decreases', 1], ['The yield of SO<sub>3</sub> falls but K is unchanged', 0], ['The yield of SO<sub>3</sub> rises and K increases', 0], ['The yield of SO<sub>3</sub> rises but K is unchanged', 0]] },

    { t: 'teach', tag: 'Industry', h: 'The industrial compromise', html: `      <p>The Haber process runs at about <b>450 °C</b> and <b>200 atm</b> with an <b>iron</b> catalyst. Neither number gives the best yield — they are a <b>compromise</b>:</p>
      <ul>
        <li>A <b>lower</b> temperature would give a better yield (the forward reaction is exothermic), but the <b>rate</b> would be far too slow to be economic. 450 °C is a compromise between <b>yield and rate</b>.</li>
        <li>A <b>higher</b> pressure would give a better yield, but very high pressures need thick-walled vessels and powerful compressors — it becomes <b>dangerous and too expensive</b>. So the pressure is a compromise between <b>yield and cost/safety</b>.</li>
        <li>The <b>catalyst</b> does not affect the yield at all — it lets the plant reach equilibrium quickly at a lower temperature than would otherwise be needed.</li>
      </ul>
      <p class="note"><b>Recycling</b> unreacted N<sub>2</sub> and H<sub>2</sub>, and <b>condensing out</b> the ammonia (which liquefies first), pushes the overall conversion far higher than the single-pass yield.</p>` },

    { t: 'mcq', h: 'Why not use a low temperature?', q: 'The yield of ammonia is higher at low temperature, so why does the Haber process run at 450 °C?', why: 'At a low temperature the equilibrium yield is high but the rate is far too slow to be economic - the plant would take too long to produce anything. 450 C is a compromise: an acceptable yield achieved at an acceptable rate. The catalyst helps, but it does not change the yield.', opts: [['At low temperature the rate would be far too slow to be economic, so 450 °C is a compromise between yield and rate', 1], ['At low temperature the yield would actually be lower, because the reaction is endothermic', 0], ['The catalyst only works above 450 °C, and it increases the yield', 0], ['A high temperature increases the yield by increasing the pressure', 0]] },

    { t: 'teach', tag: 'K expression', h: 'Deducing the K<sub>c</sub> expression', html: `      <p>For the general equilibrium aA + bB ⇌ cC + dD:</p>
      <div class="eqn">K<sub>c</sub> = [C]<sup>c</sup>[D]<sup>d</sup> ÷ ([A]<sup>a</sup>[B]<sup>b</sup>)<small>products on top; each concentration raised to the power of its balancing number</small></div>
      <ul>
        <li>Square brackets mean <b>equilibrium</b> concentration in mol dm<sup>−3</sup>.</li>
        <li>In a <b>heterogeneous</b> equilibrium, <b>solids and pure liquids are left out</b> — their concentration is effectively constant. So for CaCO<sub>3</sub>(s) ⇌ CaO(s) + CO<sub>2</sub>(g), K<sub>c</sub> = [CO<sub>2</sub>].</li>
        <li><b>Only temperature changes the value of K.</b> Concentration, pressure and catalysts change the <b>position</b>, never the constant.</li>
      </ul>` },

    { t: 'mcq', h: 'Write the expression', q: 'What is the K<sub>c</sub> expression for N<sub>2</sub>(g) + 3H<sub>2</sub>(g) ⇌ 2NH<sub>3</sub>(g)?', why: 'Products over reactants, each raised to the power of its balancing number: [NH3]^2 divided by [N2][H2]^3. The 3 in front of H2 becomes a cube, not a multiplier.', opts: [['[NH<sub>3</sub>]<sup>2</sup> ÷ ([N<sub>2</sub>][H<sub>2</sub>]<sup>3</sup>)', 1], ['([N<sub>2</sub>][H<sub>2</sub>]<sup>3</sup>) ÷ [NH<sub>3</sub>]<sup>2</sup>', 0], ['(2[NH<sub>3</sub>]) ÷ ([N<sub>2</sub>] × 3[H<sub>2</sub>])', 0], ['[NH<sub>3</sub>] ÷ ([N<sub>2</sub>][H<sub>2</sub>])', 0]] },

    { t: 'teach', tag: 'ICE tables', h: 'Working out equilibrium amounts', html: `      <p>Before you can calculate anything, you need the <b>equilibrium amounts</b>. Use an <b>ICE</b> table — Initial, Change, Equilibrium — and remember that the <b>changes are always in the ratio of the balancing numbers</b>.</p>
      <div class="work">
        <div class="wt">Worked example</div>
        <p>1.00 mol of A and 1.00 mol of B are mixed in a 1.00 dm<sup>3</sup> flask. A + B ⇌ C + D. At equilibrium <b>0.25 mol</b> of A remains.</p>
        <p><b>Change in A</b> = 1.00 − 0.25 = 0.75 mol reacted.</p>
        <p>The ratio is 1 : 1 : 1 : 1, so 0.75 mol of B has also reacted (leaving 0.25 mol) and <b>0.75 mol of C and 0.75 mol of D</b> have formed.</p>
      </div>` },

    { t: 'num', h: 'Equilibrium amount', q: 'Using the worked example above (1.00 mol A + 1.00 mol B, A + B ⇌ C + D, 0.25 mol of A left at equilibrium): how many <b>moles of C</b> are present at equilibrium?', ans: '0.75', tol: '0.02', unit: 'mol', hint: '1.00 − 0.25 = 0.75 mol of A reacted, and the ratio A : C is 1 : 1.' },

    { t: 'num', h: 'Percentage conversion', q: 'In the same experiment, what <b>percentage</b> of the A originally present has been converted at equilibrium?', ans: '75', tol: '1', unit: '%', hint: '(0.75 ÷ 1.00) × 100.' },

    { t: 'num', h: 'Using the mole ratio', q: 'N<sub>2</sub> + 3H<sub>2</sub> ⇌ 2NH<sub>3</sub>. <b>4.0 mol</b> of N<sub>2</sub> and <b>12.0 mol</b> of H<sub>2</sub> are mixed. At equilibrium <b>3.0 mol</b> of N<sub>2</sub> remain. How many moles of NH<sub>3</sub> have formed?', ans: '2', tol: '0.05', unit: 'mol', hint: '1.0 mol of N₂ has reacted, and the N₂ : NH₃ ratio is 1 : 2.' },

    { t: 'match' }
  ],
  sort: {
    h: 'Which way does it shift?', prompt: 'For N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH = −92 kJ mol⁻¹. Tap the change, then tap what it does to the position of equilibrium.',
    bins: [{ key: 'right', label: '➡️ Shifts right' }, { key: 'left', label: '⬅️ Shifts left' }, { key: 'none', label: '➖ No shift' }],
    chips: [['increase the pressure', 'right'], ['remove ammonia as it forms', 'right'], ['add more nitrogen', 'right'], ['increase the temperature', 'left'], ['decrease the pressure', 'left'], ['add an iron catalyst', 'none'], ['add argon at constant volume', 'none']],
    doneMsg: 'All sorted — a catalyst and an inert gas at constant volume change nothing about the position.'
  },
  match: {
    h: 'Change and consequence', prompt: 'Match each change to what it does to the yield and to the equilibrium constant.', leftHead: 'Change', rightHead: 'Consequence',
    pairs: [
      ['Add a catalyst', 'Equilibrium reached sooner; position and K both unchanged'],
      ['Raise the temperature (forward reaction exothermic)', 'Yield falls and the value of K decreases'],
      ['Raise the pressure (fewer gas moles on the right)', 'Yield rises but K is unchanged'],
      ['Add more of a reactant', 'Position shifts right but K is unchanged']
    ],
    doneMsg: 'All matched — temperature is the ONLY thing that changes the value of K.'
  },
  recap: [
    ['Dynamic equilibrium', 'closed system; forward rate = backward rate; concentrations constant, not equal'],
    ['Le Chatelier', 'the system shifts to oppose the change'],
    ['Pressure', 'shifts to the side with fewer moles of gas; an inert gas at constant volume does nothing'],
    ['Temperature', 'shifts in the endothermic direction — and it is the ONLY thing that changes K'],
    ['Compromise', 'Haber: 450 °C (yield vs rate) and 200 atm (yield vs cost and safety)'],
    ['K<sub>c</sub>', 'products over reactants, each to the power of its balancing number; omit solids and pure liquids']
  ]
}

];
