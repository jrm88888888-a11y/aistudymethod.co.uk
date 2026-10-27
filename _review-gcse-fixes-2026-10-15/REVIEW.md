# Independent review of the GCSE science fixes (15 Oct 2026)

**Scope:** all 40 changed files (13 biology, 10 chemistry, 17 physics). Each was diffed against `orig/` on visible text and on markup. Each was also loaded headlessly at 375 px.

**Global result:**
- In every file, the `<head>`, the REL block, the scripts, the quiz keys and the ids are unchanged. There are two exceptions, and both are intended:
  - CCEA Waves adds `q5` to the `setupMCQ` list.
  - OCR Genes changes the wording of a `data-why` line. The answer key is unchanged.
- Every file parses with no unclosed tags, and every new SVG is well-formed.
- No file has JS errors or horizontal overflow.
- Star totals are unchanged everywhere except CCEA Waves (25 → 26, intended).
- New screens copy existing patterns (`section.screen`, `tag lo`, `p.note`, `div.work`, MCQ markup).
- The ready-to-apply copies on the Mac match the cloud outputs byte for byte.

**Spec checks:** I read these against the official documents:
- Cambridge 0625 (2023–25 and 2026–28) and 0610 (2026–28)
- OCR J247 and J249, including bold/HT status from the PDF fonts
- Edexcel 1CH0 and 4PH1, and the Edexcel core-practical guide
- Eduqas Biology, Chemistry and Physics
- CCEA Physics, Biology and Chemistry (the copies in Billy's Downloads)

AQA statements were checked from knowledge of the 8462/8463 content.

**Fixed:** 1 file. **Needs Billy:** 6 points, listed at the end. Everything else is OK.

---

## Biology

| File | Verdict | Reason |
|---|---|---|
| cambridge-igcse-coordination-response | OK | Adds a reflex example (hot object). Correct. |
| cambridge-igcse-gas-exchange-respiration | OK, with one Billy point | Two new screens match 0610 11.1.2–11.1.11 item by item. Figures are correct: O₂ 21→16%, CO₂ 0.04→4%. Point 1 below is about the expiration wording. |
| ccea-cell-division-genetics | OK | Rabbit fur (B black > b brown) is a true single-gene example. Ratios and quiz answer (1) are unchanged. The haemophilia sex-linkage line is correct and is required by CCEA 2.4.11 ("explain the inheritance of haemophilia", verified). |
| ccea-osmosis-plant-transport | OK | The potato gain/loss line is correct. |
| edexcel-igcse-structures-functions | OK | Alveoli surface area, intercostals "between the ribs" and the reflex example are all correct. |
| edexcel-plant-structures-functions | OK | Core practical 6.5 matches Pearson's guide: algal balls in hydrogencarbonate indicator. "Purple = CO₂ used up" is correct. |
| eduqas-cell-biology | OK | Ribosomes added to the shared list; this fixes an internal contradiction. Ribosomes are not in Eduqas 1.1(c), which is correctly noted. |
| eduqas-inheritance-variation-evolution | OK | Adds "in the nucleus". |
| ocr-community-level-systems | OK | B4.1b, d, f and g verified. Abiotic and biotic factors, interactions and the decay factors are all correct. |
| ocr-genes-inheritance-selection | OK | The eye-colour quick check is now the rabbit example. Key is bb (unchanged). |
| ocr-global-challenges | OK | B6.3c, f–i and r–u verified, and B6.3i is HT (bold). "Field: observation and microscopy" is the spec's own wording. |
| ocr-organism-level-systems | OK, with one Billy point | B3.2c–f and B3.3a–j verified: HT labels match the bold statements, and "loop of Henlé" is OCR's spelling. Point 2 below is about the HT flag style. |
| ocr-scaling-up | OK | Single-celled organisms and the transport-system line are correct (B2.2a). |

## Chemistry

| File | Verdict | Reason |
|---|---|---|
| aqa-atomic-structure-periodic-table | OK | The Group 7 electron explanation meets 4.1.2.6. Ionic/covalent products are correct. |
| aqa-bonding-structure-properties | OK | The ionic conduction line and "no overall electric charge" both use AQA's wording. |
| aqa-chemical-changes | OK | The new RP2 titration screen is correct: strong acids only, pipette 25.0 cm³, concordant titres, HT pointer. RP2 is the AQA titration practical. |
| ccea-formulae-equations | OK | CaCl₂ charge balance and burning Mg gaining mass are both correct. |
| edexcel-groups-in-the-periodic-table | OK | Cl₂ + 2KI → 2KCl + I₂ is balanced and correct. |
| edexcel-key-concepts-in-chemistry | OK | 1.41, 1.47, 1.48 and 1.49 wording verified in the 1CH0 PDF. Arithmetic is correct: 48 g → 80 g MgO, 12 g → 20 g; 10 g in 0.25 dm³ = 40 g dm⁻³. |
| eduqas-production-use-disposal | OK | SP11 is confirmed in the Eduqas spec. Mr 249.5 and 36% are both correct. The new quiz headings give nothing away. |
| eduqas-rate-dynamic-equilibrium | OK | CuSO₄ blue/white with endo/exo directions is correct. |
| eduqas-periodic-table-properties | OK | The Cl₂/KI example is correct. |
| ocr-monitoring-controlling-reactions | OK | The CuSO₄ reversible example is correct. |

## Physics

| File | Verdict | Reason |
|---|---|---|
| aqa-atomic-structure | OK | The random-decay line is correct. |
| aqa-energy | OK | The conservation and dissipation note uses AQA's wording. |
| cambridge-igcse-electricity-magnetism | OK | Current is the same around a single loop. Correct. |
| cambridge-igcse-nuclear-physics | OK | The random-decay line is correct. |
| cambridge-igcse-thermal-physics | OK, with one Billy point | Verified that latent heat is absent from 0625 2.2.3 in both syllabuses, so the extension label is right. One change is not in the log: screen 12 now says the energy "still raises its internal energy". That is correct. The quiz and hook decision is point 4 below. |
| ccea-atomic-nuclear-physics | OK | The background-subtraction line is correct. |
| ccea-electricity | OK | Current is the same around a single loop. Correct. |
| ccea-waves | **Fixed** | Content checked against CCEA 2.1.5, 2.1.6, 2.1.10 and 2.1.11: the hazards use the spec's own wording, and the wavefront geometry is to scale (40° → 22°, λ 24 → 14). The q5 key is correct. I made three label fixes in the wavefront SVG: the "i" label sat under the incident ray, the "shallow" label sat on the refracted arrow, and "slower, so shorter wavelength" was clipped at the right edge (now "shorter wavelength"). Re-tested and re-delivered. |
| edexcel-electromagnetic-induction | OK | Adds "(a voltage)". |
| edexcel-energy-forces-doing-work | OK | Power is the rate of doing work, in W. Correct. |
| edexcel-igcse-astrophysics | OK | Adds "in its core". |
| edexcel-igcse-electricity | OK, with one Billy point | "Extra branch → total resistance goes down" is correct physics but goes beyond 4PH1 2.19. Point 5 below. |
| edexcel-igcse-forces-motion | OK | The balanced and unbalanced resultant statements are correct. |
| edexcel-motion-forces | OK | The h1 now matches the page title. Reversible if the question h1 was deliberate. |
| eduqas-energy | OK | The conservation note is correct. |
| ocr-electricity-magnetism | OK | P4.2j is verified: bold (HT) and wording. Microphone = induction and loudspeaker = motor effect are both correct. |
| ocr-waves-radioactivity | OK | Verified in the J249 PDF fonts that P5.1f is not bold, so dropping "HT" is correct. P5.1h–i are bold. |

---

## Needs Billy

1. **Cambridge Gas exchange, screen 3.** The screen says "internal intercostals contract in forced breathing out". This is physiologically right. However, Cambridge mark schemes usually credit "internal intercostals contract, ribs down and in" for any expiration. Consider: "Breathing out: external intercostals relax, internal intercostals contract → ribs move down and in; diaphragm relaxes and domes up."
2. **HT flagging on new screens.** OCR B3 and B6 put Higher-tier content in a "Higher tier —" note, and Cambridge does the same for Supplement content. They do not use the `tag ht` flag that the lesson intros tell pupils to watch for. The content is correct; it is your call whether to restyle.
3. **Length.** The new tier-3 screens are wordier than the house style ("few words"), especially OCR B3 water balance, OCR B6 non-communicable disease and the CCEA EM spectrum list. They are accurate; trim if wanted.
4. **Cambridge Thermal.** The latent-heat quiz (screen 13) still earns a star for off-syllabus content, and the `gcse-phy-stuck-at-100` hook says "calculate specific latent heat". Keep as an extension, or cut both. (Same as the physics log.)
5. **Edexcel IGCSE parallel line.** Keep it, or drop Edexcel IGCSE from `series-or-parallel`. (Same as the physics log.)
6. **Hook lesson-maps.** Seven lessons gained screens and their mission ranges have shifted:
   - biology: OCR B3, OCR B4, OCR B6, Cambridge Gas exchange
   - chemistry: AQA Chemical changes, Edexcel Key concepts, Eduqas Production
   - physics: CCEA Waves

   Update the hook plans before wiring.

The "Not changed" lists in the three CHANGES files are sound. I spot-verified these claims, and all are correct:
- Eduqas "preclinical includes healthy volunteers" is the spec's own wording.
- FSH/LH are absent from CCEA Biology.
- Static and the EM spectrum: static is absent from the CCEA Physics spec (correct); the EM spectrum is present, and the agent added it.
- Latent heat is absent from 4PH1 (only change of state is listed).
- There is no star life cycle in Eduqas Physics.
- CCEA Chemistry 1.4 covers nanoparticles only.
