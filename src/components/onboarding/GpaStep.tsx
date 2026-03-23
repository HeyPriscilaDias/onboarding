import React, { memo } from "react";
import { Stack } from "@mui/material";
import { Box, WillowTypography, TextInput, TextButton, CircularProgress } from "@willow/ui-kit";
import OnboardingLayout from "./OnboardingLayout";
import useGpaStep from "../../hooks/onboarding/useGpaStep";

const DOT_BG_STYLE = {
  backgroundColor: "#F5F5F6",
  backgroundImage: "radial-gradient(circle, #C9C9CC 1px, transparent 1px)",
  backgroundSize: "22px 22px",
};

const GpaStep: React.FC = () => {
  const { gpa, handleTextChange, handleContinue, handleBack, isLoading } = useGpaStep();

  return (
    <OnboardingLayout currentStep={2} fullBleed bgStyle={DOT_BG_STYLE}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", flex: 1, py: 6 }}>
        <Box sx={{ mb: 2.5, width: 56, height: 56 }}>
          <img src="/static/images/branding/willow-bare-icon.svg" alt="Willow" width="100%" height="100%" />
        </Box>

        <WillowTypography variant="display" sx={{ textAlign: "center", mb: 0.75 }}>
          What's your GPA?
        </WillowTypography>
        <WillowTypography variant="body" color="secondary" sx={{ textAlign: "center", mb: 4 }}>
          This is optional — it helps us tailor scholarship and program recommendations for you.
        </WillowTypography>

        <Stack spacing={2} sx={{ width: "100%", maxWidth: 360 }}>
          <TextInput label="GPA (optional)" name="gpa" value={gpa} onChange={handleTextChange} placeholder="e.g. 3.5" />
          <TextButton variant="primary" onClick={handleContinue} disabled={isLoading} fullWidth sx={{ mt: 1 }}>
            {isLoading ? <CircularProgress size={20} color="inherit" /> : "Finish setup"}
          </TextButton>
          <TextButton variant="ghost" onClick={handleBack} fullWidth>
            Back
          </TextButton>
        </Stack>
      </Box>
    </OnboardingLayout>
  );
};

export default memo(GpaStep);
