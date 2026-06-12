#!/usr/bin/env python3
# Chunk 3: design-technology GCSE true mismatches (7 stems)
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPECS = os.path.join(ROOT, 'adventures', '_specs')
BANKS = os.path.join(ROOT, 'evaluate', 'misconception-banks')

DATA = {
"design-technology-gcse-aqa-new-emerging-technologies-adventure-1": {
 "concepts": [
  {"term": "Automation and robotics", "def": "Using computer-controlled machines and robots in production for consistent quality and round-the-clock output, while changing the jobs humans do."},
  {"term": "Internet of Things", "def": "Everyday products with embedded connectivity that send and receive data over the internet, such as smart thermostats and fitness trackers."},
  {"term": "Crowdfunding", "def": "Raising money for a new product from many small backers through online platforms, often before any manufacturing begins."},
  {"term": "Just-in-time and lean manufacturing", "def": "Stock-control approaches where parts arrive only as needed, cutting storage costs and waste but relying on dependable suppliers."},
  {"term": "Planned obsolescence", "def": "Deliberately designing a product to have a limited useful life so customers replace it sooner, raising sales but increasing waste."},
  {"term": "Circular economy", "def": "An economic model that keeps materials in use through repair, reuse, remanufacture and recycling instead of the take-make-dispose pattern."}
 ],
 "mcqs": [
  {"q": "Which product is the best example of the Internet of Things?", "options": [["A thermostat controlled from a phone over the internet", 1], ["A battery-powered torch", 0], ["A wooden chair", 0], ["A hand-cranked whisk", 0]]},
  {"q": "What is planned obsolescence?", "options": [["Designing a product to have a deliberately limited useful life", 1], ["Recycling a product at end of life", 0], ["Testing a product until it breaks", 0], ["Withdrawing a product for safety reasons", 0]]},
  {"q": "Which is a key benefit of automation in manufacturing?", "options": [["Consistent quality and continuous operation", 1], ["It removes the need for product design", 0], ["It guarantees products will sell", 0], ["It makes raw materials free", 0]]},
  {"q": "What is the aim of a circular economy?", "options": [["Keeping materials in use through reuse, repair and recycling", 1], ["Selling products in circular packaging", 0], ["Manufacturing only round products", 0], ["Increasing landfill capacity", 0]]}
 ],
 "numericals": [],
 "bank": [
  {"q": "Does automation always destroy jobs overall?", "correct": "It displaces some manufacturing roles but also creates jobs in programming, maintenance, design and logistics; the overall effect varies by industry and over time.", "misconception": "Automation removes the need for any human workers in a factory.", "random_wrong": "Automation is banned in UK factories for safety reasons.", "why": "Students see robots replacing people one-for-one; balanced exam answers weigh job displacement against the new skilled roles automation creates."},
  {"q": "What makes a product part of the Internet of Things?", "correct": "Embedded sensors and connectivity that let it send and receive data over the internet, like a thermostat you control remotely from a phone.", "misconception": "Any product containing electronics counts as the Internet of Things.", "random_wrong": "IoT products must include a built-in television screen.", "why": "Students equate 'electronic' with 'connected'; the defining feature is internet communication of data, not merely containing circuitry."},
  {"q": "Is planned obsolescence the same as a product naturally wearing out?", "correct": "No — planned obsolescence is a deliberate design decision to limit useful life so customers buy replacements; natural wear is unavoidable degradation over time.", "misconception": "Planned obsolescence just means products eventually wear out by accident.", "random_wrong": "Planned obsolescence is the recycling stage of a product's life cycle.", "why": "The word 'planned' is the point students miss: it is an intentional commercial strategy with ethical and environmental consequences worth evaluating."}
 ]
},
"design-technology-gcse-aqa-specialist-technical-principles-adventure-1": {
 "concepts": [
  {"term": "Material selection", "def": "Choosing a material by matching its properties, cost, availability and aesthetics to the functional needs of the product."},
  {"term": "Forces and stresses", "def": "Loads acting on materials: tension stretches, compression squashes, bending combines both, torsion twists and shear slides layers."},
  {"term": "Reinforcement and stiffening", "def": "Techniques such as lamination, folding, ribs and webbing that make materials resist forces better without adding much weight."},
  {"term": "Stock forms and standard components", "def": "Materials are bought in standard forms such as sheet, rod and tube, and joined with standard components like screws, hinges and rivets."},
  {"term": "Scales of production", "def": "One-off, batch, mass and continuous production; the planned quantity determines processes, tooling and unit cost."},
  {"term": "Surface treatments and finishes", "def": "Coatings such as paint, varnish, plating and powder coating applied to protect materials from wear or corrosion and improve appearance."}
 ],
 "mcqs": [
  {"q": "Which force twists a material?", "options": [["Torsion", 1], ["Tension", 0], ["Compression", 0], ["Shear", 0]]},
  {"q": "Why are ribs moulded into plastic products?", "options": [["To increase stiffness without adding much weight", 1], ["To make the product heavier", 0], ["To trap air for insulation", 0], ["Purely for decoration", 0]]},
  {"q": "Why do designers use standard components such as screws and hinges?", "options": [["They are cheaper and more reliable than making custom equivalents", 1], ["They make products harder to repair", 0], ["They are required on every product by law", 0], ["They eliminate the need for quality control", 0]]},
  {"q": "Which scale of production runs 24 hours a day making one product, such as paper?", "options": [["Continuous production", 1], ["One-off production", 0], ["Batch production", 0], ["Prototype production", 0]]}
 ],
 "numericals": [],
 "bank": [
  {"q": "What is the difference between hardness and toughness?", "correct": "Hardness is resistance to scratching and indentation; toughness is the ability to absorb impact without fracturing. Hard materials are often brittle rather than tough.", "misconception": "A hard material is automatically a tough material.", "random_wrong": "Toughness measures how well a material resists rusting.", "why": "Everyday language treats hard and tough as synonyms; in materials science they are distinct properties, and glass — hard yet brittle — shows why."},
  {"q": "Why are ribs added to plastic mouldings?", "correct": "They increase stiffness and strength using very little extra material, keeping the moulding thin, light and quick to produce.", "misconception": "Ribs are added purely as decoration on the hidden side of products.", "random_wrong": "Ribs are added to make the plastic easier to melt down for recycling.", "why": "Students rarely connect geometry with stiffness; ribbing shows that shape, not just material choice, determines how a part resists bending."},
  {"q": "What is the difference between tension and compression?", "correct": "Tension is a pulling force that stretches a material; compression is a pushing force that squashes it. A bent beam experiences both at once on opposite faces.", "misconception": "Tension and compression are the same force given different names in different materials.", "random_wrong": "Tension only occurs in metal components.", "why": "Students memorise force names without direction; linking pull-stretch and push-squash, and spotting both in bending, underpins all structural questions."}
 ]
},
"design-technology-gcse-cambridge-igcse-graphic-communication-adventure-1": {
 "concepts": [
  {"term": "Orthographic projection", "def": "Related 2D views of an object — front, side and plan — drawn to scale with dimensions, used as working drawings for manufacture."},
  {"term": "Isometric projection", "def": "A 3D drawing method with receding edges at 30 degrees to the horizontal and vertical lines kept vertical, all drawn to the same scale."},
  {"term": "Perspective drawing", "def": "Realistic 3D drawing where receding lines converge to one or two vanishing points, making distant parts appear smaller."},
  {"term": "Rendering", "def": "Adding tone, texture, shadow and highlights to a drawing to communicate the form, surface and material of a design."},
  {"term": "Scale", "def": "The ratio between drawing size and real size, such as 1:2 for half size, allowing large objects to fit on a sheet accurately."},
  {"term": "CAD drawing", "def": "Producing 2D and 3D drawings with computer software, allowing fast editing, precise dimensioning and easy sharing with manufacturers."}
 ],
 "mcqs": [
  {"q": "In isometric projection, receding lines are drawn at what angle to the horizontal?", "options": [["30 degrees", 1], ["45 degrees", 0], ["60 degrees", 0], ["90 degrees", 0]]},
  {"q": "What does an orthographic drawing show?", "options": [["Related 2D views such as front, side and plan", 1], ["A single 3D pictorial view", 0], ["Only the circuit diagram", 0], ["The product rendered in colour", 0]]},
  {"q": "Two-point perspective uses how many vanishing points?", "options": [["Two", 1], ["One", 0], ["Three", 0], ["None", 0]]},
  {"q": "What is the purpose of rendering a sketch?", "options": [["To show form and material using tone and texture", 1], ["To add dimensions for manufacture", 0], ["To calculate the cost of materials", 0], ["To remove construction lines automatically", 0]]}
 ],
 "numericals": [{"q": "A drawing at a scale of 1:5 shows a part 40 mm long. How long is the real part?", "answer": 200, "tolerance": 0, "unit": "mm", "options": [200, 8, 45, 100]}],
 "bank": [
  {"q": "What is the difference between isometric and perspective drawing?", "correct": "Isometric keeps receding lines parallel at 30 degrees with no convergence; perspective makes receding lines converge to vanishing points so distant parts look smaller.", "misconception": "Isometric drawings have vanishing points just like perspective drawings.", "random_wrong": "Isometric drawing can only be done freehand without instruments.", "why": "Both methods show three faces of an object, so students merge them; the presence or absence of vanishing points is the defining difference."},
  {"q": "In orthographic projection, what is the plan view?", "correct": "The view of the object seen from directly above, drawn in projection with the front and side views.", "misconception": "The plan view is the front face of the product because it is planned first.", "random_wrong": "The plan view is the project time plan attached to the drawing.", "why": "The word 'plan' misleads students; anchoring it as the bird's-eye view from above prevents mislabelling working drawings."},
  {"q": "Does a 1:2 scale drawing show the object larger or smaller than real life?", "correct": "Smaller — 1:2 means one unit on the drawing represents two units in reality, so the drawing is half size; 2:1 would be twice full size.", "misconception": "A 1:2 drawing is twice as big as the real object.", "random_wrong": "1:2 means two separate copies of the drawing are required.", "why": "Students read the ratio backwards; remembering drawing:real as the order of the numbers resolves every scale question."}
 ]
},
"design-technology-gcse-cambridge-igcse-structures-adventure-1": {
 "concepts": [
  {"term": "Tension and compression", "def": "Tension is a pulling force that stretches a member; compression is a pushing force that squashes it; most structures carry both."},
  {"term": "Strut and tie", "def": "A strut is a structural member that resists compression, while a tie resists tension, as in the diagonal members of bridges and roofs."},
  {"term": "Triangulation", "def": "Adding diagonal members to frames to form triangles, the only polygon that cannot change shape without changing the length of a side."},
  {"term": "Beam", "def": "A horizontal member spanning a gap; under a central load a simply supported beam bends, with its top in compression and bottom in tension."},
  {"term": "Static and dynamic loads", "def": "Static loads are constant, like a building's own weight; dynamic loads change or move, like wind, traffic or people walking."},
  {"term": "Stability", "def": "A structure's resistance to toppling, improved by a wide base, a low centre of gravity and firm anchorage to the ground."}
 ],
 "mcqs": [
  {"q": "Why does triangulation make a frame rigid?", "options": [["A triangle cannot change shape without changing a side length", 1], ["Triangles contain more material than squares", 0], ["Triangles weigh less than any other shape", 0], ["Triangles look more attractive", 0]]},
  {"q": "Which structural member is designed to resist tension?", "options": [["A tie", 1], ["A strut", 0], ["A foundation", 0], ["A gusset plate", 0]]},
  {"q": "In a simply supported beam loaded at its centre, where is the compression?", "options": [["Along the top surface", 1], ["Along the bottom surface", 0], ["Only at the supports", 0], ["Evenly through the whole beam", 0]]},
  {"q": "Which change makes a free-standing structure more stable?", "options": [["Lowering its centre of gravity and widening its base", 1], ["Raising its centre of gravity", 0], ["Narrowing its base", 0], ["Making it taller without anchorage", 0]]}
 ],
 "numericals": [{"q": "A 600 N load is shared equally by the three legs of a stool. What force does each leg carry?", "answer": 200, "tolerance": 0, "unit": "N", "options": [200, 600, 300, 1800]}],
 "bank": [
  {"q": "Why are triangles used in structures instead of rectangles?", "correct": "A triangle cannot change shape without changing the length of a side, so it is inherently rigid; a rectangle can rack sideways into a parallelogram unless braced.", "misconception": "Triangles are stronger because they contain more material than other shapes.", "random_wrong": "Triangles are used because they are the cheapest shape to paint.", "why": "Students attribute strength to material quantity; the insight is geometric rigidity, which is why one diagonal brace stabilises a whole rectangular frame."},
  {"q": "Where do tension and compression occur in a loaded beam?", "correct": "In a simply supported beam bending under a central load, the top surface is in compression and the bottom surface is in tension, with a neutral axis between.", "misconception": "The whole beam is in tension when a load is applied.", "random_wrong": "Tension only occurs at the two supports of the beam.", "why": "Students assign one force to the whole member; seeing bending as compression and tension on opposite faces explains why beams fail from the bottom in tension."},
  {"q": "What is the difference between a strut and a tie?", "correct": "A strut carries compression and must resist buckling; a tie carries tension and can even be a cable, since pulling forces keep it taut.", "misconception": "Strut and tie are interchangeable names for any structural member.", "random_wrong": "A strut is the horizontal floor panel of a structure.", "why": "Naming members by the force they carry is the foundation of structural analysis; mixing them up makes bridge and roof truss questions impossible."}
 ]
},
"design-technology-gcse-ocr-identifying-requirements-adventure-1": {
 "concepts": [
  {"term": "Design context", "def": "The situation and environment surrounding a design problem, explored first so the real needs and constraints are understood before designing."},
  {"term": "Stakeholders", "def": "Everyone affected by a design — users, clients, manufacturers and retailers — whose differing needs and wants must be identified and balanced."},
  {"term": "User-centred design", "def": "An approach that places the end user's needs, capabilities and experiences at the heart of every design decision."},
  {"term": "Primary research", "def": "First-hand data gathered by the designer, such as interviews, questionnaires, measurements and observation of users in context."},
  {"term": "Secondary research", "def": "Information from existing published sources such as books, websites, standards and market reports, used to supplement first-hand findings."},
  {"term": "Design brief and specification", "def": "The brief states the problem and outline requirements; the specification turns research findings into measurable criteria the design must meet."}
 ],
 "mcqs": [
  {"q": "Which of these is primary research?", "options": [["Interviewing users about a product", 1], ["Reading a market report online", 0], ["Quoting a textbook", 0], ["Copying a competitor's website", 0]]},
  {"q": "Who counts as a stakeholder in a design project?", "options": [["Anyone affected by the product, such as users, clients and retailers", 1], ["Only the person who pays for the design", 0], ["Only the design team", 0], ["Only the factory workers", 0]]},
  {"q": "What is user-centred design?", "options": [["Placing the end user's needs at the heart of every design decision", 1], ["Letting users manufacture the product themselves", 0], ["Designing only products users already own", 0], ["Asking users to write the final specification", 0]]},
  {"q": "Why explore the design context before writing a brief?", "options": [["To understand the real needs and constraints of the situation", 1], ["To choose the product's final colour", 0], ["To calculate the retail price", 0], ["To order materials early", 0]]}
 ],
 "numericals": [],
 "bank": [
  {"q": "Are the client and the user always the same person?", "correct": "No — the client commissions and often pays for the design, while users are the people who actually interact with the product; their needs can differ or even conflict.", "misconception": "Whoever pays for the design is automatically the user.", "random_wrong": "The user is the person who manufactures the product.", "why": "Students collapse all stakeholders into one figure; separating client, user and wider stakeholders is what makes requirement analysis meaningful."},
  {"q": "What is the difference between primary and secondary research?", "correct": "Primary research is first-hand data the designer collects, such as interviews and observation; secondary research uses existing published sources like reports and websites.", "misconception": "Primary research means the most important research, whatever its source.", "random_wrong": "Secondary research is any research done by a second member of the team.", "why": "Students interpret primary/secondary as a ranking of importance rather than a distinction between first-hand and existing data."},
  {"q": "Is 'the product must look nice' an acceptable specification point?", "correct": "No — specification criteria should be measurable and testable, such as 'must weigh under 500 g' or 'must cost under 15 pounds to manufacture'.", "misconception": "Vague aspirations are fine in a specification as long as they sound positive.", "random_wrong": "A specification may only list the materials to be used.", "why": "Students write wish-lists instead of testable criteria; measurable points are what make evaluation against the specification possible later."}
 ]
},
"design-technology-gcse-ocr-implications-of-wider-issues-adventure-1": {
 "concepts": [
  {"term": "The 6 Rs", "def": "Reduce, reuse, recycle, repair, rethink and refuse: a framework for cutting the environmental impact of products and consumption."},
  {"term": "Life cycle assessment", "def": "Evaluating a product's environmental impact at every stage: raw material extraction, manufacture, transport, use and end-of-life disposal."},
  {"term": "Carbon footprint", "def": "The total greenhouse gas emissions associated with a product or activity, often dominated by energy used in manufacture and use."},
  {"term": "Fairtrade", "def": "A certification movement ensuring producers in developing countries receive fair prices and decent working conditions for their goods."},
  {"term": "Planned obsolescence", "def": "Designing products with deliberately limited lifespans to drive repeat purchases, raising profits but increasing waste and resource use."},
  {"term": "Social and moral impacts", "def": "Wider consequences of design decisions, such as automation displacing jobs and offshore manufacture raising questions about working conditions."}
 ],
 "mcqs": [
  {"q": "What does a life cycle assessment evaluate?", "options": [["A product's environmental impact across its whole life", 1], ["How long a battery lasts on one charge", 0], ["The profitability of a product line", 0], ["The lifespan of the design team", 0]]},
  {"q": "In the 6 Rs, what does 'refuse' mean?", "options": [["Choosing not to buy or use unsustainable products or materials", 1], ["Throwing waste into landfill", 0], ["Returning faulty goods for a refund", 0], ["Burning waste for energy", 0]]},
  {"q": "What does Fairtrade certification primarily ensure?", "options": [["Fair prices and conditions for producers", 1], ["Zero packaging on products", 0], ["The lowest possible retail price", 0], ["Products are made by robots", 0]]},
  {"q": "What is a product's carbon footprint?", "options": [["The total greenhouse gas emissions associated with it", 1], ["The floor space its factory occupies", 0], ["The amount of carbon fibre it contains", 0], ["The black marks it leaves on surfaces", 0]]}
 ],
 "numericals": [],
 "bank": [
  {"q": "Are 'reuse' and 'recycle' the same thing in the 6 Rs?", "correct": "No — reuse means using an item again as it is or for a new purpose; recycling reprocesses the material into new products, which itself consumes energy.", "misconception": "Reusing and recycling are identical ways of dealing with waste.", "random_wrong": "Reuse means returning the product to the shop for resale.", "why": "Students merge the Rs; the hierarchy matters because reuse avoids the energy cost of reprocessing that recycling requires."},
  {"q": "Does a product's environmental impact occur only when it is thrown away?", "correct": "No — life cycle assessment shows impacts at every stage: extraction, manufacture, transport, use and disposal; for appliances the use phase often dominates.", "misconception": "Products only harm the environment when they end up in landfill.", "random_wrong": "Environmental impact is measured purely by the size of the packaging.", "why": "Students fixate on visible waste; LCA thinking reveals hidden impacts like energy in use, which often outweigh disposal."},
  {"q": "Does Fairtrade certification mean a product is environmentally friendly?", "correct": "Not necessarily — Fairtrade is primarily about fair prices and decent conditions for producers; it includes some standards but its core aim is social and economic.", "misconception": "A Fairtrade logo guarantees the product caused no environmental damage.", "random_wrong": "Fairtrade means the product was manufactured in the United Kingdom.", "why": "Students lump all ethical labels together; distinguishing social-justice aims from environmental ones earns evaluation marks."}
 ]
},
"design-technology-gcse-ocr-learning-from-existing-products-adventure-1": {
 "concepts": [
  {"term": "Product analysis", "def": "Systematically examining an existing product to judge its strengths and weaknesses, often using criteria such as ACCESS FM."},
  {"term": "ACCESS FM", "def": "An analysis checklist standing for Aesthetics, Cost, Customer, Environment, Size, Safety, Function and Materials."},
  {"term": "Disassembly", "def": "Taking a product apart to study its internal components, materials, fixings and the methods used to manufacture and assemble it."},
  {"term": "Market analysis", "def": "Comparing competing products on features, price and quality to identify gaps and opportunities a new design could exploit."},
  {"term": "Ergonomic evaluation", "def": "Assessing how comfortably and easily people can use an existing product, drawing on anthropometric data about human body sizes."},
  {"term": "Intellectual property awareness", "def": "Recognising that existing products may be protected by patents, trademarks or registered designs, so learning from them must not become copying."}
 ],
 "mcqs": [
  {"q": "In ACCESS FM, what does the first 'A' stand for?", "options": [["Aesthetics", 1], ["Assembly", 0], ["Accuracy", 0], ["Affordability", 0]]},
  {"q": "Why might a designer disassemble an existing product?", "options": [["To study its components, materials and assembly methods", 1], ["To dispose of it in landfill", 0], ["To make it lighter to post", 0], ["To hide its brand name", 0]]},
  {"q": "When learning from competitors' products, designers must avoid what?", "options": [["Infringing patents and registered designs by copying", 1], ["Looking at more than one product", 0], ["Writing down their findings", 0], ["Comparing prices", 0]]},
  {"q": "What does an ergonomic evaluation of a product assess?", "options": [["How comfortably and easily people can use it", 1], ["How much profit it generates", 0], ["How recyclable its packaging is", 0], ["How quickly it can be advertised", 0]]}
 ],
 "numericals": [],
 "bank": [
  {"q": "Is analysing existing products the same as copying them?", "correct": "No — analysis identifies strengths, weaknesses and gaps to inform your own original design; directly copying may infringe patents, trademarks or registered designs.", "misconception": "Designers are free to copy any product that is already on the market.", "random_wrong": "Product analysis is only legal on products more than 50 years old.", "why": "Students blur inspiration and imitation; intellectual property law is exactly the boundary between learning from a product and stealing its design."},
  {"q": "What does ACCESS FM stand for?", "correct": "Aesthetics, Cost, Customer, Environment, Size, Safety, Function and Materials — a checklist of criteria for analysing a product.", "misconception": "ACCESS FM is a step-by-step method for assembling flat-pack products.", "random_wrong": "ACCESS FM is a British manufacturing safety standard.", "why": "Students remember the acronym but not the categories; without the eight criteria the analysis collapses into vague description."},
  {"q": "Why disassemble a product during analysis rather than just look at it?", "correct": "Disassembly reveals internal components, material choices, fixings and assembly methods that are invisible from outside, showing how the product was engineered and made.", "misconception": "Disassembly is only ever done to repair products that have broken.", "random_wrong": "Disassembly is legally required before any product can be resold.", "why": "Students stop at surface features; taking products apart is how designers learn real manufacturing and assembly decisions, not just styling."}
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
print('chunk3 done')
