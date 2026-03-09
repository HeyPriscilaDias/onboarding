import React, { memo } from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import OnboardingLayout from "./OnboardingLayout";
import useWelcomeStep from "../../hooks/onboarding/useWelcomeStep";

const WelcomeStep: React.FC = () => {
  const { handleContinue, handleBack, isLoading } = useWelcomeStep();

  return (
    <OnboardingLayout currentStep={2} handleContinue={handleContinue} handleBack={handleBack} isLoading={isLoading}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: 500, mx: "auto" }}>
        <WillowTypography variant="display" color="primary">
          Welcome to Willow
        </WillowTypography>

        <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          <WillowTypography variant="body">
            Willow is here to help you explore careers, discover your strengths, and start planning for life after high school. Think of it as your personal guide to figuring out what comes next.
          </WillowTypography>

          <WillowTypography variant="body">
            Over the next few minutes, we'll ask you a few quick questions to get to know you better. There are no right or wrong answers — this is all about you.
          </WillowTypography>

          <WillowTypography variant="body">
            Ready? Let's get started.
          </WillowTypography>
        </Box>
      </Box>
    </OnboardingLayout>
  );
};

export default memo(WelcomeStep);
