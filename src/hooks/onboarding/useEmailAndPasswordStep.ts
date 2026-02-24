import { useState, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loadingStateAtom, LoadingPhase, userTypeAtom } from "../../state/stubAtoms";
import { UserType } from "../../types";
import { fetchAPI } from "../../mock/mockServices";
import { useAuth } from "../../mock/MockAuthProvider";
import { useAuthLogging } from "../../mock/mockLogging";
import { validateAuthFields } from "../../utils/validation";

interface AuthFormState {
  email: string;
  password: string;
  confirmPassword: string;
}

interface EmailAndPasswordStepHook {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  error: string | null;
  isValid: boolean;
  isLoading: boolean;
  handleContinue: () => Promise<void>;
  handleKeyDown: (event: React.KeyboardEvent) => void;
}

const useEmailAndPasswordStep = (): EmailAndPasswordStepHook => {
  const [formState, setFormState] = useState<AuthFormState>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { emailSignIn } = useAuth();
  const { logUserCreated, logUserCreationError, logSignupError } = useAuthLogging();
  const setLoadingState = useSetRecoilState(loadingStateAtom);
  const userType = useRecoilValue(userTypeAtom);

  const { email, password, confirmPassword } = formState;

  useEffect(() => {
    setLoadingState({
      phase: LoadingPhase.AUTH,
      isComplete: true,
      message: "Ready",
    });
    return () => {
      setLoadingState({
        phase: LoadingPhase.AUTH,
        isComplete: true,
        message: "",
      });
    };
  }, [setLoadingState]);

  useEffect(() => {
    if (userType === UserType.STUDENT) {
      // Don't redirect during signup
    }
  }, [userType, navigate]);

  const setEmail = useCallback((value: string) => {
    setFormState((prev) => ({ ...prev, email: value }));
  }, []);

  const setPassword = useCallback((value: string) => {
    setFormState((prev) => ({ ...prev, password: value }));
  }, []);

  const setConfirmPassword = useCallback((value: string) => {
    setFormState((prev) => ({ ...prev, confirmPassword: value }));
  }, []);

  const validationResult = useMemo(() => {
    return validateAuthFields({ email, password, confirmPassword });
  }, [email, password, confirmPassword]);

  const performSignup = useCallback(async (): Promise<{
    success: boolean;
    studentId?: string;
    errorMessage?: string;
  }> => {
    try {
      const response = await fetchAPI({
        functionName: "api",
        path: "/v2/users/students",
        method: "POST",
        payload: { email, password },
        parseJson: false,
      });

      if (!response.ok) {
        const errorBody = await response.json();
        if (response.status === 409) {
          throw new Error("An account with this email already exists. Please try signing in instead, or use a different email address.");
        } else if (response.status === 400) {
          throw new Error(errorBody.error || "Please check that all required fields are filled out correctly.");
        }
        throw new Error(errorBody.error || "Failed to create student account. Please try again.");
      }

      const result = await response.json();
      const { studentId, wasPendingStudent } = result as {
        success: boolean;
        studentId: string;
        wasPendingStudent: boolean;
      };

      if (!studentId) {
        throw new Error("Failed to get studentId from cloud function.");
      }

      await emailSignIn({ email, password });
      logUserCreated({ userId: studentId, email, isPendingStudent: wasPendingStudent });
      navigate("/student/onboarding/personal-info", { replace: true });

      return { success: true, studentId };
    } catch (error) {
      logUserCreationError({ error, email });
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      return { success: false, errorMessage };
    }
  }, [email, password, emailSignIn, logUserCreated, logUserCreationError, navigate]);

  const handleContinue = useCallback(async () => {
    if (isLoading) return;
    setError(null);
    setIsLoading(true);

    try {
      if (!validationResult.isValid) {
        setError(validationResult.errorMessage || "Validation failed");
        return;
      }

      const result = await performSignup();
      if (!result.success) {
        setError(result.errorMessage || "An unknown error occurred. Please try again.");
        logSignupError({ error: new Error(result.errorMessage || "Unknown signup error") });
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, validationResult, performSignup, logSignupError]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleContinue();
      }
    },
    [handleContinue],
  );

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    isValid: validationResult.isValid,
    isLoading,
    handleContinue,
    handleKeyDown,
  };
};

export default useEmailAndPasswordStep;
