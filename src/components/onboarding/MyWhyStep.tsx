import React, { memo } from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import { TextField } from "@mui/material";
import OnboardingLayout from "./OnboardingLayout";
import useMyWhyStep from "../../hooks/onboarding/useMyWhyStep";

const MyWhyStep: React.FC = () => {
  const { myWhy, setMyWhy, error, handleContinue, handleBack, handleBlur, studentName, isLoading } = useMyWhyStep();

  return (
    <OnboardingLayout currentStep={3} handleContinue={handleContinue} handleBack={handleBack} isLoading={isLoading}>
      <Box component="form" sx={{ textAlign: "left" }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: 500, mx: "auto" }}>
          <WillowTypography variant="display" color="primary">
            Why is it important to you to make a great next step after high school?
          </WillowTypography>
        </Box>

        <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 500, mx: "auto" }}>
          <TextField
            placeholder="For example, to find a great career, to make a difference in the world, to support your family, etc."
            multiline rows={6} variant="outlined" fullWidth
            value={myWhy} onChange={(e) => setMyWhy(e.target.value)}
            onBlur={handleBlur} error={error}
            helperText={error ? "This field is required." : ""}
            required
          />
        </Box>
      </Box>
    </OnboardingLayout>
  );
};

export default memo(MyWhyStep);
