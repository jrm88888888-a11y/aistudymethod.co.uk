#!/usr/bin/env python3
"""
rebrand_classcraft.py
=====================
Rebrand every classcraft-origin HTML page inside /classcraft so the chrome
(title, meta, header, footer, branding) matches the rest of aistudymethod.com.

The interactive game/story/simulation/vocab content inside each page is NOT
touched — only the outer wrapper (head, top-of-body nav/logo, bottom-of-body
footer) is replaced.

Idempotent: pages are marked with a comment `<!-- aism-rebranded:v1 -->` after
processing, and re-running the script skips them.

Run from anywhere:
    python3 scripts/rebrand_classcraft.py
"""

from __future__ import annotations

import os
import re
import shutil
import sys
from pathlib import Path
from typing import List, Tuple

try:
    from bs4 import BeautifulSoup, Comment, NavigableString
except ImportError:
    sys.stderr.write(
        "bs4 not installed. Run: pip install beautifulsoup4 --break-system-packages\n"
    )
    sys.exit(1)


# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------

ROOT = Path(__file__).resolve().parent.parent          # AI Study Method/
CLASSCRAFT = ROOT / "classcraft"
OLD_CSS    = CLASSCRAFT / "style.css"
NEW_CSS    = CLASSCRAFT / "classcraft-pages.css"

REBRAND_MARKER = "aism-rebranded:v1"

# Files that should NOT be touched even if they look like HTML chrome.
SKIP_NAMES = {"CNAME", "sitemap.xml"}


# ---------------------------------------------------------------------------
# Relative-depth helpers
# ---------------------------------------------------------------------------

def depth_inside_classcraft(html_path: Path) -> int:
    """How many '../' hops to reach the classcraft/ root from this file's dir."""
    rel = html_path.relative_to(CLASSCRAFT)
    # number of parent dirs of the file inside classcraft
    return len(rel.parts) - 1


def up_to_classcraft(html_path: Path) -> str:
    """Relative prefix from this file's dir to classcraft/ root."""
    d = depth_inside_classcraft(html_path)
    return "../" * d


def up_to_site_root(html_path: Path) -> str:
    """Relative prefix from this file's dir to the AI Study Method site root."""
    d = depth_inside_classcraft(html_path) + 1  # plus the classcraft/ hop
    return "../" * d


def scoped_css_href(html_path: Path) -> str:
    return up_to_classcraft(html_path) + "classcraft-pages.css"


def root_css_href(html_path: Path) -> str:
    return up_to_site_root(html_path) + "style.css"


def subjects_href(html_path: Path) -> str:
    return up_to_site_root(html_path) + "subjects.html"


def site_root_href(html_path: Path, page: str) -> str:
    return up_to_site_root(html_path) + page


# ---------------------------------------------------------------------------
# AI Study Method chrome markup
# ---------------------------------------------------------------------------

def aism_nav_html(html_path: Path) -> str:
    """Match the markup of root index.html's <nav>."""
    R = up_to_site_root(html_path)
    return (
        f'<nav>\n'
        f' <div class="nav-inner">\n'
        f'  <a href="{R}index.html" class="logo">\n'
        f'   <div class="logo-mark">V</div>\n'
        f'   <div class="logo-text">\n'
        f'    <span class="logo-primary">AI Study Method</span>\n'
        f'    <span class="logo-secondary">The Velvet Method&trade;</span>\n'
        f'   </div>\n'
        f'  </a>\n'
        f'  <ul class="nav-links">\n'
        f'   <li><a href="{R}subjects.html">Subjects</a></li>\n'
        f'   <li><a href="{R}velvet-method.html">The Velvet Method</a></li>\n'
        f'   <li><a href="{R}courses.html">Courses</a></li>\n'
        f'   <li><a href="{R}ai-study-guide.html">AI Lab</a></li>\n'
        f'   <li><a href="{R}parents.html">Parents</a></li>\n'
        f'   <li><a href="{R}about.html">About</a></li>\n'
        f'  </ul>\n'
        f'  <div class="nav-right">\n'
        f'   <a href="{R}courses.html" class="btn-primary">View the Course &rarr;</a>\n'
        f'  </div>\n'
        f' </div>\n'
        f'</nav>\n'
    )


