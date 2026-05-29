#!/usr/bin/env python3
"""
ClassCraft Game Generator
========================
Reads JSON game definitions and stamps out complete HTML files by
injecting data into the appropriate engine template.

Usage:
    python3 generate.py games_list.json          # generate all
    python3 generate.py games_list.json --dry     # preview filenames only
    python3 generate.py games_list.json --filter biology  # only matching

Game definition format (games_list.json):
[
  {
    "engine": "memory",        // memory | timeline | quiz | categorise
    "file":   "bio-genetics-memory.html",
    "title":  "Genetics",      // shown in header and start screen
    "data": { ... }            // engine-specific (see below)
  },
  ...
]

Data formats by engine
-----------------------
MEMORY:
  "data": {
    "pairs": [
      {"term": "Allele", "def": "Alternative form of a gene"},
      ...  // 18 pairs recommended; game picks subset based on difficulty
    ]
  }

TIMELINE:
  "data": {
    "events": [
      {"year": "1066", "text": "Battle of Hastings"},
      ...  // Must be in correct chronological order; game shuffles them
    ]
  }

QUIZ:
  "data": {
    "questions": [
      {"type": "mc", "q": "What is...?",
       "options": ["A","B","C","D"], "answer": "A"},
      {"type": "tf", "q": "True or false?", "answer": "True"},
      ...
    ]
  }

CATEGORISE:
  "data": {
    "categories": ["Category A", "Category B", "Category C"],
    "items": [
      {"text": "Item 1", "cat": 0},   // cat = index into categories array
      {"text": "Item 2", "cat": 1},
      ...
    ]
  }
"""

import json, sys, os, re

GAMES_DIR  = os.path.dirname(os.path.abspath(__file__))
TEMPLATES  = {
    'memory':     os.path.join(GAMES_DIR, 'biology-memory.html'),
    'timeline':   os.path.join(GAMES_DIR, 'history-timeline.html'),
    'quiz':       os.path.join(GAMES_DIR, 'geography-quiz.html'),
    'categorise': os.path.join(GAMES_DIR, 'chemistry-categorise.html'),
}

# ── Helpers ──────────────────────────────────────────────────────────

def read_template(engine):
    with open(TEMPLATES[engine]) as f:
        return f.read()

def js_string(s):
    """Escape a Python string for safe embedding in a JS string literal."""
    return s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')

def indent(s, spaces=2):
    pad = ' ' * spaces
    return '\n'.join(pad + l for l in s.splitlines())

# ── Data serialisers ─────────────────────────────────────────────────

def serialise_pairs(pairs):
    lines = ['const ALL_PAIRS = [']
    for p in pairs:
        lines.append(f'  {{ term:"{js_string(p["term"])}", def:"{js_string(p["def"])}" }},')
    lines.append('];')
    return '\n'.join(lines)

def serialise_events(events):
    lines = ['const ALL_EVENTS = [']
    for e in events:
        lines.append(f'  {{ year:"{js_string(str(e["year"]))}", text:"{js_string(e["text"])}" }},')
    lines.append('];')
    return '\n'.join(lines)

def serialise_questions(questions):
    lines = ['const ALL_QUESTIONS = [']
    for q in questions:
        if q['type'] == 'mc':
            opts = ', '.join(f'"{js_string(o)}"' for o in q['options'])
            lines.append(
                f'  {{ type:\'mc\', q:"{js_string(q["q"])}",\n'
                f'    options:[{opts}], answer:"{js_string(q["answer"])}" }},'
            )
        else:
            lines.append(
                f'  {{ type:\'tf\', q:"{js_string(q["q"])}", answer:"{js_string(q["answer"])}" }},'
            )
    lines.append('];')
    return '\n'.join(lines)

def serialise_categorise(categories, items):
    cat_lines = ['const CATEGORIES = [']
    for c in categories:
        cat_lines.append(f'  "{js_string(c)}",')
    cat_lines.append('];')

    item_lines = ['const ALL_ITEMS = [']
    for item in items:
        item_lines.append(f'  {{ text:"{js_string(item["text"])}", cat:{item["cat"]} }},')
    item_lines.append('];')

    return '\n'.join(cat_lines) + '\n\n' + '\n'.join(item_lines)

