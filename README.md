# Reflecting Minds App

A mobile-first, optionally installable **Progressive Web App** for structured personal
reflection — connecting attention, lived motivation, discernment, a chosen response, and
later learning.

Local-first. No account. No live AI in beta.

## Status

**Planning and review. No implementation authorized.**

`src/` is deliberately empty. The governing documents require scope agreement, named
accountable owners and a separate authorization before any code work begins.

| | |
|---|---|
| Governing spec | **v0.2**, 21 Oct 2026 (supersedes v0.1) |
| Current plan | v0.2 PWA Implementation Plan — plan only, authorizes nothing |
| Phase | 0 — Agree scope (not started) |
| Framework | Not selected; explicitly deferred |
| Accountable owners | **None assigned** — required before release |

## The model

Seven flexible stages, which the user may move back through, skip, pause, leave, or disagree
with at any point:

```
Entry → Notice → Motivation → Compare → Discern → Respond → Review
```

Approximately nine **entry doors** form a provisional, versioned content taxonomy. Doors
describe content; they never label people. Fictional, personal and neutral routes are all
supported without requiring disclosure, and a neutral route stays usable throughout.

Three core flows: **A** try an experience · **B** examine a disagreement · **C** return and learn

### Privacy posture

Unsaved drafts live in memory only. Durable saving requires a deliberate, plainly-named
"Save on this device" action. Export is field-selectable with a preview; deletion is scoped
and confirmed. Reflection text is never transmitted — not to servers, analytics, or AI.

### Not in beta

Live AI · generated summaries or classifications · voice AI · groups · shared journals ·
public sharing · user-to-user invitations · research enrollment · ratings · satisfaction
surveys · prompts to explain learning.

No claims may be made about proven improvements in Global Attentiveness, empathy, agreement,
wise action, or conflict resolution.

## Repository layout

```
.
├── workspace/          Imported project bundle — specs, videos, mockups, notes
│   └── INDEX.md        ← start here
├── docs/
│   └── decisions/
│       ├── 0001-framework-choice.md   Deferred; PWA direction agreed
│       └── OPEN_DECISIONS.md          Eight open decisions + phase gates
├── src/                Empty — no implementation authorized
├── .editorconfig
└── .gitignore
```

## Getting started

There is nothing to run. The mockups in `workspace/04_Interactive_Mockups/_unpacked/` are
browsable by opening their `index.html` in a browser — but they are **disposable
demonstrators**, not architecture.

To review the project:

1. `workspace/INDEX.md` — inventory, integrity record, and orientation
2. `workspace/SOURCE_BUNDLE_START_HERE.md` — the bundle author's own notes and review warnings
3. The v0.2 specification and PWA implementation plan
4. `docs/decisions/OPEN_DECISIONS.md`

## Next steps

Phase 0 of the PWA plan, in order:

- [ ] Approve requirements and content principles
- [ ] Name accountable owners — Product, Engineering, Content, Privacy/Operations
- [ ] Select the initial scenario subset and supported browsers
- [ ] Resolve the open decisions needed for a thin build (see `OPEN_DECISIONS.md`)
- [ ] Separately authorize any implementation work
- [ ] Add a license

## A note on the walkthroughs

The six videos in `workspace/03_Walkthrough_Videos/` are demonstrations. Voice-first is
scripted; social entry is simulated; updated-model group screens are proposals. None
demonstrates working backend, privacy, or security behavior. The mockup's sixteen passing
local checks do not satisfy the production gates.

## License

Not yet chosen.
