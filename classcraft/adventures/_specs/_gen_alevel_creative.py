#!/usr/bin/env python3
"""Generate 102 A-Level Creative Adventure JSON specs."""
import json
import os

OUT_DIR = "/sessions/awesome-busy-dirac/mnt/AI Study Method/classcraft/adventures/_specs"
THEME = "creative-vibrant"
LEVEL = "a-level"

def opt(text, correct):
    return [text, 1 if correct else 0]

def make(subject, topic_slug, topic_display, n, title, emoji, welcome_lead, meta_desc, final_note,
         concepts, walkthroughs, mcqs, numericals, free_texts):
    assert len(concepts) == 6, f"concepts {len(concepts)}"
    assert len(walkthroughs) == 3, f"walkthroughs {len(walkthroughs)}"
    assert len(mcqs) == 2, f"mcqs {len(mcqs)}"
    assert len(numericals) == 1, f"numericals {len(numericals)}"
    assert len(free_texts) == 1, f"ft {len(free_texts)}"
    for m in mcqs:
        correct_count = sum(1 for o in m["options"] if o[1] == 1)
        assert correct_count == 1, f"MCQ has {correct_count} correct: {m['q']}"
    for num in numericals:
        assert num["answer"] in num["options"], f"answer not in options: {num['q']}"
    obj = {
        "subject": subject,
        "level": LEVEL,
        "topic_display": topic_display,
        "topic_slug": topic_slug,
        "theme": THEME,
        "adventure_n": n,
        "title": title,
        "emoji": emoji,
        "welcome_lead": welcome_lead,
        "meta_desc": meta_desc,
        "final_note": final_note,
        "concepts": [{"term": t, "def": d} for t, d in concepts],
        "walkthroughs": [{"tag": tag, "h2": h2, "body_html": body} for tag, h2, body in walkthroughs],
        "mcqs": mcqs,
        "numericals": numericals,
        "free_texts": free_texts,
    }
    path = os.path.join(OUT_DIR, f"{subject}-{LEVEL}-{topic_slug}-adventure-{n}.json")
    with open(path, "w") as f:
        json.dump(obj, f, indent=2)
    return path

count = 0

# ============================================================
# ART & DESIGN (9 topics x 3 = 27)
# ============================================================
SUB = "art-design"

# --- drawing--painting ---
TS, TD = "drawing--painting", "Drawing & Painting"
make(SUB, TS, TD, 1,
     "Contemporary Drawing Techniques",
     "🎨",
     "From observational graphite to digital line — the contemporary draughtsman's toolkit.",
     "A-Level Art & Design: contemporary drawing techniques, mark-making and observational practice.",
     "Drawing is thinking made visible.",
     [
         ("Observational Drawing", "Direct study from life — primary source recording."),
         ("Tonal Range", "Gradation from highlight to deepest shadow used to suggest form."),
         ("Cross-Hatching", "Layered intersecting line used to build tone and form."),
         ("Sgraffito", "Scratching through one layer to reveal another beneath."),
         ("Gestural Mark", "Fast, expressive line capturing movement or energy."),
         ("Mixed Media Drawing", "Combining graphite, ink, charcoal, collage in one image."),
     ],
     [
         ("Practice", "Observational Foundations",
          "<p><strong>Observational drawing</strong> from primary sources underpins A-Level study. Examiners reward sustained looking — careful proportion, controlled tonal range and varied mark-making — alongside risk-taking in scale and medium.</p>"),
         ("Media", "Hand vs Digital",
          "<p>Hand drawing (graphite, charcoal, ink, pastel) offers tactile mark and material trace. Digital drawing (Procreate, Photoshop) allows layered iteration, non-destructive editing and rapid colour testing. Strong sketchbooks blend both.</p>"),
         ("Theory", "Advanced Colour",
          "<p><strong>Colour theory</strong> at A-Level extends beyond primaries: simultaneous contrast (Albers), warm/cool temperature, complementary pairs for vibration, analogous harmonies, and the role of value over hue in tonal composition.</p>"),
     ],
     [
         {"q": "Cross-hatching primarily builds:", "options": [opt("Saturation", False), opt("Tonal value", True), opt("Hue contrast", False), opt("Texture only", False)]},
         {"q": "Josef Albers is associated with:", "options": [opt("Simultaneous contrast", True), opt("Sfumato", False), opt("Frottage", False), opt("Drypoint", False)]},
     ],
     [{"q": "If a sketchbook page contains 8 tonal studies and the artist completes 5 pages per week over a 12-week project, how many studies are produced?",
       "options": [400, 480, 360, 240], "answer": 480}],
     [{"q": "What term describes a fast, expressive line that captures movement or energy?", "answer": "gestural"}],
     )
count += 1

make(SUB, TS, TD, 2,
     "Painting Materials and Surfaces",
     "🖌️",
     "Oil, acrylic, watercolour, gouache — choosing material for meaning.",
     "A-Level Art & Design: painting materials, supports, and ground preparation.",
     "Material is meaning. Choose deliberately.",
     [
         ("Oil Paint", "Pigment in drying oil — slow drying, allowing blending and glazing."),
         ("Acrylic", "Pigment in polymer emulsion — fast-drying, water-based, flexible."),
         ("Watercolour", "Pigment in gum arabic — transparent, water-soluble."),
         ("Gesso", "White ground priming a canvas or board for paint adhesion."),
         ("Glazing", "Transparent layer over dry paint to modify colour optically."),
         ("Impasto", "Thick application of paint retaining the mark of brush or knife."),
     ],
     [
         ("Media", "Oil and Acrylic",
          "<p><strong>Oil</strong> dries by oxidation over days; <strong>acrylic</strong> by water evaporation in minutes. Oil suits glazing and prolonged blending (used by Titian, Rembrandt); acrylic suits rapid, layered, opaque work (Hockney's pool paintings).</p>"),
         ("Surface", "Supports and Grounds",
          "<p>Canvas (cotton, linen), board, paper or panel each accept paint differently. <strong>Gesso</strong> primes the surface — traditional rabbit-skin gesso for oil, acrylic gesso for either. Absorbency affects sheen and saturation.</p>"),
         ("Technique", "Glaze, Scumble, Impasto",
          "<p><strong>Glazing</strong> builds depth optically by veiling transparent colour over dry layers. <strong>Scumbling</strong> drags opaque paint loosely over a darker layer. <strong>Impasto</strong> (van Gogh, Auerbach) sculpts paint physically.</p>"),
     ],
     [
         {"q": "Oil paint dries primarily by:", "options": [opt("Evaporation", False), opt("Oxidation", True), opt("Sublimation", False), opt("Crystallisation", False)]},
         {"q": "A traditional white priming layer is called:", "options": [opt("Glaze", False), opt("Gesso", True), opt("Sgraffito", False), opt("Mordant", False)]},
     ],
     [{"q": "An artist applies 4 oil glazes per panel and produces 9 panels for a series. How many glazes in total?",
       "options": [36, 32, 40, 45], "answer": 36}],
     [{"q": "What is the Italian term for thick paint that retains brush or knife marks?", "answer": "impasto"}],
     )
count += 1

make(SUB, TS, TD, 3,
     "Sketchbook Practice and the Working Wall",
     "📓",
     "The sketchbook is the laboratory of the artist's mind.",
     "A-Level Art & Design: sketchbook practice, research, and the working wall.",
     "Process is product at A-Level.",
     [
         ("Sketchbook", "Personal visual journal recording research, ideas, and experimentation."),
         ("Primary Source", "First-hand observation — photographs, drawings made by the candidate."),
         ("Secondary Source", "Existing images and texts — books, web, gallery research."),
         ("Annotation", "Written reflection linking image, intention, and artist research."),
         ("Working Wall", "Pinned arrangement showing progress, links and curatorial thinking."),
         ("Iteration", "Repeated revision and refinement of an idea across studies."),
     ],
     [
         ("Process", "What Examiners Want",
          "<p>A-Level Art assessment objectives reward <strong>development</strong>, <strong>experimentation</strong>, <strong>recording</strong> and <strong>realisation</strong>. The sketchbook evidences all four — annotated, dated, ordered.</p>"),
         ("Method", "Primary vs Secondary",
          "<p>Strong work prioritises <strong>primary sources</strong>: drawings from life, photographs taken by the candidate, recorded objects. Secondary sources contextualise but should not dominate.</p>"),
         ("Display", "The Working Wall",
          "<p>Pinning work to a <strong>working wall</strong> externalises decisions — scale, sequence, colour relationships and curatorial judgement become visible. It mimics professional studio practice.</p>"),
     ],
     [
         {"q": "Photographs taken by the candidate are:", "options": [opt("Secondary sources", False), opt("Primary sources", True), opt("Tertiary sources", False), opt("Non-evidence", False)]},
         {"q": "Which AO involves refining ideas through experimentation?", "options": [opt("Recording", False), opt("Experimenting / Developing", True), opt("Realising", False), opt("Researching only", False)]},
     ],
     [{"q": "If a sketchbook has 60 pages and 40% contain primary source drawings, how many pages of primary source drawings?",
       "options": [24, 20, 30, 18], "answer": 24}],
     [{"q": "What term describes repeated revision and refinement of an idea across studies?", "answer": "iteration"}],
     )
