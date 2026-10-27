# GCSE Physics lesson fixes: changes for review (15 Oct 2026)

Ready-to-apply copies are in `ready-to-apply/classcraft/adventures/`. 17 lessons changed. Nothing is committed or pushed.

Source plan: `physics_hooks.md` (section 4) and the hook notes in `scripts.json`. Screen numbers are 0-based, as in the plan. They refer to the **edited** file; only CCEA Waves has new screens, so only its numbering changes.

**Checks run on every changed file:**
- `html.parser` shows no new unclosed or stray tags.
- Every `<svg>` is well-formed XML.
- A diff against the original shows only the changes listed below.
- In headless Chromium at 375 px and 1280 px, each changed screen loads with no JS errors and no horizontal overflow, and was screenshotted and checked by eye.
- The new CCEA quiz works: a wrong answer is rejected, the right answer gives "Correct! +1 star", the Next button unlocks, and the star total rises from 25 to 26.

**Specifications used** (checked directly; Higher-tier status was read from bold fonts in the PDFs):
- CCEA GCSE Physics (2017), from ccea.org.uk: `GCSE Physics (2017)-specification-Standard_0.pdf`
- WJEC Eduqas GCSE Physics (from 2016), from wjec.co.uk: `eduqas-gcse-physics-spec-from-2016-e.pdf`
- OCR Gateway Physics A J249, v5.0, from ocr.org.uk: `234600-specification-accredited-gcse-gateway-science-suite-physics-a-j249.pdf`
- Cambridge IGCSE Physics 0625, syllabuses for 2023–2025 (`595430`) and 2026–2028 (`697209`), from cambridgeinternational.org
- Pearson Edexcel International GCSE Physics 4PH1, Issue 2. Pearson's own link returned an HTML page, so a school-hosted copy of the Pearson PDF was used.

---

## Tier 1: errors and inconsistencies

### Cambridge IGCSE · Thermal Physics
Specific latent heat (E = mL) is **not in the 0625 syllabus** (checked for both 2023–25 and 2026–28). Section 2.2.3 covers melting, boiling and evaporation only. The lesson taught latent heat under the tag "2.2.3", as if it were in the syllabus. The content is kept but now labelled as an extension.
| Screen | Before → after |
|---|---|
| 0 | "…specific heat capacity and latent heat…" → "…and latent heat (an extension)…" |
| 12 | Tag "2.2.3 Melting, boiling & latent heat" → "2.2.3 Melting & boiling" |
| 12 | Latent-heat paragraph now opens "**Extension (not in the 0625 syllabus):**" |
| 13 | Quiz tag "Calculate" → "Calculate · extension" |
| 21 | Recap "Latent heat:" → "Latent heat (extension, not in the syllabus):" |

### OCR · Waves & Radioactivity
| Screen | Before → after |
|---|---|
| 7 | "**HT extension (P5.1f):** when sound passes…" → "**Sound changing medium (P5.1f):** when sound passes…". P5.1f is not in bold in J249, so it is tested on **both tiers** (it is separate-physics content). The neighbouring "HT — hearing (P5.1h–i)" label is correct: P5.1h–i are bold, and are kept. |

### Edexcel · Motion and Forces
| Screen | Before → after |
|---|---|
| 0 | h1 "Why does a fast car take so long to stop?" → h1 "Motion and Forces". The question now opens the intro paragraph, so every lesson's h1 is its plain title (plan 4d). |

## Tier 2: hook-safety additions
These are one-line additions inside the mission that plays the hook. They teach the claims that plan 4c and the `scripts.json` claim notes found outside the mission.

