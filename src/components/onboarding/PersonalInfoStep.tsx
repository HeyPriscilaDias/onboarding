import React, { memo } from "react";
import { Stack, TextField, MenuItem, Autocomplete } from "@mui/material";
import { Box, WillowTypography, TextInput, TextButton, CircularProgress } from "@willow/ui-kit";
import OnboardingLayout from "./OnboardingLayout";
import useBasicInfoStep from "../../hooks/onboarding/useBasicInfoStep";
import { US_STATES } from "../../hooks/onboarding/useBasicInfoStep";

const DOT_BG_STYLE = {
  backgroundColor: "#F5F5F6",
  backgroundImage: "radial-gradient(circle, #C9C9CC 1px, transparent 1px)",
  backgroundSize: "22px 22px",
};

const GRADE_LEVELS = ["9th Grade", "10th Grade", "11th Grade", "12th Grade"];

const BasicInfoStep: React.FC = () => {
  const { firstName, lastName, gradeLevel, city, usState, setUsState, handleTextChange, handleContinue, handleBack, isLoading } = useBasicInfoStep();

  return (
    <OnboardingLayout currentStep={2} fullBleed bgStyle={DOT_BG_STYLE}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", flex: 1, py: 6 }}>
        <Box sx={{ mb: 2.5, width: 56, height: 56 }}>
          <img src="/static/images/branding/willow-bare-icon.svg" alt="Willow" width="100%" height="100%" />
        </Box>

        <WillowTypography variant="display" sx={{ textAlign: "center", mb: 0.75 }}>
          Tell us about yourself
        </WillowTypography>
        <WillowTypography variant="body" color="secondary" sx={{ textAlign: "center", mb: 4 }}>
          We'll use this to personalize your experience and find opportunities near you.
        </WillowTypography>

        <Stack spacing={2} sx={{ width: "100%", maxWidth: 360 }}>
          <TextInput label="First name" name="firstName" value={firstName} onChange={handleTextChange} />
          <TextInput label="Last name" name="lastName" value={lastName} onChange={handleTextChange} />

          <Box>
            <WillowTypography variant="body" weight="semibold" color="primary" sx={{ mb: 1 }}>Grade level</WillowTypography>
            <TextField select variant="outlined" name="gradeLevel" fullWidth value={gradeLevel} onChange={handleTextChange} size="small">
              {GRADE_LEVELS.map((grade) => (
                <MenuItem key={grade} value={grade}>{grade}</MenuItem>
              ))}
            </TextField>
          </Box>

          <TextInput label="City" name="city" value={city} onChange={handleTextChange} />

          <Box>
            <WillowTypography variant="body" weight="semibold" color="primary" sx={{ mb: 1 }}>State</WillowTypography>
            <Autocomplete
              options={US_STATES}
              value={usState || null}
              onChange={(_event, newValue) => setUsState(newValue || "")}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" placeholder="Start typing to search..." size="small" />
              )}
            />
          </Box>

          <TextButton variant="primary" onClick={handleContinue} disabled={isLoading} fullWidth sx={{ mt: 1 }}>
            {isLoading ? <CircularProgress size={20} color="inherit" /> : "Continue"}
          </TextButton>
          <TextButton variant="ghost" onClick={handleBack} fullWidth>
            Back
          </TextButton>
        </Stack>
      </Box>
    </OnboardingLayout>
  );
};

export default memo(BasicInfoStep);
