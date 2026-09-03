/* Conformance suite for the Tilt game.
   Loads the REAL code out of index.html and drives it against a DOM stub.
   Every case is a pair where possible: one input the rule permits, one it forbids.
   Verdicts: PASS / FAIL / CANNOT-EVALUATE. Cannot-evaluate is never counted as a pass. */

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

/* ---------- DOM stub ---------- */
function makeEl(id){
  return {
    id, style:{}, textContent:'', innerHTML:'', value:'', title:'',
    children:[], onclick:null, className:'',
    classList:{
      _s:new Set(),
      add(c){ this._s.add(c); }, remove(c){ this._s.delete(c); },
      contains(c){ return this._s.has(c); },
      toggle(c,on){ if(on===undefined) on=!this._s.has(c); on?this._s.add(c):this._s.delete(c); }
    },
    removeAttribute(){}, setAttribute(){},
    appendChild(c){ this.children.push(c); },
    addEventListener(){}, focus(){}
  };
}
function buildEnv(opts){
  opts = opts || {};
  const els = {};
  const document = {
    getElementById(id){ return els[id] || (els[id] = makeEl(id)); },
    querySelectorAll(){ return { forEach(){} }; },
    createElement(){ return makeEl('new'); },
    addEventListener(){}, visibilityState:'visible',
    body:{ style:{} }
  };
  const storeData = Object.assign({}, opts.storage);
  const localStorage = {
    getItem(k){ return k in storeData ? storeData[k] : null; },
    setItem(k,v){ storeData[k] = String(v); }
  };
  let now = 0;
  const env = {
    els, storeData,
    clock:{ get(){ return now; }, set(v){ now = v; }, advance(ms){ now += ms; } },
    document, localStorage,
    window:{
      addEventListener(){}, matchMedia(){ return {matches:false}; },
      innerWidth:400, innerHeight:800, isSecureContext:true, self:1, top:1,
      navigator:{}, AudioContext:function(){ throw new Error('no audio'); }
    },
    navigator:{ vibrate(){}, userAgent:'node', wakeLock:null },
    performance:{ now(){ return now; } },
    location:{ protocol:'https:', hostname:'example.com' },
    history:{ replaceState(){}, pushState(){} }
  };
  return env;
}

/* ---------- load the real code ---------- */
const html = fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
const decksSrc = fs.readFileSync(path.join(ROOT,'decks.js'),'utf8');
const appSrc = html.split('<script>')[1].split('</script>')[0];

const EXPORTS = `; return {
  tiltCheck, refillBag, nextCard, resolve, remember, liveCards, visibleDecks, mixedDeck,
  banWord, unbanWord, setTilt, setTouch, ALL_DECKS, mixedDeck, customDeck,
  get bag(){return bag}, set bag(v){bag=v},
  get deck(){return deck}, set deck(v){deck=v},
  get card(){return card}, set card(v){card=v},
  get log(){return log}, set log(v){log=v},
  get score(){return score}, set score(v){score=v},
  get streak(){return streak}, set streak(v){streak=v},
  get pitch(){return pitch}, set pitch(v){pitch=v},
  get neutral(){return neutral}, set neutral(v){neutral=v},
  get tiltState(){return tiltState}, set tiltState(v){tiltState=v},
  get sensorSeen(){return sensorSeen}, set sensorSeen(v){sensorSeen=v},
  get running(){return running}, set running(v){running=v},
  get invert(){return invert}, set invert(v){invert=v},
  get showEt(){return showEt}, set showEt(v){showEt=v},
  get banned(){return banned},
  get seenHistory(){return seenHistory},
  get recent(){return recent}, set recent(v){recent=v},
  get TRIGGER(){return TRIGGER},
  startParty, commitRound, rematch, leaveParty,
  customDeck, deckById, toggleSelected, playSelection,
  get selected(){return selected}, get multi(){return multi}, set multi(v){multi=v},
  get session(){return session}, set session(v){session=v},
  get setup(){return setup},
  get tiltOn(){return tiltOn}, get touchOn(){return touchOn}
}`;

