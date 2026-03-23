import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, AppBar, Toolbar, Link } from "@mui/material";
import { Box, Alert, WillowTypography, TextInput, TextButton, essentials, hexToRgba, ui, Slate } from "@willow/ui-kit";
import { Eye, EyeOff } from "@willow/icons";
import { useAuth } from "../../mock/MockAuthProvider";
import ResetPasswordDialog from "./ResetPasswordDialog";
import { useRecoilValue } from "recoil";
import { prototypeActiveAtom } from "../../state/prototypeAtoms";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { emailSignIn, loginError, setLoginError } = useAuth();
  const prototypeActive = useRecoilValue(prototypeActiveAtom);
  const toolbarOffset = prototypeActive ? 44 : 0;

  const handleLogin = () => {
    setLoginError(null);
    if (!email || !password) {
      setLoginError("Please enter both email and password.");
      return;
    }
    emailSignIn({ email, password });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  // Check if login was successful (user is now authenticated)
  const { currentAuthUser } = useAuth();
  React.useEffect(() => {
    if (currentAuthUser) {
      navigate("/signup", { replace: true });
    }
  }, [currentAuthUser, navigate]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: hexToRgba(ui.mint, 0.25), px: 2, pt: `${toolbarOffset}px`, position: "relative" }}>
      <Box>
        <AppBar position="static" sx={{ bgcolor: "transparent", boxShadow: "none", py: 2, border: "none" }}>
          <Toolbar sx={{ justifyContent: "space-between", display: "flex", alignItems: "center" }}>
            <Box sx={{ height: 48, width: 48 }}>
              <img src="/static/images/branding/willow-bare-icon.svg" alt="Willow Logo" width="100%" height="100%" />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Box sx={{ bgcolor: essentials.white, borderRadius: "12px", boxShadow: "0px 2px 8px -1px rgba(16, 24, 40, 0.08)", width: "100%", maxWidth: 500, p: 7 }}>
          <Box component="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }} onKeyDown={handleKeyDown} sx={{ textAlign: "left" }}>
            <WillowTypography variant="display" color="primary">Welcome back!</WillowTypography>
            <WillowTypography variant="body-lg" color="secondary" sx={{ mt: 1.5 }}>Sign in to your account.</WillowTypography>

            <Stack spacing={2} sx={{ mt: 4 }}>
              <TextInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
              <TextInput
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                trailingIcon={
                  <button onClick={() => setShowPassword(!showPassword)} type="button" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }}>
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                }
              />

              {loginError && <Alert variant="error">{loginError}</Alert>}

              <TextButton variant="primary" onClick={handleLogin} fullWidth sx={{ mt: 2 }}>
                Sign In
              </TextButton>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <TextButton variant="ghost" onClick={() => setResetDialogOpen(true)} sx={{ textTransform: "none" }}>
                  Forgot password?
                </TextButton>
              </Box>
            </Stack>
          </Box>
        </Box>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <WillowTypography variant="body" color="secondary">
            Don't have an account?{" "}
            <Link
              href="/signup"
              sx={{ color: Slate[700], textDecoration: "underline", "&:hover": { textDecoration: "underline" } }}
            >
              Sign up
            </Link>
          </WillowTypography>
        </Box>
      </Box>

      <ResetPasswordDialog open={resetDialogOpen} onClose={() => setResetDialogOpen(false)} />
    </Box>
  );
};

export default LoginPage;
