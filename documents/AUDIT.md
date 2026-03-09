# Prototype Audit: Documents vs. Implementation

Last updated: 2026-03-09

## Source Documents

1. `1-1-with-Jaime-on-onboarding-transcript` — Jaime x Pris meeting (Jan 14)
2. `onboarding-redesign-proposal` — Formal proposal for Ryan (Feb 2025)
3. `summary-of-onboarding-redesign-discussions-with-Ryan` — Ryan discussion summary
4. `PLAN.md` — Post-onboarding platform homepage implementation plan

---

## Current Lesson 1 Flow (implemented)

```
Step 1: Sign up (/signup)                               — EmailAndPasswordStep (currentStep=1)
Step 2: Basic info (/student/onboarding/basic-info)      — PersonalInfoStep (currentStep=2)
Step 3: My Why (/student/onboarding/my-why)              — MyWhyStep (currentStep=3)
Step 4: Career interests (/student/onboarding/career-interests) — CareerInterestTagsStep (currentStep=4)
  → navigates to /student/home (PlatformHomepage)
```

Progress dots: 4 segments, shown on steps 1–4. Navigation: Back goes to previous step, Continue goes to next.

### Stage numbers used in code

| Step | `currentStep` (UI dots) | `onboardingStage` on back | `onboardingStage` on continue |
|------|------------------------|---------------------------|-------------------------------|
| Sign up | 1 | — | 4 (navigates to basic-info) |
| Basic info | 2 | 1 | 5 (navigates to my-why) |
| My Why | 3 | 4 | 6 (navigates to career-interests) |
| Career interests | 4 | 5 | 8 + `setupComplete: true` (navigates to /student/home) |

Note: `currentStep` (1–4) drives the progress dots and is sequential. `onboardingStage` still skips 2, 3, and 7 — leftovers from removed steps. This is cosmetic (the stage numbers are internal persistence values), but worth knowing if you're reading the code.

---

## DONE — Previously identified issues that are now fixed

These were flagged in the original audit and have since been resolved:

- ~~Full address / phone / birthday collected~~ — BasicInfoStep now collects only: firstName, lastName, state (filterable autocomplete, full names), gradeLevel, GPA (optional). City was removed — see design note on item 6.
- ~~SchoolInfoStep in Lesson 1~~ — Removed from routing. Dead code files deleted (T6).
- ~~Career interest tags missing~~ — CareerInterestTagsStep implemented with 15 tags (including "Military & Public Safety"), toggle chips, saves to `student.careerInterestTags`
- ~~Feedback/Likert in Lesson 1 flow~~ — Removed from Lesson 1 routing. Legacy route also removed (see item 16).
- ~~Quiz in continuous Lesson 1 flow~~ — Quiz is now a separate "Lesson 2" entry point via PrototypeHomepage
- ~~Flow ends at CompletionPage~~ — CompletionPage deleted. `StudentHomeRouter` now always renders `PlatformHomepage` (no conditional on prototype/journey state).
- ~~ThankYouStep as extra click~~ — Removed from flow (career interests goes straight to platform). Dead code files deleted (T6).
- ~~Welcome / Meet Alma screens~~ — Intentionally removed. Deemed unnecessary as standalone onboarding steps; content better as curriculum slides.

---

## RESOLVED ISSUES

Items that were flagged during the audit and have since been addressed.

#### 1. ~~Career recommendations missing from PlatformHomepage~~ — NOT AN ISSUE
- PLAN.md requirement was fabricated (AI-generated). Career recommendations correctly live in `ExploreCareersPage`, not the homepage.

#### ~~2. "Welcome back" copy for first-time visitors~~ — FIXED
- Heading now says "Welcome, {firstName}!" (commit `f6f395c`).

#### ~~3. Progress dots include signup step~~ — FIXED
- Stepper renumbered to 4 sequential steps (1–4) starting at signup. Fixed-width segments. (commits `b72afe2`, `a9f9b3f`).

#### ~~6. City/state collected but unused downstream~~ — RESOLVED
- City removed; only state collected via filterable autocomplete with full names. State is saved to `student.address.state` but not wired into recommendation logic — out of scope for the prototype (see T9).

#### ~~8. SMART Goals section on homepage~~ — KEEPING
- Three "Set a SMART Goal" placeholder cards kept intentionally as part of the post-onboarding experience.

#### ~~9. Career Readiness + Durable Skills Assessment placeholders~~ — RESOLVED
- Career Readiness removed. Durable Skills consolidated into a single card alongside personality quiz (commit `f6f395c`).

