import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentStudent } from "../useCurrentStudent";
import { studentService } from "../../mock/mockServices";
import { useQueryClient } from "@tanstack/react-query";

const MOCK_CITIES = [
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ",
  "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas, TX", "San Jose, CA",
  "Austin, TX", "Jacksonville, FL", "Fort Worth, TX", "Columbus, OH", "Charlotte, NC",
  "Indianapolis, IN", "San Francisco, CA", "Seattle, WA", "Denver, CO", "Nashville, TN",
  "Oklahoma City, OK", "El Paso, TX", "Washington, DC", "Boston, MA", "Las Vegas, NV",
  "Portland, OR", "Memphis, TN", "Louisville, KY", "Baltimore, MD", "Milwaukee, WI",
  "Albuquerque, NM", "Tucson, AZ", "Fresno, CA", "Sacramento, CA", "Mesa, AZ",
  "Kansas City, MO", "Atlanta, GA", "Omaha, NE", "Colorado Springs, CO", "Raleigh, NC",
  "Long Beach, CA", "Virginia Beach, VA", "Miami, FL", "Oakland, CA", "Minneapolis, MN",
  "Tampa, FL", "Tulsa, OK", "Arlington, TX", "New Orleans, LA", "Cleveland, OH",
  "Honolulu, HI", "Anchorage, AK", "Springfield, IL", "Springfield, MO", "Springfield, MA",
  "Portland, ME", "Birmingham, AL", "Salt Lake City, UT", "Detroit, MI", "Pittsburgh, PA",
  "St. Louis, MO", "Cincinnati, OH", "Orlando, FL", "Newark, NJ", "Buffalo, NY",
  "Madison, WI", "Boise, ID", "Des Moines, IA", "Little Rock, AR", "Richmond, VA",
];

const useBasicInfoStep = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: loggedInStudent, refetch } = useCurrentStudent();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [location, setLocation] = useState("");
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loggedInStudent && !hasInitialized) {
      setFirstName(loggedInStudent.firstName || "");
      setLastName(loggedInStudent.lastName || "");
      setGradeLevel(loggedInStudent.gradeLevel || "");
      const savedCity = loggedInStudent.address?.city || "";
      const savedState = loggedInStudent.address?.state || "";
      setLocation(savedCity && savedState ? `${savedCity}, ${savedState}` : "");
      setHasInitialized(true);
    }
  }, [loggedInStudent, hasInitialized]);

  const handleTextChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "firstName") setFirstName(value);
    else if (name === "lastName") setLastName(value);
    else if (name === "gradeLevel") setGradeLevel(value);
  }, []);

  const handleContinue = useCallback(async () => {
    const finalFirstName = firstName || "Jessica";
    const finalLastName = lastName || "Doe";
    const finalGradeLevel = gradeLevel || "9th Grade";
    const finalLocation = location || "Chicago, IL";

    if (!firstName) setFirstName(finalFirstName);
    if (!lastName) setLastName(finalLastName);
    if (!gradeLevel) setGradeLevel(finalGradeLevel);
    if (!location) setLocation(finalLocation);

    const [finalCity, finalState] = finalLocation.includes(", ")
      ? finalLocation.split(", ")
      : [finalLocation, ""];

    try {
      setIsLoading(true);
      await studentService.updateStudentGoldenPath(loggedInStudent!.id, {
        firstName: finalFirstName,
        lastName: finalLastName,
        gradeLevel: finalGradeLevel,
        address: { city: finalCity, state: finalState, lat: 0, lon: 0 },
        onboardingStage: 5,
        onboardingState: "account-setup-complete",
      });
      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();
      navigate("/student/home", { replace: true });
    } catch (error) {
      console.error("Error saving basic info:", error);
    } finally {
      setIsLoading(false);
    }
  }, [firstName, lastName, gradeLevel, location, loggedInStudent, queryClient, refetch, navigate]);

  const handleBack = useCallback(async () => {
    try {
      if (!loggedInStudent?.id) return;
      await studentService.updateStudentGoldenPath(loggedInStudent.id, {
        onboardingStage: 1,
        onboardingState: "signup",
      });
      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();
      navigate("/student/onboarding/password", { replace: true });
    } catch (error) {
      console.error("Error navigating back:", error);
    }
  }, [loggedInStudent, queryClient, refetch, navigate]);

  return {
    firstName,
    lastName,
    gradeLevel,
    setGradeLevel,
    location,
    setLocation,
    locationOptions: MOCK_CITIES,
    handleTextChange,
    handleContinue,
    handleBack,
    isLoading,
  };
};

export default useBasicInfoStep;
