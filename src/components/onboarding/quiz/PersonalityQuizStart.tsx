import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import PersonalityQuizLayout from "./PersonalityQuizLayout";
import { Box, TextButton, WillowTypography } from "@willow/ui-kit";
import { essentials, ui, neutral } from "@willow/ui-kit";

const PersonalityQuizStart: React.FC = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/student/onboarding/personality-quiz/take");
  };

  return (
    <PersonalityQuizLayout isStartPage={true}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 120px)",
          maxWidth: "800px",
          mx: "auto",
          px: 2,
          textAlign: "center",
        }}
        aria-labelledby="quiz-title"
      >
        <WillowTypography
          variant="display"
          sx={{ color: neutral[100], textAlign: "center", width: "100%" }}
          id="quiz-title"
        >
          Willow's personality quiz:
          <br />
          Where your journey
          <br />
          to self-discovery begins
        </WillowTypography>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <WillowTypography
            variant="body-lg"
            sx={{ backgroundColor: ui.mint, color: essentials.charcoal, p: 0.5 }}
          >
            There are no wrong answers!
          </WillowTypography>
        </Box>

        <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
          <WillowTypography variant="body-lg" sx={{ color: neutral[50] }}>
            The more honest you are, the more insightful your results will be.
          </WillowTypography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <TextButton variant="on-dark" sx={{ minWidth: 180 }} onClick={handleStartQuiz}>
            Start the Quiz
          </TextButton>
        </Box>
      </Box>
    </PersonalityQuizLayout>
  );
};

export default memo(PersonalityQuizStart);
