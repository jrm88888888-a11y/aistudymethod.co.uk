# Debug Report — "None of the games open" on aistudymethod.com

**Date:** 2026-05-29
**Branch:** `debug-games-not-opening` (created)
**Status:** Root cause identified. Fix is fully prepared in the working tree but cannot be committed from the sandbox — see §6.

---

## 1. Root cause

The earlier integration work (repointing 892 hrefs to local `classcraft/`, building the canonical SUBTOPICS taxonomy, rebranding 801 pages, adding the unified sitemap) was **never committed or pushed**. The live `main` branch is still at commit `77e65cf` — the commit that points every card at `https://classcraft.co.uk/<file>`.

Two distinct failure modes flow from that uncommitted state:

1. **Topic filter returns zero results on the live site.** The deployed `SUBTOPICS` map in `subjects.html` uses curated labels that slugify to `cell-biology`, `infection--response`, etc., but the deployed resource `subtopic` values are `cells`, `dna`, `the-mitosis-spy`, `ai-prompts` — they don't match. Any user who picks a topic from the dropdown gets "No resources found" and there's nothing to click. (Confirmed by inspecting the live `resources.js`: every entry's `subtopic` is the old free-form slug.)
2. **Every card link is an external `https://classcraft.co.uk/...` URL.** Today those URLs do work (classcraft.co.uk is still up and serves the games — `200 OK` for every URL pattern I probed). But you've said classcraft.co.uk is being retired; the moment it goes dark, every "Open →" 404s. Even now, the `target="_blank"` external link is fragile (popup blockers, cross-origin click handlers).

Both go away once the integration is committed and deployed.

## 2. Evidence

### `resources.js` parses correctly (working tree)

```
node → RESOURCES.length = 892
       first href: classcraft/games/bio-alevel-quiz.html
       hrefs still on classcraft.co.uk: 0
```

No syntax errors. The bulk rewrite left a valid JS file.

### `SUBTOPICS` covers every combo (working tree)

```
node → SUBTOPICS keys: 85
       duplicates: 0
       Resource→SUBTOPICS slug mismatches: 0
       Combos with at least one topic that returns ≥1 result: every combo
```

### Live `aistudymethod.com` deploy state

```
HEAD on origin/main = 77e65cf "Fix hrefs to use classcraft.co.uk URLs and fix pill layout"
Live resources.js:      892 hrefs on https://classcraft.co.uk/    (broken-on-retirement)
                          0 hrefs on classcraft/
```

### Per-subdir live link probe

Every subdir on the new layout returns 200:

| URL | Status |
| --- | :---: |
| `aistudymethod.com/classcraft/games/bio-cells-memory.html` | **200** |
| `aistudymethod.com/classcraft/stories/biology/gcse/S0074_the_mitosis_spy.html` | **200** |
| `aistudymethod.com/classcraft/Books/A-Level%20Biology/A-Level%20Biology.pdf` | **200** |
| `aistudymethod.com/classcraft/vocab-hub/game-pacman.html` | **200** |
| `aistudymethod.com/classcraft/simulations/AI_Ethics_Board_A-level.html` | **200** |
| `aistudymethod.com/classcraft/jokes/spanish/Spanish%20Jokes.docx` | **200** |
| `aistudymethod.com/classcraft/nature.html` | **200** |

So the `classcraft/` folder **is** deployed and reachable from the new domain — the catalog just isn't pointing at it yet.

### Per-subdir live link probe — external (legacy)

Sanity-checked one URL from each subdir on the old domain — every one still serves 200 right now. So today's users aren't seeing 404s; what they're seeing is the topic filter returning empty and (likely) some `target="_blank"` clicks being suppressed. Once classcraft.co.uk is retired the failure mode becomes a hard 404 on every card.

### Local working tree

- `subjects.html` cardHTML uses same-tab default and only emits `target="_blank" rel="noopener"` for `type === 'revision-book'`.
- `resources.js` ↔ `SUBTOPICS` cross-check passes (every resource has a topic in its combo's taxonomy).
- Sample filter results from the working tree (these will work after deploy):

| Filter (subject / level / topic) | Results |
| --- | ---: |
| biology / gcse / cell-biology | 7 |
| biology / gcse / homeostasis--response | 8 |
| history / a-level / cold-war--20th-century | 8 |
| art-design / ks3 / colour--tone | 3 |
| physics / ks3 / forces--motion | 2 |
| english-literature / gcse / vocabulary-games | 8 |
| geography / ks3 / tectonics--hazards | 3 |

## 3. What was already fixed in the working tree (carried by the previous run)

- 892 hrefs repointed `https://classcraft.co.uk/...` → `classcraft/...` (zero remaining external).
- SUBTOPICS taxonomy expanded to 85 unique keys covering every (subject, level) combo that has resources; duplicate `psychology-a-level` / `sociology-a-level` keys merged.
- Every resource `subtopic` re-tagged to a canonical slug from its combo's taxonomy.
- Card render: same-tab default, `target="_blank"` only on book PDFs.
- 801 classcraft HTML pages rebranded into the AI Study Method shell.
- `classcraft/style.css` renamed to `classcraft-pages.css` (root `style.css` collision avoided).
- New unified `sitemap.xml` (877 URLs) and `robots.txt` at site root.
- Nested `classcraft/CNAME` neutralised to `aistudymethod.com`.
- All visible `ClassCraft` strings removed from HTML, JS, CSS.

## 4. What this debug pass added on top

- Created branch `debug-games-not-opening` from `main`.
- Re-verified end-to-end: `resources.js` parses, `RESOURCES.length === 892`, `SUBTOPICS` slug-matches every resource (0 mismatches), every relevant subdir URL returns 200 on the new domain.
- Authored `finish-debug-commit.sh` to do the final commit (see §6).

## 5. Per-subdir sample failure pattern

There **is no per-subdir failure pattern** in the live filesystem. Every subdir's sample URL serves 200 on `aistudymethod.com`, and every sample URL on `classcraft.co.uk` also still serves 200. The failure is upstream of the file system — it's at the catalog/filter layer (topic filter returns no cards) and is about-to-be at the link layer (the moment classcraft.co.uk dies). Both are fixed by the staged commit.

## 6. Outstanding — please run this on your machine

The Cowork sandbox cannot delete files inside `.git/` (the macOS folder grant doesn't permit `unlink` on this path), which means I couldn't clear two stale `.git/HEAD.lock` and `.git/index.lock` files left by a crashed git op. Until those are removed, no `git commit` will succeed inside the sandbox. The integration changes are still in the working tree — just unstaged.

I've left a one-shot script at the repo root: **`finish-debug-commit.sh`**. Run it from a normal terminal:

```bash
cd ~/Desktop/Websites/AI\ Study\ Method
bash finish-debug-commit.sh
```

It does:

1. Removes the stale `.git/*.lock` files and prunes the abandoned worktree.
2. Switches to (or creates) `debug-games-not-opening`.
3. Drops the renamed-away `classcraft/style.css` from the index.
4. Adds `.DS_Store` to `.gitignore` and unstages any that crept in.
5. Stages all the integration changes and commits with a clear message.

When that completes, push with **whichever of these you prefer**:

```bash
# Option A — push the branch for review, no risk to main
git push -u origin debug-games-not-opening

# Option B — merge into main and push
git checkout main
git merge --no-ff debug-games-not-opening
git push origin main
```

(`git push` was deliberately not run from the sandbox per the brief.)

## 7. After deployment — quick smoke check

1. Open `aistudymethod.com/subjects.html`, pick a subject + level (e.g. Biology / GCSE), then a topic from the dropdown (e.g. Cell Biology). You should see cards — currently you get "No resources found".
2. Click any card's "Open →". It should open in the **same tab** and load the in-repo classcraft page. Only "Revision Book" cards (PDF books) should open in a new tab.
3. Hit `aistudymethod.com/sitemap.xml` and confirm 877 URLs, all on `aistudymethod.com`.

## 8. Not in scope / not done

- I did **not** delete or modify any source content files outside the integration changes already in the working tree. No game logic / canvas / SVG was touched.
- I did **not** push to `origin`.
- I did **not** attempt to set up a 301 from `classcraft.co.uk` → `aistudymethod.com` — that needs to happen at the DNS host or in the old repo, not from here. With the integration deployed the new domain is self-sufficient, so this is no longer urgent — but it's still the right next step for any external links / bookmarks people already have.
