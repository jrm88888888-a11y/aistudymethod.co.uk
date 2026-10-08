#!/usr/bin/env python3
"""Build the A-Level revision-games landing pages from the arcade's own data.

Usage (from anywhere):  python3 tools/build-alevel-games-pages.py [--check]

Writes (repo root):
    alevel-revision-games.html                 hub
    alevel-<subject>-revision-games.html       one per subject with an A-Level shelf

Sources (read only):
    classcraft/arcade/index.js                 window.ARCADE_INDEX - subjects, boards, topics
    classcraft/arcade/vocab/<s>-a-level.json   key terms per topic (what the term games load)
    classcraft/arcade.html                     the 22 cabinets (QUIZ_GAMES + TERMS_GAMES), subject icons
    classcraft/adventures/_specs/*.json        the example question on the hub
    gcse-biology-revision-games.html           shared chrome for subject pages: CSS, Plausible,
                                               nav, Revision Arcade banner, footer
    gcse-revision-games.html                   shared chrome for the hub

Every number on the pages is computed here from those files, so re-run this
whenever the arcade's A-Level shelves change. The page chrome is lifted from
the GCSE pages at build time so the two families stay visually identical.
"""
import html, json, os, re, sys

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
SITE = "https://aistudymethod.com/"
CHECK = "--check" in sys.argv
E = lambda s: html.escape(str(s), quote=True)

# ---------------------------------------------------------------- data
src = open("classcraft/arcade/index.js", encoding="utf-8").read()
INDEX = json.loads(src[src.index("{"):].rstrip().rstrip(";"))
ARC = open("classcraft/arcade.html", encoding="utf-8").read()

ICONS = dict(re.findall(r"'([a-z-]+)':'([^']+)'",
                        re.search(r"const SUBJECT_ICONS = \{(.*?)\};", ARC, re.S).group(1)))

def cabinets(name):
    block = re.search(r"const %s = \[(.*?)\n\];" % name, ARC, re.S).group(1)
    out = [{"id": a, "n": re.sub(r"<br>", " ", n).title(),
            "i": i, "d": d}
           for a, n, i, d in re.findall(
               r"\{ id:'([^']+)',\s*n:'([^']+)',\s*i:'([^']+)',\s*c:'[^']*',\s*d:'([^']*)'", block)]
    return out

QUIZ_GAMES, TERMS_GAMES = cabinets("QUIZ_GAMES"), cabinets("TERMS_GAMES")
N_GAMES = len(QUIZ_GAMES) + len(TERMS_GAMES)
assert N_GAMES == 22, "cabinet count changed (%d) - review the page copy" % N_GAMES
GAME = {g["id"]: g for g in QUIZ_GAMES + TERMS_GAMES}
# Proper-case cabinet names that .title() mangles
for gid, nm in {"two-truths": "Two Truths, One Lie", "odd-one": "Odd One Out", "higher-lower": "Higher or Lower",
                "pacman": "Pac-Man Vocab", "termguess": "Term Guess", "word-web": "Word Web",
                "claw": "The Claw", "quiz": "Vocab Quiz", "hangman": "System Breach",
                "spaceinvaders": "Space Invaders", "sequence": "Sort the Sequence"}.items():
    GAME[gid]["n"] = nm

# Display names: the arcade's own labels, with house-style fixes the revise hubs already use
NAME = {"art-design": "Art and Design", "business-studies": "Business", "design-technology": "Design and Technology",
        "food-technology": "Nutrition and Food Science", "pe": "PE"}
# URL slug overrides (default: the arcade subject id)
SLUG = {"food-technology": "nutrition-food-science"}

