# Tilt — release 2026-09-05.1

## The whole app is nine files

Upload **all of them, every time**, to the repository root. Order does not matter —
GitHub Pages publishes the commit as a unit, so nothing is live until the whole
commit is. Picking out "just the changed ones" is what has gone wrong; the files
have version numbers now precisely because that is hard to track by hand.

```
index.html        the game: screens, tilt detection, scoring, party mode
decks.js          all deck content — 86 decks
sw.js             service worker: offline play, and required for the install prompt
manifest.json     app metadata for installing to the home screen
icon.svg          icon, vector
icon-192.png      icon, required by Chrome for installability
icon-512.png      icon, required by Chrome for installability
img/README.txt    how to add picture cards (the folder can otherwise stay empty)
test/run.js       tests — optional, does not affect the site
test/flows.js     tests — optional, does not affect the site
```

Optional and irrelevant to the running site: `.gitlab-ci.yml` (only for GitLab),
`test/`.

## Uploading, from the phone

1. Open `github.com/<your-username>/tilt/upload/main`
2. Select every file above. GitHub accepts them all in one go and overwrites
   matching names.
3. Commit.
4. Wait about a minute, then hard-refresh the site.

## How to tell it worked

The home screen now prints a line at the bottom:

```
v2026-09-05.1 · 86 decks · 3485 cards
```

Three things to check against it:

- **The version matches the one at the top of this file.** If it is older, the
  browser is serving a cached copy — pull to refresh, or close the tab and reopen.
- **The deck and card counts look right.** A low count means `decks.js` is stale.
- **No red bar across the top.** If `index.html` and `decks.js` are from different
  releases, a red banner names both versions and tells you to re-upload. If
  `decks.js` is missing entirely, it says that instead. This is the check that
  makes a half-finished upload visible rather than silently broken.

`Sensor check` on the home screen also prints both versions, for when you want the
detail.

## After installing as an app

The service worker caches the files for offline play, but it is deliberately
network-first: online, it always fetches the current version and only falls back
to the cache when there is no connection. So an installed copy still updates on
its own. If it ever seems stuck, uninstall and reinstall from the browser.

## Changing deck content later

`decks.js` is the only file you need to touch to add or edit words. When you do,
bump the date in **both** `decks.js` (`DECKS_VERSION`) and `index.html`
(`APP_VERSION`) to the same string, or the app will warn that they disagree. The
test suite checks this:

```
node test/run.js      52 cases — rules, content, release integrity
node test/flows.js    58 cases — user journeys
```

`RELEASE INTEGRITY` in the first suite fails if the versions drift apart or a
referenced file is missing from the folder.

## Repository hygiene

Two stray files are in the repo root and should be deleted — they do nothing but
they make the list harder to read:

- `flows.js` at the root — belongs in `test/`, and is not needed by the site
- `icon-1.svg` — a duplicate GitHub created when `icon.svg` was uploaded twice

## What changed in this release

**2026-09-05.1** — playtest feedback from Keiu and Ivo
- Words too tiny: the card is built for landscape, and the app now says so. Tapping Start
  requests fullscreen and locks landscape where the browser allows it; the countdown shows
  "Turn the phone sideways" while the phone is upright; the type ceiling is gone.
- Countdown is three seconds every round again, so the phone can be passed.
- Scoring setting: Simple (every card counts once — the new default) or Bonus (streaks,
  double card, last-card gamble).
- Party mode is open-ended: no more choosing turns. The scoreboard says how many rounds
  are played, who still has to play this turn, and Finish game warns if a team is waiting.
- Whose turn it is now appears on the deck screen, the pre-round screen and the countdown.
- "Go back to the words you missed" on the scorecard: a short round of just those cards,
  scores untouched.
- Decks merged wider: Animals & pets (with Under the sea), Nature & weather, Kids & toys,
  Places (landmarks + cities). Water gun / water pistol duplicate removed.
- New decks: Italy, Wine, Sommelier (the hard one), Fashion. The old Fashion is now Clothing.
- Fixed: the deck screen did not show who was picking when reached from the scoreboard.

**2026-09-03.3**
- Settings rows (round length, sound, tilt) could collapse to a sliver on the How to
  play screen — same squash as the scorecard. Chip rows are now unshrinkable everywhere.
- "How to play" is now "Settings & how to play", with the settings at the top.

