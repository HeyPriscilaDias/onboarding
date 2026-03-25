import React, { memo } from "react";
import { Stack } from "@mui/material";
import { Box, WillowTypography, TextInput, TextButton, CircularProgress } from "@willow/ui-kit";
import AccountSetupHeader, { ACCOUNT_SETUP_BG } from "./AccountSetupHeader";
import { useRecoilValue } from "recoil";
import { prototypeActiveAtom } from "../../state/prototypeAtoms";
import usePasswordStep from "../../hooks/onboarding/usePasswordStep";

const PasswordStep: React.FC = () => {
  const { isLoading, handleContinue, handleBack } = usePasswordStep();
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

      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 1, px: 2 }}>
        <Box sx={{ width: "100%", maxWidth: 380, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ mb: 2.5, width: 56, height: 56 }}>
          <img src="/static/images/branding/willow-bare-icon.svg" alt="Willow" width="100%" height="100%" />
        </Box>

        <WillowTypography variant="display" sx={{ textAlign: "center", mb: 0.75 }}>
          Create a password
        </WillowTypography>
        <WillowTypography variant="body" color="secondary" sx={{ textAlign: "center", mb: 4 }}>
          You'll use this to sign in to your account.
        </WillowTypography>

        <Stack spacing={1.5} sx={{ width: "100%" }}>
          <TextInput label="Password" type="password" value="test123" disabled />
          <TextInput label="Confirm password" type="password" value="test123" disabled />

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

export default memo(PasswordStep);
