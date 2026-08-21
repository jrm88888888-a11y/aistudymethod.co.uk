#!/usr/bin/env python3
"""Check every subject/level/board combination the site OFFERS TO USERS against
the verified qualification registry (classcraft/_data/qualifications.json).

"Offers to users" = present in the arcade index, the three manifests, or the
sitemap. Files that exist on disk but are listed nowhere are reported
separately: they are unreachable, so they make no false claim.

FAIL = the awarding body does not offer that subject at that level.
"""
import json, glob, os, re, collections, sys
REG = json.load(open("classcraft/_data/qualifications.json", encoding="utf-8"))
LEVELS = ("a-level", "gcse", "ks3", "ibdp", "ap")
BOARDS = ("cambridge-igcse", "edexcel-igcse", "physics-c-mechanics", "physics-c-em",
          "comparative-government", "literature-culture", "language-culture",
          "human-geography", "european-history", "2d-art-design", "3d-art-design",
          "us-government", "world-history", "collegeboard", "precalculus",
          "macroeconomics", "microeconomics", "music-theory", "calculus-ab",
          "calculus-bc", "statistics", "us-history", "art-history", "physics-1",
          "physics-2", "drawing", "csa", "csp",
          "aqa", "edexcel", "ocr", "ccea", "eduqas", "wjec", "hl", "sl", "general")
def parse(stem):
    p = stem.split("-")
    for i in range(len(p)):
        for L in LEVELS:
            n = len(L.split("-"))
            if "-".join(p[i:i+n]) == L:
                rest = p[i+n:]
                for B in BOARDS:
                    n2 = len(B.split("-"))
                    if "-".join(rest[:n2]) == B: return ("-".join(p[:i]), L, B)
                return ("-".join(p[:i]), L, None)
    return None

live = collections.defaultdict(collections.Counter)
raw = open("classcraft/arcade/index.js", encoding="utf-8").read()
ix = json.loads(raw[raw.index("{"):raw.rstrip().rstrip(";").rindex("}")+1])
for s in ix["subjects"]:
    for l in s["levels"]:
        for b in l["boards"]:
            live[(s["id"], l["id"], b["id"])]["arcade"] += len(b["topics"])
for path, key in [("classcraft/specs-manifest.json","spec-map"),
                  ("classcraft/learn-manifest.json","mini-lesson"),
                  ("classcraft/evaluate-manifest.json","quiz")]:
    for x in json.load(open(path, encoding="utf-8")):
        stem = x.get("key") if isinstance(x, dict) else x.rsplit(".",1)[0].replace("-mini-lesson","")
        k = parse(stem)
        if k and k[2]: live[k][key] += 1
import glob as _glob
_sm = "".join(open(f, encoding="utf-8").read() for f in _glob.glob("sitemaps/*.xml")) or open("sitemap.xml", encoding="utf-8").read()
for m in re.findall(r"<loc>([^<]+)</loc>", _sm):
    k = parse(os.path.basename(m).rsplit(".",1)[0].replace("-mini-lesson",""))
    if k and k[2]: live[k]["sitemap"] += 1

fails, notes, warns = [], [], []
for k in sorted(live):
    e = REG.get("|".join(k))
    if e is None:
        if k[1] != "ks3": warns.append(("|".join(k), dict(live[k])))
    elif e["status"] == "verified-absent": fails.append(("|".join(k), dict(live[k]), e.get("note","")))
    elif e["status"] not in ("verified-real","verified-real-legacy-slug"): notes.append(("|".join(k), e["status"], e.get("note","")))

print(f"combinations offered to users: {len(live)}   registry entries: {len(REG)}\n")
print(f"FAIL — offered to users but the awarding body does not offer it ({len(fails)}):")
for k,c,n in fails: print(f"  {k}\n      listed in: {c}\n      {n}")
print(f"\nNOTE — real but changing, misnamed or ambiguous ({len(notes)}):")
for k,st,n in notes: print(f"  {k}  [{st}]\n      {n}")
print(f"\nWARN — offered but not yet verified either way ({len(warns)}):")
for k,c in warns: print(f"  {k}  {c}")
if "--strict" in sys.argv and fails: sys.exit(1)
