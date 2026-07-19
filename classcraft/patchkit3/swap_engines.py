import re, glob, json, io, os, sys

ARC = sys.argv[1] if len(sys.argv)>1 else '.'   # classcraft dir
OLD_DIR = sys.argv[2]  # dir with pristine old templates
NEW_DIR = sys.argv[3]  # dir with new templates
FAMS = ['quiz','sort','timeline','memory','diagram','mob-quiz']

def last_script_span(s):
    idx = s.rfind('<script>')
    if idx < 0: return None
    j = s.find('</script>', idx)
    if j < 0: return None
    return (idx+len('<script>'), j)

def split_engine(e):
    """-> (head incl 'GAME_DATA = ', data_str, tail incl ';...')"""
    m = re.search(r'GAME_DATA\s*=\s*', e)
    if not m: return None
    rest = e[m.end():]
    if rest.startswith('__GAME_DATA__'):
        return (e[:m.end()], '__GAME_DATA__', rest[len('__GAME_DATA__'):])
    try:
        obj, idx = json.JSONDecoder().raw_decode(rest)
    except Exception:
        return None
    return (e[:m.end()], rest[:idx], rest[idx:])

def engine_of_file(p):
    s = io.open(p, encoding='utf-8').read()
    sp = last_script_span(s)
    return s, sp, (s[sp[0]:sp[1]] if sp else None)

def norm_key(e):
    parts = split_engine(e)
    if not parts: return None
    return parts[0] + 'X' + parts[2]

# Build family lookup: normalized old engine -> (family, new_head, new_tail)
fam_map = {}
for f in FAMS:
    _,_, olde = engine_of_file(os.path.join(OLD_DIR, f + '.html'))
    _,_, newe = engine_of_file(os.path.join(NEW_DIR, f + '.html'))
    ok = norm_key(olde); nh, nd, nt = split_engine(newe)
    assert nd == '__GAME_DATA__', f
    fam_map[ok] = (f, nh, nt)

counts = {f:0 for f in FAMS}; counts.update({'no-engine':0,'no-data':0,'no-family-match':0})
unmatched = []
for p in sorted(glob.glob(os.path.join(ARC, 'games', '*.html'))):
    s, sp, e = engine_of_file(p)
    if e is None: counts['no-engine'] += 1; unmatched.append(('no-engine',p)); continue
    parts = split_engine(e)
    if not parts: counts['no-data'] += 1; unmatched.append(('no-data',p)); continue
    key = parts[0] + 'X' + parts[2]
    hit = fam_map.get(key)
    if not hit:
        counts['no-family-match'] += 1; unmatched.append(('no-match',p)); continue
    fam, nh, nt = hit
    new_engine = nh + parts[1] + nt
    ns = s[:sp[0]] + new_engine + s[sp[1]:]
    with io.open(p, 'w', encoding='utf-8') as fh: fh.write(ns)
    counts[fam] += 1

print('COUNTS', json.dumps(counts))
for kind, p in unmatched[:25]: print('UNMATCHED', kind, p)
if len(unmatched) > 25: print('... plus', len(unmatched)-25, 'more')
