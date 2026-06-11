# Batch 5 remainder: author "sequence" keys for remaining specs.
# Each sequence is in TRUE ascending order (earliest/smallest first).
import json, os

S = {}

def seq(stem, items):
    S[stem] = [{"term": t, "def": d} for t, d in items]

# ---------------- CHEMISTRY GCSE ----------------

seq("chemistry-gcse-aqa-atomic-structure-the-periodic-table-adventure-1", [
 ("Dalton's solid sphere model", "1803: atoms pictured as tiny indivisible solid spheres"),
 ("Thomson's plum pudding model", "1897: electron discovered; positive ball with electrons inside"),
 ("Rutherford's nuclear model", "1911: gold foil experiment revealed a tiny dense positive nucleus"),
 ("Bohr's shell model", "1913: electrons orbit the nucleus at fixed distances in shells"),
 ("Chadwick discovers the neutron", "1932: neutral particle in the nucleus explains isotopes"),
])

seq("chemistry-gcse-aqa-bonding-structure-properties-adventure-1", [
 ("Oxygen, O2", "Simple molecule; weak forces between molecules; melts at -219°C"),
 ("Water, H2O", "Simple molecule with hydrogen bonding; melts at 0°C"),
 ("Sodium metal", "Metallic bonding in a soft Group 1 metal; melts at 98°C"),
 ("Sodium chloride", "Giant ionic lattice of Na+ and Cl- ions; melts at 801°C"),
 ("Diamond", "Giant covalent network of carbon; melts around 3,550°C"),
])

seq("chemistry-gcse-aqa-chemistry-of-the-atmosphere-adventure-1", [
 ("Volcanoes release gases", "~4.6 billion years ago: early atmosphere mostly CO2"),
 ("Oceans form and absorb CO2", "Water vapour condenses; CO2 dissolves, forming sediments"),
 ("Photosynthesis begins", "~2.7 billion years ago: algae start releasing oxygen"),
 ("Carbon locked away", "CO2 trapped in sedimentary rocks and fossil fuels"),
 ("Modern atmosphere", "About 78% nitrogen, 21% oxygen, plus small traces"),
 ("Human emissions rise", "Since ~1750 burning fossil fuels has pushed CO2 up"),
])

seq("chemistry-gcse-aqa-rate-extent-of-change-adventure-1", [
 ("Reactants mixed in a closed system", "Only the forward reaction can happen at first"),
 ("Forward reaction at its fastest", "Reactant concentration is highest at the start"),
 ("Products begin to react back", "Reverse reaction starts as products accumulate"),
 ("Forward slows, reverse speeds up", "Reactants are used up while products build"),
 ("Rates become equal", "Dynamic equilibrium: concentrations now stay constant"),
])

seq("chemistry-gcse-atomic-structure-adventure-1", [
 ("Dalton: solid sphere atom", "1803: matter made of tiny indivisible particles"),
 ("Thomson: plum pudding", "1897: electrons found embedded in a positive ball"),
 ("Rutherford: nuclear atom", "1911: alpha scattering reveals a tiny positive nucleus"),
 ("Bohr: electron shells", "1913: electrons sit in fixed energy levels"),
 ("Chadwick: neutron found", "1932: uncharged nucleon completes the model"),
])

seq("chemistry-gcse-bonding--structure-adventure-1", [
 ("Carbon dioxide, CO2", "Simple molecular; turns to gas at -78°C"),
 ("Ice, H2O", "Simple molecular with hydrogen bonds; melts at 0°C"),
 ("Sodium metal", "Metallic lattice; melts at 98°C"),
 ("Sodium chloride", "Giant ionic lattice; melts at 801°C"),
 ("Silicon dioxide", "Giant covalent; melts at about 1,710°C"),
 ("Diamond", "Giant covalent carbon; about 3,550°C"),
])

seq("chemistry-gcse-bonding-adventure-1", [
 ("Na and Cl atoms approach", "A Group 1 metal atom meets a Group 7 non-metal atom"),
 ("The outer electron transfers", "Sodium's single outer electron passes to chlorine"),
 ("Oppositely charged ions form", "Na+ (2,8) and Cl- (2,8,8), each with a full outer shell"),
 ("Electrostatic attraction", "Opposite charges pull the ions strongly together"),
 ("Giant ionic lattice forms", "Ions pack into a regular repeating 3D structure"),
])

seq("chemistry-gcse-cambridge-igcse-acids-bases-salts-adventure-1", [
 ("Stomach acid", "pH about 1 — strong hydrochloric acid"),
 ("Vinegar", "pH about 3 — weak ethanoic acid"),
 ("Pure water", "pH exactly 7 — neutral"),
 ("Baking soda solution", "pH about 9 — weak alkali"),
 ("Household ammonia", "pH about 11 — moderate alkali"),
 ("Oven cleaner", "pH about 13–14 — strong alkali"),
])

seq("chemistry-gcse-cambridge-igcse-atoms-elements-compounds-adventure-1", [
 ("Hydrogen", "Atomic number 1 — one proton, the lightest element"),
 ("Helium", "Atomic number 2 — first noble gas"),
 ("Carbon", "Atomic number 6 — basis of organic chemistry"),
 ("Oxygen", "Atomic number 8 — about 21% of the air"),
 ("Sodium", "Atomic number 11 — reactive Group 1 metal"),
 ("Chlorine", "Atomic number 17 — green Group 7 gas"),
])

seq("chemistry-gcse-cambridge-igcse-chemical-energetics-adventure-1", [
 ("Reactants at starting energy", "The energy level where the profile begins"),
 ("Energy taken in to break bonds", "Bond breaking is always endothermic"),
 ("Activation energy peak", "Highest point: minimum energy needed to react"),
 ("New bonds form, releasing energy", "Bond making is exothermic"),
 ("Products at lower energy", "More released than absorbed, so ΔH is negative"),
])

seq("chemistry-gcse-cambridge-igcse-chemical-reactions-adventure-1", [
 ("Clean the wire loop", "Dip nichrome wire in hydrochloric acid to remove traces"),
 ("Pick up the sample", "Touch the damp loop into the solid salt"),
 ("Hold in a roaring blue flame", "Use the hottest Bunsen flame"),
 ("Observe the flame colour", "e.g. lithium red, sodium yellow, potassium lilac"),
 ("Identify the metal ion", "Match the colour to the cation it indicates"),
])

seq("chemistry-gcse-cambridge-igcse-chemistry-of-the-environment-adventure-1", [
 ("Intense volcanic activity", "Earth's first atmosphere: mainly CO2 and water vapour"),
 ("Oceans condense", "Cooling lets water form oceans that dissolve CO2"),
 ("Algae photosynthesise", "From ~2.7 billion years ago oxygen is released"),
 ("Oxygen builds, CO2 locked up", "Carbonate rocks and fossil fuels store the carbon"),
 ("Today's air", "78% nitrogen, 21% oxygen; humans now adding CO2 again"),
])

seq("chemistry-gcse-cambridge-igcse-electrochemistry-adventure-1", [
 ("Melt the ionic compound", "Ions must be free to move, so the solid is melted"),
 ("Connect graphite electrodes to DC power", "Anode (+) and cathode (-) dip into the melt"),
 ("Ions migrate", "Positive ions drift to the cathode, negative to the anode"),
 ("Discharge at the electrodes", "Cations gain electrons (reduction); anions lose them"),
 ("Products collect", "e.g. molten lead at the cathode, bromine gas at the anode"),
])

seq("chemistry-gcse-cambridge-igcse-experimental-techniques-analysis-adventure-1", [
 ("Draw the baseline in pencil", "Pencil won't dissolve and run in the solvent"),
 ("Spot the samples on the line", "Small dots of each ink or dye, labelled"),
 ("Stand paper in shallow solvent", "Solvent level must start below the baseline"),
 ("Solvent rises up the paper", "Dyes are carried at different speeds and separate"),
 ("Mark the solvent front", "Remove the paper before solvent reaches the top"),
 ("Calculate Rf values", "Rf = distance moved by spot ÷ distance moved by solvent"),
])

seq("chemistry-gcse-cambridge-igcse-metals-adventure-1", [
 ("Charge added at the top", "Iron ore, coke and limestone enter the furnace"),
 ("Hot air blasted in", "Blown in near the bottom of the furnace"),
 ("Coke burns", "C + O2 → CO2 releases heat, raising the temperature"),
 ("Carbon monoxide forms", "CO2 reacts with more hot coke: CO2 + C → 2CO"),
 ("Iron oxide is reduced", "CO removes oxygen: Fe2O3 + 3CO → 2Fe + 3CO2"),
 ("Molten iron tapped off", "Dense liquid iron sinks and is run off at the base"),
])

seq("chemistry-gcse-cambridge-igcse-states-of-matter-adventure-1", [
 ("Ice below 0°C", "Particles vibrate about fixed positions in a lattice"),
 ("Melting at 0°C", "Temperature stays constant while the lattice breaks down"),
 ("Liquid water heats up", "Between 0°C and 100°C particles slide and speed up"),
 ("Boiling at 100°C", "Flat again: energy frees particles from the liquid"),
 ("Steam above 100°C", "Gas particles move fast and far apart"),
])

