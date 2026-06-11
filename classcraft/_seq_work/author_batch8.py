# -*- coding: utf-8 -*-
"""Author 'sequence' fields for batch8 (music + spanish). Run from classcraft/."""
import json, sys

S = {}  # pool name -> list of (term, def)

# ---------------- MUSIC: reusable pools ----------------
S['ERAS_A'] = [
 ("Medieval era", "c.500-1400: plainchant and early polyphony — the earliest era here"),
 ("Renaissance era", "c.1400-1600: Palestrina's choral polyphony follows the Medieval era"),
 ("Baroque era", "c.1600-1750: Bach, Handel and Vivaldi; basso continuo and ornamentation"),
 ("Classical era", "c.1750-1820: Haydn and Mozart; balanced phrases and sonata form"),
 ("Romantic era", "c.1820-1900: Chopin and Wagner; bigger orchestras, more emotion"),
 ("20th-century music", "From 1900: Debussy, Stravinsky and beyond — the latest era here"),
]
S['ERAS_B'] = [
 ("Medieval era", "Begins c.500: monks sing unaccompanied plainchant"),
 ("Renaissance era", "c.1400-1600: imitative vocal polyphony (Palestrina, Byrd)"),
 ("Baroque era", "c.1600-1750: harpsichord continuo and terraced dynamics"),
 ("Classical era", "c.1750-1820: elegant balance; the piano replaces the harpsichord"),
 ("Romantic era", "c.1820-1900: rubato, chromatic harmony, huge orchestras"),
 ("20th-century music", "After 1900: serialism, minimalism and electronics arrive"),
]
S['ERAS_C'] = [
 ("Medieval era", "c.500-1400 — the first period of Western music history"),
 ("Renaissance era", "c.1400-1600 — second: sacred polyphony flourishes"),
 ("Baroque era", "c.1600-1750 — third: opera and the orchestra are born"),
 ("Classical era", "c.1750-1820 — fourth: symphony and string quartet mature"),
 ("Romantic era", "c.1820-1900 — fifth: programme music and virtuosity"),
 ("20th-century music", "1900 onwards — the most recent period in this list"),
]
S['PERFORM_A'] = [
 ("Choose your repertoire", "Step 1: pick pieces suited to your instrument, level and the criteria"),
 ("Learn the notes", "Slow, sectional practice of tricky passages comes before polishing"),
 ("Refine the interpretation", "With notes secure, shape dynamics, phrasing and tempo"),
 ("Rehearse full run-throughs", "Build stamina with complete performances, with accompanist if needed"),
 ("Record under exam conditions", "Capture the final performance in an unedited take"),
 ("Check and submit", "Final step: verify recording and forms, then send to the board"),
]
S['PERFORM_B'] = [
 ("Select your pieces", "First match repertoire to your strengths and the time requirement"),
 ("Practise the hard sections", "Isolate and slow down difficulties before running the piece"),
 ("Polish the musical detail", "Add dynamics, articulation and phrasing once notes are fluent"),
 ("Do full dress rehearsals", "Complete run-throughs with accompanist/backing before recording"),
 ("Make the final recording", "Perform the programme in one sitting for assessment"),
 ("Submit the recording", "Last: send recording and documentation to the exam board"),
]
S['COMPOSE_A'] = [
 ("Study the brief", "Step 1: work out what the board's brief (or free choice) requires"),
 ("Sketch initial ideas", "Improvise and capture short motifs, riffs and chord patterns"),
 ("Develop the best ideas", "Extend sketches with repetition, sequence and variation"),
 ("Structure the whole piece", "Order the completed sections into a coherent form"),
 ("Refine and notate", "Polish details; produce the final score/lead sheet and recording"),
 ("Submit with the log", "Final step: send score, recording and composition log to the board"),
]
S['COMPOSE_B'] = [
 ("Choose the brief or free idea", "Composing starts by fixing what the piece must do"),
 ("Generate starting material", "Jot riffs, motifs and progressions before developing anything"),
 ("Develop and extend", "Grow the strongest material into full musical sections"),
 ("Shape the structure", "Decide the overall form once the sections exist"),
 ("Finalise score and recording", "Notate and record the finished piece"),
 ("Hand in to the board", "Last of all: submit score/recording plus the required log"),
]
S['NOTEVALS'] = [
 ("Semiquaver", "Worth a quarter of a beat — the shortest value in this list"),
 ("Quaver", "Worth half a beat: twice as long as a semiquaver"),
 ("Crotchet", "Worth 1 beat — the basic pulse of 4/4 time"),
 ("Minim", "Worth 2 beats: twice as long as a crotchet"),
 ("Semibreve", "Worth 4 beats — a whole bar of 4/4"),
 ("Breve", "Worth 8 beats: the longest note value here"),
]
S['NOTEVALS_AL'] = [
 ("Demisemiquaver", "Worth 1/8 of a beat — the shortest duration in this list"),
 ("Semiquaver", "Worth 1/4 of a beat: double a demisemiquaver"),
 ("Quaver", "Worth 1/2 a beat"),
 ("Crotchet", "Worth 1 beat — the usual unit of pulse"),
 ("Minim", "Worth 2 beats"),
 ("Semibreve", "Worth 4 beats — the longest value here"),
]
S['DYNAMICS'] = [
 ("Pianissimo (pp)", "Very quiet — the softest dynamic in this list"),
 ("Piano (p)", "Quiet: louder than pp, softer than mp"),
 ("Mezzo-piano (mp)", "Moderately quiet — just below the middle of the range"),
 ("Mezzo-forte (mf)", "Moderately loud — just above mezzo-piano"),
 ("Forte (f)", "Loud: louder than mf, softer than ff"),
 ("Fortissimo (ff)", "Very loud — the loudest dynamic here"),
]
S['TEMPO'] = [
 ("Largo", "Very slow and broad — roughly 40-60 bpm, the slowest here"),
 ("Adagio", "Slow and stately, roughly 66-76 bpm"),
 ("Andante", "Walking pace, roughly 76-108 bpm"),
 ("Moderato", "Moderate speed, roughly 108-120 bpm"),
 ("Allegro", "Fast and lively, roughly 120-156 bpm"),
 ("Presto", "Very fast — roughly 168-200 bpm, the fastest here"),
]
S['INTERVALS'] = [
 ("Minor 2nd", "1 semitone (e.g. E-F) — the narrowest interval here"),
 ("Major 3rd", "4 semitones (e.g. C-E), wider than any 2nd"),
 ("Perfect 4th", "5 semitones (e.g. C-F)"),
 ("Perfect 5th", "7 semitones (e.g. C-G)"),
 ("Major 6th", "9 semitones (e.g. C-A)"),
 ("Perfect octave", "12 semitones (e.g. C-C) — the widest interval in this list"),
]
S['KEYS'] = [
 ("C major", "0 sharps — the start of the sharp side of the circle of fifths"),
 ("G major", "1 sharp (F#): a perfect 5th above C"),
 ("D major", "2 sharps (F#, C#)"),
 ("A major", "3 sharps (F#, C#, G#)"),
 ("E major", "4 sharps (F#, C#, G#, D#)"),
 ("B major", "5 sharps — the most sharps in this list"),
]
S['VOICES'] = [
 ("Bass", "The lowest adult voice type (roughly E2-E4)"),
 ("Baritone", "Male voice lying between bass and tenor"),
 ("Tenor", "The highest common adult male voice (roughly C3-C5)"),
 ("Alto (contralto)", "The lowest female voice type"),
 ("Mezzo-soprano", "Female voice between alto and soprano"),
 ("Soprano", "The highest voice type (roughly C4-C6)"),
]
S['SAXES'] = [
 ("Bass saxophone", "The largest and deepest saxophone in this list"),
 ("Baritone saxophone", "In E-flat — a 4th higher than the bass sax"),
 ("Tenor saxophone", "In B-flat — higher than the baritone"),
 ("Alto saxophone", "In E-flat — higher than the tenor; the usual starter sax"),
 ("Soprano saxophone", "In B-flat — an octave above the tenor; often straight"),
 ("Sopranino saxophone", "The smallest, highest saxophone here"),
]
S['TREBLE'] = [
 ("E — bottom line", "The lowest line of the treble stave ('Every')"),
 ("G — second line", "Second line up ('Good') — the line the clef curls around"),
 ("B — middle line", "Third line up ('Boy')"),
 ("D — fourth line", "Fourth line up ('Deserves')"),
 ("F — top line", "The highest line of the treble stave ('Football')"),
]
S['SONGSTRUCT'] = [
 ("Intro", "Opens the song, setting up key, tempo and mood"),
 ("Verse 1", "The first storytelling section, before any chorus"),
 ("First chorus", "The main hook arrives after verse 1, then repeats later"),
 ("Bridge", "A contrasting section placed late, after repeated choruses"),
 ("Outro", "Closes the song — always the final section"),
]
S['SONATA'] = [
 ("First subject (exposition)", "Opens the movement in the tonic key"),
 ("Transition (bridge)", "Modulates away from the tonic towards the new key"),
 ("Second subject", "Contrasting theme in the dominant or relative major"),
 ("Development", "Themes are fragmented and driven through distant keys"),
 ("Recapitulation", "Both subjects return, now rooted in the tonic"),
 ("Coda", "The closing section that confirms the home key"),
]
S['ENSEMBLE'] = [
 ("Solo", "1 performer — a single line of music"),
 ("Duet", "2 performers"),
 ("Trio", "3 performers"),
 ("Quartet", "4 performers, e.g. a string quartet"),
 ("Quintet", "5 performers"),
 ("Sextet", "6 performers — the largest ensemble in this list"),
]
S['GENRES'] = [
 ("The blues", "Emerges c.1900 in the US South from work songs and spirituals"),
 ("Rock and roll", "Mid-1950s: Chuck Berry and Elvis electrify rhythm and blues"),
 ("Reggae", "Late 1960s: off-beat skank rhythms develop in Jamaica"),
 ("Hip hop", "1970s: Bronx DJs loop breakbeats and MCs rap over them"),
 ("Synth-pop", "Early 1980s: affordable synthesizers define the chart sound"),
 ("EDM festival boom", "2000s-10s: dance music headlines global festivals"),
]
S['JAZZ_STYLES'] = [
 ("New Orleans jazz", "1910s-20s: collective improvisation; first jazz record in 1917"),
 ("Swing and big bands", "1930s: Ellington and Goodman make arranged big-band jazz king"),
 ("Bebop", "Mid-1940s: Parker and Gillespie's fast, virtuosic small groups"),
 ("Cool jazz", "Early 1950s: a relaxed reaction to bebop — Miles Davis, Mulligan"),
 ("Free jazz", "c.1960: Ornette Coleman abandons fixed chords and forms"),
 ("Jazz fusion", "Late 1960s-70s: jazz meets rock electricity (Bitches Brew, 1970)"),
]
S['FILM_A'] = [
 ("Silent films with live music", "1900s-20s: pianists and orchestras play in the cinema itself"),
 ("The Jazz Singer", "1927: the first feature with synchronised sound"),
 ("Golden Age orchestral scores", "1930s-40s: Steiner's King Kong (1933) sets the symphonic mould"),
 ("Herrmann's Psycho score", "1960: strings-only modernist scoring for Hitchcock"),
 ("Williams' Star Wars", "1977: leitmotif-driven symphonic film music returns"),
 ("Zimmer's hybrid scores", "2000s: orchestra blended with electronics (Inception, 2010)"),
]
S['FILM_B'] = [
 ("Silent-era cinema music", "1900s-20s: live pianists accompany the picture"),
 ("The Jazz Singer", "1927: the first synchronised-sound feature film"),
 ("Golden Age scores", "1930s-40s: Steiner and Korngold's lush studio orchestras"),
 ("Psycho", "1960: Bernard Herrmann's shrieking strings"),
 ("Star Wars", "1977: John Williams revives the symphonic score"),
 ("The Lord of the Rings", "2001-03: Howard Shore's epic web of leitmotifs"),
]
S['FILMGAME'] = [
 ("The Jazz Singer", "1927: synchronised film sound begins"),
 ("King Kong", "1933: Max Steiner founds the symphonic film score"),
 ("Psycho", "1960: Herrmann's strings-only horror landmark"),
 ("Star Wars", "1977: the orchestral blockbuster score returns"),
 ("Super Mario Bros.", "1985: Koji Kondo's chiptune theme on 8-bit hardware"),
 ("Live orchestras for games", "2000s: titles such as Halo record full orchestral scores"),
]
S['POP60'] = [
 ("Beatlemania begins", "1963: Please Please Me launches the British beat boom"),
 ("Woodstock festival", "1969: rock's counterculture peak closes the decade"),
 ("Punk explosion", "1976-77: the Sex Pistols strip rock back to basics"),
 ("MTV launches", "1981: music video becomes central to pop promotion"),
 ("Nevermind", "1991: Nirvana takes grunge into the mainstream"),
 ("Streaming era begins", "2008: Spotify launches and access replaces ownership"),
]
S['POPCONV'] = [
 ("Elvis breaks through", "1956: rock and roll defines 1950s pop"),
 ("Beatlemania", "1963: the guitar group era takes over"),
 ("Punk arrives", "1976-77: the Sex Pistols tear up pop convention"),
 ("MTV launches", "1981: image and video reshape pop stardom"),
 ("Nevermind", "1991: grunge becomes the mainstream sound"),
 ("Streaming era", "2008: Spotify changes how pop is made and heard"),
]
S['POP1980'] = [
 ("MTV launches", "1981: the music-video era of pop begins"),
 ("Live Aid", "1985: the global charity mega-concert at Wembley and JFK"),
 ("Nevermind released", "1991: grunge crosses into the mainstream"),
 ("iTunes Store opens", "2003: legal downloads take over from CDs"),
 ("Spotify launches", "2008: streaming becomes the way pop is heard"),
]
S['TECHREC'] = [
 ("Edison's phonograph", "1877: the first device to record and play back sound"),
 ("Magnetic tape recording", "1935: AEG's Magnetophon allows editing and longer takes"),
 ("Multitrack recording", "1950s: Les Paul layers separate parts onto one tape"),
 ("MIDI standard agreed", "1983: synths, drum machines and computers can interconnect"),
 ("Digital Audio Workstations", "1990s: Pro Tools moves the studio inside the computer"),
 ("Music streaming", "2008: Spotify launches; access replaces ownership"),
]
S['MODERNISM'] = [
 ("Prelude a l'apres-midi d'un faune", "1894: Debussy's impressionism opens the modern era"),
 ("The Rite of Spring riot", "1913: Stravinsky's primitivist rhythms scandalise Paris"),
 ("Twelve-tone method unveiled", "1923: Schoenberg fixes all 12 notes in an ordered row"),
 ("Cage's 4'33\"", "1952: ambient silence itself becomes the musical material"),
 ("Gesang der Junglinge", "1956: Stockhausen fuses boy's voice and electronics"),
 ("Early minimalism", "1964-65: Riley's In C and Reich's tape pieces start the style"),
]
S['ART1910'] = [
 ("The Rite of Spring", "1913: Stravinsky's ballet premieres with a riot in Paris"),
 ("Schoenberg's twelve-tone method", "1923: serialism orders all 12 chromatic notes"),
 ("Quartet for the End of Time", "1941: Messiaen premieres it in a prisoner-of-war camp"),
 ("4'33\" premieres", "1952: Cage frames ambient sound as music"),
 ("Clapping Music", "1972: Reich's minimalist phasing for two pairs of hands"),
 ("Short Ride in a Fast Machine", "1986: John Adams' post-minimalist orchestral fanfare"),
]
S['ART1910_GCSE'] = [
 ("The Rite of Spring", "1913: Stravinsky's rhythmic revolution in Paris"),
 ("Twelve-tone music begins", "1923: Schoenberg's serial method"),
 ("Appalachian Spring", "1944: Copland's open-air Americana ballet"),
 ("4'33\"", "1952: John Cage's famous 'silent' piece"),
 ("In C", "1964: Terry Riley's pattern piece launches minimalism"),
]
S['BIRTHS_AQA_AL'] = [
 ("Henry Purcell", "Born 1659 — the earliest composer in this list"),
 ("Antonio Vivaldi", "Born 1678: Baroque concerto master"),
 ("Wolfgang Amadeus Mozart", "Born 1756: Classical opera and symphony"),
 ("Ludwig van Beethoven", "Born 1770: bridge from Classical to Romantic"),
 ("Frederic Chopin", "Born 1810: Romantic piano poet"),
 ("Johannes Brahms", "Born 1833 — the latest born here"),
]
S['BIRTHS_AQA_GCSE'] = [
 ("Henry Purcell", "Born 1659 — earliest of these composers"),
 ("Johann Sebastian Bach", "Born 1685: high Baroque counterpoint"),
 ("Joseph Haydn", "Born 1732: 'father of the symphony'"),
 ("Wolfgang Amadeus Mozart", "Born 1756, 24 years after Haydn"),
 ("Ludwig van Beethoven", "Born 1770: Classical into Romantic"),
 ("Frederic Chopin", "Born 1810 — the latest born in this list"),
]
S['BIRTHS_CCEA'] = [
 ("Henry Purcell", "Born 1659: English Baroque — the earliest here"),
 ("Antonio Vivaldi", "Born 1678: the Baroque concerto's great innovator"),
 ("Wolfgang Amadeus Mozart", "Born 1756: Classical era master"),
 ("Ludwig van Beethoven", "Born 1770, fourteen years after Mozart"),
 ("Giuseppe Verdi", "Born 1813: Romantic Italian opera"),
 ("Pyotr Tchaikovsky", "Born 1840 — the latest born in this list"),
]
S['AQA_POP_AL'] = [
 ("Innervisions", "1973: Stevie Wonder's classic-era album"),
 ("Hejira", "1976: Joni Mitchell's jazz-tinged road album"),
 ("Discovery", "2001: Daft Punk's French-house landmark"),
 ("Black Holes and Revelations", "2006: Muse's arena-rock breakthrough"),
 ("Lemonade", "2016: Beyonce's visual album"),
 ("Imagination & the Misfit Kid", "2019: Labrinth — the newest album here"),
]
S['AQA_MEDIA'] = [
 ("The Jazz Singer", "1927: synchronised film sound begins"),
 ("King Kong", "1933: Max Steiner's score founds Hollywood's Golden Age"),
 ("Psycho", "1960: Bernard Herrmann's strings-only shocker"),
 ("Star Wars", "1977: John Williams' leitmotif epic"),
 ("Super Mario Bros. theme", "1985: Koji Kondo's 8-bit classic"),
 ("Orchestral game scores", "2000s: games like Halo adopt full orchestral scoring"),
]
S['THEATRE'] = [
 ("The Threepenny Opera", "1928: Kurt Weill's Berlin theatre songs"),
 ("Oklahoma!", "1943: Rodgers and Hammerstein integrate song and story"),
 ("West Side Story", "1957: Bernstein and Sondheim's New York Romeo and Juliet"),
 ("Sweeney Todd", "1979: Sondheim's dark musical thriller"),
 ("Les Miserables", "1985: the London mega-musical opens"),
 ("Hamilton", "2015: Lin-Manuel Miranda's hip hop history musical"),
]
S['AQA_JAZZ'] = [
 ("First jazz record", "1917: the Original Dixieland Jazz Band in New York"),
 ("Armstrong's Hot Five", "1925: Louis Armstrong's landmark small-group sides"),
 ("Swing era begins", "1935: Benny Goodman's Palomar Ballroom triumph"),
 ("Bebop breaks through", "Mid-1940s: Charlie Parker and Dizzy Gillespie"),
 ("Kind of Blue", "1959: Miles Davis records the modal masterpiece"),
 ("Bitches Brew", "1970: Davis plugs in and fusion takes off"),
]
S['TRAD_ARTISTS'] = [
 ("Astor Piazzolla born", "1921: the future creator of tango nuevo, Argentina"),
 ("Toumani Diabate born", "1965: Malian kora master from a griot family"),
 ("Mariza born", "1973: leading voice of Portuguese fado"),
 ("Anoushka Shankar born", "1981: sitarist daughter of Ravi Shankar"),
 ("Bellowhead formed", "2004: the English folk big band comes together"),
]
S['VOCAL_AL'] = [
 ("Gregorian chant", "Medieval monophony, codified from around 900"),
 ("The madrigal flourishes", "1500s: secular Renaissance part-singing"),
 ("Monteverdi's L'Orfeo", "1607: opera's first masterpiece"),
 ("Handel's Messiah", "1741: the Baroque oratorio at its height"),
 ("Schubert's Erlkonig", "1815: the Romantic Lied arrives"),
 ("Tristan und Isolde", "1865: Wagner stretches tonality in music drama"),
]
S['INSTR_AL'] = [
 ("The concerto grosso", "Late 1600s: Corelli contrasts concertino and ripieno"),
 ("Vivaldi's Four Seasons", "1725: programmatic Baroque solo concertos"),
 ("Haydn's 'London' symphonies", "1791-95: the Classical symphony perfected"),
 ("Beethoven's 'Eroica'", "1804: the symphony expands in scale and ambition"),
 ("Symphonie fantastique", "1830: Berlioz's programmatic Romantic symphony"),
 ("Clara Schumann's Piano Trio", "1846: Romantic chamber music (a set work)"),
]
S['POPJAZZ'] = [
 ("First jazz record", "1917: the Original Dixieland Jazz Band"),
 ("Swing era begins", "1935: Benny Goodman sparks the big-band boom"),
 ("Bebop revolution", "Mid-1940s: Charlie Parker and Dizzy Gillespie"),
 ("Elvis breaks through", "1956: rock and roll conquers the charts"),
 ("Beatlemania", "1963: the Beatles transform pop songwriting"),
 ("Hip hop on record", "1979: 'Rapper's Delight' puts rap in the charts"),
]
S['FUSION_AL'] = [
 ("Afro-Cuban jazz", "1947: Dizzy Gillespie and Chano Pozo record 'Manteca'"),
 ("Getz/Gilberto", "1964: the album takes bossa nova worldwide"),
 ("Raga rock", "1965: the Beatles put sitar on 'Norwegian Wood'"),
 ("Bitches Brew", "1970: Miles Davis fuses jazz with rock"),
 ("Graceland", "1986: Paul Simon blends pop and South African styles"),
 ("Breathing Under Water", "2007: Anoushka Shankar's sitar-electronica fusion"),
]
S['FUSION_GCSE'] = [
 ("Afro-Cuban jazz", "1947: Gillespie and Chano Pozo record 'Manteca'"),
 ("Raga rock", "1965: sitar appears on the Beatles' 'Norwegian Wood'"),
 ("Bitches Brew", "1970: Miles Davis' jazz-rock landmark"),
 ("Graceland", "1986: Paul Simon's South African collaboration"),
 ("Afro Celt Sound System: 'Release'", "1999: Celtic-African set-work fusion"),
 ("'Samba Em Preludio'", "2008: Esperanza Spalding's jazz-bossa set work"),
]
S['NEWDIR'] = [
 ("Prelude a l'apres-midi d'un faune", "1894: Debussy opens the door to modernism"),
 ("The Rite of Spring", "1913: Stravinsky's rhythmic revolution"),
 ("Cage's Three Dances", "1945: prepared pianos redefine the instrument (set work)"),
 ("4'33\"", "1952: Cage's silent provocation"),
 ("Gesang der Junglinge", "1956: Stockhausen's electronic landmark"),
 ("Saariaho's Petals", "1988: cello and live electronics (set work)"),
]
S['OCR_AOS1'] = [
 ("Haydn joins the Esterhazy court", "1761: three decades of symphonic invention begin"),
 ("Mozart's Symphony No. 40", "1788: from his final summer of symphonies"),
 ("Haydn's 'Surprise' Symphony", "1791: written for the first London visit"),
 ("Beethoven's 'Eroica'", "1804: the symphony transformed in scale"),
 ("Beethoven's Fifth", "1808: premiered at the famous Vienna concert"),
 ("Beethoven's Ninth", "1824: the choral finale crowns the era"),
]
S['OCR_AOS2'] = [
 ("'Maple Leaf Rag'", "1899: Scott Joplin's ragtime hit comes before jazz"),
 ("'St Louis Blues' published", "1914: W.C. Handy writes the blues down"),
 ("First jazz record", "1917: the Original Dixieland Jazz Band"),
 ("Bessie Smith records", "1923: 'Downhearted Blues' is a huge seller"),
 ("Swing era begins", "1935: Benny Goodman's Palomar broadcast"),
 ("Sinatra joins Tommy Dorsey", "1940: the big-band singer becomes the star"),
]
S['OCR_AOS4'] = [
 ("Monteverdi's 1610 Vespers", "1610: early Baroque sacred splendour"),
 ("Charpentier's Te Deum", "c.1692: French Baroque grandeur"),
 ("Vivaldi's Gloria", "c.1715: written for the Ospedale della Pieta in Venice"),
 ("Bach's St Matthew Passion", "1727: Good Friday in Leipzig"),
 ("Handel's Messiah", "1741: composed in 24 days; premiered in Dublin in 1742"),
]
S['OCR_AOS5'] = [
 ("Symphonie fantastique", "1830: Berlioz's autobiographical programme symphony"),
 ("Liszt's Les Preludes", "1854: the symphonic poem is named and premiered"),
 ("Romeo and Juliet", "1869: Tchaikovsky's fantasy-overture (first version)"),
 ("Vltava (The Moldau)", "1874: Smetana paints the river's journey"),
 ("Strauss's Don Juan", "1889: the virtuoso tone poem premieres"),
 ("Debussy's La Mer", "1905: impressionist 'symphonic sketches' of the sea"),
]
S['OCR_AOS6'] = [
 ("Prelude a l'apres-midi d'un faune", "1894: Debussy's quiet revolution"),
 ("The Rite of Spring", "1913: the notorious Paris premiere riot"),
 ("Twelve-tone method", "1923: Schoenberg's serial breakthrough"),
 ("4'33\"", "1952: Cage asks what counts as music"),
 ("In C", "1964: Terry Riley launches minimalism"),
 ("Short Ride in a Fast Machine", "1986: John Adams' post-minimalist fanfare"),
]
S['TRADWORLD'] = [
 ("The blues emerges", "c.1900: born in the African-American Deep South"),
 ("First blues recordings", "1920s: Bessie Smith takes blues onto record"),
 ("Ska develops", "Late 1950s: Jamaica speeds up R&B with off-beat chops"),
 ("Reggae takes over", "Late 1960s: slower tempos; Bob Marley rises in the 70s"),
 ("UK bhangra boom", "1980s: Punjabi pop thrives in British cities"),
 ("Buena Vista Social Club", "1997: Cuban son reaches a global audience"),
]
S['IRISH'] = [
 ("O'Carolan's harp tunes", "The blind harper composes c.1690-1738"),
 ("Belfast Harp Festival", "1792: Bunting notates the old harp repertoire"),
 ("Ceili bands emerge", "Early 1900s: group dance music fills the halls"),
 ("Ceoltoiri Chualann founded", "1960: Sean O Riada's pioneering folk ensemble"),
 ("The Chieftains form", "1962: traditional music goes international"),
 ("Riverdance premieres", "1994: Irish music and dance conquer the world stage"),
]
S['EDEX_G_AOS1'] = [
 ("Brandenburg Concerto No. 5", "1721: Bach's harpsichord showpiece (a set work)"),
 ("Music for the Royal Fireworks", "1749: Handel's late-Baroque celebration suite"),
 ("Eine kleine Nachtmusik", "1787: Mozart's Classical serenade"),
 ("'Surprise' Symphony", "1791: Haydn's famous fortissimo jolt"),
 ("'Moonlight' Sonata", "1801: Beethoven leaning towards Romanticism"),
 ("Beethoven's Fifth Symphony", "1808: premiered in Vienna"),
]
S['EDEX_G_AOS2'] = [
 ("Gregorian chant", "Medieval: unaccompanied sacred song, from c.900"),
 ("'Music for a While'", "1692: Purcell's Baroque song (a set work)"),
 ("Handel's Messiah", "1741: the great Baroque oratorio"),
 ("Schubert's Erlkonig", "1815: the dramatic Romantic Lied"),
 ("'Don't Stop Me Now'", "1978: Queen's set work from the album Jazz"),
]
S['STAGE_SCREEN'] = [
 ("The Jazz Singer", "1927: sound film arrives"),
 ("The Wizard of Oz", "1939: the golden-age Hollywood musical"),
 ("West Side Story", "1957: Bernstein on Broadway"),
 ("Star Wars", "1977: John Williams revives the symphonic score"),
 ("The Lion King on Broadway", "1997: stage musical of the 1994 film"),
 ("Wicked opens", "2003: source of the set work 'Defying Gravity'"),
]
S['CONCERTO'] = [
 ("The concerto grosso", "Late 1600s: Corelli contrasts small group and orchestra"),
 ("Vivaldi's Four Seasons", "1725: the Baroque solo concerto at its peak"),
 ("Mozart's Clarinet Concerto", "1791: the Classical concerto, elegant and balanced"),
 ("Beethoven's 'Emperor'", "1809: the concerto grows symphonic in scale"),
 ("Mendelssohn's Violin Concerto", "1844: Romantic lyricism with linked movements"),
 ("Tchaikovsky's First Piano Concerto", "1875: the virtuoso Romantic showpiece"),
]
S['DRAMATIC'] = [
 ("L'Orfeo", "1607: Monteverdi's early opera dramatises myth in music"),
 ("Swan Lake", "1877: Tchaikovsky's ballet premieres in Moscow"),
 ("The Jazz Singer", "1927: synchronised sound brings music to film"),
 ("West Side Story", "1957: Bernstein reinvents the Broadway musical"),
 ("Star Wars", "1977: John Williams' leitmotif film score"),
 ("Hamilton", "2015: hip hop storms the musical stage"),
]
S['PROTEST'] = [
 ("'Strange Fruit'", "1939: Billie Holiday's protest against lynching"),
 ("'Blowin' in the Wind'", "1963: Bob Dylan's civil-rights anthem"),
 ("'Give Peace a Chance'", "1969: Lennon's Vietnam-era peace song"),
 ("'Zombie'", "1976: Fela Kuti attacks Nigeria's military"),
 ("'Free Nelson Mandela'", "1984: The Specials take on apartheid"),
]
S['ETECH'] = [
 ("The theremin", "c.1920: an early electronic instrument played without touch"),
 ("Musique concrete", "1948: Pierre Schaeffer composes with recorded sounds"),
 ("The Moog synthesizer", "1964: voltage-controlled synthesis goes commercial"),
 ("MIDI", "1983: a universal digital language for instruments"),
 ("Auto-Tune goes public", "1998: Cher's 'Believe' makes the effect famous"),
 ("Streaming platforms", "2008: Spotify moves music to the cloud"),
]
S['EXPLORE_IB'] = [
 ("Select diverse material", "First choose music from different times, places and styles"),
 ("Investigate the contexts", "Research how each piece works in its cultural setting"),
 ("Create practical exercises", "Compose short exercises using the conventions you found"),
 ("Perform and record exercises", "Demonstrate those conventions in performance"),
 ("Write up the exploration", "Connect findings and exercises in the written work"),
 ("Compile and submit the portfolio", "Finally assemble everything for submission"),
]
S['EXPERIMENT_IB'] = [
 ("Choose stimuli and contexts", "Experimentation starts from selected musical material"),
 ("Research the conventions", "Study how the chosen contexts actually work"),
 ("Experiment through creating", "Draft passages applying the researched techniques"),
 ("Experiment through performing", "Record performances of the experimental material"),
 ("Write the rationale", "Explain intentions and outcomes for each experiment"),
 ("Submit the report", "Final step: hand in the experimentation report"),
]
S['PRESENT_IB'] = [
 ("Select your programme", "First choose what you will perform and create"),
 ("Compose and arrange", "Produce the 'presenting as creator' pieces"),
 ("Rehearse the performances", "Prepare the chosen works to performance standard"),
 ("Record the final performances", "Capture polished takes for assessment"),
 ("Write the programme notes", "Introduce each finished piece for the audience"),
 ("Compile and submit", "Finally assemble the whole presentation collection"),
]
S['CMM'] = [
 ("Form the project intention", "Step 1: define a real-life project as a music maker"),
 ("Plan the project", "Set out proposal, roles, collaborators and timeline"),
 ("Develop the music", "Create, perform and collaborate to realise the plan"),
 ("Document the process", "Gather evidence of the project as it unfolds"),
 ("Prepare the presentation", "Shape the evidence into a multimedia presentation"),
 ("Deliver the presentation", "Finally present the project (maximum 15 minutes)"),
]

