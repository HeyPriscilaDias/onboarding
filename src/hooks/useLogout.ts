import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../mock/MockAuthProvider";

const useLogout = () => {
  const { logout: authLogout } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    authLogout();
    queryClient.clear();
    navigate("/student/onboarding/signup");
  }, [authLogout, queryClient, navigate]);

  return { logout };
};

export default useLogout;