def aism_footer_html(html_path: Path) -> str:
    R = up_to_site_root(html_path)
    return (
        f'<footer>\n'
        f' <div class="footer-inner">\n'
        f'  <div class="footer-top">\n'
        f'   <div class="footer-brand">\n'
        f'    <a href="{R}index.html" class="logo">\n'
        f'     <div class="logo-mark">V</div>\n'
        f'     <div class="logo-text">\n'
        f'      <span class="logo-primary">AI Study Method</span>\n'
        f'      <span class="logo-secondary">The Velvet Method&trade;</span>\n'
        f'     </div>\n'
        f'    </a>\n'
        f'    <p>A six-step AI-powered study system for students at every level &mdash; built on cognitive science, designed for the real world.</p>\n'
        f'   </div>\n'
        f'   <div class="footer-col">\n'
        f'    <h5>Subjects</h5>\n'
        f'    <ul>\n'
        f'     <li><a href="{R}subjects.html#sciences">Sciences</a></li>\n'
        f'     <li><a href="{R}subjects.html#maths">Mathematics</a></li>\n'
        f'     <li><a href="{R}subjects.html#humanities">Humanities</a></li>\n'
        f'     <li><a href="{R}subjects.html">All Subjects &rarr;</a></li>\n'
        f'    </ul>\n'
        f'   </div>\n'
        f'   <div class="footer-col">\n'
        f'    <h5>Learn</h5>\n'
        f'    <ul>\n'
        f'     <li><a href="{R}velvet-method.html">The Velvet Method</a></li>\n'
        f'     <li><a href="{R}ai-study-guide.html">AI Lab</a></li>\n'
        f'     <li><a href="{R}courses.html">Courses</a></li>\n'
        f'     <li><a href="{R}subjects.html">Free Resources</a></li>\n'
        f'    </ul>\n'
        f'   </div>\n'
        f'   <div class="footer-col">\n'
        f'    <h5>Info</h5>\n'
        f'    <ul>\n'
        f'     <li><a href="{R}about.html">About</a></li>\n'
        f'     <li><a href="{R}parents.html">For Parents</a></li>\n'
        f'     <li><a href="{R}parents.html#contact">Contact</a></li>\n'
        f'    </ul>\n'
        f'   </div>\n'
        f'  </div>\n'
        f'  <div class="footer-bottom">\n'
        f'   <p>&copy; 2026 AI Study Method &middot; aistudymethod.com &middot; All rights reserved</p>\n'
        f'   <div class="footer-velvet">Powered by <span>The Velvet Method&trade;</span></div>\n'
        f'  </div>\n'
        f' </div>\n'
        f'</footer>\n'
    )


def aism_back_link_html(html_path: Path) -> str:
    """A small back-to-catalog link inserted near the top of body."""
    href = subjects_href(html_path)
    return (
        f'<div class="aism-back-strip" style="max-width:1280px;margin:0 auto;'
        f'padding:14px 2rem 0;font-family:\'DM Mono\',monospace;font-size:11px;'
        f'letter-spacing:1px;text-transform:uppercase;">'
        f'<a href="{href}" style="color:#0a6b5e;text-decoration:none;">'
        f'&larr; Back to all subjects</a></div>\n'
    )


# ---------------------------------------------------------------------------
# Title / meta helpers
# ---------------------------------------------------------------------------

