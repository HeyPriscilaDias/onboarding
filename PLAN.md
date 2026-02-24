# Post-Onboarding Platform Homepage — Implementation Plan

## Goal
Replace the current `CompletionPage` (shown at `/student/home`) with a real platform homepage that varies by recommendation stage. The homepage should feel like the actual Willow product — not a placeholder — with progressive data completion driving what surfaces are populated vs. in empty-state.

---

## Architecture Decision: Self-Contained Mock vs. Porting Real Components

**Approach: Build self-contained mock components in the onboarding prototype.**

The existing product components (`CareerCard`, `StudentPageLayout`, `CareerRecsWidget`, `PersonalityTypeHeader`, `SuperPowersSection`, etc.) have deep dependency chains — Recoil atoms for career data, TanStack Query hooks hitting real APIs, `PageContextProvider` for Alma, `useCareerVideo`, complex teacher/mentor recommendation logic, etc. Porting them would mean recreating the entire data layer.

Instead, we'll build lightweight mock versions that:
- Use the same visual patterns and Willow UI-Kit components
- Pull from static JSON data (the same `jobs.json`, `jobTags.json`, `pressingChallenges.json` files the real product uses)
- Read the `recommendationStageAtom` from the prototype toolbar to switch between states
- Look and feel real to stakeholders without the infrastructure overhead

---

## What Needs to Be Built

### 1. Static Data Layer
**Copy these files from the real product into the onboarding prototype's `public/` folder:**
- `public/assets/data/jobs.json` (43k lines — career data, ~900 careers)
- `public/assets/data/jobTags.json` (tag metadata)
- `public/assets/data/pressingChallenges.json` (GPC metadata)
- `public/assets/data/personalitiesforai.json` (personality type descriptions — needed for personality results section)
- `public/assets/data/personalityTitleConverter.json` (maps personality keys → display titles like "The Advocate")
- `public/assets/images/personality-types/` folder (personality type illustrations — 31 JPG files)

**Create a new data loader hook:** `src/hooks/useStaticCareerData.ts`
- Fetches `jobs.json`, `jobTags.json`, `pressingChallenges.json` on mount
- Returns career data filtered/sorted for recommendations
- Accepts the recommendation stage to determine filtering logic:
  - **Interest only:** Filter careers by tags matching student's interest selections (or mock a reasonable set like Healthcare + Technology)
  - **Interest + Personality:** Narrow further using personality type's `recommendedCareers` field
  - **Interest + Personality + GPC:** Further refined by pressing challenge scores

**Create a personality data hook:** `src/hooks/useStaticPersonalityData.ts`
- Fetches `personalitiesforai.json` on mount
- Returns personality type data for a given type key (e.g., "SOCIAL_AGREEABLENESS")
- Parses superpowers, work style, etc. using the same `parseTraits` logic the real product uses

### 2. Platform Homepage Component
**New file:** `src/components/platform/PlatformHomepage.tsx`

This replaces `CompletionPage` when the user is in a post-onboarding prototype state. It's the main orchestrator.

**Layout structure (mirrors real product):**
```
┌─────────────────────────────────────────────────────┐
│ [Sidebar Nav]  │  [Main Content]      │ [Alma]      │
│                │                      │ (sidebar)   │
│  Home          │  Welcome back, Name! │             │
│  Lessons       │                      │             │
│  Portfolio     │  [Career Recs]       │             │
│  Explore       │  ────────────────    │             │
│  Careers       │  [Personality Type]  │             │
│  Settings      │  ────────────────    │             │
│                │  [Superpowers]       │             │
│                │  ────────────────    │             │
│                │  [Lesson Code]       │             │
│                │  [Goals/Milestones]  │             │
└─────────────────────────────────────────────────────┘
```

### 3. Section Components (all new, in `src/components/platform/`)

