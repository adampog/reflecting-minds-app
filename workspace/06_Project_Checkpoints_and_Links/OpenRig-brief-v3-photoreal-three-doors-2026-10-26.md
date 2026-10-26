# OpenRig brief v3 — three doors, photoreal imagery and video, from v0.4

Prepared 26 October 2026 for rig `01M5FK5RNCFB3PQK3GDR5K7ZG7`
Seats: `app-claude@reflecting-minds-app` · `app-codex@reflecting-minds-app`

Supersedes brief v2 of 23 October. The entry-flow mockup delivered against v2 (Direction A,
layered paper, commit `34326f86`, Codex QA accepted) is the baseline this one builds from.

---

## Specifications to bind

| Document | Status | SHA256 |
|---|---|---|
| Mobile Software Specification **v0.2**, 21 Oct 2026 | **GOVERNING** | `fba4cd12044956341bafa743a9c20e45da7863c91dffafae80813272557ecfa5` |
| Mobile Software Specification **v0.4 DRAFT**, 26 Oct 2026 | Context. Unreviewed. Governs nothing. Supersedes v0.3 | `994262ee77134c15b9c7455a458ccd1e3f345fc96bc508b73d0d67aded4cee7e` |

Both are in the project repository at `workspace/01_Software_Specifications/`. The repository is
public: `github.com/adampog/reflecting-minds-app`. Verify both hashes before reading. Where
v0.4 and v0.2 differ, v0.2 wins.

v0.4 carries the first recorded decisions, taken by Jake H. Davis on 23 October. Three of them
shape this brief directly and are not open for reinterpretation:

- **R1 — the first subset is three doors:** Seeing things differently, Divided group, Values
  in tension. Build only these.
- **R2 — the dispositions are deferred** (Self-understanding, Just curious). Do not build them.
  **Divided group is reworked** with real conflict between needs; the earlier walking-route
  draft is withdrawn.
- **R3 — one scenario is costed completely first.** This brief asks for one full scenario and
  two lighter ones, so the cost of the full one can be measured.

And one new requirement: **FR20** — enough situational context must precede the attention
practice. Jake's finding on the v2 mockup was that the attentiveness layer felt premature.
Where Notice sits in each scenario is now a per-scenario content decision; record it.

---

## What is requested

A new mockup and walkthrough covering the three doors, using **photorealistic imagery and
video** in place of the layered-paper illustration of v2.

Deliver:

1. **One complete scenario — Seeing things differently, *The riverbank*** — carrying
   everything a real scenario needs: authored prompts for all seven stages, the attention
   practice placed per FR20 with the reason recorded, deterministic branches, text
   alternatives, captions, a transcript, and all three involvement routes. **Record what it
   cost** — hours by seat, by stage, by asset type. That number is the point of R3.
2. **Two lighter scenarios** — Divided group (*The well*, below) and Values in tension
   (*Two births*) — at entry-flow depth: plate, opening, route choice, first stage.
3. The tap-through viewer, a silent captioned walkthrough under five minutes, and an
   independent QA pass by the seat that did not build it.

---

## The visual change

v2 asked for polished illustration. v3 asks for **photorealistic still imagery and short video**.

This is on the creative direction of record — v0.2 §1 names pre-produced hybrid live action
and generated imagery as the direction — and on the content roadmap Jake stated on 23
October, now in v0.4 §5: video for each scenario, audio, and at minimum realistic images in
different presentation styles.

Two things hold from v2 and are more important with photoreal than they were with drawings:

**No faces, no bodies.** A drawn figure is an abstraction. A photoreal person is a specific
age, build, colour and class, and the viewer reads all of it into the scenario before a word
is shown. That is the identity inference FR02 forbids. Photoreal *scenes* — the riverbank at
the measured gap, the hives at the fence, the fork in the night road — carry the situation
without putting anyone in it. If a scene cannot work without a person, that is a finding;
report it rather than adding one.

**Bright at the door, quiet in the room.** Photoreal makes this easier to get wrong. A
warm, inviting plate at entry is right. The same saturation on a Discern screen, while
someone is writing out whose motives they're interpreting, reads as not listening.

### Video