# ── Injection patterns ────────────────────────────────────────────────

# Each pattern matches from the DATA comment to the closing semicolon
PATTERNS = {
    'memory':     (r'const ALL_PAIRS = \[.*?\];',    re.DOTALL),
    'timeline':   (r'const ALL_EVENTS = \[.*?\];',   re.DOTALL),
    'quiz':       (r'const ALL_QUESTIONS = \[.*?\];', re.DOTALL),
    'categorise': (r'const CATEGORIES = \[.*?\];\n\n// Items.*?const ALL_ITEMS = \[.*?\];', re.DOTALL),
}

def inject(html, engine, data, title):
    """Replace data arrays and titles in the template HTML."""

    # 1. Replace data block
    pattern, flags = PATTERNS[engine]
    if engine == 'memory':
        new_data = serialise_pairs(data['pairs'])
    elif engine == 'timeline':
        new_data = serialise_events(data['events'])
    elif engine == 'quiz':
        new_data = serialise_questions(data['questions'])
    elif engine == 'categorise':
        new_data = serialise_categorise(data['categories'], data['items'])

    html = re.sub(pattern, new_data, html, count=1, flags=flags)

    # 2. Replace <title> tag
    engine_labels = {
        'memory':     'Memory Match',
        'timeline':   'Timeline',
        'quiz':       'Quiz',
        'categorise': 'Sort It',
    }
    label = engine_labels[engine]
    html = re.sub(
        r'<title>[^<]+</title>',
        f'<title>{title} — {label} — ClassCraft</title>',
        html, count=1
    )

    # 3. Replace hd-title span text (the element with id="hd-title", not the CSS rule)
    html = re.sub(
        r'(<span class="hd-title" id="hd-title">)[^<]*(</span>)',
        lambda m: m.group(1) + f'{title} — {label}' + m.group(2),
        html, count=1
    )

    # 4. Replace start-screen h1 / title
    html = re.sub(
        r'(<h1 class="start-title">)[^<]*(</h1>)',
        lambda m: m.group(1) + title + m.group(2),
        html, count=1
    )

    return html

# ── Main ─────────────────────────────────────────────────────────────

def generate(definition, dry_run=False):
    engine  = definition['engine']
    fname   = definition['file']
    title   = definition['title']
    data    = definition['data']
    outpath = os.path.join(GAMES_DIR, fname)

    if dry_run:
        print(f'  [DRY] {fname}  ({engine}  "{title}")')
        return True

    if engine not in TEMPLATES:
        print(f'  [SKIP] Unknown engine "{engine}" for {fname}')
        return False

    # Validate data
    required = {'memory': 'pairs', 'timeline': 'events',
                'quiz': 'questions', 'categorise': 'categories'}
    if required[engine] not in data:
        print(f'  [ERROR] {fname}: missing "{required[engine]}" in data')
        return False

    html = read_template(engine)
    html = inject(html, engine, data, title)

    with open(outpath, 'w') as f:
        f.write(html)
    print(f'  [OK] {fname}')
    return True

def main():
    args = sys.argv[1:]
    if not args:
        print('Usage: python3 generate.py games_list.json [--dry] [--filter TERM]')
        sys.exit(1)

    json_file = args[0]
    dry_run   = '--dry' in args
    filt      = None
    if '--filter' in args:
        filt = args[args.index('--filter') + 1].lower()

    with open(json_file) as f:
        games = json.load(f)

    if filt:
        games = [g for g in games if filt in g['file'].lower()
                 or filt in g['title'].lower()
                 or filt in g['engine'].lower()]

    print(f'Generating {len(games)} game(s)...')
    ok = sum(1 for g in games if generate(g, dry_run))
    print(f'Done: {ok}/{len(games)} {"(dry run)" if dry_run else "files written"}')

if __name__ == '__main__':
    main()
