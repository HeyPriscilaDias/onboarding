import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loadingStateAtom, LoadingPhase } from "../../state/stubAtoms";

const useEmailAndPasswordStep = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
      navigate("/student/onboarding/password", { replace: true });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, navigate]);

  return { isLoading, handleContinue };
};

export default useEmailAndPasswordStep;
