import { useState, useEffect, useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCurrentStudent } from "../useCurrentStudent";
import { studentService } from "../../mock/mockServices";
import { useOnboardingLogging } from "../../mock/mockLogging";
import { createFeedbackEntry, getFeedbackScores, getUpdatedFeedback } from "../../utils/onboardingUtils";

const useFeedbackStep = () => {
  const [clarity, setClarity] = useState<number | null>(null);
  const [preparedness, setPreparedness] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: loggedInStudent, refetch } = useCurrentStudent();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logFeedbackSubmitted, logFeedbackError } = useOnboardingLogging();

  const studentId = useMemo(() => loggedInStudent?.id, [loggedInStudent?.id]);
  const personalFeedback = useMemo(() => loggedInStudent?.personalFeedback, [loggedInStudent?.personalFeedback]);
  const onboardingStage = useMemo(() => loggedInStudent?.onboardingStage || 5, [loggedInStudent?.onboardingStage]);
  const currentStep = onboardingStage;

  useEffect(() => {
    if (personalFeedback) {
      const { clarity: savedClarity, preparedness: savedPreparedness } = getFeedbackScores(personalFeedback);
      if (savedClarity !== null) setClarity(savedClarity);
      if (savedPreparedness !== null) setPreparedness(savedPreparedness);
    }
  }, [personalFeedback]);

  const processFeedbackSubmission = useCallback(
    async (step: number, answer: number) => {
      try {
        const feedbackEntry = createFeedbackEntry(step, answer);
        const updatedFeedback = getUpdatedFeedback(personalFeedback, feedbackEntry, step);

        if (!studentId) return;

        const nextStage = step + 1;
        // In test mode, step 6 goes to thank-you instead of quiz
        const nextOnboardingState = step === 5 ? "feedback" : "quiz-start";

        await studentService.updateStudentGoldenPath(studentId, {
          personalFeedback: updatedFeedback,
          onboardingStage: nextStage,
          onboardingState: nextOnboardingState,
        });

        await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
        await refetch();
        logFeedbackSubmitted({ studentId, questionId: step });

        if (step === 6) {
          navigate("/student/onboarding/thank-you", { replace: true });
        }
      } catch (_error) {
        logFeedbackError({ error: _error, questionId: step });
      }
    },
    [studentId, personalFeedback, logFeedbackSubmitted, logFeedbackError, queryClient, refetch, navigate],
  );

  const submitFeedback = useCallback(async () => {
    const currentAnswer = currentStep === 5 ? clarity : preparedness;
    if (currentAnswer === null) {
      setError(true);
      return false;
    }
    await processFeedbackSubmission(currentStep, currentAnswer);
    return true;
  }, [currentStep, clarity, preparedness, processFeedbackSubmission]);

  const handleContinue = useCallback(async () => {
    try {
      setIsLoading(true);
      await submitFeedback();
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [submitFeedback]);

  const handleBack = useCallback(async () => {
    try {
      if (!studentId) return;
      const previousStage = currentStep === 6 ? 5 : 4;
      const previousOnboardingState = currentStep === 6 ? "feedback" : "my-why";

      await studentService.updateStudentGoldenPath(studentId, {
        onboardingStage: previousStage,
        onboardingState: previousOnboardingState,
      });

      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();

      if (currentStep === 5) {
        navigate("/student/onboarding/my-why", { replace: true });
      }
    } catch (_error) {
      console.error("Error updating onboarding stage:", _error);
    }
  }, [currentStep, studentId, queryClient, refetch, navigate]);

  return {
    clarity,
    setClarity,
    preparedness,
    setPreparedness,
    error,
    setError,
    handleContinue,
    handleBack,
    currentStep,
    isLoading,
  };
};

export default useFeedbackStep;
