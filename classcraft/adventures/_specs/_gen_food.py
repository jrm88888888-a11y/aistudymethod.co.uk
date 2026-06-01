#!/usr/bin/env python3
"""Generate 18 A-Level Food Technology JSON specs."""
import json, os

OUT_DIR = "/sessions/awesome-busy-dirac/mnt/AI Study Method/classcraft/adventures/_specs"
THEME = "creative-vibrant"
LEVEL = "a-level"
SUB = "food-technology"

def opt(t, c): return [t, 1 if c else 0]

def make(topic_slug, topic_display, n, title, emoji, welcome_lead, meta_desc, final_note,
         concepts, walkthroughs, mcqs, numericals, free_texts):
    assert len(concepts) == 6
    assert len(walkthroughs) == 3
    assert len(mcqs) == 2
    assert len(numericals) == 1
    assert len(free_texts) == 1
    for m in mcqs:
        assert sum(1 for o in m["options"] if o[1] == 1) == 1
    for num in numericals:
        assert num["answer"] in num["options"]
    obj = {
        "subject": SUB, "level": LEVEL, "topic_display": topic_display,
        "topic_slug": topic_slug, "theme": THEME, "adventure_n": n,
        "title": title, "emoji": emoji, "welcome_lead": welcome_lead,
        "meta_desc": meta_desc, "final_note": final_note,
        "concepts": [{"term": t, "def": d} for t, d in concepts],
        "walkthroughs": [{"tag": tag, "h2": h2, "body_html": body} for tag, h2, body in walkthroughs],
        "mcqs": mcqs, "numericals": numericals, "free_texts": free_texts,
    }
    path = os.path.join(OUT_DIR, f"{SUB}-{LEVEL}-{topic_slug}-adventure-{n}.json")
    with open(path, "w") as f: json.dump(obj, f, indent=2)

count = 0

# advanced-nutrition-science
TS, TD = "advanced-nutrition-science", "Advanced Nutrition Science"
make(TS, TD, 1,
     "DRVs, RNI and RDA",
     "📊",
     "How much do we need? UK and EU recommendations explained.",
     "A-Level Food Tech: Dietary Reference Values, RNI and RDA.",
     "Numbers behind the labels.",
     [
         ("DRV", "Dietary Reference Value — UK family of nutrient intake estimates (COMA 1991)."),
         ("RNI", "Reference Nutrient Intake — meets needs of 97.5% of UK population."),
         ("EAR", "Estimated Average Requirement — meets 50% of population needs."),
         ("LRNI", "Lower Reference Nutrient Intake — meets only 2.5% of population."),
         ("RDA", "Recommended Daily Allowance — EU labelling reference; replaced by NRV."),
         ("SACN", "Scientific Advisory Committee on Nutrition (UK), since 2000."),
     ],
     [
         ("System", "UK DRVs",
          "<p>The UK <strong>DRV</strong> system (COMA report, <strong>1991</strong>) defines: <strong>EAR</strong> (50% of population needs), <strong>RNI</strong> (97.5%), and <strong>LRNI</strong> (2.5% — risk-of-deficiency floor). SACN (since 2000) updates them.</p>"),
         ("Label", "RDA and NRV",
          "<p>EU food labelling historically used <strong>RDA</strong>. Since 2014, EU Regulation 1169/2011 uses <strong>Nutrient Reference Value (NRV)</strong> — a single reference for adult labelling.</p>"),
         ("Use", "Comparing Diets",
          "<p>To assess a diet: compare each nutrient intake against <strong>RNI</strong>. Persistent intakes below <strong>LRNI</strong> indicate deficiency risk. RNI suits planning; LRNI suits surveillance.</p>"),
     ],
     [
         {"q": "RNI meets the needs of what % of UK population?", "options": [opt("50%", False), opt("97.5%", True), opt("100%", False), opt("2.5%", False)]},
         {"q": "EU labelling replaced RDA with:", "options": [opt("LRNI", False), opt("NRV", True), opt("EAR", False), opt("DRI", False)]},
     ],
     [{"q": "If RNI of vitamin C is 40 mg/day and an adult takes 25 mg/day, the shortfall (in mg) is:", "options": [15, 10, 20, 25], "answer": 15}],
     [{"q": "What does the acronym RNI stand for? (four words, lowercase)", "answer": "reference nutrient intake"}],
     )
count += 1

make(TS, TD, 2,
     "Macronutrients and Micronutrients",
     "🥗",
     "From carbohydrate to selenium — what the body needs in big and small amounts.",
     "A-Level Food Tech: macronutrients and micronutrients defined.",
     "Bulk fuel and precision tools.",
     [
         ("Macronutrient", "Carbohydrate, protein, fat — needed in large amounts."),
         ("Micronutrient", "Vitamin or mineral — needed in small amounts."),
         ("Essential Amino Acid", "Amino acid the body cannot synthesise (9 in adults)."),
         ("Essential Fatty Acid", "Omega-3 and omega-6 — must come from diet."),
         ("Fat-Soluble Vitamins", "A, D, E, K — stored in body fat."),
         ("Water-Soluble Vitamins", "B-complex and C — excreted in urine, daily intake needed."),
     ],
     [
         ("Macros", "Three Groups",
          "<p><strong>Macronutrients</strong>: carbohydrates (~4 kcal/g), protein (4 kcal/g), fat (9 kcal/g). Each plays structural, energy and signalling roles.</p>"),
         ("Micros", "Vitamins and Minerals",
          "<p>13 essential <strong>vitamins</strong>: A, C, D, E, K, and B1, B2, B3, B5, B6, B7, B9, B12. Key minerals include calcium, iron, zinc, iodine, selenium, magnesium, potassium, sodium.</p>"),
         ("Essential", "What 'Essential' Means",
          "<p><strong>Essential</strong> means the body cannot make it — must come from diet. Adults need <strong>9 essential amino acids</strong> (children also histidine in higher amounts), 2 essential fatty acids (α-linolenic, linoleic).</p>"),
     ],
     [
         {"q": "How many essential amino acids do adults need?", "options": [opt("5", False), opt("9", True), opt("20", False), opt("12", False)]},
         {"q": "Fat-soluble vitamins are:", "options": [opt("B and C", False), opt("A, D, E, K", True), opt("All vitamins", False), opt("Only D", False)]},
     ],
     [{"q": "How many essential vitamins are there in total?", "options": [13, 12, 14, 15], "answer": 13}],
     [{"q": "How many essential fatty acids are there for humans? (single digit)", "answer": "2"}],
     )
