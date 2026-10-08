#!/usr/bin/env python3
"""Build the teacher course pages and the course directory on teachers.html.

Reads classcraft/quizzes/lesson-next/<course>.json (run tools/build-lesson-next.py
first) and classcraft/topic-slugs.js, and writes:
  teach/<course>.html   one page per subject-level-board, lessons in the order of
                        the specification's topic list (extras listed separately)
  teachers.html         the block between <!-- COURSES-START --> and
                        <!-- COURSES-END --> is regenerated
Run from anywhere:  python3 tools/build-teach-pages.py
"""
import json, os, re, html, collections, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CC = os.path.join(ROOT, 'classcraft')
DATA = os.path.join(CC, 'quizzes', 'lesson-next')
OUT = os.path.join(ROOT, 'teach')
SITE = 'https://aistudymethod.com'
V = '20261008b'

def load_js_object(path, name):
    s = open(path, encoding='utf8').read()
    i = s.index(name); i = s.index('{', i)
    return json.JSONDecoder().raw_decode(s[i:])[0]

BOARD_TOPICS = load_js_object(os.path.join(CC, 'topic-slugs.js'), 'window.BOARD_TOPICS')
SPECS = {e['key']: e for e in json.load(open(os.path.join(CC, 'specs-manifest.json'), encoding='utf8'))}
e = lambda s: html.escape(str(s), quote=True)

LEVELS = [('ks3', 'Key Stage 3'), ('gcse', 'GCSE and IGCSE'), ('a-level', 'A-Level'), ('ibdp', 'IB Diploma')]
LEVEL_SHORT = {'ks3': 'KS3', 'gcse': 'GCSE', 'a-level': 'A-Level', 'ibdp': 'IB Diploma'}
BOARD_ORDER = ['general', 'aqa', 'edexcel', 'ocr', 'eduqas', 'wjec', 'ccea', 'cambridge-igcse', 'edexcel-igcse', 'hl', 'sl', 'ib']
DOC = {'ks3': 'National Curriculum programme of study', 'ibdp': 'IB subject guide'}

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
 <li><a href="/subjects.html">Velvet Revision</a></li>
 <li><a href="/gcse-revision-games.html">Games</a></li>
 <li><a href="/velvet-method.html">The Velvet Method</a></li>
 <li><a href="/courses.html">Courses</a></li>
 <li><a href="/guides/">Guides</a></li>
 <li><a href="/teachers.html" class="active">Teachers</a></li>
 <li><a href="/parents.html">Parents</a></li>
 <li><a href="/about.html">About</a></li>
 </ul>
 <div class="nav-right">
 <a href="/courses.html" class="btn-primary">View the Course →</a>
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
 <p>A six-step AI-powered study system for students at every level — built on cognitive science, designed for the real world.</p>
 </div>
 <div class="footer-col">
 <h5>Subjects</h5>
 <ul>
 <li><a href="/subjects.html#sciences">Sciences</a></li>
 <li><a href="/subjects.html#maths">Mathematics</a></li>
 <li><a href="/subjects.html#humanities">Humanities</a></li>
 <li><a href="/revise/index.html">Free Revision Guides</a></li>
 <li><a href="/subjects.html">All Subjects →</a></li>
 </ul>
 </div>
 <div class="footer-col">
 <h5>Learn</h5>
 <ul>
 <li><a href="/velvet-method.html">The Velvet Method</a></li>
 <li><a href="/courses.html">Courses</a></li>
 <li><a href="/subjects.html">Free Resources</a></li>
 </ul>
 </div>
 <div class="footer-col">
 <h5>Info</h5>
 <ul>
 <li><a href="/about.html">About</a></li>
 <li><a href="/teachers.html">For Teachers</a></li>
 <li><a href="/parents.html">For Parents</a></li>
 <li><a href="/teachers.html#contact">Contact</a></li>
 <li><a href="/privacy.html">Privacy Policy</a></li>
 <li><a href="/terms.html">Terms of Service</a></li>
 <li><a href="/refund.html">Refund Policy</a></li>
 </ul>
 </div>
 </div>
 <div class="footer-bottom">
 <p>© 2026 AI Study Method · aistudymethod.com · All rights reserved · <a href="/privacy.html" style="color:inherit;text-decoration:underline;">Privacy</a> · <a href="/terms.html" style="color:inherit;text-decoration:underline;">Terms</a> · <a href="/refund.html" style="color:inherit;text-decoration:underline;">Refunds</a></p>
 <div class="footer-velvet">Powered by <span>The Velvet Method®</span></div>
 <div class="footer-legal"><p>The Velvet Method<sup>®</sup> is a UK registered trade mark (UK00004394182).</p></div>
 </div>
 </div>
