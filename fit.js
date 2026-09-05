/* Type-size test: emulates real layout for the card word (inline-block, wraps at spaces,
   0.55em average glyph width) and checks fitText actually grows the text.
   This is the test that would have caught the width:100% bug. */
const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
const js=html.split('<script>')[1].split('</script>')[0];
const decks=fs.readFileSync(path.join(ROOT,'decks.js'),'utf8');

function boot(W,H){
  const els={};
  function makeEl(id){
    const e={id,style:{},textContent:'',children:[],
      classList:{add(){},remove(){},contains(){return false},toggle(){}},
      appendChild(c){e.children.push(c)},addEventListener(){},removeAttribute(){},setAttribute(){}};
    Object.defineProperty(e,'innerHTML',{get(){return e._h||''},set(v){e._h=v}});
    if(id==='word'){
      const fsz=()=>parseFloat(e.style.fontSize)||16;
      const full=()=>e.textContent.length*0.55*fsz();
      const widest=()=>Math.max(...e.textContent.split(' ').map(w=>w.length))*0.55*fsz();
      Object.defineProperty(e,'clientWidth',{get(){return Math.min(full(), W*0.94);}});
      Object.defineProperty(e,'scrollWidth',{get(){return Math.max(widest(), Math.min(full(), W*0.94));}});
      Object.defineProperty(e,'scrollHeight',{get(){return Math.ceil(full()/(W*0.94))*fsz()*1.02;}});
    }
    return e;
  }
  const document={getElementById(id){return els[id]||(els[id]=makeEl(id))},querySelectorAll(){return{forEach(){}}},
    createElement(){return makeEl('x')},addEventListener(){},visibilityState:'visible',body:{style:{}},documentElement:{}};
  const api=new Function('window','document','navigator','performance','location','history','localStorage','screen',
    'requestAnimationFrame','cancelAnimationFrame','setInterval','clearInterval','setTimeout','clearTimeout',
    'DeviceMotionEvent','DeviceOrientationEvent','Promise','JSON','DECKS', js+'; return {fitText};')(
    {addEventListener(){},matchMedia(){return{matches:false}},navigator:{},innerWidth:W,innerHeight:H,isSecureContext:true,self:1,top:1},
    document,{vibrate(){},userAgent:'x'},{now(){return 0}},{protocol:'https:',hostname:'x'},{replaceState(){},pushState(){}},
    {getItem(){return null},setItem(){}},{},()=>0,()=>{},()=>0,()=>{},()=>0,()=>{},undefined,undefined,Promise,JSON,
    new Function(decks+';return DECKS;')());
  return {api, word:document.getElementById('word'), img:document.getElementById('cardImg'), taboo:document.getElementById('taboo')};
}
let pass=0,fail=0;
function size(t,W,H){ const b=boot(W,H); b.word.textContent=t; b.img.style.display='none'; b.taboo.textContent='';
  b.api.fitText(); return Math.round(parseFloat(b.word.style.fontSize)); }
function check(name,ok,got){ if(ok){pass++;console.log('  PASS   '+name);} else {fail++;console.log('  FAIL   '+name+'  — '+got);} }

console.log('\n=== TYPE SIZE (landscape 900x400) ===');
let s=size('Bidet',900,400);            check('a short word fills the height', s>=250, s+'px');
s=size('Nail clippers',900,400);        check('a two-word card is still big', s>=120, s+'px');
s=size('Compression socks',900,400);    check('a long word is limited by width, not the floor', s>=80 && s<200, s+'px');
s=size('Toast lands butter side down',900,400); check('a long phrase wraps and stays readable', s>=70, s+'px');

console.log('\n=== TYPE SIZE (portrait 412x850) ===');
s=size('Bidet',412,850);                check('portrait short word is large', s>=120, s+'px');
s=size('Compression socks',412,850);    check('portrait long word is width-bound but not tiny', s>=55, s+'px');

console.log('\n=== SUMMARY ===');
console.log(pass+' passed, '+fail+' failed');
process.exit(fail?1:0);
