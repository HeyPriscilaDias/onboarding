# Prototype Audit: Documents vs. Implementation

Date: 2026-03-09

## Source Documents

1. `1-1-with-Jaime-on-onboarding-transcript` — Jaime x Pris meeting (Jan 14)
2. `onboarding-redesign-proposal` — Formal proposal for Ryan (Feb 2025)
3. `summary-of-onboarding-redesign-discussions-with-Ryan` — Ryan discussion summary
4. `PLAN.md` — Post-onboarding platform homepage implementation plan

---

## MISSING from the prototype

### 1. ~~Welcome / "What is Willow?" screen~~ — REMOVED
- **Source:** Proposal Step 2, Jaime transcript
- **Expected:** Purpose-setting screen — "What is Willow? Why are you here?" Brief, visual.
- **Status:** Removed from the onboarding flow. This informational-only step doesn't seem necessary as a standalone screen — it adds a click without collecting data or meaningfully advancing the user. The content ("What is Willow? Why are you here?") could be better delivered as a slide in the curriculum or folded into the Meet Alma step.

### 2. ~~Meet Alma screen~~ — REMOVED
- **Source:** Proposal Step 3, Ryan summary
- **Expected:** Introduce the AI assistant, set expectations for what Alma can help with.
- **Status:** Removed from the onboarding flow. Like the Welcome step, this informational-only screen doesn't seem necessary as a standalone onboarding step. It adds a click without collecting data. The Alma introduction could be better delivered as a curriculum slide.

### 3. Career interest tags
- **Source:** Proposal Step 6, Jaime transcript, Ryan summary
- **Expected:** Multi-select clickable tags (science, engineering, healthcare, writing, technology, etc.). No typing required. Can be changed later in settings. These power initial career recommendations.
- **Status:** Not implemented. This is a central feature of the redesign — the mechanism that gives students immediate value (recommendations) after Lesson 1.

### 4. Platform overview / orientation
- **Source:** Jaime transcript
- **Expected:** After onboarding, a quick tour/orientation of key platform areas (careers, portfolio, Alma, lessons, etc.). Jaime: "we might as well tell them what they're clicking around in."
- **Status:** Not implemented. Prototype ends at a completion page.

### 5. GPA field
- **Source:** Proposal (Basic info step)
- **Expected:** GPA collected as part of basic info alongside city/state and grade.
- **Status:** Not collected anywhere in the prototype.

### 6. City/State fields
- **Source:** Proposal
- **Expected:** City/state only (not full address) for location-based data.
- **Status:** Prototype collects a full `address` field instead.

---

## WRONG / Contradicts the documents

### 1. Full address collected (FERPA violation concern)
- **Documents say:** "No full address (FERPA)" — only city/state
- **Prototype does:** Collects full `address` text field in PersonalInfoStep
- **File:** `src/components/onboarding/PersonalInfoStep.tsx`, `src/hooks/onboarding/usePersonalInfoStep.ts`

### 2. Phone number collected
- **Documents say:** Not mentioned anywhere as a required field
- **Prototype does:** Collects phone number with (XXX) XXX-XXXX formatting and validation
- **File:** `src/components/onboarding/PersonalInfoStep.tsx`, `src/hooks/onboarding/usePersonalInfoStep.ts`

### 3. Birthday collected
- **Documents say:** Not mentioned in any document as needed data
- **Prototype does:** Collects birthday with age validation (must be 10-20 years old)
- **File:** `src/components/onboarding/PersonalInfoStep.tsx`, `src/hooks/onboarding/usePersonalInfoStep.ts`

### 4. School selection dropdown
- **Documents say:** Schools are set up by admins (Clever/Google integration); proposal says collect city/state and grade
- **Prototype does:** Has a school picker dropdown with 8 mock schools
- **File:** `src/components/onboarding/SchoolInfoStep.tsx`, `src/hooks/onboarding/useSchoolInfoStep.ts`