# One-line subject hook (standfirst) and why-games callout. Kept general so it
# holds for every board's topic list; no statistics, no promises.
COPY = {
 "art-design": ("A-Level Art and Design is judged on your practice, but the critical and written side still needs the right vocabulary — movements, techniques, materials and the language of analysis.",
                "annotation and critical writing flow faster when the terms are automatic. Short rounds of retrieval practice on movements, processes and analytical vocabulary build that fluency without eating into studio time."),
 "biology": ("A-Level Biology is dense with precise terminology — molecules, structures and processes you have to name exactly.",
             "mark schemes reward the exact word. Two-minute rounds of retrieval practice make that terminology stick far better than reading it over again."),
 "business-studies": ("A-Level Business rewards confident use of the subject's language — the terms and models behind every decision you analyse and evaluate.",
                      "essays and data-response answers go further when definitions come without effort. Quick retrieval rounds keep the key terms sharp, so your thinking time goes on analysis and evaluation."),
 "chemistry": ("A-Level Chemistry is built on definitions you have to know exactly — the terms behind every explanation, mechanism and calculation.",
               "you can't explain a trend or a mechanism with a half-remembered definition. Short retrieval rounds make the core definitions automatic, so they're there when a long question needs them."),
 "computer-science": ("A-Level Computer Science mixes theory and terminology — data structures, algorithms, architecture, networks and more — that you need to recall precisely.",
                      "theory questions are often won or lost on precise definitions. Quick retrieval rounds fix the terms so you can spend your revision time on programming and problem-solving."),
 "design-technology": ("A-Level Design and Technology covers materials, processes and design theory, and each comes with its own technical vocabulary.",
                       "written papers expect the correct technical term, not a description of it. Short retrieval rounds build that vocabulary alongside your practical work."),
 "economics": ("A-Level Economics depends on using its concepts precisely — the definitions behind every diagram, chain of analysis and evaluation.",
               "a chain of analysis is only as strong as its definitions. Quick retrieval rounds keep the core concepts automatic, so your essays can focus on application and evaluation."),
 "english-language": ("A-Level English Language asks you to analyse texts with accurate linguistic terminology.",
                      "analysis is sharper when you can name exactly what a writer or speaker is doing. Short retrieval rounds make the frameworks and terms second nature."),
 "english-literature": ("A-Level English Literature rewards a precise critical vocabulary — the terms for form, structure, genre and context that make analysis sharp.",
                        "the right critical term lets you say more in fewer words. Short retrieval rounds keep that vocabulary ready for timed essays."),
 "environmental-science": ("A-Level Environmental Science spans living systems, physical systems, resources and sustainability, each with its own key terms.",
                           "a broad specification means a lot of terminology to hold at once. Short retrieval rounds keep every topic's key terms fresh, not just the one you revised last."),
 "food-technology": ("A-Level Nutrition and Food Science covers nutrition, diet and health, with technical terms you need to use accurately.",
                     "precise nutritional and scientific terms make answers clearer and more credible. Short retrieval rounds keep them at your fingertips."),
 "french": ("A-Level French themes each bring vocabulary you need at your fingertips.",
            "vocabulary is the raw material for every skill you're assessed on. Short, frequent retrieval rounds keep each theme's words active instead of letting them fade."),
 "geography": ("A-Level Geography spans physical and human systems, and every topic has key terms and concepts you need to use precisely.",
               "precise terminology turns a description into an explanation. Short retrieval rounds keep each topic's key terms ready for longer answers."),
 "history": ("A-Level History needs secure knowledge of the key terms, people and developments across your chosen units.",
             "an argument needs secure knowledge underneath it. Short retrieval rounds keep the key terms and developments of each unit fresh, so your essay time goes on judgement."),
 "maths": ("A-Level Maths has a vocabulary of its own — the definitions, notation and key results that every problem builds on.",
           "these games drill the language of the course — definitions, notation and key results — rather than long calculations. Knowing those cold frees up working memory for the problem-solving itself."),
 "music": ("A-Level Music asks you to describe what you hear and analyse set works using precise musical vocabulary.",
           "listening and analysis questions reward the exact term. Short retrieval rounds keep the vocabulary of harmony, texture, structure and context ready to use."),
 "pe": ("A-Level PE combines science and social science, each with terminology you need to apply accurately.",
        "applied questions are easier when the terms are automatic. Short retrieval rounds keep the key vocabulary of each topic ready to use in longer answers."),
 "physics": ("A-Level Physics depends on precise definitions — of quantities, laws and principles — that explanations and calculations build on.",
             "many marks go on stating a definition or law exactly. Short retrieval rounds make those statements automatic."),
 "psychology": ("A-Level Psychology asks you to know approaches, key terms, studies and research methods precisely.",
                "evaluation is easier when the basics are secure. Short retrieval rounds keep each topic's key terms ready for application and essay questions."),
 "religious-studies": ("A-Level Religious Studies asks for precise use of philosophical, ethical and theological terms.",
                       "arguments in philosophy, ethics and religion depend on exact definitions. Short retrieval rounds keep the key terms clear and ready for essays."),
 "sociology": ("A-Level Sociology rewards confident use of concepts and theories — the vocabulary behind every perspective and debate.",
               "applying a theory starts with its key concepts. Short retrieval rounds keep them sharp, so essays can focus on analysis and evaluation."),
 "spanish": ("A-Level Spanish themes each bring vocabulary you need at your fingertips.",
             "vocabulary is the raw material for every skill you're assessed on. Short, frequent retrieval rounds keep each theme's words active instead of letting them fade."),
 "german": ("A-Level German themes each bring vocabulary you need at your fingertips.",
            "vocabulary is the raw material for every skill you're assessed on. Short, frequent retrieval rounds keep each theme's words active instead of letting them fade."),
}
GROUPS = [["biology", "chemistry", "physics", "maths", "computer-science", "environmental-science"],
          ["history", "geography", "economics", "business-studies", "psychology", "sociology", "religious-studies"],
          ["english-literature", "english-language", "french", "spanish", "german"],
          ["art-design", "music", "design-technology", "pe", "food-technology"]]

