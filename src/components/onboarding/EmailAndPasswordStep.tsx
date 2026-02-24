import React, { memo, useState } from "react";
import { Stack } from "@mui/material";
import { Box, Alert, WillowTypography, TextInput } from "@willow/ui-kit";
import { Eye, EyeOff } from "@willow/icons";
import OnboardingLayout from "./OnboardingLayout";
import useEmailAndPasswordStep from "../../hooks/onboarding/useEmailAndPasswordStep";

const EmailAndPasswordStep: React.FC = () => {
  const {
    email, setEmail, password, setPassword, confirmPassword, setConfirmPassword,
    error, isLoading, handleContinue, handleKeyDown,
  } = useEmailAndPasswordStep();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <OnboardingLayout currentStep={1} handleContinue={handleContinue} isLoading={isLoading}>
      <Box
        component="form"
        onSubmit={(e) => { e.preventDefault(); handleContinue(); }}
        onKeyDown={handleKeyDown}
        sx={{ textAlign: "left" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: 500, mx: "auto" }}>
          <WillowTypography variant="display" color="primary">Welcome to Willow!</WillowTypography>
          <WillowTypography variant="body-lg" color="secondary" sx={{ mt: 1.5 }}>Let's set up your account.</WillowTypography>
        </Box>
        <Stack spacing={2} sx={{ mt: 4, width: "100%", maxWidth: 500, mx: "auto" }}>
          <TextInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
          <TextInput
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
            trailingIcon={
              <button onClick={() => setShowPassword(!showPassword)} type="button" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }}>
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            }
          />
          <TextInput
            label="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            required
            trailingIcon={
              <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} type="button" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }}>
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            }
          />
          {error && <Alert variant="error" sx={{ mt: 1 }}>{error}</Alert>}
        </Stack>
      </Box>
    </OnboardingLayout>
  );
};

export default memo(EmailAndPasswordStep);
