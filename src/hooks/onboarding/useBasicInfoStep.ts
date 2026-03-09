import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentStudent } from "../useCurrentStudent";
import { studentService } from "../../mock/mockServices";
import { useQueryClient } from "@tanstack/react-query";

export const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
  "DC",
];

const useBasicInfoStep = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: loggedInStudent, refetch } = useCurrentStudent();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [usState, setUsState] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [gpa, setGpa] = useState("");
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loggedInStudent && !hasInitialized) {
      setFirstName(loggedInStudent.firstName || "");
      setLastName(loggedInStudent.lastName || "");
      setCity(loggedInStudent.address?.city || "");
      setUsState(loggedInStudent.address?.state || "");
      setGradeLevel(loggedInStudent.gradeLevel || "");
      setGpa(loggedInStudent.gpaValue ? String(loggedInStudent.gpaValue) : "");
      setHasInitialized(true);
    }
  }, [loggedInStudent, hasInitialized]);

  const handleTextChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "firstName") setFirstName(value);
    else if (name === "lastName") setLastName(value);
    else if (name === "city") setCity(value);
    else if (name === "usState") setUsState(value);
    else if (name === "gradeLevel") setGradeLevel(value);
    else if (name === "gpa") setGpa(value);
  }, []);

  const handleContinue = useCallback(async () => {
    const finalFirstName = firstName || "Jane";
    const finalLastName = lastName || "Doe";
    const finalCity = city || "Springfield";
    const finalUsState = usState || "IL";
    const finalGradeLevel = gradeLevel || "9th Grade";
    const finalGpa = gpa || "3.5";

    if (!firstName) setFirstName(finalFirstName);
    if (!lastName) setLastName(finalLastName);
    if (!city) setCity(finalCity);
    if (!usState) setUsState(finalUsState);
    if (!gradeLevel) setGradeLevel(finalGradeLevel);
    if (!gpa) setGpa(finalGpa);

    try {
      setIsLoading(true);
      await studentService.updateStudentGoldenPath(loggedInStudent!.id, {
        firstName: finalFirstName,
        lastName: finalLastName,
        address: { city: finalCity, state: finalUsState, lat: 0, lon: 0 },
        gradeLevel: finalGradeLevel,
        gpaValue: parseFloat(finalGpa) || null,
        onboardingStage: 5,
        onboardingState: "my-why",
      });
      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();
      navigate("/student/onboarding/my-why", { replace: true });
    } catch (error) {
      console.error("Error saving basic info:", error);
    } finally {
      setIsLoading(false);
    }
  }, [firstName, lastName, city, usState, gradeLevel, gpa, loggedInStudent, queryClient, refetch, navigate]);

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
    city,
    usState,
    gradeLevel,
    gpa,
    handleTextChange,
    handleContinue,
    handleBack,
    isLoading,
  };
};

export default useBasicInfoStep;
