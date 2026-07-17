#!/bin/bash
# Delete the 6,917 legacy multi-stage "adventure" lesson pages.
# These are the superseded predecessor of the current Learn "mini-lesson" format.
#
# Verified safe (15 July 2026): nothing on the site links to, navigates to,
# fetches, or lists these files —
#   * no href / src / fetch / redirect anywhere points to adventures/*-adventure-*.html
#   * not in learn-manifest.json (mini-lessons only) and not in sitemap.xml
#   * no mini-lesson references them
#   * the arcade / explore / evaluate features share the "-adventure-N" slug
#     NAMING but load their own JSON data banks (explore/edge-case-banks/,
#     evaluate/two-truths-banks/) — their JS never references adventures/ at all,
#     so those features are unaffected.
#
# This deletes ONLY files matching *-adventure-<N>.html. It NEVER touches
# *-mini-lesson.html (all 1,523 current Learn lessons are preserved).
# Recoverable via git if ever needed.
#
# Run from the repo root:  bash DELETE-legacy-adventures.sh
set -e
cd "$(dirname "$0")/classcraft/adventures"

before_adv=$(ls | grep -cE '\-adventure-[0-9]+\.html$' || true)
before_mini=$(ls | grep -c '\-mini-lesson\.html$' || true)
echo "Before:  $before_adv adventure files, $before_mini mini-lessons (to be preserved)."

if [ "$before_adv" -eq 0 ]; then
  echo "Nothing to delete. Exiting."
  exit 0
fi

echo "Deleting $before_adv legacy adventure pages..."
# -delete only the precise pattern; mini-lessons cannot match it.
find . -maxdepth 1 -type f -regextype posix-extended -regex '.*-adventure-[0-9]+\.html' -delete

after_adv=$(ls | grep -cE '\-adventure-[0-9]+\.html$' || true)
after_mini=$(ls | grep -c '\-mini-lesson\.html$' || true)
echo "After:   $after_adv adventure files remain, $after_mini mini-lessons preserved."

if [ "$after_adv" -eq 0 ] && [ "$after_mini" -eq "$before_mini" ]; then
  echo "Done — all legacy adventure pages removed, every mini-lesson intact."
else
  echo "WARNING: unexpected counts — review before committing."
fi