Short, looping or near-still. The still frame comes first and must work on its own; video
adds atmosphere to it — water moving past the stakes, lamplight at the fork — not narrative.
Nothing in motion that implies an outcome. `prefers-reduced-motion` gets the still.

### Imagery source (amended 26 October, Alan's decision)

The seats do not generate images or video. All stills, video loops, icons and diagrams come from
the Art Department (`art-producer@shared-art-assets`) as **reusable library assets**, because this
is only a mockup.

- Before building, send Art a short asset list: each asset, where it is used, size and format.
- Reuse accepted items from `yt-art-library` where they fit.
- Pin the assets you use and copy them byte-identical, as the entry-flow mockup did.
- Art is saved for reuse but is not final: it may change depending on later choices.

If Art cannot supply photoreal stills or video, say so in the first report rather than
substituting. A brief that can't be executed as written needs rewriting, not improvising.

---

## The three scenarios

### Seeing things differently — *The riverbank* (full build)

Two surveyors measure the same bank in the same week and place the boundary in different
spots. Neither has made an error; they read the same ground differently.

Structure: honest disagreement from identical evidence. The temptation is a hidden right
answer; there must not be one. Carries most weight at Discern — observation against
inference.

FR20 note: the two readings need to be *shown* — the stakes, the lines, the gap — before the
practice is offered. A viewer who hasn't seen the gap has nothing to notice.

### Divided group — *The well* (entry depth; replaces the withdrawn draft)

A village's one well is failing. Repairing it means the families nearest it lose their
gardens to the digging for a season — their food. Not repairing it means the families furthest
away walk two hours for water by spring. Both groups are right about what they stand to lose.
The council must decide by the new moon.

Structure: two legitimate needs that cannot both be fully met, held by two parties, with a
deadline. This is Jake's R2 instruction applied — real conflict between needs, not
disagreement about a route. It also fits his stated direction: a structure that would survive
being worked on by several people with competing stakes.

Stays single-user: one person reflecting *about* a divided group. Any multi-party or shared
element enters deferred scope.

### Values in tension — *Two births* (entry depth)

A midwife is called to two births the same night, in opposite directions. One family asked
first. The other has no one else.

Structure: two legitimate obligations that cannot both be met. Must not resolve — if a
reviewer can pick the right answer, the scenario is miscalibrated. Safety read required before
publication.

---

## Constraints that do not move

| Constraint | Source |
|---|---|
| No faces or bodies in any image or frame | FR02 |
| No imagery implying an outcome, in still or motion | AT17 |
| No streaks, counters, progress, badges, return rewards | FR15 |
| No visual hierarchy across the three doors | FR02 |
| No contemporary political or religious markers, no recognisable real places | §6 |
| Fictional label on every frame | FR11 |
| Text alternatives carry the core content; a plate that needs its caption fails | §6, AT15 |
| List route built and checked before the reel | FR01 as amended |
| Context before practice; Notice placement recorded per scenario | FR20 |

---

## Status: demonstrator only

Unchanged from v2. These assets authorize no production asset work and establish no approved
visual direction. Mock label on every frame. No claim of working backend, privacy, storage or
security behaviour. A production look needs the content owner, who is not yet named.

Photorealistic demonstrator assets are still demonstrators. Their realism does not change
their status.

---

## Independent critique

The reviewing seat answers directly:

1. Does the entry feel safe to step into, or does it feel like being sold something?
2. Does any frame, still or moving, imply an outcome?
3. Is there a person anywhere? If a scene needed one, was that reported or papered over?
4. In *The riverbank*: is there enough shown before the practice for a viewer to have
   something to notice? Where did Notice land, and why?
5. In *The well*: do the two needs actually compete, or has one been made easier to pick?
6. What did the full scenario cost, and does the number look honest?

Record disagreement between seats rather than resolving it silently.

---

## Not settled by this brief

The production schedule beyond these three. Media precedence — whether the imagery is the
content or an enhancement to a complete text route; assume the text route is complete. The
record identity boundary (FR18), which is now a gate-0 decision for Alan and Jake and which
this mockup must not pre-empt in either direction.

**What done looks like.** A branch or commit with the viewer, the rendered walkthrough, the
cost record for *The riverbank*, the QA pass with the six questions answered, and any
recorded disagreement. Post the result to `#all-reflecting-minds` with the commit name.
