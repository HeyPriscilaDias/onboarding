interface FeedbackEntry {
  questionText: string;
  score: number;
  submittedOn: string;
  questionId: number;
}

type FeedbackScores = {
  clarity: number | null;
  preparedness: number | null;
};

export const getFeedbackScores = (feedback: FeedbackEntry[]): FeedbackScores => {
  const clarity = feedback.find((q) => q.questionId === 5)?.score || null;
  const preparedness = feedback.find((q) => q.questionId === 6)?.score || null;
  return { clarity, preparedness };
};

export const createFeedbackEntry = (currentStep: number, score: number): FeedbackEntry => ({
  questionText:
    currentStep === 5
      ? "How clear are you on what you want your career and life after high school to be like?"
      : "How prepared do you feel for life after high school?",
  score,
  submittedOn: new Date().toISOString(),
  questionId: currentStep,
});

export const getUpdatedFeedback = (
  existingFeedback: FeedbackEntry[] | undefined,
  newEntry: FeedbackEntry,
  currentStep: number,
): FeedbackEntry[] => {
  return currentStep === 5 ? [newEntry] : [...(existingFeedback || []), newEntry];
};