function load(opts){
  const env = buildEnv(opts);
  const DECKS = new Function(decksSrc + '; return DECKS;')();
  const factory = new Function(
    'window','document','navigator','performance','location','history','localStorage',
    'requestAnimationFrame','cancelAnimationFrame','setInterval','clearInterval','setTimeout',
    'DeviceMotionEvent','DeviceOrientationEvent','Promise','DECKS',
    appSrc + EXPORTS
  );
  const api = factory(
    env.window, env.document, env.navigator, env.performance, env.location, env.history,
    env.localStorage,
    ()=>0, ()=>{}, ()=>0, ()=>{}, ()=>0,
    undefined, undefined, Promise, DECKS
  );
  return { api, env, DECKS };
}

/* ---------- assertions ---------- */
let pass=0, fail=0, cant=0;
const failures=[];
function check(rule, expectation, got, ok){
  if(ok===null){ cant++; console.log('  CANNOT-EVALUATE  '+rule); return; }
  if(ok){ pass++; console.log('  PASS   '+rule); }
  else { fail++; failures.push(rule+'\n           expected '+expectation+', got '+got);
         console.log('  FAIL   '+rule+'  — expected '+expectation+', got '+got); }
}

/* ---------- helpers ---------- */
function driveTilt(api, env, series){
  /* series: array of {pitch, ms}. Returns the events tiltCheck emitted. */
  const events=[];
  series.forEach(step=>{
    api.pitch = step.pitch;
    env.clock.advance(step.ms || 60);
    const e = api.tiltCheck(env.clock.get());
    if(e) events.push(e);
  });
  return events;
}
function armed(api, env){
  api.sensorSeen = true;
  api.neutral = 0; api.pitch = 0;
  api.tiltState = 'armed';
  env.clock.advance(100);
}
function hold(pitchVal, ms, stepMs){
  const out=[]; let t=0;
  while(t<ms){ out.push({pitch:pitchVal, ms:stepMs||60}); t+=(stepMs||60); }
  return out;
}

console.log('\n=== TILT STATE MACHINE ===');
{
  /* Rule: "a 26-degree tilt down scores; the phone must return to the neutral
     band before the next card can be resolved" */
  let {api, env} = load();
  armed(api, env);
  let ev = driveTilt(api, env, hold(0,200).concat(hold(-60,400)));
  check('tilt down past threshold fires exactly one correct', '["ok"]', JSON.stringify(ev),
        ev.length===1 && ev[0]==='ok');

  ({api, env} = load()); armed(api, env);
  ev = driveTilt(api, env, hold(0,200).concat(hold(60,400)));
  check('tilt up past threshold fires exactly one pass', '["pass"]', JSON.stringify(ev),
        ev.length===1 && ev[0]==='pass');

  /* must-refuse: a long held over-sweep must not burn several cards */
  ({api, env} = load()); armed(api, env);
  ev = driveTilt(api, env, hold(0,200).concat(hold(-85,4000)));
  check('held over-sweep does not double fire', '1 event', ev.length+' events', ev.length===1);

  /* must-pass: movement below threshold scores nothing */
  ({api, env} = load()); armed(api, env);
  ev = driveTilt(api, env, hold(0,200).concat(hold(-20,1500)).concat(hold(18,1500)));
  check('sub-threshold wobble scores nothing', '0 events', ev.length+' events', ev.length===0);

  /* two deliberate gestures with a return to neutral between them */
  ({api, env} = load()); armed(api, env);
  ev = driveTilt(api, env,
        hold(0,200).concat(hold(-60,500)).concat(hold(0,900)).concat(hold(-60,500)));
  check('two separate gestures score twice', '2 events', ev.length+' events', ev.length===2);

  /* the bug that killed tilt on both phones: baseline captured at the wrong angle */
  ({api, env} = load());
  api.sensorSeen = true; api.neutral = 62; api.pitch = 0;
  api.tiltState = 'recovering';
  ev = driveTilt(api, env, hold(0,3000).concat(hold(-60,600)));
  check('bad baseline self-corrects and tilt still works', '>=1 event', ev.length+' events',
        ev.length>=1);

  /* must-refuse: tilt switched off must not score */
  ({api, env} = load()); armed(api, env);
  api.setTilt(false);
  ev = driveTilt(api, env, hold(0,200).concat(hold(-70,800)));
  check('tilt switched off scores nothing', '0 events', ev.length+' events', ev.length===0);

  /* invert flips the meaning, not the sensitivity */
  ({api, env} = load()); armed(api, env);
  api.invert = true;
  ev = driveTilt(api, env, hold(0,200).concat(hold(-60,400)));
  check('invert turns a down-tilt into a pass', '["pass"]', JSON.stringify(ev),
        ev.length===1 && ev[0]==='pass');
}