count += 1

# --- critical--contextual-studies ---
TS, TD = "critical--contextual-studies", "Critical & Contextual Studies"
make(SUB, TS, TD, 1,
     "Ways of Seeing: John Berger",
     "👁️",
     "Berger's 1972 TV series and book reshaped how we look at images.",
     "A-Level Art & Design: John Berger, Ways of Seeing, and critical theory.",
     "Seeing comes before words.",
     [
         ("Ways of Seeing", "John Berger's 1972 BBC series and book on visual culture."),
         ("John Berger", "British art critic (1926-2017) who challenged elitist art history."),
         ("Mechanical Reproduction", "Walter Benjamin's idea that copies erode an artwork's 'aura'."),
         ("Male Gaze", "Concept that visual art often constructs woman as object of male viewing."),
         ("Aura", "Benjamin's term for the unique presence of an original artwork."),
         ("Visual Literacy", "The ability to interpret, negotiate and make meaning from images."),
     ],
     [
         ("Theory", "Berger's Argument",
          "<p>In <em>Ways of Seeing</em> (1972), <strong>John Berger</strong> argued that oil painting from 1500-1900 served property and the patron class, and that women in Western art are historically positioned as objects of a male spectator.</p>"),
         ("Lineage", "Benjamin's Aura",
          "<p>Berger drew on Walter Benjamin's 1936 essay 'The Work of Art in the Age of Mechanical Reproduction', which proposed that reproduction strips the original of its <strong>aura</strong> — its unique presence in time and space.</p>"),
         ("Impact", "Critical Practice Today",
          "<p>Berger's accessible critique opened art history to feminist, postcolonial and Marxist readings — now mainstream A-Level critical positions. Contemporary writers like Olivia Laing and Hito Steyerl continue the lineage.</p>"),
     ],
     [
         {"q": "Ways of Seeing was first broadcast in:", "options": [opt("1962", False), opt("1972", True), opt("1982", False), opt("1992", False)]},
         {"q": "The 'aura' concept is associated with:", "options": [opt("Greenberg", False), opt("Benjamin", True), opt("Foucault", False), opt("Derrida", False)]},
     ],
     [{"q": "Berger's series Ways of Seeing comprises 4 episodes; if each runs 30 minutes, total runtime in minutes is:",
       "options": [90, 120, 150, 180], "answer": 120}],
     [{"q": "What surname did the British critic who wrote Ways of Seeing have?", "answer": "berger"}],
     )
count += 1

make(SUB, TS, TD, 2,
     "Clement Greenberg and Formalism",
     "🟦",
     "Medium-specificity and the flatness of the picture plane.",
     "A-Level Art & Design: Clement Greenberg, formalism, and modernist criticism.",
     "Each medium must purify itself.",
     [
         ("Clement Greenberg", "American critic (1909-1994), champion of Abstract Expressionism."),
         ("Formalism", "Criticism focused on visual form — line, colour, composition, surface."),
         ("Medium-Specificity", "Greenberg's idea that each art form should explore its own essential nature."),
         ("Modernist Painting", "1960 Greenberg essay arguing painting must assert its flatness."),
         ("Kitsch", "Greenberg's 1939 term for popular, sentimental, mass-produced culture."),
         ("Abstract Expressionism", "1940s-50s NYC movement (Pollock, Rothko, de Kooning)."),
     ],
     [
         ("Theory", "Avant-Garde and Kitsch",
          "<p>In 1939, <strong>Clement Greenberg</strong> distinguished <strong>avant-garde</strong> art (formally rigorous, self-critical) from <strong>kitsch</strong> (mass culture, ersatz emotion). The essay set his lifelong critical position.</p>"),
         ("Argument", "Modernist Painting (1960)",
          "<p>Greenberg argued each medium must explore its <strong>essential</strong> characteristics. For painting, this meant <strong>flatness</strong> — abandoning illusion of depth. Pollock's drips and Rothko's colour fields exemplified this.</p>"),
         ("Critique", "After Greenberg",
          "<p>Postmodernists Rosalind Krauss and T.J. Clark dismantled Greenbergian purity, arguing meaning is social, not formal. Yet his attention to surface and material remains fundamental to A-Level analysis.</p>"),
     ],
     [
         {"q": "Greenberg's 1960 essay is titled:", "options": [opt("Avant-Garde and Kitsch", False), opt("Modernist Painting", True), opt("Ways of Seeing", False), opt("The Cruel Radiance", False)]},
         {"q": "For Greenberg, painting's essential property is:", "options": [opt("Narrative", False), opt("Flatness", True), opt("Allegory", False), opt("Symbolism", False)]},
     ],
     [{"q": "Greenberg lived from 1909 to 1994. What was his age at death (in years)?",
       "options": [85, 84, 86, 87], "answer": 85}],
     [{"q": "What surname did the American formalist critic who championed Pollock have?", "answer": "greenberg"}],
     )
count += 1

make(SUB, TS, TD, 3,
     "Comparing Artists: Methodology",
     "🔍",
     "Pair, compare, and articulate — A-Level contextual writing in practice.",
     "A-Level Art & Design: methodology for comparing artists in personal study.",
     "Comparison sharpens judgement.",
     [
         ("Personal Study", "A-Level extended written and visual study of artists and themes."),
         ("Comparative Analysis", "Setting two artists or works side by side to test ideas."),
         ("Visual Analysis", "Close reading of formal qualities — line, colour, composition."),
         ("Contextual Analysis", "Reading the artwork through historical, social, political frames."),
         ("Citation", "Referencing sources accurately (Harvard style commonly used)."),
         ("Thesis", "A clear argued position the study sets out to test."),
     ],
     [
         ("Plan", "Structuring the Study",
          "<p>A strong A-Level <strong>personal study</strong> opens with a thesis question, contextualises two or more artists, performs detailed <strong>visual analysis</strong> of named works, and concludes by linking research to candidate's own practice.</p>"),
         ("Method", "Visual + Contextual",
          "<p>Combine <strong>visual analysis</strong> (formal qualities) with <strong>contextual analysis</strong> (when, why, for whom). For example, comparing Kara Walker and Lubaina Himid requires both formal close-reading and postcolonial framing.</p>"),
         ("Voice", "Critical Position",
          "<p>Examiners reward an argued <strong>thesis</strong>, not a survey. Strong studies stake a position, support it with evidence, and engage with critics (Berger, Greenberg, hooks, Steyerl) by name and source.</p>"),
     ],
     [
         {"q": "A strong personal study opens with a:", "options": [opt("Biography", False), opt("Thesis question", True), opt("Bibliography", False), opt("Glossary", False)]},
         {"q": "Visual analysis focuses on:", "options": [opt("Biography of the artist", False), opt("Formal qualities of the work", True), opt("Auction price", False), opt("Material cost", False)]},
     ],
     [{"q": "A personal study word limit is 3000 words. If 60% is analysis, how many words are devoted to analysis?",
       "options": [1800, 1500, 2000, 1200], "answer": 1800}],
     [{"q": "What name is given to the A-Level extended written and visual study?", "answer": "personal study"}],
     )
count += 1

