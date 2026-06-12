#!/usr/bin/env python3
# Chunk 2: design-technology A-level true mismatches + iGCSE mechanisms (7 stems)
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPECS = os.path.join(ROOT, 'adventures', '_specs')
BANKS = os.path.join(ROOT, 'evaluate', 'misconception-banks')

DATA = {
"design-technology-a-level-aqa-design-for-manufacturing-project-management-adventure-1": {
 "concepts": [
  {"term": "Design for manufacture (DFM)", "def": "Designing products so they are simpler and cheaper to make, by minimising part counts, using standard components and realistic tolerances."},
  {"term": "Design for assembly", "def": "Designing parts that locate themselves, fit only the correct way and need few fasteners, reducing assembly time, errors and labour cost."},
  {"term": "Critical path analysis", "def": "A project-planning technique identifying the longest chain of dependent tasks, which determines the minimum time the whole project can take."},
  {"term": "Gantt chart", "def": "A bar chart plotting project tasks against time, showing durations, deadlines and which activities can run in parallel."},
  {"term": "Quality control", "def": "Inspecting and testing products during manufacture against specified tolerances, for example using go/no-go gauges, to catch defects early."},
  {"term": "Scales of production", "def": "One-off, batch, mass and continuous production; the chosen scale determines tooling investment, unit cost and suitable manufacturing processes."}
 ],
 "mcqs": [
  {"q": "What does a Gantt chart display?", "options": [["Project tasks plotted against time", 1], ["The forces acting on a structure", 0], ["The chemical composition of a material", 0], ["A product's retail price history", 0]]},
  {"q": "What is the critical path of a project?", "options": [["The longest sequence of dependent tasks, setting the minimum project duration", 1], ["The list of the most hazardous tasks", 0], ["The route materials take through the factory", 0], ["The cheapest possible order of tasks", 0]]},
  {"q": "Which change best illustrates design for manufacture?", "options": [["Reducing the number of separate components in a product", 1], ["Adding decorative features to impress customers", 0], ["Specifying the tightest tolerance on every dimension", 0], ["Using a unique custom screw for each fixing", 0]]},
  {"q": "What is a go/no-go gauge used for?", "options": [["Quickly checking that a dimension lies within tolerance", 1], ["Measuring the exact hardness of a material", 0], ["Timing tasks on the critical path", 0], ["Counting components in a kit", 0]]}
 ],
 "numericals": [{"q": "A dimension is specified as 50 mm with a tolerance of plus or minus 0.5 mm. What is the maximum acceptable size?", "answer": 50.5, "tolerance": 0, "unit": "mm", "options": [50.5, 49.5, 55, 50.05]}],
 "bank": [
  {"q": "What is the difference between quality control and quality assurance?", "correct": "Quality control inspects and tests outputs against tolerances; quality assurance is the whole system of procedures designed to prevent defects occurring in the first place.", "misconception": "QC and QA are the same thing — checking products at the end of the line.", "random_wrong": "QA stands for 'quick assembly' of standard parts.", "why": "Students merge the two terms; examiners expect QC as checking outputs and QA as the broader preventative system embedded throughout production."},
  {"q": "Should designers always specify the tightest possible tolerance?", "correct": "No — tighter tolerances require more precise machinery and inspection, raising cost; good practice specifies the loosest tolerance that still guarantees function.", "misconception": "Tighter tolerances always mean a better, more professional design.", "random_wrong": "Tolerance describes how well a material resists heat.", "why": "Students equate precision with quality, missing the cost-precision trade-off that is central to design for manufacture decisions."},
  {"q": "What does the critical path in a project plan show?", "correct": "The longest chain of dependent tasks, which fixes the minimum project duration; any delay on this path delays the entire project.", "misconception": "The critical path lists the tasks that are most dangerous and need safety checks.", "random_wrong": "The critical path is the conveyor route through the factory.", "why": "The word 'critical' suggests danger to students; in project management it means time-critical — tasks with zero float."}
 ]
},
"design-technology-a-level-aqa-digital-design-manufacture-adventure-1": {
 "concepts": [
  {"term": "CAD", "def": "Computer-aided design: producing 2D drawings and 3D models on screen, allowing rapid editing, accurate dimensioning and virtual testing before manufacture."},
  {"term": "CAM", "def": "Computer-aided manufacture: using CAD data to drive machines such as routers, laser cutters and milling machines for accurate, repeatable production."},
  {"term": "CNC", "def": "Computer numerical control: machine tools follow programmed coordinate instructions, often G-code, to cut identical parts with high precision."},
  {"term": "Additive manufacturing", "def": "Building parts layer by layer from digital models, as in 3D printing, enabling complex geometries and rapid prototyping with little material waste."},
  {"term": "Laser cutting", "def": "A subtractive CAM process using a focused laser beam to cut or engrave sheet materials quickly and with very high accuracy."},
  {"term": "Virtual modelling and simulation", "def": "Testing a digital prototype on screen, for example simulating stresses or assembly, reducing the cost and number of physical prototypes."}
 ],
 "mcqs": [
  {"q": "What does CAM stand for?", "options": [["Computer-aided manufacture", 1], ["Computer-assisted modelling", 0], ["Centralised assembly machine", 0], ["Calibrated automatic measurement", 0]]},
  {"q": "Which of these is an additive manufacturing process?", "options": [["3D printing", 1], ["Laser cutting", 0], ["CNC milling", 0], ["Turning on a lathe", 0]]},
  {"q": "Which is a key advantage of CAD over manual drawing?", "options": [["Designs can be edited and tested virtually before production", 1], ["It removes the need for any design skill", 0], ["It guarantees the product will sell", 0], ["It makes materials cheaper to buy", 0]]},
  {"q": "How is a CNC machine controlled?", "options": [["By programmed coordinate instructions such as G-code", 1], ["By a hand-operated joystick during every cut", 0], ["By voice commands from the operator", 0], ["By mechanical cams and gears only", 0]]}
 ],
 "numericals": [{"q": "An FDM 3D printer deposits layers 0.2 mm thick. How many layers are needed for a part 30 mm tall?", "answer": 150, "tolerance": 0, "unit": "layers", "options": [150, 60, 15, 300]}],
 "bank": [
  {"q": "Is CAD the same as CAM?", "correct": "No — CAD is designing and modelling a product on computer; CAM uses computer-controlled machines to manufacture it. CAD data is often exported to drive CAM machines.", "misconception": "CAD software physically manufactures the product.", "random_wrong": "CAM is a program used for editing photographs of products.", "why": "Students blur design and manufacture because the acronyms are similar; the design-data-to-machine workflow is the key relationship to understand."},
  {"q": "Is 3D printing additive or subtractive manufacture?", "correct": "Additive — material is built up layer by layer from a digital model. Milling and laser cutting are subtractive because they remove material from stock.", "misconception": "3D printing carves the shape out of a solid block of material.", "random_wrong": "3D printing only works with metals.", "why": "Students group all CNC processes together; the additive/subtractive distinction explains 3D printing's low waste and geometric freedom."},
  {"q": "Does a CNC machine design the product itself?", "correct": "No — a CNC machine only follows programmed toolpaths generated by a human via CAD/CAM software; it executes instructions, it does not make design decisions.", "misconception": "CNC machines automatically decide the best design and make it.", "random_wrong": "CNC machines are steered manually with a remote control.", "why": "Students overestimate machine autonomy; understanding that humans create the program clarifies where skill and responsibility sit in digital manufacture."}
 ]
},
"design-technology-a-level-aqa-enterprise-marketing-adventure-1": {
 "concepts": [
  {"term": "Enterprise", "def": "Identifying a commercial opportunity and taking the financial risk of developing a new product or business to exploit it."},
  {"term": "Market research", "def": "Gathering data about consumers through surveys, interviews and focus groups to identify needs, gaps in the market and likely demand."},
  {"term": "Market pull", "def": "Product development driven by consumer demand: designers respond to what the market asks for, such as healthier foods or smaller devices."},
  {"term": "Technology push", "def": "Product development driven by new technology or materials, where innovation creates products consumers did not know they wanted."},
  {"term": "Branding", "def": "The identity of a product or company — name, logo, values and reputation — built to create recognition, trust and customer loyalty."},
  {"term": "Crowdfunding", "def": "Raising finance for a new product from many small contributors through online platforms, often pre-selling the product before manufacture."}
 ],
 "mcqs": [
  {"q": "What are the 4 Ps of the marketing mix?", "options": [["Product, price, place, promotion", 1], ["Plan, prototype, produce, profit", 0], ["People, power, process, packaging", 0], ["Purpose, patent, publicity, price", 0]]},
  {"q": "What is market pull?", "options": [["Product development driven by consumer demand", 1], ["Products created because a new technology became available", 0], ["Removing failed products from shops", 0], ["Discounting products to clear stock", 0]]},
  {"q": "What is crowdfunding?", "options": [["Raising finance from many small contributors via an online platform", 1], ["A government grant for new factories", 0], ["A bank loan secured against machinery", 0], ["Selling shares on the stock exchange", 0]]},
  {"q": "What is the main purpose of branding?", "options": [["To build recognition, trust and customer loyalty", 1], ["To reduce the cost of raw materials", 0], ["To meet safety legislation", 0], ["To speed up the assembly line", 0]]}
 ],
 "numericals": [{"q": "A product costs 12 pounds to manufacture and sells for 30 pounds. What is the profit per unit?", "answer": 18, "tolerance": 0, "unit": "£", "options": [18, 42, 12, 30]}],
 "bank": [
  {"q": "What is the difference between market pull and technology push?", "correct": "Market pull means consumer demand drives development of a product; technology push means a new technology or material inspires a product the market hasn't asked for yet.", "misconception": "Market pull means pulling unsuccessful products off the shelves.", "random_wrong": "Technology push is advertising gadgets on social media.", "why": "Students guess from the everyday meanings of the words; the pair describes two opposite starting points for innovation and is a classic definition question."},
  {"q": "Is a brand just a logo?", "correct": "No — a brand is the whole identity: name, logo, design language, values and reputation, shaping what customers expect from every product the company makes.", "misconception": "A brand is only the logo printed on the product.", "random_wrong": "A brand is the barcode used at the checkout.", "why": "Students reduce branding to graphics; understanding brand as accumulated reputation explains why companies defend it so fiercely."},
  {"q": "Does successful crowdfunding guarantee a product will reach the market?", "correct": "No — crowdfunding provides finance and evidence of demand, but backers carry risk: funded projects can still fail in manufacture, certification or distribution.", "misconception": "Once a product is crowdfunded it is certain to be manufactured and delivered.", "random_wrong": "Crowdfunding is a government scheme that insures new products.", "why": "Students treat funding as the final hurdle, overlooking the engineering and logistical risks between prototype and delivered product."}
 ]
},
"design-technology-a-level-aqa-processes-manufacture-adventure-1": {
 "concepts": [
  {"term": "Injection moulding", "def": "Melting thermoplastic granules and forcing them into a steel mould; very high tooling cost but extremely low unit cost at high volume."},
  {"term": "Vacuum forming", "def": "Heating a thermoplastic sheet until soft, then drawing it over a mould with a vacuum; widely used for packaging and trays."},
  {"term": "Die casting", "def": "Forcing molten metal, often zinc or aluminium alloy, into a reusable steel die to produce accurate, complex parts at volume."},
  {"term": "Sand casting", "def": "Pouring molten metal into an expendable sand mould; suited to one-off and small-batch parts such as machine bases."},
  {"term": "Milling and turning", "def": "Machining processes: milling uses a rotating cutter on a fixed or moving workpiece, while turning rotates the workpiece against a tool on a lathe."},
  {"term": "Extrusion", "def": "Forcing heated material through a shaped die to create continuous lengths of constant cross-section, such as pipes, channels and rails."}
 ],
 "mcqs": [
  {"q": "Which process is best suited to producing millions of identical plastic casings?", "options": [["Injection moulding", 1], ["Sand casting", 0], ["Vacuum forming by hand", 0], ["Turning on a lathe", 0]]},
  {"q": "On which machine is turning carried out?", "options": [["A lathe", 1], ["A milling machine", 0], ["A pillar drill", 0], ["A vacuum former", 0]]},
  {"q": "What does extrusion produce?", "options": [["Continuous lengths with a constant cross-section", 1], ["Hollow blow-moulded bottles", 0], ["Flat sheets pressed into trays", 0], ["Individually carved components", 0]]},
  {"q": "Vacuum forming begins with what?", "options": [["A heated thermoplastic sheet", 1], ["Molten metal in a crucible", 0], ["Plastic granules in a hopper", 0], ["A solid billet of aluminium", 0]]}
 ],
 "numericals": [{"q": "An injection mould tool costs 40000 pounds. Spread over 100000 mouldings, what is the tooling cost per unit?", "answer": 0.4, "tolerance": 0, "unit": "£", "options": [0.4, 4, 0.04, 2.5]}],
 "bank": [
  {"q": "Why is injection moulding rarely used for one-off products?", "correct": "Because the machined steel mould tool is extremely expensive; the cost only becomes economic when spread across thousands or millions of identical mouldings.", "misconception": "Injection moulding is a cheap process whatever the quantity being made.", "random_wrong": "Injection moulding only works with metals, not plastics.", "why": "Students see cheap plastic products and assume the process is cheap; the high fixed tooling cost versus low unit cost trade-off is the key economic concept."},
  {"q": "What is the difference between milling and turning?", "correct": "In turning the workpiece rotates on a lathe against a fixed cutting tool; in milling a rotating cutter removes material from a workpiece held on a table.", "misconception": "Milling and turning are two names for the same machining process.", "random_wrong": "Turning means flipping a part over to machine its underside.", "why": "Both are subtractive machining, so students merge them; remembering what rotates — workpiece (turning) or cutter (milling) — separates them cleanly."},
  {"q": "Can thermosetting plastics be remelted and remoulded like thermoplastics?", "correct": "No — thermosets form irreversible cross-links when cured, so they char rather than melt; only thermoplastics can be reheated and reshaped or recycled by melting.", "misconception": "All plastics can be melted down and remoulded into new products.", "random_wrong": "Thermosets melt at lower temperatures than thermoplastics.", "why": "Students treat 'plastic' as one material; the cross-linking difference determines which processes and recycling routes each class of polymer allows."}
 ]
},
"design-technology-a-level-edexcel-current-legislation-adventure-1": {
 "concepts": [
  {"term": "British Standards Institution (BSI)", "def": "The UK national standards body; its Kitemark shows a product has been independently tested against the relevant British Standard."},
  {"term": "CE and UKCA marking", "def": "Conformity marks declaring a product meets essential safety requirements for sale in the European Union (CE) or Great Britain (UKCA)."},
  {"term": "Consumer Rights Act 2015", "def": "UK law requiring goods to be of satisfactory quality, fit for purpose and as described, giving buyers rights to repair, replacement or refund."},
  {"term": "Patent", "def": "Legal protection for how an invention works, lasting up to 20 years in the UK, granted in exchange for publishing the invention's details."},
  {"term": "Trademark and copyright", "def": "A trademark protects brand identifiers such as names and logos; copyright automatically protects original creative works including drawings and text."},
  {"term": "Registered design", "def": "Protection for the visual appearance of a product — its shape, configuration and decoration — preventing competitors copying its look."}
 ],
 "mcqs": [
  {"q": "What does a patent protect?", "options": [["How an invention works", 1], ["A brand name or logo", 0], ["The visual appearance of a product", 0], ["An original piece of music", 0]]},
  {"q": "What does the BSI Kitemark indicate?", "options": [["Independent testing against a British Standard", 1], ["The product was made in Britain", 0], ["The product is the cheapest available", 0], ["The manufacturer pays UK tax", 0]]},
  {"q": "Under the Consumer Rights Act 2015, goods must be what?", "options": [["Of satisfactory quality, fit for purpose and as described", 1], ["Guaranteed for a minimum of ten years", 0], ["Made entirely from recycled materials", 0], ["Sold only through registered shops", 0]]},
  {"q": "What does a trademark protect?", "options": [["Brand identifiers such as a name or logo", 1], ["The working principle of an invention", 0], ["The text of a novel", 0], ["A manufacturing process", 0]]}
 ],
 "numericals": [{"q": "What is the maximum term of a UK patent, with renewal fees paid?", "answer": 20, "tolerance": 0, "unit": "years", "options": [20, 10, 25, 70]}],
 "bank": [
  {"q": "Does copyright protect how an invention works?", "correct": "No — copyright protects original creative works such as drawings, text and music; the working principle of an invention can only be protected by a patent.", "misconception": "Writing your idea down and copyrighting it stops others manufacturing the product.", "random_wrong": "Copyright expires after one year unless renewed.", "why": "Students treat copyright as a catch-all protection; matching each form of IP to what it protects (function, appearance, brand, creative work) is a standard exam task."},
  {"q": "Is a patent granted automatically when you invent something?", "correct": "No — you must apply, demonstrate the invention is new and inventive, and pay fees; protection lasts up to 20 years. Copyright is the protection that arises automatically.", "misconception": "Inventions are automatically patented the moment they are created.", "random_wrong": "Patents are issued by the shop that first sells the product.", "why": "Students confuse automatic copyright with the formal patent application process, missing the cost, scrutiny and time a patent involves."},
  {"q": "Does a CE or UKCA mark mean a product was independently tested?", "correct": "Not necessarily — CE/UKCA is usually the manufacturer's own declaration of conformity with safety requirements; the BSI Kitemark is the mark showing independent testing.", "misconception": "The CE mark proves an independent laboratory tested the product.", "random_wrong": "CE stands for 'Customer Excellence' awarded by retailers.", "why": "Students assume all marks mean third-party testing; distinguishing self-declared conformity from independent certification is frequently examined."}
 ]
},
"design-technology-a-level-ocr-design-for-manufacture-project-management-adventure-1": {
 "concepts": [
  {"term": "Tolerance", "def": "The allowable variation in a dimension, stated as upper and lower limits; parts within tolerance will fit and function as intended."},
  {"term": "Jigs and fixtures", "def": "Workshop aids that hold work and guide tools so repeated operations, such as drilling, are identical across a batch without marking out each part."},
  {"term": "Quality assurance vs quality control", "def": "Quality assurance is the whole system that prevents defects; quality control is the inspection and testing of outputs against the specification."},
  {"term": "Standardised components", "def": "Bought-in parts such as screws, hinges and fittings made to standard sizes, reducing cost and guaranteeing reliable, interchangeable quality."},
  {"term": "Critical path analysis", "def": "Planning technique mapping dependent tasks to find the longest chain, which sets the minimum possible completion time for a project."},
  {"term": "Scales of production", "def": "One-off, batch, mass and continuous production; the expected volume drives decisions on tooling, jigs, workforce and unit cost."}
 ],
 "mcqs": [
  {"q": "What is a tolerance on an engineering drawing?", "options": [["The allowable variation in a dimension", 1], ["The hardness of the specified material", 0], ["The expected lifespan of the product", 0], ["The cost limit for the component", 0]]},
  {"q": "What is the purpose of a jig?", "options": [["To guide a tool or hold work so repeated operations are identical", 1], ["To measure surface finish", 0], ["To display the project schedule", 0], ["To store finished components safely", 0]]},
  {"q": "Which statement correctly distinguishes QA from QC?", "options": [["QA is the system preventing defects; QC inspects outputs against the specification", 1], ["QA happens after sale; QC happens before design", 0], ["QA tests prototypes; QC writes the design brief", 0], ["QA and QC are identical activities", 0]]},
  {"q": "Why do manufacturers use standardised bought-in components such as hinges?", "options": [["They are cheaper and more reliable than making equivalents in-house", 1], ["They make every product look unique", 0], ["They avoid the need for quality checks", 0], ["They are required for all products by law", 0]]}
 ],
 "numericals": [{"q": "A dimension is 25 mm with a tolerance of plus or minus 0.2 mm. What is the minimum acceptable size?", "answer": 24.8, "tolerance": 0, "unit": "mm", "options": [24.8, 25.2, 24.5, 23]}],
 "bank": [
  {"q": "Why do manufacturers use jigs and fixtures?", "correct": "They locate the work and guide tools so each repeated operation is identical, giving batch accuracy and speed without marking out every individual part.", "misconception": "Jigs are only needed for one-off craft products made by hand.", "random_wrong": "A jig is the rotating chuck that grips work in a lathe.", "why": "Students associate workshop aids with hand craft, but jigs matter most in batch production, where repeatability and time saving multiply across the run."},
  {"q": "Does design for manufacture mean making a product as advanced as possible?", "correct": "No — it means simplifying for production: fewer parts, standard components, processes matched to the production scale, reducing cost, time and assembly errors.", "misconception": "DFM means packing in advanced features to impress customers.", "random_wrong": "DFM is a law requiring products to be made in the country of sale.", "why": "Students read 'for manufacture' as 'high-tech'; the principle is the opposite — strip complexity out so manufacture becomes easier and cheaper."},
  {"q": "On a Gantt chart, what do overlapping bars show?", "correct": "Tasks scheduled to run concurrently — in parallel — which shortens the overall project compared with doing every task in sequence.", "misconception": "Tasks on a Gantt chart must always run one after another, so bars never overlap.", "random_wrong": "Overlapping bars show tasks that have gone over budget.", "why": "Students assume planning is purely sequential; spotting which tasks can run in parallel is precisely how project managers compress timescales."}
 ]
},
"design-technology-gcse-cambridge-igcse-mechanisms-adventure-1": {
 "concepts": [
  {"term": "Lever", "def": "A rigid bar pivoting about a fulcrum; the positions of effort, load and fulcrum define first, second and third class levers."},
  {"term": "Gear ratio", "def": "The ratio of teeth on the driven gear to teeth on the driver gear, determining how rotational speed and torque change across the pair."},
  {"term": "Pulley", "def": "A grooved wheel carrying a rope or belt; single pulleys change the direction of a force, and pulley systems reduce the effort needed."},
  {"term": "Cam and follower", "def": "A rotating cam pushes a follower up and down, converting rotary motion into reciprocating motion, with the cam profile setting the movement pattern."},
  {"term": "Crank and slider", "def": "A mechanism converting rotary motion to reciprocating motion or back, as in an engine where the piston drives the crankshaft."},
  {"term": "Mechanical advantage", "def": "The ratio of load to effort; a mechanical advantage greater than one means the mechanism multiplies the input force."}
 ],
 "mcqs": [
  {"q": "A 20-tooth driver gear meshes with a 60-tooth driven gear. What happens to the output speed?", "options": [["It is reduced to one third of the input speed", 1], ["It triples", 0], ["It stays the same", 0], ["It stops completely", 0]]},
  {"q": "A wheelbarrow, with the load between the wheel and the handles, is which class of lever?", "options": [["Second class", 1], ["First class", 0], ["Third class", 0], ["It is not a lever", 0]]},
  {"q": "A crank and slider converts which types of motion?", "options": [["Rotary to reciprocating motion", 1], ["Linear to oscillating motion", 0], ["Reciprocating to oscillating motion", 0], ["Rotary to rotary at right angles", 0]]},
  {"q": "Two meshed spur gears rotate in which directions?", "options": [["Opposite directions", 1], ["The same direction", 0], ["Random directions", 0], ["They cannot rotate when meshed", 0]]}
 ],
 "numericals": [{"q": "A lever moves a 300 N load with an effort of 60 N. What is its mechanical advantage?", "answer": 5, "tolerance": 0, "unit": "ratio", "options": [5, 0.2, 240, 360]}],
 "bank": [
  {"q": "If a machine gives a mechanical advantage of 5, do you get force for nothing?", "correct": "No — the force is multiplied by 5 but the effort must move roughly five times further than the load; work output never exceeds work input, and friction wastes some.", "misconception": "Machines multiply force without any trade-off, giving free extra work.", "random_wrong": "Mechanical advantage means the machine uses less electricity.", "why": "Students focus on the force gain and forget the distance trade-off; conservation of energy means mechanisms trade distance for force, never create work."},
  {"q": "Does a larger driven gear make the output spin faster?", "correct": "No — a driven gear larger than the driver turns more slowly, by the ratio of the teeth, but delivers more torque; a smaller driven gear spins faster with less torque.", "misconception": "Bigger gears always rotate faster because they are more powerful.", "random_wrong": "Gear size only affects how loudly the gearbox runs.", "why": "Students link size with speed; the inverse speed-torque relationship set by tooth ratio is the core idea behind every gear calculation."},
  {"q": "In which class of lever is the load between the fulcrum and the effort?", "correct": "A second-class lever, such as a wheelbarrow; first-class levers have the fulcrum in the middle, and third-class levers have the effort in the middle.", "misconception": "A wheelbarrow is a first-class lever because it is the most common example.", "random_wrong": "Lever classes are decided by the material the lever is made from.", "why": "Students rank classes by familiarity instead of arrangement; identifying which element sits in the middle is the reliable way to classify any lever."}
 ]
}
}

for stem, d in DATA.items():
    sp = os.path.join(SPECS, stem + '.json')
    s = json.load(open(sp))
    if 'mcqs_expanded' not in s:
        print('SKIP (already repaired):', stem); continue
    s['concepts'] = d['concepts']
    s['mcqs'] = d['mcqs']
    s['numericals'] = d['numericals']
    del s['mcqs_expanded']
    with open(sp, 'w') as f:
        json.dump(s, f, ensure_ascii=False, indent=1, separators=(',', ': '))
    json.load(open(sp))
    bp = os.path.join(BANKS, stem + '.json')
    b = json.load(open(bp))
    b['items'] = d['bank']
    b.pop('derived_items', None)
    with open(bp, 'w') as f:
        json.dump(b, f, ensure_ascii=False, indent=1, separators=(',', ': '))
    json.load(open(bp))
    print('OK:', stem)
print('chunk2 done')