| Lesson | Screen (mission) | Hook | Addition |
|---|---|---|---|
| AQA Atomic Structure | 12 ([12–19]) | fading-tracer | "Decay is random: you can't predict when any one nucleus will decay. But a large sample halves in the same time, over and over, so the half-life lets you predict how the whole source behaves." |
| Cambridge IGCSE Nuclear Physics | 17 ([17–23]) | fading-tracer | "Decay is random: you cannot predict when one nucleus will decay, but a large sample halves in the same time, over and over." |
| CCEA Atomic & Nuclear Physics | 14 ([14–18]) | fading-tracer | "Measured count rates include background radiation, which is around us all the time, so subtract the background count before finding the half-life." |
| Cambridge IGCSE Electricity & Magnetism | 7 ([6–12]) | what-bulb-takes | "In a single loop the current is the same at every point: charge is not used up as it goes round." |
| CCEA Electricity | 3 ([1–10]) | what-bulb-takes | Same line ("…as it flows round"). |
| Edexcel IGCSE Electricity | 3 ([1–6]) | what-bulb-takes | Same line. |
| Edexcel IGCSE Electricity | 7 ([7–9]) | series-or-parallel | Added to the Parallel bullet: "Adding another branch gives the current an extra path, so more current flows from the same supply: the total resistance goes down." **Note:** the claim check in `scripts.json` reported this as taught outside the mission. It was a false match: the lesson never taught it anywhere, and the hook's whole puzzle depends on it. 4PH1 does not state it explicitly (2.17–2.19), so see "Needs Billy" below. |
| OCR Electricity & Magnetism | 6 ([4–8]) | what-bulb-takes | "Potential difference (p.d., in volts)" → "(p.d., or voltage, in volts)". The word "voltage" was only outside the mission. |
| Edexcel Energy: forces doing work | 5 ([1–7]) | stair-race | "Doing the same work in less time means a greater power: the rate of doing work, measured in watts (W). You'll calculate it later in this lesson." (Power itself is taught on screens 14–16.) |
| Edexcel IGCSE Forces & Motion | 9 ([9–17]) | two-trolleys | "If the forces are balanced (resultant = 0), the object stays still or keeps moving at a constant velocity. An unbalanced resultant changes its speed or direction." |
| Edexcel Electromagnetic Induction | 1 ([1–6]) | no-battery-generator | "a potential difference is induced" → "a potential difference (a voltage) is induced". The hook says "voltage". |
| Edexcel IGCSE Astrophysics | 9 ([9–13]) | sun-holds-up | "…until nuclear fusion of hydrogen begins." → "…begins in its core." The hook says "in a star's core". |
| AQA Energy | 1 ([1–4]) | first-hill | New note: "Energy is conserved: it is never created or destroyed. When an object falls, energy shifts from its gravitational store to its kinetic store. In any real change some energy is also dissipated, usually heating the surroundings." Before this, the mission only said energy is never "used up". Gravitational ↔ kinetic and dissipation came later in the lesson. |
| Eduqas Energy | 1 ([1–4]) | first-hill | Same note. |

## Tier 3: coverage gaps (checked against the specification)

### CCEA · Waves: three new screens (19–21), plus welcome and recap updates
The EM spectrum is on the CCEA spec, but none of the 10 CCEA lessons taught it. Wavefront reflection and refraction was also missing. Neither topic is in bold in the CCEA PDF, so both are for both tiers; no tier tag was added.
| Screen | Change | Spec |
|---|---|---|
| 19 (new) | **Waves at barriers and boundaries.** Ripple-tank wavefronts. Reflection at a plane barrier: i = r, wavelength unchanged. Refraction into shallower water: slower, shorter wavelength, same frequency, bends towards the normal. A note gives the link to light. New inline SVG of the two wavefront diagrams, drawn to scale: i = 40°; λ 24 → 14 gives r = 22°. | 2.1.5, 2.1.6 |
| 20 (new) | **The electromagnetic spectrum.** Seven regions in order of decreasing wavelength, all transverse, same speed in a vacuum. New inline SVG: a wave whose wavelength shortens along the spectrum bar, with arrows for wavelength and frequency. Each region gets one use and its CCEA hazard. The radio-wave hazard is given as CCEA words it: "believed to cause…", and power-cable claims "not reliably proven". Ends with "the higher the frequency, the more damage". Radar was already taught on screen 16. | 2.1.10, 2.1.11 (2.1.9 already present) |
| 21 (new) | Quick check MCQ `q5` (microwaves vs X-rays: same speed, X-rays have the shorter wavelength). It copies the existing MCQ pattern, and `'q5'` was added to the `setupMCQ` list. Star total goes from 25 to 26. | 2.1.10 |
| 0 | The intro now also lists "reflection and refraction of water waves and the electromagnetic spectrum". | — |
| 26 (recap) | Two new recap lines (wavefronts; EM spectrum). The closing sentence now names both. | — |

**Lesson-map effect for hooks:** in CCEA Waves, seismic is now screens 22–23, the sort and match games 24–25, recap 26 and final 27. The liquid-core mission moves from [19–22] to [22–25]. CCEA can now use `gcse-phy-em-family` on [20–21]: the new screens teach every claim in that hook (transverse, same speed in a vacuum, seven regions in order, uses, risks). That would make em-family a seven-board hook. Screen 19 could fold into the echo-cliff mission ([14–19]).

### OCR · Electricity & Magnetism
| Screen | Change | Spec |
|---|---|---|
| 24 | Added: "A microphone works the same way: sound waves vibrate a diaphragm attached to a coil in a magnet's field, inducing a p.d. that varies just like the sound. A loudspeaker or headphone does the reverse: a varying current in its coil feels a varying force (the motor effect), so the cone vibrates and makes sound (P4.2j)." The screen is already tagged Higher Tier only. P4.2j is bold (HT) and separate-physics content. | P4.2j |

---

## Not changed

