# Open decisions register

Source: *Mobile Software Specification v0.2*, §9, carried forward in the
v0.2 PWA Implementation Plan. Eight items, none selected.

Nothing here is decided. The PWA plan is explicit that "no framework, storage, telemetry,
offline or future capability is approved by this plan," and that the next review should
resolve **only** the decisions needed for a separately authorized thin build.

| # | Open decision | Who decides | Status |
|---|---|---|---|
| 1 | Initial scenario subset and nine-door production schedule | Product + Content | Open |
| 2 | Whether beta participants may invite others; manual vs product invitations | Product | Open |
| 3 | Phone/browser matrix; offline, media caching, bandwidth and data costs | Product + Engineering | Open |
| 4 | Storage technology, eviction and deletion verification | Engineering + Privacy | Open |
| 5 | Exact essential telemetry events and retention | Privacy + Operations | Open |
| 6 | Content-report path and who reviews/responds | Product + Content + Privacy | Open |
| 7 | Whether any external beta learning is appropriate | Product + Privacy | Open |
| 8 | Future voice-first, AI, groups, multilingual shared inquiry, research contribution | Separate scope review | Open |

## Notes per item

**1 — Scenario subset.** Approximately nine entry doors are provisional. Nine doors does not
mean nine launch-ready scenarios. Unavailable choices must be shown honestly rather than
hidden.

**2 — Invitations.** A manually invited cohort is compatible with beta. Functioning
user-to-user invitations and groups remain excluded without new scope.

**3 — Device matrix and offline policy.** One explicit offline policy must be chosen and
stated; an installable PWA is not automatically offline-capable. Three candidate policies are
tabled in the PWA plan (network-first with cached shell; explicit pack download; limited media
cache). The plan's proposed minimum is a reliable text route with optional network media —
subject to approval.

**4 — Storage.** IndexedDB is a candidate for transactional records, migrations and linked
outcomes; localStorage is simpler but synchronous and less suitable for larger records. Choose
only after browser, size and migration tests. Corruption recovery, quota and write-failure
handling, schema migration and rollback must be defined **before** selecting a technology.

**5 — Telemetry.** "Essential telemetry only" is an upper boundary, not a collection
requirement. Zero client analytics remains a live option. Reflection text, motive labels,
source text, inferred ideology, activity trails and contact details must never be collected.
Hosting/CDN/access/error logs need review too — IP addresses, paths and referrers may still
identify visitors.

**6 — Content reports.** User-initiated and distinct from feedback surveys. A reviewed manual
export/send route and an approved endpoint are both candidates; neither is settled. No
transmission before explicit user approval.

**7 — External beta learning.** To be decided separately. No in-app learning or feedback
prompts, no mandatory research pilot, no implied enrollment.

**8 — Future capabilities.** Separate scope with its own consent, privacy and content/research
review. Changes to research claims, AI, sharing, invitations or group functionality require
explicit product review — they do not enter beta through routine fixes.

---

## Accountable owners — unassigned

The PWA plan requires named people for four functions before release. **None is assigned.**

| Function | Must decide / evidence |
|---|---|
| Product | Requirements, open choices, beta invitation policy, supported devices, launch approval |
| Engineering | Storage/network boundaries, accessibility implementation, tests, migration and rollback |
| Content | Authored scenarios and practices, independent review, locale assets, corrections, retirement |
| Privacy / Operations | Hosting and log review, approved telemetry and report handling, retention, incident response, deletion scope |

## Phase gates

| Phase | Deliverable | Gate |
|---|---|---|
| 0 | Agree scope — requirements, owners, scenario subset, device matrix | Product/privacy/content review |
| 1 | Thin shell — entry resolution, seven stages, memory drafts, routes, Exit | AT01–04, 06–09, 13, 16, 17 on supported phones |
| 2 | Reviewed content — versioned packs, deterministic branches, alternatives | AT02, 06–08, 14–15, 17; publication negative tests fail closed |
| 3 | Local records — save/resume, revisions, export, confirmed deletion | AT10–11 across approved browsers; no false-success writes or deletes |
| 4 | Offline and operations — cache/media policy, install/update, minimal logs | AT05, 12, 15; network and host-log canaries; rollback checks |
| 5 | Invited beta gate — full AT01–17 report, incident and rollback owners | All required tests pass; release explicitly approved |

No phase begins solely because it appears here. Implementation and deployment require separate
approval. A failing gate blocks invited-beta release.

The mockup's 16 passing local checks and its 183.28-second video **do not** satisfy these
production gates.
