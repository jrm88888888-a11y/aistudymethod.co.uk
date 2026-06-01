"""Generate 72 IBDP MFL adventure JSON specs (French, German, Spanish).
24 per language. All content in English; foreign vocab embedded.
"""
import json, os, sys

OUT_DIR = sys.argv[1] if len(sys.argv) > 1 else "/Users/james/Desktop/Websites/AI Study Method/classcraft/adventures/_specs"

def write_spec(filename, spec):
    path = os.path.join(OUT_DIR, filename)
    assert len(spec["concepts"]) == 6, f"{filename}: concepts"
    assert len(spec["walkthroughs"]) == 3, f"{filename}: walkthroughs"
    assert len(spec["mcqs"]) == 2, f"{filename}: mcqs"
    assert len(spec["numericals"]) == 1, f"{filename}: numericals"
    assert len(spec["free_texts"]) == 1, f"{filename}: free_texts"
    for mcq in spec["mcqs"]:
        correct = sum(1 for o in mcq["options"] if o[1] == 1)
        assert correct == 1, f"{filename}: mcq correct"
    num = spec["numericals"][0]
    assert num["answer"] in num["options"], f"{filename}: numerical"
    ft = spec["free_texts"][0]["answer"]
    assert ft == ft.lower() and all(ord(c) < 128 for c in ft), f"{filename}: free_text {ft}"
    with open(path, "w") as f:
        json.dump(spec, f, indent=2, ensure_ascii=False)

# Build a spec helper
def S(subject, level, topic_display, topic_slug, theme, n, title, emoji, lead, meta, final,
      concepts, walks, mcqs, nums, fts):
    return {
        "subject": subject, "level": level, "topic_display": topic_display,
        "topic_slug": topic_slug, "theme": theme, "adventure_n": n,
        "title": title, "emoji": emoji, "welcome_lead": lead,
        "meta_desc": meta, "final_note": final,
        "concepts": concepts, "walkthroughs": walks,
        "mcqs": mcqs, "numericals": nums, "free_texts": fts
    }

THEME = "languages-stamps"

# Import data
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _ibdp_french import FRENCH
from _ibdp_german import GERMAN
from _ibdp_spanish import SPANISH

LANGS = [
    ("french", FRENCH),
    ("german", GERMAN),
    ("spanish", SPANISH),
]

count = 0
for subject, topics in LANGS:
    for slug, data in topics.items():
        for i, adv in enumerate(data["advs"]):
            n = i + 1
            spec = {
                "subject": subject,
                "level": "ibdp",
                "topic_display": data["display"],
                "topic_slug": slug,
                "theme": THEME,
                "adventure_n": n,
                "title": adv["title"],
                "emoji": adv["emoji"],
                "welcome_lead": adv["lead"],
                "meta_desc": adv["meta"],
                "final_note": adv["final"],
                "concepts": adv["concepts"],
                "walkthroughs": adv["walks"],
                "mcqs": adv["mcqs"],
                "numericals": adv["numericals"],
                "free_texts": adv["free_texts"]
            }
            fname = f"{subject}-ibdp-{slug}-adventure-{n}.json"
            write_spec(fname, spec)
            count += 1

print(f"MFL written: {count}")

