import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useOnboarding } from "./useOnboarding";
import { formatPhoneNumber } from "../../utils/formatUtils";
import { useCurrentStudent } from "../useCurrentStudent";
import { AddressComponents } from "../../types";
import { useOnboardingLogging } from "../../mock/mockLogging";
import { studentService } from "../../mock/mockServices";

const usePersonalInfoStep = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState<string | null>(null);
  const [displayBirthday, setDisplayBirthday] = useState<string>("");
  const [address, setAddress] = useState<AddressComponents>({
    address: "",
    city: "",
    state: "",
    zip: "",
    county: "",
    lat: 0,
    lon: 0,
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const { logPersonalInfoError, logPersonalInfoSubmitted } = useOnboardingLogging();
  const [hasInitialized, setHasInitialized] = useState(false);

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    birthday: false,
    address: false,
    phoneNumber: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
  const { updateStudentData } = useOnboarding();
  const { data: loggedInStudent, refetch } = useCurrentStudent();

  useEffect(() => {
    if (loggedInStudent && !hasInitialized) {
      setFirstName(loggedInStudent.firstName || "");
      setLastName(loggedInStudent.lastName || "");

      if (loggedInStudent.birthday) {
        const formattedDate = new Date(loggedInStudent.birthday).toISOString().split("T")[0]!;
        setBirthday(loggedInStudent.birthday);
        setDisplayBirthday(formattedDate);
      }

      setAddress({
        address: loggedInStudent.address?.address || "",
        city: loggedInStudent.address?.city || "",
        state: loggedInStudent.address?.state || "",
        zip: loggedInStudent.address?.zip || "",
        county: loggedInStudent.address?.county || "",
        lat: loggedInStudent.address?.lat || 0,
        lon: loggedInStudent.address?.lon || 0,
      });

      if (loggedInStudent.phone) {
        const cleanedValue = loggedInStudent.phone.replace(/\D/g, "") ?? "";
        const formattedValue = formatPhoneNumber({ phoneNumber: cleanedValue });
        setPhoneNumber(formattedValue || "");
      }

      setHasInitialized(true);
    }
  }, [loggedInStudent, hasInitialized]);

  const validateBirthday = useCallback((dateValue: string): boolean => {
    if (!dateValue) return false;
    const today = new Date();
    const selectedDate = new Date(dateValue);
    if (selectedDate > today) return false;
    const minAgeDate = new Date(today.getFullYear() - 20, today.getMonth(), today.getDate());
    const maxAgeDate = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
    return selectedDate >= minAgeDate && selectedDate <= maxAgeDate;
  }, []);

  const handleBlur = useCallback(
    (field: keyof typeof errors) => {
      if (field === "birthday") {
        const isValid = displayBirthday ? validateBirthday(displayBirthday) : false;
        setErrors((prev) => ({ ...prev, birthday: !isValid }));
        return;
      }
      const fieldValues: Record<string, string | boolean> = {
        firstName,
        lastName,
        address: address.address || "",
        phoneNumber,
      };
      setErrors((prev) => ({ ...prev, [field]: !fieldValues[field] }));
    },
    [address.address, firstName, lastName, phoneNumber, displayBirthday, validateBirthday],
  );

  const handleAddressChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setAddress((prev) => ({ ...prev, address: newValue }));
    setErrors((prev) => ({ ...prev, address: !newValue }));
  }, []);

  const handleTextChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "firstName") setFirstName(value);
    else if (name === "lastName") setLastName(value);
    setErrors((prev) => ({ ...prev, [name]: value === "" }));
  }, []);

  const handleBirthdayChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const dateValue = event.target.value;
      setDisplayBirthday(dateValue);

      if (!dateValue) {
        setBirthday(null);
        setErrors((prev) => ({ ...prev, birthday: true }));
        return;
      }

      const isValid = validateBirthday(dateValue);
      if (isValid) {
        try {
          const isoString = new Date(dateValue).toISOString();
          setBirthday(isoString);
          setErrors((prev) => ({ ...prev, birthday: false }));
        } catch {
          setBirthday(null);
          setErrors((prev) => ({ ...prev, birthday: true }));
        }
      } else {
        setBirthday(null);
        setErrors((prev) => ({ ...prev, birthday: true }));
      }
    },
    [validateBirthday],
  );

  const handlePhoneChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const cleanedValue = value.replace(/\D/g, "");
    const formattedValue = formatPhoneNumber({ phoneNumber: cleanedValue });
    setPhoneNumber(formattedValue);
    setErrors((prev) => ({ ...prev, phoneNumber: formattedValue.length !== 16 }));
  }, []);

  const handleContinue = useCallback(async () => {
    // Prototype mode: fill mock data for missing fields
    const mockFirstName = firstName || "Jessica";
    const mockLastName = lastName || "Doe";
    const mockBirthday = birthday || new Date(2010, 0, 15).toISOString();
    const mockAddress = address.address
      ? address
      : { address: "123 Main St", city: "Springfield", state: "IL", zip: "62701", county: "Sangamon", lat: 39.78, lon: -89.65 };
    const mockPhone = phoneNumber.length === 16 ? phoneNumber : "(555) 555-0100";

    if (!firstName) setFirstName(mockFirstName);
    if (!lastName) setLastName(mockLastName);
    if (!birthday) {
      setBirthday(mockBirthday);
      setDisplayBirthday("2010-01-15");
    }
    if (!address.address) setAddress(mockAddress);
    if (phoneNumber.length !== 16) setPhoneNumber(mockPhone);

    try {
      setIsLoading(true);
      await updateStudentData({
        firstName: mockFirstName,
        lastName: mockLastName,
        birthday: mockBirthday,
        address: mockAddress,
        phone: mockPhone,
        onboardingStage: 3,
        onboardingState: "school-info",
      });
      logPersonalInfoSubmitted({ studentId: loggedInStudent?.id });
      navigate("/student/onboarding/school-info", { replace: true });
    } catch (error) {
      logPersonalInfoError({ error });
    } finally {
      setIsLoading(false);
    }
  }, [
    address,
    birthday,
    firstName,
    lastName,
    logPersonalInfoError,
    logPersonalInfoSubmitted,
    loggedInStudent?.id,
    navigate,
    phoneNumber,
    updateStudentData,
  ]);

  const handleBack = useCallback(async () => {
    try {
      if (!loggedInStudent?.id) return;
      await studentService.updateStudentGoldenPath(loggedInStudent.id, {
        onboardingStage: 1,
        onboardingState: "signup",
      });
      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();
      navigate("/student/onboarding/signup", { replace: true });
    } catch (error) {
      console.error("Error updating onboarding stage:", error);
    }
  }, [loggedInStudent, queryClient, refetch, navigate]);

  return {
    handleTextChange,
    handleBirthdayChange,
    handlePhoneChange,
    handleContinue,
    handleBack,
    handleBlur,
    setAddress,
    handleAddressChange,
    displayBirthday,
    address,
    phoneNumber,
    firstName,
    lastName,
    errors,
    isLoading,
  };
};

export default usePersonalInfoStep;