# Patterns that show up in classcraft titles.
TITLE_TRAILER_PATTERNS = [
    r"\s*\|\s*classcraft\.co\.uk\s*\.{0,3}$",
    r"\s*\|\s*classcraft\.co\.uk\s*$",
    r"\s*\|\s*ClassCraft\s*$",
    r"\s*[-–—]\s*ClassCraft\s*$",
    r"\s*[-–—]\s*classcraft\.co\.uk\s*$",
    r"^\s*ClassCraft\s*[-–—]\s*",
    r"^\s*ClassCraft\s*\|\s*",
]

def clean_title(text: str) -> str:
    t = text
    for pat in TITLE_TRAILER_PATTERNS:
        t = re.sub(pat, "", t, flags=re.IGNORECASE)
    # Replace any remaining inline "ClassCraft" / "classcraft.co.uk"
    t = re.sub(r"classcraft\.co\.uk", "aistudymethod.com", t, flags=re.IGNORECASE)
    t = re.sub(r"\bClassCraft\b", "AI Study Method", t)
    t = t.strip(" -–—|")
    return t


def rebrand_title_text(text: str) -> str:
    base = clean_title(text)
    if not base:
        base = "AI Study Method"
    # Avoid stacking the suffix
    if not re.search(r"AI Study Method", base, flags=re.IGNORECASE):
        base = f"{base} — AI Study Method"
    return base


# ---------------------------------------------------------------------------
# URL rewriter
# ---------------------------------------------------------------------------

CLASSCRAFT_URL_RE = re.compile(r"https?://classcraft\.co\.uk(/[^\s\"'>)]*)?", re.IGNORECASE)


def rewrite_classcraft_url(url: str, html_path: Path) -> str:
    """
    Turn https://classcraft.co.uk/games/foo.html into the right relative path.
    Bare domain (no path) -> classcraft/ root index.
    """
    m = CLASSCRAFT_URL_RE.fullmatch(url)
    if not m:
        # try a search if it's inside text
        return CLASSCRAFT_URL_RE.sub(
            lambda mm: _classcraft_url_to_rel(mm.group(0), html_path), url
        )
    return _classcraft_url_to_rel(url, html_path)


def _classcraft_url_to_rel(url: str, html_path: Path) -> str:
    m = CLASSCRAFT_URL_RE.search(url)
    if not m:
        return url
    path = m.group(1) or "/"
    path = path.lstrip("/")
    # path now relative to the classcraft/ root
    prefix = up_to_classcraft(html_path)
    if not path:
        return prefix + "index.html"
    return prefix + path


# ---------------------------------------------------------------------------
# Visible-text rebranding
# ---------------------------------------------------------------------------

VISIBLE_BRAND_SUBS = [
    (re.compile(r"classcraft\.co\.uk", re.IGNORECASE), "aistudymethod.com"),
    (re.compile(r"\bClassCraft\b"),                    "AI Study Method"),
    (re.compile(r"\bclassCraft\b"),                    "AI Study Method"),
    (re.compile(r"\bClass[Cc]raft\b"),                 "AI Study Method"),
]

# Raw-string patterns applied to the whole HTML *after* BS4 serialisation, for
# constructs BS4 won't catch as a single text node (e.g. split tags inside an
# in-page logo wordmark, or string literals inside <script>).
RAW_BRAND_SUBS = [
    # In-page logo wordmark: <a class="hd-logo">Class<span>Craft</span></a>
    (re.compile(r"Class(<span[^>]*>)Craft(</span>)"), r"AI \1Study\2"),
    # Inline `document.title = \`ClassCraft — ${S.meta.title}\`` in story scripts
    (re.compile(r"`ClassCraft \\u2014 \$\{S\.meta\.title\}`"),
     r"`${S.meta.title} \\u2014 AI Study Method`"),
    (re.compile(r"`ClassCraft — \$\{S\.meta\.title\}`"),
     r"`${S.meta.title} — AI Study Method`"),
]


def rebrand_text(s: str) -> str:
    out = s
    for pat, repl in VISIBLE_BRAND_SUBS:
        out = pat.sub(repl, out)
    return out


