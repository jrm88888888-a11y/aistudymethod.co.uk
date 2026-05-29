import json, re, sys
from collections import defaultdict, OrderedDict

PATH = '/sessions/awesome-busy-dirac/mnt/AI Study Method'

def slugify(label):
    return label.lower().replace(' ', '-').replace('&', '')

# Canonical taxonomy per combo - curriculum-aligned topic labels
SUBTOPICS = OrderedDict([
    # PHYSICS
    ('physics-gcse', ['Forces','Motion','Energy','Waves','Light','Electricity','Magnetism','Particle Model','Atomic Structure & Radiation','Space','Exam Practice','Exam Prep & AI']),
    ('physics-a-level', ['Mechanics','Materials','Waves & Optics','Electricity','Further Mechanics & SHM','Thermal Physics','Fields','Nuclear & Particle Physics','Quantum Physics','Astrophysics','Exam Practice','Exam Prep & AI']),
    ('physics-ibdp', ['Exam Prep & AI']),
    ('physics-ks3', ['Forces & Motion','Energy','Electricity & Magnetism','Waves & Sound','Light','Earth & Space','Subject Humour']),
    # CHEMISTRY
    ('chemistry-gcse', ['Atomic Structure','Bonding','Quantitative Chemistry','Chemical Changes','Energy Changes','Rate & Equilibrium','Organic Chemistry','Chemical Analysis','Atmosphere & Earth','Using Resources','Exam Practice','Exam Prep & AI']),
    ('chemistry-a-level', ['Atomic Structure & Bonding','Energetics & Entropy','Kinetics','Equilibrium','Redox & Electrochemistry','Organic Chemistry','Transition Metals','Spectroscopy & Analysis','Exam Practice','Exam Prep & AI']),
    ('chemistry-ibdp', ['Exam Prep & AI']),
    ('chemistry-ks3', ['States of Matter','Elements & Compounds','Chemical Reactions','Metals & Materials','Earth & Atmosphere','Subject Humour']),
    # BIOLOGY
    ('biology-gcse', ['Cell Biology','Organisation','Infection & Response','Bioenergetics','Homeostasis & Response','Inheritance & Evolution','Ecology','Exam Practice','Exam Prep & AI']),
    ('biology-a-level', ['Biological Molecules','Cells & Transport','Organisms & Environment','Energy & Respiration','Nervous Coordination','Genetics & Gene Expression','Ecology & Populations','Exam Practice','Exam Prep & AI']),
    ('biology-ibdp', ['Exam Prep & AI']),
    ('biology-ks3', ['Cells & Organisation','Body Systems','Photosynthesis & Respiration','Inheritance','Ecology & Environment','Subject Humour']),
    # MATHS
    ('maths-gcse', ['Number','Algebra','Ratio & Proportion','Geometry & Trigonometry','Probability','Statistics','Functions & Graphs','Exam Practice','Exam Prep & AI']),
    ('maths-a-level', ['Pure - Algebra & Proof','Pure - Calculus','Pure - Trigonometry','Pure - Vectors','Pure - Sequences & Series','Statistics','Mechanics','Exam Practice','Exam Prep & AI']),
    ('maths-ibdp', ['Exam Prep & AI']),
    ('maths-ks3', ['Number & Calculation','Algebra','Geometry & Measure','Ratio & Probability','Statistics','Subject Humour']),
    # HISTORY
    ('history-a-level', ['Ancient & Medieval','Tudor & Renaissance','Early Modern & Industrial','Empire & Decolonisation','World Wars','Cold War & 20th Century','Russia & China','USA & Civil Rights','Historiography','Exam Practice','Exam Prep & AI']),
    ('history-gcse', ['Medieval & Early Modern','Causes of War','World Wars','Cold War & 20th Century','Civil Rights & Equality','Weimar & Nazi Germany','Revolutions','Source Analysis','Exam Practice','Exam Prep & AI']),
    ('history-ibdp', ['Exam Prep & AI']),
    ('history-ks3', ['Medieval Britain','Tudor & Stuart','Empire & Slavery','Industrial Britain','20th Century & War','Subject Humour']),
    # PSYCHOLOGY
    ('psychology-a-level', ['Social Influence','Memory','Attachment','Psychopathology','Approaches','Biopsychology','Research Methods','Issues & Debates','Forensic Psychology','Schizophrenia & Depression','Addiction','Exam Practice','Exam Prep & AI']),
    ('psychology-gcse', ['Development','Memory & Perception','Social Influence','Psychological Problems','Research Methods','Brain & Neuropsychology','Exam Prep & AI']),
    ('psychology-ibdp', ['Exam Prep & AI']),
    ('psychology-ks3', ['Brain & Behaviour','Memory & Learning','Emotion & Perception','Social Psychology','Development & Attachment','Research & Experiments']),
    # ECONOMICS
    ('economics-a-level', ['Microeconomics','Macroeconomics','Market Failure','Government Intervention','Labour Markets','International Trade & Globalisation','Development Economics','Exam Practice','Exam Prep & AI']),
    ('economics-gcse', ['How Markets Work','How the Economy Works','Business Economics','Global Economics','Exam Practice','Exam Prep & AI']),
    ('economics-ibdp', ['Exam Prep & AI']),
    ('economics-ks3', ['Markets & Trade','Money & Banking','Government & Tax','Global Economy']),
    # GEOGRAPHY
    ('geography-a-level', ['Water & Carbon Cycles','Coastal Systems','Glacial Systems','Hazards','Global Systems & Globalisation','Contemporary Urban Environments','Changing Places & Development','Exam Practice','Exam Prep & AI']),
    ('geography-gcse', ['Tectonic Hazards','Weather & Climate','Ecosystems','UK Physical Landscapes','Rivers & Coasts','Urban Issues & Megacities','Economic Development','Resource Management','Fieldwork','Exam Practice','Exam Prep & AI']),
    ('geography-ibdp', ['Exam Prep & AI']),
    ('geography-ks3', ['Tectonics & Hazards','Rivers & Coasts','Weather & Climate','Population & Settlement','Ecosystems & Environment','Subject Humour']),
    # COMPUTER SCIENCE
    ('computer-science-gcse', ['Algorithms','Programming','Data Representation','Computer Systems','Computer Networks','Cyber Security','Databases','Impacts of Technology','Exam Prep & AI']),
    ('computer-science-a-level', ['Algorithms & Data Structures','Programming & Paradigms','Theory of Computation','Computer Systems','Communication & Networking','Databases','AI & Machine Learning','Issues & Ethics','Exam Prep & AI']),
    ('computer-science-ibdp', ['Exam Prep & AI']),
    ('computer-science-ks3', ['Algorithms & Flowcharts','Programming Basics','Data & Binary','Networks & Security','Computational Thinking','Subject Humour']),
    # ENGLISH LANGUAGE
    ('english-language-a-level', ['Language & Power','Language & Gender','Language Change','Sociolinguistics','Child Language Acquisition','Discourse Analysis','Exam Prep & AI']),
    ('english-language-gcse', ['Reading & Comprehension','Writing - Descriptive & Narrative','Writing - Transactional','Language Analysis','Spoken Language','Exam Prep & AI']),
    ('english-language-ks3', ['Reading & Genre','Writing & Persuasion','Spoken Language','Language Variation','Media & Texts']),
    # ENGLISH LITERATURE
    ('english-literature-a-level', ['Poetry','Drama & Shakespeare','Prose','Comparative Study','Critical Approaches','Unseen Texts','Exam Practice','Exam Prep & AI']),
    ('english-literature-gcse', ['Shakespeare','19th Century Novel','Modern Texts','Poetry','Unseen Poetry','Literary Terms','Vocabulary Games','Exam Prep & AI']),
    ('english-literature-ibdp', ['Exam Prep & AI']),
    ('english-literature-ks3', ['Character & Narrator','Theme & Setting','Plot & Structure','Language & Metaphor','Genre & Archetype','Subject Humour']),
    # SOCIOLOGY
    ('sociology-a-level', ['Education','Families & Households','Crime & Deviance','Beliefs in Society','Stratification & Differentiation','Methods in Context','Theory & Methods']),
    ('sociology-gcse', ['Sociological Theories','Education','Family','Crime & Deviance','Media','Research Methods']),
    ('sociology-ks3', ['Family & Identity','School & Education','Class & Poverty','Crime & Society','Media & Religion']),
    # RELIGIOUS STUDIES
    ('religious-studies-a-level', ['Philosophy of Religion','Ethics','Study of Religion','Exam Prep & AI']),
    ('religious-studies-gcse', ['Christianity - Beliefs & Practices','Islam - Beliefs & Practices','Arguments for God','Ethics & Relationships','Crime & Punishment','Religion & Society','Exam Prep & AI']),
    ('religious-studies-ibdp', ['Exam Prep & AI']),
    ('religious-studies-ks3', ['World Religions','Sacred Texts & Practices','Ethics & Morality','Philosophy & Big Questions','Subject Humour']),
    # BUSINESS STUDIES
    ('business-studies-a-level', ['Business Strategy','Marketing','Finance & Accounting','Operations Management','Human Resources','External Environment','Global Business','Exam Prep & AI']),
    ('business-studies-gcse', ['Business Basics & Startup','Marketing','Finance','Operations','Human Resources','External Influences','Exam Prep & AI']),
    ('business-studies-ibdp', ['Exam Prep & AI']),
    ('business-studies-ks3', ['Enterprise & Startup','Marketing & Customers','Finance & Profit','People & Operations','Subject Humour']),
    # MUSIC
    ('music-a-level', ['Appraising & Analysis','Performing','Composing','Music History & Theory']),
    ('music-gcse', ['Performing','Composing','Listening & Appraising','Music Theory']),
    ('music-ks3', ['Elements of Music','Rhythm & Melody','Harmony & Texture','Notation & Structure','Genres & Instruments','Subject Humour']),
    # PE
    ('pe-a-level', ['Anatomy & Physiology','Exercise Physiology','Biomechanics','Sport Psychology','Socio-cultural Issues']),
    ('pe-gcse', ['Anatomy & Physiology','Movement Analysis','Physical Training','Sport Psychology','Health & Fitness']),
    ('pe-ks3', ['Fitness & Training','Anatomy & Movement','Skill & Tactics','Health & Nutrition','Subject Humour']),
    # ART DESIGN
    ('art-design-a-level', ['Drawing & Painting','Critical & Contextual Studies','Mixed Media & Installation','Personal Investigation','Ethics & Theory']),
    ('art-design-gcse', ['Drawing & Composition','Photography & Digital','3D & Mixed Media','Annotation & Analysis','Final Outcome']),
    ('art-design-ks3', ['Drawing Skills','Colour & Tone','Composition & Pattern','Art Movements','Subject Humour']),
    # DESIGN TECHNOLOGY
    ('design-technology-a-level', ['Materials & Composites','Design Process & Ethics','Manufacturing & Systems','Digital Technologies']),
    ('design-technology-gcse', ['Materials & Manufacturing','Design Process','Mechanical & Electronic Systems','CAD/CAM']),
    ('design-technology-ks3', ['Materials & Properties','Mechanisms & Forces','Designing & Drawing','Electronics & Smart Materials','Subject Humour']),
    # ENVIRONMENTAL SCIENCE
    ('environmental-science-a-level', ['Biodiversity & Ecosystems','Pollution & Remediation','Climate & Energy','Biogeochemical Cycles','Population & Resources']),
    ('environmental-science-gcse', ['Climate Change','Energy & Sustainability','Pollution','Biodiversity & Ecosystems','Sustainable Cities']),
    ('environmental-science-ks3', ['Cycles & Systems','Pollution & Acid Rain','Biodiversity & Wildlife','Renewable Energy','UK Nature Galleries']),
    # ASTRONOMY
    ('astronomy-a-level', ['Stars & Stellar Evolution','Cosmology & Big Bang','Black Holes & Relativity','Galaxies & Surveys','Observation Techniques']),
    ('astronomy-gcse', ['Solar System & Missions','Stars & Stellar Life','Galaxies & Universe','Black Holes & Exotic Objects','Space Exploration']),
    ('astronomy-ks3', ['Earth, Moon & Sun','Solar System','Stars & Constellations','Space Exploration','Subject Humour']),
    # FOOD TECH
    ('food-technology-ks3', ['Subject Humour']),
    # LANGUAGES - French
    ('french-a-level', ['Exam Prep & AI']),
    ('french-gcse', ['Vocabulary Games','Exam Prep & AI']),
    ('french-ibdp', ['Exam Prep & AI']),
    ('french-ks3', ['Subject Humour']),
    # German
    ('german-a-level', ['Exam Prep & AI']),
    ('german-gcse', ['Vocabulary Games','Exam Prep & AI']),
    ('german-ibdp', ['Exam Prep & AI']),
    ('german-ks3', ['Subject Humour']),
    # Spanish
    ('spanish-a-level', ['Exam Prep & AI']),
    ('spanish-gcse', ['Vocabulary Games','Exam Prep & AI']),
    ('spanish-ibdp', ['Exam Prep & AI']),
    ('spanish-ks3', ['Subject Humour']),
])

