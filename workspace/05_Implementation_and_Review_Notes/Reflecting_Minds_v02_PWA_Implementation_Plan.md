# Reflecting Minds v0.2 — PWA implementation plan

21 October 2026 · Draft for product review · Plan only

The next proposed build is a small mobile-first, optionally installable PWA with no account, no live AI and no functioning groups or invitations. It uses reviewed, pre-authored content and explicit user choices. Unsaved reflection drafts stay in memory; durable local saving, selected-field export and deletion require deliberate user actions. This document proposes an implementation sequence and release gates. It does not authorize implementation, select a production framework, or claim the beta is ready.

The governing requirements are *Reflecting Minds Mobile Software Specification — Revised for Agreed Beta Decisions*, v0.2, 21 October 2026, SHA256 `fba4cd12044956341bafa743a9c20e45da7863c91dffafae80813272557ecfa5`. It supersedes v0.1 as the current proposed specification. The accepted 183.28-second mockup illustrates the intended UX; its localStorage code, placeholder practice and fictional branches are disposable demonstrators, not the production architecture or approved content.

## Product boundary and decisions required

Keep the flexible seven stages: Entry, Notice, Motivation, Compare, Discern, Respond, Review. Users can move back, skip optional work, pause, disagree, decline action or leave. Approximately nine entry doors form a provisional, versioned content taxonomy; they never label people. Support fictional, personal and neutral routes without requiring disclosure. A neutral route must remain usable throughout.

The beta excludes live AI, generated summaries or classifications, voice AI, groups, shared journals, public sharing, user-to-user invitations, research enrollment, ratings, satisfaction surveys and prompts to explain learning. A small invited beta need not be a formal research pilot. Do not claim proven improvements in Global Attentiveness, empathy, agreement, wise action or conflict resolution.

Before implementation, approve requirements and content principles, name accountable owners, choose the initial content subset and supported browsers, and review the choices below. Recommendations in this plan remain proposals. Any later code work needs separate authorization. Existing repositories and earlier prototypes remain unchanged by this plan.

## Logical architecture and data boundaries

| Component | Proposed responsibility | Boundary |
|---|---|---|
| Presentation | Responsive shell, accessible content/media, door deck plus list, explicit Surprise me, stage menu, stable Exit, privacy and reports; user-selected language/presentation and route changes preserve entered answers | Never infer identity or send reflection fields through navigation URLs |
| Content loader | Resolve allowlisted pack/scenario/locale IDs; validate packs before publication and defensively at load; safe unknown/retired fallback | Links describe content, never a person or ideology; ignore/reject unsupported parameters |
| Journey state | Explicit deterministic transitions and in-memory draft reducer/state object | No model-generated text, scoring, sentiment analysis or silent durable draft writes |
| Journal repository | Explicit durable saves and appended outcome/revision records | Device/browser only; no account, sync or server journal |
| Export/delete | Preview selected user-authored fields in text/JSON; scoped confirmed delete | No hidden personal fields, campaign metadata off by default; external copies remain |
| Service worker/cache | Only approved shell/content/media resources, according to chosen offline policy | Never cache journal exports, report bodies, reflection requests or draft state |
| Operational adapter | Minimal approved availability/error signals | Separate from journal API; cannot receive journal objects or form values |

Keep the deterministic journey and content schemas independent of any chosen UI framework. A small standards-based shell or a familiar existing framework are both viable candidates; compare maintainability, accessibility, bundle cost, testability and the verified repository’s conventions before deciding. Do not copy the prototype into production by default or connect this plan to a repository as an implementation step.

Core reflection paths must work without transmitting personal text to servers, analytics or AI. Serving static assets/media may require network access, but requests must contain only necessary content identifiers. Do not put reflections, motivation labels, sources, contact details or personal identifiers in URLs, headers, asset names or error messages. No third-party trackers, embedded players or remotely executed scenario scripts by default. Review any required dependency and hosting default before approval.

## Content, branching and versioning

Propose schema-validated content packs containing: pack ID and version, taxonomy version, scenario ID, locale, title, duration, fictional/illustrative label, authored prompts, supported routes, attention-practice ID/version, explicit choice IDs, transition targets, text alternatives, caption/transcript/media references, authorship/review status and publication/retirement metadata. Use allowlisted IDs and declarative content; do not evaluate supplied code or render unsanitized HTML.

