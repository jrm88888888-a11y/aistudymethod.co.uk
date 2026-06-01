#!/usr/bin/env python3
"""Generate 30 A-Level Design Technology JSON specs."""
import json, os

OUT_DIR = "/sessions/awesome-busy-dirac/mnt/AI Study Method/classcraft/adventures/_specs"
THEME = "creative-vibrant"
LEVEL = "a-level"
SUB = "design-technology"

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

# materials--composites
TS, TD = "materials--composites", "Materials & Composites"
make(TS, TD, 1,
     "Carbon Fibre Reinforced Polymer (CFRP)",
     "🏎️",
     "High strength, low density — the supercar's skin.",
     "A-Level D&T: CFRP composite structure, properties, and applications.",
     "Light, stiff, expensive.",
     [
         ("Composite", "Material made of two or more constituent materials with different properties."),
         ("CFRP", "Carbon Fibre Reinforced Polymer — carbon fibres in epoxy matrix."),
         ("Matrix", "Continuous binding phase of a composite (typically a resin)."),
         ("Reinforcement", "Discontinuous phase carrying tensile load (e.g. fibres)."),
         ("Anisotropy", "Property values differ with direction."),
         ("Pre-Preg", "Pre-impregnated fibre layer ready for curing in an autoclave."),
     ],
     [
         ("Material", "Structure of CFRP",
          "<p><strong>CFRP</strong> consists of carbon fibres (the reinforcement) embedded in an epoxy <strong>matrix</strong>. Fibres carry tensile load; the matrix transfers load between fibres and resists compression.</p>"),
         ("Property", "Strength-to-Weight",
          "<p>CFRP has tensile strength up to ~3500 MPa and density around 1600 kg/m^3, giving a specific strength roughly 5 times that of steel. Used in F1 monocoques, Boeing 787 (~50% composite by weight).</p>"),
         ("Process", "Pre-preg and Autoclave",
          "<p><strong>Pre-preg</strong> layers are laid into a mould and cured in an <strong>autoclave</strong> (typically 120-180 °C, 6-7 bar) to give void-free, high-strength parts. Cost limits the technique to high-value sectors.</p>"),
     ],
     [
         {"q": "In a composite, fibres act as:", "options": [opt("Matrix", False), opt("Reinforcement", True), opt("Catalyst", False), opt("Mould release", False)]},
         {"q": "The Boeing 787 Dreamliner is approximately what % composite by weight?", "options": [opt("10%", False), opt("50%", True), opt("90%", False), opt("25%", False)]},
     ],
     [{"q": "If a CFRP component masses 12 kg and the equivalent steel version masses 60 kg, mass saving is what %?", "options": [80, 70, 75, 60], "answer": 80}],
     [{"q": "What name (acronym) refers to carbon fibre reinforced polymer (lowercase, 4 letters)?", "answer": "cfrp"}],
     )
count += 1

make(TS, TD, 2,
     "Glass Fibre and Smart Materials",
     "🪟",
     "GFRP boats and smart materials that respond to environment.",
     "A-Level D&T: GFRP composites and smart materials.",
     "Materials that change with their environment.",
     [
         ("GFRP", "Glass Fibre Reinforced Polymer — fibreglass."),
         ("Smart Material", "Material whose property changes in response to a stimulus."),
         ("Shape Memory Alloy", "Alloy (e.g. Nitinol) that returns to a 'remembered' shape on heating."),
         ("Piezoelectric", "Material producing voltage when mechanically stressed."),
         ("Electrochromic", "Material changing colour with applied voltage (smart glazing)."),
         ("Thermochromic", "Material changing colour with temperature."),
     ],
     [
         ("Material", "GFRP Applications",
          "<p><strong>GFRP</strong> uses glass fibres in polyester or epoxy resin. Cheaper and less stiff than CFRP, it dominates boat hulls, wind-turbine blades and water tanks. Hand lay-up and resin infusion are common processes.</p>"),
         ("Smart", "Shape Memory and Piezo",
          "<p><strong>Nitinol</strong> (nickel-titanium SMA) is used in stents and spectacle frames. <strong>Piezoelectric</strong> ceramics (PZT) drive ultrasound transducers and inkjet print heads.</p>"),
         ("Chromic", "Colour-Changing Materials",
          "<p><strong>Thermochromic</strong> dyes shift colour with temperature (kettles, baby spoons). <strong>Electrochromic</strong> glazing darkens under voltage (Boeing 787 windows).</p>"),
     ],
     [
         {"q": "Nitinol is a:", "options": [opt("Thermoplastic", False), opt("Shape memory alloy", True), opt("Ceramic", False), opt("Composite", False)]},
         {"q": "Boat hulls commonly use:", "options": [opt("CFRP", False), opt("GFRP", True), opt("Aramid", False), opt("Aluminium foam", False)]},
     ],
     [{"q": "A piezoelectric sensor outputs 2 mV per N. What is the output voltage in mV for a 50 N force?", "options": [100, 50, 150, 200], "answer": 100}],
     [{"q": "What name (acronym) refers to glass fibre reinforced polymer (lowercase, 4 letters)?", "answer": "gfrp"}],
     )
count += 1

make(TS, TD, 3,
     "Ceramics and Nano-Materials",
     "⚛️",
     "From alumina cutting tools to carbon nanotubes.",
     "A-Level D&T: technical ceramics and nano-materials.",
     "Atom-scale design, world-scale impact.",
     [
         ("Technical Ceramic", "Engineering ceramic: high hardness, high temperature, brittle."),
         ("Alumina (Al2O3)", "Aluminium oxide — cutting tool inserts, dental implants."),
         ("Zirconia (ZrO2)", "Toughened ceramic — dental crowns, knife blades."),
         ("Nano-Material", "Material with structural features below 100 nm."),
         ("Carbon Nanotube (CNT)", "Cylindrical carbon nano-structure, very high tensile strength."),
         ("Graphene", "Single-atom-thick sheet of carbon — Nobel Prize 2010 (Geim, Novoselov)."),
     ],
     [
         ("Material", "Technical Ceramics",
          "<p><strong>Alumina</strong> and <strong>zirconia</strong> have hardness up to 1500 HV and operating temperatures above 1000 °C. They serve as cutting tools, prosthetic joints, and turbine blades.</p>"),
         ("Nano", "Carbon Nanotubes",
          "<p>Single-wall <strong>carbon nanotubes</strong> have tensile strength up to ~63 GPa — about 50 times steel. They reinforce polymer composites in aerospace and battery electrodes.</p>"),
         ("Graphene", "2D Carbon",
          "<p><strong>Graphene</strong> — first isolated by Geim and Novoselov at Manchester in <strong>2004</strong> (Nobel Prize <strong>2010</strong>) — is a single-atom layer of graphite, with extraordinary strength and electrical conductivity.</p>"),
     ],
     [
         {"q": "Graphene was first isolated in:", "options": [opt("1994", False), opt("2004", True), opt("2014", False), opt("1984", False)]},
         {"q": "Carbon nanotubes are about how many times stronger than steel by tensile strength?", "options": [opt("5x", False), opt("50x", True), opt("500x", False), opt("0.5x", False)]},
     ],
     [{"q": "If a cutting tool has hardness 1500 HV and tool steel has 800 HV, what is the ratio (rounded to 1 dp)?", "options": [1.9, 2.0, 1.5, 2.5], "answer": 1.9}],
     [{"q": "What is the name of a single-atom-thick sheet of carbon? (one word, lowercase)", "answer": "graphene"}],
     )
count += 1

# design-process--ethics
TS, TD = "design-process--ethics", "Design Process & Ethics"
make(TS, TD, 1,
     "Iterative Design",
     "🔄",
     "Build to think, think to build — repeat.",
     "A-Level D&T: iterative design process and prototyping.",
     "Iterate fast, iterate cheap.",
     [
         ("Iterative Design", "Cyclic process: design, build, test, refine."),
         ("Prototype", "Working model used to test ideas."),
         ("MVP", "Minimum Viable Product — smallest version that delivers value."),
         ("User Testing", "Observing real users interact with a prototype."),
         ("Fail Fast", "Discover flaws early when changes are cheapest."),
         ("Pivot", "Significant change in design direction following testing."),
     ],
     [
         ("Process", "Iteration",
          "<p><strong>Iterative design</strong> replaces 'waterfall' linearity with repeated cycles: design → prototype → test → refine. Each loop builds knowledge cheaply before committing to expensive tooling.</p>"),
         ("Stage", "Prototypes from Sketch to MVP",
          "<p>Low-fidelity prototypes (cardboard, sketches) test concept. <strong>MVPs</strong> test market fit. High-fidelity prototypes test manufacture. Each fidelity level suits a different question.</p>"),
         ("User", "Testing in the Loop",
          "<p><strong>User testing</strong> drives iteration. Nielsen suggests 5 users uncover ~85% of usability problems. Observation, think-aloud protocol and post-task interview are standard methods.</p>"),
     ],
     [
         {"q": "Iterative design is best described as:", "options": [opt("One-shot waterfall", False), opt("Cyclic build-test-refine", True), opt("Mass production", False), opt("Marketing process", False)]},
         {"q": "MVP stands for:", "options": [opt("Most Valuable Player", False), opt("Minimum Viable Product", True), opt("Master Verification Plan", False), opt("Multiple View Prototype", False)]},
     ],
     [{"q": "Nielsen suggests 5 users uncover about what % of usability problems?", "options": [85, 75, 50, 95], "answer": 85}],
     [{"q": "What term means 'significant change in design direction following testing'? (one word, lowercase)", "answer": "pivot"}],
     )
