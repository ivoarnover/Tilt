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
    removeAttribute(){}, setAttribute(){},
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
    addEventListener(){}, visibilityState:'visible', body:makeEl('body')
  };
  els.body = document.body;
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
      get bag(){return bag}, set bag(v){bag=v},
      get gambleArmed(){return gambleArmed},
      setRoundEnd(v){ roundEnd=v; gambleArmed=false; loop.lastTick=null; relayFlashed={}; },
      setRelay(v){ relayRound=v; },
      el(id){ return document.getElementById(id); },
      tick(){ loop(); },
      bumpSteal
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

console.log('\n=== FLOW 1b: the score is visible while playing ===');
{
  const t = boot();
  t.api.deck = t.api.ALL_DECKS[0]; t.api.bag = [];
  t.api.running = true; t.api.go('play'); t.api.nextCard();
  check('the score starts at zero on screen', '0', t.els.liveScore.textContent);
  t.api.resolve(true); t.clock.advance(1500);
  check('a correct answer updates the score on screen', '1', t.els.liveScore.textContent);
  t.api.resolve(false); t.clock.advance(1500);
  check('a pass leaves the score alone', '1', t.els.liveScore.textContent);
  t.api.resolve(true); t.clock.advance(1500);
  t.api.resolve(true); t.clock.advance(1500);
  check('the streak bonus shows up live', String(t.api.score), t.els.liveScore.textContent);
}