# --- mixed-media--installation ---
TS, TD = "mixed-media--installation", "Mixed Media & Installation"
make(SUB, TS, TD, 1,
     "Assemblage and Found Objects",
     "🧩",
     "From Duchamp's urinal to contemporary assemblage — when objects become art.",
     "A-Level Art & Design: assemblage, found objects, and the readymade tradition.",
     "Selection is creation.",
     [
         ("Assemblage", "Sculpture built from found three-dimensional objects."),
         ("Readymade", "Duchamp's term for a found object designated as art."),
         ("Fountain", "Duchamp's 1917 porcelain urinal, signed 'R. Mutt'."),
         ("Bricolage", "Construction from whatever materials are at hand."),
         ("Cornell Box", "Joseph Cornell's poetic small-scale assemblage boxes."),
         ("Object Trouvé", "French term for 'found object'."),
     ],
     [
         ("Origin", "Duchamp's Readymades",
          "<p>In 1917, <strong>Marcel Duchamp</strong> submitted <em>Fountain</em>, a porcelain urinal signed 'R. Mutt', to a New York exhibition. The gesture proposed that <strong>selection</strong> by the artist, not handcraft, defines art.</p>"),
         ("Lineage", "From Schwitters to Hirst",
          "<p>Kurt Schwitters' Merz collages (1920s), Joseph Cornell's poetic boxes (1930s-60s), Robert Rauschenberg's Combines (1950s) and Damien Hirst's vitrines all extend the assemblage tradition.</p>"),
         ("Practice", "Selecting Found Objects",
          "<p>At A-Level, assemblage rewards <strong>conceptual rigour</strong>: object choice must carry meaning. Provenance, scale, juxtaposition and installation context all become carriers of significance.</p>"),
     ],
     [
         {"q": "Duchamp's Fountain dates from:", "options": [opt("1907", False), opt("1917", True), opt("1927", False), opt("1937", False)]},
         {"q": "'Object trouvé' is French for:", "options": [opt("Found object", True), opt("Lost object", False), opt("Sacred object", False), opt("Old object", False)]},
     ],
     [{"q": "If an assemblage uses 6 unique found objects and an artist makes 8 such assemblages, how many objects in total?",
       "options": [48, 42, 56, 36], "answer": 48}],
     [{"q": "What surname did the artist who submitted Fountain in 1917 have?", "answer": "duchamp"}],
     )
count += 1

make(SUB, TS, TD, 2,
     "Site-Specific Art: Goldsworthy and Eliasson",
     "🌿",
     "Place is medium. The work cannot move without losing its meaning.",
     "A-Level Art & Design: site-specific art, Andy Goldsworthy and Olafur Eliasson.",
     "Place makes the work.",
     [
         ("Site-Specific", "Art designed for and inseparable from its location."),
         ("Andy Goldsworthy", "British sculptor (b. 1956), ephemeral works in landscape."),
         ("Olafur Eliasson", "Danish-Icelandic artist (b. 1967), immersive sensory installations."),
         ("Land Art", "1960s-70s movement using landscape as site and material."),
         ("Ephemeral", "Existing briefly — the work decays or is documented."),
         ("The Weather Project", "Eliasson's 2003 installation at Tate Modern's Turbine Hall."),
     ],
     [
         ("Practice", "Goldsworthy in Landscape",
          "<p><strong>Andy Goldsworthy</strong> arranges leaves, ice, stone and wood in situ, photographing the result. The photograph becomes the durable artwork — the sculpture itself returns to nature.</p>"),
         ("Scale", "Eliasson's Atmospheres",
          "<p><strong>Olafur Eliasson</strong>'s <em>The Weather Project</em> (Tate Modern, 2003) flooded the Turbine Hall with mono-frequency yellow light and a half-sun mirrored to a full disc on the ceiling. Two million visitors lay beneath it.</p>"),
         ("Theory", "Why Site Matters",
          "<p>Site-specific work resists the museum's neutralising 'white cube'. Robert Smithson, Walter De Maria and the Land Artists argued that <strong>place</strong> — geology, climate, history — is part of the artwork.</p>"),
     ],
     [
         {"q": "The Weather Project was installed in:", "options": [opt("1993", False), opt("2003", True), opt("2013", False), opt("1983", False)]},
         {"q": "Andy Goldsworthy works primarily with:", "options": [opt("Steel girders", False), opt("Natural materials in situ", True), opt("Neon tubes", False), opt("Bronze casting", False)]},
     ],
     [{"q": "If The Weather Project drew 2,000,000 visitors over 25 weeks, what is the average weekly visitors?",
       "options": [80000, 75000, 100000, 50000], "answer": 80000}],
     [{"q": "What first name did the Danish-Icelandic artist Eliasson go by?", "answer": "olafur"}],
     )
count += 1

make(SUB, TS, TD, 3,
     "Immersive Installation: Yayoi Kusama",
     "🟡",
     "Infinity rooms, polka dots, and the obliteration of the self.",
     "A-Level Art & Design: Yayoi Kusama and immersive installation art.",
     "Infinity is a room you can step into.",
     [
         ("Yayoi Kusama", "Japanese artist (b. 1929), polka dots and infinity rooms."),
         ("Infinity Mirror Room", "Kusama's mirrored installations creating endless reflection."),
         ("Polka Dot", "Kusama's signature motif, linked to her childhood hallucinations."),
         ("Obliteration", "Kusama's concept of self dissolved into pattern."),
         ("Immersive", "An artwork the viewer physically enters and becomes part of."),
         ("Phallic Soft Sculpture", "Kusama's stitched fabric protrusions of the 1960s."),
     ],
     [
         ("Biography", "Kusama's Practice",
          "<p><strong>Yayoi Kusama</strong> (b. 1929) moved to New York in 1958, returning to Japan in 1973. She has lived voluntarily in a psychiatric hospital since 1977, working daily in a nearby studio.</p>"),
         ("Form", "Infinity Mirror Rooms",
          "<p>Kusama's <strong>Infinity Mirror Rooms</strong> use facing mirrors and pinpoint lights to manufacture apparently endless space. The viewer enters alone, briefly — the work is participatory and photographic.</p>"),
         ("Theme", "Obliteration",
          "<p>Kusama describes her dots as 'self-obliteration' — the individual subsumed by infinite pattern. The work links autobiography, hallucination and a serious engagement with cosmic scale.</p>"),
     ],
     [
         {"q": "Yayoi Kusama was born in:", "options": [opt("1919", False), opt("1929", True), opt("1939", False), opt("1949", False)]},
         {"q": "Kusama's signature motif is the:", "options": [opt("Stripe", False), opt("Polka dot", True), opt("Cross", False), opt("Spiral", False)]},
     ],
     [{"q": "If Kusama returned to Japan in 1973 and has lived in hospital since 1977, how many years between return and hospital admission?",
       "options": [4, 5, 3, 6], "answer": 4}],
     [{"q": "What first name does the Japanese artist of the polka dots and infinity rooms go by?", "answer": "yayoi"}],
     )
count += 1

# --- ethics--theory ---
TS, TD = "ethics--theory", "Ethics & Theory"
make(SUB, TS, TD, 1,
     "Appropriation and Copyright",
     "⚖️",
     "When does borrowing become theft? Sherrie Levine, Richard Prince and the law.",
     "A-Level Art & Design: appropriation, copyright, and contemporary art ethics.",
     "Art has always quoted itself.",
     [
         ("Appropriation", "Using existing images or objects in new artworks."),
         ("Copyright", "Legal right of an author over reproduction of their work."),
         ("Fair Use / Fair Dealing", "Limited use of copyright work for criticism, comment, parody."),
         ("Sherrie Levine", "American artist (b. 1947) who re-photographed Walker Evans's photographs."),
         ("Richard Prince", "American artist (b. 1949), Instagram appropriations, Marlboro re-photographs."),
         ("Transformative Use", "US doctrine: appropriation defensible if it changes meaning or expression."),
     ],
     [
         ("Practice", "Levine and Prince",
          "<p>In 1981, <strong>Sherrie Levine</strong> re-photographed Walker Evans's 1936 photographs and exhibited them as 'After Walker Evans'. The act questioned authorship, originality and gender in the canon.</p>"),
         ("Law", "Copyright Frameworks",
          "<p>UK copyright lasts <strong>70 years after the author's death</strong>. 'Fair dealing' permits criticism, review and parody. The US 'fair use' doctrine considers purpose, nature, amount and market effect.</p>"),
         ("Case", "Cariou v. Prince",
          "<p>In <em>Cariou v. Prince</em> (2013), a US appeals court found most of Richard Prince's appropriations of Patrick Cariou's photographs were sufficiently <strong>transformative</strong> to qualify as fair use — a controversial precedent.</p>"),
     ],
     [
         {"q": "UK copyright lasts how long after the author's death?", "options": [opt("50 years", False), opt("70 years", True), opt("100 years", False), opt("Indefinitely", False)]},
         {"q": "Sherrie Levine's most famous re-photographs are 'After':", "options": [opt("Walker Evans", True), opt("Ansel Adams", False), opt("Cindy Sherman", False), opt("Robert Frank", False)]},
     ],
     [{"q": "If a photographer died in 1955, in what year does their UK copyright expire (70 years after death)?",
       "options": [2025, 2030, 2020, 2035], "answer": 2025}],
     [{"q": "What is the US legal doctrine that allows limited use of copyright work?", "answer": "fair use"}],
     )
