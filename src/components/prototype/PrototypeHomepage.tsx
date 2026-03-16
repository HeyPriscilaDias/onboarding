import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useQueryClient } from "@tanstack/react-query";
import {
  journeyMomentAtom,
  recommendationStageAtom,
  prototypeActiveAtom,
  JourneyMoment,
  RecommendationStage,
} from "../../state/prototypeAtoms";
import { createEmptyStudent } from "../../mock/mockData";
import { saveStudentData } from "../../mock/MockAuthProvider";
import { useAuth } from "../../mock/MockAuthProvider";

const JOURNEY_MOMENTS: {
  id: JourneyMoment;
  title: string;
  description: string;
  route: string;
  recStage?: RecommendationStage;
  setupStudent?: (studentId: string) => void;
}[] = [
  {
    id: "lesson-1",
    title: "Lesson 1: Setup + Introduction",
    description:
      "Account setup, Willow intro, Alma intro, basic info collection, My Why/ROI, career interest tags, and the first landing on the platform with interest-based recommendations.",
    route: "/signup",
  },
  {
    id: "lesson-2",
    title: "Lesson 2: Personality Quiz",
    description:
      "Context-setting for the quiz, the quiz experience itself, immediate results showing personality type + superpowers, and career recommendations refined by personality + interest tags.",
    route: "/student/onboarding/quiz-placeholder",
    setupStudent: (studentId: string) => {
      const data = JSON.parse(localStorage.getItem(`mock_student_${studentId}`) || "{}");
      Object.assign(data, {
        onboardingState: "quiz-start",
        onboardingStage: 10,
        setupComplete: true,
        quizComplete: false,
        firstName: "Test",
        lastName: "Student",
        schoolId: "school-1",
        gradeLevel: "11th Grade",
        myWhy: "I want to find a career that lets me help people and be creative.",
        careerInterestTags: ["Healthcare", "Technology", "Science"],
      });
      localStorage.setItem(`mock_student_${studentId}`, JSON.stringify(data));
    },
  },
  {
    id: "post-onboarding-lesson1",
    title: "Homepage: Quiz Pending",
    description:
      "Onboarding checklist with Career Interests complete, Personality Quiz / Survey / AI Agreement still pending. Interest-only career recommendations with personality empty states.",
    route: "/student/home",
    recStage: "interest-only",
    setupStudent: (studentId: string) => {
      const data = JSON.parse(localStorage.getItem(`mock_student_${studentId}`) || "{}");
      Object.assign(data, {
        onboardingState: "complete",
        onboardingStage: 10,
        setupComplete: true,
        quizComplete: false,
        pressingChallengesComplete: false,
        personalityType: "",
        firstName: "Test",
        lastName: "Student",
        schoolId: "school-1",
        gradeLevel: "11th Grade",
        myWhy: "I want to find a career that lets me help people and be creative.",
        careerInterestTags: ["Healthcare", "Technology", "Science"],
      });
      localStorage.setItem(`mock_student_${studentId}`, JSON.stringify(data));
    },
  },
  {
    id: "post-onboarding-lesson2",
    title: "Homepage: Quiz Complete",
    description:
      "Checklist shows Personality Quiz + Career Interests done, Survey still pending. Full recommendations powered by interest tags + personality type with populated superpowers.",
    route: "/student/home",
    recStage: "interest-personality",
    setupStudent: (studentId: string) => {
      const data = JSON.parse(localStorage.getItem(`mock_student_${studentId}`) || "{}");
      Object.assign(data, {
        onboardingState: "complete",
        onboardingStage: 10,
        setupComplete: true,
        quizComplete: true,
        pressingChallengesComplete: false,
        personalityType: "SOCIAL_AGREEABLENESS",
        firstName: "Test",
        lastName: "Student",
        schoolId: "school-1",
        gradeLevel: "11th Grade",
        myWhy: "I want to find a career that lets me help people and be creative.",
        careerInterestTags: ["Healthcare", "Technology", "Science"],
      });
      localStorage.setItem(`mock_student_${studentId}`, JSON.stringify(data));
    },
  },
  {
    id: "post-onboarding-gpc",
    title: "Homepage: All Complete",
    description:
      "All checklist items done. Recommendations refined by interest tags + personality type + GPC ratings. Most complete view of the personalized experience.",
    route: "/student/home",
    recStage: "interest-personality-gpc",
    setupStudent: (studentId: string) => {
      const data = JSON.parse(localStorage.getItem(`mock_student_${studentId}`) || "{}");
      Object.assign(data, {
        onboardingState: "complete",
        onboardingStage: 10,
        setupComplete: true,
        quizComplete: true,
        pressingChallengesComplete: true,
        personalityType: "SOCIAL_AGREEABLENESS",
        pressingChallengeScores: [
          { id: "gpc-1", score: 4 },
          { id: "gpc-2", score: 3 },
          { id: "gpc-3", score: 5 },
        ],
        firstName: "Test",
        lastName: "Student",
        schoolId: "school-1",
        gradeLevel: "11th Grade",
        myWhy: "I want to find a career that lets me help people and be creative.",
        careerInterestTags: ["Healthcare", "Technology", "Science"],
        personalFeedback: [
          { questionText: "How clear are you on what you want your career and life after high school to be like?", score: 7, submittedOn: new Date().toISOString(), questionId: 1 },
          { questionText: "How prepared do you feel for life after high school?", score: 6, submittedOn: new Date().toISOString(), questionId: 2 },
        ],
      });
      localStorage.setItem(`mock_student_${studentId}`, JSON.stringify(data));
    },
  },
];