console.log('\n=== INPUT SWITCHES ===');
{
  const {api} = load();
  api.setTilt(false); api.setTouch(false);
  check('turning off both inputs is impossible', 'at least one on',
        'tilt='+api.tiltOn+' touch='+api.touchOn, api.tiltOn || api.touchOn);

  const b = load().api;
  b.setTilt(true); b.setTouch(true);
  check('tilt and touch can both be on at once', 'both true',
        'tilt='+b.tiltOn+' touch='+b.touchOn, b.tiltOn && b.touchOn);
}

console.log('\n=== CARD SELECTION ===');
{
  const {api, env} = load();
  const deck = api.ALL_DECKS.find(d=>d.id==='animals');
  api.deck = deck; api.bag = []; api.recent = [];
  const n = deck.cards.length;
  const drawn=[];
  for(let i=0;i<n;i++){ api.bag.length || api.refillBag(); drawn.push(api.bag.shift().t); }
  check('one pass through a deck serves every card once', n+' unique',
        new Set(drawn).size+' unique', new Set(drawn).size===n);

  /* must-refuse: the same card opening two consecutive rounds */
  const {api:a2, env:e2} = load();
  const d2 = a2.ALL_DECKS.find(d=>d.id==='animals');
  a2.deck = d2;
  const round1=[];
  a2.bag=[]; a2.recent=[]; a2.refillBag();
  for(let i=0;i<10;i++){ const c=a2.bag.shift(); a2.remember(c.t); round1.push(c.t); }
  a2.bag=[]; a2.recent=[];
  a2.refillBag();
  const round2 = a2.bag.slice(0,10).map(c=>c.t);
  const overlap = round2.filter(t=>round1.includes(t));
  check('a fresh round does not repeat the previous round\u2019s cards', '0 repeats',
        overlap.length+' repeats ('+overlap.slice(0,3).join(', ')+')', overlap.length===0);

  /* banned words */
  const {api:a3} = load();
  const d3 = a3.ALL_DECKS.find(d=>d.id==='animals');
  a3.deck = d3;
  const victim = d3.cards[0].t;
  a3.banWord(victim);
  a3.bag=[]; a3.recent=[]; a3.refillBag();
  const served = a3.bag.map(c=>c.t);
  check('a removed word is never dealt', 'absent',
        served.includes(victim)?'still dealt':'absent', !served.includes(victim));
  /* must-refuse: the last card in the bag being a removed word */
  const {api:a4} = load();
  const d4 = a4.ALL_DECKS.find(d=>d.id==='animals');
  a4.deck = d4;
  d4.cards.slice(0, d4.cards.length-1).forEach(c=>a4.banWord(c.t));
  a4.bag=[]; a4.recent=[];
  a4.nextCard();
  check('a removed word is not shown even as the last card left', 'not banned',
        a4.card && a4.banned.has(a4.card.t) ? 'banned card shown' : 'not banned',
        !!a4.card && !a4.banned.has(a4.card.t));
}

