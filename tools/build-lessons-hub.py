#!/usr/bin/env python3
"""Build lessons.html — the mini-lessons hub.

The page is the lesson finder (lesson-finder.js, interactive) above a static
directory of every course with every mini-lesson linked, in specification order,
so the hub works without JavaScript and every lesson has one more inbound link.
Reads classcraft/quizzes/lesson-next/index.json and <course>.json (run
tools/build-lesson-next.py first). Run from anywhere:
    python3 tools/build-lessons-hub.py
"""
import json, os, html, collections

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, 'classcraft', 'quizzes', 'lesson-next')
OUT = os.path.join(ROOT, 'lessons.html')
e = lambda s: html.escape(str(s), quote=True)

LEVELS = [('gcse', 'GCSE and IGCSE', 'GCSE'), ('a-level', 'A-Level', 'A-Level'),
          ('ibdp', 'IB Diploma', 'IB'), ('ks3', 'Key Stage 3', 'KS3')]
BOARD_ORDER = ['aqa', 'edexcel', 'ocr', 'eduqas', 'wjec', 'ccea', 'cambridge-igcse', 'edexcel-igcse', 'general', 'sl', 'hl', 'ib']

index = [c for c in json.load(open(os.path.join(DATA, 'index.json'), encoding='utf8')) if c['n'] > 0]
# distinct lesson files (IB lessons shared by SL and HL are listed under both courses)
_stems = set()
for _c in index:
    for _r in json.load(open(os.path.join(DATA, _c['k'] + '.json'), encoding='utf8'))['t']:
        _stems.add(_r[4] if len(_r) > 4 else f"{_c['k']}-{_r[0]}")
total = len(_stems)
by_level = collections.defaultdict(lambda: collections.defaultdict(list))
for c in index:
    by_level[c['l']][c['sd']].append(c)

def lesson_file(course, row):
    return 'classcraft/adventures/' + (row[4] if len(row) > 4 else f"{course['k']}-{row[0]}") + '-mini-lesson.html'

parts = []
for lv, name, short in LEVELS:
    subjects = by_level.get(lv)
    if not subjects: continue
    n_lv = sum(c['n'] for s in subjects.values() for c in s)
    parts.append(f'<section class="hub-level" id="{lv}">\n<h2>{e(name)} <span>{n_lv} mini-lessons</span></h2>\n')
    for sd in sorted(subjects):
        courses = sorted(subjects[sd], key=lambda c: BOARD_ORDER.index(c['b']) if c['b'] in BOARD_ORDER else 99)
        parts.append(f'<div class="hub-subject">\n<h3>{e(sd)}</h3>\n')
        for c in courses:
            d = json.load(open(os.path.join(DATA, c['k'] + '.json'), encoding='utf8'))
            hooks = d.get('h', {})
            items = ''.join(
                f'<li><a href="{e(lesson_file(c, r))}">{e(r[1])}</a>'
                + (f' <em>{e(hooks[r[0]][1])}</em>' if r[0] in hooks and hooks[r[0]][1] else '') + '</li>\n'
                for r in d['t'])
            parts.append(f'<details class="hub-course" id="{e(c["k"])}">\n<summary>{e(c["d"])} <span>{c["n"]} lesson{"" if c["n"] == 1 else "s"}</span></summary>\n'
                         f'<ol>\n{items}</ol>\n'
                         f'<p class="hub-links"><a href="lessons/{e(c["k"])}.html"><b>Course page</b></a> · <a href="lessons.html?course={e(c["k"])}">Open in the finder</a> · '
                         f'<a href="subjects.html?subject={e(c["s"])}&amp;level={e(c["l"])}&amp;board={e(c["b"])}">All six Velvet stages</a>'
                         + (f' · <a href="teach/{e(c["k"])}.html">Teachers: assign this course</a>' if os.path.exists(os.path.join(ROOT, 'teach', c['k'] + '.html')) else '')
                         + '</p>\n</details>\n')
        parts.append('</div>\n')
    parts.append('</section>\n')
directory = ''.join(parts)