count += 1

make(TS, TD, 2,
     "Sustainability and the 6 Rs",
     "♻️",
     "Rethink, refuse, reduce, reuse, repair, recycle.",
     "A-Level D&T: sustainability principles and the 6 Rs.",
     "Most environmental impact is locked in at the design stage.",
     [
         ("6 Rs", "Rethink, Refuse, Reduce, Reuse, Repair, Recycle."),
         ("Embodied Energy", "Energy consumed to extract, manufacture and transport a product."),
         ("Carbon Footprint", "Total greenhouse gas emissions caused by an entity/product."),
         ("Closed Loop", "System in which materials cycle indefinitely without waste."),
         ("Planned Obsolescence", "Designing a product to fail or become outdated within a set time."),
         ("Right to Repair", "Movement and legislation enabling consumer/independent repair."),
     ],
     [
         ("Framework", "The 6 Rs",
          "<p>The <strong>6 Rs</strong> rank waste-prevention strategies — <strong>Rethink</strong> first (do we need this product at all?), through Reduce/Reuse/Repair, to Recycle as last resort. Design decides where in the hierarchy a product lives.</p>"),
         ("Carbon", "Embodied Impact",
          "<p>For a typical car, ~20% of life-cycle CO2 is embodied (manufacture), 80% use-phase. For an LED bulb, ratio inverts. <strong>Embodied energy</strong> dominates short-life electronics.</p>"),
         ("Policy", "Right to Repair",
          "<p>The UK introduced <strong>right to repair</strong> regulations in <strong>July 2021</strong> for white goods and TVs, requiring spare-part availability for 7-10 years. EU regulations extended similarly.</p>"),
     ],
     [
         {"q": "Which is NOT one of the 6 Rs?", "options": [opt("Rethink", False), opt("Recycle", False), opt("Restore", True), opt("Reduce", False)]},
         {"q": "The UK 'right to repair' rules came into force in:", "options": [opt("2011", False), opt("2021", True), opt("2018", False), opt("2024", False)]},
     ],
     [{"q": "If a car emits 30 tonnes CO2 over its life and 80% is from the use phase, how many tonnes are from manufacture?", "options": [6, 5, 8, 10], "answer": 6}],
     [{"q": "What term describes a system where materials cycle indefinitely without waste? (two words, lowercase)", "answer": "closed loop"}],
     )
count += 1

make(TS, TD, 3,
     "Ethics in Design",
     "⚖️",
     "Who benefits, who pays, who decides?",
     "A-Level D&T: ethical considerations in product design.",
     "Design decisions are ethical decisions.",
     [
         ("Ethics", "Branch of philosophy concerned with right and wrong action."),
         ("Stakeholder", "Anyone affected by a product or design decision."),
         ("Inclusive Design", "Design accessible to the widest range of users."),
         ("Dark Pattern", "UI design that tricks the user into unintended actions."),
         ("Fair Trade", "Certification ensuring producers receive a fair price."),
         ("Conflict Mineral", "Mineral whose extraction funds armed conflict (e.g. coltan)."),
     ],
     [
         ("Theory", "Stakeholders",
          "<p>Designers consider all <strong>stakeholders</strong>: users, makers, communities affected by raw-material extraction, future users (when product becomes waste). The hidden stakeholder often pays the highest cost.</p>"),
         ("Practice", "Inclusive Design",
          "<p><strong>Inclusive design</strong> (championed by OXO Good Grips; Microsoft Inclusive Toolkit) seeks accessibility across age, ability, language and context. Designing for the margin often improves the mainstream.</p>"),
         ("Supply", "Conflict Minerals",
          "<p>Coltan (tantalum), tin, tungsten and gold — '3TG' — are widely sourced from conflict zones. The US Dodd-Frank Act (2010) and EU Conflict Minerals Regulation (2021) impose reporting requirements.</p>"),
     ],
     [
         {"q": "UI design that tricks users is called:", "options": [opt("White hat", False), opt("Dark pattern", True), opt("Brutalism", False), opt("Inclusive", False)]},
         {"q": "The EU Conflict Minerals Regulation took full effect in:", "options": [opt("2011", False), opt("2021", True), opt("2018", False), opt("2025", False)]},
     ],
     [{"q": "How many minerals are included in '3TG' (conflict minerals)?", "options": [4, 3, 5, 2], "answer": 4}],
     [{"q": "What two-word term describes design accessible to the widest range of users? (lowercase)", "answer": "inclusive design"}],
     )
count += 1

# manufacturing--systems
TS, TD = "manufacturing--systems", "Manufacturing & Systems"
make(TS, TD, 1,
     "Just-In-Time and Lean Manufacturing",
     "🏭",
     "Toyota's revolution: make only what you need, when you need it.",
     "A-Level D&T: JIT, lean manufacturing, and the Toyota Production System.",
     "Eliminate waste, respect people.",
     [
         ("JIT", "Just-In-Time — parts arrive exactly when needed."),
         ("Lean Manufacturing", "Toyota-derived system minimising waste."),
         ("Kanban", "Card-based pull-signalling system in lean production."),
         ("Muda", "Japanese: waste — the 7 wastes of lean."),
         ("Kaizen", "Continuous incremental improvement."),
         ("Andon", "Cord/light system letting workers stop the line to flag problems."),
     ],
     [
         ("System", "Toyota Production System",
          "<p>The <strong>Toyota Production System</strong>, codified by Taiichi Ohno in the 1950s-70s and popularised internationally from the <strong>1980s</strong>, underlies <strong>lean</strong>. Two pillars: <strong>JIT</strong> and <strong>Jidoka</strong> (automation with human touch).</p>"),
         ("Tool", "Kanban and Pull",
          "<p><strong>Kanban</strong> cards (Japanese 'signboard') trigger upstream production only when downstream pulls. Inventory shrinks to a few hours; capital is freed; quality problems surface fast.</p>"),
         ("Culture", "Kaizen and Andon",
          "<p><strong>Kaizen</strong> — continuous small improvements — and the <strong>Andon</strong> cord (anyone can stop the line) embed quality and improvement in daily work.</p>"),
     ],
     [
         {"q": "JIT stands for:", "options": [opt("Just-In-Time", True), opt("Junior In-house Tech", False), opt("Joint Integration Test", False), opt("Just-In-Total", False)]},
         {"q": "How many 'wastes' (muda) does classical lean recognise?", "options": [opt("5", False), opt("7", True), opt("9", False), opt("3", False)]},
     ],
     [{"q": "If lean reduces inventory holding cost by 60% on a £500,000 base, the savings (in £) are:", "options": [300000, 200000, 400000, 250000], "answer": 300000}],
     [{"q": "What Japanese term means 'continuous improvement'?", "answer": "kaizen"}],
     )
count += 1

