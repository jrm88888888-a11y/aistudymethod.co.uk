#!/usr/bin/env python3
"""Build lessons/<course>.html — one student-facing page per course (subject-level-board)
listing every mini-lesson in specification order with its hook thumbnail and mission
question. The teacher equivalent is teach/<course>.html (build-teach-pages.py).

Reads classcraft/quizzes/lesson-next/index.json and <course>.json (run
tools/build-lesson-next.py first) and classcraft/specs-manifest.json.
Run from anywhere:  python3 tools/build-course-pages.py
Pages for courses that no longer exist are reported, not deleted (leave a redirect stub).
"""
import json, os, re, html, collections

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, 'classcraft', 'quizzes', 'lesson-next')
ADV = os.path.join(ROOT, 'classcraft', 'adventures')
OUT = os.path.join(ROOT, 'lessons')
SITE = 'https://aistudymethod.com'
V = '20261027'
e = lambda s: html.escape(str(s), quote=True)

SPECS = {x['key']: x for x in json.load(open(os.path.join(ROOT, 'classcraft', 'specs-manifest.json'), encoding='utf8'))}
LEVEL_NAME = {'ks3': 'KS3', 'gcse': 'GCSE', 'a-level': 'A-Level', 'ibdp': 'IB Diploma'}
BOARD_ORDER = ['aqa', 'edexcel', 'ocr', 'eduqas', 'wjec', 'ccea', 'cambridge-igcse', 'edexcel-igcse', 'general', 'sl', 'hl', 'ib']
index = [c for c in json.load(open(os.path.join(DATA, 'index.json'), encoding='utf8')) if c['n'] > 0]
by_key = {c['k']: c for c in index}

def lesson_stem(course, row):
    return row[4] if len(row) > 4 else f"{course['k']}-{row[0]}"

def revise_hub(course, rows):
    """The written-guide hub the lessons themselves link to (data-hub), if any."""
    for r in rows:
        try: s = open(os.path.join(ADV, lesson_stem(course, r) + '-mini-lesson.html'), encoding='utf8', errors='replace').read(6000)
        except OSError: continue
        m = re.search(r'<a href="\.\./\.\./(revise/[^"]+)" data-hub="1">([^<]*)</a>', s)
        if m and os.path.exists(os.path.join(ROOT, m.group(1))): return m.group(1), html.unescape(m.group(2))
    return None, None

NAV = '''<nav>
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
 <li><a href="/subjects.html">Velvet Revision</a></li>
 <li><a href="/gcse-revision-games.html">Games</a></li>
 <li><a href="/velvet-method.html">The Velvet Method</a></li>
 <li><a href="/teachers.html">Teachers</a></li>
 </ul>
 <div class="nav-right">
 <a href="/velvet-method.html#prompt-library" class="btn-primary">Free Prompt Library →</a>
 </div>
 </div>
</nav>'''

FOOTER = '''<footer>
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
 <li><a href="/lessons.html">Mini-lessons</a></li>
 <li><a href="/subjects.html">Velvet Revision</a></li>
 <li><a href="/revise/index.html">Free Revision Guides</a></li>
 <li><a href="/gcse-revision-games.html">Revision Games</a></li>
 <li><a href="/velvet-method.html">The Velvet Method</a></li>
 </ul>
 </div>
 <div class="footer-col">
 <h5>Info</h5>
 <ul>
 <li><a href="/teachers.html">For Teachers</a></li>
 <li><a href="/parents.html">For Parents</a></li>
 <li><a href="/parents.html#contact">Contact</a></li>
 <li><a href="/privacy.html">Privacy Policy</a></li>
 <li><a href="/terms.html">Terms of Service</a></li>
 </ul>
 </div>
 </div>
 <div class="footer-bottom">
 <p>© 2026 AI Study Method · aistudymethod.com · All rights reserved · <a href="/privacy.html" style="color:inherit;text-decoration:underline;">Privacy</a> · <a href="/terms.html" style="color:inherit;text-decoration:underline;">Terms</a></p>
 <div class="footer-velvet">Powered by <span>The Velvet Method®</span></div>
 <div class="footer-legal"><p>The Velvet Method<sup>®</sup> is a UK registered trade mark (UK00004394182).</p></div>
 </div>
 </div>
</footer>'''