# ---------------- SPANISH: reusable pools ----------------
S['DAILY_A'] = [
 ("Me despierto", "I wake up at about 7:00 — the day's first action"),
 ("Me ducho", "I shower, straight after getting up"),
 ("Desayuno", "I eat breakfast before leaving the house"),
 ("Voy al instituto", "I go to school in the morning"),
 ("Ceno con mi familia", "Dinner is eaten late in Spain, around 21:00"),
 ("Me acuesto", "I go to bed — the final action of the day"),
]
S['DAILY_B'] = [
 ("Me despierto a las siete", "Waking up is the first action of the day"),
 ("Me visto", "I get dressed, after getting up"),
 ("Desayuno cereales", "Breakfast comes before leaving for school"),
 ("Salgo de casa", "I leave the house in the morning"),
 ("Vuelvo a casa por la tarde", "I come home in the afternoon"),
 ("Me acuesto a las once", "Bed at 23:00 — the day's last action"),
]
S['SCHOOLDAY'] = [
 ("Llego al instituto", "I arrive at school at about 8:30"),
 ("Empieza la primera clase", "The first lesson opens the school day"),
 ("El recreo", "Break time, in the middle of the morning"),
 ("La hora de comer", "Lunchtime follows the morning lessons"),
 ("La ultima clase", "The final lesson of the afternoon"),
 ("Vuelvo a casa", "Going home ends the school day"),
]
S['EDLADDER_A'] = [
 ("La escuela primaria", "Primary school: ages 6-12 in Spain"),
 ("La ESO", "Compulsory secondary school, ages 12-16"),
 ("El bachillerato", "Pre-university study, ages 16-18"),
 ("La universidad", "Degree studies, from age 18"),
 ("El primer empleo", "Your first job, after finishing your studies"),
 ("La jubilacion", "Retirement, at around 65-67 — the final stage"),
]
S['EDLADDER_B'] = [
 ("La escuela infantil", "Nursery/infant school: ages 3-6, the earliest stage"),
 ("La escuela primaria", "Primary school: ages 6-12"),
 ("La ESO", "Compulsory secondary education: ages 12-16"),
 ("El bachillerato o la FP", "Academic or vocational study: ages 16-18"),
 ("La universidad", "Higher education from age 18"),
 ("El mundo laboral", "Working life begins after your studies"),
]
S['JOURNEY_A'] = [
 ("Hago la maleta", "I pack my suitcase — the first step, still at home"),
 ("Voy al aeropuerto", "I travel to the airport"),
 ("Facturo el equipaje", "I check in my luggage at the desk"),
 ("Embarco en el avion", "I board the plane at the gate"),
 ("El avion despega", "The plane takes off"),
 ("Llego al hotel", "Arriving at the hotel completes the journey"),
]
S['JOURNEY_B'] = [
 ("Reservo el viaje", "Booking comes first, weeks before departure"),
 ("Hago la maleta", "Packing happens before leaving home"),
 ("Salgo para el aeropuerto", "I set off for the airport"),
 ("Paso el control de seguridad", "Security comes at the airport, before boarding"),
 ("Subo al avion", "Boarding is the last step before the flight"),
 ("Llego a mi destino", "Arrival ends the journey"),
]
S['SCALE_A'] = [
 ("La calle", "The street — the smallest area in this list"),
 ("El barrio", "The neighbourhood: several streets together"),
 ("La ciudad", "The city, made up of many neighbourhoods"),
 ("La region", "The region (comunidad autonoma), holding many cities"),
 ("El pais", "The country, e.g. Espana"),
 ("El continente", "The continent, e.g. Europa — the largest area here"),
]
S['SCALE_B'] = [
 ("El barrio", "The neighbourhood — the most local level here"),
 ("La ciudad", "The town or city containing the barrio"),
 ("La region", "The region or comunidad autonoma"),
 ("El pais", "The nation, e.g. Espana"),
 ("Europa", "The continent containing the country"),
 ("El mundo", "The world — the global level, largest of all"),
]
S['SCALE_C'] = [
 ("La casa", "The house — the smallest place in this list"),
 ("La calle", "The street where the house stands"),
 ("El barrio", "The neighbourhood of several streets"),
 ("La ciudad", "The town or city containing the barrio"),
 ("La region", "The wider region around the city"),
 ("El pais", "The whole country — the largest area here"),
]
S['FIESTAS'] = [
 ("El Ano Nuevo", "1 January — the first fiesta of the calendar year"),
 ("El Dia de Reyes", "6 January: the Three Kings bring presents"),
 ("La Semana Santa", "Holy Week, in March or April"),
 ("San Fermin", "6-14 July: the bull-running festival in Pamplona"),
 ("El Dia de la Hispanidad", "12 October: Spain's national day"),
 ("La Navidad", "25 December — the last major fiesta of the year"),
]
S['FAMGEN'] = [
 ("Mis bisabuelos", "My great-grandparents — three generations above me"),
 ("Mis abuelos", "My grandparents — two generations above me"),
 ("Mis padres", "My parents — one generation above me"),
 ("Yo", "Me — the reference point of the family tree"),
 ("Mis hijos", "My children — one generation below me"),
 ("Mis nietos", "My grandchildren — two generations below me"),
]
S['FAMGEN_KS3'] = [
 ("El bisabuelo", "Great-grandfather — three generations above you"),
 ("El abuelo", "Grandfather — two generations above you"),
 ("El padre", "Father — one generation above you"),
 ("Yo", "You — the centre of the family tree"),
 ("El hijo", "Son — one generation below you"),
 ("El nieto", "Grandson — two generations below you"),
]
S['LIFESTAGES_A'] = [
 ("El nacimiento", "Birth — life's starting point"),
 ("La infancia", "Childhood: the years before adolescence"),
 ("La adolescencia", "The teenage years, roughly 12-17"),
 ("La mayoria de edad", "Turning 18: legal adulthood in Spain"),
 ("La vida laboral", "Adult working life"),
 ("La jubilacion", "Retirement at about 65-67 — the final stage here"),
]
S['LIFESTAGES_B'] = [
 ("Nacer", "Being born comes first"),
 ("La ninez", "Childhood follows birth"),
 ("La adolescencia", "The teenage years, about 12-17"),
 ("Cumplir 18 anos", "Turning 18: adult rights begin"),
 ("Casarse o trabajar", "Adult life: career and relationships"),
 ("Jubilarse", "Retiring, around 65-67 — the last stage"),
]
S['TENSES_A'] = [
 ("Habia comido antes de salir", "Pluperfect: before another past action — the earliest time"),
 ("Comi ayer", "Preterite: a completed action yesterday"),
 ("Como ahora", "Present: happening right now"),
 ("Voy a comer esta tarde", "Near future (ir a + infinitive): later today"),
 ("Comere manana", "Simple future: tomorrow — the latest time here"),
]
S['TENSES_B'] = [
 ("Habia viajado antes de 2020", "Pluperfect: before another past moment — earliest here"),
 ("Viaje el ano pasado", "Preterite: a completed trip last year"),
 ("Viajo hoy", "Present: travelling today"),
 ("Voy a viajar este verano", "Near future (ir a + infinitive): this summer"),
 ("Viajare el ano que viene", "Simple future: next year — the latest here"),
]
S['CONJUG'] = [
 ("(Yo) hablo", "1st person singular — the paradigm always starts with 'I'"),
 ("(Tu) hablas", "2nd person singular: informal 'you'"),
 ("(El/ella) habla", "3rd person singular: 'he/she'"),
 ("(Nosotros) hablamos", "1st person plural: 'we'"),
 ("(Vosotros) hablais", "2nd person plural: informal 'you all'"),
 ("(Ellos/ellas) hablan", "3rd person plural — the paradigm's final slot"),
]
S['NUMBERS'] = [
 ("Cero", "0 — the smallest number in this list"),
 ("Diez", "10"),
 ("Veinte", "20"),
 ("Cien", "100"),
 ("Mil", "1,000"),
 ("Un millon", "1,000,000 — the largest number here"),
]
S['DAYS'] = [
 ("Lunes", "Monday — the first day of the Spanish week"),
 ("Martes", "Tuesday: the second day"),
 ("Miercoles", "Wednesday: the third day"),
 ("Jueves", "Thursday: the fourth day"),
 ("Viernes", "Friday: the fifth day"),
 ("Sabado", "Saturday — sixth day, the start of the weekend"),
]
S['RAINBOW'] = [
 ("Rojo", "Red — the outer arc of the rainbow, longest wavelength"),
 ("Naranja", "Orange, between red and yellow"),
 ("Amarillo", "Yellow: third colour of the spectrum"),
 ("Verde", "Green, in the middle of the spectrum"),
 ("Azul", "Blue, towards the short-wavelength end"),
 ("Morado", "Purple/violet — the inner arc, shortest wavelength"),
]
S['GREET'] = [
 ("¡Hola, buenos dias!", "The greeting that opens the conversation"),
 ("¿Como te llamas?", "Asking the name comes right after saying hello"),
 ("Me llamo Ana", "The reply to the name question"),
 ("¿Que tal estas?", "Asking how someone is, once names are known"),
 ("Bien, gracias, ¿y tu?", "Answering '¿que tal?' and asking back"),
 ("¡Adios, hasta luego!", "Saying goodbye closes the conversation"),
]
S['SPORTS'] = [
 ("El tenis (individual)", "1 player per side — the smallest 'team' here"),
 ("El baloncesto", "Basketball: 5 players per team on court"),
 ("El voleibol", "Volleyball: 6 players per team on court"),
 ("El futbol", "Football: 11 players per team"),
 ("El rugby", "Rugby union: 15 players per team — the biggest side here"),
]
S['CLASSROOM'] = [
 ("El lapiz", "The pencil — small enough to fit inside the pencil case"),
 ("El estuche", "The pencil case: holds the lapiz, fits in the backpack"),
 ("La mochila", "The backpack: holds the estuche and goes to class"),
 ("El aula", "The classroom: where the mochila ends up, inside school"),
 ("El instituto", "The school building — contains everything else here"),
]
S['SPORTDAY'] = [
 ("Me despierto temprano", "Waking early — the day begins"),
 ("Desayuno algo sano", "A healthy breakfast, before any activity"),
 ("Voy al polideportivo", "I head to the sports centre in the morning"),
 ("Entreno con mi equipo", "Training happens once I am at the sports centre"),
 ("Ceno despues del deporte", "Dinner comes in the evening, after sport"),
 ("Me acuesto pronto", "Early to bed — the day's final action"),
]
S['MEALS'] = [
 ("Me despierto", "Waking up starts the day, around 7:00"),
 ("El desayuno", "Breakfast: the first meal, in the early morning"),
 ("La comida", "Lunch — around 14:00 in Spain, the main meal"),
 ("La merienda", "The afternoon snack, around 17:00-18:00"),
 ("La cena", "Dinner — eaten late in Spain, around 21:00"),
 ("Me acuesto", "Going to bed ends the day"),
]
S['MEDIATECH'] = [
 ("La radio", "Anos 1920: Radio Barcelona, primera emisora (1924)"),
 ("La television", "1956: TVE comienza sus emisiones en Espana"),
 ("El ordenador personal", "Anos 1980: la informatica llega a casa"),
 ("Internet", "Anos 1990: la red conecta el mundo"),
 ("El telefono inteligente", "2007: el iPhone populariza el smartphone"),
 ("TikTok y el video corto", "Desde 2016: las redes de video dominan"),
]
S['INGENUITY'] = [
 ("La imprenta", "Hacia 1440: Gutenberg revoluciona la informacion"),
 ("La radio", "Anos 1920: el primer medio de masas electronico"),
 ("La television", "Anos 1950: la imagen entra en los hogares"),
 ("Internet", "Anos 1990: la red mundial conecta a la humanidad"),
 ("El telefono inteligente", "2007: el iPhone pone internet en el bolsillo"),
 ("La IA generativa", "2022: ChatGPT populariza la inteligencia artificial"),
]
S['PLANET'] = [
 ("Conferencia de Estocolmo", "1972: primera gran cumbre ambiental de la ONU"),
 ("Cumbre de la Tierra de Rio", "1992: nace la convencion del clima"),
 ("Protocolo de Kioto", "1997: primeros compromisos de reduccion de emisiones"),
 ("Acuerdo de Paris", "2015: limitar el calentamiento a 1,5-2 grados"),
 ("Huelgas escolares por el clima", "2018: Greta Thunberg inspira 'Fridays for Future'"),
]
S['CIVILWAR'] = [
 ("Proclamacion de la Segunda Republica", "Abril de 1931: el rey se exilia y nace la Republica"),
 ("Victoria del Frente Popular", "Febrero de 1936: la izquierda gana las elecciones"),
 ("Alzamiento militar", "17-18 de julio de 1936: el golpe inicia la guerra"),
 ("Bombardeo de Guernica", "26 de abril de 1937: la Legion Condor destruye la villa"),
 ("Caida de Barcelona", "Enero de 1939: las tropas franquistas toman la ciudad"),
 ("Fin de la guerra", "1 de abril de 1939: ultimo parte de guerra de Franco"),
]
S['FRANCO'] = [
 ("Fin de la Guerra Civil", "1939: comienza la dictadura de Franco"),
 ("Juan Carlos, sucesor designado", "1969: Franco lo nombra futuro rey"),
 ("Muerte de Franco", "20 de noviembre de 1975"),
 ("Primeras elecciones democraticas", "Junio de 1977: gana la UCD de Adolfo Suarez"),
 ("Constitucion espanola", "Diciembre de 1978: aprobada en referendum"),
 ("El 23-F", "1981: fracasa el golpe de Estado de Tejero"),
]
S['POLITICS'] = [
 ("Muerte de Franco", "1975: fin de la dictadura"),
 ("Primeras elecciones libres", "1977: Espana vota tras casi 40 anos"),
 ("La Constitucion", "1978: Espana es ya una monarquia parlamentaria"),
 ("Golpe fallido del 23-F", "1981: Tejero asalta el Congreso"),
 ("Victoria del PSOE", "1982: Felipe Gonzalez llega al poder"),
 ("Entrada en la CEE", "1986: Espana se integra en Europa"),
]
S['AQAPOL'] = [
 ("Estalla la Guerra Civil", "1936: golpe militar contra la Republica"),
 ("Comienza la dictadura", "1939: victoria de Franco en la guerra"),
 ("Muerte de Franco", "1975: se abre la Transicion"),
 ("Constitucion democratica", "1978: aprobada en referendum"),
 ("Felipe Gonzalez presidente", "1982: primer gobierno socialista"),
 ("Espana entra en la CEE", "1986: integracion europea"),
]
S['VALUES'] = [
 ("Voto femenino", "1931: la Segunda Republica aprueba el sufragio femenino"),
 ("Legalizacion del divorcio", "1981: la ley del divorcio moderniza la familia"),
 ("Despenalizacion parcial del aborto", "1985: la primera ley de supuestos"),
 ("Matrimonio igualitario", "2005: Espana, tercer pais del mundo en aprobarlo"),
 ("Ley de Igualdad", "2007: igualdad efectiva entre mujeres y hombres"),
]
S['MULTICULT'] = [
 ("Primera Ley de Extranjeria", "1985: Espana regula la inmigracion por primera vez"),
 ("Ley de Extranjeria 4/2000", "2000: nueva ley de derechos de los extranjeros"),
 ("Regularizacion masiva", "2005: unos 580.000 inmigrantes legalizan su situacion"),
 ("Crisis de los cayucos", "2006: llegada record de pateras a Canarias"),
 ("Crisis de refugiados", "2015: Europa afronta la llegada de refugiados sirios"),
]
S['IMMIG'] = [
 ("Emigracion espanola a Europa", "Anos 1950-60: espanoles emigran a Alemania y Francia"),
 ("Primera Ley de Extranjeria", "1985: primera regulacion de la inmigracion"),
 ("Ley de Extranjeria 4/2000", "2000: derechos y libertades de los extranjeros"),
 ("Regularizacion masiva", "2005: cientos de miles legalizan su situacion"),
 ("Crisis de los cayucos", "2006: llegada record de embarcaciones a Canarias"),
]
S['SOCEVOL'] = [
 ("Voto femenino", "1931: la Republica reconoce el sufragio femenino"),
 ("Exodo rural", "Anos 1950-60: migracion masiva del campo a las ciudades"),
 ("Legalizacion del divorcio", "1981: cambio profundo en la familia espanola"),
 ("Entrada en la CEE", "1986: modernizacion economica y social"),
 ("Matrimonio igualitario", "2005: nuevo modelo de familia reconocido"),
]
S['ARTCULTURE'] = [
 ("Las Meninas", "1656: la obra maestra de Velazquez"),
 ("El tres de mayo de 1808", "1814: Goya pinta los fusilamientos"),
 ("Comienza la Sagrada Familia", "1883: Gaudi asume el proyecto en Barcelona"),
 ("La persistencia de la memoria", "1931: los relojes blandos de Dali"),
 ("Guernica", "1937: Picasso denuncia el bombardeo"),
 ("Nobel para Garcia Marquez", "1982: premio Nobel de Literatura"),
]
S['EDEXART'] = [
 ("Las Meninas de Velazquez", "1656: cumbre del Siglo de Oro de la pintura"),
 ("Goya pinta El tres de mayo", "1814: tras la Guerra de la Independencia"),
 ("Gaudi y la Sagrada Familia", "1883: comienza su obra maestra"),
 ("Asesinato de Lorca", "Agosto de 1936, al inicio de la Guerra Civil"),
 ("Picasso pinta Guernica", "1937, para la Exposicion de Paris"),
 ("Nobel para Vargas Llosa", "2010: premio Nobel de Literatura"),
]
S['LATAM'] = [
 ("Civilizaciones precolombinas", "Aztecas, mayas e incas florecen antes de 1492"),
 ("Llegada de Colon", "1492: comienza la conquista espanola"),
 ("La epoca colonial", "Siglos XVI-XVIII: los virreinatos espanoles"),
 ("Las independencias", "1810-1825: Bolivar y San Martin liberan el continente"),
 ("La Revolucion Mexicana", "1910: la primera gran revolucion del siglo XX"),
 ("La Revolucion Cubana", "1959: Fidel Castro toma el poder"),
]
S['CINEMA'] = [
 ("Se escribe el guion", "The screenplay comes first, before any filming"),
 ("La preproduccion", "Casting, locations and budget are planned next"),
 ("El rodaje", "Filming: the cameras finally roll"),
 ("El montaje", "Editing assembles the footage in postproduction"),
 ("El estreno", "The premiere: the film opens in cinemas"),
 ("La taquilla y las criticas", "Box office and reviews follow the release"),
]
S['NARRATIVE'] = [
 ("La exposicion", "Presents characters and setting — the story's opening"),
 ("El conflicto", "The inciting problem that sets the plot moving"),
 ("El nudo (desarrollo)", "Rising action: tension builds towards the climax"),
 ("El climax", "The point of highest tension in the story"),
 ("El desenlace", "The resolution — how everything ends"),
]
S['ESSAY_A'] = [
 ("Analiza la pregunta", "First identify exactly what the question demands"),
 ("Planifica la respuesta", "Plan argument and evidence before writing anything"),
 ("Escribe la introduccion", "State your line of argument (la tesis)"),
 ("Desarrolla los parrafos", "Point-evidence-analysis paragraphs build the body"),
 ("Escribe la conclusion", "Return to the question with a final judgement"),
 ("Revisa el texto", "Last step: check grammar, accents and spelling"),
]
S['ESSAY_B'] = [
 ("Lee la pregunta con cuidado", "Understanding the task always comes first"),
 ("Haz un plan", "Choose scenes, quotes and points before writing"),
 ("La introduccion", "Open by stating your argument clearly"),
 ("Los parrafos de desarrollo", "Develop each point with evidence from the text/film"),
 ("La conclusion", "Close with a judgement that answers the question"),
 ("La revision final", "Finally proofread grammar and accents"),
]
S['IRP'] = [
 ("Elige el tema", "Pick a subject of personal interest in Hispanic society"),
 ("Define la pregunta de investigacion", "Narrow the topic into a clear question/title"),
 ("Investiga las fuentes", "Gather and read Spanish-language sources"),
 ("Organiza los hallazgos", "Select key facts and structure your findings"),
 ("Prepara la presentacion", "Plan headings and likely follow-up questions"),
 ("El examen oral", "Finally present and discuss the project in the speaking exam"),
]
S['SPEAKING'] = [
 ("Elige el tema", "Choose your discussion topic well before the exam"),
 ("Investiga y toma notas", "Research facts and statistics to support opinions"),
 ("Prepara tus argumentos", "Organise ideas and learn the key vocabulary"),
 ("Practica conversaciones", "Rehearse with mock speaking sessions"),
 ("La presentacion del examen", "The exam opens with your prepared topic"),
 ("La conversacion general", "Wider discussion ends the speaking exam"),
]

