#!/usr/bin/env bash
# finish-debug-commit.sh
#
# Run this from the repo root (the directory containing subjects.html).
# It cleans up the stale git lock files the sandbox left behind, then
# commits the integration work onto the `debug-games-not-opening` branch.
# It does NOT push — that's left to you.

set -e
cd "$(dirname "$0")"

echo "→ Removing stale git lock files (sandbox couldn't)"
rm -f .git/HEAD.lock .git/index.lock
rm -f .git/refs/heads/debug-games-not-opening.lock 2>/dev/null || true
rm -rf .git/worktrees 2>/dev/null || true
git worktree prune 2>/dev/null || true

echo "→ Switching to debug-games-not-opening branch"
git checkout debug-games-not-opening || git checkout -b debug-games-not-opening

echo "→ Removing the renamed-away classcraft/style.css if git still tracks it"
git rm -f --cached --ignore-unmatch classcraft/style.css 2>/dev/null || true
rm -f classcraft/style.css 2>/dev/null || true

echo "→ Excluding .DS_Store"
grep -qxF '.DS_Store' .gitignore 2>/dev/null || echo '.DS_Store' >> .gitignore

echo "→ Staging all changes"
git add -A
find . -name '.DS_Store' -not -path './.git/*' -exec git rm --cached --quiet {} + 2>/dev/null || true

echo "→ Committing"
git commit -m "Integrate classcraft/ content into aistudymethod.co.uk

- resources.js: 892 hrefs repointed to local classcraft/ paths
- subjects.html: 85-key SUBTOPICS taxonomy so the topic filter returns
  real results; card render defaults to same-tab (book PDFs keep
  target=_blank); Browse-by-format strip in hero
- 801 classcraft HTML pages rebranded into the AI Study Method shell
  (root style.css, identical nav/footer, back-to-subjects link);
  game interactives untouched
- classcraft/style.css renamed -> classcraft-pages.css to avoid colliding
  with root style.css
- new sitemap.xml (877 URLs) and robots.txt at site root;
  classcraft/sitemap.xml neutralised; nested CNAME -> aistudymethod.co.uk
- ClassCraft brand strings replaced in vocab JS data files, CSS, nav.js
- scripts/rebrand_classcraft.py is the idempotent rewriter
- integration-report.md and subtopic-remap.md document the work

Ends runtime dependency on classcraft.co.uk (every card now links to a
file already on aistudymethod.co.uk) and fixes the topic filter returning
zero results."

echo "→ Done. Branch: $(git branch --show-current). Commit:"
git log --oneline -1
echo
echo "Next (run yourself when ready):"
echo "  git push -u origin debug-games-not-opening"
echo "Or merge into main first:"
echo "  git checkout main && git merge --no-ff debug-games-not-opening && git push origin main"