CSS = '''<style>
.cp-hero{padding:calc(var(--nav-h) + 36px) 2rem 28px;background:var(--hero-gradient),var(--bg-primary);}
.cp-hero .section-inner,.cp-main .section-inner{max-width:1000px;}
.cp-crumbs{font-size:13px;color:var(--text-muted);margin:0 0 14px;display:flex;gap:6px;flex-wrap:wrap;}
.cp-crumbs a{color:var(--accent);text-decoration:none;font-weight:600;}
.cp-hero h1{font-family:'Playfair Display',serif;font-size:clamp(1.9rem,3.2vw,2.7rem);line-height:1.14;color:var(--text-primary);margin:0 0 .5rem;}
.cp-hero h1 em{font-style:normal;background:var(--velvet-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.cp-meta{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:var(--text-muted);margin:0 0 12px;}
.cp-hero p.lead{font-size:16px;color:var(--text-secondary);line-height:1.6;max-width:680px;margin:0 0 1.2rem;}
.cp-actions{display:flex;gap:10px;flex-wrap:wrap;align-items:center;}
.cp-actions a{padding:9px 16px;border-radius:999px;border:1px solid var(--border-accent);background:var(--bg-card);font-size:13.5px;font-weight:700;color:var(--text-primary);text-decoration:none;}
.cp-actions a:hover{border-color:var(--accent);color:var(--accent);}
.cp-actions a.t{background:var(--accent-soft);color:var(--accent);}
.cp-main{padding:28px 2rem 60px;}
.cp-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px;}
.cp-list li a{display:grid;grid-template-columns:30px 168px 1fr auto;gap:14px;align-items:center;padding:10px 16px 10px 12px;border-radius:14px;border:1px solid var(--border);background:var(--bg-card);text-decoration:none;color:var(--text-primary);box-shadow:var(--shadow-sm);transition:all .18s ease;}
.cp-list li a:hover{border-color:var(--accent);transform:translateY(-2px);box-shadow:0 10px 26px var(--accent-glow);}
.cp-list li a.nothumb{grid-template-columns:30px 1fr auto;}
.cp-i{width:28px;height:28px;border-radius:50%;background:var(--bg-primary);border:1px solid var(--border-accent);font-family:'DM Mono',monospace;font-size:11px;font-weight:700;color:var(--accent);display:flex;align-items:center;justify-content:center;}
.cp-th{aspect-ratio:16/9;border-radius:9px;overflow:hidden;background:#0f1117;border:1px solid var(--border);}
.cp-th img{width:100%;height:100%;object-fit:cover;display:block;}
.cp-t{display:flex;flex-direction:column;gap:3px;min-width:0;}
.cp-t b{font-size:16px;font-weight:700;line-height:1.3;}
.cp-t em{font-style:italic;font-size:13.5px;color:var(--text-secondary);line-height:1.4;}
.cp-go{font-size:13.5px;font-weight:700;color:var(--accent);white-space:nowrap;}
.cp-list .lp-tick{margin-left:6px;}
.cp-more{margin:2.2rem 0 0;padding-top:1.4rem;border-top:1px solid var(--border);}
.cp-more h2{font-family:'Playfair Display',serif;font-size:20px;color:var(--text-primary);margin:0 0 10px;}
.cp-more p{font-size:14px;color:var(--text-secondary);line-height:1.6;margin:0 0 8px;}
.cp-more a{color:var(--accent);font-weight:600;}
.cp-boards{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 0;}
.cp-boards a{padding:6px 12px;border-radius:999px;border:1px solid var(--border);background:var(--bg-card);font-size:13px;font-weight:600;color:var(--text-primary);text-decoration:none;}
.cp-boards a:hover{border-color:var(--accent);color:var(--accent);}
@media (max-width:700px){.cp-hero{padding:calc(var(--nav-h) + 22px) 1rem 20px;}.cp-main{padding:20px 1rem 44px;}
 .cp-list li a{grid-template-columns:26px 1fr;gap:8px 10px;}.cp-th{grid-column:1 / -1;}.cp-go{display:none;}.cp-list li a.nothumb{grid-template-columns:26px 1fr;}}
</style>'''

