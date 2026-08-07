/* Velvet Arcade — avatar roster dataset (v1)
   One record per figure. 39 figures (Milton, #28, was never generated).
   Roster + selection rule: claude/avatar-roster-final.md, avatar-roster-policy.md.
   Fields collapse to THREE: maths, science, literature.

   Art:  assets/avatars/512/NN-slug.webp   (card)
         assets/avatars/256/NN-slug.webp   (picker thumbnail)
   NN is the zero-padded id; slug matches the filename exactly.

   unlock — when the avatar becomes selectable:
     {type:"start"}                 available from registration (8 starters)
     {type:"element", item:"101"}   own that element (thematic: element named
                                     after the figure — Mendelevium→Mendeleev, etc.)
     {type:"count",  n:30}          own at least n elements (steady progression)

   DATA NOTE (Billy's standard): birth/death years and facts are from standard
   historical record. Dates that are genuinely approximate are marked "c.".
   Worth a final subject-specialist proofread before launch — flagged, not skipped. */

const VELVET_AVATAR_FIELDS = {
  maths:      { label: "Maths",      color: "#f5c542" },
  science:    { label: "Science",    color: "#5ee4e0" },
  literature: { label: "Literature", color: "#ff7ad9" }
};

const VELVET_AVATARS = [
  { id: 1,  slug: "archimedes",           name: "Archimedes",            field: "maths",      dates: "c. 287–212 BC", famousFor: "Founded statics and hydrostatics, approximated π, and pioneered a method that anticipated calculus.", hook: "Leapt from his bath shouting “Eureka!” when he grasped how to measure volume by displacement.", unlock: { type: "start" } },
  { id: 2,  slug: "ibn-al-haytham",       name: "Ibn al-Haytham",        field: "science",    dates: "c. 965–1040",   famousFor: "Wrote the Book of Optics and championed experiment as the test of truth — an early scientific method.", hook: "Showed that we see because light enters the eye, not because the eye sends out rays.", unlock: { type: "count", n: 80 } },
  { id: 3,  slug: "leonardo-da-vinci",    name: "Leonardo da Vinci",     field: "science",    dates: "1452–1519",     famousFor: "Polymath whose notebooks fused anatomy, engineering and art centuries ahead of their time.", hook: "Wrote his private notes in mirror-image handwriting, readable in a mirror.", unlock: { type: "count", n: 70 } },
  { id: 4,  slug: "galileo-galilei",      name: "Galileo Galilei",       field: "science",    dates: "1564–1642",     famousFor: "Turned the new telescope on the sky and argued the Earth orbits the Sun.", hook: "Discovered four moons of Jupiter — still called the Galilean moons.", unlock: { type: "count", n: 3 } },
  { id: 5,  slug: "isaac-newton",         name: "Isaac Newton",          field: "science",    dates: "1643–1727",     famousFor: "Gave us the laws of motion and universal gravitation, and co-invented calculus.", hook: "Split white light into a rainbow of colours with a single glass prism.", unlock: { type: "start" } },
  { id: 6,  slug: "antoine-lavoisier",    name: "Antoine Lavoisier",     field: "science",    dates: "1743–1794",     famousFor: "The father of modern chemistry: named oxygen and hydrogen and stated the conservation of mass.", hook: "Proved matter is never lost in a reaction — only rearranged.", unlock: { type: "count", n: 50 } },
  { id: 7,  slug: "edward-jenner",        name: "Edward Jenner",         field: "science",    dates: "1749–1823",     famousFor: "Created the first vaccine, against smallpox, founding the science of immunology.", hook: "“Vaccine” comes from vacca, Latin for cow — he used cowpox to protect against smallpox.", unlock: { type: "count", n: 58 } },
  { id: 8,  slug: "leonhard-euler",       name: "Leonhard Euler",        field: "maths",      dates: "1707–1783",     famousFor: "The most prolific mathematician in history; gave us the symbols e, i and f(x).", hook: "Kept producing brilliant mathematics even after going almost completely blind.", unlock: { type: "count", n: 7 } },
  { id: 9,  slug: "michael-faraday",      name: "Michael Faraday",       field: "science",    dates: "1791–1867",     famousFor: "Discovered electromagnetic induction — the principle behind every motor and generator.", hook: "Had almost no formal schooling and taught himself science while working as a bookbinder.", unlock: { type: "count", n: 9 } },
  { id: 10, slug: "mary-anning",          name: "Mary Anning",           field: "science",    dates: "1799–1847",     famousFor: "Found the first ichthyosaur and plesiosaur skeletons, helping build the new science of palaeontology.", hook: "The tongue-twister “she sells seashells” is said to be about her.", unlock: { type: "count", n: 15 } },
  { id: 11, slug: "charles-darwin",       name: "Charles Darwin",        field: "science",    dates: "1809–1882",     famousFor: "Explained the diversity of life through evolution by natural selection.", hook: "Gathered his evidence on a five-year voyage aboard HMS Beagle.", unlock: { type: "start" } },
  { id: 12, slug: "gregor-mendel",        name: "Gregor Mendel",         field: "science",    dates: "1822–1884",     famousFor: "Discovered the laws of inheritance — the foundation of genetics.", hook: "Worked out how traits pass on by breeding around 28,000 pea plants in a monastery garden.", unlock: { type: "count", n: 30 } },
  { id: 13, slug: "louis-pasteur",        name: "Louis Pasteur",         field: "science",    dates: "1822–1895",     famousFor: "Established germ theory and developed vaccines for rabies and anthrax.", hook: "Pasteurisation — gently heating food to kill microbes — is named after him.", unlock: { type: "count", n: 24 } },
  { id: 14, slug: "james-clerk-maxwell",  name: "James Clerk Maxwell",   field: "science",    dates: "1831–1879",     famousFor: "United electricity, magnetism and light in four equations.", hook: "Proved that light itself is an electromagnetic wave — and made the first colour photograph.", unlock: { type: "count", n: 38 } },
  { id: 15, slug: "dmitri-mendeleev",     name: "Dmitri Mendeleev",      field: "science",    dates: "1834–1907",     famousFor: "Created the periodic table, arranging the elements by their properties.", hook: "Left gaps for elements not yet discovered — and correctly predicted what they'd be like.", unlock: { type: "element", item: "101" } },
  { id: 16, slug: "ada-lovelace",         name: "Ada Lovelace",          field: "maths",      dates: "1815–1852",     famousFor: "Wrote the first algorithm intended for a machine — the first computer programmer.", hook: "She was the daughter of the poet Lord Byron.", unlock: { type: "start" } },
  { id: 17, slug: "marie-curie",          name: "Marie Curie",           field: "science",    dates: "1867–1934",     famousFor: "Discovered polonium and radium and coined the word “radioactivity”.", hook: "The only person ever to win Nobel Prizes in two different sciences — physics and chemistry.", unlock: { type: "start" } },
  { id: 18, slug: "ernest-rutherford",    name: "Ernest Rutherford",     field: "science",    dates: "1871–1937",     famousFor: "Discovered the atomic nucleus — the father of nuclear physics.", hook: "He was the first person to split the atom.", unlock: { type: "element", item: "104" } },
  { id: 19, slug: "lise-meitner",         name: "Lise Meitner",          field: "science",    dates: "1878–1968",     famousFor: "Co-discovered nuclear fission and was the first to explain how it works.", hook: "Element 109, meitnerium, is named in her honour.", unlock: { type: "element", item: "109" } },
  { id: 20, slug: "srinivasa-ramanujan",  name: "Srinivasa Ramanujan",   field: "maths",      dates: "1887–1920",     famousFor: "A largely self-taught genius who produced thousands of results in number theory.", hook: "Said many of his formulas came to him in dreams.", unlock: { type: "count", n: 66 } },
  { id: 21, slug: "rosalind-franklin",    name: "Rosalind Franklin",     field: "science",    dates: "1920–1958",     famousFor: "Her X-ray work — Photo 51 and her B-DNA analysis — was key to the DNA double helix.", hook: "Her famous “Photo 51” captured the shape of DNA.", unlock: { type: "count", n: 102 } },
  { id: 22, slug: "alan-turing",          name: "Alan Turing",           field: "maths",      dates: "1912–1954",     famousFor: "Founded computer science and helped break the Enigma code in WWII.", hook: "He appears on the Bank of England £50 note.", unlock: { type: "count", n: 42 } },
  { id: 23, slug: "florence-nightingale", name: "Florence Nightingale",  field: "science",    dates: "1820–1910",     famousFor: "Founded modern nursing and pioneered the polar-area statistical diagram.", hook: "Used a “rose diagram” to prove that hygiene was saving soldiers' lives.", unlock: { type: "count", n: 90 } },
  { id: 24, slug: "carl-friedrich-gauss", name: "Carl Friedrich Gauss",  field: "maths",      dates: "1777–1855",     famousFor: "The “Prince of Mathematicians” — number theory, the normal distribution, and much more.", hook: "As a schoolboy he added the numbers 1 to 100 in seconds, by pairing them up.", unlock: { type: "count", n: 21 } },
  { id: 25, slug: "homer",                name: "Homer",                 field: "literature", dates: "c. 8th century BC", famousFor: "The Iliad and the Odyssey — the foundation of Western literature.", hook: "Tradition holds that he was blind.", unlock: { type: "start" } },
  { id: 26, slug: "geoffrey-chaucer",     name: "Geoffrey Chaucer",      field: "literature", dates: "c. 1343–1400",  famousFor: "The Canterbury Tales — the father of English literature.", hook: "Wrote in everyday English at a time when serious writing was expected in Latin or French.", unlock: { type: "count", n: 5 } },
  { id: 27, slug: "william-shakespeare",  name: "William Shakespeare",   field: "literature", dates: "1564–1616",     famousFor: "38 plays and 154 sonnets — the most influential writer in the English language.", hook: "He coined hundreds of words and phrases we still use every day.", unlock: { type: "start" } },
  { id: 29, slug: "william-blake",        name: "William Blake",         field: "literature", dates: "1757–1827",     famousFor: "Visionary Romantic poet and artist behind Songs of Innocence and of Experience.", hook: "He illustrated and hand-printed his own books of poems.", unlock: { type: "count", n: 12 } },
  { id: 30, slug: "william-wordsworth",   name: "William Wordsworth",    field: "literature", dates: "1770–1850",     famousFor: "Helped launch English Romanticism with Lyrical Ballads; later Poet Laureate.", hook: "Wrote the famous lines “I wandered lonely as a cloud”.", unlock: { type: "count", n: 18 } },
  { id: 31, slug: "jane-austen",          name: "Jane Austen",           field: "literature", dates: "1775–1817",     famousFor: "Pride and Prejudice and other novels of sharp social wit and realism.", hook: "Her novels were first published anonymously, credited only “By a Lady”.", unlock: { type: "start" } },
  { id: 32, slug: "john-keats",           name: "John Keats",            field: "literature", dates: "1795–1821",     famousFor: "One of the great Romantic poets, master of the ode.", hook: "He died at just 25, yet became a giant of English poetry.", unlock: { type: "count", n: 27 } },
  { id: 33, slug: "mary-shelley",         name: "Mary Shelley",          field: "literature", dates: "1797–1851",     famousFor: "Frankenstein — widely called the first science-fiction novel.", hook: "She began Frankenstein at 18, sparked by a ghost-story contest.", unlock: { type: "count", n: 34 } },
  { id: 34, slug: "charles-dickens",      name: "Charles Dickens",       field: "literature", dates: "1812–1870",     famousFor: "Oliver Twist, A Christmas Carol — the conscience of Victorian England.", hook: "He published his novels in monthly instalments, leaving readers on cliffhangers.", unlock: { type: "count", n: 46 } },
  { id: 35, slug: "charlotte-bronte",     name: "Charlotte Brontë", field: "literature", dates: "1816–1855",     famousFor: "Jane Eyre — a landmark of the English novel.", hook: "She first published under the male pen name Currer Bell.", unlock: { type: "count", n: 54 } },
  { id: 36, slug: "emily-bronte",         name: "Emily Brontë",     field: "literature", dates: "1818–1848",     famousFor: "Wuthering Heights, her single, extraordinary novel.", hook: "She wrote as Ellis Bell and published only one novel in her short life.", unlock: { type: "count", n: 62 } },
  { id: 37, slug: "george-eliot",         name: "George Eliot",          field: "literature", dates: "1819–1880",     famousFor: "Middlemarch — often called the greatest English novel.", hook: "“George Eliot” was a pen name; she was really Mary Ann Evans.", unlock: { type: "count", n: 75 } },
  { id: 38, slug: "lewis-carroll",        name: "Lewis Carroll",         field: "literature", dates: "1832–1898",     famousFor: "Alice's Adventures in Wonderland and Through the Looking-Glass.", hook: "By day he was a mathematics lecturer at Oxford named Charles Dodgson.", unlock: { type: "count", n: 85 } },
  { id: 39, slug: "robert-louis-stevenson", name: "Robert Louis Stevenson", field: "literature", dates: "1850–1894", famousFor: "Treasure Island and Strange Case of Dr Jekyll and Mr Hyde.", hook: "His Treasure Island set the template for the pirate map with X marking the spot.", unlock: { type: "count", n: 96 } },
  { id: 40, slug: "oscar-wilde",          name: "Oscar Wilde",           field: "literature", dates: "1854–1900",     famousFor: "The Importance of Being Earnest and The Picture of Dorian Gray.", hook: "Famous for his dazzling wit and quotable one-liners.", unlock: { type: "count", n: 108 } }
];

