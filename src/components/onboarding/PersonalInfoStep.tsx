import React, { memo } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { Box, Stack, WillowTypography, TextInput, TextButton, CircularProgress, Select } from "@willow/ui-kit";
import { useRecoilValue } from "recoil";
import { prototypeActiveAtom } from "../../state/prototypeAtoms";
import useBasicInfoStep from "../../hooks/onboarding/useBasicInfoStep";
import AccountSetupHeader, { ACCOUNT_SETUP_BG } from "./AccountSetupHeader";


const GRADE_LEVELS = ["9th Grade", "10th Grade", "11th Grade", "12th Grade"];

const BasicInfoStep: React.FC = () => {
  const { firstName, lastName, gradeLevel, setGradeLevel, location, setLocation, locationOptions, handleTextChange, handleContinue, handleBack, isLoading } = useBasicInfoStep();
  const prototypeActive = useRecoilValue(prototypeActiveAtom);
  const toolbarOffset = prototypeActive ? 44 : 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        ...ACCOUNT_SETUP_BG,
        pt: `${toolbarOffset}px`,
        position: "relative",
      }}
    >
      <AccountSetupHeader />

      {/* Content */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", flex: 1, px: 2 }}>
        <Box sx={{ width: "100%", maxWidth: 380, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ mb: 2.5, width: 56, height: 56 }}>
          <img src="/static/images/branding/willow-bare-icon.svg" alt="Willow" width="100%" height="100%" />
        </Box>

        <WillowTypography variant="display" sx={{ textAlign: "center", mb: 0.75 }}>
          Tell us about yourself
        </WillowTypography>
        <WillowTypography variant="body" color="secondary" sx={{ textAlign: "center", mb: 4 }}>
          We'll use this to personalize your experience and find opportunities near you.
        </WillowTypography>

        <Stack spacing={2} sx={{ width: "100%" }}>
          <Stack direction="row" spacing={2}>
            <Box sx={{ flex: 1 }}>
              <TextInput label="First name" name="firstName" value={firstName} onChange={handleTextChange} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextInput label="Last name" name="lastName" value={lastName} onChange={handleTextChange} />
            </Box>
          </Stack>

          <Select
            label="Grade level"
            fullWidth
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value as string)}
            options={GRADE_LEVELS.map((g) => ({ value: g, label: g }))}
          />

          <Box>
            <WillowTypography variant="body" weight="semibold" color="primary" sx={{ mb: 1 }}>City</WillowTypography>
            <Autocomplete
              freeSolo
              options={locationOptions}
              value={location || null}
              onChange={(_event, newValue) => setLocation(newValue || "")}
              onInputChange={(_event, newValue, reason) => {
                if (reason === "input") setLocation(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Start typing your city..."
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      fontFamily: "'Inter', sans-serif",
                      "& .MuiOutlinedInput-input": { padding: "8px 12px" },
                      "& .MuiOutlinedInput-notchedOutline": { borderColor: "divider" },
                      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main", borderWidth: "2px" },
                    },
                  }}
                />
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
      </Box>
    </Box>
  );
};

export default memo(BasicInfoStep);
