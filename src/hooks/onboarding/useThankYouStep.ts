import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentStudent } from "../useCurrentStudent";
import { studentService } from "../../mock/mockServices";
import { useOnboardingLogging } from "../../mock/mockLogging";

const useThankYouStep = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { data: loggedInStudent, refetch } = useCurrentStudent();
  const queryClient = useQueryClient();
  const { logOnboardingCompleted } = useOnboardingLogging();

  const handleContinueToQuiz = useCallback(async () => {
    try {
      if (!loggedInStudent?.id) return;
      setIsLoading(true);

      await studentService.updateStudentGoldenPath(loggedInStudent.id, {
        onboardingStage: 8,
        onboardingState: "quiz-start",
      });

      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();
      logOnboardingCompleted({ studentId: loggedInStudent.id });

      // In test mode, go to quiz placeholder instead of real quiz
      navigate("/student/onboarding/quiz-placeholder");
    } catch (error) {
      console.error("Error updating onboarding stage:", error);
      navigate("/student/onboarding/quiz-placeholder");
    } finally {
      setIsLoading(false);
    }
  }, [navigate, loggedInStudent, queryClient, refetch, logOnboardingCompleted]);

  const handleBack = useCallback(async () => {
    try {
      if (!loggedInStudent?.id) return;
      await studentService.updateStudentGoldenPath(loggedInStudent.id, {
        onboardingStage: 6,
        onboardingState: "feedback",
      });
      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();
    } catch (error) {
      console.error("Error updating onboarding stage:", error);
    }
    navigate("/student/onboarding/feedback");
  }, [navigate, loggedInStudent, queryClient, refetch]);

  return { handleContinueToQuiz, handleBack, isLoading };
};

export default useThankYouStep;
