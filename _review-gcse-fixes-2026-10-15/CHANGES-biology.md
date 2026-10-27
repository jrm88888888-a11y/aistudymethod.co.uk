# GCSE Biology lesson fixes: 15 Oct 2026 review

These are reviewed copies only. Nothing is committed or live. The files are in `ready-to-apply/classcraft/adventures/`. **13 lessons changed:** 7 tier-1 changes, 10 tier-2 changes and 9 new teaching screens (tier 3). No `<head>`, REL block, script, quiz key or star count was touched, so star totals are unchanged in every file.

Screen numbers are 0-based and taken from the edited file.

Checks run on every changed file:
- the HTML parses with no unclosed tags;
- every `<svg>` is well-formed;
- a diff against the original shows only the intended edits;
- Playwright at 375 px and 1280 px: no JS errors, no horizontal overflow on any screen, and the changed screens were screenshotted and looked at.

## Tier 1: errors and inconsistencies

**CCEA · Cell Division & Genetics** (`biology-gcse-ccea-cell-division-genetics-mini-lesson.html`)
- Screens 5, 7 and 8 (tier 1): the single-gene example was brown/blue eye colour, which is polygenic. It is now rabbit fur colour, B = black (dominant) and b = brown (recessive), the same example AQA's lesson already uses.
  - Screen 5: phenotype example and the "Rule" line.
  - Screen 7: worked Punnett cross, ratios and the "Remember" box.
  - Screen 8: question stem, unit ("child" → "rabbit") and hint. The answer is still 1, and the quiz key is unchanged.
- Screen 12 (tier 1): haemophilia said only "caused by a recessive allele". It now says "a recessive allele on the X chromosome (sex-linked) … Males (XY) need only one copy, so it is far more common in boys". CCEA 2.4.11 requires students to "explain the inheritance of haemophilia", and that cannot be done without sex linkage.

**OCR · Genes, inheritance and selection** (`biology-gcse-ocr-genes-inheritance-selection-mini-lesson.html`)
- Screen 4 (tier 1): the quick check used the same eye-colour error ("Brown eyes (B) are dominant to blue eyes (b)"). The plan did not list it. It now reads "In rabbits, black fur (B) is dominant to brown fur (b). Which genotype gives brown fur?", and the explanation is changed to match. The answer is still bb.

**Eduqas · Cell biology** (`biology-gcse-eduqas-cell-biology-mini-lesson.html`)
- Screen 2 (tier 1): the screen contradicted itself. The figure labels ribosomes in the animal cell, and screen 4 says bacteria have ribosomes, but the caption's "Shared" list left them out.
  - The caption now reads "Shared: nucleus, cytoplasm, cell membrane, mitochondria, ribosomes".
  - A list line was added: "Ribosomes — where proteins are made (in animal, plant and bacterial cells)".
  - The Eduqas 1.1(c) list does not name ribosomes, so this is a consistency fix, not new spec content.

## Tier 2: hook-safety additions

These are the ★ items from plan 4d, plus gaps found by checking each hook's script against every lesson that plays it. That check was a keyword check per mission, followed by reading every hit.

- **Cambridge IGCSE · Coordination & response, screen 1** (`reflex`): "…protects the body" → "…protects the body (e.g. pulling your hand away from a hot object)".
- **OCR · Organism level systems, screen 1** (`reflex`): "(e.g. pulling your hand away from a hot object)" added to the reflex line.
- **Edexcel IGCSE · Structures & Functions, screen 30** (`reflex`): "A reflex is a fast, automatic response:" → "…that protects you — e.g. pulling your hand off a hot object before you have time to think:".
- **OCR · Scaling up, screen 5** (`sa-volume`): added "A single-celled organism can rely on diffusion across its surface alone". The SA:V sentence now ends "…specialised exchange surfaces and a transport system to reach every cell". The hook also claims a transport system is needed, and OCR B2.2a covers both points.
- **Eduqas · Inheritance, variation and evolution, screen 1** (`dna-zip`, script note): "stored as chromosomes" → "stored as chromosomes in the nucleus". The hook opens "Inside the nucleus of your cells is DNA".
- **Edexcel · Plant structures & functions, screen 3** (`photo-limiting`; not in the plan): the hook's first claim is that counting pondweed bubbles measures the rate, and the lesson never taught it. Edexcel's own core practical (6.5) was also missing. Added: "Core practical: put algal balls in hydrogencarbonate indicator at different distances from a lamp — the faster the indicator turns purple (CO₂ used up), the faster the rate. With pondweed, count the oxygen bubbles given off in a set time." Source: Pearson GCSE (9–1) Sciences core practical guide, CP 6.5.
- **CCEA · Osmosis & plant transport, screen 3** (`osmosis-potato`; not in the plan): the hook's scene says potato gains mass in water and loses it in strong sugar solution, and the lesson never said this. Added: "So a potato cylinder gains mass in pure water and loses mass in a concentrated sugar solution."
- **Edexcel IGCSE · Structures & Functions, screen 22** (`alveoli`; not in the plan): the hook's answer is surface area, which the lesson never stated.
  - Caption: "numerous" → "numerous (a huge surface area)".
  - "intercostal muscles" → "intercostal muscles (between the ribs)".

