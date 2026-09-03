Picture cards
=============

Any card can show an image to the room. The holder still guesses the name.

Card format in decks.js:

    "Answer|banned,words|filename.jpg"      with banned words
    "Answer||filename.jpg"                  without banned words

Drop the image file in this folder, matching the filename exactly. If the file
is missing the card falls back to text only, so a broken filename never breaks
a round.

Sizing: roughly 800x800 or smaller. Everything is bundled in the app and cached
for offline play, so large files make the whole thing slower to load.

A note on where images come from
--------------------------------
Meme images are almost all copyrighted. Distracted Boyfriend is a licensed
stock photo, Success Kid and Hide the Pain Harold are photographs of real
people, and Grumpy Cat is an actively enforced trademark. Bundling them into a
published app is infringement, and the meme ones have a history of being
litigated.

Safe sources for pictures you add here:
  - photos you took
  - drawings you made
  - public domain (CC0) images
  - images you have licensed

The Famous memes deck ships as text only for this reason. It plays fine that
way: the room describes the meme, the holder names it.