seq("chemistry-gcse-cambridge-igcse-stoichiometry-adventure-1", [
 ("Write the balanced equation", "Coefficients give the reacting mole ratio"),
 ("Work out the molar masses", "Add relative atomic masses to get Mr"),
 ("Convert the given mass to moles", "n = mass ÷ Mr"),
 ("Apply the mole ratio", "Scale moles using the equation's coefficients"),
 ("Convert back to mass", "mass = moles × Mr of the substance asked for"),
])

seq("chemistry-gcse-ccea-acids-bases-salts-adventure-1", [
 ("Battery acid", "pH about 0–1 — concentrated strong acid"),
 ("Lemon juice", "pH about 2 — citric acid"),
 ("Rainwater", "pH about 5.5 — slightly acidic from dissolved CO2"),
 ("Pure water", "pH 7 — neutral"),
 ("Milk of magnesia", "pH about 10 — mild alkali used for indigestion"),
 ("Sodium hydroxide solution", "pH about 14 — strong alkali"),
])

seq("chemistry-gcse-ccea-formulae-equations-adventure-1", [
 ("Write the word equation", "Name the reactants and products first"),
 ("Replace names with formulae", "Correct chemical formulae — never change them later"),
 ("Count atoms on each side", "Compare each element left and right"),
 ("Add balancing numbers", "Coefficients in front of formulae equalise the atoms"),
 ("Re-count to check", "Every element must now match on both sides"),
 ("Add state symbols", "(s), (l), (g) and (aq) complete the equation"),
])

seq("chemistry-gcse-ccea-materials-adventure-1", [
 ("An atom", "Typically about 0.1 nanometres across"),
 ("A nanoparticle", "1–100 nm: a cluster of a few hundred atoms"),
 ("A fine particle (PM2.5)", "100–2,500 nm, found in polluted air"),
 ("A coarse particle (PM10)", "2,500–10,000 nm — dust"),
 ("Width of a human hair", "Around 100,000 nm"),
])

seq("chemistry-gcse-ccea-metals-reactivity-series-adventure-1", [
 ("Gold", "So unreactive it is found native in the ground"),
 ("Copper", "Won't react with dilute acids — sits below hydrogen"),
 ("Iron", "Reacts slowly with dilute acid; rusts slowly in air"),
 ("Zinc", "Reacts steadily with dilute acids"),
 ("Magnesium", "Fizzes rapidly in dilute acid"),
 ("Potassium", "Most reactive: lilac flame as it skims across water"),
])

seq("chemistry-gcse-ccea-rates-of-reaction-equilibrium-adventure-1", [
 ("Measure thiosulfate into a flask", "Use a measuring cylinder for a fixed volume"),
 ("Place flask on a printed cross", "View the cross down through the solution"),
 ("Add the acid and start the timer", "Reaction begins, producing solid sulfur"),
 ("Mixture turns cloudy", "Sulfur precipitate gradually blocks the view"),
 ("Stop timing when the cross vanishes", "Record the time taken"),
 ("Repeat at other temperatures", "Compare rates using 1 ÷ time"),
])

seq("chemistry-gcse-ccea-redox-rusting-iron-adventure-1", [
 ("Bare iron exposed", "Oxygen AND water both reach the metal surface"),
 ("Surface oxidation begins", "Iron atoms lose electrons, forming Fe2+ ions"),
 ("Iron(II) oxidised further", "Fe2+ becomes Fe3+ as oxygen keeps attacking"),
 ("Hydrated iron(III) oxide forms", "Orange-brown rust builds up on the surface"),
 ("Flaking exposes fresh metal", "Rust is porous, so corrosion eats ever deeper"),
])

seq("chemistry-gcse-ccea-tests-for-ions-gases-adventure-1", [
 ("Moisten a clean nichrome loop", "Dip it in concentrated hydrochloric acid"),
 ("Collect a little of the salt", "The sample sticks to the damp wire"),
 ("Place in the blue Bunsen flame", "Hold it in the hottest part of the flame"),
 ("Watch the colour produced", "Crimson Li+, yellow Na+, lilac K+, brick-red Ca2+"),
 ("Name the cation present", "The flame colour identifies the metal ion"),
])

seq("chemistry-gcse-chemical-analysis-adventure-1", [
 ("Rule a pencil start line", "Ink would dissolve; pencil graphite does not"),
 ("Add spots of each sample", "Place small concentrated dots on the line"),
 ("Lower paper into the solvent", "Keep the solvent surface below the start line"),
 ("Mobile phase climbs the paper", "Solvent carries dyes up the stationary phase"),
 ("Spots separate", "More soluble dyes travel further up the paper"),
 ("Measure and compare Rf", "Rf = spot distance ÷ solvent front distance"),
])

seq("chemistry-gcse-chemical-changes-adventure-1", [
 ("Hydrochloric acid", "pH about 1 — strong acid, fully ionised"),
 ("Vinegar", "pH about 3 — weak acid, partially ionised"),
 ("Pure water", "pH 7 — neutral"),
 ("Soap solution", "pH about 9–10 — mild alkali"),
 ("Drain cleaner", "pH about 14 — strong alkali"),
])

seq("chemistry-gcse-edexcel-extracting-metals-equilibria-adventure-1", [
 ("Gold", "Found native — no extraction reaction needed"),
 ("Copper", "Low in the series; easily extracted from its ores"),
 ("Iron", "Below carbon, so extracted by heating ore with carbon"),
 ("Zinc", "Also below carbon; reduced with carbon in a furnace"),
 ("Aluminium", "Above carbon, so it needs costly electrolysis"),
 ("Potassium", "Most reactive of these; only electrolysis works"),
])

seq("chemistry-gcse-edexcel-fuels-earth-science-adventure-1", [
 ("Refinery gases", "Boiling point below 40°C; leave the top of the column"),
 ("Petrol", "Boils around 40–100°C; fuel for cars"),
 ("Kerosene", "Boils around 150–250°C; jet fuel"),
 ("Diesel oil", "Boils around 250–300°C; lorries and trains"),
 ("Fuel oil", "Boils around 300–350°C; ships and power stations"),
 ("Bitumen", "Boils above 350°C; tapped from the hot base — roads"),
])

seq("chemistry-gcse-edexcel-groups-in-the-periodic-table-adventure-1", [
 ("Lithium", "Fizzes steadily on water — least reactive of the five"),
 ("Sodium", "Melts into a ball and fizzes vigorously on water"),
 ("Potassium", "Ignites with a lilac flame on water"),
 ("Rubidium", "Reacts violently, often explosively"),
 ("Caesium", "Most reactive: outer electron is lost most easily"),
])

seq("chemistry-gcse-edexcel-igcse-inorganic-chemistry-adventure-1", [
 ("Astatine", "Rare, radioactive, least reactive halogen"),
 ("Iodine", "Grey solid; displaced by all halogens above it"),
 ("Bromine", "Orange liquid; displaces iodine from solution"),
 ("Chlorine", "Green gas; displaces bromine and iodine"),
 ("Fluorine", "Most reactive halogen — gains an electron most easily"),
])

seq("chemistry-gcse-edexcel-igcse-physical-chemistry-adventure-1", [
 ("Start: reactants' energy level", "The profile begins at the reactant energy"),
 ("Climb: bonds being broken", "Energy must be absorbed from the surroundings"),
 ("Peak: activation energy reached", "The minimum energy for a successful reaction"),
 ("Fall: new bonds forming", "Energy is released as products form"),
 ("Finish: products below reactants", "Exothermic overall; ΔH negative; flask warms"),
])

seq("chemistry-gcse-edexcel-igcse-principles-of-chemistry-adventure-1", [
 ("Solid ice warms", "Below 0°C particles only vibrate in place"),
 ("Ice melts at 0°C", "Energy breaks the rigid lattice; temperature stays flat"),
 ("Water warms from 0 to 100°C", "Liquid particles move faster as it heats"),
 ("Water boils at 100°C", "Bubbles of vapour form throughout the liquid"),
 ("Steam keeps heating", "Above 100°C gas particles speed up further"),
])

seq("chemistry-gcse-edexcel-key-concepts-in-chemistry-adventure-1", [
 ("Dalton's atoms", "1803: indivisible spheres; each element has one kind"),
 ("Thomson's electrons", "1897: cathode rays reveal negative particles in atoms"),
 ("Rutherford's nucleus", "1911: alpha particles mostly pass through gold foil"),
 ("Bohr's shells", "1913: electrons orbit at set energy levels"),
 ("Chadwick's neutron", "1932: explains the missing mass in the nucleus"),
])

seq("chemistry-gcse-edexcel-rates-of-reaction-energy-changes-adventure-1", [
 ("Add dilute acid to the flask", "Measure a fixed volume of hydrochloric acid"),
 ("Drop in magnesium and seal", "Attach the gas syringe and start the stopwatch"),
 ("Record gas volume regularly", "Read the syringe every 10 seconds"),
 ("Fast start", "Steepest curve: reactant concentration is highest"),
 ("Reaction slows", "Acid is being used up, so collisions get rarer"),
 ("Curve goes flat", "Reaction finished: a reactant has run out"),
])