</footer>'''

PLAUSIBLE = '''<!-- Privacy-friendly analytics by Plausible -->
<script async src="https://plausible.io/js/pa-y_3K19wHddzHShFk02JEm.js"></script>
<script>
  window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
  plausible.init()
</script>'''

PAGE_JS = '''<script src="/classcraft/quizzes/assign.js?v=%s"></script>
<script>
(function () {
  var A = window.AismAssign, C = document.body.getAttribute("data-course");
  if (!A || !C) return;
  document.addEventListener("click", function (ev) {
    var b = ev.target.closest && ev.target.closest("[data-assign]");
    if (!b) return;
    A.openFor(C, b.getAttribute("data-assign"), { noCourseLink: true });
  });
})();
</script>''' % V


RX_NOINDEX = re.compile(r'<meta\s[^>]*name=["\']robots["\'][^>]*content=["\'][^"\']*noindex', re.I)
RX_CANON = re.compile(r'<link\s[^>]*rel=["\']canonical["\'][^>]*href=["\']([^"\']+)["\']', re.I)

def indexable(course, slug):
    """Teacher pages list only lessons the site itself publishes for search:
    no noindex, canonical pointing at itself. This keeps out held-back lessons
    and duplicates (e.g. phantom qualifications delisted by delist-phantoms.py)."""
    f = f'{course}-{slug}-mini-lesson.html'
    try:
        h = open(os.path.join(CC, 'adventures', f), encoding='utf8', errors='ignore').read(6000)
    except OSError:
        return False
    if RX_NOINDEX.search(h):
        return False
    m = RX_CANON.search(h)
    return bool(m) and m.group(1).endswith('/' + f)


def board_label(level, board, spec):
    bd = spec['boardDisplay'] if spec else board.upper()
    if level == 'ibdp':
        return bd.replace('IB ', '')
    if level == 'ks3':
        return 'National Curriculum'
    return bd


def head(title, desc, canon, extra=''):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{canon}">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="AI Study Method">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{canon}">
<meta property="og:image" content="{SITE}/og-share.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/style.css">
<link rel="stylesheet" href="/teach/teach.css?v={V}">
{PLAUSIBLE}
{extra}</head>
'''


