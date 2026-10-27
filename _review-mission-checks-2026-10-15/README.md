# Mission checks at the point each mission is answered (2026-10-15)

224 lessons: GCSE Science 188, KS3 Maths/English/Geography/History 18, KS3 Science 18.
ks3-hooks.js and ks3-hooks.css are unchanged (identical to live).

## To look at them
Open any lesson in `classcraft/adventures/` in this folder. These copies are marked noindex and load the live posters and scripts from the main site folder.

## What changed
- **GCSE Science and KS3 Maths/English/Geography/History** gain a guess on each mission's hook screen and a "Mission k check" placed straight after the screen that answers that mission's question. The mission cards on the first screen now tick as each check is answered, and the final screen says how many missions are complete.
- **KS3 Science** already had all of this. 9 checks move earlier, to the answer point: cycles-2, structfn-4, reactions-3, pure-2, ptable-2, matter-2, forces-3, waves-1 and waves-2. atoms-2 and circuits-2 use a lesson quiz as their check and are left where they are.
- No lesson screen is removed or reworded. All checks and guess chips were independently fact-checked.

FLAGS.md lists every mission where something is worth a look.

## To apply and push (run in the AI Study Method folder)
    cp _review-mission-checks-2026-10-15/ready-to-apply/classcraft/adventures/*.html classcraft/adventures/
    git add -u classcraft/adventures
    git commit -m "Mission checks: each mission ends with a check where its question is answered"
    git push