make(TS, TD, 2,
     "Production Scales: Bespoke to Mass",
     "📦",
     "From one-off to a million units — different processes for different volumes.",
     "A-Level D&T: scales of production and matching processes.",
     "Volume changes everything.",
     [
         ("Bespoke", "One-off — single unit, often hand-made."),
         ("Batch Production", "Limited number of identical units in a single run."),
         ("Mass Production", "Continuous large-volume production using a flow line."),
         ("Continuous Production", "24/7 large-scale process (oil refinery, glass float line)."),
         ("Economies of Scale", "Per-unit cost falls as production volume rises."),
         ("Setup Cost", "Fixed cost of preparing tooling for a production run."),
     ],
     [
         ("Volume", "Scales and Examples",
          "<p><strong>Bespoke</strong>: Savile Row suit. <strong>Batch</strong>: 100 wedding cakes. <strong>Mass</strong>: iPhones (~200m/year). <strong>Continuous</strong>: float glass, refinery output.</p>"),
         ("Economics", "Setup vs Unit Cost",
          "<p>Higher-volume processes (injection moulding, die-casting) carry high <strong>setup costs</strong> (tooling £50k+) but low per-unit costs. Low-volume processes (machining, 3D printing) reverse this.</p>"),
         ("Match", "Process Selection",
          "<p>Selecting the right process means matching expected <strong>volume</strong> to setup vs unit-cost economics, alongside accuracy, surface finish and material properties.</p>"),
     ],
     [
         {"q": "Float glass production is which scale?", "options": [opt("Bespoke", False), opt("Continuous", True), opt("Batch", False), opt("Job shop", False)]},
         {"q": "Injection moulding suits which scale?", "options": [opt("One-off", False), opt("Mass production", True), opt("Bespoke", False), opt("Single prototype", False)]},
     ],
     [{"q": "If tooling cost is £50,000 and per-unit material cost is £5, total cost for 10,000 units (in £)?", "options": [100000, 75000, 150000, 200000], "answer": 100000}],
     [{"q": "What two-word term means per-unit cost falls as volume rises? (lowercase)", "answer": "economies of scale"}],
     )
count += 1

make(TS, TD, 3,
     "CAM and CNC",
     "🤖",
     "Computer-aided manufacture — turning CAD into chips.",
     "A-Level D&T: CAM, CNC and the digital factory.",
     "From file to part.",
     [
         ("CAM", "Computer-Aided Manufacture — software generates machine code from CAD."),
         ("CNC", "Computer Numerical Control — machines driven by G-code."),
         ("G-Code", "Standard programming language for CNC tool paths."),
         ("Tool Path", "Sequence of co-ordinates the cutter follows."),
         ("3-Axis Machining", "Movement in X, Y, Z — standard CNC milling."),
         ("5-Axis Machining", "Adds two rotational axes (A, B) for complex surfaces."),
     ],
     [
         ("Workflow", "CAD-CAM-CNC",
          "<p>The <strong>CAD-CAM-CNC</strong> chain converts a 3D model to physical part. CAD designs the geometry; CAM generates the <strong>tool paths</strong>; the post-processor outputs <strong>G-code</strong>; the CNC machine executes.</p>"),
         ("Axes", "3 vs 5",
          "<p>Standard milling uses three linear axes (X, Y, Z). <strong>5-axis</strong> machining adds two rotational axes (A, B), allowing single-setup machining of complex parts — used for turbine blades and medical implants.</p>"),
         ("Advantage", "Why CAM",
          "<p>CAM enables: <strong>repeatability</strong> (every part identical), 24/7 unmanned production, complex geometries impossible by hand, and direct iteration from CAD without re-drawing.</p>"),
     ],
     [
         {"q": "G-code is:", "options": [opt("A CAD format", False), opt("Standard CNC tool-path language", True), opt("A material code", False), opt("A 3D-print resin", False)]},
         {"q": "5-axis machining adds which two extra axes?", "options": [opt("X, Y", False), opt("A, B (rotational)", True), opt("Z, W", False), opt("C, D linear", False)]},
     ],
     [{"q": "A 3-axis CNC has axes X, Y, Z. A 5-axis CNC has how many extra axes (beyond 3)?", "options": [2, 1, 3, 4], "answer": 2}],
     [{"q": "What does the abbreviation CAM stand for? (three words, lowercase)", "answer": "computer aided manufacture"}],
     )
count += 1

# digital-technologies
TS, TD = "digital-technologies", "Digital Technologies"
make(TS, TD, 1,
     "CAD: SolidWorks and Fusion 360",
     "🖥️",
     "Parametric solid modelling — the designer's standard tool.",
     "A-Level D&T: parametric CAD with SolidWorks and Fusion 360.",
     "The 3D model is the master record.",
     [
         ("CAD", "Computer-Aided Design — software for 2D/3D modelling."),
         ("Parametric Modelling", "CAD where dimensions and relations are editable parameters."),
         ("SolidWorks", "Dassault Systèmes parametric CAD package (launched 1995)."),
         ("Fusion 360", "Autodesk cloud-based CAD/CAM (launched 2013)."),
         ("Constraint", "Geometric relation (e.g. parallel, tangent) fixing sketch behaviour."),
         ("Feature Tree", "Ordered history of modelling operations that produce a part."),
     ],
     [
         ("Software", "SolidWorks and Fusion 360",
          "<p><strong>SolidWorks</strong> (since <strong>1995</strong>) and <strong>Fusion 360</strong> (since <strong>2013</strong>) are leading parametric CAD packages. SolidWorks is desktop, file-based; Fusion 360 is cloud-based and integrates CAM, simulation and rendering.</p>"),
         ("Method", "Parametric Modelling",
          "<p>Sketch with <strong>constraints</strong> (coincident, parallel, equal), add <strong>dimensions</strong>, extrude/revolve into features. The <strong>feature tree</strong> stores history — change a dimension and everything updates.</p>"),
         ("Output", "Beyond Geometry",
          "<p>A modern CAD model carries: tolerances (GD&T), material, mass, cost, manufacturing data and simulation results. It becomes the digital twin of the eventual physical part.</p>"),
     ],
     [
         {"q": "SolidWorks was first released in:", "options": [opt("1985", False), opt("1995", True), opt("2005", False), opt("2015", False)]},
         {"q": "Fusion 360's distinguishing feature is:", "options": [opt("Cloud-based, integrated CAM", True), opt("Pencil-only sketching", False), opt("Vector graphics only", False), opt("VR-only modelling", False)]},
     ],
     [{"q": "If a parametric model has 12 features and changing one upstream causes 8 to update, what % update?", "options": [67, 50, 75, 80], "answer": 67}],
     [{"q": "What three-word phrase does CAD stand for? (lowercase)", "answer": "computer aided design"}],
     )
count += 1

make(TS, TD, 2,
     "3D Printing: FDM, SLA, SLS",
     "🖨️",
     "Three core additive processes shaping product development.",
     "A-Level D&T: additive manufacturing processes.",
     "Build it layer by layer.",
     [
         ("Additive Manufacturing", "Building parts by adding material layer-by-layer."),
         ("FDM", "Fused Deposition Modelling — extruded thermoplastic filament."),
         ("SLA", "Stereolithography — UV-cured photopolymer resin."),
         ("SLS", "Selective Laser Sintering — laser-fused powder bed."),
         ("Layer Height", "Vertical resolution of an additive build (e.g. 0.1 mm)."),
         ("Support Structure", "Sacrificial material holding overhangs during printing."),
     ],
     [
         ("Process", "FDM",
          "<p><strong>FDM</strong> melts a thermoplastic filament (PLA, ABS, PETG) and deposits it through a heated nozzle. Cheap, accessible, but with visible layer lines (~0.1-0.3 mm) and reduced inter-layer strength.</p>"),
         ("Process", "SLA",
          "<p><strong>SLA</strong> cures liquid photopolymer with a UV laser or LCD. Very high resolution (down to 25 µm), smooth surfaces, but brittle parts and resin handling concerns.</p>"),
         ("Process", "SLS",
          "<p><strong>SLS</strong> selectively sinters polymer (typically nylon) powder with a CO2 laser. No support structures needed (powder bed self-supports), full mechanical strength, suited to functional end-use parts.</p>"),
     ],
     [
         {"q": "Which 3D printing process uses UV-cured resin?", "options": [opt("FDM", False), opt("SLA", True), opt("SLS", False), opt("DMLS", False)]},
         {"q": "SLS commonly prints which material?", "options": [opt("Steel rods", False), opt("Nylon powder", True), opt("PLA filament", False), opt("Wood pulp", False)]},
     ],
     [{"q": "A part is 50 mm tall printed at 0.2 mm layer height. How many layers?", "options": [250, 200, 500, 100], "answer": 250}],
     [{"q": "What does the acronym FDM stand for? (three words, lowercase)", "answer": "fused deposition modelling"}],
     )
count += 1

