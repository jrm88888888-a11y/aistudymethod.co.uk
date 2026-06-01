#!/usr/bin/env python3
"""Generate 27 A-Level Music JSON specs."""
import json, os

OUT_DIR = "/sessions/awesome-busy-dirac/mnt/AI Study Method/classcraft/adventures/_specs"
THEME = "creative-vibrant"
LEVEL = "a-level"
SUB = "music"

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

# ============================================================
# appraising--analysis
# ============================================================
TS, TD = "appraising--analysis", "Appraising & Analysis"
make(TS, TD, 1,
     "Analysing Form: Binary, Ternary and Rondo",
     "🎼",
     "Three classical forms that shape thousands of pieces.",
     "A-Level Music: analysing binary, ternary and rondo forms.",
     "Form is the architecture of music.",
     [
         ("Binary Form", "Two-part form: A B, each section often repeated."),
         ("Ternary Form", "Three-part form: A B A — return after a contrasting middle."),
         ("Rondo", "Form with recurring theme: A B A C A (or longer)."),
         ("Tonal Plan", "Sequence of keys used through a piece."),
         ("Cadence", "Harmonic close — perfect, plagal, imperfect, interrupted."),
         ("Sectional Boundary", "Point where one formal section ends and another begins."),
     ],
     [
         ("Form", "Binary in the Baroque",
          "<p><strong>Binary form</strong> (A B) shapes the dances of Baroque suites. The A section typically modulates from tonic to dominant (or relative major), with B returning to tonic.</p>"),
         ("Form", "Ternary in the Aria",
          "<p><strong>Ternary form</strong> underlies the da capo aria: A in tonic, B contrasting (often minor or relative key), A returned with ornamentation. Mozart's <em>Ave verum corpus</em> sketches a vocal ternary.</p>"),
         ("Form", "Rondo Refrains",
          "<p><strong>Rondo</strong> alternates a refrain with episodes (A B A C A). Mozart's <em>Rondo alla Turca</em> and Beethoven's <em>Für Elise</em> (A B A C A) are standard A-Level examples.</p>"),
     ],
     [
         {"q": "A B A form is called:", "options": [opt("Binary", False), opt("Ternary", True), opt("Rondo", False), opt("Sonata", False)]},
         {"q": "Baroque binary A typically modulates from tonic to:", "options": [opt("Dominant or relative major", True), opt("Subdominant", False), opt("Mediant", False), opt("Tonic minor", False)]},
     ],
     [{"q": "A rondo A B A C A D A has how many A sections?", "options": [4, 3, 5, 2], "answer": 4}],
     [{"q": "What letter scheme describes ternary form? (three letters, lowercase)", "answer": "aba"}],
     )
count += 1

make(TS, TD, 2,
     "Texture and Orchestration",
     "🎻",
     "Monophonic, homophonic, polyphonic — and how composers layer the orchestra.",
     "A-Level Music: texture types and orchestration analysis.",
     "Texture is the listener's first impression.",
     [
         ("Monophonic", "Single melodic line, no accompaniment."),
         ("Homophonic", "Melody with chordal accompaniment."),
         ("Polyphonic", "Multiple independent melodic lines simultaneously."),
         ("Heterophonic", "Simultaneous variations of the same melody."),
         ("Tutti", "All instruments playing together."),
         ("Concertante", "Solo or small-group passage in opposition to tutti."),
     ],
     [
         ("Texture", "Three Main Types",
          "<p><strong>Monophonic</strong> — Gregorian chant. <strong>Homophonic</strong> — Classical melody-and-accompaniment. <strong>Polyphonic</strong> — Bach fugue with independent voices. Most pieces shift between textures.</p>"),
         ("Practice", "Analysing Texture",
          "<p>Note the number of independent parts, their relationship (imitation, parallel, contrary), and the use of <strong>tutti</strong> vs reduced forces. Orchestration choices — pizzicato strings, muted brass — shape texture.</p>"),
         ("Concerto", "Tutti and Solo",
          "<p>In a concerto, <strong>tutti</strong> (ripieno) and <strong>concertante</strong> (solo) sections alternate. Texture becomes structural — Vivaldi's <em>Four Seasons</em> shows clear ripieno/solo contrast.</p>"),
     ],
     [
         {"q": "A Bach fugue is primarily:", "options": [opt("Monophonic", False), opt("Polyphonic", True), opt("Homophonic", False), opt("Heterophonic", False)]},
         {"q": "Melody with chordal accompaniment is:", "options": [opt("Polyphonic", False), opt("Homophonic", True), opt("Monophonic", False), opt("Antiphonal", False)]},
     ],
     [{"q": "A four-voice fugue has how many independent melodic lines?", "options": [4, 3, 5, 2], "answer": 4}],
     [{"q": "What texture type means 'single melodic line, no accompaniment'?", "answer": "monophonic"}],
     )
count += 1

make(TS, TD, 3,
     "Harmonic Analysis: Roman Numerals",
     "🎹",
     "I IV V — the harmonic backbone of tonal music.",
     "A-Level Music: Roman numeral harmonic analysis and cadences.",
     "Roman numerals turn ears into eyes.",
     [
         ("Roman Numeral", "Notation for chord function: I (tonic), IV (subdominant), V (dominant)."),
         ("Perfect Cadence", "V-I — strong, conclusive closing."),
         ("Plagal Cadence", "IV-I — 'Amen' cadence."),
         ("Imperfect Cadence", "?-V — pause on the dominant."),
         ("Interrupted Cadence", "V-vi — surprise turn to the relative minor."),
         ("Inversion Figure", "Figured-bass notation: 6 = first inversion, 6/4 = second."),
     ],
     [
         ("System", "Roman Numerals",
          "<p>Upper case = major triad (I, IV, V); lower case = minor (ii, iii, vi). In C major: <strong>I</strong>=C, <strong>ii</strong>=Dm, <strong>V</strong>=G, <strong>vi</strong>=Am. Add inversion figures: V6 = first inversion, V6/4 = second.</p>"),
         ("Cadence", "Four Cadences",
          "<p><strong>Perfect</strong> (V-I), <strong>Plagal</strong> (IV-I), <strong>Imperfect</strong> (anything-V), <strong>Interrupted</strong> (V-vi). Cadences mark phrase ends and signal formal articulation.</p>"),
         ("Method", "Analysing Bach Chorales",
          "<p>A-Level harmonic analysis often uses Bach chorales: identify key, mark cadences, label chords with Roman numerals and figures, note modulations and chromatic decorations.</p>"),
     ],
     [
         {"q": "V-I is which cadence?", "options": [opt("Plagal", False), opt("Perfect", True), opt("Imperfect", False), opt("Interrupted", False)]},
         {"q": "In C major, chord vi is:", "options": [opt("F major", False), opt("A minor", True), opt("D minor", False), opt("E minor", False)]},
     ],
     [{"q": "In a diatonic major key, how many triads are minor (ii, iii, vi)?", "options": [3, 2, 4, 1], "answer": 3}],
     [{"q": "Name the cadence V-vi (one word, lowercase).", "answer": "interrupted"}],
     )
count += 1

