#!/usr/bin/env python3
"""Build classcraft/quizzes/lesson-next/<group>.json for lesson-next.js.

For every mini-lesson it records, per group (subject-level-board):
  a : arcade preset query for the group ("subject=..&level=..&board=..",
      "subject=..&level=.." when the arcade has the subject+level but not the
      board, or "" when the arcade has no matching shelf)
  t : ordered lessons [[slug, title, 1 if the arcade has this exact topic,
                        1 if a confidence quiz exists for this topic(, file stem)]]
      The 5th field is present only when the lesson file is not <group>-<slug>
      (one file shared by two boards, e.g. IB Geography SL and HL).
  o : (courses in GUIDE only) the slugs that follow the subject guide, in order;
      the course's other lessons come after them as additional lessons
  af : 0 for a KS3 course whose arcade shelf has fewer topics than half its lessons
       (no course-shelf fallback for lessons without their own games)
  s, l, b : subject, level, board ids;  d : course display name
            ("AQA GCSE Chemistry") — used by assign.js, teach/session.html and
            tools/build-teach-pages.py
  h : {slug: [poster, question, thumb]} for lessons that open with a hook video
      (poster path relative to classcraft/adventures/, "" while the video is still
      to be made; question = the hook's data-title; thumb = 640px copy of the poster
      relative to the site root, present when images/lesson-thumbs/ has one) — used by the completion card, the lesson finder and lessons.html
  v : slugs that have a Verify quiz (classcraft/verify-manifest.json)
Also writes lesson-next/index.json: every course as
  {k, s, l, b, d, sd, bd, n, hn} (key, ids, course name, subject and board display
  names, lesson count, lessons with a hook) — the data behind the lesson finder on
  index.html and lessons.html.
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

_HOOK = re.compile(r'<div class="ks3-hook"([^>]*)>')
def hook_info(path):
    """[poster, question] from the lesson's opening hook video, or None."""
    s = open(path, encoding='utf8', errors='replace').read()
    m = _HOOK.search(s)
    if not m: return None
    attrs = dict(re.findall(r'data-([a-z-]+)="([^"]*)"', m.group(1)))
    if not attrs.get('title'): return None
    poster = attrs.get('poster', '')                 # "" = video not made yet
    out = [poster, html.unescape(attrs['title'])]
    if poster:                                       # 640px copy for lists and cards (tools/make-lesson-thumbs.sh)
        thumb = 'images/lesson-thumbs/' + os.path.basename(poster)
        if os.path.exists(os.path.join(ROOT, thumb)): out.append(thumb)
    return out

# Courses whose lesson list is set here, in subject guide order: (slug, title, file stem or
# None). IB Geography (Oct 2026): the Core and Option unit lessons serve SL and HL from one
# file named without a board; the HL extension units are named with "hl". The older
# overview pages stay on the list after these, as additional lessons.
_GEO_OPT = [('option-a-freshwater', 'Option A: Freshwater'),
            ('option-b-oceans-coastal-margins', 'Option B: Oceans and coastal margins'),
            ('option-c-extreme-environments', 'Option C: Extreme environments'),
            ('option-d-geophysical-hazards', 'Option D: Geophysical hazards'),
            ('option-e-leisure-tourism-sport', 'Option E: Leisure, tourism and sport'),
            ('option-f-food-health', 'Option F: Food and health'),
            ('option-g-urban-environments', 'Option G: Urban environments')]
_GEO_CORE = [('core-unit-1-changing-population', 'Unit 1: Changing population'),
             ('core-unit-2-global-climate-vulnerability-resilience', 'Unit 2: Global climate, vulnerability and resilience'),
             ('core-unit-3-global-resource-consumption-security', 'Unit 3: Global resource consumption and security')]
_GEO_HL = [('unit-4-power-places-networks', 'Unit 4: Power, places and networks'),
           ('unit-5-human-development-diversity', 'Unit 5: Human development and diversity'),
           ('unit-6-global-risks-resilience', 'Unit 6: Global risks and resilience')]
_GEO_SHARED = ([('Geographic themes — ' + t, s, 'geography-ibdp-' + s) for s, t in _GEO_OPT]
               + [('Core — ' + t, s, 'geography-ibdp-' + s) for s, t in _GEO_CORE])
