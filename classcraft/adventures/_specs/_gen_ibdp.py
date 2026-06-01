"""Generate 96 IBDP adventure JSON specs (English Lit + French + German + Spanish).
Skips english-literature readers-writers-texts adventure 1 (already exists).
"""
import json, os

import sys
OUT_DIR = sys.argv[1] if len(sys.argv) > 1 else "/Users/james/Desktop/Websites/AI Study Method/classcraft/adventures/_specs"

def write_spec(filename, spec):
    path = os.path.join(OUT_DIR, filename)
    # validation
    assert len(spec["concepts"]) == 6, f"{filename}: concepts {len(spec['concepts'])}"
    assert len(spec["walkthroughs"]) == 3, f"{filename}: walkthroughs"
    assert len(spec["mcqs"]) == 2, f"{filename}: mcqs"
    assert len(spec["numericals"]) == 1, f"{filename}: numericals"
    assert len(spec["free_texts"]) == 1, f"{filename}: free_texts"
    for mcq in spec["mcqs"]:
        correct = sum(1 for o in mcq["options"] if o[1] == 1)
        assert correct == 1, f"{filename}: mcq correct count {correct}"
    num = spec["numericals"][0]
    assert num["answer"] in num["options"], f"{filename}: numerical answer not in options"
    # free_text answer must be lowercase ASCII
    ft = spec["free_texts"][0]["answer"]
    assert ft == ft.lower(), f"{filename}: free_text not lowercase"
    assert all(ord(c) < 128 for c in ft), f"{filename}: free_text non-ascii"
    with open(path, "w") as f:
        json.dump(spec, f, indent=2, ensure_ascii=False)

# ============================================================
# ENGLISH LITERATURE IBDP
# ============================================================
ENGLISH_THEME = "humanities-parchment"