### 5. Personality quiz still in the onboarding flow
- **Documents say:** The entire redesign is about separating the quiz into Lesson 2. Jaime: "those should be two separate things." Proposal defines Lesson 1 (setup) and Lesson 2 (quiz) as distinct curriculum-integrated lessons.
- **Prototype does:** Quiz placeholder is Step 8, still in the same continuous flow after Thank You screen. The flow is: signup → personal info → school → my why → feedback → thank you → quiz → personalization → completion.
- **File:** `src/components/onboarding/QuizPlaceholder.tsx`, routing in `src/routes/Routes.tsx`

### 6. Feedback/Likert questions still in onboarding
- **Documents say:** GPC and feedback questions should be removed from onboarding entirely. GPC ratings move to after the 9-lesson GPC curriculum unit. Jaime: the post-quiz questions "cause more consternation with people than any other thing."
- **Prototype does:** Two 1-10 scale feedback questions (career clarity, life preparedness) are Steps 5-6 in the onboarding flow.
- **File:** `src/components/onboarding/FeedbackStep.tsx`, `src/hooks/onboarding/useFeedbackStep.ts`
- **Note:** The proposal's feedback questions ("How clear are you..." / "How prepared do you feel...") are arguably different from the GPC Likert scales. However, the proposal does NOT include these in Lesson 1's step list. They may belong in a pre/post measurement context rather than onboarding.

### 7. Income bracket as an onboarding step
- **Documents say:** Proposal mentions "My Why / ROI" as Step 5 — "Personalized ROI setup. Why postsecondary exploration matters to them." Ryan summary mentions "personalized ROI" as part of setup.
- **Prototype does:** Has a full income bracket selection screen with 3 cards (lower/middle/higher), "prefer not to answer" checkbox, and a confirmation modal. This is a separate step after the quiz.
- **File:** `src/components/onboarding/PersonalizationStep.tsx`, `src/components/onboarding/IncomeConfirmationModal.tsx`
- **Note:** The income bracket concept may be what "personalized ROI" refers to, but the implementation is more heavyweight than what the proposal describes and is placed after the quiz rather than as part of Lesson 1 setup.

### 8. Flow doesn't end at the platform
- **Documents say:** "Student lands on the platform. Career recommendations visible based on interest tags. Platform overview: quick orientation of key areas."
- **Prototype does:** Flow goes through Thank You → Quiz → Personalization → Completion page (a summary/restart screen). Student never lands on a real platform view with recommendations.
- **File:** `src/components/CompletionPage.tsx`

---

## FLOW ORDER mismatch

### Proposal (Lesson 1) — as adjusted:
1. Sign in
2. ~~Welcome (What is Willow?)~~ — removed (unnecessary standalone step; content may become a curriculum slide)
3. ~~Meet Alma~~ — removed (same rationale as Welcome; content may become a curriculum slide)
4. Basic info (city/state, grade, GPA)
5. My Why / ROI
6. Career interest tags
7. Done → land on platform with recommendations

### Prototype (current):
1. Sign up (email/password — disabled)
2. Personal info (first name, last name, birthday, address, phone)
3. School info (school dropdown, grade level, school ID)
4. My Why (essay question)
5. Feedback Q1: career clarity (1-10 scale)
6. Feedback Q2: preparedness (1-10 scale)
7. Thank You
8. Quiz placeholder (skipped)
9. Personalization (income bracket)
10. Completion page

---

## What the prototype got RIGHT

- **My Why step exists** — Content is close to what's proposed, though placement in the flow differs
- **Grade level collection** — Collected in SchoolInfoStep
- **Mock/prototype mode** — Auto-fill for testing, prototype homepage with journey moments
- **OnboardingLayout** — Clean layout with progress dots, back/continue navigation, responsive design
- **PLAN.md platform concept** — Progressive refinement model (interest-only → interest+personality → interest+personality+GPC) aligns well with the proposal's recommendation strategy
- **Separation concern acknowledged** — The prototype has a "pending" student path where school is pre-set by admin, showing awareness of the admin-setup flow

