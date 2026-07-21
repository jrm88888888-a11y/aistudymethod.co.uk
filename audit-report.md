# Site Audit — aistudymethod.com

**Date:** 2026-05-29
**Scope:** 808 HTML pages (7 root + 801 under `classcraft/`), all assets, sitemap, robots, deployment.

I split findings into three buckets: **fixed in this pass**, **worth fixing soon**, and **fine for now / informational**.

---

## A. Fixed in this pass

### A1. 161 broken internal links — game pages' header logo pointed at `classcraft/index.html` (doesn't exist)

Every `classcraft/games/*.html` page (160 files) and `classcraft/vocab-hub/vocab-hub.html` had an internal in-page header logo that read:

```
<a class="hd-logo" href="../index.html">AI <span>Study</span></a>
```

From inside `classcraft/games/`, `../index.html` resolves to `classcraft/index.html` — which doesn't exist, so a click 404'd. Same for `vocab-hub.html`'s `hd-logo` / `hd-back` pair. The AI-Study-Method top nav (separate, `<a class="logo">`) was already correct at `../../index.html`. **Fixed**: changed those header anchors to `../../index.html`.

### A2. Broken `contact.html` link on the simulations landing page

`classcraft/simulations.html` had a bare `href="contact.html"` (legacy from classcraft.co.uk's old contact page). The site has no `contact.html`; contact info lives in `parents.html#contact`. **Fixed**: rewrote to `../parents.html#contact`.

### A3. Topic dropdown showed labels with zero results

31 SUBTOPICS labels had no resources tagged to them (e.g. Physics-GCSE / Particle Model, Physics-GCSE / Space, Maths-A-Level / Mechanics, English-Literature-A-Level / Unseen Texts, English-Language-GCSE / Reading & Comprehension). A user picking those would see "No resources found." **Fixed**: pruned all 31 empty labels from `SUBTOPICS`. Every label in the dropdown now returns ≥1 card. Taxonomy is still 85 keys (one per subject+level combo with resources), just with fewer dead-end topics.

### Verification after fixes

```
broken internal links remaining: 0
broken assets remaining:         0
Resource → SUBTOPICS mismatches: 0
Empty topics in SUBTOPICS:       0
30/30 random sitemap URLs:       200 OK
```

---

## B. Worth fixing soon (left for you)

### B1. 600 story pages have no `<meta name="description">`

Every `classcraft/stories/**/*.html` is missing a meta description. Search results currently fall back to whatever Google extracts from page text. Easy to script: write a one-liner description per story from the story title / opening paragraph. Not urgent, but it's the single biggest SEO lift available.

### B2. No `<link rel="canonical">` anywhere

All 808 pages lack a canonical tag. Without it, Google could index the same content under both `aistudymethod.com/...` and the now-redirected `classcraft.co.uk/...` (when traffic comes via the old domain). Adding `<link rel="canonical" href="https://aistudymethod.com/<relative-path>">` to every page would close this. Trivial to script.

### B3. 23 overlong titles (>70 chars)

Mostly simulation and label-diagram games. They read like  
`Castle Under Siege | KS3 History Simulation | Free | classcra... — AI…`  
The `— AI Study Method` suffix got tacked on after an already-long classcraft title, blowing the SERP limit. Worth a pass to shorten the inherited title before the suffix.

### B4. 15 label-diagram games have no `<h1>`

All `classcraft/games/*-diagram.html` use only `<h2>` or visual headers. Adds nothing for sighted users but screen readers and SEO crawlers both look for one `<h1>`. One-line fix per page.

### B5. 24 simulation pages have 4 `<h1>` each

`classcraft/simulations/*.html` use `<h1>` for every "screen" in their multi-screen UI. Visually fine because only one is on-screen at a time, but a screen-reader on first load thinks there are four equal-rank titles. Most pragmatic fix: keep the first `<h1>` and demote the other three to `<h2>`. Not user-blocking.

### B6. 602 story pages have duplicate IDs (`hint-area`, `feedback`, `consequence`, `continue-btn`)

Same pattern as B5 — the story interactives reuse the same IDs across scene markup that's hidden/shown via JS. The interactive logic works (it queries the visible one), but the HTML is technically invalid and a screen-reader can get confused. The fix is per-scene unique IDs in the source template; non-trivial because it would touch the generator that produced the stories. Low priority unless accessibility is in scope.

---

## C. Informational / no action needed

- **0 leftover `ClassCraft` strings** in any HTML, JS, or CSS.
- **0 leftover `classcraft.co.uk` URLs** anywhere on the live surface.
- **0 mixed-content (`http://`) refs.**
- **6 root pages** (index / about / courses / parents / velvet-method / ai-study-guide) all have valid titles, descriptions, the canonical six-item nav (Subjects / Velvet / Courses / AI Lab / Parents / About), and the same hero/footer pattern. No broken images.
- **External font preconnects** to `fonts.googleapis.com` and `fonts.gstatic.com` are the only third-party requests. One stray `amazon.co.uk` external link (informational only — likely the books page).
- **Stage skew unchanged:** `learn` 744, `transform` 69, `explore` 31, `evaluate` 25, `verify` 23, `view` 0. Reclassification was deprioritised in the original brief; flagging again so it doesn't get lost.
- **Sitemap:** 877 URLs, 30/30 random sample all 200 OK on the live site. `robots.txt` reachable. CNAME, HTTPS, SSL all fine.
- **`subjects.html`** verified: SUBTOPICS still 85 keys, `cardHTML` still wraps the card as an `<a>` (whole card clickable), card-cta same-tab default with book-PDF new-tab exception.
- **6,606 inline `on*=` event handlers** across 785 pages — entirely from the original classcraft games' interactivity. Not a bug, but a CSP `script-src 'unsafe-inline'` would always be needed to keep them working. Worth knowing if you ever tighten CSP.

---

## D. To deploy this audit's fixes

```bash
cd ~/Desktop/Websites/AI\ Study\ Method
git add -A
git commit -m "Audit fixes: broken header logos, contact link, prune empty topic labels"
git push origin main
```

Three categories of file changed: 160 game pages (hd-logo href), 1 vocab-hub-page, 1 simulations.html, 1 subjects.html (pruned SUBTOPICS).

After Pages rebuilds, the user-visible improvements are: clicking the in-game wordmark goes home (not 404), the simulations landing page's "Contact Us" button works, and the topic dropdown stops offering dead-end labels.