def rebrand_visible_text_in_tree(root) -> int:
    """
    Walk all NavigableString descendants OUTSIDE <script>/<style>/<svg>/<canvas>
    and replace classcraft branding in text nodes.
    Returns number of text nodes mutated.
    """
    SKIP_PARENT_TAGS = {"script", "style", "svg", "canvas", "noscript"}
    changed = 0
    for txt in list(root.find_all(string=True)):
        if isinstance(txt, Comment):
            continue
        if not isinstance(txt, NavigableString):
            continue
        parent_chain_tags = {p.name for p in txt.parents if hasattr(p, "name") and p.name}
        if parent_chain_tags & SKIP_PARENT_TAGS:
            continue
        s = str(txt)
        new = rebrand_text(s)
        if new != s:
            txt.replace_with(new)
            changed += 1
    return changed


# ---------------------------------------------------------------------------
# Head rewriting
# ---------------------------------------------------------------------------

def rewrite_head(soup: BeautifulSoup, html_path: Path) -> dict:
    """Mutates soup. Returns counters of what changed."""
    counters = {"title": 0, "meta": 0, "stylesheet": 0, "canonical": 0}
    head = soup.head
    if head is None:
        return counters

    # <title>
    title = head.find("title")
    if title and title.string:
        new = rebrand_title_text(title.string)
        if new != title.string:
            title.string.replace_with(new)
            counters["title"] += 1

    # <meta name="description">
    for m in head.find_all("meta"):
        name = (m.get("name") or "").lower()
        prop = (m.get("property") or "").lower()
        if name == "description" and m.get("content"):
            new = rebrand_text(m["content"])
            if new != m["content"]:
                m["content"] = new
                counters["meta"] += 1
        if prop in ("og:title", "og:description", "og:site_name", "twitter:title", "twitter:description"):
            v = m.get("content", "")
            new = rebrand_text(v)
            new = CLASSCRAFT_URL_RE.sub(lambda mm: _classcraft_url_to_rel(mm.group(0), html_path), new)
            if new != v:
                m["content"] = new
                counters["meta"] += 1
        if prop == "og:url" and m.get("content"):
            v = m["content"]
            new = CLASSCRAFT_URL_RE.sub(lambda mm: _classcraft_url_to_rel(mm.group(0), html_path), v)
            if new != v:
                m["content"] = new
                counters["meta"] += 1

    # <link rel="canonical"> -> rewrite away from classcraft domain
    for l in head.find_all("link"):
        rels = [r.lower() for r in (l.get("rel") or [])]
        href = l.get("href", "")
        if "canonical" in rels and href:
            new = CLASSCRAFT_URL_RE.sub(
                lambda mm: _classcraft_url_to_rel(mm.group(0), html_path), href
            )
            if new != href:
                l["href"] = new
                counters["canonical"] += 1

    # <link rel="stylesheet"> -> point local style.css refs at classcraft-pages.css
    scoped_href = scoped_css_href(html_path)
    root_href   = root_css_href(html_path)

    has_scoped = False
    has_root = False

    for l in head.find_all("link", rel="stylesheet"):
        href = l.get("href", "")
        if not href:
            continue
        # absolute external (google fonts etc.) - leave alone
        if href.startswith("http://") or href.startswith("https://") or href.startswith("//"):
            continue

        # Determine whether this points at the classcraft style.css
        # The basename will be style.css and the path is relative.
        basename = os.path.basename(href.split("?")[0].split("#")[0])

        if basename == "style.css":
            # Inside classcraft/ this resolved to classcraft/style.css.
            # Retarget at classcraft-pages.css with same depth.
            new_href = scoped_href
            if href != new_href:
                l["href"] = new_href
                counters["stylesheet"] += 1
            has_scoped = True
        elif basename == "classcraft-pages.css":
            has_scoped = True
        # Any other local CSS we leave alone.

    # Ensure scoped link exists (some pages don't import classcraft style.css
    # but we won't add it because they don't need parchment vars; only add if
    # the page already linked to classcraft style.css originally -- which is
    # represented by has_scoped == True after rewrites above. So leave as-is.)

    # Ensure the AI Study Method root style.css is imported, regardless.
    # Don't add a duplicate.
    for l in head.find_all("link", rel="stylesheet"):
        if l.get("href", "") == root_href:
            has_root = True
            break

    if not has_root:
        new_link = soup.new_tag("link", rel="stylesheet", href=root_href)
        # Add at the top of head so AI Study Method tokens load first.
        if head.contents:
            head.insert(0, new_link)
            # Pretty-print with newlines
            head.insert(1, NavigableString("\n"))
        else:
            head.append(new_link)
        counters["stylesheet"] += 1

    return counters


