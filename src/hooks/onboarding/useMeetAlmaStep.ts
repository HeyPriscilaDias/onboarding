import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentStudent } from "../useCurrentStudent";
import { studentService } from "../../mock/mockServices";
import { useQueryClient } from "@tanstack/react-query";

const useMeetAlmaStep = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { data: loggedInStudent, refetch } = useCurrentStudent();
  const queryClient = useQueryClient();

  const handleContinue = useCallback(async () => {
    try {
      if (!loggedInStudent?.id) return;
      setIsLoading(true);

      await studentService.updateStudentGoldenPath(loggedInStudent.id, {
        onboardingStage: 4,
        onboardingState: "basic-info",
      });

      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();
      navigate("/student/onboarding/basic-info", { replace: true });
    } catch (error) {
      console.error("Error updating onboarding stage:", error);
    } finally {
      setIsLoading(false);
    }
  }, [navigate, loggedInStudent, queryClient, refetch]);

  const handleBack = useCallback(async () => {
    try {
      if (!loggedInStudent?.id) return;

      await studentService.updateStudentGoldenPath(loggedInStudent.id, {
        onboardingStage: 1,
        onboardingState: "signup",
      });

      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();
    } catch (error) {
      console.error("Error updating onboarding stage:", error);
    }
    navigate("/signup", { replace: true });
  }, [navigate, loggedInStudent, queryClient, refetch]);

  return { handleContinue, handleBack, isLoading };
};

export default useMeetAlmaStep;
