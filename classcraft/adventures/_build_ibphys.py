# -*- coding: utf-8 -*-
"""Generator for IB Diploma Physics (2023 guide) Learn mini-lessons, SL + HL.
Clones the engine from biology-gcse-aqa-cell-biology-mini-lesson.html, swapping
only visible content + game data. Every numeric answer is re-derived here in
Python so the value written to disk is computed, never guessed."""
import json, os, math, sys

OUT = os.path.dirname(os.path.abspath(__file__))
CHECK = []            # (label, computed value) checklist
def rnd(x, n):
    return round(x, n)

# ---- IB data-booklet constants ----
g   = 9.81
G   = 6.67e-11
k_e = 8.99e9
e   = 1.60e-19
c   = 3.00e8
h   = 6.63e-34
NA  = 6.02e23
Rg  = 8.31
kB  = 1.38e-23
u   = 1.66e-27
sig = 5.67e-8
me  = 9.11e-31

# ============================================================= builder
class L:
    def __init__(self, level, slug, title, emoji, spec_topic, desc, intro_html, banner):
        self.level=level; self.slug=slug; self.title=title; self.emoji=emoji
        self.spec_topic=spec_topic; self.desc=desc; self.intro_html=intro_html
        self.banner=banner
        self.sections=[]; self.qkeys=[]; self.nkeys=[]
        self.classify=None; self.match=None; self.recap_rows=[]
    # -- teach screen --
    def teach(self, tag_text, h2, body_html, tag_class="lo"):
        self.sections.append(
f'''    <section class="screen" data-teach="{'t%d'%len(self.sections)}">
      <span class="tag {tag_class}">{tag_text}</span>
      <h2>{h2}</h2>
{body_html}
    </section>''')
    # -- MCQ --
    def mcq(self, question, options, why, tag="Quick check", h2="Quick check"):
        qk='q%d'%(len(self.qkeys)+1); self.qkeys.append(qk)
        opts=''.join(
            '        <button class="opt" data-correct="%d">%s <span class="mk">%s</span></button>\n'
            %(cor, txt, '✅' if cor else '❌') for txt,cor in options)
        self.sections.append(
f'''    <section class="screen" data-test="{qk}">
      <span class="tag">{tag}</span>
      <h2>{h2}</h2>
      <div class="activity">
        <div class="qline"><span class="qnum">?</span><span>{question}</span></div>
        <div class="opts" data-q="{qk}" data-why="{why}">
{opts}        </div>
        <div class="feedback" id="fb-{qk}"></div>
      </div>
    </section>''')
    # -- numeric --
    def num(self, question, answer, tol, unit, hint, h2="Calculate", tag="Calculate"):
        nk='n%d'%(len(self.nkeys)+1); self.nkeys.append(nk)
        CHECK.append((self.level+' '+self.title+' · '+nk, answer, unit))
        self.sections.append(
f'''    <section class="screen" data-test="{nk}">
      <span class="tag">{tag}</span>
      <h2>{h2}</h2>
      <div class="activity">
        <div class="qline"><span class="qnum">#</span><span>{question}</span></div>
        <div class="numwrap" data-num="{nk}" data-answer="{answer}" data-tol="{tol}">
          <input type="text" inputmode="decimal" aria-label="Your answer"><span class="unit">{unit}</span>
          <button class="checkbtn">Check ✓</button>
        </div>
        <div class="hint">{hint}</div>
        <div class="feedback" id="fb-{nk}"></div>
      </div>
    </section>''')
    # -- classify (3 bins) --
    def classify_game(self, h2, headers, data, done_msg, intro="Tap an item, then tap the group it belongs to."):
        # headers: (icon0,label0),(icon1,label1),(icon2,label2)  keys g0/g1/g2
        self.classify=(data, done_msg)
        self.sections.append(
f'''    <section class="screen" data-test="classify">
      <span class="tag">Sort it</span>
      <h2>{h2}</h2>
      <p style="font-size:1.02rem;color:var(--soft)">{intro}</p>
      <div class="activity">
        <div class="chips" id="cellChips"></div>
        <div class="bins">
          <div class="bin both"><h3>{headers[0]}</h3><div class="drop" id="binBoth"></div></div>
          <div class="bin ren"><h3>{headers[1]}</h3><div class="drop" id="binPlant"></div></div>
          <div class="bin non"><h3>{headers[2]}</h3><div class="drop" id="binBac"></div></div>
        </div>
        <div class="feedback" id="fb-cell"></div>
      </div>
    </section>''')
    # -- match --
    def match_game(self, h2, pairs, done_msg, intro="Tap a statement on the left, then its match on the right."):
        self.match=(pairs, done_msg)
        self.sections.append(
f'''    <section class="screen" data-test="match">
      <span class="tag">Match it</span>
      <h2>{h2}</h2>
      <p style="font-size:1.02rem;color:var(--soft)">{intro}</p>
      <div class="activity">
        <div class="match">
          <div class="mcol"><div class="mhead">Statement</div><div id="mLeft"></div></div>
          <div class="mcol"><div class="mhead">Answer</div><div id="mRight"></div></div>
        </div>
        <div class="feedback" id="fb-match"></div>
      </div>
    </section>''')
    def recap(self, rows):
        self.recap_rows=rows

# --------- static script blocks copied verbatim from the engine ---------
JUICE = r'''<script>
/* AISM juice layer: audio + celebration (shared 'aism-muted' pref) */
const AISM_REDUCED=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const AISM_SFX=(()=>{let actx=null,master=null,muted=false;try{muted=localStorage.getItem('aism-muted')==='1';}catch(e){}
function ensure(){try{if(!actx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return false;actx=new AC();master=actx.createGain();master.gain.value=0.28;master.connect(actx.destination);}if(actx.state==='suspended')actx.resume();return true;}catch(e){return false;}}
function tone(freq,dur,type,vol,endFreq){if(muted||!ensure())return;try{const t0=actx.currentTime;const o=actx.createOscillator(),gg=actx.createGain();o.type=type||'sine';o.frequency.setValueAtTime(freq,t0);if(endFreq)o.frequency.exponentialRampToValueAtTime(Math.max(30,endFreq),t0+dur);gg.gain.setValueAtTime(vol||0.1,t0);gg.gain.exponentialRampToValueAtTime(0.001,t0+dur);o.connect(gg);gg.connect(master);o.start(t0);o.stop(t0+dur+0.02);}catch(e){}}
return{unlock(){ensure();},isMuted(){return muted;},toggleMute(){muted=!muted;try{localStorage.setItem('aism-muted',muted?'1':'0');}catch(e){}return muted;},ok(){tone(587,0.08,'sine',0.11);setTimeout(()=>tone(740,0.1,'sine',0.1),70);},bad(){tone(220,0.15,'sawtooth',0.05,165);},fanfare(){tone(523,0.1,'triangle',0.13);setTimeout(()=>tone(659,0.1,'triangle',0.13),100);setTimeout(()=>tone(784,0.22,'triangle',0.13),200);}};})();
function aismConfetti(){if(AISM_REDUCED)return;let st=document.getElementById('aism-confetti-style');if(!st){st=document.createElement('style');st.id='aism-confetti-style';st.textContent='@keyframes aismCfFall{from{transform:translateY(-10vh) rotate(0)}to{transform:translateY(110vh) rotate(720deg)}}.aism-cf{position:fixed;top:0;width:8px;height:12px;z-index:950;pointer-events:none;animation:aismCfFall linear both;}';document.head.appendChild(st);}const colours=['#4ade9a','#7b6fff','#ffd166','#ff6b6b','#5ac8ff'];for(let i=0;i<40;i++){const cc=document.createElement('div');cc.className='aism-cf';cc.style.left=Math.random()*100+'vw';cc.style.background=colours[i%colours.length];cc.style.animationDuration=(1.6+Math.random()*1.4)+'s';cc.style.animationDelay=(Math.random()*0.5)+'s';cc.style.borderRadius=Math.random()<0.5?'50%':'2px';document.body.appendChild(cc);setTimeout(()=>cc.remove(),3600);}}
try{const _add=addScore;addScore=function(n){_add(n);try{AISM_SFX.ok();if(!AISM_REDUCED&&scoreEl&&scoreEl.animate)scoreEl.animate([{transform:'scale(1)'},{transform:'scale(1.4)'},{transform:'scale(1)'}],{duration:250});}catch(e){}};}catch(e){}
try{const _show=show;show=function(i){_show(i);try{if(i===screens.length-1&&!window._cheered){window._cheered=true;AISM_SFX.fanfare();aismConfetti();}}catch(e){}};}catch(e){}
document.addEventListener('click',e=>{const el=e.target&&e.target.closest?e.target.closest('.opt,.checkbtn,.chip'):null;if(!el)return;setTimeout(()=>{try{if(el.classList.contains('wrong')){AISM_SFX.bad();return;}const nw=el.closest('.numwrap');if(nw&&nw.querySelector('input.wrong'))AISM_SFX.bad();}catch(e2){}},40);},true);
(function(){function add(){if(document.getElementById('aism-mute'))return;const b=document.createElement('button');b.id='aism-mute';b.type='button';b.title='Toggle sound (M)';b.textContent=AISM_SFX.isMuted()?'🔇':'🔊';b.addEventListener('click',()=>{b.textContent=AISM_SFX.toggleMute()?'🔇':'🔊';});var _bar=document.querySelector('.topbar');if(_bar){b.style.cssText='background:none;border:none;font-size:18px;line-height:1;cursor:pointer;padding:0 2px;margin-left:2px;opacity:.6;align-self:center;';_bar.appendChild(b);}else{b.style.cssText='position:fixed;top:12px;right:12px;z-index:900;background:rgba(26,29,39,0.92);border:1px solid rgba(255,255,255,0.16);color:#fff;border-radius:10px;padding:8px 11px;font-size:15px;cursor:pointer;line-height:1;';document.body.appendChild(b);}}if(document.body)add();else window.addEventListener('DOMContentLoaded',add);document.addEventListener('keydown',e=>{if((e.key==='m'||e.key==='M')&&!e.metaKey&&!e.ctrlKey&&!e.altKey){const t=e.target||{};if(t.tagName==='INPUT'||t.tagName==='TEXTAREA')return;const b=document.getElementById('aism-mute');if(b)b.click();}});['pointerdown','keydown','touchstart'].forEach(ev=>document.addEventListener(ev,()=>AISM_SFX.unlock(),{once:true,capture:true}));})();
</script>
<script src="../quizzes/share-score.js?v=20260626c"></script>
<script src="../quizzes/lesson-nav.js?v=20260706"></script>
<script>
(function(){
  function lessonMeta(){
    var logo=document.querySelector(".logo");
    var topic=logo?logo.textContent.replace(/[^\x00-\x7F]/g,"").replace(/\s+/g," ").trim():"this topic";
    var spec=(document.querySelector(".spec")||{}).textContent||"";
    var lm=spec.match(/\b(GCSE|A-?Level|IB[^·]*)\b/i); var level=lm?lm[1].trim():"";
    var sm=spec.match(/\b(Physics|Biology|Chemistry|Maths|Mathematics)\b/i); var subject=sm?sm[1]:"";
    return {topic:topic,level:level,subject:subject};
  }
  function share(kind){
    var sc=parseInt((document.getElementById("finalScore")||{}).textContent,10)||0;
    var mx=parseInt((document.getElementById("finalMax")||{}).textContent,10)||0;
    var mm=lessonMeta();
    if(kind==="parent"){
      if(!(window.Arcade&&Arcade.shareWithParents)){alert("Sharing isn't available in this browser.");return;}
      Arcade.shareWithParents({subject:mm.subject,level:mm.level,topic:mm.topic,score:sc,total:mx});
      return;
    }
    if(!(window.Arcade&&Arcade.shareScore)){alert("Sharing isn't available in this browser.");return;}
    var txt="I scored "+sc+"/"+mx+" ⭐ on the "+mm.topic+" mini-lesson — bet you can't beat me! Try it: https://aistudymethod.co.uk";
    Arcade.shareScore({gameName:"Mini-Lesson",subject:mm.subject,level:mm.level,topic:mm.topic,score:sc,total:mx,bigLabel:"STARS",rankLine:"on "+mm.topic,statLine:"Beat my score!",shareText:txt});
  }
  document.addEventListener("click",function(e){var b=e.target&&e.target.closest?e.target.closest("[data-share]"):null;if(b){e.preventDefault();share(b.getAttribute("data-share"));}});
  try{ if(window.Arcade&&Arcade.maybeShowChallenge) Arcade.maybeShowChallenge({mountBefore:document.querySelector(".topbar")}); }catch(e){}
})();
</script>'''

CORE_TMPL = r'''<script>
const screens=[...document.querySelectorAll('.screen')];
let cur=0,score=0;
const bar=document.getElementById('bar'),scoreEl=document.getElementById('score'),nextBtn=document.getElementById('next'),backBtn=document.getElementById('back');
const done={};
function addScore(n){score+=n;scoreEl.textContent=score;}
function screenGated(scr){
  var q=scr.querySelector('.opts[data-q]'); if(q && !done[q.dataset.q]) return true;
  var n=scr.querySelector('.numwrap[data-num]'); if(n && !done[n.dataset.num]) return true;
  if(scr.querySelector('#cellChips') && !done.cell) return true;
  if(scr.querySelector('#mLeft') && !done.match) return true;
  return false;
}
function refreshGate(){if(screenGated(screens[cur])){nextBtn.classList.add('locked');nextBtn.textContent='Answer to continue 🙂';}else if(cur!==0&&cur!==screens.length-1){nextBtn.classList.remove('locked');nextBtn.textContent='Next ➡';}}
function show(i){screens[cur].classList.remove('active');cur=i;screens[cur].classList.add('active');bar.style.width=(cur/(screens.length-1)*100)+'%';backBtn.style.visibility=cur===0?'hidden':'visible';if(cur===0){nextBtn.style.visibility='visible';nextBtn.textContent='Start ➡';}else if(cur===screens.length-1){nextBtn.style.visibility='hidden';}else{nextBtn.style.visibility='visible';nextBtn.textContent='Next ➡';}refreshGate();window.scrollTo({top:0,behavior:'smooth'});}
nextBtn.addEventListener('click',()=>{if(cur<screens.length-1&&!nextBtn.classList.contains('locked'))show(cur+1);});
backBtn.addEventListener('click',()=>{if(cur>0)show(cur-1);});
function setupMCQ(qkey){const box=document.querySelector('.opts[data-q="'+qkey+'"]');if(!box)return;const fb=document.getElementById('fb-'+qkey);const why=box.dataset.why||'';box.querySelectorAll('.opt').forEach(btn=>{btn.addEventListener('click',()=>{if(done[qkey])return;const ok=btn.dataset.correct==='1';if(ok){box.querySelectorAll('.opt').forEach(b=>b.classList.add('lock'));btn.classList.add('correct');fb.innerHTML='🎉 Correct! +1 star<span class="why">'+why+'</span>';fb.className='feedback good';addScore(1);done[qkey]=true;refreshGate();}else{btn.classList.add('wrong','lock');fb.textContent='Not quite — try another 💪';fb.className='feedback bad';}});});}
__QKEYS__.forEach(setupMCQ);
function setupNum(nkey){const box=document.querySelector('.numwrap[data-num="'+nkey+'"]');if(!box)return;const ans=parseFloat(box.dataset.answer);const tol=parseFloat(box.dataset.tol||'0.5');const input=box.querySelector('input');const btn=box.querySelector('.checkbtn');const fb=document.getElementById('fb-'+nkey);let tries=0;function check(){if(done[nkey])return;const raw=(input.value||'').replace(/[, ]/g,'').replace(/:\s*1$/,'').replace(/mm²|cm²|m²|µm|mm|cm|[jw%x×:²]/gi,'').trim();if(raw===''){fb.textContent='Type your answer first ✍️';fb.className='feedback';return;}const v=parseFloat(raw);if(!isNaN(v)&&Math.abs(v-ans)<=tol){input.classList.add('correct');input.disabled=true;btn.disabled=true;fb.textContent='🎉 Correct! +1 star';fb.className='feedback good';addScore(1);done[nkey]=true;refreshGate();}else{tries++;input.classList.add('wrong');fb.textContent=tries>=2?('Answer: '+ans+'. Check your working and move on.'):'Not quite — recalculate and try again 💪';fb.className='feedback bad';if(tries>=2){done[nkey]=true;input.value=ans;input.disabled=true;btn.disabled=true;refreshGate();}else{setTimeout(()=>{input.classList.remove('wrong');input.focus();input.select();},500);}}}btn.addEventListener('click',check);input.addEventListener('keydown',e=>{if(e.key==='Enter')check();});}
__NKEYS__.forEach(setupNum);
const cellData=__CELLDATA__;
(function(){const chips=document.getElementById('cellChips');if(!chips)return;const fb=document.getElementById('fb-cell');const binBoth=document.getElementById('binBoth'),binPlant=document.getElementById('binPlant'),binBac=document.getElementById('binBac');let sel=null,placed=0;cellData.forEach((r,i)=>{const cc=document.createElement('button');cc.className='chip';cc.textContent=r[0];cc.dataset.k=r[1];cc.dataset.i=i;cc.addEventListener('click',()=>{chips.querySelectorAll('.chip').forEach(x=>x.classList.remove('sel'));cc.classList.add('sel');sel=cc;});chips.appendChild(cc);});function place(binKey,binEl){if(!sel){fb.textContent='Tap an item first ⬆';fb.className='feedback';return;}if(sel.dataset.k===binKey){const tag=document.createElement('span');tag.className='placed ok';tag.textContent=sel.textContent;binEl.appendChild(tag);sel.remove();sel=null;placed++;addScore(1);fb.textContent='✅ Correct!';fb.className='feedback good';if(placed===cellData.length){fb.textContent='__CELL_DONE__';fb.className='feedback good';done.cell=true;refreshGate();}}else{fb.textContent='Hmm, not that group — think again 🤔';fb.className='feedback bad';sel.classList.add('miss');setTimeout(()=>sel&&sel.classList.remove('miss'),400);}}
document.querySelector('.bin.both').addEventListener('click',()=>place('g0',binBoth));
document.querySelector('.bin.ren').addEventListener('click',()=>place('g1',binPlant));
document.querySelector('.bin.non').addEventListener('click',()=>place('g2',binBac));})();
const matchPairs=__MATCHPAIRS__;
(function(){const Lc=document.getElementById('mLeft'),Rc=document.getElementById('mRight');if(!Lc)return;const fb=document.getElementById('fb-match');let selL=null,matched=0;const rOrder=matchPairs.map((_,i)=>i).slice().sort(()=>Math.random()-0.5);matchPairs.forEach((p,i)=>{const a=document.createElement('div');a.className='mitem';a.textContent=p.l;a.dataset.i=i;a.addEventListener('click',()=>{if(a.classList.contains('done'))return;Lc.querySelectorAll('.mitem').forEach(x=>x.classList.remove('sel'));a.classList.add('sel');selL=a;});Lc.appendChild(a);});rOrder.forEach(i=>{const p=matchPairs[i];const b=document.createElement('div');b.className='mitem';b.textContent=p.r;b.dataset.i=i;b.addEventListener('click',()=>{if(b.classList.contains('done'))return;if(!selL){fb.textContent='Pick a statement on the left first ⬅';fb.className='feedback';return;}const li=selL.dataset.i;const want=matchPairs[li].r;if(p.r===want){selL.classList.add('done');selL.classList.remove('sel');b.classList.add('done');addScore(1);matched++;selL=null;if(matched===matchPairs.length){fb.textContent='__MATCH_DONE__';fb.className='feedback good';done.match=true;refreshGate();}else{fb.textContent='✅ Matched!';fb.className='feedback good';}}else{b.classList.add('miss');setTimeout(()=>b.classList.remove('miss'),400);fb.textContent='Not that one — re-read the statement 🤔';fb.className='feedback bad';}});Rc.appendChild(b);});})();
const totalPoints=document.querySelectorAll('.opts[data-q]').length
  +document.querySelectorAll('.numwrap[data-num]').length
  +(typeof cellData!=='undefined'?cellData.length:0)
  +(typeof matchPairs!=='undefined'?matchPairs.length:0);
const origShow=show;show=function(i){origShow(i);if(i===screens.length-1){document.getElementById('finalScore').textContent=score;document.getElementById('finalMax').textContent=totalPoints;const pct=score/totalPoints;document.getElementById('finalStars').textContent=pct>=0.85?'⭐⭐⭐':pct>=0.55?'⭐⭐':'⭐';}};
backBtn.style.visibility='hidden';bar.style.width='0%';
</script>'''