# Build a lookup: subj-level -> {slug: original_label}
SLUG_LOOKUP = {}
for key, labels in SUBTOPICS.items():
    SLUG_LOOKUP[key] = {slugify(l): l for l in labels}

# ============================================
# Per-combo classifier rules: maps from raw resource info -> canonical label slug
# Each rule list is tried in order against the resource's existing subtopic.
# ============================================

# Rules per combo: dict of raw_subtopic -> canonical label
RULES = {
    # ===== BIOLOGY =====
    'biology-gcse': {
        'animal-cell': 'Cell Biology', 'plant-cell': 'Cell Biology', 'cells': 'Cell Biology',
        'mitosis': 'Cell Biology', 'the-mitosis-spy': 'Cell Biology',
        'transport': 'Cell Biology',
        'digestion': 'Organisation', 'nutrients': 'Organisation', 'heart': 'Organisation',
        'plants': 'Organisation', 'general': 'Organisation',
        'disease': 'Infection & Response', 'immunity': 'Infection & Response',
        'the-vaccine-decision': 'Infection & Response',
        'respiration': 'Bioenergetics', 'photosynthesis': 'Bioenergetics',
        'the-respiration-meter': 'Bioenergetics', 'the-photosynthesis-rate': 'Bioenergetics',
        'hormones': 'Homeostasis & Response', 'nervous': 'Homeostasis & Response',
        'neuron': 'Homeostasis & Response', 'eye': 'Homeostasis & Response',
        'the-hormone-hijack': 'Homeostasis & Response', 'the-kidney-filter': 'Homeostasis & Response',
        'the-transplant': 'Homeostasis & Response',
        'dna': 'Inheritance & Evolution', 'genetics': 'Inheritance & Evolution',
        'evolution': 'Inheritance & Evolution', 'reproduction': 'Inheritance & Evolution',
        'the-meiosis-mistake': 'Inheritance & Evolution',
        'the-dna-fingerprint': 'Inheritance & Evolution',
        'ecology': 'Ecology', 'populations': 'Ecology', 'classification': 'Ecology',
        'the-population-crash': 'Ecology',
        'exam-practice': 'Exam Practice',
        'ai-prompts': 'Exam Prep & AI',
    },
    'biology-a-level': {
        'exam-practice': 'Exam Practice', 'paper-2': 'Exam Practice',
        'genetic-engineering': 'Genetics & Gene Expression',
        'the-crispr-edit': 'Genetics & Gene Expression',
        'the-pcr-evidence': 'Genetics & Gene Expression',
        'the-lac-operon': 'Genetics & Gene Expression',
        'the-hardy-weinberg': 'Genetics & Gene Expression',
        'nephron': 'Cells & Transport',
        'the-action-potential': 'Nervous Coordination',
        'the-signal-cascade': 'Nervous Coordination',
        'the-atp-yield': 'Energy & Respiration',
        'the-michaelis-constant': 'Biological Molecules',
        'the-chi-squared-test': 'Ecology & Populations',
        'the-succession-plot': 'Ecology & Populations',
        'ai-prompts': 'Exam Prep & AI',
    },
    'biology-ibdp': {'ai-prompts': 'Exam Prep & AI'},
    'biology-ks3': {
        'the-cell-intruder': 'Cells & Organisation',
        'the-enzyme-crisis': 'Body Systems', 'the-osmosis-disaster': 'Body Systems',
        'the-blood-type': 'Body Systems', 'the-nervous-system-relay': 'Body Systems',
        'the-photosynthesis-plot': 'Photosynthesis & Respiration',
        'the-genetics-lab': 'Inheritance',
        'the-food-chain-collapse': 'Ecology & Environment',
        'the-antibiotic-crisis': 'Ecology & Environment',
        'the-outbreak': 'Ecology & Environment',
        'jokes': 'Subject Humour',
    },
    # ===== CHEMISTRY =====
    'chemistry-gcse': {
        'atom': 'Atomic Structure', 'atoms': 'Atomic Structure', 'periodic': 'Atomic Structure',
        'elements': 'Atomic Structure', 'the-atomic-mass-mystery': 'Atomic Structure',
        'bonding': 'Bonding',
        'the-yield-calculation': 'Quantitative Chemistry',
        'reactions': 'Chemical Changes', 'reactions2': 'Chemical Changes',
        'acids': 'Chemical Changes', 'the-titration': 'Chemical Changes',
        'the-electrolysis-prison': 'Chemical Changes',
        'the-energy-profile': 'Energy Changes',
        'the-rate-race': 'Rate & Equilibrium',
        'the-equilibrium-sabotage': 'Rate & Equilibrium',
        'polymers': 'Organic Chemistry', 'the-organic-fingerprint': 'Organic Chemistry',
        'the-hardness-test': 'Chemical Analysis',
        'the-green-chemistry-lab': 'Using Resources',
        'general': 'Chemical Changes',
        'exam-practice': 'Exam Practice',
        'ai-prompts': 'Exam Prep & AI',
    },
    'chemistry-a-level': {
        'exam-practice': 'Exam Practice',
        'the-electron-configuration': 'Atomic Structure & Bonding',
        'entropy': 'Energetics & Entropy', 'the-entropy-engine': 'Energetics & Entropy',
        'kinetics': 'Kinetics', 'the-kinetics-lab': 'Kinetics',
        'the-acid-equilibrium': 'Equilibrium',
        'the-electrode-potential': 'Redox & Electrochemistry',
        'organic-families': 'Organic Chemistry', 'organics': 'Organic Chemistry',
        'the-reaction-mechanism': 'Organic Chemistry',
        'the-isomer-identity': 'Organic Chemistry',
        'the-polymer-bomb': 'Organic Chemistry',
        'transition': 'Transition Metals', 'the-transition-metal': 'Transition Metals',
        'spectroscopy': 'Spectroscopy & Analysis',
        'the-spectroscopy-suite': 'Spectroscopy & Analysis',
        'ai-prompts': 'Exam Prep & AI',
    },
    'chemistry-ibdp': {'ai-prompts': 'Exam Prep & AI'},
    'chemistry-ks3': {
        'the-vanishing-ink': 'States of Matter', 'the-fake-diamond': 'Elements & Compounds',
        'the-metal-detective': 'Metals & Materials', 'the-rusting-bridge': 'Metals & Materials',
        'the-burning-candle': 'Chemical Reactions', 'the-invisible-ink-factory': 'Chemical Reactions',
        'the-gas-leak': 'Chemical Reactions', 'the-limestone-quarry': 'Earth & Atmosphere',
        'the-poisoned-well': 'Earth & Atmosphere', 'the-clean-energy-cell': 'Earth & Atmosphere',
        'jokes': 'Subject Humour',
    },
    # ===== PHYSICS =====
    'physics-gcse': {
        'forces': 'Forces', 'the-runaway-train': 'Motion', 'the-speeding-bullet': 'Motion',
        'the-sniper-s-angle': 'Motion',
        'energy': 'Energy', 'the-heat-shield': 'Energy',
        'waves': 'Waves', 'the-underwater-cable': 'Waves', 'the-decoy-transmitter': 'Waves',
        'the-laser-tripwire': 'Light',
        'electricity': 'Electricity', 'the-blackout': 'Electricity',
        'the-magnetic-lock': 'Magnetism',
        'radiation': 'Atomic Structure & Radiation', 'the-radiation-leak': 'Atomic Structure & Radiation',
        'exam-practice': 'Exam Practice',
        'ai-prompts': 'Exam Prep & AI',
    },
    'physics-a-level': {
        'exam-practice': 'Exam Practice', 'paper-2': 'Exam Practice',
        'em-spectrum': 'Waves & Optics',
        'fields': 'Fields', 'the-capacitor-bomb': 'Fields', 'the-superconductor-heist': 'Fields',
        'nuclear': 'Nuclear & Particle Physics', 'particles': 'Nuclear & Particle Physics',
        'the-fusion-reactor': 'Nuclear & Particle Physics',
        'the-plasma-cutter': 'Nuclear & Particle Physics',
        'quantum': 'Quantum Physics', 'the-quantum-detector': 'Quantum Physics',
        'shm': 'Further Mechanics & SHM', 'the-shm-detonator': 'Further Mechanics & SHM',
        'thermal': 'Thermal Physics',
        'the-gravity-assist': 'Mechanics', 'the-orbital-decay': 'Astrophysics',
        'the-dark-matter-signal': 'Astrophysics', 'the-neutron-star': 'Astrophysics',
        'ai-prompts': 'Exam Prep & AI',
    },
    'physics-ibdp': {'ai-prompts': 'Exam Prep & AI'},
    'physics-ks3': {
        'the-slingshot': 'Forces & Motion', 'the-escape-artist': 'Forces & Motion',
        'the-hot-air-balloon': 'Energy', 'the-frozen-river': 'Energy',
        'the-circuit-saboteur': 'Electricity & Magnetism',
        'the-spy-meet': 'Electricity & Magnetism',
        'the-submarine-sonar': 'Waves & Sound', 'the-earthquake-monitor': 'Waves & Sound',
        'the-mirror-signal': 'Light', 'the-lighthouse-keeper': 'Light',
        'jokes': 'Subject Humour',
    },
    # ===== MATHS =====
    'maths-gcse': {
        'algebra': 'Algebra', 'the-quadratic-trap': 'Algebra',
        'the-circle-vault': 'Geometry & Trigonometry', 'geometry': 'Geometry & Trigonometry',
        'the-heist-angle': 'Geometry & Trigonometry',
        'the-transformation': 'Geometry & Trigonometry',
        'functions': 'Functions & Graphs', 'the-graph-intercept': 'Functions & Graphs',
        'the-gradient-mission': 'Functions & Graphs', 'the-growth-curve': 'Functions & Graphs',
        'the-drone-path': 'Functions & Graphs',
        'the-histogram-clue': 'Statistics', 'the-outlier': 'Statistics',
        'exam-practice': 'Exam Practice',
        'ai-prompts': 'Exam Prep & AI',
    },
    'maths-a-level': {
        'calculus': 'Pure - Calculus', 's0111-the-integral-mission': 'Pure - Calculus',
        's0112-the-differential-equation': 'Pure - Calculus',
        's0113-the-binomial-bomb': 'Pure - Algebra & Proof',
        'proof': 'Pure - Algebra & Proof', 's0117-the-proof': 'Pure - Algebra & Proof',
        's0116-the-complex-circuit': 'Pure - Algebra & Proof',
        's0118-the-parametric-path': 'Pure - Trigonometry',
        'vectors': 'Pure - Vectors', 's0120-the-vector-plane': 'Pure - Vectors',
        'sequences': 'Pure - Sequences & Series', 's0119-the-series-signal': 'Pure - Sequences & Series',
        'stats': 'Statistics', 's0114-the-normal-agent': 'Statistics',
        's0115-the-hypothesis-test': 'Statistics',
        'exam-practice': 'Exam Practice',
        'ai-prompts': 'Exam Prep & AI',
    },
    'maths-ibdp': {'ai-prompts': 'Exam Prep & AI'},
    'maths-ks3': {
        'the-missing-measurement': 'Number & Calculation',
        'the-tax-collector': 'Number & Calculation', 'the-treasure-share': 'Number & Calculation',
        'the-code-cracker': 'Algebra',
        'the-bridge-engineer': 'Geometry & Measure', 'the-angle-of-attack': 'Geometry & Measure',
        'the-symmetry-vault': 'Geometry & Measure', 'the-map-maker': 'Geometry & Measure',
        'the-navigator': 'Geometry & Measure',
        'the-dice-game': 'Ratio & Probability',
        'jokes': 'Subject Humour',
    },
    # ===== HISTORY =====
    'history-a-level': {
        'ancient': 'Ancient & Medieval', 'medieval': 'Ancient & Medieval',
        'tudor': 'Tudor & Renaissance', 'renaissance': 'Tudor & Renaissance',
        'french-revolution': 'Early Modern & Industrial',
        'industrial': 'Early Modern & Industrial',
        'empire': 'Empire & Decolonisation', 'decolonisation': 'Empire & Decolonisation',
        'ww1': 'World Wars', 'ww1-causes': 'World Wars', 'ww2': 'World Wars',
        'ww2-causes': 'World Wars', 'ww2-pacific': 'World Wars',
        'the-blank-cheque': 'World Wars',
        'coldwar': 'Cold War & 20th Century', 'cold-war-detailed': 'Cold War & 20th Century',
        'cold-war-brinkmanship': 'Cold War & 20th Century', '20c': 'Cold War & 20th Century',
        'weimar': 'Cold War & 20th Century',
        'the-marshall-plan': 'Cold War & 20th Century', 'the-suez-crisis': 'Cold War & 20th Century',
        'the-new-deal': 'Cold War & 20th Century',
        'russia': 'Russia & China', 'china': 'Russia & China',
        'the-cultural-revolution': 'Russia & China',
        'usa': 'USA & Civil Rights', 'civilrights': 'USA & Civil Rights',
        'governments': 'Historiography',
        'the-counterfactual': 'Historiography', 'the-revisionism': 'Historiography',
        'the-intentionalism-debate': 'Historiography', 'the-source-problem': 'Historiography',
        'the-genocide-question': 'Historiography',
        'exam-practice': 'Exam Practice',
        'ai-prompts': 'Exam Prep & AI',
    },
    'history-gcse': {
        'causes': 'Causes of War',
        'revolution': 'Revolutions', 'the-collectivisation': 'Revolutions',
        'sources': 'Source Analysis',
        'general': 'Medieval & Early Modern',
        'the-appeasement': 'World Wars', 'the-conscientious-objector': 'World Wars',
        'the-d-day-decision': 'World Wars', 'the-treaty-verdict': 'World Wars',
        'the-cuban-missile': 'Cold War & 20th Century',
        'the-civil-rights-march': 'Civil Rights & Equality',
        'the-partition': 'Civil Rights & Equality',
        'the-reichstag-fire': 'Weimar & Nazi Germany',
        'the-weimar-inflation': 'Weimar & Nazi Germany',
        'weimar-republic-crisis': 'Weimar & Nazi Germany',
        'exam-practice': 'Exam Practice',
        'ai-prompts': 'Exam Prep & AI',
    },
    'history-ibdp': {'ai-prompts': 'Exam Prep & AI'},
    'history-ks3': {
        'the-magna-carta-moment': 'Medieval Britain', 'the-plague-doctor': 'Medieval Britain',
        'the-empire-builder': 'Medieval Britain', 'castle-under-siege': 'Medieval Britain',
        'the-reformation': 'Tudor & Stuart', 'the-gunpowder-plot': 'Tudor & Stuart',
        'the-slavery-ship': 'Empire & Slavery',
        'the-industrial-worker': 'Industrial Britain',
        'the-suffragette': '20th Century & War', 'the-trench': '20th Century & War',
        'the-choice': '20th Century & War',
        'jokes': 'Subject Humour',
    },
    # ===== PSYCHOLOGY =====
    'psychology-a-level': {
        'social': 'Social Influence',
        'the-obedience-study': 'Social Influence',
        'memory': 'Memory',
        'abnormal': 'Psychopathology', 'the-psychopathology': 'Psychopathology',
        'approaches': 'Approaches',
        'biopsych': 'Biopsychology',
        'research': 'Research Methods', 'the-replication-crisis': 'Research Methods',
        'the-ethical-board': 'Research Methods',
        'therapies': 'Psychopathology',
        'the-gender-debate': 'Issues & Debates', 'the-iq-controversy': 'Issues & Debates',
        'the-evolutionary-fit': 'Issues & Debates',
        'the-forensic-profile': 'Forensic Psychology',
        'the-schizophrenia-evidence': 'Schizophrenia & Depression',
        'the-depression-dilemma': 'Schizophrenia & Depression',
        'the-addiction-model': 'Addiction',
        'exam-practice': 'Exam Practice', 'paper-2': 'Exam Practice',
        'ai-prompts': 'Exam Prep & AI',
    },
    'psychology-gcse': {
        'the-developmental-stage': 'Development',
        'the-eyewitness': 'Memory & Perception',
        'the-minority-influence': 'Social Influence', 'the-obedience-study': 'Social Influence',
        'the-diagnosis': 'Psychological Problems', 'the-therapy-choice': 'Psychological Problems',
        'the-aggression-study': 'Psychological Problems', 'the-stress-at-work': 'Psychological Problems',
        'the-experiment-design': 'Research Methods',
        'the-brain-scan': 'Brain & Neuropsychology',
        'ai-prompts': 'Exam Prep & AI',
    },
    'psychology-ibdp': {'ai-prompts': 'Exam Prep & AI'},
    'psychology-ks3': {
        'the-mirror-test': 'Brain & Behaviour', 'the-reward-system': 'Brain & Behaviour',
        'the-memory-lab': 'Memory & Learning', 'the-perception-puzzle': 'Memory & Learning',
        'the-emotion-map': 'Emotion & Perception', 'the-phobia-trap': 'Emotion & Perception',
        'the-dream-decoder': 'Emotion & Perception', 'the-stress-response': 'Emotion & Perception',
        'the-crowd-effect': 'Social Psychology',
        'the-attachment-study': 'Development & Attachment',
    },
    # ===== ECONOMICS =====
    'economics-a-level': {
        'micro': 'Microeconomics', 'firms': 'Microeconomics',
        'the-prisoners-dilemma': 'Microeconomics', 'the-monopsony': 'Microeconomics',
        'efficiency': 'Microeconomics', 'the-deadweight-loss': 'Microeconomics',
        'macro': 'Macroeconomics', 'the-is-lm-crisis': 'Macroeconomics',
        'the-phillips-curve': 'Macroeconomics', 'the-laffer-curve': 'Macroeconomics',
        'the-growth-model': 'Macroeconomics',
        'market-failure': 'Market Failure', 'the-asymmetric-info': 'Market Failure',
        'policy': 'Government Intervention',
        'labour': 'Labour Markets',
        'globalisation': 'International Trade & Globalisation',
        'the-capital-flight': 'International Trade & Globalisation',
        'the-financial-contagion': 'International Trade & Globalisation',
        'exam-practice': 'Exam Practice',
        'ai-prompts': 'Exam Prep & AI',
    },
    'economics-gcse': {
        'goods': 'How Markets Work', 'the-elasticity-trap': 'How Markets Work',
        'the-cost-curve': 'How Markets Work', 'the-market-failure': 'How Markets Work',
        'the-business-cycle': 'How the Economy Works', 'the-multiplier': 'How the Economy Works',
        'the-fiscal-policy': 'How the Economy Works', 'the-labour-market': 'How the Economy Works',
        'the-poverty-trap': 'How the Economy Works',
        'the-comparative-advantage': 'Global Economics', 'the-exchange-rate': 'Global Economics',
        'exam-practice': 'Exam Practice',
        'ai-prompts': 'Exam Prep & AI',
    },
    'economics-ibdp': {'ai-prompts': 'Exam Prep & AI'},
    'economics-ks3': {
        'the-market-stall': 'Markets & Trade', 'the-price-rise': 'Markets & Trade',
        'the-monopoly': 'Markets & Trade', 'the-scarce-resource': 'Markets & Trade',
        'the-bank-run': 'Money & Banking',
        'the-budget-crisis': 'Government & Tax', 'the-tax-question': 'Government & Tax',
        'the-unemployment-spike': 'Government & Tax',
        'the-globalisation-split': 'Global Economy', 'the-trade-deal': 'Global Economy',
    },
    # ===== GEOGRAPHY =====
    'geography-a-level': {
        'the-glacial-budget': 'Glacial Systems',
        'the-coastal-sediment': 'Coastal Systems', 'the-erosion-model': 'Coastal Systems',
        'the-biome-shift': 'Water & Carbon Cycles',
        'the-systems-approach': 'Water & Carbon Cycles',
        'the-risk-index': 'Hazards',
        'the-superpower-shift': 'Global Systems & Globalisation',
        'the-gini-coefficient': 'Changing Places & Development',
        'the-megacity': 'Contemporary Urban Environments',
        'the-urban-model': 'Contemporary Urban Environments',
        'climate-summit-negotiator': 'Global Systems & Globalisation',
        'exam-practice': 'Exam Practice',
        'ai-prompts': 'Exam Prep & AI',
    },
    'geography-gcse': {
        'tectonics': 'Tectonic Hazards', 'the-earthquake-response': 'Tectonic Hazards',
        'climate': 'Weather & Climate', 'the-tropical-storm': 'Weather & Climate',
        'the-cold-environment': 'Weather & Climate',
        'ecosystems': 'Ecosystems',
        'physical': 'UK Physical Landscapes', 'landforms': 'UK Physical Landscapes',
        'rocks': 'UK Physical Landscapes', 'rock-cycle': 'UK Physical Landscapes',
        'river': 'Rivers & Coasts', 'coasts': 'Rivers & Coasts',
        'water-cycle': 'Rivers & Coasts', 'water': 'Rivers & Coasts',
        'urbanisation': 'Urban Issues & Megacities',
        'the-urban-sprawl': 'Urban Issues & Megacities',
        'megacity-mayor': 'Urban Issues & Megacities',
        'human': 'Urban Issues & Megacities',
        'development': 'Economic Development',
        'the-development-gap': 'Economic Development',
        'the-globalisation-chain': 'Economic Development',
        'the-demographic-transition': 'Economic Development',
        'the-water-conflict': 'Resource Management',
        'the-carbon-footprint': 'Resource Management',
        'mars-colony-survival': 'Resource Management',
        'the-fieldwork-question': 'Fieldwork',
        'exam-practice': 'Exam Practice',
        'ai-prompts': 'Exam Prep & AI',
    },
    'geography-ibdp': {'ai-prompts': 'Exam Prep & AI'},
    'geography-ks3': {
        'the-tectonic-shift': 'Tectonics & Hazards', 'the-volcano-watch': 'Tectonics & Hazards',
        'the-flood-warning': 'Tectonics & Hazards',
        'the-river-meander': 'Rivers & Coasts', 'the-coastal-erosion': 'Rivers & Coasts',
        'river-valley-settlement': 'Rivers & Coasts',
        'the-climate-zone': 'Weather & Climate',
        'the-migration': 'Population & Settlement',
        'the-settlement-site': 'Population & Settlement',
        'the-urban-heat': 'Population & Settlement',
        'the-deforestation': 'Ecosystems & Environment',
        'ecosystem-architects': 'Ecosystems & Environment',
        'jokes': 'Subject Humour',
    },
    # ===== COMPUTER SCIENCE =====
    'computer-science-a-level': {
        'the-big-o': 'Algorithms & Data Structures',
        'the-graph-traversal': 'Algorithms & Data Structures',
        'the-hashing-clash': 'Algorithms & Data Structures',
        'the-oop-design': 'Programming & Paradigms',
        'the-language-theory': 'Theory of Computation',
        'the-finite-state-machine': 'Theory of Computation',
        'the-compression-algorithm': 'Computer Systems',
        'the-concurrency-bug': 'Computer Systems',
        'the-turing-test': 'AI & Machine Learning',
        'the-neural-net': 'AI & Machine Learning',
        'pandemic-response-lab': 'AI & Machine Learning',
        'ai-prompts': 'Exam Prep & AI',
    },
    'computer-science-gcse': {
        'the-sorting-race': 'Algorithms', 'the-recursion': 'Algorithms',
        'the-subroutine': 'Programming',
        'rocket-launch-programme': 'Programming',
        'the-boolean-logic': 'Computer Systems',
        'the-fetch-decode-execute': 'Computer Systems',
        'the-stack-trace': 'Computer Systems',
        'the-compression': 'Data Representation',
        'the-virus-hunt': 'Cyber Security',
        'the-ethical-hack': 'Cyber Security',
        'the-sql-heist': 'Databases',
        'ai-prompts': 'Exam Prep & AI',
    },
    'computer-science-ibdp': {'ai-prompts': 'Exam Prep & AI'},
    'computer-science-ks3': {
        'the-algorithm-race': 'Algorithms & Flowcharts',
        'the-flowchart-mission': 'Algorithms & Flowcharts',
        'the-search': 'Algorithms & Flowcharts',
        'the-bug-hunt': 'Programming Basics',
        'the-data-type': 'Programming Basics',
        'robot-factory': 'Programming Basics',
        'the-binary-message': 'Data & Binary',
        'the-representation': 'Data & Binary',
        'the-network-path': 'Networks & Security',
        'the-encryption-key': 'Networks & Security',
        'the-logic-gate-trap': 'Computational Thinking',
        'jokes': 'Subject Humour',
    },
    # ===== ENGLISH LANGUAGE =====
    'english-language-a-level': {
        'the-critical-discourse': 'Language & Power',
        'the-politeness-strategy': 'Language & Power',
        'the-grice-violation': 'Discourse Analysis',
        'the-multimodal-text': 'Discourse Analysis',
        'the-corpus-clue': 'Discourse Analysis',
        'the-language-change': 'Language Change', 'the-sapir-whorf': 'Language Change',
        'the-accent-study': 'Sociolinguistics', 'the-sociolect-signal': 'Sociolinguistics',
        'the-acquisition-stage': 'Child Language Acquisition',
        'ai-prompts': 'Exam Prep & AI',
    },
    'english-language-gcse': {
        'lang-terms': 'Language Analysis', 'language-features': 'Language Analysis',
        'the-stylistic-choice': 'Language Analysis',
        'the-semantic-field': 'Language Analysis',
        'the-subtext-message': 'Language Analysis',
        'the-representation': 'Language Analysis',
        'the-narrative-hook': 'Writing - Descriptive & Narrative',
        'the-descriptive-trap': 'Writing - Descriptive & Narrative',
        'the-argument-structure': 'Writing - Transactional',
        'the-transactional-text': 'Writing - Transactional',
        'the-editorial-bias': 'Writing - Transactional',
        'the-speech-transcript': 'Spoken Language',
        'ai-prompts': 'Exam Prep & AI',
    },
    'english-language-ks3': {
        'the-headline-hook': 'Reading & Genre', 'the-genre-switch': 'Reading & Genre',
        'the-news-report': 'Media & Texts', 'the-instruction-fail': 'Media & Texts',
        'the-persuasion-machine': 'Writing & Persuasion',
        'the-slogan-writer': 'Writing & Persuasion',
        'the-speech-act': 'Spoken Language',
        'the-register-shift': 'Spoken Language',
        'the-dialect-detective': 'Language Variation',
        'the-ambiguous-sign': 'Language Variation',
    },
    # ===== ENGLISH LITERATURE =====
    'english-literature-a-level': {
        'poetry': 'Poetry', 'the-sonnet-structure': 'Poetry',
        'shakespeare': 'Drama & Shakespeare', 'the-dramatic-silence': 'Drama & Shakespeare',
        'the-tragic-catharsis': 'Drama & Shakespeare',
        'prose': 'Prose', 'the-free-indirect-style': 'Prose',
        'the-unreliable-confession': 'Prose',
        'the-intertextual-echo': 'Comparative Study',
        'the-genre-hybrid': 'Comparative Study',
        'the-feminist-reading': 'Critical Approaches',
        'the-marxist-subtext': 'Critical Approaches',
        'the-postcolonial-text': 'Critical Approaches',
        'the-authorial-intent': 'Critical Approaches',
        'context': 'Critical Approaches',
        'exam-practice': 'Exam Practice',
        'ai-prompts': 'Exam Prep & AI',
    },
    'english-literature-gcse': {
        'the-macbeth-verdict': 'Shakespeare',
        'the-gothic-secret': '19th Century Novel',
        'the-inspectors-trap': 'Modern Texts', 'the-animal-farm-allegory': 'Modern Texts',
        'the-power-shift': 'Modern Texts', 'the-sympathy-test': 'Modern Texts',
        'the-inequality-map': 'Modern Texts',
        'the-sonnet-structure': 'Poetry',
        'the-context-clue': 'Poetry',
        'the-ambiguous-ending': 'Unseen Poetry',
        'lit-terms': 'Literary Terms',
        'vocab-anagram': 'Vocabulary Games', 'vocab-crossword': 'Vocabulary Games',
        'vocab-hangman': 'Vocabulary Games', 'vocab-pacman': 'Vocabulary Games',
        'vocab-pairs': 'Vocabulary Games', 'vocab-quiz': 'Vocabulary Games',
        'vocab-spaceinvaders': 'Vocabulary Games', 'vocab-termguess': 'Vocabulary Games',
        'ai-prompts': 'Exam Prep & AI',
    },
    'english-literature-ibdp': {'ai-prompts': 'Exam Prep & AI'},
    'english-literature-ks3': {
        'the-character-witness': 'Character & Narrator',
        'the-reliable-narrator': 'Character & Narrator',
        'the-villains-voice': 'Character & Narrator',
        'the-hidden-theme': 'Theme & Setting', 'the-setting-spy': 'Theme & Setting',
        'the-cliffhanger': 'Plot & Structure', 'the-prologue-puzzle': 'Plot & Structure',
        'the-missing-chapter': 'Plot & Structure',
        'the-metaphor-mission': 'Language & Metaphor',
        'the-archetype': 'Genre & Archetype',
        'jokes': 'Subject Humour',
    },
    # ===== SOCIOLOGY =====
    'sociology-a-level': {
        'the-postmodern-society': 'Beliefs in Society',
        'the-new-right': 'Beliefs in Society',
        'the-prison': 'Crime & Deviance',
        'the-suicide-study': 'Methods in Context',
        'the-mixed-methods': 'Methods in Context',
        'the-intersectionality': 'Stratification & Differentiation',
        'the-health-inequality': 'Stratification & Differentiation',
        'the-power': 'Theory & Methods',
        'the-structure-vs-agency': 'Theory & Methods',
        'the-global-culture': 'Beliefs in Society',
    },
    'sociology-gcse': {
        'the-functionalist-school': 'Sociological Theories',
        'the-marxist-view': 'Sociological Theories',
        'the-feminist-study': 'Sociological Theories',
        'the-labelling-theory': 'Sociological Theories',
        'the-religion-decline': 'Sociological Theories',
        'the-ethnicity': 'Education',
        'the-global-inequality': 'Education',
        'the-crime-data': 'Crime & Deviance',
        'the-mass-media': 'Media',
        'the-research-method': 'Research Methods',
    },
    'sociology-ks3': {
        'the-family-type': 'Family & Identity', 'the-identity': 'Family & Identity',
        'the-school': 'School & Education',
        'the-class': 'Class & Poverty', 'the-poverty': 'Class & Poverty',
        'the-gender-gap': 'Class & Poverty',
        'the-crime-scene': 'Crime & Society',
        'the-social-norm': 'Crime & Society',
        'the-media-effect': 'Media & Religion',
        'the-religion': 'Media & Religion',
    },
    # ===== RELIGIOUS STUDIES =====
    'religious-studies-a-level': {
        'the-ontological': 'Philosophy of Religion',
        'the-verification-principle': 'Philosophy of Religion',
        'the-soul': 'Philosophy of Religion',
        'the-eschatology': 'Philosophy of Religion',
        'the-free-will': 'Philosophy of Religion',
        'the-utilitarianism': 'Ethics', 'the-natural-law': 'Ethics',
        'the-virtue-ethics': 'Ethics', 'ai-ethics-board': 'Ethics',
        'election-campaign': 'Ethics',
        'the-myth': 'Study of Religion',
        'the-liberation-theology': 'Study of Religion',
        'ai-prompts': 'Exam Prep & AI',
    },
    'religious-studies-gcse': {
        'the-cosmological-argument': 'Arguments for God',
        'the-design-argument': 'Arguments for God',
        'the-religious-experience': 'Arguments for God',
        'the-abortion-debate': 'Ethics & Relationships',
        'the-euthanasia-question': 'Ethics & Relationships',
        'the-capital-punishment': 'Crime & Punishment',
        'courtroom-drama': 'Crime & Punishment',
        'the-prejudice': 'Religion & Society',
        'the-poverty-response': 'Religion & Society',
        'the-environmental-duty': 'Religion & Society',
        'the-interfaith-dialogue': 'Religion & Society',
        'ai-prompts': 'Exam Prep & AI',
    },
    'religious-studies-ibdp': {'ai-prompts': 'Exam Prep & AI'},
    'religious-studies-ks3': {
        'the-holy-text': 'Sacred Texts & Practices',
        'the-pilgrimage': 'Sacred Texts & Practices',
        'the-rite-of-passage': 'Sacred Texts & Practices',
        'the-creation-debate': 'World Religions',
        'community-council': 'World Religions',
        'the-just-war': 'Ethics & Morality', 'the-moral-dilemma': 'Ethics & Morality',
        'the-charity-mission': 'Ethics & Morality',
        'the-gender-equality': 'Ethics & Morality',
        'the-afterlife': 'Philosophy & Big Questions',
        'the-evil-problem': 'Philosophy & Big Questions',
        'jokes': 'Subject Humour',
    },
    # ===== BUSINESS STUDIES =====
    'business-studies-a-level': {
        'the-ansoff-matrix': 'Business Strategy',
        'the-swot': 'Business Strategy',
        'the-porters-five': 'Business Strategy',
        'the-corporate-strategy': 'Business Strategy',
        'the-stakeholder-mapping': 'Business Strategy',
        'the-innovation': 'Marketing',
        'the-investment-appraisal': 'Finance & Accounting',
        'hedge-fund-challenge': 'Finance & Accounting',
        'the-kaizen': 'Operations Management',
        'publishing-house': 'Operations Management',
        'the-motivation-theory': 'Human Resources',
        'the-exchange-rate-impact': 'External Environment',
        'global-trade-war': 'Global Business',
        'ai-prompts': 'Exam Prep & AI',
    },
    'business-studies-gcse': {
        'dragons-den-startup': 'Business Basics & Startup',
        'startup-cto': 'Business Basics & Startup',
        'the-legal-form': 'Business Basics & Startup',
        'the-elasticity': 'Marketing',
        'the-break-even': 'Finance', 'the-cash-flow': 'Finance', 'the-ratio': 'Finance',
        'the-trade-off': 'Operations',
        'the-hrm': 'Human Resources', 'the-hierarchy': 'Human Resources',
        'the-ethics': 'External Influences', 'the-global': 'External Influences',
        'island-economy': 'External Influences',
        'ai-prompts': 'Exam Prep & AI',
    },
    'business-studies-ibdp': {'ai-prompts': 'Exam Prep & AI'},
    'business-studies-ks3': {
        'the-start-up': 'Enterprise & Startup', 'the-risk': 'Enterprise & Startup',
        'theme-park-tycoon': 'Enterprise & Startup',
        'market-traders': 'Enterprise & Startup',
        'the-brand': 'Marketing & Customers', 'the-customer': 'Marketing & Customers',
        'the-location': 'Marketing & Customers',
        'newsroom-deadline': 'Marketing & Customers',
        'the-profit': 'Finance & Profit', 'the-loan': 'Finance & Profit',
        'the-employee': 'People & Operations',
        'the-supply-chain': 'People & Operations',
        'the-stakeholder': 'People & Operations',
        'jokes': 'Subject Humour',
    },
    # ===== MUSIC =====
    'music-a-level': {
        'the-analysis': 'Appraising & Analysis',
        'the-listening-test': 'Appraising & Analysis',
        'the-counterpoint': 'Composing',
        'the-figured-bass': 'Composing',
        'the-serial-technique': 'Composing',
        'the-minimalism': 'Music History & Theory',
        'the-modal-jazz': 'Music History & Theory',
        'the-spectralism': 'Music History & Theory',
        'the-ethnomusicology': 'Music History & Theory',
        'the-notation-system': 'Music History & Theory',
        'the-critical-essay': 'Appraising & Analysis',
    },
    'music-gcse': {
        'the-performance': 'Performing',
        'the-composition-brief': 'Composing',
        'the-harmony': 'Composing', 'the-bass-line': 'Composing',
        'the-modulation': 'Music Theory', 'the-interval': 'Music Theory',
        'the-score-reading': 'Music Theory',
        'the-listening-test': 'Listening & Appraising',
        'the-world-music': 'Listening & Appraising',
        'the-technology': 'Composing',
    },
    'music-ks3': {
        'the-chord-change': 'Harmony & Texture',
        'the-texture': 'Harmony & Texture',
        'the-rhythm-trap': 'Rhythm & Melody',
        'the-melody-spy': 'Rhythm & Melody',
        'the-note-value': 'Rhythm & Melody',
        'the-dynamics': 'Elements of Music',
        'the-key-signature': 'Notation & Structure',
        'the-structure': 'Notation & Structure',
        'the-genre': 'Genres & Instruments',
        'the-instrument': 'Genres & Instruments',
        'jokes': 'Subject Humour',
    },
    # ===== PE =====
    'pe-a-level': {
        'the-respiratory-exchange': 'Anatomy & Physiology',
        'the-altitude-training': 'Exercise Physiology',
        'the-lactate-threshold': 'Exercise Physiology',
        'the-blood-doping': 'Exercise Physiology',
        'the-periodisation': 'Exercise Physiology',
        'the-force-velocity': 'Biomechanics',
        'the-kinematic-analysis': 'Biomechanics',
        'the-anxiety-type': 'Sport Psychology',
        'the-motor-programme': 'Sport Psychology',
        'the-group-dynamics': 'Socio-cultural Issues',
    },
    'pe-gcse': {
        'the-cardiac-output': 'Anatomy & Physiology',
        'the-anaerobic-system': 'Anatomy & Physiology',
        'the-lever-calculation': 'Movement Analysis',
        'the-vo2-max': 'Physical Training',
        'the-feedback': 'Physical Training',
        'the-injury-rehab': 'Physical Training',
        'the-somatotype': 'Health & Fitness',
        'the-diet-plan': 'Health & Fitness',
        'the-arousal': 'Sport Psychology',
        'the-psychological-skills': 'Sport Psychology',
    },
    'pe-ks3': {
        'the-warm-up': 'Fitness & Training',
        'the-training-method': 'Fitness & Training',
        'the-sprint-test': 'Fitness & Training',
        'the-heart-rate-zone': 'Fitness & Training',
        'the-muscle-group': 'Anatomy & Movement',
        'the-lever-system': 'Anatomy & Movement',
        'the-balance': 'Anatomy & Movement',
        'the-skill-acquisition': 'Skill & Tactics',
        'the-team-tactics': 'Skill & Tactics',
        'the-nutrition': 'Health & Nutrition',
        'jokes': 'Subject Humour',
    },
    # ===== ART DESIGN =====
    'art-design-a-level': {
        'the-personal-investigation': 'Personal Investigation',
        'the-extended-essay': 'Personal Investigation',
        'the-commission': 'Drawing & Painting',
        'the-collaborative': 'Mixed Media & Installation',
        'the-installation': 'Mixed Media & Installation',
        'the-postmodern-work': 'Critical & Contextual Studies',
        'the-cross-cultural': 'Critical & Contextual Studies',
        'the-semiotics': 'Critical & Contextual Studies',
        'the-conservation': 'Ethics & Theory',
        'the-ethics-of-representation': 'Ethics & Theory',
    },
    'art-design-gcse': {
        'the-3d-form': '3D & Mixed Media',
        'the-media-choice': '3D & Mixed Media',
        'the-photography': 'Photography & Digital',
        'the-digital-artwork': 'Photography & Digital',
        'the-typography': 'Photography & Digital',
        'the-colour-psychology': 'Drawing & Composition',
        'the-annotation': 'Annotation & Analysis',
        'the-critical-response': 'Annotation & Analysis',
        'the-artist-influence': 'Annotation & Analysis',
        'the-final-outcome': 'Final Outcome',
    },
    'art-design-ks3': {
        'the-line-weight': 'Drawing Skills',
        'the-perspective': 'Drawing Skills',
        'the-proportion': 'Drawing Skills',
        'the-tonal-value': 'Colour & Tone',
        'the-colour-mix': 'Colour & Tone',
        'the-texture-study': 'Colour & Tone',
        'the-composition': 'Composition & Pattern',
        'the-pattern': 'Composition & Pattern',
        'the-mood-board': 'Composition & Pattern',
        'the-artists-movement': 'Art Movements',
        'jokes': 'Subject Humour',
    },
    # ===== DESIGN TECHNOLOGY =====
    'design-technology-a-level': {
        'the-composite': 'Materials & Composites',
        'the-injection-mould': 'Materials & Composites',
        'the-design-ethics': 'Design Process & Ethics',
        'the-patent-search': 'Design Process & Ethics',
        'the-innovation': 'Design Process & Ethics',
        'the-manufacturing-system': 'Manufacturing & Systems',
        'the-reliability': 'Manufacturing & Systems',
        'the-control-system': 'Manufacturing & Systems',
        'the-topology': 'Digital Technologies',
        'the-fea-model': 'Digital Technologies',
    },
    'design-technology-gcse': {
        'the-casting': 'Materials & Manufacturing',
        'the-stress-test': 'Materials & Manufacturing',
        'the-finite-element': 'Materials & Manufacturing',
        'the-market-research': 'Design Process',
        'the-specification': 'Design Process',
        'the-feedback-loop': 'Mechanical & Electronic Systems',
        'the-systems-diagram': 'Mechanical & Electronic Systems',
        'the-pcb': 'Mechanical & Electronic Systems',
        'the-energy-harvest': 'Mechanical & Electronic Systems',
        'the-cad-cam-pipeline': 'CAD/CAM',
    },
    'design-technology-ks3': {
        'the-material-choice': 'Materials & Properties',
        'the-tolerance': 'Materials & Properties',
        'the-mechanism': 'Mechanisms & Forces',
        'the-force-diagram': 'Mechanisms & Forces',
        'the-ergonomics': 'Mechanisms & Forces',
        'the-isometric-view': 'Designing & Drawing',
        'the-prototype': 'Designing & Drawing',
        'the-circuit-test': 'Electronics & Smart Materials',
        'the-smart-material': 'Electronics & Smart Materials',
        'the-sustainability': 'Electronics & Smart Materials',
        'jokes': 'Subject Humour',
    },
    # ===== ENVIRONMENTAL SCIENCE =====
    'environmental-science-a-level': {
        'the-biodiversity-index': 'Biodiversity & Ecosystems',
        'the-keystone-species': 'Biodiversity & Ecosystems',
        'the-population-ecology': 'Biodiversity & Ecosystems',
        'the-bioaccumulation': 'Pollution & Remediation',
        'the-remediation': 'Pollution & Remediation',
        'the-climate-sensitivity': 'Climate & Energy',
        'the-energy-transition': 'Climate & Energy',
        'the-biogeochemical-cycle': 'Biogeochemical Cycles',
        'the-systems-model': 'Biogeochemical Cycles',
        'the-ecological-footprint': 'Population & Resources',
        'the-international': 'Population & Resources',
    },
    'environmental-science-gcse': {
        'the-climate-model': 'Climate Change',
        'the-ipcc-report': 'Climate Change',
        'the-carbon-footprint': 'Climate Change',
        'the-energy-mix': 'Energy & Sustainability',
        'the-sustainable-city': 'Sustainable Cities',
        'the-eutrophication': 'Pollution',
        'the-pollution-legislation': 'Pollution',
        'the-fisheries': 'Biodiversity & Ecosystems',
        'the-keystone-species': 'Biodiversity & Ecosystems',
        'the-ecosystem-service': 'Biodiversity & Ecosystems',
    },
    'environmental-science-ks3': {
        'the-carbon-cycle': 'Cycles & Systems',
        'the-water-cycle': 'Cycles & Systems',
        'the-food-chain-energy': 'Cycles & Systems',
        'the-soil': 'Cycles & Systems',
        'the-acid-rain-effect': 'Pollution & Acid Rain',
        'the-pollution-source': 'Pollution & Acid Rain',
        'the-plastic-odyssey': 'Pollution & Acid Rain',
        'the-biodiversity-threat': 'Biodiversity & Wildlife',
        'the-wildlife-corridor': 'Biodiversity & Wildlife',
        'the-renewable': 'Renewable Energy',
        'midlands-east': 'UK Nature Galleries', 'north-england': 'UK Nature Galleries',
        'northern-ireland': 'UK Nature Galleries', 'republic-ireland': 'UK Nature Galleries',
        'scotland': 'UK Nature Galleries', 'south-england': 'UK Nature Galleries',
        'wales': 'UK Nature Galleries',
    },
    # ===== ASTRONOMY =====
    'astronomy-a-level': {
        'the-chandrasekhar': 'Stars & Stellar Evolution',
        'the-nucleosynthesis': 'Stars & Stellar Evolution',
        'the-pulsar-timing': 'Stars & Stellar Evolution',
        'the-inflation-model': 'Cosmology & Big Bang',
        'the-redshift-survey': 'Cosmology & Big Bang',
        'the-dark-energy': 'Cosmology & Big Bang',
        'the-event-horizon': 'Black Holes & Relativity',
        'the-accretion-disc': 'Black Holes & Relativity',
        'the-gravitational-wave': 'Black Holes & Relativity',
        'the-parallax': 'Observation Techniques',
    },
    'astronomy-gcse': {
        'the-space-mission': 'Solar System & Missions',
        'the-satellite-orbit': 'Solar System & Missions',
        'the-tidal-force': 'Solar System & Missions',
        'the-life-cycle': 'Stars & Stellar Life',
        'the-supernova': 'Stars & Stellar Life',
        'the-hubble-constant': 'Galaxies & Universe',
        'the-cmb': 'Galaxies & Universe',
        'the-black-hole': 'Black Holes & Exotic Objects',
        'the-exoplanet': 'Space Exploration',
        'the-seti-signal': 'Space Exploration',
    },
    'astronomy-ks3': {
        'the-eclipse': 'Earth, Moon & Sun',
        'the-moon-phase': 'Earth, Moon & Sun',
        'the-day-length': 'Earth, Moon & Sun',
        'the-gravity-well': 'Earth, Moon & Sun',
        'the-planet-distance': 'Solar System',
        'the-light-year': 'Stars & Constellations',
        'the-star-colour': 'Stars & Constellations',
        'the-constellation': 'Stars & Constellations',
        'the-rocket-launch': 'Space Exploration',
        'the-space-junk': 'Space Exploration',
        'jokes': 'Subject Humour',
    },
    # ===== FOOD TECH =====
    'food-technology-ks3': {'jokes': 'Subject Humour'},
    # ===== LANGUAGES =====
    'french-a-level': {'ai-prompts': 'Exam Prep & AI'},
    'french-gcse': {
        'vocab-anagram': 'Vocabulary Games', 'vocab-crossword': 'Vocabulary Games',
        'vocab-hangman': 'Vocabulary Games', 'vocab-pacman': 'Vocabulary Games',
        'vocab-pairs': 'Vocabulary Games', 'vocab-quiz': 'Vocabulary Games',
        'vocab-spaceinvaders': 'Vocabulary Games', 'vocab-termguess': 'Vocabulary Games',
        'ai-prompts': 'Exam Prep & AI',
    },
    'french-ibdp': {'ai-prompts': 'Exam Prep & AI'},
    'french-ks3': {'jokes': 'Subject Humour'},
    'german-a-level': {'ai-prompts': 'Exam Prep & AI'},
    'german-gcse': {
        'vocab-anagram': 'Vocabulary Games', 'vocab-crossword': 'Vocabulary Games',
        'vocab-hangman': 'Vocabulary Games', 'vocab-pacman': 'Vocabulary Games',
        'vocab-pairs': 'Vocabulary Games', 'vocab-quiz': 'Vocabulary Games',
        'vocab-spaceinvaders': 'Vocabulary Games', 'vocab-termguess': 'Vocabulary Games',
        'ai-prompts': 'Exam Prep & AI',
    },
    'german-ibdp': {'ai-prompts': 'Exam Prep & AI'},
    'german-ks3': {'jokes': 'Subject Humour'},
    'spanish-a-level': {'ai-prompts': 'Exam Prep & AI'},
    'spanish-gcse': {
        'vocab-anagram': 'Vocabulary Games', 'vocab-crossword': 'Vocabulary Games',
        'vocab-hangman': 'Vocabulary Games', 'vocab-pacman': 'Vocabulary Games',
        'vocab-pairs': 'Vocabulary Games', 'vocab-quiz': 'Vocabulary Games',
        'vocab-spaceinvaders': 'Vocabulary Games', 'vocab-termguess': 'Vocabulary Games',
        'ai-prompts': 'Exam Prep & AI',
    },
    'spanish-ibdp': {'ai-prompts': 'Exam Prep & AI'},
    'spanish-ks3': {'jokes': 'Subject Humour'},
}

