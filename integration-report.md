# Integration Report — classcraft/ → aistudymethod.com

**Date:** 2026-05-29
**Scope:** Merge the in-repo `classcraft/` content folder into the AI Study Method site so that every game, story, simulation, book, joke pack and nature gallery serves from `aistudymethod.com`. Retire `classcraft.co.uk`.

---

## 1. Link repointing

All **892** href values in `resources.js` rewritten from
`https://classcraft.co.uk/<subdir>/<file>` → `classcraft/<subdir>/<file>`.

- Zero remaining `classcraft.co.uk` strings in `resources.js`.
- `%20` encoding preserved in `Books/` (49) and `jokes/` (20) paths.
- File-system audit: every one of the 892 hrefs resolves to a file that exists in the repo (`present: 892, missing: 0`).

## 2. File-vs-RESOURCES audit

For every game/content file in `classcraft/`, confirmed coverage in `RESOURCES`:

| Subdir | Files | Orphan files (no RESOURCES entry) |
| --- | ---: | --- |
| `classcraft/games/` | 160 | 0 |
| `classcraft/stories/` | 600 | 0 |
| `classcraft/simulations/` | 24 | 0 |
| `classcraft/vocab-hub/` | 10 | 2 — `vocab.html`, `vocab-hub.html` (hub landing pages, not games; deliberately not added) |
| `classcraft/Books/` (PDFs) | 49 PDFs / 58 .docx sources | The 49 PDFs are all linked; the 58 `.docx` are source files and `Completed/` duplicates — not user-facing content, deliberately not added |
| `classcraft/jokes/` | 40 | The 20 catalogued `.docx` joke files are linked; the 20 `docs-all/*` files are duplicate copies of the same content — deliberately not added |

**No games are missing from the catalog.** No new entries were required.

## 3. Topic filter — taxonomy reconciled

Original `SUBTOPICS` map covered only ~33 (subject, level) combos and had duplicate keys for `psychology-a-level` and `sociology-a-level` (silently dropping topics). Resource `subtopic` slugs (e.g. `cells`, `the-mitosis-spy`, `ai-prompts`) did not match the slugs the curated labels would produce, so the topic dropdown returned zero results for every selection.

**Fix:**

- Built a canonical, curriculum-aligned `SUBTOPICS` map with **85 keys** — one for every (subject, level) combination that has resources. No duplicates remain.
- Curated catch-all buckets added consistently:
  - `Exam Practice` for `exam-practice`, `paper-2`, `diagnostic` resources
  - `Exam Prep & AI` for `ai-prompts` packs
  - `Subject Humour` for `joke-pack` / `jokes` resources
  - `Vocabulary Games` for the 8 vocab-hub games per language combo
  - `UK Nature Galleries` for the 7 regional `nature.html#<region>` entries
- Re-tagged every resource's `subtopic` to a slug derived from a canonical label for its (subject, level), using the exact slug rule from `subjects.html`: `label.toLowerCase().replace(/ /g,'-').replace(/&/g,'')` (so `'Infection & Response'` → `infection--response`, double-dash).
- Per-combo remap log written to `subtopic-remap.md` (1,388 lines, every distinct old→new pair with counts).

**Filter-integrity verification:**

```
SUBTOPICS keys = 85
Duplicate keys = 0
Resource→SUBTOPICS slug mismatches = 0
RESOURCES.length = 892
```

Spot-check filter simulations:

| Filter (subject / level / topic) | Results |
| --- | ---: |
| biology / gcse / cell-biology | 7 |
| history / a-level / cold-war--20th-century | 8 |
| art-design / ks3 / colour--tone | 3 |
| physics / ks3 / forces--motion | 2 |
| english-literature / gcse / vocabulary-games | 8 |
| geography / ks3 / tectonics--hazards | 3 |

All return real cards. The cascading UX (subject → level → topic) is unchanged.

## 4. Card link-target behaviour

In `subjects.html` card render (`cardHTML()`):

- Default: same-tab link (no `target` / `rel` attributes).
- Only `type === 'revision-book'` resources (the 49 Books PDFs) open in a new tab with `target="_blank" rel="noopener"`.

## 5. Rebrand of classcraft-origin pages

A Python rebrand script at `scripts/rebrand_classcraft.py` (idempotent — uses an `<!-- aism-rebranded:v1 -->` marker) processed **801 HTML files** under `classcraft/`:

- 7 section landing pages (`books.html`, `games.html`, `jokes.html`, `nature.html`, `roleplay.html`, `simulations.html`, `draw-it.html`)
- 160 game pages
- 600 roleplay story pages
- 24 simulation pages
- 10 vocab-hub pages

Per-page changes:

- `<title>` rewritten to end `— AI Study Method` (801 files)
- AI Study Method root `style.css` injected with correct relative depth (1,409 stylesheet operations across all pages)
- AI Study Method top `<nav>` injected with all six main-nav items at correct relative depth (Subjects / The Velvet Method / Courses / AI Lab / Parents / About) — 801 files
- AI Study Method `<footer>` appended — 801 files
- Old `<script src=".../nav.js">` references removed (8 files)
- "← Back to all subjects" strip added — 801 files
- In-page logo wordmark `Class<span>Craft</span>` → `AI <span>Study</span>` — 169 files
- `document.title = \`ClassCraft — …\`` JS string literal inside story interactives → `AI Study Method — …` — 600 files
- Visible `ClassCraft` text in vocab data files and `classcraft-pages.css` source comments → `AI Study Method` — 10 files