make(TS, TD, 3,
     "Generative Design and AI-Aided Modelling",
     "🤖",
     "Software explores thousands of design options against your constraints.",
     "A-Level D&T: generative design and AI in CAD.",
     "Designer sets constraints; algorithm explores the space.",
     [
         ("Generative Design", "Algorithm-driven exploration of design alternatives against constraints."),
         ("Topology Optimisation", "Removing material from non-load-bearing regions to reduce weight."),
         ("Constraint", "Designer-set requirement (load, fixed face, manufacturing limit)."),
         ("Objective", "Quantity to optimise (mass, stiffness, cost)."),
         ("Lattice Structure", "Internal repeating geometry reducing mass while retaining stiffness."),
         ("Solver", "Algorithm computing physics-informed design alternatives."),
     ],
     [
         ("Theory", "What Generative Design Does",
          "<p><strong>Generative design</strong> (Autodesk, nTopology) takes a designer's <strong>constraints</strong> (loads, supports, keep-out volumes) and <strong>objective</strong> (e.g. minimise mass) and produces dozens of candidate geometries — often organic in appearance.</p>"),
         ("Method", "Topology Optimisation",
          "<p><strong>Topology optimisation</strong> iteratively removes material from a starting volume where stress is low, leaving a load-bearing skeleton. Combined with additive manufacturing, it produces parts impossible to machine.</p>"),
         ("Case", "Airbus Bionic Partition",
          "<p>Airbus's 2015 'Bionic Partition' for the A320 cabin was generated using bionic algorithms and printed in scalmalloy (Al-Mg-Sc alloy), saving 45% mass — about 30 kg per partition, hundreds of tonnes of fuel over a lifetime.</p>"),
     ],
     [
         {"q": "Topology optimisation removes material from regions of:", "options": [opt("High stress", False), opt("Low stress", True), opt("All boundaries", False), opt("Visible surfaces", False)]},
         {"q": "Airbus's Bionic Partition was unveiled in:", "options": [opt("2005", False), opt("2015", True), opt("2020", False), opt("2010", False)]},
     ],
     [{"q": "If a generative-design bracket saves 45% on an 8 kg part, the new mass (kg) is:", "options": [4.4, 5.0, 3.6, 6.0], "answer": 4.4}],
     [{"q": "What two-word term describes algorithm-driven exploration of design alternatives? (lowercase)", "answer": "generative design"}],
     )
count += 1

# smart-manufacturing--industry-40
TS, TD = "smart-manufacturing--industry-40", "Smart Manufacturing & Industry 4.0"
make(TS, TD, 1,
     "Industry 4.0 and the IIoT",
     "🌐",
     "Cyber-physical systems, big data, and the connected factory.",
     "A-Level D&T: Industry 4.0, IIoT, and cyber-physical systems.",
     "The factory becomes a network.",
     [
         ("Industry 4.0", "Fourth industrial revolution — cyber-physical, networked manufacturing."),
         ("IIoT", "Industrial Internet of Things — networked sensors and machines."),
         ("Cyber-Physical System", "Physical machine integrated with computation and network."),
         ("Edge Computing", "Processing data close to source rather than in a central cloud."),
         ("OPC UA", "Open Platform Communications standard for industrial data exchange."),
         ("Predictive Maintenance", "Using sensor data to forecast failure before it occurs."),
     ],
     [
         ("History", "Industry Revolutions",
          "<p><strong>Industry 1.0</strong>: steam (1780s). <strong>2.0</strong>: electricity, mass production (1870s). <strong>3.0</strong>: electronics, automation (1960s). <strong>4.0</strong>: cyber-physical systems, IoT — coined at Hannover Messe, <strong>2011</strong>.</p>"),
         ("Tech", "IIoT and Edge",
          "<p>The <strong>IIoT</strong> connects machines, sensors and SCADA via standards like <strong>OPC UA</strong> and MQTT. <strong>Edge computing</strong> reduces latency and cloud bandwidth by processing close to the machine.</p>"),
         ("Value", "Predictive Maintenance",
          "<p><strong>Predictive maintenance</strong> uses vibration, temperature and acoustic sensors to forecast bearing or motor failure. Studies report 25-30% maintenance cost reduction over reactive approaches.</p>"),
     ],
     [
         {"q": "The term 'Industry 4.0' was popularised at Hannover Messe in:", "options": [opt("2001", False), opt("2011", True), opt("2021", False), opt("1991", False)]},
         {"q": "Edge computing means:", "options": [opt("Processing at network edge", True), opt("Cloud-only processing", False), opt("Mobile-only", False), opt("Air-gapped only", False)]},
     ],
     [{"q": "If predictive maintenance cuts £400,000 annual maintenance cost by 25%, savings in £ are:", "options": [100000, 80000, 120000, 150000], "answer": 100000}],
     [{"q": "What does the acronym IIoT stand for? (six words, lowercase)", "answer": "industrial internet of things"}],
     )
count += 1

make(TS, TD, 2,
     "Digital Twins",
     "🪞",
     "A live virtual copy of the physical asset — synchronised by sensor data.",
     "A-Level D&T: digital twins in design and operation.",
     "What you can model, you can predict.",
     [
         ("Digital Twin", "Live virtual model of a physical asset, synced by sensor data."),
         ("Simulation Model", "Computational representation of a system's behaviour."),
         ("Sensor Feed", "Real-time data stream from the physical asset to its twin."),
         ("What-If Analysis", "Running scenarios on the twin to forecast outcomes."),
         ("Asset Twin", "Twin of a single physical item (e.g. a turbine)."),
         ("System Twin", "Twin of a whole system (factory, city)."),
     ],
     [
         ("Concept", "Origin of the Term",
          "<p>The <strong>digital twin</strong> concept was articulated by Michael Grieves around <strong>2002</strong> and grew with cheap sensors and cloud compute. NASA used twin spacecraft on the ground during Apollo missions — an analogue ancestor.</p>"),
         ("Use", "Operations",
          "<p>Rolls-Royce monitors every Trent engine through a digital twin, using live sensor data to schedule maintenance and optimise fuel burn. Siemens twins entire factories before they are built.</p>"),
         ("Limit", "Caveats",
          "<p>A twin is only as good as its <strong>model</strong> and <strong>data</strong>. Garbage in, garbage out applies. Twins also raise cybersecurity concerns — they expose detailed system data.</p>"),
     ],
     [
         {"q": "A digital twin is:", "options": [opt("A static CAD model", False), opt("A live virtual model synced by data", True), opt("A spare physical unit", False), opt("A backup hard drive", False)]},
         {"q": "The digital twin concept was articulated by Grieves around:", "options": [opt("1992", False), opt("2002", True), opt("2012", False), opt("2022", False)]},
     ],
     [{"q": "If a twin updates every 5 seconds, how many updates per hour?", "options": [720, 360, 600, 1200], "answer": 720}],
     [{"q": "What two-word term means 'a live virtual model of a physical asset'? (lowercase)", "answer": "digital twin"}],
     )
count += 1

make(TS, TD, 3,
     "Big Data Analytics in Manufacturing",
     "📊",
     "Volume, velocity, variety — and the patterns hidden inside.",
     "A-Level D&T: big data analytics in smart manufacturing.",
     "Data is the new raw material.",
     [
         ("Big Data", "Datasets too large or fast for traditional databases."),
         ("3 Vs", "Volume, Velocity, Variety — the classic big-data dimensions."),
         ("Data Lake", "Repository storing raw data in native format."),
         ("Machine Learning", "Algorithms learning patterns from data without explicit programming."),
         ("OEE", "Overall Equipment Effectiveness — availability x performance x quality."),
         ("Dashboard", "Visual real-time KPI display."),
     ],
     [
         ("Framework", "The 3 Vs",
          "<p>The <strong>3 Vs</strong> framework (Doug Laney, <strong>2001</strong>): <strong>Volume</strong> (size), <strong>Velocity</strong> (rate of arrival), <strong>Variety</strong> (formats). Some authors add Veracity and Value to make 5.</p>"),
         ("Metric", "OEE",
          "<p><strong>OEE = Availability × Performance × Quality</strong>. World-class is ~85%; typical factories run 40-60%. Data analytics on machine downtime and reject rate drives OEE improvement.</p>"),
         ("Tool", "ML for Quality",
          "<p>Machine learning models trained on sensor and image data detect quality drift before scrap occurs — vision systems on the line, vibration signatures from spindles, infrared on welding.</p>"),
     ],
     [
         {"q": "The 3 Vs of big data are:", "options": [opt("Volume, Velocity, Variety", True), opt("Volume, Value, Vision", False), opt("Volatility, Variance, Value", False), opt("Velocity, Vector, Vertical", False)]},
         {"q": "OEE formula is:", "options": [opt("A × P × Q", True), opt("A + P + Q", False), opt("A − P − Q", False), opt("A / P / Q", False)]},
     ],
     [{"q": "If availability = 90%, performance = 95% and quality = 98%, OEE % (rounded to nearest whole) is:", "options": [84, 80, 90, 88], "answer": 84}],
     [{"q": "What 3-letter acronym means 'overall equipment effectiveness'? (lowercase)", "answer": "oee"}],
     )
count += 1