# composing
TS, TD = "composing", "Composing"
make(TS, TD, 1,
     "Motivic Development",
     "🎵",
     "Take a tiny idea — extend, invert, augment, fragment.",
     "A-Level Music: motivic development techniques.",
     "A motif is a seed.",
     [
         ("Motif", "Short recognisable musical idea (2-6 notes)."),
         ("Sequence", "Repetition of a motif at a different pitch."),
         ("Inversion", "Melodic intervals reversed in direction."),
         ("Augmentation", "Note values lengthened (e.g. doubled)."),
         ("Diminution", "Note values shortened."),
         ("Fragmentation", "Breaking a motif into smaller cells."),
     ],
     [
         ("Theory", "Motif and Theme",
          "<p>A <strong>motif</strong> is the smallest recognisable idea — Beethoven's four-note opening to Symphony No. 5 (1808) is the textbook example. A <strong>theme</strong> is a longer melody, often built from motifs.</p>"),
         ("Techniques", "Six Transformations",
          "<p>Common developments: <strong>sequence</strong> (transpose), <strong>inversion</strong> (intervals reversed), <strong>retrograde</strong> (backwards), <strong>augmentation</strong> (longer), <strong>diminution</strong> (shorter), <strong>fragmentation</strong> (break apart).</p>"),
         ("Application", "In Practice",
          "<p>Apply each technique to your own motif during the compositional process. Examiners reward clear evidence of <strong>development</strong>, not just statement of ideas.</p>"),
     ],
     [
         {"q": "Doubling note values is:", "options": [opt("Diminution", False), opt("Augmentation", True), opt("Inversion", False), opt("Retrograde", False)]},
         {"q": "Reversing the order of pitches is:", "options": [opt("Inversion", False), opt("Retrograde", True), opt("Sequence", False), opt("Augmentation", False)]},
     ],
     [{"q": "If a motif is sequenced at every step of a 4-note ascending pattern, how many statements result?", "options": [4, 3, 5, 6], "answer": 4}],
     [{"q": "What term means 'shortening note values'?", "answer": "diminution"}],
     )
count += 1

make(TS, TD, 2,
     "Modulation and Voice Leading",
     "🎶",
     "How to move from one key to another — smoothly.",
     "A-Level Music: modulation techniques and voice-leading rules.",
     "Smooth voice leading is the composer's invisible skill.",
     [
         ("Modulation", "Moving from one key to another."),
         ("Pivot Chord", "A chord shared between two keys, used to modulate smoothly."),
         ("Chromatic Modulation", "Modulation via a chromatically altered chord."),
         ("Common-Tone Modulation", "Modulation linked by a single sustained note."),
         ("Voice Leading", "Smooth motion of individual parts between chords."),
         ("Parallel Fifths", "Two voices moving in parallel by a perfect fifth — traditionally forbidden."),
     ],
     [
         ("Theory", "Modulation Types",
          "<p><strong>Pivot-chord</strong> modulation reinterprets a chord as functioning in the new key. <strong>Chromatic</strong> uses an altered chord to wrench the harmony. <strong>Common-tone</strong> links via a single pitch.</p>"),
         ("Practice", "Voice Leading",
          "<p>Move each voice the shortest distance. Avoid <strong>parallel fifths</strong> and parallel octaves. Resolve the leading tone up to tonic and the seventh down by step.</p>"),
         ("Example", "C to G",
          "<p>To modulate from C to G: use Am (vi in C = ii in G) as pivot, then ii-V-I in G. Smooth voice leading keeps the modulation seamless.</p>"),
     ],
     [
         {"q": "A chord that functions in both old and new key is a:", "options": [opt("Cadenza", False), opt("Pivot chord", True), opt("Tonic", False), opt("Augmented sixth", False)]},
         {"q": "Two voices moving in parallel by a perfect fifth is:", "options": [opt("Standard practice", False), opt("Traditionally forbidden", True), opt("Required at cadences", False), opt("A chromatic motion", False)]},
     ],
     [{"q": "Modulation from C major to G major moves up by how many perfect fifths?", "options": [1, 2, 3, 4], "answer": 1}],
     [{"q": "What term means 'smooth motion of individual parts between chords' (two words, lowercase)?", "answer": "voice leading"}],
     )
count += 1

make(TS, TD, 3,
     "Composing Across Styles",
     "🎤",
     "Pastiche, idiomatic writing, and stylistic awareness.",
     "A-Level Music: composing in chorale, pop and film-music styles.",
     "Style is the rule-book; ear is the law.",
     [
         ("Pastiche", "Composition imitating an established style."),
         ("Idiomatic Writing", "Writing that suits the chosen instrument's strengths."),
         ("Chorale", "Four-part harmonised hymn tune, often used as Bach-style exercise."),
         ("Lead Sheet", "Pop notation: melody plus chord symbols."),
         ("Leitmotif", "Recurring motif identifying character or idea (Wagner; film scores)."),
         ("Cue", "A passage of film music aligned to a scene."),
     ],
     [
         ("Style", "Bach Chorale",
          "<p>A Bach-style chorale uses four voices (SATB), strict voice leading, frequent cadences, and chorale-melody in soprano. Doubling the root, avoiding parallels, and resolving tendency tones are essential.</p>"),
         ("Style", "Pop / Lead Sheet",
          "<p>Pop composition is often notated on a <strong>lead sheet</strong> — melody plus chord symbols (C, Am7, F, G). Verse-chorus form, looped progressions and groove drive the genre.</p>"),
         ("Style", "Film Cue",
          "<p>A film <strong>cue</strong> times music precisely to onscreen action. Composers use <strong>leitmotifs</strong> (Wagner; John Williams) to mark characters, and orchestration to underline mood.</p>"),
     ],
     [
         {"q": "Lead-sheet notation typically shows:", "options": [opt("Full SATB", False), opt("Melody + chord symbols", True), opt("Only chord symbols", False), opt("Lyrics only", False)]},
         {"q": "A recurring motif identifying a character is a:", "options": [opt("Cadenza", False), opt("Leitmotif", True), opt("Riff", False), opt("Hook", False)]},
     ],
     [{"q": "How many voices does a standard SATB chorale have?", "options": [4, 3, 5, 6], "answer": 4}],
     [{"q": "What term describes composition imitating an established style?", "answer": "pastiche"}],
     )
count += 1

# music-history--theory
TS, TD = "music-history--theory", "Music History & Theory"
make(TS, TD, 1,
     "Baroque Period (c. 1600-1750)",
     "🎻",
     "From Monteverdi to Bach — the age of basso continuo.",
     "A-Level Music: Baroque period, key composers and conventions.",
     "Affekt and ornament rule the Baroque.",
     [
         ("Baroque", "Period c. 1600-1750 (Monteverdi to Bach's death)."),
         ("Basso Continuo", "Bass line plus chord-realising keyboard instrument."),
         ("Figured Bass", "Numbers under the bass indicating intervals/chord inversion."),
         ("J.S. Bach", "German composer (1685-1750), late-Baroque culmination."),
         ("Vivaldi", "Italian composer (1678-1741), concertos, Four Seasons (1725)."),
         ("Ritornello", "Recurring tutti theme alternating with solo episodes in concertos."),
     ],
     [
         ("Period", "Dates and Style",
          "<p>The <strong>Baroque</strong> period runs c. <strong>1600-1750</strong>. Hallmarks: <strong>basso continuo</strong>, terraced dynamics, contrapuntal texture, doctrine of the affections, ornament-rich melodic lines.</p>"),
         ("Composer", "J.S. Bach",
          "<p><strong>Johann Sebastian Bach</strong> (<strong>1685-1750</strong>) worked as Kapellmeister at Cöthen and Thomaskantor in Leipzig from 1723. His Well-Tempered Clavier, Mass in B Minor and Brandenburg Concertos define late Baroque counterpoint.</p>"),
         ("Form", "Concerto and Ritornello",
          "<p>Vivaldi's concertos (such as <em>The Four Seasons</em>, published <strong>1725</strong>) use <strong>ritornello</strong> form: a recurring tutti refrain alternates with solo episodes that explore new keys.</p>"),
     ],
     [
         {"q": "Bach's dates are:", "options": [opt("1685-1750", True), opt("1678-1741", False), opt("1732-1809", False), opt("1756-1791", False)]},
         {"q": "Vivaldi's Four Seasons was published in:", "options": [opt("1715", False), opt("1725", True), opt("1735", False), opt("1745", False)]},
     ],
     [{"q": "Bach lived 1685 to 1750. What was his age at death (in years)?", "options": [65, 64, 66, 70], "answer": 65}],
     [{"q": "What two-word term means 'bass line plus chord-realising keyboard' in the Baroque?", "answer": "basso continuo"}],
     )