seq("chemistry-gcse-edexcel-separate-chemistry-1-adventure-1", [
 ("Pipette alkali into a flask", "Exactly 25.0 cm3 into a conical flask"),
 ("Add a few drops of indicator", "e.g. phenolphthalein — pink in alkali"),
 ("Fill the burette with acid", "Record the initial reading at eye level"),
 ("Run in acid while swirling", "Add steadily, mixing all the time"),
 ("Slow to drop-by-drop", "Near the end point add one drop at a time"),
 ("Stop at the colour change", "Record final reading; titre = final − initial"),
])

seq("chemistry-gcse-edexcel-separate-chemistry-2-adventure-1", [
 ("Methane, CH4", "1 carbon — natural gas"),
 ("Ethane, C2H6", "2 carbons"),
 ("Propane, C3H8", "3 carbons — bottled gas"),
 ("Butane, C4H10", "4 carbons — lighter fuel"),
 ("Pentane, C5H12", "5 carbons — liquid at room temperature"),
])

seq("chemistry-gcse-edexcel-states-of-matter-mixtures-adventure-1", [
 ("Add water and stir", "Salt dissolves; sand does not"),
 ("Filter the mixture", "Sand is trapped in the filter paper as residue"),
 ("Collect the filtrate", "Salty water passes through the paper"),
 ("Evaporate gently", "Heat the solution to drive off most of the water"),
 ("Crystallise and dry", "Salt crystals are left behind"),
])

seq("chemistry-gcse-electrolysis--extraction-adventure-1", [
 ("Mine bauxite ore", "Aluminium's main ore is dug from the ground"),
 ("Purify to aluminium oxide", "Impurities are removed, leaving white Al2O3"),
 ("Dissolve in molten cryolite", "Lowers the melting point, saving energy"),
 ("Pass the current", "Al3+ ions gain electrons at the negative cathode"),
 ("Tap off molten aluminium", "Liquid metal collects at the bottom of the cell"),
])

seq("chemistry-gcse-energy-changes-adventure-1", [
 ("Reactants hold stored energy", "The starting level on the reaction profile"),
 ("Energy in: bonds break", "Breaking bonds always takes in energy"),
 ("Top of the energy hill", "Activation energy: the barrier to reaction"),
 ("Energy out: bonds form", "Forming new bonds releases energy"),
 ("Products finish lower", "Exothermic: ΔH negative, surroundings heat up"),
])

seq("chemistry-gcse-ocr-chemical-reactions-adventure-1", [
 ("Warm the dilute acid", "Gentle heat speeds up the coming reaction"),
 ("Add insoluble base in excess", "e.g. copper oxide until no more reacts"),
 ("Filter off the excess base", "Unreacted solid stays in the filter paper"),
 ("Evaporate to crystallisation point", "Heat the salt solution to concentrate it"),
 ("Cool to form crystals", "Leave the hot solution to crystallise slowly"),
 ("Dry the crystals", "Pat dry with filter paper"),
])

seq("chemistry-gcse-ocr-elements-compounds-mixtures-adventure-1", [
 ("Heat the salt water", "The solution boils in the distillation flask"),
 ("Water boils at 100°C", "Water vapour rises; the salt stays dissolved behind"),
 ("Vapour enters the condenser", "It leaves the flask through the side arm"),
 ("Vapour cools and condenses", "The cold water jacket turns steam back to liquid"),
 ("Pure water collects", "Distillate drips into the beaker; salt left in flask"),
])

seq("chemistry-gcse-ocr-global-challenges-adventure-1", [
 ("Volcanic early atmosphere", "Billions of years ago: mostly carbon dioxide"),
 ("Oceans take up CO2", "Condensed water dissolves the gas; sediments form"),
 ("Photosynthesis adds oxygen", "Algae, then plants, slowly transform the air"),
 ("Stable modern mix", "Roughly four-fifths nitrogen and one-fifth oxygen"),
 ("Industrial era emissions", "Fossil fuel burning raises CO2 and warms the climate"),
])

seq("chemistry-gcse-ocr-monitoring-controlling-reactions-adventure-1", [
 ("Sealed flask of reactants", "A closed system: nothing enters or escapes"),
 ("Forward reaction dominates", "It is fastest while reactants are plentiful"),
 ("Reverse reaction begins", "Newly made products start turning back"),
 ("Rates draw level", "Forward slows while reverse accelerates"),
 ("Dynamic equilibrium reached", "Both reactions continue but amounts stay steady"),
])

seq("chemistry-gcse-ocr-particles-adventure-1", [
 ("Cold solid", "Particles packed in rows, vibrating gently"),
 ("Melting point reached", "Solid becomes liquid; temperature pauses"),
 ("Liquid warms", "Particles slip past each other ever faster"),
 ("Boiling point reached", "Liquid becomes gas; temperature pauses again"),
 ("Hot gas", "Particles fly freely, far apart"),
])

seq("chemistry-gcse-ocr-practical-skills-adventure-1", [
 ("Place burner on a heatproof mat", "Connect the hose to the gas tap"),
 ("Close the air hole", "Ensures a visible yellow safety flame when lit"),
 ("Light a splint over the chimney", "Never lean across the burner"),
 ("Turn on the gas", "The yellow safety flame appears"),
 ("Open the air hole", "The flame turns roaring blue for heating"),
 ("Close the air hole when finished", "Back to the visible safety flame"),
])

seq("chemistry-gcse-ocr-predicting-identifying-reactions-adventure-1", [
 ("Lithium", "Slowest of the alkali metals in water"),
 ("Sodium", "Fizzes and whizzes across the surface"),
 ("Potassium", "Burns with a lilac flame on water"),
 ("Rubidium", "Violent, sometimes explosive reaction"),
 ("Caesium", "Most reactive — explodes on contact with water"),
])

seq("chemistry-gcse-organic-chemistry-adventure-1", [
 ("Gases", "Lowest boiling points — exit at the cool top of the column"),
 ("Petrol (gasoline)", "Boils roughly 40–100°C"),
 ("Kerosene (paraffin)", "Roughly 150–250°C; aircraft fuel"),
 ("Diesel", "Roughly 250–300°C"),
 ("Heavy fuel oil", "Roughly 300–350°C"),
 ("Bitumen", "Highest boiling point; tapped from the hot bottom"),
])

seq("chemistry-gcse-organic-reactions-adventure-1", [
 ("Mix sugar solution with yeast", "Glucose dissolved in water plus yeast cells"),
 ("Keep warm without air", "25–35°C, anaerobic conditions suit the enzymes"),
 ("Enzymes convert glucose", "Glucose → ethanol + carbon dioxide"),
 ("CO2 bubbles escape", "The gas turns limewater milky"),
 ("Fermentation stops", "Around 15% ethanol kills the yeast"),
 ("Distil to concentrate", "Fractional distillation gives purer ethanol"),
])

seq("chemistry-gcse-quantitative-calculations-adventure-1", [
 ("Balance the equation", "Get the correct mole ratio first"),
 ("Moles of limiting reactant", "Convert the starting mass with n = m ÷ Mr"),
 ("Theoretical moles of product", "Scale by the ratio from the equation"),
 ("Theoretical mass of product", "Multiply moles by the product's Mr"),
 ("Weigh the actual product", "Real yields are lower — losses and side reactions"),
 ("Calculate percentage yield", "actual ÷ theoretical × 100"),
])

seq("chemistry-gcse-quantitative-chemistry-adventure-1", [
 ("Write and balance the equation", "Coefficients give the mole ratios"),
 ("Find Ar and Mr values", "Use the periodic table to add atomic masses"),
 ("Change mass into moles", "n = mass ÷ Mr for the known substance"),
 ("Use the mole ratio", "Convert to moles of the unknown substance"),
 ("Convert moles to mass", "mass = n × Mr answers the question"),
])

seq("chemistry-gcse-rate--equilibrium-adventure-1", [
 ("Reaction starts in a closed container", "Only reactants are present at first"),
 ("Products start to appear", "The forward reaction converts reactants quickly"),
 ("Backward reaction switches on", "Products begin reforming reactants"),
 ("Forward falls, backward rises", "Concentrations shift towards a balance"),
 ("Both rates equal", "Dynamic equilibrium: no further net change"),
])

seq("chemistry-gcse-rates-of-reaction-adventure-1", [
 ("Pour thiosulfate into a flask", "A fixed, measured volume each time"),
 ("Set the flask over a black cross", "Look down through the liquid at the mark"),
 ("Add acid and begin timing", "Sulfur starts to form in the mixture"),
 ("Cloudiness increases", "The precipitate scatters more and more light"),
 ("Cross disappears — stop the clock", "A shorter time means a faster rate"),
 ("Calculate the rate", "Use 1 ÷ time to compare conditions"),
])

seq("chemistry-gcse-the-periodic-table-adventure-1", [
 ("Döbereiner's triads", "1829: elements grouped in threes with similar properties"),
 ("Newlands' octaves", "1864: every eighth element seemed alike — then it broke"),
 ("Mendeleev's table", "1869: ordered by atomic weight, with gaps for predictions"),
 ("Predicted elements found", "1875: gallium matched Mendeleev's 'eka-aluminium'"),
 ("Table ordered by atomic number", "1913: Moseley fixed the order by proton number"),
])