# modern-composites--technical-textiles
TS, TD = "modern-composites--technical-textiles", "Modern Composites & Technical Textiles"
make(TS, TD, 1,
     "Aramid Fibres: Kevlar",
     "🦺",
     "Bulletproof, tough, and stronger than steel by weight.",
     "A-Level D&T: aramid fibres, Kevlar, and ballistic textiles.",
     "Five times stronger than steel by weight.",
     [
         ("Aramid Fibre", "Aromatic polyamide synthetic fibre — high strength, heat resistant."),
         ("Kevlar", "DuPont aramid fibre, invented by Stephanie Kwolek in 1965."),
         ("Stephanie Kwolek", "American chemist (1923-2014), DuPont, Kevlar inventor."),
         ("Tensile Strength", "Maximum stress a material can withstand under tension."),
         ("Ballistic Textile", "Textile woven to resist projectile penetration."),
         ("Nomex", "DuPont aramid (1967) used in firefighter and racing suits."),
     ],
     [
         ("Discovery", "Kwolek and Kevlar",
          "<p><strong>Stephanie Kwolek</strong>, working at DuPont in <strong>1965</strong>, discovered the aramid fibre marketed from 1971 as <strong>Kevlar</strong>. She received the Lemelson-MIT Prize and the National Medal of Technology.</p>"),
         ("Property", "Strength to Weight",
          "<p>Kevlar fibres reach tensile strength of about <strong>3600 MPa</strong> at density 1440 kg/m^3 — roughly <strong>5 times</strong> the specific strength of steel. Used in body armour, ropes, sails, racing tyres.</p>"),
         ("Form", "Woven and Composite",
          "<p>Kevlar is woven into vests, used as reinforcement in aramid-CFRP hybrids, and as honeycomb cores. <strong>Nomex</strong>, its meta-aramid sibling (introduced <strong>1967</strong>), is heat-resistant for firefighter and racing suits.</p>"),
     ],
     [
         {"q": "Kevlar was invented in:", "options": [opt("1955", False), opt("1965", True), opt("1975", False), opt("1985", False)]},
         {"q": "Kevlar's specific strength is approximately how many times that of steel?", "options": [opt("0.5x", False), opt("5x", True), opt("50x", False), opt("500x", False)]},
     ],
     [{"q": "Kwolek lived 1923 to 2014. What was her age at death (in years)?", "options": [90, 89, 91, 92], "answer": 90}],
     [{"q": "What surname did the American chemist who invented Kevlar have?", "answer": "kwolek"}],
     )
count += 1

make(TS, TD, 2,
     "Gore-Tex and Performance Membranes",
     "🌧️",
     "Waterproof, breathable — the membrane revolution.",
     "A-Level D&T: Gore-Tex, ePTFE membranes, and technical textiles.",
     "Pores too small for liquid water, big enough for water vapour.",
     [
         ("Gore-Tex", "ePTFE membrane laminate, invented by Bob Gore in 1969."),
         ("ePTFE", "Expanded polytetrafluoroethylene — micro-porous fluoropolymer."),
         ("Breathable", "Transmits water vapour while resisting liquid water."),
         ("Lamination", "Bonding a membrane between fabric layers."),
         ("Lycra", "DuPont elastane fibre (1958), highly elastic spandex."),
         ("Technical Textile", "Textile engineered for performance rather than aesthetics."),
     ],
     [
         ("Material", "Gore-Tex Discovery",
          "<p>Bob Gore stretched PTFE in <strong>1969</strong> and discovered the resulting <strong>ePTFE</strong> membrane was strong, micro-porous and waterproof. Marketed as <strong>Gore-Tex</strong> from 1976, it transformed outdoor clothing.</p>"),
         ("Principle", "Why Breathable",
          "<p>Gore-Tex membrane has ~9 billion pores per square inch. Each pore is ~20,000 times smaller than a water droplet but ~700 times larger than a water vapour molecule — keeping rain out, letting sweat escape.</p>"),
         ("Elastane", "Lycra",
          "<p><strong>Lycra</strong> (elastane/spandex) was invented by Joseph Shivers at DuPont in <strong>1958</strong>. A few % Lycra in a blend gives stretch and recovery — transforming sportswear, swimwear and tailoring.</p>"),
     ],
     [
         {"q": "Gore-Tex membrane was invented in:", "options": [opt("1959", False), opt("1969", True), opt("1979", False), opt("1989", False)]},
         {"q": "Lycra (elastane) was invented in:", "options": [opt("1948", False), opt("1958", True), opt("1968", False), opt("1978", False)]},
     ],
     [{"q": "Approximately how many billion pores per square inch in a Gore-Tex membrane?", "options": [9, 5, 14, 20], "answer": 9}],
     [{"q": "What does ePTFE stand for? (four words, lowercase, no hyphen)", "answer": "expanded polytetrafluoroethylene"}],
     )
count += 1

make(TS, TD, 3,
     "Technical Textiles in Medicine and Sport",
     "🏥",
     "From compression bandages to F1 driver suits.",
     "A-Level D&T: technical textiles in medical and sporting applications.",
     "Fibre engineered for function.",
     [
         ("Medical Textile", "Textile engineered for healthcare (bandages, sutures, scaffolds)."),
         ("Compression Garment", "Tight-fitting garment applying pressure (medical or sport)."),
         ("Smart Textile", "Textile with integrated electronic or responsive function."),
         ("Auxetic", "Material whose Poisson's ratio is negative — widens when stretched."),
         ("Phase-Change Material (PCM)", "Material absorbing/releasing latent heat at a fixed temperature."),
         ("Bioresorbable", "Material safely absorbed by the body over time."),
     ],
     [
         ("Medical", "Bandages and Sutures",
          "<p>Modern <strong>medical textiles</strong> include silicone-elastomer dressings, antimicrobial sutures, vascular grafts (Dacron, PTFE) and <strong>bioresorbable</strong> meshes that scaffold tissue regrowth then dissolve.</p>"),
         ("Sport", "Performance Wear",
          "<p>Compression sportswear (Skins, 2CKU) claims to reduce muscle vibration. F1 driver suits meet FIA 8856-2018 — flame resistance to over 800 °C for 11 seconds, using multi-layer Nomex.</p>"),
         ("Smart", "PCM and Auxetic",
          "<p><strong>PCM</strong>-filled fibres (Outlast, from NASA research) store body heat and release it later. <strong>Auxetic</strong> textiles widen when stretched — used in protective sportswear (D3O, Auxetix).</p>"),
     ],
     [
         {"q": "An auxetic material:", "options": [opt("Thins when stretched", False), opt("Widens when stretched", True), opt("Tears immediately", False), opt("Heats when stretched", False)]},
         {"q": "PCMs work by absorbing and releasing:", "options": [opt("Latent heat", True), opt("Electricity", False), opt("Vapour", False), opt("Sound", False)]},
     ],
     [{"q": "FIA 8856-2018 requires flame resistance for how many seconds?", "options": [11, 10, 15, 20], "answer": 11}],
     [{"q": "What term means 'material safely absorbed by the body over time'? (one word, lowercase)", "answer": "bioresorbable"}],
     )
count += 1

# programmable-components--mechatronics
TS, TD = "programmable-components--mechatronics", "Programmable Components & Mechatronics"
make(TS, TD, 1,
     "Arduino and the Microcontroller",
     "🔌",
     "A microcontroller for the rest of us — open hardware since 2005.",
     "A-Level D&T: Arduino microcontroller platform and embedded systems.",
     "Code the world.",
     [
         ("Arduino", "Open-source microcontroller platform, launched 2005, Ivrea, Italy."),
         ("Microcontroller", "Single-chip computer with CPU, memory, I/O for embedded use."),
         ("Digital I/O", "Pin set to HIGH (3.3 V or 5 V) or LOW (0 V)."),
         ("Analogue Input", "Pin reading a voltage as a digital number via ADC."),
         ("PWM", "Pulse Width Modulation — duty cycle simulates analogue output."),
         ("Sketch", "Arduino's term for a program."),
     ],
     [
         ("Origin", "Arduino at Ivrea",
          "<p><strong>Arduino</strong> launched at Interaction Design Institute Ivrea (Italy) in <strong>2005</strong>, designed by Massimo Banzi and team. Open-source hardware and a simple IDE made microcontrollers accessible to designers.</p>"),
         ("I/O", "Digital and Analogue",
          "<p>Arduino Uno has 14 <strong>digital</strong> I/O pins and 6 <strong>analogue input</strong> pins. The 10-bit ADC reads 0-5 V as 0-1023. <strong>PWM</strong> on six pins simulates analogue output by varying duty cycle.</p>"),
         ("Use", "Embedded Design",
          "<p>Designers use Arduino to prototype interactive products — lighting that responds to motion, weather stations, robot controllers. From prototype it can graduate to a custom PCB carrying the same ATmega chip.</p>"),
     ],
     [
         {"q": "Arduino was launched in:", "options": [opt("1995", False), opt("2005", True), opt("2015", False), opt("2010", False)]},
         {"q": "Arduino Uno's analogue input ADC has how many bits?", "options": [opt("8", False), opt("10", True), opt("12", False), opt("16", False)]},
     ],
     [{"q": "Arduino Uno's 10-bit ADC has how many discrete levels (0 to 2^10 - 1)?", "options": [1024, 1023, 256, 4096], "answer": 1024}],
     [{"q": "What does the acronym PWM stand for? (three words, lowercase)", "answer": "pulse width modulation"}],
     )
