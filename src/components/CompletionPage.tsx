import React from "react";
import { Box, essentials, Slate, TextButton, WillowTypography } from "@willow/ui-kit";
import { AppBar, Toolbar } from "@mui/material";
import useLogout from "../hooks/useLogout";
import { useCurrentStudentData } from "../hooks/useCurrentStudent";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { studentService } from "../mock/mockServices";
import { createEmptyStudent } from "../mock/mockData";
import { saveStudentData } from "../mock/MockAuthProvider";
import { useRecoilValue } from "recoil";
import { prototypeActiveAtom, recommendationStageAtom } from "../state/prototypeAtoms";

const CompletionPage: React.FC = () => {
  const { logout } = useLogout();
  const { student } = useCurrentStudentData();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const prototypeActive = useRecoilValue(prototypeActiveAtom);
  const recStage = useRecoilValue(recommendationStageAtom);
  const toolbarOffset = prototypeActive ? 44 : 0;

  const handleRestart = async () => {
    if (!student?.id) return;
    // Reset student to initial state
    const fresh = createEmptyStudent(student.email);
    fresh.id = student.id;
    fresh.createdAt = student.createdAt;
    saveStudentData(student.id, fresh);
    await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
    navigate("/student/onboarding/personal-info", { replace: true });
  };

  const handleMarkComplete = async () => {
    if (!student?.id) return;
    await studentService.updateStudentGoldenPath(student.id, {
      setupComplete: true,
      onboardingState: "complete",
    });
    await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: Slate[25], px: 2, pt: `${toolbarOffset}px` }}>
      <AppBar position="static" sx={{ bgcolor: "transparent", boxShadow: "none", border: "none", py: 2 }}>
        <Toolbar sx={{ justifyContent: "space-between", display: "flex", alignItems: "center" }}>
          <Box sx={{ height: 48, width: 48 }}>
            <img src="/static/images/branding/willow-bare-icon.svg" alt="Willow Logo" width="100%" height="100%" />
          </Box>
          <TextButton variant="ghost" onClick={logout}>Log Out</TextButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Box sx={{ bgcolor: essentials.white, borderRadius: "12px", boxShadow: "0px 2px 8px -1px rgba(16, 24, 40, 0.08)", p: 7, maxWidth: 600, width: "100%", textAlign: "center" }}>
          <WillowTypography variant="display" color="primary">Onboarding Complete!</WillowTypography>
          <WillowTypography variant="body" color="secondary" sx={{ mt: 2 }}>
            {student?.firstName ? `Congratulations, ${student.firstName}!` : "Congratulations!"} You've successfully completed the onboarding flow.
          </WillowTypography>
          <WillowTypography variant="body" color="muted" sx={{ mt: 1 }}>
            Personality type: {student?.personalityType || "N/A"} | Income bracket: {student?.incomeBracket || "N/A"}
          </WillowTypography>

          {prototypeActive && (
            <Box sx={{
              mt: 2,
              p: 2,
              bgcolor: "#f8f8ff",
              borderRadius: "8px",
              border: "1px dashed #c7c7f5",
            }}>
              <WillowTypography variant="body" sx={{ fontSize: 13, fontWeight: 600, color: "#6366f1" }}>
                Recommendation Data Sources
              </WillowTypography>
              <Box sx={{ mt: 1, display: "flex", gap: 1, justifyContent: "center", flexWrap: "wrap" }}>
                <Box sx={{
                  px: 1.5, py: 0.5, borderRadius: 100, fontSize: 12, fontWeight: 600,
                  bgcolor: "#e0ffe0", color: "#1a7a1a",
                }}>
                  Interest Tags
                </Box>
                <Box sx={{
                  px: 1.5, py: 0.5, borderRadius: 100, fontSize: 12, fontWeight: 600,
                  bgcolor: recStage === "interest-personality" || recStage === "interest-personality-gpc" ? "#e0e0ff" : "#f0f0f0",
                  color: recStage === "interest-personality" || recStage === "interest-personality-gpc" ? "#4a4ac7" : "#aaa",
                }}>
                  {student?.personalityType ? `Personality: ${student.personalityType}` : "Personality (not taken)"}
                </Box>
                <Box sx={{
                  px: 1.5, py: 0.5, borderRadius: 100, fontSize: 12, fontWeight: 600,
                  bgcolor: recStage === "interest-personality-gpc" ? "#fff3e0" : "#f0f0f0",
                  color: recStage === "interest-personality-gpc" ? "#c77a00" : "#aaa",
                }}>
                  {student?.pressingChallengesComplete ? "GPC Ratings" : "GPC (not completed)"}
                </Box>
              </Box>
            </Box>
          )}

          <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <TextButton variant="primary" onClick={handleRestart}>Restart Onboarding</TextButton>
            <TextButton variant="secondary" onClick={logout}>Log Out</TextButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CompletionPage;