count += 1

make(TS, TD, 2,
     "Classical Period (c. 1750-1820)",
     "🎹",
     "Haydn, Mozart, Beethoven — symphony, sonata, string quartet.",
     "A-Level Music: Classical period composers and forms.",
     "Clarity, balance, and the rise of the symphony.",
     [
         ("Classical Period", "c. 1750-1820, age of Haydn, Mozart, Beethoven."),
         ("Haydn", "Austrian (1732-1809), 'father' of symphony and string quartet."),
         ("Mozart", "Austrian (1756-1791), 41 symphonies, operas, concertos."),
         ("Beethoven", "German (1770-1827), bridge to Romanticism."),
         ("Sonata Form", "Tripartite form: exposition, development, recapitulation."),
         ("String Quartet", "Two violins, viola, cello — Classical chamber form."),
     ],
     [
         ("Period", "Style and Forms",
          "<p>The <strong>Classical</strong> period (<strong>c. 1750-1820</strong>) replaces Baroque counterpoint with clear melody-and-accompaniment textures and <strong>sonata form</strong>. Symphony, string quartet and piano sonata become standard genres.</p>"),
         ("Composer", "Haydn and Mozart",
          "<p><strong>Haydn</strong> (1732-1809) wrote 104 symphonies and over 60 string quartets, establishing both genres. <strong>Mozart</strong> (1756-1791) wrote 41 numbered symphonies, 27 piano concertos and operas including <em>Don Giovanni</em> (1787).</p>"),
         ("Bridge", "Beethoven",
          "<p><strong>Beethoven</strong> (1770-1827) wrote nine symphonies, the last (1824) with chorus. His expansion of Classical forms — longer developments, weightier codas — opens the path to Romanticism.</p>"),
     ],
     [
         {"q": "Mozart's dates are:", "options": [opt("1685-1750", False), opt("1756-1791", True), opt("1732-1809", False), opt("1770-1827", False)]},
         {"q": "Mozart wrote how many numbered symphonies?", "options": [opt("31", False), opt("41", True), opt("51", False), opt("61", False)]},
     ],
     [{"q": "Mozart lived 1756 to 1791. What was his age at death (in years)?", "options": [35, 34, 36, 37], "answer": 35}],
     [{"q": "What three-part form has exposition, development, recapitulation? (two words, lowercase)", "answer": "sonata form"}],
     )
count += 1

make(TS, TD, 3,
     "Romantic Period (c. 1820-1900)",
     "🎼",
     "Schubert, Chopin, Wagner — emotion, scale, programme music.",
     "A-Level Music: Romantic period composers and innovations.",
     "Bigger orchestras, longer pieces, programme music.",
     [
         ("Romanticism", "c. 1820-1900, expressive intensity, larger forces."),
         ("Schubert", "Austrian (1797-1828), Lieder and chamber music."),
         ("Chopin", "Polish (1810-1849), Romantic piano repertoire."),
         ("Wagner", "German (1813-1883), music drama, Tristan chord 1865."),
         ("Lied", "German art song, typically voice and piano (Schubert, Schumann)."),
         ("Programme Music", "Instrumental music with extra-musical narrative."),
     ],
     [
         ("Period", "Romantic Sensibility",
          "<p>The <strong>Romantic</strong> period (<strong>c. 1820-1900</strong>) prized expressive intensity, individualism, nature and the supernatural. Forms expand; harmony grows chromatic; orchestras swell.</p>"),
         ("Song", "Schubert's Lieder",
          "<p>Schubert (<strong>1797-1828</strong>) wrote over 600 <strong>Lieder</strong>, including <em>Erlkönig</em> (1815). The Lied unites poetry and piano accompaniment in psychologically vivid miniature.</p>"),
         ("Drama", "Wagner and the Tristan Chord",
          "<p>Wagner's <em>Tristan und Isolde</em> (<strong>1865</strong>) opens with the famous <strong>Tristan chord</strong> — a half-diminished sonority resolving ambiguously — long cited as a turning point toward modernism.</p>"),
     ],
     [
         {"q": "Tristan und Isolde premiered in:", "options": [opt("1855", False), opt("1865", True), opt("1875", False), opt("1885", False)]},
         {"q": "Schubert wrote over how many Lieder?", "options": [opt("100", False), opt("600", True), opt("300", False), opt("1000", False)]},
     ],
     [{"q": "Schubert lived 1797 to 1828. What was his age at death (in years)?", "options": [31, 30, 32, 33], "answer": 31}],
     [{"q": "What German term means 'art song' (one word, lowercase)?", "answer": "lied"}],
     )
count += 1

# set-works-vocabulary
TS, TD = "set-works-vocabulary", "Set Works Vocabulary"
make(TS, TD, 1,
     "Set-Work Analysis Vocabulary I",
     "📖",
     "The technical language examiners expect.",
     "A-Level Music: vocabulary for set-work analysis (melody and rhythm).",
     "Precision of language earns marks.",
     [
         ("Conjunct", "Stepwise melodic motion."),
         ("Disjunct", "Leap motion in melody."),
         ("Syncopation", "Off-beat emphasis disrupting metric expectation."),
         ("Hemiola", "Three beats grouped as two (or vice versa) across the metre."),
         ("Anacrusis", "Upbeat — note(s) before the first downbeat."),
         ("Ostinato", "Repeated rhythmic or melodic figure."),
     ],
     [
         ("Melody", "Conjunct and Disjunct",
          "<p><strong>Conjunct</strong> motion uses adjacent scale degrees; <strong>disjunct</strong> uses leaps (third or larger). Most melodies mix the two — Bach chorales are largely conjunct; arpeggiated themes are disjunct.</p>"),
         ("Rhythm", "Syncopation and Hemiola",
          "<p><strong>Syncopation</strong> stresses weak beats. <strong>Hemiola</strong> regroups beats (e.g. 6/8 felt as 3/4) and is a signature device in Handel and Brahms.</p>"),
         ("Repetition", "Ostinato",
          "<p>An <strong>ostinato</strong> — Pachelbel's bass, Holst's <em>Mars</em>, Reich's pulse — is a repeated unit that anchors a piece. Identifying ostinati clarifies structure.</p>"),
     ],
     [
         {"q": "Stepwise melodic motion is:", "options": [opt("Disjunct", False), opt("Conjunct", True), opt("Polyphonic", False), opt("Atonal", False)]},
         {"q": "Three beats grouped as two across the metre is:", "options": [opt("Hemiola", True), opt("Triplet", False), opt("Syncopation", False), opt("Anacrusis", False)]},
     ],
     [{"q": "A bar of 6/8 felt as a hemiola (2 dotted beats heard as 3 beats) divides into how many equal felt beats?", "options": [3, 2, 6, 4], "answer": 3}],
     [{"q": "What is the term for the upbeat note(s) before a first downbeat?", "answer": "anacrusis"}],
     )
count += 1

