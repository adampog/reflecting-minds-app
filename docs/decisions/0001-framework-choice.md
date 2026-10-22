# 1. Mobile framework choice

- **Status:** Open — explicitly deferred by the v0.2 PWA Implementation Plan
- **Date raised:** 2026-10-21
- **Revised:** 2026-10-22, after import of the project bundle

## Context

When this ADR was first written, the repository held no project material and the question was
open between React Native, Flutter and native development.

The project bundle imported on 22 October 2026 settles the **delivery model** and reframes the
question. The agreed direction is a **mobile-first, optionally installable Progressive Web
App** — not a native or cross-platform-native application. This is stated in the v0.2
specification and the v0.2 PWA Implementation Plan, and reflected in the accepted mockups and
walkthroughs.

That removes React Native, Flutter and native Swift/Kotlin from consideration. They are
recorded below for provenance only.

## The question as it now stands

Within a PWA, what shell approach? The PWA plan addresses this directly and **declines to
decide**:

> "Keep the deterministic journey and content schemas independent of any chosen UI framework.
> A small standards-based shell or a familiar existing framework are both viable candidates;
> compare maintainability, accessibility, bundle cost, testability and the verified
> repository's conventions before deciding."

And, unambiguously:

> "No framework, storage, telemetry, offline or future capability is approved by this plan."

### Candidates

| Option | For | Against |
|---|---|---|
| Small standards-based shell (vanilla JS/TS + Web Components) | Minimal bundle, no framework churn, full control over accessibility semantics, nothing to migrate | More hand-written plumbing; team conventions must be established |
| Established framework (React/Preact/Svelte/Vue) | Familiar patterns, routing and state libraries, large accessibility-tooling ecosystem | Bundle cost, dependency surface, framework idioms can obscure the deterministic journey model |

### Comparison criteria, per the plan

Maintainability · accessibility · bundle cost · testability · the verified repository's
conventions.

## Constraint that outlives the choice

Whatever is chosen, the **deterministic journey and content schemas must remain independent of
the UI framework**. The architecture is specified as seven logical components with explicit
boundaries (presentation, content loader, journey state, journal repository, export/delete,
service worker/cache, operational adapter). The framework decision should touch only the
presentation layer.

The mockup in `workspace/04_Interactive_Mockups/` is not a candidate architecture. The plan:
"Do not copy the prototype into production by default."

## Decision

_Pending._ Blocked on Phase 0 of the PWA plan: agree scope, name accountable owners, select
the initial scenario subset and device matrix.

Related: `OPEN_DECISIONS.md` items 3 (phone/browser matrix) and 4 (storage technology), which
should be resolved alongside this one.

## Consequences

_To be filled in once decided._

---

## Superseded options — provenance only

Recorded when the delivery model was still open. **No longer under consideration**, since the
agreed direction is a PWA.

- **React Native + Expo** — JS/TS, one codebase for both platforms, fastest path onto a
  physical device. Indirect native module access; performance ceiling below native.
- **Flutter** — Dart, strong performance, consistent cross-platform rendering, excellent
  animation. New language for most teams; larger binaries; UI does not follow platform
  conventions automatically.
- **Native Swift / Kotlin** — best platform integration and performance. Two codebases for two
  platforms, roughly doubling implementation and maintenance cost.