ENGLISH_TOPICS = {
    "readers-writers-texts": {
        "display": "Readers, Writers & Texts",
        "adventures": [
            None,  # adventure 1 already exists
            {
                "title": "The Style and the Self",
                "emoji": "✒️",
                "welcome_lead": "Diction, syntax, and rhythm form the writer's fingerprint. In Readers, Writers & Texts you investigate how the texture of language constructs meaning.",
                "meta_desc": "IBDP English Literature: style, diction, syntax and how language constructs meaning.",
                "final_note": "Style is more than ornament — it is the texture of thought.",
                "concepts": [
                    {"term": "Syntax", "def": "The arrangement of words to form sentences and the rhythmic effect this creates."},
                    {"term": "Tone", "def": "The writer's attitude toward subject and audience, conveyed through language choices."},
                    {"term": "Imagery", "def": "Sensory language that evokes sight, sound, taste, touch or smell."},
                    {"term": "Connotation", "def": "The implied or associated meaning of a word beyond its denotation."},
                    {"term": "Free indirect discourse", "def": "A blend of third-person narration and character thought, popularised by Austen and Flaubert."},
                    {"term": "Register", "def": "The level of formality or informality in language, shaped by context and audience."}
                ],
                "walkthroughs": [
                    {"tag": "DICT", "h2": "Reading for diction", "body_html": "<p>Underline three loaded words in a passage. Ask: what do they connote? A character described as <em>scuttling</em> rather than <em>walking</em> carries insect-like associations. Diction is rarely neutral.</p>"},
                    {"tag": "SYNT", "h2": "Syntax and pacing", "body_html": "<p>Short sentences accelerate; long sentences linger. Hemingway favours clipped declaratives; Faulkner sprawls. Note how syntax mirrors thought: a panicked mind produces fragments.</p>"},
                    {"tag": "FID", "h2": "Free indirect discourse", "body_html": "<p>In <em>Mrs Dalloway</em>, Woolf slides between Clarissa's interior monologue and a third-person narrator without quotation marks. The technique collapses distance between reader and consciousness.</p>"}
                ],
                "mcqs": [
                    {"q": "Free indirect discourse blends which two perspectives?", "options": [["Third-person narration and character thought", 1], ["First-person and second-person", 0], ["Author and editor", 0], ["Past and future tense", 0]]},
                    {"q": "Which writer is famous for clipped, declarative syntax?", "options": [["Hemingway", 1], ["Faulkner", 0], ["James", 0], ["Dickens", 0]]}
                ],
                "numericals": [
                    {"q": "How many senses can imagery typically appeal to?", "options": [3, 4, 5, 6], "answer": 5}
                ],
                "free_texts": [
                    {"q": "What term describes the implied meaning of a word beyond its dictionary definition? (one word)", "answer": "connotation"}
                ]
            },
            {
                "title": "Intertextual Echoes",
                "emoji": "🔗",
                "welcome_lead": "No text exists in isolation. Kristeva's intertextuality reminds us that every work is a tissue of citations, allusions, and dialogues with what came before.",
                "meta_desc": "IBDP English Literature: intertextuality, allusion, and the dialogic nature of texts.",
                "final_note": "Every text is a conversation — listen for who else is speaking.",
                "concepts": [
                    {"term": "Intertextuality", "def": "Julia Kristeva's concept that texts derive meaning through relationships with other texts."},
                    {"term": "Allusion", "def": "A brief, often indirect reference to another text, event or figure."},
                    {"term": "Dialogism", "def": "Bakhtin's notion that texts contain multiple voices in dialogue."},
                    {"term": "Hypotext", "def": "An earlier text upon which a later text (hypertext) is built (Genette)."},
                    {"term": "Palimpsest", "def": "A text written over an earlier one, where traces of the original remain visible."},
                    {"term": "Pastiche", "def": "An imitation of another work's style, often as homage rather than mockery."}
                ],
                "walkthroughs": [
                    {"tag": "ALLU", "h2": "Spotting allusions", "body_html": "<p>T S Eliot's <em>The Waste Land</em> alludes to Dante, Shakespeare, and the Upanishads. Identifying the source enriches meaning: the allusion imports the earlier context.</p>"},
                    {"tag": "DIAL", "h2": "Bakhtin's dialogism", "body_html": "<p>For Bakhtin, the novel is fundamentally polyphonic — many voices contend within it. Dostoevsky's characters speak with ideological independence, not as mouthpieces for the author.</p>"},
                    {"tag": "HYPO", "h2": "Hypotext and hypertext", "body_html": "<p>Genette calls the source text the <em>hypotext</em> and the derivative the <em>hypertext</em>. Joyce's <em>Ulysses</em> is a hypertext of Homer's <em>Odyssey</em> — knowing the structure unlocks the parallels.</p>"}
                ],
                "mcqs": [
                    {"q": "Who coined the term intertextuality?", "options": [["Julia Kristeva", 1], ["Mikhail Bakhtin", 0], ["Gerard Genette", 0], ["Roland Barthes", 0]]},
                    {"q": "What is Bakhtin's term for the multiplicity of voices in a novel?", "options": [["Dialogism", 1], ["Monologism", 0], ["Pastiche", 0], ["Mimesis", 0]]}
                ],
                "numericals": [
                    {"q": "In Genette's model, how many texts are involved in a hypertext relationship?", "options": [1, 2, 3, 4], "answer": 2}
                ],
                "free_texts": [
                    {"q": "What term describes an imitation of another work's style as homage? (one word)", "answer": "pastiche"}
                ]
            }
        ]
    },
    "time-space": {
        "display": "Time & Space",
        "adventures": [
            {
                "title": "Setting the Scene",
                "emoji": "🗺️",
                "welcome_lead": "The IBDP area Time & Space asks how historical and cultural context shapes meaning. Setting is never mere backdrop — it produces character and theme.",
                "meta_desc": "IBDP English Literature: historical context, setting, and psychogeography in literary analysis.",
                "final_note": "Where and when a text was written shapes what it can mean.",
                "concepts": [
                    {"term": "Setting", "def": "The time, place and social environment in which a text is set."},
                    {"term": "Psychogeography", "def": "The study of how geographical environments shape emotional and psychological states."},
                    {"term": "Historical context", "def": "The political, social and cultural moment of a work's composition."},
                    {"term": "Chronotope", "def": "Bakhtin's term for the time-space configuration of a genre."},
                    {"term": "Local colour", "def": "Detailed depiction of regional customs, dialect and landscape."},
                    {"term": "Sense of place", "def": "The distinct character and emotional resonance attached to a particular location."}
                ],
                "walkthroughs": [
                    {"tag": "CHRO", "h2": "Bakhtin's chronotope", "body_html": "<p>Each genre has a typical time-space configuration: the road in picaresque, the castle in gothic, the salon in society fiction. Identifying the chronotope clarifies generic expectations.</p>"},
                    {"tag": "PSYC", "h2": "Psychogeography in practice", "body_html": "<p>Walking London with <em>Mrs Dalloway</em> shows how streets evoke memory. Dickens uses fog in <em>Bleak House</em> as both atmosphere and metaphor for legal obscurity.</p>"},
                    {"tag": "CTXT", "h2": "Historical context", "body_html": "<p>Reading <em>Things Fall Apart</em> without knowing British colonialism in Nigeria misses Achebe's intervention. Context isn't optional decoration — it grounds interpretation.</p>"}
                ],
                "mcqs": [
                    {"q": "Who coined the term chronotope?", "options": [["Bakhtin", 1], ["Genette", 0], ["Kristeva", 0], ["Iser", 0]]},
                    {"q": "Psychogeography studies the relation between place and what?", "options": [["Emotional states", 1], ["Economic class", 0], ["Linguistic register", 0], ["Genre conventions", 0]]}
                ],
                "numericals": [
                    {"q": "How many main elements typically define setting (time, place, social environment)?", "options": [2, 3, 4, 5], "answer": 3}
                ],
                "free_texts": [
                    {"q": "What is Bakhtin's term for the time-space configuration of a genre? (one word)", "answer": "chronotope"}
                ]
            },
            {
                "title": "Temporal Structures",
                "emoji": "⏳",
                "welcome_lead": "How texts handle time — flashback, foreshadowing, in medias res — is central to Time & Space. Narrative order is rarely chronological.",
                "meta_desc": "IBDP English Literature: temporal structure, flashback, foreshadowing, narrative order.",
                "final_note": "Time in fiction bends — and the bending carries meaning.",
                "concepts": [
                    {"term": "Analepsis", "def": "Genette's term for flashback — a return to an earlier event."},
                    {"term": "Prolepsis", "def": "Genette's term for flash-forward or foreshadowing."},
                    {"term": "In medias res", "def": "Beginning a narrative in the middle of the action."},
                    {"term": "Story vs discourse", "def": "Story is the chronological events; discourse is the order in which they are told."},
                    {"term": "Duration", "def": "The relation between the time events take in the story and the space they occupy in the text."},
                    {"term": "Frequency", "def": "How often an event is narrated relative to how often it occurs."}
                ],
                "walkthroughs": [
                    {"tag": "ANAP", "h2": "Analepsis and prolepsis", "body_html": "<p>A flashback (analepsis) recovers past time; a flash-forward (prolepsis) anticipates the future. Toni Morrison's <em>Beloved</em> uses analepsis to make the past inescapable.</p>"},
                    {"tag": "STDI", "h2": "Story versus discourse", "body_html": "<p>The chronological events constitute the <em>fabula</em> (story); the order of telling is the <em>sjuzhet</em> (discourse). A detective novel often reverses chronology — the murder is told last.</p>"},
                    {"tag": "DURA", "h2": "Duration effects", "body_html": "<p>A single moment may fill twenty pages (Joyce's epiphanies); years may pass in a sentence. The compression or expansion signals importance.</p>"}
                ],
                "mcqs": [
                    {"q": "What is Genette's term for a flashback?", "options": [["Analepsis", 1], ["Prolepsis", 0], ["Ellipsis", 0], ["Paralipsis", 0]]},
                    {"q": "Beginning in the middle of the action is called?", "options": [["In medias res", 1], ["Deus ex machina", 0], ["Ad hominem", 0], ["Mise en scene", 0]]}
                ],
                "numericals": [
                    {"q": "How many main temporal categories does Genette identify (order, duration, frequency)?", "options": [2, 3, 4, 5], "answer": 3}
                ],
                "free_texts": [
                    {"q": "What is the Russian Formalist term for the chronological sequence of events? (one word)", "answer": "fabula"}
                ]
            },
            {
                "title": "Cultural Moment",
                "emoji": "🏛️",
                "welcome_lead": "Every text emerges from and addresses a specific cultural moment. Understanding the moment lets you read the text's interventions.",
                "meta_desc": "IBDP English Literature: cultural and political contexts shaping literary meaning.",
                "final_note": "A text speaks to its moment — and asks us to listen across time.",
                "concepts": [
                    {"term": "Zeitgeist", "def": "The defining spirit or mood of a particular period of history."},
                    {"term": "Cultural moment", "def": "The intersection of political, social, and artistic forces at a specific time."},
                    {"term": "Reception history", "def": "How a text has been read and valued by successive audiences."},
                    {"term": "Canon", "def": "The body of texts traditionally regarded as authoritative within a literary tradition."},
                    {"term": "Periodisation", "def": "Dividing literary history into periods such as Romantic, Modernist, Postmodern."},
                    {"term": "Print culture", "def": "The historical conditions of book production and circulation."}
                ],
                "walkthroughs": [
                    {"tag": "ZEIT", "h2": "Reading the Zeitgeist", "body_html": "<p>The 1920s Modernism of Eliot and Woolf responds to the trauma of WWI. The fragmented forms are not arbitrary — they enact a fractured worldview.</p>"},
                    {"tag": "RECE", "h2": "Reception history", "body_html": "<p>Victorian readers found <em>Wuthering Heights</em> shocking and crude; today it is canonical. Reception history reveals how literary value is constructed.</p>"},
                    {"tag": "PERI", "h2": "Periodisation problems", "body_html": "<p>When does Modernism begin — 1900? 1910? 1922? Periods are heuristic, not natural. Be precise about which features define a movement.</p>"}
                ],
                "mcqs": [
                    {"q": "What does Zeitgeist refer to?", "options": [["Spirit of an age", 1], ["A literary award", 0], ["A narrative device", 0], ["A printing technique", 0]]},
                    {"q": "Modernism is often dated as a response to what event?", "options": [["World War I", 1], ["The French Revolution", 0], ["The Reformation", 0], ["The Cold War", 0]]}
                ],
                "numericals": [
                    {"q": "In what year was T S Eliot's The Waste Land published?", "options": [1918, 1922, 1925, 1930], "answer": 1922}
                ],
                "free_texts": [
                    {"q": "What term describes the body of authoritative literary texts? (one word)", "answer": "canon"}
                ]
            }
        ]
    },
    "intertextuality": {
        "display": "Intertextuality",
        "adventures": [
            {
                "title": "Allusion and Echo",
                "emoji": "🎭",
                "welcome_lead": "Intertextuality is the third IBDP area of exploration. Every text speaks with and against other texts — allusions enrich, parody critiques, adaptation reinvents.",
                "meta_desc": "IBDP English Literature: intertextuality, allusion, parody and literary echo.",
                "final_note": "Literature is a long conversation. Join it carefully.",
                "concepts": [
                    {"term": "Allusion", "def": "An indirect reference to another text, figure or event."},
                    {"term": "Parody", "def": "Comic imitation of another work that exaggerates its features."},
                    {"term": "Pastiche", "def": "Imitation that pays homage without mockery."},
                    {"term": "Quotation", "def": "Direct citation of another text, marked or unmarked."},
                    {"term": "Influence", "def": "Harold Bloom's term for the inescapable debt of writers to predecessors."},
                    {"term": "Anxiety of influence", "def": "Bloom's theory that strong writers struggle against the shadow of precursors."}
                ],
                "walkthroughs": [
                    {"tag": "PARA", "h2": "Parody versus pastiche", "body_html": "<p>Parody mocks its source; pastiche celebrates it. Jane Austen's <em>Northanger Abbey</em> parodies the gothic novel. Zadie Smith's <em>On Beauty</em> pastiches Forster's <em>Howards End</em>.</p>"},
                    {"tag": "INFL", "h2": "Harold Bloom's anxiety", "body_html": "<p>Bloom argues every strong poet rewrites their precursors through six revisionary ratios. Reading Wordsworth without Milton in mind misses the wrestling beneath.</p>"},
                    {"tag": "ECHO", "h2": "Tracing echoes", "body_html": "<p>An echo can be tonal as well as verbal. The opening of <em>Beloved</em> — '124 was spiteful' — echoes biblical incantation. Train your ear for inherited cadences.</p>"}
                ],
                "mcqs": [
                    {"q": "Who proposed the anxiety of influence?", "options": [["Harold Bloom", 1], ["Northrop Frye", 0], ["Roland Barthes", 0], ["Julia Kristeva", 0]]},
                    {"q": "Which is the difference between parody and pastiche?", "options": [["Parody mocks; pastiche imitates respectfully", 1], ["They are identical", 0], ["Parody is longer", 0], ["Pastiche must be in verse", 0]]}
                ],
                "numericals": [
                    {"q": "How many revisionary ratios does Bloom identify?", "options": [4, 5, 6, 7], "answer": 6}
                ],
                "free_texts": [
                    {"q": "What is the term for comic imitation that exaggerates its source? (one word)", "answer": "parody"}
                ]
            },
            {
                "title": "Archetypes and Adaptation",
                "emoji": "🌀",
                "welcome_lead": "Frye's archetypal patterns and Genette's hypertextuality help map how stories recur across forms and centuries.",
                "meta_desc": "IBDP English Literature: archetypal patterns, Frye, and the theory of literary adaptation.",
                "final_note": "Stories don't end — they migrate and transform.",
                "concepts": [
                    {"term": "Archetype", "def": "A recurring symbol, character or pattern across literature (Frye, Jung)."},
                    {"term": "Myth criticism", "def": "Northrop Frye's approach grouping literature into seasonal mythoi: comedy, romance, tragedy, irony."},
                    {"term": "Adaptation", "def": "Transposing a text into a new medium or genre."},
                    {"term": "Hypertext", "def": "A text derived from a prior text (hypotext) through transformation or imitation."},
                    {"term": "Transposition", "def": "Genette's term for serious transformation, e.g. Joyce's Ulysses from the Odyssey."},
                    {"term": "Quest narrative", "def": "Archetypal journey involving departure, trial and return."}
                ],
                "walkthroughs": [
                    {"tag": "FRYE", "h2": "Frye's four mythoi", "body_html": "<p>Frye links genres to seasons: comedy = spring, romance = summer, tragedy = autumn, irony/satire = winter. Mapping a text to a mythos clarifies its emotional arc.</p>"},
                    {"tag": "ADAP", "h2": "Adaptation as interpretation", "body_html": "<p>A film adaptation is also a reading. Baz Luhrmann's <em>Romeo + Juliet</em> recasts Verona as a contemporary city, foregrounding youth alienation.</p>"},
                    {"tag": "TRAN", "h2": "Genette's transposition", "body_html": "<p>Transposition takes a hypotext seriously into a new key. Jean Rhys's <em>Wide Sargasso Sea</em> transposes <em>Jane Eyre</em>'s Bertha into a postcolonial protagonist.</p>"}
                ],
                "mcqs": [
                    {"q": "Frye associates comedy with which season?", "options": [["Spring", 1], ["Summer", 0], ["Autumn", 0], ["Winter", 0]]},
                    {"q": "Wide Sargasso Sea transposes which hypotext?", "options": [["Jane Eyre", 1], ["Wuthering Heights", 0], ["Great Expectations", 0], ["Middlemarch", 0]]}
                ],
                "numericals": [
                    {"q": "How many mythoi does Frye identify?", "options": [3, 4, 5, 6], "answer": 4}
                ],
                "free_texts": [
                    {"q": "What is Frye's term for recurring narrative patterns? (one word)", "answer": "archetype"}
                ]
            },
            {
                "title": "Genres in Dialogue",
                "emoji": "🎼",
                "welcome_lead": "Genres are not boxes but ongoing conversations. Each new work reshapes the genre's possibilities.",
                "meta_desc": "IBDP English Literature: genre theory, hybridity, and intertextual dialogue between forms.",
                "final_note": "Genres breathe — they expand each time a writer enters them.",
                "concepts": [
                    {"term": "Genre", "def": "A category of text defined by shared formal and thematic conventions."},
                    {"term": "Generic hybridity", "def": "The mixing of two or more genres within a single text."},
                    {"term": "Convention", "def": "A recurring feature that signals genre to readers."},
                    {"term": "Subversion", "def": "Undermining or rewriting a genre's conventions."},
                    {"term": "Horizon of expectations", "def": "Jauss's term for the prior assumptions a reader brings to a text."},
                    {"term": "Metafiction", "def": "Fiction that draws attention to its own status as fiction."}
                ],
                "walkthroughs": [
                    {"tag": "HYBR", "h2": "Genre hybrids", "body_html": "<p><em>Cloud Atlas</em> by David Mitchell shuttles between thriller, historical fiction, dystopia and post-apocalyptic narrative. The hybridity is the point — genres mirror each other.</p>"},
                    {"tag": "SUBV", "h2": "Subverting conventions", "body_html": "<p>Angela Carter's <em>The Bloody Chamber</em> rewrites fairy tales, granting female protagonists agency where the originals had passivity. Subversion exposes the politics of convention.</p>"},
                    {"tag": "META", "h2": "Metafictional gestures", "body_html": "<p>When a narrator addresses the reader directly or comments on the act of writing, you have metafiction. Italo Calvino's <em>If on a winter's night a traveler</em> is built from this device.</p>"}
                ],
                "mcqs": [
                    {"q": "Who coined horizon of expectations?", "options": [["Jauss", 1], ["Iser", 0], ["Kristeva", 0], ["Genette", 0]]},
                    {"q": "Metafiction draws attention to what?", "options": [["Its own fictional status", 1], ["Historical accuracy", 0], ["Reader biography", 0], ["Print culture", 0]]}
                ],
                "numericals": [
                    {"q": "How many genres mix in a hybrid like Cloud Atlas (at least)?", "options": [1, 2, 3, 4], "answer": 2}
                ],
                "free_texts": [
                    {"q": "What term describes fiction that comments on its own status? (one word)", "answer": "metafiction"}
                ]
            }
        ]
    },
    "critical-reading": {
        "display": "Critical Reading",
        "adventures": [
            {
                "title": "Close Reading and Formalism",
                "emoji": "🔍",
                "welcome_lead": "Critical reading begins with close attention to the words on the page. Formalism and New Criticism gave us the disciplined tools.",
                "meta_desc": "IBDP English Literature: close reading, formalism, New Criticism, PEEL and PETER.",
                "final_note": "The text rewards patient attention. Read slowly, twice.",
                "concepts": [
                    {"term": "Close reading", "def": "Detailed analysis of a passage's language, structure and devices."},
                    {"term": "Formalism", "def": "A critical approach focused on form, structure and literariness."},
                    {"term": "New Criticism", "def": "Mid-20th-century US movement emphasising the autonomous text and ambiguity."},
                    {"term": "PEEL", "def": "Point, Evidence, Explain, Link — an essay paragraph structure."},
                    {"term": "PETER", "def": "Point, Evidence, Technique, Explanation, Relevance — analytic paragraph structure."},
                    {"term": "Ambiguity", "def": "William Empson's term for the productive multiplicity of meaning in literature."}
                ],
                "walkthroughs": [
                    {"tag": "CLOS", "h2": "Close reading method", "body_html": "<p>Identify devices, then explain their effect, then link to the wider thematic argument. Avoid simply listing techniques — interpret them.</p>"},
                    {"tag": "NEWC", "h2": "New Critical principles", "body_html": "<p>Wimsatt and Beardsley warned against the intentional fallacy (judging by author intent) and affective fallacy (judging by reader response). For New Critics, the text speaks for itself.</p>"},
                    {"tag": "AMBI", "h2": "Empson's ambiguity", "body_html": "<p>Empson's <em>Seven Types of Ambiguity</em> argues that literary richness depends on multiple simultaneous meanings. Resist flattening a passage to one reading too early.</p>"}
                ],
                "mcqs": [
                    {"q": "Who wrote Seven Types of Ambiguity?", "options": [["William Empson", 1], ["I A Richards", 0], ["F R Leavis", 0], ["Cleanth Brooks", 0]]},
                    {"q": "What does the E in PEEL stand for?", "options": [["Evidence", 1], ["Example", 0], ["Effect", 0], ["Emphasis", 0]]}
                ],
                "numericals": [
                    {"q": "How many types of ambiguity does Empson identify?", "options": [5, 6, 7, 8], "answer": 7}
                ],
                "free_texts": [
                    {"q": "What Wimsatt-Beardsley fallacy warns against using author intent? (two words, hyphen-free)", "answer": "intentional fallacy"}
                ]
            },
            {
                "title": "Marxist and Feminist Lenses",
                "emoji": "⚖️",
                "welcome_lead": "Critical theory expands close reading. Marxist and feminist lenses ask what the text reveals about class and gender.",
                "meta_desc": "IBDP English Literature: Marxist and feminist critical approaches.",
                "final_note": "Every reading is political — make yours conscious.",
                "concepts": [
                    {"term": "Marxist criticism", "def": "Reading literature in terms of class, ideology and material conditions."},
                    {"term": "Base and superstructure", "def": "Marx's distinction between economic foundation and cultural forms."},
                    {"term": "Ideology", "def": "The system of ideas that naturalises a social order."},
                    {"term": "Feminist criticism", "def": "Analysis of how texts represent and shape gender."},
                    {"term": "Gynocriticism", "def": "Elaine Showalter's term for the study of women writers and female literary traditions."},
                    {"term": "Ecriture feminine", "def": "Helene Cixous's call for a writing rooted in the female body and difference."}
                ],
                "walkthroughs": [
                    {"tag": "MARX", "h2": "Eagleton on ideology", "body_html": "<p>Terry Eagleton argues literature both reflects and shapes ideology. Reading <em>Mansfield Park</em> with Eagleton foregrounds the silent slave economy behind Sir Thomas's wealth.</p>"},
                    {"tag": "SHOW", "h2": "Showalter's three phases", "body_html": "<p>Showalter divides women's writing into Feminine (imitation), Feminist (protest), Female (self-discovery). The schema offers a framework for tracing women's literary tradition.</p>"},
                    {"tag": "CIXO", "h2": "Ecriture feminine", "body_html": "<p>Cixous urges women to 'write the body'. Whether you accept the essentialism, the move opens new questions about how language is gendered.</p>"}
                ],
                "mcqs": [
                    {"q": "Who proposed gynocriticism?", "options": [["Elaine Showalter", 1], ["Helene Cixous", 0], ["Julia Kristeva", 0], ["Judith Butler", 0]]},
                    {"q": "Eagleton is associated with which critical school?", "options": [["Marxist", 1], ["Feminist", 0], ["Postcolonial", 0], ["Psychoanalytic", 0]]}
                ],
                "numericals": [
                    {"q": "How many phases of women's writing does Showalter identify?", "options": [2, 3, 4, 5], "answer": 3}
                ],
                "free_texts": [
                    {"q": "What term describes Cixous's call for writing the body? (two words, no accents)", "answer": "ecriture feminine"}
                ]
            },
            {
                "title": "Postcolonial and Psychoanalytic Readings",
                "emoji": "🧭",
                "welcome_lead": "Said, Spivak, Bhabha and Freud open further interpretive paths. Postcolonial and psychoanalytic lenses uncover empire and unconscious in the text.",
                "meta_desc": "IBDP English Literature: postcolonial theory (Said, Spivak, Bhabha) and psychoanalytic criticism.",
                "final_note": "Texts carry empires and unconsciouses — bring them to light.",
                "concepts": [
                    {"term": "Orientalism", "def": "Edward Said's critique of Western representations of the East as exotic Other."},
                    {"term": "Subaltern", "def": "Gayatri Spivak's term for those denied a voice within hegemonic discourse."},
                    {"term": "Hybridity", "def": "Homi Bhabha's concept of cultural mixing in colonial encounter."},
                    {"term": "Psychoanalytic criticism", "def": "Reading texts through Freudian or Lacanian frames of desire and unconscious."},
                    {"term": "Uncanny", "def": "Freud's das Unheimliche — the strangely familiar that disturbs."},
                    {"term": "Mimicry", "def": "Bhabha's term for the colonised subject's partial imitation of the coloniser."}
                ],
                "walkthroughs": [
                    {"tag": "SAID", "h2": "Reading Orientalism", "body_html": "<p>Said shows how Western texts construct the East as static and feminine. Apply the lens to <em>A Passage to India</em> — Forster both critiques and reproduces Orientalist tropes.</p>"},
                    {"tag": "SPIV", "h2": "Can the subaltern speak?", "body_html": "<p>Spivak's question challenges the assumption that critics can ventriloquise oppressed voices. Even sympathetic representation may erase difference.</p>"},
                    {"tag": "FREU", "h2": "The uncanny", "body_html": "<p>The uncanny is the strangely familiar — doubles, dolls, doppelgangers. Apply it to gothic fiction or Henry James's <em>The Turn of the Screw</em>.</p>"}
                ],
                "mcqs": [
                    {"q": "Who wrote Orientalism?", "options": [["Edward Said", 1], ["Gayatri Spivak", 0], ["Homi Bhabha", 0], ["Frantz Fanon", 0]]},
                    {"q": "Who asks Can the subaltern speak?", "options": [["Spivak", 1], ["Said", 0], ["Bhabha", 0], ["Fanon", 0]]}
                ],
                "numericals": [
                    {"q": "In what year was Said's Orientalism published?", "options": [1975, 1978, 1982, 1985], "answer": 1978}
                ],
                "free_texts": [
                    {"q": "What is Bhabha's term for colonial cultural mixing? (one word)", "answer": "hybridity"}
                ]
            }
        ]
    },
    "comparative-study": {
        "display": "Comparative Study",
        "adventures": [
            {
                "title": "Parallel Themes",
                "emoji": "📚",
                "welcome_lead": "IBDP requires comparing texts. The HL Essay and Paper 2 thrive on parallel themes treated across different forms or cultures.",
                "meta_desc": "IBDP English Literature: comparative study, parallel themes across texts.",
                "final_note": "Comparison is not parallel summary — it is illuminating juxtaposition.",
                "concepts": [
                    {"term": "Comparative study", "def": "Analysis of two or more texts to illuminate similarities and differences."},
                    {"term": "Thematic parallel", "def": "A theme shared by multiple texts, providing the axis of comparison."},
                    {"term": "Point of comparison", "def": "A specific angle or question used to align texts for analysis."},
                    {"term": "Contrast", "def": "A meaningful difference between texts that sharpens understanding."},
                    {"term": "Convergence", "def": "Points at which different texts arrive at similar insights."},
                    {"term": "Divergence", "def": "Where similar themes are treated in opposing ways."}
                ],
                "walkthroughs": [
                    {"tag": "PARA", "h2": "Choosing parallel themes", "body_html": "<p>Look for a theme distinctive enough to drive both texts — alienation in <em>The Outsider</em> and <em>Notes from Underground</em> — not so general it becomes vague (love, death).</p>"},
                    {"tag": "POIN", "h2": "Defining points of comparison", "body_html": "<p>A point of comparison might be: how each text uses an unreliable narrator to construct alienation. The narrower the point, the more incisive the analysis.</p>"},
                    {"tag": "BALA", "h2": "Balanced analysis", "body_html": "<p>Devote roughly equal attention to each text. Avoid treating one as the 'main' text — the comparison itself should be the focus.</p>"}
                ],
                "mcqs": [
                    {"q": "Which is NOT a good axis for IBDP comparison?", "options": [["A theme so broad it fits any text", 1], ["A specific narrative technique", 0], ["A shared cultural context", 0], ["A genre convention", 0]]},
                    {"q": "What should comparative analysis avoid?", "options": [["Parallel summary", 1], ["Specific evidence", 0], ["Direct quotation", 0], ["Theoretical framing", 0]]}
                ],
                "numericals": [
                    {"q": "Minimum number of texts for IBDP comparative study?", "options": [1, 2, 3, 4], "answer": 2}
                ],
                "free_texts": [
                    {"q": "What term describes where similar themes are treated in opposing ways? (one word)", "answer": "divergence"}
                ]
            },
            {
                "title": "Across Forms and Cultures",
                "emoji": "🌍",
                "welcome_lead": "Comparing prose with verse, or texts from different cultural traditions, reveals what is form-specific and what crosses borders.",
                "meta_desc": "IBDP English Literature: comparing across form and culture — prose, verse, drama.",
                "final_note": "Cross-cultural comparison sharpens both texts and your reading.",
                "concepts": [
                    {"term": "Cross-cultural comparison", "def": "Analysis of texts from different cultural traditions."},
                    {"term": "Form-specific feature", "def": "An effect particular to a genre (e.g. line break in poetry)."},
                    {"term": "World literature", "def": "Goethe's term for literature circulating beyond national borders."},
                    {"term": "Translation", "def": "The recreation of a text in another language, always an act of interpretation."},
                    {"term": "Cultural lens", "def": "A specific cultural framework used to read a text."},
                    {"term": "Universal vs particular", "def": "The tension between local specificity and broader human resonance."}
                ],
                "walkthroughs": [
                    {"tag": "FORM", "h2": "Comparing across form", "body_html": "<p>Compare Plath's sonnet with Woolf's prose treatment of the same emotion. Plath's volta turns; Woolf's prose ebbs. Form shapes what can be said.</p>"},
                    {"tag": "TRAN", "h2": "Reading in translation", "body_html": "<p>Camus in English is not Camus in French. Acknowledge translation choices — they are interpretive acts that affect your reading.</p>"},
                    {"tag": "LENS", "h2": "Applying a cultural lens", "body_html": "<p>Read <em>Things Fall Apart</em> alongside <em>Heart of Darkness</em>. Each text becomes a lens on the other — coloniser and colonised speaking back.</p>"}
                ],
                "mcqs": [
                    {"q": "Who coined world literature (Weltliteratur)?", "options": [["Goethe", 1], ["Schiller", 0], ["Eliot", 0], ["Said", 0]]},
                    {"q": "Reading a text in translation should be treated as?", "options": [["An interpretive act", 1], ["Transparent", 0], ["Identical to the original", 0], ["Irrelevant", 0]]}
                ],
                "numericals": [
                    {"q": "How many literary forms does IBDP English typically cover (prose/verse/drama)?", "options": [2, 3, 4, 5], "answer": 3}
                ],
                "free_texts": [
                    {"q": "What is Goethe's term for literature circulating beyond national borders? (two words)", "answer": "world literature"}
                ]
            },
            {
                "title": "Building the HL Essay",
                "emoji": "🎯",
                "welcome_lead": "The HL Essay (1200-1500 words) demands a focused line of inquiry. A strong question and selective evidence carry it.",
                "meta_desc": "IBDP English Literature: structuring the HL Essay with a focused line of inquiry.",
                "final_note": "Focus narrows; depth widens. Choose one question and pursue it.",
                "concepts": [
                    {"term": "Line of inquiry", "def": "A precise question that guides the HL Essay's argument."},
                    {"term": "Thesis", "def": "The essay's central claim, sustained throughout the writing."},
                    {"term": "Evidence selection", "def": "Choosing quotations that best support the argument; quality over quantity."},
                    {"term": "Critical context", "def": "Theoretical or scholarly framing brought into the essay."},
                    {"term": "Conclusion", "def": "The synthesis that ties analysis to the line of inquiry."},
                    {"term": "Word limit", "def": "The HL Essay must be 1200-1500 words."}
                ],
                "walkthroughs": [
                    {"tag": "INQU", "h2": "Crafting the line of inquiry", "body_html": "<p>Avoid yes/no questions. A good line: 'How does Atwood use intertextual allusion to interrogate prophecy in <em>The Penelopiad</em>?'. It signals focus, technique, and a critical claim.</p>"},
                    {"tag": "EVID", "h2": "Selecting evidence", "body_html": "<p>One sharply-analysed quotation beats three undigested ones. Show how the language operates — don't merely cite to prove the event happened.</p>"},
                    {"tag": "CONC", "h2": "Writing the conclusion", "body_html": "<p>Don't simply repeat. Show where the argument has arrived and what it now lets you see about the text that the introduction could not.</p>"}
                ],
                "mcqs": [
                    {"q": "What is the upper word limit of the IBDP HL Essay?", "options": [["1500", 1], ["1200", 0], ["2000", 0], ["1000", 0]]},
                    {"q": "A strong line of inquiry should be?", "options": [["Focused and arguable", 1], ["A yes/no question", 0], ["Broad and general", 0], ["Biographical", 0]]}
                ],
                "numericals": [
                    {"q": "Minimum word count of the IBDP HL Essay?", "options": [800, 1000, 1200, 1500], "answer": 1200}
                ],
                "free_texts": [
                    {"q": "What is the central sustained claim of an essay called? (one word)", "answer": "thesis"}
                ]
            }
        ]
    },
    "literary-forms": {
        "display": "Literary Forms",
        "adventures": [
            {
                "title": "The Novel and its Subgenres",
                "emoji": "📕",
                "welcome_lead": "The novel houses many subgenres — bildungsroman, epistolary, gothic, magical realism. Knowing the form sharpens your reading.",
                "meta_desc": "IBDP English Literature: the novel's subgenres including bildungsroman, epistolary, gothic, magical realism.",
                "final_note": "Subgenres carry expectations — writers play with or against them.",
                "concepts": [
                    {"term": "Novel", "def": "An extended prose narrative, typically dealing with character and society."},
                    {"term": "Bildungsroman", "def": "A novel of formation, tracing a protagonist's moral and psychological growth."},
                    {"term": "Epistolary novel", "def": "A novel told through letters or other documents."},
                    {"term": "Gothic novel", "def": "A subgenre featuring castles, ruins, terror and the supernatural."},
                    {"term": "Magical realism", "def": "Realist narrative with embedded magical elements treated as ordinary."},
                    {"term": "Picaresque", "def": "Episodic novel following a roguish protagonist through adventures."}
                ],
                "walkthroughs": [
                    {"tag": "BILD", "h2": "Bildungsroman arc", "body_html": "<p>Goethe's <em>Wilhelm Meister</em> set the pattern: youth, error, education, integration. <em>Great Expectations</em> follows the arc; <em>To Kill a Mockingbird</em> updates it.</p>"},
                    {"tag": "EPIS", "h2": "The epistolary form", "body_html": "<p>Richardson's <em>Pamela</em> founded the form. Letters generate intimacy and unreliability — each writer constructs a version of events for a specific reader.</p>"},
                    {"tag": "MARE", "h2": "Magical realism", "body_html": "<p>In Garcia Marquez's <em>One Hundred Years of Solitude</em>, levitation and prophecy are reported in the same calm register as breakfast. The juxtaposition is the politics.</p>"}
                ],
                "mcqs": [
                    {"q": "An epistolary novel is told through?", "options": [["Letters", 1], ["Verse", 0], ["Dialogue alone", 0], ["Dreams", 0]]},
                    {"q": "Garcia Marquez is associated with which subgenre?", "options": [["Magical realism", 1], ["Bildungsroman", 0], ["Picaresque", 0], ["Gothic", 0]]}
                ],
                "numericals": [
                    {"q": "In what year was One Hundred Years of Solitude published?", "options": [1962, 1965, 1967, 1970], "answer": 1967}
                ],
                "free_texts": [
                    {"q": "What is a novel of formation called? (one word)", "answer": "bildungsroman"}
                ]
            },
            {
                "title": "Poetry: Sonnet, Ode and Free Verse",
                "emoji": "📜",
                "welcome_lead": "Poetic forms shape meaning. The sonnet argues; the ode praises; free verse improvises. Knowing the form unlocks the poem.",
                "meta_desc": "IBDP English Literature: poetic forms — sonnet, ode, free verse.",
                "final_note": "Form is the first reading of a poem.",
                "concepts": [
                    {"term": "Sonnet", "def": "A 14-line poem in iambic pentameter, typically with a volta."},
                    {"term": "Volta", "def": "The 'turn' in a sonnet's argument, often between octave and sestet."},
                    {"term": "Ode", "def": "A formal lyric address, often of praise or meditation."},
                    {"term": "Free verse", "def": "Poetry without regular metre or rhyme, governed by cadence."},
                    {"term": "Iambic pentameter", "def": "A line of five iambs (unstressed-stressed pairs)."},
                    {"term": "Enjambment", "def": "Continuation of a sentence beyond a line break."}
                ],
                "walkthroughs": [
                    {"tag": "SONN", "h2": "Petrarchan vs Shakespearean", "body_html": "<p>The Petrarchan sonnet divides 8 + 6, with volta at line 9. The Shakespearean divides 4+4+4+2, with the final couplet resolving. The shape carries the argument.</p>"},
                    {"tag": "ODE", "h2": "Reading an ode", "body_html": "<p>Keats's odes follow a pattern: invocation, exploration, ambivalent resolution. The Grecian Urn is praised then unsettled — beauty is also stasis.</p>"},
                    {"tag": "FREE", "h2": "Free verse cadence", "body_html": "<p>Whitman's free verse uses anaphora and biblical cadence. Free does not mean shapeless — the unit is breath, not metre.</p>"}
                ],
                "mcqs": [
                    {"q": "How many lines in a sonnet?", "options": [["14", 1], ["12", 0], ["16", 0], ["10", 0]]},
                    {"q": "The volta is a sonnet's?", "options": [["Turn or shift", 1], ["Opening line", 0], ["Rhyme scheme", 0], ["Title", 0]]}
                ],
                "numericals": [
                    {"q": "How many iambs in iambic pentameter?", "options": [4, 5, 6, 7], "answer": 5}
                ],
                "free_texts": [
                    {"q": "What is the continuation of a sentence beyond a line break called? (one word)", "answer": "enjambment"}
                ]
            },
            {
                "title": "Drama: Tragedy and Comedy",
                "emoji": "🎭",
                "welcome_lead": "Drama unfolds in performance. Tragedy and comedy organise human experience differently — knowing the conventions sharpens analysis.",
                "meta_desc": "IBDP English Literature: dramatic forms — tragedy, comedy, history, and creative non-fiction.",
                "final_note": "Drama lives in performance — read the stage as you read the page.",
                "concepts": [
                    {"term": "Tragedy", "def": "A serious drama ending in catastrophe, typically involving a flawed protagonist."},
                    {"term": "Hamartia", "def": "Aristotle's term for the tragic protagonist's flaw or error."},
                    {"term": "Catharsis", "def": "Aristotle's purging of pity and fear through tragedy."},
                    {"term": "Comedy", "def": "A drama with a happy ending, often involving reconciliation and marriage."},
                    {"term": "History play", "def": "Drama based on historical events, especially Shakespeare's English kings."},
                    {"term": "Creative non-fiction", "def": "Prose that applies literary craft to factual material."}
                ],
                "walkthroughs": [
                    {"tag": "TRAG", "h2": "Aristotle on tragedy", "body_html": "<p>The <em>Poetics</em> identifies plot as the soul of tragedy. The arc moves through hamartia to peripeteia (reversal) to anagnorisis (recognition) to catharsis.</p>"},
                    {"tag": "COMI", "h2": "Comic resolution", "body_html": "<p>Northrop Frye notes that comedy typically ends with a new social order — often a wedding. Shakespeare's comedies move from confusion to integration.</p>"},
                    {"tag": "CNF", "h2": "Creative non-fiction", "body_html": "<p>Truman Capote's <em>In Cold Blood</em> applies novelistic technique to real murder. The form raises ethical and epistemological questions.</p>"}
                ],
                "mcqs": [
                    {"q": "What is Aristotle's term for tragic flaw?", "options": [["Hamartia", 1], ["Catharsis", 0], ["Mimesis", 0], ["Anagnorisis", 0]]},
                    {"q": "Comedies typically end with?", "options": [["Reconciliation", 1], ["Death", 0], ["Exile", 0], ["Madness", 0]]}
                ],
                "numericals": [
                    {"q": "How many key plot components does Aristotle's tragic arc identify (hamartia, peripeteia, anagnorisis, catharsis)?", "options": [2, 3, 4, 5], "answer": 4}
                ],
                "free_texts": [
                    {"q": "What is Aristotle's term for the purging of pity and fear? (one word)", "answer": "catharsis"}
                ]
            }
        ]
    },
    "cultural-contexts": {
        "display": "Cultural Contexts",
        "adventures": [
            {
                "title": "Postcolonial Voices",
                "emoji": "🌐",
                "welcome_lead": "Cultural contexts include the long aftermath of empire. Said, Spivak and Bhabha give us tools to read post-colonial texts.",
                "meta_desc": "IBDP English Literature: postcolonial cultural contexts — Said, Spivak, Bhabha.",
                "final_note": "Empire is not behind us — it shapes the texts we read.",
                "concepts": [
                    {"term": "Postcolonialism", "def": "A critical approach examining the cultural legacy of colonial rule."},
                    {"term": "Orientalism", "def": "Said's critique of Western constructions of the East."},
                    {"term": "Subaltern", "def": "Spivak's term for those excluded from dominant discourse."},
                    {"term": "Hybridity", "def": "Bhabha's concept of cultural mixing in colonial contact zones."},
                    {"term": "Negritude", "def": "The Francophone Black literary movement asserting African cultural value."},
                    {"term": "Writing back", "def": "Postcolonial reworking of canonical European texts."}
                ],
                "walkthroughs": [
                    {"tag": "BACK", "h2": "Writing back to the canon", "body_html": "<p>Jean Rhys's <em>Wide Sargasso Sea</em> rewrites <em>Jane Eyre</em> from Bertha Mason's perspective. The strategy gives voice to the colonial Other erased by the canonical text.</p>"},
                    {"tag": "ACHB", "h2": "Achebe vs Conrad", "body_html": "<p>Achebe's essay 'An Image of Africa' attacks Conrad's <em>Heart of Darkness</em> as racist. Reading both reveals how representation has political stakes.</p>"},
                    {"tag": "NEGR", "h2": "Negritude movement", "body_html": "<p>Cesaire, Senghor and Damas founded Negritude in 1930s Paris, affirming Black cultural identity against colonial denigration. Read poems for their celebratory difference.</p>"}
                ],
                "mcqs": [
                    {"q": "Who wrote Wide Sargasso Sea?", "options": [["Jean Rhys", 1], ["Chinua Achebe", 0], ["Salman Rushdie", 0], ["Arundhati Roy", 0]]},
                    {"q": "Negritude was founded in which decade?", "options": [["1930s", 1], ["1920s", 0], ["1950s", 0], ["1960s", 0]]}
                ],
                "numericals": [
                    {"q": "How many founders of the Negritude movement (Cesaire, Senghor, Damas)?", "options": [2, 3, 4, 5], "answer": 3}
                ],
                "free_texts": [
                    {"q": "What term describes postcolonial reworking of European canonical texts? (two words)", "answer": "writing back"}
                ]
            },
            {
                "title": "Feminist Traditions",
                "emoji": "♀️",
                "welcome_lead": "Feminist criticism traces women's writing and asks how texts construct gender. From Wollstonecraft to Butler, the tradition is rich.",
                "meta_desc": "IBDP English Literature: feminist cultural contexts — Showalter, Cixous, Butler.",
                "final_note": "Reading as a feminist is not adding politics — it is naming the politics already there.",
                "concepts": [
                    {"term": "Feminism", "def": "Movement and theory asserting the political, social and economic equality of women."},
                    {"term": "Gynocriticism", "def": "Showalter's study of women's writing as a distinct tradition."},
                    {"term": "Performativity", "def": "Judith Butler's theory that gender is enacted rather than essential."},
                    {"term": "Patriarchy", "def": "A social system in which men hold primary power."},
                    {"term": "Female gothic", "def": "Gothic fiction by women foregrounding women's confinement and anxiety."},
                    {"term": "Madwoman in the attic", "def": "Gilbert and Gubar's image of Victorian women writers' suppressed creative anger."}
                ],
                "walkthroughs": [
                    {"tag": "MADW", "h2": "Gilbert and Gubar", "body_html": "<p>Their reading of Bertha Mason as Jane's double opened a feminist tradition. The 'madwoman' figure is the silenced rage of women writers themselves.</p>"},
                    {"tag": "BUTL", "h2": "Butler's performativity", "body_html": "<p>For Butler, gender is the repeated stylisation of the body. Reading <em>Orlando</em> or <em>Mrs Dalloway</em> through performativity opens questions of how characters become 'feminine'.</p>"},
                    {"tag": "FGOT", "h2": "The female gothic", "body_html": "<p>Ann Radcliffe and the Brontes use gothic conventions — confinement, mysterious men, decaying houses — to encode women's experience of patriarchy.</p>"}
                ],
                "mcqs": [
                    {"q": "Who wrote The Madwoman in the Attic?", "options": [["Gilbert and Gubar", 1], ["Showalter alone", 0], ["Kristeva and Cixous", 0], ["Butler and Sedgwick", 0]]},
                    {"q": "Performativity is associated with?", "options": [["Judith Butler", 1], ["Helene Cixous", 0], ["Elaine Showalter", 0], ["Virginia Woolf", 0]]}
                ],
                "numericals": [
                    {"q": "In what year was The Madwoman in the Attic published?", "options": [1975, 1979, 1982, 1985], "answer": 1979}
                ],
                "free_texts": [
                    {"q": "What is the term for the social system in which men hold primary power? (one word)", "answer": "patriarchy"}
                ]
            },
            {
                "title": "Marxism and the Frankfurt School",
                "emoji": "📕",
                "welcome_lead": "Marxist criticism and the Frankfurt School read culture as ideology. Adorno, Benjamin, Eagleton — their tools sharpen any close reading.",
                "meta_desc": "IBDP English Literature: Marxist criticism and the Frankfurt School (Adorno, Benjamin, Eagleton).",
                "final_note": "Culture is never innocent. Read for the politics in the form.",
                "concepts": [
                    {"term": "Frankfurt School", "def": "Group of Marxist thinkers including Adorno, Horkheimer, Benjamin and Marcuse."},
                    {"term": "Culture industry", "def": "Adorno and Horkheimer's term for mass-produced culture that reinforces capitalism."},
                    {"term": "Aura", "def": "Walter Benjamin's term for the unique presence of an original artwork."},
                    {"term": "Ideology", "def": "The system of ideas that naturalises social arrangements."},
                    {"term": "Commodity fetishism", "def": "Marx's term for the way commodities mask social relations of production."},
                    {"term": "Hegemony", "def": "Gramsci's term for the consent-based dominance of a ruling group."}
                ],
                "walkthroughs": [
                    {"tag": "BENJ", "h2": "Benjamin on mechanical reproduction", "body_html": "<p>Benjamin argues that photographic and cinematic reproduction destroys the aura of the original. Apply this to discussions of adaptation and authenticity.</p>"},
                    {"tag": "ADOR", "h2": "Adorno's culture industry", "body_html": "<p>Pop music, Hollywood and pulp fiction, for Adorno, sedate rather than enlighten. The critique is overstated, but the question — who benefits from this form? — remains useful.</p>"},
                    {"tag": "GRAM", "h2": "Gramsci's hegemony", "body_html": "<p>Hegemony shows how dominant ideas come to seem natural. Literature can both sustain and rupture hegemonic common sense.</p>"}
                ],
                "mcqs": [
                    {"q": "Who coined hegemony in its Marxist sense?", "options": [["Gramsci", 1], ["Adorno", 0], ["Benjamin", 0], ["Marx", 0]]},
                    {"q": "Aura is associated with which thinker?", "options": [["Walter Benjamin", 1], ["Theodor Adorno", 0], ["Max Horkheimer", 0], ["Terry Eagleton", 0]]}
                ],
                "numericals": [
                    {"q": "Approximate decade the Frankfurt School was founded?", "options": [1910, 1920, 1930, 1940], "answer": 1920}
                ],
                "free_texts": [
                    {"q": "What is Benjamin's term for the unique presence of an original artwork? (one word)", "answer": "aura"}
                ]
            }
        ]
    },
    "author-study": {
        "display": "Author Study",
        "adventures": [
            {
                "title": "Biographical Context",
                "emoji": "🪶",
                "welcome_lead": "An author study reads a writer's work alongside their life. Biography is not destiny, but it illuminates the writing.",
                "meta_desc": "IBDP English Literature: author study, biographical context, recurring themes.",
                "final_note": "The life is not the work — but it can light the work.",
                "concepts": [
                    {"term": "Biographical criticism", "def": "Reading a text in light of the author's life and experiences."},
                    {"term": "Oeuvre", "def": "An author's complete body of work."},
                    {"term": "Intentional fallacy", "def": "Wimsatt and Beardsley's warning against equating meaning with author intent."},
                    {"term": "Recurring motif", "def": "An image or idea that appears repeatedly across an author's work."},
                    {"term": "Author function", "def": "Foucault's concept of authorship as a discursive role rather than a person."},
                    {"term": "Death of the author", "def": "Roland Barthes's essay arguing meaning resides in the reader, not the author."}
                ],
                "walkthroughs": [
                    {"tag": "BIOG", "h2": "Biography and limits", "body_html": "<p>Knowing Sylvia Plath's depression illuminates <em>Ariel</em>, but reducing the poems to autobiography flattens them. Use biography as one lens among several.</p>"},
                    {"tag": "FOUC", "h2": "Foucault on the author", "body_html": "<p>For Foucault, the 'author' is a function of discourse that organises texts. Asking 'who speaks?' is also asking what cultural role the author plays.</p>"},
                    {"tag": "BART", "h2": "Death of the author", "body_html": "<p>Barthes shifts authority from author to reader. The essay is provocative; you don't have to accept it, but you should answer it.</p>"}
                ],
                "mcqs": [
                    {"q": "Who wrote 'The Death of the Author'?", "options": [["Roland Barthes", 1], ["Michel Foucault", 0], ["Jacques Derrida", 0], ["Jean-Paul Sartre", 0]]},
                    {"q": "What is an author's complete body of work called?", "options": [["Oeuvre", 1], ["Canon", 0], ["Catalogue", 0], ["Corpus", 0]]}
                ],
                "numericals": [
                    {"q": "In what year did Barthes publish 'The Death of the Author'?", "options": [1965, 1967, 1970, 1975], "answer": 1967}
                ],
                "free_texts": [
                    {"q": "Whose 'author function' concept reframes authorship as a discursive role? (surname)", "answer": "foucault"}
                ]
            },
            {
                "title": "Recurring Themes and Motifs",
                "emoji": "🔁",
                "welcome_lead": "An author study tracks how preoccupations recur. Tracing motifs across an oeuvre reveals deep concerns.",
                "meta_desc": "IBDP English Literature: tracking recurring themes and motifs across an author's oeuvre.",
                "final_note": "Watch the obsessions. Writers return to what they cannot solve.",
                "concepts": [
                    {"term": "Motif", "def": "A recurring image, sound, or idea within or across texts."},
                    {"term": "Theme", "def": "An abstract concern that organises a work's meaning."},
                    {"term": "Preoccupation", "def": "A persistent concern that recurs across an author's writing."},
                    {"term": "Style signature", "def": "Distinctive stylistic features marking an author's writing."},
                    {"term": "Development", "def": "How an author's themes and techniques change across the oeuvre."},
                    {"term": "Mature work", "def": "The phase of an author's writing in which characteristic concerns crystallise."}
                ],
                "walkthroughs": [
                    {"tag": "WOOL", "h2": "Woolf's recurring water", "body_html": "<p>From <em>The Voyage Out</em> to <em>The Waves</em> to her suicide, water threads Woolf's oeuvre. The motif is biographical and aesthetic — fluidity of consciousness.</p>"},
                    {"tag": "ATWO", "h2": "Atwood's recurring dystopias", "body_html": "<p><em>The Handmaid's Tale</em>, <em>Oryx and Crake</em>, <em>The Heart Goes Last</em> — Atwood returns repeatedly to dystopia, testing the limits of human cruelty under pressure.</p>"},
                    {"tag": "DEVE", "h2": "Tracing development", "body_html": "<p>Compare early and late Shakespeare. The early comedies celebrate marriage; the late romances trouble it with loss and reconciliation. Themes deepen across a career.</p>"}
                ],
                "mcqs": [
                    {"q": "A recurring image across an author's work is a?", "options": [["Motif", 1], ["Theme alone", 0], ["Volta", 0], ["Pastiche", 0]]},
                    {"q": "Which writer is associated with recurring dystopias?", "options": [["Margaret Atwood", 1], ["Jane Austen", 0], ["Charlotte Bronte", 0], ["Virginia Woolf", 0]]}
                ],
                "numericals": [
                    {"q": "In what year was The Handmaid's Tale published?", "options": [1980, 1982, 1985, 1988], "answer": 1985}
                ],
                "free_texts": [
                    {"q": "What is the term for a recurring image or idea in a work? (one word)", "answer": "motif"}
                ]
            },
            {
                "title": "Influence and Legacy",
                "emoji": "🌳",
                "welcome_lead": "An author study also asks: who shaped this writer, and whom did they shape? Influence runs in both directions.",
                "meta_desc": "IBDP English Literature: author study, influence and legacy in literary tradition.",
                "final_note": "Writers carry forebears and seed successors — read the relay.",
                "concepts": [
                    {"term": "Influence", "def": "The shaping pressure of earlier writers on a later writer's work."},
                    {"term": "Legacy", "def": "An author's lasting impact on subsequent literature."},
                    {"term": "Tradition", "def": "T S Eliot's idea of the living continuity between past and present writing."},
                    {"term": "Belated", "def": "Harold Bloom's term for the latecomer poet wrestling with predecessors."},
                    {"term": "Misreading", "def": "Bloom's idea that strong writers creatively misread their precursors."},
                    {"term": "Reception", "def": "How readers across time have understood and valued a writer."}
                ],
                "walkthroughs": [
                    {"tag": "ELIO", "h2": "Tradition and the individual talent", "body_html": "<p>Eliot's 1919 essay argues every new work alters the order of all preceding works. Tradition is not static — it is reshaped by what enters it.</p>"},
                    {"tag": "BLOM", "h2": "Bloom's strong misreading", "body_html": "<p>Wordsworth misreads Milton; Stevens misreads Wordsworth. The misreading is creative — it clears space for the new voice.</p>"},
                    {"tag": "LEGA", "h2": "Tracing legacy", "body_html": "<p>Toni Morrison's influence is visible in Jesmyn Ward, Yaa Gyasi, Brit Bennett. Map the inheritance — themes of memory, ancestry, lyric prose.</p>"}
                ],
                "mcqs": [
                    {"q": "Who wrote Tradition and the Individual Talent?", "options": [["T S Eliot", 1], ["F R Leavis", 0], ["Harold Bloom", 0], ["Lionel Trilling", 0]]},
                    {"q": "Bloom's strong writers engage in?", "options": [["Creative misreading", 1], ["Direct quotation", 0], ["Translation", 0], ["Imitation only", 0]]}
                ],
                "numericals": [
                    {"q": "In what year was Tradition and the Individual Talent published?", "options": [1915, 1919, 1922, 1925], "answer": 1919}
                ],
                "free_texts": [
                    {"q": "What is the term for an author's lasting impact on later writing? (one word)", "answer": "legacy"}
                ]
            }
        ]
    }
}

# Build English Lit specs
for slug, data in ENGLISH_TOPICS.items():
    for i, adv in enumerate(data["adventures"]):
        if adv is None:
            continue
        n = i + 1
        spec = {
            "subject": "english-literature",
            "level": "ibdp",
            "topic_display": data["display"],
            "topic_slug": slug,
            "theme": ENGLISH_THEME,
            "adventure_n": n,
            "title": adv["title"],
            "emoji": adv["emoji"],
            "welcome_lead": adv["welcome_lead"],
            "meta_desc": adv["meta_desc"],
            "final_note": adv["final_note"],
            "concepts": adv["concepts"],
            "walkthroughs": adv["walkthroughs"],
            "mcqs": adv["mcqs"],
            "numericals": adv["numericals"],
            "free_texts": adv["free_texts"]
        }
        fname = f"english-literature-ibdp-{slug}-adventure-{n}.json"
        write_spec(fname, spec)

print("English Lit done")