# Load resources
with open(f'{PATH}/resources.js') as f:
    txt = f.read()
m = re.search(r'const RESOURCES = (\[.*\]);', txt, re.DOTALL)
arr = json.loads(m.group(1))

# Classify
unmapped = []
remap_log = defaultdict(lambda: defaultdict(int))  # combo -> {old_slug -> new_slug: count}

for r in arr:
    combo = f"{r['subject']}-{r['level']}"
    old = r['subtopic']
    rules = RULES.get(combo, {})
    if old in rules:
        new_label = rules[old]
    else:
        unmapped.append((combo, old, r['title']))
        continue
    new_slug = slugify(new_label)
    r['subtopic'] = new_slug
    remap_log[combo][f"{old} -> {new_slug}"] += 1

if unmapped:
    print("UNMAPPED:")
    for u in unmapped:
        print(" ", u)
    sys.exit(1)

# Verify - every resource's subtopic must be in SLUG_LOOKUP[combo]
mismatches = []
for r in arr:
    combo = f"{r['subject']}-{r['level']}"
    if r['subtopic'] not in SLUG_LOOKUP[combo]:
        mismatches.append((combo, r['subtopic'], r['title']))

if mismatches:
    print("MISMATCHES:")
    for m in mismatches[:20]:
        print(" ", m)
    sys.exit(1)

