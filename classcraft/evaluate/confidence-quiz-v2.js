/* ── Confidence Quiz v2 — spec-aligned, confidence-calibrated diagnostic ──
   Loads quizzes/<subject>-<level>-<board>-<topic>.json via URL params, runs a
   per-question quiz with a 5-point confidence rating, then builds a diagnostic
   report: strengths, weaknesses, study priorities, over-confidence flags,
   per-learning-objective breakdown, AI prompts, and an L-Learn handoff.        */
(function () {
  'use strict';
  var root = document.getElementById('root');
  // If this page was opened from a shared "beat my score" link, show the challenge banner.
  /* no mate-challenge banner: the Confidence Quiz is a private diagnostic that exposes weaknesses, not a competitive share */
  var P = new URLSearchParams(location.search);
  function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function fail(m){ root.innerHTML = '<div class="state err">'+esc(m)+'</div>'; }

  // 5-point confidence scale (1..5). "Confident" = >=4.
  var CONF = [
    {v:1, e:'🤷', l:'No idea'},
    {v:2, e:'😟', l:'Not confident'},
    {v:3, e:'😐', l:'Neutral'},
    {v:4, e:'🙂', l:'Quite sure'},
    {v:5, e:'😎', l:'Very sure'}
  ];

  var quiz=null, state=null;

  // ── load ──
  var subject=(P.get('subject')||'').toLowerCase();
  var level=(P.get('level')||'').toLowerCase();
  var board=(P.get('board')||'').toLowerCase();
  var topic=(P.get('topic')||'').toLowerCase();
  var direct=P.get('quiz'); // optional direct file id
  if(!direct && (!subject||!level||!board||!topic)){ fail('Missing quiz parameters.'); return; }
  var file = 'quizzes/'+(direct || (subject+'-'+level+'-'+board+'-'+topic))+'.json';

  fetch(file,{cache:'no-cache'})
   .then(function(r){ if(!r.ok) throw 0; return r.json(); })
   .then(function(d){ quiz=d; boot(); })
   .catch(function(){ fail('This confidence quiz has not been authored yet.'); });

  function boot(){
    quiz.questions = (quiz.questions||[]);
    state = { i:0, ans:quiz.questions.map(function(){return {choice:null, conf:null};}) };
    renderIntro();
  }

  function loDisplay(id){
    var lo=(quiz.learningObjectives||[]).find(function(o){return o.id===id;});
    return lo? lo.title : id;
  }

  // ── intro ──
  function renderIntro(){
    var n=quiz.questions.length;
    var nq=quiz.questions.filter(function(q){return q.type!=='numeric';}).length;
    var nn=n-nq;
    root.innerHTML =
      '<div style="padding:34px 0 6px">'
      +'<span class="badge">E · Evaluate · Confidence Quiz</span>'
      +'<h1>'+esc(quiz.topicDisplay)+'</h1>'
      +'<p class="sub">A spec-aligned diagnostic for <b>'+esc(quiz.boardDisplay)+' '+esc(quiz.levelDisplay)+' '+esc(quiz.subjectDisplay)+'</b>. Answer each question, then rate how sure you are. At the end you get a personalised breakdown of what to revise first.</p>'
      +'<div class="meta"><span><b>'+n+'</b> questions</span><span>'+nq+' multiple-choice · '+nn+' calculation</span>'+(quiz.specCode?'<span>Spec '+esc(quiz.specCode)+'</span>':'')+'</div>'
      +'</div>'
      +'<div class="card">'
        +'<h2>How it works</h2>'
        +'<p class="sub" style="font-size:15px;margin-top:6px">Your <b>confidence</b> matters as much as your answer. Being sure and wrong is the most important thing to catch — so be honest with the sliders. Nothing is revealed until the end, so your confidence stays genuine.</p>'
        +'<div class="actions"><button class="btn" id="start">Start the quiz →</button></div>'
      +'</div>';
    document.getElementById('start').onclick=function(){ state.i=0; renderQ(); window.scrollTo(0,0); };
  }

  // ── question ──
  function renderQ(){
    var i=state.i, q=quiz.questions[i], n=quiz.questions.length, a=state.ans[i];
    var isNum = q.type==='numeric';
    var optsHtml='';
    if(isNum){
      optsHtml='<div class="numin"><input id="numin" type="text" inputmode="decimal" autocomplete="off" placeholder="answer" value="'+(a.choice==null?'':esc(a.choice))+'">'+(q.unit?'<span class="unit">'+esc(q.unit)+'</span>':'')+'</div>';
    } else {
      optsHtml='<div class="opts">'+ (q.options||[]).map(function(o,idx){
        var L='ABCDEF'[idx];
        return '<button class="opt'+(a.choice===idx?' sel':'')+'" data-i="'+idx+'"><span class="lt">'+L+'</span><span>'+esc(o)+'</span></button>';
      }).join('') +'</div>';
    }
    var pills='<div class="pills">'+CONF.map(function(c){
      return '<button class="pill'+(a.conf===c.v?' sel':'')+'" data-c="'+c.v+'"><div class="pe">'+c.e+'</div><div class="pl">'+c.l+'</div></button>';
    }).join('')+'</div>';

    root.innerHTML =
      '<div style="padding:26px 0 2px">'
      +'<div class="pnum">Question '+(i+1)+' of '+n+'</div>'
      +'<div class="pbar"><span style="width:'+Math.round((i)/n*100)+'%"></span></div>'
      +'</div>'
      +'<div class="card">'
        +'<div class="qmeta"><span class="qtype">'+(isNum?'Calculation':'Multiple choice')+'</span><span>'+esc(q.lo||'')+'</span></div>'
        +'<div class="qtext">'+esc(q.q)+'</div>'
        +optsHtml
        +'<div class="conf"><div class="conf-q">How sure are you?</div>'+pills+'</div>'
      +'</div>'
      +'<div class="qnav">'
        +'<button class="btn ghost sm" id="prev"'+(i===0?' style="visibility:hidden"':'')+'>← Back</button>'
        +'<button class="btn" id="next" disabled>'+(i===n-1?'See my report →':'Next →')+'</button>'
      +'</div>';

    function refresh(){ document.getElementById('next').disabled = (a.choice===null||a.choice==='') || a.conf===null; }
    if(isNum){
      var inp=document.getElementById('numin');
      inp.addEventListener('input',function(){ a.choice = inp.value.trim()===''?null:inp.value.trim(); refresh(); });
    } else {
      Array.prototype.forEach.call(root.querySelectorAll('.opt'),function(b){
        b.onclick=function(){ a.choice=+b.dataset.i; Array.prototype.forEach.call(root.querySelectorAll('.opt'),function(x){x.classList.remove('sel');}); b.classList.add('sel'); refresh(); };
      });
    }
    Array.prototype.forEach.call(root.querySelectorAll('.pill'),function(b){
      b.onclick=function(){ a.conf=+b.dataset.c; Array.prototype.forEach.call(root.querySelectorAll('.pill'),function(x){x.classList.remove('sel');}); b.classList.add('sel'); refresh(); };
    });
    refresh();
    document.getElementById('prev').onclick=function(){ if(state.i>0){state.i--;renderQ();window.scrollTo(0,0);} };
    document.getElementById('next').onclick=function(){ if(state.i<n-1){state.i++;renderQ();window.scrollTo(0,0);} else { renderReport(); window.scrollTo(0,0);} };
  }

  // ── grading ──
  function isCorrect(q,a){
    if(a.choice===null) return false;
    if(q.type==='numeric'){
      var v=parseFloat(String(a.choice).replace(/[, ]/g,''));
      if(isNaN(v)) return false;
      var tol = (q.tolerance!=null)? q.tolerance : Math.max(Math.abs(q.answer)*0.01, 1e-9);
      return Math.abs(v - q.answer) <= tol + 1e-9;
    }
    return a.choice===q.answer;
  }

  // ── report ──
  function renderReport(){
    var qs=quiz.questions, res=qs.map(function(q,i){
      var a=state.ans[i]; var ok=isCorrect(q,a); var confd=a.conf>=4;
      return {q:q,a:a,ok:ok,confd:confd, cat: ok?(confd?'secure':'solidify'):(confd?'flag':'gap')};
    });
    var n=qs.length;
    var correct=res.filter(function(r){return r.ok;}).length;
    var pct=Math.round(correct/n*100);
    var cat={secure:0,flag:0,solidify:0,gap:0}; res.forEach(function(r){cat[r.cat]++;});

    // per-LO
    var byLO={};
    res.forEach(function(r){
      var id=r.q.lo||'—'; if(!byLO[id]) byLO[id]={id:id, total:0, correct:0, conf:0, flag:0, gap:0};
      var o=byLO[id]; o.total++; if(r.ok)o.correct++; o.conf+=(r.a.conf||0); if(r.cat==='flag')o.flag++; if(r.cat==='gap')o.gap++;
    });
    var los=Object.keys(byLO).map(function(k){var o=byLO[k];o.pctv=o.correct/o.total;o.avgc=o.conf/o.total;return o;});
    los.sort(function(a,b){ return a.pctv-b.pctv || b.flag-a.flag; });

    // calibration message
    var calib;
    if(cat.flag>=2) calib='<b>You\'re over-confident in places.</b> '+cat.flag+' questions you felt sure about were actually wrong — these are likely misconceptions, and they\'re your #1 priority. Fixing a confident-but-wrong idea wins the most marks.';
    else if(cat.solidify>=Math.max(2,Math.round(n*0.2))) calib='<b>You know more than you think.</b> You got '+cat.solidify+' questions right while feeling unsure — your knowledge is solid but your confidence isn\'t. A bit of practice will turn these into reliable marks.';
    else if(cat.flag===0 && pct>=70) calib='<b>Well calibrated.</b> Your confidence matched your performance and you\'re in good shape on this topic.';
    else calib='Use the breakdown below to see exactly which learning objectives to revise first.';

    function colourFor(p){ return p>=0.75?'var(--good)':p>=0.5?'var(--warn)':'var(--flag)'; }

    var html='';
    // header + score
    html+='<div style="padding:30px 0 4px"><span class="badge">E · Evaluate · Your report</span>'
        +'<h1>'+esc(quiz.topicDisplay)+' — diagnostic</h1>'
        +'<p class="sub">'+esc(quiz.boardDisplay)+' '+esc(quiz.levelDisplay)+' '+esc(quiz.subjectDisplay)+'</p></div>';
    html+='<div class="card" style="display:flex;gap:24px;align-items:center;flex-wrap:wrap">'
        +'<div><div class="scorebig">'+pct+'%<small> ('+correct+'/'+n+')</small></div></div>'
        +'<div class="calib" style="flex:1;min-width:220px">'+calib+'</div></div>';

    // share / challenge — proud-of-this moment (works on every level via share-score.js)
    html+='<div class="card">'
        +'<h2>👪 Show your parents</h2>'
        +'<p class="sub" style="font-size:15px;margin:6px 0 12px">Send your result to a parent or guardian — they\'ll get a link to the full Velvet Method course (built by teachers, £25 for life).</p>'
        +'<div class="actions"><button class="btn" id="shareResult">📲 Show your parents</button>'
        +'<a class="btn ghost" href="../../velvet-method.html">About the Velvet Method</a></div></div>';

    // confidence quadrants
    html+='<div class="sectlbl">Confidence map</div>'
        +'<div class="grid2">'
        +quad('flag','⚠️',cat.flag,'Sure but wrong','Misconceptions — revise first')
        +quad('good','✅',cat.secure,'Sure & correct','Secure — exam-ready')
        +quad('warn','💡',cat.solidify,'Unsure but right','Solidify your confidence')
        +quad('info','📚',cat.gap,'Unsure & wrong','Knowledge gaps to learn')
        +'</div>';

    // per-LO breakdown
    html+='<div class="sectlbl">Breakdown by learning objective</div><div class="card">';
    los.forEach(function(o){
      var p=Math.round(o.pctv*100);
      html+='<div class="lo-row">'
        +'<div style="flex:1;min-width:0"><div class="lo-name">'+esc(loDisplay(o.id))+(o.flag?' <span class="tag no">flag</span>':'')+'</div>'
        +'<div class="lo-bar" style="margin-top:6px"><span style="width:'+p+'%;background:'+colourFor(o.pctv)+'"></span></div></div>'
        +'<div class="lo-score">'+o.correct+'/'+o.total+'</div></div>';
    });
    html+='</div>';

    // study priorities
    var prio=los.filter(function(o){return o.flag>0 || o.pctv<0.6;}).slice(0,6);
    if(prio.length){
      html+='<div class="sectlbl">📌 Study priorities <span style="color:var(--text-secondary);text-transform:none;letter-spacing:0">— in order</span></div>';
      prio.forEach(function(o){
        var isFlag=o.flag>0;
        html+='<div class="prio'+(isFlag?'':' gap')+'"><div class="pt">'+(isFlag?'⚠️ ':'📚 ')+esc(loDisplay(o.id))+'</div>'
          +'<div class="pd">'+(isFlag
              ? 'You were confident but got '+(o.total-o.correct)+'/'+o.total+' wrong — re-learn this carefully, it\'s a likely misconception.'
              : 'Scored '+o.correct+'/'+o.total+' — a knowledge gap worth targeting.')
          +'</div></div>';
      });
    }

    // L-Learn handoff
    var learn = quiz.learnHref || ('../../subjects.html');
    html+='<div class="sectlbl">Next step</div><div class="card">'
       +'<h2>Take your priorities into Learn</h2>'
       +'<p class="sub" style="font-size:15px;margin:6px 0 0">The L · Learn mini-lesson for this topic walks through the ideas above. Start with your flagged objectives.</p>'
       +'<div class="actions"><a class="btn" href="'+esc(learn)+'">Revise '+esc(quiz.topicDisplay)+' in Learn →</a>'
       +'<button class="btn ghost" id="retake">Retake quiz</button></div></div>';

    // AI prompts
    var strong=los.filter(function(o){return o.pctv>=0.75 && o.avgc>=4;}).slice(0,3);
    var weak=los.filter(function(o){return o.pctv<0.6 || o.flag>0;}).slice(0,3);
    // Prompt templates: quiz can override (e.g. languages want translation/writing
    // tasks, not "6-mark written question"). Placeholders: {lo} {board} {level} {subject} {topic}
    var ctx={board:quiz.boardDisplay, level:quiz.levelDisplay, subject:quiz.subjectDisplay, topic:quiz.topicDisplay};
    function fill(tpl,lo){ return tpl.replace(/\{lo\}/g,lo).replace(/\{board\}/g,ctx.board).replace(/\{level\}/g,ctx.level).replace(/\{subject\}/g,ctx.subject).replace(/\{topic\}/g,ctx.topic); }
    var STR = quiz.promptStrong || 'Give me a 6-mark exam-style written question on {lo} for {board} {level} {subject} ({topic}), then mark my answer against the spec.';
    var WK  = quiz.promptWeak   || 'Explain {lo} for {board} {level} {subject} simply, with a worked example and the most common mistake students make.';
    html+='<div class="sectlbl">🤖 AI prompts to go further</div><div class="card">';
    if(strong.length){
      html+='<p class="sub" style="font-size:14.5px;margin-bottom:2px"><b>Stretch your strong topics</b> — paste into any AI tutor to get exam-ready:</p>';
      strong.forEach(function(o){ html+=prompt(fill(STR, loDisplay(o.id))); });
    }
    if(weak.length){
      html+='<p class="sub" style="font-size:14.5px;margin:16px 0 2px"><b>Shore up your weak spots</b>:</p>';
      weak.forEach(function(o){ html+=prompt(fill(WK, loDisplay(o.id))); });
    }
    if(!strong.length && !weak.length){ html+='<p class="sub">Finish the quiz to get tailored prompts.</p>'; }
    html+='</div>';

    // question review
    html+='<div class="sectlbl">Review every question</div>';
    res.forEach(function(r,i){
      var q=r.q;
      var your = q.type==='numeric'? (r.a.choice==null?'—':r.a.choice+(q.unit?' '+q.unit:'')) : (q.options&&r.a.choice!=null?('ABCDEF'[r.a.choice]+') '+q.options[r.a.choice]):'—');
      var corr = q.type==='numeric'? (q.answer+(q.unit?' '+q.unit:'')) : (q.options?('ABCDEF'[q.answer]+') '+q.options[q.answer]):'');
      html+='<details class="rev"><summary><span class="tag '+(r.ok?'ok':'no')+'">'+(r.ok?'✓':'✗')+'</span><span style="flex:1">Q'+(i+1)+'. '+esc(q.q)+'</span><span class="lo-id">'+esc(CONF[(r.a.conf||1)-1].l)+'</span></summary>'
        +'<div class="revbody"><div>Your answer: <b>'+esc(your)+'</b>'+(r.ok?'':' · Correct: <b>'+esc(corr)+'</b>')+'</div>'
        +(q.explain?'<div style="margin-top:6px">'+esc(q.explain)+'</div>':'')+'</div></details>';
    });

    html+='<div class="actions"><a class="btn ghost" href="../../subjects.html">← Back to all resources</a></div>';

    root.innerHTML=html;

    // wire copy buttons + retake
    Array.prototype.forEach.call(root.querySelectorAll('.copy'),function(b){
      b.onclick=function(){ var t=b.getAttribute('data-t'); (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){b.textContent='Copied';b.classList.add('done');setTimeout(function(){b.textContent='Copy';b.classList.remove('done');},1400);},function(){}); };
    });
    var rt=document.getElementById('retake'); if(rt) rt.onclick=function(){ state.ans=qs.map(function(){return {choice:null,conf:null};}); state.i=0; renderQ(); window.scrollTo(0,0); };

    // parent share → links to for-parents.html (the Velvet Method course pitch). No mate-challenge: a diagnostic shouldn't be competitive.
    var sb=document.getElementById('shareResult');
    if(sb) sb.onclick=function(){
      if(!(window.Arcade && Arcade.shareWithParents)){ alert('Sharing isn\'t available in this browser.'); return; }
      Arcade.shareWithParents({ subject:quiz.subjectDisplay, level:quiz.levelDisplay, topic:quiz.topicDisplay, score:correct, total:n });
    };

    // store last result (best-effort)
    try{ localStorage.setItem('cq2:'+(direct||subject+'-'+level+'-'+board+'-'+topic), JSON.stringify({pct:pct,date:Date.now()})); }catch(e){}
  }

  function quad(cls,emoji,n,label,desc){
    return '<div class="quad '+cls+'"><div class="n">'+n+'</div><div class="l">'+emoji+' '+esc(label)+'</div><div class="d">'+esc(desc)+'</div></div>';
  }
  function prompt(text){
    return '<div class="prompt"><code>'+esc(text)+'</code><button class="copy" data-t="'+esc(text)+'">Copy</button></div>';
  }
})();
