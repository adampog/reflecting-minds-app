# Reflecting Minds — co-work space index

Source bundle: `Reflecting_Minds_COMPLETE_PROJECT_BUNDLE_2026-10-22.zip`
Imported: 22 October 2026 · 32 files · 19 MB
Integrity: 29 of 32 files verified against `FILE_MANIFEST_SHA256.csv` — **0 mismatches, 0 missing**.
(The 3 unverified files are the manifest itself and two files written after it was generated.)

---

## ⚠️ Status: planning and review. No implementation authorized.

This workspace holds **reference material and decisions**. It is not a codebase and
contains no production code. The source documents are explicit on this point:

> "This document proposes an implementation sequence and release gates. It does not
> authorize implementation, select a production framework, or claim the beta is ready."
> — *v0.2 PWA Implementation Plan*

> "Do not copy the prototype into production by default or connect this plan to a
> repository as an implementation step."
> — *ibid., §Logical architecture*

`src/` in this repository is therefore still empty, deliberately. The mockup code in
`04_Interactive_Mockups/` is a **disposable demonstrator**, not an architecture to build on.

---

## Governing documents

| Document | Status | Location |
|---|---|---|
| Mobile Software Specification **v0.2** (21 Oct 2026) | **CURRENT** — supersedes v0.1 | `01_Software_Specifications/NEWReflecting_Minds_Mobile_Software_Specification_v0.2_2026-10-21.docx` |
| Mobile Software Specification v0.1 (21 Oct 2026, 15pp) | Superseded; retained for provenance | `01_Software_Specifications/Reflecting_Minds_Mobile_Software_Specification.docx` |
| v0.2 PWA Implementation Plan | Current starting plan | `05_Implementation_and_Review_Notes/Reflecting_Minds_v02_PWA_Implementation_Plan.md` |

**v0.2 SHA256:** `fba4cd12044956341bafa743a9c20e45da7863c91dffafae80813272557ecfa5`
This matches the governing hash cited inside the PWA plan — the plan and the spec in this
workspace are the same pair that were reviewed together.

**v0.1 SHA256:** `a07e664f6e81dce41ca28d0839cbbc857ecc9fff625bda9ee85a3178bb6ea0ff`

> Note: the working brief dated 21 Oct 16:04 UTC names v0.1 as governing. That brief
> predates v0.2. Per the PWA plan and the bundle's START_HERE, **v0.2 governs.**

---

## The product, in brief

A mobile-first, optionally installable **PWA**. No account, no live AI, no groups in beta.
Local-first reflection with explicit on-device save and user-controlled export/deletion.

**Seven flexible stages:** Entry → Notice → Motivation → Compare → Discern → Respond → Review
Users may move back, skip optional work, pause, disagree, decline action, or exit at any point.

**~9 entry doors** — a provisional, versioned content taxonomy. Doors describe content, never
label people. Nine doors does not mean nine launch-ready scenarios.

**Three core flows:** A — Try an experience · B — Examine a disagreement · C — Return and learn

### Explicitly out of scope for beta
Live AI · generated summaries or classifications · voice AI · groups · shared journals ·
public sharing · user-to-user invitations · research enrollment · ratings · satisfaction
surveys · prompts to explain learning.

No claims may be made about proven improvements in Global Attentiveness, empathy, agreement,
wise action, or conflict resolution.

---

## Contents

### `01_Software_Specifications/`
Both specifications. v0.2 structure: status/provenance → product model → three core flows →
FR01–FR16 → architecture and data boundaries → accessibility and content review →
AT01–AT17 acceptance tests → delivery gates → open decisions → relationship to v0.1.

### `02_Discussions_and_Decisions/`
Curated discussion summary. **Not** complete verbatim transcripts — those were not available
through the source workspace. ChatGPT *Data Controls → Export Data* is the user-controlled
route to the full history if it is ever needed.

### `03_Walkthrough_Videos/`
Six MP4 demonstrations, all verified playable:

| Video | Duration | Resolution | Audio |
|---|---|---|---|
| Mobile walkthrough | 154.80s | 390×880 | — |
| Desktop walkthrough | 154.88s | 1280×836 | — |
| v0.2 mockup walkthrough | **183.28s** | 390×844 | — |
| Voice-first conversation | 268.02s | 1280×720 | AAC |
| Updated model walkthrough v1 | 281.52s | 1280×720 | — |
| Social entry walkthrough | 286.48s | 1280×720 | — |

The 183.28s figure matches the "accepted 183.28-second mockup" cited in the PWA plan.

**Read these as demonstrations, not working software.** Voice-first is scripted. Social entry
is simulated. Updated-model group screens are proposals. None demonstrates working backend,
privacy, or security behavior.

### `04_Interactive_Mockups/`
Two tap-through viewers, original ZIPs retained plus `_unpacked/` for browsing:

- `reflecting-minds-v02-viewer/` — v0.2 tap-through; `app/app.js` (32 KB), content, styles.
  Open `app/index.html` in a browser.
- `reflecting-minds-updated-model-v1/` — storyboard-driven frames; open `index.html`.

Their localStorage code, placeholder content, and fictional branches are **disposable
demonstrators**. Not the production architecture. Not approved content.

### `05_Implementation_and_Review_Notes/`
The PWA implementation plan (the substantial document — phases 0–5, acceptance gates, the
requirement-to-evidence checklist), mockup QA, updated-model change notes, and the voice-first
and social-entry addenda.

### `06_Project_Checkpoints_and_Links/`
Dated checkpoints, delivery notes, the working brief, and the repository URL. Some are
superseded — check dates against v0.2. Includes the OpenRig status note of 21 Oct 16:06 UTC.

---

## Where to start

1. **`SOURCE_BUNDLE_START_HERE.md`** — the bundle author's own orientation and review warnings.
2. **v0.2 specification** — the governing requirements.
3. **v0.2 PWA Implementation Plan** — phases, gates, and the open decisions register.
4. **`../docs/decisions/OPEN_DECISIONS.md`** — the eight open decisions, tracked.

---

## Known gaps (from the bundle's own START_HERE)

- **Full verbatim ChatGPT transcripts** — not available through the source workspace.
- **Repository contents** — the source workspace received a 404 for
  `github.com/adampog/reflecting-minds-app` and could not verify it. This is expected: the
  repository is **private**. Its contents as of import were the initial structure commit only.
- **Original "Minds and Understanding" papers** — not duplicated into this bundle.

---

## Provenance note

Material in this workspace originated in a ChatGPT project workspace and was assembled into
the source bundle on 22 October 2026. Conversation links are in `SOURCE_BUNDLE_START_HERE.md`.
Files are preserved as provided; folder names match the original bundle so that references in
`SOURCE_BUNDLE_START_HERE.md` resolve correctly. Nothing has been edited.
