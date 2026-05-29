# Migration Report — Href Update & Pill Layout Fix

**Date:** 2026-05-28
**Commit:** `77e65cf` on `main` — "Fix hrefs to use classcraft.co.uk URLs and fix pill layout"

---

## 1. Original href format

Every one of the **892** href values in `resources.js` previously used a
relative path of the form:

```
classcraft/<subdir>/<file>
```

Distribution before the rewrite:

| Subdir | Count |
| --- | --- |
| `classcraft/stories/...` | 600 |
| `classcraft/games/...` | 160 |
| `classcraft/Books/...` | 49 |
| `classcraft/vocab-hub/...` | 32 |
| `classcraft/simulations/...` | 24 |
| `classcraft/jokes/...` | 20 |
| `classcraft/nature.html#<region>` | 7 |
| **Total** | **892** |

None used a `../` prefix; all were relative to the site root.

## 2. URL availability spot-check

Before bulk-rewriting, I probed one URL from each subdir on the live
classcraft.co.uk site. All resolved successfully:

| Sample | Result |
| --- | --- |
| `https://classcraft.co.uk/games/bio-alevel-quiz.html` | 200 OK (HTML) |
| `https://classcraft.co.uk/vocab-hub/game-pacman.html` | 200 OK (HTML) |
| `https://classcraft.co.uk/stories/art_design/a_level/S0381_the_semiotics.html` | 200 OK (HTML) |
| `https://classcraft.co.uk/simulations/AI_Ethics_Board_A-level.html` | 200 OK (HTML) |
| `https://classcraft.co.uk/Books/A-Level%20Biology/A-Level%20Biology.pdf` | 200 OK (PDF served) |
| `https://classcraft.co.uk/jokes/art/Art%20Jokes.docx` | 200 OK (DOCX served) |
| `https://classcraft.co.uk/nature.html` | 200 OK (HTML) |

URL-encoded spaces (`%20`) in `Books/` and `jokes/` paths were preserved
through the rewrite and resolve correctly on the live site.

Per-URL verification of all 892 was not performed (~892 HEAD requests
would be slow and the source path → URL mapping is deterministic). The
seven probed URLs cover all seven path patterns in use, so any further
failures would be from individual missing files on classcraft.co.uk
rather than a broken URL scheme.

## 3. Hrefs updated

**892 / 892** href values were rewritten in place by replacing the
leading `classcraft/` with `https://classcraft.co.uk/`. After the
rewrite there are **zero** non-`http://` hrefs remaining in
`resources.js`.

Spot-check samples post-rewrite:

```
https://classcraft.co.uk/games/bio-alevel-quiz.html
https://classcraft.co.uk/games/hist-decolonisation-timeline.html
https://classcraft.co.uk/stories/business_studies/gcse/S0529_the_legal_form.html
https://classcraft.co.uk/stories/physics/ks3/S0009_the_earthquake_monitor.html
https://classcraft.co.uk/jokes/spanish/Spanish%20Jokes.docx
```

**Unresolvable hrefs:** none. Every entry mapped cleanly to a
`classcraft.co.uk` URL.

## 4. Velvet pill layout

Confirmed the 3-column grid layout is now explicit and unambiguous in
`subjects.html`:

- `.velvet-pills` is `display: grid` with
  `grid-template-columns: auto auto auto` and three rows.
- The `All` pill has inline `style="grid-column: 1; grid-row: 1 / 4;"`
  so it spans column 1 across all three rows.
- View / Evaluate / Learn each have explicit inline
  `grid-column: 2; grid-row: 1|2|3;`.
- Verify / Explore / Transform each have explicit inline
  `grid-column: 3; grid-row: 1|2|3;`.

The duplicate CSS rule that previously set placement on `.all-pill` was
removed so the inline style is the single source of truth for layout
position. A leading HTML comment now documents the intended grid
geometry above the pill block.

## 5. Git status

- `git add resources.js subjects.html`
- `git commit -m "Fix hrefs to use classcraft.co.uk URLs and fix pill layout"` — **succeeded**, commit `77e65cf`.
- `git push origin main` — **failed inside the sandbox**: no
  credentials are stored in the working directory's git config and the
  sandbox has no terminal to prompt for them.
  ```
  fatal: could not read Username for 'https://github.com': terminal prompts disabled
  ```

**Action needed from you:** open a terminal in
`~/Desktop/Websites/AI Study Method/` and run:

```bash
git push origin main
```

The commit is already on the local `main` branch; only the push to
GitHub remains.

## 6. Side note — classcraft/ subfolder

The 479 MB `classcraft/` folder that was copied in earlier (1,798 files
already tracked in the repo) is no longer required for the site to
function — every card now links to the live classcraft.co.uk site. If
you'd like to slim the repo, you can `git rm -r classcraft/` and
re-commit. I did not do this unilaterally as it wasn't part of the
brief.
