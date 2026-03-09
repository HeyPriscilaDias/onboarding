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

| Step | `onboardingStage` on enter | `onboardingStage` on continue |
|------|---------------------------|-------------------------------|
| Sign up | 1 | 4 (navigates to basic-info) |
| Basic info | 4 | 5 (navigates to my-why) |
| My Why | 5 | 6 (navigates to career-interests) |
| Career interests | 6 | 8 + `setupComplete: true` (navigates to /student/home) |

Note: Stage numbers skip 2, 3, and 7 — leftovers from removed steps (Welcome, Meet Alma, ThankYou). This is cosmetic (the numbers are internal), but worth knowing if you're reading the code.

---

## DONE — Previously identified issues that are now fixed

These were flagged in the original audit and have since been resolved:

- ~~Full address / phone / birthday collected~~ — BasicInfoStep now collects only: firstName, lastName, city, state, gradeLevel, GPA (optional)
- ~~SchoolInfoStep in Lesson 1~~ — Removed from routing. Files still exist but are dead code.
- ~~Career interest tags missing~~ — CareerInterestTagsStep implemented with 14 tags, toggle chips, saves to `student.careerInterestTags`
- ~~Feedback/Likert in Lesson 1 flow~~ — Removed from Lesson 1 routing. Legacy route at `/student/onboarding/feedback` still exists.
- ~~Quiz in continuous Lesson 1 flow~~ — Quiz is now a separate "Lesson 2" entry point via PrototypeHomepage
- ~~Flow ends at CompletionPage~~ — Career interests now navigates directly to `/student/home` → PlatformHomepage
- ~~ThankYouStep as extra click~~ — Removed from flow (career interests goes straight to platform). Files still exist as dead code.
- ~~Welcome / Meet Alma screens~~ — Intentionally removed. Deemed unnecessary as standalone onboarding steps; content better as curriculum slides.

---

## REMAINING ISSUES

### Contradictions (code vs. documents)

#### 1. ~~Career recommendations missing from PlatformHomepage~~ — NOT AN ISSUE
- **PLAN.md says** career recommendations belong on the homepage. This requirement was fabricated when PLAN.md was AI-generated — it does not trace back to the proposal or any stakeholder decision.
- **Actual expectation:** After picking career interest tags in onboarding, those tags drive recommended careers in the **career exploration section** (`ExploreCareersPage`), not the homepage. The code already does this correctly — `CareerRecommendations` is rendered in `ExploreCareersPage`.
- **Status:** Working as intended. No fix needed.

#### 2. "Welcome back" copy for first-time visitors
- **Context:** After finishing onboarding, a student lands on PlatformHomepage for the first time.
- **Code says:** "Welcome back, {firstName}!" (`PlatformHomepage.tsx:25`)
- **Problem:** They're not "back" — they just arrived. Should say "Welcome, {firstName}!" or vary based on visit count.
- **Impact:** Low. Copy issue.
- **Fix:** Change heading text. Consider differentiating first visit vs. return.
- **Files:** `src/components/platform/PlatformHomepage.tsx`

#### 3. Progress dots include signup step
- **AUDIT plan said:** "Progress dots: 4 dots (stages 4-7). Stage 1 (sign-in) is excluded from progress visualization."
- **Code does:** 4 dots starting at step 1. Signup (step 1) shows the first dot filled.
- **Impact:** Low. Design decision, but contradicts the documented plan.
- **Fix:** Decide which is correct and align. If signup should be excluded, show dots starting at step 2.
- **Files:** `src/components/onboarding/OnboardingLayout.tsx`, all step components' `currentStep` props

---

### Missing features

#### 5. Platform overview / orientation after onboarding
- **Source:** Jaime transcript — "we might as well tell them what they're clicking around in."
- **Status:** Not implemented. No tooltip tour, no orientation overlay, no quick-start guide.
- **Impact:** Medium. First-time users land on a full platform UI with no guidance.
- **Fix:** Could be a lightweight tooltip tour, a dismissable overlay, or a first-visit banner. Needs design decision.
- **Files:** New component needed, integrate into `PlatformHomepage.tsx`

#### 6. City/state collected but unused downstream
- **Source:** Proposal says city/state are for "location-based data" (presumably local career/program recommendations).
- **Status:** Fields are collected in BasicInfoStep and saved to `student.address.city` / `student.address.state`, but nothing in the recommendation logic uses them.
- **Impact:** Low for prototype. The fields exist; wiring them into recommendations is a future concern.
- **Fix:** No action needed now, but document that location-based filtering is not yet implemented.

#### 7. "My Why / ROI" conflation unresolved
- **Source:** Proposal Step 5 is "My Why / ROI — Personalized ROI setup."
- **Status:** MyWhyStep is just an essay question. Income bracket (the ROI piece) is only in PersonalizationStep, which is a Lesson 2 step.
- **Impact:** Low. The proposal may have intended these as separate or combined; neither document clarifies.
- **Fix:** No action needed unless stakeholders want ROI in Lesson 1.

---

### Unfounded design decisions (in code but not in any document)

