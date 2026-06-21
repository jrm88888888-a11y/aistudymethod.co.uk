#!/usr/bin/env python3
"""
reconcile-vocab-packs.py  —  keep the Terms Tester vocab packs in sync with the
authoritative spec concepts, WITHOUT flattening the richer clean topics.

WHY THIS EXISTS
---------------
Per-topic term data lives in two places:
  1. classcraft/adventures/_specs/<stem>.json  ->  "concepts"  (source of truth;
     used by Two Truths, Connections, Reveal Race, etc.)
  2. classcraft/arcade/vocab/<subject>-<level>.json  ->  topics[slug].terms
     (used ONLY by the Terms Tester vocab games)

They were originally stamped from the same template, so both inherited the same
contamination (e.g. Magnetism showing Forces vocabulary). When the concepts get
corrected, the vocab packs can drift out of sync and keep serving stale/wrong
terms. This script re-syncs them.

WHAT IT DOES (reconcile, not wholesale export)
----------------------------------------------
For each pack topic that maps to a spec (matched by subject + level + topic_slug):
  - If the pack is MISSING most of the corrected concept terms (it has drifted /
    is contaminated), rebuild that topic's `terms` from the corrected concepts.
  - Otherwise leave it alone, so legitimately richer/curated clean topics keep
    their extra vocabulary.

Topics with <4 corrected concepts are never rebuilt below the game's 4-term
minimum (the existing pack is kept and a warning is printed).

USAGE
-----
  python scripts/reconcile-vocab-packs.py --check     # dry run, report only
  python scripts/reconcile-vocab-packs.py             # apply changes
  python scripts/reconcile-vocab-packs.py --threshold 0.5   # tune drift cutoff

Run it whenever spec concepts are edited.
"""
import json, glob, os, re, argparse
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SPECS = os.path.join(ROOT, "classcraft", "adventures", "_specs")
PACKS = os.path.join(ROOT, "classcraft", "arcade", "vocab")
LEVELS = ["a-level", "ks3", "gcse", "ibdp"]          # 'a-level' first: it contains a dash
PLACEHOLDER = re.compile(r"^(A central idea in |A key term)")
MIN_TERMS = 4


def build_index():
    """(subject, level, topic_slug) -> {term: definition}, from corrected specs."""
    idx = defaultdict(dict)
    for path in glob.glob(os.path.join(SPECS, "*.json")):
        try:
            d = json.load(open(path, encoding="utf-8"))
        except Exception:
            continue
        key = (d.get("subject"), d.get("level"), d.get("topic_slug"))
        if None in key:
            continue
        for c in d.get("concepts", []):
            term = (c.get("term") or "").strip()
            defn = (c.get("def") or "").strip()
            if term and defn and not PLACEHOLDER.match(defn):
                idx[key].setdefault(term, defn)
    return idx


def parse_pack_name(filename):
    base = filename[:-5]  # strip .json
    for lvl in LEVELS:
        if base.endswith("-" + lvl):
            return base[: -(len(lvl) + 1)], lvl
    return base, None


def reconcile(threshold=0.5, apply=True):
    idx = build_index()
    rebuilt = clean = orphan = thin_skipped = files_changed = 0
    changes = []
    for path in sorted(glob.glob(os.path.join(PACKS, "*.json"))):
        subject, level = parse_pack_name(os.path.basename(path))
        if not level:
            continue
        try:
            pack = json.load(open(path, encoding="utf-8"))
        except Exception:
            continue
        changed = False
        for slug, val in (pack.get("topics") or {}).items():
            spec = idx.get((subject, level, slug))
            if not spec:
                orphan += 1
                continue
            if not isinstance(val, dict) or "terms" not in val:
                continue
            pack_terms = {
                (t[0] if isinstance(t, list) else t).strip().lower()
                for t in val["terms"]
            }
            spec_terms = {t.lower() for t in spec}
            present = len(pack_terms & spec_terms) / len(spec_terms) if spec_terms else 1.0
            if present < threshold:
                if len(spec) < MIN_TERMS:
                    thin_skipped += 1
                    continue
                changes.append(f"{os.path.basename(path)} :: {slug}  ({len(val['terms'])} -> {len(spec)} terms)")
                if apply:
                    val["terms"] = [[t, spec[t]] for t in spec]
                rebuilt += 1
                changed = True
            else:
                clean += 1
        if changed and apply:
            json.dump(pack, open(path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
            files_changed += 1
    print(f"{'[CHECK] ' if not apply else ''}reconcile vocab packs (threshold {threshold})")
    print(f"  drifted topics {'to rebuild' if not apply else 'rebuilt'}: {rebuilt}")
    print(f"  clean topics left untouched:              {clean}")
    print(f"  pack topics with no matching spec:        {orphan}")
    print(f"  skipped (would drop below {MIN_TERMS} terms):     {thin_skipped}")
    if apply:
        print(f"  pack files written:                       {files_changed}")
    if changes:
        print("  --- topics affected ---")
        for c in changes[:40]:
            print("   ", c)
        if len(changes) > 40:
            print(f"    … and {len(changes) - 40} more")
    return rebuilt


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description="Reconcile Terms Tester vocab packs with spec concepts.")
    ap.add_argument("--check", action="store_true", help="dry run: report changes without writing")
    ap.add_argument("--threshold", type=float, default=0.5,
                    help="rebuild a topic if fewer than this fraction of correct terms are present (default 0.5)")
    args = ap.parse_args()
    reconcile(threshold=args.threshold, apply=not args.check)
