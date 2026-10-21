# 1. Mobile framework choice

- **Status:** Open — not yet decided
- **Date:** 2026-10-21

## Context

Reflecting Minds App is a mobile application. The framework has not been
selected. Two questions need answering before this decision can be made:

1. Which languages is the team already productive in?
2. Is the target iOS, Android, or both?

## Options considered

### React Native + Expo

- **Language:** JavaScript / TypeScript
- **Pros:** One codebase for iOS and Android. Fastest path to running on a
  physical device (Expo Go, no Xcode required). Large ecosystem. Can eject to
  bare React Native if the managed workflow becomes limiting.
- **Cons:** Native module access is indirect. Performance ceiling below native
  for animation- or compute-heavy work. Expo's managed workflow imposes some
  constraints on native dependencies.

### Flutter

- **Language:** Dart
- **Pros:** Strong performance. Consistent rendering across platforms since it
  draws its own widgets. Excellent animation support. Single codebase.
- **Cons:** Dart is a new language for most teams. Larger binary size. UI does
  not automatically follow platform conventions.

### Native (Swift / Kotlin)

- **Language:** Swift (iOS), Kotlin (Android)
- **Pros:** Best performance, platform integration, and access to new OS
  features on day one. Most idiomatic UX per platform.
- **Cons:** Two codebases if both platforms are targeted — roughly double the
  implementation and maintenance cost.

## Decision

_Pending._

## Consequences

_To be filled in once decided._