# ---------------------------------------------------------------------------
# Body chrome rewriting
# ---------------------------------------------------------------------------

def is_classcraft_nav(tag) -> bool:
    if tag.name != "nav":
        return False
    cls = " ".join(tag.get("class") or [])
    # match site-nav or generic with .nav-inner containing .nav-logo Class<span>Craft
    if "site-nav" in cls.split():
        return True
    inner = tag.find(class_="nav-inner")
    if inner and inner.find(class_="nav-logo"):
        return True
    # any nav containing a `.nav-logo`
    if tag.find(class_="nav-logo"):
        return True
    return False


def is_classcraft_footer(tag) -> bool:
    if tag.name != "footer":
        return False
    txt = tag.get_text(" ", strip=True)
    return ("ClassCraft" in txt) or ("classcraft.co.uk" in txt.lower())


def replace_body_chrome(soup: BeautifulSoup, html_path: Path) -> dict:
    counters = {"nav_slot": 0, "footer_slot": 0, "inline_nav": 0, "inline_footer": 0,
                "navjs_removed": 0, "back_link": 0}

    body = soup.body
    if body is None:
        return counters

    # 1. <div id="nav-slot"> -> AI Study Method nav
    nav_slot = soup.find(id="nav-slot")
    nav_html = aism_nav_html(html_path)
    if nav_slot:
        nav_slot.replace_with(BeautifulSoup(nav_html, "html.parser"))
        counters["nav_slot"] += 1
    else:
        # 2. inline classcraft <nav> -> replace
        for nav in body.find_all("nav"):
            if is_classcraft_nav(nav):
                nav.replace_with(BeautifulSoup(nav_html, "html.parser"))
                counters["inline_nav"] += 1
                break  # only the first one (chrome nav)
        else:
            # No nav found — insert AI Study Method nav at the top.
            body.insert(0, BeautifulSoup(nav_html, "html.parser"))
            counters["inline_nav"] += 1

    # 3. <div id="footer-slot"> -> AI Study Method footer
    footer_html = aism_footer_html(html_path)
    footer_slot = soup.find(id="footer-slot")
    if footer_slot:
        footer_slot.replace_with(BeautifulSoup(footer_html, "html.parser"))
        counters["footer_slot"] += 1
    else:
        # 4. inline classcraft <footer> -> replace
        replaced = False
        for foot in body.find_all("footer"):
            if is_classcraft_footer(foot):
                foot.replace_with(BeautifulSoup(footer_html, "html.parser"))
                counters["inline_footer"] += 1
                replaced = True
                break
        if not replaced:
            body.append(BeautifulSoup(footer_html, "html.parser"))
            counters["inline_footer"] += 1

    # 5. remove <script src="nav.js"> / "../nav.js" / "../../nav.js"
    for script in body.find_all("script", src=True):
        src = script["src"]
        bn = os.path.basename(src.split("?")[0])
        if bn == "nav.js":
            script.decompose()
            counters["navjs_removed"] += 1

    # 6. Add the back-to-subjects strip just inside the body, after the new nav
    # Avoid stacking on rerun by checking for an existing strip.
    if not body.find(attrs={"class": "aism-back-strip"}):
        back = BeautifulSoup(aism_back_link_html(html_path), "html.parser")
        # Find the inserted nav and place back-strip after it
        inserted_nav = body.find("nav", class_=False) or body.find("nav")
        if inserted_nav:
            inserted_nav.insert_after(back)
        else:
            body.insert(0, back)
        counters["back_link"] += 1

    return counters


