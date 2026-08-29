/* Flow tests: walk real user journeys by invoking the handlers the UI wires up,
   and assert where the user ends up. Complements test/run.js, which tests rules.
   This one asks: can a person get there, and can they get back out? */

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const SCREENS = ['home','how','removed','diag','party','board','final','decks','pre','ready','play','results'];

function makeEl(id, cls){
  const e = {
    id, style:{}, textContent:'', value:'', title:'', disabled:false,
    children:[], onclick:null, className:cls||'', maxLength:0,
    classList:{
      _s:new Set((cls||'').split(' ').filter(Boolean)),
      add(c){this._s.add(c)}, remove(c){this._s.delete(c)},
      contains(c){return this._s.has(c)},
      toggle(c,on){ if(on===undefined) on=!this._s.has(c); on?this._s.add(c):this._s.delete(c); }
    },
    _listeners:{},
    appendChild(c){ this.children.push(c); },
    addEventListener(ev,fn){ (this._listeners[ev]=this._listeners[ev]||[]).push(fn); },
    fire(ev,arg){ (this._listeners[ev]||[]).forEach(f=>f(arg)); }
  };
  Object.defineProperty(e,'innerHTML',{
    get(){ return e._h||''; },
    set(v){ e._h=v; if(v==='') e.children=[]; }
  });
  return e;
}

function boot(storage){
  const els = {};
  SCREENS.forEach(id=>{ els[id] = makeEl(id,'screen'); });
  els.home.classList.add('on');

  const document = {
    getElementById(id){ return els[id] || (els[id] = makeEl(id)); },
    querySelectorAll(sel){
      const list = sel==='.screen' ? SCREENS.map(id=>els[id]) : [];
      return { forEach(f){ list.forEach(f); } };
    },
    createElement(){ return makeEl('new'); },
    addEventListener(){}, visibilityState:'visible', body:{ style:{} }
  };
  const data = Object.assign({}, storage);
  const localStorage = {
    getItem(k){ return k in data ? data[k] : null; },
    setItem(k,v){ data[k]=String(v); }
  };
  let now = 0;
  let popHandler = null;
  /* Real-enough timers: queued, and only run when a test asks. Without this a
     long-press or a countdown silently never happens and the test lies. */
  let timers = [], tid = 1;
  const setTimeoutStub = (fn, ms)=>{ timers.push({id:tid, fn, due: now + (ms||0)}); return tid++; };
  const clearTimeoutStub = (id)=>{ timers = timers.filter(t=>t.id!==id); };
  const flush = (ms)=>{
    now += (ms||0);
    for(let guard=0; guard<50; guard++){
      const due = timers.filter(t=>t.due<=now);
      if(!due.length) return;
      timers = timers.filter(t=>t.due>now);
      due.forEach(t=>t.fn());
    }
  };
  const win = {
    addEventListener(ev,fn){ if(ev==='popstate') popHandler = fn; },
    matchMedia(){ return {matches:false}; },
    navigator:{}, innerWidth:390, innerHeight:844,
    isSecureContext:true, self:1, top:1
  };
  const html = fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
  const decksSrc = fs.readFileSync(path.join(ROOT,'decks.js'),'utf8');
  const appSrc = html.split('<script>')[1].split('</script>')[0];
  const DECKS = new Function(decksSrc+'; return DECKS;')();

  const api = new Function(
    'window','document','navigator','performance','location','history','localStorage',
    'requestAnimationFrame','cancelAnimationFrame','setInterval','clearInterval','setTimeout','clearTimeout',
    'DeviceMotionEvent','DeviceOrientationEvent','Promise','JSON','DECKS',
    appSrc + `; return {
      go, quickPlay, openParty, startParty, startTurn, commitRound, rematch, leaveParty,
      showBoard, pickDeck, startRound, beginPlay, resolve, renderResults, quitRound,
      toggleMulti, toggleSelected, playSelection, customDeck, buildDecks, setGroup,
      openRemoved, openDiag, banWord, unbanWord, undoToast, dismissInstall,
      nextCard, refillBag, setTilt, setTouch, toggleEstonian,
      get session(){return session}, get setup(){return setup},
      get deck(){return deck}, set deck(v){deck=v},
      get card(){return card}, get log(){return log},
      get score(){return score}, set score(v){score=v},
      get running(){return running}, set running(v){running=v},
      get sensorSeen(){return sensorSeen}, set sensorSeen(v){sensorSeen=v},
      get selected(){return selected}, get multi(){return multi},
      get banned(){return banned}, get ALL_DECKS(){return ALL_DECKS},
      get bag(){return bag}, set bag(v){bag=v}
    }`
  )(
    win, document, {vibrate(){},userAgent:'node',wakeLock:null},
    {now(){return now}}, {protocol:'https:',hostname:'x'},
    {replaceState(){},pushState(){}}, localStorage,
    ()=>0, ()=>{}, ()=>0, ()=>{}, setTimeoutStub, clearTimeoutStub,
    undefined, undefined, Promise, JSON, DECKS
  );

  return {
    api, els, data,
    screen(){ return SCREENS.find(id=>els[id].classList.contains('on')) || '(none)'; },
    back(){ if(popHandler) popHandler(); },
    clock:{ advance(ms){ now += ms; }, get(){ return now; } },
    flush,
    tiles(){ return els.deckGrid.children.filter(c=>c.className.indexOf('tile')===0); }
  };
}

