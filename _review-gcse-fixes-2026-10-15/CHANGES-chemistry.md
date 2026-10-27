# GCSE Chemistry lesson fixes: changes for review

Date: 14 Oct 2026. Work list: `chemistry_hooks.md` section 4 (4a–4c) and section 1a board notes, plus the `notes` field of every `gcse-chem-*` hook in `scripts.json`.

10 lessons changed. Ready-to-apply copies are in `ready-to-apply/classcraft/adventures/`. Nothing is committed or pushed.

Checks run on every changed file:
- It parses with no unclosed tags, and every `<svg>` is well-formed XML.
- The diff against the original shows only the changes listed below.
- Headless Chromium at 375 px and 1280 px showed no JS errors and no horizontal overflow on any changed screen. Screenshots were inspected.
- No quiz was added or changed, so star totals are unchanged.

Screen numbers are 0-based and refer to the original file. **Three lessons gain one screen**: AQA Chemical Changes, Edexcel Key Concepts and Eduqas Production. In each of them, every later screen index moves up by 1, so their hook mission ranges in the plan need +1 from the insertion point. Details are under each lesson.

---

## Changes by lesson

### AQA · Atomic Structure & the Periodic Table (`chemistry-gcse-aqa-atomic-structure-the-periodic-table`)
| Tier | Screen | Before → after |
|---|---|---|
| 1 | 23 Group 7 | The lesson said "Reactivity decreases" with no explanation. → Added: a halogen reacts by gaining one electron; lower down, the outer shell is further from the nucleus (more shells), so an incoming electron is attracted less strongly. AQA 4.1.2.6 requires students to "explain how properties of the elements in Group 7 depend on the outer shell of electrons". |
| 3 | 23 Group 7 | Added one line: with metals the halogens form ionic salts (e.g. NaCl); with non-metals they form covalent molecules (e.g. HCl). Spec: AQA 4.1.2.6 ("describe the nature of the compounds formed when chlorine, bromine and iodine react with metals and non-metals"). |

### AQA · Bonding, Structure & Properties (`chemistry-gcse-aqa-bonding-structure-properties`)
| Tier | Screen | Before → after |
|---|---|---|
| 1/2 | 5 Giant ionic lattices | Conduction was stated only in quick-check 6 and the recap. → Added to the note: ionic compounds conduct only when melted or dissolved, because the ions are then free to move and carry charge; the solid does not conduct. Spec: AQA 4.2.2.3. This also makes `gcse-chem-ionic-conduct` hook-safe on a teaching screen. |
| 1/2 | 8 Small molecules | → Added: small molecules do not conduct electricity, because the molecules have no overall electric charge. Spec: AQA 4.2.2.4. This covers the hook claim "simple molecular substances do not conduct". |

### AQA · Chemical Changes (`chemistry-gcse-aqa-chemical-changes`): +1 screen
| Tier | Screen | Before → after |
|---|---|---|
| 3 | **new 17** (after the pH quiz 16) | New teaching screen, "Titration: finding reacting volumes" (Required practical 2, Chemistry only). It covers: pipette 25.0 cm³ of alkali; indicator; burette of acid; drop by drop to the end-point; titre; concordant within 0.10 cm³; mean. It adds a one-line HT pointer to concentration calculations, which are taught in Quantitative Chemistry 21–22. Spec: AQA 4.4.2.5 (titrations, chemistry only; strong acids and alkalis only) and RP 2. The technique was not taught anywhere on the site (Quantitative 21 is the HT calculation only). |
| 3 | recap (old 26 → 27) | Added the line "Titration (Chemistry only): pipette alkali · burette acid · indicator → end-point · repeat for concordant titres". Footer: "(titrations… aren't in this lesson)" → "reactions of acids (including titrations, Chemistry only)". |
| | Index shift | Old screens 17–27 are now 18–28. Hook map: M2 `acid-reactions` [9–18] → [9–19]; M3 `electrolysis` [19–25] → [20–26]. |

### CCEA · Formulae & Equations (`chemistry-gcse-ccea-formulae-equations`)
| Tier | Screen | Before → after |
|---|---|---|
| 2 | 5 Balance the charges | Calcium chloride was not on any text screen; the `gcse-chem-ionic-formulae` hook narrates it. → Added: "Same rule for calcium chloride: Ca²⁺ and Cl⁻ → CaCl₂ (one +2 is cancelled by two −1s)." |
| 2 | 13 Mass is conserved | The note said "when iron rusts it gets heavier". → It now says "when magnesium burns in air or iron rusts it gets heavier", so the burning-magnesium example in `gcse-chem-conservation` is taught. |

