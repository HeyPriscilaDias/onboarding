import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentStudent } from "../useCurrentStudent";
import { studentService } from "../../mock/mockServices";
import { useQueryClient } from "@tanstack/react-query";

export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California",
  "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
  "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
  "District of Columbia",
];

const useBasicInfoStep = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: loggedInStudent, refetch } = useCurrentStudent();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [city, setCity] = useState("");
  const [usState, setUsState] = useState("");
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loggedInStudent && !hasInitialized) {
      setFirstName(loggedInStudent.firstName || "");
      setLastName(loggedInStudent.lastName || "");
      setGradeLevel(loggedInStudent.gradeLevel || "");
      setCity(loggedInStudent.address?.city || "");
      setUsState(loggedInStudent.address?.state || "");
      setHasInitialized(true);
    }
  }, [loggedInStudent, hasInitialized]);

  const handleTextChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "firstName") setFirstName(value);
    else if (name === "lastName") setLastName(value);
    else if (name === "gradeLevel") setGradeLevel(value);
    else if (name === "city") setCity(value);
  }, []);

  const handleContinue = useCallback(async () => {
    const finalFirstName = firstName || "Jane";
    const finalLastName = lastName || "Doe";
    const finalGradeLevel = gradeLevel || "9th Grade";
    const finalCity = city || "Chicago";
    const finalUsState = usState || "Illinois";

    if (!firstName) setFirstName(finalFirstName);
    if (!lastName) setLastName(finalLastName);
    if (!gradeLevel) setGradeLevel(finalGradeLevel);
    if (!city) setCity(finalCity);
    if (!usState) setUsState(finalUsState);

    try {
      setIsLoading(true);
      await studentService.updateStudentGoldenPath(loggedInStudent!.id, {
        firstName: finalFirstName,
        lastName: finalLastName,
        gradeLevel: finalGradeLevel,
        address: { city: finalCity, state: finalUsState, lat: 0, lon: 0 },
      });
      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();
      navigate("/student/onboarding/gpa", { replace: true });
    } catch (error) {
      console.error("Error saving basic info:", error);
    } finally {
      setIsLoading(false);
    }
  }, [firstName, lastName, gradeLevel, city, usState, loggedInStudent, queryClient, refetch, navigate]);

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
      console.error("Error navigating back:", error);
    }
  }, [loggedInStudent, queryClient, refetch, navigate]);

  return {
    firstName,
    lastName,
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

export default useBasicInfoStep;