console.log('\n=== PERSISTENCE ===');
{
  const first = load();
  first.api.banWord('Penguin');
  const saved = first.env.storeData;
  const second = load({storage:saved});
  check('removed words persist into a new session', 'Penguin removed',
        second.api.banned.has('Penguin')?'removed':'back again',
        second.api.banned.has('Penguin'));

  const third = load({storage:{tilt_history:'Owl\nBat'}});
  check('seen-word history persists into a new session', '2 remembered',
        third.api.seenHistory.length+' remembered', third.api.seenHistory.length===2);
}

console.log('\n=== LANGUAGE FILTER ===');
{
  const off = load({storage:{tilt_et:'0'}}).api;
  const etVisible = off.visibleDecks().some(d=>d.lang==='et');
  check('Estonian decks hidden by default', 'hidden', etVisible?'visible':'hidden', !etVisible);

  const mix = off.mixedDeck();
  const etWord = off.ALL_DECKS.find(d=>d.lang==='et').cards[0].t;
  check('Estonian words kept out of All mixed', 'absent',
        mix.cards.some(c=>c.t===etWord)?'present':'absent',
        !mix.cards.some(c=>c.t===etWord));

  const on = load({storage:{tilt_et:'1'}}).api;
  check('Estonian toggle brings the decks back', 'visible',
        on.visibleDecks().some(d=>d.lang==='et')?'visible':'hidden',
        on.visibleDecks().some(d=>d.lang==='et'));
}

console.log('\n=== SCORING ===');
{
  const {api, env} = load();
  api.deck = api.ALL_DECKS.find(d=>d.id==='animals');
  api.bag=[]; api.recent=[]; api.log=[]; api.score=0; api.streak=0;
  api.running = true;
  api.refillBag();
  api.card = api.bag.shift(); api.card.wild = false;
  for(let i=0;i<3;i++){
    api.card.wild = false;
    api.resolve(true);
    env.clock.advance(1000);
  }
  check('three correct in a row scores 4 (streak bonus)', '4', String(api.score), api.score===4);

  const {api:a2, env:e2} = load();
  a2.deck = a2.ALL_DECKS.find(d=>d.id==='animals');
  a2.bag=[]; a2.recent=[]; a2.log=[]; a2.score=0; a2.streak=0; a2.running=true;
  a2.refillBag(); a2.card = a2.bag.shift(); a2.card.wild = true;
  a2.resolve(true);
  check('a wildcard is worth double', '2', String(a2.score), a2.score===2);

  const {api:a3} = load();
  a3.deck = a3.ALL_DECKS.find(d=>d.id==='animals');
  a3.bag=[]; a3.recent=[]; a3.log=[]; a3.score=0; a3.streak=5; a3.running=true;
  a3.refillBag(); a3.card = a3.bag.shift(); a3.card.wild=false;
  a3.resolve(false);
  check('a pass resets the streak and scores nothing', 'score 0 streak 0',
        'score '+a3.score+' streak '+a3.streak, a3.score===0 && a3.streak===0);
}

console.log('\n=== MULTI-DECK SELECTION ===');
{
  const {api} = load();
  const music = ['music','singers','popstars','eurovision','instruments','dance'];
  const pick = music.concat(['cars']);
  const d = api.customDeck(pick);
  const expected = new Set();
  api.ALL_DECKS.filter(x=>pick.indexOf(x.id)>-1).forEach(x=>x.cards.forEach(c=>expected.add(c.t)));
  check('a multi-deck pick merges every chosen deck', expected.size+' cards',
        d.cards.length+' cards', d.cards.length===expected.size);

  const names = d.cards.map(c=>c.t);
  check('merged decks contain no duplicate card', names.length+' unique',
        new Set(names).size+' unique', new Set(names).size===names.length);

  /* must-refuse: cards from decks that were not chosen */
  const stray = api.ALL_DECKS.find(x=>x.id==='food').cards[0].t;
  check('a deck that was not picked contributes nothing', 'absent',
        names.includes(stray)?'leaked in':'absent', !names.includes(stray));

  /* the selection has to survive a whole party game via its id */
  const round = api.deckById(d.id);
  check('a multi-deck pick can be restored from its id', d.cards.length+' cards',
        round.cards.length+' cards', round.cards.length===d.cards.length);

  const single = api.customDeck(['cars']);
  check('picking one deck still names it properly', 'Cars & driving',
        single.name, single.name==='Cars & driving');

  const empty = api.customDeck([]);
  check('an empty pick falls back to All mixed rather than breaking', 'All mixed',
        empty.name, empty.name==='All mixed');
}