seq("chemistry-gcse-using-resources-adventure-1", [
 ("Extract raw materials", "Mining and quarrying — the 'cradle' of the product"),
 ("Manufacture the product", "Processing and packaging use energy and water"),
 ("Distribute to shops", "Transport adds fuel use and emissions"),
 ("Use throughout its life", "Impact during the years the product is used"),
 ("Dispose at end of life", "Landfill, incineration or recycling — the 'grave'"),
])

# ---------------- CHEMISTRY IBDP ----------------

seq("chemistry-ibdp-acids--bases-adventure-1", [
 ("0.1 mol/dm3 hydrochloric acid", "pH 1: strong acid, fully dissociated"),
 ("Vinegar", "pH about 3: weak ethanoic acid, partially dissociated"),
 ("Pure water at 25°C", "pH 7: [H+] = [OH-] = 10^-7 mol/dm3"),
 ("Ammonia solution", "pH about 11: a weak base"),
 ("0.1 mol/dm3 sodium hydroxide", "pH 13: strong base"),
])

seq("chemistry-ibdp-atomic-structure-adventure-1", [
 ("Dalton's atomic theory", "1803: elements are made of identical atoms"),
 ("Thomson finds the electron", "1897: the plum pudding model follows"),
 ("Rutherford's gold foil", "1911: nuclear model with a dense positive centre"),
 ("Bohr's quantised orbits", "1913: explains hydrogen's line spectrum"),
 ("Schrödinger's quantum model", "1926: electrons described by orbitals, not paths"),
])

seq("chemistry-ibdp-chemical-bonding--structure-adventure-1", [
 ("Methane, CH4", "Weak London forces only; melts at -182°C"),
 ("Ice, H2O", "Hydrogen-bonded molecules; melts at 0°C"),
 ("Sodium chloride", "Ionic lattice; melts at 801°C"),
 ("Magnesium oxide", "Ionic with 2+/2− charges; melts at 2,852°C"),
 ("Diamond", "Covalent network solid; about 3,550°C"),
])

seq("chemistry-ibdp-chemical-kinetics-adventure-1", [
 ("Prepare known concentrations", "Make up the reactant solutions precisely"),
 ("Start the reaction and the clock", "Mix and begin recording at t = 0"),
 ("Record change over time", "Track volume, mass or colour at intervals"),
 ("Plot concentration against time", "Draw the curve from the data"),
 ("Draw a tangent at t = 0", "The initial slope of the curve"),
 ("Gradient gives the initial rate", "Rate = change in concentration ÷ time"),
])

seq("chemistry-ibdp-energetics--thermochemistry-adventure-1", [
 ("Measure water into the calorimeter", "A known mass or volume of water"),
 ("Record the initial temperature", "A steady starting reading, T1"),
 ("React or burn the sample", "e.g. ignite the fuel beneath the can"),
 ("Record the maximum temperature", "Final reading T2 gives ΔT = T2 − T1"),
 ("Calculate heat: q = mcΔT", "Use water's specific heat capacity"),
 ("Find ΔH per mole", "Divide q by moles and add the correct sign"),
])

seq("chemistry-ibdp-equilibrium-adventure-1", [
 ("Only reactants present", "At t = 0 the reverse rate is zero"),
 ("Forward rate at maximum", "Reactant concentrations are highest"),
 ("Products accumulate", "The reverse reaction picks up speed"),
 ("Rates converge", "Forward falls as reverse rises"),
 ("Rates equal: equilibrium", "Macroscopic properties now stay constant"),
])

seq("chemistry-ibdp-hl-atomic-structure-hl-adventure-1", [
 ("Vaporisation", "The sample is turned into a gas"),
 ("Ionisation", "Electron bombardment knocks out electrons, making + ions"),
 ("Acceleration", "An electric field speeds the ions up"),
 ("Deflection", "A magnetic field bends paths by mass-to-charge ratio"),
 ("Detection", "Ions are counted to build the mass spectrum"),
])

seq("chemistry-ibdp-hl-chemical-bonding-hl-adventure-1", [
 ("Methane, CH4", "Boils at -162°C: only weak London forces"),
 ("Hydrogen chloride, HCl", "Boils at -85°C: dipole–dipole attraction"),
 ("Hydrogen sulfide, H2S", "Boils at -60°C: larger, more polarisable molecule"),
 ("Ammonia, NH3", "Boils at -33°C: hydrogen bonding begins"),
 ("Water, H2O", "Boils at 100°C: extensive hydrogen bonding"),
])

seq("chemistry-ibdp-hl-measurement-analysis-adventure-1", [
 ("Combustion analysis", "Burning the sample gives % composition by mass"),
 ("Empirical formula", "Simplest whole-number ratio from the percentages"),
 ("Mass spectrum gives Mr", "The molecular ion peak shows the molar mass"),
 ("Molecular formula", "Scale the empirical formula up to match Mr"),
 ("IR and NMR spectra", "Reveal functional groups and hydrogen environments"),
 ("Final structure deduced", "All the evidence combines into one molecule"),
])

seq("chemistry-ibdp-measurement--data-processing-adventure-1", [
 ("Record raw data with uncertainties", "Note each reading and its absolute uncertainty"),
 ("Reject anomalous results", "Identify outliers before averaging"),
 ("Calculate the mean", "Average the remaining repeat readings"),
 ("Find percentage uncertainties", "Absolute uncertainty ÷ value × 100"),
 ("Propagate through the calculation", "Add % uncertainties when multiplying or dividing"),
 ("Quote the final answer sensibly", "Correct significant figures and units"),
])

seq("chemistry-ibdp-organic-chemistry-adventure-1", [
 ("Ethene from cracking", "Long alkanes are split, giving the alkene feedstock"),
 ("Hydration to ethanol", "Ethene + steam with an acid catalyst"),
 ("Partial oxidation to ethanal", "Distil off the aldehyde as it forms"),
 ("Further oxidation to ethanoic acid", "Reflux with excess oxidising agent"),
 ("Esterification", "The acid + ethanol give ethyl ethanoate"),
])

seq("chemistry-ibdp-periodicity-adventure-1", [
 ("Chlorine", "Smallest: radius about 99 pm — strongest pull per shell"),
 ("Sulfur", "Radius about 104 pm"),
 ("Phosphorus", "Radius about 110 pm"),
 ("Silicon", "Radius about 118 pm"),
 ("Aluminium", "Radius about 143 pm"),
 ("Sodium", "Largest in period 3: about 186 pm — fewest protons"),
])

seq("chemistry-ibdp-redox-processes-adventure-1", [
 ("Write the skeleton half-equation", "Just the species being oxidised or reduced"),
 ("Balance atoms other than O and H", "Equalise the main element first"),
 ("Balance oxygen with H2O", "Add water molecules to the deficient side"),
 ("Balance hydrogen with H+", "Acidic solution supplies the protons"),
 ("Balance charge with electrons", "Add e− so both sides match"),
 ("Combine the half-equations", "Scale so electrons cancel, then add"),
])

seq("chemistry-ibdp-stoichiometric-relationships-adventure-1", [
 ("Balance the chemical equation", "Establish the mole ratios"),
 ("Convert each mass to moles", "n = m ÷ M for every reactant"),
 ("Identify the limiting reactant", "Divide moles by coefficients; smallest runs out"),
 ("Calculate product moles", "Use the limiting reactant and the ratio"),
 ("Convert to the product's mass", "m = n × M"),
 ("Work out percentage yield", "Compare actual with theoretical"),
])

# ---------------- CHEMISTRY KS3 ----------------

seq("chemistry-ks3-acids-alkalis--indicators-adventure-1", [
 ("Stomach acid", "pH about 1 — universal indicator turns red"),
 ("Vinegar", "pH about 3 — orange"),
 ("Pure water", "pH 7 — green: neutral"),
 ("Baking soda solution", "pH about 9 — blue"),
 ("Oven cleaner", "pH about 13 — purple: strong alkali"),
])

seq("chemistry-ks3-atoms--molecules-adventure-1", [
 ("Electron", "Far smaller than an atom; whizzes around the nucleus"),
 ("Nucleus", "Tiny centre of the atom holding protons and neutrons"),
 ("Atom", "About a tenth of a millionth of a millimetre across"),
 ("Molecule", "Two or more atoms joined together, like H2O"),
 ("Speck of dust", "Contains billions upon billions of molecules"),
])

seq("chemistry-ks3-chemical-reactions-adventure-1", [
 ("Gather the reactants", "The starting substances are measured out"),
 ("Start the reaction", "Heating or mixing sets particles colliding"),
 ("Changes show it's working", "Fizzing, colour change or heat given out"),
 ("The reaction stops", "It ends when one reactant is completely used up"),
 ("New products remain", "Different substances with new properties are left"),
])

seq("chemistry-ks3-earth--atmosphere-adventure-1", [
 ("Atmosphere", "The layer of gases wrapped around the planet"),
 ("Crust", "Thin rocky outer shell, up to about 70 km thick"),
 ("Mantle", "Hot, slowly-flowing rock down to about 2,900 km"),
 ("Outer core", "Liquid iron and nickel, down to about 5,150 km"),
 ("Inner core", "Solid metal ball at the centre, 6,371 km down"),
])

