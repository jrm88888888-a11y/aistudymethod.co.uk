#!/usr/bin/env node
/* Generator for A-level Biology mini-lessons (Edexcel SNAB / CCEA / Eduqas).
   Engine cloned from biology-gcse-aqa-cell-biology-mini-lesson.html.
   Run:  node tools/alevel-bio/_build_alevel_bio.js   (writes into classcraft/adventures/)
   This file is a build tool, not a page. */
const fs = require('fs');
const path = require('path');

const HEAD_CSS = fs.readFileSync(path.join(__dirname, '_alevel_bio_css.txt'), 'utf8');
const OUT = path.join(__dirname, '..', '..', 'adventures');

function esc(s){ return String(s); }

function overviewSvg(a, b, c){
  return `      <figure>
        <svg viewBox="0 0 560 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The three strands of this topic">
          <rect x="14" y="45" width="160" height="62" rx="14" fill="#d6f6e4" stroke="#2c2840" stroke-width="3"/>
          <text x="94" y="82" text-anchor="middle" font-family="Fredoka" font-size="13" font-weight="600" fill="#137a45">${a}</text>
          <rect x="200" y="45" width="160" height="62" rx="14" fill="#d9ebff" stroke="#2c2840" stroke-width="3"/>
          <text x="280" y="82" text-anchor="middle" font-family="Fredoka" font-size="13" font-weight="600" fill="#0b5bbf">${b}</text>
          <rect x="386" y="45" width="160" height="62" rx="14" fill="#efe1ff" stroke="#2c2840" stroke-width="3"/>
          <text x="466" y="82" text-anchor="middle" font-family="Fredoka" font-size="13" font-weight="600" fill="#6a30b8">${c}</text>
          <text x="280" y="130" text-anchor="middle" font-family="Nunito" font-size="12.5" fill="#6b6580">three strands you must be able to link together</text>
        </svg>
      </figure>`;
}

