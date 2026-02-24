import { getStudentData, saveStudentData } from "./MockAuthProvider";
import { StudentRecord } from "../types";

const CURRENT_USER_KEY = "mock_current_user";

const getCurrentStudentId = (): string | null => {
  try {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || "null");
    return user?.uid || null;
  } catch {
    return null;
  }
};

export const studentService = {
  getCurrentProfile: async (): Promise<StudentRecord> => {
    const studentId = getCurrentStudentId();
    if (!studentId) throw new Error("No user logged in");
    const data = getStudentData(studentId);
    if (!data) throw new Error("Student data not found");
    return data;
  },

  updateStudentGoldenPath: async (studentId: string, updates: Record<string, unknown>): Promise<void> => {
    const data = getStudentData(studentId);
    if (!data) throw new Error("Student not found: " + studentId);
    const updated = { ...data, ...updates, lastUpdatedAt: new Date().toISOString() } as StudentRecord;
    saveStudentData(studentId, updated);
  },
};

export const personalizationService = {
  updatePersonalization: async (studentId: string, incomeBracket: "lower" | "middle" | "higher" | null): Promise<void> => {
    const data = getStudentData(studentId);
    if (!data) throw new Error("Student not found");
    const updated: StudentRecord = {
      ...data,
      incomeBracket,
      incomeBracketUpdatedAt: new Date().toISOString(),
      onboardingState: "preferences",
      lastUpdatedAt: new Date().toISOString(),
    };
    saveStudentData(studentId, updated);
  },
};

// Mock fetchAPI for signup endpoint
export const fetchAPI = async ({
  path,
  method,
  payload,
}: {
  functionName: string;
  path: string;
  method: string;
  payload?: Record<string, unknown>;
  parseJson?: boolean;
}): Promise<Response> => {
  if (path === "/v2/users/students" && method === "POST") {
    const { email, password } = payload as { email: string; password: string };

    // Check if account already exists
    const accounts = JSON.parse(localStorage.getItem("mock_accounts") || "[]");
    const existing = accounts.find((a: { email: string }) => a.email === email);
    if (existing) {
      return new Response(JSON.stringify({ error: "Email already exists" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create via MockAuthProvider helpers
    const { createEmptyStudent } = await import("./mockData");
    const student = createEmptyStudent(email);
    accounts.push({ email, password, studentId: student.id });
    localStorage.setItem("mock_accounts", JSON.stringify(accounts));
    saveStudentData(student.id, student);

    return new Response(
      JSON.stringify({ success: true, studentId: student.id, wasPendingStudent: false }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(JSON.stringify({ error: "Not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
};
