import React, { memo } from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import { TextField, MenuItem, Autocomplete } from "@mui/material";
import OnboardingLayout from "./OnboardingLayout";
import useBasicInfoStep from "../../hooks/onboarding/useBasicInfoStep";
import { US_STATES } from "../../hooks/onboarding/useBasicInfoStep";

const GRADE_LEVELS = ["9th Grade", "10th Grade", "11th Grade", "12th Grade"];

const BasicInfoStep: React.FC = () => {
  const {
    firstName, lastName, city, usState, setUsState, gradeLevel, gpa,
    handleTextChange, handleContinue, handleBack, isLoading,
  } = useBasicInfoStep();

  return (
    <OnboardingLayout currentStep={2} handleContinue={handleContinue} handleBack={handleBack} isLoading={isLoading}>
      <Box component="form" sx={{ textAlign: "left" }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: 500, mx: "auto" }}>
          <WillowTypography variant="display" color="primary">
            {firstName ? `A little bit about you, ${firstName}` : "A little bit about you"}
          </WillowTypography>
        </Box>

        <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 500, mx: "auto" }}>
          <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
            <Box sx={{ flex: 1 }}>
              <WillowTypography variant="body" weight="semibold" color="primary" sx={{ mb: 1 }}>First name</WillowTypography>
              <TextField variant="outlined" name="firstName" fullWidth value={firstName} onChange={handleTextChange} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <WillowTypography variant="body" weight="semibold" color="primary" sx={{ mb: 1 }}>Last name</WillowTypography>
              <TextField variant="outlined" name="lastName" fullWidth value={lastName} onChange={handleTextChange} />
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
            <Box sx={{ flex: 1 }}>
              <WillowTypography variant="body" weight="semibold" color="primary" sx={{ mb: 1 }}>Grade level</WillowTypography>
              <TextField
                select variant="outlined" name="gradeLevel" fullWidth value={gradeLevel} onChange={handleTextChange}
              >
                {GRADE_LEVELS.map((grade) => (
                  <MenuItem key={grade} value={grade}>{grade}</MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ flex: 1 }}>
              <WillowTypography variant="body" weight="semibold" color="primary" sx={{ mb: 1 }}>GPA (optional)</WillowTypography>
              <TextField variant="outlined" name="gpa" fullWidth value={gpa} onChange={handleTextChange} />
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
            <Box sx={{ flex: 1 }}>
              <WillowTypography variant="body" weight="semibold" color="primary" sx={{ mb: 1 }}>City</WillowTypography>
              <TextField variant="outlined" name="city" fullWidth value={city} onChange={handleTextChange} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <WillowTypography variant="body" weight="semibold" color="primary" sx={{ mb: 1 }}>State</WillowTypography>
              <Autocomplete
                options={US_STATES}
                value={usState || null}
                onChange={(_event, newValue) => setUsState(newValue || "")}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" placeholder="Start typing to search..." />
                )}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </OnboardingLayout>
  );
};

export default memo(BasicInfoStep);
