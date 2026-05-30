# Homepage Hero Redesign — Report

**Date:** 2026-05-30
**File:** `index.html` (38.7 KB → 59.4 KB)
**Backup:** `index.html.backup-hero-redesign`

---

## 1. What changed in the hero

| Element | Before | After |
| --- | --- | --- |
| Eyebrow | "Introducing The Velvet Method" | Kept verbatim |
| Headline | "ChatGPT won't get you an A. Knowing how to use it will." | **Kept** (it's strong) |
| Subhead | "...a six-step framework that teaches students how to use ChatGPT, Claude, and Gemini..." | **Replaced** with the course-first copy from the brief — leads with "step-by-step course", names the outcome (organised, confident, knowing how you prepared), ends with "Any subject, any level, any exam board." |
| Credibility line | none | **New** — "Designed by a physicist-teacher and an Oxford-trained education specialist · grounded in cognitive science" (DM Mono, muted) |
| Primary CTA | "Explore Free Resources →" (`subjects.html`) | **Flipped** — "Start the Course — £47 →" links to `courses.html` (real link, verified) with "was £65 · summer price" subtitle directly underneath |
| Secondary CTA | "View Courses" (`courses.html`) | **Flipped** — "Try the Method Free →" links to `subjects.html` |
| Parent cue | none | **New** — small link "Parent? See how it helps your child →" links to `parents.html`, sits just below the CTA pair |
| Right column | Animated VELVET wheel | **Replaced** with the before/after image (`images/before-after.png`) in a rounded, shadowed frame with a small "Before → After the Velvet Method" caption underneath |
| Stat row | "160+ games · 4,600+ vocab terms · 25 subjects · £47 summer price" | **Replaced** per the brief — 4 columns: "Six-step method", "Any subject · any exam board", "Works with any AI · ChatGPT · Claude · Gemini", "Grounded in cognitive science" |

The old free-volume metrics ("160+ games / 4,600+ vocab terms") have been **removed from the hero**. They survive lower on the page in the Free Resources section.

## 2. Owner's photo

**Found at `classcraft/james-martin.png` and `classcraft/james-martin.webp`.** Copied both into a new `images/` directory at the site root:

- `images/james-martin.webp` (89.9 KB — used in the markup, lazy-loaded)
- `images/james-martin.png` (168.5 KB — fallback)

The WebP is referenced in the `<img>` because modern browsers prefer it; the PNG is kept alongside as a fallback if you'd rather swap.

## 3. "Designed by" credibility strip

Two-card grid (stacks to single column at ≤820 px). Both cards have round portrait + name + one-line credential, matching the brand styling (rounded card, accent border, Playfair Display for the name).

- **James Martin** — *Physicist (MSci Bristol) & Oxford-trained teacher · author of the 100 AI Prompts for Smarter Revision series.* (Mirrors what's on the About page.)
- **Clare** — *Oxford- and Durham-trained education specialist · former academic supervisor on the Oxford PGCE programme.* Photo is a clearly-labelled **placeholder** circle reading "[Clare's photo — to be added]" (dashed border, accent-soft background, DM Mono text) — no invented or stand-in photo.

## 4. "How the Velvet Method works" — wheel relocated + captioned

The animated VELVET wheel has moved out of the hero into a new section captioned "How It Works." It now sits in a 2-column grid (collapses to 1 column on tablet/phone):

- **Left:** the wheel (slightly smaller than before, with 6 letter-buttons V/E/L/V/E/T).
- **Right:** 6 caption cards stacked, one per letter, with the exact step copy from the brief ("Map your whole syllabus before you study a thing…", "Run an AI diagnostic…", "Fill those gaps in the format that sticks…", etc.).

The wheel is **interactive**: tap a letter (or its caption) and both highlight in sync. Defaults to "V · View" highlighted on load so the section reads correctly without interaction. Hover and active states use the existing `--accent` and `--accent-glow` tokens — no off-brand colours.

The old 6-step cards layout is preserved in the DOM as a hidden fallback (`display:none`) so the content is still indexable for now; you can delete that block later if you want to slim the page.

## 5. Testimonials

New section with two cards (responsive, stacks to single column ≤600 px). Both real, owner-provided:

> "I feel much more organised and in control after using this method." — **Luke, student, UK**

> "GCSEs are much less daunting when I know I can approach them using the Velvet Method." — **Marrissa, student, China**

Used `<figure>` / `<blockquote>` / `<figcaption>` for semantic correctness. No third placeholder card was added (the brief said one is optional — easier to add later than to ship with a hollow slot).

## 6. Parent reassurance strip

Short strip below the testimonials, in a section-alt band so it sits visually between testimonials and the free-resources catalog. Headline + 2-line reassurance copy + primary "Parent Guide →" CTA to `parents.html`. Stacks vertically on mobile.

## 7. Below the hero — page order now reads

1. Hero (course-first)
2. Designed by (credibility)
3. How it works (wheel + captions)
4. Testimonials
5. Parent reassurance
6. Free resources / subjects preview (relocated below hero — no longer headlines)
7. Courses preview (unchanged — already had the £47 flagship card)
8. Why it works (unchanged)
9. CTA band (unchanged)
10. Footer (unchanged)

## 8. Course CTA — verified

The primary hero CTA links to `courses.html`, which is the real course page (already present in the repo and listed in the nav). Same as the "Enrol now →" link in the existing summer-banner. **Not `#`.** If you have a separate live checkout URL (e.g. Stripe / Lemon Squeezy / Thinkific) and want the hero button to bypass `courses.html` and go straight there, drop me the URL and I'll swap.

## 9. Mobile / responsive

I added homepage-specific media queries (in addition to the global responsive layer added earlier today):

- **≤1024 px** — hero stacks (image moves above headline); how-it-works grid stacks; wheel centred.
- **≤820 px** — designed-by cards stack; parent strip stacks and centres.
- **≤600 px** — stat row goes 4→2 cols; testimonials stack; wheel shrinks to 300 px; nodes shrink to 54 px.

Combined with the global hamburger nav added earlier today, the page reads cleanly down to 375 px (and acceptably to 320 px). Touch targets on the CTAs are ≥44 px.

## 10. One outstanding asset

⚠️ **The before/after image isn't in the repo yet.** The brief described it as attached, but it didn't reach the upload folder Cowork can read. I've already referenced it at `images/before-after.png` in the hero markup — you just need to **save the attached file as `images/before-after.png`** (or upload a 2× retina copy of the same name). Until then the hero shows a broken-image placeholder on the right. The `alt` text is in place: *"Before and After — a student transformed from overwhelmed with stacks of paper to calm and organised with the Velvet Method on their laptop."*

A WebP companion would also be a nice add (`images/before-after.webp`) — same drop-in path with a `<picture>` wrapper would let you serve the smaller file. I can wire that up after you drop the PNG if you want.

## 11. Accessibility + brand checks

- Semantic headings preserved: one `<h1>` in hero, `<h2>` for each major section. New testimonials use `<figure>` / `<blockquote>` / `<figcaption>`. Parent strip uses `<h3>`.
- `alt` text on both images (`james-martin.webp`, `before-after.png`).
- Velvet wheel buttons are real `<button type="button">` elements with `data-letter` attributes — keyboard-focusable.
- Brand tokens intact — no off-brand colours, fonts unchanged (Playfair Display, DM Sans, DM Mono).
- Light theme only — no dark surfaces introduced.

## 12. What I did NOT touch

- Top summer-price banner (already led with £47 — no change needed).
- Courses preview cards (already showed the £47 flagship — kept).
- Why It Works section.
- Final CTA band.
- Nav, footer, root `style.css`, `script.js` — all unchanged in this pass (they were changed for the responsive pass earlier today).

## 13. To deploy

```bash
cd ~/Desktop/Websites/AI Study Method
# Save the before-after image into images/ first:
#   cp ~/Downloads/before-after.png images/before-after.png
git add -A
git commit -m "Homepage hero redesign: course-first CTAs, before/after image, designed-by strip, testimonials, parent reassurance, interactive VELVET wheel"
git push origin main
```

**Working on a branch is recommended.** Because of the `.git/HEAD.lock` issue we hit before in the sandbox, I left the branching step for your terminal. If you want a branch:

```bash
git checkout -b homepage-redesign
git add -A
git commit -m "..."
git push -u origin homepage-redesign
# review, then merge to main when happy
```

## 14. Quick checklist for the owner

- [ ] Drop the before/after PNG at `images/before-after.png`.
- [ ] When Clare's photo arrives, replace the placeholder card's inner `<div>` block with an `<img src="images/clare.webp" …>` mirroring the James Martin card.
- [ ] If a Stripe / direct enrolment URL exists, swap `href="courses.html"` on the hero's primary CTA.
- [ ] Optional: delete the hidden fallback step-cards block in the "How it works" section once you're confident the wheel+captions reads well.
