import React from "react";
import { AppBar, Toolbar, Link } from "@mui/material";
import { Box, CircularProgress, essentials, hexToRgba, TextButton, ui, WillowTypography, Slate } from "@willow/ui-kit";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { PageRoute } from "../../types";
import { useRecoilValue } from "recoil";
import { prototypeActiveAtom, miniplayerOpenAtom } from "../../state/prototypeAtoms";
import SlideMiniplayer from "../prototype/SlideMiniplayer";

type OnboardingLayoutProps = {
  currentStep: number;
  children: React.ReactNode;
  handleContinue?: () => void;
  handleBack?: () => void;
  isLoading?: boolean;
  disableContinue?: boolean;
  continueLabel?: string;
  /** When true, removes the white card wrapper and renders children full-bleed */
  fullBleed?: boolean;
  /** Override the outer background color (useful for immersive dark modes) */
  bgOverride?: string;
};

const OnboardingLayout = ({ currentStep, children, handleContinue, handleBack, isLoading = false, disableContinue = false, continueLabel = "Continue", fullBleed = false, bgOverride }: OnboardingLayoutProps) => {
  const { mobile } = useWindowDimensions();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const prototypeActive = useRecoilValue(prototypeActiveAtom);
  const miniplayerOpen = useRecoilValue(miniplayerOpenAtom);
  const toolbarOffset = prototypeActive ? 44 : 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: bgOverride || hexToRgba(ui.mint, 0.25),
        px: 2,
        pt: `${toolbarOffset}px`,
        position: "relative",
      }}
    >
      <Box>
        <AppBar
          position="static"
          sx={{
            bgcolor: "transparent",
            boxShadow: "none",
            py: 2,
            border: "none",
            "&:hover": { bgcolor: "transparent", border: "none" },
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", display: "flex", alignItems: "center" }}>
            <Box sx={{ height: 48, width: 48 }}>
              <img src="/static/images/branding/willow-bare-icon.svg" alt="Willow Logo" width="100%" height="100%" />
            </Box>
            <Box>
              {currentStep > 1 && (
                <TextButton variant="ghost" onClick={logout}>
                  Log Out
                </TextButton>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: currentStep <= 6 ? "calc(100vh - 96px - 120px - 40px)" : "calc(100vh - 96px)",
          py: 0,
        }}
      >
        {fullBleed ? (
          <Box sx={{ width: "100%", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", overflow: "auto" }}>
            {children}
          </Box>
        ) : (
          <Box
            sx={{
              bgcolor: essentials.white,
              borderRadius: "12px",
              boxShadow: "0px 2px 8px -1px rgba(16, 24, 40, 0.08), 0px 2px 8px -1px rgba(16, 24, 40, 0.08)",
              width: "100%",
              maxWidth: 700,
              maxHeight: "80vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ px: 7, py: 7, overflow: "auto", flex: 1 }}>
              {children}
            </Box>
          </Box>
        )}

        {currentStep === 1 && (
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <WillowTypography variant="body" color="secondary">
              Already have an account?{" "}
              <Link
                href={PageRoute.LOGIN}
                sx={{
                  color: Slate[700],
                  textDecoration: "underline",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Log in
              </Link>
            </WillowTypography>
          </Box>
        )}
      </Box>

      {currentStep <= 6 && (
        <Box
          sx={{
            position: "fixed",
            bottom: "40px",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: mobile ? "column" : "row",
              justifyContent: mobile ? "center" : "space-between",
              alignItems: "center",
              gap: mobile ? 2 : 8,
              width: "613px",
              maxWidth: "613px",
            }}
          >
            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-start", flexWrap: "nowrap" }}>
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <Box
                  key={step}
                  sx={{
                    width: mobile ? 48 : 80,
                    flexShrink: 0,
                    height: 8,
                    borderRadius: "4px",
                    bgcolor: step <= currentStep
                      ? (fullBleed ? essentials.white : Slate[700])
                      : hexToRgba(fullBleed ? essentials.white : Slate[700], 0.15),
                  }}
                />
              ))}
            </Box>
            {!mobile ? (
              <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
                {currentStep > 1 && (
                  <TextButton variant={fullBleed ? "on-dark" : "secondary"} onClick={handleBack} sx={{ flex: 1 }}>
                    Back
                  </TextButton>
                )}
                {handleContinue && (
                  <TextButton variant={fullBleed ? "on-dark" : "primary"} onClick={handleContinue} disabled={isLoading || disableContinue} sx={{ flex: 2, minWidth: 100, whiteSpace: "nowrap" }}>
                    {isLoading ? <CircularProgress size={20} color="inherit" /> : continueLabel}
                  </TextButton>
                )}
              </Box>
            ) : (
              <Box>
                {handleContinue && (
                  <TextButton variant="primary" onClick={handleContinue} disabled={isLoading || disableContinue} fullWidth sx={{ mt: 2, minHeight: 42, whiteSpace: "nowrap" }}>
                    {isLoading ? <CircularProgress size={20} color="inherit" /> : continueLabel}
                  </TextButton>
                )}
                {currentStep > 1 && (
                  <TextButton variant="secondary" onClick={handleBack} fullWidth sx={{ mt: 2 }}>
                    Back
                  </TextButton>
                )}
              </Box>
            )}
          </Box>
        </Box>
      )}

      {prototypeActive && miniplayerOpen && <SlideMiniplayer />}
    </Box>
  );
};

export default OnboardingLayout;
