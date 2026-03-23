import React, { memo } from "react";
import { Stack, AppBar, Toolbar } from "@mui/material";
import { Box, WillowTypography, TextInput, TextButton, CircularProgress } from "@willow/ui-kit";
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
        backgroundColor: "#F5F5F6",
        backgroundImage: "radial-gradient(circle, #C9C9CC 1px, transparent 1px)",
        backgroundSize: "22px 22px",
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
          </Toolbar>
        </AppBar>
      </Box>

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
