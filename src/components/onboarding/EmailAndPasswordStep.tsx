import React, { memo } from "react";
import { Stack } from "@mui/material";
import { Box, WillowTypography, TextInput } from "@willow/ui-kit";
import OnboardingLayout from "./OnboardingLayout";
import useEmailAndPasswordStep from "../../hooks/onboarding/useEmailAndPasswordStep";

const EmailAndPasswordStep: React.FC = () => {
  const { isLoading, handleContinue } = useEmailAndPasswordStep();

  return (
    <OnboardingLayout currentStep={1} handleContinue={handleContinue} isLoading={isLoading}>
      <Box sx={{ textAlign: "left" }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: 500, mx: "auto" }}>
          <WillowTypography variant="display" color="primary">Welcome to Willow!</WillowTypography>
          <WillowTypography variant="body-lg" color="secondary" sx={{ mt: 1.5 }}>Let's set up your account.</WillowTypography>
        </Box>
        <Stack spacing={2} sx={{ mt: 4, width: "100%", maxWidth: 500, mx: "auto" }}>
          <TextInput label="Email" value="test@prototype.com" disabled />
          <TextInput label="Password" type="password" value="test123" disabled />
          <TextInput label="Confirm password" type="password" value="test123" disabled />
        </Stack>
      </Box>
    </OnboardingLayout>
  );
};

export default memo(EmailAndPasswordStep);