Game/story interactive `<script>` / `<canvas>` / `<svg>` blocks were not touched — only chrome was modified.

## 6. Asset deconfliction

- `classcraft/style.css` renamed to `classcraft/classcraft-pages.css` so it can never collide with the root `style.css`.
- All `<link href="...style.css">` references inside classcraft pages updated to the renamed file at the correct relative depth.
- Root `style.css` and `script.js` untouched.
- Zero broken local `<link>` / `<script src>` references after the rebrand (verified by scanning every classcraft HTML file).

## 7. Navigation coherence

- Main nav in classcraft pages is now byte-identical to the root nav (Subjects / The Velvet Method / Courses / AI Lab / Parents / About), with depth-correct relative paths.
- Added a "Browse by format" strip to `subjects.html` linking to the seven section landing pages so they're discoverable from the catalog without bloating the global nav.
- Internal links default to same-tab (book PDFs are the one new-tab exception).

## 8. Dev tooling stripped from live surface

`classcraft/` contains six non-content files: `download_nature_photos.py`, `download_nature_photos.sh`, `check_missing_photos.py`, `fix_broken.py`, `seo_audit.xlsx`, `project-notes.md`. **None of them are linked from any HTML page** (verified by grep). They remain in the repo as dev tooling.

The nested `classcraft/CNAME` file (which previously contained `classcraft.co.uk` and was dead weight — GitHub Pages only honours the root CNAME) has been neutralised to `aistudymethod.com` so a stray serve from the subfolder cannot accidentally claim the old domain.

## 9. Sitemap + SEO

- New unified `sitemap.xml` at the site root with **877 URLs** on `aistudymethod.com` covering: root pages (index, subjects, velvet-method, courses, ai-study-guide, parents, about), the 7 section landing pages, and every unique resource href from `RESOURCES`.
- New `robots.txt` at the site root pointing crawlers at the new sitemap.
- Old `classcraft/sitemap.xml` neutralised (replaced with a stub `urlset` that explicitly points crawlers at the new root sitemap).
- Zero `classcraft.co.uk` strings remain in any HTML, JS, CSS or XML file in the repo outside of `project-notes.md`, `migration-report.md`, `subtopic-remap.md`, and the rebrand script source (`scripts/rebrand_classcraft.py`). All four of those are dev artefacts that aren't served.

**Redirects from the old classcraft.co.uk URLs cannot be implemented from this repo** — GitHub Pages doesn't support server-side redirects. To complete the cut-over you'll want to either:
1. Replace the old `classcraft.co.uk` repo's index pages with HTML `<meta http-equiv="refresh">` shims pointing at the corresponding new URLs, or
2. Set up a Cloudflare page rule (or equivalent at the DNS host) doing a 301 from `classcraft.co.uk/*` → `aistudymethod.com/classcraft/*`.

## 10. Known data points (deprioritised — not blocking)

- **Velvet stage skew remains:** 744 / 892 resources are tagged `learn`; `view` has 0. Reclassification is a future pass per the brief; the filter design was not changed.
- **`food-technology` coverage is thin** — 1 resource (KS3 jokes only). Topic list has just `Subject Humour` to land it.
- **`art-design-ks3`** (and KS3 generally) topic taxonomies were derived fresh rather than taken from a curated source; they are sensible curriculum-shape buckets but a subject specialist may want to refine the labels. The slug machinery is robust to any future label edits as long as both `SUBTOPICS` and the resource `subtopic` values are kept in sync.

## 11. Final verification — green

```
classcraft.co.uk strings in resources.js .......... 0
classcraft.co.uk strings in any HTML .............. 0
"ClassCraft" string in any HTML/JS/CSS ............ 0
RESOURCES.length .................................. 892
SUBTOPICS keys .................................... 85   (was: ~33 with duplicates)
SUBTOPICS duplicates .............................. 0
Resource→SUBTOPICS slug mismatches ................ 0
Sitemap URLs ...................................... 877
Files rebranded ................................... 801
Broken local CSS/JS refs .......................... 0
```

## 12. Files modified

- `resources.js` — every entry's `href` and `subtopic` updated.
- `subjects.html` — `SUBTOPICS` map fully replaced; card render switched to same-tab default; "Browse by format" strip added to the hero.
- `sitemap.xml`, `robots.txt` — created at site root.
- `classcraft/classcraft-pages.css` — renamed from `classcraft/style.css`.
- `classcraft/CNAME` — content swapped from `classcraft.co.uk` to `aistudymethod.com`.
- `classcraft/sitemap.xml` — neutralised stub.
- `classcraft/nav.js`, `classcraft/classcraft-pages.css` — visible brand strings updated.
- `classcraft/vocab-hub/vocab-*.js` (10 files) — source-comment brand strings updated.
- 801 HTML files under `classcraft/` — chrome (title, nav, footer, stylesheet, back-link) replaced; game logic left untouched.
- `scripts/rebrand_classcraft.py` — new, idempotent rebrand script.
- `subtopic-remap.md` — new, full per-combo remap log.
- `integration-report.md` — this file.
