import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "./useOnboarding";
import { formatPhoneNumber } from "../../utils/formatUtils";
import { useCurrentStudent } from "../useCurrentStudent";
import { AddressComponents } from "../../types";
import { useOnboardingLogging } from "../../mock/mockLogging";

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

  const { updateStudentData } = useOnboarding();
  const { data: loggedInStudent } = useCurrentStudent();

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
    const isBirthdayValid = displayBirthday ? validateBirthday(displayBirthday) : false;

    if (!firstName || !lastName || !isBirthdayValid || !address.address || phoneNumber.length !== 16) {
      setErrors({
        firstName: !firstName,
        lastName: !lastName,
        birthday: !isBirthdayValid,
        address: !address.address,
        phoneNumber: phoneNumber.length !== 16,
      });
      return;
    }

    try {
      setIsLoading(true);
      await updateStudentData({
        firstName,
        lastName,
        birthday,
        address,
        phone: phoneNumber,
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
    displayBirthday,
    validateBirthday,
  ]);

  return {
    handleTextChange,
    handleBirthdayChange,
    handlePhoneChange,
    handleContinue,
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
