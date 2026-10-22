/* ── Verify quiz — the V · Verify stage of a Velvet Revision session ──
   Loads quizzes/<subject>-<level>-<board>-<topic>.json (questions that are NOT in
   that topic's Evaluate confidence quiz), marks each answer as soon as it is
   chosen, shows why, and ends with a score compared against the student's
   Evaluate score from this browser (localStorage cq2:<key>).                   */
(function () {
  'use strict';
  var root = document.getElementById('root');
  var P = new URLSearchParams(location.search);
  function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  var fmt = esc;
  function clean(v){ v=(v||'').toLowerCase(); return /^[a-z0-9-]+$/.test(v)?v:''; }
  var subject=clean(P.get('subject')), level=clean(P.get('level')), board=clean(P.get('board')), topic=clean(P.get('topic'));
  var key = subject+'-'+level+'-'+board+'-'+topic;
  var PASS = 0.8;
  var quiz=null, state=null;
  function fail(m){ root.innerHTML='<div class="state err">'+esc(m)+'</div>'; }
  function track(n, props){ try{ if(window.plausible) window.plausible(n, props?{props:props}:undefined); }catch(e){} }

  if(!subject||!level||!board||!topic){ fail('Missing quiz parameters.'); return; }
  fetch('quizzes/'+key+'.json',{cache:'no-cache'})
    .then(function(r){ if(!r.ok) throw 0; return r.json(); })
    .then(function(d){ quiz=d; boot(); })
    .catch(function(){ fail('There is no Verify quiz for this topic yet.'); });

  var NUMERIC=/^[-+−]?\s*[\d.,]+(\s*[×x]\s*10\s*[⁰-⁹⁻\-\d^−]*)?\s*[a-zA-Zµ°%\/²³⁻¹\s]*$/;
  function shuffleOptions(q){
    if(!Array.isArray(q.options)||q.options.length<2||typeof q.answer!=='number') return;
    if(q.options.every(function(o){return NUMERIC.test(String(o).trim());})) return;
    var idx=q.options.map(function(_,i){return i;});
    for(var k=idx.length-1;k>0;k--){ var j=Math.floor(Math.random()*(k+1)); var t=idx[k]; idx[k]=idx[j]; idx[j]=t; }
    q.options=idx.map(function(i){return q.options[i];});
    if(Array.isArray(q.optionWhy)) q.optionWhy=idx.map(function(i){return q.optionWhy[i];});
    q.answer=idx.indexOf(q.answer);
  }
  function figHtml(q){
    var f=q&&q.figure; if(!f||!f.svg) return '';
    var svg=String(f.svg);
    if(f.alt && svg.indexOf('aria-label=')<0) svg=svg.replace(/<svg\b/,'<svg aria-label="'+esc(f.alt)+'"');
    return '<div class="qfig">'+svg+'</div>';
  }
  function loTitle(id){
    var lo=(quiz.learningObjectives||[]).find(function(o){return o.id===id;});
    return lo?lo.title:id;
  }
  function qs(extra){
    var q='subject='+subject+'&level='+level+'&board='+board+'&topic='+topic;
    return extra?q+'&'+extra:q;
  }
  function evalScore(){
    try{ var v=JSON.parse(localStorage.getItem('cq2:'+key)||'null'); return v&&typeof v.pct==='number'?v.pct:null; }catch(e){ return null; }
  }

  function boot(){
    if(quiz.notation==='sci' && window.SciNotation) fmt=window.SciNotation.html;
    quiz.questions=(quiz.questions||[]).filter(function(q){return Array.isArray(q.options)&&typeof q.answer==='number';});
    if(!quiz.questions.length){ fail('There is no Verify quiz for this topic yet.'); return; }
    quiz.questions.forEach(shuffleOptions);
    state={ i:0, ans:quiz.questions.map(function(){return null;}) };
    document.title='Verify — '+quiz.topicDisplay+' · AI Study Method';
    renderIntro();
  }

  // The second Verify option: the same topic in the Revision Arcade.
  function arcadeChoice(){
    var arc=quiz.arcade||[]; if(!arc.length) return '';
    var h='<div class="sectlbl">Or verify with games</div><div class="card"><p class="sub" style="font-size:15px;margin-bottom:12px">Practise this topic in the Revision Arcade: timed games built from the same question bank.</p><div class="chips">';
    arc.forEach(function(x){ h+='<a class="chip" href="'+esc(x.href)+'">🎮 '+esc(x.label)+'</a>'; });
    return h+'</div></div>';
  }
  function renderIntro(){
    var n=quiz.questions.length, ev=evalScore();
    root.innerHTML=
      '<div style="padding:34px 0 6px">'
      +'<span class="badge">V · Verify · Check your understanding</span>'
      +'<h1>'+esc(quiz.topicDisplay)+'</h1>'
      +'<p class="sub">You\'ve been through Learn. Now check it stuck: <b>'+n+' new questions</b> on '+esc(quiz.boardDisplay+' '+quiz.subjectDisplay)+', none of them from the Evaluate quiz. Each answer is marked straight away, with the reasoning.</p>'
      +'<div class="meta"><span><b>'+n+'</b> questions</span><span>Aim for '+Math.round(PASS*100)+'%</span>'+(ev!=null?'<span>Your Evaluate score: <b>'+ev+'%</b></span>':'')+'</div>'
      +'</div>'
      +'<div class="card"><h2>How it works</h2>'
      +'<p class="sub" style="font-size:15px;margin-top:6px">Pick an answer and you\'ll see at once whether it\'s right. If it isn\'t, you\'ll see why that option is tempting and where it goes wrong. Read the feedback before moving on: that\'s where the learning happens.</p>'
      +'<div class="actions"><button class="btn" id="start">Start →</button></div></div>'
      +arcadeChoice();
    document.getElementById('start').onclick=function(){ state.i=0; renderQ(); window.scrollTo(0,0); track('Verify quiz: started',{topic:key}); };
  }

  function renderQ(){
    var i=state.i, q=quiz.questions[i], n=quiz.questions.length, a=state.ans[i];
    var done=a!==null;
    var opts='<div class="opts" role="group" aria-label="Answer options">'+q.options.map(function(o,idx){
      var cls='opt';
      if(done){ if(idx===q.answer) cls+=' right'; else if(idx===a) cls+=' wrong'; else cls+=' dim'; }
      return '<button class="'+cls+'" data-i="'+idx+'"'+(done?' disabled':'')+'><span class="lt">'+'ABCDEF'[idx]+'</span><span>'+fmt(o)+'</span></button>';
    }).join('')+'</div>';
    var fb='';
    if(done){
      var ok=a===q.answer;
      fb='<div class="fb '+(ok?'ok':'no')+'"><div class="fbh">'+(ok?'✓ Correct':'✗ Not quite')+'</div>'
        +(!ok && Array.isArray(q.optionWhy) && q.optionWhy[a] ? '<p><b>Why '+'ABCDEF'[a]+' doesn\'t work:</b> '+fmt(q.optionWhy[a])+'</p>' : '')
        +(q.explain?'<p>'+(ok?'':'<b>The right idea:</b> ')+fmt(q.explain)+'</p>':'')
        +(q.working?'<p><b>Working:</b> '+fmt(q.working)+'</p>':'')
        +'</div>';
    }
    root.innerHTML=
      '<div style="padding:26px 0 2px"><div class="pnum">Question '+(i+1)+' of '+n+'</div>'
      +'<div class="pbar"><span style="width:'+Math.round(i/n*100)+'%"></span></div></div>'
      +'<div class="card">'
        +'<div class="qmeta"><span class="qtype">Multiple choice</span><span>'+esc(q.lo||'')+'</span>'+(q.hl?'<span class="qhl">HL</span>':'')+'</div>'
        +'<div class="qtext">'+fmt(q.q)+'</div>'+figHtml(q)+opts
        +'<div aria-live="polite">'+fb+'</div>'
      +'</div>'
      +'<div class="qnav"><button class="btn ghost sm" id="prev"'+(i===0?' style="visibility:hidden"':'')+'>← Back</button>'
      +'<button class="btn" id="next"'+(done?'':' disabled')+'>'+(i===n-1?'See my result →':'Next →')+'</button></div>';
    if(!done){
      Array.prototype.forEach.call(root.querySelectorAll('.opt'),function(b){
        b.onclick=function(){ state.ans[i]=+b.dataset.i; renderQ(); var f=root.querySelector('.fb'); if(f&&f.scrollIntoView) try{f.scrollIntoView({behavior:'smooth',block:'nearest'});}catch(e){} };
      });
    }
    document.getElementById('prev').onclick=function(){ if(state.i>0){state.i--;renderQ();window.scrollTo(0,0);} };
    document.getElementById('next').onclick=function(){ if(state.i<n-1){state.i++;renderQ();window.scrollTo(0,0);} else { renderReport(); window.scrollTo(0,0);} };
  }

  function renderReport(){
    var Q=quiz.questions, n=Q.length;
    var res=Q.map(function(q,i){ return {q:q, a:state.ans[i], ok:state.ans[i]===q.answer}; });
    var correct=res.filter(function(r){return r.ok;}).length, pct=Math.round(correct/n*100);
    var ev=evalScore();
    var verdict, cls;
    if(pct>=PASS*100){ verdict='<b>Verified.</b> You\'ve shown you understand this topic. Lock it in with Explore and Transform.'; cls='good'; }
    else if(pct>=60){ verdict='<b>Nearly there.</b> Most of it has stuck. Revisit the ideas listed below, then try again.'; cls='warn'; }
    else { verdict='<b>Not yet.</b> That\'s useful to know now rather than in the exam. Go back to Learn for the ideas below, then retry.'; cls='flag'; }
    var cmp='';
    if(ev!=null){
      var d=pct-ev;
      cmp='<div class="cmp"><span>Evaluate <b>'+ev+'%</b></span><span class="arr">→</span><span>Verify <b>'+pct+'%</b></span>'
        +'<span class="delta '+(d>0?'up':d<0?'down':'')+'">'+(d>0?'+':'')+d+' points</span></div>';
    }
    // objectives missed
    var miss={}, order=[];
    res.forEach(function(r){ if(!r.ok){ var id=r.q.lo||'—'; if(!miss[id]){miss[id]=0;order.push(id);} miss[id]++; } });
    var html='<div style="padding:30px 0 4px"><span class="badge">V · Verify · Your result</span>'
      +'<h1>'+esc(quiz.topicDisplay)+'</h1><p class="sub">'+esc(quiz.levelDisplay+' '+quiz.subjectDisplay+' · '+String(quiz.boardDisplay||'').replace(/^IB /,''))+'</p></div>';
    html+='<div class="card score '+cls+'"><div class="scorebig">'+pct+'%<small> ('+correct+'/'+n+')</small></div>'
      +'<div class="calib">'+verdict+cmp+'</div></div>';
    if(order.length){
      html+='<div class="sectlbl">Ideas to go back to</div><div class="card"><ul class="miss">';
      order.forEach(function(id){ html+='<li><span class="lo-id">'+esc(id)+'</span> '+fmt(loTitle(id))+(miss[id]>1?' <span class="tag no">×'+miss[id]+'</span>':'')+'</li>'; });
      html+='</ul>'+(quiz.learnHref?'<div class="actions" style="margin-top:14px"><a class="btn ghost sm" href="'+esc(quiz.learnHref)+'">Back to the Learn mini-lesson →</a></div>':'')+'</div>';
    }
    // next steps
    html+='<div class="sectlbl">Next in your Velvet session</div><div class="next">'
      +'<a class="nx" style="--c:#b83280" href="../explore-launcher.html?'+esc(qs())+'"><b>E · Explore</b><span>Stretch the topic: edge cases, simulations, history.</span></a>'
      +'<a class="nx" style="--c:#2f855a" href="../transform-launcher.html?'+esc(qs())+'"><b>T · Transform</b><span>Make tomorrow\'s review questions from today.</span></a>'
      +'</div>';
    var arc=quiz.arcade||[];
    if(arc.length){
      html+='<div class="sectlbl">More practice in the Revision Arcade</div><div class="card"><div class="chips">';
      arc.forEach(function(x){ html+='<a class="chip" href="'+esc(x.href)+'">🎮 '+esc(x.label)+'</a>'; });
      html+='</div></div>';
    }
    // review
    html+='<div class="sectlbl">Review every question</div>';
    res.forEach(function(r,i){
      var q=r.q;
      html+='<details class="rev"><summary><span class="tag '+(r.ok?'ok':'no')+'">'+(r.ok?'✓':'✗')+'</span><span style="flex:1">Q'+(i+1)+'. '+fmt(q.q)+'</span></summary>'
        +'<div class="revbody">'+figHtml(q)
        +'<div>Your answer: <b>'+fmt(q.options[r.a])+'</b>'+(r.ok?'':' · Correct: <b>'+fmt(q.options[q.answer])+'</b>')+'</div>'
        +((!r.ok&&Array.isArray(q.optionWhy)&&q.optionWhy[r.a])?'<div style="margin-top:6px"><b>Why that answer doesn\'t work:</b> '+fmt(q.optionWhy[r.a])+'</div>':'')
        +(q.explain?'<div style="margin-top:6px">'+(r.ok?'':'<b>The right idea:</b> ')+fmt(q.explain)+'</div>':'')
        +(q.working?'<div style="margin-top:6px"><b>Working:</b> '+fmt(q.working)+'</div>':'')
        +'</div></details>';
    });
    html+='<div class="actions"><button class="btn ghost" id="retake">Try again</button>'
      +'<a class="btn ghost" href="../../subjects.html?subject='+esc(subject)+'&amp;level='+esc(level)+'&amp;board='+esc(board)+'">← Back to your spec map</a></div>';
    root.innerHTML=html;
    document.getElementById('retake').onclick=function(){ quiz.questions.forEach(shuffleOptions); state={i:0,ans:quiz.questions.map(function(){return null;})}; renderQ(); window.scrollTo(0,0); };
    try{ localStorage.setItem('vq:'+key, JSON.stringify({pct:pct,date:Date.now()})); }catch(e){}
    track('Verify quiz: completed',{topic:key, band: pct>=80?'80+':pct>=60?'60-79':'<60'});
  }
})();