## Tier 3: coverage gaps, checked against the official specifications

**OCR · Organism level systems (B3)**: 15 → 18 screens. The lesson map changes from M2 5–13 to **M2 5–16**; M1 stays 1–4.
- **New screen 7, "Hormones & the menstrual cycle".** OCR J247 B3.2c, B3.2e; Higher tier B3.2d, B3.2f.
  - Covers FSH, LH, oestrogen, progesterone and testosterone.
  - Hormonal vs non-hormonal contraception.
  - Higher-tier note: the hormone interactions, plus FSH/LH and IVF for infertility.
- **New screen 10, "Controlling body temperature".** B3.3a, B3.3b: sweating, vasodilation, shivering, vasoconstriction, and the importance of a constant internal environment.
- **New screen 11, "Water balance & the kidneys".** B3.3f–h; Higher tier B3.3i–j.
  - Osmotic changes, including lysis and shrinking.
  - Kidney tubule: Bowman's capsule, PCT, loop of Henlé, collecting duct.
  - Higher-tier note: ADH, thirst and negative feedback.
- Screen 0 intro and screen 16 recap: one phrase and three recap lines added to match.

**OCR · Global challenges (B6)**: 15 → 17 screens. The lesson map changes to **M2 4–9** (was 4–8) and **M3 10–15** (was 9–13).
- **New screen 6, "Plant diseases & defences".** B6.3f–h; Higher tier B6.3i.
  - TMV, barley powdery mildew (*Erysiphe graminis*) and crown gall (*Agrobacterium tumefaciens*).
  - Cuticle, cell wall and antimicrobial substances.
  - Field and lab detection.
- **New screen 12, "Non-communicable disease".** B6.3c, B6.3r–u.
  - Multifactorial causes and lifestyle factors.
  - Cancer as uncontrolled division.
  - Lifestyle, medical and surgical treatment of cardiovascular disease.
  - HIV/TB and HPV/cervical cancer.
- Screen 15 recap: two lines added.

**OCR · Community level systems (B4)**: 15 → 17 screens. The lesson map changes to **M1 1–8** (was 1–6) and **M2 9–15** (was 7–13).
- **New screen 3, "What affects a community?".** B4.1f, B4.1g: abiotic and biotic factors; competition, predation, mutualism and parasitism; interdependence.
- **New screen 6, "What speeds up decay?".** B4.1b, B4.1d: decomposers; the effect of temperature, water and oxygen (aerobic vs anaerobic) on the rate of decay.
- Screen 0 intro and screen 15 recap updated to match.

**Cambridge IGCSE · Gas exchange & respiration** (0610 syllabus for 2026–2028, topic 11.1): 15 → 17 screens. Still one mission, now **1–15**.
- **New screen 3, "The breathing system".**
  - Core 11.1.2: the named parts, including larynx, ribs, intercostal muscles and diaphragm.
  - Supplement note, 11.1.6 and 11.1.8: ventilation mechanism with internal and external intercostals, and the volume and pressure changes.
  - Supplement note, 11.1.7 and 11.1.11: cartilage, goblet cells, mucus and ciliated cells.
- **New screen 4, "Breathed in vs breathed out".**
  - Core 11.1.3–5: O₂, CO₂ and water vapour; the limewater test; exercise increases the rate and depth of breathing.
  - Supplement note, 11.1.9–10: why the composition changes, and CO₂ in the blood being detected by the brain.