function velvetAvatarPath(a, size) {
  return "assets/avatars/" + (size || 256) + "/" + String(a.id).padStart(2, "0") + "-" + a.slug + ".webp";
}

/* Is an avatar unlocked, given a wallet snapshot {coins, owned:[{series,item}]}? */
function velvetAvatarUnlocked(a, wallet) {
  var u = a.unlock || { type: "start" };
  if (u.type === "start") return true;
  var owned = (wallet && wallet.owned) || [];
  if (u.type === "element") return owned.some(function (o) { return o.series === "periodic-table" && o.item === String(u.item); });
  if (u.type === "count") return owned.length >= u.n;
  return false;
}

/* A short human label for how an avatar unlocks (for locked cards). */
function velvetAvatarUnlockLabel(a) {
  var u = a.unlock || { type: "start" };
  if (u.type === "start") return "Available from the start";
  if (u.type === "count") return "Collect " + u.n + " elements";
  if (u.type === "element") return "Collect element " + u.item;
  return "";
}

if (typeof window !== "undefined") {
  window.VELVET_AVATARS = VELVET_AVATARS;
  window.VELVET_AVATAR_FIELDS = VELVET_AVATAR_FIELDS;
  window.velvetAvatarPath = velvetAvatarPath;
  window.velvetAvatarUnlocked = velvetAvatarUnlocked;
  window.velvetAvatarUnlockLabel = velvetAvatarUnlockLabel;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { VELVET_AVATARS: VELVET_AVATARS, VELVET_AVATAR_FIELDS: VELVET_AVATAR_FIELDS, velvetAvatarPath: velvetAvatarPath, velvetAvatarUnlocked: velvetAvatarUnlocked, velvetAvatarUnlockLabel: velvetAvatarUnlockLabel };
}
