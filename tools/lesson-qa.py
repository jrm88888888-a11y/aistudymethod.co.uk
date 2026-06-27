import re,sys,subprocess,glob,os
TEACH_TAGS={'Picture it','Stores of energy','Pathways of transfer','Equation 1','Equation 2','Equation 3','Equation 4','Power'}  # not exhaustive; heuristic uses class 'tag lo'
def blocks(html): return re.findall(r'<script>(.*?)</script>',html,re.S)
def screens(html):
    body=re.search(r'<div class="stage"[^>]*>(.*)<div class="nav"',html,re.S)
    body=body.group(1) if body else html
    return re.split(r'<section class="screen[^"]*">',body)[1:]
problems=[]
for f in sorted(glob.glob('classcraft/adventures/*-gcse-*-mini-lesson.html')):
    html=open(f).read(); name=os.path.basename(f); p=[]
    # JS
    for i,b in enumerate(blocks(html)):
        open('/tmp/q.js','w').write(b)
        if subprocess.run(['node','--check','/tmp/q.js'],capture_output=True).returncode!=0: p.append('JS syntax error')
    # SVG balance
    if html.count('<svg')!=html.count('</svg>'): p.append('unbalanced <svg>')
    # MCQ one-correct
    for m in re.findall(r'class="opts" data-q="([^"]+)"(.*?)</div>\s*<div class="feedback"',html,re.S):
        if m[1].count('data-correct="1"')!=1: p.append(f'MCQ {m[0]} not exactly one correct')
    # numeric has answer
    for m in re.findall(r'class="numwrap" data-num="([^"]+)"([^>]*)>',html):
        if 'data-answer=' not in m[1]: p.append(f'numeric {m[0]} missing answer')
    # gating hooks
    if 'screenGated' not in html: p.append('engine: screenGated missing')
    # ORDERING heuristic: a question/game screen must not be the FIRST teaching content,
    # and the first screen carrying a question must come after >=1 pure-teaching screen.
    secs=screens(html); first_q=None; first_teach=None
    for idx,s in enumerate(secs):
        is_q = ('data-q="' in s) or ('data-num="' in s) or ('id="classify"' in s) or ('id="resChips"' in s) or ('id="matchGame"' in s)
        is_teach = ('class="tag lo"' in s) or ('class="eqn"' in s) or (s.count('<p')>=2 and not is_q)
        if is_q and first_q is None: first_q=idx
        if is_teach and first_teach is None: first_teach=idx
    if first_q is not None and (first_teach is None or first_q<first_teach):
        p.append(f'ordering: first question (screen {first_q}) precedes first teaching screen ({first_teach})')
    # per-concept ordering via optional tags (robust: only flag a test whose SAME key is taught LATER;
    # unmatched test keys = naming mismatch, not an ordering bug, so skipped)
    teach_idx={}; tests=[]
    for idx,s in enumerate(secs):
        for t in re.findall(r'data-teach="([^"]+)"',s):
            if t not in teach_idx: teach_idx[t]=idx
        for t in re.findall(r'data-test="([^"]+)"',s): tests.append((t,idx))
    for t,idx in tests:
        if t in teach_idx and teach_idx[t]>idx:
            p.append(f'ordering: "{t}" tested (screen {idx}) before taught (screen {teach_idx[t]})')
    print(f"{name:<56} {'CLEAN' if not p else 'ISSUES: '+'; '.join(p)}")
    problems+= [(name,x) for x in p]
print("\nTOTAL issues:",len(problems))