count += 1

make(TS, TD, 2,
     "Raspberry Pi and Single-Board Computers",
     "🥧",
     "A £30 Linux computer for the classroom — and the satellite.",
     "A-Level D&T: Raspberry Pi single-board computer and embedded Linux.",
     "From hobby kit to global infrastructure.",
     [
         ("Raspberry Pi", "Single-board Linux computer, first released 2012, UK Foundation."),
         ("Single-Board Computer", "Complete computer on one PCB."),
         ("Linux", "Open-source Unix-like operating system."),
         ("GPIO", "General Purpose Input/Output — pins for digital I/O."),
         ("HAT", "Hardware Attached on Top — Pi-specific expansion board."),
         ("SoC", "System on Chip — integrated CPU, GPU, RAM controller."),
     ],
     [
         ("History", "Raspberry Pi Origin",
          "<p>The <strong>Raspberry Pi</strong>, designed in Cambridge UK and launched in <strong>February 2012</strong>, aimed to revive entry-level computer science teaching. Over <strong>60 million</strong> units have been sold globally.</p>"),
         ("Tech", "Pi vs Arduino",
          "<p>Pi runs full <strong>Linux</strong> with display, networking and storage — heavier than Arduino but capable of vision, web servers, complex logic. Pi 5 (2023) has a quad-core 64-bit ARM Cortex-A76 at 2.4 GHz.</p>"),
         ("I/O", "GPIO and HATs",
          "<p>The 40-pin <strong>GPIO</strong> header carries digital I/O, I2C, SPI and UART. <strong>HATs</strong> snap on top to add sensors, displays, motor drivers — standardised by the Raspberry Pi Foundation in 2014.</p>"),
     ],
     [
         {"q": "The first Raspberry Pi was released in:", "options": [opt("2002", False), opt("2012", True), opt("2022", False), opt("2018", False)]},
         {"q": "Raspberry Pi GPIO header has how many pins?", "options": [opt("26", False), opt("40", True), opt("50", False), opt("60", False)]},
     ],
     [{"q": "Approximately how many million Raspberry Pi units have been sold globally?", "options": [60, 50, 80, 100], "answer": 60}],
     [{"q": "What does GPIO stand for? (four words, lowercase)", "answer": "general purpose input output"}],
     )
count += 1

make(TS, TD, 3,
     "Sensors, Actuators and PID Control",
     "🎛️",
     "Input, process, output — and the closed loop in between.",
     "A-Level D&T: sensors, actuators, and PID control loops.",
     "Measure, decide, act, measure again.",
     [
         ("Sensor", "Device measuring a physical quantity and outputting a signal."),
         ("Actuator", "Device converting a signal into mechanical motion."),
         ("Servo Motor", "Motor with position feedback, accepting target angle commands."),
         ("PID Controller", "Control combining Proportional, Integral, Derivative terms."),
         ("Setpoint", "Target value the controller aims to maintain."),
         ("Feedback Loop", "System where output is sensed and used to adjust input."),
     ],
     [
         ("I/O", "Sensors and Actuators",
          "<p>Common sensors: thermistor (temperature), LDR (light), ultrasonic (distance), accelerometer (motion). Actuators: DC motor, stepper, servo, solenoid, piezo. Sensors close the loop; actuators open it.</p>"),
         ("Control", "PID",
          "<p>A <strong>PID controller</strong> outputs u(t) = Kp·e + Ki·∫e dt + Kd·de/dt, where e = setpoint − actual. P responds to current error, I removes steady-state error, D damps overshoot.</p>"),
         ("Tuning", "Why It Matters",
          "<p>PID drives temperature controllers, 3D-printer heaters, drone stabilisation, autopilots. Poor tuning causes oscillation; correct tuning gives smooth tracking. Ziegler-Nichols (1942) is a classic tuning method.</p>"),
     ],
     [
         {"q": "PID stands for:", "options": [opt("Position, Integral, Derivative", False), opt("Proportional, Integral, Derivative", True), opt("Phase, Index, Density", False), opt("Programmable Industrial Driver", False)]},
         {"q": "Ziegler-Nichols PID tuning was published in:", "options": [opt("1932", False), opt("1942", True), opt("1962", False), opt("1972", False)]},
     ],
     [{"q": "How many terms make up a standard PID controller?", "options": [3, 2, 4, 5], "answer": 3}],
     [{"q": "What is the term for the target value a controller aims to maintain? (one word, lowercase)", "answer": "setpoint"}],
     )
count += 1

# design-movements--influential-designers
TS, TD = "design-movements--influential-designers", "Design Movements & Influential Designers"
make(TS, TD, 1,
     "Bauhaus and De Stijl",
     "🏗️",
     "Form follows function — and the grid follows logic.",
     "A-Level D&T: Bauhaus, De Stijl, and early modern design.",
     "Form follows function.",
     [
         ("Bauhaus", "German school (1919-1933) uniting art, craft, industry."),
         ("De Stijl", "Dutch movement (1917-1931), Mondrian, Rietveld."),
         ("Walter Gropius", "Bauhaus founder (1883-1969)."),
         ("Gerrit Rietveld", "Dutch designer (1888-1964), Red and Blue Chair 1917."),
         ("Marcel Breuer", "Hungarian-American Bauhaus designer (1902-1981), Wassily Chair 1925."),
         ("Functionalism", "Belief that form should arise from function and material."),
     ],
     [
         ("School", "Bauhaus 1919-1933",
          "<p>The <strong>Bauhaus</strong> (<strong>1919</strong>, Weimar) under Gropius, then Hannes Meyer, then Mies van der Rohe, brought together painters, weavers, architects and metalworkers. Closed by Nazis in <strong>1933</strong>; alumni scattered globally.</p>"),
         ("Movement", "De Stijl",
          "<p><strong>De Stijl</strong> (<strong>1917-1931</strong>), founded by Theo van Doesburg, advocated reduction to vertical and horizontal lines and primary colours. Rietveld's <em>Red and Blue Chair</em> (<strong>1917</strong>) and Schroder House (1924) translated the manifesto to objects.</p>"),
         ("Object", "Wassily Chair",
          "<p>Marcel Breuer's <strong>Wassily Chair</strong> (<strong>1925</strong>) used bent tubular steel — inspired by his bicycle frame — to redefine furniture industrially. Still in production today.</p>"),
     ],
     [
         {"q": "Bauhaus was founded in:", "options": [opt("1909", False), opt("1919", True), opt("1929", False), opt("1939", False)]},
         {"q": "Breuer's Wassily Chair (1925) is made of:", "options": [opt("Carved oak", False), opt("Tubular steel", True), opt("Cast iron", False), opt("Moulded plastic", False)]},
     ],
     [{"q": "Bauhaus operated 1919 to 1933. How many years did it exist?", "options": [14, 13, 15, 12], "answer": 14}],
     [{"q": "What surname did the founder of the Bauhaus, Walter, have?", "answer": "gropius"}],
     )
count += 1

