# ClassCraft Website — Project Notes

## Overview
**URL:** https://classcraft.co.uk  
**Stack:** Static HTML/CSS/JS hosted on GitHub Pages  
**Repo:** https://github.com/jrm88888888-a11y/classcraft.co.uk  
**Domain registrar:** Namecheap  
**Contact form:** Formspree (endpoint: https://formspree.io/f/xqenwavy)  
**Local folder:** ~/Desktop/classcraft-website  

---

## Pages Built

### index.html — Homepage
- Hero section with student photo (hero-students.jpg) beside headline
- "Better resources. Better outcomes. Built for how people actually learn."
- About strip (3 pillars: Simulations, Books, Workshops)
- Featured simulation: Mars Colony Survival (links to simulations/Mars_Colony_Survival_GCSE.html)
- Books preview grid (4 published titles)
- CTA strip linking to contact

### simulations.html — Simulations
- 24 classroom simulation games across 8 subjects and 3 levels (KS3, GCSE, A-Level)
- Organised by subject with colour-coded level badges
- Level filter bar (All / KS3 / GCSE / A-Level)
- Files live in simulations/ folder; thumbnails in simulations/thumbnails/
- Subjects: Business Studies, Computer Science, Economics, English, Geography, History, Mathematics, Politics, PSHE, Science

### books.html — Books
- 4 published books (Biology, Chemistry, Mathematics, Physics) — all link to Amazon
- 7 forthcoming titles shown at reduced opacity
- All part of "100 AI Prompts for Smarter Revision" GCSE series by James R. Martin
- Book cover images: cover-[subject].png in root folder

### jokes.html — Subject Jokes
- 400 jokes across 20 subjects (20 per subject)
- Subject filter tabs across top
- Each card: image, Q&A, curriculum link
- Random Joke button with modal
- Images in jokes/[subject]/joke_01.jpg etc.
- Subjects: Art, Astronomy, Biology, Business Studies, Chemistry, Computing, Design & Technology, Drama, English, Food Technology, French, Geography, German, History, Maths, Music, PE, Physics, Religious Education, Spanish

### homeroom.html — Homeroom Set A (12 tiles, 4×3 grid)
Daily classroom dashboard designed for projection on a classroom screen.
Tiles: Word of the Day, Idiom of the Day, Maths Problem, Joke of the Day, Literary Quote, On This Day, Born Today, Science Fact, Guess the Flag, Name the Element, French Word, Chinese Character

### homeroom2.html — Homeroom Set B (12 tiles, 4×3 grid)
Alternate daily dashboard — accessible via "Switch to Set B" button in homeroom.html header.
Tiles: Spelling Challenge, Latin Phrase, Geography Fact, Maths Problem, Guess the Capital, On This Day, Born Today, Joke of the Day, German Word, Spanish Word, Name the Element, Chinese Character

### contact.html — Contact
- Formspree form with name, email, organisation, enquiry type, message
- Side info panel with response time and service descriptions

---

## Design System (style.css)
- **Fonts:** Cormorant Garamond (display/headings) + Archivo (body)
- **Palette:** Warm parchment background (#f5efe6), dark ink text (#1c1712), tobacco-brown accent (#8b5e3c)
- **Responsive:** Mobile-first, hamburger nav on mobile, grid collapses at breakpoints
- **Nav:** Sticky, tabs: Home · Simulations · Books · Jokes · Homeroom · Contact

---

## File Structure
```
classcraft-website/
  index.html
  simulations.html
  books.html
  jokes.html
  homeroom.html
  homeroom2.html
  contact.html
  style.css
  CNAME
  hero-students.jpg
  cover-biology.png
  cover-chemistry.png
  cover-mathematics.png
  cover-physics.png
  cover-business.png
  cover-computer-science.png
  cover-english.png
  cover-french.png
  cover-geography.png
  cover-german.png
  cover-spanish.png
  jokes/
    art/ astronomy/ biology/ business-studies/ chemistry/
    computing/ design-technology/ drama/ english/ food-technology/
    french/ geography/ german/ history/ maths/ music/ pe/
    physics/ religious-education/ spanish/
    (each contains joke_01.jpg through joke_20.jpg)
  simulations/
    thumbnails/ (24 jpg files)
    (24 simulation HTML files)
```

---

## Git Workflow
```bash
cd ~/Desktop/classcraft-website
git add .
git commit -m "description of changes"
git push
# GitHub Pages deploys automatically — live in ~60 seconds
```

---

## Outstanding / Next Steps
- [ ] Homeroom layout — still being refined (goal: all 12 tiles on one screen, large readable text, flag not squashed)
- [ ] Mobile optimisation pass (deferred)
- [ ] Prompt Libraries section (planned)
- [ ] Workshops page (planned, content not yet ready)
- [ ] Books: update when new titles publish
- [ ] Simulations: more titles to be added when ready

---

## Key Decisions Made
- No no-code builders — all hand-coded HTML/CSS/JS
- GitHub Pages for hosting (free, reliable, fast)
- Warm parchment colour scheme — avoids generic EdTech blue/white
- "We/our" language throughout — brand sounds like a team, not an individual
- Tagline: "Better resources. Better outcomes. Built for how people actually learn."
- Books published under name: James R. Martin
- Jokes scan done — inappropriate joke removed (Music #12)
- Homeroom reduced from 18 tiles to 12 (4×3) for classroom readability
- Homeroom split into Set A / Set B — single nav tab, switch button inside page
- Homeroom uses no external APIs — all content pre-written and cycling by day of year
- Flag images served from flagcdn.com (free CDN, no API key needed)
