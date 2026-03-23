import React from "react";
import { Link } from "@mui/material";
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
  /** Override the full background style (e.g. dot patterns, gradients) */
  bgStyle?: Record<string, string>;
};

const OnboardingLayout = ({ currentStep, children, handleContinue, handleBack, isLoading = false, disableContinue = false, continueLabel = "Continue", fullBleed = false, bgOverride, bgStyle }: OnboardingLayoutProps) => {
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
        bgcolor: bgStyle ? undefined : (bgOverride || hexToRgba(ui.mint, 0.25)),
        ...(bgStyle || {}),
        px: 2,
        pt: `${toolbarOffset}px`,
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 2 }}>
        <Box sx={{ width: 116, height: "auto" }}>
          <img src="/static/images/branding/willow-logotype.svg" alt="Willow" width="100%" />
        </Box>
        <Box>
          {currentStep > 1 && (
            <TextButton variant="ghost" onClick={logout}>
              Log Out
            </TextButton>
          )}
        </Box>
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
              maxWidth: 500,
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
              justifyContent: "flex-end",
              alignItems: "center",
              gap: mobile ? 2 : 8,
              width: "100%",
              maxWidth: 500,
            }}
          >
            {!mobile ? (
              <Box sx={{ display: "flex", gap: 1, flexShrink: 0, width: 200, justifyContent: "flex-end" }}>
                {handleBack && (
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
                {handleBack && (
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
