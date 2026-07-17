import re, glob, json, io, os, sys
BASE = sys.argv[1]  # classcraft dir
KIT = os.path.dirname(os.path.abspath(__file__))

# ---- Part 1: memory-family engine block swap ----
def last_script_span(s):
    idx = s.rfind('<script>')
    if idx < 0: return None
    j = s.find('</script>', idx)
    return (idx+len('<script>'), j) if j >= 0 else None
def split_engine(e):
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
def eng(p):
    s = io.open(p, encoding='utf-8').read()
    sp = last_script_span(s)
    return s, sp, (s[sp[0]:sp[1]] if sp else None)

_,_, olde = eng(os.path.join(KIT,'_old','memory.html'))
_,_, newe = eng(os.path.join(KIT,'_new','memory.html'))
op = split_engine(olde); np = split_engine(newe)
old_key = op[0] + 'X' + op[2]
swapped = 0; engine_nomatch = 0
files = sorted(glob.glob(os.path.join(BASE,'games','*.html')))
for p in files:
    s, sp, e = eng(p)
    if e is None: continue
    parts = split_engine(e)
    if not parts: continue
    if parts[0] + 'X' + parts[2] == old_key:
        ns = s[:sp[0]] + np[0] + parts[1] + np[2] + s[sp[1]:]
        io.open(p,'w',encoding='utf-8').write(ns)
        swapped += 1

# ---- Part 2: slim nav replacement across all game pages ----
NAV_OLD = io.open(os.path.join(KIT,'nav_old.html'), encoding='utf-8').read()
NAV_NEW = io.open(os.path.join(KIT,'nav_new.html'), encoding='utf-8').read()
nav_done = 0; nav_absent = []
for p in files:
    s = io.open(p, encoding='utf-8').read()
    if NAV_NEW in s: continue
    if NAV_OLD in s:
        io.open(p,'w',encoding='utf-8').write(s.replace(NAV_OLD, NAV_NEW, 1))
        nav_done += 1
    else:
        nav_absent.append(os.path.basename(p))
print('memory engines swapped:', swapped)
print('navs replaced:', nav_done, '| nav not exact-matched:', len(nav_absent))
for n in nav_absent[:15]: print('  no-nav-match:', n)