- Screen 0 intro and screen 15 recap updated to match.

## Not changed

| Plan item | Why it was not changed |
|---|---|
| Eduqas Health, screen 17: healthy volunteers under "preclinical" | **Matches the board.** Eduqas spec 3.3(f) says word for word: "Preclinical stages involve testing on human cells grown in the laboratory, then on animals and finally a group of healthy volunteers." Students are marked against this. Left as is; **Billy's call** whether to add a note that standard usage puts healthy volunteers in phase 1 clinical trials. |
| Edexcel Genetics: eye colour | **Checked; no error.** "Brown eyes" is used only as a phenotype example, and "natural eye colour" only as an example of genetic variation. There is no single-gene cross. |
| Eye colour called "purely genetic" (CCEA Variation & Selection, teaching text and sort game) and "genetic variation, e.g. eye colour" (AQA, Eduqas, Edexcel IGCSE) | It is mostly genetic, so this is acceptable at GCSE. Low priority. **Billy's call.** |
| CCEA Reproduction & Fertility: no FSH or LH | **Not on the spec.** CCEA 2.3.4–2.3.5 name only testosterone, oestrogen and progesterone, and FSH/LH appear nowhere in the CCEA GCSE Biology specification. The 2.3.6 fertility content (hormones, IVF) is already in the lesson. |
| Ordering: Eduqas Cell biology (enzymes 11–12, SA:V 21–22), Eduqas Transport systems (15–17), Edexcel Cells & control (calculations 12 and 16) | Reordering screens is restructuring, not an error fix. **Billy's call.** |
| OCR Cell level systems 10–12 repeats B2 transport (also in Scaling up) | The lesson itself says this. Not an error; **Billy's call** whether to cut it. |
| Edexcel IGCSE Reproduction screen 24: "Beyond the spec" sex linkage | Correctly labelled; no change needed. |
| Cambridge Supplement content (kingdoms, DNA, water potential, µm) | No lesson error. It is a hook-planning point (`mushroom-kingdom` is an owner decision). |
| CCEA Nutrition & health vs Enzymes & digestion overlap | Overlap, not an error. **Billy's call.** |
| Edexcel IGCSE Structures & Functions: split into 3–4 lessons | **Out of scope** (new lessons). |
| Cambridge IGCSE missing topics (reproduction, inheritance, variation and selection, organisms and environment, human influences, biotechnology, excretion, drugs) | **Out of scope** (new lessons). |
| OCR B6: gaps still open after the two new screens | Kept to a few screens per lesson. Still missing: B6.3j (white blood cell and platelet adaptations), B6.3k (non-specific defences), B6.3m–n (monoclonal antibodies, Higher), B6.3o (antivirals and antiseptics), B6.3f (a human fungal infection; STIs), B6.3v–x (stem cells, gene technology and the genome in medicine), B6.1b–d and B6.2b–g (only partly covered). **Needs Billy:** this lesson needs splitting or a rewrite. |
| OCR B3: gaps still open after the three new screens | Not added; budget again. B3.1e (eye defects: colour blindness, short- and long-sightedness), B3.1g–h (difficulties of investigating the brain; Higher), B3.2h (gibberellins and ethene are not named). |
| OCR B4: interdependence and competition were already covered by a sentence each | Fixed by the new screen 3 (see tier 3). |
| `meiosis-46` (script note): add "46 chromosomes (23 pairs)" to AQA Inheritance to restore the 46/92 puzzle | Optional; the script is already shared-safe. **Billy's call.** |
| `drug-trials` (script note): AQA preclinical figure | The script is already safe. No lesson change needed. |
| `two-messengers`, `superbugs`, `recessive-reappears` keyword misses (Eduqas) | Checked by reading: each claim is taught in the same lesson (the electrical impulse in M1, "survive and breed", the single-gene note on screen 4). No change. |

**Knock-on effects for the hook plan (`biology_hooks.md`):**
- Update the lesson-map ranges for the 4 lessons that gained screens (above).
- Cambridge Gas exchange now teaches ventilation, so it could take `alveoli` as a separate mission on screens 1–4, with `resp-oxygen-debt` on 5–15.
- OCR Community level systems now teaches competition and abiotic/biotic factors, so `competition` could also serve OCR M1.
