# aistudymethod.com

Free GCSE, A-Level, IB and KS3 revision resources: written topic guides, interactive
mini-lessons, the Revision Arcade (quiz games with accounts, coins and avatars), parent
guides and simulations. Built by AI Study Method around the Velvet Method study system.

**This repository is the live site.** GitHub Pages serves the `main` branch at
https://aistudymethod.com (see `CNAME`). Anything committed to `main` is public within
a couple of minutes of a push. There is no build step — every page is a static HTML file.

## Layout

| Path | What it is |
|---|---|
| `index.html`, `about.html`, `subjects.html`, … | Site pages (home, about, subject picker, courses, parents, legal). |
| `revise/` | Written revision guides: one hub per course (`gcse-chemistry.html`, `ib-biology.html` …) and topic pages underneath. `revise/index.html` lists every hub. |
| `games/` | GCSE "revision games" landing pages, one per subject, linking into the arcade. |
| `guides/` | Long-form articles for parents and students about AI and study. |
| `classcraft/` | The interactive layer. `arcade.html` + `arcade/` is the Revision Arcade; `adventures/` holds the mini-lessons (`*-mini-lesson.html`, one per topic per board); `evaluate/`, `explore/`, `view/` are the quiz, context and viewer engines with their JSON banks; `stories/`, `simulations/`, `jokes/`, `nature/`, `Books/` are smaller content families; `spec-list/` and `_data/` hold the exam-board specification maps everything is aligned to. |
| `sims/` | Standalone physics/maths/biology simulations (not yet linked from the site or in the sitemap). |
| `images/`, `style.css`, `script.js` | Shared assets. |
| `sitemap.xml`, `sitemaps/` | Generated — do not hand-edit. Sitemap index plus `core`, `revise`, `adventures` children. |
| `tools/` | Maintenance scripts (below). |
| `404.html` | Not-found page; also recovers legacy `-adventure-N.html` URLs client-side. |
| `.github/workflows/` | `site-checks.yml` (sitemap + link check on every push/PR) and `nightly-db-backup.yml`. |

Ignored and never published (see `.gitignore`): `_dev/` (scratch tooling, notes, awarding-body
PDFs — the boards' copyright), `_to_delete/` (files staged for manual deletion) and backups.

## Conventions

- **Every indexable page declares its own canonical URL** (`<link rel="canonical">`).
  Pages that should not be indexed carry `<meta name="robots" content="noindex,…">`.
  The sitemap generator uses exactly these two signals, so there is no list to maintain.
- **Retired pages are deleted, not hidden.** If an old URL ever had traffic or inbound
  links, leave a redirect stub in its place (`<meta http-equiv="refresh" content="0; url=…">`
  + canonical to the new page + `location.replace`). GitHub Pages cannot do server-side 301s.
- **Filenames** are lower-case, hyphenated, and encode course and board:
  `classcraft/adventures/<subject>-<level>-<board>-<topic>-mini-lesson.html`,
  `revise/<level>-<subject>[-<topic>].html`. Never put `?` or spaces in a filename.
- **Content must match the current specification of the named awarding body.** Anything
  that cannot be verified against the spec is not published (see `tools/check-qualifications.py`
  and `classcraft/spec-list/`).

## After changing content

Run from the repo root, then commit the results with your change:

```bash
python3 tools/add-related-lessons.py   # refresh the "More <course> mini-lessons" links on every mini-lesson
python3 tools/build-sitemap.py         # regenerate sitemap.xml + sitemaps/*.xml
python3 tools/check-links.py           # fail if any internal link is broken (CI runs this too)
```

`build-sitemap.py --check` and `add-related-lessons.py --check` report without writing.

## Tools

| Script | Purpose |
|---|---|
| `tools/build-sitemap.py` | Walks the site, lists indexable self-canonical pages, writes the sitemap index and children. `lastmod` comes from git. |
| `tools/add-related-lessons.py` | Adds/refreshes a static sibling-links block on each mini-lesson so every lesson has several inbound links (idempotent, between `REL-START`/`REL-END` markers). |
| `tools/check-links.py` | Static internal-link checker over the sitemapped pages (`--all` for every tracked page). Exit 1 on breakage. |
| `tools/delist-phantoms.py` | Retire subject/level/board combinations no awarding body offers: removes them from the arcade index and marks their pages noindex. Dry run unless `--apply`. |
| `tools/check-qualifications.py` | Cross-checks the qualification registry against what is on disk, in the arcade index and in the sitemap. |

## Working with the repo

- Branch for anything beyond a one-line fix; merge to `main` to deploy.
- Large binaries (PDFs, audio, sprite sheets) live in the repo because Pages serves
  them; keep them optimised — GitHub Pages has a 1 GB site limit.
- After a push, if URLs were added or moved, resubmit `sitemap.xml` in Search Console.
