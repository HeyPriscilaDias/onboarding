import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCurrentStudent } from "../useCurrentStudent";
import { studentService } from "../../mock/mockServices";

const useWelcomeStep = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: loggedInStudent, refetch } = useCurrentStudent();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleContinue = useCallback(async () => {
    try {
      if (!loggedInStudent?.id) return;
      setIsLoading(true);

      await studentService.updateStudentGoldenPath(loggedInStudent.id, {
        onboardingStage: 3,
        onboardingState: "meet-alma",
      });

      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();
      navigate("/student/onboarding/meet-alma", { replace: true });
    } catch (error) {
      console.error("Error updating onboarding stage:", error);
    } finally {
      setIsLoading(false);
    }
  }, [loggedInStudent, queryClient, refetch, navigate]);

  const handleBack = useCallback(async () => {
    try {
      if (!loggedInStudent?.id) return;

      await studentService.updateStudentGoldenPath(loggedInStudent.id, {
        onboardingStage: 1,
        onboardingState: "signup",
      });

      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();
      navigate("/signup", { replace: true });
    } catch (error) {
      console.error("Error updating onboarding stage:", error);
    }
  }, [loggedInStudent, queryClient, refetch, navigate]);

  return { handleContinue, handleBack, isLoading };
};

export default useWelcomeStep;