let pass=0, fail=0;
const fails=[];
function check(name, expected, got){
  if(String(expected)===String(got)){ pass++; console.log('  PASS   '+name); }
  else { fail++; fails.push(name+': expected '+expected+', got '+got);
         console.log('  FAIL   '+name+'  — expected '+expected+', got '+got); }
}

/* helper: play a whole round without waiting on timers */
function playRound(t, cards){
  t.api.running = true;
  t.api.go('play');
  t.api.nextCard();
  for(let i=0;i<(cards||5);i++){ t.api.resolve(true); t.clock.advance(2000); }
  t.api.running = false;
  t.api.renderResults();
}

console.log('\n=== FLOW 1: first-time player, quick round ===');
{
  const t = boot();
  check('app opens on home', 'home', t.screen());
  t.api.go('how');
  check('how-it-works is reachable', 'how', t.screen());
  t.api.quickPlay();
  check('quick round goes to the deck list', 'decks', t.screen());
  const tiles = t.tiles();
  check('deck tiles render', true, tiles.length > 10);
  tiles[1].onclick();
  check('picking a deck opens the pre-round screen', 'pre', t.screen());
  check('pre-round names the deck', true, t.els.preDeck.textContent.length > 0);
  playRound(t);
  check('a played round ends on results', 'results', t.screen());
  check('results list every card played', 5, t.els.cardList.children.length);
  t.els.resPrimary.onclick();
  check('"same deck again" restarts the countdown', 'ready', t.screen());
}

console.log('\n=== FLOW 2: back button from every screen ===');
{
  const map = [
    ['how','home'], ['removed','home'], ['diag','home'],
    ['party','home'], ['decks','home'], ['pre','decks']
  ];
  map.forEach(([from,to])=>{
    const t = boot();
    t.api.go(from);
    t.back();
    check('back from '+from+' lands on '+to, to, t.screen());
  });

  const t = boot();
  t.api.go('home');
  t.back();
  check('back on home does not trap the user', 'home', t.screen());

  const t2 = boot();
  t2.api.deck = t2.api.ALL_DECKS[0];
  t2.api.bag = [];
  playRound(t2, 2);
  t2.back();
  check('back from results leaves the round', 'decks', t2.screen());
}

console.log('\n=== FLOW 3: quitting mid-round ===');
{
  const t = boot();
  t.api.deck = t.api.ALL_DECKS[0];
  t.api.bag=[]; t.api.running = true; t.api.go('play'); t.api.nextCard();
  t.api.quitRound();
  check('one tap on the exit does not end the round', 'play', t.screen());
  check('the first tap explains itself', true,
        t.els.toastText.textContent.toLowerCase().indexOf('again') > -1);
  t.api.quitRound();
  check('a second tap ends the round', 'decks', t.screen());
}

console.log('\n=== FLOW 4: party game, three teams ===');
{
  const t = boot();
  t.api.openParty();
  check('party setup is reachable from home', 'party', t.screen());
  t.api.setup.kind='teams'; t.api.setup.count=3; t.api.setup.roundsEach=1;
  t.api.setup.names=['Reds','Blues','Greens'];
  t.api.startParty();
  check('starting the game shows the scoreboard', 'board', t.screen());
  check('the scoreboard lists every team', 3, t.els.boardList.children.length);
  check('the scoreboard names who is next', true,
        t.els.nextUp.innerHTML.indexOf('Reds') > -1);
  check('the start button names the team', true,
        t.els.turnBtn.textContent.indexOf('Reds') > -1);

  t.api.startTurn();
  check('starting a turn asks for a deck', 'decks', t.screen());
  t.tiles()[1].onclick();
  check('picking a deck opens the pre-round screen', 'pre', t.screen());
  playRound(t, 4);
  check('the results button offers to save and pass', true,
        t.els.resPrimary.textContent.toLowerCase().indexOf('pass the phone') > -1);
  const scored = t.api.score;
  t.els.resPrimary.onclick();
  check('saving returns to the scoreboard', 'board', t.screen());
  check('the score landed on the team that played', scored, t.api.session.scores[0]);
  check('the next team is up', true, t.els.nextUp.innerHTML.indexOf('Blues') > -1);

  /* finish the game */
  t.api.startTurn(); t.tiles()[1].onclick(); playRound(t,2); t.els.resPrimary.onclick();
  t.api.startTurn(); t.tiles()[1].onclick(); playRound(t,2); t.els.resPrimary.onclick();
  check('the game ends on the winner screen', 'final', t.screen());
  check('the winner screen ranks everyone', 3, t.els.finalList.children.length);
  t.api.rematch();
  check('rematch returns to a fresh scoreboard', 'board', t.screen());
  check('rematch resets the scores', '0,0,0', t.api.session.scores.join(','));
}