make(TS, TD, 2,
     "Set-Work Analysis Vocabulary II",
     "🎶",
     "Harmony, texture, and timbre vocabulary.",
     "A-Level Music: vocabulary for set-work harmony and timbre.",
     "Name what you hear.",
     [
         ("Diatonic", "Belonging to the prevailing key — no chromatic alteration."),
         ("Chromatic", "Using notes outside the prevailing key."),
         ("Modal", "Based on a modal scale (e.g. Dorian, Phrygian)."),
         ("Pedal Note", "Sustained note (often tonic or dominant) under changing harmony."),
         ("Pizzicato", "Strings plucked rather than bowed."),
         ("Con Sordino", "With mute (strings) or muted (brass)."),
     ],
     [
         ("Harmony", "Diatonic to Modal",
          "<p><strong>Diatonic</strong> writing remains within the key. <strong>Chromatic</strong> introduces accidentals for colour or modulation. <strong>Modal</strong> writing uses scales like Dorian or Mixolydian (Vaughan Williams, jazz).</p>"),
         ("Decoration", "Pedal Notes",
          "<p>A <strong>pedal</strong> sustains under shifting harmonies, creating tension or anchoring. The dominant pedal at the end of a development passage prepares the return of tonic.</p>"),
         ("Timbre", "String and Brass Effects",
          "<p>Mark playing techniques: <strong>pizzicato</strong>, <strong>con sordino</strong>, sul ponticello, col legno (strings); muted, stopped (horn); flutter-tongue (winds). Each colours the texture.</p>"),
     ],
     [
         {"q": "'Within the prevailing key' is:", "options": [opt("Chromatic", False), opt("Diatonic", True), opt("Atonal", False), opt("Modal", False)]},
         {"q": "Pizzicato strings are:", "options": [opt("Bowed", False), opt("Plucked", True), opt("Muted", False), opt("Struck", False)]},
     ],
     [{"q": "A dominant pedal anchors how many beats per bar (in 4/4) when sustained throughout?", "options": [4, 3, 2, 8], "answer": 4}],
     [{"q": "What Italian term means 'with mute' (two words, lowercase)?", "answer": "con sordino"}],
     )
count += 1

make(TS, TD, 3,
     "Set-Work Analysis Vocabulary III",
     "🎤",
     "Form, performance and contextual vocabulary.",
     "A-Level Music: vocabulary for form and performance practice.",
     "Context completes the analysis.",
     [
         ("Through-Composed", "Continuous music without repeated sections."),
         ("Strophic", "Same music repeated for each verse of text."),
         ("A Cappella", "Voices alone, without instrumental accompaniment."),
         ("Tessitura", "The most-used range of a voice or instrument in a piece."),
         ("Coloratura", "Highly ornamented virtuosic vocal writing."),
         ("Continuo", "The basso-continuo group — bass instrument plus keyboard."),
     ],
     [
         ("Form", "Strophic and Through-Composed",
          "<p><strong>Strophic</strong> songs use one melody for all verses (hymns, folk songs). <strong>Through-composed</strong> songs evolve continuously, music responding to text (Schubert's <em>Erlkönig</em>, 1815).</p>"),
         ("Voice", "Tessitura and Coloratura",
          "<p><strong>Tessitura</strong> describes where a singer spends most time, not absolute range. <strong>Coloratura</strong> writing (Mozart's Queen of the Night, 1791) demands rapid agility in the high register.</p>"),
         ("Practice", "A Cappella and Continuo",
          "<p>Vocabulary about ensemble: <strong>a cappella</strong> = voices alone; <strong>continuo</strong> = the bass-plus-keyboard group of Baroque practice. Mention performing forces in every answer.</p>"),
     ],
     [
         {"q": "Voices alone is termed:", "options": [opt("A cappella", True), opt("Continuo", False), opt("Tutti", False), opt("Concertante", False)]},
         {"q": "Same music for each verse is:", "options": [opt("Through-composed", False), opt("Strophic", True), opt("Ternary", False), opt("Rondo", False)]},
     ],
     [{"q": "If a strophic song has 4 verses, how many times is the same melody sung?", "options": [4, 3, 5, 2], "answer": 4}],
     [{"q": "What term describes highly ornamented virtuosic vocal writing?", "answer": "coloratura"}],
     )
count += 1

# 20th-century--modernism
TS, TD = "20th-century--modernism", "20th Century & Modernism"
make(TS, TD, 1,
     "Stravinsky: The Rite of Spring",
     "💥",
     "29 May 1913 — the riot at the Théâtre des Champs-Élysées.",
     "A-Level Music: Stravinsky and The Rite of Spring 1913.",
     "Rhythm seized the future of music.",
     [
         ("Stravinsky", "Russian composer (1882-1971)."),
         ("Rite of Spring", "Stravinsky ballet, premiered Paris 29 May 1913."),
         ("Polytonality", "Two or more keys sounding simultaneously."),
         ("Polyrhythm", "Two or more rhythms sounding simultaneously."),
         ("Augmented Triad", "Triad of two stacked major thirds."),
         ("Diaghilev", "Russian impresario, Ballets Russes commissioner."),
     ],
     [
         ("Event", "The Riot",
          "<p>On <strong>29 May 1913</strong>, the premiere of <strong>The Rite of Spring</strong> at the Théâtre des Champs-Élysées caused a near-riot. Nijinsky's choreography and Stravinsky's dissonance, polymetre and ostinati shocked the audience.</p>"),
         ("Technique", "Polyrhythm and Polytonality",
          "<p>Stravinsky stacks rhythms (3 against 2, irregular metres) and harmonies (the famous bitonal chord at the opening of <em>Augurs of Spring</em> combines E-flat major and F-flat major triads).</p>"),
         ("Legacy", "After 1913",
          "<p>The Rite reshaped 20th-century music — rhythm and timbre took precedence over melody. Boulez, Bernstein and minimalists all acknowledged its debt.</p>"),
     ],
     [
         {"q": "The Rite of Spring premiered on:", "options": [opt("29 May 1913", True), opt("29 May 1903", False), opt("29 May 1923", False), opt("29 May 1933", False)]},
         {"q": "Polytonality means:", "options": [opt("One key, many voices", False), opt("Multiple keys at once", True), opt("No key", False), opt("Many tempos", False)]},
     ],
     [{"q": "From the 1913 premiere to 2026, how many years have passed?", "options": [113, 112, 114, 110], "answer": 113}],
     [{"q": "What surname did the composer of The Rite of Spring have?", "answer": "stravinsky"}],
     )
count += 1