count += 1

make(TS, TD, 3,
     "Energy Balance",
     "⚖️",
     "Energy in vs energy out — and the science behind weight management.",
     "A-Level Food Tech: energy balance, BMR, TEE.",
     "Energy in equals energy out — over time.",
     [
         ("Energy Balance", "Equality of energy intake and energy expenditure."),
         ("BMR", "Basal Metabolic Rate — energy used at rest to sustain life."),
         ("TEE", "Total Energy Expenditure — BMR + activity + thermic effect."),
         ("PAL", "Physical Activity Level — TEE expressed as a multiple of BMR."),
         ("Thermic Effect of Food", "Energy cost of digesting/absorbing food (~10% of intake)."),
         ("Positive Balance", "Intake > expenditure → weight gain."),
     ],
     [
         ("Theory", "Balance Equation",
          "<p><strong>Energy balance</strong> = energy in − energy out. Sustained <strong>positive</strong> balance stores energy as fat; sustained <strong>negative</strong> balance depletes stores. Over time, balance determines weight.</p>"),
         ("Metric", "BMR and TEE",
          "<p><strong>BMR</strong> covers basic body functions (heart, brain, liver) — about <strong>60-75%</strong> of TEE for sedentary adults. <strong>TEE = BMR × PAL</strong>. Sedentary PAL ~1.4; very active ~2.0+.</p>"),
         ("Calc", "Estimating BMR",
          "<p>Henry equation (UK, 2005): for 18-30 y male, BMR (MJ/d) = 0.063 × weight + 2.896. Mifflin-St Jeor (1990) is widely used: 10W + 6.25H − 5A + 5 (men, kcal/day, W kg, H cm, A years).</p>"),
     ],
     [
         {"q": "BMR is approximately what % of TEE for sedentary adults?", "options": [opt("10-20%", False), opt("60-75%", True), opt("90-95%", False), opt("30-40%", False)]},
         {"q": "PAL stands for:", "options": [opt("Physical Activity Level", True), opt("Protein Adequacy Level", False), opt("Personal Aerobic Limit", False), opt("Pulse Amplitude Level", False)]},
     ],
     [{"q": "If BMR is 1600 kcal and PAL is 1.5, TEE in kcal is:", "options": [2400, 2200, 2600, 2000], "answer": 2400}],
     [{"q": "What 3-letter acronym means 'basal metabolic rate' (lowercase)?", "answer": "bmr"}],
     )
count += 1

# microbiology--spoilage
TS, TD = "microbiology--spoilage", "Microbiology & Spoilage"
make(TS, TD, 1,
     "Pathogens: Salmonella, E. coli, Listeria, Campylobacter",
     "🦠",
     "The big four bacterial food-poisoning organisms.",
     "A-Level Food Tech: Salmonella, E. coli O157, Listeria, Campylobacter.",
     "Know the bug, control the risk.",
     [
         ("Pathogen", "Microorganism causing disease."),
         ("Salmonella", "Gram-negative bacteria; gastroenteritis; eggs, poultry."),
         ("E. coli O157", "Toxin-producing strain; haemolytic-uraemic syndrome possible."),
         ("Listeria monocytogenes", "Grows at fridge temperatures; risk in pregnancy."),
         ("Campylobacter", "Most common UK food-poisoning bacterium; poultry source."),
         ("Infective Dose", "Number of organisms required to cause illness."),
     ],
     [
         ("Bug", "Campylobacter — Most Common",
          "<p><strong>Campylobacter</strong> causes ~280,000 UK food-poisoning cases per year — most from undercooked chicken. Low infective dose (~500 cells). Symptoms 2-5 days after exposure.</p>"),
         ("Bug", "Salmonella and E. coli O157",
          "<p><strong>Salmonella</strong> is reduced via Lion Code pasteurised eggs (UK 1998+). <strong>E. coli O157</strong> produces Shiga toxin; very low infective dose (~10 cells); pink burgers, raw spinach, petting farms are classic vectors.</p>"),
         ("Bug", "Listeria — The Fridge Risk",
          "<p><strong>Listeria monocytogenes</strong> uniquely grows at <strong>fridge temperatures</strong> (down to 0 °C). Particularly dangerous in pregnancy (miscarriage risk). Sources: unpasteurised cheese, pâté, deli meats.</p>"),
     ],
     [
         {"q": "The most common UK food-poisoning bacterium is:", "options": [opt("Salmonella", False), opt("Campylobacter", True), opt("E. coli", False), opt("Listeria", False)]},
         {"q": "Listeria can grow at temperatures as low as:", "options": [opt("0 °C", True), opt("5 °C", False), opt("10 °C", False), opt("15 °C", False)]},
     ],
     [{"q": "If Campylobacter causes around 280,000 UK cases/year, daily cases (average, in thousands) ≈:", "options": [767, 280, 700, 500], "answer": 767}],
     [{"q": "What is the genus name of the bacterium that can grow at fridge temperatures? (one word, lowercase)", "answer": "listeria"}],
     )