seq("chemistry-ks3-elements--compounds-adventure-1", [
 ("Hydrogen, H", "Element number 1 — the lightest atom"),
 ("Helium, He", "Element number 2 — balloon gas"),
 ("Carbon, C", "Element number 6 — in all living things"),
 ("Oxygen, O", "Element number 8 — the gas we breathe"),
 ("Iron, Fe", "Element number 26 — a magnetic metal"),
])

seq("chemistry-ks3-metals--materials-adventure-1", [
 ("Gold", "Never tarnishes; found pure in nature"),
 ("Copper", "Very slow to react; safe for water pipes"),
 ("Iron", "Rusts slowly in damp air"),
 ("Zinc", "Fizzes gently in acid"),
 ("Magnesium", "Burns with a brilliant white flame"),
 ("Potassium", "Dangerously reactive — stored under oil"),
])

seq("chemistry-ks3-rocks--the-rock-cycle-adventure-1", [
 ("Magma cools and hardens", "Crystals form: igneous rock is made"),
 ("Weathering breaks rock up", "Wind, water and ice crack rock into fragments"),
 ("Sediment is moved and dropped", "Rivers carry fragments and deposit them in layers"),
 ("Layers become sedimentary rock", "Compaction and cementation over millions of years"),
 ("Heat and pressure transform it", "Deep burial creates metamorphic rock"),
 ("Rock melts back into magma", "The cycle is ready to begin again"),
])

seq("chemistry-ks3-separating-mixtures-adventure-1", [
 ("Stir the mixture into water", "The soluble salt dissolves; sand stays solid"),
 ("Pour through filter paper", "Insoluble sand is caught as the residue"),
 ("Keep the filtrate", "The clear salt solution passes through"),
 ("Heat to evaporate the water", "The solution gets more and more concentrated"),
 ("Crystals form and dry", "Pure salt remains at the end"),
])

seq("chemistry-ks3-states-of-matter-adventure-1", [
 ("Solid ice", "Particles vibrate in fixed positions — below 0°C"),
 ("Melting", "At 0°C ice turns to liquid water"),
 ("Liquid water", "Particles move around each other — between 0 and 100°C"),
 ("Boiling", "At 100°C water turns rapidly to gas"),
 ("Water vapour", "Gas particles spread out and move fast — above 100°C"),
])

seq("chemistry-ks3-the-particle-model-adventure-1", [
 ("Cold solid", "Lowest energy: particles vibrate in a fixed pattern"),
 ("Warmer solid", "Particles vibrate harder as energy is added"),
 ("Melts into a liquid", "Enough energy to slide past each other"),
 ("Hotter liquid", "Movement speeds up as heating continues"),
 ("Boils into a gas", "Highest energy: particles break free and spread out"),
])

seq("chemistry-ks3-the-periodic-table-adventure-1", [
 ("Döbereiner spots triads", "1829: threes of similar elements"),
 ("Newlands' law of octaves", "1864: patterns every eighth element"),
 ("Mendeleev publishes his table", "1869: leaves gaps for undiscovered elements"),
 ("Gallium is discovered", "1875: fills a gap, just as predicted"),
 ("Table ordered by atomic number", "1913: Moseley uses proton number, not mass"),
])

# ---------------- GERMAN A-LEVEL ----------------

seq("german-a-level-aqa-artistic-culture-in-the-german-speaking-world-adventure-1", [
 ("Karneval", "February: street parades before Lent — die fünfte Jahreszeit"),
 ("Ostern", "March/April: Ostereier and Osterfeuer in spring"),
 ("Oktoberfest beginnt", "Late September: the Munich Wiesn opens"),
 ("Tag der Deutschen Einheit", "3 October: national holiday for reunification"),
 ("Sankt Martin", "11 November: children's lantern processions"),
 ("Weihnachtsmärkte öffnen", "Late November: Advent markets across Germany"),
])

seq("german-a-level-aqa-aspects-of-german-speaking-society-current-trends-adventure-1", [
 ("Grundgesetz verabschiedet", "1949: Article 3 promises equal rights for women and men"),
 ("Gleichberechtigungsgesetz", "1957: equal rights of spouses written into law"),
 ("Eherechtsreform", "1977: divorce law reformed; the guilt principle abolished"),
 ("Eingetragene Lebenspartnerschaft", "2001: civil partnerships for same-sex couples"),
 ("Elterngeld eingeführt", "2007: parental allowance encourages shared childcare"),
 ("Ehe für alle", "2017: same-sex marriage becomes legal"),
])

seq("german-a-level-aqa-aspects-of-political-life-in-the-german-speaking-world-adventure-1", [
 ("Gesetzentwurf eingebracht", "A bill is introduced, often by the Bundesregierung"),
 ("Lesungen im Bundestag", "Three readings: debate, committee work, then the vote"),
 ("Zustimmung des Bundesrats", "The federal states' chamber considers the bill"),
 ("Unterzeichnung", "The Bundespräsident signs the law (Ausfertigung)"),
 ("Verkündung", "Published in the Bundesgesetzblatt; it comes into force"),
])

seq("german-a-level-aqa-individual-research-project-adventure-1", [
 ("Thema wählen", "Pick a topic tied to the German-speaking world"),
 ("Forschungsfrage formulieren", "Narrow it to one clear research question"),
 ("Quellen sammeln", "Gather and evaluate German-language sources"),
 ("Ergebnisse ordnen", "Organise findings and key evidence under headings"),
 ("Präsentation vorbereiten", "Prepare to present your key findings"),
 ("Im Mündlichen diskutieren", "Defend your conclusions in the speaking exam"),
])

seq("german-a-level-aqa-literary-texts-and-films-adventure-1", [
 ("Sturm und Drang", "From the 1770s: emotion and rebellion — the young Goethe"),
 ("Weimarer Klassik", "1786–1805: Goethe and Schiller's harmony and ideals"),
 ("Romantik", "From 1798: night, dreams and die Blaue Blume"),
 ("Realismus", "From 1848: society depicted as it really was"),
 ("Expressionismus", "From about 1905: intense visions of modern life"),
 ("Nachkriegsliteratur", "After 1945: Trümmerliteratur confronts the ruins"),
])

seq("german-a-level-aqa-multiculturalism-in-german-speaking-society-adventure-1", [
 ("Anwerbeabkommen mit Italien", "1955: the first guest-worker recruitment treaty"),
 ("Anwerbeabkommen mit der Türkei", "1961: start of large-scale Turkish migration"),
 ("Anwerbestopp", "1973: oil crisis ends recruitment; families settle"),
 ("Neues Staatsangehörigkeitsrecht", "2000: elements of citizenship by birthplace"),
 ("Zuwanderungsgesetz", "2005: Germany's first comprehensive immigration law"),
 ("»Wir schaffen das«", "2015: Merkel's words as many refugees arrive"),
])

seq("german-a-level-cultural-heritage-adventure-1", [
 ("Aufklärung", "From about 1720: reason and tolerance — Lessing"),
 ("Sturm und Drang", "From about 1765: feeling over reason — Werther (1774)"),
 ("Weimarer Klassik", "1786–1805: Goethe and Schiller in Weimar"),
 ("Romantik", "From about 1798: folklore, longing, the Grimms"),
 ("Realismus", "From 1848: Fontane's precise social portraits"),
 ("Expressionismus", "From about 1905: Brücke, Trakl and the modern crisis"),
])

seq("german-a-level-digital-society--media-adventure-1", [
 ("Erste Radiosendung", "1923: broadcasting begins in Berlin"),
 ("Erste Tagesschau", "1952: television news starts in Germany"),
 ("Privatfernsehen erlaubt", "1984: RTL and Sat.1 break the public monopoly"),
 ("Das World Wide Web", "1991: the internet opens to the public"),
 ("Soziale Netzwerke", "2004: Facebook founded; studiVZ follows in 2005"),
 ("Smartphone-Ära", "2007: the iPhone puts the internet in every pocket"),
])

seq("german-a-level-edexcel-independent-research-project-adventure-1", [
 ("Interessengebiet festlegen", "Choose an area linked to German-speaking society"),
 ("Fragestellung entwickeln", "Define the precise question to investigate"),
 ("Recherche durchführen", "Research using authentic German sources"),
 ("Material auswerten", "Select and analyse the strongest evidence"),
 ("Vortrag üben", "Rehearse presenting your findings in German"),
 ("Prüfungsgespräch führen", "Discuss and justify conclusions with the examiner"),
])

seq("german-a-level-edexcel-literature-and-film-study-adventure-1", [
 ("Sturm und Drang", "1765–1785: rebellion of the young Goethe and Schiller"),
 ("Weimarer Klassik", "1786–1805: begins with Goethe's Italian journey"),
 ("Romantik", "From 1798: Novalis, the Grimms and die Blaue Blume"),
 ("Realismus", "From 1848: everyday society on the page"),
 ("Expressionismus", "About 1905–1925: angst and the modern city"),
])

seq("german-a-level-edexcel-theme-1-evolution-of-german-society-adventure-1", [
 ("Gründung der Bundesrepublik", "1949: the Grundgesetz creates West Germany"),
 ("Wirtschaftswunder", "Early 1950s: rapid rebuilding and full employment"),
 ("Anwerbeabkommen", "From 1955: guest workers invited to fill jobs"),
 ("Studentenbewegung", "1968: a generation challenges authority"),
 ("Wiedervereinigung", "1990: East and West become one country"),
 ("Flüchtlingssommer", "2015: society debates a new wave of migration"),
])