make(TS, TD, 2,
     "Schoenberg and Dodecaphony",
     "🎹",
     "1923: a method of composing with twelve tones related only to one another.",
     "A-Level Music: Schoenberg, atonality and twelve-tone technique.",
     "Emancipation of the dissonance.",
     [
         ("Schoenberg", "Austrian composer (1874-1951)."),
         ("Atonality", "Music without a tonal centre."),
         ("Dodecaphony", "Twelve-tone serialism, formulated by Schoenberg c. 1921-1923."),
         ("Tone Row", "Ordering of the 12 chromatic pitches used as basis of a piece."),
         ("Prime / Retrograde / Inversion", "Four forms of the row — P, R, I, RI."),
         ("Second Viennese School", "Schoenberg, Berg, Webern."),
     ],
     [
         ("Origin", "From Atonality to Method",
          "<p>From around 1908, Schoenberg wrote <strong>atonal</strong> works (e.g. <em>Pierrot Lunaire</em>, 1912). By <strong>1923</strong> he had codified <strong>twelve-tone</strong> composition: an ordered row of the 12 chromatic pitches forming the piece's basis.</p>"),
         ("Method", "Row Forms",
          "<p>The row is used in four forms — <strong>Prime (P)</strong>, <strong>Retrograde (R)</strong>, <strong>Inversion (I)</strong>, <strong>Retrograde Inversion (RI)</strong> — each transposable to 12 levels: 48 forms in total.</p>"),
         ("School", "Berg and Webern",
          "<p>Schoenberg's students Berg and Webern extended dodecaphony. Webern's pointillist textures and Berg's quasi-tonal lyricism showed the method's range; together they formed the <strong>Second Viennese School</strong>.</p>"),
     ],
     [
         {"q": "Schoenberg's twelve-tone method was formulated around:", "options": [opt("1913", False), opt("1923", True), opt("1933", False), opt("1943", False)]},
         {"q": "The four row forms are:", "options": [opt("P, R, I, RI", True), opt("Major, minor, augmented, diminished", False), opt("Tonic, dominant, subdominant, mediant", False), opt("A, B, C, D", False)]},
     ],
     [{"q": "If there are 4 row forms and 12 transpositions each, how many total forms in a twelve-tone matrix?", "options": [48, 36, 24, 60], "answer": 48}],
     [{"q": "What single-word term means the twelve-tone method?", "answer": "dodecaphony"}],
     )
count += 1

make(TS, TD, 3,
     "Cage, Minimalism and Beyond",
     "🔁",
     "Silence in 1952; pulse in 1965; the open future of music.",
     "A-Level Music: John Cage, minimalism (Reich, Glass).",
     "Process becomes form.",
     [
         ("John Cage", "American experimental composer (1912-1992)."),
         ("4'33\"", "Cage's 1952 silent piece — three movements of silence."),
         ("Prepared Piano", "Cage's modified piano with objects between strings."),
         ("Minimalism", "Style using repeated cells and gradual process, from 1960s."),
         ("Steve Reich", "American minimalist (b. 1936), phasing and pulse."),
         ("Philip Glass", "American minimalist (b. 1937), additive and arpeggiated cells."),
     ],
     [
         ("Event", "4'33\"",
          "<p>John Cage's <strong>4'33\"</strong> premiered on <strong>29 August 1952</strong> at Woodstock, NY. David Tudor sat at the piano playing no notes for four minutes and thirty-three seconds. Ambient sound became the work.</p>"),
         ("Style", "Minimalism",
          "<p>Minimalism emerged in 1960s New York. <strong>Steve Reich</strong>'s <em>It's Gonna Rain</em> (1965) used tape phasing. <strong>Philip Glass</strong>'s <em>Music in Twelve Parts</em> (1971-74) used additive process.</p>"),
         ("Method", "Process Music",
          "<p>Reich's manifesto 'Music as a Gradual Process' (1968) describes works whose form is identical to the process generating them — the listener follows transformation in real time.</p>"),
     ],
     [
         {"q": "Cage's 4'33\" was first performed in:", "options": [opt("1942", False), opt("1952", True), opt("1962", False), opt("1972", False)]},
         {"q": "Steve Reich's It's Gonna Rain dates from:", "options": [opt("1955", False), opt("1965", True), opt("1975", False), opt("1985", False)]},
     ],
     [{"q": "Cage's 4'33\" has how many movements?", "options": [3, 1, 4, 2], "answer": 3}],
     [{"q": "What technique uses two identical loops that gradually shift out of sync?", "answer": "phasing"}],
     )
count += 1

# jazz-styles--theory
TS, TD = "jazz-styles--theory", "Jazz Styles & Theory"
make(TS, TD, 1,
     "Blues and Swing",
     "🎷",
     "12-bar blues and the swing era of the 1930s-40s.",
     "A-Level Music: blues form, swing, and big-band era.",
     "Blue notes, swung quavers.",
     [
         ("12-Bar Blues", "Standard chord pattern: I-I-I-I-IV-IV-I-I-V-IV-I-I."),
         ("Blue Note", "Flattened 3rd, 5th or 7th degree of the scale."),
         ("Swing", "Triplet feel of jazz quavers — long-short."),
         ("Big Band", "1930s-40s ensemble of around 17 players (saxes, brass, rhythm)."),
         ("Duke Ellington", "American composer-bandleader (1899-1974)."),
         ("Walking Bass", "Bass line of even crotchets outlining chord changes."),
     ],
     [
         ("Form", "12-Bar Blues",
          "<p>The <strong>12-bar blues</strong> uses I (4 bars), IV (2), I (2), V (1), IV (1), I (2). The form supports endless variation through melody and improvisation. <strong>Blue notes</strong> bend pitch for expressive colour.</p>"),
         ("Feel", "Swing",
          "<p><strong>Swing</strong> notation looks like even quavers but is performed with a triplet feel — long-short, roughly 2:1 ratio. The big-band era (1930s-40s) was the swing era.</p>"),
         ("Bandleader", "Ellington",
          "<p><strong>Duke Ellington</strong> (1899-1974) led his orchestra from 1923 to his death, composing over 1,000 works including <em>Mood Indigo</em> (1930) and <em>Take the 'A' Train</em> (1941, by Billy Strayhorn).</p>"),
     ],
     [
         {"q": "The 12-bar blues uses how many bars of IV in the standard form (4-2-2-1-1-2)?", "options": [opt("2", False), opt("3 total", True), opt("4", False), opt("5", False)]},
         {"q": "Duke Ellington lived:", "options": [opt("1899-1974", True), opt("1909-1984", False), opt("1885-1960", False), opt("1920-1995", False)]},
     ],
     [{"q": "A standard 12-bar blues has how many bars total?", "options": [12, 10, 16, 8], "answer": 12}],
     [{"q": "What term describes the triplet feel of jazz quavers (one word, lowercase)?", "answer": "swing"}],
     )
count += 1

make(TS, TD, 2,
     "Bebop: Parker and Gillespie",
     "🎺",
     "1940s — fast tempos, complex chords, virtuosic improvisation.",
     "A-Level Music: bebop, Charlie Parker, and Dizzy Gillespie.",
     "Bebop turned jazz from dance to listening.",
     [
         ("Bebop", "1940s jazz style — fast, harmonically dense, soloist-led."),
         ("Charlie Parker", "American alto saxophonist (1920-1955)."),
         ("Dizzy Gillespie", "American trumpeter (1917-1993)."),
         ("Chord Substitution", "Replacing a chord with a related more complex one (e.g. tritone sub)."),
         ("Tritone Substitution", "Replacing V7 with a dominant 7 a tritone away."),
         ("Ko-Ko", "Parker's 1945 bebop landmark recording."),
     ],
     [
         ("Style", "Bebop Emerges",
          "<p>Bebop crystallised in Harlem clubs (Minton's, Monroe's) from <strong>1942</strong>. <strong>Charlie Parker</strong> and <strong>Dizzy Gillespie</strong> drove the style — fast tempos, sixteenth-note phrases, chromaticism, complex chord substitutions.</p>"),
         ("Technique", "Chord Substitution",
          "<p><strong>Tritone substitution</strong> replaces V7 with a dominant 7 a tritone away — e.g. G7 becomes Db7 — producing chromatic bass and shared tritone (the chord's defining interval).</p>"),
         ("Record", "Ko-Ko 1945",
          "<p>Parker's <strong>Ko-Ko</strong> (recorded November <strong>1945</strong>), based on the chord changes of <em>Cherokee</em>, exemplifies bebop virtuosity at lightning tempo (around 300 bpm).</p>"),
     ],
     [
         {"q": "Charlie Parker's instrument was:", "options": [opt("Trumpet", False), opt("Alto sax", True), opt("Tenor sax", False), opt("Piano", False)]},
         {"q": "Parker's Ko-Ko was recorded in:", "options": [opt("1935", False), opt("1945", True), opt("1955", False), opt("1965", False)]},
     ],
     [{"q": "Charlie Parker lived 1920 to 1955. What was his age at death (in years)?", "options": [34, 33, 35, 36], "answer": 34}],
     [{"q": "What name (short) is given to replacing V7 with a dominant 7 a tritone away? (two words, lowercase)", "answer": "tritone substitution"}],
     )
