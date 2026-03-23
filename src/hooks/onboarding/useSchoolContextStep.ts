import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentStudent } from "../useCurrentStudent";
import { studentService } from "../../mock/mockServices";
import { useQueryClient } from "@tanstack/react-query";

const useSchoolContextStep = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: loggedInStudent, refetch } = useCurrentStudent();

  const [gradeLevel, setGradeLevel] = useState("");
  const [city, setCity] = useState("");
  const [usState, setUsState] = useState("");
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loggedInStudent && !hasInitialized) {
      setGradeLevel(loggedInStudent.gradeLevel || "");
      setCity(loggedInStudent.address?.city || "");
      setUsState(loggedInStudent.address?.state || "");
      setHasInitialized(true);
    }
  }, [loggedInStudent, hasInitialized]);

  const handleTextChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "gradeLevel") setGradeLevel(value);
    else if (name === "city") setCity(value);
  }, []);

  const handleContinue = useCallback(async () => {
    const finalGradeLevel = gradeLevel || "9th Grade";
    const finalCity = city || "Chicago";
    const finalUsState = usState || "Illinois";

    if (!gradeLevel) setGradeLevel(finalGradeLevel);
    if (!city) setCity(finalCity);
    if (!usState) setUsState(finalUsState);

    try {
      setIsLoading(true);
      await studentService.updateStudentGoldenPath(loggedInStudent!.id, {
        gradeLevel: finalGradeLevel,
        address: { city: finalCity, state: finalUsState, lat: 0, lon: 0 },
      });
      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();
      navigate("/student/onboarding/gpa", { replace: true });
    } catch (error) {
      console.error("Error saving school context:", error);
    } finally {
      setIsLoading(false);
    }
  }, [gradeLevel, city, usState, loggedInStudent, queryClient, refetch, navigate]);

  const handleBack = useCallback(() => {
    navigate("/student/onboarding/basic-info", { replace: true });
  }, [navigate]);

  return {
    gradeLevel,
    city,
    usState,
    setUsState,
    handleTextChange,
    handleContinue,
    handleBack,
    isLoading,
  };
};

export default useSchoolContextStep;