Version content, hypotheses and strategies separately, retaining references rather than hiding research changes inside wording or translations. A research-statement change must receive explicit review, including localized versions. Do not imply that the seven-stage checklist defines or proves Global Attentiveness. Translation/adaptation must preserve safety, agency and fictional labels; missing locale assets get an explained safe fallback, never a silent invented translation.

Each branch follows an explicit selected choice. Validate reachability, valid target references, required exit paths and absence of traps. No branch should equate refusal with bad faith, force reconciliation, demand personal disclosure or present one moral conclusion as correct. Preserve the first motivation if the user compares or rejects the comparison. All examples must be editable invitations; mixed, absent, uncertain and “no difference” are valid.

Content publication must block invalid schema, broken references, missing required alternatives/locale assets, missing fictional labels and unauthorized research changes. Prefer review by a person distinct from the author; assign any exception explicitly. Store review evidence, release manifest and rollback target. Placeholder mockup content and the initial door titles/categories require review before release; nine doors do not mean nine launch-ready scenarios.

## Drafts, saved sessions and outcomes

Propose separate models:

- **Memory draft:** route, content/version/locale references, user-authored field values, optional skipped-stage markers and current stage. Destroy on discard/confirmed Exit; ordinary close or reload may lose it. Do not persist drafts in localStorage, sessionStorage, IndexedDB, service-worker caches, URLs, crash breadcrumbs or telemetry. Avoid promising recovery.
- **Saved session:** schema version, random local record ID, explicit save time, content/taxonomy/practice references and selected journey fields, including the original response plan. Save only after a plainly named **Save on this device** action. Use a transaction so a failed write leaves the draft intact and visibly reports failure.
- **Later observation/revision:** its own local ID and timestamp, reference to saved session and original plan revision, optional “I did not act,” “I changed the plan,” or “I do not know,” observations, expected/unexpected effects and revised plan. Append rather than overwrite the original plan. Editing an existing saved plan creates a separate revision while preserving its prior version.

Local IDs are for record relations, not tracking across installations. Retain only fields needed for the saved reflection; avoid storing campaign/referrer metadata. Render summaries from the user’s exact words and labels without inference or generated paraphrase. Saved-session read, export and delete must include linked outcomes/revisions consistently. No automatic reminders or feedback prompts follow save, completion, abandonment or return.

Storage choice remains open. IndexedDB is a proposed candidate for transactional records/migrations and linked outcomes; localStorage is simpler but synchronous and less suitable for larger records. Choose after browser/size/migration tests. Any wrapper is optional, not an assumed dependency. Define corruption recovery, quota/write-failure handling, schema migration and rollback before selecting a technology. Never silently discard saved data during migration; preserve/export recoverable records or stop with a clear explanation.

Explain before any free text, including alternate navigation into the worksheet, return notes and content reports: memory draft versus explicit save; no reflection transmission; no account or hidden research enrollment; deletion/export scope; browser clearing/eviction; unlocked-device exposure. Browser storage is not a secure vault, permanent backup or confidentiality guarantee. Persistence requests may be explored only after explicit save; denial must remain usable and must not be represented as guaranteed storage.

## Export, deletion and reporting

Offer granular, labelled field selection with readable text and structured JSON previews. Group checkboxes may have an expandable exact field list; both formats must contain only the previewed selected user fields. Include separately labelled selected outcomes/revisions when exporting a reopened record. Omit campaign/link metadata by default; any optional metadata must be visibly selected. Keep schema/content-version context separate from reflection fields. Exclude hidden identifiers that are unnecessary for a useful export. Test downloaded bytes against each format’s preview, including Unicode, empty values and deselection; generated timestamps should be fixed for that preview/download pair.

Confirm **Delete session** with scope: that record and all linked responses/outcomes/revisions in every journal store. Confirm **Delete all** separately: every app journal record/store on this browser/device, including migration or recovery stores if used. Keep a store inventory and verify removal by enumerating each store and reopening/reloading. Shell/media caches are not journal stores and need a separately described cache policy; they must never hold reflections. If deletion fails, say so and preserve an actionable error rather than claiming success. Explain that exported files, screenshots, browser/OS backups and other copies are outside app deletion.

Content reports are user initiated, distinct from feedback surveys. Proposed first version: compose and preview a report containing only the explicitly approved report text, selected issue type and minimal content/version reference. No journal attachment, automatic screenshot, detailed activity trail or contact requirement. A reviewed manual export/send route or an approved report endpoint are alternatives, not a settled decision. No transmission before explicit approval; explain that voluntary report text leaves the device if sent. Review/correct response ownership, abuse limits and retention before enabling any endpoint. A confusing-content or discomfort report must not ask for ratings or learning explanations.

