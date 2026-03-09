import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCurrentStudent } from "../useCurrentStudent";
import { studentService } from "../../mock/mockServices";
import { useOnboardingLogging } from "../../mock/mockLogging";

const useMyWhyStep = () => {
  const [myWhy, setMyWhy] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: loggedInStudent, refetch } = useCurrentStudent();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logMyWhySubmitted, logMyWhyError } = useOnboardingLogging();

  const studentName = loggedInStudent?.firstName || "";

  useEffect(() => {
    if (loggedInStudent?.myWhy) {
      setMyWhy(loggedInStudent.myWhy);
    }
  }, [loggedInStudent?.myWhy]);

  const validateForm = useCallback((): boolean => {
    const isValid = !!myWhy.trim();
    setError(!isValid);
    return isValid;
  }, [myWhy]);

  const handleBlur = useCallback(() => {
    validateForm();
  }, [validateForm]);

  const handleContinue = useCallback(async () => {
    // Prototype mode: fill mock data if empty
    const mockMyWhy = myWhy.trim() || "I want to explore my future options.";
    if (!myWhy.trim()) setMyWhy(mockMyWhy);

    try {
      if (!loggedInStudent?.id) return;
      setIsLoading(true);

      await studentService.updateStudentGoldenPath(loggedInStudent.id, {
        myWhy: mockMyWhy,
        onboardingStage: 6,
        onboardingState: "personalization",
      });

      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();
      logMyWhySubmitted({ studentId: loggedInStudent.id });
      navigate("/student/onboarding/personalization", { replace: true });
    } catch (error) {
      logMyWhyError({ error });
    } finally {
      setIsLoading(false);
    }
  }, [myWhy, validateForm, loggedInStudent, queryClient, refetch, navigate, logMyWhySubmitted, logMyWhyError]);

  const handleBack = useCallback(async () => {
    try {
      if (!loggedInStudent?.id) return;
      await studentService.updateStudentGoldenPath(loggedInStudent.id, {
        onboardingStage: 4,
        onboardingState: "basic-info",
      });
      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();
      navigate("/student/onboarding/basic-info", { replace: true });
    } catch (error) {
      console.error("Error updating onboarding stage:", error);
    }
  }, [loggedInStudent, queryClient, refetch, navigate]);

  return { myWhy, setMyWhy, error, handleContinue, handleBack, handleBlur, studentName, isLoading };
};

export default useMyWhyStep;
