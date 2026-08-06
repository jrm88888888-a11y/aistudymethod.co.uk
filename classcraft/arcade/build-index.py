#!/usr/bin/env python3
"""Split arcade/index.js into lazy-loaded parts.

Reads   : arcade/index.js            (the existing 356 kB blob - source of truth)
Writes  : arcade/boot.js             subject list + precomputed TODAY table
          arcade/subjects/<id>.json  one per subject, fetched when picked
          arcade/legacy/<s>__<l>.json  fetched after a level is picked
          arcade/flat.json           Quick Play pool, fetched on click

Re-run this whenever index.js changes, or when the TODAY table runs out.
The TODAY table is precomputed because Arcade.seededShuffle(flat, dayNumber())
is deterministic - there is no reason to ship 356 kB so every browser can
compute the same answer. mulberry32 + Fisher-Yates are reproduced below and
are verified against the real JS by arcade/verify-index.js.
"""
import json, os, time

M32 = 0xFFFFFFFF
def mulberry32(seed):
    t = seed & M32
    def rnd():
        nonlocal t
        t = (t + 0x6D2B79F5) & M32
        r = ((t ^ (t >> 15)) * (1 | t)) & M32
        r = (r ^ ((r + (((r ^ (r >> 7)) * (61 | r)) & M32)) & M32)) & M32
        return ((r ^ (r >> 14)) & M32) / 4294967296.0
    return rnd

def seeded_shuffle(arr, seed):
    rnd = mulberry32(seed); a = list(arr)
    for i in range(len(a) - 1, 0, -1):
        j = int(rnd() * (i + 1)); a[i], a[j] = a[j], a[i]
    return a

DAYS = 180          # 6 months; the client falls back to flat.json if it runs out
HERE = os.path.dirname(os.path.abspath(__file__))
os.chdir(HERE)

src = open('index.js').read()
d = json.loads(src[src.index('{'):].rstrip().rstrip(';'))
subs, legacy = d['subjects'], d.get('legacy', {})

os.makedirs('subjects', exist_ok=True)
os.makedirs('legacy', exist_ok=True)
W = lambda p, o: open(p, 'w').write(json.dumps(o, separators=(',', ':')))

for sx in subs:
    W('subjects/%s.json' % sx['id'], sx)
for k, v in legacy.items():
    W('legacy/%s.json' % k.replace('|', '__'), v)

# Flat list in the SAME order arcade.html built it - the order defines the daily pick.
flat_full, quick = [], []
for sx in subs:
    for l in sx.get('levels', []):
        for b in l.get('boards', []):
            for t in b.get('topics', []):
                flat_full.append({"subject": sx["id"], "subjectLabel": sx["d"], "level": l["id"],
                                  "board": b["id"], "topic": t["slug"], "topicLabel": t["d"]})
                if t.get('s'):
                    quick.append([sx["id"], l["id"], b["id"], t["slug"]])   # arrays: half the bytes
W('flat.json', quick)

day0 = int(time.time() // 86400) - 2      # start 2 days back to survive clock skew / timezones
daily = {}
for day in range(day0, day0 + DAYS):
    p = seeded_shuffle(flat_full, day)[0]
    daily[str(day)] = [p["subject"], p["level"], p["board"], p["topic"], p["topicLabel"]]  # subjectLabel comes from boot.subjects

open('boot.js', 'w').write('window.ARCADE_BOOT=' + json.dumps(
    {"subjects": [{"id": x["id"], "d": x["d"],
                   "lv": [l["d"] for l in x.get("levels", [])]} for x in subs],
     "daily": daily, "dailyFrom": day0, "dailyTo": day0 + DAYS - 1},
    separators=(',', ':')) + ';')

kb = lambda p: os.path.getsize(p) / 1024
print("boot.js      %7.1f kB   subject list + %d days of TODAY (%d..%d)" % (kb('boot.js'), DAYS, day0, day0 + DAYS - 1))
print("flat.json    %7.1f kB   %d playable topics" % (kb('flat.json'), len(quick)))
print("subjects/    %3d files  median %.1f kB" % (len(subs), sorted(kb('subjects/%s.json' % x['id']) for x in subs)[len(subs)//2]))
print("legacy/      %3d files  median %.1f kB" % (len(legacy), sorted(kb('legacy/%s.json' % k.replace('|','__')) for k in legacy)[len(legacy)//2]))
print()
print("first paint  %.1f kB  (index.js was %.1f kB)  -> %.1f%% smaller" % (kb('boot.js'), kb('index.js'), 100*(1-kb('boot.js')/kb('index.js'))))