count += 1

make(TS, TD, 3,
     "Modal Jazz: Kind of Blue",
     "🎵",
     "Miles Davis 1959 — improvising over scales, not chord changes.",
     "A-Level Music: modal jazz, Miles Davis, Kind of Blue 1959.",
     "Less chord, more scale.",
     [
         ("Modal Jazz", "Style improvising over modal scales rather than chord changes."),
         ("Miles Davis", "American trumpeter-bandleader (1926-1991)."),
         ("Kind of Blue", "Miles Davis album, recorded 2 March and 22 April 1959."),
         ("So What", "Track from Kind of Blue — Dorian-based modal vamp."),
         ("Dorian Mode", "Minor mode with raised 6th — D Dorian: D E F G A B C D."),
         ("Chord-Scale Theory", "Mapping each chord to its corresponding scale for improvisation."),
     ],
     [
         ("Album", "Kind of Blue",
          "<p><strong>Kind of Blue</strong>, recorded in two sessions (<strong>2 March</strong> and <strong>22 April 1959</strong>) at Columbia's 30th Street Studio, remains jazz's best-selling LP. The sextet included Coltrane, Adderley, Evans, Chambers, Cobb.</p>"),
         ("Track", "So What",
          "<p><em>So What</em> uses two chords — D minor 7 (16 bars), Eb minor 7 (8 bars), back to Dm7 (8) — over which soloists improvise in <strong>D Dorian</strong> and Eb Dorian. Form is melodic, not harmonic.</p>"),
         ("Theory", "Chord-Scale Mapping",
          "<p><strong>Chord-scale theory</strong> assigns a scale to each chord: D-7 → Dorian, G7 → Mixolydian, etc. Modal jazz freed soloists from chord-change density.</p>"),
     ],
     [
         {"q": "Kind of Blue was recorded in:", "options": [opt("1949", False), opt("1959", True), opt("1969", False), opt("1979", False)]},
         {"q": "So What is in which mode?", "options": [opt("Phrygian", False), opt("Dorian", True), opt("Lydian", False), opt("Locrian", False)]},
     ],
     [{"q": "So What has 32 bars in AABA form, where the A is 8 bars of Dm7. How many A sections are there?", "options": [3, 2, 4, 1], "answer": 3}],
     [{"q": "What surname did the trumpeter-bandleader on Kind of Blue, Miles, have?", "answer": "davis"}],
     )
count += 1

# analysis--aural-skills
TS, TD = "analysis--aural-skills", "Analysis & Aural Skills"
make(TS, TD, 1,
     "Interval Identification",
     "🎶",
     "P5, m3, M3, P4 — the building blocks of melody.",
     "A-Level Music: identifying intervals by ear.",
     "Train the ear, name the interval.",
     [
         ("Interval", "Distance between two pitches."),
         ("Perfect Fifth (P5)", "7 semitones — e.g. C to G; 'Twinkle, twinkle'."),
         ("Major Third (M3)", "4 semitones — e.g. C to E; 'When the Saints'."),
         ("Minor Third (m3)", "3 semitones — e.g. C to Eb; 'Greensleeves'."),
         ("Perfect Fourth (P4)", "5 semitones — e.g. C to F; 'Amazing Grace'."),
         ("Tritone", "6 semitones — augmented 4th or diminished 5th."),
     ],
     [
         ("Theory", "Semitone Counts",
          "<p>Every interval has a semitone count. <strong>m2</strong>=1, <strong>M2</strong>=2, <strong>m3</strong>=3, <strong>M3</strong>=4, <strong>P4</strong>=5, <strong>tritone</strong>=6, <strong>P5</strong>=7, <strong>m6</strong>=8, <strong>M6</strong>=9, <strong>m7</strong>=10, <strong>M7</strong>=11, <strong>P8</strong>=12.</p>"),
         ("Method", "Reference Songs",
          "<p>Aural reference: P5 = Twinkle Twinkle; P4 = Amazing Grace; M3 = When the Saints; m3 = Greensleeves; M6 = NBC chimes; tritone = Maria from West Side Story.</p>"),
         ("Practice", "Direction Matters",
          "<p>Practise ascending and descending separately. A descending m6 sounds like 'Love Story'; ascending m6 like the opening of <em>The Entertainer</em>'s bridge.</p>"),
     ],
     [
         {"q": "C to G is which interval?", "options": [opt("P4", False), opt("P5", True), opt("M3", False), opt("Tritone", False)]},
         {"q": "A tritone spans how many semitones?", "options": [opt("5", False), opt("6", True), opt("7", False), opt("8", False)]},
     ],
     [{"q": "A perfect fifth spans how many semitones?", "options": [7, 5, 6, 8], "answer": 7}],
     [{"q": "What interval name is given to 4 semitones (3 letters and a number, lowercase, no space)?", "answer": "m3"}],
     )
count += 1

make(TS, TD, 2,
     "Chord Identification",
     "🎹",
     "Major, minor, diminished, augmented — and 7th colours.",
     "A-Level Music: identifying chord qualities and 7ths by ear.",
     "Quality first, then colour.",
     [
         ("Major Triad", "Root + M3 + P5 (4+3 semitones)."),
         ("Minor Triad", "Root + m3 + P5 (3+4 semitones)."),
         ("Diminished Triad", "Root + m3 + dim5 (3+3 semitones)."),
         ("Augmented Triad", "Root + M3 + aug5 (4+4 semitones)."),
         ("Dominant 7th", "Major triad + m7 (e.g. G B D F)."),
         ("Half-Diminished 7th", "Diminished triad + m7 (e.g. B D F A)."),
     ],
     [
         ("Construction", "Triad Qualities",
          "<p>All triads are stacked thirds. <strong>Major</strong> = M3 + m3. <strong>Minor</strong> = m3 + M3. <strong>Diminished</strong> = m3 + m3. <strong>Augmented</strong> = M3 + M3.</p>"),
         ("Sevenths", "Adding the 7th",
          "<p>Adding a 7th: <strong>major 7th</strong> on major triad (Cmaj7), <strong>dominant 7th</strong> on major + m7 (G7), <strong>minor 7th</strong> on minor + m7 (Dm7), <strong>half-diminished</strong> on dim + m7 (Bm7b5).</p>"),
         ("Practice", "Ear Training",
          "<p>Listen for the third (mood) first, then check the fifth. Diminished and augmented chords have distinctive unstable colour — practise reproducing them at the piano daily.</p>"),
     ],
     [
         {"q": "A major triad stacks:", "options": [opt("m3 + M3", False), opt("M3 + m3", True), opt("M3 + M3", False), opt("m3 + m3", False)]},
         {"q": "A dominant 7th chord is:", "options": [opt("Major triad + M7", False), opt("Major triad + m7", True), opt("Minor triad + m7", False), opt("Diminished + m7", False)]},
     ],
     [{"q": "A diminished triad has both intervals of how many semitones each?", "options": [3, 4, 5, 7], "answer": 3}],
     [{"q": "What chord quality is described as 'minor triad + minor 7th' (one word, lowercase)?", "answer": "minor"}],
     )