count += 1

make(SUB, TS, TD, 2,
     "Public vs Private Art",
     "🏛️",
     "Who is art for? Plinths, commissions, and contested monuments.",
     "A-Level Art & Design: public art, private collections, and contested space.",
     "Art in public space is never neutral.",
     [
         ("Public Art", "Art sited in public space, often commissioned by state or municipality."),
         ("Private Collection", "Artworks owned by individuals or corporations."),
         ("Fourth Plinth", "Rotating contemporary commissions on Trafalgar Square plinth since 1998."),
         ("Contested Monument", "Statue whose subject (e.g. slave trader) is publicly disputed."),
         ("Percent for Art", "Policy requiring a small % of building costs to fund public art."),
         ("Colston Statue", "Edward Colston statue toppled in Bristol, June 2020."),
     ],
     [
         ("Context", "Public Commission",
          "<p>Public art ranges from <strong>monumental sculpture</strong> (Antony Gormley's Angel of the North, 1998) to participatory practice (Jeremy Deller). State and corporate funding bring questions of accountability and intention.</p>"),
         ("Case", "Fourth Plinth",
          "<p>Trafalgar Square's empty <strong>Fourth Plinth</strong> has, since 1998, hosted rotating contemporary commissions — Rachel Whiteread, Marc Quinn, Yinka Shonibare — turning a colonial space into a forum for living artists.</p>"),
         ("Debate", "Contested Monuments",
          "<p>In June 2020, the Edward Colston statue (slave trader, erected 1895) was toppled in Bristol during BLM protests. The debate about <strong>contested monuments</strong> has become a central A-Level critical theme.</p>"),
     ],
     [
         {"q": "The Fourth Plinth scheme began in:", "options": [opt("1988", False), opt("1998", True), opt("2008", False), opt("1978", False)]},
         {"q": "The Colston statue was toppled in:", "options": [opt("Liverpool", False), opt("Bristol", True), opt("Manchester", False), opt("Cardiff", False)]},
     ],
     [{"q": "If a 'percent for art' policy is 1% and a building costs £30 million, how much (in £) is allocated to public art?",
       "options": [300000, 30000, 3000000, 30000000], "answer": 300000}],
     [{"q": "What numbered plinth in Trafalgar Square hosts rotating contemporary commissions?", "answer": "fourth"}],
     )
count += 1

make(SUB, TS, TD, 3,
     "Decolonising Museums and Restitution",
     "🏺",
     "The Benin Bronzes, the Parthenon Marbles, and the politics of return.",
     "A-Level Art & Design: decolonising museums, restitution, and contested collections.",
     "Whose history? Whose objects? Whose museum?",
     [
         ("Decolonising", "Critically re-examining museum collections shaped by empire."),
         ("Restitution", "Returning objects to their place or community of origin."),
         ("Benin Bronzes", "Brass plaques and sculptures looted from Benin City by British forces in 1897."),
         ("Parthenon Marbles", "Marble sculptures removed from Athens by Lord Elgin (1801-1812)."),
         ("Provenance", "The documented history of ownership of an artwork."),
         ("Sarr-Savoy Report", "2018 French report recommending wide restitution of African heritage."),
     ],
     [
         ("History", "Looted Collections",
          "<p>Many European museum collections originate in imperial expansion. The <strong>Benin Bronzes</strong> were looted from Benin City by a British 'punitive expedition' in <strong>1897</strong>. Calls for return date back over a century.</p>"),
         ("Policy", "Sarr-Savoy and After",
          "<p>The 2018 <strong>Sarr-Savoy Report</strong>, commissioned by President Macron, recommended that France return African heritage held in its museums. Germany has since begun returning Benin Bronzes to Nigeria.</p>"),
         ("Debate", "Parthenon Marbles",
          "<p>The Parthenon Marbles, removed by Lord Elgin between <strong>1801 and 1812</strong>, remain in the British Museum despite long-standing Greek requests for return — a paradigm case in restitution debates.</p>"),
     ],
     [
         {"q": "The Benin Bronzes were looted in:", "options": [opt("1797", False), opt("1897", True), opt("1957", False), opt("1947", False)]},
         {"q": "The Sarr-Savoy Report was published in:", "options": [opt("2008", False), opt("2018", True), opt("1998", False), opt("2020", False)]},
     ],
     [{"q": "From the time the Parthenon Marbles were removed (1801) to 2026, how many years have passed?",
       "options": [225, 220, 230, 215], "answer": 225}],
     [{"q": "What word describes the documented ownership history of an artwork?", "answer": "provenance"}],
     )
count += 1

# --- renaissance-masters ---
TS, TD = "renaissance-masters", "Renaissance Masters"
make(SUB, TS, TD, 1,
     "Leonardo da Vinci: Sfumato and Science",
     "🖼️",
     "Painter, anatomist, engineer — the polymath of Vinci.",
     "A-Level Art & Design: Leonardo da Vinci, sfumato, and Renaissance practice.",
     "Nothing in nature is delineated by hard line.",
     [
         ("Leonardo da Vinci", "Italian polymath (1452-1519), painter of Mona Lisa and Last Supper."),
         ("Sfumato", "Soft, smoky tonal transition without visible lines."),
         ("Mona Lisa", "Leonardo's portrait (c. 1503-1519), Louvre, Paris."),
         ("The Last Supper", "Leonardo's mural (1495-1498), Santa Maria delle Grazie, Milan."),
         ("Chiaroscuro", "Strong contrast of light and dark to model form."),
         ("Cartoon", "Full-scale preparatory drawing on paper, transferred to the painting surface."),
     ],
     [
         ("Life", "Leonardo's Career",
          "<p><strong>Leonardo da Vinci</strong> (1452-1519) trained in Verrocchio's Florence workshop, worked for the Sforza in Milan (1482-1499), returned to Florence, and died in Amboise, France in the service of François I.</p>"),
         ("Technique", "Sfumato",
          "<p><strong>Sfumato</strong> — from <em>fumo</em>, smoke — is a tonal transition without visible line, achieved by many thin glazes. The Mona Lisa's modelling of cheek and lip exemplifies it.</p>"),
         ("Work", "Last Supper",
          "<p>The <em>Last Supper</em> (1495-1498), painted in experimental tempera on a dry wall in Milan's Santa Maria delle Grazie, began deteriorating within Leonardo's lifetime. Its psychological grouping of the apostles set a new standard.</p>"),
     ],
     [
         {"q": "Leonardo da Vinci lived:", "options": [opt("1432-1499", False), opt("1452-1519", True), opt("1475-1564", False), opt("1483-1520", False)]},
         {"q": "Sfumato literally means:", "options": [opt("Smoky", True), opt("Stretched", False), opt("Stippled", False), opt("Sculpted", False)]},
     ],
     [{"q": "Leonardo lived 1452 to 1519. What was his age at death (in years)?",
       "options": [67, 66, 68, 65], "answer": 67}],
     [{"q": "What is the Italian term for soft, smoky tonal transition without visible lines?", "answer": "sfumato"}],
     )
count += 1