count += 1

make(TS, TD, 2,
     "The Danger Zone and HACCP",
     "🌡️",
     "5-63 °C — and the seven HACCP principles.",
     "A-Level Food Tech: temperature danger zone, HACCP principles.",
     "Control the temperature, control the risk.",
     [
         ("Danger Zone", "Temperature range 5-63 °C where bacteria multiply rapidly."),
         ("HACCP", "Hazard Analysis and Critical Control Points — food safety framework."),
         ("CCP", "Critical Control Point — step where hazards can be controlled."),
         ("Critical Limit", "Boundary between safe and unsafe at a CCP (e.g. core temp 75 °C)."),
         ("Codex Alimentarius", "FAO/WHO joint food standards body, established 1963."),
         ("Generation Time", "Time for a bacterial population to double."),
     ],
     [
         ("Zone", "5-63 °C",
          "<p>The <strong>danger zone</strong> is <strong>5-63 °C</strong>. Many pathogens double every 20-30 minutes at body temperature. Cold storage below 5 °C and hot holding above 63 °C suppress growth.</p>"),
         ("System", "HACCP Origin",
          "<p><strong>HACCP</strong> was developed in the <strong>1960s</strong> by Pillsbury, NASA and the US Army for astronaut food. Codified internationally by Codex in 1993, it underpins modern food safety legislation worldwide.</p>"),
         ("Principles", "Seven Steps",
          "<p>The <strong>7 HACCP principles</strong>: identify hazards, identify CCPs, set critical limits, monitor, set corrective actions, verify, document. UK Food Safety regulations require an HACCP-based system.</p>"),
     ],
     [
         {"q": "The food safety 'danger zone' is approximately:", "options": [opt("0-5 °C", False), opt("5-63 °C", True), opt("63-100 °C", False), opt("-18 to 5 °C", False)]},
         {"q": "HACCP has how many core principles?", "options": [opt("5", False), opt("7", True), opt("9", False), opt("12", False)]},
     ],
     [{"q": "If a bacterium doubles every 20 minutes, after 1 hour 1 cell becomes how many cells?", "options": [8, 4, 16, 6], "answer": 8}],
     [{"q": "What does HACCP stand for? (five words, lowercase, ignore 'and')", "answer": "hazard analysis critical control points"}],
     )
count += 1

make(TS, TD, 3,
     "Spoilage: Yeasts, Moulds, Bacteria",
     "🍞",
     "Why bread goes mouldy and milk turns sour.",
     "A-Level Food Tech: spoilage organisms and their conditions.",
     "Spoilage tells you it's gone bad. Pathogens kill silently.",
     [
         ("Spoilage Organism", "Microbe causing rancidity/sourness but rarely illness."),
         ("Yeast", "Single-celled fungus; fermentation (Saccharomyces) and spoilage."),
         ("Mould", "Filamentous fungus; visible 'fur' on bread, fruit."),
         ("aw (Water Activity)", "Free water available; below 0.6, microbial growth ceases."),
         ("pH", "Acidity; most pathogens grow at pH 4.6-7.0."),
         ("Lactic Acid Bacteria", "Sour milk and yoghurt cultures (Lactobacillus)."),
     ],
     [
         ("Growth", "Conditions",
          "<p>Microbial growth requires <strong>F.A.T.T.O.M.</strong>: Food (nutrients), Acidity (pH 4.6-7), Temperature (5-63 °C), Time (≥4 hours), Oxygen (varies), Moisture (aw > 0.85 for most pathogens, > 0.6 for moulds).</p>"),
         ("Yeast", "Fermentation and Spoilage",
          "<p><strong>Yeasts</strong> ferment sugars to alcohol and CO2 — useful for bread and beer; spoilage in fruit juice. <strong>Saccharomyces cerevisiae</strong> is bread/beer yeast.</p>"),
         ("Moulds", "Why They Grow",
          "<p><strong>Moulds</strong> tolerate low water activity — they grow on jam, dry bread, hard cheese. Some produce <strong>mycotoxins</strong> (aflatoxin from Aspergillus). Visible fluffy growth is the spore-bearing hypha.</p>"),
     ],
     [
         {"q": "Microbial growth ceases below aw of approximately:", "options": [opt("0.95", False), opt("0.6", True), opt("0.3", False), opt("0.8", False)]},
         {"q": "Yeasts ferment sugars to:", "options": [opt("Lactic acid only", False), opt("Alcohol and CO2", True), opt("Methane", False), opt("Acetic acid", False)]},
     ],
     [{"q": "How many letters/factors in the FATTOM acronym?", "options": [6, 5, 7, 4], "answer": 6}],
     [{"q": "What species name is bread/beer yeast (Saccharomyces ___)? (one word, lowercase)", "answer": "cerevisiae"}],
     )
count += 1