count += 1

make(TS, TD, 3,
     "Transcription and Modulation by Ear",
     "📝",
     "From listening to notation — the A-Level aural skill.",
     "A-Level Music: melodic dictation, modulation recognition.",
     "Note down what you hear.",
     [
         ("Transcription", "Writing down music heard, by ear."),
         ("Dictation", "Notated music written from oral source — usually one line."),
         ("Modulation", "Change of key — heard via cadence in new key."),
         ("Relative Modulation", "Move between major and its relative minor (C to Am)."),
         ("Dominant Modulation", "Move to the key a 5th above (C to G)."),
         ("Pivot Detection", "Hearing the moment when a chord pivots between two keys."),
     ],
     [
         ("Method", "Approaching Dictation",
          "<p>First hearing: shape and metre. Second: cadences and tonal plan. Third: details (rhythm, contour). Fourth: check. Most exam dictations are 4-8 bars at moderate tempo.</p>"),
         ("Modulation", "Common Targets",
          "<p>Most tonal modulations move to: <strong>dominant</strong> (C→G), <strong>relative minor</strong> (C→Am), <strong>relative major</strong> (Am→C), <strong>subdominant</strong> (C→F), or by chromatic mediant (C→E).</p>"),
         ("Aural", "Detecting Modulation",
          "<p>Listen for a <strong>perfect cadence</strong> in the new key — V7-I in the new tonic confirms arrival. Strong A-Level answers identify the modulation moment by bar.</p>"),
     ],
     [
         {"q": "Modulation from C major to G major is to the:", "options": [opt("Subdominant", False), opt("Dominant", True), opt("Relative minor", False), opt("Mediant", False)]},
         {"q": "Relative minor of C major is:", "options": [opt("Cm", False), opt("Am", True), opt("Em", False), opt("Dm", False)]},
     ],
     [{"q": "Modulation from C major up to G major moves the tonic by how many semitones?", "options": [7, 5, 4, 3], "answer": 7}],
     [{"q": "What term describes writing down music heard, by ear (one word, lowercase)?", "answer": "transcription"}],
     )
count += 1

# notation--score-reading
TS, TD = "notation--score-reading", "Notation & Score Reading"
make(TS, TD, 1,
     "Clefs, Time and Key Signatures",
     "🎼",
     "Treble, bass, alto and tenor — and how to read them.",
     "A-Level Music: clefs, time signatures, and key signatures.",
     "The clef points to a fixed pitch.",
     [
         ("Treble Clef", "G clef — line through curl is G4."),
         ("Bass Clef", "F clef — dots above/below line for F3."),
         ("Alto Clef", "C clef centred on middle C (used by viola)."),
         ("Tenor Clef", "C clef on 4th line (used by upper bassoon, trombone, cello)."),
         ("Time Signature", "Upper number = beats per bar; lower = unit of beat."),
         ("Key Signature", "Sharps or flats appearing at the start of each line."),
     ],
     [
         ("Clefs", "Reading the C Clefs",
          "<p><strong>Alto clef</strong> (viola) centres middle C on the middle line. <strong>Tenor clef</strong> (bassoon, trombone, cello upper register) puts middle C on the 4th line. Both are 'movable C clefs'.</p>"),
         ("Time", "Simple vs Compound",
          "<p><strong>Simple</strong> time (2/4, 3/4, 4/4): beat divides into 2. <strong>Compound</strong> (6/8, 9/8, 12/8): beat divides into 3. Top number divides by 3 to give compound beats per bar.</p>"),
         ("Keys", "Cycle of Fifths",
          "<p>Sharps appear in order F-C-G-D-A-E-B; flats in reverse B-E-A-D-G-C-F. Major key with one sharp = G major; with one flat = F major.</p>"),
     ],
     [
         {"q": "Middle C in alto clef sits on the:", "options": [opt("Top line", False), opt("Middle line", True), opt("Bottom line", False), opt("Space below staff", False)]},
         {"q": "6/8 is which type of time?", "options": [opt("Simple", False), opt("Compound", True), opt("Irregular", False), opt("Asymmetric", False)]},
     ],
     [{"q": "How many beats per bar in 9/8 (compound)?", "options": [3, 4, 6, 9], "answer": 3}],
     [{"q": "Which clef is centred on middle C? (one word, lowercase, viola's clef)", "answer": "alto"}],
     )
count += 1

make(TS, TD, 2,
     "Dynamics and Articulation",
     "🎻",
     "From pp to fff and staccato to legato.",
     "A-Level Music: dynamics, articulation marks, and performance directions.",
     "Markings are the composer's voice to the performer.",
     [
         ("Dynamics", "Symbols indicating volume: pp, p, mp, mf, f, ff."),
         ("Crescendo", "Gradual increase in volume."),
         ("Diminuendo", "Gradual decrease in volume."),
         ("Staccato", "Detached, short — dot above/below note."),
         ("Legato", "Smooth, connected — slur indicates phrasing."),
         ("Accent", "Emphasised note — symbol > or ^."),
     ],
     [
         ("Volume", "Dynamic Ladder",
          "<p>The ladder: <strong>pp</strong> (pianissimo), <strong>p</strong>, <strong>mp</strong>, <strong>mf</strong>, <strong>f</strong>, <strong>ff</strong> (fortissimo). Extreme markings up to <strong>ppppp</strong> (Tchaikovsky) and <strong>ffff</strong> appear in late-Romantic scores.</p>"),
         ("Articulation", "Marks and Meaning",
          "<p><strong>Staccato</strong> dots = short, detached. <strong>Legato</strong> slurs = smooth connection. <strong>Marcato</strong> hat = emphatic. <strong>Tenuto</strong> dash = held to full value with slight stress.</p>"),
         ("Change", "Crescendo and Diminuendo",
          "<p>Spelt <em>cresc.</em>/<em>dim.</em> or notated as hairpins. A <strong>crescendo</strong> hairpin opens; <strong>diminuendo</strong> closes. Always identify start and end dynamics.</p>"),
     ],
     [
         {"q": "ff means:", "options": [opt("Fortissimo (very loud)", True), opt("Forte forte", False), opt("Very fast", False), opt("Final forte", False)]},
         {"q": "Staccato indicates:", "options": [opt("Smooth", False), opt("Short, detached", True), opt("Slurred", False), opt("Sustained", False)]},
     ],
     [{"q": "How many standard dynamic markings between pp and ff (inclusive: pp, p, mp, mf, f, ff)?", "options": [6, 5, 7, 4], "answer": 6}],
     [{"q": "What articulation symbol means 'smooth and connected' (one word, lowercase)?", "answer": "legato"}],
     )
count += 1

