#!/usr/bin/env python3
"""Keep the GCSE revision-games pages in step with the Revision Arcade.

Usage (from anywhere):  python3 tools/build-gcse-games-topics.py [--check]

The GCSE games pages (gcse-<subject>-revision-games.html and the hub
gcse-revision-games.html) are hand-written, but their topic lists, board
claims and counts must match what the arcade can actually play. This script
rewrites only those parts, from the arcade's own data:

  subject pages
    - the "Pick your board and topic" section: every GCSE topic the arcade
      has for that subject, grouped by exam board, each linking straight to
      that board and topic (classcraft/arcade.html?...&topic=<slug>)
    - the FAQ answers about which topics and which boards are covered
      (visible text and the FAQPage JSON-LD)
    - the number of game formats
  hub
    - the Subjects and Vocab terms figures in the hero stats strip

Sources (read only): classcraft/arcade/index.js, classcraft/arcade.html,
classcraft/arcade/vocab/<subject>-gcse.json.
--check exits 1 if any page would change (for CI).
"""
import html, json, os, re, sys

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
CHECK = "--check" in sys.argv
E = lambda s: html.escape(str(s), quote=True)

src = open("classcraft/arcade/index.js", encoding="utf-8").read()
INDEX = json.loads(src[src.index("{"):].rstrip().rstrip(";"))
ARC = open("classcraft/arcade.html", encoding="utf-8").read()
N_GAMES = sum(len(re.findall(r"\{ id:'[^']+',", re.search(r"const %s = \[(.*?)\n\];" % n, ARC, re.S).group(1)))
              for n in ("QUIZ_GAMES", "TERMS_GAMES"))

GCSE = {}
for sx in INDEX["subjects"]:
    lv = next((l for l in sx.get("levels", []) if l["id"] == "gcse"), None)
    if lv and lv.get("boards"):
        GCSE[sx["id"]] = [{"id": b["id"], "d": b["d"], "topics": b["topics"]} for b in lv["boards"]]

NAME = {"business-studies": "Business", "pe": "PE"}

def and_list(xs):
    xs = list(xs)
    return xs[0] if len(xs) == 1 else ", ".join(xs[:-1]) + " and " + xs[-1]

def arcade(sid, board=None, topic=None):
    q = "subject=%s&amp;level=gcse" % sid
    if board: q += "&amp;board=" + board
    if topic: q += "&amp;topic=" + topic
    return "classcraft/arcade.html?" + q + "&amp;at=top"

BOARD_CSS = ("  .board-h{font-family:'DM Mono',monospace;font-size:13px;letter-spacing:1.2px;text-transform:uppercase;"
             "color:var(--accent);font-weight:700;margin:26px 0 0;}\n"
             "  .board-h a{color:inherit;text-decoration:none;}\n  .board-h a:hover{text-decoration:underline;}\n"
             "  .topic-grid a .go{white-space:nowrap;}\n")

def topics_section(sid, intro):
    boards = GCSE[sid]
    o = [' <h2>Pick your board and topic</h2>\n', ' <p>%s</p>\n' % intro,
         ' <p>Tap a topic to open the Revision Arcade with your subject, board and topic already chosen.</p>\n']
    for b in boards:
        n = len(b["topics"])
        o.append('\n <h3 class="board-h" id="%s"><a href="%s">%s · %d topic%s</a></h3>\n <div class="topic-grid">\n'
                 % (b["id"], arcade(sid, b["id"]), E(b["d"]), n, "s" if n != 1 else ""))
        for t in b["topics"]:
            o.append('  <a href="%s">%s <span class="go">Play →</span></a>\n' % (arcade(sid, b["id"], t["slug"]), E(t["d"])))
        o.append(" </div>\n")
    return "".join(o)

def faq_answers(sid, nm):
    boards = GCSE[sid]
    bn = [b["d"] for b in boards]
    nt = sum(len(b["topics"]) for b in boards)
    if len(boards) > 1:
        per = and_list(["%d for %s" % (len(b["topics"]), b["d"]) for b in boards])
        topics = ("The Arcade has GCSE %s topics for %s — %s, %d in all. Every one is listed on this page, grouped by board."
                  % (nm, and_list(bn), per, nt))
        board_q = "Does it cover my exam board?"
        board_a = ("The GCSE %s shelves follow %s. Pick your board in the Arcade and the topic list changes to match your specification."
                   % (nm, and_list(bn)))
    else:
        topics = ("The Arcade has %d GCSE %s topics, following the %s specification. Every one is listed on this page."
                  % (nt, nm, bn[0]))
        board_q = "Does it cover my exam board?"
        board_a = ("At the moment the GCSE %s shelf follows %s only. If you're on another board, pick the topics that match your course."
                   % (nm, bn[0]))
    return topics, board_q, board_a

TOPIC_Q = re.compile(r"^Which .*(topics|units|texts).* covered\?$")
BOARD_Q = re.compile(r"(exam board|different religions|options are different)", re.I)

