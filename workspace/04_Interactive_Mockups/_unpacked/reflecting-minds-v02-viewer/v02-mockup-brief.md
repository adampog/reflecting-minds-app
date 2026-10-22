# Reflecting Minds v0.2 mockup: brief and changes

21 October 2026. A low-fidelity phone mockup of the *Reflecting Minds Mobile Software Specification* v0.2 (21 October 2026). It is a silent, captioned walkthrough video plus a tap-through page with the same screens. All content is fictional placeholder text. The mockup has no AI, makes no network requests and has no backend. It is a picture of proposed requirements for review, not a beta build and not evidence that any feature exists.

## How to review it
- Video: `Reflecting_Minds_v02_Mockup_Walkthrough_2026-10-21.mp4` (silent, under 300 seconds), provided separately in the project Sources; it is not inside the ZIP.
- Tap-through: download and extract `Reflecting_Minds_v02_Tap_Through_Project_Review_2026-10-21.zip`, then open `reflecting-minds-v02-viewer/app/index.html` in a browser at phone width (about 390 px). Useful links, relative to the extracted `reflecting-minds-v02-viewer` folder:
  - `app/index.html?door=divided-group` opens one door from an entry link.
  - `app/index.html?door=old-route-pack` opens a retired door, which shows the safe fallback.
  - `app/index.html#saved` opens the saved sessions.
- "Save on this device" uses this browser's local storage, on your own machine only. Use "Delete all" to clear it.

## What the mockup shows (v0.2 sections)
- **Entry (§2, FR01, FR02).**
  - There are nine provisional doors, named with the spec's category titles.
  - You can swipe the card deck, use Previous and Next buttons, or browse the full list.
  - "Surprise me" picks a door at random, but only when you tap it. You can then choose yourself instead.
  - A neutral introduction is offered.
  - The taxonomy and content version is shown.
  - The language and presentation choice is visible. Only English and the text and visual-card styles exist in this mockup, and the other options say so.
  - An unknown or retired link opens a safe fallback.
- **Flow A (§3).**
  - Each door shows its type, language and duration.
  - You choose how involved to be: the fictional example, your own situation, or a neutral alternative.
  - A plain privacy and storage explanation appears before any text box, including on the worksheet, the later-notes screen and the report screen.
  - Fictional scenes branch only through pre-written choices that you pick.
  - The Notice practice has a text alternative, an optional timer, skip, and a way to report discomfort.
  - The other stages are Motivation, optional Compare (your first answer is kept and nothing is ranked), Discern (observation, claim, source, inference, values, unknowns) and Respond (action, inquiry, pause or leave; the app acts for no one).
  - Review shows your own words exactly as typed. From there you can save on the device, export selected fields as text or JSON (the preview matches the file, and entry-link details are off by default) or discard.
  - No feedback prompt follows.
- **Flexible stages (§2).** The stage bar opens any of the seven stages in any order. Back, Skip and Exit are always available.
- **Flow B (§3, FR07).**
  - The worksheet is optional. It holds accounts, claims, sources, a question type that you choose, unknowns, affected or absent perspectives, delay costs and possible responses.
  - Other people's motives are labelled as your interpretation.
- **Flow C (§3, FR09, FR12, FR13).**
  - You can reopen a saved session.
  - The original plan stays unchanged, apart from later notes ("I changed the plan", "I did not act" and "I do not know" are valid).
  - You can delete one session or all of them, after confirming.
  - Exports and screenshots are outside in-app delete.
- **Report content (FR16, §6).** You start the report yourself and preview exactly what it would contain. Your answers are never attached, and nothing is sent.

## What changed from the earlier mockups
- The simulated AI suggestions are gone. There is no AI anywhere (FR10).
- The "was this useful?" prompt is gone. There are no feedback, rating or learning prompts (FR15).
- Three entry packs became nine provisional doors, with list and swipe browsing and a deliberate "Surprise me".
- A route choice was added: fictional, personal or neutral. Fictional scenes use pre-written branching.
- Privacy is shown before any free text on every path. Copy now says that reflections are not sent to servers, analytics or AI.
- Discern now separates claims, sources and values. The review shows every field you typed.
- The export has a format-specific preview, and entry-link details are off by default.
- Deleting a single session now asks for confirmation.
- There are no groups, invitations or sharing screens, and nothing implies they work (AT16).

## Demonstrated here versus not tested
The mockup demonstrates the user-facing flow and wording at phone width in a headless browser. The production checks the spec requires were **not** performed, including:
- network inspection of a real build (AT05)
- storage durability after restart or eviction (AT10)
- deletion across every local store (AT11)
- hosting, CDN or telemetry log review (AT12)
- publishing validation (AT14)
- real phones, screen readers and large-text testing (AT15)

The audio and video practice options are labelled "not in mock". The door cards are text placeholders, not media.

## Temporary mockup assumptions (not decisions)
- The door card lines, fictional scenes and branch wording are invented and unreviewed.
- The practice text is a placeholder awaiting review.
- The door order is fixed (not shuffled) so that the walkthrough is repeatable.
- localStorage stands in for whatever local storage a real build would choose.

## Still open (v0.2 §9)
- the initial door subset
- whether invitations stay manual
- the phone and browser matrix, offline behaviour and media caching
- the storage technology and how deletion is verified
- telemetry events and retention
- who reviews content reports
- whether any learning outside the app is appropriate
- future voice, AI, group and shared-inquiry scope
