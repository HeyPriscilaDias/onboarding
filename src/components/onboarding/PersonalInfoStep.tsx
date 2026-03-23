import React, { memo } from "react";
import { TextField, Autocomplete, AppBar, Toolbar } from "@mui/material";
import { Box, Stack, WillowTypography, TextInput, TextButton, CircularProgress, Select } from "@willow/ui-kit";
import { useRecoilValue } from "recoil";
import { prototypeActiveAtom } from "../../state/prototypeAtoms";
import useBasicInfoStep from "../../hooks/onboarding/useBasicInfoStep";
import { US_STATES } from "../../hooks/onboarding/useBasicInfoStep";
import useLogout from "../../hooks/useLogout";

const DOT_BG_STYLE = {
  backgroundColor: "#F5F5F6",
  backgroundImage: "radial-gradient(circle, #C9C9CC 1px, transparent 1px)",
  backgroundSize: "22px 22px",
};

const GRADE_LEVELS = ["9th Grade", "10th Grade", "11th Grade", "12th Grade"];

const BasicInfoStep: React.FC = () => {
  const { firstName, lastName, gradeLevel, setGradeLevel, city, usState, setUsState, handleTextChange, handleContinue, handleBack, isLoading } = useBasicInfoStep();
  const prototypeActive = useRecoilValue(prototypeActiveAtom);
  const toolbarOffset = prototypeActive ? 44 : 0;
  const { logout } = useLogout();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        ...DOT_BG_STYLE,
        pt: `${toolbarOffset}px`,
        position: "relative",
      }}
    >
      {/* Header - absolutely positioned so content centres in the full viewport */}
      <Box sx={{ position: "absolute", top: `${toolbarOffset}px`, left: 0, right: 0, px: 2, zIndex: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "transparent", boxShadow: "none", py: 2, border: "none" }}>
          <Toolbar sx={{ justifyContent: "space-between", display: "flex", alignItems: "center" }}>
            <Box sx={{ width: 116, height: "auto" }}>
              <img src="/static/images/branding/willow-logotype.svg" alt="Willow" width="100%" />
            </Box>
            <TextButton variant="ghost" onClick={logout}>Log Out</TextButton>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Content */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", flex: 1, px: 2 }}>
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

          <Stack direction="row" spacing={2}>
            <Box sx={{ flex: 1 }}>
              <TextInput label="City" name="city" value={city} onChange={handleTextChange} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <WillowTypography variant="body" weight="semibold" color="primary" sx={{ mb: 1 }}>State</WillowTypography>
              <Autocomplete
                options={US_STATES}
                value={usState || null}
                onChange={(_event, newValue) => setUsState(newValue || "")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Start typing to search..."
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
          </Stack>

          <TextButton variant="primary" onClick={handleContinue} disabled={isLoading} fullWidth sx={{ mt: 1 }}>
            {isLoading ? <CircularProgress size={20} color="inherit" /> : "Continue"}
          </TextButton>
          <TextButton variant="ghost" onClick={handleBack} fullWidth>
            Back
          </TextButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default memo(BasicInfoStep);
