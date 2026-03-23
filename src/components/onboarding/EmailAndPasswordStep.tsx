import React, { memo } from "react";
import { Stack, AppBar, Toolbar, Divider, ButtonBase } from "@mui/material";
import { Box, WillowTypography, TextInput, TextButton, CircularProgress } from "@willow/ui-kit";
import { useRecoilValue } from "recoil";
import { prototypeActiveAtom } from "../../state/prototypeAtoms";
import useEmailAndPasswordStep from "../../hooks/onboarding/useEmailAndPasswordStep";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const CleverIcon = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="6" fill="#4274F6"/>
    <path d="M16 7C11.03 7 7 11.03 7 16s4.03 9 9 9c2.3 0 4.4-.87 5.99-2.3l-2.12-2.12A5.94 5.94 0 0 1 16 22c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.55 0 2.96.59 4.02 1.56l2.1-2.1A8.96 8.96 0 0 0 16 7z" fill="white"/>
  </svg>
);

const EmailAndPasswordStep: React.FC = () => {
  const { isLoading, handleContinue } = useEmailAndPasswordStep();
  const prototypeActive = useRecoilValue(prototypeActiveAtom);
  const toolbarOffset = prototypeActive ? 44 : 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#F5F5F6",
        backgroundImage: "radial-gradient(circle, #D4D4D6 1px, transparent 1px)",
        backgroundSize: "20px 20px",
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

      {/* Content */}
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 1, px: 2 }}>
        <Box sx={{ width: "100%", maxWidth: 500, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Icon */}
        <Box sx={{ mb: 2.5, width: 56, height: 56 }}>
          <img src="/static/images/branding/willow-bare-icon.svg" alt="Willow" width="100%" height="100%" />
        </Box>

        {/* Title + subtitle */}
        <WillowTypography variant="display" sx={{ textAlign: "center", mb: 0.75 }}>
          Create your account
        </WillowTypography>
        <WillowTypography variant="body" color="secondary" sx={{ textAlign: "center", mb: 4 }}>
          Let's set up your account.
        </WillowTypography>

        {/* Form */}
        <Stack spacing={1.5} sx={{ width: "100%" }}>
          <ButtonBase
            sx={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5,
              border: "1px solid #E0E0E0", borderRadius: "8px", py: 1.5, px: 2,
              bgcolor: "#FFFFFF", width: "100%", "&:hover": { bgcolor: "#FAFAFA" },
            }}
          >
            <GoogleIcon />
            <WillowTypography variant="body" sx={{ fontWeight: 500 }}>Continue with Google</WillowTypography>
          </ButtonBase>

          <ButtonBase
            sx={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5,
              border: "1px solid #E0E0E0", borderRadius: "8px", py: 1.5, px: 2,
              bgcolor: "#FFFFFF", width: "100%", "&:hover": { bgcolor: "#FAFAFA" },
            }}
          >
            <CleverIcon />
            <WillowTypography variant="body" sx={{ fontWeight: 500 }}>Continue with Clever</WillowTypography>
          </ButtonBase>

          <Divider sx={{ my: 0.5 }}>
            <WillowTypography variant="body-sm" color="secondary">or</WillowTypography>
          </Divider>

          <TextInput label="Your school email" placeholder="name@yourschool.com" disabled />

          <TextButton
            variant="primary"
            onClick={handleContinue}
            disabled={isLoading}
            fullWidth
            sx={{ mt: 1 }}
          >
            {isLoading ? <CircularProgress size={20} color="inherit" /> : "Continue"}
          </TextButton>
        </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(EmailAndPasswordStep);