def main():
    courses = {}
    for f in sorted(os.listdir(DATA)):
        if f.endswith('.json'):
            d = json.load(open(os.path.join(DATA, f), encoding='utf8'))
            k = f[:-5]
            kept = [r for r in d['t'] if indexable(k, r[0])]
            if len(kept) < len(d['t']):
                print(f'{k}: {len(d["t"]) - len(kept)} held-back lesson(s) left out')
            if not kept:
                print(f'{k}: no indexable lessons, no page'); continue
            d['t'] = kept
            courses[k] = d
    by_sl = collections.defaultdict(list)   # (subject, level) -> [course keys]
    for k, d in courses.items():
        by_sl[(d['s'], d['l'])].append(k)
    for v in by_sl.values():
        v.sort(key=lambda k: BOARD_ORDER.index(courses[k]['b']) if courses[k]['b'] in BOARD_ORDER else 99)

    os.makedirs(OUT, exist_ok=True)
    stats = collections.Counter()
    for k, d in courses.items():
        spec = SPECS.get(k)
        spec_slugs = {s for _, s in BOARD_TOPICS.get(k, [])}
        rows = d['t']
        main_rows = [r for r in rows if r[0] in spec_slugs]
        extra_rows = [r for r in rows if r[0] not in spec_slugs]
        n = len(rows)
        doc = DOC.get(d['l'], 'specification')
        name = d['d']
        title = f'{name} teaching resources: free lessons to set your class'
        desc = (f'Free {name} teaching resources: {n} interactive lesson{"s" if n != 1 else ""}'
                + (f' in {doc} order' if main_rows else '')
                + ', to set as class work, homework or cover. Assign through Teams, Google Classroom, a link or a QR code. No student login.')
        canon = f'{SITE}/teach/{k}.html'

        def item(i, r):
            slug, t, games, quiz = r[0], r[1], r[2], (r[3] if len(r) > 3 else 0)
            lesson = f'/classcraft/adventures/{k}-{slug}-mini-lesson.html'
            has_session = (quiz or (games and d['a']))
            tags = ''
            if quiz: tags += '<span class="tc-tag q">Quiz</span>'
            tags += '<span class="tc-tag l">Mini-lesson</span>'
            if games and d['a']: tags += '<span class="tc-tag g">Games</span>'
            act = f'<a class="tc-btn" href="{e(lesson)}">Open lesson</a>'
            if has_session:
                act += f'<a class="tc-btn" href="/teach/session.html?c={k}&amp;t={e(slug)}">Class session</a>'
                stats['session'] += 1
            act += f'<button type="button" class="tc-btn tc-pri" data-assign="{e(slug)}">Assign</button>'
            stats['lessons'] += 1
            return (f'<li class="tc-item"><span class="tc-n">{i}</span><div class="tc-main">'
                    f'<a class="tc-title" href="{e(lesson)}">{e(t)}</a><div class="tc-has">{tags}</div></div>'
                    f'<div class="tc-act">{act}</div></li>')

        body = ''
        if main_rows:
            # group by the section named before " — " in the title (KS3: Biology / Chemistry / Physics)
            secs = []
            for r in main_rows:
                sec = r[1].split(' — ', 1)[0] if ' — ' in r[1] else ''
                if secs and secs[-1][0] == sec: secs[-1][1].append(r)
                else: secs.append((sec, [r]))
            if len(secs) > 1 and all(sec for sec, _ in secs) and len(secs) < len(main_rows):
                pos = 0
                for sec, rs in secs:
                    body += (f'<h2 class="tc-h2">{e(name)}: {e(sec)}</h2><ol class="tc-list" start="{pos + 1}">'
                             + ''.join(item(pos + j + 1, r) for j, r in enumerate(rs)) + '</ol>')
                    pos += len(rs)
            else:
                body += (f'<h2 class="tc-h2">{e(name)} lessons, in {e(doc)} order</h2>'
                         '<ol class="tc-list">' + ''.join(item(i + 1, r) for i, r in enumerate(main_rows)) + '</ol>')
        if extra_rows and main_rows:
            body += ('<h2 class="tc-h2">Additional lessons</h2><p class="tc-note" style="margin:-.4rem 0 .9rem">'
                     f"These lessons aren't matched to a topic in the {doc} list above.</p>"
                     '<ol class="tc-list">' + ''.join(item(i + 1, r) for i, r in enumerate(extra_rows)) + '</ol>')
        elif extra_rows:
            body += '<ol class="tc-list">' + ''.join(item(i + 1, r) for i, r in enumerate(extra_rows)) + '</ol>'
        order_txt = f', in the order of the {doc}' if main_rows else ''
        order_note = (f"<p class=\"tc-note\">The order follows the {doc}'s topic list. Teach them in whatever order suits your scheme of work.</p>"
                      if main_rows else '')

        sibs = by_sl[(d['s'], d['l'])]
        boards = ''
        if len(sibs) > 1:
            chips = ''.join(
                f'<span>{e(board_label(courses[s]["l"], courses[s]["b"], SPECS.get(s)))}</span>' if s == k else
                f'<a href="/teach/{s}.html">{e(board_label(courses[s]["l"], courses[s]["b"], SPECS.get(s)))}</a>'
                for s in sibs)
            boards = f'<h2 class="tc-h2">Other exam boards</h2><div class="tc-boards">{chips}</div>'

        uses = ('<h2 class="tc-h2">How teachers use these lessons</h2><ul class="tc-uses">'
                '<li><b>Homework:</b> set a lesson, quiz or game. Students get instant feedback on every question.</li>'
                '<li><b>Cover lessons:</b> students work through a lesson on their own. No login or account needed.</li>'
                '<li><b>Retrieval practice and starters:</b> a short quiz or game on an earlier topic.</li>'
                '<li><b>Before a test:</b> a class session takes students through the quiz, the lesson and the games in order.</li>'
                '</ul>')
        ld = {'@context': 'https://schema.org', '@type': 'ItemList', 'name': f'{name} mini-lessons',
              'numberOfItems': n,
              'itemListElement': [{'@type': 'ListItem', 'position': i + 1, 'name': r[1],
                                   'url': f'{SITE}/classcraft/adventures/{k}-{r[0]}-mini-lesson.html'}
                                  for i, r in enumerate(main_rows + extra_rows)]}
        page_ld = {'@context': 'https://schema.org', '@type': 'CollectionPage', 'name': title, 'description': desc,
                   'url': canon, 'inLanguage': 'en-GB', 'isAccessibleForFree': True,
                   'audience': {'@type': 'EducationalAudience', 'educationalRole': 'teacher'},
                   'educationalLevel': LEVEL_SHORT[d['l']],
                   'isPartOf': {'@type': 'WebSite', 'name': 'AI Study Method', 'url': SITE + '/'},
                   'breadcrumb': {'@type': 'BreadcrumbList', 'itemListElement': [
                       {'@type': 'ListItem', 'position': 1, 'name': 'For teachers', 'item': SITE + '/teachers.html'},
                       {'@type': 'ListItem', 'position': 2, 'name': f'{name} teaching resources', 'item': canon}]},
                   'mainEntity': {k2: v2 for k2, v2 in ld.items() if k2 != '@context'}}
        extra = '<script type="application/ld+json">' + json.dumps(page_ld, ensure_ascii=False) + '</script>\n'

        page = head(title, desc, canon, extra) + f'''<body data-course="{k}">{NAV}
<div class="page-hero">
 <div class="page-hero-inner">
  <div class="tc-crumb"><a href="/teachers.html">For teachers</a> · <a href="/teachers.html#courses">All courses</a> · {e(LEVEL_SHORT[d['l']])}</div>
  <h1>{e(name)}: free lessons to set your class</h1>
  <p>{n} free interactive {e(name)} lesson{"s" if n != 1 else ""}{order_txt}, for class work, homework, cover or retrieval practice. No student login. Press <b>Assign</b> to choose what to set (quiz, lesson, games or any mix) and share it through Teams, Google Classroom, a link or a QR code.</p>
 </div>
</div>
<section class="section">
 <div class="tc-wrap">
 {body}
 {order_note}
 {uses}
 {boards}
 <p class="tc-note"><a href="/teachers.html#contact" style="color:var(--accent);font-weight:600;text-decoration:none">Teaching {e(name)}? Tell us what you need →</a></p>
 </div>
</section>
{FOOTER}
<script src="/script.js"></script>
{PAGE_JS}
</body>
</html>
'''
        open(os.path.join(OUT, k + '.html'), 'w', encoding='utf8').write(page)
        stats['pages'] += 1

    # Course directory on teachers.html
    blocks = []
    for lv, lvname in LEVELS:
        subjects = sorted({(courses[k]['s']) for k in courses if courses[k]['l'] == lv},
                          key=lambda s: (SPECS.get(next(k for k in courses if courses[k]['s'] == s and courses[k]['l'] == lv)) or {}).get('subjectDisplay', s))
        if not subjects: continue
        nlv = sum(len(courses[k]['t']) for k in courses if courses[k]['l'] == lv)
        rows = ''
        for s in subjects:
            ks = by_sl[(s, lv)]
            sd = (SPECS.get(ks[0]) or {}).get('subjectDisplay', s.replace('-', ' ').title())
            chips = ''.join(f'<a href="/teach/{k}.html">{e(board_label(lv, courses[k]["b"], SPECS.get(k)) if lv != "ks3" else "All topics")}'
                            f' <small style="opacity:.7">({len(courses[k]["t"])})</small></a>' for k in ks)
            rows += f'<div class="tc-subj"><b>{e(sd)}</b><div class="tc-boards">{chips}</div></div>'
        blocks.append(f'<details class="tc-lv"{" open" if lv == "ks3" else ""}><summary>{e(lvname)}<small>{nlv} lessons</small></summary>{rows}</details>')
    dir_html = '<div class="tc-dir">' + ''.join(blocks) + '</div>'
    tp = os.path.join(ROOT, 'teachers.html')
    t = open(tp, encoding='utf8').read()
    t2 = re.sub(r'(<!-- COURSES-START -->).*?(<!-- COURSES-END -->)', lambda m: m.group(1) + dir_html + m.group(2), t, flags=re.S)
    t2 = re.sub(r'<!-- N-LESSONS -->[\d,]*<!-- /N-LESSONS -->', f'<!-- N-LESSONS -->{stats["lessons"]:,}<!-- /N-LESSONS -->', t2)
    t2 = re.sub(r'<!-- N-COURSES -->[\d,]*<!-- /N-COURSES -->', f'<!-- N-COURSES -->{stats["pages"]}<!-- /N-COURSES -->', t2)
    if t2 != t:
        open(tp, 'w', encoding='utf8').write(t2)
    stale = sorted(f for f in os.listdir(OUT) if f.endswith('.html') and f not in ('session.html',) and f[:-5] not in courses)
    if stale:
        print('STALE course pages (delete these):', ' '.join('teach/' + f for f in stale))
    stats['revise_linked'] = link_revise_pages(courses)
    print(dict(stats))