console.log('\n=== FLOW 5: quitting mid-round inside a party game ===');
{
  const t = boot();
  t.api.setup.count=2; t.api.setup.roundsEach=1; t.api.setup.names=['A','B'];
  t.api.startParty();
  t.api.startTurn(); t.tiles()[1].onclick();
  t.api.running=true; t.api.go('play'); t.api.nextCard();
  t.api.quitRound(); t.api.quitRound();
  check('quitting a party round returns to the scoreboard', 'board', t.screen());
  check('the session survives the quit', true, !!t.api.session);
}

console.log('\n=== FLOW 6: combining decks ===');
{
  const t = boot();
  t.api.go('decks');
  const tile = t.tiles()[1];
  tile.fire('touchstart', {touches:[{clientX:100, clientY:200}]});
  t.flush(500);                      // hold past the long-press threshold
  check('long-press turns on select mode', true, t.api.multi);

  const q = boot();
  q.api.go('decks');
  const quick = q.tiles()[1];
  quick.fire('touchstart', {touches:[{clientX:100, clientY:200}]});
  q.flush(150);
  quick.fire('touchend');
  q.flush(500);
  check('a quick tap does not trigger select mode', false, q.api.multi);

  /* A resting finger jitters a few pixels. That must NOT cancel the press. */
  const j = boot();
  j.api.go('decks');
  const jt = j.tiles()[1];
  jt.fire('touchstart', {touches:[{clientX:100, clientY:200}]});
  j.flush(120);
  jt.fire('touchmove', {touches:[{clientX:104, clientY:203}]});
  j.flush(400);
  check('small finger jitter does not cancel a long press', true, j.api.multi);

  /* A real drag (scrolling the grid) MUST cancel it. */
  const dr = boot();
  dr.api.go('decks');
  const dt = dr.tiles()[1];
  dt.fire('touchstart', {touches:[{clientX:100, clientY:200}]});
  dr.flush(120);
  dt.fire('touchmove', {touches:[{clientX:100, clientY:280}]});
  dr.flush(400);
  check('scrolling the grid does not select a deck', false, dr.api.multi);
  check('long-press also selects that deck', 1, t.api.selected.size);
  check('the selection bar is showing', 'flex', t.els.selBar.style.display);
  t.tiles().filter(x=>x.className.indexOf('sel')>-1).length;
  t.api.setGroup('music');
  const addAll = t.els.deckGrid.children[t.els.deckGrid.children.length-1];
  check('a group offers "add every deck"', true,
        addAll.textContent.indexOf('Add every deck') > -1);
  addAll.onclick();
  check('the whole group is selected', true, t.api.selected.size >= 6);
  t.api.playSelection();
  check('playing a combination opens the pre-round screen', 'pre', t.screen());
  check('the combined deck is named by count', true,
        /decks$/.test(t.els.preDeck.textContent));
  check('select mode is off once a round starts', false, t.api.multi);
}

console.log('\n=== FLOW 7: removing a word, and undoing it ===');
{
  const t = boot();
  t.api.deck = t.api.ALL_DECKS[0]; t.api.bag=[];
  playRound(t, 3);
  const row = t.els.cardList.children[0];
  const word = t.api.log[0].t;
  row.children[1].onclick({stopPropagation(){}});
  check('tapping the cross removes the word', true, t.api.banned.has(word));
  check('an undo is offered', true, t.els.toastText.textContent.indexOf('Removed') > -1);
  t.api.undoToast();
  check('undo puts the word back', false, t.api.banned.has(word));

  row.children[1].onclick({stopPropagation(){}});
  t.api.openRemoved();
  check('the removed list is reachable from home', 'removed', t.screen());
  check('the removed word is listed', 1, t.els.removedList.children.length);
  t.els.removedList.children[0].onclick();
  check('tapping a removed word restores it', 0, t.api.banned.size);
}

console.log('\n=== FLOW 8: no sensor ===');
{
  const t = boot();
  t.api.sensorSeen = false;
  t.api.deck = t.api.ALL_DECKS[0]; t.api.bag=[];
  t.api.running = true; t.api.go('play'); t.api.nextCard();
  check('the card screen shows touch hints when tilt is dead', 'block',
        t.els.hintPass.style.display);
  check('the hint tells you what to do', true,
        t.els.hintOk.innerHTML.toLowerCase().indexOf('swipe') > -1 ||
        t.els.hintOk.innerHTML.toLowerCase().indexOf('tap') > -1);
}

console.log('\n=== FLOW 9: Estonian toggle ===');
{
  const t = boot();
  t.api.go('decks');
  const before = t.tiles().length;
  t.api.toggleEstonian();
  const after = t.tiles().length;
  check('the Estonian toggle adds decks', 2, after-before);
  t.api.toggleEstonian();
  check('toggling back removes them again', before, t.tiles().length);
}

console.log('\n=== SUMMARY ===');
console.log(pass+' passed, '+fail+' failed');
if(fail){ console.log('\nFailures:'); fails.forEach(f=>console.log(' - '+f)); }
process.exit(fail?1:0);
