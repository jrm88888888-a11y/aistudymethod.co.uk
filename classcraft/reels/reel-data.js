/* reel-data.js — curated single-topic content packs for the TikTok reel games.
 * window.REELS[key] = { engine, subject, level, topicDisplay, concepts:[{term,def}], hero:{term, trap} }
 * The engine reel-mode forces hero.term's question to include hero.trap as a WRONG option
 * (correct = that concept's def), so the myth-busting beat is reliable every play.
 * All definitions authored to GCSE exam-board standard; verified 2026-07-19. */
(function () {
  window.REELS = {
    'claw-evolution': {
      engine: 'claw', subject: 'Biology', level: 'GCSE', topicDisplay: 'Evolution',
      concepts: [
        { term: 'Common Ancestor', def: 'A species from which two or more different species have evolved.' },
        { term: 'Natural Selection', def: 'The process by which organisms better suited to their environment survive and pass on their genes.' },
        { term: 'Variation', def: 'Differences in the characteristics of individuals in a population.' },
        { term: 'Adaptation', def: 'A feature that helps an organism survive and reproduce in its environment.' },
        { term: 'Evolution', def: 'The gradual change in the inherited characteristics of a population over many generations.' },
        { term: 'Species', def: 'A group of organisms that can breed together to produce fertile offspring.' }
      ],
      hero: { term: 'Common Ancestor', trap: 'Modern monkeys, which humans evolved directly from.' }
    },
    'claw-gravity': {
      engine: 'claw', subject: 'Physics', level: 'GCSE', topicDisplay: 'Gravity in Space',
      concepts: [
        { term: 'Freefall', def: 'Motion in which the only force acting on an object is gravity.' },
        { term: 'Orbit', def: 'The curved path of an object around a star, planet or moon.' },
        { term: 'Gravitational Field', def: 'A region in which a mass experiences a force due to gravity.' },
        { term: 'Weight', def: 'The force acting on an object due to gravity, W = m g.' },
        { term: 'Mass', def: 'The amount of matter in an object, measured in kilograms.' }
      ],
      hero: { term: 'Freefall', trap: 'A region beyond Earth where gravity no longer exists.' }
    },
    'pusher-acids': {
      engine: 'coin-pusher', subject: 'Chemistry', level: 'GCSE', topicDisplay: 'Strong vs Concentrated Acids',
      concepts: [
        { term: 'Strong Acid', def: 'An acid that fully ionises (dissociates) into ions in water.' },
        { term: 'Concentrated Acid', def: 'An acid with a large amount of acid dissolved per unit volume of water.' },
        { term: 'Weak Acid', def: 'An acid that only partially ionises in water.' },
        { term: 'Dilute Acid', def: 'An acid with a small amount of acid dissolved per unit volume of water.' },
        { term: 'pH', def: 'A measure of the concentration of hydrogen ions in a solution.' }
      ],
      hero: { term: 'Strong Acid', trap: 'An acid with a large amount of acid dissolved per volume.' }
    },
    'pusher-absorption': {
      engine: 'coin-pusher', subject: 'Biology', level: 'GCSE', topicDisplay: 'Absorption',
      concepts: [
        { term: 'Absorption', def: 'The passage of small soluble food molecules into the blood, mainly in the small intestine.' },
        { term: 'Digestion', def: 'The breakdown of large insoluble food molecules into small soluble ones.' },
        { term: 'Small Intestine', def: 'The organ where digestion is completed and most absorption of food occurs.' },
        { term: 'Stomach', def: 'A muscular organ that churns food and begins protein digestion using acid and enzymes.' },
        { term: 'Villi', def: 'Tiny folds lining the small intestine that increase the surface area for absorption.' }
      ],
      hero: { term: 'Absorption', trap: 'Food molecules passing into the blood through the stomach wall.' }
    },
    'pacman-amplitude': {
      engine: 'pacman', subject: 'Physics', level: 'GCSE', topicDisplay: 'Waves',
      concepts: [
        { term: 'Amplitude', def: 'The maximum displacement of a point on a wave from its rest position.' },
        { term: 'Frequency', def: 'The number of waves passing a point each second, measured in hertz.' },
        { term: 'Wavelength', def: 'The distance between the same point on two adjacent waves.' },
        { term: 'Transverse Wave', def: 'A wave in which the vibrations are at right angles to the direction of energy transfer.' },
        { term: 'Pitch', def: 'How high or low a sound is, determined by its frequency.' }
      ],
      hero: { term: 'Amplitude', trap: 'How high-pitched a sound is.' }
    },
    'pacman-current': {
      engine: 'pacman', subject: 'Physics', level: 'GCSE', topicDisplay: 'Electric Circuits',
      concepts: [
        { term: 'Current', def: 'The rate of flow of electric charge, the same at every point in a series circuit.' },
        { term: 'Charge', def: 'A property of matter, measured in coulombs, whose flow forms a current.' },
        { term: 'Series Circuit', def: 'A circuit with a single loop in which the current is the same everywhere.' },
        { term: 'Potential Difference', def: 'The energy transferred per unit charge between two points, measured in volts.' },
        { term: 'Resistance', def: 'A measure of how difficult it is for current to flow, measured in ohms.' }
      ],
      hero: { term: 'Current', trap: 'Electricity that gets used up as it flows around a circuit.' }
    },
    'invaders-antibiotics': {
      engine: 'spaceinvaders', subject: 'Biology', level: 'GCSE', topicDisplay: 'Antibiotics',
      concepts: [
        { term: 'Antibiotic', def: 'A medicine that kills bacteria or stops their growth, with no effect on viruses.' },
        { term: 'Bacteria', def: 'Single-celled microorganisms, some of which cause disease.' },
        { term: 'Virus', def: 'A tiny pathogen that can only reproduce inside a host cell and causes disease.' },
        { term: 'Pathogen', def: 'A microorganism that causes an infectious disease.' },
        { term: 'Antibiotic Resistance', def: 'When bacteria evolve so that antibiotics no longer kill them.' }
      ],
      hero: { term: 'Antibiotic', trap: 'A medicine that kills viruses such as the common cold.' }
    },
    'invaders-expansion': {
      engine: 'spaceinvaders', subject: 'Physics', level: 'GCSE', topicDisplay: 'Thermal Expansion',
      concepts: [
        { term: 'Thermal Expansion', def: 'When a substance becomes larger because its particles gain energy and move further apart.' },
        { term: 'Particle', def: 'A tiny building block of matter such as an atom or molecule.' },
        { term: 'Kinetic Energy', def: 'The energy a particle or object has because of its movement.' },
        { term: 'Internal Energy', def: 'The total kinetic and potential energy of all the particles in a substance.' },
        { term: 'Density', def: 'The mass per unit volume of a substance.' }
      ],
      hero: { term: 'Thermal Expansion', trap: 'When particles swell up and get bigger as they are heated.' }
    }
  };
})();