GUIDE = {
    'geography-ibdp-hl': _GEO_SHARED + [('HL core extension — ' + t, s, None) for s, t in _GEO_HL]
                         + [('Internal assessment — Fieldwork report', 'internal-assessment-fieldwork-report', None)],
    'geography-ibdp-sl': _GEO_SHARED
                         + [('Internal assessment — Fieldwork report', 'internal-assessment-fieldwork-report', None)],
}

EVAL = {x[:-5] for x in json.load(open(os.path.join(CC, 'evaluate-manifest.json'), encoding='utf8'))}
VERIFY = {x[:-5] for x in json.load(open(os.path.join(CC, 'verify-manifest.json'), encoding='utf8'))}
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
stats = collections.Counter(); written = set(); index = []
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
    guide = GUIDE.get(key)
    if guide:
        for gt, gs, gf in guide:
            stem = gf or f'{key}-{gs}'
            if not os.path.exists(os.path.join(ADV, stem + SUF)):
                print('GUIDE lesson missing:', stem); continue
            has = 1 if (kind == 'board' and gs in atopics) else 0
            q = 1 if f'{key}-{gs}' in EVAL else 0
            rows.append([gs, gt, has, q] + ([gf] if gf else []))
        order = [s for s in order if s not in {g[1] for g in guide}]
    for s in order:
        nm = names.get(s)
        if nm and re.fullmatch(r'[a-z0-9-]+', nm):   # topic list gives only the slug (IB Biology): use the lesson's own title
            nm = None
        title = nm or page_title(os.path.join(ADV, f'{key}-{s}{SUF}')) or s.replace('-', ' ').title()
        has = 1 if (kind == 'board' and s in atopics) else 0
        stats['lesson_' + (kind or 'none')] += 1
        stats['lesson_topic_preset'] += has
        q = 1 if f'{key}-{s}' in EVAL else 0
        stats['lesson_quiz'] += q
        rows.append([s, title, has, q])
    hooks, verify = {}, []
    for r in rows:
        stem = r[4] if len(r) > 4 else f'{key}-{r[0]}'
        hi = hook_info(os.path.join(ADV, stem + SUF))
        if hi: hooks[r[0]] = hi
        if f'{key}-{r[0]}' in VERIFY: verify.append(r[0])
    stats['lesson_hook'] += len(hooks)
    name = key + '.json'
    # af = 0 (KS3 only): a KS3 course such as science spans biology, chemistry and
    # physics on ONE shelf that is being filled topic by topic, so a lesson without its
    # own games must not be sent to the course shelf - it would land on another strand's
    # topics. lesson-next.js then offers the plain arcade instead. Other levels keep the
    # course-shelf fallback (their shelves are the same subject and board).
    out = {'a': a, 's': subj, 'l': level, 'b': board, 'd': course_name(subj, level, board), 't': rows}
    if guide:
        out['o'] = [r[0] for r in rows if any(r[0] == g[1] for g in guide)]
    if hooks: out['h'] = hooks
    if verify: out['v'] = verify
    if level == 'ks3' and kind == 'board' and len(atopics) * 2 < len(rows):
        out['af'] = 0
        stats['group_course_fallback_off'] += 1
    json.dump(out, open(os.path.join(OUT, name), 'w', encoding='utf8'),
              ensure_ascii=False, separators=(',', ':'))
    written.add(name)
    e = SPECS.get(key)
    index.append({'k': key, 's': subj, 'l': level, 'b': board, 'd': out['d'],
                  'sd': e['subjectDisplay'] if e else subj.replace('-', ' ').title(),
                  'bd': e['boardDisplay'] if e else board.upper(),
                  'n': len(rows), 'hn': len(hooks)})
json.dump(index, open(os.path.join(OUT, 'index.json'), 'w', encoding='utf8'),
          ensure_ascii=False, separators=(',', ':'))
written.add('index.json')
for old in os.listdir(OUT):
    if old.endswith('.json') and old not in written:
        print('STALE (not removed):', old)
print(json.dumps(stats, indent=1)); print('groups', len(groups), 'lessons', sum(len(v) for v in groups.values()))