# food-preservation-methods
TS, TD = "food-preservation-methods", "Food Preservation Methods"
make(TS, TD, 1,
     "Heat Treatment: Pasteurisation and Sterilisation",
     "🔥",
     "Pasteur 1864, and a kettle of milk that started a science.",
     "A-Level Food Tech: pasteurisation, UHT, sterilisation.",
     "Heat kills — choose the right temperature and time.",
     [
         ("Pasteurisation", "Mild heat treatment killing pathogens (Pasteur 1864)."),
         ("HTST", "High Temperature Short Time — 72 °C for 15 seconds (milk)."),
         ("UHT", "Ultra High Temperature — 135-150 °C for 1-4 s."),
         ("Sterilisation", "Heat treatment destroying all viable organisms and spores."),
         ("Commercial Sterility", "Standard for shelf-stable foods (canning)."),
         ("D-value", "Time at given temperature to kill 90% of a microbial population."),
     ],
     [
         ("Process", "HTST and UHT",
          "<p><strong>HTST pasteurisation</strong> heats milk to <strong>72 °C for 15 s</strong>, killing most pathogens while preserving flavour. <strong>UHT</strong> at <strong>135-150 °C for 1-4 s</strong> gives shelf-stable milk lasting months unrefrigerated.</p>"),
         ("History", "Pasteur",
          "<p>Louis Pasteur demonstrated heat-treatment of wine in <strong>1864</strong> and milk shortly after, founding modern food microbiology. The process bearing his name has saved countless lives from milk-borne disease.</p>"),
         ("Theory", "D-Values",
          "<p>The <strong>D-value</strong> is the time at a given temperature to kill 90% of a target microbe (1 log reduction). <strong>12D</strong> reductions (a trillion-fold) are standard for canned food botulinum control.</p>"),
     ],
     [
         {"q": "HTST pasteurisation of milk is approximately:", "options": [opt("63 °C / 30 min", False), opt("72 °C / 15 s", True), opt("90 °C / 5 s", False), opt("121 °C / 15 min", False)]},
         {"q": "Pasteurisation was demonstrated by Pasteur in:", "options": [opt("1854", False), opt("1864", True), opt("1874", False), opt("1884", False)]},
     ],
     [{"q": "If a D-value is 1 minute at 72 °C, how many minutes for a 5-log reduction?", "options": [5, 4, 6, 3], "answer": 5}],
     [{"q": "What does the acronym UHT stand for? (four words, lowercase)", "answer": "ultra high temperature"}],
     )
count += 1

make(TS, TD, 2,
     "Cold, Drying and Canning",
     "🧊",
     "Three time-tested ways to lock food away from spoilage.",
     "A-Level Food Tech: freezing, dehydration, canning.",
     "Take away water, heat or both.",
     [
         ("Freezing", "Below -18 °C — slows microbial activity, doesn't kill spores."),
         ("Quick Freezing", "Fast freezing producing small ice crystals (better texture)."),
         ("Dehydration", "Removing water to lower aw below growth threshold."),
         ("Freeze Drying", "Lyophilisation — sublimation under vacuum (premium coffee, drugs)."),
         ("Canning", "Sealed container heated to commercial sterility (Appert 1809)."),
         ("Botulinum Cook", "Thermal process ensuring 12D reduction of C. botulinum spores."),
     ],
     [
         ("Cold", "Freezing",
          "<p>Domestic freezer at <strong>-18 °C</strong> halts most spoilage and microbial growth but does <strong>not</strong> sterilise. <strong>Quick freezing</strong> (blast, plate, cryogenic) produces small crystals and preserves cell structure better.</p>"),
         ("Dry", "Removing Water",
          "<p>Lowering <strong>aw</strong> below ~0.6 inhibits all microbial growth. Methods: sun drying, drum drying, spray drying (milk powder), <strong>freeze-drying</strong> for premium products and pharmaceuticals.</p>"),
         ("Can", "Appert and Botulinum",
          "<p>Nicolas Appert demonstrated canning in <strong>1809</strong>. Modern low-acid canning targets a <strong>12D</strong> reduction of <em>Clostridium botulinum</em> — the spore-forming anaerobe responsible for botulism.</p>"),
     ],
     [
         {"q": "Domestic freezer temperature is typically:", "options": [opt("0 °C", False), opt("-18 °C", True), opt("-40 °C", False), opt("5 °C", False)]},
         {"q": "Canning was demonstrated by Appert in:", "options": [opt("1709", False), opt("1809", True), opt("1859", False), opt("1909", False)]},
     ],
     [{"q": "If domestic freezer is -18 °C, how many °C below the freezing point of water (0 °C) is it?", "options": [18, 20, 15, 23], "answer": 18}],
     [{"q": "What surname did the French inventor (Nicolas) of canning have?", "answer": "appert"}],
     )
count += 1

make(TS, TD, 3,
     "MAP, Irradiation and Fermentation",
     "🥫",
     "Modified atmosphere, gamma rays, and beneficial microbes.",
     "A-Level Food Tech: MAP, irradiation, and fermentation.",
     "Modern shelf life is a chemistry problem.",
     [
         ("MAP", "Modified Atmosphere Packaging — gas mix tailored to product."),
         ("Vacuum Packing", "Air evacuated; oxygen-dependent spoilage suppressed."),
         ("Irradiation", "Ionising radiation (γ, e-beam, X-ray) killing microbes."),
         ("Fermentation", "Microbial conversion of sugars (lactic, acetic, alcoholic)."),
         ("Probiotic", "Live microorganism conferring health benefit (e.g. yoghurt cultures)."),
         ("Curing", "Preservation by salt, nitrites and/or smoke."),
     ],
     [
         ("Atmosphere", "MAP Gas Mixes",
          "<p><strong>MAP</strong> tailors gas: red meat (high O2 to keep red colour); fish/poultry (high CO2 to inhibit bacteria); salads (low O2, high N2 to slow respiration). Doubles or triples shelf life of perishables.</p>"),
         ("Rays", "Irradiation",
          "<p><strong>Irradiation</strong> uses gamma rays (cobalt-60), e-beam or X-ray. Approved for spices, herbs, frozen seafood in the UK (Food Irradiation Regulations <strong>2009</strong>). Mandatory labelling with the 'radura' symbol.</p>"),
         ("Ferment", "Useful Microbes",
          "<p><strong>Lactic acid bacteria</strong> ferment yoghurt, sauerkraut, kimchi, sourdough; <strong>Saccharomyces</strong> makes wine, beer, bread; <em>Acetobacter</em> produces vinegar. Fermentation preserves while adding flavour, texture and probiotic value.</p>"),
     ],
     [
         {"q": "Red meat MAP commonly uses high:", "options": [opt("CO2", False), opt("O2", True), opt("N2 only", False), opt("Hydrogen", False)]},
         {"q": "The food irradiation logo is called the:", "options": [opt("Radura", True), opt("Kelvin", False), opt("Becquerel", False), opt("Curie", False)]},
     ],
     [{"q": "Approximately how many gases are typically used in MAP mixes (O2, CO2, N2)?", "options": [3, 2, 4, 5], "answer": 3}],
     [{"q": "What does the acronym MAP stand for? (three words, lowercase)", "answer": "modified atmosphere packaging"}],
     )