make(SUB, TS, TD, 2,
     "Michelangelo: The Sistine Chapel",
     "⛪",
     "Four years on a scaffold, transforming a ceiling.",
     "A-Level Art & Design: Michelangelo, the Sistine Chapel, and Renaissance fresco.",
     "I am a sculptor, not a painter — yet he painted the heavens.",
     [
         ("Michelangelo", "Italian sculptor and painter (1475-1564), Florentine."),
         ("Sistine Chapel Ceiling", "Michelangelo's fresco cycle (1508-1512), Vatican."),
         ("David", "Michelangelo's marble nude (1501-1504), 5.17m tall, Florence Accademia."),
         ("Fresco", "Painting on freshly applied wet plaster — pigment binds as it dries."),
         ("Buon Fresco", "True fresco — pigment in water applied to wet intonaco."),
         ("Giornata", "A 'day's work' — the area of plaster painted in one session."),
     ],
     [
         ("Life", "Michelangelo",
          "<p><strong>Michelangelo Buonarroti</strong> (1475-1564) considered himself a sculptor; his <em>David</em> (1501-1504) and the Sistine ceiling remain twin peaks of the High Renaissance.</p>"),
         ("Work", "Sistine Ceiling",
          "<p>Pope Julius II commissioned the ceiling in 1508. Michelangelo worked, largely alone, until <strong>1512</strong>. Nine central scenes from Genesis — including the <em>Creation of Adam</em> — are framed by prophets, sibyls and ignudi.</p>"),
         ("Technique", "Buon Fresco",
          "<p><strong>Buon fresco</strong> demands speed: each <strong>giornata</strong> is plastered in the morning and painted before the surface dries. Pigment binds chemically as calcium hydroxide reacts with CO2.</p>"),
     ],
     [
         {"q": "The Sistine Chapel ceiling was painted:", "options": [opt("1498-1502", False), opt("1508-1512", True), opt("1518-1522", False), opt("1528-1532", False)]},
         {"q": "The David is approximately how tall?", "options": [opt("3.0 m", False), opt("5.17 m", True), opt("7.5 m", False), opt("10 m", False)]},
     ],
     [{"q": "Michelangelo worked on the Sistine Chapel ceiling from 1508 to 1512. How many years did this work span?",
       "options": [4, 3, 5, 6], "answer": 4}],
     [{"q": "What surname did the sculptor of David (1501-1504) have?", "answer": "michelangelo"}],
     )
count += 1

make(SUB, TS, TD, 3,
     "Raphael and the Stanze",
     "🏛️",
     "Grace, balance, and the School of Athens.",
     "A-Level Art & Design: Raphael, the Vatican Stanze, and High Renaissance composition.",
     "Raphael united Leonardo's grace with Michelangelo's gravity.",
     [
         ("Raphael", "Italian painter (1483-1520) from Urbino."),
         ("School of Athens", "Raphael's fresco (1509-1511), Vatican Stanza della Segnatura."),
         ("Stanze", "Four rooms in the Vatican Palace, frescoed by Raphael."),
         ("Linear Perspective", "System of one-point construction codified by Alberti, 1435."),
         ("Disegno", "Italian — drawing as the intellectual foundation of art."),
         ("Sprezzatura", "Studied effortlessness in Renaissance courtly art."),
     ],
     [
         ("Life", "Raphael",
          "<p><strong>Raphael Sanzio</strong> (1483-1520) trained with Perugino, worked in Florence (1504-1508), and joined the Vatican project under Julius II in 1508 — completing the Stanze before dying at thirty-seven.</p>"),
         ("Work", "School of Athens",
          "<p>The <em>School of Athens</em> (1509-1511) places Plato and Aristotle at vanishing point under a coffered Roman vault. Raphael portrayed Michelangelo as Heraclitus and Leonardo as Plato — a tribute to his contemporaries.</p>"),
         ("Theory", "Disegno and Composition",
          "<p>Raphael's compositions are case studies in <strong>linear perspective</strong> (Alberti, 1435), pyramidal grouping, and rhythmic distribution. They became the academic model for centuries.</p>"),
     ],
     [
         {"q": "Raphael lived:", "options": [opt("1452-1519", False), opt("1483-1520", True), opt("1475-1564", False), opt("1500-1550", False)]},
         {"q": "Alberti's treatise on perspective was published in:", "options": [opt("1415", False), opt("1435", True), opt("1455", False), opt("1485", False)]},
     ],
     [{"q": "Raphael lived 1483 to 1520. What was his age at death (in years)?",
       "options": [37, 36, 38, 35], "answer": 37}],
     [{"q": "In which Vatican Stanza is the School of Athens located? (one word)", "answer": "segnatura"}],
     )
count += 1

# --- modernism--avant-garde ---
TS, TD = "modernism--avant-garde", "Modernism & Avant-Garde"
make(SUB, TS, TD, 1,
     "Impressionism: Capturing Light",
     "🌅",
     "Monet at Le Havre, painting the impression of dawn.",
     "A-Level Art & Design: Impressionism, Monet, and plein-air painting.",
     "I want to paint the air.",
     [
         ("Impressionism", "1860s-80s French movement painting fleeting light and atmosphere."),
         ("Claude Monet", "French painter (1840-1926), founder of Impressionism."),
         ("Impression, Sunrise", "Monet's 1872 painting, source of the movement's name."),
         ("Plein Air", "Painting outdoors directly from observation."),
         ("Broken Colour", "Adjacent strokes of pure colour mixed optically by the viewer."),
         ("Salon des Refusés", "1863 exhibition for works rejected by the official Paris Salon."),
     ],
     [
         ("Context", "The Salon and the Refusés",
          "<p>In <strong>1863</strong>, Emperor Napoleon III authorised the <strong>Salon des Refusés</strong> to exhibit works rejected by the official Salon. Manet's <em>Déjeuner sur l'herbe</em> caused scandal; modern art's break with academic painting began.</p>"),
         ("Movement", "First Impressionist Show",
          "<p>The first <strong>Impressionist exhibition</strong> opened in April 1874 in Nadar's studio. Monet's <em>Impression, Sunrise</em> (<strong>1872</strong>), painted at Le Havre, gave critic Louis Leroy the dismissive title that became the movement's name.</p>"),
         ("Technique", "Broken Colour and Plein Air",
          "<p>Industrial paint in tubes (introduced from the 1840s) enabled <strong>plein-air</strong> work. Impressionists used short strokes of unmixed colour, allowing the eye to fuse them — anticipating Pointillism.</p>"),
     ],
     [
         {"q": "Monet's Impression, Sunrise dates from:", "options": [opt("1862", False), opt("1872", True), opt("1882", False), opt("1892", False)]},
         {"q": "The Salon des Refusés was held in:", "options": [opt("1853", False), opt("1863", True), opt("1873", False), opt("1883", False)]},
     ],
     [{"q": "Monet was born in 1840 and died in 1926. What was his age at death (in years)?",
       "options": [86, 85, 87, 84], "answer": 86}],
     [{"q": "What French term describes painting outdoors directly from observation?", "answer": "plein air"}],
     )
count += 1

make(SUB, TS, TD, 2,
     "Cubism: Picasso and Braque",
     "🔷",
     "Multiple viewpoints, one canvas — the shattering of single-point perspective.",
     "A-Level Art & Design: Cubism, Picasso, Braque, and the avant-garde.",
     "I paint objects as I think them, not as I see them.",
     [
         ("Cubism", "Avant-garde movement (1907-1914) fragmenting form into facets."),
         ("Pablo Picasso", "Spanish artist (1881-1973), co-founder of Cubism."),
         ("Georges Braque", "French painter (1882-1963), co-founder of Cubism."),
         ("Les Demoiselles d'Avignon", "Picasso's 1907 proto-Cubist breakthrough painting."),
         ("Analytical Cubism", "1909-1912 phase: faceted, monochromatic, near-abstract."),
         ("Synthetic Cubism", "1912-1914 phase: brighter colour, collage, papier collé."),
     ],
     [
         ("Origin", "Demoiselles, 1907",
          "<p>Picasso's <em>Les Demoiselles d'Avignon</em> (<strong>1907</strong>) merged influences from Iberian sculpture, African masks and Cézanne. Braque saw it that autumn; the partnership of Cubism began.</p>"),
         ("Phase", "Analytical to Synthetic",
          "<p><strong>Analytical Cubism</strong> (1909-1912) dissected objects into faceted, muted near-abstractions. <strong>Synthetic Cubism</strong> (1912-1914) reassembled them with collage, papier collé and brighter colour.</p>"),
         ("Idea", "Multiple Viewpoints",
          "<p>Cubism abandoned the single-point perspective inherited from Alberti, presenting an object from several viewpoints at once — a structural revolution that opened modern art.</p>"),
     ],
     [
         {"q": "Les Demoiselles d'Avignon dates from:", "options": [opt("1897", False), opt("1907", True), opt("1917", False), opt("1927", False)]},
         {"q": "Synthetic Cubism is characterised by:", "options": [opt("Monochrome facets", False), opt("Collage and papier collé", True), opt("Pointillist dots", False), opt("Action drips", False)]},
     ],
     [{"q": "Picasso was born in 1881 and died in 1973. What was his age at death (in years)?",
       "options": [91, 92, 90, 93], "answer": 91}],
     [{"q": "What surname did Picasso's Cubist partner Georges have?", "answer": "braque"}],
     )