print(f"OK - {len(arr)} resources classified.")
print(f"Combos covered: {len(SUBTOPICS)}")

# Write log
log_lines = ["# Subtopic Remap Log\n", f"Total resources: {len(arr)}\n", f"Combos: {len(SUBTOPICS)}\n\n"]
for combo in sorted(remap_log.keys()):
    log_lines.append(f"\n## {combo}\n")
    log_lines.append(f"Canonical topics: {SUBTOPICS[combo]}\n\n")
    log_lines.append("| Old subtopic -> New slug | Count |\n|---|---|\n")
    for k, v in sorted(remap_log[combo].items()):
        log_lines.append(f"| `{k}` | {v} |\n")
with open(f'{PATH}/subtopic-remap.md', 'w') as f:
    f.writelines(log_lines)

# Resource counts per canonical topic for a few combos
print("\nSpot checks:")
for combo in ['biology-gcse', 'history-a-level', 'physics-a-level', 'geography-gcse', 'english-literature-gcse']:
    print(f"\n {combo}:")
    counts = defaultdict(int)
    for r in arr:
        if f"{r['subject']}-{r['level']}" == combo:
            counts[r['subtopic']] += 1
    for slug, cnt in sorted(counts.items(), key=lambda x: -x[1]):
        print(f"   {slug}: {cnt}")