# ---------------------------------------------------------------------------
# Anchor / link rewriting in body
# ---------------------------------------------------------------------------

def rewrite_body_links(soup: BeautifulSoup, html_path: Path) -> int:
    """Rewrite any classcraft.co.uk URL in href/src attributes (entire doc)."""
    count = 0
    for el in soup.find_all(True):
        for attr in ("href", "src", "action", "data-href"):
            if attr in el.attrs:
                v = el.attrs[attr]
                if isinstance(v, list):
                    new_v = [_classcraft_url_to_rel(x, html_path) if CLASSCRAFT_URL_RE.search(x) else x
                             for x in v]
                    if new_v != v:
                        el.attrs[attr] = new_v
                        count += 1
                elif isinstance(v, str) and CLASSCRAFT_URL_RE.search(v):
                    new_v = _classcraft_url_to_rel(v, html_path)
                    if new_v != v:
                        el.attrs[attr] = new_v
                        count += 1
    return count


# ---------------------------------------------------------------------------
# Per-file rebrand
# ---------------------------------------------------------------------------

def is_already_rebranded(html_text: str) -> bool:
    return REBRAND_MARKER in html_text


def process_file(html_path: Path) -> dict:
    """Process a single HTML file. Returns dict of change counters."""
    raw = html_path.read_text(encoding="utf-8", errors="replace")

    if is_already_rebranded(raw):
        return {"skipped_already_rebranded": 1}

    soup = BeautifulSoup(raw, "html.parser")

    # Ensure exactly one doctype at the top.
    from bs4 import Doctype
    existing_doctypes = [c for c in soup.contents if isinstance(c, Doctype)]
    for d in existing_doctypes:
        d.extract()
    # We'll prepend a single canonical doctype at the end.

    head_counters = rewrite_head(soup, html_path)
    body_counters = replace_body_chrome(soup, html_path)
    body_link_count = rewrite_body_links(soup, html_path)

    # Rebrand visible text outside of script/style/svg/canvas
    text_changed = rebrand_visible_text_in_tree(soup)

    # Insert idempotency marker as a comment inside <head>.
    if soup.head is not None:
        marker = Comment(f" {REBRAND_MARKER} ")
        soup.head.append(marker)

    out = "<!DOCTYPE html>\n" + str(soup)

    # Whole-document raw substitutions for split-tag / in-script branding.
    for pat, repl in RAW_BRAND_SUBS:
        out = pat.sub(repl, out)

    # Avoid writing if nothing changed
    if out == raw:
        return {"unchanged": 1}

    html_path.write_text(out, encoding="utf-8")

    return {
        "title": head_counters["title"],
        "meta": head_counters["meta"],
        "stylesheet": head_counters["stylesheet"],
        "canonical": head_counters["canonical"],
        "nav_slot": body_counters["nav_slot"],
        "footer_slot": body_counters["footer_slot"],
        "inline_nav": body_counters["inline_nav"],
        "inline_footer": body_counters["inline_footer"],
        "navjs_removed": body_counters["navjs_removed"],
        "back_link": body_counters["back_link"],
        "body_links": body_link_count,
        "visible_text": text_changed,
    }


# ---------------------------------------------------------------------------
# Discovery
# ---------------------------------------------------------------------------