#### ~~10. LessonCodeSection on post-onboarding homepage~~ — RESOLVED
- Reworked into horizontal single-row layout. Serves as entry point for joining subsequent lessons (commit `f6f395c`).

#### ~~11. "Military & Public Safety" tag~~ — FIXED
- Added back. Tag list now has 15 entries.

#### ~~13–15. Dead code (ThankYouStep, SchoolInfoStep, WelcomeStep, MeetAlmaStep)~~ — DELETED

#### ~~16. Legacy routes in Routes.tsx~~ — DONE
- Removed 3 legacy routes, updated all references to `/basic-info`, cleaned up DevToolbar.

---

## REMAINING ISSUES

Only items that are still open or deferred.

#### 5. Platform overview / orientation after onboarding
- **Source:** Jaime transcript — "we might as well tell them what they're clicking around in."
- **Status:** Not implemented. No tooltip tour, no orientation overlay, no quick-start guide.
- **Impact:** Medium. First-time users land on a full platform UI with no guidance.
- **Fix:** Could be a lightweight tooltip tour, a dismissable overlay, or a first-visit banner. Needs design decision.
- **Files:** New component needed, integrate into `PlatformHomepage.tsx`

#### 7. "My Why / ROI" conflation unresolved
- **Source:** Proposal Step 5 is "My Why / ROI — Personalized ROI setup."
- **Status:** MyWhyStep is just an essay question. Income bracket (the ROI piece) is only in PersonalizationStep, which is a Lesson 2 step.
- **Impact:** Low. The proposal may have intended these as separate or combined; neither document clarifies.
- **Fix:** No action needed unless stakeholders want ROI in Lesson 1.

---

## Task List (for delegation)

Ordered by impact and dependency. Each task is self-contained.

### High priority

| # | Task | Files | Dependencies |
|---|------|-------|-------------|
| ~~T1~~ | ~~Add CareerRecommendations to PlatformHomepage~~ — Removed. Not a real requirement (see item 1). | — | — |
| ~~T2~~ | ~~Fix "Welcome back" → "Welcome" for first-time landing~~ — Done (commit `f6f395c`). | — | — |

### Medium priority

| # | Task | Files | Dependencies |
|---|------|-------|-------------|
| ~~T3~~ | ~~Homepage cards resolved~~ — Career Readiness/Durable Skills/LessonCode reworked (commit `f6f395c`). SMART Goals kept intentionally. | — | — |
| ~~T4~~ | ~~Add "Military & Public Safety" back to tag list~~ — Done. 15 tags now. | — | — |
| ~~T5~~ | ~~Progress dots renumbered to 4 sequential steps including signup~~ — Done (commits `b72afe2`, `a9f9b3f`). | — | — |

### Low priority

| # | Task | Files | Dependencies |
|---|------|-------|-------------|
| ~~T6~~ | ~~Delete dead code: ThankYouStep, SchoolInfoStep, WelcomeStep, MeetAlmaStep (8 files)~~ — Done. | — | — |
| ~~T7~~ | ~~Remove legacy routes from Routes.tsx~~ — Done. Removed 3 legacy routes, updated all references to use `/basic-info`, cleaned up DevToolbar steps. | — | — |
| T8 | (Future) Add platform orientation/tour for first-time visitors | New component + `PlatformHomepage.tsx` | Design needed |
| ~~T9~~ | ~~Wire state into location-based recommendation filtering~~ — Out of scope for this prototype. State is collected and persisted, which is sufficient to demonstrate the data capture. Actual filtering logic belongs in the production app, not the prototype. | — | — |

---

## What the prototype gets right

- **Lesson 1 flow matches the proposal** — Sign up → Basic info (state/grade/GPA) → My Why → Career interest tags → Platform landing
- **Quiz separated into Lesson 2** — Accessible via PrototypeHomepage, not part of Lesson 1
- **Progressive refinement model** — Three recommendation stages (interest-only → interest+personality → interest+personality+GPC) with corresponding platform states
- **Prototype testing infrastructure** — PrototypeHomepage with jump-to-moment cards, PrototypeToolbar with stage switcher, auto-login, mock data setup
- **PlatformHomepage layout** — 3-column layout matching real product (sidebar nav, main content, Alma sidebar)
- **Personality + Superpowers sections** — Empty states when quiz not done, populated states when done, driven by `recommendationStageAtom`
- **Clean onboarding UI** — OnboardingLayout with progress dots, card-based form, responsive design, auto-fill for testing
