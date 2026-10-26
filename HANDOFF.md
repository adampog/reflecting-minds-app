# Handoff — Reflecting Minds App

Written 26 October 2026, 07:48 PDT, at the end of a cloud session that could not reach the
machine where OpenRig runs. The next session should be started from the Claude desktop app on
that machine, so that `rig` commands can be run directly.

Read `workspace/INDEX.md` first. It has the inventory, the integrity record, and — important —
the supersession order for the dated checkpoints, which has caught out one assistant already.

## State right now

| | |
|---|---|
| Governing spec | **v0.2**, 21 Oct — `fba4cd12…557ecfa5` |
| Current draft | **v0.4**, 26 Oct — `994262ee…7b671ef6e` — unreviewed, governs nothing |
| Rig | `01M5FK5RNCFB3PQK3GDR5K7ZG7`, seats `app-claude` and `app-codex`, **v0.1 still bound** |
| Last rig delivery | Entry-flow mockup, Direction A layered paper, commit `34326f86`, 23 Oct |
| Current brief | **v3** — `workspace/06_Project_Checkpoints_and_Links/OpenRig-brief-v3-photoreal-three-doors-2026-10-26.md` |
| Brief v3 status | In the repo and posted to `#all-reflecting-minds`. **Not yet queued to the rig.** |
| Accountable owners | None named |
| Slack | `#all-reflecting-minds` (C0CBKQRHRAQ). Jake H. Davis is `jhdavis@vijja.net`, not `jake@`. |

## The one thing to do first

Queue brief v3 to the rig. From the machine where OpenRig runs:

```bash
cd <wherever the repo is cloned>
rig queue create --source alan \
  --destination app-claude@reflecting-minds-app \
  --body-file workspace/06_Project_Checkpoints_and_Links/OpenRig-brief-v3-photoreal-three-doors-2026-10-26.md
rig send app-claude@reflecting-minds-app "task <id> is yours"
```

Then follow it: `rig queue list --destination app-claude@reflecting-minds-app -a`, and
`rig queue show <id> --full`. A task that changed hands is not finished.

The seats still have **v0.1 bound**. The brief tells them to rebind to v0.2 governing with v0.4
as context; check that they did, by hash.

## Decisions waiting on Alan and Jake

From v0.4 §9 and the review. None of these is mine to take.

1. **FR18 — record identity boundary.** Now a gate-0 decision. Jake's direction toward group
   work makes "permanently unlinkable records" the less likely right answer. Needs the two of
   them.
2. **FR19 — beta learning scope.** Jake's wish for a behavioural signal and the agreed privacy
   boundary can't both hold as written. Three forms are set out in v0.4; one has to be picked.
3. **Owners.** Four functions, none assigned. Everything else is blocked on this.
4. **No faces under photoreal.** Brief v3 holds this line from FR02. If it's to be relaxed,
   that's an explicit decision, not a drift.

## What Jake has already decided (23 Oct, in the register)

R1 first subset doors 2, 4, 7 · R2 dispositions deferred, divided-group reworked · R3 one
scenario costed first · R4 friction framing is his, kept as a suggestion.

## Pages (Claude-side; Jake can only see transcripts, not interact)

- Hub: `hub.html` → https://claude.ai/artifact/S372mey46KbZEGhayaoJF5
- Concept board: `doors.html` → https://claude.ai/artifact/V3n1LVmo8WtHG2ZS3GfzWh
- v0.2 review doc: https://claude.ai/artifact/HLbs45qLkfMaEQpRsdbQtG

The repo is the shared truth. The pages are views of it.

## Things a fresh session should not redo

- Don't rewrite the specs. v0.1, v0.2, v0.3 are untouched and should stay so; v0.4 is current.
- Don't quote the 16:04 brief's rig status. The 16:06 and 16:16 checkpoints supersede it.
- Don't scaffold code in `src/`. No implementation is authorized.
- Don't elevate the friction framing to direction. Jake set its status himself.
