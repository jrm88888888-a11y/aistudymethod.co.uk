# GCSE Spanish grammar lessons: fixes and reorders (2026-10-16)

28 lesson files across all 7 boards. **Not pushed.** The hook videos and mission checks are not wired in yet; that comes after you render and upload the videos.

## What changed
- **Lesson 8 (all 7 boards), reordered:** comparing → prepositions and the personal *a* (plus por/para for CCEA and WJEC) → adverbs and connectives → mixed review game. The exercise numbers and the intro and recap order are updated.
- **Lesson 10 (AQA, Edexcel, Eduqas, WJEC), reordered:** sounds → stress and accents → exam technique. The sound quizzes now sit with the sounds, and the accent exercises come after stress is taught.
- **The 10 approved fixes:**
  1. Lesson 1 (×7): día and mapa are no longer called "Greek -ma" words.
  2. Lesson 6 (WJEC): era/eran is now glossed "it was / they were".
  3. Lesson 7 (×7): the explanation now uses «Me gustará» and the él form of gustaría.
  4. Lesson 10 (×4): the g in gimnasio is "throaty (like loch)".
  5. Lesson 10 (AQA): España has no written accent.
  6. Lesson 10 (AQA, Edexcel, Eduqas): the stress item that came before stress is taught is now an ñ item.
  7. Lesson 9 (WJEC): the "Recognise only" badge on seguir + gerund is removed.
  8. Lesson 10 (Cambridge): «La huelga cerró el colegio…» replaces the old sentence, and the target words are now bold.
  9. Lesson 8 (×7): ése is now ese.
  10. Lesson 8 (×7): the more-good line now reads "for better, use mejor rather than más bueno".

## To apply and push (in the AI Study Method folder)
    cp _review-gcse-spanish-lessons-2026-10-16/ready-to-apply/classcraft/adventures/*.html classcraft/adventures/
    git add -u classcraft/adventures
    git commit -m "GCSE Spanish: lesson fixes; lessons 8 and 10 reordered into mission blocks"
    git push