const ensureTestUser = (createEmailUser: (args: { email: string; password: string }) => Promise<string | undefined>): string => {
  const accounts = JSON.parse(localStorage.getItem("mock_accounts") || "[]");
  let testAccount = accounts.find((a: { email: string }) => a.email === "test@willow.co");

  if (!testAccount) {
    const student = createEmptyStudent("test@willow.co");
    testAccount = { email: "test@willow.co", password: "test1234", studentId: student.id };
    accounts.push(testAccount);
    localStorage.setItem("mock_accounts", JSON.stringify(accounts));
    saveStudentData(student.id, student);
  }

  // Auto-login
  localStorage.setItem(
    "mock_current_user",
    JSON.stringify({ uid: testAccount.studentId, email: testAccount.email })
  );

  return testAccount.studentId;
};

const PrototypeHomepage: React.FC = () => {
  const navigate = useNavigate();
  const setJourneyMoment = useSetRecoilState(journeyMomentAtom);
  const setRecStage = useSetRecoilState(recommendationStageAtom);
  const setPrototypeActive = useSetRecoilState(prototypeActiveAtom);
  const { createEmailUser } = useAuth();
  const queryClient = useQueryClient();

  const handleSelect = async (moment: (typeof JOURNEY_MOMENTS)[number]) => {
    // For Lesson 1 (signup flow), just navigate directly — no test user needed
    if (moment.id === "lesson-1") {
      setJourneyMoment(moment.id);
      setPrototypeActive(true);
      if (moment.recStage) setRecStage(moment.recStage);
      navigate(moment.route);
      return;
    }

    // For all other moments, ensure test user exists and configure state
    const studentId = ensureTestUser(createEmailUser);

    if (moment.setupStudent) {
      moment.setupStudent(studentId);
    }

    if (moment.recStage) {
      setRecStage(moment.recStage);
    }

    setJourneyMoment(moment.id);
    setPrototypeActive(true);

    await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });

    // Force auth reload so MockAuthProvider picks up the new user
    window.location.href = moment.route;
  };

  return (
    <div style={styles.page}>
      <div style={styles.twoCol}>
        {/* Left column — intro text */}
        <div style={styles.leftCol}>
          <h1 style={styles.title}>Willow Onboarding Prototype</h1>
          <p style={styles.subtitle}>
            Select a journey moment to preview. Each option drops you into a specific point in the
            student experience so you can test individual moments without clicking through
            everything.
          </p>
        </div>

        {/* Right column — scrollable moments list */}
        <div style={styles.rightCol}>
          {/* Onboarding Lessons */}
          <div style={styles.section}>
            <div style={styles.sectionLabel}>Onboarding Lessons</div>
            {JOURNEY_MOMENTS.filter((m) => m.id.startsWith("lesson")).map((moment) => (
              <button
                key={moment.id}
                onClick={() => handleSelect(moment)}
                style={styles.card}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#6366f1";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 4px 12px rgba(99,102,241,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#e2e2e2";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                <div style={styles.cardTitle}>{moment.title}</div>
                <div style={styles.cardDesc}>{moment.description}</div>
                <div style={styles.cardArrow}>&rarr;</div>
              </button>
            ))}
          </div>

          {/* Post-Onboarding States */}
          <div style={styles.section}>
            <div style={styles.sectionLabel}>Post-Onboarding Platform States</div>
            {JOURNEY_MOMENTS.filter((m) => m.id.startsWith("post")).map((moment) => (
              <button
                key={moment.id}
                onClick={() => handleSelect(moment)}
                style={styles.card}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#6366f1";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 4px 12px rgba(99,102,241,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#e2e2e2";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                <div style={styles.cardTitle}>{moment.title}</div>
                <div style={styles.cardDesc}>{moment.description}</div>
                {moment.recStage && (
                  <div style={styles.recBadge}>
                    {moment.recStage === "interest-only" && "Interests only"}
                    {moment.recStage === "interest-personality" && "Interests + Personality"}
                    {moment.recStage === "interest-personality-gpc" && "Interests + Personality + GPC"}
                  </div>
                )}
                <div style={styles.cardArrow}>&rarr;</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    height: "100vh",
    background: "#fafafa",
    display: "flex",
    justifyContent: "center",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  twoCol: {
    display: "flex",
    maxWidth: 1000,
    width: "100%",
    height: "100%",
  },
  leftCol: {
    width: "40%",
    paddingTop: 80,
    paddingRight: 32,
  },
  rightCol: {
    width: "60%",
    overflowY: "auto" as const,
    paddingTop: 80,
    paddingBottom: 48,
    paddingLeft: 24,
    display: "flex",
    flexDirection: "column" as const,
    gap: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: "#111",
    margin: "0 0 12px 0",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    lineHeight: 1.6,
    margin: 0,
  },
  section: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    color: "#999",
    marginBottom: 4,
  },
  card: {
    background: "#fff",
    border: "1px solid #e2e2e2",
    borderRadius: 10,
    padding: "20px 24px",
    textAlign: "left" as const,
    cursor: "pointer",
    position: "relative" as const,
    transition: "border-color 0.15s, box-shadow 0.15s",
    display: "block",
    width: "100%",
    fontFamily: "inherit",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "#111",
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 13,
    color: "#666",
    lineHeight: 1.5,
    paddingRight: 32,
  },
  cardArrow: {
    position: "absolute" as const,
    right: 20,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 20,
    color: "#ccc",
  },
  recBadge: {
    display: "inline-block",
    marginTop: 8,
    padding: "3px 10px",
    borderRadius: 100,
    fontSize: 11,
    fontWeight: 600,
    background: "#f0f0ff",
    color: "#6366f1",
  },
};

export default PrototypeHomepage;
