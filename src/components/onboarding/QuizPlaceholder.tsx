import React from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentStudent } from "../../hooks/useCurrentStudent";
import { studentService } from "../../mock/mockServices";
import { Box, essentials, Slate, TextButton, WillowTypography } from "@willow/ui-kit";
import { AppBar, Toolbar } from "@mui/material";
import useLogout from "../../hooks/useLogout";

const QuizPlaceholder: React.FC = () => {
  const navigate = useNavigate();
  const { data: student, refetch } = useCurrentStudent();
  const queryClient = useQueryClient();
  const { logout } = useLogout();

  const handleContinue = async () => {
    if (!student?.id) return;
    await studentService.updateStudentGoldenPath(student.id, {
      quizComplete: true,
      pressingChallengesComplete: true,
      personalityType: "Explorer",
      onboardingState: "complete",
      onboardingStage: 8,
    });
    await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
    await refetch();
    navigate("/student/home", { replace: true });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: Slate[25], px: 2 }}>
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
          <WillowTypography variant="display" color="primary">Personality Quiz</WillowTypography>
          <WillowTypography variant="body" color="secondary" sx={{ mt: 2 }}>
            (Skipped in test mode)
          </WillowTypography>
          <WillowTypography variant="body" color="muted" sx={{ mt: 1 }}>
            Clicking Continue will set quizComplete and pressingChallengesComplete to true, then navigate to personalization.
          </WillowTypography>
          <TextButton variant="primary" onClick={handleContinue} sx={{ mt: 4, minWidth: 200 }}>
            Continue
          </TextButton>
        </Box>
      </Box>
    </Box>
  );
};

export default QuizPlaceholder;