## Offline, media and operational privacy choices

Choose and state one initial offline policy rather than assuming an installable PWA is fully offline:

| Option | Tradeoff and acceptance condition |
|---|---|
| Network-first content, cached shell/text | Small download; unavailable media clearly explained; required text journey still usable under the approved offline scope |
| Explicit pack download | Clear size/data-cost confirmation, progress/cancel, local space check and user cache removal; complete alternatives included |
| Limited media cache | Explicit limits and eviction policy; interrupted playback and stale-version handling tested; no personal cache keys |

A proposed minimum is a reliable text route with optional network media, but this is subject to product approval and the supported device matrix. Decide caption/transcript formats, whether optional downloads exist, cache size/expiry, mobile data policy and media production schedule. Pre-produced hybrid live-action/generated creative direction does not authorize asset generation here. Required review includes captions, text descriptions of key visuals, rights and fictional labels; text alternatives must carry the core content.

Service-worker updates must not mix incompatible pack/schema versions or force reload and lose an active draft. Pin versions during a session; offer a clear update path. Test interrupted downloads, cache eviction, airplane mode, missing media, quota exhaustion and recovery. Keep an old shell/content rollback strategy compatible with saved-record schemas; a rollback must not erase journals or silently downgrade data.

Essential telemetry only is an upper boundary, not a requirement to collect personal activity. Propose no client analytics initially; an operator may later approve aggregate availability/build failure signals after field-level review. Exact events and retention remain open. Never collect reflection text, motive labels, source text, inferred ideology, detailed activity trails or contact details. Scrub URLs, stack/error payloads and breadcrumbs; disable automatic form/session replay. Test with unique fictional canary text across flows, failures and reports. Inspect browser requests AND hosting/CDN/access/error logs: IP addresses, request paths, referrers and retention may still identify visitors. Approve minimization, access and retention or adjust hosting before release. Do not claim “nothing leaves the device” for a hosted app merely because journal text stays local.

## Accessibility, safety and accountable owners

Test all critical choices without audio/video, color-only meaning or swiping. Provide equivalent list/buttons, semantic labels/headings, visible focus, logical keyboard order, focus-managed dialogs with return focus, screen-reader status/error messages, readable contrast and scalable text. Support reduced motion and captions/transcripts; pause/skip/stop/report must remain available. Test input and virtual-keyboard occlusion, scroll position, touch targets and persistent Exit on target phones, with basic tablet and desktop compatibility also checked. AT15 evidence must include the phone/browser matrix and these basic larger-screen checks. No camera, microphone, biometric or sentiment-based attention measurement.

Before release, name people for these functions; none is assigned by this plan:

| Accountable function | Required decision/evidence |
|---|---|
| Product | Requirements, open choices, beta invitation policy, supported devices and launch approval |
| Engineering | Storage/network boundaries, accessibility implementation, tests, migration/update reliability and rollback |
| Content | Authored scenarios/practices, independent review, locale assets, corrections and content retirement |
| Privacy/operations | Hosting/log review, approved telemetry/report handling, retention, incident response and deletion scope |

Publish a content-correction path and a minimal incident runbook: triage owner, disable/retire unsafe content or endpoint, rollback to a reviewed version, assess data exposure, communicate as appropriate and preserve only necessary operational evidence. Do not automatically gather journals to diagnose an incident. These release responsibilities are distinct from the mockup’s authorship.

## Phases and acceptance gates

No phase begins solely because it appears here. Implementation and deployment require separate approval. Each gate needs recorded evidence and a named reviewer; a failing gate blocks invited-beta release.

