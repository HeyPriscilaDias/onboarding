import React, { memo } from "react";
import { Stack } from "@mui/material";
import { Box, WillowTypography, TextInput, TextButton, CircularProgress } from "@willow/ui-kit";
import { useRecoilValue } from "recoil";
import { prototypeActiveAtom } from "../../state/prototypeAtoms";
import AccountSetupHeader, { ACCOUNT_SETUP_BG } from "./AccountSetupHeader";
import useGpaStep from "../../hooks/onboarding/useGpaStep";


const GpaStep: React.FC = () => {
  const { gpa, handleTextChange, handleContinue, handleBack, isLoading } = useGpaStep();
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

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", flex: 1, px: 2 }}>
        <Box sx={{ width: "100%", maxWidth: 380, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ mb: 2.5, width: 56, height: 56 }}>
          <img src="/static/images/branding/willow-bare-icon.svg" alt="Willow" width="100%" height="100%" />
        </Box>

        <WillowTypography variant="display" sx={{ textAlign: "center", mb: 0.75 }}>
          What's your GPA?
        </WillowTypography>
        <WillowTypography variant="body" color="secondary" sx={{ textAlign: "center", mb: 4 }}>
          This is optional — it helps us tailor scholarship and program recommendations for you.
        </WillowTypography>

        <Stack spacing={2} sx={{ width: "100%" }}>
          <TextInput label="GPA (optional)" name="gpa" value={gpa} onChange={handleTextChange} placeholder="e.g. 3.5" />
          <TextButton variant="primary" onClick={handleContinue} disabled={isLoading} fullWidth sx={{ mt: 1 }}>
            {isLoading ? <CircularProgress size={20} color="inherit" /> : "Finish setup"}
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

export default memo(GpaStep);
