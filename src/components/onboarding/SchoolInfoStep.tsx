import React, { memo, useMemo } from "react";
import { TextField } from "@mui/material";
import { Box, Select, WillowTypography } from "@willow/ui-kit";
import OnboardingLayout from "./OnboardingLayout";
import useSchoolInfoStep from "../../hooks/onboarding/useSchoolInfoStep";

const SchoolInfoStep: React.FC = () => {
  const {
    handleContinue, handleBack, school, setSchool, gradeLevel, setGradeLevel,
    externalId, setExternalId, errors, handleBlur, gradeLevels, schools,
    isSchoolDisabled, isPendingStudent, isLoading,
  } = useSchoolInfoStep();

  const schoolOptions = useMemo(
    () => schools.map((s) => ({ value: s.id, label: s.name })),
    [schools],
  );

  const gradeLevelOptions = useMemo(
    () => gradeLevels.map((level) => ({ value: level, label: level })),
    [gradeLevels],
  );

  return (
    <OnboardingLayout currentStep={3} handleContinue={handleContinue} handleBack={handleBack} isLoading={isLoading}>
      <Box component="form" sx={{ textAlign: "left" }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: 500, mx: "auto" }}>
          <WillowTypography variant="display">Tell us about your school</WillowTypography>
          <WillowTypography variant="body" color="muted" sx={{ mt: 1.5 }}>
            {isPendingStudent
              ? "Your school has been set by your administrator."
              : "Provide details about your school to continue."}
          </WillowTypography>
        </Box>

        <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 500, mx: "auto" }}>
          <Box>
            <WillowTypography variant="body" weight="semibold" color="primary" sx={{ mb: 1 }}>Select school</WillowTypography>
            <Select
              value={school}
              onChange={(e) => setSchool(e.target.value as string)}
              onBlur={() => handleBlur("school")}
              options={schoolOptions}
              placeholder="Select School"
              error={errors.school}
              helperText={errors.school ? "School is required." : undefined}
              disabled={isSchoolDisabled}
              fullWidth
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2, mt: 1, flexDirection: { xs: "column", sm: "row" } }}>
            <Box sx={{ flex: 1 }}>
              <WillowTypography variant="body" weight="semibold" color="primary" sx={{ mb: 1 }}>Select grade level</WillowTypography>
              <Select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value as string)}
                onBlur={() => handleBlur("gradeLevel")}
                options={gradeLevelOptions}
                placeholder="Select Grade Level"
                error={errors.gradeLevel}
                helperText={errors.gradeLevel ? "Grade level is required." : undefined}
                fullWidth
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <WillowTypography variant="body" weight="semibold" color="primary" sx={{ mb: 1 }}>School ID (optional)</WillowTypography>
              <TextField
                variant="outlined" fullWidth value={externalId}
                onChange={(e) => setExternalId(e.target.value)}
                helperText="Enter your student ID if you have one."
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </OnboardingLayout>
  );
};

export default memo(SchoolInfoStep);
