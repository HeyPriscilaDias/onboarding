import React, { createContext, useContext, useState, useCallback } from "react";
import { createEmptyStudent } from "./mockData";
import { StudentRecord } from "../types";

type MockUser = {
  uid: string;
  email: string;
};

type StoredAccount = {
  email: string;
  password: string;
  studentId: string;
};

type AuthContextType = {
  currentAuthUser: MockUser | null;
  logout: () => void;
  createEmailUser: (args: { email: string; password: string }) => Promise<string | undefined>;
  signInWithGoogle: () => void;
  signInWithClever: () => void;
  emailSignIn: (args: { email: string; password: string }) => void;
  loginError: string | null;
  resetPassword: (email: string) => void;
  setLoginError: (error: string | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  currentAuthUser: null,
  logout: () => undefined,
  createEmailUser: async () => Promise.resolve(""),
  signInWithGoogle: () => undefined,
  signInWithClever: () => undefined,
  emailSignIn: () => undefined,
  resetPassword: () => undefined,
  setLoginError: () => undefined,
  loginError: null,
});

export const useAuth = () => useContext(AuthContext);

// Helper to get/set accounts from localStorage
const ACCOUNTS_KEY = "mock_accounts";
const CURRENT_USER_KEY = "mock_current_user";
const STUDENT_PREFIX = "mock_student_";

const getAccounts = (): StoredAccount[] => {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveAccounts = (accounts: StoredAccount[]) => {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
};

export const getStudentData = (studentId: string): StudentRecord | null => {
  try {
    const data = localStorage.getItem(STUDENT_PREFIX + studentId);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const saveStudentData = (studentId: string, data: StudentRecord) => {
  localStorage.setItem(STUDENT_PREFIX + studentId, JSON.stringify(data));
};

// Read saved user synchronously so the first render already has auth state.
// This prevents ProtectedRoute from flashing a redirect to /login on page reload.
const getInitialUser = (): MockUser | null => {
  try {
    const saved = localStorage.getItem(CURRENT_USER_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export const MockAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentAuthUser, setCurrentAuthUser] = useState<MockUser | null>(getInitialUser);
  const [loginError, setLoginError] = useState<string | null>(null);

  const createEmailUser = useCallback(async ({ email, password }: { email: string; password: string }): Promise<string | undefined> => {
    const accounts = getAccounts();
    const existing = accounts.find((a) => a.email === email);
    if (existing) {
      throw new Error("An account with this email already exists. Please try signing in instead, or use a different email address.");
    }

    // Create new student
    const student = createEmptyStudent(email);
    const newAccount: StoredAccount = { email, password, studentId: student.id };
    accounts.push(newAccount);
    saveAccounts(accounts);
    saveStudentData(student.id, student);

    return student.id;
  }, []);

  const emailSignIn = useCallback(({ email, password }: { email: string; password: string }) => {
    const accounts = getAccounts();
    const account = accounts.find((a) => a.email === email);

    if (!account) {
      setLoginError("No account found with this email. Please sign up first.");
      return;
    }
    if (account.password !== password) {
      setLoginError("Incorrect password. Please try again.");
      return;
    }

    const user: MockUser = { uid: account.studentId, email };
    setCurrentAuthUser(user);
    setLoginError(null);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }, []);

  const logout = useCallback(() => {
    setCurrentAuthUser(null);
    setLoginError(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  }, []);

  const resetPassword = useCallback((_email: string) => {
    // No-op in mock - instant success
  }, []);

  const signInWithGoogle = useCallback(() => {
    setLoginError("Google sign-in is not available in test mode.");
  }, []);

  const signInWithClever = useCallback(() => {
    setLoginError("Clever sign-in is not available in test mode.");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentAuthUser,
        logout,
        createEmailUser,
        signInWithGoogle,
        signInWithClever,
        emailSignIn,
        loginError,
        resetPassword,
        setLoginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