### Edexcel · Groups in the Periodic Table (`chemistry-gcse-edexcel-groups-in-the-periodic-table`)
| Tier | Screen | Before → after |
|---|---|---|
| 2 | 9 Displacement reactions | Only Cl₂ + KBr was shown. → Added to the note: "So chlorine also displaces iodine from potassium iodide: Cl₂ + 2KI → 2KCl + I₂". The `gcse-chem-halogens` hook uses this example. Within Edexcel 1CH0 6.11. |

### Edexcel · Key Concepts in Chemistry (`chemistry-gcse-edexcel-key-concepts-in-chemistry`): +1 screen
| Tier | Screen | Before → after |
|---|---|---|
| 1 | 20 Mr | Screen 20 had a note: "Also in Topic 1: conservation of mass, reacting masses, concentration in g dm⁻³". Those were never taught, and the recap claimed "all of Topic 1". → Note removed. These are now taught on the new screen below. |
| 3 | **new 22** (after the Mr quiz 21) | New teaching screen, "Mass, masses & concentration". It covers conservation of mass in a closed flask (precipitation) and an open flask (gas out → lighter, gas in → heavier), with a worked reacting-mass example (2Mg + O₂ → 2MgO: 48 g → 80 g, so 12 g → 20 g) and concentration (g dm⁻³) = mass ÷ volume, with a worked example (10 g in 0.25 dm³ = 40 g dm⁻³). Spec: Edexcel 1CH0 1.47, 1.48, 1.49. These are **both tiers**: in the spec PDF (Issue 3) they are not in bold, while 1.50 onwards is bold (HT). |
| 3 | 13 Covalent bonding | Added one line on the limitations of dot-and-cross and ball-and-stick models. Spec: 1CH0 1.41. It was not taught anywhere in the lesson. |
| 1 | recap (old 25 → 26) | The "Masses" line now includes conservation, masses from equations and g dm⁻³. "You've covered all of Edexcel Topic 1" → "the core of Edexcel Topic 1", because 1.46 (the empirical-formula experiment) is still not described. See Not changed. |
| | Index shift | Old 22–26 are now 23–27. Hook map: M3 `mole` [20–24] → [20–25]. The new screen sits inside this mission. |

### Eduqas · Production, Use & Disposal (`chemistry-gcse-eduqas-production-use-and-disposal-of-important-chemicals-and-materials`): +1 screen
| Tier | Screen | Before → after |
|---|---|---|
| 1 | 3, 4, 7, 10, 14, 17, 20 | The quiz screens had no `<h2>`, so their headings were blank. → Added headings in the lesson's style: "Why about 450 °C?", "Raise the pressure", "Name the catalyst", "Potable or pure?", "Why bolt on magnesium?", "Which LCA stage?", "Thermosoftening or thermosetting?". None of them gives away the answer. |
| 3 | **new 10** (after 9) | New teaching screen for specified practical SP11, "How much water is in a hydrated salt?". It covers: CuSO₄·5H₂O (blue) → CuSO₄ (white) + 5H₂O; weigh, heat, cool, reweigh to constant mass; % water = mass of water ÷ mass of hydrated salt × 100. Worked example: 2.50 g → 1.60 g gives 36%, which checks against 90/249.5. Spec: Eduqas GCSE Chemistry Topic 11, specified practical SP11. Screen 9 already named SP11 but did not teach it; its note now ends "(next screen)". |
| 3 | recap (old 21 → 22) | Added the line "SP11: heat hydrated salt to constant mass; % water = mass lost ÷ mass of hydrated salt × 100". |
| | Index shift | Old 10–22 are now 11–23. Hook map: M2 `water` [8–11] → [8–12]; M3 `rust` [12–14] → [13–15]; M4 `lca` [15–20] → [16–21]. |

### Eduqas · Rate of Chemical Change & Dynamic Equilibrium (`chemistry-gcse-eduqas-rate-of-chemical-change-and-dynamic-equilibrium`)
| Tier | Screen | Before → after |
|---|---|---|
| 2 | 13 Reversible reactions | The screen said "for example, hydrated and anhydrous copper(II) sulfate" with no colours and no direction. → Now: heating blue hydrated copper(II) sulfate leaves white anhydrous (endothermic); adding water turns it blue again and it warms up (exothermic). This is the plan 4c one-liner. The lesson can now play `gcse-chem-reversible` as well as the variant `gcse-chem-dynamic-eq`. |

### Eduqas · The Periodic Table & Properties of Elements (`chemistry-gcse-eduqas-the-periodic-table-and-properties-of-elements`)
| Tier | Screen | Before → after |
|---|---|---|
| 2 | 9 Displacement reactions | → Added to the Key idea note: "In the same way, chlorine displaces iodine from potassium iodide (Cl₂ + 2KI → 2KCl + I₂)". The `gcse-chem-halogens` hook uses this. |