console.log('\n=== CATEGORY LABEL ===');
{
  const {api} = load();
  const mix = api.mixedDeck();
  check('cards in All mixed remember their deck', 'all labelled',
        mix.cards.every(c=>!!c.src)?'all labelled':'some missing',
        mix.cards.every(c=>!!c.src));

  const combo = api.customDeck(['music','cars']);
  const srcs = new Set(combo.cards.map(c=>c.src));
  check('a combined pick labels each source deck', '2 sources', srcs.size+' sources',
        srcs.size===2);

  /* must-refuse: a single deck must NOT label its cards */
  const single = api.ALL_DECKS.find(d=>d.id==='animals');
  check('a single deck adds no label', 'no labels',
        single.cards.every(c=>!c.src)?'no labels':'labelled',
        single.cards.every(c=>!c.src));

  /* merging must not contaminate the original decks */
  check('merging does not tag the source deck itself', 'clean',
        api.ALL_DECKS.find(d=>d.id==='music').cards.every(c=>!c.src)?'clean':'contaminated',
        api.ALL_DECKS.find(d=>d.id==='music').cards.every(c=>!c.src));
}

console.log('\n=== PARTY MODE ===');
{
  const {api} = load();
  api.setup.kind='teams'; api.setup.count=3; api.setup.roundsEach=2;
  api.setup.names=['Reds','Blues','Greens'];
  api.startParty();
  check('a 3-team, 2-turn game plans 6 rounds', '6', String(api.session.total),
        api.session.total===6);

  api.commitRound(7);
  check('points land on the team that played', 'Reds 7',
        api.session.names[0]+' '+api.session.scores[0], api.session.scores[0]===7);
  check('the turn passes to the next team', '1', String(api.session.turn), api.session.turn===1);

  api.commitRound(3); api.commitRound(5);
  check('the turn wraps back to the first team', '0', String(api.session.turn),
        api.session.turn===0);
  check('each team keeps its own running total', '7/3/5',
        api.session.scores.join('/'), api.session.scores.join('/')==='7/3/5');

  api.commitRound(1); api.commitRound(1);
  const beforeLast = api.session.played;
  api.commitRound(1);
  check('the game ends after the planned number of rounds', '6 played',
        api.session.played+' played', api.session.played===6);

  api.rematch();
  check('a rematch resets scores but keeps the teams', '0/0/0 with 3 teams',
        api.session.scores.join('/')+' with '+api.session.names.length+' teams',
        api.session.scores.join('/')==='0/0/0' && api.session.names.length===3);

  /* must-refuse: a quick round must not touch a session score */
  const {api:a2} = load();
  a2.setup.kind='players'; a2.setup.count=2; a2.setup.roundsEach=1; a2.setup.names=['Ann','Bo'];
  a2.startParty();
  a2.leaveParty();
  check('leaving the party clears the session', 'null',
        String(a2.session), a2.session===null);

  /* a session survives a reload */
  const first = load();
  first.api.setup.kind='teams'; first.api.setup.count=2; first.api.setup.roundsEach=2;
  first.api.setup.names=['A','B'];
  first.api.startParty();
  first.api.commitRound(4);
  const second = load({storage:first.env.storeData});
  check('an unfinished game survives closing the app', 'A has 4',
        second.api.session ? ('A has '+second.api.session.scores[0]) : 'session lost',
        !!second.api.session && second.api.session.scores[0]===4);
}

