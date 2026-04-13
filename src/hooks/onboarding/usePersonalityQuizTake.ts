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

  // Resume from saved position if the student is returning mid-quiz
  useEffect(() => {
    if (loggedInStudent?.lastQuestionId) {
      const savedIndex = questions.findIndex((q) => q.id === loggedInStudent.lastQuestionId);
      if (savedIndex > 0) {
        setCurrentQuestionIndex(savedIndex);
      }
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      const nextIndex = currentQuestionIndex + 1;
      const nextQuestion = questions[nextIndex];

      // Persist in-progress state so the checklist can show "Resume"
      if (loggedInStudent?.id && nextQuestion) {
        studentService.updateStudentGoldenPath(loggedInStudent.id, {
          onboardingState: "quiz-in-progress" as const,
          lastQuestionId: nextQuestion.id,
        });
      }

      prevQuestionIndexRef.current = null;
      setCurrentQuestionIndex(nextIndex);
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

      navigate("/student/portfolio/personality-type", { replace: true });
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
