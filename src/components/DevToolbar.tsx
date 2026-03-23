import React, { useState } from "react";
import { useCurrentStudentData } from "../hooks/useCurrentStudent";
import { createEmptyStudent } from "../mock/mockData";
import { saveStudentData } from "../mock/MockAuthProvider";

const DevToolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { student } = useCurrentStudentData();

  const resetOnboarding = () => {
    if (!student?.id) return;
    const fresh = createEmptyStudent(student.email);
    fresh.id = student.id;
    fresh.createdAt = student.createdAt;
    saveStudentData(student.id, fresh);
    window.location.replace("/student/onboarding/signup");
  };

  const getSavedAccounts = (): { email: string; studentId: string }[] => {
    try {
      const accounts = JSON.parse(localStorage.getItem("mock_accounts") || "[]");
      return accounts.map((a: { email: string; studentId: string }) => ({ email: a.email, studentId: a.studentId }));
    } catch {
      return [];
    }
  };

  const switchUser = (account: { email: string; studentId: string }) => {
    localStorage.setItem("mock_current_user", JSON.stringify({ uid: account.studentId, email: account.email }));
    window.location.reload();
  };

  return (
    <div style={{
      position: "fixed",
      bottom: 8,
      right: 8,
      zIndex: 9999,
      fontFamily: "monospace",
      fontSize: 11,
    }}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: "#1a1a2e",
            color: "#0ff",
            border: "1px solid #0ff",
            borderRadius: 6,
            padding: "6px 12px",
            cursor: "pointer",
            fontSize: 11,
          }}
        >
          Dev Tools
        </button>
      ) : (
        <div style={{
          background: "#1a1a2e",
          color: "#e0e0e0",
          border: "1px solid #333",
          borderRadius: 8,
          padding: 12,
          width: 280,
          maxHeight: 420,
          overflow: "auto",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ color: "#0ff", fontWeight: "bold" }}>Dev Toolbar</span>
            <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 14 }}>X</button>
          </div>

          {/* State Inspector */}
          <div style={{ background: "#111", borderRadius: 4, padding: 6, marginBottom: 8, fontSize: 10 }}>
            {student ? (
              <>
                <div><span style={{ color: "#888" }}>state:</span> <span style={{ color: "#0f0" }}>{student.onboardingState || "N/A"}</span></div>
                <div><span style={{ color: "#888" }}>stage:</span> <span style={{ color: "#0f0" }}>{student.onboardingStage}</span></div>
                <div><span style={{ color: "#888" }}>quiz:</span> <span style={{ color: student.quizComplete ? "#0f0" : "#f55" }}>{String(student.quizComplete)}</span></div>
                <div><span style={{ color: "#888" }}>setup:</span> <span style={{ color: student.setupComplete ? "#0f0" : "#f55" }}>{String(student.setupComplete)}</span></div>
                <div><span style={{ color: "#888" }}>email:</span> {student.email}</div>
              </>
            ) : (
              <div><span style={{ color: "#f90" }}>Not logged in</span></div>
            )}
          </div>

          {/* Reset - only when logged in */}
          {student && (
            <button
              onClick={resetOnboarding}
              style={{
                background: "#3a1a1a",
                color: "#f88",
                border: "1px solid #f55",
                borderRadius: 4,
                padding: "4px 8px",
                cursor: "pointer",
                width: "100%",
                marginBottom: 8,
                fontSize: 10,
              }}
            >
              Reset Onboarding
            </button>
          )}

          {/* Switch User - always visible */}
          <div>
            <div style={{ color: "#888", marginBottom: 4 }}>Saved Accounts:</div>
            {getSavedAccounts().length === 0 ? (
              <div style={{ color: "#666", fontSize: 10 }}>No accounts yet. Sign up to create one.</div>
            ) : (
              getSavedAccounts().map((account, i) => (
                <button
                  key={i}
                  onClick={() => switchUser(account)}
                  style={{
                    background: student?.email === account.email ? "#1a3a1a" : "#222",
                    color: "#ddd",
                    border: "1px solid #444",
                    borderRadius: 3,
                    padding: "3px 6px",
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                    marginBottom: 2,
                    fontSize: 10,
                  }}
                >
                  {account.email} {student?.email === account.email ? "(current)" : ""}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DevToolbar;