console.log('\n=== CONTENT ===');
{
  const DECKS = new Function(decksSrc+'; return DECKS;')();
  let empties=0, longs=[], dupes=[], tabooBad=[], punct=[];
  DECKS.forEach(d=>{
    const seen=new Set();
    d.k.forEach(s=>{
      const [t, x] = s.split('|');
      if(!t || !t.trim()) empties++;
      if(t.length>30) longs.push(d.id+':'+t);
      if(seen.has(t)) dupes.push(d.id+':'+t); seen.add(t);
      if(x){
        x.split(',').forEach(w=>{
          if(w.toLowerCase()===t.toLowerCase()) tabooBad.push(d.id+':'+t);
        });
      }
      if(/[",;:()\[\]{}]/.test(t)) punct.push(d.id+':'+t);
    });
  });
  check('no empty card text', '0', String(empties), empties===0);
  check('no duplicate card inside one deck', '0', dupes.length+' ('+dupes.slice(0,3)+')', dupes.length===0);
  check('no card longer than 30 characters', '0', longs.length+' ('+longs.slice(0,3)+')', longs.length===0);
  check('no banned word equal to its own answer', '0', String(tabooBad.length), tabooBad.length===0);
  check('no stray punctuation in card text', '0', punct.length+' ('+punct.slice(0,3)+')', punct.length===0);
  const small = DECKS.filter(d=>d.k.length<20).map(d=>d.id+'='+d.k.length);
  check('every deck holds at least 20 cards', '0 under', small.length+' under ('+small+')', small.length===0);

  /* root traps: no deck may have more than a quarter of its cards containing its own name */
  const stopw = new Set(['and','the','of','in','a','to','on','at','your','you','it','my','out','up','with','things','people','can','make','say','about']);
  const trapped = [];
  DECKS.forEach(d=>{
    const stems = d.n.toLowerCase().replace(/[^a-z\s]/g,' ').split(/\s+/)
                    .filter(w=>w.length>3 && !stopw.has(w)).map(w=>w.slice(0,5));
    if(!stems.length) return;
    const hits = d.k.filter(x=>stems.some(st=>x.split('|')[0].toLowerCase().includes(st))).length;
    if(hits / d.k.length > 0.25) trapped.push(d.id+' '+Math.round(100*hits/d.k.length)+'%');
  });
  check('no deck is more than 25% root traps', '0 decks', trapped.length+' ('+trapped+')', trapped.length===0);

  /* the list decks must carry banned words — that is what makes them playable */
  const mustTaboo = ['animals','food','jobs','sports','countries','cooking','house'];
  const thin = mustTaboo.filter(id=>{
    const d = DECKS.find(x=>x.id===id);
    return d.k.filter(x=>x.includes('|')).length / d.k.length < 0.8;
  });
  check('core list decks have banned words on at least 80% of cards', '0 thin',
        thin.length+' ('+thin+')', thin.length===0);

  /* regional vocabulary: the English decks are for people in Estonia playing in English */
  const british = ['Marmite','Bake Off','Hoovering','Bin day','Skirting board','Cling film','Aubergine','Courgette','Trainers','Motorway'];
  const allEn = []; DECKS.filter(d=>d.lang!=='et').forEach(d=>d.k.forEach(x=>allEn.push(x.split('|')[0])));
  const brit = british.filter(w=>allEn.includes(w));
  check('no British-only vocabulary in the English decks', '0', brit.length+' ('+brit+')', brit.length===0);

  /* picture cards: the third field is a filename, and it must look like one */
  let badImg=[];
  DECKS.forEach(d=>d.k.forEach(str=>{
    const p2 = str.split('|');
    if(p2.length>2 && p2[2] && !/^[\w.-]+\.(png|jpg|jpeg|webp|svg)$/i.test(p2[2]))
      badImg.push(d.id+':'+p2[0]+' -> '+p2[2]);
  }));
  check('picture cards name a real-looking image file', '0',
        badImg.length+' ('+badImg.slice(0,3)+')', badImg.length===0);
}

console.log('\n=== RELEASE INTEGRITY ===');
{
  const fsx=require('fs'), px=require('path');
  const htmlSrc = fsx.readFileSync(px.join(ROOT,'index.html'),'utf8');
  const decksTxt = fsx.readFileSync(px.join(ROOT,'decks.js'),'utf8');
  const swTxt = fsx.readFileSync(px.join(ROOT,'sw.js'),'utf8');
  const v1 = (htmlSrc.match(/APP_VERSION = '([^']+)'/)||[])[1];
  const v2 = (decksTxt.match(/DECKS_VERSION = '([^']+)'/)||[])[1];
  const v3 = (swTxt.match(/CACHE = 'tilt-([^']+)'/)||[])[1];
  check('index.html and decks.js carry the same version', v1, v2, v1===v2 && !!v1);
  check('the service worker cache matches that version', v1, v3, v1===v3);

  /* every file the page references must actually exist in the folder */
  /* any gradient carrying white text must clear 4.5:1 at every stop */
  const css = htmlSrc.slice(htmlSrc.indexOf('<style>'), htmlSrc.indexOf('</style>'));
  const tokens = {};
  [...css.matchAll(/--(on-\d):\s*(#[0-9A-Fa-f]{6})/g)].forEach(m=>tokens[m[1]]=m[2]);
  function lum(h){const n=parseInt(h.slice(1),16);
    let c=[(n>>16)&255,(n>>8)&255,n&255].map(v=>v/255);
    c=c.map(v=>v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4));
    return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2];}
  const weak = Object.entries(tokens).filter(([,h])=>1.05/(lum(h)+0.05) < 4.5)
                     .map(([k,h])=>k+' '+h);
  check('every text-safe accent clears 4.5:1 on white', '0 weak',
        weak.length+' weak ('+weak+')', weak.length===0);
  const brightOnText = /(?:btn\.primary|scoreCard)\{[^}]*var\(--acc-/.test(css);
  check('no bright accent is used behind white text', 'none',
        brightOnText?'found one':'none', !brightOnText);

  /* the cache-busting query must track the version, or a stale deck file
     can be served forever without anyone noticing */
  const tag = (htmlSrc.match(/src="decks\.js\?v=([^"]+)"/)||[])[1];
  check('the decks.js request carries the current version', v1, tag, tag===v1);

  const refs = [...htmlSrc.matchAll(/(?:src|href)="([^"#:]+)"/g)].map(m=>m[1])
                 .filter(r=>!/^https?:/.test(r))
                 .map(r=>r.split('?')[0]);
  const missing = refs.filter(r=>!fsx.existsSync(px.join(ROOT, r)));
  check('every referenced file is present', '0 missing',
        missing.length+' missing ('+missing+')', missing.length===0);

  /* and everything the service worker promises to cache must exist too */
  const swFiles = (swTxt.match(/FILES = \[([^\]]+)\]/)||[])[1]
        .split(',').map(x=>x.trim().replace(/^'|'$/g,'').split('?')[0])
        .filter(x=>x && x!=='./');
  const swMissing = swFiles.filter(f=>!fsx.existsSync(px.join(ROOT, f)));
  check('every file the service worker caches is present', '0 missing',
        swMissing.length+' missing ('+swMissing+')', swMissing.length===0);
}

console.log('\n=== SUMMARY ===');
console.log(pass+' passed, '+fail+' failed, '+cant+' could not be evaluated');
if(cant) console.log('NOTE: cannot-evaluate is not a pass.');
if(fail){ console.log('\nFailures:'); failures.forEach(f=>console.log(' - '+f)); }
process.exit(fail ? 1 : 0);
