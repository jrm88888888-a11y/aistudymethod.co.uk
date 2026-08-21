#!/usr/bin/env python3
"""Build the sitemap index and per-section child sitemaps from the files on disk.

Usage (from repo root):
    python3 tools/build-sitemap.py            # write sitemap.xml + sitemaps/*.xml
    python3 tools/build-sitemap.py --check    # report only, write nothing

Rules (a page is listed only if ALL hold):
  * it is an .html file under one of SECTIONS' roots
  * its <meta name="robots"> does not contain "noindex"
  * it has a <link rel="canonical"> that points at its own URL
    (an index.html may canonicalise to either its directory URL or itself;
    whichever it declares is what gets listed)
  * it is not a backup / scratch / launcher file (see SKIP)

lastmod is the last git commit date of the file (%cI). Files with uncommitted
changes or not yet tracked get today's date. <changefreq>/<priority> are not
emitted (Google ignores them).

Output:
    sitemap.xml              sitemap index
    sitemaps/core.xml        root pages, guides/, games/, classcraft/*.html hubs
    sitemaps/revise.xml      revise/
    sitemaps/adventures.xml  classcraft/adventures/
"""
import os, re, sys, subprocess, datetime
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

SITE = "https://aistudymethod.com/"
CHECK = "--check" in sys.argv

# section name -> list of (root dir, recurse?)
SECTIONS = {
    "core": [(".", False), ("guides", True), ("games", True), ("classcraft", False)],
    "revise": [("revise", True)],
    "adventures": [("classcraft/adventures", True)],
}
SKIP = re.compile(r"(^|/)(404\.html|feedback-survey\.html|Velvet-Method-Prompt-Library\.html|.*-launcher\.html|.*\.bak|.*backup.*)$", re.I)

RX_NOINDEX = re.compile(r'<meta\s[^>]*name=["\']robots["\'][^>]*content=["\'][^"\']*noindex', re.I)
RX_NOINDEX2 = re.compile(r'<meta\s[^>]*content=["\'][^"\']*noindex[^"\']*["\'][^>]*name=["\']robots["\']', re.I)
RX_CANON = re.compile(r'<link\s[^>]*rel=["\']canonical["\'][^>]*href=["\']([^"\']+)["\']', re.I)
RX_CANON2 = re.compile(r'<link\s[^>]*href=["\']([^"\']+)["\'][^>]*rel=["\']canonical["\']', re.I)

def git_dates():
    """Map path -> ISO date of last commit touching it, in one git call."""
    out = subprocess.run(["git", "log", "--format=%x00%cI", "--name-only", "--", "."],
                         capture_output=True, text=True).stdout
    dates, cur = {}, None
    for line in out.splitlines():
        if line.startswith("\x00"):
            cur = line[1:11]
        elif line.strip() and line not in dates:
            dates[line.strip()] = cur
    dirty = set()
    st = subprocess.run(["git", "status", "--porcelain", "--untracked-files=all"],
                        capture_output=True, text=True).stdout
    for line in st.splitlines():
        dirty.add(line[3:].strip())
    return dates, dirty

def url_for(path):
    if path == "index.html":
        return SITE
    if path.endswith("/index.html"):
        return SITE + path[:-len("index.html")]
    return SITE + path

def classify(path):
    try:
        s = open(path, encoding="utf-8", errors="ignore").read()
    except OSError:
        return "unreadable", None
    if RX_NOINDEX.search(s) or RX_NOINDEX2.search(s):
        return "noindex", None
    m = RX_CANON.search(s) or RX_CANON2.search(s)
    if not m:
        return "no-canonical", None
    canon = m.group(1).strip()
    u = url_for(path)
    if canon == u or (path.endswith("index.html") and canon == SITE + path):
        return "ok", canon  # list the URL the page itself declares canonical
    return "canonical-elsewhere", canon

def walk(root, recurse):
    for dirpath, dirs, files in os.walk(root):
        if not recurse:
            dirs[:] = []
        else:
            dirs[:] = sorted(d for d in dirs if not d.startswith((".", "_")))
        for f in sorted(files):
            if not f.endswith(".html"):
                continue
            p = os.path.normpath(os.path.join(dirpath, f))
            if p.startswith(("_", ".")) or p.split("/")[0].startswith("_"):
                continue
            yield p

def main():
    dates, dirty = git_dates()
    today = datetime.date.today().isoformat()
    results, skipped = {}, {}
    for sec, roots in SECTIONS.items():
        urls = []
        for root, rec in roots:
            for p in walk(root, rec):
                if SKIP.search(p):
                    skipped.setdefault("skip-pattern", []).append(p); continue
                kind, u = classify(p)
                if kind != "ok":
                    skipped.setdefault(kind, []).append(p); continue
                lm = today if p in dirty else dates.get(p, today)
                urls.append((u, lm))
        urls.sort()
        results[sec] = urls

    total = sum(len(v) for v in results.values())
    print(f"sitemap build: {total} URLs")
    for sec, urls in results.items():
        print(f"  {sec:12s} {len(urls)}")
    for kind, lst in sorted(skipped.items()):
        by = {}
        for p in lst:
            k = "/".join(p.split("/")[:2]) if "/" in p else "(root)"
            by[k] = by.get(k, 0) + 1
        print(f"  excluded [{kind}]: {len(lst)}  " + ", ".join(f"{k}={n}" for k, n in sorted(by.items())))
    if CHECK:
        return
    os.makedirs("sitemaps", exist_ok=True)
    for sec, urls in results.items():
        with open(f"sitemaps/{sec}.xml", "w", encoding="utf-8") as fh:
            fh.write('<?xml version="1.0" encoding="UTF-8"?>\n')
            fh.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
            for u, lm in urls:
                fh.write(f"  <url><loc>{u}</loc><lastmod>{lm}</lastmod></url>\n")
            fh.write("</urlset>\n")
    with open("sitemap.xml", "w", encoding="utf-8") as fh:
        fh.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        fh.write('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
        for sec, urls in results.items():
            newest = max((lm for _, lm in urls), default=today)
            fh.write(f"  <sitemap><loc>{SITE}sitemaps/{sec}.xml</loc><lastmod>{newest}</lastmod></sitemap>\n")
        fh.write("</sitemapindex>\n")
    print("wrote sitemap.xml + sitemaps/{core,revise,adventures}.xml")

if __name__ == "__main__":
    main()