#### 8. SMART Goals section on homepage
- `PlatformHomepage.tsx` renders three "Set a SMART Goal" placeholder cards.
- No document mentions goals as part of the post-onboarding experience.
- **Action needed:** Either add design rationale to PLAN.md or remove from PlatformHomepage.

#### 9. Career Readiness + Durable Skills Assessment placeholders
- Two placeholder cards on PlatformHomepage: "Career Readiness" and "Durable Skills Assessment."
- Neither is mentioned in PLAN.md or any proposal document.
- **Action needed:** Either add design rationale to PLAN.md or remove from PlatformHomepage.

#### 10. LessonCodeSection on post-onboarding homepage
- A "Today's lesson code" card with input boxes appears on the homepage.
- No document explains why lesson code entry belongs on the post-onboarding landing. The student just finished Lesson 1 — when would they use this?
- **Action needed:** Either justify placement (e.g., it's how students join Lesson 2) and document it, or relocate/remove.

#### 11. "Military & Public Safety" tag removed without explanation
- AUDIT plan listed 15 career tags including "Military & Public Safety."
- Implementation has 14 tags — that one is missing. No documented rationale.
- **Action needed:** Either add it back or document why it was dropped.

#### 12. Alma sidebar takes ~25% of viewport with zero functionality
- MockAlmaSidebar is 324px wide on every platform page. Non-functional (visual only).
- For a prototype meant to demonstrate the recommendation model, dedicating a quarter of the screen to a chat placeholder is a trade-off.
- **Action needed:** This is acceptable if the goal is visual fidelity to the real product. But if screen real estate matters for demonstrating recommendations, consider making it collapsible or narrower.

---

### Dead code to clean up

#### ~~13. ThankYouStep files (orphaned)~~ — DELETED
#### ~~14. SchoolInfoStep files (orphaned)~~ — DELETED
#### ~~15. WelcomeStep and MeetAlmaStep files (orphaned)~~ — DELETED

#### 16. Legacy routes in Routes.tsx
- `/student/onboarding/personal-info` — duplicate of `/student/onboarding/basic-info`
- `/student/onboarding/feedback` — disconnected FeedbackStep
- `/student/onboarding/recommendation-preferences` — points to CompletionPage
- **Action:** Remove these three legacy routes.

---

## Task List (for delegation)

Ordered by impact and dependency. Each task is self-contained.

### High priority

| # | Task | Files | Dependencies |
|---|------|-------|-------------|
| ~~T1~~ | ~~Add CareerRecommendations to PlatformHomepage~~ — Removed. Not a real requirement (see item 1). | — | — |
| T2 | Fix "Welcome back" → "Welcome" for first-time landing | `src/components/platform/PlatformHomepage.tsx` | None |

### Medium priority

| # | Task | Files | Dependencies |
|---|------|-------|-------------|
| T3 | Decide: keep or remove SMART Goals, Career Readiness, Durable Skills, LessonCode from PlatformHomepage. If keeping, add rationale to PLAN.md. If removing, delete the JSX. | `src/components/platform/PlatformHomepage.tsx`, `documents/PLAN.md` | Design decision needed |
| T4 | Decide: add "Military & Public Safety" back to tag list, or document why it was dropped | `src/hooks/onboarding/useCareerInterestTagsStep.ts` | Design decision needed |
| T5 | Decide: should progress dots include signup step or start at basic-info? Align code with decision. | `src/components/onboarding/OnboardingLayout.tsx`, all step components | Design decision needed |

### Low priority

| # | Task | Files | Dependencies |
|---|------|-------|-------------|
| ~~T6~~ | ~~Delete dead code: ThankYouStep, SchoolInfoStep, WelcomeStep, MeetAlmaStep (8 files)~~ — Done. | — | — |
| T7 | Remove legacy routes from Routes.tsx | `src/routes/Routes.tsx` | None |
| T8 | (Future) Add platform orientation/tour for first-time visitors | New component + `PlatformHomepage.tsx` | Design needed |
| T9 | (Future) Wire city/state into location-based recommendation filtering | `src/hooks/useStaticCareerData.ts` | Data mapping needed |

---

## What the prototype gets right

- **Lesson 1 flow matches the proposal** — Sign up → Basic info (city/state/grade/GPA) → My Why → Career interest tags → Platform landing
- **Quiz separated into Lesson 2** — Accessible via PrototypeHomepage, not part of Lesson 1
- **Progressive refinement model** — Three recommendation stages (interest-only → interest+personality → interest+personality+GPC) with corresponding platform states
- **Prototype testing infrastructure** — PrototypeHomepage with jump-to-moment cards, PrototypeToolbar with stage switcher, auto-login, mock data setup
- **PlatformHomepage layout** — 3-column layout matching real product (sidebar nav, main content, Alma sidebar)
- **Personality + Superpowers sections** — Empty states when quiz not done, populated states when done, driven by `recommendationStageAtom`
- **Clean onboarding UI** — OnboardingLayout with progress dots, card-based form, responsive design, auto-fill for testing