SUBJECTS = []
for sx in INDEX["subjects"]:
    lv = next((l for l in sx.get("levels", []) if l["id"] == "a-level"), None)
    if not lv or not lv.get("boards"):
        continue
    sid = sx["id"]
    vpath = "classcraft/arcade/vocab/%s-a-level.json" % sid
    vtopics = json.load(open(vpath, encoding="utf-8")).get("topics", {}) if os.path.exists(vpath) else {}
    boards, slugs = [], set()
    for b in lv["boards"]:
        boards.append({"id": b["id"], "d": b["d"], "topics": [{"slug": t["slug"], "d": t["d"]} for t in b["topics"]]})
        slugs.update(t["slug"] for t in b["topics"])
    terms = sum(len(vtopics.get(s, {}).get("terms", [])) for s in slugs)
    if sid not in COPY:
        sys.exit("no copy for A-Level subject %r - add it to COPY" % sid)
    SUBJECTS.append({
        "id": sid, "name": NAME.get(sid, sx["d"]), "icon": ICONS.get(sid, "🎮"),
        "file": "alevel-%s-revision-games.html" % SLUG.get(sid, sid),
        "boards": boards, "n_topics": sum(len(b["topics"]) for b in boards), "n_terms": terms,
        "revise": "revise/alevel-%s.html" % sid if os.path.exists("revise/alevel-%s.html" % sid) else None,
        "gcse": "gcse-%s-revision-games.html" % sid if os.path.exists("gcse-%s-revision-games.html" % sid) else None,
    })
BYID = {s["id"]: s for s in SUBJECTS}
ALL_BOARDS = []
for s in SUBJECTS:
    for b in s["boards"]:
        if b["d"] not in ALL_BOARDS:
            ALL_BOARDS.append(b["d"])
ALL_BOARDS.sort()
TOTAL_TOPICS = sum(s["n_topics"] for s in SUBJECTS)
TOTAL_TERMS = sum(s["n_terms"] for s in SUBJECTS)

def and_list(xs):
    xs = list(xs)
    return xs[0] if len(xs) == 1 else ", ".join(xs[:-1]) + " and " + xs[-1]

def arcade(sid, board=None, topic=None):
    q = "subject=%s&amp;level=a-level" % sid
    if board: q += "&amp;board=" + board
    if topic: q += "&amp;topic=" + topic
    return "classcraft/arcade.html?" + q + "&amp;at=top"

# ---------------------------------------------------------------- chrome from the GCSE pages
def chrome(path):
    s = open(path, encoding="utf-8").read()
    def cut(a, b, inclusive=True, start=0):
        i = s.index(a, start); j = s.index(b, i + len(a))
        return s[i:j + len(b)] if inclusive else s[i + len(a):j]
    c = {
        "style": cut("<style>", "</style>", inclusive=False),
        "plausible": re.search(r"(?:<!-- Privacy-friendly analytics by Plausible -->\n)?<script async src=\"https://plausible\.io/.*?</script>\n<script>.*?</script>", s, re.S).group(0),
        "nav": cut("<nav>", "</nav>"),
        "banner": cut('<a href="classcraft/arcade.html" class="arcade-banner"', "\n</a>"),
        "footer": cut("<footer>", "</footer>"),
        "fonts": cut('<link rel="stylesheet" href="style.css">', 'display=swap" rel="stylesheet">'),
    }
    return c

SUB_CHROME = chrome("gcse-biology-revision-games.html")
HUB_CHROME = chrome("gcse-revision-games.html")

