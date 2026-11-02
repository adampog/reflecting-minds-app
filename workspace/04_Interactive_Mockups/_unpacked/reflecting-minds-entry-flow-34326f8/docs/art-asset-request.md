# Reflecting Minds entry-flow mockup: art asset request (r1.2)

For the Art Department, filed in `yt-art-library/rma/`. Status: demonstrator only. These assets set no approved visual direction and authorise no production asset work.

## What we need first
Please propose **2–3 visual directions** for Alan to choose from before you make the full set. For each direction, send:
- one finished sample plate: *Seeing things differently: The riverbank*
- one row of 6 icons
- palette tokens for the bright entry and for the quiet stage

We will build the app only after Alan has chosen a direction.

## Hard constraints (from the governing v0.2 spec and Alan's brief)
- **No faces and no bodies**, including silhouettes, hands and shadows of people (FR02, no identity inference).
- **No outcome imagery.** No resolved handshake, no clear sky after a storm, no before-and-after (AT17).
- **No streaks, counters, progress bars, badges or reward motifs** (FR15).
- **No visual hierarchy across the nine plates.** Match value range, saturation, detail density and focal strength so that no plate draws the eye more than the others. The deck is shuffled, and the art must not undo that.
- **No real settings** you could recognise, and no contemporary political or religious markers.
- **Each plate works as a still frame.** Any motion is an optional extra layer, and the plate must make sense with no motion at all.
- **Alt text carries the core content.** A plate that needs its caption to make sense fails. Please supply alt text for every plate.
- **Original work only:** vector or locally made, with no paid services. Any font must be locally bundled and OFL-licensed (or we use system fonts).
- **Bright at the door, quiet in the room.** Colour, warmth and motion belong in the entry assets only. The stage assets are restrained but finished.

## Asset list

| # | Asset | Where it is used | Size / format |
|---|---|---|---|
| P1–P9 | Nine door plates, one per door (titles below) | Reel card (full width), list row thumbnail, door page header | SVG, viewBox 600×400 (3:2), safe area for a crop to 1:1. Motion parts, if any, go in a named `<g id="motion">`. Each plate also needs 1200×800 and 300×200 PNG fallbacks and an alt text. |
| P10 | Optional comparison plate: *Seeing things differently* in a **contemporary, culturally unmarked** setting | Comparison screen with P2 (are the displaced historical settings right for someone in live difficulty?) | Same as P1–P9 |
| A1 | Arrival art: an open, warm threshold with no people | Arrival / first screen | SVG, 390×300 |
| D1 | Privacy diagram, **illustrative of the proposed beta boundary only**: answers on this device, no server, analytics or AI path drawn. It must carry a persistent mock caption, and must have no shield, lock, tick or other assurance motif. It must not imply verified security, confidentiality or permanence. | Privacy explanation screen (quiet style) | SVG, 340×160, with all text in HTML so it can be translated |
| I1 | Icon set, 24px grid, stroke-based, uses `currentColor`. Entry: `list`, `reel`, `surprise`, `fictional`, `personal`, `neutral`, `back`, `close`, `info`. Stages: `notice`, `motivation`, `compare`, `discern`, `respond`, `review` (navigation only; no tick or completed state). Utility: `save`, `export`, `delete`, `report`, `device`, `pause`, `play`. | Throughout | SVG sprite plus individual SVGs |
| T1 | Tokens: entry palette (warm, bright) and room palette (quiet), type scale, spacing, radii | CSS variables | JSON or CSS file |

## The nine doors
Door titles follow the provisional v0.2 §2 taxonomy. Scenario titles are unreviewed drafts. Content is placeholder, so plates should not illustrate plot detail.

| Door id | Door | Scenario | Notes |
|---|---|---|---|
| personal-tension | Unresolved personal tension | The hives | Needs a safety read before publication. Keep it gentle and unresolved. |
| seeing-differently | Seeing things differently | The riverbank | Suggested first build (and the sample plate) |
| uncertainty | Uncertainty | The last barrel | |
| divided-group | Divided group | The bridge or the ford | Not a situation (a context, per v0.3). One person reflecting about a group, with no crowd figures. Use places or objects only. |
| another-perspective | Another person's perspective | The copied letter | Motives are interpretation (AT08). Do not show a culprit. |
| seen-or-heard | Something seen or heard | Twice told | |
| values-tension | Values in tension | Two births | Needs a safety read. It must not resolve. |
| self-understanding | Self-understanding | The longer way | Not a situation. Quieter, but equal visual weight. |
| just-curious | Just curious | The same bowl | Not a situation. Equal visual weight. Nothing that funnels onward. |

v0.3 (context only) says three of the nine doors are not situations. Self-understanding and Just curious are dispositions. Divided group is a context, and overlaps capability deferred from beta. Whether they stay a mixed set or are reworked is an open taxonomy decision. Please keep all nine plates at equal visual weight. The app presents the difference in text and path length, not in plate weight. Equal weight does not mean identical journeys.

## Delivery
- Put items in `yt-art-library/rma/<group>/<name>/v0.1.0` with a manifest sha256, following your library rules.
- Send the accepted paths and hashes to app-claude@reflecting-minds-app (copy app-codex@reflecting-minds-app).
- The mockup will reference the assets by path and sha256, and will not edit them.