def list_classcraft_html_files() -> List[Path]:
    files: List[Path] = []
    # Section landing pages directly under classcraft/
    for p in sorted(CLASSCRAFT.glob("*.html")):
        if p.name in SKIP_NAMES:
            continue
        files.append(p)
    # games/
    files.extend(sorted((CLASSCRAFT / "games").glob("*.html")))
    # simulations/
    files.extend(sorted((CLASSCRAFT / "simulations").glob("*.html")))
    # vocab-hub/
    files.extend(sorted((CLASSCRAFT / "vocab-hub").glob("*.html")))
    # stories/**
    files.extend(sorted((CLASSCRAFT / "stories").rglob("*.html")))
    return files


def ensure_css_renamed() -> bool:
    """Rename classcraft/style.css -> classcraft/classcraft-pages.css (idempotent)."""
    if NEW_CSS.exists() and not OLD_CSS.exists():
        return False  # already done
    if OLD_CSS.exists():
        if NEW_CSS.exists():
            # Both exist — prefer keeping the new one, remove the old.
            OLD_CSS.unlink()
            return True
        shutil.move(str(OLD_CSS), str(NEW_CSS))
        return True
    return False


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print(f"Project root:    {ROOT}")
    print(f"Classcraft root: {CLASSCRAFT}")
    if not CLASSCRAFT.exists():
        print("ERROR: classcraft/ directory not found", file=sys.stderr)
        sys.exit(1)

    css_renamed = ensure_css_renamed()
    print(f"CSS rename: {'classcraft/style.css -> classcraft/classcraft-pages.css' if css_renamed else 'already done (or none)'}")

    files = list_classcraft_html_files()
    print(f"Discovered {len(files)} HTML files to consider.")

    totals = {
        "files_processed": 0,
        "skipped_already_rebranded": 0,
        "unchanged": 0,
        "errored": 0,
        "title": 0, "meta": 0, "stylesheet": 0, "canonical": 0,
        "nav_slot": 0, "footer_slot": 0, "inline_nav": 0, "inline_footer": 0,
        "navjs_removed": 0, "back_link": 0,
        "body_links": 0, "visible_text": 0,
    }

    errors: List[Tuple[Path, str]] = []

    for f in files:
        try:
            res = process_file(f)
        except Exception as exc:
            errors.append((f, repr(exc)))
            totals["errored"] += 1
            continue

        if "skipped_already_rebranded" in res:
            totals["skipped_already_rebranded"] += 1
            continue
        if "unchanged" in res:
            totals["unchanged"] += 1
            continue

        totals["files_processed"] += 1
        for k, v in res.items():
            if k in totals:
                totals[k] += v

    # Report
    print("\n" + "=" * 60)
    print("REBRAND SUMMARY")
    print("=" * 60)
    print(f"Total HTML files considered : {len(files)}")
    print(f"Files rebranded this run    : {totals['files_processed']}")
    print(f"Already-rebranded, skipped  : {totals['skipped_already_rebranded']}")
    print(f"Unchanged                   : {totals['unchanged']}")
    print(f"Errored                     : {totals['errored']}")
    print()
    print("Per-operation file change counts:")
    print(f"  <title> rewrites          : {totals['title']}")
    print(f"  <meta> rewrites           : {totals['meta']}")
    print(f"  Stylesheet swaps          : {totals['stylesheet']}")
    print(f"  Canonical rewrites        : {totals['canonical']}")
    print(f"  nav-slot replaced         : {totals['nav_slot']}")
    print(f"  inline nav replaced       : {totals['inline_nav']}")
    print(f"  footer-slot replaced      : {totals['footer_slot']}")
    print(f"  inline footer replaced    : {totals['inline_footer']}")
    print(f"  nav.js scripts removed    : {totals['navjs_removed']}")
    print(f"  Back-link added           : {totals['back_link']}")
    print(f"  Body URL rewrites         : {totals['body_links']}")
    print(f"  Visible-text rebrands     : {totals['visible_text']}")

    if errors:
        print()
        print(f"ERRORS ({len(errors)}):")
        for p, msg in errors:
            print(f"  {p.relative_to(ROOT)}: {msg}")


if __name__ == "__main__":
    main()
