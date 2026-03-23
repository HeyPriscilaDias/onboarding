import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../mock/MockAuthProvider";

const MOCK_EMAIL = "test@prototype.com";
const MOCK_PASSWORD = "test123";

const usePasswordStep = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { emailSignIn, createEmailUser } = useAuth();

  const handleContinue = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      try {
        await createEmailUser({ email: MOCK_EMAIL, password: MOCK_PASSWORD });
      } catch {
        // Account already exists — that's fine
      }
      emailSignIn({ email: MOCK_EMAIL, password: MOCK_PASSWORD });
      navigate("/student/onboarding/basic-info", { replace: true });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, createEmailUser, emailSignIn, navigate]);

  const handleBack = useCallback(() => {
    navigate("/student/onboarding/signup", { replace: true });
  }, [navigate]);

  return { isLoading, handleContinue, handleBack };
};

export default usePasswordStep;