---

## Structural Summary

The prototype appears to be based on the **old onboarding flow** (or a slight iteration of it) rather than the **proposed redesign**. The core redesign ideas are largely not implemented:

- Separating quiz from setup into distinct lessons
- Adding career interest tags as the primary first-session value driver
- Removing FERPA-sensitive fields (full address)
- Adding Welcome and Meet Alma screens
- Landing on a real platform with recommendations after Lesson 1
- Removing feedback/Likert questions from the onboarding flow

---

## Implementation Plan

### Target Flow (Lesson 1)

```
Stage 1: Sign in (/signup)                          — existing, minor tweaks
Stage 2: (removed — Welcome step deemed unnecessary, content may become a curriculum slide)
Stage 3: (removed — Meet Alma step deemed unnecessary, content may become a curriculum slide)
Stage 4: Basic info (/student/onboarding/basic-info) — REWRITE of PersonalInfoStep
Stage 5: My Why (/student/onboarding/my-why)         — existing, minor tweaks
Stage 6: Career interests (/student/onboarding/career-interests) — NEW
Stage 7: Done → land on platform (/student/home)     — ThankYouStep removed (unnecessary extra click; career-interests now completes onboarding and navigates directly to /student/home)
```

Progress dots: 4 (stages 4-7, sign-in excluded from dots, welcome and meet-alma removed)

### Target Flow (Lesson 2 — separate session)

```
Quiz context-setting → Personality quiz → Results → Exploration
```

Lesson 2 is out of scope for this plan. The prototype should cleanly end Lesson 1 at the platform. QuizPlaceholder, PersonalizationStep, and IncomeConfirmationModal stay in the codebase but are disconnected from the Lesson 1 flow. They become entry points from the PrototypeHomepage's "Lesson 2" journey moment.

---

### Phase 1: Remove contradictions (fix what's wrong)

**Goal:** Strip fields and steps that contradict the proposal. After this phase the flow is shorter but not yet complete.

#### 1a. Rewrite PersonalInfoStep → BasicInfoStep

**What changes:**
- Remove: `birthday`, `address` (full), `phoneNumber`
- Keep: `firstName`, `lastName`
- Add: `city` (text), `state` (dropdown, US states), `gradeLevel` (move from SchoolInfoStep), `gpa` (text input, optional)
- Rename component to `BasicInfoStep` for clarity
- Heading changes from "A little bit about you" to something like "Let's get to know you"

**Files to modify:**
- `src/components/onboarding/PersonalInfoStep.tsx` → rename to `BasicInfoStep.tsx`
  - Remove birthday date field, address text field, phone field
  - Add city text input, state dropdown (US states list), GPA text input
  - Move gradeLevel dropdown here from SchoolInfoStep
  - Update heading text
- `src/hooks/onboarding/usePersonalInfoStep.ts` → rename to `useBasicInfoStep.ts`
  - Remove `birthday`, `address`, `phoneNumber` state and validation
  - Remove `validateBirthday()`, phone formatting logic
  - Add `city`, `usState`, `gpa` state fields
  - Update mock auto-fill defaults
  - Change navigation: continue goes to `/student/onboarding/my-why` (Stage 5)
  - Change back: goes to Meet Alma step (Stage 3)
- `src/utils/formatUtils.ts` — `formatPhoneNumber` can stay (unused is fine) or be removed

**Files to delete (or leave unused):**
- `src/components/onboarding/SchoolInfoStep.tsx` — school selection removed from Lesson 1
- `src/hooks/onboarding/useSchoolInfoStep.ts` — same
- `src/utils/schoolUtils.ts` — school/grade helpers (grade level utils may still be needed)

**Type changes (`src/types/index.ts`):**
- Add to Student type: `city: string`, `usState: string`, `gpa: string`
- `address` field can remain in the type (existing data compat) but won't be collected in Lesson 1
- Add: `careerInterestTags: string[]` (needed for Phase 2)

