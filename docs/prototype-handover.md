# Onboarding Prototype — Implementation Handover

This document captures what Ryan and the engineering team need to know before building each prototyped feature into the real app. Each section covers what the prototype demonstrates, what it fakes, and what needs to happen for production.

---

## Quiz Resume State

### What it demonstrates

When a student leaves the personality quiz midway, the getting started checklist shows **"Resume"** instead of "Start" and navigates them directly back to where they left off (skipping the quiz start screen).

### How it works in the prototype

- Each time the student hits "Next" on a quiz question, we write two things to the student record:
  - `onboardingState: "quiz-in-progress"`
  - `lastQuestionId`: the ID of the next question they'll see
- The checklist reads `onboardingState` to decide the button label and navigation target.
- On mount, the quiz hook reads `lastQuestionId` to restore the student's position.
- Both fields already existed in the `Student` type — they just weren't being used.

### What the prototype fakes

**Previous answers are not restored.** The student lands on the correct question, but their earlier selections are gone. In the prototype, answers live in a React ref that gets wiped on page close. A real implementation would need to persist answers to the backend.

### Implementation considerations

1. **Persist answers server-side.** Save in-progress answers to the database — either on each "Next" or in a batch. On resume, read them back to pre-fill selections and calculate the starting index.

2. **Answer restoration UX.** Two options: restore silently (student lands on the next unanswered question, previous answers intact) or show a confirmation prompt ("Pick up where you left off?"). Silent restore is probably right.

3. **Quiz content changes between sessions.** If questions are reordered, added, or removed, `lastQuestionId` could point somewhere invalid. Fall back gracefully — restart the quiz or find the closest valid position.

4. **Clear in-progress state on completion.** The prototype already does this (`quizComplete: true` overrides the in-progress state). Make sure the real implementation also clears `lastQuestionId` and any saved answers so they don't leak into a future retake.

5. **Retake flow.** `isRetakingQuiz` already exists on the Student type. The same resume logic should apply, but a retake should clear previous in-progress answers first.

### Files changed

- `src/hooks/onboarding/usePersonalityQuizTake.ts` — Saves `onboardingState` + `lastQuestionId` on each Next; restores question index on mount
- `src/components/platform/OnboardingChecklist.tsx` — Reads `onboardingState` to show "Resume" label and navigate to `/take` directly