def render(L):
    lvl=L.level
    qk=json.dumps(['q%d'%(i+1) for i in range(len(L.qkeys))])
    nk=json.dumps(['n%d'%(i+1) for i in range(len(L.nkeys))])
    cdata=json.dumps(L.classify[0], ensure_ascii=False)
    cdone=L.classify[1]
    mpairs=json.dumps([{'l':p[0],'r':p[1]} for p in L.match[0]], ensure_ascii=False)
    mdone=L.match[1]
    core=(CORE_TMPL.replace('__QKEYS__',qk).replace('__NKEYS__',nk)
          .replace('__CELLDATA__',cdata).replace('__CELL_DONE__',cdone)
          .replace('__MATCHPAIRS__',mpairs).replace('__MATCH_DONE__',mdone))
    recap_html=''.join('        <p><b>%s:</b> %s</p>\n'%(a,b) for a,b in L.recap_rows)
    body='\n\n'.join(L.sections)
    html=f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="{L.desc}">
<title>{L.title} — Mini-Lesson · AI Study Method</title>
<meta name="robots" content="noindex,nofollow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
  :root{{
    --bg:#fff7ec;--bg2:#ffeedd;--ink:#2c2840;--soft:#6b6580;
    --kinetic:#2e8bff;--gpe:#ff9f1c;--elastic:#9b5de5;--thermal:#ff5b6e;
    --chem:#34c777;--sun:#ffc83d;--green:#34c777;--red:#ff5b6e;
    --card:#ffffff;--line:#efe2d2;--shadow:0 10px 0 rgba(44,40,64,.10);
  }}
  *{{box-sizing:border-box;margin:0;padding:0}}
  html,body{{height:100%}}
  body{{font-family:'Nunito',sans-serif;color:var(--ink);
    background:radial-gradient(circle at 12% 10%,#fff 0,transparent 30%),radial-gradient(circle at 88% 0%,#ffe6cf 0,transparent 35%),linear-gradient(160deg,var(--bg),var(--bg2));
    min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:18px 14px 70px}}
  .app{{width:100%;max-width:700px}}
  .backstrip{{margin-bottom:10px;font-family:'Fredoka';font-weight:500;font-size:.95rem}}
  .backstrip a{{color:var(--soft);text-decoration:none;border:2px solid var(--ink);border-radius:14px;padding:6px 12px;background:#fff;box-shadow:0 3px 0 var(--ink);display:inline-block}}
  .topbar{{display:flex;align-items:center;gap:12px;background:var(--card);border:3px solid var(--ink);border-radius:22px;padding:12px 16px;box-shadow:var(--shadow);margin-bottom:14px}}
  .logo{{font-family:'Fredoka';font-weight:700;font-size:1.1rem;display:flex;align-items:center;gap:8px;white-space:nowrap}}
  .logo .spark{{font-size:1.3rem}}
  .bar{{flex:1;height:16px;background:#f0e7da;border-radius:20px;overflow:hidden;border:2px solid var(--ink)}}
  .bar>i{{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--sun),var(--gpe));border-radius:20px;transition:width .45s cubic-bezier(.5,1.6,.4,1)}}
  .score{{font-family:'Fredoka';font-weight:600;font-size:1rem;display:flex;align-items:center;gap:5px;white-space:nowrap}}
  .spec{{font-family:'Fredoka';font-weight:500;font-size:.8rem;color:var(--soft);text-align:center;margin-bottom:14px}}
  .screen{{display:none;background:var(--card);border:3px solid var(--ink);border-radius:28px;padding:28px 24px 24px;box-shadow:var(--shadow);animation:pop .4s cubic-bezier(.34,1.56,.64,1)}}
  .screen.active{{display:block}}
  @keyframes pop{{from{{opacity:0;transform:translateY(14px) scale(.98)}}to{{opacity:1;transform:none}}}}
  h1{{font-family:'Fredoka';font-weight:700;font-size:2rem;line-height:1.1;margin-bottom:8px}}
  h2{{font-family:'Fredoka';font-weight:600;font-size:1.42rem;line-height:1.15;margin-bottom:12px}}
  p{{font-size:1.12rem;line-height:1.6;margin-bottom:12px}}
  .big{{font-size:1.26rem}}
  ul{{margin:0 0 14px 2px;padding-left:20px}}
  li{{font-size:1.08rem;line-height:1.55;margin-bottom:6px}}
  .tag{{display:inline-block;background:var(--sun);border:2.5px solid var(--ink);border-radius:14px;padding:3px 12px;font-family:'Fredoka';font-weight:600;font-size:.9rem;margin-bottom:12px}}
  .tag.lo{{background:#eef6ff;color:#0b5bbf}}
  .tag.bio{{background:#e7fbef;color:#137a45}}
  .tag.ht{{background:#efe1ff;color:#6a30b8}}
  .hl{{padding:1px 7px;border-radius:8px;font-weight:800}}
  .hl.k{{background:#d9ebff;color:#0b5bbf}}.hl.g{{background:#ffe9c7;color:#9a5a00}}
  .hl.el{{background:#efe1ff;color:#6a30b8}}.hl.t{{background:#ffdfe3;color:#c8203a}}
  .hl.y{{background:#fff1c2;color:#8b6a00}}.hl.c{{background:#d6f6e4;color:#137a45}}
  .eqn{{background:#1c1840;color:#fff;border:3px solid var(--ink);border-radius:18px;padding:16px 18px;text-align:center;font-family:'Fredoka';font-weight:600;font-size:1.5rem;margin:6px 0 14px;letter-spacing:.4px}}
  .eqn small{{display:block;font-family:'Nunito';font-weight:600;font-size:.92rem;color:#c9c4ec;margin-top:8px;letter-spacing:0;line-height:1.5}}
  .note{{background:#fff7ee;border:2.5px dashed var(--ink);border-radius:16px;padding:12px 14px;font-size:1.02rem;margin:0 0 14px}}
  .note b{{font-family:'Fredoka'}}
  .work{{background:#f4fbff;border:2.5px solid #bfe1ff;border-radius:16px;padding:14px 16px;margin:8px 0 14px}}
  .work .wt{{font-family:'Fredoka';font-weight:600;color:#0b5bbf;margin-bottom:6px}}
  .work p{{font-size:1.04rem;margin-bottom:4px}}
  figure{{margin:6px 0 14px;text-align:center}}
  figure svg{{max-width:100%;height:auto;border:3px solid var(--ink);border-radius:20px;background:#fff;box-shadow:var(--shadow)}}
  figcaption{{font-family:'Fredoka';font-weight:500;color:var(--soft);font-size:.92rem;margin-top:8px}}
  .activity{{background:#fff7ee;border:3px dashed var(--ink);border-radius:22px;padding:20px;margin-top:6px}}
  .qline{{font-family:'Fredoka';font-weight:600;font-size:1.18rem;margin-bottom:14px;display:flex;gap:8px;align-items:flex-start}}
  .qnum{{background:var(--ink);color:#fff;border-radius:50%;min-width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}}
  .opts{{display:grid;gap:10px}}
  .opt{{font-family:'Fredoka';font-weight:500;font-size:1.1rem;text-align:left;background:#fff;border:3px solid var(--ink);border-radius:16px;padding:13px 16px;cursor:pointer;transition:transform .08s,background .15s;display:flex;align-items:center;gap:10px}}
  .opt:hover{{transform:translateY(-2px)}}.opt:active{{transform:translateY(1px)}}
  .opt .mk{{font-size:1.2rem;margin-left:auto;opacity:0}}
  .opt.correct{{background:#dff7e9;border-color:var(--green)}}.opt.correct .mk{{opacity:1}}
  .opt.wrong{{background:#ffe2e6;border-color:var(--red)}}.opt.wrong .mk{{opacity:1}}
  .opt.lock{{pointer-events:none;opacity:.55}}.opt.lock.correct,.opt.lock.wrong{{opacity:1}}
  .feedback{{margin-top:14px;font-family:'Fredoka';font-weight:600;font-size:1.05rem;min-height:1.3em;display:flex;align-items:center;gap:8px;flex-wrap:wrap}}
  .feedback.good{{color:var(--green)}}.feedback.bad{{color:var(--red)}}
  .feedback .why{{display:block;width:100%;font-family:'Nunito';font-weight:600;font-size:.96rem;color:var(--soft);margin-top:4px}}
  .numwrap{{display:flex;gap:10px;align-items:center;flex-wrap:wrap}}
  .numwrap input{{font-family:'Fredoka';font-weight:700;font-size:1.3rem;color:var(--ink);width:150px;text-align:center;background:#fff;border:3px solid var(--ink);border-radius:14px;padding:10px 8px;outline:none}}
  .numwrap input:focus{{border-color:var(--sun);box-shadow:0 0 0 3px rgba(255,200,61,.35)}}
  .numwrap input.correct{{background:#dff7e9;border-color:var(--green)}}
  .numwrap input.wrong{{background:#ffe2e6;border-color:var(--red)}}
  .unit{{font-family:'Fredoka';font-weight:600;font-size:1.15rem}}
  .checkbtn{{font-family:'Fredoka';font-weight:600;font-size:1rem;background:var(--sun);border:3px solid var(--ink);border-radius:14px;padding:10px 18px;cursor:pointer;box-shadow:0 4px 0 var(--ink);transition:transform .08s,box-shadow .08s}}
  .checkbtn:hover{{transform:translateY(-1px)}}.checkbtn:active{{transform:translateY(3px);box-shadow:0 1px 0 var(--ink)}}
  .checkbtn:disabled{{opacity:.5;cursor:not-allowed}}
  .hint{{color:var(--soft);font-size:.95rem;font-weight:600;margin-top:8px;font-family:'Nunito'}}
  .chips{{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:14px}}
  .chip{{font-family:'Fredoka';font-weight:600;font-size:1.02rem;background:#fff;border:3px solid var(--ink);border-radius:14px;padding:9px 13px;cursor:pointer;transition:transform .08s}}
  .chip:hover{{transform:translateY(-2px)}}
  .chip.sel{{background:var(--sun)}}
  .bins{{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}}
  .bin{{border:3px solid var(--ink);border-radius:18px;padding:12px;min-height:90px;background:#fff}}
  .bin h3{{font-family:'Fredoka';font-weight:600;font-size:.96rem;text-align:center;margin-bottom:8px}}
  .bin.ren{{background:#eafaf0}}.bin.non{{background:#fdeef0}}.bin.both{{background:#eef6ff}}
  .bin .drop{{display:flex;flex-wrap:wrap;gap:6px;justify-content:center}}
  .placed{{font-family:'Fredoka';font-weight:600;font-size:.92rem;border:2.5px solid var(--ink);border-radius:10px;padding:5px 9px;background:#fff}}
  .placed.ok{{background:#dff7e9;border-color:var(--green)}}
  .match{{display:grid;grid-template-columns:1fr 1fr;gap:12px}}
  .mcol{{display:flex;flex-direction:column;gap:10px}}
  .mhead{{font-family:'Fredoka';font-weight:600;text-align:center;color:var(--soft);font-size:.92rem}}
  .mitem{{font-family:'Fredoka';font-weight:500;font-size:.98rem;background:#fff;border:3px solid var(--ink);border-radius:14px;padding:11px;cursor:pointer;text-align:center;transition:transform .08s;line-height:1.25}}
  .mitem:hover{{transform:translateY(-2px)}}.mitem.sel{{background:var(--sun)}}
  .mitem.done{{background:#dff7e9;border-color:var(--green);pointer-events:none}}.mitem.done::after{{content:" ✓"}}
  .mitem.miss{{animation:shake .4s}}
  @keyframes shake{{0%,100%{{transform:translateX(0)}}25%{{transform:translateX(-6px)}}75%{{transform:translateX(6px)}}}}
  .nav{{display:flex;justify-content:space-between;gap:12px;margin-top:20px;align-items:center}}
  .btn{{font-family:'Fredoka';font-weight:600;font-size:1.15rem;border:3px solid var(--ink);border-radius:18px;padding:12px 24px;cursor:pointer;background:var(--sun);box-shadow:0 5px 0 var(--ink);transition:transform .08s,box-shadow .08s}}
  .btn:hover{{transform:translateY(-1px)}}.btn:active{{transform:translateY(4px);box-shadow:0 1px 0 var(--ink)}}
  .btn.ghost{{background:#fff}}
  .btn:disabled{{opacity:.4;cursor:not-allowed}}
  .btn.locked{{opacity:.6;pointer-events:none}}
  .final{{text-align:center}}
  .trophy{{font-size:4.2rem;animation:float 2.2s ease-in-out infinite}}
  @keyframes float{{0%,100%{{transform:translateY(0)}}50%{{transform:translateY(-10px)}}}}
  .stars3{{font-size:2.5rem;letter-spacing:6px;margin:4px 0}}
  .scorebig{{font-family:'Fredoka';font-weight:700;font-size:2.2rem;color:var(--gpe)}}
  .recap{{text-align:left;background:#fbf6ff;border:2.5px solid #e6d5ff;border-radius:16px;padding:14px 16px;margin:14px 0}}
  .recap b{{font-family:'Fredoka'}}
  .sharebox{{background:#fff7ee;border:3px dashed var(--ink);border-radius:22px;padding:18px;margin:18px 0 4px;text-align:center}}
  .sharebox h2{{font-size:1.2rem;margin-bottom:6px}}
  .sharerow{{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:12px}}
  .sharerow .btn{{font-size:1.02rem;padding:11px 18px}}
  @media(max-width:520px){{h1{{font-size:1.7rem}}h2{{font-size:1.26rem}}p{{font-size:1.05rem}}.eqn{{font-size:1.25rem}}.match{{gap:8px}}body{{padding:12px 10px 70px}}.topbar{{gap:8px;padding:10px 12px;flex-wrap:wrap}}.logo{{font-size:.95rem;white-space:normal;line-height:1.05;min-width:0}}.bar{{min-width:80px}}.screen{{padding:22px 16px 18px}}.btn{{font-size:1.05rem;padding:11px 16px}}.sharerow{{flex-direction:column}}.sharerow .btn{{width:100%}}}}
  @media(max-width:420px){{.bins{{grid-template-columns:1fr}}.match{{grid-template-columns:1fr}}}}
</style>
</head>
<body>
<div class="app">
  <div class="backstrip"><a href="../../subjects.html">← Back to subjects</a></div>
  <div class="topbar">
    <div class="logo"><span class="spark">{L.emoji}</span> {L.title}</div>
    <div class="bar"><i id="bar"></i></div>
    <div class="score">⭐ <span id="score">0</span></div>
  </div>
  <div class="spec">IB Diploma Physics {lvl} · {L.spec_topic}</div>
  <div class="stage" id="stage">

    <!-- 0 WELCOME -->
    <section class="screen active">
      <span class="tag">Mini-Lesson</span>
      <h1>{L.title}</h1>
{L.intro_html}
{L.banner}
      <p>Work through each screen, answer the <b>questions</b> as you go (some are reasoning, some are calculations) and collect ⭐ stars. Watch for the <span class="tag ht" style="margin:0">HL</span> flag on higher-level extensions. Press <b>Start</b> when you're ready.</p>
    </section>

{body}

    <!-- RECAP -->
    <section class="screen">
      <span class="tag">Recap</span>
      <h2>The big ideas to know</h2>
      <div class="recap">
{recap_html}      </div>
      <p>That completes <b>{L.title}</b> for IB Diploma Physics {lvl}. Press <b>Finish</b> to see your score.</p>
    </section>

    <!-- FINAL -->
    <section class="screen final">
      <div class="trophy">🏆</div>
      <h1>Mini-lesson complete!</h1>
      <div class="stars3" id="finalStars">⭐⭐⭐</div>
      <p class="big">You've worked through <b>{L.title}</b> for IB Diploma Physics {lvl}. 🎉</p>
      <p>Your stars: <span class="scorebig" id="finalScore">0</span> / <span id="finalMax">0</span></p>
      <p style="font-size:1.02rem;color:var(--soft)">Next: test yourself in the <b>Evaluate</b> stage Confidence Quiz, then lock it in with <b>Verify</b>.</p>
      <div class="sharebox">
        <h2>📣 Smashed it? Share your score</h2>
        <p style="font-size:1rem;color:var(--soft);margin-bottom:0">Challenge a friend to beat your stars, or show a parent how you got on.</p>
        <div class="sharerow">
          <button type="button" class="btn" data-share="mate">📲 Challenge a friend</button>
          <button type="button" class="btn ghost" data-share="parent">👪 Show your parents</button>
        </div>
      </div>
      <button class="btn restart" onclick="location.reload()" style="margin-top:14px">Restart 🔄</button>
      <p style="margin-top:14px"><a href="../../subjects.html" style="color:var(--kinetic);font-weight:700;text-decoration:none">→ Back to all subjects</a></p>
    </section>

  </div>
  <div class="nav">
    <button class="btn ghost" id="back">⬅ Back</button>
    <button class="btn" id="next">Start ➡</button>
  </div>
</div>
{core}
{JUICE}
</body>
</html>'''
    fn='physics-ibdp-%s-%s-mini-lesson.html'%(lvl.lower(), L.slug)
    with open(os.path.join(OUT,fn),'w',encoding='utf-8') as f:
        f.write(html)
    return fn

BANNER = lambda a,b,cc: f'''      <figure>
        <svg viewBox="0 0 560 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Lesson map">
          <rect x="16" y="34" width="168" height="54" rx="14" fill="#d9ebff" stroke="#2c2840" stroke-width="3"/>
          <text x="100" y="66" text-anchor="middle" font-family="Fredoka" font-size="13.5" font-weight="600" fill="#0b5bbf">{a}</text>
          <rect x="196" y="34" width="168" height="54" rx="14" fill="#ffe9c7" stroke="#2c2840" stroke-width="3"/>
          <text x="280" y="66" text-anchor="middle" font-family="Fredoka" font-size="13.5" font-weight="600" fill="#9a5a00">{b}</text>
          <rect x="376" y="34" width="168" height="54" rx="14" fill="#d6f6e4" stroke="#2c2840" stroke-width="3"/>
          <text x="460" y="66" text-anchor="middle" font-family="Fredoka" font-size="13.5" font-weight="600" fill="#137a45">{cc}</text>
        </svg>
      </figure>'''

def E(main, sub=''):
    s = ('<small>%s</small>'%sub) if sub else ''
    return '      <div class="eqn">%s%s</div>'%(main, s)
def NOTE(txt):
    return '      <p class="note">%s</p>'%txt
def WORK(title, *lines):
    body=''.join('        <p>%s</p>\n'%ln for ln in lines)
    return '      <div class="work">\n        <div class="wt">%s</div>\n%s      </div>'%(title, body)
def P(*parts):
    return '\n'.join(parts)

# ============================================================ THEME A
def build_kinematics(level):
    hl = (level=='HL')
    L_ = L(level,'kinematics','Kinematics','🚀','Theme A.1 Kinematics',
        'A thorough IB Diploma Physics %s mini-lesson on Theme A.1 Kinematics — displacement, velocity and acceleration, motion graphs, the equations of motion (suvat) and projectile motion, aligned to the 2023 guide.'%level,
        '      <p class="big">This mini-lesson covers <b>Theme A.1 — Kinematics</b>: the language of motion (displacement, velocity, acceleration), reading <b>motion graphs</b>, the four <b>equations of motion</b> for uniform acceleration, and <b>projectile motion</b>.</p>',
        BANNER('displacement &amp; velocity','equations of motion','projectiles'))
    L_.teach('A.1 · quantities','Describing motion',
        P('<p>Motion is described with vectors and scalars. Keep the pair distinct:</p>',
          '<ul><li><b>Distance</b> (scalar) — total path length travelled. <b>Displacement</b> (vector) — straight-line change in position, <i>with direction</i>.</li>'
          '<li><b>Speed</b> (scalar) = distance ÷ time. <b>Velocity</b> (vector) = displacement ÷ time.</li>'
          '<li><b>Acceleration</b> (vector) = rate of change of velocity, <b>a = Δv ÷ Δt</b>, in m s⁻².</li></ul>',
          NOTE('<b>Sign convention:</b> choose a positive direction first. A ball thrown up then falling has a <b>constant downward</b> acceleration of 9.81 m s⁻² the whole time — velocity changes sign, acceleration does not.')))
    L_.mcq('A runner completes exactly one lap of a 400 m circular track, finishing where they started. What are the distance travelled and the magnitude of the displacement?',
        [('Distance 400 m, displacement 0',1),('Distance 0, displacement 400 m',0),
         ('Both 400 m',0),('Both 0',0)],
        'Distance is the whole path (400 m). Displacement is the straight-line change in position; start and finish coincide, so it is zero. This is the key scalar-vs-vector distinction.')
    L_.teach('A.1 · graphs','Motion graphs',
        P('<p>Graphs unlock a lot of marks. Two rules do most of the work:</p>',
          '<ul><li>On a <b>displacement–time</b> graph, the <b>gradient</b> is the <b>velocity</b>.</li>'
          '<li>On a <b>velocity–time</b> graph, the <b>gradient</b> is the <b>acceleration</b>, and the <b>area under</b> the line is the <b>displacement</b>.</li></ul>',
          NOTE('A straight, sloping line on a velocity–time graph means <b>uniform (constant) acceleration</b> — exactly the case the suvat equations describe.')))
    L_.mcq('An object falling through air reaches terminal velocity. On its velocity–time graph the line becomes horizontal. What does this tell you?',
        [('Its acceleration is zero and velocity is constant',1),
         ('Its velocity is zero',0),('Its displacement is zero',0),
         ('The resultant force is increasing',0)],
        'A horizontal velocity–time line has zero gradient, so acceleration = 0. At terminal velocity drag balances weight, the resultant force is zero, and velocity stays constant.')
    L_.teach('A.1 · suvat','The equations of motion',
        P('<p>For <b>uniform acceleration</b> in a straight line, four equations link the five quantities <b>s, u, v, a, t</b>. Pick the one that omits the quantity you neither know nor want.</p>',
          E('v = u + at','s = ut + ½at²  ·  v² = u² + 2as  ·  s = ½(u + v)t'),
          WORK('Worked example — free fall from rest',
               'A stone is dropped (u = 0) and falls for t = 2.5 s. Take a = g = 9.81 m s⁻².',
               'v = u + at = 0 + 9.81 × 2.5 = <b>24.5 m s⁻¹</b>')))
    v1 = 0 + g*2.5
    L_.num('A ball is dropped from rest and falls for <b>3.0 s</b>. Using a = 9.81 m s⁻², find its speed just before impact (ignore air resistance).',
        rnd(0+g*3.0,1), 0.4, 'm s⁻¹', 'Hint: v = u + at with u = 0, a = 9.81, t = 3.0.')
    s2 = 8*6 + 0.5*2*6**2
    L_.num('A car accelerates uniformly from <b>8.0 m s⁻¹</b> at <b>2.0 m s⁻²</b> for <b>6.0 s</b>. Find the distance travelled.',
        rnd(s2,0), 1, 'm', 'Hint: s = ut + ½at² = 8×6 + ½×2×6².')
    s3 = 20**2/(2*g)
    L_.num('A ball is thrown straight up at <b>20 m s⁻¹</b>. Taking g = 9.81 m s⁻², find the maximum height reached (v = 0 at the top).',
        rnd(s3,1), 0.5, 'm', 'Hint: v² = u² + 2as → 0 = 20² − 2(9.81)s.')
    L_.classify_game('Sort each item',
        ('🧭 Vector quantity','📏 Scalar quantity','📈 Read from a graph'),
        [['Displacement','g0'],['Velocity','g0'],['Acceleration','g0'],
         ['Distance','g1'],['Speed','g1'],['Time','g1'],
         ['Gradient of a velocity–time graph','g2'],['Area under a velocity–time graph','g2'],['Gradient of a displacement–time graph','g2']],
        '🌟 Sorted! Vectors carry direction; scalars do not; graph gradients and areas hand you a and s.')
    L_.teach('A.1 · projectiles','Projectile motion',
        P('<p>A projectile has <b>independent</b> horizontal and vertical motions, joined only by <b>time</b>:</p>',
          '<ul><li><b>Horizontal:</b> no force (ignoring drag), so velocity is <b>constant</b> — use s = uₓt.</li>'
          '<li><b>Vertical:</b> constant acceleration g downward — use the suvat equations.</li></ul>',
          WORK('Worked example — horizontal launch',
               'A ball rolls off a bench and lands after falling h = 1.25 m. Time to fall:',
               't = √(2h ÷ g) = √(2 × 1.25 ÷ 9.81) = <b>0.505 s</b>')))
    tfall = math.sqrt(2*45/g)
    L_.num('A stone is thrown horizontally from a <b>45 m</b> high cliff. Using g = 9.81 m s⁻², how long does it take to hit the ground below?',
        rnd(tfall,2), 0.1, 's', 'Hint: vertical only — h = ½gt², so t = √(2h ÷ g) = √(90 ÷ 9.81).')
    L_.match_game('Match the situation to the right equation',
        [['Know u, a, t; want the final velocity v','v = u + at'],
         ['Know u, a, t; want the displacement s','s = ut + ½at²'],
         ['No time given: know u, a, s; want v','v² = u² + 2as'],
         ['Constant velocity, a = 0; want s','s = vt']],
        '🌟 Matched! Choosing the equation that omits the unknown you do not need is the whole trick.')
    if hl:
        ux=25*math.cos(math.radians(30)); uy=25*math.sin(math.radians(30))
        T=2*uy/g; R=ux*T
        L_.teach('A.1 · HL depth','Launch at an angle',
            P('<p>When a projectile is launched at angle θ to the horizontal at speed u, resolve first:</p>',
              '<ul><li>Horizontal component uₓ = u cos θ (constant).</li><li>Vertical component u_y = u sin θ (decreases at g).</li></ul>',
              '<p>Time of flight over level ground: <b>T = 2u_y ÷ g</b>. Range: <b>R = uₓ × T</b>. Maximum height uses v² = u² + 2as with the vertical component.</p>',
              NOTE('The path is a <b>parabola</b>. The maximum range over level ground occurs at <b>θ = 45°</b>, where the horizontal and vertical components are balanced.')),
            tag_class='ht')
        L_.num('HL: a ball is launched at <b>25 m s⁻¹</b> at <b>30°</b> above the horizontal over level ground (g = 9.81 m s⁻²). Find the horizontal range.',
            rnd(R,1), 1.5, 'm', 'Hint: u_y = 25 sin30 = 12.5; T = 2u_y ÷ g; range = 25 cos30 × T.')
    L_.recap([
        ('Vectors vs scalars','displacement/velocity/acceleration carry direction; distance/speed/time do not'),
        ('Graphs','v–t gradient = acceleration; area under v–t = displacement'),
        ('Equations of motion','v = u+at · s = ut+½at² · v² = u²+2as · s = ½(u+v)t'),
        ('Projectiles','independent horizontal (constant v) and vertical (accelerate at g) motions'),
        ('HL','launch at angle: resolve into components, T = 2u sinθ ÷ g') if hl else ('Free fall','a = g = 9.81 m s⁻² downward throughout, up or down'),
    ])
    return render(L_)

def build_forces_momentum(level):
    hl=(level=='HL')
    L_=L(level,'forces-and-momentum','Forces & Momentum','⚙️','Theme A.2 Forces and momentum',
        'A thorough IB Diploma Physics %s mini-lesson on Theme A.2 Forces and momentum — Newton\'s three laws, free-body diagrams, F = ma, impulse and conservation of linear momentum, aligned to the 2023 guide.'%level,
        '      <p class="big">This mini-lesson covers <b>Theme A.2 — Forces and momentum</b>: <b>Newton\'s three laws</b>, drawing <b>free-body diagrams</b>, using <b>F = ma</b>, and the powerful ideas of <b>impulse</b> and <b>conservation of momentum</b>.</p>',
        BANNER('Newton&#39;s laws','F = ma','momentum &amp; impulse'))
    L_.teach('A.2 · Newton I & II','Newton\'s first two laws',
        P('<p>Forces are pushes and pulls (vectors, in newtons). The first two laws:</p>',
          '<ul><li><b>First law:</b> an object stays at rest or moves at <b>constant velocity</b> unless a <b>resultant (net) force</b> acts. Constant velocity ⇒ zero resultant force (equilibrium).</li>'
          '<li><b>Second law:</b> the resultant force equals rate of change of momentum; for constant mass this is <b>F = ma</b>.</li></ul>',
          E('F = ma','resultant force (N) = mass (kg) × acceleration (m s⁻²)'),
          NOTE('<b>Weight</b> is the gravitational force on a mass: <b>W = mg</b>. A 6 kg bag weighs 6 × 9.81 = 58.9 N. Mass (kg) is not weight (N).')))
    L_.mcq('A car drives along a straight, level road at a <b>constant 25 m s⁻¹</b>. What is the resultant force on it?',
        [('Zero — the driving force balances drag and friction',1),
         ('25 N forwards',0),('Equal to its weight, downwards',0),
         ('Increasing with speed',0)],
        'Constant velocity means zero acceleration, so by Newton\'s first law the resultant force is zero: thrust balances resistive forces. A resultant force would change the velocity.')
    F1=1200*2.5
    L_.num('A <b>1200 kg</b> car accelerates at <b>2.5 m s⁻²</b>. Find the resultant force driving it.',
        rnd(F1,0),1,'N','Hint: F = ma = 1200 × 2.5.')
    W1=6.0*g
    L_.num('Find the weight of a <b>6.0 kg</b> mass on Earth (g = 9.81 m s⁻²).',
        rnd(W1,1),0.5,'N','Hint: W = mg = 6.0 × 9.81.')
    L_.teach('A.2 · Newton III','Newton\'s third law',
        P('<p><b>Third law:</b> if body A exerts a force on body B, then B exerts an <b>equal and opposite</b> force on A. The pair acts on <b>two different bodies</b> and is the <b>same type</b> of force.</p>',
          NOTE('<b>Classic trap:</b> the weight of a book and the table\'s normal force on it are <b>not</b> a third-law pair — they act on the <b>same</b> body. The third-law partner of the book\'s weight is the book\'s gravitational pull on the Earth.')))
    L_.mcq('A rifle fires a bullet forwards and recoils backwards. Which statement uses Newton\'s third law correctly?',
        [('The rifle pushes the bullet forwards; the bullet pushes the rifle backwards, equally',1),
         ('The bullet is lighter, so it feels a bigger force',0),
         ('The recoil force is larger than the force on the bullet',0),
         ('Momentum is created by firing',0)],
        'The forces form a third-law pair: equal magnitude, opposite direction, on the two bodies. The bullet accelerates more only because it has far less mass (a = F/m), not because the force is bigger.')
    L_.teach('A.2 · momentum & impulse','Momentum and impulse',
        P('<p><b>Linear momentum</b> p = mv is a vector (kg m s⁻¹). Newton\'s second law is really: resultant force = rate of change of momentum.</p>',
          E('p = mv    ·    impulse = FΔt = Δp','impulse (N s) equals the change in momentum'),
          '<p>On a <b>force–time graph</b>, the <b>area under the curve is the impulse</b> — handy when a force varies during a short collision.</p>',
          WORK('Worked example — a struck ball',
               'A 0.058 kg tennis ball is served from rest to 50 m s⁻¹ during a 5.0 ms contact.',
               'Δp = mΔv = 0.058 × 50 = 2.9 kg m s⁻¹',
               'F = Δp ÷ Δt = 2.9 ÷ 0.005 = <b>580 N</b>')))
    p1=0.15*40
    L_.num('A <b>0.15 kg</b> cricket ball travels at <b>40 m s⁻¹</b>. Find its momentum.',
        rnd(p1,1),0.3,'kg m s⁻¹','Hint: p = mv = 0.15 × 40.')
    Fimp=(0.058*50)/0.005
    L_.num('A <b>0.058 kg</b> ball is accelerated from rest to <b>50 m s⁻¹</b> in a contact time of <b>5.0 ms</b> (0.005 s). Find the average force.',
        rnd(Fimp,0),5,'N','Hint: F = Δp ÷ Δt = (0.058 × 50) ÷ 0.005.')
    L_.classify_game('Which of Newton\'s laws?',
        ('①  First law','②  Second law','③  Third law'),
        [['A puck glides at constant velocity on frictionless ice','g0'],
         ['A book on a table has zero resultant force','g0'],
         ['An object at rest stays at rest with no net force','g0'],
         ['Resultant force = mass × acceleration','g1'],
         ['Doubling the net force doubles the acceleration','g1'],
         ['A heavier trolley needs more force for the same acceleration','g1'],
         ['A swimmer pushes water back; water pushes the swimmer forward','g2'],
         ['A rocket expels gas down; the gas pushes the rocket up','g2'],
         ['The Earth pulls you down; you pull the Earth up equally','g2']],
        '🌟 Sorted! First = inertia/equilibrium, Second = F = ma, Third = equal-and-opposite pairs on two bodies.')
    L_.teach('A.2 · conservation','Conservation of momentum',
        P('<p>When <b>no external resultant force</b> acts, total momentum is <b>conserved</b>: total p before = total p after. This governs collisions and explosions.</p>',
          '<ul><li><b>Elastic</b> collision: kinetic energy is also conserved.</li>'
          '<li><b>Inelastic</b> collision: momentum is conserved but some KE becomes heat/sound; if the bodies stick together it is <b>perfectly inelastic</b>.</li></ul>',
          WORK('Worked example — a sticky collision',
               'A 2.0 kg trolley at 3.0 m s⁻¹ hits a stationary 1.0 kg trolley and they couple.',
               'p before = 2.0×3.0 + 0 = 6.0 kg m s⁻¹',
               'v after = 6.0 ÷ (2.0+1.0) = <b>2.0 m s⁻¹</b>')))
    vfin=(2.0*3.0)/(3.0)
    L_.num('A <b>2.0 kg</b> trolley moving at <b>3.0 m s⁻¹</b> collides with and sticks to a stationary <b>1.0 kg</b> trolley. Find their common velocity afterwards.',
        rnd(vfin,1),0.1,'m s⁻¹','Hint: momentum conserved — v = (2.0×3.0) ÷ (2.0+1.0).')
    L_.match_game('Match term to meaning',
        [['Product of mass and velocity (a vector)','Momentum'],
         ['Force multiplied by the time it acts','Impulse'],
         ['Total momentum unchanged with no external force','Conservation of momentum'],
         ['A collision in which kinetic energy is also conserved','Elastic collision']],
        '🌟 Matched! Impulse = FΔt = change in momentum; momentum is conserved whenever external forces net to zero.')
    if hl:
        vexp=(2.0*6.0)/3.0
        L_.teach('A.2 · HL depth','Explosions & 2-D momentum',
            P('<p>Momentum is a <b>vector</b>, so in two dimensions it is conserved <b>component by component</b> (x and y separately). In an <b>explosion</b> the total momentum stays zero if it started at rest, so fragments fly off with equal and opposite total momentum.</p>',
              NOTE('To test whether a collision is elastic, compare <b>½mv²</b> totals before and after. Momentum is always conserved in an isolated system; kinetic energy is only conserved if the collision is elastic.')),
            tag_class='ht')
        L_.num('HL: a stationary object splits into a <b>3.0 kg</b> piece and a <b>2.0 kg</b> piece. The 2.0 kg piece moves off at <b>6.0 m s⁻¹</b>. Find the speed of the 3.0 kg piece.',
            rnd(vexp,1),0.1,'m s⁻¹','Hint: total momentum stays zero → 3.0v = 2.0×6.0.')
    L_.recap([
        ('Newton I','no resultant force ⇒ rest or constant velocity (equilibrium)'),
        ('Newton II','resultant F = ma = rate of change of momentum'),
        ('Newton III','equal, opposite forces on two different bodies'),
        ('Momentum & impulse','p = mv; impulse = FΔt = Δp = area under a force–time graph'),
        ('Conservation','isolated system: total momentum before = after; KE extra-conserved only if elastic'),
    ])
    return render(L_)

def build_work_energy_power(level):
    L_=L(level,'work-energy-and-power','Work, Energy & Power','🔋','Theme A.3 Work, energy and power',
        'A thorough IB Diploma Physics %s mini-lesson on Theme A.3 Work, energy and power — work done by a force, kinetic and potential energy, conservation of energy, power and efficiency, aligned to the 2023 guide.'%level,
        '      <p class="big">This mini-lesson covers <b>Theme A.3 — Work, energy and power</b>: <b>work done</b> by a force, <b>kinetic</b> and <b>potential</b> energy, the <b>conservation of energy</b>, and <b>power</b> and <b>efficiency</b>.</p>',
        BANNER('work = Fs cosθ','KE &amp; PE','power &amp; efficiency'))
    L_.teach('A.3 · work','Work done by a force',
        P('<p><b>Work</b> is energy transferred when a force moves its point of application. Only the force component <b>along the displacement</b> does work.</p>',
          E('W = Fs cosθ','work (J) = force (N) × displacement (m) × cos(angle between them)'),
          NOTE('If the force is <b>perpendicular</b> to the motion (θ = 90°, cos90° = 0) it does <b>no work</b> — e.g. the tension in a string on a mass in circular motion, or the normal force on a sliding box.')))
    L_.mcq('A waiter carries a tray horizontally at constant height across a room. How much work does the upward force from their hand do on the tray?',
        [('Zero — the force is perpendicular to the horizontal motion',1),
         ('Equal to the tray\'s weight × distance walked',0),
         ('Negative and large',0),('Equal to the kinetic energy of the tray',0)],
        'The supporting force is vertical while the displacement is horizontal, so θ = 90° and W = Fs cos90° = 0. No work is done against gravity because the height does not change.')
    Wk=50*8
    L_.num('A person pushes a box with a steady <b>50 N</b> in the direction of motion, moving it <b>8.0 m</b>. Find the work done.',
        rnd(Wk,0),1,'J','Hint: W = Fs cosθ, with θ = 0 so cosθ = 1 → 50 × 8.0.')
    L_.teach('A.3 · energy stores','Kinetic and potential energy',
        P('<p>Two workhorse energy formulas:</p>',
          E('Eₖ = ½mv²    ·    ΔEₚ = mgΔh','kinetic energy · change in gravitational potential energy'),
          '<p>Elastic (spring) potential energy stores work done stretching a spring that obeys Hooke\'s law (F = kx):</p>',
          E('Eₚ = ½kΔx²','elastic potential energy in a spring of stiffness k'),
          WORK('Worked example — a falling mass',
               'A 2.0 kg mass falls Δh = 1.5 m. GPE released:',
               'ΔEₚ = mgΔh = 2.0 × 9.81 × 1.5 = <b>29.4 J</b> (this becomes kinetic energy)')))
    KE=0.5*1500*20**2/1000
    L_.num('A <b>1500 kg</b> car travels at <b>20 m s⁻¹</b>. Find its kinetic energy, in <b>kilojoules (kJ)</b>.',
        rnd(KE,0),3,'kJ','Hint: Eₖ = ½mv² = ½ × 1500 × 20² = 300000 J; ÷1000 for kJ.')
    GPE=2.0*g*1.5
    L_.num('Find the gain in gravitational potential energy when a <b>2.0 kg</b> mass is lifted <b>1.5 m</b> (g = 9.81 m s⁻²).',
        rnd(GPE,1),0.5,'J','Hint: ΔEₚ = mgΔh = 2.0 × 9.81 × 1.5.')
    L_.classify_game('Which unit measures it?',
        ('⚡ Joules (J)','🔌 Watts (W)','➡️ Newtons (N)'),
        [['Work done','g0'],['Kinetic energy','g0'],['Gravitational PE','g0'],
         ['Power','g1'],['Rate of energy transfer','g1'],['Luminosity of a star','g1'],
         ['Weight','g2'],['Tension','g2'],['Friction force','g2']],
        '🌟 Sorted! Energy and work are in joules, power (energy per second) in watts, force in newtons.')
    L_.teach('A.3 · power & efficiency','Power and efficiency',
        P('<p><b>Power</b> is the rate of energy transfer (or rate of doing work), in watts (1 W = 1 J s⁻¹). For a force pushing something at speed v: P = Fv.</p>',
          E('P = W ÷ t = Fv    ·    efficiency = useful output ÷ total input','efficiency is a ratio (× 100 for %) and is always < 1 for real machines'),
          NOTE('The wasted energy has not vanished — <b>total energy is conserved</b>. It is usually transferred to the surroundings as heat (thermal energy) and is no longer useful.')))
    Pw=6000/4
    L_.num('A motor transfers <b>6000 J</b> of energy in <b>4.0 s</b>. Find its power output.',
        rnd(Pw,0),5,'W','Hint: P = W ÷ t = 6000 ÷ 4.0.')
    eff=240/800*100
    L_.num('A machine takes in <b>800 J</b> and delivers <b>240 J</b> of useful energy. Find its efficiency as a <b>percentage</b>.',
        rnd(eff,0),1,'%','Hint: efficiency = useful ÷ total × 100 = 240 ÷ 800 × 100.')
    L_.match_game('Match the formula to the quantity',
        [['½mv²','Kinetic energy'],
         ['mgΔh','Gravitational potential energy'],
         ['Fs cosθ','Work done'],
         ['Fv','Power']],
        '🌟 Matched! Energy is measured in joules; power is the rate of energy transfer in watts.')
    L_.recap([
        ('Work','W = Fs cosθ; zero when force ⟂ motion'),
        ('Energy','Eₖ = ½mv² · ΔEₚ = mgΔh · elastic Eₚ = ½kΔx²'),
        ('Conservation','energy is never lost, only transferred (often wasted as heat)'),
        ('Power','P = W ÷ t = Fv, in watts'),
        ('Efficiency','useful output ÷ total input, always < 1 for real machines'),
    ])
    return render(L_)

def build_thermal(level):
    L_=L(level,'thermal-energy-transfers','Thermal Energy Transfers','🌡️','Theme B.1 Thermal energy transfers',
        'A thorough IB Diploma Physics %s mini-lesson on Theme B.1 Thermal energy transfers and B.2 the greenhouse effect — internal energy, specific heat capacity, latent heat, conduction/convection/radiation and the greenhouse effect, aligned to the 2023 guide.'%level,
        '      <p class="big">This mini-lesson covers <b>Theme B.1 — Thermal energy transfers</b> (with <b>B.2, the greenhouse effect</b>): temperature and <b>internal energy</b>, <b>specific heat capacity</b>, <b>latent heat</b> and phase change, the three transfer mechanisms, and how greenhouse gases warm the Earth.</p>',
        BANNER('Q = mcΔT','latent heat Q = mL','greenhouse effect'))
    L_.teach('B.1 · temperature','Temperature and internal energy',
        P('<p><b>Temperature</b> (in kelvin) is a measure of the <b>average kinetic energy</b> of a substance\'s particles. The <b>internal energy</b> of a body is the total <b>kinetic + potential</b> energy of all its particles.</p>',
          E('T(K) = θ(°C) + 273','absolute zero, 0 K = −273 °C, is where particle KE is a minimum'),
          NOTE('Two objects at the same temperature have the same <b>average</b> particle KE. A bath of warm water can hold far more <b>internal energy</b> than a spark at 1000 °C because it contains vastly more particles.')))
    L_.mcq('A spark at 800 °C lands on your skin and barely hurts, yet 60 °C bath water would scald. Why?',
        [('The bath water contains far more particles, so it transfers much more internal energy',1),
         ('The spark is actually colder',0),
         ('Temperature and internal energy are the same thing',0),
         ('Skin conducts sparks away instantly',0)],
        'Temperature reflects the average particle KE, but the total internal energy also depends on how many particles there are. The tiny spark holds very little energy despite its high temperature.')
    tK=27+273
    L_.num('Convert <b>27 °C</b> to an absolute temperature in kelvin.',
        rnd(tK,0),0.5,'K','Hint: T(K) = θ(°C) + 273 = 27 + 273.')
    L_.teach('B.1 · specific heat','Specific heat capacity',
        P('<p>The <b>specific heat capacity</b> c is the energy needed to raise <b>1 kg</b> of a substance by <b>1 K</b> (no phase change). Water\'s is large: 4180 J kg⁻¹ K⁻¹.</p>',
          E('Q = mcΔT','energy (J) = mass (kg) × specific heat capacity × temperature change'),
          WORK('Worked example — heating water',
               'Heat 0.50 kg of water (c = 4180 J kg⁻¹ K⁻¹) by 20 K.',
               'Q = mcΔT = 0.50 × 4180 × 20 = 41800 J = <b>41.8 kJ</b>')))
    Q1=0.5*4180*20/1000
    L_.num('How much energy (in <b>kJ</b>) is needed to heat <b>0.50 kg</b> of water by <b>20 K</b>? Use c = 4180 J kg⁻¹ K⁻¹.',
        rnd(Q1,1),0.5,'kJ','Hint: Q = mcΔT = 0.50 × 4180 × 20 (then ÷1000).')
    dT3=8360/(0.2*4180)
    L_.num('<b>8360 J</b> is supplied to <b>0.20 kg</b> of water (c = 4180 J kg⁻¹ K⁻¹). Find the temperature rise ΔT.',
        rnd(dT3,0),0.5,'K','Hint: rearrange Q = mcΔT → ΔT = Q ÷ (mc) = 8360 ÷ (0.20 × 4180).')
    L_.teach('B.1 · latent heat','Latent heat & phase change',
        P('<p>During a <b>phase change</b> (melting or boiling) the temperature stays <b>constant</b> — the energy goes into breaking bonds (particle potential energy), not raising KE.</p>',
          E('Q = mL','energy = mass × specific latent heat (of fusion, or of vaporisation)'),
          NOTE('Ice → water uses the specific latent heat of <b>fusion</b> (3.34 × 10⁵ J kg⁻¹ for water). Water → steam uses the larger latent heat of <b>vaporisation</b>. On a heating graph these appear as flat plateaus.')))
    Q2=0.2*3.34e5/1000
    L_.num('How much energy (in <b>kJ</b>) melts <b>0.20 kg</b> of ice at 0 °C? Specific latent heat of fusion = 3.34 × 10⁵ J kg⁻¹.',
        rnd(Q2,1),0.6,'kJ','Hint: Q = mL = 0.20 × 334000 (then ÷1000).')
    L_.classify_game('Which transfer mechanism?',
        ('🔥 Conduction','💨 Convection','☀️ Radiation'),
        [['Heat travels along a metal spoon in hot soup','g0'],
         ['Energy passes through a solid brick wall','g0'],
         ['Needs particles in direct contact','g0'],
         ['Warm air rises above a heater','g1'],
         ['A sea breeze forms as fluid currents circulate','g1'],
         ['Moving fluid carries energy with it','g1'],
         ['The Sun warms the Earth across empty space','g2'],
         ['Infrared reaches you from a glowing fire','g2'],
         ['No medium is required to transfer the energy','g2']],
        '🌟 Sorted! Conduction needs contact, convection needs a moving fluid, radiation needs no medium at all.')
    L_.teach('B.2 · greenhouse','The greenhouse effect',
        P('<p><b>Theme B.2:</b> the Sun radiates mostly short-wavelength (visible) light that warms the Earth. The Earth re-radiates longer-wavelength <b>infrared</b>. <b>Greenhouse gases</b> — CO₂, CH₄, H₂O and N₂O — absorb this infrared and re-emit it in all directions, keeping the surface warmer.</p>',
          NOTE('Each greenhouse gas absorbs infrared at wavelengths matching the natural vibration frequencies of its molecules. Raising their concentration enhances the effect — the physics behind global warming. The Earth\'s <b>albedo</b> (fraction of light reflected) also affects the balance.')))
    L_.mcq('Why do greenhouse gases warm the Earth\'s surface?',
        [('They absorb outgoing infrared and re-emit some of it back towards the surface',1),
         ('They stop sunlight reaching the ground',0),
         ('They cool the upper atmosphere only',0),
         ('They increase the Earth\'s albedo',0)],
        'Greenhouse gases are largely transparent to incoming visible light but absorb the longer-wavelength infrared the warm Earth radiates, then re-emit it in all directions — some returns to the surface, raising its temperature.')
    L_.match_game('Match term to meaning',
        [['Energy to raise 1 kg by 1 K (no phase change)','Specific heat capacity'],
         ['Energy to change the phase of 1 kg at constant T','Specific latent heat'],
         ['Average kinetic energy of the particles','Temperature'],
         ['Total kinetic + potential energy of all particles','Internal energy']],
        '🌟 Matched! Temperature is an average per particle; internal energy is the total; latent heat drives phase change at constant temperature.')
    L_.recap([
        ('Temperature','average particle KE; T(K) = θ(°C) + 273'),
        ('Specific heat','Q = mcΔT (no phase change)'),
        ('Latent heat','Q = mL; temperature constant during melting/boiling'),
        ('Transfer','conduction (contact) · convection (fluid flow) · radiation (no medium)'),
        ('Greenhouse effect','gases absorb & re-emit Earth\'s infrared, warming the surface'),
    ])
    return render(L_)

def build_gas_laws(level):
    L_=L(level,'gas-laws-and-kinetic-theory','Gas Laws & Kinetic Theory','🎈','Theme B.3 Gas laws',
        'A thorough IB Diploma Physics %s mini-lesson on Theme B.3 Gas laws — the ideal gas equation pV = nRT, the gas laws of Boyle and Charles, and the kinetic theory of gases, aligned to the 2023 guide.'%level,
        '      <p class="big">This mini-lesson covers <b>Theme B.3 — Gas laws</b>: the <b>ideal gas equation</b> pV = nRT, the experimental <b>gas laws</b> (Boyle, Charles, pressure law), and the <b>kinetic theory</b> that explains them from molecular motion.</p>',
        BANNER('pV = nRT','Boyle · Charles','kinetic theory'))
    L_.teach('B.3 · ideal gas','The ideal gas equation',
        P('<p>An <b>ideal gas</b> obeys the equation of state linking pressure, volume, amount and temperature:</p>',
          E('pV = nRT','p (Pa) · V (m³) · n (mol) · R = 8.31 J mol⁻¹ K⁻¹ · T (K, always!)'),
          NOTE('Temperature <b>must be in kelvin</b> in every gas calculation. The number of moles n = N ÷ N_A, where N is the number of molecules and N_A = 6.02 × 10²³ mol⁻¹.')))
    L_.mcq('A sealed rigid container of ideal gas is heated. Which of these must you convert before using pV = nRT?',
        [('The temperature — it must be in kelvin',1),
         ('The pressure — it must be in atmospheres',0),
         ('The volume — it must be in litres',0),
         ('The amount — it must be in grams',0)],
        'The absolute temperature in kelvin is required (a Celsius value would give nonsense). SI units are pascals, cubic metres and moles, but the classic exam slip is forgetting to convert °C to K.')
    n=1e5*0.024/(8.31*290)
    L_.num('Find the amount of gas (in <b>mol</b>) when p = <b>1.0 × 10⁵ Pa</b>, V = <b>0.024 m³</b> and T = <b>290 K</b>. Use R = 8.31.',
        rnd(n,2),0.08,'mol','Hint: n = pV ÷ (RT) = (1.0e5 × 0.024) ÷ (8.31 × 290).')
    L_.teach('B.3 · gas laws','Boyle\'s and Charles\'s laws',
        P('<p>Holding one quantity fixed gives the experimental gas laws:</p>',
          '<ul><li><b>Boyle\'s law</b> (constant T): p ∝ 1/V, so <b>p₁V₁ = p₂V₂</b>.</li>'
          '<li><b>Charles\'s law</b> (constant p): V ∝ T, so <b>V₁/T₁ = V₂/T₂</b>.</li>'
          '<li><b>Pressure law</b> (constant V): p ∝ T, so <b>p₁/T₁ = p₂/T₂</b>.</li></ul>',
          WORK('Worked example — Boyle\'s law',
               'Gas at 100 kPa fills 2.0 L. Compress it to 0.50 L at constant temperature.',
               'p₂ = p₁V₁ ÷ V₂ = 100 × 2.0 ÷ 0.50 = <b>400 kPa</b>')))
    p2=100*2.0/0.5
    L_.num('A gas at <b>100 kPa</b> occupies <b>2.0 L</b>. It is compressed at constant temperature to <b>0.50 L</b>. Find the new pressure (kPa).',
        rnd(p2,0),3,'kPa','Hint: Boyle — p₂ = p₁V₁ ÷ V₂ = 100 × 2.0 ÷ 0.50.')
    V2=0.30*400/300
    L_.num('A gas occupies <b>0.30 m³</b> at <b>300 K</b>. It is heated at constant pressure to <b>400 K</b>. Find the new volume (m³).',
        rnd(V2,2),0.02,'m³','Hint: Charles — V₂ = V₁ × T₂ ÷ T₁ = 0.30 × 400 ÷ 300.')
    L_.classify_game('Which gas law is being used?',
        ("🔒 Boyle (const T)","🌡️ Charles (const p)","📦 Pressure law (const V)"),
        [['p ∝ 1/V','g0'],['Squeezing a sealed syringe raises the pressure','g0'],['p₁V₁ = p₂V₂','g0'],
         ['V ∝ T','g1'],['A balloon expands when warmed','g1'],['V₁/T₁ = V₂/T₂','g1'],
         ['p ∝ T','g2'],['A sealed can heated in a fire may burst','g2'],['p₁/T₁ = p₂/T₂','g2']],
        '🌟 Sorted! Fix T → Boyle, fix p → Charles, fix V → pressure law. Each keeps one variable constant.')
    L_.teach('B.3 · kinetic theory','Kinetic theory of gases',
        P('<p>Kinetic theory models a gas as many tiny molecules in <b>random</b> motion. Pressure arises from countless <b>collisions with the walls</b>. The model assumes point molecules, no intermolecular forces, and perfectly elastic collisions.</p>',
          E('average KE = (3/2)kT','k = 1.38 × 10⁻²³ J K⁻¹ (Boltzmann constant); KE ∝ absolute temperature'),
          NOTE('This links the microscopic and macroscopic: the average translational kinetic energy of a molecule depends <b>only</b> on the absolute temperature — not on the type of gas.')))
    KE21=1.5*1.38e-23*300/1e-21
    L_.num('Find the average translational kinetic energy of a molecule at <b>300 K</b>, in units of <b>10⁻²¹ J</b>. Use k = 1.38 × 10⁻²³ J K⁻¹.',
        rnd(KE21,2),0.1,'× 10⁻²¹ J','Hint: KE = (3/2)kT = 1.5 × 1.38e-23 × 300 = 6.21e-21 J → 6.21.')
    L_.match_game('Match the statement to its name',
        [['p₁V₁ = p₂V₂ at constant temperature','Boyle\'s law'],
         ['V/T is constant at constant pressure','Charles\'s law'],
         ['Average molecular KE = (3/2)kT','Kinetic theory'],
         ['pV = nRT','Ideal gas equation']],
        '🌟 Matched! The gas laws are special cases of pV = nRT; kinetic theory explains them from molecular collisions.')
    L_.recap([
        ('Ideal gas','pV = nRT; T always in kelvin; n = N ÷ N_A'),
        ('Boyle','constant T: p₁V₁ = p₂V₂'),
        ('Charles / pressure law','V ∝ T (const p) · p ∝ T (const V)'),
        ('Kinetic theory','pressure from wall collisions; average KE = (3/2)kT'),
        ('Key idea','average molecular KE depends only on absolute temperature'),
    ])
    return render(L_)

def build_circuits(level):
    L_=L(level,'electric-current-and-circuits','Electric Current & Circuits','🔌','Theme B.5 Current and circuits',
        'A thorough IB Diploma Physics %s mini-lesson on Theme B.5 Current and circuits — current, potential difference and resistance, Ohm\'s law, electrical power, series and parallel circuits and internal resistance, aligned to the 2023 guide.'%level,
        '      <p class="big">This mini-lesson covers <b>Theme B.5 — Current and circuits</b>: <b>current</b>, <b>potential difference</b> and <b>resistance</b>, <b>Ohm\'s law</b>, electrical <b>power</b>, <b>series and parallel</b> networks, and <b>emf with internal resistance</b>.</p>',
        BANNER('V = IR','power = VI','series &amp; parallel'))
    L_.teach('B.5 · basics','Current, pd and resistance',
        P('<p><b>Current</b> I is the rate of flow of charge; <b>potential difference</b> V is the energy transferred per coulomb; <b>resistance</b> R opposes the flow.</p>',
          E('I = Δq ÷ Δt    ·    V = IR','current (A) · charge (C) · pd (V) · resistance (Ω)'),
          NOTE('An <b>ohmic</b> conductor at constant temperature has V ∝ I (a straight line through the origin). A filament lamp is <b>non-ohmic</b>: it gets hotter and its resistance rises, so the graph curves.')))
    L_.mcq('The current–voltage graph for a metal wire at constant temperature is a straight line through the origin. What does this show?',
        [('It is ohmic — resistance is constant, V ∝ I',1),
         ('Its resistance increases with current',0),
         ('It stores charge like a capacitor',0),
         ('Current is independent of voltage',0)],
        'A straight line through the origin means V is directly proportional to I, so R = V/I is constant — the definition of ohmic behaviour, provided temperature stays constant.')
    V1=0.25*48
    L_.num('A resistor of <b>48 Ω</b> carries a current of <b>0.25 A</b>. Find the potential difference across it.',
        rnd(V1,0),0.5,'V','Hint: V = IR = 0.25 × 48.')
    Q=2.0*300
    L_.num('A current of <b>2.0 A</b> flows for <b>5.0 minutes</b>. Find the charge that passes (in coulombs).',
        rnd(Q,0),2,'C','Hint: Q = It, with t = 5.0 × 60 = 300 s → 2.0 × 300.')
    L_.teach('B.5 · power','Electrical power',
        P('<p>Electrical <b>power</b> is the rate of energy transfer. Three equivalent forms (combine with V = IR):</p>',
          E('P = VI = I²R = V² ÷ R','power in watts (W)'),
          WORK('Worked example — a kettle',
               'A kettle runs at 230 V drawing 3.0 A.',
               'P = VI = 230 × 3.0 = <b>690 W</b>')))
    P1=230*3.0
    L_.num('A heater operates at <b>230 V</b> and draws <b>3.0 A</b>. Find its power.',
        rnd(P1,0),3,'W','Hint: P = VI = 230 × 3.0.')
    L_.teach('B.5 · networks','Series and parallel',
        P('<p>Two arrangements, with opposite rules:</p>',
          '<ul><li><b>Series:</b> same <b>current</b> everywhere; pds add; resistances add: R = R₁ + R₂ + …</li>'
          '<li><b>Parallel:</b> same <b>pd</b> across each branch; currents add at junctions; 1/R = 1/R₁ + 1/R₂ + …</li></ul>',
          NOTE('Adding resistors in <b>parallel</b> gives a total resistance <b>smaller</b> than the smallest branch — there are more paths for charge to flow.')))
    Rs=10+20+30
    L_.num('Three resistors of <b>10 Ω</b>, <b>20 Ω</b> and <b>30 Ω</b> are connected in <b>series</b>. Find the total resistance.',
        rnd(Rs,0),0.5,'Ω','Hint: in series, R = R₁ + R₂ + R₃ = 10 + 20 + 30.')
    Rp=1/(1/6+1/6)
    L_.num('Two <b>6.0 Ω</b> resistors are connected in <b>parallel</b>. Find the total resistance.',
        rnd(Rp,1),0.1,'Ω','Hint: 1/R = 1/6 + 1/6 = 2/6, so R = 3.0 Ω.')
    L_.classify_game('Series, parallel, or always true?',
        ('🔗 True in series','🌿 True in parallel','✔️ Always true'),
        [['The current is the same through every component','g0'],
         ['Resistances add: R = R₁ + R₂','g0'],
         ['One break stops the whole circuit','g0'],
         ['The pd is the same across each branch','g1'],
         ['Branch currents add at a junction','g1'],
         ['Total resistance is less than the smallest resistor','g1'],
         ['V = IR for each resistor','g2'],
         ['Power P = VI','g2'],
         ['Charge Q = It','g2']],
        '🌟 Sorted! Series shares current, parallel shares pd, and V = IR, P = VI, Q = It hold everywhere.')
    Vterm=(12/(5+1))*5
    L_.teach('B.5 · internal resistance','EMF and internal resistance',
        P('<p>A real cell has an internal resistance r, so some energy is lost inside it. Its <b>emf</b> ε is the total energy per coulomb; the <b>terminal pd</b> is what the external circuit gets.</p>',
          E('ε = I(R + r) = V + Ir','emf = terminal pd + "lost volts" across r'),
          WORK('Worked example — a loaded cell',
               'A cell of emf 12 V and internal resistance r = 1.0 Ω drives a 5.0 Ω resistor.',
               'I = ε ÷ (R + r) = 12 ÷ 6.0 = 2.0 A',
               'Terminal pd = IR = 2.0 × 5.0 = <b>10 V</b>')))
    L_.num('A cell of emf <b>12 V</b> and internal resistance <b>1.0 Ω</b> is connected to a <b>5.0 Ω</b> resistor. Find the terminal pd across the resistor.',
        rnd(Vterm,0),0.5,'V','Hint: I = 12 ÷ (5.0+1.0) = 2.0 A; terminal pd = IR = 2.0 × 5.0.')
    L_.match_game('Match the equation to its meaning',
        [['I = Δq ÷ Δt','Electric current'],
         ['V = IR','Ohm\'s law'],
         ['P = I²R','Power dissipated'],
         ['ε = I(R + r)','EMF with internal resistance']],
        '🌟 Matched! V = IR defines resistance; power has three equivalent forms; a real cell loses "Ir" volts inside.')
    L_.recap([
        ('Basics','I = Δq/Δt; V = IR; ohmic ⇒ constant R'),
        ('Power','P = VI = I²R = V²/R'),
        ('Series','same current; resistances add'),
        ('Parallel','same pd; 1/R = Σ1/Rᵢ; total < smallest'),
        ('Real cells','ε = I(R + r); terminal pd = ε − Ir'),
    ])
    return render(L_)

def build_shm(level):
    hl=(level=='HL')
    L_=L(level,'simple-harmonic-motion','Simple Harmonic Motion','⏳','Theme C.1 Simple harmonic motion',
        'A thorough IB Diploma Physics %s mini-lesson on Theme C.1 Simple harmonic motion — the defining condition, period and frequency, the pendulum and mass-spring systems, and energy in SHM, aligned to the 2023 guide.'%level,
        '      <p class="big">This mini-lesson covers <b>Theme C.1 — Simple harmonic motion</b>: the <b>defining condition</b> a ∝ −x, <b>period and frequency</b>, the <b>pendulum</b> and <b>mass-spring</b> systems, and the interchange of <b>kinetic and potential energy</b>.</p>',
        BANNER('a ∝ −x','pendulum &amp; spring','energy in SHM'))
    L_.teach('C.1 · definition','What makes motion "simple harmonic"?',
        P('<p>An object performs <b>simple harmonic motion (SHM)</b> when its acceleration is (i) <b>proportional to</b> its displacement from equilibrium and (ii) always directed <b>back towards</b> equilibrium.</p>',
          E('a ∝ −x','the minus sign means the restoring acceleration opposes the displacement'),
          NOTE('Examples: a pendulum (small swings) and a mass on a spring. At the extremes the displacement, restoring force and acceleration are greatest; at the centre they are zero but the speed is greatest.')))
    L_.mcq('For a mass on a spring undergoing SHM, where is the acceleration greatest and where is the speed greatest?',
        [('Acceleration greatest at the extremes; speed greatest at equilibrium',1),
         ('Both greatest at the extremes',0),
         ('Both greatest at equilibrium',0),
         ('Acceleration greatest at equilibrium; speed greatest at the extremes',0)],
        'Since a ∝ −x, acceleration peaks where |x| is largest (the extremes) and is zero at equilibrium — where, having accelerated the whole way in, the mass is moving fastest.')
    L_.teach('C.1 · period','Period, frequency and the two systems',
        P('<p><b>Period</b> T is the time for one full oscillation; <b>frequency</b> f is oscillations per second. They are reciprocals: T = 1/f.</p>',
          E('T = 2π√(L ÷ g)    ·    T = 2π√(m ÷ k)','simple pendulum (length L) · mass–spring (mass m, stiffness k)'),
          WORK('Worked example — a seconds pendulum',
               'A pendulum of length L = 1.0 m, with g = 9.81 m s⁻².',
               'T = 2π√(1.0 ÷ 9.81) = 2π × 0.319 = <b>2.0 s</b>')))
    Tp=2*math.pi*math.sqrt(1.0/g)
    L_.num('Find the period of a simple pendulum of length <b>1.0 m</b> (g = 9.81 m s⁻²).',
        rnd(Tp,2),0.05,'s','Hint: T = 2π√(L ÷ g) = 2π√(1.0 ÷ 9.81).')
    fq=1/0.5
    L_.num('An oscillator has a period of <b>0.50 s</b>. Find its frequency.',
        rnd(fq,1),0.1,'Hz','Hint: f = 1 ÷ T = 1 ÷ 0.50.')
    Tms=2*math.pi*math.sqrt(0.20/80)
    L_.num('A <b>0.20 kg</b> mass oscillates on a spring of stiffness <b>80 N m⁻¹</b>. Find the period.',
        rnd(Tms,2),0.03,'s','Hint: T = 2π√(m ÷ k) = 2π√(0.20 ÷ 80).')
    L_.classify_game('Effect on a pendulum\'s period T',
        ('⬆️ Increases T','⬇️ Decreases T','➖ No effect on T'),
        [['Use a longer string','g0'],['Take it to the Moon (smaller g)','g0'],['Quadruple the length','g0'],
         ['Shorten the string','g1'],['Move to a planet with larger g','g1'],['Halve the length','g1'],
         ['Increase the bob\'s mass','g2'],['Increase the amplitude (small swings)','g2'],['Paint the bob a different colour','g2']],
        '🌟 Sorted! T = 2π√(L ÷ g) depends only on length and g — not on mass or (for small swings) amplitude.')
    L_.teach('C.1 · energy','Energy in SHM',
        P('<p>During SHM, energy shuttles between <b>kinetic</b> and <b>potential</b> stores while the <b>total</b> stays constant (ignoring damping).</p>',
          '<ul><li>At the <b>extremes</b>: all energy is potential (KE = 0).</li>'
          '<li>At <b>equilibrium</b>: all energy is kinetic (PE at minimum), so speed is maximum.</li></ul>',
          NOTE('A graph of KE and PE against displacement shows two parabolas that cross at x = 0; their sum is a flat line — the constant total energy.')))
    L_.mcq('A child on a swing is a good approximation to SHM. As they pass through the lowest point, what is true of their energy?',
        [('Kinetic energy is maximum and gravitational PE is at its minimum',1),
         ('Kinetic energy is zero',0),
         ('Potential energy is maximum',0),
         ('Total energy is momentarily zero',0)],
        'At the lowest point the swing moves fastest (maximum KE) and is at its lowest height (minimum PE). The total mechanical energy is constant throughout if we ignore friction and air resistance.')
    L_.match_game('Match term to meaning',
        [['Time for one complete oscillation','Period'],
         ['Number of oscillations per second','Frequency'],
         ['Maximum displacement from equilibrium','Amplitude'],
         ['Acceleration proportional to and opposite displacement','Defining condition of SHM']],
        '🌟 Matched! T = 1/f; amplitude sets the size of the swing; a ∝ −x is what makes the motion simple harmonic.')
    if hl:
        omega=math.sqrt(200/0.5); vmax=omega*0.03
        L_.teach('C.1 · HL depth','The SHM equations',
            P('<p>At HL the motion is described quantitatively using the <b>angular frequency</b> ω = 2πf:</p>',
              E('a = −ω²x    ·    v = ±ω√(x₀² − x²)    ·    v_max = ωx₀','x₀ is the amplitude'),
              '<p>Total energy E_T = ½mω²x₀², and kinetic energy E_K = ½mω²(x₀² − x²). Displacement follows x = x₀ sin(ωt) or x = x₀ cos(ωt) depending on the start point.</p>',
              NOTE('v_max occurs at the centre (x = 0); a_max = ω²x₀ occurs at the extremes (x = ±x₀).')),
            tag_class='ht')
        L_.num('HL: a <b>0.50 kg</b> mass on a <b>200 N m⁻¹</b> spring oscillates with amplitude <b>0.030 m</b>. Find the maximum speed. (ω = √(k/m).)',
            rnd(vmax,2),0.03,'m s⁻¹','Hint: ω = √(200 ÷ 0.50) = 20 rad s⁻¹; v_max = ωx₀ = 20 × 0.030.')
    L_.recap([
        ('SHM condition','a ∝ −x: acceleration proportional to, and opposite, displacement'),
        ('Period','T = 1/f; pendulum T = 2π√(L/g); spring T = 2π√(m/k)'),
        ('Energy','KE ↔ PE interchange; total constant; v max at centre, a max at extremes'),
        ('Independence','pendulum period does not depend on mass or (small) amplitude'),
        ('HL','a = −ω²x · v = ±ω√(x₀²−x²) · v_max = ωx₀') if hl else ('Damping','real oscillators lose energy and the amplitude decays'),
    ])
    return render(L_)

def build_wave_behaviour(level):
    hl=(level=='HL')
    L_=L(level,'wave-behaviour','Wave Behaviour','🌊','Themes C.2–C.5 Wave behaviour',
        'A thorough IB Diploma Physics %s mini-lesson on Themes C.2–C.5 Wave behaviour — the wave model and v = fλ, reflection, refraction and Snell\'s law, diffraction and interference, standing waves and resonance, and the Doppler effect, aligned to the 2023 guide.'%level,
        '      <p class="big">This mini-lesson covers <b>Themes C.2–C.5 — Wave behaviour</b>: the <b>wave model</b> and v = fλ, <b>reflection & refraction</b> (Snell\'s law), <b>diffraction & interference</b>, <b>standing waves & resonance</b>, and the <b>Doppler effect</b>.</p>',
        BANNER('v = fλ','refraction &amp; interference','Doppler'))
    L_.teach('C.2 · the wave model','Describing waves',
        P('<p>A wave transfers <b>energy</b> without transferring matter. Two types:</p>',
          '<ul><li><b>Transverse:</b> oscillations are <b>perpendicular</b> to travel (light, water surface, waves on a string).</li>'
          '<li><b>Longitudinal:</b> oscillations are <b>parallel</b> to travel (sound, compression waves).</li></ul>',
          E('v = fλ','wave speed (m s⁻¹) = frequency (Hz) × wavelength (m)'),
          NOTE('Amplitude sets the energy; wavelength is the distance between adjacent in-phase points; frequency is set by the source and does not change when the wave enters a new medium.')))
    L_.mcq('Sound travelling through air is which kind of wave?',
        [('Longitudinal — the air oscillates back and forth along the direction of travel',1),
         ('Transverse — the air oscillates at right angles to travel',0),
         ('It is not a wave',0),
         ('Both transverse and longitudinal at once',0)],
        'Sound is a longitudinal pressure wave: the air is alternately compressed and rarefied along the direction the sound travels. Light and string waves are transverse.')
    vfl=50*6.0
    L_.num('A wave has frequency <b>50 Hz</b> and wavelength <b>6.0 m</b>. Find its speed.',
        rnd(vfl,0),1,'m s⁻¹','Hint: v = fλ = 50 × 6.0.')
    lam=340/170
    L_.num('A sound wave of frequency <b>170 Hz</b> travels at <b>340 m s⁻¹</b>. Find its wavelength.',
        rnd(lam,1),0.1,'m','Hint: λ = v ÷ f = 340 ÷ 170.')
    L_.teach('C.3 · refraction','Reflection, refraction & Snell\'s law',
        P('<p>At a boundary a wave can <b>reflect</b> (angle in = angle out) and <b>refract</b> (change direction because its speed changes). The <b>refractive index</b> n = c ÷ v. Snell\'s law links the angles:</p>',
          E('n₁ sinθ₁ = n₂ sinθ₂    ·    n = c ÷ v','angles measured from the normal'),
          WORK('Worked example — refractive index',
               'Light travels at v = 2.0 × 10⁸ m s⁻¹ in a glass.',
               'n = c ÷ v = 3.0 × 10⁸ ÷ 2.0 × 10⁸ = <b>1.5</b>')))
    nidx=3.0e8/2.0e8
    L_.num('Light travels at <b>2.0 × 10⁸ m s⁻¹</b> inside a transparent block. Using c = 3.0 × 10⁸ m s⁻¹, find its refractive index.',
        rnd(nidx,1),0.05,'','Hint: n = c ÷ v = 3.0e8 ÷ 2.0e8.')
    th2=math.degrees(math.asin(math.sin(math.radians(30))/1.5))
    L_.num('Light in air (n = 1.0) hits glass (n = 1.5) at <b>30°</b> to the normal. Find the angle of refraction in the glass.',
        rnd(th2,1),1.0,'°','Hint: n₁sinθ₁ = n₂sinθ₂ → sinθ₂ = (1.0 × sin30) ÷ 1.5; θ₂ = sin⁻¹(0.333).')
    L_.mcq('When light passes from air into glass it slows down. How does the ray bend?',
        [('Towards the normal',1),('Away from the normal',0),
         ('It does not bend',0),('It reflects straight back',0)],
        'Entering a denser (higher-n) medium the wave slows and bends towards the normal. Going the other way (glass to air) it speeds up and bends away from the normal.')
    L_.teach('C.3 · interference','Diffraction & interference',
        P('<p><b>Diffraction</b> is the spreading of waves through a gap or around an edge — most pronounced when the gap is about one wavelength wide. When two coherent waves overlap they <b>interfere</b>:</p>',
          '<ul><li><b>Constructive</b> (bright/loud): path difference = nλ.</li>'
          '<li><b>Destructive</b> (dark/quiet): path difference = (n + ½)λ.</li></ul>',
          E('s = λD ÷ d','two-slit fringe spacing s, slit separation d, screen distance D'),
          NOTE('Young\'s double-slit experiment is the classic demonstration that light is a wave: bright and dark fringes appear where light adds or cancels.')))
    s=600e-9*2.0/0.5e-3*1000
    L_.num('In a double-slit experiment λ = <b>600 nm</b>, slit separation d = <b>0.50 mm</b>, screen distance D = <b>2.0 m</b>. Find the fringe spacing s, in <b>mm</b>.',
        rnd(s,1),0.2,'mm','Hint: s = λD ÷ d = (600e-9 × 2.0) ÷ 0.50e-3 = 2.4e-3 m = 2.4 mm.')
    L_.classify_game('Sort each item',
        ('↕️ Transverse wave','↔️ Longitudinal wave','📐 Wave quantity'),
        [['Light','g0'],['Ripples on a water surface','g0'],['A wave on a guitar string','g0'],
         ['Sound in air','g1'],['A compression pulse along a spring','g1'],['Ultrasound','g1'],
         ['Wavelength','g2'],['Frequency','g2'],['Amplitude','g2']],
        '🌟 Sorted! Transverse oscillates across the travel direction, longitudinal along it, and λ, f, amplitude describe any wave.')
    L_.teach('C.4 · standing waves','Standing waves & resonance',
        P('<p>A <b>standing (stationary) wave</b> forms when two identical waves travel in opposite directions (e.g. a wave and its reflection) and superpose. It has fixed <b>nodes</b> (no motion) and <b>antinodes</b> (maximum motion) — no net energy is transported.</p>',
          '<ul><li>String fixed at both ends: fundamental wavelength λ = 2L; harmonics at L, 2L/3, …</li>'
          '<li><b>Resonance</b>: driving a system at its natural frequency gives a large-amplitude standing wave.</li></ul>',
          NOTE('Unlike a travelling wave, in a standing wave the nodes stay put and all points between two nodes oscillate in phase.')))
    L_.mcq('Which statement about a standing wave on a string fixed at both ends is correct?',
        [('Nodes stay fixed and no net energy is transferred along the string',1),
         ('Every point has the same amplitude',0),
         ('It transfers energy from one end to the other',0),
         ('It has no antinodes',0)],
        'A standing wave results from superposition of two oppositely travelling waves. Nodes are permanently at rest and antinodes oscillate with maximum amplitude; unlike a progressive wave, it transports no net energy along the string.')
    L_.match_game('Match the phenomenon to its description',
        [['Bending of a wave as its speed changes in a new medium','Refraction'],
         ['Spreading of waves through a gap or around an edge','Diffraction'],
         ['Two waves combining to give a larger or smaller amplitude','Interference'],
         ['A wave bouncing back off a barrier','Reflection']],
        '🌟 Matched! Refraction changes direction via speed; diffraction spreads waves; interference adds them; reflection bounces them.')
    L_.teach('C.5 · Doppler','The Doppler effect',
        P('<p>The <b>Doppler effect</b> is the change in observed frequency when a source and observer move relative to each other. An <b>approaching</b> source is heard at a <b>higher</b> pitch (waves bunched up); a <b>receding</b> source at a lower pitch.</p>',
          E("f' = f × v ÷ (v ∓ v_s)","moving source: − for approaching, + for receding"),
          NOTE('The same physics red-shifts light from galaxies moving away — key evidence for the expanding Universe. For sound it is the motion through the medium that matters.')))
    if hl:
        fdop=680*340/(340-20)
        L_.teach('C.5 · HL depth','Doppler equations & the grating',
            P('<p>At HL you apply the Doppler equations quantitatively for a moving source and/or moving observer, and use the <b>diffraction grating</b> equation for sharp maxima:</p>',
              E('d sinθ = nλ','grating: d = slit spacing, n = order of the maximum'),
              NOTE('A grating with many slits gives much sharper, brighter maxima than two slits, so it measures wavelength precisely.')),
            tag_class='ht')
        L_.num('HL: a siren emits <b>680 Hz</b> and approaches you at <b>20 m s⁻¹</b>; sound speed is <b>340 m s⁻¹</b>. Find the observed frequency.',
            rnd(fdop,1),3,'Hz',"Hint: f' = f × v ÷ (v − v_s) = 680 × 340 ÷ (340 − 20).")
    L_.recap([
        ('Wave model','transfers energy not matter; v = fλ; transverse vs longitudinal'),
        ('Refraction','n = c/v; Snell n₁sinθ₁ = n₂sinθ₂; slows & bends toward normal in denser medium'),
        ('Interference','constructive nλ, destructive (n+½)λ; double slit s = λD/d'),
        ('Standing waves','nodes & antinodes; resonance at natural frequency; no net energy transport'),
        ('Doppler',"approaching source → higher pitch; f' = fv/(v∓v_s)"),
    ])
    return render(L_)

def build_fields(level):
    hl=(level=='HL')
    Me=5.97e24; Re=6.37e6
    L_=L(level,'fields','Fields','🧲','Themes D.1–D.3 Fields',
        'A thorough IB Diploma Physics %s mini-lesson on Themes D.1–D.3 Fields — gravitational fields and Newton\'s law, electric fields and Coulomb\'s law, magnetic fields, and the motion of charges in electric and magnetic fields, aligned to the 2023 guide.'%level,
        '      <p class="big">This mini-lesson covers <b>Themes D.1–D.3 — Fields</b>: <b>gravitational fields</b> and Newton\'s law, <b>electric fields</b> and Coulomb\'s law, <b>magnetic fields</b>, and the <b>motion of charges</b> in electric and magnetic fields.</p>',
        BANNER('gravitational g','electric E','magnetic forces'))
    L_.teach('D.1 · gravity','Gravitational fields',
        P('<p>A <b>field</b> is a region where a mass or charge feels a force. <b>Gravitational field strength</b> g is the force per unit mass. Newton\'s law of gravitation and the field of a point/spherical mass are inverse-square:</p>',
          E('F = GMm ÷ r²    ·    g = F ÷ m = GM ÷ r²','G = 6.67 × 10⁻¹¹ N m² kg⁻²'),
          NOTE('Gravity is always <b>attractive</b> and acts on <b>mass</b>. Because g ∝ 1/r², doubling the distance from a planet\'s centre quarters the field strength.')))
    L_.mcq('At the surface of a planet the gravitational field strength is g. What is it at a distance of <b>two planet-radii</b> from the centre?',
        [('g ÷ 4',1),('g ÷ 2',0),('2g',0),('g (unchanged)',0)],
        'Field strength obeys the inverse-square law g ∝ 1/r². Doubling r multiplies g by (1/2)² = 1/4.')
    gval=G*Me/Re**2
    L_.num('Find the gravitational field strength at Earth\'s surface. Use M = 5.97 × 10²⁴ kg, r = 6.37 × 10⁶ m, G = 6.67 × 10⁻¹¹.',
        rnd(gval,1),0.2,'N kg⁻¹','Hint: g = GM ÷ r² = 6.67e-11 × 5.97e24 ÷ (6.37e6)².')
    L_.teach('D.2 · electric','Electric fields & Coulomb\'s law',
        P('<p><b>Electric field strength</b> E is the force per unit positive charge. Coulomb\'s law gives the force between point charges, and a point charge produces a radial field:</p>',
          E('F = kQ₁Q₂ ÷ r²    ·    E = F ÷ q = kQ ÷ r²','k = 8.99 × 10⁹ N m² C⁻²'),
          NOTE('Unlike gravity, electric forces can <b>attract or repel</b>: like charges repel, unlike attract. Field lines point <b>away</b> from positive charge and <b>towards</b> negative.')))
    Fcb=k_e*3.0e-6*2.0e-6/0.10**2
    L_.num('Two charges, <b>3.0 µC</b> and <b>2.0 µC</b>, are <b>0.10 m</b> apart. Find the electrostatic force between them. (k = 8.99 × 10⁹.)',
        rnd(Fcb,1),0.3,'N','Hint: F = kQ₁Q₂ ÷ r² = 8.99e9 × 3.0e-6 × 2.0e-6 ÷ 0.10².')
    Ef=6.0e-3/2.0e-6
    L_.num('A charge of <b>2.0 µC</b> feels a force of <b>6.0 mN</b> (6.0 × 10⁻³ N) in an electric field. Find the field strength.',
        rnd(Ef,0),50,'N C⁻¹','Hint: E = F ÷ q = 6.0e-3 ÷ 2.0e-6.')
    L_.teach('D.2–D.3 · magnetic','Magnetic fields & forces',
        P('<p>A <b>magnetic field</b> exerts a force on a <b>moving charge</b> or a <b>current</b>. The force is perpendicular to both the field and the velocity/current (Fleming\'s left-hand rule):</p>',
          E('F = BIL    ·    F = qvB','wire of length L carrying current I · charge q moving at speed v'),
          NOTE('Because the magnetic force on a moving charge is always perpendicular to its velocity, it does <b>no work</b> — it changes direction, not speed, making charges move in <b>circles</b>.')))
    Fwire=0.40*5.0*0.20
    L_.num('A <b>0.20 m</b> wire carries <b>5.0 A</b> at right angles to a <b>0.40 T</b> magnetic field. Find the force on it.',
        rnd(Fwire,2),0.02,'N','Hint: F = BIL = 0.40 × 5.0 × 0.20.')
    L_.mcq('A magnetic field does no work on a charged particle moving through it. Why?',
        [('The magnetic force is always perpendicular to the velocity',1),
         ('The field is too weak to do work',0),
         ('The particle has no charge',0),
         ('Magnetic fields cannot exert forces',0)],
        'Work needs a force component along the displacement. The magnetic force F = qvB is perpendicular to v, so W = Fs cos90° = 0: the speed (and KE) stays constant while the direction curves.')
    L_.classify_game('Which field does this describe?',
        ('🌍 Gravitational','⚡ Electric','🧲 Magnetic'),
        [['Acts on any mass','g0'],['Always attractive','g0'],['g = GM ÷ r²','g0'],
         ['Acts on electric charge','g1'],['Can attract or repel','g1'],['E = kQ ÷ r²','g1'],
         ['Acts on moving charge or current','g2'],['Force is perpendicular to velocity','g2'],['F = BIL','g2']],
        '🌟 Sorted! Gravity acts on mass (attractive only), electric on charge (both signs), magnetic on moving charge (⟂ force).')
    L_.match_game('Match the law to its equation',
        [['Newton\'s law of gravitation','F = GMm ÷ r²'],
         ['Coulomb\'s law','F = kQ₁Q₂ ÷ r²'],
         ['Force on a current-carrying wire','F = BIL'],
         ['Force on a moving charge','F = qvB']],
        '🌟 Matched! Gravitational and electric forces are inverse-square; magnetic forces need motion (v or I).')
    if hl:
        vesc=math.sqrt(2*G*Me/Re); vorb=math.sqrt(G*Me/7.0e6)
        L_.teach('D.1 · HL depth','Potential, energy & orbits',
            P('<p>At HL fields are described by <b>potential</b> — the potential energy per unit mass or charge. For a point mass and point charge:</p>',
              E('V_g = −GM ÷ r    ·    V_e = kQ ÷ r','field strength is the negative gradient of potential'),
              '<p>Gravitational potential energy E_P = −GMm/r. The <b>escape speed</b> (KE just enough to reach r → ∞) and a circular <b>orbital speed</b> are:</p>',
              E('v_escape = √(2GM ÷ r)    ·    v_orbit = √(GM ÷ r)','a bound orbit has total energy E = −GMm ÷ 2r'),
              NOTE('Gravitational potential is always negative and rises to zero at infinity; you must do positive work to lift a mass away.')),
            tag_class='ht')
        L_.num('HL: find the escape speed from Earth\'s surface, in <b>km s⁻¹</b>. Use M = 5.97 × 10²⁴ kg, r = 6.37 × 10⁶ m.',
            rnd(vesc/1000,1),0.3,'km s⁻¹','Hint: v = √(2GM ÷ r) = √(2 × 6.67e-11 × 5.97e24 ÷ 6.37e6), then ÷1000.')
        L_.num('HL: find the orbital speed of a satellite at radius <b>7.0 × 10⁶ m</b> from Earth\'s centre, in <b>km s⁻¹</b>.',
            rnd(vorb/1000,1),0.3,'km s⁻¹','Hint: v = √(GM ÷ r) = √(6.67e-11 × 5.97e24 ÷ 7.0e6), then ÷1000.')
    L_.recap([
        ('Gravitational','g = GM/r²; F = GMm/r²; attractive, acts on mass'),
        ('Electric','E = kQ/r²; F = kQ₁Q₂/r²; attracts or repels'),
        ('Magnetic','F = BIL and F = qvB; force ⟂ velocity, so does no work'),
        ('Inverse square','doubling r quarters both gravitational and electric field'),
        ('HL','potential V = −GM/r (grav) or kQ/r; v_escape = √(2GM/r)') if hl else ('Field lines','out of + charge, into − charge; toward a mass'),
    ])
    return render(L_)

def build_nuclear_quantum(level):
    hl=(level=='HL')
    L_=L(level,'nuclear-and-quantum-physics','Nuclear & Quantum Physics','☢️','Themes E.1, E.3–E.5',
        'A thorough IB Diploma Physics %s mini-lesson on Themes E.1 and E.3–E.5 — atomic structure, radioactive decay and half-life, mass-energy and binding energy, nuclear fission, and fusion in stars, aligned to the 2023 guide.'%level,
        '      <p class="big">This mini-lesson covers <b>Themes E.1 & E.3–E.5</b>: the <b>structure of the atom</b>, <b>radioactive decay</b> and half-life, <b>mass–energy</b> (E = mc²) and binding energy, nuclear <b>fission</b>, and <b>fusion & stars</b>.</p>',
        BANNER('the nucleus','half-life &amp; decay','E = mc² · stars'))
    L_.teach('E.1 · the atom','Structure of the atom',
        P('<p>An atom has a tiny, dense <b>nucleus</b> of <b>protons</b> (charge +e) and <b>neutrons</b>, surrounded by electrons. A nuclide is written <sup>A</sup><sub>Z</sub>X, where Z = proton number and A = nucleon (mass) number.</p>',
          '<ul><li><b>Isotopes</b> are nuclei of the same element (same Z) with different numbers of neutrons (different A).</li>'
          '<li>Discrete <b>emission and absorption spectra</b> are evidence that atomic energy levels are <b>quantised</b>.</li></ul>',
          NOTE('The strong nuclear force holds nucleons together over very short ranges, overcoming the electrostatic repulsion between the positively charged protons.')))
    L_.mcq('Two samples contain atoms with the same number of protons but different numbers of neutrons. What are they?',
        [('Isotopes of the same element',1),
         ('Different elements',0),('Ions',0),('Antimatter',0)],
        'Same proton number Z means the same element; a different neutron number gives a different mass number A. Such nuclides are isotopes — chemically alike but with different nuclear stability.')
    L_.teach('E.3 · radiation','Radioactive decay',
        P('<p>Unstable nuclei emit radiation randomly and spontaneously:</p>',
          '<ul><li><b>Alpha (α)</b>: a helium nucleus (2p + 2n); highly ionising, stopped by paper.</li>'
          '<li><b>Beta-minus (β⁻)</b>: a fast electron from a neutron → proton conversion; stopped by aluminium.</li>'
          '<li><b>Gamma (γ)</b>: a high-energy photon; very penetrating, needs thick lead.</li></ul>',
          E('half-life T½','the time for half the radioactive nuclei (or the activity) to decay'),
          NOTE('Decay is a <b>random</b> process — we cannot predict a single nucleus, only the statistical behaviour of many.')))
    hlmass=80/2**3
    L_.num('A sample starts with <b>80 g</b> of a radioisotope of half-life <b>5.0 days</b>. How much remains after <b>15 days</b>?',
        rnd(hlmass,0),0.5,'g','Hint: 15 days = 3 half-lives; halve three times: 80 → 40 → 20 → 10.')
    frac=100/2**4
    L_.num('What percentage of a radioactive sample remains after <b>4 half-lives</b>?',
        rnd(frac,2),0.3,'%','Hint: fraction = (1/2)⁴ = 1/16 = 0.0625 → 6.25%.')
    L_.classify_game('Which type of radiation?',
        ('α  Alpha','β  Beta-minus','γ  Gamma'),
        [['A helium nucleus (2 protons + 2 neutrons)','g0'],['Stopped by a sheet of paper','g0'],['The most strongly ionising','g0'],
         ['A fast-moving electron','g1'],['Emitted when a neutron becomes a proton','g1'],['Stopped by a few mm of aluminium','g1'],
         ['A high-energy electromagnetic photon','g2'],['Has no charge and no mass','g2'],['Needs thick lead to stop it','g2']],
        '🌟 Sorted! Alpha = He nucleus (least penetrating), beta = electron, gamma = photon (most penetrating).')
    L_.teach('E.3–E.4 · mass-energy','Mass–energy & fission',
        P('<p>Mass and energy are equivalent. A nucleus has slightly less mass than its separate nucleons — this <b>mass defect</b> Δm corresponds to the <b>binding energy</b> that holds it together:</p>',
          E('E = mc² = Δm c²','1 u of mass defect ↔ 931.5 MeV of energy'),
          '<p><b>Fission:</b> a heavy nucleus (e.g. uranium-235) absorbs a neutron and splits into two lighter nuclei plus neutrons, releasing energy and sustaining a <b>chain reaction</b> in a reactor.</p>'))
    Emc=3.0e-3*(3.0e8)**2/1e14
    L_.num('Find the energy released if <b>3.0 × 10⁻³ kg</b> of mass is converted to energy. Give it in units of <b>10¹⁴ J</b>. (c = 3.0 × 10⁸ m s⁻¹.)',
        rnd(Emc,1),0.1,'× 10¹⁴ J','Hint: E = mc² = 3.0e-3 × (3.0e8)² = 2.7e14 J → 2.7.')
    mev=0.030*931.5
    L_.num('A nuclear reaction has a mass defect of <b>0.030 u</b>. Find the energy released in <b>MeV</b>. (1 u ↔ 931.5 MeV.)',
        rnd(mev,1),0.5,'MeV','Hint: E = 0.030 × 931.5.')
    L_.teach('E.5 · stars','Fusion & stars',
        P('<p><b>Fusion</b> joins light nuclei into a heavier one, releasing energy — it powers the stars. In the Sun, hydrogen fuses to helium.</p>',
          '<ul><li>A star is in <b>equilibrium</b>: the inward pull of gravity is balanced by outward radiation and gas pressure from fusion.</li>'
          '<li>Fusion in stars builds elements (nucleosynthesis) up to iron; heavier elements form in supernovae.</li></ul>',
          NOTE('Fusion needs extreme temperature and pressure so nuclei can overcome their electrostatic repulsion — which is why it happens in stellar cores, not easily on Earth.')))
    L_.mcq('What is the fundamental difference between nuclear fusion and nuclear fission?',
        [('Fusion joins light nuclei; fission splits a heavy nucleus',1),
         ('Fusion splits nuclei; fission joins them',0),
         ('Both only occur in reactors',0),
         ('Fusion releases no energy',0)],
        'Fusion combines light nuclei (e.g. hydrogen → helium) and powers stars; fission splits a heavy nucleus (e.g. uranium) and powers reactors. Both release energy because the products are more tightly bound.')
    L_.match_game('Match term to meaning',
        [['Nuclei with the same Z but different N','Isotopes'],
         ['Time for half the nuclei to decay','Half-life'],
         ['Energy equivalent of a mass, E = mc²','Mass–energy equivalence'],
         ['Splitting of a heavy nucleus','Fission']],
        '🌟 Matched! Mass defect ↔ binding energy via E = mc²; fission splits heavy nuclei, fusion joins light ones.')
    if hl:
        thalf=0.693/0.02
        L_.teach('E.2/E.5 · HL depth','Binding-energy curve & decay law',
            P('<p>The <b>binding energy per nucleon</b> curve peaks near <b>iron-56</b>. Nuclei lighter than iron release energy by <b>fusion</b>; heavier ones release it by <b>fission</b> — both move products towards the most tightly bound region.</p>',
              E('N = N₀ e^(−λt)    ·    A = λN    ·    T½ = ln2 ÷ λ','λ = decay constant, A = activity (Bq)'),
              NOTE('Activity is proportional to the number of undecayed nuclei, so it also falls exponentially with the same half-life.')),
            tag_class='ht')
        L_.num('HL: a nuclide has decay constant λ = <b>0.020 s⁻¹</b>. Find its half-life.',
            rnd(thalf,1),0.5,'s','Hint: T½ = ln2 ÷ λ = 0.693 ÷ 0.020.')
    L_.recap([
        ('The atom','nucleus of protons + neutrons; isotopes share Z, differ in A'),
        ('Decay','α (He nucleus) · β (electron) · γ (photon); random & spontaneous'),
        ('Half-life','time for half the nuclei/activity to decay'),
        ('Mass–energy','E = mc²; mass defect ↔ binding energy; 1 u ↔ 931.5 MeV'),
        ('Fission & fusion','split heavy vs join light nuclei; fusion powers stars'),
    ])
    return render(L_)

def build_rigid_body():
    L_=L('HL','rigid-body-mechanics','Rigid Body Mechanics','🎡','Theme A.4 Rigid body mechanics (HL)',
        'A thorough IB Diploma Physics HL mini-lesson on Theme A.4 Rigid body mechanics — torque, rotational equilibrium, moment of inertia, angular kinematics and dynamics, angular momentum and rotational kinetic energy, aligned to the 2023 guide.',
        '      <p class="big">This <b>HL-only</b> mini-lesson covers <b>Theme A.4 — Rigid body mechanics</b>: <b>torque</b> and rotational equilibrium, <b>moment of inertia</b>, angular <b>kinematics and dynamics</b> (τ = Iα), <b>angular momentum</b> and <b>rotational kinetic energy</b>.</p>',
        BANNER('torque τ = Fr','τ = Iα','angular momentum'))
    L_.teach('A.4 · torque','Torque and rotational equilibrium',
        P('<p><b>Torque</b> (moment) is the turning effect of a force about a pivot. It is largest when the force is perpendicular to the position vector:</p>',
          E('τ = Fr sinθ','torque (N m) = force × distance from pivot × sin(angle between them)'),
          NOTE('A rigid body is in <b>equilibrium</b> only if BOTH the resultant force is zero (no linear acceleration) AND the resultant torque is zero (no angular acceleration).')))
    L_.mcq('A spanner is used to loosen a bolt. To get the maximum turning effect for a given force, you should push:',
        [('At right angles to the spanner, as far from the bolt as possible',1),
         ('Along the length of the spanner',0),
         ('As close to the bolt as possible',0),
         ('At 30° to the spanner, near the bolt',0)],
        'Torque = Fr sinθ is greatest when θ = 90° (sin = 1) and r is as large as possible. Pushing along the spanner (θ = 0) gives zero torque.')
    tau=20*0.30
    L_.num('A force of <b>20 N</b> acts at right angles to a spanner, <b>0.30 m</b> from the pivot. Find the torque.',
        rnd(tau,1),0.2,'N m','Hint: τ = Fr sinθ, θ = 90° so sinθ = 1 → 20 × 0.30.')
    L_.teach('A.4 · dynamics','Angular kinematics & dynamics',
        P('<p>Rotation mirrors linear motion. Angular displacement θ, angular velocity ω and angular acceleration α obey suvat-style equations for constant α (e.g. ω = ω₀ + αt). The rotational Newton\'s second law uses the <b>moment of inertia</b> I:</p>',
          E('τ = Iα','I plays the role of mass for rotation; it depends on how mass is distributed'),
          WORK('Worked example — a spinning disc',
               'A disc starts from rest (ω₀ = 0) with angular acceleration α = 3.0 rad s⁻² for 4.0 s.',
               'ω = ω₀ + αt = 0 + 3.0 × 4.0 = <b>12 rad s⁻¹</b>')))
    om=0+3.0*4.0
    L_.num('A wheel starts from rest and has angular acceleration <b>3.0 rad s⁻²</b> for <b>4.0 s</b>. Find its final angular velocity.',
        rnd(om,0),0.5,'rad s⁻¹','Hint: ω = ω₀ + αt = 0 + 3.0 × 4.0.')
    alpha=8.0/2.0
    L_.num('A resultant torque of <b>8.0 N m</b> acts on a body of moment of inertia <b>2.0 kg m²</b>. Find its angular acceleration.',
        rnd(alpha,1),0.2,'rad s⁻²','Hint: τ = Iα → α = τ ÷ I = 8.0 ÷ 2.0.')
    L_.teach('A.4 · energy & momentum','Rotational energy & angular momentum',
        P('<p>A rotating body stores <b>rotational kinetic energy</b> and carries <b>angular momentum</b>:</p>',
          E('E_K = ½Iω²    ·    L = Iω','angular momentum L is conserved if the resultant external torque is zero'),
          NOTE('A spinning skater who pulls their arms in reduces I, so ω rises to keep L = Iω constant — a direct demonstration of angular-momentum conservation.')))
    Krot=0.5*0.5*10**2
    L_.num('A flywheel of moment of inertia <b>0.50 kg m²</b> spins at <b>10 rad s⁻¹</b>. Find its rotational kinetic energy.',
        rnd(Krot,0),1,'J','Hint: E_K = ½Iω² = ½ × 0.50 × 10².')
    Lam=0.20*15
    L_.num('A body of moment of inertia <b>0.20 kg m²</b> rotates at <b>15 rad s⁻¹</b>. Find its angular momentum.',
        rnd(Lam,1),0.2,'kg m² s⁻¹','Hint: L = Iω = 0.20 × 15.')
    L_.mcq('An ice skater spinning with arms outstretched pulls their arms inwards. Ignoring friction, what happens?',
        [('They spin faster, because reducing I raises ω to conserve L = Iω',1),
         ('They spin slower, because they have less energy',0),
         ('Their angular velocity is unchanged',0),
         ('Their angular momentum increases',0)],
        'With no external torque, angular momentum L = Iω is conserved. Pulling the arms in lowers the moment of inertia I, so ω must increase. (The skater does work, raising the rotational KE.)')
    L_.classify_game('Sort each rotational statement',
        ('🌀 Angular kinematics','⚙️ Rotational dynamics','🔁 Energy / momentum'),
        [['ω = ω₀ + αt','g0'],['θ = ω₀t + ½αt²','g0'],['ω² = ω₀² + 2αθ','g0'],
         ['τ = Iα','g1'],['Net torque is zero at equilibrium','g1'],['τ = Fr sinθ','g1'],
         ['E_K = ½Iω²','g2'],['L = Iω','g2'],['Angular momentum is conserved with no external torque','g2']],
        '🌟 Sorted! Kinematics links θ, ω, α; dynamics adds torque and I; energy and momentum use ½Iω² and Iω.')
    L_.match_game('Match the linear quantity to its rotational analogue',
        [['Force, F','Torque, τ'],
         ['Mass, m','Moment of inertia, I'],
         ['Linear velocity, v','Angular velocity, ω'],
         ['Momentum, p = mv','Angular momentum, L = Iω']],
        '🌟 Matched! Every linear quantity has a rotational twin — swap m for I and v for ω.')
    L_.recap([
        ('Torque','τ = Fr sinθ; maximum when force ⟂ to the arm'),
        ('Equilibrium','resultant force AND resultant torque both zero'),
        ('Dynamics','τ = Iα; I is the rotational analogue of mass'),
        ('Kinematics','ω = ω₀ + αt and the other suvat analogues'),
        ('Conservation','E_K = ½Iω²; L = Iω conserved with no external torque'),
    ])
    return render(L_)

def build_special_relativity():
    L_=L('HL','special-relativity','Special Relativity','🛸','Theme A.5 Galilean & special relativity (HL)',
        'A thorough IB Diploma Physics HL mini-lesson on Theme A.5 Galilean and special relativity — reference frames, Einstein\'s postulates, the Lorentz factor, time dilation, length contraction and mass-energy, aligned to the 2023 guide.',
        '      <p class="big">This <b>HL-only</b> mini-lesson covers <b>Theme A.5 — Galilean & special relativity</b>: inertial <b>reference frames</b>, Einstein\'s <b>two postulates</b>, the <b>Lorentz factor</b> γ, <b>time dilation</b> and <b>length contraction</b>, and <b>mass–energy</b>.</p>',
        BANNER('two postulates','γ = 1/√(1−v²/c²)','time &amp; length'))
    L_.teach('A.5 · postulates','Frames and the two postulates',
        P('<p><b>Galilean relativity</b> works well at everyday speeds: velocities simply add. But it fails near the speed of light. Einstein\'s <b>special relativity</b> rests on two postulates:</p>',
          '<ul><li>The laws of physics are the same in <b>all inertial (non-accelerating) frames</b>.</li>'
          '<li>The <b>speed of light in vacuum, c</b>, is the same for all inertial observers, whatever the source\'s motion.</li></ul>',
          NOTE('The constancy of c forces space and time themselves to be relative — leading to time dilation and length contraction.')))
    L_.mcq('You fly towards a star at 0.5c and measure the speed of its light reaching you. What value do you get?',
        [('c — exactly the same as an observer at rest',1),
         ('1.5c',0),('0.5c',0),('It depends on the star\'s brightness',0)],
        'Einstein\'s second postulate: the speed of light in vacuum is c for every inertial observer, regardless of relative motion. Velocities do NOT simply add at relativistic speeds.')
    L_.teach('A.5 · Lorentz','The Lorentz factor',
        P('<p>The <b>Lorentz factor</b> γ quantifies relativistic effects. It is always ≥ 1 and grows without limit as v → c:</p>',
          E('γ = 1 ÷ √(1 − v²/c²)','at v = 0.6c, γ = 1/√(1−0.36) = 1/0.8 = 1.25'),
          NOTE('At everyday speeds v ≪ c, γ ≈ 1 and relativity reduces to ordinary Galilean physics — which is why we never notice it.')))
    g6=1/math.sqrt(1-0.6**2)
    L_.num('Find the Lorentz factor γ for a speed of <b>0.60c</b>.',
        rnd(g6,2),0.02,'','Hint: γ = 1 ÷ √(1 − 0.6²) = 1 ÷ √0.64 = 1 ÷ 0.8.')
    g8=1/math.sqrt(1-0.8**2)
    L_.num('Find the Lorentz factor γ for a speed of <b>0.80c</b>.',
        rnd(g8,2),0.03,'','Hint: γ = 1 ÷ √(1 − 0.8²) = 1 ÷ √0.36 = 1 ÷ 0.6.')
    L_.teach('A.5 · dilation & contraction','Time dilation & length contraction',
        P('<p>To a stationary observer, a moving clock runs <b>slow</b> and a moving object is <b>shorter</b> along its motion:</p>',
          E('Δt = γΔt₀    ·    L = L₀ ÷ γ','Δt₀ = proper time (in the object\'s own frame); L₀ = proper length'),
          WORK('Worked example — a fast rocket at 0.6c (γ = 1.25)',
               'Its 2.0 s onboard interval is measured on Earth as Δt = 1.25 × 2.0 = 2.5 s.',
               'Its 100 m proper length is measured as L = 100 ÷ 1.25 = 80 m.')))
    dt=g6*2.0
    L_.num('A clock on a rocket moving at <b>0.60c</b> (γ = 1.25) ticks off <b>2.0 s</b> of its own (proper) time. How long is this measured to last on Earth?',
        rnd(dt,1),0.1,'s','Hint: Δt = γΔt₀ = 1.25 × 2.0.')
    Lc=100/g6
    L_.num('A rocket is <b>100 m</b> long in its own frame and moves at <b>0.60c</b> (γ = 1.25). Find its length measured from Earth.',
        rnd(Lc,0),1,'m','Hint: L = L₀ ÷ γ = 100 ÷ 1.25.')
    L_.classify_game('From a stationary observer\'s view…',
        ('⬆️ Larger / dilated','⬇️ Smaller / contracted','🟰 Invariant (same for all)'),
        [['Time between ticks of a passing clock','g0'],['The measured lifetime of a fast muon','g0'],['The mass–energy γmc² of a moving particle','g0'],
         ['The length of a fast rocket along its motion','g1'],['The distance a muon travels in its own frame','g1'],['The spacing of moving markers along v','g1'],
         ['The speed of light c','g2'],['The spacetime interval','g2'],['The rest mass of a particle','g2']],
        '🌟 Sorted! Moving clocks/lifetimes dilate, moving lengths contract, but c, the spacetime interval and rest mass are invariant.')
    E0=me*c**2/1.6e-19/1e6
    L_.num('Find the rest energy of an electron, in <b>MeV</b>. Use mₑ = 9.11 × 10⁻³¹ kg, c = 3.0 × 10⁸ m s⁻¹, e = 1.60 × 10⁻¹⁹ C.',
        rnd(E0,2),0.03,'MeV','Hint: E₀ = mc² = 9.11e-31 × (3.0e8)² = 8.2e-14 J; ÷1.6e-19 → eV; ÷1e6 → MeV.')
    L_.match_game('Match the expression to its name',
        [['1 ÷ √(1 − v²/c²)','Lorentz factor γ'],
         ['Δt = γΔt₀','Time dilation'],
         ['L = L₀ ÷ γ','Length contraction'],
         ['E₀ = mc²','Rest energy']],
        '🌟 Matched! γ drives every effect: time dilates, length contracts, and rest energy E₀ = mc² is locked up in mass.')
    L_.recap([
        ('Postulates','laws of physics same in all inertial frames; c is invariant'),
        ('Lorentz factor','γ = 1/√(1−v²/c²) ≥ 1, → ∞ as v → c'),
        ('Time dilation','moving clocks run slow: Δt = γΔt₀'),
        ('Length contraction','moving lengths shrink along motion: L = L₀/γ'),
        ('Mass–energy','rest energy E₀ = mc²; total energy E = γmc²'),
    ])
    return render(L_)

def build_thermodynamics():
    L_=L('HL','thermodynamics','Thermodynamics','♨️','Theme B.4 Thermodynamics (HL)',
        'A thorough IB Diploma Physics HL mini-lesson on Theme B.4 Thermodynamics — internal energy, the first law, work done by a gas, thermodynamic processes, entropy and the second law, and heat-engine efficiency, aligned to the 2023 guide.',
        '      <p class="big">This <b>HL-only</b> mini-lesson covers <b>Theme B.4 — Thermodynamics</b>: <b>internal energy</b>, the <b>first law</b> Q = ΔU + W, <b>work done by a gas</b>, the four processes, <b>entropy</b> and the <b>second law</b>, and <b>heat-engine efficiency</b>.</p>',
        BANNER('Q = ΔU + W','processes','entropy &amp; efficiency'))
    L_.teach('B.4 · first law','Internal energy & the first law',
        P('<p>The <b>internal energy</b> U of an ideal gas depends only on its temperature (U = (3/2)nRT for a monatomic gas). The <b>first law</b> is conservation of energy for a gas:</p>',
          E('Q = ΔU + W','Q = heat added TO the gas; W = work done BY the gas; ΔU = change in internal energy'),
          NOTE('Sign care: in this IB convention, W is the work the gas does on its surroundings. If the gas is compressed, W is negative (work is done on it).')))
    L_.mcq('Heat Q = 500 J is added to a gas, which does W = 200 J of work pushing back a piston. What is the change in internal energy?',
        [('+300 J',1),('+700 J',0),('−300 J',0),('+200 J',0)],
        'The first law Q = ΔU + W rearranges to ΔU = Q − W = 500 − 200 = 300 J. Energy supplied that is not spent doing work raises the internal energy (and temperature).')
    dU=500-200
    L_.num('Heat <b>500 J</b> is supplied to a gas that does <b>200 J</b> of work. Find the change in internal energy ΔU.',
        rnd(dU,0),1,'J','Hint: first law — ΔU = Q − W = 500 − 200.')
    L_.teach('B.4 · work','Work done by a gas',
        P('<p>When a gas expands at constant pressure it does work on its surroundings equal to the area under the p–V graph:</p>',
          E('W = pΔV','constant-pressure (isobaric) work, in joules'),
          WORK('Worked example — an expanding gas',
               'A gas at 2.0 × 10⁵ Pa expands by ΔV = 0.0030 m³ at constant pressure.',
               'W = pΔV = 2.0 × 10⁵ × 0.0030 = <b>600 J</b>')))
    W=2.0e5*0.003
    L_.num('A gas at constant pressure <b>2.0 × 10⁵ Pa</b> expands by <b>0.0030 m³</b>. Find the work it does.',
        rnd(W,0),2,'J','Hint: W = pΔV = 2.0e5 × 0.0030.')
    L_.classify_game('Which thermodynamic process?',
        ('📦 Isovolumetric','🎚️ Isobaric','🌡️ Isothermal'),
        [['Constant volume','g0'],['No work is done by or on the gas','g0'],['W = 0','g0'],
         ['Constant pressure','g1'],['Work W = pΔV','g1'],['Volume changes as it is heated','g1'],
         ['Constant temperature','g2'],['ΔU = 0 for an ideal gas','g2'],['All heat added becomes work (Q = W)','g2']],
        '🌟 Sorted! Isovolumetric does no work, isobaric uses W = pΔV, isothermal keeps ΔU = 0 for an ideal gas.')
    L_.teach('B.4 · second law','Entropy & the second law',
        P('<p><b>Entropy</b> S measures the disorder (number of accessible microstates) of a system. The <b>second law</b> states that the entropy of an <b>isolated system</b> never decreases — it stays the same for a reversible process and increases for any real (irreversible) one.</p>',
          NOTE('This gives time its direction: heat flows spontaneously from hot to cold, never the reverse, because that increases total entropy. No heat engine can be 100% efficient.')))
    L_.mcq('Why can no real heat engine convert all its input heat into useful work?',
        [('Because the second law forbids it — some heat must be rejected to a cold reservoir, increasing entropy',1),
         ('Because energy is destroyed by friction',0),
         ('Because the first law forbids it',0),
         ('Because gases cannot do work',0)],
        'The second law requires total entropy to increase, so a heat engine must dump some heat to a cold reservoir; only the remainder becomes work. This caps efficiency below 100%, even ideally.')
    L_.teach('B.4 · efficiency','Heat-engine efficiency',
        P('<p>A heat engine\'s efficiency is the useful work out per unit heat in. The maximum possible (Carnot) efficiency depends only on the reservoir temperatures (in kelvin):</p>',
          E('η = W ÷ Q_H    ·    η_carnot = 1 − T_c ÷ T_h','the Carnot value is an unreachable ideal ceiling'),
          WORK('Worked example — Carnot limit',
               'An engine works between T_h = 500 K and T_c = 300 K.',
               'η = 1 − 300 ÷ 500 = 0.40 = <b>40%</b>')))
    carnot=(1-300/500)*100
    L_.num('Find the maximum (Carnot) efficiency of an engine operating between <b>500 K</b> and <b>300 K</b>. Give a <b>percentage</b>.',
        rnd(carnot,0),1,'%','Hint: η = (1 − T_c ÷ T_h) × 100 = (1 − 300 ÷ 500) × 100.')
    effeng=300/1000*100
    L_.num('A heat engine takes in <b>1000 J</b> of heat and produces <b>300 J</b> of work. Find its efficiency as a <b>percentage</b>.',
        rnd(effeng,0),1,'%','Hint: η = W ÷ Q_H × 100 = 300 ÷ 1000 × 100.')
    L_.match_game('Match statement to law/quantity',
        [['Q = ΔU + W','First law of thermodynamics'],
         ['Entropy of an isolated system never decreases','Second law of thermodynamics'],
         ['η = 1 − T_c/T_h','Carnot (maximum) efficiency'],
         ['W = pΔV','Work done by a gas at constant pressure']],
        '🌟 Matched! The first law tracks energy; the second law tracks entropy and limits every engine.')
    L_.recap([
        ('First law','Q = ΔU + W (heat in = internal-energy rise + work done by gas)'),
        ('Work','W = pΔV (area under a p–V graph)'),
        ('Processes','isovolumetric (W=0) · isobaric · isothermal (ΔU=0) · adiabatic (Q=0)'),
        ('Second law','entropy of an isolated system never decreases'),
        ('Efficiency','η = W/Q_H; Carnot ceiling η = 1 − T_c/T_h'),
    ])
    return render(L_)

def build_em_induction():
    L_=L('HL','electromagnetic-induction','Electromagnetic Induction','🔄','Theme D.4 Induction (HL)',
        'A thorough IB Diploma Physics HL mini-lesson on Theme D.4 Electromagnetic induction — magnetic flux, Faraday\'s and Lenz\'s laws, motional emf, generators and transformers, aligned to the 2023 guide.',
        '      <p class="big">This <b>HL-only</b> mini-lesson covers <b>Theme D.4 — Electromagnetic induction</b>: <b>magnetic flux</b>, <b>Faraday\'s</b> and <b>Lenz\'s</b> laws, <b>motional emf</b>, and <b>generators and transformers</b>.</p>',
        BANNER('flux Φ = BA','Faraday &amp; Lenz','transformers'))
    L_.teach('D.4 · flux','Magnetic flux',
        P('<p><b>Magnetic flux</b> Φ measures the field passing through a loop of area A; <b>flux linkage</b> for N turns is NΦ:</p>',
          E('Φ = BA cosθ','θ is the angle between the field and the normal to the loop; unit weber (Wb)'),
          NOTE('Flux is maximum when the field is perpendicular to the plane of the coil (θ = 0, cosθ = 1) and zero when the field lies in the plane (θ = 90°).')))
    flux=0.20*0.05
    L_.num('A field of <b>0.20 T</b> passes perpendicularly through a coil of area <b>0.050 m²</b>. Find the magnetic flux.',
        rnd(flux,3),0.001,'Wb','Hint: Φ = BA cosθ, θ = 0 so cosθ = 1 → 0.20 × 0.050.')
    L_.teach('D.4 · Faraday & Lenz','Faraday\'s and Lenz\'s laws',
        P('<p>A <b>changing</b> flux induces an emf. <b>Faraday\'s law</b>: the emf equals the rate of change of flux linkage. <b>Lenz\'s law</b> (the minus sign): the induced current opposes the change that causes it — this is energy conservation.</p>',
          E('ε = −N (ΔΦ ÷ Δt)','a faster change, or more turns, gives a larger induced emf'),
          WORK('Worked example — a collapsing field',
               'A 200-turn coil has its flux fall by ΔΦ = 0.010 Wb in Δt = 0.50 s.',
               'ε = N ΔΦ ÷ Δt = 200 × 0.010 ÷ 0.50 = <b>4.0 V</b>')))
    L_.mcq('A magnet is pushed north-pole-first towards a coil. Which way does the induced current flow, and why?',
        [('So as to make the coil face repel the magnet — opposing the change (Lenz\'s law)',1),
         ('So as to attract the magnet in faster',0),
         ('In whichever direction increases the flux',0),
         ('No current flows unless the magnet touches the coil',0)],
        'Lenz\'s law: the induced current opposes the change that produces it, so the near face becomes a north pole to repel the approaching magnet. This is required by conservation of energy.')
    farad=200*0.010/0.50
    L_.num('A <b>200</b>-turn coil has its flux change by <b>0.010 Wb</b> in <b>0.50 s</b>. Find the magnitude of the induced emf.',
        rnd(farad,1),0.1,'V','Hint: ε = N ΔΦ ÷ Δt = 200 × 0.010 ÷ 0.50.')
    emf_mot=0.5*4.0*0.20
    L_.num('A rod of length <b>0.20 m</b> moves at <b>4.0 m s⁻¹</b> perpendicular to a <b>0.50 T</b> field. Find the motional emf.',
        rnd(emf_mot,2),0.02,'V','Hint: ε = BvL = 0.50 × 4.0 × 0.20.')
    L_.teach('D.4 · transformers','Generators & transformers',
        P('<p>A rotating coil in a field is an <b>AC generator</b> — the flux linkage varies sinusoidally, inducing an alternating emf. A <b>transformer</b> changes AC voltage using two coils on an iron core:</p>',
          E('V_s ÷ V_p = N_s ÷ N_p','step-up raises voltage (and lowers current); step-down does the reverse'),
          NOTE('A transformer only works with <b>alternating</b> current, because a steady current gives constant flux and hence no induced emf in the secondary.')))
    trans=230*100/1000
    L_.num('A transformer has <b>1000</b> primary turns and <b>100</b> secondary turns, with a <b>230 V</b> input. Find the output voltage.',
        rnd(trans,0),0.5,'V','Hint: V_s = V_p × N_s ÷ N_p = 230 × 100 ÷ 1000.')
    L_.classify_game('Which law or device does this describe?',
        ("⚡ Faraday's law","🛑 Lenz's law","🔌 Transformer"),
        [['emf equals the rate of change of flux linkage','g0'],['A faster flux change gives a bigger emf','g0'],['ε = −N ΔΦ/Δt','g0'],
         ['Induced current opposes the change causing it','g1'],['Explains the minus sign','g1'],['Ensures energy is conserved','g1'],
         ['V_s/V_p = N_s/N_p','g2'],['Needs alternating current to work','g2'],['Step-up raises voltage, lowers current','g2']],
        '🌟 Sorted! Faraday sets the size of the emf, Lenz sets its direction, and transformers change AC voltage.')
    L_.match_game('Match the expression to its name',
        [['Φ = BA cosθ','Magnetic flux'],
         ['ε = −N ΔΦ/Δt','Faraday\'s law'],
         ['Induced current opposes the change','Lenz\'s law'],
         ['V_s/V_p = N_s/N_p','Transformer equation']],
        '🌟 Matched! Flux is the source, Faraday and Lenz govern the induced emf, and the transformer scales AC voltage.')
    L_.recap([
        ('Flux','Φ = BA cosθ; max when field ⟂ coil plane'),
        ('Faraday','ε = −N ΔΦ/Δt; change is essential'),
        ('Lenz','induced current opposes the change (energy conservation)'),
        ('Motional emf','ε = BvL for a rod cutting field lines'),
        ('Transformer','V_s/V_p = N_s/N_p; AC only'),
    ])
    return render(L_)

def build_quantum_physics():
    L_=L('HL','quantum-physics','Quantum Physics','⚛️','Theme E.2 Quantum physics (HL)',
        'A thorough IB Diploma Physics HL mini-lesson on Theme E.2 Quantum physics — the photoelectric effect and photons, wave-particle duality, the de Broglie wavelength and matter waves, and atomic energy levels, aligned to the 2023 guide.',
        '      <p class="big">This <b>HL-only</b> mini-lesson covers <b>Theme E.2 — Quantum physics</b>: the <b>photoelectric effect</b> and <b>photons</b>, <b>wave–particle duality</b>, the <b>de Broglie wavelength</b> and matter waves, and <b>atomic energy levels</b>.</p>',
        BANNER('photons E = hf','photoelectric','matter waves'))
    L_.teach('E.2 · photons','Photons & the photoelectric effect',
        P('<p>Light comes in quanta called <b>photons</b>, each carrying energy proportional to frequency. Shining light on a metal can eject electrons (the <b>photoelectric effect</b>) — but only if the frequency exceeds a <b>threshold</b> set by the <b>work function</b> φ:</p>',
          E('E = hf    ·    hf = φ + E_max','h = 6.63 × 10⁻³⁴ J s; E_max = max KE of the ejected electron'),
          NOTE('Increasing the <b>intensity</b> below the threshold frequency still ejects NO electrons — a fatal problem for the wave model and the evidence that light is quantised.')))
    L_.mcq('Dim blue light ejects electrons from a metal, but intense red light does not. What does this show?',
        [('Emission depends on photon frequency (energy), not on intensity',1),
         ('Red light has more energy per photon',0),
         ('Brighter light always ejects electrons',0),
         ('The metal is transparent to blue light',0)],
        'Each photon must carry at least the work function energy (hf ≥ φ). Red photons are below threshold however intense the beam, while blue photons are above it — pure evidence for the particle (photon) model.')
    Ephot=6.63e-34*5.0e14/1e-19
    L_.num('Find the energy of a photon of frequency <b>5.0 × 10¹⁴ Hz</b>, in units of <b>10⁻¹⁹ J</b>. (h = 6.63 × 10⁻³⁴ J s.)',
        rnd(Ephot,2),0.1,'× 10⁻¹⁹ J','Hint: E = hf = 6.63e-34 × 5.0e14 = 3.315e-19 J → 3.32.')
    KEmax=(6.63e-34*5.0e14-2.0e-19)/1e-19
    L_.num('A metal with work function <b>2.0 × 10⁻¹⁹ J</b> is lit with photons of energy <b>3.315 × 10⁻¹⁹ J</b>. Find the maximum kinetic energy of the ejected electrons, in units of <b>10⁻¹⁹ J</b>.',
        rnd(KEmax,2),0.1,'× 10⁻¹⁹ J','Hint: E_max = hf − φ = 3.315e-19 − 2.0e-19 = 1.315e-19 J → 1.32.')
    L_.teach('E.2 · matter waves','Wave–particle duality',
        P('<p>If waves can act as particles, particles can act as waves. Every moving particle has a <b>de Broglie wavelength</b>:</p>',
          E('λ = h ÷ p = h ÷ mv','confirmed by electron diffraction through crystals'),
          NOTE('The wavelength is tiny for everyday objects (huge momentum), which is why we never see a cricket ball diffract — but it is measurable for electrons.')))
    deB=6.63e-34/3.3e-24/1e-10
    L_.num('An electron has momentum <b>3.3 × 10⁻²⁴ kg m s⁻¹</b>. Find its de Broglie wavelength, in units of <b>10⁻¹⁰ m</b>. (h = 6.63 × 10⁻³⁴ J s.)',
        rnd(deB,2),0.1,'× 10⁻¹⁰ m','Hint: λ = h ÷ p = 6.63e-34 ÷ 3.3e-24 = 2.0e-10 m → 2.0.')
    L_.teach('E.2 · energy levels','Atomic energy levels',
        P('<p>Electrons in atoms occupy <b>discrete energy levels</b>. When an electron drops from a higher level E₂ to a lower E₁, a photon is emitted whose frequency is fixed by the energy gap:</p>',
          E('hf = E₂ − E₁','this produces the sharp lines of atomic emission spectra'),
          NOTE('Because the levels are quantised, only specific photon energies appear — the "barcode" line spectrum that identifies each element.')))
    ftrans=(3.0*1.6e-19)/6.63e-34/1e14
    L_.num('An electron drops between two levels <b>3.0 eV</b> apart (1 eV = 1.6 × 10⁻¹⁹ J). Find the emitted photon\'s frequency, in units of <b>10¹⁴ Hz</b>.',
        rnd(ftrans,2),0.2,'× 10¹⁴ Hz','Hint: ΔE = 3.0 × 1.6e-19 = 4.8e-19 J; f = ΔE ÷ h = 4.8e-19 ÷ 6.63e-34 = 7.24e14 → 7.24.')
    L_.classify_game('Which quantum idea?',
        ('💡 Photoelectric effect','🌊 Matter waves','🪜 Energy levels'),
        [['Light ejects electrons from a metal','g0'],['Below the threshold frequency, no electrons come off','g0'],['Evidence that light behaves as particles','g0'],
         ['Electrons can be diffracted','g1'],['λ = h ÷ p','g1'],['Evidence that particles behave as waves','g1'],
         ['Atoms have discrete energy levels','g2'],['A photon of energy hf = E₂ − E₁ is emitted','g2'],['Sharp line spectra','g2']],
        '🌟 Sorted! Photoelectric = light-as-particles, de Broglie = particles-as-waves, energy levels give line spectra.')
    L_.match_game('Match the expression to its name',
        [['E = hf','Photon energy'],
         ['λ = h ÷ p','de Broglie wavelength'],
         ['hf = φ + E_max','Einstein\'s photoelectric equation'],
         ['hf = E₂ − E₁','Atomic transition']],
        '🌟 Matched! Photon energy scales with frequency; matter has a wavelength; photoelectric and transition equations both count photon energy.')
    L_.recap([
        ('Photons','E = hf; light is quantised'),
        ('Photoelectric','hf = φ + E_max; needs f above threshold, not just intensity'),
        ('Duality','λ = h/p; particles diffract like waves'),
        ('Energy levels','discrete; hf = E₂ − E₁ gives line spectra'),
        ('Evidence','photoelectric = particle nature of light; diffraction = wave nature of matter'),
    ])
    return render(L_)

# === MORE ===
SHARED=[build_kinematics, build_forces_momentum, build_work_energy_power,
        build_thermal, build_gas_laws, build_circuits,
        build_shm, build_wave_behaviour, build_fields, build_nuclear_quantum]
HLONLY=[build_rigid_body, build_special_relativity, build_thermodynamics,
        build_em_induction, build_quantum_physics]

if __name__=='__main__':
    made=[]
    for fn in SHARED:
        made.append(fn('SL'))
        made.append(fn('HL'))
    for fn in HLONLY:
        made.append(fn())
    for f in made:
        print('WROTE', f)
    print('TOTAL', len(made))
    print('=== RECOMPUTED VALUE CHECKLIST ===')
    for lab,val,unit in CHECK:
        print('  %-52s = %s %s'%(lab,val,unit))