| Plan item | Decision | Why |
|---|---|---|
| 4a OCR Global Challenges is a medley; its life cycle, red-shift and seismic screens are not previewed by any hook | No change | Hook-mapping issue, not a lesson error. Out of scope. |
| 4a/4d OCR Waves & Radioactivity has "no sound/ultrasound" | No change | **Plan was wrong:** screens 7–8 teach ultrasound, sonar, the hearing range, the ear and P5.1f/j. (The P5.1f tier label was fixed; see Tier 1.) |
| 4a OCR Waves & Radioactivity: lenses qualitative, colour on one screen | No change | Not checked in detail against P5.3. |
| 4a OCR Electricity & Magnetism is thin on P4; no d.c.-motor screen | Only the microphone line added | P4.2d says "knowledge of the structure of a motor is not expected", and screen 22 already covers rotation and the commutator. P4.2e–i are covered on screen 24. |
| 4a/4d Eduqas Space has no star life cycle | No change | **Not on the Eduqas spec.** Topic 10 only covers the Sun forming from dust and gas, fusion, and the gravity–fusion balance (10.1(d)), which screen 1 teaches. |
| 4a CCEA Magnetism has no poles or induced-magnet screen | No change | Not on the CCEA spec: 2.4.1 covers only the bar-magnet field; induced magnetism is absent. |
| 4a/4d CCEA has no static electricity | No change | Not on the CCEA spec: static is absent from the whole document. |
| 4a CCEA Density & Pressure covers solids only | No change | CCEA 1.2.16 has pressure = force/area only; liquid pressure and upthrust are absent. |
| 4a/4d Edexcel IGCSE has no latent heat | No change | **Not on 4PH1.** Change of state (5.8P–5.11P) *is* taught, on screens 8 and 10, so the plan's "no changes of state" is inaccurate. |
| 4a AQA Atomic Structure never subtracts background and never names gold foil | No change | Not checked against the AQA spec, so left alone. |
| 4a Cambridge IGCSE Nuclear has no irradiation vs contamination | No change | Not in the 0625 syllabus. |
| 4a Cambridge IGCSE Motion, Forces & Energy spreads Topic 1 thinly | No change | Not checked item by item against the syllabus. |
| 4a short sub-topics folded into other missions | No change | Hook-mapping decision, not a lesson error. |
| 4b Practical-skills and key-concept units | No change | No lesson issue raised. |
| 4c CCEA Magnetism [7–10] "bigger current or stronger field gives a bigger force" | No change | The final jumping-wire script dropped this claim (see its notes), so nothing in the hook needs it. |
| 4c Edexcel IGCSE Electricity [14–16] "mains a.c. 230 V" | No change | a.c. is already taught in the mission (screen 14). The live-case hook never says "230 V". |
| 4d CCEA Waves seismic screens labelled "beyond the CCEA specification" | No change | **Label is correct:** no seismic content in the CCEA spec. Whether to keep four off-spec screens and the liquid-core hook for CCEA is Billy's call. |
| 4d CCEA Electricity shows P = I²R "not on the CCEA list" | No change | **Label is correct:** only P = IV is listed (2.3.22, 2.3.30). |
| hot-bulb premise "energy is never destroyed" taught outside the mission in six lessons | No change | Taught *before* the mission in all seven lessons, so the pupil has already met it. |
| Cambridge IGCSE Electricity & Magnetism [28–31] "230 V"; AQA Waves echo distance | No change | Already taught before the mission, or inside it. |

## Needs Billy
1. **Cambridge IGCSE Thermal Physics:** latent heat is now labelled extension, but it still has a starred quiz (screen 13) and a recap line. Options: keep as an extension, or remove the screen 12 latent-heat paragraph, the screen 13 quiz and the recap line. Also, the **`gcse-phy-stuck-at-100` hook voiceover says "calculate specific latent heat"**, which is off-syllabus for Cambridge IGCSE. Either cut that phrase or drop CIE from the hook.
2. **Edexcel IGCSE and `gcse-phy-series-or-parallel`:** I added the "total resistance goes down" line so the hook's puzzle is answered in the lesson. 4PH1 does not explicitly require it, so the alternative is to drop Edexcel IGCSE from this hook.
3. **AQA Space Physics:** the moon-never-falls mission [10–14] previews a "tour of the Solar System", but that is taught in [1–9], the sun-holds-up mission. Fix this by remapping the hooks; the lesson itself is fine.
4. **CCEA Waves map shift**, and the option to add CCEA to `gcse-phy-em-family`: see Tier 3.
5. **Edexcel Motion & Forces h1 change:** reversible if the question heading was deliberate.

## Out of scope / not done
- No new lessons were created.
- No full spec-versus-lesson audit of all 64 lessons. Tier 3 covered the plan's items, plus two gaps found while checking them: OCR P4.2j and CCEA 2.1.5–2.1.6.
- Tier labels were checked only where a change touched them: OCR P5 and P4, CCEA 2.1.