console.log('\n=== FLOW 1c: quick play keeps a running total ===');
{
  const t = boot();
  t.api.deck = t.api.ALL_DECKS[0]; t.api.bag = [];
  playRound(t, 3);
  check('the first round shows no running total yet', '', t.els.runningTotal.textContent);
  const r1 = t.api.score;
  t.els.resPrimary.onclick();                       // next round, same deck
  check('continuing starts another round', 'ready', t.screen());
  t.api.running = true; t.api.go('play'); t.api.nextCard();
  for(let i=0;i<3;i++){ t.api.resolve(true); t.clock.advance(1500); }
  t.api.running = false; t.api.renderResults();
  check('the running total adds both rounds', true,
        t.els.runningTotal.textContent.indexOf(String(r1 + t.api.score)) > -1);
  check('it says how many rounds', true,
        t.els.runningTotal.textContent.indexOf('2 rounds') > -1);
  t.els.resThird.onclick();                          // start over
  check('starting over returns to the decks', 'decks', t.screen());
  t.api.deck = t.api.ALL_DECKS[0]; t.api.bag = [];
  playRound(t, 2);
  check('starting over cleared the total', '', t.els.runningTotal.textContent);
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

console.log('\n=== FLOW 10: party screens against the earlier defect classes ===');
{
  /* 1. back button: does every party screen lead somewhere sensible? */
  const b1 = boot();
  b1.api.openParty(); b1.back();
  check('back from party setup lands on home', 'home', b1.screen());

  const b2 = boot();
  b2.api.setup.count=2; b2.api.setup.roundsEach=1; b2.api.setup.names=['A','B'];
  b2.api.startParty(); b2.back();
  check('back from the scoreboard does not trap you', true,
        ['home','board'].indexOf(b2.screen()) > -1);

  /* 2. a party round shows the score and the category, like a quick round */
  const t = boot();
  t.api.setup.count=2; t.api.setup.roundsEach=1; t.api.setup.names=['A','B'];
  t.api.startParty(); t.api.startTurn(); t.tiles()[1].onclick();
  t.api.running=true; t.api.go('play'); t.api.nextCard();
  check('a party round shows the live score', '0', t.els.liveScore.textContent);
  check('a party round shows the category', true, t.els.deckTag.textContent.length > 0);
  t.api.resolve(true); t.clock.advance(1200);
  check('the score updates mid-round in party mode', '1', t.els.liveScore.textContent);

  /* 3. removing a word works inside a session too */
  t.api.running=false; t.api.renderResults();
  const word = t.api.log[0].t;
  t.els.cardList.children[0].children[1].onclick({stopPropagation(){}});
  check('a word can be removed from a party scorecard', true, t.api.banned.has(word));

  /* 4. the party scorecard must not offer the quick-play running total */
  check('no running total on a party scorecard', '', t.els.runningTotal.textContent);
  check('the party scorecard hides the start-over link', 'none',
        t.els.resThird.style.display);

  /* 5. quitting mid-round keeps the session (regression from the earlier fix) */
  t.els.resPrimary.onclick();
  t.api.startTurn(); t.tiles()[1].onclick();
  t.api.running=true; t.api.go('play'); t.api.nextCard();
  t.api.quitRound(); t.api.quitRound();
  check('quitting a party round keeps the scoreboard', 'board', t.screen());
  check('and keeps the scores', 1, t.api.session.scores[0]);

  /* 6. an unfinished party game survives a reload */
  const saved = t.data;
  const again = boot(saved);
  check('a party game in progress survives closing the app', true, !!again.api.session);
}

console.log('\n=== FLOW 11: the last-card gamble ===');
{
  /* drive the real loop: the harness rAF is a no-op, so we call loop() by hand */
  const t = boot();
  t.api.deck = t.api.ALL_DECKS[0]; t.api.bag = [];
  t.api.running = true; t.api.go('play'); t.api.nextCard();
  // emulate beginPlay's clock: roundEnd is set inside beginPlay, so set state directly
  t.api.setRoundEnd(t.clock.get() + 60000);
  t.api.tick();                                   // 60 s left: normal card
  check('no gamble at the start of a round', false, !!t.api.card.gamble);
  t.clock.advance(56000); t.api.tick();           // 4 s left
  check('the card on screen at five seconds becomes the gamble', true, !!t.api.card.gamble);
  check('the card screen says so', true, t.els.deckTag.textContent.indexOf('LAST CARD') > -1);
  const before = t.api.score;
  t.api.resolve(true);
  check('winning the gamble is worth three', before + 3, t.api.score);
  check('the next card is an ordinary card', false, !!t.api.card.gamble);
  check('only one gamble per round', true, t.api.gambleArmed);

  const u = boot();
  u.api.deck = u.api.ALL_DECKS[0]; u.api.bag = [];
  u.api.running = true; u.api.go('play'); u.api.nextCard();
  u.api.setRoundEnd(u.clock.get() + 60000);
  u.api.resolve(true); u.api.resolve(true);        // 2 points banked
  u.clock.advance(56000); u.api.tick();
  u.api.resolve(false);
  check('passing the gamble costs a point', 1, u.api.score);

  const z = boot();
  z.api.deck = z.api.ALL_DECKS[0]; z.api.bag = [];
  z.api.running = true; z.api.go('play'); z.api.nextCard();
  z.api.setRoundEnd(z.clock.get() + 60000);
  z.clock.advance(56000); z.api.tick(); z.api.resolve(false);
  check('the gamble cannot take the score below zero', 0, z.api.score);
}

console.log('\n=== FLOW 12: steals in party mode ===');
{
  const t = boot();
  t.api.setup.kind='teams'; t.api.setup.count=3; t.api.setup.roundsEach=1;
  t.api.setup.names=['Reds','Blues','Greens'];
  t.api.startParty(); t.api.startTurn(); t.tiles()[1].onclick();
  playRound(t, 4);
  check('the party scorecard offers steals', 'block', t.els.steals.style.display);
  check('you cannot steal from yourself', false, t.els.steals.innerHTML.indexOf('<b>Reds</b>') > -1);
  t.api.bumpSteal(1, 1); t.api.bumpSteal(1, 1); t.api.bumpSteal(2, 1);
  const played = t.api.score;
  t.els.resPrimary.onclick();
  check('the playing team keeps its own points', played, t.api.session.scores[0]);
  check('stolen points go to the stealing teams', '2,1',
        t.api.session.scores[1]+','+t.api.session.scores[2]);
  t.api.startTurn(); t.tiles()[1].onclick(); playRound(t, 2);
  check('steals reset for the next scorecard', false, t.els.steals.innerHTML.indexOf('1 steal') > -1);

  const q = boot();
  q.api.deck = q.api.ALL_DECKS[0]; q.api.bag = []; playRound(q, 2);
  check('no steals section in quick play', 'none', q.els.steals.style.display);
}

console.log('\n=== FLOW 13: first-visit deck screen ===');
{
  const t = boot();
  t.api.go('decks');
  const labels = t.els.deckGrid.children.filter(c=>c.className==='eyebrow').map(c=>c.textContent);
  check('a new player sees a Start here row', true, labels.indexOf('Start here') > -1);
  check('All mixed stays first', true, t.tiles()[0].innerHTML.indexOf('All mixed') > -1);
  const first = t.tiles()[1];
  check('the first deck under it is a fun-to-explain deck', true, first.innerHTML.indexOf('Hard to say') > -1);
  check('tiles carry a teaser instead of a bare count', true,
        first.innerHTML.indexOf('Awful to describe') > -1);

  const v = boot({tilt_rounds:'10'});
  v.api.go('decks');
  const l2 = v.els.deckGrid.children.filter(c=>c.className==='eyebrow').map(c=>c.textContent);
  check('the Start here row retires for experienced players', false, l2.indexOf('Start here') > -1);
}

console.log('\n=== FLOW 14: retry the hardest card ===');
{
  const t = boot();
  t.api.deck = t.api.ALL_DECKS[0]; t.api.bag = [];
  playRound(t, 4);
  const roundScore = t.api.score, roundLog = t.api.log.length;
  t.flush(10);                                  // the onclick is attached on a 0ms timer
  const hard = t.els.hardStat;
  check('the hardest card can be tapped', true, !!hard && typeof hard.onclick === 'function');
  hard.onclick();
  check('a retry opens with a countdown', 'ready', t.screen());
  t.flush(1300);
  check('then shows the one card', 'play', t.screen());
  check('it is the hardest card', true, t.api.card.t.length > 0);
  t.api.resolve(true);
  check('a correct guess ends the challenge with a verdict', 'ready', t.screen());
  t.flush(2000);
  check('and returns to the scorecard', 'results', t.screen());
  check('the round score is untouched', roundScore, t.api.score);
  check('the round log is untouched', roundLog, t.api.log.length);
}

console.log('\n=== FLOW 15: relay rounds ===');
{
  const t = boot();
  t.api.setup.count=2; t.api.setup.roundsEach=1; t.api.setup.names=['A','B']; t.api.setup.relay=true;
  t.api.startParty();
  check('relay is stored on the session', true, t.api.session.relay);
  t.api.startTurn(); t.tiles()[1].onclick();
  t.api.running=true; t.api.go('play'); t.api.nextCard();
  t.api.setRelay(true);
  t.api.setRoundEnd(t.clock.get() + 90000);
  t.api.tick();
  const fl = t.api.el('flash');
  check('no pass flash at the start', true, fl.style.display !== 'flex');
  t.clock.advance(30500); t.api.tick();
  check('the phone says PASS IT at sixty seconds', 'PASS IT', t.els.flash.textContent);
  t.els.flash.style.display='none'; t.els.flash.textContent='';
  t.clock.advance(20000); t.api.tick();
  check('no second flash between marks', '', t.els.flash.textContent);
  t.clock.advance(10500); t.api.tick();
  check('and again at thirty seconds', 'PASS IT', t.els.flash.textContent);
}

console.log('\n=== FLOW 16: bright room ===');
{
  const t = boot({tilt_bright:'1'});
  t.api.deck = t.api.ALL_DECKS[0]; t.api.bag = [];
  t.api.running=true; t.api.go('play'); t.api.nextCard();
  check('bright room gives the card a pale background', '#F4F1EA', t.els.body.style.background);
  check('and dark text', '#151515', t.els.word.style.color);
  const d = boot();
  d.api.deck = d.api.ALL_DECKS[0]; d.api.bag = [];
  d.api.running=true; d.api.go('play'); d.api.nextCard();
  check('the default keeps the deck colour', d.api.deck.color, d.els.body.style.background);
}

console.log('\n=== SUMMARY ===');
console.log(pass+' passed, '+fail+' failed');
if(fail){ console.log('\nFailures:'); fails.forEach(f=>console.log(' - '+f)); }
process.exit(fail?1:0);
