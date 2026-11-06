#!/usr/bin/env python3
"""Measured minutes per mission, from Plausible, for the lesson welcome chips.

progress.js reports "Mission: completed" with props mission (N) and mins (active
minutes the student spent on that mission: gaps between interactions under two
minutes while the tab is visible). This script pulls those events for the last
DAYS days from the Plausible Stats API, takes the weighted median per lesson and
mission where at least MIN_N completions exist, and writes

  classcraft/quizzes/lesson-next/mission-minutes.json
    {"generated": "YYYY-MM-DD", "days": 90, "min_n": 10,
     "lessons": {"<stem>": {"m1": {"min": 12, "n": 34}, ...}}}

tools/build-lesson-next.py then uses these instead of the words-per-minute
formula (the course JSON's m rows get a 5th field, 1 = measured), and the pages
show them without the "~".

Needs a Plausible API key (Settings → API keys, "Stats API") in the environment
variable PLAUSIBLE_API_KEY or in ~/.plausible-api-key. Run from the repo root:

  python3 tools/measure-mission-minutes.py            # writes the file
  python3 tools/measure-mission-minutes.py --dry-run  # prints what it would write
  python3 tools/measure-mission-minutes.py --from-json events.json   # offline: a saved API response

Then: python3 tools/build-lesson-next.py
"""
import json, os, sys, re, datetime, urllib.request, urllib.error, collections

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'classcraft', 'quizzes', 'lesson-next', 'mission-minutes.json')
SITE = 'aistudymethod.com'
API = 'https://plausible.io/api/v2/query'
DAYS = 90
MIN_N = 10
SUF = '-mini-lesson.html'


def api_key():
    k = os.environ.get('PLAUSIBLE_API_KEY', '').strip()
    if k: return k
    p = os.path.expanduser('~/.plausible-api-key')
    if os.path.exists(p): return open(p).read().strip()
    sys.exit('No Plausible API key: set PLAUSIBLE_API_KEY or write it to ~/.plausible-api-key '
             '(Plausible → Settings → API keys → Stats API).')


def query(key):
    end = datetime.date.today()
    start = end - datetime.timedelta(days=DAYS)
    body = {
        'site_id': SITE,
        'metrics': ['events'],
        'date_range': [start.isoformat(), end.isoformat()],
        'filters': [['is', 'event:goal', ['Mission: completed']]],
        'dimensions': ['event:page', 'event:props:mission', 'event:props:mins'],
        'pagination': {'limit': 10000, 'offset': 0},
    }
    rows = []
    while True:
        req = urllib.request.Request(API, data=json.dumps(body).encode(), method='POST',
                                     headers={'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json'})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                data = json.load(r)
        except urllib.error.HTTPError as e:
            sys.exit(f'Plausible API error {e.code}: {e.read().decode()[:400]}')
        rows += data.get('results', [])
        if len(data.get('results', [])) < body['pagination']['limit']: break
        body['pagination']['offset'] += body['pagination']['limit']
    return rows


def weighted_median(pairs):
    """pairs: [(value, count)] -> median value by count."""
    pairs = sorted(pairs)
    total = sum(c for _, c in pairs)
    half = total / 2.0
    run = 0
    for v, c in pairs:
        run += c
        if run >= half: return v
    return pairs[-1][0]


def aggregate(rows):
    by = collections.defaultdict(lambda: collections.defaultdict(list))   # stem -> mN -> [(mins, n)]
    skipped = 0
    for r in rows:
        page, mission, mins = r['dimensions']
        n = r['metrics'][0]
        m = re.search(r'/([a-z0-9-]+)' + re.escape(SUF) + r'$', page or '')
        if not m or not re.fullmatch(r'\d+', str(mission or '')) or not re.fullmatch(r'\d+', str(mins or '')):
            skipped += n; continue
        by[m.group(1)]['m' + str(mission)].append((int(mins), int(n)))
    out = {}
    for stem, ms in by.items():
        for mid, pairs in ms.items():
            n = sum(c for _, c in pairs)
            if n < MIN_N: continue
            out.setdefault(stem, {})[mid] = {'min': max(1, weighted_median(pairs)), 'n': n}
    return out, skipped


def main():
    args = sys.argv[1:]
    dry = '--dry-run' in args
    if '--from-json' in args:
        rows = json.load(open(args[args.index('--from-json') + 1]))
        if isinstance(rows, dict): rows = rows.get('results', [])
    else:
        rows = query(api_key())
    lessons, skipped = aggregate(rows)
    doc = {'generated': datetime.date.today().isoformat(), 'days': DAYS, 'min_n': MIN_N, 'lessons': lessons}
    n_m = sum(len(v) for v in lessons.values())
    print(f'rows {len(rows)}, events without usable props {skipped}, lessons with measured missions {len(lessons)}, missions {n_m}')
    if dry:
        print(json.dumps(doc, indent=1)[:4000]); return
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    json.dump(doc, open(OUT, 'w', encoding='utf8'), ensure_ascii=False, separators=(',', ':'))
    print('wrote', os.path.relpath(OUT, ROOT), '— now run tools/build-lesson-next.py')


if __name__ == '__main__':
    main()