def head(c, title, desc, url, og_title, og_desc, tw_desc, style_extra="", ld=None):
    if len(desc) > 165:
        print("  ! description %d chars: %s" % (len(desc), url))
    out = ['<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n'
           '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n',
           '<title>%s</title>\n' % E(title),
           '<meta name="description" content="%s">\n' % E(desc),
           '<meta name="robots" content="index,follow">\n',
           '<link rel="canonical" href="%s">\n' % url,
           '<link rel="icon" type="image/svg+xml" href="/favicon.svg">\n<link rel="apple-touch-icon" href="/apple-touch-icon.png">\n',
           '<meta property="og:type" content="website">\n<meta property="og:site_name" content="AI Study Method">\n',
           '<meta property="og:title" content="%s">\n' % E(og_title),
           '<meta property="og:description" content="%s">\n' % E(og_desc),
           '<meta property="og:url" content="%s">\n' % url,
           '<meta property="og:image" content="https://aistudymethod.com/og-share.png">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n',
           '<meta name="twitter:card" content="summary_large_image">\n',
           '<meta name="twitter:title" content="%s">\n' % E(og_title),
           '<meta name="twitter:description" content="%s">\n' % E(tw_desc),
           '<meta name="twitter:image" content="https://aistudymethod.com/og-share.png">\n',
           c["fonts"] + "\n",
           "<style>" + c["style"].rstrip() + "\n" + style_extra + "</style>\n",
           c["plausible"] + "\n"]
    if ld:
        out.append('<script type="application/ld+json">\n%s\n</script>\n' % json.dumps(ld, ensure_ascii=False, indent=1))
    out.append("</head>\n<body>\n")
    return "".join(out)

