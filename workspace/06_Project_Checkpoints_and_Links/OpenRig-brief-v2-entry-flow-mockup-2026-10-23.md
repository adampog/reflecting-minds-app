# OpenRig brief v2 — entry-flow mockup with expanded visual treatment

Prepared 23 October 2026 for rig `01M5FK5RNCFB3PQK3GDR5K7ZG7`
Seats: `app-claude@reflecting-minds-app` · `app-codex@reflecting-minds-app`

This brief supersedes the low-fidelity mockup brief bound to the seats on 21 October, in one
respect only: visual treatment of the entry flow. Everything else in that brief stands,
including the requirement that the two seats divide work flexibly and independently critique
and check each other.

---

## Specifications to bind

| Document | Status | SHA256 |
|---|---|---|
| Mobile Software Specification **v0.2**, 21 Oct 2026 | **GOVERNING** | `fba4cd12044956341bafa743a9c20e45da7863c91dffafae80813272557ecfa5` |
| Mobile Software Specification **v0.3 DRAFT**, 23 Oct 2026 | Draft, unreviewed, governs nothing | `b559b1450319e3c6e4c2e029d88ebec0f859db4ab955f4d5f24e3a6dc00e6903` |

v0.1 is currently bound to both seats and is **superseded**. Rebind to v0.2 as governing.

Bind v0.3 as context, not authority. It adds FR17–FR19 and amends FR01, FR02, FR16, AT10,
AT12 and AT15. Two of its amendments bear directly on this brief:

- **FR01 as amended** — the browse list and button route is the reference implementation for
  entry; the swipeable reel is an enhancement over it. Build and check the list route first.
- **FR02 as amended** — three of the nine doors are not situations. Present them accordingly.

Where v0.3 and v0.2 differ, **v0.2 governs**. v0.3 is unreviewed and has no reviewer distinct
from its author, as FR14 requires.

---

## What is requested

A new mockup and walkthrough video covering the **entry flow**: arrival, the door deck, door
selection, the involvement-route choice, the privacy explanation, and the first stage. The
seven-stage journey beyond that may reuse the existing v0.2 tap-through treatment.

Deliverables, as before: a tap-through viewer, a silent captioned walkthrough video under five
minutes, and an independent QA pass by the seat that did not build it.

---

## The change from the previous brief

The previous brief said no visual-asset polish was requested. **That restriction is lifted.
Polished visual assets are now wanted throughout.**

Polish and brightness are separate, and only one of them is scoped to the entry. Craft —
considered type, consistent spacing, real illustration rather than placeholder boxes — applies
everywhere, stages included. Colour, warmth and motion apply at the entry.

The reasoning, so the seats can apply it to cases this brief does not name: the governing
design problem is that the durable route must feel as safe and cheap to take as avoidance. A
person carrying friction who arrives at something that looks like a clinical intake form will
leave. The entry has to feel alive enough to be worth stepping into.

Past the threshold, the opposite holds. Someone who has just written out an unresolved tension
is not served by brightness, and a stage screen that stays cheerful while they do difficult
work reads as not listening.

**So: bright at the door, quiet in the room.**

### Entry flow — expanded treatment

- More imagery. Each of the nine doors carries a plate. Concept sketches exist and are
  **starting points to argue with, not artwork to copy**.
- Colour and warmth are wanted here. The existing concept board is deliberately muted and is
  probably too austere for this purpose.
- Motion is permitted in the browse: the deck may move, plates may settle, transitions may
  have life. Respect `prefers-reduced-motion` and provide an equivalent static route.
- The still frame matters most. Each plate must work as the first frame of a reel, before any
  motion runs.

### Stages — polished, but quiet

Notice through Review get the same craft as the entry: proper typography, consistent spacing,
real assets rather than placeholders. What they do not get is brightness. No celebratory
motion, no colour shift on completion, no visual reward for finishing. Completion is not an
achievement, and a stage screen that stays cheerful while someone does difficult work reads as
not listening.

Quiet is a deliberate quality here, not an absence of effort. A restrained screen that has been
carefully made looks different from one that was never finished, and the difference is the
point.

---

## Constraints that do not move

These come from the governing specification and apply to every asset in this brief.

| Constraint | Source |
|---|---|
| No faces or bodies anywhere. A depicted face invites the viewer to read identity into the scenario | FR02 — no identity inference |
| No imagery implying an outcome: no resolved handshake, no clear sky after storm, no before-and-after | AT17 — no overclaim |
| No streaks, counters, progress bars, completion badges or return rewards | FR15 — no engagement mechanics |
| No visual hierarchy across the nine doors. If one plate is more arresting than the rest, the deck has ranked them and the shuffle cannot undo it | FR02 — taxonomy is not a ranking |
| No contemporary political or religious markers, no recognisable real settings | §6 — no implied moral conclusion |
| Every fictional scenario labelled as fictional, on every frame | FR11 |
| Text alternatives carry the core content. A plate that needs its caption to make sense fails | §6, AT15 |
| Both entry routes — list and reel — demonstrated and checked | FR01 as amended |

**"Engaging" in this brief means inviting and easy to begin.** It does not mean retention,
session length, or anything that would survive as a metric. Nothing in this mockup may
demonstrate a mechanic whose purpose is to bring a user back.

---

## Status of everything produced

**Demonstrator only.** These assets authorize no production asset work and establish no
approved visual direction. The creative direction of record remains pre-produced hybrid live
action and generated imagery, and neither v0.2 nor v0.3 authorizes asset generation.

Every frame carries the mock label already used in the v0.2 walkthrough. The video does not
claim working backend, privacy, storage or security behaviour, because none exists.

A production look is a creative-direction decision requiring the content owner, who is not yet
named. This brief does not make that decision and must not be read as making it.

---

## The nine doors

Titles are the provisional taxonomy from v0.2 §2. Scenario titles below are **unreviewed
drafts** and may be replaced.

| Door | Draft scenario | Note |
|---|---|---|
| Unresolved personal tension | The hives | Safety read required before publication |
| Seeing things differently | The riverbank | Structurally clean; suggested first build |
| Uncertainty | The last barrel | — |
| Divided group | The bridge or the ford | Must stay one person reflecting about a group |
| Another person's perspective | The copied letter | Carries AT08 — motives as interpretation |
| Something seen or heard | Twice told | — |
| Values in tension | Two births | Safety read required; must not resolve |
| Self-understanding | The longer way | Not a situation — quieter, shorter path |
| Just curious | The same bowl | Not a situation — shortest path, no funnelling onward |

Nine doors does not mean nine launch-ready scenarios. For this mockup, placeholder content is
expected and must be labelled as such.

---

## Independent critique

Unchanged from the previous brief and worth restating, because this one asks for a judgment
call rather than a checklist. The seat that did not build the entry treatment should answer:

1. Does the entry feel safe to step into, or does it feel like being sold something?
2. Does any frame imply an outcome, however gently?
3. Would the brightness read as tone-deaf to someone arriving in real difficulty?
4. Does the list route work as well as the reel, or has it been treated as the fallback?

Disagreement between the seats should be recorded rather than resolved silently.

---

## Open questions this brief does not settle

- The initial scenario subset and production schedule (open decision 1) is with the content
  owner. This mockup does not select it.
- Whether authored media is the content or an enhancement to a complete text route (v0.3 §5
  media precedence) is undecided. Assume the text route is complete in itself.
- Whether the displaced settings used in the draft scenarios suit someone in live difficulty is
  untested. If capacity allows, one contemporary and culturally unmarked plate would make the
  comparison possible.
