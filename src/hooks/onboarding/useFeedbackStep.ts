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
  const onboardingStage = useMemo(() => loggedInStudent?.onboardingStage || 6, [loggedInStudent?.onboardingStage]);

  const isFirstQuestion = onboardingStage === 6;

  useEffect(() => {
    if (personalFeedback) {
      const { clarity: savedClarity, preparedness: savedPreparedness } = getFeedbackScores(personalFeedback);
      if (savedClarity !== null) setClarity(savedClarity);
      if (savedPreparedness !== null) setPreparedness(savedPreparedness);
    }
  }, [personalFeedback]);

  const processFeedbackSubmission = useCallback(
    async (stage: number, answer: number) => {
      try {
        const feedbackEntry = createFeedbackEntry(stage, answer);
        const updatedFeedback = getUpdatedFeedback(personalFeedback, feedbackEntry, stage);

        if (!studentId) return;

        if (stage === 6) {
          // First question done → advance to second question
          await studentService.updateStudentGoldenPath(studentId, {
            personalFeedback: updatedFeedback,
            onboardingStage: 7,
            onboardingState: "feedback",
          });
        } else {
          // Second question done → advance to personalization
          await studentService.updateStudentGoldenPath(studentId, {
            personalFeedback: updatedFeedback,
            onboardingStage: 8,
            onboardingState: "personalization",
          });
        }

        await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
        await refetch();
        logFeedbackSubmitted({ studentId, questionId: stage });

        if (stage === 7) {
          navigate("/student/onboarding/personalization", { replace: true });
        }
      } catch (_error) {
        logFeedbackError({ error: _error, questionId: stage });
      }
    },
    [studentId, personalFeedback, logFeedbackSubmitted, logFeedbackError, queryClient, refetch, navigate],
  );

  const submitFeedback = useCallback(async () => {
    // Prototype mode: use mock answer (5) if none selected
    let currentAnswer = isFirstQuestion ? clarity : preparedness;
    if (currentAnswer === null) {
      currentAnswer = 5;
      if (isFirstQuestion) setClarity(5);
      else setPreparedness(5);
    }
    await processFeedbackSubmission(onboardingStage, currentAnswer);
    return true;
  }, [isFirstQuestion, onboardingStage, clarity, preparedness, processFeedbackSubmission]);

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

      if (isFirstQuestion) {
        // Back from first question → go to my-why
        await studentService.updateStudentGoldenPath(studentId, {
          onboardingStage: 5,
          onboardingState: "my-why",
        });
        await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
        await refetch();
        navigate("/student/onboarding/my-why", { replace: true });
      } else {
        // Back from second question → go to first question
        await studentService.updateStudentGoldenPath(studentId, {
          onboardingStage: 6,
          onboardingState: "feedback",
        });
        await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
        await refetch();
      }
    } catch (_error) {
      console.error("Error updating onboarding stage:", _error);
    }
  }, [isFirstQuestion, studentId, queryClient, refetch, navigate]);

  return {
    clarity,
    setClarity,
    preparedness,
    setPreparedness,
    error,
    setError,
    handleContinue,
    handleBack,
    isFirstQuestion,
    isLoading,
  };
};

export default useFeedbackStep;
