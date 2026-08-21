#!/usr/bin/env python3
"""De-list subject/level/board combinations the awarding body does not offer.

Removes them from window.ARCADE_INDEX and from sitemap.xml, and marks their
HTML pages noindex. Deletes NO files, so no URL 404s. Dry run unless --apply.
"""
import json, re, sys, glob, os
APPLY = "--apply" in sys.argv
RETIRE = [  # (subject, level, board) - board None means the whole level
 ("astronomy","a-level",None),
 ("environmental-science","gcse","edexcel-igcse"),
 ("food-technology","gcse","edexcel"),
 ("french","gcse","ocr"), ("german","gcse","ocr"), ("spanish","gcse","ocr"),
 ("religious-studies","ibdp","hl"),
 ("sociology","a-level","edexcel"), ("sociology","gcse","edexcel"),
 ("sociology","gcse","ocr"), ("economics","gcse","edexcel"),
 ("history","a-level","eduqas"),
 ("french","gcse","eduqas"), ("german","gcse","eduqas"), ("spanish","gcse","eduqas"),
]
P = "classcraft/arcade/index.js"
raw = open(P, encoding="utf-8").read()
pre = "window.ARCADE_INDEX = "
assert raw.startswith(pre), "unexpected index.js prologue"
body = raw[len(pre):].rstrip().rstrip(";")
idx = json.loads(body)
def count(ix): return sum(len(b["topics"]) for s in ix["subjects"] for l in s["levels"] for b in l["boards"])
before_t, before_s = count(idx), len(idx["subjects"])
removed = []
for subj, lvl, brd in RETIRE:
    for s in idx["subjects"]:
        if s["id"] != subj: continue
        for l in list(s["levels"]):
            if l["id"] != lvl: continue
            if brd is None:
                removed.append((subj,lvl,"ALL",sum(len(b["topics"]) for b in l["boards"])))
                s["levels"].remove(l)
            else:
                for b in list(l["boards"]):
                    if b["id"] == brd:
                        removed.append((subj,lvl,brd,len(b["topics"])))
                        l["boards"].remove(b)
                if not l["boards"]: s["levels"].remove(l)
idx["subjects"] = [s for s in idx["subjects"] if s["levels"]]
after_t, after_s = count(idx), len(idx["subjects"])
print(f"arcade index: topics {before_t} -> {after_t}  (-{before_t-after_t}) | subjects {before_s} -> {after_s}")
for r in removed: print(f"    removed {r[0]}|{r[1]}|{r[2]}  ({r[3]} topics)")
missing = [f"{a}|{b}|{c}" for a,b,c in RETIRE if not any(r[0]==a and r[1]==b and (r[2]==c or r[2]=='ALL') for r in removed)]
if missing: print("    NOT FOUND IN INDEX (already absent):", ", ".join(missing))

# sitemap + noindex
stems = []
for subj,lvl,brd in RETIRE:
    stems.append(f"{subj}-{lvl}" + (f"-{brd}" if brd else ""))
# sitemap.xml is now a generated index (see _dev/tools/build-sitemap.py); the
# noindex meta added below is what removes a page from it on the next build.
print("sitemap: re-run  python3 _dev/tools/build-sitemap.py  after --apply")
pages = []
for st in stems:
    pages += glob.glob(f"classcraft/adventures/{st}*.html") + glob.glob(f"classcraft/games/{st}*.html")
todo = []
for f in pages:
    t = open(f, encoding="utf-8").read()
    if 'name="robots"' not in t: todo.append(f)
print(f"pages to mark noindex: {len(todo)} of {len(pages)}")
if APPLY:
    open(P,"w",encoding="utf-8").write(pre + json.dumps(idx, ensure_ascii=False, separators=(",",":")) + ";\n")
    for f in todo:
        t = open(f, encoding="utf-8").read()
        t = t.replace("<head>", '<head>\n<meta name="robots" content="noindex,follow">', 1)
        open(f,"w",encoding="utf-8").write(t)
print("MODE:", "APPLY" if APPLY else "DRY RUN")
