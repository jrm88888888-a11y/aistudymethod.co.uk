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
    }
  };
})();
