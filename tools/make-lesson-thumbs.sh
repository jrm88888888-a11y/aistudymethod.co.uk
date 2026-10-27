#!/bin/sh
# 640x360 copies of every hook poster referenced by the lesson-next data, for the
# course pages, the lesson finder and the completion card. Idempotent: only makes
# the ones that are missing. Needs ImageMagick. Run from the repo root after
# tools/build-lesson-next.py, then run build-lesson-next.py again so the data
# records the thumbs.
set -e
mkdir -p images/lesson-thumbs
python3 - <<'PY' | while IFS= read -r p; do
  out="images/lesson-thumbs/$(basename "$p")"
  [ -f "$out" ] || convert "classcraft/adventures/$p" -resize 640x360 -strip -quality 76 "$out"
done
import json, glob
seen = set()
for j in glob.glob('classcraft/quizzes/lesson-next/*.json'):
    if j.endswith('index.json'): continue
    for v in json.load(open(j)).get('h', {}).values():
        if v[0] and v[0] not in seen:
            seen.add(v[0]); print(v[0])
PY
ls images/lesson-thumbs | wc -l