count += 1

# food-industry--manufacturing
TS, TD = "food-industry--manufacturing", "Food Industry & Manufacturing"
make(TS, TD, 1,
     "Scales of Food Production",
     "🏭",
     "From craft bakery to continuous breakfast cereal line.",
     "A-Level Food Tech: bespoke, batch, mass and continuous production.",
     "Volume reshapes process.",
     [
         ("One-Off", "Single bespoke item — wedding cake."),
         ("Batch Production", "Defined quantity of identical units in a single run."),
         ("Mass Production", "Continuous flow line producing standard product."),
         ("Continuous Production", "Plant running 24/7 (refining, milk processing)."),
         ("Setup Time", "Time required to change a line for a new product."),
         ("Throughput", "Units produced per unit time."),
     ],
     [
         ("Scale", "Examples",
          "<p>One-off (wedding cake), <strong>batch</strong> (microbrewery, 1,000 loaves), <strong>mass</strong> (Mr Kipling cake plant), <strong>continuous</strong> (milk pasteurisation, breakfast cereal extruder running 24/7).</p>"),
         ("Economics", "Setup vs Throughput",
          "<p>Larger scales reduce per-unit cost via <strong>economies of scale</strong> but require expensive plant and reliable supply. Continuous production rewards predictable demand; batch suits variety.</p>"),
         ("UK", "Major UK Players",
          "<p>The UK food and drink manufacturing sector employs ~430,000 people and contributes ~£35 billion GVA per year (FDF figures). Top firms: Greencore, Bakkavor, Müller, 2 Sisters.</p>"),
     ],
     [
         {"q": "Continuous production is best suited to:", "options": [opt("Wedding cakes", False), opt("24/7 stable-demand products", True), opt("Variable craft items", False), opt("One-off prototypes", False)]},
         {"q": "A 'batch' is:", "options": [opt("One unit", False), opt("Defined quantity of identical units", True), opt("Continuous output", False), opt("Random output", False)]},
     ],
     [{"q": "If a continuous line runs 24 hours producing 600 units/hour, daily output (units) is:", "options": [14400, 12000, 18000, 10000], "answer": 14400}],
     [{"q": "What term describes 'units produced per unit time' (one word, lowercase)?", "answer": "throughput"}],
     )
count += 1

make(TS, TD, 2,
     "Allergen Labelling and Natasha's Law",
     "🥜",
     "October 2021 — every prepacked-for-direct-sale food must list ingredients.",
     "A-Level Food Tech: allergen labelling, FIC 2014, Natasha's Law 2021.",
     "Allergen labelling saves lives.",
     [
         ("Allergen", "Substance triggering immune reaction (peanut, gluten, dairy)."),
         ("14 Major Allergens", "UK/EU list requiring labelling under FIC."),
         ("FIC", "Food Information for Consumers Regulation (EU 1169/2011, UK 2014)."),
         ("Natasha's Law", "UK law (Oct 2021) requiring full ingredient labelling on PPDS food."),
         ("PPDS", "Prepacked for Direct Sale — packed before order on same premises."),
         ("Cross-Contamination", "Transfer of allergens between foods/surfaces."),
     ],
     [
         ("Rule", "14 Allergens",
          "<p>UK/EU law lists <strong>14 major allergens</strong> requiring labelling: celery, gluten, crustacean, egg, fish, lupin, milk, molluscs, mustard, nuts, peanuts, sesame, soya, sulphites. Must be emphasised in ingredient lists.</p>"),
         ("Law", "Natasha's Law",
          "<p><strong>Natasha's Law</strong> came into force on <strong>1 October 2021</strong>, after the death of Natasha Ednan-Laperouse from a Pret baguette in 2016. Requires PPDS food to display name and full ingredient list with allergens emphasised.</p>"),
         ("Prep", "Cross-Contamination",
          "<p>Even labelled-allergen-free products can be unsafe via <strong>cross-contamination</strong>. Separate utensils, segregated storage, colour-coded boards, schedules: HACCP-style control is required.</p>"),
     ],
     [
         {"q": "Natasha's Law came into force in:", "options": [opt("1 Oct 2011", False), opt("1 Oct 2021", True), opt("1 Oct 2016", False), opt("1 Oct 2024", False)]},
         {"q": "PPDS stands for:", "options": [opt("Pre-packed direct sale", True), opt("Packed product display", False), opt("Pre-prepared dispatch", False), opt("Public packaging", False)]},
     ],
     [{"q": "How many major allergens are listed in UK/EU labelling rules?", "options": [14, 12, 10, 16], "answer": 14}],
     [{"q": "What name (first name only) was the law named after? (one word, lowercase)", "answer": "natasha"}],
     )
