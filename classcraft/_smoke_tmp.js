const {JSDOM}=require('jsdom');
const fs=require('fs'), path=require('path');
const dir=process.argv[2];
const files=fs.readdirSync(dir).filter(f=>/^computer-science-gcse-ocr-.*-mini-lesson\.html$/.test(f)).sort();
let fail=0;
for(const f of files){
  let html=fs.readFileSync(path.join(dir,f),'utf8').replace(/<script src="[^"]*"><\/script>/g,'');
  const errs=[];
  const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,
    beforeParse(w){ w.matchMedia=()=>({matches:false,addListener(){},removeListener(){}}); w.scrollTo=()=>{};
      w.AudioContext=w.webkitAudioContext=function(){return{createGain:()=>({gain:{value:0,setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){}}),createOscillator:()=>({type:'',frequency:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},start(){},stop(){}}),destination:{},currentTime:0,state:'running',resume(){}};};
      w.localStorage={getItem:()=>null,setItem(){}}; }});
  const w=dom.window, d=w.document;
  w.onerror=(m)=>errs.push('window.onerror: '+m);
  const chips=d.querySelectorAll('#cellChips .chip').length;
  const mLeft=d.querySelectorAll('#mLeft .mitem').length, mRight=d.querySelectorAll('#mRight .mitem').length;
  const opts=d.querySelectorAll('.opts[data-q] .opt').length;
  const screens=d.querySelectorAll('.screen').length;
  if(chips<4) errs.push('classify chips='+chips);
  if(mLeft<3||mRight<3) errs.push('match L='+mLeft+' R='+mRight);
  if(opts<4) errs.push('opts='+opts);
  const box=d.querySelector('.opts[data-q]');
  const before=parseInt(d.getElementById('score').textContent);
  const correct=[...box.querySelectorAll('.opt')].find(b=>b.getAttribute('data-correct')==='1');
  correct.dispatchEvent(new w.Event('click',{bubbles:true}));
  const after=parseInt(d.getElementById('score').textContent);
  if(!(after>before)) errs.push('MCQ score '+before+'->'+after);
  if(!d.getElementById('finalScore')||!d.getElementById('finalStars')) errs.push('final missing');
  if(errs.length){ fail++; console.log('FAIL '+f); errs.forEach(e=>console.log('   - '+e)); }
  else console.log('OK   '+f+' (screens='+screens+' chips='+chips+' match='+mLeft+'/'+mRight+' opts='+opts+')');
  dom.window.close();
}
process.exit(fail?1:0);
