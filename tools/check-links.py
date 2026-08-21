#!/usr/bin/env python3
"""Static internal-link check for the published pages.

Usage (from anywhere):  python3 tools/check-links.py [--all]

Default scope: every URL in sitemaps/*.xml plus every root-level and
classcraft/*.html page. --all scans every tracked .html file instead.
Checks each relative href/src (and the href of any <link rel=canonical>)
resolves to a file that exists in the repo. Exits 1 if anything is broken,
so it can gate CI.
"""
import os, re, sys, glob, subprocess
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
SITE = "https://aistudymethod.com/"

def pages():
    if "--all" in sys.argv:
        out = subprocess.run(["git", "ls-files", "*.html"], capture_output=True, text=True).stdout.split()
        return [p for p in out if p.endswith(".html")]
    urls = []
    for f in glob.glob("sitemaps/*.xml"):
        urls += re.findall(r"<loc>([^<]+)</loc>", open(f, encoding="utf-8").read())
    ps = set()
    for u in urls:
        p = u.replace(SITE, "") or "index.html"
        if p.endswith("/"): p += "index.html"
        ps.add(p)
    ps.update(glob.glob("*.html")); ps.update(glob.glob("classcraft/*.html"))
    return sorted(ps)

RX = re.compile(r'(?:href|src)="([^"#?]+)(?:[#?][^"]*)?"')
broken = {}
scanned = 0
for p in pages():
    if not os.path.exists(p): continue
    s = open(p, encoding="utf-8", errors="ignore").read()
    scanned += 1
    for h in set(RX.findall(s)):
        if h.startswith(("http", "mailto:", "tel:", "//", "data:", "javascript:")) or "'" in h or "$" in h or "{" in h:
            continue
        if h.startswith(SITE): h = "/" + h[len(SITE):]
        t = h.lstrip("/") if h.startswith("/") else os.path.normpath(os.path.join(os.path.dirname(p), h))
        if t in ("", ".") or os.path.isdir(t) or os.path.exists(t): continue
        broken.setdefault(t, []).append(p)

print(f"scanned {scanned} pages; broken link targets: {len(broken)}")
for t, ps in sorted(broken.items(), key=lambda x: -len(x[1])):
    print(f"  {len(ps):5d}  {t}   e.g. {ps[0]}")
sys.exit(1 if broken else 0)