def fix_subject(path, sid):
    s0 = s = open(path, encoding="utf-8").read()
    nm = NAME.get(sid, next(x["d"] for x in INDEX["subjects"] if x["id"] == sid))
    # 1. topic section: from the section's h2 to the end of the (last consecutive) topic grid
    m = re.search(r' <h2>Pick (?:a|your board and) topic(?: and play)?</h2>\n(.*?)\n(?= <h2>)', s, re.S)
    if not m:
        sys.exit("%s: topic section not found" % path)
    intro = re.search(r'<p>(.*?)</p>', m.group(1), re.S).group(1).strip()
    if "Tap a topic to open" in m.group(1):            # already generated: keep the subject intro
        intro = re.findall(r'<p>(.*?)</p>', m.group(1), re.S)[0].strip()
    intro = re.sub(r":\s*$", ".", intro)
    if sid == "combined-science":
        intro = "Combined Science covers all three sciences, so this shelf is long. Every topic has its own games pulling its key terms and definitions."
    s = s[:m.start()] + topics_section(sid, intro) + "\n" + s[m.end():]
    # 2. CSS for board headings
    if ".board-h{" not in s:
        s = s.replace("  @media(max-width:600px){.topic-grid", BOARD_CSS + "  @media(max-width:600px){.topic-grid", 1)
        if ".board-h{" not in s:
            sys.exit("%s: could not add board CSS" % path)
    # 3. format count
    s = re.sub(r"\b\d+ different formats\b", "%d different formats" % N_GAMES, s)
    # 4. FAQ answers (visible + JSON-LD)
    topics_a, board_q, board_a = faq_answers(sid, nm)
    def vis(mm):
        q, a = mm.group(1), mm.group(2)
        if TOPIC_Q.match(q.strip()) and sid != "combined-science":
            return '<p class="faq-q">%s</p>\n <p>%s</p>' % (q, E(topics_a))
        if BOARD_Q.search(q):
            return '<p class="faq-q">%s</p>\n <p>%s</p>' % (E(board_q), E(board_a))
        return mm.group(0)
    s = re.sub(r'<p class="faq-q">([^<]*)</p>\s*<p>(.*?)</p>', vis, s, flags=re.S)
    def ld(mm):
        block = mm.group(0)
        try:
            d = json.loads(mm.group(1))
        except ValueError:
            return block
        if d.get("@type") != "FAQPage":
            return block
        for qa in d["mainEntity"]:
            q = qa["name"]
            if TOPIC_Q.match(q.strip()) and sid != "combined-science":
                nq, na = q, topics_a
            elif BOARD_Q.search(q):
                nq, na = board_q, board_a
            else:
                continue
            pat = re.compile(r'"name":\s*' + re.escape(json.dumps(q, ensure_ascii=False)) +
                             r'(,\s*"acceptedAnswer":\s*\{\s*"@type":\s*"Answer",\s*"text":\s*)"(?:[^"\\]|\\.)*"')
            rep = '"name":' + json.dumps(nq, ensure_ascii=False) + r'\g<1>' + json.dumps(na, ensure_ascii=False).replace('\\', '\\\\')
            block, n = pat.subn(rep, block)
            if n != 1:
                sys.exit("%s: could not update JSON-LD answer for %r" % (path, q))
        json.loads(re.search(r'>\s*(.*?)\s*</script>', block, re.S).group(1))   # still valid JSON
        return block
    s = re.sub(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', ld, s, flags=re.S)
    return s0, s

def fix_hub(path):
    s0 = s = open(path, encoding="utf-8").read()
    n_sub = len(GCSE)
    terms = 0
    for sid in GCSE:
        p = "classcraft/arcade/vocab/%s-gcse.json" % sid
        if os.path.exists(p):
            terms += sum(len(t.get("terms", [])) for t in json.load(open(p, encoding="utf-8"))["topics"].values())
    terms_txt = "{:,}+".format(terms // 100 * 100)
    s = re.sub(r'(<span class="n">)[^<]*(</span><span class="l">Subjects</span>)', r'\g<1>%d\2' % n_sub, s)
    s = re.sub(r'(<span class="n">)[^<]*(</span><span class="l">Vocab terms</span>)', r'\g<1>%s\2' % terms_txt, s)
    s = re.sub(r'(<span class="n">)\d+(</span><span class="l">Game formats</span>)', r'\g<1>%d\2' % N_GAMES, s)
    return s0, s

changed = []
for sid in sorted(GCSE):
    p = "gcse-%s-revision-games.html" % sid
    if not os.path.exists(p):
        continue
    a, b = fix_subject(p, sid)
    if a != b:
        changed.append(p)
        if not CHECK:
            open(p, "w", encoding="utf-8").write(b)
a, b = fix_hub("gcse-revision-games.html")
if a != b:
    changed.append("gcse-revision-games.html")
    if not CHECK:
        open("gcse-revision-games.html", "w", encoding="utf-8").write(b)
print("GCSE games pages %s: %d" % ("that would change" if CHECK else "updated", len(changed)))
for c in changed:
    print("  " + c)
if CHECK and changed:
    sys.exit(1)