def faq_ld(qas):
    return {"@context": "https://schema.org", "@type": "FAQPage",
            "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in qas]}

def tail(c):
    return c["footer"] + '\n<script src="script.js"></script>\n</body>\n</html>\n'

# ---------------------------------------------------------------- subject page
SUB_CSS = """  /* A-Level games pages: board headings + computed stats strip */
  .ag-stats{display:flex;gap:1.4rem;flex-wrap:wrap;margin:0 0 22px;}
  .ag-stats .s{display:flex;flex-direction:column;}
  .ag-stats .n{font-family:'Playfair Display',serif;font-size:23px;font-weight:700;color:var(--text-primary);line-height:1;}
  .ag-stats .l{font-family:'DM Mono',monospace;font-size:10.5px;letter-spacing:.5px;text-transform:uppercase;color:var(--text-muted);margin-top:5px;}
  .board-h{font-family:'DM Mono',monospace;font-size:13px;letter-spacing:1.2px;text-transform:uppercase;color:var(--accent);font-weight:700;margin:26px 0 0;}
  .board-h a{color:inherit;text-decoration:none;}
  .board-h a:hover{text-decoration:underline;}
  .topic-grid a{font-size:15px;line-height:1.35;}
  .topic-grid a .go{white-space:nowrap;}
  .format-grid .fmt p.names{font-size:14px;color:var(--text-primary);margin-top:8px;}
"""

def stats_html(items):
    return '<div class="ag-stats">' + "".join(
        '<div class="s"><span class="n">%s</span><span class="l">%s</span></div>' % (n, l) for n, l in items) + "</div>"

def subject_page(s):
    nm, sid = s["name"], s["id"]
    url = SITE + s["file"]
    bnames = [b["d"] for b in s["boards"]]
    nb, nt = len(s["boards"]), s["n_topics"]
    board_phrase = and_list(bnames)
    hook, why = COPY[sid]
    title = "Free A-Level %s Revision Games — No Login, No Sign-Up — AI Study Method" % nm
    desc = "Free A-Level %s revision games — no login, no download. %d topics for %s, through %d quick game formats." % (nm, nt, board_phrase, N_GAMES)
    if len(desc) > 160:
        desc = "Free A-Level %s revision games — no login, no download. %d topics across %d exam boards, %d game formats." % (nm, nt, nb, N_GAMES)
    og_title = "Free A-Level %s Revision Games — No Login, No Sign-Up" % nm
    og_desc = "Free A-Level %s revision games — no account, no email, no download. %d topics for %s, through %d game formats. Just pick your board and play." % (nm, nt, board_phrase, N_GAMES)
    tw_desc = "Free A-Level %s revision games — no account, no email. %d topics, %d formats, any device." % (nm, nt, N_GAMES)

    per_board = and_list(["%d for %s" % (len(b["topics"]), b["d"]) for b in s["boards"]])
    if nb > 1:
        q2 = ("The Arcade has A-Level %s topics for %s — %s, %d in all. Every one is listed on this page, grouped by board."
              % (nm, board_phrase, per_board, nt))
        q3 = ("Does it cover my exam board (%s)?" % ", ".join(bnames),
              "The A-Level %s shelves cover %s. Pick your board in the Arcade and the topic list changes to match it." % (nm, board_phrase))
    else:
        q2 = ("The Arcade has %d A-Level %s topics, following the %s topic list. Every one is listed on this page."
              % (nt, nm, bnames[0]))
        q3 = ("Does it cover my exam board?",
              "At the moment the A-Level %s shelf follows %s only. If you're on another board, pick the topics that match your course." % (nm, bnames[0]))
    qas = [("Are the A-Level %s games free?" % nm,
            "Yes — free to play, with no login, no email and no download. An account is optional — you never need one to play."),
           ("Which A-Level %s topics are covered?" % nm, q2), q3,
           ("Do the %s games work on a phone?" % nm, "Yes. They run in any browser on phones, tablets and laptops — nothing to install.")]

    o = [head(SUB_CHROME, title, desc, url, og_title, og_desc, tw_desc, SUB_CSS, faq_ld(qas)),
         SUB_CHROME["nav"], "\n\n", SUB_CHROME["banner"], "\n\n"]
    o.append('<header class="guide-hero">\n <div class="guide-wrap">\n'
             '  <div class="guide-kicker">Free Revision Games · A-Level %s</div>\n' % E(nm) +
             '  <h1 class="guide-h1">Free A-Level %s Revision Games — No Login, No Sign-Up</h1>\n' % E(nm) +
             '  <p class="guide-standfirst">%s These games turn that into quick retrieval practice: %d game formats, %d topic%s for %s. No account, no email, no download.</p>\n'
             % (E(hook), N_GAMES, nt, "s" if nt != 1 else "", E(board_phrase)) +
             '  ' + stats_html([(nt, "Topics"), (nb, "Exam board" + ("s" if nb != 1 else "")),
                                ("{:,}".format(s["n_terms"]), "Key terms"), (N_GAMES, "Game formats")]) + "\n" +
             '  <div class="hero-cta-row">\n'
             '   <a href="%s" class="btn-primary">Play %s games →</a>\n' % (arcade(sid), E(nm)) +
             '   <a href="alevel-revision-games.html" class="btn-outline">All A-Level subjects</a>\n'
             '  </div>\n </div>\n</header>\n\n<div class="guide-body">\n\n')
    o.append(' <div class="callout"><p><strong>Why games help with A-Level %s:</strong> %s</p></div>\n\n' % (E(nm), E(why)))
    o.append(' <h2>Pick your board and topic</h2>\n')
    o.append(' <p>Each topic opens the Revision Arcade with your subject, board and topic already chosen — the games then pull that topic\'s key terms and questions.</p>\n')
    for b in s["boards"]:
        o.append('\n <h3 class="board-h" id="%s"><a href="%s">%s · %d topic%s</a></h3>\n <div class="topic-grid">\n'
                 % (b["id"], arcade(sid, b["id"]), E(b["d"]), len(b["topics"]), "s" if len(b["topics"]) != 1 else ""))
        for t in b["topics"]:
            o.append('  <a href="%s">%s <span class="go">Play →</span></a>\n' % (arcade(sid, b["id"], t["slug"]), E(t["d"])))
        o.append(" </div>\n")
    quiz_names = " · ".join(GAME[g["id"]]["n"] for g in QUIZ_GAMES)
    term_names = " · ".join(GAME[g["id"]]["n"] for g in TERMS_GAMES)
    o.append('\n <h2>The game formats</h2>\n'
             ' <p>The Arcade has %d game formats, so you meet the same ideas in lots of different ways — recognising them, recalling them and using them under time pressure:</p>\n\n'
             ' <div class="format-grid">\n'
             '  <div class="fmt"><h4>%d question games</h4><p>Spot the lie, find the odd one out, stake your chips, race a ghost — built from the topic\'s key ideas.</p><p class="names">%s</p></div>\n'
             '  <div class="fmt"><h4>%d key-term games</h4><p>Match, spell, unscramble and shoot down the topic\'s key terms and definitions.</p><p class="names">%s</p></div>\n'
             ' </div>\n'
             ' <p>A few formats need a particular kind of content, so they open only where the topic has it — Sort the Sequence needs a true order, and Higher or Lower needs real numbers.</p>\n'
             % (N_GAMES, len(QUIZ_GAMES), E(quiz_names), len(TERMS_GAMES), E(term_names)))
    o.append('\n <h2>How it fits your revision</h2>\n'
             ' <p>Games are the lowest-effort way to <em>test</em> yourself, and testing — not re-reading — is what shows you what you really know. A few rounds on a topic quickly show which parts are solid and which have gaps. When a game keeps catching you out on the same term, that\'s your signal to go back and learn it properly, then return and prove it\'s fixed.</p>\n')
    rel = []
    if s["revise"]:
        rel.append('the free <a href="%s">A-Level %s revision guide</a> covers the key concepts and common mistakes topic by topic' % (s["revise"], E(nm)))
    p = ' <p>For the depth to go with the drilling, '
    if rel:
        p += rel[0] + ', and the <a href="velvet-method.html">Velvet Method</a> and our <a href="courses.html">courses</a> show you how to use AI to explain a tricky idea, quiz you and mark your answers — the games stay free either way.</p>\n'
    else:
        p += 'the <a href="velvet-method.html">Velvet Method</a> and our <a href="courses.html">courses</a> show you how to use AI to explain a tricky idea, quiz you and mark your answers — the games stay free either way.</p>\n'
    o.append(p)
    o.append('\n <div class="cta-box">\n  <h3>No account. No email. Just play.</h3>\n'
             '  <p>Jump into the %s games now, or explore free games for every other A-Level subject.</p>\n'
             '  <div class="cta-row">\n   <a href="%s" class="btn-primary">Play %s games →</a>\n'
             '   <a href="alevel-revision-games.html" class="btn-outline">All A-Level subjects</a>\n  </div>\n </div>\n'
             % (E(nm), arcade(sid), E(nm)))
    o.append('\n <h2>Questions students ask</h2>\n')
    for q, a in qas:
        o.append('\n <p class="faq-q">%s</p>\n <p>%s</p>\n' % (E(q), E(a)))
    grp = next(g for g in GROUPS if sid in g)
    sibs = [BYID[x] for x in grp if x != sid and x in BYID][:3]
    o.append('\n <p style="margin-top:26px;font-size:15px;color:var(--text-muted);">Other A-Level subjects: %s</p>\n'
             % " · ".join('<a href="%s">A-Level %s games</a>' % (x["file"], E(x["name"])) for x in sibs))
    related = ['<a href="alevel-revision-games.html">All free A-Level revision games</a>']
    if s["gcse"]:
        related.append('<a href="%s">GCSE %s games</a>' % (s["gcse"], E(nm if sid != "business-studies" else "Business Studies")))
    if s["revise"]:
        related.append('<a href="%s">A-Level %s revision guide</a>' % (s["revise"], E(nm)))
    else:
        related.append('<a href="subjects.html">Velvet Revision hub</a>')
    o.append(' <p style="margin-top:8px;font-size:15px;color:var(--text-muted);">Related: %s</p>\n\n</div>\n\n' % " · ".join(related))
    o.append(tail(SUB_CHROME))
    return "".join(o)

# ---------------------------------------------------------------- hub
def example_question():
    """A real A-Level question from the arcade's specs, for the hero mock-up."""
    spec = json.load(open("classcraft/adventures/_specs/biology-a-level-aqa-genetic-information-variation-adventure-1.json", encoding="utf-8"))
    for m in spec["mcqs"]:
        if "degenerate" in m["q"]:
            return spec["topic_display"], m
    sys.exit("example question not found - pick another in example_question()")

SHOWCASE = ["boss-rush", "two-truths", "odd-one", "connections", "wager", "ghost-race",
            "pairs", "termguess", "crossword", "spaceinvaders"]

def hub_page():
    url = SITE + "alevel-revision-games.html"
    ns = len(SUBJECTS)
    boards = and_list(ALL_BOARDS)
    title = "Free A-Level Revision Games — No Login, No Sign-Up — AI Study Method"
    desc = "Free A-Level revision games — no login, no sign-up, no download. %d game formats across %d subjects and %s topics. Just click and play." % (N_GAMES, ns, "{:,}".format(TOTAL_TOPICS))
    og_title = "Free A-Level Revision Games — No Login, No Sign-Up"
    og_desc = "%d free A-Level revision game formats — no account, no email, no download. %d subjects, %s board-specific topics, on any device." % (N_GAMES, ns, "{:,}".format(TOTAL_TOPICS))
    qas = [("Are the A-Level games really free?",
            "Yes — completely free. There's no payment, and you don't need an account or an email to play."),
           ("Do I need to sign up or log in?",
            "No. There's no login, no sign-up and no download. Open the Arcade, pick your subject, board and topic, and start playing."),
           ("Which A-Level subjects and exam boards are covered?",
            "%d A-Level subjects — %s — with topics for %s. Which boards a subject covers varies; each subject page lists its boards and every topic."
            % (ns, and_list(x["name"] for x in sorted(SUBJECTS, key=lambda x: x["name"])), boards)),
           ("Do they work on a phone?",
            "Yes. The games run in any browser and work on phones, tablets, laptops and desktops — nothing to install."),
           ("Are these the same games as the GCSE ones?",
            "Same Arcade and the same %d game formats, but the A-Level shelves have their own topics, key terms and questions for each board." % N_GAMES)]
    tdisp, mq = example_question()
    opts = "".join('<div class="cab-opt%s">%s</div>' % (" correct" if c else "", E(t)) for t, c in mq["options"])

    o = [head(HUB_CHROME, title, desc, url, og_title, og_desc, og_desc,
              "  .cab-opt{font-size:12px;line-height:1.35;}\n  .alt-level{margin-top:1.2rem;font-size:15px;color:var(--text-secondary);}\n",
              faq_ld(qas)),
         HUB_CHROME["nav"], "\n\n", HUB_CHROME["banner"], "\n\n"]
    o.append('''<section class="g-hero">
  <div class="inner">
    <div>
      <span class="label"><span style="width:6px;height:6px;background:var(--accent);border-radius:50%;display:inline-block;"></span> Free A-Level Revision Games</span>
      <h1>A-Level revision that doesn't <em>feel</em> like revision.</h1>
      <p class="lead">''' + "%d quick game formats that turn A-Level topics into retrieval practice you'll actually want to do — %d subjects, with topics for %s. No login, no sign-up, no email &mdash; just pick a subject and play." % (N_GAMES, ns, E(boards)) + '''</p>
      <div class="g-cta">
        <a href="classcraft/arcade.html" class="btn-primary">Play the Arcade &rarr;</a>
        <a href="#browse-subjects" class="btn-secondary">Pick your subject</a>
      </div>
      <div class="g-stats">
        <div class="s"><span class="n">''' + str(N_GAMES) + '''</span><span class="l">Game formats</span></div>
        <div class="sep"></div>
        <div class="s"><span class="n">''' + str(ns) + '''</span><span class="l">A-Level subjects</span></div>
        <div class="sep"></div>
        <div class="s"><span class="n">''' + "{:,}".format(TOTAL_TOPICS) + '''</span><span class="l">Topics, all boards</span></div>
        <div class="sep"></div>
        <div class="s"><span class="n">&pound;0</span><span class="l">No login</span></div>
      </div>
    </div>
    <div class="cab">
      <span class="cab-badge">Example question</span>
      <div class="cab-screen">
        <div class="cab-top"><span class="sc">Score 1,240</span><span class="streak">&#128293; 6 streak</span></div>
        <div class="cab-q">''' + E(mq["q"]) + '''</div>
        <div class="cab-opts">''' + opts + '''</div>
        <div class="cab-bar"><i></i></div>
        <div class="cab-foot"><span>A-Level Biology &middot; ''' + E(tdisp) + '''</span><span>AQA</span></div>
      </div>
    </div>
  </div>
</section>

<section class="section method-band">
  <div class="section-inner">
    <div class="section-label">Not a distraction &mdash; part of the method</div>
    <div class="section-divider"></div>
    <h2 class="section-title">Where the games fit the <em>Velvet Method</em></h2>
    <p class="section-body">These aren't bolt-on time-fillers. Every game powers two of the six steps students run in the Velvet Method &mdash; the two where grades are actually made.</p>
    <div class="mgrid">
      <div class="mcard"><div class="step">L</div><h3>Learn creatively</h3><p>Games fill knowledge gaps in the format that engages a student most &mdash; turning passive revision into active practice they'll come back to.</p></div>
      <div class="mcard"><div class="step">V</div><h3>Verify with retrieval</h3><p>Quizzing, matching and racing are retrieval practice &mdash; the &ldquo;testing effect,&rdquo; one of the most robust findings in cognitive science, and far stronger than re-reading.</p></div>
      <div class="mcard"><div class="step">&#8734;</div><h3>Built to be replayed</h3><p>Streaks, high scores and a daily drill make spaced repetition feel like a game instead of a chore &mdash; so it actually happens.</p></div>
    </div>
    <div style="margin-top:2rem;"><a href="velvet-method.html" class="btn-outline">See the full six-step method &rarr;</a></div>
  </div>
</section>

<section class="arcade">
  <div class="inner">
    <div class="eyebrow">The Arcade</div>
    <h2>Twenty-two ways to <em>practise</em>.</h2>
    <p class="sub">Pick a subject, board and topic, and every game pulls that topic's key terms and questions. Here are ten of them.</p>
    <div class="cabgrid">''')
    for gid in SHOWCASE:
        g = GAME[gid]
        o.append('<a class="gc" href="classcraft/arcade.html"><span class="ic">%s</span><div class="nm">%s</div><div class="bl">%s</div><span class="play">Play &rarr;</span></a>'
                 % (g["i"], E(g["n"]), E(g["d"])))
    o.append('''</div>
    <div class="allbtn"><a href="classcraft/arcade.html" class="neon-btn">&#127918; Open the full Arcade &rarr;</a></div>
  </div>
</section>

<section class="section">
  <div class="section-inner">
    <div class="section-label">No catch</div>
    <div class="section-divider"></div>
    <h2 class="section-title">Genuinely free. <em>Genuinely</em> no sign-up.</h2>
    <p class="section-body">A lot of &ldquo;free&rdquo; revision sites ask for an email before you can do anything. These don't.</p>
    <div class="vp">
      <div class="v"><div class="vi">&#128275;</div><h4>No account</h4><p>No login, no email, no password. Open a game and start.</p></div>
      <div class="v"><div class="vi">&#128241;</div><h4>Any device</h4><p>Runs in any browser on phone, tablet or laptop. Nothing to install.</p></div>
      <div class="v"><div class="vi">&#127891;</div><h4>Your board</h4><p>Topics for ''' + E(boards) + ''' &mdash; you choose the board and topic.</p></div>
      <div class="v"><div class="vi">&#129504;</div><h4>Actually effective</h4><p>Built on retrieval practice, not just points for their own sake.</p></div>
    </div>
  </div>
</section>

<section class="section section-alt" id="browse-subjects" style="scroll-margin-top:88px;">
  <div class="section-inner">
    <div class="section-label">Browse by subject</div>
    <div class="section-divider"></div>
    <h2 class="section-title">Jump straight to <em>your</em> subject</h2>
    <p class="section-body">Every A-Level subject in the Arcade has its own page, listing its exam boards and every topic you can play.</p>
    <div class="subs">''')
    order = [x for g in GROUPS for x in g if x in BYID] + [x["id"] for x in SUBJECTS if not any(x["id"] in g for g in GROUPS)]
    for sid in order:
        s = BYID[sid]
        o.append('<a href="%s"><span class="e">%s</span><span class="t">%s<small>%d topics &middot; %d board%s</small></span></a>'
                 % (s["file"], s["icon"], E(s["name"]), s["n_topics"], len(s["boards"]), "s" if len(s["boards"]) != 1 else ""))
    o.append('''</div>
    <div style="margin-top:1.8rem;"><a href="classcraft/arcade.html" class="btn-outline">Browse everything in the Arcade &rarr;</a></div>
    <p class="alt-level">Taking GCSEs? <a href="gcse-revision-games.html">Free GCSE revision games by subject &rarr;</a></p>
  </div>
</section>

<section class="section">
  <div class="section-inner">
    <div class="section-label" style="text-align:center;">Questions</div>
    <div class="section-divider" style="margin:14px auto 26px;"></div>
    <div class="g-faq">
''')
    for i, (q, a) in enumerate(qas):
        o.append('      <details%s><summary>%s</summary><p>%s</p></details>\n' % (" open" if i == 0 else "", E(q), E(a)))
    o.append('''    </div>
  </div>
</section>

<section class="ctaband">
  <div class="inner">
    <h2>Ready to play your way to a better grade?</h2>
    <p>Jump into the Arcade for free &mdash; or learn the full six-step system the games are built around.</p>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
      <a href="classcraft/arcade.html" class="neon-btn">&#127918; Play the Arcade &rarr;</a>
      <a href="courses.html" class="btn-secondary" style="color:#fff;border-color:rgba(255,255,255,.25);">View the course</a>
    </div>
  </div>
</section>
''')
    o.append(tail(HUB_CHROME))
    return "".join(o)

# ---------------------------------------------------------------- write
def write(path, text):
    old = open(path, encoding="utf-8").read() if os.path.exists(path) else None
    if old == text:
        return "same"
    if not CHECK:
        open(path, "w", encoding="utf-8").write(text)
    return "new" if old is None else "updated"

print("A-Level games pages: %d subjects, %d topics, %d key terms, %d game formats, boards: %s"
      % (len(SUBJECTS), TOTAL_TOPICS, TOTAL_TERMS, N_GAMES, ", ".join(ALL_BOARDS)))
print("  %-7s %s" % (write("alevel-revision-games.html", hub_page()), "alevel-revision-games.html"))
for s in SUBJECTS:
    st = write(s["file"], subject_page(s))
    print("  %-7s %-52s %3d topics  %4d terms  boards: %s" % (st, s["file"], s["n_topics"], s["n_terms"],
                                                            ", ".join("%s %d" % (b["d"], len(b["topics"])) for b in s["boards"])))
if CHECK:
    print("(--check: nothing written)")
