#!/usr/bin/env python3
"""Build classcraft/quizzes/lesson-next/<group>.json for lesson-next.js.

For every mini-lesson it records, per group (subject-level-board):
  a : arcade preset query for the group ("subject=..&level=..&board=..",
      "subject=..&level=.." when the arcade has the subject+level but not the
      board, or "" when the arcade has no matching shelf)
  t : ordered lessons [[slug, title, 1 if the arcade has this exact topic,
                        1 if a confidence quiz exists for this topic]]
  s, l, b : subject, level, board ids;  d : course display name
            ("AQA GCSE Chemistry") — used by assign.js, teach/session.html and
            tools/build-teach-pages.py
Order = spec order from classcraft/topic-slugs.js, then any extras A-Z.
Run from the repo root:  python3 tools/build-lesson-next.py
"""
import json, os, re, html, sys, collections

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CC = os.path.join(ROOT, 'classcraft')
ADV = os.path.join(CC, 'adventures')
OUT = os.path.join(CC, 'quizzes', 'lesson-next')
SUF = '-mini-lesson.html'
BOARDS = ['edexcel-igcse', 'cambridge-igcse', 'general', 'edexcel', 'eduqas',
          'wjec', 'ccea', 'aqa', 'ocr', 'hl', 'sl', 'ib']   # longest first
RX = re.compile(r'^(.+?)-(ks3|gcse|a-level|ibdp)-(' + '|'.join(BOARDS) + r')-(.+)$')

def load_js_object(path, name):
    s = open(path, encoding='utf8').read()
    i = s.index(name); i = s.index('{', i)
    return json.JSONDecoder().raw_decode(s[i:])[0]

board_topics = load_js_object(os.path.join(CC, 'topic-slugs.js'), 'window.BOARD_TOPICS')
arcade = load_js_object(os.path.join(CC, 'arcade', 'index.js'), 'window.ARCADE_INDEX')
OPTION_BASED = set(re.findall(r"'([a-z-]+)'", re.search(
    r'OPTION_BASED_SUBJECTS\s*=\s*new Set\(\[(.*?)\]\)',
    open(os.path.join(CC, 'arcade.html'), encoding='utf8').read(), re.S).group(1)))

def arcade_topics(subj, level, board):
    """Mirror of topicsFor() in arcade.html: board topics + shared general pool."""
    s = next((x for x in arcade['subjects'] if x['id'] == subj), None)
    if not s: return None, None
    l = next((x for x in s['levels'] if x['id'] == level), None)
    if not l: return None, None
    b = next((x for x in l['boards'] if x['id'] == board), None)
    if not b: return 'level', set()
    slugs = {t['slug'] for t in b['topics']}
    if board != 'general' and subj not in OPTION_BASED:
        g = next((x for x in l['boards'] if x['id'] == 'general'), None)
        if g: slugs |= {t['slug'] for t in g['topics']}
    return 'board', slugs

def page_title(path):
    s = open(path, encoding='utf8', errors='replace').read(4000)
    m = re.search(r'<title>(.*?)</title>', s, re.S)
    t = html.unescape(m.group(1)) if m else ''
    return re.split(r'\s+[—–|]\s+', t)[0].strip()

EVAL = {x[:-5] for x in json.load(open(os.path.join(CC, 'evaluate-manifest.json'), encoding='utf8'))}
SPECS = {e['key']: e for e in json.load(open(os.path.join(CC, 'specs-manifest.json'), encoding='utf8'))}

def course_name(subj, level, board):
    e = SPECS.get(f'{subj}-{level}-{board}')
    sd = e['subjectDisplay'] if e else subj.replace('-', ' ').title()
    bd = e['boardDisplay'] if e else board.upper()
    if level == 'ks3':   return f'KS3 {sd}'
    if level == 'gcse':  return f'{bd} {sd}' if 'IGCSE' in bd or 'International GCSE' in bd else f'{bd} GCSE {sd}'
    if level == 'a-level': return f'{bd} A-Level {sd}'
    if level == 'ibdp':  return f'IB Diploma {sd} {bd.replace("IB ", "")}'
    return f'{bd} {sd}'

groups = collections.defaultdict(list)
bad = []
for f in sorted(os.listdir(ADV)):
    if not f.endswith(SUF): continue
    m = RX.match(f[:-len(SUF)])
    if not m: bad.append(f); continue
    subj, level, board, slug = m.groups()
    groups[(subj, level, board)].append(slug)
if bad:
    print('UNPARSED:', len(bad)); [print('  ', b) for b in bad[:20]]

os.makedirs(OUT, exist_ok=True)
stats = collections.Counter(); written = set()
for (subj, level, board), slugs in sorted(groups.items()):
    key = f'{subj}-{level}-{board}'
    spec = board_topics.get(key, [])
    names = {s: n for n, s in spec}
    order = [s for _, s in spec if s in slugs]
    order += sorted(s for s in slugs if s not in names)
    kind, atopics = arcade_topics(subj, level, board)
    if kind == 'board':   a = f'subject={subj}&level={level}&board={board}'
    elif kind == 'level': a = f'subject={subj}&level={level}'
    else:                 a = ''
    stats['group_' + (kind or 'none')] += 1
    rows = []
    for s in order:
        title = names.get(s) or page_title(os.path.join(ADV, f'{key}-{s}{SUF}')) or s.replace('-', ' ').title()
        has = 1 if (kind == 'board' and s in atopics) else 0
        stats['lesson_' + (kind or 'none')] += 1
        stats['lesson_topic_preset'] += has
        q = 1 if f'{key}-{s}' in EVAL else 0
        stats['lesson_quiz'] += q
        rows.append([s, title, has, q])
    name = key + '.json'
    json.dump({'a': a, 's': subj, 'l': level, 'b': board, 'd': course_name(subj, level, board), 't': rows}, open(os.path.join(OUT, name), 'w', encoding='utf8'),
              ensure_ascii=False, separators=(',', ':'))
    written.add(name)
for old in os.listdir(OUT):
    if old.endswith('.json') and old not in written:
        print('STALE (not removed):', old)
print(json.dumps(stats, indent=1)); print('groups', len(groups), 'lessons', sum(len(v) for v in groups.values()))
