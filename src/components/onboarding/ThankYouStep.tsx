import React, { memo } from "react";
import { Box, CircularProgress, TextButton, WillowTypography } from "@willow/ui-kit";
import OnboardingLayout from "./OnboardingLayout";
import useThankYouStep from "../../hooks/onboarding/useThankYouStep";

const ThankYouStep: React.FC = () => {
  const { handleContinueToQuiz, handleBack, isLoading } = useThankYouStep();

  return (
    <OnboardingLayout currentStep={7} handleBack={handleBack}>
      <Box sx={{ textAlign: "center", mt: 4, width: "100%", maxWidth: 600, mx: "auto" }}>
        <WillowTypography variant="display" color="primary">Thank you for signing up!</WillowTypography>
        <WillowTypography variant="body" color="muted" sx={{ mt: 1.5 }}>
          We'll use the data you just shared to tailor the best career paths, programs, and college recommendations for you.
        </WillowTypography>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <TextButton variant="primary" onClick={handleContinueToQuiz} disabled={isLoading} sx={{ minWidth: 240, minHeight: 44 }}>
            {isLoading ? <CircularProgress size={20} color="inherit" /> : "Continue to Personality Quiz"}
          </TextButton>
        </Box>
      </Box>
    </OnboardingLayout>
  );
};

export default memo(ThankYouStep);