make(TS, TD, 2,
     "Memphis and Postmodern Design",
     "💗",
     "1981 Milan — colour, pattern, and the joy of bad taste.",
     "A-Level D&T: Memphis Group and postmodern design.",
     "Decoration is not crime.",
     [
         ("Memphis Group", "Italian design collective founded by Ettore Sottsass in 1981."),
         ("Ettore Sottsass", "Italian architect/designer (1917-2007), Memphis founder."),
         ("Carlton Bookcase", "Sottsass's 1981 Memphis emblem — angular plastic laminate."),
         ("Postmodernism", "Architecture and design rejecting modernist purity from 1970s."),
         ("Plastic Laminate", "Decorative high-pressure laminate (Formica) used for surfaces."),
         ("Anti-Design", "Italian 1960s-70s movement opposing 'good design' orthodoxy."),
     ],
     [
         ("Origin", "Memphis 1981",
          "<p>The <strong>Memphis Group</strong> launched in Milan in September <strong>1981</strong>, founded by <strong>Ettore Sottsass</strong>. Bright laminate, geometric pattern, asymmetric form — a rebellion against the Modernist orthodoxy of black and chrome.</p>"),
         ("Icon", "Carlton",
          "<p>Sottsass's <em>Carlton</em> bookcase (<strong>1981</strong>) — patterned laminate, splayed angular shelves — became the movement's emblem. Critics dismissed Memphis as kitsch; it remains a landmark of postmodern design.</p>"),
         ("Legacy", "Influence",
          "<p>Memphis disbanded around 1987 but its visual language returned in 1990s graphic design and 2010s fashion. Karl Lagerfeld famously collected and lived among Memphis pieces.</p>"),
     ],
     [
         {"q": "Memphis Group launched in:", "options": [opt("1971", False), opt("1981", True), opt("1991", False), opt("2001", False)]},
         {"q": "Sottsass's signature Memphis bookcase is called:", "options": [opt("Carlton", True), opt("Eros", False), opt("Pluto", False), opt("Casablanca", False)]},
     ],
     [{"q": "Sottsass lived 1917 to 2007. What was his age at death (in years)?", "options": [90, 89, 91, 88], "answer": 90}],
     [{"q": "What surname did the Italian designer Ettore (Memphis founder) have?", "answer": "sottsass"}],
     )
count += 1

make(TS, TD, 3,
     "Dieter Rams and Jony Ive",
     "📱",
     "Ten principles, two generations, one philosophy.",
     "A-Level D&T: Dieter Rams' 10 principles and Jony Ive at Apple.",
     "Less, but better.",
     [
         ("Dieter Rams", "German industrial designer (b. 1932), Braun chief designer 1961-1995."),
         ("Ten Principles", "Rams' 1970s-80s 'Good Design' principles."),
         ("Braun", "German consumer electronics firm; Rams designed for them 1955-1995."),
         ("Jony Ive", "British designer (b. 1967), Apple SVP Design 1997-2019."),
         ("iMac G3", "Translucent Apple computer (1998), Ive's breakthrough product."),
         ("Patricia Urquiola", "Spanish-Italian designer (b. 1961), Moroso, B&B Italia."),
     ],
     [
         ("Theorist", "Rams' Ten",
          "<p>Dieter Rams' <strong>10 Principles of Good Design</strong> (codified 1970s-80s): innovative, useful, aesthetic, makes a product understandable, unobtrusive, honest, long-lasting, thorough, environmentally friendly, and 'as little design as possible'.</p>"),
         ("Heir", "Ive and Apple",
          "<p><strong>Jony Ive</strong> joined Apple in 1992 and became SVP Design in 1997. The <strong>iMac G3</strong> (<strong>1998</strong>), iPod (2001), iPhone (2007) and iPad (2010) bear his stamp — much influenced by Rams' Braun designs.</p>"),
         ("Plural", "Urquiola",
          "<p>Beyond the Rams-Ive lineage, contemporary practice includes <strong>Patricia Urquiola</strong> (b. 1961), whose work for Moroso, B&B Italia and Kettal blends craft, colour and pattern with industrial production.</p>"),
     ],
     [
         {"q": "Dieter Rams was chief designer at:", "options": [opt("Sony", False), opt("Braun", True), opt("Philips", False), opt("Siemens", False)]},
         {"q": "The iMac G3 launched in:", "options": [opt("1988", False), opt("1998", True), opt("2008", False), opt("2018", False)]},
     ],
     [{"q": "How many of Rams' 'Principles of Good Design' are there?", "options": [10, 8, 12, 7], "answer": 10}],
     [{"q": "What famous three-word Rams maxim ends 'but better'? (lowercase, with comma)", "answer": "less, but better"}],
     )
count += 1

# sustainable-design--lifecycle-analysis
TS, TD = "sustainable-design--lifecycle-analysis", "Sustainable Design & Lifecycle Analysis"
make(TS, TD, 1,
     "Lifecycle Analysis (LCA)",
     "🌱",
     "Cradle to grave — accounting for every stage.",
     "A-Level D&T: LCA, cradle-to-grave, and ISO 14040.",
     "Measure before you optimise.",
     [
         ("LCA", "Life Cycle Assessment — quantifying environmental impacts across a product's life."),
         ("Cradle to Grave", "Accounting from raw material extraction to end-of-life disposal."),
         ("ISO 14040", "International standard for LCA methodology."),
         ("Inventory Analysis", "LCA stage cataloguing inputs (energy, materials) and outputs (emissions)."),
         ("Functional Unit", "Quantified function used to compare alternatives (e.g. 1 km driven)."),
         ("Impact Category", "Environmental issue assessed (GWP, acidification, eutrophication)."),
     ],
     [
         ("Standard", "ISO 14040",
          "<p><strong>ISO 14040</strong> (first published <strong>1997</strong>, revised 2006) sets out four LCA stages: <strong>goal and scope</strong>, <strong>inventory analysis</strong>, <strong>impact assessment</strong>, and <strong>interpretation</strong>.</p>"),
         ("Scope", "Functional Unit",
          "<p>A meaningful LCA compares like with like via a <strong>functional unit</strong>: '1 km transported', '1 L pasteurised milk packaged'. Without it, comparisons mislead.</p>"),
         ("Output", "Impact Categories",
          "<p>Outputs include <strong>Global Warming Potential</strong> (kg CO2e), <strong>acidification</strong> (kg SO2e), <strong>eutrophication</strong> (kg PO4e), water use, and resource depletion. Trade-offs are common.</p>"),
     ],
     [
         {"q": "ISO 14040 was first published in:", "options": [opt("1987", False), opt("1997", True), opt("2007", False), opt("2017", False)]},
         {"q": "How many main LCA stages does ISO 14040 define?", "options": [opt("3", False), opt("4", True), opt("5", False), opt("6", False)]},
     ],
     [{"q": "If a product emits 25 kg CO2e in use and 5 kg in production, use phase is what % of total?", "options": [83, 80, 75, 90], "answer": 83}],
     [{"q": "What does the acronym LCA stand for? (three words, lowercase)", "answer": "life cycle assessment"}],
     )
count += 1

make(TS, TD, 2,
     "Cradle to Cradle",
     "♻️",
     "McDonough and Braungart's manifesto: waste equals food.",
     "A-Level D&T: Cradle to Cradle, circular design and biomimicry.",
     "Design out waste from the start.",
     [
         ("Cradle to Cradle", "Closed-loop design philosophy (McDonough + Braungart, 2002)."),
         ("Biological Nutrient", "Material that returns safely to the biosphere."),
         ("Technical Nutrient", "Material that cycles indefinitely within industry."),
         ("McDonough", "American architect William McDonough (b. 1951)."),
         ("Braungart", "German chemist Michael Braungart (b. 1958)."),
         ("Upcycling", "Re-using waste at equal or higher value than original use."),
     ],
     [
         ("Book", "Cradle to Cradle 2002",
          "<p><strong>William McDonough</strong> and <strong>Michael Braungart</strong> published <em>Cradle to Cradle: Remaking the Way We Make Things</em> in <strong>2002</strong>. The book itself was printed on a synthetic 'plastic paper' to demonstrate the concept.</p>"),
         ("Idea", "Two Metabolisms",
          "<p>Materials should sit in one of two metabolisms: <strong>biological</strong> (composts back to soil) or <strong>technical</strong> (recycles industrially forever). Mixing the two — composite plastics with toxic dyes — creates 'monstrous hybrids'.</p>"),
         ("Cert", "C2C Certification",
          "<p>The <strong>Cradle to Cradle Certified™</strong> standard rates products across material health, reuse, renewable energy, water and social fairness — Basic to Platinum.</p>"),
     ],
     [
         {"q": "Cradle to Cradle was published in:", "options": [opt("1992", False), opt("2002", True), opt("2012", False), opt("2022", False)]},
         {"q": "A 'biological nutrient' material:", "options": [opt("Recycles industrially", False), opt("Returns safely to biosphere", True), opt("Is toxic", False), opt("Cannot decompose", False)]},
     ],
     [{"q": "How many ranks does the Cradle to Cradle Certified standard use (Basic, Bronze, Silver, Gold, Platinum)?", "options": [5, 4, 3, 6], "answer": 5}],
     [{"q": "What surname did the German chemist co-author (Michael) of Cradle to Cradle have?", "answer": "braungart"}],
     )
count += 1