count += 1

make(SUB, TS, TD, 3,
     "Bauhaus and Surrealism",
     "🏗️",
     "Two avant-gardes — one dreaming, one designing.",
     "A-Level Art & Design: Bauhaus design school and Surrealism.",
     "Art and technology — a new unity.",
     [
         ("Bauhaus", "German design school (1919-1933), founded by Walter Gropius."),
         ("Walter Gropius", "German architect (1883-1969), Bauhaus founding director."),
         ("Surrealism", "1920s movement exploring the unconscious; manifesto by Breton, 1924."),
         ("André Breton", "French writer (1896-1966), author of Surrealist Manifesto."),
         ("Salvador Dalí", "Spanish Surrealist (1904-1989), 'paranoiac-critical' method."),
         ("Frottage", "Rubbing technique — Max Ernst transferred surface textures to paper."),
     ],
     [
         ("School", "Bauhaus 1919-1933",
          "<p>The <strong>Bauhaus</strong> opened in Weimar in <strong>1919</strong> under Walter Gropius, moved to Dessau in 1925, and was closed by the Nazis in <strong>1933</strong>. Its principle — unity of art, craft and industry — shaped 20th-century design.</p>"),
         ("Manifesto", "Surrealism 1924",
          "<p>André Breton's <strong>Surrealist Manifesto</strong> (<strong>1924</strong>) called for 'pure psychic automatism' — art driven by the unconscious. Dalí, Magritte, Ernst, Miró and Tanguy followed Breton's lead.</p>"),
         ("Method", "Automatism and Frottage",
          "<p>Surrealism developed <strong>automatism</strong> (drawing without conscious control), <strong>frottage</strong> (Ernst's rubbings of textured surfaces) and <strong>decalcomania</strong> as means of bypassing rational composition.</p>"),
     ],
     [
         {"q": "The Bauhaus was founded in:", "options": [opt("1909", False), opt("1919", True), opt("1929", False), opt("1939", False)]},
         {"q": "Breton's Surrealist Manifesto was published in:", "options": [opt("1914", False), opt("1924", True), opt("1934", False), opt("1944", False)]},
     ],
     [{"q": "The Bauhaus operated 1919 to 1933. How many years did it exist?",
       "options": [14, 13, 15, 12], "answer": 14}],
     [{"q": "What surname did the founding director of the Bauhaus, Walter, have?", "answer": "gropius"}],
     )
count += 1

# --- postmodern--contemporary ---
TS, TD = "postmodern--contemporary", "Postmodern & Contemporary"
make(SUB, TS, TD, 1,
     "The Young British Artists",
     "🦈",
     "Hirst, Emin, Saatchi — and the 1997 'Sensation' show.",
     "A-Level Art & Design: YBAs, Damien Hirst, Tracey Emin, and 1990s British art.",
     "Art as scandal, art as headline.",
     [
         ("YBAs", "Young British Artists — Goldsmiths-trained generation of the 1990s."),
         ("Damien Hirst", "English artist (b. 1965), formaldehyde works, spot paintings."),
         ("Tracey Emin", "English artist (b. 1963), confessional installations and embroidery."),
         ("Freeze", "1988 Hirst-curated student exhibition that launched the YBAs."),
         ("Sensation", "1997 Royal Academy show of Saatchi's YBA collection."),
         ("My Bed", "Emin's 1998 unmade bed installation, Turner Prize nominee 1999."),
     ],
     [
         ("Origin", "Freeze 1988",
          "<p>In July <strong>1988</strong>, Damien Hirst, still a Goldsmiths student, curated <em>Freeze</em> in a Docklands warehouse. Charles Saatchi visited and began collecting; the YBA brand was born.</p>"),
         ("Show", "Sensation 1997",
          "<p>The Royal Academy's <em>Sensation</em> (<strong>1997</strong>) showed Saatchi's YBA collection — Hirst's shark, Marcus Harvey's <em>Myra</em>, Marc Quinn's blood head. The show toured to Brooklyn and triggered censorship debate.</p>"),
         ("Work", "My Bed",
          "<p>Tracey Emin's <em>My Bed</em> (<strong>1998</strong>) — her own unmade bed surrounded by personal debris — was shortlisted for the 1999 Turner Prize. It made confession a contemporary sculptural mode.</p>"),
     ],
     [
         {"q": "Sensation opened at the Royal Academy in:", "options": [opt("1987", False), opt("1997", True), opt("2007", False), opt("1977", False)]},
         {"q": "Tracey Emin's My Bed dates from:", "options": [opt("1988", False), opt("1998", True), opt("2008", False), opt("1978", False)]},
     ],
     [{"q": "If Freeze opened in 1988 and Sensation in 1997, how many years between them?",
       "options": [9, 8, 10, 7], "answer": 9}],
     [{"q": "What surname did the artist whose unmade bed was a Turner nominee have?", "answer": "emin"}],
     )
count += 1

make(SUB, TS, TD, 2,
     "Conceptual and Video Art",
     "📺",
     "The idea is the work; the screen is the surface.",
     "A-Level Art & Design: conceptual art, video art, and contemporary moving image.",
     "When the idea is the machine that makes the art.",
     [
         ("Conceptual Art", "Practice in which idea takes precedence over object."),
         ("Sol LeWitt", "American conceptualist (1928-2007), wall drawings, 'Paragraphs', 1967."),
         ("Joseph Kosuth", "American conceptualist (b. 1945), 'One and Three Chairs' (1965)."),
         ("Video Art", "Time-based art using moving image, post-1965."),
         ("Bill Viola", "American video artist (1951-2024), large-scale slow-motion projections."),
         ("Nam June Paik", "Korean-American video pioneer (1932-2006)."),
     ],
     [
         ("Theory", "LeWitt's Paragraphs",
          "<p>Sol LeWitt's <em>Paragraphs on Conceptual Art</em> (<strong>1967</strong>) declared 'the idea becomes a machine that makes the art'. Execution could be delegated; the concept was primary.</p>"),
         ("Pioneer", "Nam June Paik",
          "<p><strong>Nam June Paik</strong> (1932-2006) used the Sony Portapak (1965) to make the first widely circulated artist video tapes. His TV-sculptures and installations defined the medium for decades.</p>"),
         ("Sublime", "Bill Viola",
          "<p>Bill Viola's slow-motion HD video projections — figures emerging from water, faces in extreme emotion — return video art to questions of mortality and the sublime, exhibited in cathedrals and museums alike.</p>"),
     ],
     [
         {"q": "LeWitt's 'Paragraphs on Conceptual Art' was published in:", "options": [opt("1957", False), opt("1967", True), opt("1977", False), opt("1987", False)]},
         {"q": "The Sony Portapak became available in:", "options": [opt("1955", False), opt("1965", True), opt("1975", False), opt("1985", False)]},
     ],
     [{"q": "Bill Viola lived 1951 to 2024. What was his age at death (in years)?",
       "options": [73, 72, 74, 71], "answer": 73}],
     [{"q": "What surname did the Korean-American video art pioneer Nam June have?", "answer": "paik"}],
     )
count += 1