**Mock data (`src/mock/mockData.ts`):**
- Update `createEmptyStudent()` defaults: add `city: ""`, `usState: ""`, `gpa: ""`, `careerInterestTags: []`
- Update mock auto-fill in hook: city → "Springfield", usState → "IL", gpa → "3.5"

#### 1b. Remove FeedbackStep from Lesson 1 flow

**What changes:**
- Remove feedback steps (stages 5-6) from the onboarding navigation chain
- FeedbackStep component stays in the codebase (may be used elsewhere later)
- MyWhyStep now continues directly to Career Interest Tags (Phase 2) or to ThankYou (interim)

**Files to modify:**
- `src/hooks/onboarding/useMyWhyStep.ts`
  - Change continue navigation: skip feedback, go to career interests route (Phase 2) or thank-you (interim)
  - Update `onboardingStage` increment accordingly

**Files to leave in place (not deleted, just disconnected):**
- `src/components/onboarding/FeedbackStep.tsx`
- `src/hooks/onboarding/useFeedbackStep.ts`
- `src/utils/onboardingUtils.ts` (feedback entry utils)

#### 1c. Disconnect quiz + personalization from Lesson 1

**What changes:**
- ThankYouStep removed entirely — it was an unnecessary extra click between career interests and the platform. Career interests step now completes onboarding (sets `onboardingStage: 8`, `setupComplete: true`) and navigates directly to `/student/home`.
- Lesson 1 ends at the platform landing
- `ThankYouStep.tsx` and `useThankYouStep.ts` are now dead code (can be deleted)
- Quiz/personalization routes remain accessible via PrototypeHomepage Lesson 2

#### 1d. Restage the flow

**What changes:**
After removing SchoolInfo (old stage 3) and Feedback (old stages 5-6), renumber:

| New Stage | Step | Old Stage |
|-----------|------|-----------|
| 1 | Sign in | 1 |
| 2 | Basic info (was PersonalInfo) | 2 |
| 3 | My Why | 4 |
| 4 | Done / Thank You → platform | 7 |

This is an interim numbering. Phase 2 adds Welcome, Meet Alma, and Career Interests, which will expand to the full 7-stage target.

**Files to modify:**
- All hooks that reference `onboardingStage` numbers
- `OnboardingLayout.tsx` — update progress dot count from 6 to match interim step count
- `PrototypeHomepage.tsx` — update `setupStudentForMoment` stage numbers

---

### Phase 2: Add missing screens (build what's new)

**Goal:** Add the three new screens that the proposal requires. After this phase the Lesson 1 flow matches the proposal.

#### 2a. ~~Welcome step — "What is Willow?"~~ — REMOVED

This step has been removed from the onboarding flow. It was an informational-only screen with no form fields — just static text explaining what Willow is. It doesn't seem necessary as a standalone onboarding step and adds friction without collecting data. The "What is Willow?" content could be better delivered as a curriculum slide or folded into the Meet Alma introduction. The WelcomeStep component and useWelcomeStep hook files remain in the codebase but are disconnected from routing and navigation.

#### 2b. ~~Meet Alma step~~ — REMOVED

Same rationale as Welcome. This was an informational-only screen introducing the AI assistant. It doesn't need to be a standalone onboarding step — the Alma introduction could be delivered as a curriculum slide. The MeetAlmaStep component and useMeetAlmaStep hook files remain in the codebase but are disconnected from routing and navigation.

#### 2c. Career Interest Tags step

**New files:**
- `src/components/onboarding/CareerInterestTagsStep.tsx`
- `src/hooks/onboarding/useCareerInterestTagsStep.ts`

**Content (from proposal):**
- Heading: "What kind of careers interest you?" or similar
- Subtext: "Pick as many as you like — you can always change these later"
- Grid of clickable tag chips/buttons (multi-select, toggle on/off)
- No typing required