make(TS, TD, 3,
     "Biomimicry and Embodied Carbon",
     "🐚",
     "Nature has done the R&D for 3.8 billion years.",
     "A-Level D&T: biomimicry, Janine Benyus, and embodied carbon.",
     "Steal smart — from nature.",
     [
         ("Biomimicry", "Designing systems modelled on biological strategies."),
         ("Janine Benyus", "American biologist (b. 1958), coined biomimicry in 1997 book."),
         ("Velcro", "Hook-and-loop fastener inspired by burdock burr (1948, de Mestral)."),
         ("Embodied Carbon", "Greenhouse-gas emissions from making a material/product."),
         ("Operational Carbon", "Greenhouse-gas emissions during use phase."),
         ("RIBA 2030 Climate Challenge", "UK architects' target for embodied + operational reduction."),
     ],
     [
         ("Book", "Biomimicry 1997",
          "<p><strong>Janine Benyus</strong>'s <em>Biomimicry: Innovation Inspired by Nature</em> (<strong>1997</strong>) codified the field. Nature's strategies — gecko adhesion, lotus self-cleaning, termite cooling — solve problems with chemistry, not energy.</p>"),
         ("Case", "Velcro and the Burr",
          "<p><strong>Velcro</strong> was invented by Swiss engineer George de Mestral in <strong>1948</strong> after finding burdock burrs stuck to his dog's fur. He observed the hooks under microscope and patented hook-and-loop fastening in 1955.</p>"),
         ("Metric", "Embodied vs Operational",
          "<p><strong>Embodied carbon</strong> (manufacture) and <strong>operational carbon</strong> (use) together define a building or product's life-cycle GHG. As buildings become operationally efficient, embodied carbon dominates total impact.</p>"),
     ],
     [
         {"q": "Benyus's book Biomimicry was published in:", "options": [opt("1987", False), opt("1997", True), opt("2007", False), opt("2017", False)]},
         {"q": "Velcro was invented in:", "options": [opt("1938", False), opt("1948", True), opt("1958", False), opt("1968", False)]},
     ],
     [{"q": "If embodied carbon of a building is 1000 kg CO2e/m^2 and operational is 9000, embodied is what % of total?", "options": [10, 20, 5, 15], "answer": 10}],
     [{"q": "What surname did the American biologist Janine, who coined biomimicry, have?", "answer": "benyus"}],
     )
count += 1

# iterative-design-cycle
TS, TD = "iterative-design-cycle", "Iterative Design Cycle"
make(TS, TD, 1,
     "The Stanford d.school Cycle",
     "🔁",
     "Empathise, define, ideate, prototype, test.",
     "A-Level D&T: design thinking and the Stanford d.school cycle.",
     "Start with the user, not the idea.",
     [
         ("Design Thinking", "Human-centred problem-solving methodology, Stanford d.school."),
         ("d.school", "Hasso Plattner Institute of Design at Stanford, founded 2005."),
         ("Empathise", "Understand the user through observation and interview."),
         ("Define", "Frame the design problem from user insights."),
         ("Ideate", "Generate many possible solutions without judgement."),
         ("Prototype", "Make a quick model to embody and test an idea."),
     ],
     [
         ("Origin", "d.school",
          "<p>The <strong>Hasso Plattner Institute of Design at Stanford</strong> (the <em>d.school</em>) was founded in <strong>2005</strong> by David Kelley. Its five-stage <strong>design thinking</strong> framework spread globally through corporate and education adoption.</p>"),
         ("Stages", "Five Steps",
          "<p>The cycle: <strong>Empathise</strong> (understand user), <strong>Define</strong> (frame problem), <strong>Ideate</strong> (generate solutions), <strong>Prototype</strong> (build to think), <strong>Test</strong> (learn from users).</p>"),
         ("Habit", "Iterate, Don't Linearise",
          "<p>The stages are not linear: testing returns to definition, prototyping reframes empathy. The point is to externalise thinking quickly and cheaply — fail in cardboard before you fail in steel.</p>"),
     ],
     [
         {"q": "Stanford d.school was founded in:", "options": [opt("1995", False), opt("2005", True), opt("2015", False), opt("1985", False)]},
         {"q": "How many stages does the standard d.school design thinking cycle have?", "options": [opt("3", False), opt("5", True), opt("7", False), opt("9", False)]},
     ],
     [{"q": "If empathy interviews take 45 min each and a team conducts 12, total minutes spent:", "options": [540, 450, 600, 480], "answer": 540}],
     [{"q": "What is the first stage of the d.school cycle? (one word, lowercase)", "answer": "empathise"}],
     )
count += 1

make(TS, TD, 2,
     "Research, Ideate, Prototype",
     "🧪",
     "From insight to artefact — the early loops of design.",
     "A-Level D&T: primary research, ideation methods, prototyping.",
     "Quantity drives quality.",
     [
         ("Primary Research", "First-hand data collected by the designer."),
         ("Secondary Research", "Data sourced from existing publications."),
         ("Brainstorm", "Group idea-generation session, deferring judgement."),
         ("SCAMPER", "Ideation prompts: Substitute, Combine, Adapt, Modify, Put-to-use, Eliminate, Reverse."),
         ("Low-Fidelity Prototype", "Quick, cheap model (paper, foam, cardboard)."),
         ("High-Fidelity Prototype", "Polished model close to final product."),
     ],
     [
         ("Research", "Primary Methods",
          "<p>Strong <strong>primary research</strong>: user interviews (n=5-12 reveals most patterns), contextual observation, surveys (n=200+ for statistical confidence), competitor product teardown.</p>"),
         ("Ideation", "Diverge Wide",
          "<p>Quantity precedes quality. <strong>SCAMPER</strong> prompts, <strong>worst possible idea</strong>, '10 ideas in 10 minutes' generate breadth. Filter only when divergent phase is exhausted.</p>"),
         ("Prototype", "Fidelity Match",
          "<p>Match fidelity to question: <strong>low-fidelity</strong> for concept and flow; <strong>medium</strong> for usability; <strong>high</strong> for manufacture and stakeholder buy-in. Save engineering effort for late iterations.</p>"),
     ],
     [
         {"q": "SCAMPER's 'S' stands for:", "options": [opt("Sketch", False), opt("Substitute", True), opt("Strategy", False), opt("Survey", False)]},
         {"q": "Primary research is:", "options": [opt("From books/web", False), opt("First-hand collected by designer", True), opt("Older than 50 years", False), opt("Statistical only", False)]},
     ],
     [{"q": "How many letters in the SCAMPER acronym?", "options": [7, 6, 8, 5], "answer": 7}],
     [{"q": "What does the 'A' in SCAMPER stand for? (one word, lowercase)", "answer": "adapt"}],
     )
count += 1

make(TS, TD, 3,
     "Test, Evaluate, Iterate",
     "✅",
     "Specifications, criteria, and the feedback loop.",
     "A-Level D&T: testing, evaluation, and iterative refinement.",
     "Evaluation closes the loop.",
     [
         ("Specification", "Measurable list of requirements a design must meet."),
         ("Evaluation Criteria", "Standards used to judge a prototype against the brief."),
         ("Usability Testing", "Observing real users perform tasks with a prototype."),
         ("A/B Testing", "Comparing two design variants on a metric."),
         ("Heuristic Evaluation", "Expert review against usability principles (Nielsen, 1994)."),
         ("Iteration Cycle", "One pass through plan-build-test-refine."),
     ],
     [
         ("Specification", "ACCESS-FM",
          "<p>A-Level designers use <strong>ACCESS-FM</strong> to write specifications: <strong>A</strong>esthetics, <strong>C</strong>ost, <strong>C</strong>ustomer, <strong>E</strong>nvironment, <strong>S</strong>ize, <strong>S</strong>afety, <strong>F</strong>unction, <strong>M</strong>aterials. Every spec point should be measurable.</p>"),
         ("Test", "Method Mix",
          "<p>Combine <strong>usability testing</strong> (real users), <strong>heuristic evaluation</strong> (expert), <strong>A/B testing</strong> (quantitative comparison) and analytic methods (Fitts' law, cognitive walkthrough) for thorough evaluation.</p>"),
         ("Reflect", "Closing the Loop",
          "<p>Each iteration logs what changed, why, and what was learned. Examiners reward visible <strong>iteration</strong> evidence — not a single 'perfect' solution but a documented trail of refinement.</p>"),
     ],
     [
         {"q": "ACCESS-FM is used for writing:", "options": [opt("Specifications", True), opt("Drawings", False), opt("Bills of materials", False), opt("Risk assessments", False)]},
         {"q": "Nielsen's heuristics for usability were published in:", "options": [opt("1984", False), opt("1994", True), opt("2004", False), opt("2014", False)]},
     ],
     [{"q": "How many letters in the ACCESS-FM acronym (counting all)?", "options": [8, 7, 6, 9], "answer": 8}],
     [{"q": "What does the 'F' in ACCESS-FM stand for? (one word, lowercase)", "answer": "function"}],
     )
count += 1

print("D&T done: 30")
