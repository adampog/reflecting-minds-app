# Reflecting Minds: entry-flow mockup (demonstrator)

A phone-sized tap-through of the entry flow in the *Reflecting Minds Mobile Software Specification* v0.2: arrival, the door deck, door selection, the choice of how involved to be, the privacy explanation and the first stage (Notice). The later stages reuse the v0.2 tap-through in the same quiet treatment.

**Status: demonstrator only.**
- All content is fictional placeholder text. Scenario titles are unreviewed drafts.
- Two scenarios, *The hives* and *Two births*, need a safety read before any publication.
- There is no AI, no backend and no network use. Nothing here shows real privacy, storage or security behaviour.
- The artwork is the Art Department's direction A (layered paper), chosen by Alan for this demonstrator. It sets no approved visual direction and authorises no production asset work.

## How to review
- Open `app/index.html` in a browser at phone width (about 390 px).
  - Both ways in start on the arrival screen: **As a list** (the reference route) and **One at a time** (swipe or buttons).
  - The door order is shuffled on each visit. Add `?order=fixed` for a repeatable order.
  - `app/index.html?door=seeing-differently` opens one door from a link.
  - `?door=old-route-pack` shows the safe fallback for a retired link.
- `app/plate-comparison.html` is a review-only page. It shows the displaced and the contemporary riverbank plates side by side, for the open question of which setting suits someone in live difficulty.
- Video: `out/entry-walkthrough.mp4`. It is silent, captioned, under 300 s, and recorded headlessly at 390×844.

## What it shows
- **Bright at the door, quiet in the room.** The entry screens use the warm entry palette and the plates. From the privacy screen on, the quiet room palette applies, with no reward colour, celebratory motion or completion marks.
- **Two equal routes.** The list and the reel have the same doors, text and actions (open, Surprise me, neutral introduction), and each is one tap from the other.
- **Motion only on user action.** A plate settles once after each step. Nothing autoplays. Under reduced motion nothing moves.
- **Not a situation.** Self-understanding and Just curious (dispositions) and Divided group (a context) say so in plain text. The two dispositions have shorter paths, and Just curious offers stopping after Notice as a complete visit. All nine plates have equal visual weight.
- **Plain stage menu.** "Stage: Notice · change" opens a menu of all seven stages. There is no progress bar, counter or tick.

## Art (all from the Art Department library, copied byte-identical)
`scripts/sync-assets.py` copies each pinned item from `yt-art-library/rma/` into `app/assets/` and checks every file against the item's manifest. Pins are in `app/assets/ASSETS.lock.json`. The items are:
- tokens
- the icon set
- the nine-plate door deck
- the arrival art
- the contemporary riverbank plate
- the privacy diagram
- four stage diagrams

## Not tested or not claimed
- No real devices, screen readers, large text, installation or offline use.
- No user or emotional-safety testing. The four judgement questions are answered by the reviewing seat, not by participants.
- No production readiness, privacy or security claim.

## Rebuild
```
python3 scripts/sync-assets.py
NODE_PATH=<path to a node_modules with playwright> node scripts/record-entry.js --dry   # storyboard stills
NODE_PATH=... node scripts/record-entry.js                                              # render (ffmpeg needed)
```