| Phase | Deliverable | Gate before progressing |
|---|---|---|
| 0 — Agree scope | Requirements/content principles, named owners, scenario subset, device matrix and choices below | Product/privacy/content review; future capabilities remain excluded |
| 1 — Thin shell | Entry ID resolution/fallback, seven flexible stages, memory drafts, neutral/fictional/personal routes, language/presentation changes preserving answers, privacy guard and Exit | AT01, AT02, AT03, AT04, AT06, AT07, AT08, AT09, AT13, AT16, AT17 on supported phone layouts; no accidental persistent draft or network text |
| 2 — Reviewed content | Versioned packs, deterministic branches, reviewed practices and accessible alternatives | AT02,06–08,14–15,17; publication negative tests fail closed |
| 3 — Local records | Explicit save/resume, original plans + later revisions/outcomes, selected export and confirmed deletion | AT10–11 across approved browsers, quota/error/migration/restart/eviction cases; no false-success writes/deletes |
| 4 — Offline and operations | Chosen cache/media policy, install/update behavior, minimal logs/telemetry and report route | AT05, AT12, AT15; network+host-log canaries; offline/update/rollback checks; report approval scope verified |
| 5 — Invited beta gate | Complete AT01–17 report, correction/incident/rollback owners and unresolved-defect disposition | All required tests pass; release explicitly approved; invitations manual unless separately approved; no research-pilot condition |

Requirement-to-evidence checklist for the final implementation:

| Requirements | Acceptance evidence required |
|---|---|
| FR01–02 / AT01–02 | Real phone entry without account/install; valid/unknown/retired and malformed ID/locale paths; deck/list/intentional randomizer; language/presentation and fictional/personal/neutral route changes preserve answers; no identity inference |
| FR03 / AT03–04 | Every free-text path guarded, including direct stage jumps and return/report; back/skip/pause/stop/Exit; storage limits understood in copy |
| FR04–06 / AT03,07,15 | Text/media alternatives and controls; optional motivation/compare preserves first answer; mixed/uncertain/none/no-difference/rejection; no measurement/ranking |
| FR07–09 / AT08–09 | Editable contested distinctions; motive interpretations labelled; optional action/inquiry/pause/exit; original plan distinct from actual outcome/revision; no action sent |
| FR10–11 / AT05–06,17 | No AI endpoints/classes/generated summaries; deterministic choice fixtures; fictional labels; no efficacy claims; no reflection transmission |
| FR12 / AT10 | Zero durable pre-save draft, explicit transactional save, reopen after browser restart, migration/quota/eviction/clearing behavior and honest loss explanation |
| FR13 / AT11 | Exact selected text+JSON download bytes, metadata defaults, single/all delete including linked records and all journal stores, cancellation/failure/limitations |
| FR14 / AT14 | Invalid-schema/reference/locale/alternative/label/research-change fixtures blocked by publishing and safe load handling |
| FR15 / AT13 | Completion, abandonment and repeated return cannot trigger rating/survey/learning prompts |
| FR16 / AT05,12,15–16 | Stable Exit; report preview/explicit sending/no journal attachment; network+hosting/log audit; accessibility target matrix; no group exposure path |
| Cross-cutting / AT17 | Reviewed UI/content/marketing/error copy makes no proven-benefit claim; invitations/group/AI/voice boundaries retained |

After release, the accountable owners review defects and operational incidents. Changes to research claims, AI, sharing, invitations or group functionality require explicit product review before implementation or release; they do not enter beta through routine fixes.

The mockup’s 16 passing local checks and 183.28-second video do not satisfy these production gates. Representative devices, assistive technology, real downloads, browser restart/eviction, all-store deletion, hosting/log inspection and publication rejection tests still need implementation-stage evidence.

## Open decisions register — all v0.2 section 9 items

| Open decision | Proposed next review; no selection implied |
|---|---|
| Initial scenario subset and nine-door production schedule | Product/content select a small reviewed launch subset and versioned roadmap; show honest unavailable choices |
| Whether beta participants may invite others; manual versus product invitations | Product decide recruitment policy. A manually invited cohort is compatible with beta; functioning user invitations/groups remain excluded without new scope |
| Phone/browser matrix; offline/media caching/bandwidth/data costs | Product/engineering test candidate phones plus basic tablet/desktop compatibility and approve one explicit media/offline policy |
| Storage technology, eviction and deletion verification | Engineering/privacy compare prototypes, store inventories and failure/migration tests before adoption |
| Exact essential telemetry events and retention | Privacy/operations review necessity and hosting defaults; zero client analytics remains an option |
| Content-report path and who reviews/responds | Product/content/privacy choose previewed manual or endpoint route, minimization and response owner |
| Whether any external beta learning is appropriate | Product/privacy decide separately; no in-app learning/feedback prompts, no mandatory research pilot or implied enrollment |
| Future voice-first, AI, groups, multilingual shared inquiry and research contribution | Separate scope, consent/privacy and content/research review; no current implementation implied |

The next review should resolve only decisions needed for a separately authorized thin build. No framework, storage, telemetry, offline or future capability is approved by this plan.