# ---------------- assignment: stem -> pool key or None (skip) ----------------
A = {
 # ---- music a-level ----
 'music-a-level-20th-century--modernism-adventure-1': 'MODERNISM',
 'music-a-level-analysis--aural-skills-adventure-1': 'INTERVALS',
 'music-a-level-appraising--analysis-adventure-1': 'ERAS_B',
 'music-a-level-aqa-area-of-study-1-western-classical-tradition-1650-1910-adventure-1': 'BIRTHS_AQA_AL',
 'music-a-level-aqa-area-of-study-2-pop-music-adventure-1': 'AQA_POP_AL',
 'music-a-level-aqa-area-of-study-3-music-for-media-adventure-1': 'AQA_MEDIA',
 'music-a-level-aqa-area-of-study-4-music-for-theatre-adventure-1': 'THEATRE',
 'music-a-level-aqa-area-of-study-5-jazz-adventure-1': 'AQA_JAZZ',
 'music-a-level-aqa-area-of-study-6-contemporary-traditional-music-adventure-1': 'TRAD_ARTISTS',
 'music-a-level-aqa-area-of-study-7-art-music-since-1910-adventure-1': 'ART1910',
 'music-a-level-aqa-component-1-appraising-music-listening-adventure-1': 'ERAS_A',
 'music-a-level-aqa-component-2-performance-adventure-1': 'PERFORM_A',
 'music-a-level-aqa-component-3-composition-adventure-1': 'COMPOSE_A',
 'music-a-level-ccea-unit-a2-1-performing-adventure-1': 'PERFORM_B',
 'music-a-level-ccea-unit-a2-2-composing-adventure-1': 'COMPOSE_B',
 'music-a-level-ccea-unit-a2-3-responding-to-music-set-works-and-comparative-study-adventure-1': 'ERAS_C',
 'music-a-level-ccea-unit-as-1-performing-adventure-1': 'PERFORM_A',
 'music-a-level-ccea-unit-as-2-composing-adventure-1': 'COMPOSE_A',
 'music-a-level-ccea-unit-as-3-responding-to-music-adventure-1': 'ERAS_B',
 'music-a-level-composing-adventure-1': 'COMPOSE_B',
 'music-a-level-edexcel-area-of-study-1-vocal-music-adventure-1': 'VOCAL_AL',
 'music-a-level-edexcel-area-of-study-2-instrumental-music-adventure-1': 'INSTR_AL',
 'music-a-level-edexcel-area-of-study-3-music-for-film-adventure-1': 'FILM_A',
 'music-a-level-edexcel-area-of-study-4-popular-music-and-jazz-adventure-1': 'POPJAZZ',
 'music-a-level-edexcel-area-of-study-5-fusions-adventure-1': 'FUSION_AL',
 'music-a-level-edexcel-area-of-study-6-new-directions-adventure-1': 'NEWDIR',
 'music-a-level-edexcel-component-1-performing-adventure-1': 'PERFORM_B',
 'music-a-level-edexcel-component-2-composing-adventure-1': 'COMPOSE_B',
 'music-a-level-edexcel-component-3-appraising-adventure-1': 'ERAS_C',
 'music-a-level-jazz-styles--theory-adventure-1': 'JAZZ_STYLES',
 'music-a-level-music-history--theory-adventure-1': 'ERAS_A',
 'music-a-level-notation--score-reading-adventure-1': 'NOTEVALS_AL',
 'music-a-level-ocr-area-of-study-1-instrumental-music-of-haydn-mozart-and-beethoven-adventure-1': 'OCR_AOS1',
 'music-a-level-ocr-area-of-study-2-popular-song-blues-jazz-swing-and-big-band-adventure-1': 'OCR_AOS2',
 'music-a-level-ocr-area-of-study-3-developments-in-instrumental-jazz-1910-to-present-adventure-1': 'JAZZ_STYLES',
 'music-a-level-ocr-area-of-study-4-religious-music-of-the-baroque-period-adventure-1': 'OCR_AOS4',
 'music-a-level-ocr-area-of-study-5-programme-music-1820-1910-adventure-1': 'OCR_AOS5',
 'music-a-level-ocr-area-of-study-6-innovations-in-music-1900-to-present-adventure-1': 'OCR_AOS6',
 'music-a-level-ocr-component-01-performing-adventure-1': 'PERFORM_A',
 'music-a-level-ocr-component-02-composing-adventure-1': 'COMPOSE_A',
 'music-a-level-ocr-component-03-04-listening-and-appraising-adventure-1': 'ERAS_B',
 'music-a-level-set-works-vocabulary-adventure-1': 'TEMPO',
 'music-a-level-sonata-form-analysis-adventure-1': 'SONATA',
 # ---- music gcse ----
 'music-gcse-aqa-area-of-study-1-western-classical-tradition-1650-1910-adventure-1': 'BIRTHS_AQA_GCSE',
 'music-gcse-aqa-area-of-study-2-popular-music-adventure-1': 'POP60',
 'music-gcse-aqa-area-of-study-3-traditional-music-adventure-1': 'TRADWORLD',
 'music-gcse-aqa-area-of-study-4-western-classical-tradition-since-1910-adventure-1': 'ART1910_GCSE',
 'music-gcse-aqa-component-1-understanding-music-listening-exam-adventure-1': 'ERAS_A',
 'music-gcse-aqa-component-2-performing-music-adventure-1': 'PERFORM_B',
 'music-gcse-aqa-component-3-composing-music-adventure-1': 'COMPOSE_B',
 'music-gcse-cambridge-igcse-component-1-listening-western-and-world-music-adventure-1': 'ERAS_C',
 'music-gcse-cambridge-igcse-component-2-performing-adventure-1': 'PERFORM_A',
 'music-gcse-cambridge-igcse-component-3-composing-adventure-1': 'COMPOSE_A',
 'music-gcse-cambridge-igcse-world-focus-music-study-adventure-1': None,  # rotating world-focus region; no objective ordering
 'music-gcse-ccea-area-of-study-1-western-classical-music-1600-1910-adventure-1': 'BIRTHS_CCEA',
 'music-gcse-ccea-area-of-study-2-film-music-adventure-1': 'FILM_B',
 'music-gcse-ccea-area-of-study-3-musical-traditions-of-ireland-adventure-1': 'IRISH',
 'music-gcse-ccea-area-of-study-4-popular-music-1980-to-present-adventure-1': 'POP1980',
 'music-gcse-ccea-component-1-performing-and-appraising-adventure-1': 'PERFORM_B',
 'music-gcse-ccea-component-2-composing-adventure-1': 'COMPOSE_B',
 'music-gcse-ccea-component-3-listening-and-appraising-adventure-1': 'ERAS_B',
 'music-gcse-chords--harmony-adventure-1': 'INTERVALS',
 'music-gcse-composing-adventure-1': 'COMPOSE_A',
 'music-gcse-edexcel-area-of-study-1-instrumental-music-1700-1820-adventure-1': 'EDEX_G_AOS1',
 'music-gcse-edexcel-area-of-study-2-vocal-music-adventure-1': 'EDEX_G_AOS2',
 'music-gcse-edexcel-area-of-study-3-music-for-stage-and-screen-adventure-1': 'STAGE_SCREEN',
 'music-gcse-edexcel-area-of-study-4-fusions-adventure-1': 'FUSION_GCSE',
 'music-gcse-edexcel-component-1-performing-adventure-1': 'PERFORM_A',
 'music-gcse-edexcel-component-2-composing-adventure-1': 'COMPOSE_B',
 'music-gcse-edexcel-component-3-appraising-adventure-1': 'ERAS_C',
 'music-gcse-film--game-music-adventure-1': 'FILMGAME',
 'music-gcse-listening--appraising-adventure-1': 'ERAS_A',
 'music-gcse-music-technology-adventure-1': 'TECHREC',
 'music-gcse-music-theory-adventure-1': 'KEYS',
 'music-gcse-musical-elements-adventure-1': 'DYNAMICS',
 'music-gcse-ocr-area-of-study-1-my-music-performance-adventure-1': 'PERFORM_B',
 'music-gcse-ocr-area-of-study-2-the-concerto-through-time-adventure-1': 'CONCERTO',
 'music-gcse-ocr-area-of-study-3-rhythms-of-the-world-adventure-1': None,  # parallel world traditions; no objective ordering
 'music-gcse-ocr-area-of-study-4-film-music-adventure-1': 'FILM_B',
 'music-gcse-ocr-area-of-study-5-conventions-of-pop-adventure-1': 'POPCONV',
 'music-gcse-ocr-component-integrated-portfolio-adventure-1': 'COMPOSE_A',
 'music-gcse-ocr-component-listening-and-appraising-adventure-1': 'ERAS_B',
 'music-gcse-ocr-component-practical-component-adventure-1': 'PERFORM_A',
 'music-gcse-performing-adventure-1': 'PERFORM_B',
 'music-gcse-popular-music-since-1960-adventure-1': 'POP60',
 'music-gcse-western-classical-tradition-adventure-1': 'ERAS_C',
 # ---- music ibdp ----
 'music-ibdp-hl-areas-of-inquiry-music-for-dramatic-impact-movement-and-entertainment-adventure-1': 'DRAMATIC',
 'music-ibdp-hl-areas-of-inquiry-music-for-listening-and-performance-adventure-1': 'ERAS_A',
 'music-ibdp-hl-areas-of-inquiry-music-for-sociocultural-and-political-expression-adventure-1': 'PROTEST',
 'music-ibdp-hl-areas-of-inquiry-music-technology-in-the-electronic-and-digital-age-adventure-1': 'ETECH',
 'music-ibdp-hl-experimenting-with-music-adventure-1': 'EXPERIMENT_IB',
 'music-ibdp-hl-exploring-music-in-context-adventure-1': 'EXPLORE_IB',
 'music-ibdp-hl-presenting-music-adventure-1': 'PRESENT_IB',
 'music-ibdp-hl-the-contemporary-music-maker-hl-project-adventure-1': 'CMM',
 'music-ibdp-sl-areas-of-inquiry-music-for-dramatic-impact-movement-and-entertainment-adventure-1': 'DRAMATIC',
 'music-ibdp-sl-areas-of-inquiry-music-for-listening-and-performance-adventure-1': 'ERAS_B',
 'music-ibdp-sl-areas-of-inquiry-music-for-sociocultural-and-political-expression-adventure-1': 'PROTEST',
 'music-ibdp-sl-areas-of-inquiry-music-technology-in-the-electronic-and-digital-age-adventure-1': 'ETECH',
 'music-ibdp-sl-experimenting-with-music-adventure-1': 'EXPERIMENT_IB',
 'music-ibdp-sl-exploring-music-in-context-adventure-1': 'EXPLORE_IB',
 'music-ibdp-sl-presenting-music-adventure-1': 'PRESENT_IB',
 # ---- music ks3 ----
 'music-ks3-elements-of-music-adventure-1': 'DYNAMICS',
 'music-ks3-genres--instruments-adventure-1': 'GENRES',
 'music-ks3-harmony--texture-adventure-1': 'ENSEMBLE',
 'music-ks3-instrument-families-adventure-1': 'SAXES',
 'music-ks3-music-from-around-the-world-adventure-1': None,  # parallel world traditions; no objective ordering
 'music-ks3-musical-notation-adventure-1': 'TREBLE',
 'music-ks3-notation--structure-adventure-1': 'SONGSTRUCT',
 'music-ks3-pitch--dynamics-adventure-1': 'DYNAMICS',
 'music-ks3-rhythm--melody-adventure-1': 'NOTEVALS',
 'music-ks3-tempo--timing-adventure-1': 'TEMPO',
 'music-ks3-voice--singing-adventure-1': 'VOICES',
 # ---- spanish a-level ----
 'spanish-a-level-advanced-grammar-terms-adventure-1': 'TENSES_A',
 'spanish-a-level-aqa-artistic-culture-in-the-hispanic-world-adventure-1': 'ARTCULTURE',
 'spanish-a-level-aqa-aspects-of-hispanic-society-modern-and-traditional-values-adventure-1': 'VALUES',
 'spanish-a-level-aqa-aspects-of-political-life-in-the-hispanic-world-adventure-1': 'AQAPOL',
 'spanish-a-level-aqa-individual-research-project-adventure-1': 'IRP',
 'spanish-a-level-aqa-literary-texts-and-films-adventure-1': 'ESSAY_A',
 'spanish-a-level-aqa-multiculturalism-in-hispanic-society-adventure-1': 'MULTICULT',
 'spanish-a-level-ccea-unit-1-speaking-adventure-1': 'SPEAKING',
 'spanish-a-level-ccea-unit-2-listening-reading-and-use-of-spanish-adventure-1': 'TENSES_B',
 'spanish-a-level-ccea-unit-3-extended-writing-film-and-literature-adventure-1': 'ESSAY_B',
 'spanish-a-level-ccea-unit-4-as-themes-relationships;-culture-and-lifestyle-adventure-1': 'DAILY_A',
 'spanish-a-level-ccea-unit-5-a2-themes-young-people-in-society;-our-place-in-a-changing-world-adventure-1': 'LIFESTAGES_A',
 'spanish-a-level-cinema--media-vocabulary-adventure-1': 'CINEMA',
 'spanish-a-level-edexcel-independent-research-project-adventure-1': 'IRP',
 'spanish-a-level-edexcel-literature-and-film-study-adventure-1': 'ESSAY_A',
 'spanish-a-level-edexcel-theme-1-evolution-of-spanish-society-adventure-1': 'SOCEVOL',
 'spanish-a-level-edexcel-theme-2-political-and-artistic-culture-in-the-spanish-speaking-world-adventure-1': 'EDEXART',
 'spanish-a-level-edexcel-theme-3-immigration-and-the-spanish-speaking-multicultural-society-adventure-1': 'IMMIG',
 'spanish-a-level-edexcel-theme-4-the-franco-dictatorship-and-transition-to-democracy-adventure-1': 'FRANCO',
 'spanish-a-level-latin-american-identity-adventure-1': 'LATAM',
 'spanish-a-level-literary-analysis-terms-adventure-1': 'NARRATIVE',
 'spanish-a-level-politics--society-adventure-1': 'POLITICS',
 'spanish-a-level-spanish-civil-war-history-adventure-1': 'CIVILWAR',
 # ---- spanish gcse ----
 'spanish-gcse-aqa-theme-1-people-and-lifestyle-identity-and-relationships;-healthy-living-and-lifestyle;-education-and-work-adventure-1': 'EDLADDER_A',
 'spanish-gcse-aqa-theme-2-popular-culture-free-time-activities;-customs-festivals-and-celebrations;-celebrity-culture-adventure-1': 'FIESTAS',
 'spanish-gcse-aqa-theme-3-communication-and-the-world-around-us-travel-and-tourism;-media-and-technology;-the-environment-and-where-people-live-adventure-1': 'JOURNEY_A',
 'spanish-gcse-cambridge-igcse-area-a-everyday-activities-adventure-1': 'DAILY_B',
 'spanish-gcse-cambridge-igcse-area-b-personal-and-social-life-adventure-1': 'FAMGEN',
 'spanish-gcse-cambridge-igcse-area-c-the-world-around-us-adventure-1': 'SCALE_A',
 'spanish-gcse-cambridge-igcse-area-d-the-world-of-work-adventure-1': 'EDLADDER_B',
 'spanish-gcse-cambridge-igcse-area-e-the-international-world-adventure-1': 'JOURNEY_B',
 'spanish-gcse-ccea-context-1-identity-lifestyle-and-culture-adventure-1': 'FIESTAS',
 'spanish-gcse-ccea-context-2-local-national-international-and-global-areas-of-interest-adventure-1': 'SCALE_B',
 'spanish-gcse-ccea-context-3-school-life-studies-and-the-world-of-work-adventure-1': 'EDLADDER_A',
 'spanish-gcse-common-verbs-present-adventure-1': 'CONJUG',
 'spanish-gcse-edexcel-igcse-topic-1-home-and-abroad-adventure-1': 'JOURNEY_A',
 'spanish-gcse-edexcel-igcse-topic-2-education-and-employment-adventure-1': 'EDLADDER_B',
 'spanish-gcse-edexcel-igcse-topic-3-personal-life-and-relationships-adventure-1': 'LIFESTAGES_B',
 'spanish-gcse-edexcel-igcse-topic-4-the-world-around-us-adventure-1': 'SCALE_A',
 'spanish-gcse-edexcel-igcse-topic-5-social-activities-fitness-and-health-adventure-1': 'SPORTDAY',
 'spanish-gcse-edexcel-theme-1-my-personal-world-adventure-1': 'FAMGEN',
 'spanish-gcse-edexcel-theme-2-lifestyle-and-wellbeing-adventure-1': 'DAILY_A',
 'spanish-gcse-edexcel-theme-3-my-neighbourhood-adventure-1': 'SCALE_C',
 'spanish-gcse-edexcel-theme-4-media-and-technology-adventure-1': 'MEDIATECH',
 'spanish-gcse-edexcel-theme-5-studying-and-my-future-adventure-1': 'EDLADDER_A',
 'spanish-gcse-edexcel-theme-6-travel-and-tourism-adventure-1': 'JOURNEY_A',
 'spanish-gcse-environment--issues-adventure-1': 'PLANET',
 'spanish-gcse-healthy-lifestyle-adventure-1': 'MEALS',
 'spanish-gcse-identity--relationships-adventure-1': 'FAMGEN',
 'spanish-gcse-local-area-vocabulary-adventure-1': 'SCALE_C',
 'spanish-gcse-ocr-theme-1-people-and-lifestyle-adventure-1': 'DAILY_B',
 'spanish-gcse-ocr-theme-2-popular-culture-adventure-1': 'FIESTAS',
 'spanish-gcse-ocr-theme-3-communication-and-the-world-around-us-adventure-1': 'MEDIATECH',
 'spanish-gcse-school-life-adventure-1': 'SCHOOLDAY',
 'spanish-gcse-vocabulary-games-adventure-1': 'NUMBERS',
 # ---- spanish ibdp ----
 'spanish-ibdp-advanced-grammar-adventure-1': 'TENSES_B',
 'spanish-ibdp-experiences-adventure-1': 'JOURNEY_B',
 'spanish-ibdp-hl-literature-two-works-studied-adventure-1': 'NARRATIVE',
 'spanish-ibdp-human-ingenuity-adventure-1': 'INGENUITY',
 'spanish-ibdp-identities-adventure-1': 'LIFESTAGES_A',
 'spanish-ibdp-latin-american-identity-adventure-1': 'LATAM',
 'spanish-ibdp-literary-texts-hl-adventure-1': 'ESSAY_B',
 'spanish-ibdp-sharing-the-planet-adventure-1': 'PLANET',
 'spanish-ibdp-social-organization-adventure-1': 'EDLADDER_B',
 # ---- spanish ks3 ----
 'spanish-ks3-classroom-objects-adventure-1': 'CLASSROOM',
 'spanish-ks3-colours--adjectives-adventure-1': 'RAINBOW',
 'spanish-ks3-family-members-adventure-1': 'FAMGEN_KS3',
 'spanish-ks3-greetings--introductions-adventure-1': 'GREET',
 'spanish-ks3-numbers--days-adventure-1': 'DAYS',
 'spanish-ks3-sports--hobbies-adventure-1': 'SPORTS',
}

# ---------------- validate pools ----------------
for k, seq in S.items():
    assert 5 <= len(seq) <= 6, (k, len(seq))
    terms = [t for t, d in seq]
    assert len(set(terms)) == len(terms), ('dup terms', k)
    for t, d in seq:
        assert t and d, (k, t)
        assert len(t) <= 55, ('term too long', k, t, len(t))
        assert len(d) <= 85, ('def too long', k, d, len(d))

stems = open('_seq_work/batch8.txt').read().split()
assert set(A) == set(stems), (set(A) ^ set(stems))

done = skipped = 0
for stem in stems:
    key = A[stem]
    path = f'adventures/_specs/{stem}.json'
    if key is None:
        skipped += 1
        print('SKIP', stem)
        continue
    with open(path, encoding='utf-8') as f:
        d = json.load(f)
    d['sequence'] = [{"term": t, "def": df} for t, df in S[key]]
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(d, f, ensure_ascii=False, separators=(',', ': '))
    done += 1
print('authored:', done, 'skipped:', skipped)
