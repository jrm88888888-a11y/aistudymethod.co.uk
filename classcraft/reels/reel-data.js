/* reel-data.js — curated single-topic content packs for the TikTok reel games.
 * window.REELS[key] = { engine, subject, level, topicDisplay, concepts:[{term,def}],
 *                       hero:{ prompt, correct, wrong } }
 * REEL MODE shows hero.prompt as the question with EXACTLY TWO options — the truth
 * (hero.correct, scored right) and the common misconception (hero.wrong, scored wrong).
 * `concepts` are set-dressing only (claw plushie labels / board vocab).
 * Questions written directly to each video hook. GCSE-accurate; verified 2026-07-20. */
(function () {
  window.REELS = {
    'claw-evolution': {
      engine: 'claw', subject: 'Biology', level: 'GCSE', topicDisplay: 'Evolution',
      concepts: [
        { term: 'Common Ancestor', def: 'A species from which two or more species have evolved.' },
        { term: 'Natural Selection', def: 'Organisms better suited to their environment survive and pass on their genes.' },
        { term: 'Variation', def: 'Differences in the characteristics of individuals in a population.' },
        { term: 'Adaptation', def: 'A feature that helps an organism survive in its environment.' },
        { term: 'Evolution', def: 'The gradual change in inherited characteristics over many generations.' },
        { term: 'Species', def: 'A group of organisms that can breed to produce fertile offspring.' }
      ],
      hero: {
        prompt: 'Humans evolved from…',
        correct: 'a common ancestor we share with monkeys',
        wrong: 'modern monkeys'
      }
    },
    'claw-gravity': {
      engine: 'claw', subject: 'Physics', level: 'GCSE', topicDisplay: 'Gravity in Space',
      concepts: [
        { term: 'Freefall', def: 'Motion in which the only force acting is gravity.' },
        { term: 'Orbit', def: 'The curved path of an object around a star, planet or moon.' },
        { term: 'Gravitational Field', def: 'A region in which a mass experiences a force due to gravity.' },
        { term: 'Weight', def: 'The force on an object due to gravity, W = m g.' },
        { term: 'Mass', def: 'The amount of matter in an object, in kilograms.' }
      ],
      hero: {
        prompt: 'Astronauts float on the ISS because…',
        correct: 'they are constantly falling around Earth',
        wrong: 'there is no gravity in space'
      }
    },
    'pusher-acids': {
      engine: 'coin-pusher', subject: 'Chemistry', level: 'GCSE', topicDisplay: 'Strong vs Concentrated Acids',
      concepts: [
        { term: 'Strong Acid', def: 'An acid that fully ionises in water.' },
        { term: 'Concentrated Acid', def: 'An acid with a large amount of acid per unit volume.' },
        { term: 'Weak Acid', def: 'An acid that only partially ionises in water.' },
        { term: 'Dilute Acid', def: 'An acid with a small amount of acid per unit volume.' },
        { term: 'pH', def: 'A measure of the concentration of hydrogen ions.' }
      ],
      hero: {
        prompt: 'A STRONG acid is one that…',
        correct: 'fully ionises in water',
        wrong: 'has a large amount of acid per volume'
      }
    },
    'pusher-absorption': {
      engine: 'coin-pusher', subject: 'Biology', level: 'GCSE', topicDisplay: 'Absorption',
      concepts: [
        { term: 'Absorption', def: 'Soluble food molecules passing into the blood, mainly in the small intestine.' },
        { term: 'Digestion', def: 'The breakdown of large insoluble food molecules into small soluble ones.' },
        { term: 'Small Intestine', def: 'The organ where most digestion is completed and most absorption occurs.' },
        { term: 'Stomach', def: 'A muscular organ that churns food and begins protein digestion.' },
        { term: 'Villi', def: 'Tiny folds that increase the small intestine surface area for absorption.' }
      ],
      hero: {
        prompt: 'Most digested food is absorbed into the blood in the…',
        correct: 'small intestine',
        wrong: 'stomach'
      }
    },
    'pacman-waves': {
      engine: 'pacman', subject: 'Physics', level: 'GCSE', topicDisplay: 'Waves',
      concepts: [
        { term: 'Wave', def: 'A disturbance that transfers energy from one place to another without transferring matter.' },
        { term: 'Amplitude', def: 'The maximum displacement of a point on a wave from its rest position.' },
        { term: 'Frequency', def: 'The number of waves passing a point each second, in hertz.' },
        { term: 'Wavelength', def: 'The distance between the same point on two adjacent waves.' },
        { term: 'Transverse Wave', def: 'A wave in which the vibrations are at right angles to the direction of energy transfer.' }
      ],
      hero: {
        prompt: 'As a wave travels across the sea, what moves along with it?',
        correct: 'energy',
        wrong: 'the water'
      }
    },
    'pacman-current': {
      engine: 'pacman', subject: 'Physics', level: 'GCSE', topicDisplay: 'Electric Circuits',
      concepts: [
        { term: 'Current', def: 'The rate of flow of electric charge, the same at every point in a series circuit.' },
        { term: 'Charge', def: 'A property of matter, in coulombs, whose flow forms a current.' },
        { term: 'Series Circuit', def: 'A single-loop circuit in which the current is the same everywhere.' },
        { term: 'Potential Difference', def: 'The energy transferred per unit charge, in volts.' },
        { term: 'Resistance', def: 'A measure of how hard it is for current to flow, in ohms.' }
      ],
      hero: {
        prompt: 'As current flows round a series circuit, it…',
        correct: 'stays the same at every point',
        wrong: 'gets used up by the bulb'
      }
    },
    'invaders-antibiotics': {
      engine: 'spaceinvaders', subject: 'Biology', level: 'GCSE', topicDisplay: 'Antibiotics',
      concepts: [
        { term: 'Antibiotic', def: 'A medicine that kills bacteria or stops their growth, with no effect on viruses.' },
        { term: 'Bacteria', def: 'Single-celled microorganisms, some of which cause disease.' },
        { term: 'Virus', def: 'A tiny pathogen that reproduces inside host cells and causes disease.' },
        { term: 'Pathogen', def: 'A microorganism that causes an infectious disease.' },
        { term: 'Antibiotic Resistance', def: 'When bacteria evolve so antibiotics no longer kill them.' }
      ],
      hero: {
        prompt: 'Antibiotics can kill…',
        correct: 'bacteria only',
        wrong: 'viruses, like a cold'
      }
    },
    'invaders-expansion': {
      engine: 'spaceinvaders', subject: 'Physics', level: 'GCSE', topicDisplay: 'Thermal Expansion',
      concepts: [
        { term: 'Thermal Expansion', def: 'A substance getting larger because its particles move further apart.' },
        { term: 'Particle', def: 'A tiny building block of matter such as an atom or molecule.' },
        { term: 'Kinetic Energy', def: 'The energy a particle has because of its movement.' },
        { term: 'Internal Energy', def: 'The total kinetic and potential energy of all particles in a substance.' },
        { term: 'Density', def: 'The mass per unit volume of a substance.' }
      ],
      hero: {
        prompt: 'When something is heated and expands, its particles…',
        correct: 'move further apart',
        wrong: 'get bigger'
      }
    },
    "invaders-brain-myth": {
      engine: "spaceinvaders", subject: "Biology", level: "Science", topicDisplay: "Brain Myths",
      concepts: [
        { term: "Neuron", def: "A cell that carries electrical impulses around the nervous system." },
        { term: "Cerebrum", def: "The largest part of the brain, controlling thought and voluntary action." },
        { term: "Synapse", def: "A tiny gap between neurons where a signal is passed on." },
        { term: "Brain Scan", def: "Imaging that shows activity right across the brain, not just a tenth of it." }
      ],
      hero: {
        prompt: "TRUE OR FALSE: We only use 10% of our brains.",
        correct: "FALSE",
        wrong: "TRUE"
      }
    },
    "pacman-lightning-myth": {
      engine: "pacman", subject: "Physics", level: "Science", topicDisplay: "Weather Myths",
      concepts: [
        { term: "Lightning", def: "A large electrical discharge between clouds or to the ground." },
        { term: "Static Charge", def: "A build-up of electric charge on an object." },
        { term: "Conductor", def: "A material that lets electric charge flow through it easily." },
        { term: "Earthing", def: "Giving charge a safe path to flow to the ground." }
      ],
      hero: {
        prompt: "TRUE OR FALSE: Lightning never strikes the same place twice.",
        correct: "FALSE",
        wrong: "TRUE"
      }
    },
    "claw-falling-myth": {
      engine: "claw", subject: "Physics", level: "GCSE", topicDisplay: "Falling Objects",
      concepts: [
        { term: "Gravity", def: "A force of attraction between masses." },
        { term: "Air Resistance", def: "A frictional force from the air that opposes motion." },
        { term: "Free Fall", def: "Motion under gravity alone, with no air resistance." },
        { term: "Acceleration", def: "How quickly velocity changes, measured in m/s²." }
      ],
      hero: {
        prompt: "TRUE OR FALSE: In a vacuum, heavier objects fall faster.",
        correct: "FALSE",
        wrong: "TRUE"
      }
    },
    "pusher-sun-colour": {
      engine: "coin-pusher", subject: "Physics", level: "Science", topicDisplay: "The Sun's Colour",
      concepts: [
        { term: "White Light", def: "Light made of all the colours of the spectrum mixed together." },
        { term: "Scattering", def: "The spreading of light in different directions by particles." },
        { term: "Spectrum", def: "The range of colours that light can be split into." },
        { term: "Star", def: "A huge ball of gas releasing energy by nuclear fusion." }
      ],
      hero: {
        prompt: "TRUE OR FALSE: Seen from space, the Sun is really yellow.",
        correct: "FALSE",
        wrong: "TRUE"
      }
    },
    "invaders-glass-myth": {
      engine: "spaceinvaders", subject: "Chemistry", level: "GCSE", topicDisplay: "States of Matter",
      concepts: [
        { term: "Solid", def: "A state with a fixed shape and volume; particles vibrate in place." },
        { term: "Amorphous Solid", def: "A solid whose particles have no regular pattern, like glass." },
        { term: "Liquid", def: "A state that flows and takes the shape of its container." },
        { term: "Melting Point", def: "The temperature at which a solid turns to a liquid." }
      ],
      hero: {
        prompt: "TRUE OR FALSE: Glass is really a slow-flowing liquid.",
        correct: "FALSE",
        wrong: "TRUE"
      }
    },
    "pacman-blood-colour": {
      engine: "pacman", subject: "Biology", level: "GCSE", topicDisplay: "Blood",
      concepts: [
        { term: "Red Blood Cell", def: "A cell that carries oxygen using haemoglobin." },
        { term: "Haemoglobin", def: "The red pigment in blood that binds to oxygen." },
        { term: "Vein", def: "A blood vessel that returns blood to the heart." },
        { term: "Plasma", def: "The pale liquid part of blood that carries cells and nutrients." }
      ],
      hero: {
        prompt: "TRUE OR FALSE: The blood inside your veins is blue.",
        correct: "FALSE",
        wrong: "TRUE"
      }
    },
    "claw-water-conduct": {
      engine: "claw", subject: "Chemistry", level: "GCSE", topicDisplay: "Electrical Conductivity",
      concepts: [
        { term: "Ion", def: "A charged particle formed when an atom gains or loses electrons." },
        { term: "Conductor", def: "A material that allows electric charge to flow through it." },
        { term: "Insulator", def: "A material that does not let charge flow easily." },
        { term: "Distilled Water", def: "Very pure water with almost no dissolved ions to carry current." }
      ],
      hero: {
        prompt: "TRUE OR FALSE: Pure water is a good conductor of electricity.",
        correct: "FALSE",
        wrong: "TRUE"
      }
    },
    "pusher-cold-myth": {
      engine: "coin-pusher", subject: "Biology", level: "Science", topicDisplay: "Catching Colds",
      concepts: [
        { term: "Virus", def: "A tiny pathogen that reproduces inside living cells." },
        { term: "Pathogen", def: "A microorganism that causes disease." },
        { term: "Immune System", def: "The body’s defence against pathogens." },
        { term: "Droplet Infection", def: "The spread of pathogens in airborne droplets." }
      ],
      hero: {
        prompt: "TRUE OR FALSE: Cold weather itself gives you a cold.",
        correct: "FALSE",
        wrong: "TRUE"
      }
    },
    "invaders-senses-myth": {
      engine: "spaceinvaders", subject: "Biology", level: "GCSE", topicDisplay: "The Senses",
      concepts: [
        { term: "Receptor", def: "A cell that detects a stimulus such as light or heat." },
        { term: "Balance", def: "The sense that keeps the body upright, detected in the ears." },
        { term: "Proprioception", def: "The sense of where your body parts are positioned." },
        { term: "Stimulus", def: "A change in the environment that a receptor detects." }
      ],
      hero: {
        prompt: "TRUE OR FALSE: Humans have only five senses.",
        correct: "FALSE",
        wrong: "TRUE"
      }
    },
    "pacman-seasons-myth": {
      engine: "pacman", subject: "Physics", level: "Science", topicDisplay: "Seasons",
      concepts: [
        { term: "Axial Tilt", def: "The angle of Earth’s axis, about 23.5°, which causes the seasons." },
        { term: "Orbit", def: "The path of Earth around the Sun, taking one year." },
        { term: "Hemisphere", def: "One half of the Earth, north or south of the equator." },
        { term: "Radiation", def: "Energy from the Sun that reaches Earth as light and heat." }
      ],
      hero: {
        prompt: "TRUE OR FALSE: Summer happens because Earth is closer to the Sun.",
        correct: "FALSE",
        wrong: "TRUE"
      }
    },
    "claw-banana-herb": {
      engine: "claw", subject: "Biology", level: "Science", topicDisplay: "Plant Facts",
      concepts: [
        { term: "Herb", def: "A plant with a non-woody stem — the banana plant is one." },
        { term: "Stem", def: "The part of a plant that supports leaves and carries water." },
        { term: "Photosynthesis", def: "How plants make glucose using light energy." },
        { term: "Fruit", def: "The seed-containing structure that forms from a flower." }
      ],
      hero: {
        prompt: "TRUE OR FALSE: Bananas grow on trees.",
        correct: "FALSE",
        wrong: "TRUE"
      }
    },
    "pusher-sharks-fish": {
      engine: "coin-pusher", subject: "Biology", level: "Science", topicDisplay: "Classification",
      concepts: [
        { term: "Fish", def: "A cold-blooded animal with gills that lives in water." },
        { term: "Mammal", def: "A warm-blooded animal with hair that feeds its young on milk." },
        { term: "Gills", def: "Organs that let aquatic animals take oxygen from water." },
        { term: "Cartilage", def: "The tough, flexible tissue that forms a shark’s skeleton." }
      ],
      hero: {
        prompt: "TRUE OR FALSE: Sharks are mammals.",
        correct: "FALSE",
        wrong: "TRUE"
      }
    },
    "pacman-diamond-coal": {
      engine: "pacman", subject: "Chemistry", level: "Science", topicDisplay: "Carbon",
      concepts: [
        { term: "Diamond", def: "A form of carbon with each atom bonded to four others." },
        { term: "Graphite", def: "A soft form of carbon used in pencils." },
        { term: "Coal", def: "A fossil fuel formed from ancient plant matter." },
        { term: "Allotrope", def: "Different forms of the same element, like diamond and graphite." }
      ],
      hero: {
        prompt: "TRUE OR FALSE: Diamonds are made from coal.",
        correct: "FALSE",
        wrong: "TRUE"
      }
    },
    "invaders-earth-orbit": {
      engine: "spaceinvaders", subject: "Physics", level: "Science", topicDisplay: "Earth's Orbit",
      concepts: [
        { term: "Orbit", def: "The near-circular path of Earth around the Sun." },
        { term: "Axial Tilt", def: "Earth’s 23.5° tilt — the real cause of the seasons." },
        { term: "Aphelion", def: "The point in Earth’s orbit furthest from the Sun." },
        { term: "Perihelion", def: "The point in Earth’s orbit closest to the Sun." }
      ],
      hero: {
        prompt: "TRUE OR FALSE: Earth is closest to the Sun during summer.",
        correct: "FALSE",
        wrong: "TRUE"
      }
    },
    "claw-sound-light-speed": {
      engine: "claw", subject: "Physics", level: "GCSE", topicDisplay: "Waves & Speed",
      concepts: [
        { term: "Speed of Light", def: "About 300 million metres per second in a vacuum." },
        { term: "Speed of Sound", def: "About 340 metres per second in air." },
        { term: "Wave", def: "A disturbance that transfers energy without transferring matter." },
        { term: "Vacuum", def: "A space with no particles, where sound cannot travel." }
      ],
      hero: {
        prompt: "TRUE OR FALSE: Sound travels faster than light.",
        correct: "FALSE",
        wrong: "TRUE"
      }
    },
    "pusher-octopus-hearts": {
      engine: "coin-pusher", subject: "Biology", level: "Science", topicDisplay: "Animal Bodies",
      concepts: [
        { term: "Heart", def: "A muscular organ that pumps blood around the body." },
        { term: "Gills", def: "Organs used to take oxygen from water." },
        { term: "Circulatory System", def: "The system of heart and vessels that moves blood." },
        { term: "Invertebrate", def: "An animal without a backbone, such as an octopus." }
      ],
      hero: {
        prompt: "TRUE OR FALSE: An octopus has three hearts.",
        correct: "TRUE",
        wrong: "FALSE"
      }
    },
    "invaders-penguins": {
      engine: "spaceinvaders", subject: "Biology", level: "Science", topicDisplay: "Habitats",
      concepts: [
        { term: "Habitat", def: "The place where an organism lives." },
        { term: "Adaptation", def: "A feature that helps an organism survive in its habitat." },
        { term: "Hemisphere", def: "Half of the Earth; many penguins live in the southern one." },
        { term: "Species", def: "A group of organisms that can breed to give fertile offspring." }
      ],
      hero: {
        prompt: "TRUE OR FALSE: Penguins only live in Antarctica.",
        correct: "FALSE",
        wrong: "TRUE"
      }
    },
    "pacman-gold-magnet": {
      engine: "pacman", subject: "Chemistry", level: "Science", topicDisplay: "Magnetism",
      concepts: [
        { term: "Magnetic Material", def: "A material attracted to a magnet, such as iron." },
        { term: "Iron", def: "A common magnetic metal used to make steel." },
        { term: "Gold", def: "An unreactive metal that is not magnetic." },
        { term: "Magnetic Field", def: "The region around a magnet where it exerts a force." }
      ],
      hero: {
        prompt: "TRUE OR FALSE: Pure gold is magnetic.",
        correct: "FALSE",
        wrong: "TRUE"
      }
    },
    "claw-lightning-tf": {
      engine: "claw", subject: "Physics", level: "Science", topicDisplay: "Weather Myths",
      concepts: [
        { term: "Lightning", def: "A large electrical discharge in the atmosphere." },
        { term: "Lightning Rod", def: "A metal strip that safely conducts lightning to earth." },
        { term: "Conductor", def: "A material that lets charge flow easily." },
        { term: "Discharge", def: "The sudden flow of built-up electric charge." }
      ],
      hero: {
        prompt: "TRUE OR FALSE: Tall buildings are struck by lightning many times a year.",
        correct: "TRUE",
        wrong: "FALSE"
      }
    },
    "pusher-senses-tf": {
      engine: "coin-pusher", subject: "Biology", level: "GCSE", topicDisplay: "The Senses",
      concepts: [
        { term: "Receptor", def: "A cell that detects a change in the environment." },
        { term: "Thermoreceptor", def: "A receptor that detects temperature." },
        { term: "Balance", def: "The sense of staying upright, detected in the inner ear." },
        { term: "Nociceptor", def: "A receptor that detects pain." }
      ],
      hero: {
        prompt: "TRUE OR FALSE: Humans have more than five senses.",
        correct: "TRUE",
        wrong: "FALSE"
      }
    },
    "invaders-most-moons": {
      engine: "spaceinvaders", subject: "Physics", level: "Science", topicDisplay: "The Solar System",
      concepts: [
        { term: "Moon", def: "A natural satellite that orbits a planet." },
        { term: "Saturn", def: "The ringed gas giant with the most known moons." },
        { term: "Satellite", def: "An object that orbits a larger body." },
        { term: "Gas Giant", def: "A large planet made mostly of gas, like Saturn." }
      ],
      hero: {
        prompt: "ONLY 15% GET THIS RIGHT: Which planet has the most moons?",
        correct: "Saturn",
        wrong: "Jupiter"
      }
    },
    "pacman-potassium-symbol": {
      engine: "pacman", subject: "Chemistry", level: "GCSE", topicDisplay: "Chemical Symbols",
      concepts: [
        { term: "Potassium", def: "A reactive metal with the symbol K." },
        { term: "Chemical Symbol", def: "A one- or two-letter code for an element." },
        { term: "Periodic Table", def: "A chart of the elements arranged by structure." },
        { term: "Element", def: "A substance made of only one type of atom." }
      ],
      hero: {
        prompt: "ONLY 15% GET THIS RIGHT: What is the chemical symbol for potassium?",
        correct: "K",
        wrong: "P"
      }
    },
    "claw-bones-206": {
      engine: "claw", subject: "Biology", level: "GCSE", topicDisplay: "The Skeleton",
      concepts: [
        { term: "Skeleton", def: "The framework of bones that supports the body." },
        { term: "Bone", def: "A hard organ that supports and protects the body." },
        { term: "Cartilage", def: "Flexible tissue that cushions the joints." },
        { term: "Joint", def: "A place where two bones meet." }
      ],
      hero: {
        prompt: "ONLY 15% GET THIS RIGHT: How many bones are in the adult human body?",
        correct: "206",
        wrong: "212"
      }
    },
    "pusher-mercury-metal": {
      engine: "coin-pusher", subject: "Chemistry", level: "GCSE", topicDisplay: "Metals",
      concepts: [
        { term: "Mercury", def: "A metal that is liquid at room temperature." },
        { term: "Melting Point", def: "The temperature at which a solid becomes a liquid." },
        { term: "Metal", def: "An element that is usually shiny and conducts electricity." },
        { term: "Room Temperature", def: "About 20–25°C, used as a standard condition." }
      ],
      hero: {
        prompt: "ONLY 15% GET THIS RIGHT: Which metal is liquid at room temperature?",
        correct: "Mercury",
        wrong: "Lead"
      }
    },
    "invaders-si-force": {
      engine: "spaceinvaders", subject: "Physics", level: "GCSE", topicDisplay: "Units",
      concepts: [
        { term: "Newton", def: "The SI unit of force." },
        { term: "Force", def: "A push or a pull, measured in newtons." },
        { term: "Joule", def: "The SI unit of energy." },
        { term: "SI Units", def: "The standard system of units used in science." }
      ],
      hero: {
        prompt: "ONLY 15% GET THIS RIGHT: What is the SI unit of force?",
        correct: "Newton",
        wrong: "Joule"
      }
    },
    "pacman-plants-gas": {
      engine: "pacman", subject: "Biology", level: "GCSE", topicDisplay: "Photosynthesis",
      concepts: [
        { term: "Carbon Dioxide", def: "The gas plants absorb to make glucose." },
        { term: "Photosynthesis", def: "Making glucose from carbon dioxide and water using light." },
        { term: "Chlorophyll", def: "The green pigment that absorbs light for photosynthesis." },
        { term: "Stomata", def: "Tiny leaf pores that let gases in and out." }
      ],
      hero: {
        prompt: "ONLY 15% GET THIS RIGHT: Which gas do plants absorb for photosynthesis?",
        correct: "Carbon dioxide",
        wrong: "Oxygen"
      }
    },
    "claw-largest-organ": {
      engine: "claw", subject: "Biology", level: "GCSE", topicDisplay: "Organs",
      concepts: [
        { term: "Skin", def: "The body’s largest organ, forming a protective barrier." },
        { term: "Organ", def: "A group of tissues working together for a function." },
        { term: "Epidermis", def: "The outer protective layer of the skin." },
        { term: "Liver", def: "A large organ that processes nutrients and toxins." }
      ],
      hero: {
        prompt: "ONLY 15% GET THIS RIGHT: What is the largest organ in the human body?",
        correct: "Skin",
        wrong: "Liver"
      }
    },
    "pusher-atp-organelle": {
      engine: "coin-pusher", subject: "Biology", level: "GCSE", topicDisplay: "Cells",
      concepts: [
        { term: "Mitochondrion", def: "The organelle where aerobic respiration makes ATP." },
        { term: "ATP", def: "The molecule cells use to store and release energy." },
        { term: "Ribosome", def: "The organelle that builds proteins." },
        { term: "Respiration", def: "The release of energy from glucose inside cells." }
      ],
      hero: {
        prompt: "ONLY 15% GET THIS RIGHT: Which organelle produces most of a cell’s ATP?",
        correct: "Mitochondria",
        wrong: "Ribosome"
      }
    },
    "invaders-nitrogen-air": {
      engine: "spaceinvaders", subject: "Chemistry", level: "Science", topicDisplay: "The Atmosphere",
      concepts: [
        { term: "Nitrogen", def: "The gas that makes up about 78% of the air." },
        { term: "Oxygen", def: "The gas that makes up about 21% of the air." },
        { term: "Atmosphere", def: "The layer of gases surrounding the Earth." },
        { term: "Noble Gases", def: "Unreactive gases like argon, a small part of the air." }
      ],
      hero: {
        prompt: "ONLY 15% GET THIS RIGHT: About what percentage of the air is nitrogen?",
        correct: "About 78%",
        wrong: "About 21%"
      }
    },
    "pacman-fastest-animal": {
      engine: "pacman", subject: "Biology", level: "Science", topicDisplay: "Animals",
      concepts: [
        { term: "Cheetah", def: "The fastest land animal over short distances." },
        { term: "Adaptation", def: "A feature that helps an animal survive." },
        { term: "Predator", def: "An animal that hunts others for food." },
        { term: "Streamlining", def: "A shape that reduces air resistance for speed." }
      ],
      hero: {
        prompt: "ONLY 15% GET THIS RIGHT: What is the fastest land animal?",
        correct: "Cheetah",
        wrong: "Pronghorn"
      }
    },
    "claw-photosynthesis-site": {
      engine: "claw", subject: "Biology", level: "GCSE", topicDisplay: "Photosynthesis",
      concepts: [
        { term: "Leaf", def: "The main organ where photosynthesis takes place." },
        { term: "Chloroplast", def: "The organelle containing chlorophyll for photosynthesis." },
        { term: "Chlorophyll", def: "The green pigment that absorbs light energy." },
        { term: "Root", def: "The organ that absorbs water and minerals, not light." }
      ],
      hero: {
        prompt: "SPOT THE MISTAKE: Where does most photosynthesis happen?",
        correct: "In the leaves",
        wrong: "In the roots"
      }
    },
    "pusher-electron-charge": {
      engine: "coin-pusher", subject: "Physics", level: "GCSE", topicDisplay: "Atomic Structure",
      concepts: [
        { term: "Electron", def: "A negatively charged particle that orbits the nucleus." },
        { term: "Proton", def: "A positively charged particle in the nucleus." },
        { term: "Neutron", def: "A particle in the nucleus with no charge." },
        { term: "Nucleus", def: "The central core of an atom." }
      ],
      hero: {
        prompt: "SPOT THE MISTAKE: What charge does an electron carry?",
        correct: "Negative",
        wrong: "Positive"
      }
    },
    "invaders-heart-chambers": {
      engine: "spaceinvaders", subject: "Biology", level: "GCSE", topicDisplay: "The Heart",
      concepts: [
        { term: "Atrium", def: "An upper chamber of the heart that receives blood." },
        { term: "Ventricle", def: "A lower chamber that pumps blood out of the heart." },
        { term: "Heart", def: "A four-chambered organ that pumps blood." },
        { term: "Valve", def: "A flap that stops blood flowing backwards." }
      ],
      hero: {
        prompt: "SPOT THE MISTAKE: How many chambers does the human heart have?",
        correct: "Four",
        wrong: "Three"
      }
    },
    "pacman-evaporation-temp": {
      engine: "pacman", subject: "Chemistry", level: "GCSE", topicDisplay: "Evaporation",
      concepts: [
        { term: "Evaporation", def: "Liquid turning to gas at the surface, at any temperature." },
        { term: "Boiling", def: "Rapid change to gas throughout a liquid at its boiling point." },
        { term: "Particle", def: "A tiny piece of matter that can gain energy and escape." },
        { term: "Condensation", def: "Gas turning back into a liquid." }
      ],
      hero: {
        prompt: "SPOT THE MISTAKE: At what temperature can water evaporate?",
        correct: "Any temperature",
        wrong: "Only at 100°C"
      }
    },
    "claw-sound-vacuum": {
      engine: "claw", subject: "Physics", level: "GCSE", topicDisplay: "Sound Waves",
      concepts: [
        { term: "Sound", def: "A wave caused by vibrating particles." },
        { term: "Vacuum", def: "A space with no particles, where sound cannot travel." },
        { term: "Medium", def: "The material a wave travels through." },
        { term: "Longitudinal Wave", def: "A wave where particles vibrate along its direction of travel." }
      ],
      hero: {
        prompt: "SPOT THE MISTAKE: Can sound travel through a vacuum?",
        correct: "No — it needs particles",
        wrong: "Yes"
      }
    },
    "pusher-moon-light": {
      engine: "coin-pusher", subject: "Physics", level: "Science", topicDisplay: "The Moon",
      concepts: [
        { term: "Moon", def: "Earth’s natural satellite, seen by reflected sunlight." },
        { term: "Reflection", def: "Light bouncing off a surface." },
        { term: "Phase", def: "The shape of the lit part of the Moon we see." },
        { term: "Satellite", def: "An object that orbits a planet." }
      ],
      hero: {
        prompt: "SPOT THE MISTAKE: The light from the Moon is…",
        correct: "Reflected sunlight",
        wrong: "Made by the Moon"
      }
    },
    "invaders-bacteria-harm": {
      engine: "spaceinvaders", subject: "Biology", level: "GCSE", topicDisplay: "Microorganisms",
      concepts: [
        { term: "Bacteria", def: "Single-celled microorganisms, most of them harmless." },
        { term: "Pathogen", def: "A microorganism that causes disease." },
        { term: "Decomposer", def: "An organism that breaks down dead material." },
        { term: "Gut Bacteria", def: "Helpful bacteria that aid digestion." }
      ],
      hero: {
        prompt: "SPOT THE MISTAKE: Most bacteria are…",
        correct: "Harmless or helpful",
        wrong: "Disease-causing"
      }
    },
    "pacman-ice-density": {
      engine: "pacman", subject: "Chemistry", level: "GCSE", topicDisplay: "Density",
      concepts: [
        { term: "Density", def: "The mass per unit volume of a substance." },
        { term: "Ice", def: "Solid water that is less dense than liquid water." },
        { term: "Floating", def: "What happens when an object is less dense than the liquid." },
        { term: "Volume", def: "The amount of space something takes up." }
      ],
      hero: {
        prompt: "SPOT THE MISTAKE: Compared with liquid water, ice is…",
        correct: "Less dense (so it floats)",
        wrong: "More dense"
      }
    },
    "claw-gravity-universe": {
      engine: "claw", subject: "Physics", level: "GCSE", topicDisplay: "Gravity",
      concepts: [
        { term: "Gravity", def: "A force of attraction between all masses." },
        { term: "Gravitational Field", def: "A region where a mass feels a gravitational force." },
        { term: "Weight", def: "The force of gravity on a mass, W = m g." },
        { term: "Mass", def: "The amount of matter in an object." }
      ],
      hero: {
        prompt: "SPOT THE MISTAKE: Where does gravity act?",
        correct: "Everywhere in the universe",
        wrong: "Only on Earth"
      }
    },
    "pusher-closest-planet": {
      engine: "coin-pusher", subject: "Physics", level: "Science", topicDisplay: "The Solar System",
      concepts: [
        { term: "Orbit", def: "The path of a planet around the Sun." },
        { term: "Inner Planet", def: "A rocky planet close to the Sun, like Mercury or Venus." },
        { term: "Mercury", def: "The smallest planet and, on average over time, Earth’s nearest." },
        { term: "Astronomical Unit", def: "The average Earth–Sun distance." }
      ],
      hero: {
        prompt: "SPOT THE MISTAKE: On average over time, which planet is closest to Earth?",
        correct: "Mercury",
        wrong: "Venus"
      }
    },
    "invaders-sky-blue": {
      engine: "spaceinvaders", subject: "Physics", level: "GCSE", topicDisplay: "Light & Scattering",
      concepts: [
        { term: "Scattering", def: "The spreading of light by particles in the air." },
        { term: "Wavelength", def: "The distance between two peaks of a wave." },
        { term: "Visible Spectrum", def: "The band of colours found in white light." },
        { term: "Atmosphere", def: "The gases around Earth that scatter sunlight." }
      ],
      hero: {
        prompt: "Why is the sky blue?",
        correct: "Blue light scatters most in the air",
        wrong: "It reflects the blue oceans"
      }
    },
    "pacman-ice-float": {
      engine: "pacman", subject: "Chemistry", level: "GCSE", topicDisplay: "Density",
      concepts: [
        { term: "Density", def: "The mass per unit volume of a substance." },
        { term: "Ice", def: "Solid water that is less dense than the liquid." },
        { term: "Hydrogen Bond", def: "The bond that spaces out water molecules as ice forms." },
        { term: "Floating", def: "What happens when something is less dense than the liquid." }
      ],
      hero: {
        prompt: "Why does ice float on water?",
        correct: "It is less dense than water",
        wrong: "Trapped air holds it up"
      }
    },
    "claw-why-seasons": {
      engine: "claw", subject: "Physics", level: "Science", topicDisplay: "Seasons",
      concepts: [
        { term: "Axial Tilt", def: "Earth’s 23.5° tilt, the cause of the seasons." },
        { term: "Orbit", def: "Earth’s yearly path around the Sun." },
        { term: "Hemisphere", def: "One half of the Earth, north or south." },
        { term: "Insolation", def: "The amount of solar energy reaching a surface." }
      ],
      hero: {
        prompt: "Why do we have seasons?",
        correct: "Earth’s axis is tilted",
        wrong: "Earth is closer to the Sun in summer"
      }
    },
    "pusher-leaves-green": {
      engine: "coin-pusher", subject: "Biology", level: "GCSE", topicDisplay: "Photosynthesis",
      concepts: [
        { term: "Chlorophyll", def: "The green pigment that reflects green light." },
        { term: "Pigment", def: "A substance that absorbs some colours of light." },
        { term: "Reflection", def: "Light bouncing off a surface." },
        { term: "Photosynthesis", def: "Making glucose using light energy." }
      ],
      hero: {
        prompt: "Why do leaves look green?",
        correct: "Chlorophyll reflects green light",
        wrong: "Chlorophyll absorbs green light"
      }
    },
    "invaders-metals-conduct": {
      engine: "spaceinvaders", subject: "Physics", level: "GCSE", topicDisplay: "Bonding",
      concepts: [
        { term: "Metallic Bond", def: "Attraction between metal ions and a sea of free electrons." },
        { term: "Free Electron", def: "A delocalised electron that can move and carry charge." },
        { term: "Conductor", def: "A material that lets charge flow." },
        { term: "Delocalised", def: "Describing electrons free to move through a metal." }
      ],
      hero: {
        prompt: "Why do metals conduct electricity?",
        correct: "They have free-moving electrons",
        wrong: "They have free-moving protons"
      }
    },
    "pacman-lightning-hot": {
      engine: "pacman", subject: "Physics", level: "Science", topicDisplay: "Lightning",
      concepts: [
        { term: "Lightning", def: "A discharge that heats the air to about 30,000°C." },
        { term: "Thunder", def: "The sound made as superheated air expands very fast." },
        { term: "Plasma", def: "Superheated, ionised gas formed in a lightning bolt." },
        { term: "Discharge", def: "The sudden flow of built-up electric charge." }
      ],
      hero: {
        prompt: "Why is lightning so hot?",
        correct: "It superheats the air to ~30,000°C",
        wrong: "It carries heat down from the clouds"
      }
    },
    "claw-salt-ice": {
      engine: "claw", subject: "Chemistry", level: "GCSE", topicDisplay: "Freezing Point",
      concepts: [
        { term: "Freezing Point", def: "The temperature at which a liquid becomes a solid." },
        { term: "Salt", def: "A substance that lowers the freezing point of water." },
        { term: "Solute", def: "A substance that dissolves in a solvent." },
        { term: "Dissolving", def: "Mixing a solute evenly into a solvent." }
      ],
      hero: {
        prompt: "Why does salt melt ice?",
        correct: "It lowers water’s freezing point",
        wrong: "It reacts with ice to make heat"
      }
    },
    "pusher-breathe-underwater": {
      engine: "coin-pusher", subject: "Biology", level: "GCSE", topicDisplay: "Gas Exchange",
      concepts: [
        { term: "Lungs", def: "Organs that take oxygen from the air." },
        { term: "Gills", def: "Organs that fish use to take oxygen from water." },
        { term: "Alveoli", def: "Tiny air sacs where gas exchange happens in the lungs." },
        { term: "Diffusion", def: "Movement of particles from high to low concentration." }
      ],
      hero: {
        prompt: "Why can’t humans breathe underwater?",
        correct: "Lungs can’t extract dissolved oxygen",
        wrong: "There is no oxygen in water"
      }
    },
    "invaders-astronauts-float": {
      engine: "spaceinvaders", subject: "Physics", level: "GCSE", topicDisplay: "Gravity & Orbits",
      concepts: [
        { term: "Free Fall", def: "Motion under gravity alone." },
        { term: "Orbit", def: "A curved path around a planet or star." },
        { term: "Gravity", def: "The force that keeps objects in orbit." },
        { term: "Weightlessness", def: "The feeling of free fall, not the absence of gravity." }
      ],
      hero: {
        prompt: "Why do astronauts float in orbit?",
        correct: "They are in constant free fall",
        wrong: "There is no gravity in space"
      }
    },
    "pacman-heart-exercise": {
      engine: "pacman", subject: "Biology", level: "GCSE", topicDisplay: "Exercise & Respiration",
      concepts: [
        { term: "Aerobic Respiration", def: "Releasing energy from glucose using oxygen." },
        { term: "Heart Rate", def: "The number of heartbeats per minute." },
        { term: "Oxygen", def: "The gas muscles need to release energy." },
        { term: "Circulation", def: "The movement of blood delivering oxygen and glucose." }
      ],
      hero: {
        prompt: "Why does your heart beat faster during exercise?",
        correct: "Muscles need more oxygen",
        wrong: "Blood gets thinner when warm"
      }
    }
  };
})();