function build(L){
  let qKeys = [], nKeys = [], sortData = null, matchPairs = null;
  const sections = [];

  // 0 welcome
  sections.push(`    <!-- 0 WELCOME -->
    <section class="screen active">
      <span class="tag">Mini-Lesson · A-level</span>
      <h1>${L.title}</h1>
      <p class="big">${L.intro}</p>
${overviewSvg(L.overview3[0], L.overview3[1], L.overview3[2])}
      <p>Work through each screen, answer the <b>questions</b> as you go — several are <b>A-level calculations</b> — and collect ⭐ stars. Press <b>Start</b> when you are ready.</p>
    </section>`);

  L.screens.forEach((s, idx) => {
    if (s.type === 'teach'){
      sections.push(`    <!-- ${idx+1} TEACH -->
    <section class="screen">
      <span class="tag lo">${s.tag}</span>
      <h2>${s.h2}</h2>
${s.html}
    </section>`);
    } else if (s.type === 'mcq'){
      const k = 'q' + (qKeys.length + 1);
      qKeys.push(k);
      const correct = s.opts.filter(o => o[1] === 1).length;
      if (correct !== 1) throw new Error(L.slug + ': MCQ ' + k + ' has ' + correct + ' correct options');
      const opts = s.opts.map(o => `          <button class="opt" data-correct="${o[1]}">${o[0]} <span class="mk">${o[1] === 1 ? '✅' : '❌'}</span></button>`).join('\n');
      sections.push(`    <!-- ${idx+1} MCQ ${k} -->
    <section class="screen">
      <span class="tag">Quick check</span>
      <h2>${s.h2}</h2>
      <div class="activity">
        <div class="qline"><span class="qnum">?</span><span>${s.q}</span></div>
        <div class="opts" data-q="${k}" data-why="${String(s.why).replace(/"/g, '&quot;')}">
${opts}
        </div>
        <div class="feedback" id="fb-${k}"></div>
      </div>
    </section>`);
    } else if (s.type === 'num'){
      const k = 'n' + (nKeys.length + 1);
      nKeys.push(k);
      sections.push(`    <!-- ${idx+1} NUMERIC ${k} -->
    <section class="screen">
      <span class="tag">Calculate</span>
      <h2>${s.h2}</h2>
      <div class="activity">
        <div class="qline"><span class="qnum">${nKeys.length}</span><span>${s.q}</span></div>
        <div class="numwrap" data-num="${k}" data-answer="${s.answer}" data-tol="${s.tol}">
          <input type="text" inputmode="decimal" aria-label="Your answer"><span class="unit">${s.unit}</span>
          <button class="checkbtn">Check ✓</button>
        </div>
        <div class="hint">Hint: ${s.hint}</div>
        <div class="feedback" id="fb-${k}"></div>
      </div>
    </section>`);
    } else if (s.type === 'sort'){
      if (sortData) throw new Error(L.slug + ': more than one sort game');
      sortData = s.data;
      sections.push(`    <!-- ${idx+1} SORT GAME -->
    <section class="screen">
      <span class="tag">Sort it</span>
      <h2>${s.h2}</h2>
      <p style="font-size:1.02rem;color:var(--soft)">${s.prompt}</p>
      <div class="activity">
        <div class="chips" id="sortChips"></div>
        <div class="bins">
          <div class="bin b1"><h3>${s.bins[0]}</h3><div class="drop" id="binA"></div></div>
          <div class="bin b2"><h3>${s.bins[1]}</h3><div class="drop" id="binB"></div></div>
          <div class="bin b3"><h3>${s.bins[2]}</h3><div class="drop" id="binC"></div></div>
        </div>
        <div class="feedback" id="fb-sort"></div>
      </div>
    </section>`);
    } else if (s.type === 'match'){
      if (matchPairs) throw new Error(L.slug + ': more than one match game');
      matchPairs = s.pairs;
      sections.push(`    <!-- ${idx+1} MATCH GAME -->
    <section class="screen">
      <span class="tag">Match it</span>
      <h2>${s.h2}</h2>
      <p style="font-size:1.02rem;color:var(--soft)">${s.prompt}</p>
      <div class="activity">
        <div class="match">
          <div class="mcol"><div class="mhead">${s.headL}</div><div id="mLeft"></div></div>
          <div class="mcol"><div class="mhead">${s.headR}</div><div id="mRight"></div></div>
        </div>
        <div class="feedback" id="fb-match"></div>
      </div>
    </section>`);
    }
  });

  if (!sortData) throw new Error(L.slug + ': no sort game');
  if (!matchPairs) throw new Error(L.slug + ': no match game');

  // recap
  sections.push(`    <!-- RECAP -->
    <section class="screen">
      <span class="tag">Recap</span>
      <h2>The big ideas to know</h2>
      <div class="recap">
${L.recap.map(r => `        <p>${r}</p>`).join('\n')}
      </div>
      <p>${L.recapTail}</p>
    </section>`);

  const total = qKeys.length + nKeys.length + sortData.length + matchPairs.length;

  sections.push(`    <!-- FINAL -->
    <section class="screen final">
      <div class="trophy">🏆</div>
      <h1>Mini-lesson complete!</h1>
      <div class="stars3" id="finalStars">⭐⭐⭐</div>
      <p class="big">You have worked through <b>${L.title}</b> at full A-level depth. 🎉</p>
      <p>Your stars: <span class="scorebig" id="finalScore">0</span> / <span id="finalMax">0</span></p>
      <p style="font-size:1.02rem;color:var(--soft)">Next: test yourself in the <b>Evaluate</b> stage Confidence Quiz, then lock it in with <b>Verify</b>.</p>
      <div class="sharebox">
        <h2>📣 Smashed it? Share your score</h2>
        <p style="font-size:1rem;color:var(--soft);margin-bottom:0">Challenge a mate to beat your stars, or show a parent how you got on.</p>
        <div class="sharerow">
          <button type="button" class="btn" data-share="mate">📲 Challenge a mate</button>
          <button type="button" class="btn ghost" data-share="parent">👪 Show your parents</button>
        </div>
      </div>

      <button class="btn restart" onclick="location.reload()" style="margin-top:14px">Restart 🔄</button>
      <p style="margin-top:14px"><a href="../../subjects.html" style="color:var(--kinetic);font-weight:700;text-decoration:none">→ Back to all subjects</a></p>
    </section>`);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${L.desc}">
<title>${L.title} — A-level Mini-Lesson · AI Study Method</title>
<meta name="robots" content="noindex,nofollow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
${HEAD_CSS}</style>
</head>
<body>
<div class="app">
  <div class="backstrip"><a href="../../subjects.html">← Back to subjects</a></div>
  <div class="topbar">
    <div class="logo"><span class="spark">${L.emoji}</span> ${L.title}</div>
    <div class="bar"><i id="bar"></i></div>
    <div class="score">⭐ <span id="score">0</span></div>
  </div>
  <div class="spec">${L.spec}</div>
  <div class="stage" id="stage">

${sections.join('\n\n')}

  </div>
  <div class="nav">
    <button class="btn ghost" id="back">⬅ Back</button>
    <button class="btn" id="next">Start ➡</button>
  </div>
</div>
<script>
const screens=[...document.querySelectorAll('.screen')];
let cur=0,score=0;
const bar=document.getElementById('bar'),scoreEl=document.getElementById('score'),nextBtn=document.getElementById('next'),backBtn=document.getElementById('back');
const done={};
function addScore(n){score+=n;scoreEl.textContent=score;}
// gating auto-detects from each screen's content — no index map needed
function screenGated(scr){
  var q=scr.querySelector('.opts[data-q]'); if(q && !done[q.dataset.q]) return true;
  var n=scr.querySelector('.numwrap[data-num]'); if(n && !done[n.dataset.num]) return true;
  if(scr.querySelector('#sortChips') && !done.sort) return true;
  if(scr.querySelector('#mLeft') && !done.match) return true;
  return false;
}
function refreshGate(){if(screenGated(screens[cur])){nextBtn.classList.add('locked');nextBtn.textContent='Answer to continue 🙂';}else if(cur!==0&&cur!==screens.length-1){nextBtn.classList.remove('locked');nextBtn.textContent='Next ➡';}}
function show(i){screens[cur].classList.remove('active');cur=i;screens[cur].classList.add('active');bar.style.width=(cur/(screens.length-1)*100)+'%';backBtn.style.visibility=cur===0?'hidden':'visible';if(cur===0){nextBtn.style.visibility='visible';nextBtn.textContent='Start ➡';}else if(cur===screens.length-1){nextBtn.style.visibility='hidden';}else{nextBtn.style.visibility='visible';nextBtn.textContent='Next ➡';}refreshGate();window.scrollTo({top:0,behavior:'smooth'});}
nextBtn.addEventListener('click',()=>{if(cur<screens.length-1&&!nextBtn.classList.contains('locked'))show(cur+1);});
backBtn.addEventListener('click',()=>{if(cur>0)show(cur-1);});

function setupMCQ(qkey){const box=document.querySelector('.opts[data-q="'+qkey+'"]');if(!box)return;const fb=document.getElementById('fb-'+qkey);const why=box.dataset.why||'';box.querySelectorAll('.opt').forEach(btn=>{btn.addEventListener('click',()=>{if(done[qkey])return;const ok=btn.dataset.correct==='1';if(ok){box.querySelectorAll('.opt').forEach(b=>b.classList.add('lock'));btn.classList.add('correct');fb.innerHTML='🎉 Correct! +1 star<span class="why">'+why+'</span>';fb.className='feedback good';addScore(1);done[qkey]=true;refreshGate();}else{btn.classList.add('wrong','lock');fb.textContent='Not quite — try another 💪';fb.className='feedback bad';}});});}
${JSON.stringify(qKeys)}.forEach(setupMCQ);

function setupNum(nkey){const box=document.querySelector('.numwrap[data-num="'+nkey+'"]');if(!box)return;const ans=parseFloat(box.dataset.answer);const tol=parseFloat(box.dataset.tol||'0.5');const input=box.querySelector('input');const btn=box.querySelector('.checkbtn');const fb=document.getElementById('fb-'+nkey);let tries=0;function check(){if(done[nkey])return;const raw=(input.value||'').replace(/[, ]/g,'').replace(/:\\s*1$/,'').replace(/kPa|mm³|cm³|dm³|µm³|mm²|cm²|m²|µm|kJ|mm|cm|bpm|[jw%x×:²³]/gi,'').trim();if(raw===''){fb.textContent='Type your answer first ✍️';fb.className='feedback';return;}const v=parseFloat(raw);if(!isNaN(v)&&Math.abs(v-ans)<=tol){input.classList.add('correct');input.disabled=true;btn.disabled=true;fb.textContent='🎉 Correct! +1 star';fb.className='feedback good';addScore(1);done[nkey]=true;refreshGate();}else{tries++;input.classList.add('wrong');fb.textContent=tries>=2?('Answer: '+ans+'. Check your working and move on.'):'Not quite — recalculate and try again 💪';fb.className='feedback bad';if(tries>=2){done[nkey]=true;input.value=ans;input.disabled=true;btn.disabled=true;refreshGate();}else{setTimeout(()=>{input.classList.remove('wrong');input.focus();input.select();},500);}}}btn.addEventListener('click',check);input.addEventListener('keydown',e=>{if(e.key==='Enter')check();});}
${JSON.stringify(nKeys)}.forEach(setupNum);

// classify game — each correct placement scores 1
const sortItems=${JSON.stringify(sortData)};
(function(){const chips=document.getElementById('sortChips');if(!chips)return;const fb=document.getElementById('fb-sort');const binA=document.getElementById('binA'),binB=document.getElementById('binB'),binC=document.getElementById('binC');let sel=null,placed=0;sortItems.forEach((r,i)=>{const c=document.createElement('button');c.className='chip';c.textContent=r[0];c.dataset.k=r[1];c.dataset.i=i;c.addEventListener('click',()=>{chips.querySelectorAll('.chip').forEach(x=>x.classList.remove('sel'));c.classList.add('sel');sel=c;});chips.appendChild(c);});function place(binKey,binEl){if(!sel){fb.textContent='Tap a card first ⬆';fb.className='feedback';return;}if(sel.dataset.k===binKey){const tag=document.createElement('span');tag.className='placed ok';tag.textContent=sel.textContent;binEl.appendChild(tag);sel.remove();sel=null;placed++;addScore(1);fb.textContent='✅ Correct!';fb.className='feedback good';if(placed===sortItems.length){fb.textContent=${JSON.stringify('🌟 All sorted! ' + L.sortDone)};fb.className='feedback good';done.sort=true;refreshGate();}}else{fb.textContent='Hmm, not that group — think again 🤔';fb.className='feedback bad';sel.classList.add('miss');setTimeout(()=>sel&&sel.classList.remove('miss'),400);}}
document.querySelector('.bin.b1').addEventListener('click',()=>place('a',binA));
document.querySelector('.bin.b2').addEventListener('click',()=>place('b',binB));
document.querySelector('.bin.b3').addEventListener('click',()=>place('c',binC));})();

// match game — each correct match scores 1
const matchPairs=${JSON.stringify(matchPairs)};
(function(){const L=document.getElementById('mLeft'),R=document.getElementById('mRight');if(!L)return;const fb=document.getElementById('fb-match');let selL=null,matched=0;const rOrder=matchPairs.map((_,i)=>i).sort(()=>Math.random()-0.5);matchPairs.forEach((p,i)=>{const a=document.createElement('div');a.className='mitem';a.textContent=p.l;a.dataset.i=i;a.addEventListener('click',()=>{if(a.classList.contains('done'))return;L.querySelectorAll('.mitem').forEach(x=>x.classList.remove('sel'));a.classList.add('sel');selL=a;});L.appendChild(a);});rOrder.forEach(i=>{const p=matchPairs[i];const b=document.createElement('div');b.className='mitem';b.textContent=p.r;b.dataset.i=i;b.addEventListener('click',()=>{if(b.classList.contains('done'))return;if(!selL){fb.textContent='Pick a statement on the left first ⬅';fb.className='feedback';return;}const li=selL.dataset.i;const want=matchPairs[li].r;if(p.r===want){selL.classList.add('done');selL.classList.remove('sel');b.classList.add('done');addScore(1);matched++;selL=null;if(matched===matchPairs.length){fb.textContent=${JSON.stringify('🌟 All matched! ' + L.matchDone)};fb.className='feedback good';done.match=true;refreshGate();}else{fb.textContent='✅ Matched!';fb.className='feedback good';}}else{b.classList.add('miss');setTimeout(()=>b.classList.remove('miss'),400);fb.textContent='Not that one — re-read the statement 🤔';fb.className='feedback bad';}});R.appendChild(b);});})();

// totals — every counted item calls addScore(1)
const totalPoints=document.querySelectorAll('.opts[data-q]').length
  +document.querySelectorAll('.numwrap[data-num]').length
  +sortItems.length
  +matchPairs.length;
const origShow=show;show=function(i){origShow(i);if(i===screens.length-1){document.getElementById('finalScore').textContent=score;document.getElementById('finalMax').textContent=totalPoints;const pct=score/totalPoints;document.getElementById('finalStars').textContent=pct>=0.85?'⭐⭐⭐':pct>=0.55?'⭐⭐':'⭐';}};
backBtn.style.visibility='hidden';bar.style.width='0%';
</script>
<script>
/* ── AISM juice layer: audio + celebration (shared 'aism-muted' pref) ── */
const AISM_REDUCED=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const AISM_SFX=(()=>{let actx=null,master=null,muted=false;try{muted=localStorage.getItem('aism-muted')==='1';}catch(e){}
function ensure(){try{if(!actx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return false;actx=new AC();master=actx.createGain();master.gain.value=0.28;master.connect(actx.destination);}if(actx.state==='suspended')actx.resume();return true;}catch(e){return false;}}
function tone(freq,dur,type,vol,endFreq){if(muted||!ensure())return;try{const t0=actx.currentTime;const o=actx.createOscillator(),g=actx.createGain();o.type=type||'sine';o.frequency.setValueAtTime(freq,t0);if(endFreq)o.frequency.exponentialRampToValueAtTime(Math.max(30,endFreq),t0+dur);g.gain.setValueAtTime(vol||0.1,t0);g.gain.exponentialRampToValueAtTime(0.001,t0+dur);o.connect(g);g.connect(master);o.start(t0);o.stop(t0+dur+0.02);}catch(e){}}
return{unlock(){ensure();},isMuted(){return muted;},toggleMute(){muted=!muted;try{localStorage.setItem('aism-muted',muted?'1':'0');}catch(e){}return muted;},ok(){tone(587,0.08,'sine',0.11);setTimeout(()=>tone(740,0.1,'sine',0.1),70);},bad(){tone(220,0.15,'sawtooth',0.05,165);},fanfare(){tone(523,0.1,'triangle',0.13);setTimeout(()=>tone(659,0.1,'triangle',0.13),100);setTimeout(()=>tone(784,0.22,'triangle',0.13),200);}};})();
function aismConfetti(){if(AISM_REDUCED)return;let st=document.getElementById('aism-confetti-style');if(!st){st=document.createElement('style');st.id='aism-confetti-style';st.textContent='@keyframes aismCfFall{from{transform:translateY(-10vh) rotate(0)}to{transform:translateY(110vh) rotate(720deg)}}.aism-cf{position:fixed;top:0;width:8px;height:12px;z-index:950;pointer-events:none;animation:aismCfFall linear both;}';document.head.appendChild(st);}const colours=['#4ade9a','#7b6fff','#ffd166','#ff6b6b','#5ac8ff'];for(let i=0;i<40;i++){const c=document.createElement('div');c.className='aism-cf';c.style.left=Math.random()*100+'vw';c.style.background=colours[i%colours.length];c.style.animationDuration=(1.6+Math.random()*1.4)+'s';c.style.animationDelay=(Math.random()*0.5)+'s';c.style.borderRadius=Math.random()<0.5?'50%':'2px';document.body.appendChild(c);setTimeout(()=>c.remove(),3600);}}
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
    var topic=logo?logo.textContent.replace(/[^\\x00-\\x7F]/g,"").replace(/\\s+/g," ").trim():"this topic";
    var spec=(document.querySelector(".spec")||{}).textContent||"";
    var lm=spec.match(/\\b(GCSE|A-?Level|IB[^·]*)\\b/i); var level=lm?lm[1].trim():"";
    var sm=spec.match(/\\b(Physics|Biology|Chemistry|Maths|Mathematics)\\b/i); var subject=sm?sm[1]:"";
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
</script>
</body>
</html>
`;
  return { html, total, screens: sections.length, mcq: qKeys.length, num: nKeys.length, sort: sortData.length, match: matchPairs.length };
}

const lessons = [].concat(
  require('./_alevel_bio_edexcel.js'),
  require('./_alevel_bio_ccea.js'),
  require('./_alevel_bio_eduqas.js')
);

let report = [];
lessons.forEach(L => {
  const out = build(L);
  const fn = path.join(OUT, `${L.key}-${L.slug}-mini-lesson.html`);
  fs.writeFileSync(fn, out.html, 'utf8');
  report.push(`${path.basename(fn)}  screens=${out.screens}  MCQ=${out.mcq} NUM=${out.num} SORT=${out.sort} MATCH=${out.match}  totalPoints=${out.total}`);
});
console.log(report.join('\n'));
console.log('\nWrote ' + lessons.length + ' files.');