make(SUB, TS, TD, 3,
     "Banksy and Street Art",
     "🎨",
     "Anonymity, stencils, and shredding paintings at auction.",
     "A-Level Art & Design: Banksy, street art, and contemporary critique.",
     "Art should comfort the disturbed and disturb the comfortable.",
     [
         ("Banksy", "Anonymous British street artist active from late 1990s, Bristol-based."),
         ("Stencil", "Cut template enabling rapid, repeatable spray-painted images."),
         ("Girl with Balloon", "Banksy stencil first appearing on London walls, 2002."),
         ("Love is in the Bin", "Banksy work shredded at Sotheby's, 2018, after sale."),
         ("Dismaland", "Banksy's 2015 pop-up 'bemusement park' in Weston-super-Mare."),
         ("Walled Off Hotel", "Banksy's 2017 hotel in Bethlehem, facing the separation wall."),
     ],
     [
         ("Practice", "Stencils on the Street",
          "<p><strong>Banksy</strong> emerged in late-1990s Bristol, using stencils for rapid, anonymous murals. Iconic works — <em>Girl with Balloon</em>, <em>Kissing Coppers</em>, <em>Flower Thrower</em> — combine pop simplicity with political critique.</p>"),
         ("Event", "Shredded at Sotheby's",
          "<p>In October <strong>2018</strong>, Banksy's <em>Girl with Balloon</em> sold at Sotheby's for £1.04 million — and immediately partially shredded itself in its frame. The shredded work was renamed <em>Love is in the Bin</em>.</p>"),
         ("Project", "Dismaland and Walled Off",
          "<p>Banksy's larger projects — <em>Dismaland</em> (<strong>2015</strong>, Weston-super-Mare) and the <em>Walled Off Hotel</em> (<strong>2017</strong>, Bethlehem) — extend stencil practice to architectural and curatorial scale.</p>"),
     ],
     [
         {"q": "The Sotheby's shredding occurred in:", "options": [opt("2008", False), opt("2018", True), opt("2014", False), opt("2020", False)]},
         {"q": "Banksy's pop-up 'Dismaland' was located in:", "options": [opt("Bristol", False), opt("Weston-super-Mare", True), opt("Brighton", False), opt("Bethlehem", False)]},
     ],
     [{"q": "If a stencil takes 3 minutes to apply and an artist applies 12 stencils per location across 5 locations, total stencils applied:",
       "options": [60, 48, 36, 72], "answer": 60}],
     [{"q": "What name was given to the shredded Girl with Balloon work? (three words, lowercase)", "answer": "love is in the bin"}],
     )
count += 1

# --- photography-history ---
TS, TD = "photography-history", "Photography History"
make(SUB, TS, TD, 1,
     "Daguerreotype and Early Photography",
     "📷",
     "1839: Daguerre announces a process that captures light on silvered copper.",
     "A-Level Art & Design: Daguerreotype, calotype, and the birth of photography.",
     "Photography is light writing.",
     [
         ("Daguerreotype", "Daguerre's 1839 silver-iodide photographic process on copper."),
         ("Louis Daguerre", "French inventor (1787-1851) of the Daguerreotype."),
         ("Calotype", "Talbot's 1841 paper-negative process."),
         ("William Henry Fox Talbot", "British inventor (1800-1877) of the calotype."),
         ("Eadweard Muybridge", "British-American (1830-1904), motion studies, 1878 onward."),
         ("Wet Plate Collodion", "1851 Archer process — sharper, faster, dominant 1850s-80s."),
     ],
     [
         ("Origin", "1839 Announcement",
          "<p>On <strong>19 August 1839</strong>, the French government announced the <strong>Daguerreotype</strong> process, freely offered to the world (Britain excepted by patent). Photography became public.</p>"),
         ("Rival", "Talbot's Calotype",
          "<p>In <strong>1841</strong>, Henry Fox Talbot patented the <strong>calotype</strong> — a paper negative permitting multiple positive prints. The negative-positive system, not Daguerre's silver plate, became photography's future.</p>"),
         ("Motion", "Muybridge's Horse",
          "<p>In <strong>1878</strong>, <strong>Eadweard Muybridge</strong> photographed Leland Stanford's galloping horse with twelve cameras at Palo Alto — proving all four hooves leave the ground simultaneously and anticipating cinema.</p>"),
     ],
     [
         {"q": "The Daguerreotype was announced in:", "options": [opt("1829", False), opt("1839", True), opt("1849", False), opt("1859", False)]},
         {"q": "Muybridge's galloping-horse study was made in:", "options": [opt("1868", False), opt("1878", True), opt("1888", False), opt("1898", False)]},
     ],
     [{"q": "How many cameras did Muybridge use to photograph the galloping horse in 1878?",
       "options": [12, 10, 8, 15], "answer": 12}],
     [{"q": "What surname did the inventor of the calotype process, William Henry Fox, have?", "answer": "talbot"}],
     )
count += 1

make(SUB, TS, TD, 2,
     "Documentary and Photojournalism",
     "🗞️",
     "Lange in the Dust Bowl, Capa on Omaha Beach.",
     "A-Level Art & Design: Dorothea Lange, Robert Capa, and documentary photography.",
     "If your pictures aren't good enough, you aren't close enough.",
     [
         ("Documentary Photography", "Photography intending to record social conditions and historical events."),
         ("Dorothea Lange", "American photographer (1895-1965), Farm Security Administration."),
         ("Migrant Mother", "Lange's 1936 portrait of Florence Owens Thompson, California."),
         ("Robert Capa", "Hungarian war photographer (1913-1954)."),
         ("Magnum Photos", "Photojournalist cooperative founded by Capa et al., 1947."),
         ("FSA", "Farm Security Administration — US 1935-1944 documentary programme."),
     ],
     [
         ("Programme", "Lange and the FSA",
          "<p>The <strong>Farm Security Administration</strong> (<strong>1935-1944</strong>) commissioned Lange, Walker Evans, Gordon Parks and others to document Depression America. Lange's <em>Migrant Mother</em> (<strong>1936</strong>) became its emblematic image.</p>"),
         ("War", "Capa and D-Day",
          "<p><strong>Robert Capa</strong> waded ashore at Omaha Beach on <strong>6 June 1944</strong>. Of 106 frames shot, eleven survived a lab accident — the 'Magnificent Eleven' that defined war photography for a generation.</p>"),
         ("Co-op", "Magnum 1947",
          "<p>In <strong>1947</strong>, Capa, Cartier-Bresson, Rodger and Seymour founded <strong>Magnum Photos</strong> — a photographer-owned cooperative ensuring photographers retained authorial control of their negatives.</p>"),
     ],
     [
         {"q": "Migrant Mother was photographed in:", "options": [opt("1926", False), opt("1936", True), opt("1946", False), opt("1956", False)]},
         {"q": "Magnum Photos was founded in:", "options": [opt("1937", False), opt("1947", True), opt("1957", False), opt("1967", False)]},
     ],
     [{"q": "Capa shot 106 D-Day frames but only how many survived (the 'Magnificent Eleven')?",
       "options": [11, 10, 12, 13], "answer": 11}],
     [{"q": "What surname did the photographer of Migrant Mother, Dorothea, have?", "answer": "lange"}],
     )
count += 1

