# GCSE Spanish: hook videos, guesses and mission checks (2026-10-16)

This covers 69 grammar lessons across 7 boards: 10 lessons each, minus CCEA lesson 10, which is pure exam technique and gets no hook. That is 201 missions using 32 shared hook videos.

**This folder replaces `_review-gcse-spanish-lessons-2026-10-16`.** It already contains those lesson fixes and reorders, plus one more: the «una gran ciudad» line in lesson 1 is softened.

## What each lesson gets
- **Intro screen:** hook video 1, a guess ("Make a guess: …"), and the mission map.
- **Missions 2 onwards:** a "Mission k of N" screen with its video and guess.
- **After each mission's answer point:** a graded "Mission k check" that shows the pupil's guess.
- **Final screen:** "Missions complete: n of N".

## Checks run
- Every check was written against the mission's screens in every board copy that uses it, then independently verified (about a dozen wording fixes; no marked answer was wrong).
- Structure: original screens are kept in order, each check is placed at its answer point, tags balance, and the JS parses.
- Browser test of all 69 lessons at phone width: for each check, the guess shows, Next is gated, a correct answer ticks the mission, and there is no overflow or JS error.

## New site assets (in ready-to-apply)
- `classcraft/adventures/es-hooks/posters/` (64)
- `classcraft/adventures/es-hooks/captions/` (32)

The videos are in the Bunny collection "GCSE Spanish hook videos (site)".

## To view
Open any lesson in `classcraft/adventures/` in this folder. These copies are marked noindex.

## To apply and push (in the AI Study Method folder)
    cp -R _review-gcse-spanish-hooks-2026-10-16/ready-to-apply/classcraft/adventures/. classcraft/adventures/
    git add classcraft/adventures/es-hooks
    git add -u classcraft/adventures
    git commit -m "GCSE Spanish: hook videos, guesses and mission checks for 69 grammar lessons; lesson fixes"
    git push

FLAGS.md lists every mission where something is worth a look.
