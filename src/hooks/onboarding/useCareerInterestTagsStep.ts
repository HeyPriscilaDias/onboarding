import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentStudent } from "../useCurrentStudent";
import { studentService } from "../../mock/mockServices";

const CAREER_TAGS = [
  "Science",
  "Technology",
  "Engineering",
  "Healthcare",
  "Education",
  "Business",
  "Arts & Design",
  "Writing & Communication",
  "Law & Government",
  "Social Services",
  "Trades & Construction",
  "Agriculture & Environment",
  "Media & Entertainment",
  "Military & Public Safety",
  "Sports & Fitness",
];

const useCareerInterestTagsStep = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: loggedInStudent, refetch } = useCurrentStudent();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (loggedInStudent && !hasInitialized) {
      setSelectedTags(loggedInStudent.careerInterestTags ?? []);
      setHasInitialized(true);
    }
  }, [loggedInStudent, hasInitialized]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  const handleContinue = useCallback(async () => {
    try {
      if (!loggedInStudent?.id) return;
      setIsLoading(true);

      // Prototype mode: auto-fill if nothing selected
      const tagsToSave =
        selectedTags.length > 0 ? selectedTags : ["Healthcare", "Technology"];

      if (selectedTags.length === 0) {
        setSelectedTags(tagsToSave);
      }

      await studentService.updateStudentGoldenPath(loggedInStudent.id, {
        careerInterestTags: tagsToSave,
        onboardingStage: 7,
        onboardingState: "quiz-start",
      });

      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();
      navigate("/student/onboarding/personality-quiz/start", { replace: true });
    } catch (error) {
      console.error("Error saving career interest tags:", error);
    } finally {
      setIsLoading(false);
    }
  }, [loggedInStudent, selectedTags, queryClient, refetch, navigate]);

  const handleBack = useCallback(async () => {
    try {
      if (!loggedInStudent?.id) return;
      await studentService.updateStudentGoldenPath(loggedInStudent.id, {
        onboardingStage: 6,
        onboardingState: "personalization",
      });
      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();
      navigate("/student/onboarding/personalization", { replace: true });
    } catch (error) {
      console.error("Error updating onboarding stage:", error);
    }
  }, [loggedInStudent, queryClient, refetch, navigate]);

  return {
    selectedTags,
    toggleTag,
    handleContinue,
    handleBack,
    isLoading,
    CAREER_TAGS,
  };
};

export default useCareerInterestTagsStep;
