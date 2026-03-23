import React, { memo } from "react";
import { Stack, TextField, MenuItem, AppBar, Toolbar } from "@mui/material";
import { Box, WillowTypography, TextInput, TextButton, CircularProgress } from "@willow/ui-kit";
import { useRecoilValue } from "recoil";
import { prototypeActiveAtom } from "../../state/prototypeAtoms";
import useSchoolContextStep from "../../hooks/onboarding/useSchoolContextStep";
import useLogout from "../../hooks/useLogout";

const DOT_BG_STYLE = {
  backgroundColor: "#F5F5F6",
  backgroundImage: "radial-gradient(circle, #C9C9CC 1px, transparent 1px)",
  backgroundSize: "22px 22px",
};

const GRADE_LEVELS = ["9th Grade", "10th Grade", "11th Grade", "12th Grade"];

const SchoolContextStep: React.FC = () => {
  const { gradeLevel, handleTextChange, handleContinue, handleBack, isLoading } = useSchoolContextStep();
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
        <Box sx={{ width: "100%", maxWidth: 500, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ mb: 2.5, width: 56, height: 56 }}>
          <img src="/static/images/branding/willow-bare-icon.svg" alt="Willow" width="100%" height="100%" />
        </Box>

        <WillowTypography variant="display" sx={{ textAlign: "center", mb: 0.75 }}>
          Tell us about your school
        </WillowTypography>
        <WillowTypography variant="body" color="secondary" sx={{ textAlign: "center", mb: 4 }}>
          This helps us find the best opportunities near you.
        </WillowTypography>

        <Stack spacing={2} sx={{ width: "100%" }}>
          <Box>
            <WillowTypography variant="body" weight="semibold" color="primary" sx={{ mb: 1 }}>Grade level</WillowTypography>
            <TextField select variant="outlined" name="gradeLevel" fullWidth value={gradeLevel} onChange={handleTextChange} size="small">
              {GRADE_LEVELS.map((grade) => (
                <MenuItem key={grade} value={grade}>{grade}</MenuItem>
              ))}
            </TextField>
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

export default memo(SchoolContextStep);
