import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useQueryClient } from "@tanstack/react-query";
import {
  journeyMomentAtom,
  recommendationStageAtom,
  prototypeActiveAtom,
  miniplayerOpenAtom,
  JourneyMoment,
  RecommendationStage,
} from "../../state/prototypeAtoms";
import { createEmptyStudent } from "../../mock/mockData";
import { saveStudentData } from "../../mock/MockAuthProvider";

const MOMENT_LABELS: Record<JourneyMoment, string> = {
  "lesson-1": "Lesson 1",
  "lesson-2": "Lesson 2",
  "post-onboarding-lesson1": "Post: L1 Only",
  "post-onboarding-lesson2": "Post: L1 + L2",
  "post-onboarding-gpc": "Post: Full (GPC)",
};

const MOMENT_ROUTES: Record<JourneyMoment, string> = {
  "lesson-1": "/signup",
  "lesson-2": "/student/onboarding/quiz-placeholder",
  "post-onboarding-lesson1": "/student/home",
  "post-onboarding-lesson2": "/student/home",
  "post-onboarding-gpc": "/student/home",
};

const REC_STAGES: { id: RecommendationStage; label: string; short: string }[] = [
  { id: "interest-only", label: "Interest Tags", short: "Interests" },
  { id: "interest-personality", label: "Interest + Personality", short: "+ Personality" },
  { id: "interest-personality-gpc", label: "Interest + Personality + GPC", short: "+ GPC" },
];

const setupStudentForMoment = (studentId: string, moment: JourneyMoment) => {
  const data = JSON.parse(localStorage.getItem(`mock_student_${studentId}`) || "{}");
  const base = {
    firstName: "Test",
    lastName: "Student",
    schoolId: "school-1",
    gradeLevel: "11th Grade",
    myWhy: "I want to find a career that lets me help people and be creative.",
  };

  switch (moment) {
    case "lesson-2":
      Object.assign(data, base, {
        onboardingState: "quiz-start",
        onboardingStage: 7,
        setupComplete: false,
        quizComplete: false,
        personalFeedback: [
          { questionText: "Career clarity", score: 6, submittedOn: new Date().toISOString(), questionId: 1 },
          { questionText: "Preparedness", score: 5, submittedOn: new Date().toISOString(), questionId: 2 },
        ],
      });
      break;
    case "post-onboarding-lesson1":
      Object.assign(data, base, {
        onboardingState: "complete",
        onboardingStage: 8,
        setupComplete: true,
        quizComplete: false,
        pressingChallengesComplete: false,
        personalityType: "",
      });
      break;
    case "post-onboarding-lesson2":
      Object.assign(data, base, {
        onboardingState: "complete",
        onboardingStage: 8,
        setupComplete: true,
        quizComplete: true,
        pressingChallengesComplete: false,
        personalityType: "SOCIAL_AGREEABLENESS",
      });
      break;
    case "post-onboarding-gpc":
      Object.assign(data, base, {
        onboardingState: "complete",
        onboardingStage: 8,
        setupComplete: true,
        quizComplete: true,
        pressingChallengesComplete: true,
        personalityType: "SOCIAL_AGREEABLENESS",
        pressingChallengeScores: [
          { id: "gpc-1", score: 4 },
          { id: "gpc-2", score: 3 },
          { id: "gpc-3", score: 5 },
        ],
      });
      break;
    default:
      break;
  }
  localStorage.setItem(`mock_student_${studentId}`, JSON.stringify(data));
};

const ensureTestUser = (): string => {
  const accounts = JSON.parse(localStorage.getItem("mock_accounts") || "[]");
  let testAccount = accounts.find((a: { email: string }) => a.email === "test@willow.co");

  if (!testAccount) {
    const student = createEmptyStudent("test@willow.co");
    testAccount = { email: "test@willow.co", password: "test1234", studentId: student.id };
    accounts.push(testAccount);
    localStorage.setItem("mock_accounts", JSON.stringify(accounts));
    saveStudentData(student.id, student);
  }

  localStorage.setItem(
    "mock_current_user",
    JSON.stringify({ uid: testAccount.studentId, email: testAccount.email })
  );

  return testAccount.studentId;
};

const PrototypeToolbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [journeyMoment, setJourneyMoment] = useRecoilState(journeyMomentAtom);
  const [recStage, setRecStage] = useRecoilState(recommendationStageAtom);
  const [prototypeActive, setPrototypeActive] = useRecoilState(prototypeActiveAtom);
  const [miniplayerOpen, setMiniplayerOpen] = useRecoilState(miniplayerOpenAtom);
  const queryClient = useQueryClient();

  const isHomepage = location.pathname === "/prototype";

  const handleMomentSwitch = async (moment: JourneyMoment) => {
    if (moment === "lesson-1") {
      setJourneyMoment(moment);
      navigate(MOMENT_ROUTES[moment]);
      return;
    }

    const studentId = ensureTestUser();
    setupStudentForMoment(studentId, moment);
    setJourneyMoment(moment);

    // Set appropriate rec stage
    if (moment === "post-onboarding-lesson1") setRecStage("interest-only");
    if (moment === "post-onboarding-lesson2") setRecStage("interest-personality");
    if (moment === "post-onboarding-gpc") setRecStage("interest-personality-gpc");

    await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
    window.location.href = MOMENT_ROUTES[moment];
  };

  const handleRecStageChange = async (stage: RecommendationStage) => {
    setRecStage(stage);

    // Also update student data to match
    const currentUser = JSON.parse(localStorage.getItem("mock_current_user") || "null");
    if (!currentUser) return;

    const data = JSON.parse(localStorage.getItem(`mock_student_${currentUser.uid}`) || "{}");

    switch (stage) {
      case "interest-only":
        Object.assign(data, {
          quizComplete: false,
          pressingChallengesComplete: false,
          personalityType: "",
          pressingChallengeScores: [],
        });
        break;
      case "interest-personality":
        Object.assign(data, {
          quizComplete: true,
          pressingChallengesComplete: false,
          personalityType: "SOCIAL_AGREEABLENESS",
          pressingChallengeScores: [],
        });
        break;
      case "interest-personality-gpc":
        Object.assign(data, {
          quizComplete: true,
          pressingChallengesComplete: true,
          personalityType: "SOCIAL_AGREEABLENESS",
          pressingChallengeScores: [
            { id: "gpc-1", score: 4 },
            { id: "gpc-2", score: 3 },
            { id: "gpc-3", score: 5 },
          ],
        });
        break;
    }

    localStorage.setItem(`mock_student_${currentUser.uid}`, JSON.stringify(data));
    await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
  };

  const handleReset = () => {
    setJourneyMoment(null);
    setRecStage("interest-only");
    setPrototypeActive(false);
    if (location.pathname !== "/prototype") {
      navigate("/prototype");
    }
  };

  return (
    <div style={styles.bar}>
      <div style={styles.inner}>
        {/* Left: Current state + Reset */}
        <div style={styles.leftGroup}>
          <div style={styles.logo}>PROTOTYPE</div>
          {journeyMoment && (
            <div style={styles.currentBadge}>
              {MOMENT_LABELS[journeyMoment]}
            </div>
          )}
          <button onClick={handleReset} style={styles.resetBtn}>
            Reset
          </button>
          <button
            onClick={() => setMiniplayerOpen(!miniplayerOpen)}
            style={{
              ...styles.resetBtn,
              ...(miniplayerOpen ? { borderColor: "#6366f1", color: "#6366f1" } : {}),
            }}
          >
            Slides
          </button>
        </div>

        {/* Center: Journey moment switcher */}
        <div style={styles.centerGroup}>
          <span style={styles.groupLabel}>Jump to:</span>
          <div style={styles.segmented}>
            {(Object.keys(MOMENT_LABELS) as JourneyMoment[]).map((id) => (
              <button
                key={id}
                onClick={() => handleMomentSwitch(id)}
                style={{
                  ...styles.segBtn,
                  ...(journeyMoment === id ? styles.segBtnActive : {}),
                }}
              >
                {MOMENT_LABELS[id]}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Recommendation stage selector */}
        <div style={styles.rightGroup}>
          <span style={styles.groupLabel}>Rec data:</span>
          <div style={styles.recSwitcher}>
            {REC_STAGES.map((stage) => (
              <button
                key={stage.id}
                onClick={() => handleRecStageChange(stage.id)}
                style={{
                  ...styles.recBtn,
                  ...(recStage === stage.id ? styles.recBtnActive : {}),
                }}
                title={stage.label}
              >
                {stage.short}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  bar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: 44,
    background: "#111",
    zIndex: 99999,
    display: "flex",
    alignItems: "center",
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Mono", Monaco, monospace',
    fontSize: 12,
    borderBottom: "1px solid #333",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "0 16px",
    gap: 16,
  },
  leftGroup: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
  },
  logo: {
    color: "#888",
    fontWeight: 700,
    fontSize: 10,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
  },
  currentBadge: {
    background: "#6366f1",
    color: "#fff",
    padding: "2px 10px",
    borderRadius: 100,
    fontSize: 11,
    fontWeight: 600,
    whiteSpace: "nowrap" as const,
  },
  resetBtn: {
    background: "transparent",
    border: "1px solid #555",
    color: "#aaa",
    borderRadius: 4,
    padding: "3px 10px",
    cursor: "pointer",
    fontSize: 11,
    fontFamily: "inherit",
    transition: "border-color 0.15s, color 0.15s",
  },
  centerGroup: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flex: 1,
    justifyContent: "center",
    minWidth: 0,
  },
  groupLabel: {
    color: "#666",
    fontSize: 10,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    whiteSpace: "nowrap" as const,
    flexShrink: 0,
  },
  segmented: {
    display: "flex",
    background: "#222",
    borderRadius: 6,
    padding: 2,
    gap: 1,
  },
  segBtn: {
    background: "transparent",
    border: "none",
    color: "#999",
    padding: "4px 10px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 11,
    fontFamily: "inherit",
    whiteSpace: "nowrap" as const,
    transition: "background 0.12s, color 0.12s",
  },
  segBtnActive: {
    background: "#6366f1",
    color: "#fff",
    fontWeight: 600,
  },
  rightGroup: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
  },
  recSwitcher: {
    display: "flex",
    background: "#222",
    borderRadius: 6,
    padding: 2,
    gap: 1,
    border: "1px solid #f59e0b44",
  },
  recBtn: {
    background: "transparent",
    border: "none",
    color: "#999",
    padding: "4px 10px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 11,
    fontFamily: "inherit",
    whiteSpace: "nowrap" as const,
    transition: "background 0.12s, color 0.12s",
  },
  recBtnActive: {
    background: "#f59e0b",
    color: "#000",
    fontWeight: 600,
  },
};

export default PrototypeToolbar;