os.makedirs(OUT, exist_ok=True)
written = set(); nthumb = 0
for c in index:
    d = json.load(open(os.path.join(DATA, c['k'] + '.json'), encoding='utf8'))
    rows, hooks = d['t'], d.get('h', {})
    spec = SPECS.get(c['k'], {})
    code = spec.get('specCode') or ''
    guide, guide_name = revise_hub(c, rows)
    level = LEVEL_NAME.get(c['l'], c['l'])
    n = len(rows)
    with_q = sum(1 for r in rows if r[0] in hooks)
    title = f"{c['d']} mini-lessons — {n} free interactive lesson{'' if n == 1 else 's'}"
    desc = (f"Every topic of {c['d']} as a free interactive mini-lesson, in specification order"
            + (f" (spec {code})" if code else "") + ". Each lesson opens with a question, then works through it in missions with checks. About 20 minutes each. No login.")
    items = []
    for i, r in enumerate(rows):
        href = '/classcraft/adventures/' + lesson_stem(c, r) + '-mini-lesson.html'
        h = hooks.get(r[0]); thumb = h[2] if h and len(h) > 2 else None
        items.append(
            f'<li><a href="{e(href)}"' + ('' if thumb else ' class="nothumb"') + f'><span class="cp-i">{i + 1}</span>'
            + (f'<span class="cp-th"><img src="/{e(thumb)}" alt="" width="640" height="360" loading="lazy" decoding="async"></span>' if thumb else '')
            + f'<span class="cp-t"><b>{e(r[1])}</b>' + (f'<em>{e(h[1])}</em>' if h and h[1] else '') + '</span>'
            + '<span class="cp-go">Start →</span></a></li>')
    siblings = sorted([x for x in index if x['s'] == c['s'] and x['l'] == c['l'] and x['k'] != c['k']],
                      key=lambda x: BOARD_ORDER.index(x['b']) if x['b'] in BOARD_ORDER else 99)
    other_levels = sorted({x['l'] for x in index if x['s'] == c['s'] and x['l'] != c['l']}, key=lambda l: list(LEVEL_NAME).index(l))
    actions = [f'<a class="t" href="/teach/{e(c["k"])}.html">👩‍🏫 Teachers: assign this course</a>'] if os.path.exists(os.path.join(ROOT, 'teach', c['k'] + '.html')) else []
    actions.append(f'<a href="/subjects.html?subject={e(c["s"])}&amp;level={e(c["l"])}&amp;board={e(c["b"])}">All six Velvet stages</a>')
    if d.get('a'): actions.append(f'<a href="/classcraft/arcade.html?{e(d["a"])}">🎮 Revision Arcade</a>')
    if guide: actions.append(f'<a href="/{e(guide)}">📖 {e(guide_name)}</a>')
    opener = "Each one opens with a question you can\u2019t yet answer" if with_q else "Each one takes a topic step by step"
    ld = {"@context": "https://schema.org", "@type": "ItemList", "name": title, "numberOfItems": n,
          "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": r[1],
                               "url": f"{SITE}/classcraft/adventures/{lesson_stem(c, r)}-mini-lesson.html"} for i, r in enumerate(rows)]}
    page = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{e(title)} | AI Study Method</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{SITE}/lessons/{e(c['k'])}.html">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="AI Study Method">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{SITE}/lessons/{e(c['k'])}.html">
<meta property="og:image" content="{SITE}/og-share.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/style.css">
<!-- Privacy-friendly analytics by Plausible -->
<script async src="https://plausible.io/js/pa-y_3K19wHddzHShFk02JEm.js"></script>
<script>
  window.plausible=window.plausible||function(){{(plausible.q=plausible.q||[]).push(arguments)}},plausible.init=plausible.init||function(i){{plausible.o=i||{{}}}};
  plausible.init()
</script>
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
{CSS}
</head>
<body>{NAV}

<section class="cp-hero">
 <div class="section-inner">
  <p class="cp-crumbs"><a href="/lessons.html">Mini-lessons</a> › <a href="/lessons.html#{e(c['l'])}">{e(level)}</a> › <span>{e(c['sd'])}</span> › <span>{e(c['bd'])}</span></p>
  <p class="cp-meta">{e(c['d'])}{(' · spec ' + e(code)) if code else ''} · {n} mini-lesson{'' if n == 1 else 's'}</p>
  <h1>{e(c['d'])}<br><em>{n} free mini-lessons, in order.</em></h1>
  <p class="lead">One interactive lesson for every topic in the {e(c['bd'])} specification, in the order it's taught. {opener}, then works through it in missions with checks along the way. About 20 minutes each. No login.</p>
  <div class="cp-actions">{''.join(actions)}</div>
 </div>
</section>

<section class="cp-main">
 <div class="section-inner">
  <ol class="cp-list">
{chr(10).join(items)}
  </ol>
  <div class="cp-more">
   <h2>More {e(c['sd'])}</h2>
   {('<p>Same subject, other exam boards:</p><p class="cp-boards">' + ''.join(f'<a href="/lessons/{e(x["k"])}.html">{e(x["d"])}</a>' for x in siblings) + '</p>') if siblings else ''}
   {('<p style="margin-top:10px">Other levels:</p><p class="cp-boards">' + ''.join(f'<a href="/lessons.html?level={e(l)}&amp;subject={e(c["s"])}">{e(LEVEL_NAME[l])} {e(c["sd"])}</a>' for l in other_levels) + '</p>') if other_levels else ''}
   <p style="margin-top:14px"><a href="/lessons.html">All mini-lessons, every course →</a></p>
  </div>
 </div>
</section>

{FOOTER}
<script src="/script.js"></script>
<script src="/classcraft/quizzes/progress.js?v=20261008b" defer></script>
</body>
</html>
'''
    open(os.path.join(OUT, c['k'] + '.html'), 'w', encoding='utf8').write(page)
    written.add(c['k'] + '.html'); nthumb += sum(1 for r in rows if r[0] in hooks and len(hooks[r[0]]) > 2)
for old in sorted(os.listdir(OUT)):
    if old.endswith('.html') and old not in written: print('STALE (not removed):', old)
print(f'lessons/: {len(written)} course pages, {nthumb} lessons with thumbnails')
