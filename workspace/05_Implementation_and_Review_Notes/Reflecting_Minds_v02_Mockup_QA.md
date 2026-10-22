# Reflecting Minds v0.2 mockup: independent QA summary

21 October 2026. A reviewer who did not build the mockup checked it independently. It **passes as a low-fidelity mockup and walkthrough only**. That is not approval of a beta release, and it does not show that any production feature exists.

## What was checked
- **Source.** The reviewer read the full v0.2 specification and checked its exact file identity.
- **Storyboard.** It was reviewed before the video was recorded, and the video was recorded once.
- **Tap-through.** 16 automated checks were run in a phone-sized browser (390 × 844), covering:
  - entry and fallback links
  - the privacy step before typing, including when a stage is opened directly
  - Exit and the mock label staying visible while scrolling
  - the review showing every typed field
  - text and JSON exports with matching fields
  - the original plan kept separate from later notes
  - cancelling a delete, and Delete all
  - the content report leaving out the user's answers
  - no network requests
- **Problems found and fixed.** The first review found three problems, all fixed before recording:
  - Exit and the mock label scrolled out of view.
  - The review screen left out some typed fields.
  - The text export preview did not match the JSON.
- **Video.** 183.28 seconds, silent, captioned, 390 × 844. 17 frames sampled across the whole video were viewed. Captions, the mock label and Exit stay visible, and flows A, B and C, the personal and neutral routes and the fallback all appear.

## Coverage of v0.2 requirements
| Requirement | Shown in the mockup | Not tested |
|---|---|---|
| FR01 / AT01 Entry | Door link, safe fallback for unknown or retired links, no login or installation | A published host |
| FR02 / AT02 Choice | Nine provisional, versioned doors; swipe, buttons and list; random pick only on request; three involvement routes; unavailable languages and media labelled | — |
| FR03 / AT04 Privacy | Storage, save, export and delete explained before any free text | — |
| FR04 Practice | Text practice with optional timer, skip and discomfort report; audio and video marked "not in mock" | Real media |
| FR05–06 / AT07 Motivation, compare | Own words; mixed, uncertain and none are valid; first answer kept; "no difference" and "doesn't fit" are valid; nothing ranked | — |
| FR07 / AT08 Discern | Observation, claim, source, inference, values, unknown; optional worksheet; others' motives labelled as the user's interpretation | — |
| FR08 / AT09 Respond | Action, inquiry, pause or leave are all optional; the app acts for no one | — |
| FR09 Review outcomes | Original plan unchanged beside later notes | — |
| FR10 / AT06 No AI | No AI anywhere; branches are pre-written | — |
| FR11 Scenarios | Fictional, invented, unreviewed content, clearly labelled | Real content review |
| FR12 / AT10 Save | Nothing saved before Save; saved session survives a page reload | Browser restart, storage eviction |
| FR13 / AT11 Export, delete | Selected-field text and JSON with matching fields; confirmed delete of one or all; exports outside delete | Downloaded files; every production store |
| FR14 / AT14 Content versioning | Versions shown | Publishing checks that block bad content |
| FR15 / AT13 No feedback prompts | None in the app or walkthrough | — |
| FR16 / AT12 Control and telemetry | Exit always visible; privacy page; report preview without answers; no telemetry in the mockup | Hosting, CDN and error logs |
| AT03 Stage control | Back, skip, Exit, any-stage bar | Every route permutation |
| AT05 No transmission | No network requests in the mockup | Network inspection of a real build |
| AT15 Accessibility | Phone-width layout, text alternatives | Real phones, screen readers, large text, modal focus trapping |
| AT16 No groups | No group, invitation or sharing screens | — |
| AT17 No overclaim | No benefit claims found; practice text labelled draft | — |

## Limits
This is a static local mockup. It has no backend, installable PWA, offline support, real media, content publishing, hosting or log inspection. It has had no real-device, accessibility, security or storage-eviction testing, and no testing of whether the practice works. Real downloaded files and every route combination were not tested.
