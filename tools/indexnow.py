#!/usr/bin/env python3
"""Tell IndexNow (Bing, Yandex, Seznam, Naver … not Google) which pages changed.

Usage (from repo root):
    python3 tools/indexnow.py --since <commit>   # pages changed between <commit> and HEAD
    python3 tools/indexnow.py --all              # every page in the sitemaps
    add --dry-run to print what would be sent without sending

What is sent:
  * only URLs listed in sitemaps/core.xml, revise.xml, adventures.xml, teach.xml (the
    indexable pages; build-sitemap.py owns that rule), plus
  * pages deleted since <commit> that the old sitemaps listed, so engines drop them.
  * if the key file itself changed (first set-up, or a rotated key), everything.

The key is the 32-hex-character file at the site root, <key>.txt, whose content
is the key. It is public by design: it only proves the sender controls the site.
Runs automatically after each push: .github/workflows/indexnow.yml.
"""
import json, os, re, subprocess, sys, time, urllib.request, urllib.error

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
HOST = "aistudymethod.com"
SITE = "https://%s/" % HOST
ENDPOINT = "https://api.indexnow.org/indexnow"
SITEMAPS = ["sitemaps/core.xml", "sitemaps/revise.xml", "sitemaps/adventures.xml", "sitemaps/teach.xml"]
BATCH = 10000                      # IndexNow's per-request limit
DRY = "--dry-run" in sys.argv
RX_LOC = re.compile(r"<loc>([^<]+)</loc>")
RX_KEY = re.compile(r"^[0-9a-f]{32}\.txt$")


def find_key():
    for f in sorted(os.listdir(".")):
        if RX_KEY.match(f) and open(f).read().strip() == f[:-4]:
            return f[:-4]
    sys.exit("No IndexNow key file (<32 hex>.txt containing its own name) at the site root.")


def locs(text):
    return set(RX_LOC.findall(text))


def sitemap_urls():
    out = set()
    for sm in SITEMAPS:
        out |= locs(open(sm, encoding="utf8").read())
    return out


def git(*args):
    return subprocess.run(["git"] + list(args), capture_output=True, text=True, check=True).stdout


def url_candidates(path):
    """A file can be listed under its own URL or, for index.html, its directory URL."""
    c = [SITE + path]
    if os.path.basename(path) == "index.html":
        c.append(SITE + path[: -len("index.html")])
    return c


def changed_urls(since, key):
    current = sitemap_urls()
    raw = git("diff", "--name-status", "--no-renames", "-z", since, "HEAD").split("\0")
    pairs = list(zip(raw[0::2], raw[1::2]))            # (status, path)
    if any(p == key + ".txt" for _, p in pairs):
        print("Key file changed: submitting every sitemap URL.")
        return sorted(current)
    old = set()
    if any(s == "D" for s, _ in pairs):
        for sm in SITEMAPS:
            try: old |= locs(git("show", "%s:%s" % (since, sm)))
            except subprocess.CalledProcessError: pass
    urls = set()
    for status, path in pairs:
        if not path.endswith(".html"): continue
        pool = old if status == "D" else current
        urls.update(u for u in url_candidates(path) if u in pool)
    return sorted(urls)


def wait_for_key(key, tries=20, pause=30):
    """The key file must be live before engines will accept a submission."""
    url = "%s%s.txt" % (SITE, key)
    for n in range(tries):
        try:
            with urllib.request.urlopen(url + "?t=%d" % time.time(), timeout=30) as r:
                if r.status == 200 and r.read().decode().strip() == key:
                    return
        except Exception:
            pass
        print("Key file not live yet (%s); retrying in %ds" % (url, pause))
        time.sleep(pause)
    sys.exit("Key file never became reachable at %s" % url)


def post(body, tries=6, pause=120):
    """POST one batch. A new key can take a few minutes to verify (HTTP 403
    SiteVerificationNotCompleted), and 429 means slow down: retry both."""
    for n in range(tries):
        req = urllib.request.Request(ENDPOINT, data=body,
                                     headers={"Content-Type": "application/json; charset=utf-8"})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.status
        except urllib.error.HTTPError as e:
            msg = e.read().decode()[:300]
            if e.code in (403, 429) and n < tries - 1:
                print("HTTP %s %s - retrying in %ds" % (e.code, msg, pause))
                time.sleep(pause)
                continue
            sys.exit("IndexNow rejected the submission: HTTP %s %s" % (e.code, msg))


def submit(urls, key):
    wait_for_key(key)
    for i in range(0, len(urls), BATCH):
        chunk = urls[i:i + BATCH]
        body = json.dumps({"host": HOST, "key": key, "keyLocation": "%s%s.txt" % (SITE, key),
                           "urlList": chunk}).encode()
        print("Submitted %d URLs: HTTP %s" % (len(chunk), post(body)))   # 200 or 202 = accepted


def main():
    key = find_key()
    if "--all" in sys.argv:
        urls = sorted(sitemap_urls())
    elif "--since" in sys.argv:
        urls = changed_urls(sys.argv[sys.argv.index("--since") + 1], key)
    else:
        sys.exit(__doc__)
    print("%d URL(s) to submit" % len(urls))
    for u in urls[:20]: print("  " + u)
    if len(urls) > 20: print("  … and %d more" % (len(urls) - 20))
    if not urls or DRY:
        return
    submit(urls, key)


if __name__ == "__main__":
    main()