make(TS, TD, 3,
     "Ornamentation",
     "🎶",
     "Trills, mordents, turns — Baroque and Classical decoration.",
     "A-Level Music: reading ornaments in scores.",
     "Ornament is meaning.",
     [
         ("Trill", "Rapid alternation between two adjacent notes."),
         ("Mordent", "Single quick alternation with note above (upper mordent) or below."),
         ("Turn", "Four-note figure circling the main note (above-main-below-main)."),
         ("Appoggiatura", "Long grace note resolving onto principal note."),
         ("Acciaccatura", "Crushed grace note — very short, immediately before principal."),
         ("Tremolo", "Rapid repetition of a single note or alternation between two."),
     ],
     [
         ("Sign", "Reading Ornaments",
          "<p>The trill (<em>tr</em>) starts on the upper note in Baroque practice (CPE Bach), and on the main note in Classical (Hummel). Context and date determine which.</p>"),
         ("Grace", "Appoggiatura vs Acciaccatura",
          "<p>An <strong>appoggiatura</strong> takes half the value of the note it precedes (in simple time) and resolves on the beat. The <strong>acciaccatura</strong> (slashed grace note) is played as fast as possible, just before the beat.</p>"),
         ("Practice", "Interpreting Period Notation",
          "<p>Ornamentation conventions vary between Baroque (improvised, abundant), Classical (codified, restrained) and Romantic (often written out in full). A-Level analysis names the ornament and its likely realisation.</p>"),
     ],
     [
         {"q": "A trill is:", "options": [opt("A slow ornament", False), opt("Rapid alternation between two adjacent notes", True), opt("A single grace note", False), opt("A bowed accent", False)]},
         {"q": "A turn circles the main note in which pattern?", "options": [opt("Below-main-above-main", False), opt("Above-main-below-main", True), opt("Main-above-below-main", False), opt("Main-main-above-below", False)]},
     ],
     [{"q": "A four-note turn contains how many notes?", "options": [4, 3, 5, 2], "answer": 4}],
     [{"q": "What is the short Italian name for a crushed grace note (one word, lowercase)?", "answer": "acciaccatura"}],
     )
count += 1

# sonata-form-analysis
TS, TD = "sonata-form-analysis", "Sonata Form Analysis"
make(TS, TD, 1,
     "Exposition: First and Second Subjects",
     "📑",
     "Tonic, transition, dominant or relative major — and a codetta.",
     "A-Level Music: sonata-form exposition and tonal plan.",
     "Two ideas, two keys.",
     [
         ("Sonata Form", "Tripartite Classical form: exposition, development, recapitulation."),
         ("Exposition", "First main section: presents two themes in contrasting keys."),
         ("First Subject", "Opening theme, in the tonic key."),
         ("Transition", "Modulating passage linking first to second subject."),
         ("Second Subject", "Contrasting theme, in dominant (major-key works) or relative major (minor-key)."),
         ("Codetta", "Closing passage ending the exposition."),
     ],
     [
         ("Structure", "Standard Exposition",
          "<p>The <strong>exposition</strong> presents: <strong>first subject</strong> (tonic), <strong>transition</strong> (modulates), <strong>second subject</strong> (dominant in major; relative major in minor), and a <strong>codetta</strong> closing the section.</p>"),
         ("Tonal Plan", "Major and Minor",
          "<p>For a piece in <strong>C major</strong>: 1st subject C major, 2nd subject G major. For a piece in <strong>A minor</strong>: 1st subject A minor, 2nd subject C major (relative major).</p>"),
         ("Repeat", "Repeat Sign",
          "<p>The exposition is conventionally repeated in Classical sonata movements. Some modern performances omit the repeat — but the formal architecture assumes it.</p>"),
     ],
     [
         {"q": "In a minor-key sonata exposition, the second subject is typically in:", "options": [opt("Tonic minor", False), opt("Relative major", True), opt("Subdominant", False), opt("Parallel major", False)]},
         {"q": "The opening section of sonata form is the:", "options": [opt("Development", False), opt("Exposition", True), opt("Recapitulation", False), opt("Coda", False)]},
     ],
     [{"q": "In a C major sonata, the second subject is in which key (number of sharps in key signature)?", "options": [1, 0, 2, 3], "answer": 1}],
     [{"q": "What term describes the modulating passage between first and second subjects?", "answer": "transition"}],
     )
count += 1

make(TS, TD, 2,
     "Development and Recapitulation",
     "🔄",
     "The middle that fragments and the return that resolves.",
     "A-Level Music: sonata-form development and recapitulation.",
     "Sonata form ends where it began — but transformed.",
     [
         ("Development", "Central section: motivic fragmentation, distant keys, tension."),
         ("Recapitulation", "Final section: both subjects return, now in tonic."),
         ("Tonal Resolution", "Second subject re-presented in tonic, resolving exposition's contrast."),
         ("False Recapitulation", "Apparent return in wrong key — Haydn's joke device."),
         ("Coda", "Closing section after the recapitulation."),
         ("Dominant Preparation", "End of development poised on V, preparing tonic's return."),
     ],
     [
         ("Section", "Development",
          "<p>The <strong>development</strong> takes motifs from the exposition and transforms them — sequencing, fragmenting, inverting, modulating through distant keys. Tension builds toward a <strong>dominant pedal</strong> preparing return.</p>"),
         ("Section", "Recapitulation",
          "<p>The <strong>recapitulation</strong> brings back first subject in tonic and — crucially — second subject also in tonic (resolving exposition's tonal contrast). Transitions adjust to remain in tonic.</p>"),
         ("Section", "Coda",
          "<p>Beethoven expanded the <strong>coda</strong> into a near-second development (Symphony 3 'Eroica', 1804). Earlier sonatas often ended briefly after recapitulation.</p>"),
     ],
     [
         {"q": "In the recapitulation, the second subject appears in:", "options": [opt("Dominant", False), opt("Tonic", True), opt("Relative minor", False), opt("Subdominant", False)]},
         {"q": "Beethoven's 'Eroica' Symphony No. 3 dates from:", "options": [opt("1794", False), opt("1804", True), opt("1814", False), opt("1824", False)]},
     ],
     [{"q": "Sonata form has how many main sections (excluding coda)?", "options": [3, 2, 4, 5], "answer": 3}],
     [{"q": "What term describes the central section of sonata form?", "answer": "development"}],
     )
count += 1

make(TS, TD, 3,
     "Worked Example: A Classical First Movement",
     "🎻",
     "Bar by bar through a Mozart sonata exposition.",
     "A-Level Music: worked sonata-form analysis.",
     "Analysis trains the ear by way of the eye.",
     [
         ("Bar Numbers", "A-Level analysis cites passage by bar number."),
         ("Pivot Modulation", "Use of a chord common to two keys to modulate."),
         ("Closing Theme", "Tune ending the exposition before the repeat."),
         ("Mediant Modulation", "Modulation by a third — common in Romantic music."),
         ("Bridge Passage", "Another term for transition."),
         ("Sentence", "Classical phrase structure: 2+2+4 bars (statement, repeat, continuation)."),
     ],
     [
         ("Method", "Mapping the Exposition",
          "<p>For a typical Classical first movement: 1st subject (bars 1-20), transition (21-40), 2nd subject (41-60), closing/codetta (61-80). Numbers vary; principle is constant.</p>"),
         ("Phrase", "Sentence Structure",
          "<p>The Classical <strong>sentence</strong> (Schoenberg/Caplin) is 2+2+4: a 2-bar idea, its repeat, then 4 bars of continuation/cadence. Mozart and Haydn use it constantly.</p>"),
         ("Practice", "Examiner Expectations",
          "<p>Strong answers cite <strong>bar numbers</strong>, identify <strong>key</strong>, name <strong>cadence type</strong> at each section boundary, and discuss <strong>orchestration</strong> changes that mark form. Quote precisely.</p>"),
     ],
     [
         {"q": "Schoenberg/Caplin's Classical sentence is structured as:", "options": [opt("4+4+4", False), opt("2+2+4", True), opt("3+3+3", False), opt("1+1+6", False)]},
         {"q": "Citing 'bar number' is a key habit in:", "options": [opt("Aural transcription", False), opt("Score analysis", True), opt("Improvisation", False), opt("Performance", False)]},
     ],
     [{"q": "A 2+2+4 sentence is how many bars total?", "options": [8, 6, 10, 12], "answer": 8}],
     [{"q": "What single word names the central tension-building section of sonata form?", "answer": "development"}],
     )
count += 1

print("Music done: 27")
