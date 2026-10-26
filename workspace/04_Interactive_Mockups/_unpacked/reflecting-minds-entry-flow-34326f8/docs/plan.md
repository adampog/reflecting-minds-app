# Entry-flow mockup: plan (r1.2)

**Governing spec:** v0.2 (sha256 fba4cd12…, verified). **Context only:** the v0.3 DRAFT (b559b145…, verified). **Authority for list precedence:** Alan's brief of 23 Oct (`OpenRig-brief-v2-entry-flow-mockup-2026-10-23.md`), not the unadopted v0.3.

## Scope
The entry flow is: arrival → door deck → door selection → involvement-route choice → privacy explanation → first stage (Notice). The stages after that reuse the accepted v0.2 tap-through, restyled in the quiet treatment.

**Deliverables:**
- a tap-through viewer
- a silent captioned video under 300 s
- an independent QA pass by the seat that did not build, answering the four questions in the brief
- a disagreement log

## Ownership (proposed)
- **app.claude** builds the app, recording script and video.
- **app.codex** critiques the art request and this plan, then does the final QA with the four answers.
- **Art Department** makes all plates, icons, diagrams and tokens in `yt-art-library/rma/`. The mockup draws no art of its own.

## Key decisions to critique
1. **Two entry routes with equal standing; the list is built and tested first.** v0.2 §2 says the reel is "primary proposed" and list access is "required". v0.3 amends FR01 and FR02: the list-and-button route is the reference and defines required behaviour, and the reel is an enhancement. v0.2 wins where they conflict, and both require both routes. So the list is built and checked first, both routes get the same finish and the same functions (open door, info, Surprise me), and the list is the default under reduced motion and is reachable in one tap from the reel. **Open:** which route is shown first on arrival is recorded, not decided.
2. **Bright at the door, quiet in the room.** Entry tokens (warm colour, motion) stop at the privacy screen. Privacy and the stages use the quiet tokens: the same craft, muted colour and no motion.
3. **Motion.** The deck slides and plates settle on user action only. Nothing autoplays, changes the chosen door or moves focus. Any looping motion has a visible Pause. Under `prefers-reduced-motion` there is no motion, and the static list is equivalent. Every plate is checked as a still frame.
4. **Labels.** A persistent mock strip and a "Fictional · placeholder content" label are on every frame.
5. **Not built:**
   - streaks, counters, progress bars or badges. The v0.2 stage bar is replaced by a plain "Stage: <name>" menu button, with no track, fractions, ticks or accumulating state
   - return mechanics
   - any claim of backend, privacy, storage or security behaviour

## Stop criteria
- A reviewable phone flow exists before any polish.
- One frozen storyboard gets peer review before one render.
- A QA HOLD gets at most two repair rounds before escalation.
- No art edits inside the mockup.

## Blocked on
- **Alan's choice of art direction.** Art proposes 2–3 directions first. The flow skeleton can be built before that choice, using neutral placeholder plates that are clearly labelled.

## Disposition and context doors (presentation in text, not plate weight)
- Self-understanding and Just curious are dispositions; Divided group is a context (per v0.3, context only).
- The door page says so in plain text and states a shorter path for the two dispositions. Just curious offers Leave as an equal choice after the practice, with no onward funnel.
- Divided group stays one person's reflection, with no group workspace.
- This is a mockup assumption. The taxonomy decision stays open.

## Review
- Codex pre-build review r1: `docs/qa/rma-entry-prebuild-review-codex.md` (accepted with clarifications, all applied in r1.2).

## Decisions recorded
- 2026-10-23 17:38Z: Alan chose art direction **A, layered paper** (Art and builder had leaned to B; recorded, not reopened). QA watch for A: nine plates equal in visual weight at A's saturation; brightness at the door only; the room quiet with no reward colour; old flood line fixed. The four critique questions get honest answers for A, and A is not quietly softened into B.
- **Scene page colour, recorded disagreement.** The builder kept the full-colour plate on the quiet scene page, as scenario content rather than decoration. Codex (pre-render r1) disagreed: the text already carries the whole scenario, and the bright plate breaks the quiet room. The builder accepted Codex's view, and the scene is now text only (r2). Direction A is unchanged at the entry. The disagreement is recorded here, not erased.
- Builder note to Art (18:13Z): at thumbnail size the two water plates (riverbank, bridge/ford) pull the eye more than the sparse plates (bowls, desk, hold). Asked for v0.1.2 to lift the sparse ones rather than dim the water ones.

## Pre-render r1 repairs (Codex HOLD, `docs/qa/r1/`)
1. Scene after privacy is text only.
2. Swipe: plates are `draggable="false"` and `-webkit-user-drag: none`, with `pointercancel` handled. The recorder now asserts that every swipe changes the card.
3. "Text only" drops every picture and diagram, keeping their captions as text.
4. The reel has the neutral shortcut too.

Codex's check-r1.js, rerun unchanged except for its output folder, gives 30/30 passing.
- Pre-render r2 (Codex): original four repairs pass. One regression from my r1 edit was fixed: an extra quote emptied every plate's alt. The recorder now asserts that all nine rendered alts equal Art's pinned descriptions plus "Fictional drawing." (`docs/qa/r2/`).
