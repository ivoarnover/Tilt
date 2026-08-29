# Tilt — release 2026-08-29.2

## The whole app is nine files

Upload **all of them, every time**, to the repository root. Order does not matter —
GitHub Pages publishes the commit as a unit, so nothing is live until the whole
commit is. Picking out "just the changed ones" is what has gone wrong; the files
have version numbers now precisely because that is hard to track by hand.

```
index.html        the game: screens, tilt detection, scoring, party mode
decks.js          all deck content — 78 decks
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
v2026-08-29.2 · 78 decks · 3032 cards
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