count += 1

make(TS, TD, 3,
     "Quality Control and Standards",
     "✅",
     "BRCGS, ISO 22000 — global food safety standards.",
     "A-Level Food Tech: quality assurance, BRCGS, ISO 22000.",
     "Standards build trust at scale.",
     [
         ("Quality Control (QC)", "Reactive checks confirming product meets spec."),
         ("Quality Assurance (QA)", "Proactive system ensuring quality is built in."),
         ("BRCGS", "BRC Global Standards — Food Safety Issue 9 in force from Feb 2023."),
         ("ISO 22000", "ISO food safety management standard."),
         ("Traceability", "Ability to trace ingredient through supply chain."),
         ("Lot/Batch Code", "Identifier linking finished product to production run."),
     ],
     [
         ("System", "QC vs QA",
          "<p><strong>QC</strong> inspects samples (chemical, microbiological, sensory) after production. <strong>QA</strong> builds quality in via documented procedures, training, audits. HACCP is part of QA.</p>"),
         ("Standard", "BRCGS",
          "<p><strong>BRCGS</strong> (originally British Retail Consortium) sets the leading global private food safety standard. <strong>Issue 9</strong> took effect <strong>February 2023</strong>, raising emphasis on food fraud, food defence and culture.</p>"),
         ("Recall", "Traceability",
          "<p>Modern food recalls depend on <strong>traceability</strong>: every batch code links inputs to finished product. The EU General Food Law (Reg 178/2002) makes traceability a legal duty.</p>"),
     ],
     [
         {"q": "BRCGS Issue 9 took effect in:", "options": [opt("Feb 2013", False), opt("Feb 2023", True), opt("Feb 2018", False), opt("Feb 2025", False)]},
         {"q": "Quality assurance is:", "options": [opt("Reactive sampling", False), opt("Proactive system", True), opt("Marketing claim", False), opt("Sales target", False)]},
     ],
     [{"q": "How many years between BRCGS Issue 8 (2018) and Issue 9 (2023)?", "options": [5, 4, 6, 3], "answer": 5}],
     [{"q": "What does the acronym QA stand for? (two words, lowercase)", "answer": "quality assurance"}],
     )
count += 1

# special-diets--health
TS, TD = "special-diets--health", "Special Diets & Health"
make(TS, TD, 1,
     "Vegan, Vegetarian and Plant-Based",
     "🌱",
     "From flexitarian to fully plant-based — diet trends and nutrition planning.",
     "A-Level Food Tech: vegan and vegetarian nutrition.",
     "Plant-based, planned well.",
     [
         ("Vegan", "Excludes all animal products, including dairy and eggs."),
         ("Vegetarian", "Excludes meat and fish; may include dairy and eggs."),
         ("Lacto-Ovo Vegetarian", "Eats dairy and eggs; no meat or fish."),
         ("Complementary Proteins", "Combining plant sources to supply all essential amino acids."),
         ("B12", "Vitamin only reliably found in animal products or fortified foods."),
         ("Fortified Food", "Food with added nutrients (e.g. plant milk + B12 + calcium)."),
     ],
     [
         ("Diet", "Vegan vs Vegetarian",
          "<p><strong>Vegan</strong>: no animal products. <strong>Lacto-ovo vegetarian</strong>: dairy and eggs OK. <strong>Pescetarian</strong>: includes fish. <strong>Flexitarian</strong>: mostly plant-based with occasional animal foods.</p>"),
         ("Risk", "B12 and Iron",
          "<p>Vegan diets need attention to <strong>B12</strong> (fortified plant milks or supplement), <strong>iron</strong> (non-haem, less bioavailable — pair with vitamin C), <strong>iodine</strong>, <strong>omega-3</strong> (algae oil), <strong>calcium</strong>, and protein quality.</p>"),
         ("Method", "Complementary Proteins",
          "<p>Most plant proteins lack one or more essential amino acids. <strong>Complementary proteins</strong>: beans + rice, hummus + pitta, peanut butter + bread. Across a day's intake — not single meal — sufficient mix is achieved.</p>"),
     ],
     [
         {"q": "Which is excluded by a lacto-ovo vegetarian?", "options": [opt("Meat and fish", True), opt("Eggs", False), opt("Dairy", False), opt("Cereals", False)]},
         {"q": "Vitamin B12 reliably comes from:", "options": [opt("Leaves", False), opt("Animal or fortified foods", True), opt("Cereals (natural)", False), opt("Pure sunlight", False)]},
     ],
     [{"q": "If an adult needs 1.5 µg/day of B12 and a fortified milk supplies 0.5 µg per glass, how many glasses needed?", "options": [3, 2, 4, 5], "answer": 3}],
     [{"q": "What vitamin is most at risk in vegan diets (letter + number, lowercase, no space)?", "answer": "b12"}],
     )
count += 1