### OCR · Monitoring & Controlling Reactions (`chemistry-gcse-ocr-monitoring-controlling-reactions`)
| Tier | Screen | Before → after |
|---|---|---|
| 2 | 21 Reactions that go both ways | There was no concrete example. → Added: heating blue hydrated copper sulfate gives white anhydrous copper sulfate and water; adding water turns it blue again. This is the plan 4c one-liner. With the Eduqas change above, `gcse-chem-dynamic-eq` could be retired if Billy wishes. |

---

## Not changed

| Plan item | Why not changed |
|---|---|
| H₂ + Cl₂ bond-energy answers −184 / −185 / −186 (4c) | **Verified, no change needed.** Each lesson is internally consistent across its text, figure and answer key. AQA, Cambridge, Edexcel and Edexcel IGCSE use 436 / 242 / 431 → −184. Eduqas uses 436 / 242 / 432 → −186, and its quiz key is −186. OCR uses 436 / 243 / 432 → −185. Per the brief, boards are not forced onto one data set. |
| Edexcel States of Matter: particle-model limitations labelled "not on the Edexcel spec" | **Verified correct.** 1CH0 2.1–2.6 has no limitations statement. |
| Edexcel Extracting Metals: blast furnace "not required" | **Verified correct.** 1CH0 4.7: "(knowledge of the blast furnace is not required)". |
| CCEA Materials covers only nanoparticles | **Verified correct.** The CCEA GCSE Chemistry (2017) unit 1.4 is "Nanoparticles" only. |
| CCEA Organic has no esters or condensation polymers | **Verified correct.** CCEA 2.5 has addition polymerisation only, and no esters. |
| Eduqas Production: Contact process labelled "not on the Eduqas spec"; potable water labelled Topic 12 | **Verified correct** against Eduqas Topic 11 (a)–(v) and Topic 12 (i). |
| AQA Using Resources: quick-check 23 sits after recap 22 | Structural reordering. Moving screens risks quiz and gate wiring. Needs Billy. |
| Eduqas Bonding has no recap and ends on two quick-checks | Structural. Writing a recap is a design choice. Needs Billy. |
| Edexcel Key Concepts "Conductor or not?" placed after the masses section (now screen 25) | Ordering only, not an error. Needs Billy. |
| Edexcel Rates: enzymes after energy changes; OCR Elements, Compounds & Mixtures: Mr/empirical and nanoparticles out of sequence | Ordering only, not errors. Needs Billy. |
| Cambridge Stoichiometry has no apparent mass change in an open container (4c) | Not added. I did not check this against the 0620 syllabus, and the variant `gcse-chem-balancing` already covers the lesson. Needs Billy if he wants to retire that variant. |
| 4a thin or short missions (Edexcel IGCSE Principles and Inorganic, OCR C3/C6, Edexcel Sep Chem 1 Haber and cells, Edexcel Key Concepts 20–24) | Depth observations, not errors or verified gaps. Out of scope. (Key Concepts M3 now has one more teaching screen.) |
| 4b OCR Practical Skills | No error. Hook decision only. |
| Edexcel 1CH0 1.46 (experiment to find the empirical formula of e.g. magnesium oxide) | Found during the spec check. It is not described in Key Concepts. The empirical-formula *calculation* is taught in Edexcel Sep Chem 1, screens 19–20. Not fixed, to keep additions small. Needs Billy. |
| Eduqas 11(e) tests for ammonia gas and ammonium salts | Found during the spec check. I found no teaching of either test in any Eduqas chemistry lesson (only a litmus mention in Chemistry of Acids 2 and 19). Not fixed: not on the plan's list, and the right home lesson is Billy's call. |
| Hook narration notes (scripts, not lessons) | `gcse-chem-early-air` says "four billion years": no lesson states that figure (AQA: "first billion years"; Edexcel: "billions of years"). Suggest "billions of years ago". `gcse-chem-conservation` says "white powder": only AQA calls MgO white. `gcse-chem-salt-prep` says "black powder", and `gcse-chem-blast-furnace` says "taller than a house": these are framing only. Script edits are Billy's call. |
| New lessons or splits | None arose for chemistry. |

Spec sources:
- AQA 8462 web specification: sections 4.1.2.6, 4.2.2.3, 4.2.2.4 and 4.4.2.5.
- Pearson Edexcel GCSE (9-1) Chemistry 1CH0 specification, Issue 3: 1.41, 1.43–1.53, 2.1–2.6, 4.7 and 6.9–6.14. HT status was read from the bold formatting in the PDF.
- WJEC Eduqas GCSE Chemistry specification (from 2016): Topics 9, 11 and 12.
- CCEA GCSE Chemistry (2017) specification: 1.4, 1.5, 1.6 and 2.5.