PAGE = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mini-Lessons — {total:,} free interactive lessons for GCSE, A-Level, IB and KS3 | AI Study Method</title>
<meta name="description" content="Every free mini-lesson on AI Study Method: {total:,} interactive lessons for GCSE, A-Level, IB Diploma and KS3, in exam-board order. Pick your level, subject and board and start a lesson in one click. No login.">
<link rel="canonical" href="https://aistudymethod.com/lessons.html">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="AI Study Method">
<meta property="og:title" content="Mini-Lessons — free interactive lessons for GCSE, A-Level, IB and KS3">
<meta property="og:description" content="{total:,} interactive mini-lessons in exam-board order. Pick your level, subject and board and start in one click.">
<meta property="og:url" content="https://aistudymethod.com/lessons.html">
<meta property="og:image" content="https://aistudymethod.com/og-share.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="style.css">
<!-- Privacy-friendly analytics by Plausible -->
<script async src="https://plausible.io/js/pa-y_3K19wHddzHShFk02JEm.js"></script>
<script>
  window.plausible=window.plausible||function(){{(plausible.q=plausible.q||[]).push(arguments)}},plausible.init=plausible.init||function(i){{plausible.o=i||{{}}}};
  plausible.init()
</script>
<style>
.hub-hero{{padding:calc(var(--nav-h) + 40px) 2rem 28px;background:var(--hero-gradient),var(--bg-primary);}}
.hub-hero .section-inner{{max-width:1080px;}}
.hub-hero h1{{font-family:'Playfair Display',serif;font-size:clamp(2rem,3.4vw,2.9rem);line-height:1.12;color:var(--text-primary);margin:0 0 .6rem;}}
.hub-hero h1 em{{font-style:normal;background:var(--velvet-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}}
.hub-hero p.lead{{font-size:16.5px;color:var(--text-secondary);line-height:1.6;max-width:640px;margin:0 0 1.4rem;}}
.hub-dir{{padding:40px 2rem 70px;}}
.hub-dir .section-inner{{max-width:1080px;}}
.hub-jump{{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 1.6rem;}}
.hub-jump a{{padding:7px 14px;border-radius:999px;border:1px solid var(--border-accent);background:var(--bg-card);font-size:13.5px;font-weight:700;color:var(--text-primary);text-decoration:none;}}
.hub-jump a:hover{{border-color:var(--accent);color:var(--accent);}}
.hub-level{{margin:0 0 2.4rem;scroll-margin-top:84px;}}
.hub-level h2{{font-family:'Playfair Display',serif;font-size:26px;color:var(--text-primary);margin:0 0 1rem;padding-bottom:8px;border-bottom:2px solid var(--border-accent);display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap;}}
.hub-level h2 span{{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:var(--text-muted);}}
.hub-subject{{margin:0 0 1.1rem;}}
.hub-subject h3{{font-size:15px;font-weight:700;color:var(--accent);margin:0 0 6px;font-family:'DM Sans',sans-serif;letter-spacing:.2px;}}
.hub-course{{background:var(--bg-card);border:1px solid var(--border);border-radius:12px;margin:0 0 6px;scroll-margin-top:84px;}}
.hub-course summary{{cursor:pointer;padding:10px 14px;font-weight:600;font-size:14.5px;color:var(--text-primary);display:flex;justify-content:space-between;gap:12px;list-style:none;}}
.hub-course summary::-webkit-details-marker{{display:none;}}
.hub-course summary::after{{content:'+';font-family:'DM Mono',monospace;color:var(--accent);font-weight:700;}}
.hub-course[open] summary::after{{content:'–';}}
.hub-course summary span{{font-family:'DM Mono',monospace;font-size:11px;color:var(--text-muted);white-space:nowrap;font-weight:500;}}
.hub-course ol{{margin:0;padding:4px 14px 10px 34px;font-size:14px;line-height:1.45;}}
.hub-course li{{padding:3px 0;color:var(--text-secondary);}}
.hub-course li a{{color:var(--text-primary);font-weight:600;text-decoration:none;}}
.hub-course li a:hover{{color:var(--accent);text-decoration:underline;text-underline-offset:3px;}}
.hub-course li em{{display:block;font-size:12.5px;color:var(--text-muted);}}
.hub-links{{margin:0;padding:6px 14px 12px;font-size:13px;color:var(--text-muted);}}
.hub-links a{{color:var(--accent);font-weight:600;}}
@media (max-width:600px){{.hub-hero{{padding:calc(var(--nav-h) + 24px) 1rem 20px;}}.hub-dir{{padding:28px 1rem 50px;}}}}
</style>
</head>
<body><nav>
 <div class="nav-inner">
 <a href="/" class="logo">
 <div class="logo-mark">V</div>
 <div class="logo-text">
 <span class="logo-primary">AI Study Method</span>
 <span class="logo-secondary">The Velvet Method®</span>
 </div>
 </a>
 <ul class="nav-links">
 <li><a href="/lessons.html" class="active">Mini-lessons</a></li>
 <li><a href="subjects.html">Velvet Revision</a></li>
 <li><a href="/gcse-revision-games.html">Games</a></li>
 <li><a href="velvet-method.html">The Velvet Method</a></li>
 <li><a href="teachers.html">Teachers</a></li>
 </ul>
 <div class="nav-right">
 <a href="velvet-method.html#prompt-library" class="btn-primary">Free Prompt Library →</a>
 </div>
 </div>
</nav>

<section class="hub-hero">
 <div class="section-inner">
  <div class="section-label">Mini-lessons</div>
  <div class="section-divider"></div>
  <h1>{total:,} free mini-lessons.<br><em>Find yours in three taps.</em></h1>
  <p class="lead">Every topic of every course, in the order your exam board teaches it. Each lesson opens with a question you can't yet answer, then works through it in missions with checks along the way. About 20 minutes. No login.</p>
  <div class="lf" data-lf data-hub></div>
 </div>
</section>

<section class="hub-dir">
 <div class="section-inner">
  <div class="section-label">Every course</div>
  <div class="section-divider"></div>
  <h2 class="section-title" style="margin-bottom:1rem;">Browse by <em>level</em></h2>
  <p class="hub-jump">{"".join(f'<a href="#{lv}">{e(short)}</a>' for lv, name, short in LEVELS if lv in by_level)}</p>
<!-- COURSES-START (generated by tools/build-lessons-hub.py) -->
{directory}<!-- COURSES-END -->
 </div>
</section>

<footer>
 <div class="footer-inner">
 <div class="footer-top">
 <div class="footer-brand">
 <a href="/" class="logo">
 <div class="logo-mark">V</div>
 <div class="logo-text">
 <span class="logo-primary">AI Study Method</span>
 <span class="logo-secondary">The Velvet Method®</span>
 </div>
 </a>
 <p>Free mini-lessons, quizzes and games for every course, built around the Velvet Method — a six-step study system designed by teachers.</p>
 </div>
 <div class="footer-col">
 <h5>Learn</h5>
 <ul>
 <li><a href="lessons.html">Mini-lessons</a></li>
 <li><a href="subjects.html">Velvet Revision</a></li>
 <li><a href="revise/index.html">Free Revision Guides</a></li>
 <li><a href="gcse-revision-games.html">Revision Games</a></li>
 <li><a href="velvet-method.html">The Velvet Method</a></li>
 </ul>
 </div>
 <div class="footer-col">
 <h5>Info</h5>
 <ul>
 <li><a href="teachers.html">For Teachers</a></li>
 <li><a href="parents.html">For Parents</a></li>
 <li><a href="parents.html#contact">Contact</a></li>
 <li><a href="privacy.html">Privacy Policy</a></li>
 <li><a href="terms.html">Terms of Service</a></li>
 </ul>
 </div>
 </div>
 <div class="footer-bottom">
 <p>© 2026 AI Study Method · aistudymethod.com · All rights reserved · <a href="privacy.html" style="color:inherit;text-decoration:underline;">Privacy</a> · <a href="terms.html" style="color:inherit;text-decoration:underline;">Terms</a></p>
 <div class="footer-velvet">Powered by <span>The Velvet Method®</span></div>
 <div class="footer-legal"><p>The Velvet Method<sup>®</sup> is a UK registered trade mark (UK00004394182).</p></div>
 </div>
 </div>
</footer>
<script src="script.js"></script>
<script src="lesson-finder.js?v=20261027" defer></script>
<script src="/classcraft/quizzes/progress.js?v=20261008b" defer></script>
<script>
// ?course=<key> or #<key>: open that course's static list too, so the link works before the finder has loaded
(function () {{
  var k = (new URLSearchParams(location.search).get('course') || location.hash.slice(1) || '');
  var d = k && document.getElementById(k);
  if (d && d.tagName === 'DETAILS') d.open = true;
}})();
</script>
</body>
</html>
'''
open(OUT, 'w', encoding='utf8').write(PAGE)
print(f'lessons.html: {len(index)} courses, {total} lessons, {len(PAGE)//1024} KB')
