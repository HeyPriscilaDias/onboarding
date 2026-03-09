import React, { memo } from "react";
import { Box, CircularProgress, TextButton, WillowTypography } from "@willow/ui-kit";
import OnboardingLayout from "./OnboardingLayout";
import useThankYouStep from "../../hooks/onboarding/useThankYouStep";

const ThankYouStep: React.FC = () => {
  const { handleExplore, handleBack, isLoading } = useThankYouStep();

  return (
    <OnboardingLayout currentStep={5} handleBack={handleBack}>
      <Box sx={{ textAlign: "center", mt: 4, width: "100%", maxWidth: 600, mx: "auto" }}>
        <WillowTypography variant="display">You're all set!</WillowTypography>
        <WillowTypography variant="body" color="secondary" sx={{ mt: 1.5 }}>
          Based on your interests, we've started building career recommendations for you. Explore the platform to see what's out there.
        </WillowTypography>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <TextButton variant="primary" onClick={handleExplore} disabled={isLoading} sx={{ minWidth: 240, minHeight: 44 }}>
            {isLoading ? <CircularProgress size={20} color="inherit" /> : "Explore Willow"}
          </TextButton>
        </Box>
      </Box>
    </OnboardingLayout>
  );
};

export default memo(ThankYouStep);