# Write back resources.js
# Preserve the header
header_match = re.match(r'(// resources\.js[^\n]*\n// Generated[^\n]*\n// Total resources: \d+\n\nconst RESOURCES = )', txt)
header = header_match.group(1)
json_str = json.dumps(arr, indent=2, ensure_ascii=False)
new_txt = header + json_str + ';\n'
with open(f'{PATH}/resources.js','w') as f:
    f.write(new_txt)
print("\nWrote resources.js")

# Build SUBTOPICS JS block
def js_label(s):
    # JS string with single quotes; escape single quotes inside
    return "'" + s.replace("\\","\\\\").replace("'","\\'") + "'"

lines = [' const SUBTOPICS = {\n']
for k, labels in SUBTOPICS.items():
    arr_str = '[' + ','.join(js_label(l) for l in labels) + ']'
    lines.append(f"  '{k}': {arr_str},\n")
lines.append(' };\n')

# Now update subjects.html
with open(f'{PATH}/subjects.html') as f:
    html = f.read()

# Find the block from 'const SUBTOPICS = {' through the closing '};'
pat = re.compile(r'(?:^|\n)([ \t]*)const SUBTOPICS = \{.*?\n\1\};', re.DOTALL | re.MULTILINE)
mm = pat.search(html)
if not mm:
    print("Could not find SUBTOPICS block!")
    sys.exit(1)
indent = mm.group(1)
new_block_lines = [f"{indent}const SUBTOPICS = {{\n"]
for k, labels in SUBTOPICS.items():
    arr_str = '[' + ','.join(js_label(l) for l in labels) + ']'
    new_block_lines.append(f"{indent} '{k}': {arr_str},\n")
new_block_lines.append(f"{indent}}};")
new_block = ''.join(new_block_lines)

new_html = html[:mm.start()] + ('\n' if mm.group(0).startswith('\n') else '') + new_block + html[mm.end():]
with open(f'{PATH}/subjects.html', 'w') as f:
    f.write(new_html)
print("Wrote subjects.html")