TL_START, TL_END = '<!-- TEACH-LINK-START -->', '<!-- TEACH-LINK-END -->'


def link_revise_pages(courses):
    """Add a static 'Teaching this course?' link to every revise/ page that links to
    mini-lessons, pointing at the matching teach/<course>.html page(s). The course is
    read from the mini-lessons the page already links to. Idempotent (markers)."""
    keys = sorted(courses, key=len, reverse=True)
    rd = os.path.join(ROOT, 'revise')
    changed = 0
    pages, plan = {}, {}
    for f in sorted(os.listdir(rd)):
        if not f.endswith('.html'):
            continue
        s = open(os.path.join(rd, f), encoding='utf8').read()
        if RX_NOINDEX.search(s[:6000]):
            continue
        pages[f] = s
        cnt = collections.Counter()
        for m in re.finditer(r'classcraft/adventures/([a-z0-9-]+)-mini-lesson\.html', s):
            stem = m.group(1)
            k = next((k for k in keys if stem.startswith(k + '-')), None)
            if k: cnt[k] += 1
        if cnt:
            top = cnt.most_common(1)[0][0]
            plan[f] = (top, [k for k in by_sl_keys(courses, courses[top]['s'], courses[top]['l']) if k in cnt] or [top])
    # topic guides (alevel-biology-cells-transport.html) inherit their hub's courses (alevel-biology.html)
    hubs = sorted((f[:-5] for f in plan), key=len, reverse=True)
    for f in pages:
        if f not in plan:
            h = next((h for h in hubs if f.startswith(h + '-')), None)
            if h: plan[f] = plan[h + '.html']
    for f, s in pages.items():
        p = os.path.join(rd, f)
        old = re.search(re.escape(TL_START) + r'.*?' + re.escape(TL_END), s, re.S)
        if f not in plan:
            if old:
                open(p, 'w', encoding='utf8').write(s[:old.start()] + s[old.end():]); changed += 1
            continue
        top, ks = plan[f]
        lv = courses[top]['l']
        sd = (SPECS.get(top) or {}).get('subjectDisplay', courses[top]['s'].replace('-', ' ').title())
        who = courses[top]['d'] if lv == 'ks3' else f'{LEVEL_SHORT[lv]} {sd}'
        if len(ks) == 1:
            links = f'<a href="/teach/{ks[0]}.html" style="font-weight:600">{e(courses[ks[0]]["d"])} teaching resources →</a>'
        else:
            links = ' · '.join(f'<a href="/teach/{k}.html" style="font-weight:600">{e(board_label(lv, courses[k]["b"], SPECS.get(k)))}</a>' for k in ks)
        block = (f'{TL_START}<div class="teach-link" style="max-width:860px;margin:2rem auto;padding:14px 18px;border:1px solid rgba(124,92,191,.25);'
                 f'border-radius:12px;background:rgba(124,92,191,.05);font-size:15px;line-height:1.6">'
                 f'<b>Teaching {e(who)}?</b> Free interactive lessons to set as class work, homework or cover. No student login. {links}</div>{TL_END}')
        if old:
            s2 = s[:old.start()] + block + s[old.end():]
        else:
            i = s.rfind('<footer')
            if i < 0:
                i = s.rfind('</body>')
            if i < 0:
                continue
            s2 = s[:i] + block + '\n' + s[i:]
        if s2 != s:
            open(p, 'w', encoding='utf8').write(s2); changed += 1
    return changed


def by_sl_keys(courses, subj, level):
    ks = [k for k in courses if courses[k]['s'] == subj and courses[k]['l'] == level]
    return sorted(ks, key=lambda k: BOARD_ORDER.index(courses[k]['b']) if courses[k]['b'] in BOARD_ORDER else 99)


if __name__ == '__main__':
    main()