make(SUB, TS, TD, 3,
     "Modernist to Contemporary Photography",
     "📸",
     "From Steiglitz's straight photography to Sherman's staged self.",
     "A-Level Art & Design: Steiglitz, Cindy Sherman, Jeff Wall, and photo theory.",
     "A photograph is a fiction with the texture of reality.",
     [
         ("Alfred Stieglitz", "American photographer (1864-1946), gallery 291, straight photography."),
         ("Straight Photography", "Photographic modernism — unmanipulated, sharply focused."),
         ("Cindy Sherman", "American artist (b. 1954), Untitled Film Stills (1977-1980)."),
         ("Jeff Wall", "Canadian photographer (b. 1946), large staged lightbox tableaux."),
         ("Untitled Film Stills", "Sherman's 1977-80 series of 70 self-staged film-style images."),
         ("Tableau Photography", "Large-scale, single-image, often staged cinematic photographs."),
     ],
     [
         ("Modernism", "Steiglitz and 291",
          "<p><strong>Alfred Stieglitz</strong> championed photography as a fine art at his New York gallery <strong>291</strong> (1905-1917). His own work moved from pictorial soft-focus to crisp 'straight photography' modernism.</p>"),
         ("Conceptual", "Sherman's Self",
          "<p>Cindy Sherman's <em>Untitled Film Stills</em> (<strong>1977-1980</strong>) comprise <strong>70 black-and-white photographs</strong> in which she stages herself as fictional film heroines, dissolving the boundary between self-portrait and performance.</p>"),
         ("Cinematic", "Jeff Wall's Lightbox",
          "<p>Jeff Wall's large back-lit colour transparencies — <em>A Sudden Gust of Wind (after Hokusai)</em>, <em>The Destroyed Room</em> — borrow scale and lighting from cinema and history painting to construct elaborate tableaux.</p>"),
     ],
     [
         {"q": "Stieglitz's gallery was numbered:", "options": [opt("191", False), opt("291", True), opt("391", False), opt("491", False)]},
         {"q": "Untitled Film Stills were made:", "options": [opt("1957-1960", False), opt("1977-1980", True), opt("1997-2000", False), opt("1987-1990", False)]},
     ],
     [{"q": "Cindy Sherman's Untitled Film Stills series comprises how many photographs?",
       "options": [70, 60, 80, 100], "answer": 70}],
     [{"q": "What surname did the Canadian lightbox photographer Jeff have?", "answer": "wall"}],
     )
count += 1

# --- curating--exhibitions ---
TS, TD = "curating--exhibitions", "Curating & Exhibitions"
make(SUB, TS, TD, 1,
     "The White Cube",
     "⬜",
     "O'Doherty's argument that the modern gallery is itself an ideology.",
     "A-Level Art & Design: white cube gallery, museum display, and exhibition critique.",
     "The gallery is the work.",
     [
         ("White Cube", "Modernist gallery — white walls, even light, no distraction."),
         ("Brian O'Doherty", "Irish artist/critic (b. 1928), 'Inside the White Cube' essays 1976."),
         ("Black Box", "Darkened gallery space for moving-image and projection."),
         ("Wall Label", "Identifying caption — artist, title, date, medium, accession number."),
         ("Sightline", "Planned viewer's line of sight through an exhibition."),
         ("Curator", "Person responsible for selecting, ordering and interpreting works."),
     ],
     [
         ("Critique", "O'Doherty's Essays",
          "<p>In <strong>1976</strong>, Brian O'Doherty published 'Inside the White Cube' in <em>Artforum</em>. He argued the modernist gallery's white walls, even light and exclusion of context were themselves ideological — not neutral but authoritative.</p>"),
         ("Practice", "Curatorial Decisions",
          "<p>Curators choose hang height (often 145-150 cm to centre), sightlines, wall colour, label wording and lighting. Each is an editorial choice shaping how the work is read.</p>"),
         ("Form", "Black Box",
          "<p>The <strong>black box</strong> — a darkened cinema-like room — has become standard for video art. It allows controlled projection but reproduces cinema's passive seated viewer, raising questions about gallery time.</p>"),
     ],
     [
         {"q": "'Inside the White Cube' was published in:", "options": [opt("1966", False), opt("1976", True), opt("1986", False), opt("1996", False)]},
         {"q": "Typical hang height (centre of work) is around:", "options": [opt("100 cm", False), opt("145-150 cm", True), opt("180 cm", False), opt("200 cm", False)]},
     ],
     [{"q": "If a wall is 4.5 m long and works are hung 60 cm apart with no end-margin, how many works fit (counting both ends)?",
       "options": [8, 7, 9, 6], "answer": 8}],
     [{"q": "What surname did the author of 'Inside the White Cube', Brian, have?", "answer": "o'doherty"}],
     )
count += 1

make(SUB, TS, TD, 2,
     "Biennials and the Global Art World",
     "🌍",
     "Venice since 1895, Documenta since 1955.",
     "A-Level Art & Design: Venice Biennale, Documenta, and global exhibitions.",
     "The biennial maps the contemporary world.",
     [
         ("Venice Biennale", "International art exhibition in Venice, founded 1895."),
         ("Documenta", "Quinquennial Kassel exhibition founded by Arnold Bode, 1955."),
         ("Pavilion", "National exhibition space in the Venice Giardini."),
         ("Golden Lion", "Top Venice Biennale prize."),
         ("Curator-Director", "Artistic director shaping a biennial's central exhibition."),
         ("Triennial", "Exhibition recurring every three years."),
     ],
     [
         ("Venice", "Since 1895",
          "<p>The <strong>Venice Biennale</strong>, founded <strong>1895</strong>, is the oldest major recurring contemporary art exhibition. National pavilions in the Giardini and the curated 'Arsenale' main show structure the modern biennial worldwide.</p>"),
         ("Kassel", "Documenta",
          "<p>Arnold Bode founded <strong>Documenta</strong> in <strong>1955</strong> in Kassel, partly to reintegrate German culture into a post-war art world. It now runs every <strong>five years</strong>, each edition led by a different curator.</p>"),
         ("Critique", "Biennialisation",
          "<p>Critics including Hito Steyerl and Pascal Gielen describe the rise of the global biennial circuit as 'biennialisation' — a transnational system in which curatorial labour is mobile, precarious, and tightly networked with capital.</p>"),
     ],
     [
         {"q": "The Venice Biennale was founded in:", "options": [opt("1875", False), opt("1895", True), opt("1915", False), opt("1955", False)]},
         {"q": "Documenta was founded in:", "options": [opt("1945", False), opt("1955", True), opt("1965", False), opt("1975", False)]},
     ],
     [{"q": "Documenta has occurred every 5 years since 1955. Approximately how many editions had occurred by 2025? (1955, 1960, ...)",
       "options": [15, 14, 16, 13], "answer": 15}],
     [{"q": "What is the top prize awarded at the Venice Biennale called? (two words, lowercase)", "answer": "golden lion"}],
     )
count += 1

make(SUB, TS, TD, 3,
     "Online Platforms and Digital Curating",
     "💻",
     "From Rhizome to Instagram — the gallery without walls.",
     "A-Level Art & Design: online platforms, digital curating, and post-internet art.",
     "The exhibition follows the audience.",
     [
         ("Online Exhibition", "Curated digital exhibition viewable via web browser."),
         ("Rhizome", "Online platform for digital art, founded by Mark Tribe, 1996."),
         ("Post-Internet Art", "Art made for or after the network condition (Marisa Olson coined c. 2008)."),
         ("Digital Twin", "3D web-replica of a physical exhibition or building."),
         ("NFT", "Non-fungible token — blockchain certificate of digital ownership."),
         ("Beeple", "American artist Mike Winkelmann; NFT 'Everydays' sold 2021 for $69.3m."),
     ],
     [
         ("Platform", "Rhizome",
          "<p><strong>Rhizome</strong>, founded <strong>1996</strong> by Mark Tribe, became a key platform for net.art, archiving early web-based works through tools like Webrecorder.</p>"),
         ("Coinage", "Post-Internet",
          "<p>Around <strong>2008</strong>, artist Marisa Olson described work made <em>after</em> the network as 'post-internet'. The term recognises that the internet has shifted from subject to background condition.</p>"),
         ("Market", "NFTs",
          "<p>In <strong>March 2021</strong>, Beeple's <em>Everydays: The First 5000 Days</em> sold at Christie's for <strong>US$69.3 million</strong>, propelling NFTs into mainstream debate. Critics question the energy cost and speculative bubble of blockchain art.</p>"),
     ],
     [
         {"q": "Rhizome was founded in:", "options": [opt("1986", False), opt("1996", True), opt("2006", False), opt("2016", False)]},
         {"q": "Beeple's record NFT sale at Christie's was in:", "options": [opt("2020", False), opt("2021", True), opt("2019", False), opt("2022", False)]},
     ],
     [{"q": "Beeple's Everydays sold at Christie's for approximately how many million US dollars?",
       "options": [69, 60, 80, 100], "answer": 69}],
     [{"q": "What term describes art made 'after' the network condition? (two words, lowercase, hyphenated)", "answer": "post-internet"}],
     )
count += 1

print(f"Art & Design done: {count}")
