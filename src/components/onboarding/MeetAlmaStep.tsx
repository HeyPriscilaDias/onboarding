import React, { memo } from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import OnboardingLayout from "./OnboardingLayout";
import useMeetAlmaStep from "../../hooks/onboarding/useMeetAlmaStep";

const MeetAlmaStep: React.FC = () => {
  const { handleContinue, handleBack, isLoading } = useMeetAlmaStep();

  return (
    <OnboardingLayout currentStep={3} handleContinue={handleContinue} handleBack={handleBack} isLoading={isLoading}>
      <Box sx={{ textAlign: "center", mt: 4, width: "100%", maxWidth: 500, mx: "auto" }}>
        <WillowTypography variant="display" color="primary">Say hello to Alma</WillowTypography>
        <WillowTypography variant="body" color="muted" sx={{ mt: 1.5 }}>
          Alma is your personal AI guide, here to help you reflect on your goals, explore career options, and think about your future. Whether you're figuring out what interests you or looking for the right path forward, Alma is always here when you need it.
        </WillowTypography>
      </Box>
    </OnboardingLayout>
  );
};

export default memo(MeetAlmaStep);