make(TS, TD, 2,
     "Coeliac, Lactose Intolerance, Diabetes",
     "🩺",
     "Three conditions reshaping how we cook and label food.",
     "A-Level Food Tech: coeliac, lactose intolerance, diabetes diets.",
     "Specific science, daily life.",
     [
         ("Coeliac Disease", "Autoimmune reaction to gluten damaging the small intestine."),
         ("Gluten", "Protein complex in wheat, rye, barley (gliadin + glutenin)."),
         ("Gluten-Free", "EU labelling: ≤20 mg/kg gluten in finished food."),
         ("Lactose Intolerance", "Inability to digest lactose due to low lactase enzyme."),
         ("Diabetes Mellitus", "Disorder of blood glucose regulation (Type 1 and Type 2)."),
         ("Glycaemic Index", "Ranking of carbohydrate foods by their effect on blood glucose."),
     ],
     [
         ("Condition", "Coeliac",
          "<p><strong>Coeliac disease</strong> affects ~1% of UK adults. Even trace gluten triggers villi damage. Strict gluten-free diet required for life. <strong>EU labelling</strong> allows '<strong>gluten-free</strong>' claim only if ≤20 mg/kg gluten.</p>"),
         ("Condition", "Lactose Intolerance",
          "<p><strong>Lactose intolerance</strong> arises from low <strong>lactase</strong> enzyme — common in East Asian and African populations, rarer in northern Europeans. Manage via lactose-free milk, fermented dairy (yoghurt, hard cheese), lactase tablets.</p>"),
         ("Condition", "Diabetes",
          "<p><strong>Type 1</strong> (autoimmune, ~10% of cases) and <strong>Type 2</strong> (insulin resistance, ~90%). Diet management uses <strong>glycaemic index</strong>, portion control, and balance of macronutrients. Eatwell Guide remains the UK basis.</p>"),
     ],
     [
         {"q": "EU 'gluten-free' label allows up to:", "options": [opt("100 mg/kg", False), opt("20 mg/kg", True), opt("0 mg/kg (zero)", False), opt("200 mg/kg", False)]},
         {"q": "Coeliac disease is caused by:", "options": [opt("Lactose", False), opt("Gluten", True), opt("Egg white", False), opt("Fish protein", False)]},
     ],
     [{"q": "If Type 2 diabetes accounts for ~90% of cases and a clinic has 200 patients with diabetes, how many likely have Type 2?", "options": [180, 160, 150, 200], "answer": 180}],
     [{"q": "What enzyme is deficient in lactose intolerance? (one word, lowercase)", "answer": "lactase"}],
     )
count += 1

make(TS, TD, 3,
     "Heart Disease and the Eatwell Guide",
     "❤️",
     "PHE/OHID's national guidance — and the science behind it.",
     "A-Level Food Tech: cardiovascular health and the Eatwell Guide.",
     "Five a day, oily fish twice a week.",
     [
         ("Cardiovascular Disease", "Heart and blood-vessel disease, leading UK cause of death."),
         ("LDL Cholesterol", "'Bad' cholesterol — high levels raise CVD risk."),
         ("Saturated Fat", "Fat with no C=C double bonds — raises LDL when excessive."),
         ("Trans Fat", "Industrially produced fat raising LDL and lowering HDL."),
         ("Eatwell Guide", "UK national food guide (rev. 2016 by PHE)."),
         ("Five a Day", "UK guidance: 5 × 80 g portions of fruit/veg daily."),
     ],
     [
         ("Risk", "CVD",
          "<p><strong>Cardiovascular disease</strong> causes around <strong>25%</strong> of UK deaths. Diet, smoking, exercise and genetics interact. Key dietary levers: saturated fat, salt, fibre, oily fish (omega-3).</p>"),
         ("Guide", "Eatwell",
          "<p>The <strong>Eatwell Guide</strong> (revised <strong>2016</strong> by Public Health England) recommends: 1/3 starchy carbs (preferring wholegrain), 1/3 fruit and vegetables (<strong>5-a-day</strong>), some protein (incl. 2 portions fish/week, 1 oily), some dairy/alternatives, small amounts of oils/spreads.</p>"),
         ("Salt", "Targets",
          "<p>UK SACN salt target: <strong>≤6 g/day</strong> for adults. Reducing salt by 1 g/day across the UK population is estimated to prevent thousands of CVD events yearly. Front-of-pack traffic lights help consumers compare products.</p>"),
     ],
     [
         {"q": "Eatwell Guide '5-a-day' portion size is approximately:", "options": [opt("40 g", False), opt("80 g", True), opt("200 g", False), opt("500 g", False)]},
         {"q": "UK adult salt target per day is:", "options": [opt("≤2 g", False), opt("≤6 g", True), opt("≤10 g", False), opt("Unlimited", False)]},
     ],
     [{"q": "If 5 × 80 g portions are recommended, total recommended fruit/veg in grams per day is:", "options": [400, 350, 500, 300], "answer": 400}],
     [{"q": "Recommended portions of oily fish per week (UK)? (single digit, lowercase word)", "answer": "one"}],
     )
count += 1

# macronutrients--energy
TS, TD = "macronutrients--energy", "Macronutrients & Energy"
make(TS, TD, 1,
     "Energy Values: kcal/g",
     "🔥",
     "4, 4, 9, 7 — the numbers behind every food label.",
     "A-Level Food Tech: kcal/g of carbohydrate, protein, fat, alcohol.",
     "Atwater's factors.",
     [
         ("Atwater Factors", "Average metabolisable energy per gram: 4/4/9/7."),
         ("Carbohydrate Energy", "4 kcal/g (17 kJ)."),
         ("Protein Energy", "4 kcal/g (17 kJ)."),
         ("Fat Energy", "9 kcal/g (37 kJ)."),
         ("Alcohol Energy", "7 kcal/g (29 kJ)."),
         ("Kilojoule", "SI energy unit: 1 kcal ≈ 4.184 kJ."),
     ],
     [
         ("Theory", "Atwater Factors",
          "<p>Wilbur Atwater established the modern energy factors around <strong>1900</strong> through bomb calorimetry and digestibility studies. Modern UK labelling uses the rounded values <strong>4/4/9/7 kcal/g</strong>.</p>"),
         ("Unit", "kcal and kJ",
          "<p>1 <strong>kcal</strong> = <strong>4.184 kJ</strong>. EU labelling shows both energy in kJ and kcal per 100 g. A 2000 kcal RDA is approximately 8400 kJ.</p>"),
         ("Calc", "Reading a Label",
          "<p>For a 100 g product with 50 g carb, 10 g protein, 20 g fat: energy = (50×4) + (10×4) + (20×9) = 200 + 40 + 180 = <strong>420 kcal</strong>. Compare against the RDA for context.</p>"),
     ],
     [
         {"q": "Energy density of fat in kcal/g:", "options": [opt("4", False), opt("9", True), opt("7", False), opt("3", False)]},
         {"q": "Energy density of alcohol in kcal/g:", "options": [opt("4", False), opt("9", False), opt("7", True), opt("0", False)]},
     ],
     [{"q": "Energy in kcal of 100 g containing 50 g carb, 10 g protein, 20 g fat (using 4/4/9):", "options": [420, 400, 450, 380], "answer": 420}],
     [{"q": "What surname did the American who established the 4/4/9 factors c. 1900 have?", "answer": "atwater"}],
     )