seq("german-a-level-edexcel-theme-2-political-and-artistic-culture-in-the-german-speaking-world-adventure-1", [
 ("Neujahr", "1 January: fireworks have welcomed the new year"),
 ("Karneval / Fasching", "February: Rosenmontag parades in Cologne and Mainz"),
 ("Ostern", "March or April: eggs, bonfires and spring customs"),
 ("Tag der Deutschen Einheit", "3 October: Germany's national day"),
 ("Nikolaustag", "6 December: boots filled with sweets overnight"),
 ("Heiligabend", "24 December: presents under the Weihnachtsbaum"),
])

seq("german-a-level-edexcel-theme-3-immigration-and-the-german-multicultural-society-adventure-1", [
 ("Erstes Anwerbeabkommen", "1955: Italy agrees to send Gastarbeiter"),
 ("Abkommen mit der Türkei", "1961: recruitment widens as the Wall cuts off the East"),
 ("Anwerbestopp", "1973: the Ölkrise halts guest-worker recruitment"),
 ("Neues Staatsangehörigkeitsrecht", "2000: migrants' children can be German at birth"),
 ("Zuwanderungsgesetz", "2005: integration courses become official policy"),
 ("Flüchtlingskrise", "2015: 'Wir schaffen das' — huge numbers seek asylum"),
])

seq("german-a-level-edexcel-theme-4-germany-1933-1990-division-and-reunification-adventure-1", [
 ("Machtergreifung", "30 January 1933: Hitler becomes Reichskanzler"),
 ("Beginn des Zweiten Weltkriegs", "1 September 1939: Germany invades Poland"),
 ("Kapitulation", "8 May 1945: the war in Europe ends"),
 ("Zwei deutsche Staaten", "1949: BRD founded in May, DDR in October"),
 ("Mauerbau", "13 August 1961: Berlin is divided overnight"),
 ("Wiedervereinigung", "3 October 1990: Germany is one state again"),
])

seq("german-a-level-environmental-issues-adventure-1", [
 ("Erneuerbare-Energien-Gesetz", "2000: the EEG guarantees feed-in tariffs"),
 ("Katastrophe von Fukushima", "March 2011: triggers the accelerated Atomausstieg"),
 ("Klimaschutzgesetz", "2019: legally binding emissions targets"),
 ("Letzte Atomkraftwerke vom Netz", "15 April 2023: the final three reactors close"),
 ("Ziel: Klimaneutralität", "2045: Germany aims to be climate-neutral"),
])

seq("german-a-level-immigration--integration-adventure-1", [
 ("Wirtschaftswunder schafft Jobs", "Early 1950s: booming industry needs workers"),
 ("Anwerbeabkommen mit Italien", "1955: the first recruitment agreement is signed"),
 ("Millionster Gastarbeiter", "1964: Armando Rodrigues is greeted with a moped"),
 ("Anwerbestopp", "1973: recruitment ends after the oil crisis"),
 ("Familiennachzug", "From the mid-1970s families join workers and settle"),
 ("Zuwanderungsgesetz", "2005: integration courses become official policy"),
])

seq("german-a-level-politics--democracy-adventure-1", [
 ("Paulskirchenparlament", "1848: first freely elected all-German assembly"),
 ("Reichsgründung", "1871: a unified empire — but the Kaiser holds power"),
 ("Weimarer Verfassung", "1919: first German democracy; women gain the vote"),
 ("Zerstörung der Demokratie", "1933: the Ermächtigungsgesetz ends Weimar"),
 ("Grundgesetz", "1949: stable democracy with Ewigkeitsklausel safeguards"),
 ("Gesamtdeutsche Demokratie", "1990: free elections across united Germany"),
])

seq("german-a-level-reunification--ddr-adventure-1", [
 ("Besatzungszonen", "1945: defeated Germany split among the four Allies"),
 ("Doppelte Staatsgründung", "1949: BRD (May) and DDR (October) are founded"),
 ("Mauerbau", "13. August 1961: the DDR walls in West Berlin"),
 ("Friedliche Revolution", "Autumn 1989: Montagsdemos — 'Wir sind das Volk'"),
 ("Mauerfall", "9. November 1989: the border opens"),
 ("Tag der Deutschen Einheit", "3. Oktober 1990: the DDR joins the Bundesrepublik"),
])

# ---------------- GERMAN GCSE ----------------

seq("german-gcse-aqa-theme-1-people-and-lifestyle-identity-and-relationships;-healthy-living-and-lifestyle;-education-and-work-adventure-1", [
 ("Der Kindergarten", "Ages 3–6: play-based early education"),
 ("Die Grundschule", "Ages 6–10: primary school, Klassen 1–4"),
 ("Die weiterführende Schule", "From age 10: Gymnasium, Realschule or Gesamtschule"),
 ("Das Abitur", "Around age 18: the school-leaving exam"),
 ("Ausbildung oder Studium", "After school: apprenticeship or university"),
])

seq("german-gcse-aqa-theme-2-popular-culture-free-time-activities;-customs-festivals-and-celebrations;-celebrity-culture-adventure-1", [
 ("Neujahr", "1. Januar: the year begins"),
 ("Karneval", "Februar: costumes and parades before Lent"),
 ("Ostern", "März/April: hunting for Ostereier"),
 ("Oktoberfest", "Ende September: the famous Munich festival opens"),
 ("Nikolaustag", "6. Dezember: shoes by the door for Sankt Nikolaus"),
 ("Silvester", "31. Dezember: fireworks at midnight end the year"),
])

seq("german-gcse-aqa-theme-3-communication-and-the-world-around-us-travel-and-tourism;-media-and-technology;-the-environment-and-where-people-live-adventure-1", [
 ("Liechtenstein", "About 40,000 people — a tiny Alpine principality"),
 ("Luxemburg", "About 660,000 people; German is an official language"),
 ("Die Schweiz", "About 8.8 million people"),
 ("Österreich", "About 9.1 million people"),
 ("Deutschland", "About 84 million people — the EU's largest population"),
])

seq("german-gcse-cambridge-igcse-area-a-everyday-activities-adventure-1", [
 ("Ich wache auf", "6:45 Uhr: the alarm rings"),
 ("Ich frühstücke", "7:15 Uhr: Brötchen and Kakao"),
 ("Ich gehe zur Schule", "7:45 Uhr: off to school"),
 ("Ich esse zu Mittag", "13:00 Uhr: lunch after morning lessons"),
 ("Ich mache Hausaufgaben", "16:00 Uhr: homework time"),
 ("Ich gehe ins Bett", "21:30 Uhr: bedtime"),
])

seq("german-gcse-cambridge-igcse-area-b-personal-and-social-life-adventure-1", [
 ("Die Einschulung", "Age 6: first day, with a giant Schultüte of sweets"),
 ("Die Grundschulzeit", "Ages 6–10: Klassen 1 bis 4"),
 ("Der Wechsel", "Age 10: move up to a secondary school"),
 ("Die Mittlere Reife", "Age 16: exams at the end of Klasse 10"),
 ("Die Oberstufe", "Ages 16–18: sixth-form years at the Gymnasium"),
 ("Das Abitur", "Age 18/19: final exams open the door to university"),
])

seq("german-gcse-cambridge-igcse-area-c-the-world-around-us-adventure-1", [
 ("Frankfurt am Main", "About 770,000 people — Germany's banking capital"),
 ("Köln", "About 1.1 million people, famous for its Dom"),
 ("München", "About 1.5 million people, capital of Bayern"),
 ("Hamburg", "About 1.9 million people, Germany's biggest port"),
 ("Berlin", "About 3.7 million people — capital and largest city"),
])

seq("german-gcse-cambridge-igcse-area-d-the-world-of-work-adventure-1", [
 ("Die Stellenanzeige lesen", "Spot a suitable job advert"),
 ("Den Lebenslauf schreiben", "Prepare an up-to-date CV"),
 ("Die Bewerbung abschicken", "Send the application letter and documents"),
 ("Zum Vorstellungsgespräch gehen", "Attend the interview"),
 ("Den Arbeitsvertrag unterschreiben", "Sign the employment contract"),
 ("Der erste Arbeitstag", "Start the new job"),
])

seq("german-gcse-cambridge-igcse-area-e-the-international-world-adventure-1", [
 ("Liechtenstein", "160 km² — one of Europe's smallest states"),
 ("Luxemburg", "About 2,590 km²"),
 ("Die Schweiz", "About 41,000 km² of mountains and lakes"),
 ("Österreich", "About 84,000 km²"),
 ("Deutschland", "About 357,000 km² — largest German-speaking country"),
])

seq("german-gcse-edexcel-igcse-topic-1-home-and-abroad-adventure-1", [
 ("Das Reiseziel wählen", "Decide where to go on holiday"),
 ("Die Reise buchen", "Book the flights and the hotel online"),
 ("Den Koffer packen", "Pack clothes and the passport"),
 ("Zum Flughafen fahren", "Travel to the airport on departure day"),
 ("Einchecken und abfliegen", "Check in, board and take off"),
 ("Im Hotel ankommen", "Arrive and unpack at the destination"),
])