**2026-09-03.2**
- Fixed the score card being squashed on the scorecard when the card list was long.
  Screen contents no longer shrink to fit; the screen scrolls instead.

**2026-09-03.1**
- Score during the round is now 30px with a PTS label, top right; the timer matches it
  top left with a LEFT label. Category sits beneath them.
- The ✕ during play is gone. To end a round early, press back twice — the first press
  explains itself, the second quits.

**2026-09-01.3**
- All mixed is first on the deck screen again, with Start here beneath it
- Bright room mode (How to play → Card screen): dark text on a pale card for daylight
- Relay rounds in party mode (More options): 90 seconds, "PASS IT" at 60 and 30
- Hardest card is tappable on the scorecard: one card, fifteen seconds, whole room clues.
  Scores and totals are untouched
- Party setup remembers the last game's result
- 21 new flow tests

Not done, and why: emoji icons and a bundled typeface are the two visual items left from
the audits. Both need assets produced outside this file — a drawn icon set, and a font file
that cannot be fetched from here. They are the right next visual step and they are not a
code change.

**2026-09-01.2**
- Last-card gamble: the card on screen at five seconds turns gold — 3 points if guessed,
  minus 1 on a pass, never below zero. One per round.
- Steals in party mode: the scorecard has +/− per other team; stolen points are added when
  the round is saved
- End-of-round beat: the score fills the screen for 1.6 s before the scorecard
- "Start here" row of four proven decks for the first five visits, then it retires
- Teaser lines on twenty decks, replacing the bare card count on the tile
- Banned-words explainer on the pre-round screen, shown once
- Party setup halved: decks, clue rules and steals moved under "More options"
- "Kids" group renamed "More"
- 18 new flow tests

**2026-09-01.1**
- Settings on the How to play screen: sound, vibration, round length (30/60/90 s)
- Countdown is 3 s for the first round, 1 s after that
- Clue rule shows next to the category for the first 8 s of a non-normal round
- One wildcard per round, placed between the 4th and 10th card, instead of dice on every card
- Party mode: "Same deck as last turn" shortcut on the scoreboard
- Banned words written for 343 cards across Animals, Food, Jobs, Sports, Countries,
  Kitchen and Around the house — coverage from 0.4% to 10.9%, and at least 80% in
  each of those decks (tested)
- Root traps fixed: Dance renamed Moves, Christmas/Space/School/Wedding cards renamed
- British-only vocabulary removed from the English decks (tested)
- Nine new decks: Tiny victories, Tiny tragedies, Excuses & white lies, Things people
  argue about, Ha ha ha, Things you say to a dog, At grandma's house, First world
  problems, Sounds you can make
- New content tests: root-trap ratio, banned-word coverage, regional vocabulary

**2026-08-29.5**
- Category is back on the card screen, on every round
- Swipe/tap hints retire after three rounds, unless tilt is not responding
- Party screens audited: 11 new flow cases covering back paths, live score,
  removing words mid-session, quitting, and reload survival
- Chips and home links raised to 44px tap targets
- Accent gradients behind white text darkened; white on the old amber measured
  1.77:1 on the winner card and the primary button

**2026-08-29.4**
- Quick play keeps a running total across rounds, shown on the scorecard
- Scorecard buttons now say what they do to that total: next round same deck,
  next round change deck, or start over

**2026-08-29.3**
- Live score on the card screen, top right
- Removed the clue-rule label and the category label from the card screen
- Home screen cut from six buttons to two, with the rest as a quiet link row
- "Removed words" only appears once you have removed something
- Tilt sensitivity and direction moved to How to play
- The tilt instructions on the pre-round screen retire after three rounds

**2026-08-29.2**
- `decks.js` is now requested as `decks.js?v=<version>`. Without this, Chrome
  serves a cached copy of the deck file even after a fresh upload, and the app
  reports it as missing. This was the cause of the red banner appearing on a
  repository that had every file in place.
- The banner now carries a **Clear cache and reload** button that deletes the
  service-worker caches, unregisters the worker and reloads bypassing the HTTP
  cache — so it can fix itself rather than only describing the problem.

**2026-08-29.1**

- Version stamping and the mismatch banner (this document's reason for existing)
- Famous memes deck, plus picture-card support for any deck
- Madonna deck under Music
- Category label on mixed and combined rounds only
- Service worker, PNG icons and a working install prompt
- Long-press tolerance so combining decks works on a real phone
- Card-screen contrast scrim: every deck colour now clears 4.5:1