**Tag list (broad career categories):**
- Science, Technology, Engineering, Healthcare, Education, Business, Arts & Design, Writing & Communication, Law & Government, Social Services, Trades & Construction, Agriculture & Environment, Media & Entertainment, Sports & Fitness, Military & Public Safety
- (Final list TBD — should align with whatever tag taxonomy maps to career recommendations)

**Implementation:**
- Uses `OnboardingLayout` with `currentStep={6}`
- Hook manages `selectedTags: string[]` state
- Tags rendered as a flex-wrap grid of toggle buttons/chips
- Selected state: filled/highlighted; unselected: outlined
- Continue: saves `careerInterestTags` to student record, sets `onboardingStage: 7`, navigates to done/platform
- Back: sets `onboardingStage: 5`, navigates to `/student/onboarding/my-why`
- Mock auto-fill: pre-select ["Healthcare", "Technology"] if empty

**Data:**
- Saved to `student.careerInterestTags: string[]`
- Used by post-onboarding platform to power initial career recommendations (per PLAN.md)

**Route:** `/student/onboarding/career-interests`

#### 2d. Update stage numbering to final target

| Stage | Step | Route |
|-------|------|-------|
| 1 | Sign in | `/signup` |
| 4 | Basic info | `/student/onboarding/basic-info` |
| 5 | My Why | `/student/onboarding/my-why` |
| 6 | Career interests | `/student/onboarding/career-interests` |
| 7 | Done → platform | `/student/home` |

**Progress dots:** 4 dots (stages 4-7). Stage 1 (sign-in) is excluded from progress visualization. Stages 2 (Welcome) and 3 (Meet Alma) were removed.

**Files to modify:**
- `src/components/onboarding/OnboardingLayout.tsx` — progress dots array becomes `[2, 3, 4, 5, 6, 7]` or renumbered `[1, 2, 3, 4, 5, 6]` for display
- `src/routes/Routes.tsx` — add routes for `/welcome`, `/meet-alma`, `/basic-info`, `/career-interests`
- `src/hooks/onboarding/useEmailAndPasswordStep.ts` — continue navigates to `/student/onboarding/welcome` (stage 2)
- All hook files — update stage numbers and navigation targets
- `src/components/prototype/PrototypeHomepage.tsx` — update journey moment setup with new stages

---

### Phase 3: Update flow endpoints (land on platform)

**Goal:** After Lesson 1, student lands on the platform with career recommendations visible. Replace or bypass the CompletionPage.

#### 3a. Replace ThankYouStep with a transitional "You're all set" moment

**Option A — Keep as a brief screen:**
- Heading: "You're all set!"
- Brief message: "Based on your interests, we've started building career recommendations for you."
- Button: "Explore Willow"
- Navigate to `/student/home`

**Option B — Skip entirely:**
- Career Interest Tags step's Continue goes directly to `/student/home`
- No transitional screen
- Simpler, but less ceremonial

**Recommendation:** Option A — the brief "you're all set" moment gives closure to the onboarding and sets up the platform landing.

#### 3b. Platform landing (depends on PLAN.md implementation)

The PLAN.md describes a full `PlatformHomepage` with career recommendations, personality empty states, sidebar nav, and Alma placeholder. That work is tracked separately.

**Interim approach:** The existing `CompletionPage` at `/student/home` can be updated to:
- Show a simplified view with career interest tags the student selected
- Show a "Take the Personality Quiz" prompt as an empty state card (not a blocking step)
- Remove the "Restart Onboarding" flow that resets everything

**Full approach (PLAN.md):** Build the `PlatformHomepage` with all sections described in PLAN.md. This is the larger effort and can be phased separately.

---

### Phase 4: Prototype infrastructure updates

**Goal:** Keep the prototype testing tools (PrototypeHomepage, PrototypeToolbar) working with the new flow.

#### 4a. Update PrototypeHomepage journey moments