seq("german-gcse-edexcel-igcse-topic-2-education-and-employment-adventure-1", [
 ("Der Kindergarten", "Ages 3–6, before school begins"),
 ("Die Grundschule", "Starts at age 6 and lasts four years"),
 ("Gymnasium oder Realschule", "From age 10: the secondary school paths split"),
 ("Das Abitur", "About age 18: the Gymnasium leaving exam"),
 ("Ausbildung oder Studium", "After school: das duale System or university"),
])

seq("german-gcse-edexcel-igcse-topic-3-personal-life-and-relationships-adventure-1", [
 ("Das Baby", "0–1 Jahr: the youngest stage of life"),
 ("Das Kind", "Childhood: the Grundschule years"),
 ("Der Teenager", "13–17 Jahre: die Jugend"),
 ("Der Erwachsene", "From 18: adulthood, work and family"),
 ("Der Rentner / die Rentnerin", "From about 67: retirement in Germany"),
])

seq("german-gcse-edexcel-igcse-topic-4-the-world-around-us-adventure-1", [
 ("Liechtenstein", "Smallest: about 160 km²"),
 ("Luxemburg", "About 2,590 km² — still tiny"),
 ("Die Schweiz", "About 41,000 km²"),
 ("Österreich", "About 84,000 km² of Alps and valleys"),
 ("Deutschland", "About 357,000 km² — the biggest of the five"),
])

seq("german-gcse-edexcel-igcse-topic-5-social-activities-fitness-and-health-adventure-1", [
 ("Ich fühle mich krank", "Symptoms begin: Kopfschmerzen und Fieber"),
 ("Ich rufe die Arztpraxis an", "Phone for an appointment — einen Termin"),
 ("Ich beschreibe meine Symptome", "Tell the doctor: 'Mein Hals tut weh'"),
 ("Die Ärztin untersucht mich", "The examination follows"),
 ("Ich bekomme ein Rezept", "A prescription for medicine"),
 ("Ich gehe zur Apotheke", "Collect the medicine from the pharmacy"),
])

seq("german-gcse-edexcel-theme-1-my-personal-world-adventure-1", [
 ("Das Baby", "Life begins: ein neugeborenes Baby"),
 ("Das Kleinkind", "1–3 Jahre: the toddler years"),
 ("Das Schulkind", "From 6: school days start"),
 ("Der Jugendliche", "13–17: die Teenagerjahre"),
 ("Der Erwachsene", "From 18: full legal adulthood"),
 ("Der Senior / die Seniorin", "65+: die Großeltern-Generation"),
])

seq("german-gcse-edexcel-theme-2-lifestyle-and-wellbeing-adventure-1", [
 ("Ich wache um 6:30 Uhr auf", "The alarm clock rings"),
 ("Ich dusche um 6:40 Uhr", "A quick shower wakes me up"),
 ("Ich frühstücke um 7:00 Uhr", "Müsli — ein gesundes Frühstück"),
 ("Ich putze mir um 7:20 Uhr die Zähne", "Brushing teeth after breakfast"),
 ("Ich verlasse um 7:30 Uhr das Haus", "Off to school by bike"),
])

seq("german-gcse-edexcel-theme-3-my-neighbourhood-adventure-1", [
 ("Frankfurt am Main", "Rund 770.000 Einwohner — city of banks"),
 ("Köln", "Rund 1,1 Millionen Einwohner — the cathedral city"),
 ("München", "Rund 1,5 Millionen Einwohner — Bavaria's capital"),
 ("Hamburg", "Rund 1,9 Millionen Einwohner — the port city"),
 ("Berlin", "Rund 3,7 Millionen Einwohner — die Hauptstadt"),
])

seq("german-gcse-edexcel-theme-4-media-and-technology-adventure-1", [
 ("Das Radio", "1923: the first German broadcast"),
 ("Der Fernseher", "1952: die Tagesschau begins"),
 ("Der Heimcomputer", "1980s: computers reach German homes"),
 ("Das Internet", "1991: the World Wide Web goes public"),
 ("Die sozialen Netzwerke", "2004: Facebook launches; studiVZ follows"),
 ("Das Smartphone", "2007: the iPhone changes media habits"),
])

seq("german-gcse-edexcel-theme-5-studying-and-my-future-adventure-1", [
 ("Ein Praktikum machen", "Work experience while still at school"),
 ("Den Schulabschluss schaffen", "Finish school with good grades"),
 ("Eine Stellenanzeige finden", "Search for a suitable job advert"),
 ("Die Bewerbung schreiben", "Send CV and Bewerbungsbrief"),
 ("Das Vorstellungsgespräch", "Convince the employer at interview"),
 ("Die erste Stelle antreten", "Start the first job"),
])

seq("german-gcse-edexcel-theme-6-travel-and-tourism-adventure-1", [
 ("Den Urlaub buchen", "Choose and book the trip months ahead"),
 ("Die Koffer packen", "Pack the night before leaving"),
 ("Die Anreise", "Travel by plane, train or car to the resort"),
 ("Im Hotel einchecken", "Check in and collect the room key"),
 ("Sehenswürdigkeiten besichtigen", "Days of sightseeing and relaxing"),
 ("Die Heimreise", "Check out and travel home"),
])

seq("german-gcse-environment--global-issues-adventure-1", [
 ("Sonnenstrahlen erreichen die Erde", "Short-wave solar energy passes through the air"),
 ("Die Erde erwärmt sich", "The surface absorbs energy and radiates heat"),
 ("Treibhausgase fangen Wärme ein", "CO2 and methane absorb the outgoing heat"),
 ("Die Temperatur steigt", "The enhanced greenhouse effect warms the climate"),
 ("Die Folgen treffen den Planeten", "Gletscher schmelzen, der Meeresspiegel steigt"),
])

seq("german-gcse-future-plans--work-adventure-1", [
 ("Die Stellenanzeige entdecken", "Find an interesting job advert"),
 ("Den Lebenslauf aktualisieren", "Update the CV with skills and experience"),
 ("Das Bewerbungsschreiben senden", "Send the formal letter of application"),
 ("Das Vorstellungsgespräch haben", "Answer questions at the interview"),
 ("Den Vertrag unterschreiben", "Accept the job and sign the contract"),
])

seq("german-gcse-holidays-in-germany-adventure-1", [
 ("Das Reiseziel aussuchen", "Ans Meer, in die Berge oder aufs Land?"),
 ("Die Unterkunft buchen", "Reserve the hotel or the campsite"),
 ("Die Taschen packen", "Get everything ready to travel"),
 ("Die Hinreise", "Mit dem Zug oder dem Auto losfahren"),
 ("Den Urlaub genießen", "Wandern, schwimmen und faulenzen"),
 ("Die Rückreise nach Hause", "The holiday ends; time to head back"),
])

seq("german-gcse-identity--relationships-adventure-1", [
 ("Die Urgroßmutter", "Three generations above me — great-grandmother"),
 ("Der Großvater", "Two generations above me — grandfather"),
 ("Die Mutter", "One generation above me — my parent"),
 ("Der Bruder", "My own generation — sibling"),
 ("Die Nichte", "One generation below me — my sibling's child"),
])

seq("german-gcse-local-area--town-adventure-1", [
 ("Das Dorf", "A village: usually under 5,000 inhabitants"),
 ("Die Kleinstadt", "5,000–20,000 inhabitants"),
 ("Die Mittelstadt", "20,000–100,000 inhabitants"),
 ("Die Großstadt", "Over 100,000 inhabitants"),
 ("Die Millionenstadt", "Over a million — Berlin, Hamburg, München, Köln"),
])

seq("german-gcse-ocr-theme-1-people-and-lifestyle-adventure-1", [
 ("Die Geburt", "Life begins"),
 ("Die Kindheit", "Growing up, playing, starting school"),
 ("Die Jugend", "Teenage years: Schule, Freunde, erste Freiheit"),
 ("Das Erwachsenenleben", "Work, relationships, maybe a family"),
 ("Der Ruhestand", "Retirement, around age 67 in Germany"),
])

seq("german-gcse-ocr-theme-2-popular-culture-adventure-1", [
 ("Heilige Drei Könige", "6. Januar: Sternsinger go from door to door"),
 ("Karneval", "Februar: die närrische Zeit peaks on Rosenmontag"),
 ("Ostern", "Frühling: eggs, chocolate and family meals"),
 ("Erntedankfest", "Anfang Oktober: harvest thanksgiving"),
 ("Sankt Martin", "11. November: Laternenumzüge"),
 ("Heiligabend", "24. Dezember: Bescherung unterm Baum"),
])

seq("german-gcse-ocr-theme-3-communication-and-the-world-around-us-adventure-1", [
 ("Die erste Radiosendung", "1923: radio arrives in Germany"),
 ("Das Fernsehen startet", "1952: die Tagesschau goes on air"),
 ("Das Privatfernsehen", "1984: commercial channels RTL and Sat.1 launch"),
 ("Das World Wide Web", "1991: Germans start going online"),
 ("Facebook und studiVZ", "2004/05: social networks take off"),
 ("Das iPhone erscheint", "2007: the smartphone era begins"),
])

