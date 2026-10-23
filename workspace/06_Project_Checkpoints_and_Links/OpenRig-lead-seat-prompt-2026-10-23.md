# Paste-ready prompt for the OpenRig lead seat

Rig `01M5FK5RNCFB3PQK3GDR5K7ZG7` · 23 October 2026

Two routes below. The queue task is the one the OpenRig `rigs` skill calls correct — "a message
informs, and a queue task is the work someone owns." The paste version is for typing straight
into the lead's pane.

---

## Route A — queue task (preferred)

Save the prompt below as `brief.md`, then:

```bash
rig queue create --source alan \
  --destination app-claude@reflecting-minds-app \
  --body-file brief.md

rig send app-claude@reflecting-minds-app "task <id> is yours"
```

Replace `<id>` with the id that `queue create` returns. Swap the destination seat if
`app-codex` is leading this one instead.

To follow it: `rig queue list --destination app-claude@reflecting-minds-app -a`, then
`rig queue show <id> --full`. A task that changed hands is not finished — follow each handoff
until a seat reports a result.

---

## Route B — paste into the lead's pane

Everything between the lines.

---

New brief for the Reflecting Minds App mockup. This supersedes the 21 October low-fidelity
brief on visual treatment only. Everything else in that brief stands, including flexible
division of work and mutual independent critique.

**Rebind specifications.** v0.1 is bound to both seats and is superseded.

- Governing: Mobile Software Specification v0.2, 21 Oct 2026,
  SHA256 `fba4cd12044956341bafa743a9c20e45da7863c91dffafae80813272557ecfa5`
- Context only, unreviewed, governs nothing: v0.3 DRAFT, 23 Oct 2026,
  SHA256 `b559b1450319e3c6e4c2e029d88ebec0f859db4ab955f4d5f24e3a6dc00e6903`

Verify both hashes before reading. Where v0.3 and v0.2 differ, v0.2 wins. Two v0.3 amendments
matter here: the browse list and button route is the reference implementation for entry and the
swipeable reel is an enhancement over it; and three of the nine doors are not situations.

**What to build.** A new mockup and walkthrough video covering the entry flow — arrival, door
deck, door selection, involvement-route choice, privacy explanation, first stage. Stages beyond
that may reuse the existing v0.2 tap-through. Deliver a tap-through viewer, a silent captioned
video under five minutes, and an independent QA pass by whichever seat did not build it.

**What changed.** The previous brief asked for no visual-asset polish. That restriction is
lifted — polished assets are wanted throughout.

Polish and brightness are different things, and only brightness is scoped. Craft applies
everywhere: considered type, consistent spacing, real illustration instead of placeholder
boxes, stages included. Colour, warmth and motion apply at the entry only.

The reason, so you can apply it to cases this brief does not name: the durable route has to
feel as safe and cheap to take as avoidance. Someone carrying friction who arrives at what
looks like a clinical intake form will leave, so the entry has to feel alive enough to be worth
stepping into. Past the threshold the opposite holds — someone who has just written out an
unresolved tension is not served by brightness. Bright at the door, quiet in the room. Quiet
still means carefully made; a restrained screen that was finished looks different from one that
was never started.

**Entry treatment.** Each of the nine doors carries a plate. Colour and warmth are wanted. The
existing concept sketches are starting points to argue with, not artwork to copy, and are
probably too austere for this. Motion is permitted in the browse — the deck may move, plates
may settle — with `prefers-reduced-motion` respected and an equivalent static route. Each plate
must work as a still frame before any motion runs.

**Constraints that do not move.** These come from the governing specification.

- No faces or bodies anywhere. A face invites the viewer to read identity into the scenario
  (FR02, no identity inference).
- No imagery implying an outcome — no resolved handshake, no clear sky after storm, no
  before-and-after (AT17, no overclaim).
- No streaks, counters, progress bars, completion badges or return rewards (FR15).
- No visual hierarchy across the nine doors. If one plate is more arresting than the rest, the
  deck has ranked them and the shuffle cannot undo it.
- No contemporary political or religious markers, no recognisable real settings.
- Every fictional scenario labelled fictional, on every frame (FR11).
- Text alternatives carry the core content. A plate that needs its caption to make sense fails.
- Both entry routes, list and reel, demonstrated and checked.

"Engaging" here means inviting and easy to begin. It does not mean retention or session length.
Do not demonstrate any mechanic whose purpose is to bring a user back.

**Status of everything produced: demonstrator only.** These assets authorize no production
asset work and establish no approved visual direction. Neither v0.2 nor v0.3 authorizes asset
generation; the creative direction of record remains pre-produced hybrid live action and
generated imagery. Carry the mock label on every frame, as the v0.2 walkthrough does. Claim no
working backend, privacy, storage or security behaviour — none exists. A production look needs
the content owner, who is not yet named.

**The nine doors.** Titles are the provisional v0.2 §2 taxonomy; scenario titles are unreviewed
drafts and may be replaced.

1. Unresolved personal tension — *The hives*. Safety read required before publication.
2. Seeing things differently — *The riverbank*. Structurally clean; suggested first build.
3. Uncertainty — *The last barrel*.
4. Divided group — *The bridge or the ford*. Must stay one person reflecting about a group.
5. Another person's perspective — *The copied letter*. Carries AT08, motives as interpretation.
6. Something seen or heard — *Twice told*.
7. Values in tension — *Two births*. Safety read required; must not resolve.
8. Self-understanding — *The longer way*. Not a situation: quieter, shorter path.
9. Just curious — *The same bowl*. Not a situation: shortest path, no funnelling onward.

Nine doors does not mean nine launch-ready scenarios. Placeholder content is expected here and
must be labelled as such.

**Independent critique.** This brief asks for judgment, not a checklist, so the reviewing seat
should answer four questions directly:

1. Does the entry feel safe to step into, or does it feel like being sold something?
2. Does any frame imply an outcome, however gently?
3. Would the brightness read as tone-deaf to someone arriving in real difficulty?
4. Does the list route work as well as the reel, or has it been treated as the fallback?

Record disagreement between seats rather than resolving it silently.

**Not settled by this brief.** The initial scenario subset and production schedule sit with the
content owner. Whether authored media is the content or an enhancement to a complete text route
is undecided — assume the text route is complete in itself. Whether the displaced historical
settings suit someone in live difficulty is untested; if capacity allows, one contemporary and
culturally unmarked plate would let that comparison be made.

**What done looks like.** A branch or commit with the tap-through viewer, the rendered video,
the QA pass with the four questions answered, and any recorded disagreement. Report the result
back with the branch or commit name — not just that the work was sent.

---

## Before you send

The two spec files need to be where the seats can read them. They are in the project repository
at `workspace/01_Software_Specifications/`. If the rig reads from a different path, put them
there and adjust the hashes check accordingly — the hashes above are the authority, not the
filenames.
