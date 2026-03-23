import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentStudent } from "../useCurrentStudent";
import { studentService } from "../../mock/mockServices";
import { useQueryClient } from "@tanstack/react-query";

const useGpaStep = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: loggedInStudent, refetch } = useCurrentStudent();

  const [gpa, setGpa] = useState("");
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loggedInStudent && !hasInitialized) {
      setGpa(loggedInStudent.gpaValue ? String(loggedInStudent.gpaValue) : "");
      setHasInitialized(true);
    }
  }, [loggedInStudent, hasInitialized]);

  const handleTextChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setGpa(event.target.value);
  }, []);

  const handleContinue = useCallback(async () => {
    try {
      setIsLoading(true);
      await studentService.updateStudentGoldenPath(loggedInStudent!.id, {
        gpaValue: parseFloat(gpa) || null,
        onboardingStage: 5,
        onboardingState: "account-setup-complete",
      });
      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();
      navigate("/student/home", { replace: true });
    } catch (error) {
      console.error("Error saving GPA:", error);
    } finally {
      setIsLoading(false);
    }
  }, [gpa, loggedInStudent, queryClient, refetch, navigate]);

  const handleBack = useCallback(() => {
    navigate("/student/onboarding/school-info", { replace: true });
  }, [navigate]);

  return { gpa, handleTextChange, handleContinue, handleBack, isLoading };
};

export default useGpaStep;