#### a. `PlatformLayout.tsx` — Page shell
- Left sidebar nav (simplified version of `StudentSideDesktopNavbar` — just visual, links don't need to work except Home/Careers/Portfolio)
- Main content area
- Right sidebar for Alma placeholder (simple chat-like UI — doesn't need to be functional, just visually present)
- Willow logo in sidebar header
- Reads `prototypeActiveAtom` for toolbar offset

#### b. `CareerRecommendations.tsx` — Career cards section
- Reads `recommendationStageAtom` to determine:
  - **interest-only**: Shows ~6 careers filtered by interest tags. Header: "Because you're interested in Healthcare and Technology"
  - **interest-personality**: Shows ~6 refined careers. Header: "Based on your interests and personality type"
  - **interest-personality-gpc**: Shows ~6 most refined careers. Header: "Personalized for you — based on your interests, personality, and values"
- Uses `useStaticCareerData` hook
- Each career rendered as a simplified `MockCareerCard` — title, description, median salary, education level, tags (matches the visual pattern of the real `CareerCard` but without video/reactions/teacher recs)
- Horizontal scroll layout matching `CareerCardHorizontalList` pattern
- "View all" link (non-functional, just present)

#### c. `PersonalitySection.tsx` — Personality type results
- Reads `recommendationStageAtom`:
  - **interest-only**: Empty state — dark card (Slate[600] background matching product's `PersonalityQuizCard`) with "Discover your personality type" heading, description about what they'll learn, and "Take Quiz" CTA button
  - **interest-personality / interest-personality-gpc**: Populated — shows personality type header (image, title, description) matching `PersonalityTypeHeader` visual pattern
- Uses `useStaticPersonalityData` for populated state
- Student's personality type key stored in mock student data (we'll use `SOCIAL_AGREEABLENESS` → "Compassionate Advocate" as the default)

#### d. `SuperpowersSection.tsx` — Superpowers grid
- Reads `recommendationStageAtom`:
  - **interest-only**: Empty state — similar card to personality but with "Unlock your superpowers" messaging and quiz CTA
  - **interest-personality / interest-personality-gpc**: Populated — 2-column grid of superpower cards (name + description) matching `SuperPowersSection` pattern
- Uses parsed superpowers from `useStaticPersonalityData`

#### e. `GpcPrompt.tsx` — GPC encouragement prompt
- Only visible in `interest-personality` stage
- Subtle banner: "As you learn about global challenges, your recommendations will get even more personalized"
- Hidden in other stages (not needed in interest-only, and in full-gpc everything is populated)

#### f. `MockCareerCard.tsx` — Individual career card
- Simplified version of the real `CareerCard`
- Shows: colored top area (Slate[700] with career icon), title, description (3 lines max), median salary (color-coded), education level, tags
- Fixed height to match real card proportions (~500px)
- Click does nothing (or could open a placeholder detail view)

#### g. `LessonCodeSection.tsx` — Lesson code entry
- Visual copy of the lesson code section from `HomeContainer`
- Non-functional (no backend) — just the visual card with the background image, three code inputs, and "Join lesson" button
- Shows correctly styled in the grid layout

#### h. `MockSidebar.tsx` — Simplified nav sidebar
- Matches `StudentSideDesktopNavbar` visually
- Willow logo at top
- Nav items: Home, Lessons, Portfolio, Careers, Settings (with icons from @willow/icons)
- Home is highlighted as active
- Non-functional links (just visual)

#### i. `MockAlmaSidebar.tsx` — Alma chat placeholder
- 324px wide sidebar on the right (matching real product width)
- Header with "Alma" name and icon
- A few fake chat bubbles showing a welcome message
- Text input at bottom with send button
- Non-functional — purely visual

### 4. Routing Changes
**Update `Routes.tsx`:**
- The `/student/home` route should render `PlatformHomepage` instead of `CompletionPage` when in a post-onboarding prototype state
- Keep `CompletionPage` as the default for non-prototype flow (when students finish onboarding normally)
- The decision can be based on `prototypeActiveAtom` + whether `journeyMomentAtom` starts with "post-onboarding"

### 5. Update Prototype Toolbar Integration
- The recommendation stage switcher in `PrototypeToolbar` already updates `recommendationStageAtom` and student data
- When switching rec stages, the `PlatformHomepage` re-reads the atom and updates all sections accordingly
- No additional toolbar changes needed

### 6. Mock Student Data Updates
Update the `setupStudentForMoment` functions (in both `PrototypeHomepage.tsx` and `PrototypeToolbar.tsx`) to include:
- `personalityType: "SOCIAL_AGREEABLENESS"` (for post-lesson-2 and post-gpc states) — this is the database key format
- Interest tags stored somewhere accessible (could be a new field or hardcoded in the recommendation logic)

---

## File Summary

### New files to create:
1. `public/assets/data/jobs.json` (copy from product)
2. `public/assets/data/jobTags.json` (copy from product)
3. `public/assets/data/pressingChallenges.json` (copy from product)
4. `public/assets/data/personalitiesforai.json` (copy from product)
5. `public/assets/data/personalityTitleConverter.json` (copy from product)
6. `public/assets/images/personality-types/` (symlink or copy from product)
7. `src/hooks/useStaticCareerData.ts`
8. `src/hooks/useStaticPersonalityData.ts`
9. `src/components/platform/PlatformHomepage.tsx`
10. `src/components/platform/PlatformLayout.tsx`
11. `src/components/platform/CareerRecommendations.tsx`
12. `src/components/platform/PersonalitySection.tsx`
13. `src/components/platform/SuperpowersSection.tsx`
14. `src/components/platform/GpcPrompt.tsx`
15. `src/components/platform/MockCareerCard.tsx`
16. `src/components/platform/LessonCodeSection.tsx`
17. `src/components/platform/MockSidebar.tsx`
18. `src/components/platform/MockAlmaSidebar.tsx`

### Files to modify:
1. `src/routes/Routes.tsx` — conditional routing for `/student/home`
2. `src/components/prototype/PrototypeHomepage.tsx` — update personality type keys in student setup
3. `src/components/prototype/PrototypeToolbar.tsx` — update personality type keys in student setup

---

## Key Design Principles
- **Never feels broken:** At every recommendation stage, the homepage has real content. Empty states are invitations with clear CTAs, not dead ends.
- **Progressive refinement is visible:** Switching between rec stages in the toolbar should feel like watching the same page fill in with more personalized content.
- **Matches the real product:** Uses Willow UI-Kit components, Slate/neutral color palette, same typography patterns, same card dimensions where possible.
- **Self-contained:** No API calls to a backend. All data is static JSON + localStorage mock student data.
