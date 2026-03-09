import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentStudent } from "../useCurrentStudent";
import { studentService } from "../../mock/mockServices";
import {
  MOCK_QUIZ_QUESTIONS,
  calculatePersonalityType,
  QuestionRecord,
} from "../../mock/quizData";

const usePersonalityQuizTake = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  // Store all answers: questionId -> selected optionIds
  const answersRef = useRef<Map<string, string[]>>(new Map());
  const prevQuestionIndexRef = useRef<number | null>(null);

  const { data: loggedInStudent, refetch } = useCurrentStudent();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const questions = MOCK_QUIZ_QUESTIONS;
  const currentQuestion: QuestionRecord | null = questions[currentQuestionIndex] ?? null;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Restore selections when navigating back to a previously answered question
  useEffect(() => {
    if (prevQuestionIndexRef.current !== currentQuestionIndex && currentQuestion) {
      prevQuestionIndexRef.current = currentQuestionIndex;
      const saved = answersRef.current.get(currentQuestion.id);
      setSelectedOptions(saved ?? []);
    }
  }, [currentQuestionIndex, currentQuestion]);

  const handleOptionSelect = useCallback(
    (optionId: string) => {
      if (!currentQuestion) return;

      setSelectedOptions((prev) => {
        // For 2-option questions, single selection
        if (currentQuestion.options.length <= 2) {
          return prev.includes(optionId) ? [] : [optionId];
        }
        // For multi-option questions, allow up to 2
        if (prev.includes(optionId)) {
          return prev.filter((id) => id !== optionId);
        }
        if (prev.length < 2) {
          return [...prev, optionId];
        }
        // Replace first with second, add new
        return [prev[1]!, optionId];
      });
    },
    [currentQuestion],
  );

  const handleNext = useCallback(async () => {
    if (!currentQuestion) return;

    // Save current selections (even if empty — prototype allows skipping)
    if (selectedOptions.length > 0) {
      answersRef.current.set(currentQuestion.id, [...selectedOptions]);
    }

    if (!isLastQuestion) {
      prevQuestionIndexRef.current = null;
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptions([]);
      return;
    }

    // Last question — calculate results and navigate
    setSubmitting(true);
    try {
      const personalityType = calculatePersonalityType(answersRef.current, questions);

      if (loggedInStudent?.id) {
        await studentService.updateStudentGoldenPath(loggedInStudent.id, {
          quizComplete: true,
          personalityType: personalityType.id,
          onboardingState: "quiz-results" as const,
        });
        await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
        await refetch();
      }

      navigate("/student/onboarding/personality-quiz/preview", { replace: true });
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setSubmitting(false);
    }
  }, [currentQuestion, selectedOptions, isLastQuestion, loggedInStudent, questions, queryClient, refetch, navigate]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      // Save current selections before going back
      if (currentQuestion && selectedOptions.length > 0) {
        answersRef.current.set(currentQuestion.id, [...selectedOptions]);
      }
      prevQuestionIndexRef.current = null;
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex, currentQuestion, selectedOptions]);

  return {
    loading: false,
    submitting,
    questions,
    currentQuestion,
    currentQuestionIndex,
    isLastQuestion,
    selectedOptions,
    handleOptionSelect,
    handleNext,
    handlePrevious,
  };
};

export default usePersonalityQuizTake;