**Lesson 1: Setup + Introduction**
- Route: `/signup` (unchanged)
- No student setup needed (fresh flow)

**Lesson 2: Personality Quiz**
- Route: `/student/onboarding/quiz-placeholder` (keep existing)
- Setup student with: completed Lesson 1 data (name, city, state, grade, gpa, myWhy, careerInterestTags)
- `onboardingStage: 7` (Lesson 1 complete), `onboardingState: "complete"`
- `quizComplete: false`

**Post-onboarding states** (interest-only, interest-personality, interest-personality-gpc):
- Keep as-is but ensure `careerInterestTags` are populated in setup data

#### 4b. Update mock auto-fill data

All hooks with mock auto-fill need updated defaults:
- `useBasicInfoStep`: firstName="Jane", lastName="Doe", city="Springfield", usState="IL", gradeLevel="9th Grade", gpa="3.5"
- `useCareerInterestTagsStep`: ["Healthcare", "Technology"]

---

### Phase 5: Cleanup

**Goal:** Remove dead code and unused references.

#### Files to delete:
- `src/components/onboarding/SchoolInfoStep.tsx` (school selection no longer in Lesson 1)
- `src/hooks/onboarding/useSchoolInfoStep.ts`

#### Files to rename:
- `PersonalInfoStep.tsx` → `BasicInfoStep.tsx`
- `usePersonalInfoStep.ts` → `useBasicInfoStep.ts`

#### Files to keep but disconnect from Lesson 1:
- `FeedbackStep.tsx` / `useFeedbackStep.ts` — may be reused for pre/post measurement
- `QuizPlaceholder.tsx` — used by Lesson 2 journey moment
- `PersonalizationStep.tsx` / `IncomeConfirmationModal.tsx` — used by Lesson 2 or later flow
- `src/utils/formatUtils.ts` — phone formatting no longer needed in Lesson 1 but harmless

#### Type cleanup (`src/types/index.ts`):
- Ensure `careerInterestTags`, `city`, `usState`, `gpa` are added
- Keep legacy fields (`address`, `phone`, `birthday`) in the type for backward compat with existing mock data

---

### Summary: Files changed per phase

| Phase | New Files | Modified Files | Deleted Files |
|-------|-----------|----------------|---------------|
| 1a | 0 | 3 (PersonalInfoStep→BasicInfoStep, hook, types) | 2 (SchoolInfoStep, hook) |
| 1b | 0 | 1 (useMyWhyStep navigation) | 0 |
| 1c | 0 | 2 (ThankYouStep, hook) | 0 |
| 1d | 0 | 4 (all hooks, OnboardingLayout, PrototypeHomepage) | 0 |
| 2a | 2 | 1 (Routes.tsx) | 0 |
| 2b | 2 | 1 (Routes.tsx — same edit) | 0 |
| 2c | 2 | 2 (Routes.tsx, types) | 0 |
| 2d | 0 | 5 (OnboardingLayout, Routes, all hooks, PrototypeHomepage) | 0 |
| 3 | 0 | 2 (ThankYouStep or removal, CompletionPage) | 0 |
| 4 | 0 | 2 (PrototypeHomepage, mockData) | 0 |
| 5 | 0 | 0 | 2 (SchoolInfoStep, hook — if not already) |

**Total: ~6 new files, ~12-15 modified files, ~2 deleted files**

---

### Execution order recommendation

Phases 1 and 2 are tightly coupled — removing old steps and adding new ones affects the same stage numbering and routing. The most practical approach:

1. **Do Phase 1a + 1b + 1c together** — gut the wrong stuff, get a shorter but working flow
2. **Do Phase 2a + 2b + 2c + 2d together** — add all new screens and restage at once
3. **Do Phase 1d as part of 2d** — restaging only happens once, at the end
4. **Phase 3** — update endpoints after the flow is stable
5. **Phase 4 + 5** — cleanup after everything works

This avoids restaging twice and keeps the prototype functional at each checkpoint.