count += 1

make(TS, TD, 2,
     "BMR Estimation",
     "🧮",
     "Henry, Mifflin-St Jeor, and the equations behind a calorie target.",
     "A-Level Food Tech: BMR equations and applications.",
     "Estimate before you prescribe.",
     [
         ("BMR", "Basal Metabolic Rate — energy at rest, post-absorptive state."),
         ("Henry Equation", "UK BMR equation (Henry 2005), used by SACN."),
         ("Mifflin-St Jeor", "Common US BMR equation (1990)."),
         ("Schofield Equation", "Earlier FAO/WHO equation (1985)."),
         ("Lean Body Mass", "Body mass excluding fat — main BMR driver."),
         ("Thermogenesis", "Heat production by the body."),
     ],
     [
         ("Equation", "Henry 2005 (UK)",
          "<p>For 18-30 year males (UK Henry equation, <strong>2005</strong>): <strong>BMR (MJ/d) = 0.063 × weight (kg) + 2.896</strong>. SACN adopted Henry equations for UK DRV calculations.</p>"),
         ("Equation", "Mifflin-St Jeor",
          "<p>For men (<strong>Mifflin-St Jeor, 1990</strong>, kcal/day): <strong>BMR = 10W + 6.25H − 5A + 5</strong>. For women: subtract 161 instead of +5. W = kg, H = cm, A = years.</p>"),
         ("Limit", "Why Estimates Drift",
          "<p>Equations vary by 5-10% from indirect calorimetry. <strong>Lean body mass</strong> is the strongest predictor of BMR — equations underestimate athletes and overestimate sedentary obese individuals.</p>"),
     ],
     [
         {"q": "Henry BMR equation was published in:", "options": [opt("1985", False), opt("2005", True), opt("1995", False), opt("2015", False)]},
         {"q": "Mifflin-St Jeor BMR equation was published in:", "options": [opt("1980", False), opt("1990", True), opt("2000", False), opt("2010", False)]},
     ],
     [{"q": "For a 70 kg, 175 cm, 25-year-old man via Mifflin-St Jeor (10W+6.25H−5A+5), BMR kcal/d is:", "options": [1674, 1600, 1700, 1750], "answer": 1674}],
     [{"q": "What does the acronym BMR stand for? (three words, lowercase)", "answer": "basal metabolic rate"}],
     )
count += 1

make(TS, TD, 3,
     "TEE and PAL",
     "🏃",
     "BMR is only the start — add activity to find total energy expenditure.",
     "A-Level Food Tech: TEE, PAL multipliers, calorie targets.",
     "Multiply BMR by your activity level.",
     [
         ("TEE", "Total Energy Expenditure (kcal/day)."),
         ("PAL", "Physical Activity Level multiplier."),
         ("Sedentary PAL", "~1.4 — mostly desk work, little exercise."),
         ("Active PAL", "~1.7 — regular vigorous exercise or manual job."),
         ("EAR", "Estimated Average Requirement — population energy intake target."),
         ("Energy Deficit", "Sustained intake < TEE causes weight loss."),
     ],
     [
         ("Equation", "TEE = BMR × PAL",
          "<p><strong>TEE = BMR × PAL</strong>. Sedentary PAL ~1.4, lightly active ~1.55, active ~1.7, very active ~1.9+. Choose PAL honestly — most people overestimate their activity.</p>"),
         ("Population", "UK EAR",
          "<p>UK <strong>EAR</strong> for energy (SACN 2011): men 19-64 ≈ <strong>2,500 kcal/day</strong>; women 19-64 ≈ <strong>2,000 kcal/day</strong>. Front-of-pack labelling uses these as 'reference intakes' (RI).</p>"),
         ("Manage", "Deficit and Surplus",
          "<p>A <strong>500 kcal/day deficit</strong> ≈ 1 lb (0.45 kg) weight loss per week (3,500 kcal per pound rule of thumb). Sustained large deficits reduce BMR; gradual change works better.</p>"),
     ],
     [
         {"q": "UK EAR for women aged 19-64 is approximately:", "options": [opt("1,200 kcal/day", False), opt("2,000 kcal/day", True), opt("2,800 kcal/day", False), opt("3,500 kcal/day", False)]},
         {"q": "Sedentary PAL is approximately:", "options": [opt("1.4", True), opt("1.9", False), opt("2.5", False), opt("1.0", False)]},
     ],
     [{"q": "If BMR is 1500 kcal/day and PAL is 1.6, TEE in kcal/day is:", "options": [2400, 2200, 2600, 2000], "answer": 2400}],
     [{"q": "What does the acronym TEE stand for? (three words, lowercase)", "answer": "total energy expenditure"}],
     )
count += 1

print("Food done: 18")