seq("german-gcse-school--studies-adventure-1", [
 ("Die erste Klasse", "Age 6: school starts with the Schultüte"),
 ("Die vierte Klasse", "Age 10: the last year of Grundschule"),
 ("Die fünfte Klasse", "First year at the weiterführende Schule"),
 ("Die zehnte Klasse", "Age 16: Mittlerer Schulabschluss exams"),
 ("Die Oberstufe", "Klassen 11–13: preparing for das Abitur"),
 ("Das Abitur", "Age 18/19: the final school exams"),
])

seq("german-gcse-vocabulary-games-adventure-1", [
 ("drei", "Die Zahl 3"),
 ("sieben", "Die Zahl 7"),
 ("zwölf", "Die Zahl 12"),
 ("zwanzig", "Die Zahl 20"),
 ("fünfzig", "Die Zahl 50"),
 ("hundert", "Die Zahl 100"),
])

# ---------------- GERMAN IBDP ----------------

seq("german-ibdp-advanced-grammar-adventure-1", [
 ("Wir", "Position 1: das Subjekt opens the sentence"),
 ("sind", "Position 2: the finite verb is always second"),
 ("gestern", "Zeit: time expressions come first in the Mittelfeld"),
 ("mit dem Zug", "Art und Weise: manner follows time"),
 ("nach Berlin", "Ort: place comes last — Time, Manner, Place"),
 ("gefahren", "Satzende: the participle closes the verbal bracket"),
])

seq("german-ibdp-cultural-comparison-adventure-1", [
 ("Liechtenstein", "Rund 40.000 Einwohner"),
 ("Luxemburg", "Rund 660.000 Einwohner — Deutsch ist Amtssprache"),
 ("Die Schweiz", "Rund 8,8 Millionen Einwohner"),
 ("Österreich", "Rund 9,1 Millionen Einwohner"),
 ("Deutschland", "Rund 84 Millionen Einwohner"),
])

seq("german-ibdp-experiences-adventure-1", [
 ("Das Fernweh packt mich", "The longing to travel sparks the plan"),
 ("Das Reiseziel recherchieren", "Compare destinations and read reviews"),
 ("Flug und Unterkunft buchen", "Book the transport and accommodation"),
 ("Die Anreise", "The journey to the destination"),
 ("Sehenswürdigkeiten erleben", "Explore the sights and the culture"),
 ("Die Rückkehr mit Erinnerungen", "Return home full of memories"),
])

seq("german-ibdp-hl-literature-two-works-studied-adventure-1", [
 ("Die Exposition", "Act 1: setting, characters and conflict introduced"),
 ("Die steigende Handlung", "Act 2: tension builds — das erregende Moment"),
 ("Der Höhepunkt", "Act 3: climax and turning point (Peripetie)"),
 ("Die fallende Handlung", "Act 4: consequences — das retardierende Moment"),
 ("Die Katastrophe", "Act 5: the resolution — in tragedy, the downfall"),
])

seq("german-ibdp-human-ingenuity-adventure-1", [
 ("Die Romantik", "Um 1800: Caspar David Friedrich's moonlit landscapes"),
 ("Der Realismus", "Ab etwa 1850: everyday life painted truthfully"),
 ("Der Expressionismus", "Ab 1905: Die Brücke's raw colour in Dresden"),
 ("Der Dadaismus", "Ab 1916: anti-art protest during the war"),
 ("Das Bauhaus", "1919–1933: form follows function, Weimar and Dessau"),
])

seq("german-ibdp-identities-adventure-1", [
 ("Die Geburt", "Der Anfang des Lebens"),
 ("Die Kindheit", "Spielen, lernen, die ersten Schuljahre"),
 ("Die Jugend", "Identität suchen: Werte und Zugehörigkeit"),
 ("Das Erwachsenenalter", "Beruf, Beziehungen, Verantwortung"),
 ("Das hohe Alter", "Rückblick auf das gelebte Leben"),
])

seq("german-ibdp-literary-texts-hl-adventure-1", [
 ("Geburt in Augsburg", "1898: Bertolt Brecht wird geboren"),
 ("Die Dreigroschenoper", "1928: triumphant Berlin premiere"),
 ("Flucht ins Exil", "1933: Brecht leaves Germany as Hitler takes power"),
 ("Mutter Courage entsteht", "1939: written in Scandinavian exile"),
 ("Das Berliner Ensemble", "1949: Brecht founds his theatre in East Berlin"),
 ("Tod in Berlin", "1956: Brecht dies; his theatre lives on"),
])

seq("german-ibdp-sharing-the-planet-adventure-1", [
 ("Das EEG tritt in Kraft", "2000: Einspeisevergütung fördert Wind und Solar"),
 ("Fukushima verändert alles", "2011: Deutschland beschließt den Atomausstieg"),
 ("Das Klimaschutzgesetz", "2019: verbindliche CO2-Ziele werden Gesetz"),
 ("Atomausstieg vollendet", "April 2023: die letzten Reaktoren gehen vom Netz"),
 ("Klimaneutralität als Ziel", "2045: Deutschland will klimaneutral sein"),
])

seq("german-ibdp-social-organization-adventure-1", [
 ("Die Grundschule", "Mit 6 Jahren beginnt die Schulzeit"),
 ("Die weiterführende Schule", "Mit 10: Gymnasium, Realschule oder Gesamtschule"),
 ("Das Abitur", "Mit etwa 18: die Hochschulreife"),
 ("Ausbildung oder Studium", "Duales System im Betrieb oder die Universität"),
 ("Der Berufseinstieg", "Die erste feste Stelle"),
 ("Die Rente", "Mit 67: der Ruhestand beginnt"),
])

# ---------------- GERMAN KS3 ----------------

# german-ks3-classroom-objects-adventure-1: SKIPPED (unordered vocabulary set;
# no objective chronological, numerical or procedural ordering exists)

seq("german-ks3-colours--clothing-adventure-1", [
 ("Violett", "Kürzeste Wellenlänge: etwa 400 Nanometer"),
 ("Blau", "Etwa 470 Nanometer"),
 ("Grün", "Etwa 530 Nanometer"),
 ("Gelb", "Etwa 580 Nanometer"),
 ("Orange", "Etwa 610 Nanometer"),
 ("Rot", "Längste Wellenlänge: etwa 700 Nanometer"),
])

seq("german-ks3-family-members-adventure-1", [
 ("Die Urgroßmutter", "Great-grandmother: 3 Generationen über mir"),
 ("Die Großmutter", "Grandmother: 2 Generationen über mir"),
 ("Der Vater", "Father: 1 Generation über mir"),
 ("Die Schwester", "Sister: meine Generation"),
 ("Die Nichte", "Niece: 1 Generation unter mir"),
])

seq("german-ks3-greetings--introductions-adventure-1", [
 ("Hallo!", "Begrüßung: every chat starts here"),
 ("Wie heißt du?", "The first question asks the name"),
 ("Ich heiße Anna.", "The answer to the name question"),
 ("Und wie alt bist du, Anna?", "The follow-up uses her name — so it comes after"),
 ("Ich bin zwölf Jahre alt.", "The answer to the age question"),
 ("Tschüss!", "Verabschiedung: the goodbye ends the conversation"),
])

seq("german-ks3-hobbies--free-time-adventure-1", [
 ("Tennis (Einzel)", "1 Spieler pro Seite"),
 ("Basketball", "5 Spieler pro Team auf dem Feld"),
 ("Volleyball", "6 Spieler pro Team"),
 ("Handball", "7 Spieler pro Team"),
 ("Fußball", "11 Spieler pro Team"),
])

seq("german-ks3-numbers--dates-adventure-1", [
 ("eins", "Die Zahl 1"),
 ("fünf", "Die Zahl 5"),
 ("zehn", "Die Zahl 10"),
 ("fünfzehn", "Die Zahl 15"),
 ("zwanzig", "Die Zahl 20"),
 ("hundert", "Die Zahl 100"),
])

# ---------------- VALIDATE & APPLY ----------------

SPECS = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "adventures", "_specs")
errors = applied = 0
for stem, items in S.items():
    path = os.path.join(SPECS, stem + ".json")
    if not os.path.exists(path):
        print("MISSING SPEC:", stem); errors += 1; continue
    if not (5 <= len(items) <= 6):
        print("BAD LENGTH:", stem, len(items)); errors += 1; continue
    terms = [i["term"] for i in items]
    if len(set(terms)) != len(terms):
        print("DUP TERMS:", stem); errors += 1; continue
    ok = True
    for i in items:
        if len(i["term"]) > 55:
            print("TERM TOO LONG:", stem, "|", i["term"], len(i["term"])); ok = False
        if len(i["def"]) > 85:
            print("DEF TOO LONG:", stem, "|", i["def"], len(i["def"])); ok = False
        if not i["term"] or not i["def"]:
            print("EMPTY FIELD:", stem); ok = False
    if not ok:
        errors += 1; continue
    with open(path, encoding="utf-8") as f:
        d = json.load(f)
    if "sequence" in d:
        print("ALREADY HAS SEQUENCE (skipping):", stem); continue
    d["sequence"] = items
    with open(path, "w", encoding="utf-8") as f:
        json.dump(d, f, ensure_ascii=False, separators=(',', ': '))
    applied += 1

print("applied:", applied, "errors:", errors, "authored entries:", len(S))
