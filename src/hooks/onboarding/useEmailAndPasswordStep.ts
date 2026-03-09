import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loadingStateAtom, LoadingPhase } from "../../state/stubAtoms";
import { useAuth } from "../../mock/MockAuthProvider";

const MOCK_EMAIL = "test@prototype.com";
const MOCK_PASSWORD = "test123";

const useEmailAndPasswordStep = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { emailSignIn, createEmailUser } = useAuth();
  const setLoadingState = useSetRecoilState(loadingStateAtom);

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

  const handleContinue = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      // Create account if it doesn't exist, ignore "already exists" error
      try {
        await createEmailUser({ email: MOCK_EMAIL, password: MOCK_PASSWORD });
      } catch {
        // Account already exists — that's fine
      }

      // Sign in and navigate
      emailSignIn({ email: MOCK_EMAIL, password: MOCK_PASSWORD });
      navigate("/student/onboarding/basic-info", { replace: true });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, createEmailUser, emailSignIn, navigate]);

  return { isLoading, handleContinue };
};

export default useEmailAndPasswordStep;
