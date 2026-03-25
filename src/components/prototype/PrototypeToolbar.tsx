import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  journeyMomentAtom,
  recommendationStageAtom,
  prototypeActiveAtom,
  miniplayerOpenAtom,
  stickyNotesVisibleAtom,
  addNoteRequestAtom,
} from "../../state/prototypeAtoms";
import { aiUseAgreementCompleteAtom } from "../../state/onboardingAtoms";
import { useCurrentStudentData } from "../../hooks/useCurrentStudent";
import { createEmptyStudent } from "../../mock/mockData";
import { saveStudentData } from "../../mock/MockAuthProvider";

const PrototypeToolbar: React.FC = () => {
  const navigate = useNavigate();
  const [, setJourneyMoment] = useRecoilState(journeyMomentAtom);
  const [, setRecStage] = useRecoilState(recommendationStageAtom);
  const [, setPrototypeActive] = useRecoilState(prototypeActiveAtom);
  const [miniplayerOpen, setMiniplayerOpen] = useRecoilState(miniplayerOpenAtom);
  const [stickyNotesVisible, setStickyNotesVisible] = useRecoilState(stickyNotesVisibleAtom);
  const setAddNoteRequest = useSetRecoilState(addNoteRequestAtom);
  const setAiAgreementComplete = useSetRecoilState(aiUseAgreementCompleteAtom);
  const { student } = useCurrentStudentData();

  const handleReset = () => {
    setJourneyMoment(null);
    setRecStage("interest-only");
    setPrototypeActive(false);
    setAiAgreementComplete(false);

    // Reset mock student data (quiz, career interests, survey, etc.)
    if (student?.id) {
      const fresh = createEmptyStudent(student.email);
      fresh.id = student.id;
      fresh.createdAt = student.createdAt;
      saveStudentData(student.id, fresh);
    }

    window.location.replace("/student/onboarding/signup");
  };

  return (
    <div style={styles.bar}>
      <div style={styles.inner}>
        {/* Left: Home + controls */}
        <div style={styles.leftGroup}>
          <button onClick={() => navigate("/prototype")} style={styles.homeBtn} title="Prototype home">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </button>
          <button onClick={handleReset} style={styles.resetBtn}>
            Reset
          </button>
          <button
            onClick={() => setMiniplayerOpen(!miniplayerOpen)}
            style={{
              ...styles.resetBtn,
              ...(miniplayerOpen ? styles.toggleActive : {}),
            }}
          >
            {miniplayerOpen ? "Hide Slides" : "Show Slides"}
          </button>
          <button
            onClick={() => setStickyNotesVisible(!stickyNotesVisible)}
            style={{
              ...styles.resetBtn,
              ...(stickyNotesVisible ? styles.toggleActive : {}),
            }}
          >
            {stickyNotesVisible ? "Hide Notes" : "Show Notes"}
          </button>
          <button
            onClick={() => {
              if (!stickyNotesVisible) setStickyNotesVisible(true);
              setAddNoteRequest((n) => n + 1);
            }}
            style={styles.resetBtn}
          >
            + Note
          </button>
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
  homeBtn: {
    background: "transparent",
    border: "none",
    color: "#aaa",
    cursor: "pointer",
    padding: "3px 4px",
    display: "flex",
    alignItems: "center",
    borderRadius: 4,
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
  toggleActive: {
    borderColor: "#6366f1",
    color: "#6366f1",
  },
};

export default PrototypeToolbar;
