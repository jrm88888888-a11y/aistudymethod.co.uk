#!/usr/bin/env python3
"""Add / refresh a static "More <course> mini-lessons" block on every sitemapped
mini-lesson so each one has several inbound internal links instead of one.

Usage (repo root):  python3 tools/add-related-lessons.py [--check]

How siblings are chosen: pages are grouped by the course named in their
<title> ("Topic — <Board> <Level> <Subject> Revision") within the same hub; ordered as their revise/ hub lists them; each page links to
the 4 before and 4 after it in that order (wrapping), so every page in a group
of 9+ receives exactly 8 inbound links. Smaller groups link to all siblings.
Idempotent: the block sits between REL-START / REL-END markers and is replaced
on re-run. Run again after adding or retiring lessons, then rebuild the sitemap.
"""
import re, sys, os, html
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
CHECK = "--check" in sys.argv
START, END = "<!-- REL-START -->", "<!-- REL-END -->"
sm = open("sitemaps/adventures.xml", encoding="utf-8").read()
files = [u.split("aistudymethod.com/")[1] for u in re.findall(r"<loc>([^<]+)</loc>", sm)]

pages, groups = {}, {}
for f in files:
    s = open(f, encoding="utf-8", errors="ignore").read()
    hub = re.search(r'href="\.\./\.\./(revise/[a-z0-9-]+\.html)"', s)
    t = re.search(r"<title>(.*?)</title>", s, re.S)
    if not (hub and t):
        print("SKIP (no hub/title):", f); continue
    tt = html.unescape(t.group(1)).split(" | ")[0]
    if " — " not in tt:
        print("SKIP (title has no course part):", f); continue
    title, course = tt.rsplit(" — ", 1)
    course = re.sub(r"\s+Revision$", "", course.strip())
    # group = the course named in the title (e.g. "Eduqas A-Level Biology"), within the same hub
    key = (hub.group(1), course)
    pages[f] = dict(key=key, hub=hub.group(1), title=title.strip(), course=course)
    groups.setdefault(key, []).append(f)

# order each group as its hub lists it
for key, fs in groups.items():
    hubfile = pages[fs[0]]["hub"]
    order = re.findall(r'href="\.\./(classcraft/adventures/[^"]+)"', open(hubfile, encoding="utf-8").read()) if os.path.exists(hubfile) else []
    rank = {p: i for i, p in enumerate(order)}
    fs.sort(key=lambda p: (rank.get(p, 10**6), p))

changed = 0
inbound = {}
for f, info in pages.items():
    fs = groups[info["key"]]
    n = len(fs)
    if n <= 1:
        sib = []
    elif n <= 9:
        sib = [p for p in fs if p != f]
    else:
        i = fs.index(f)
        sib = [fs[(i + d) % n] for d in (-4, -3, -2, -1, 1, 2, 3, 4)]
    for p in sib: inbound[p] = inbound.get(p, 0) + 1
    if not sib:
        continue
    items = "".join(f'<li><a href="{os.path.basename(p)}">{html.escape(pages[p]["title"])}</a></li>' for p in sib)
    label = html.escape(info["course"] or "this course")
    block = (f'{START}\n      <nav class="related" aria-label="More {label} mini-lessons" style="margin-top:22px;text-align:left;font-size:.95rem">'
             f'<p style="margin:0 0 6px;color:var(--soft)"><b>More {label} mini-lessons</b></p>'
             f'<ul style="margin:0;padding-left:1.2em;columns:2;column-gap:1.5em">{items}</ul></nav>\n      {END}')
    s = open(f, encoding="utf-8").read()
    if START in s:
        new = re.sub(re.escape(START) + r".*?" + re.escape(END), lambda _: block, s, flags=re.S)
    else:
        am = list(re.finditer(r'<p style="margin-top:14px"><a href="[^"]*"[^>]*>(?:→|&rarr;|&#8594;) Back to[^<]*</a></p>', s))
        if am:
            e = am[-1].end()
        elif "</section>" in s:
            e = s.rfind("</section>")   # fallback: end of the final screen
        else:
            print("SKIP (no anchor):", f); continue
        new = s[:e] + "\n      " + block + s[e:]
    if new != s:
        changed += 1
        if not CHECK:
            open(f, "w", encoding="utf-8").write(new)

singles = [f for f, i in pages.items() if len(groups[i["key"]]) == 1]
print(f"pages {len(pages)}, groups {len(groups)}, {'would change' if CHECK else 'changed'} {changed}")
print(f"singletons (no siblings to link): {len(singles)}")
if inbound:
    vals = sorted(inbound.values())
    print(f"inbound sibling links per page: min {vals[0]} median {vals[len(vals)//2]} max {vals[-1]}")
