import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { Box, Grid, CircularProgress, TextButton, WillowTypography } from "@willow/ui-kit";
import { Slate, neutral, essentials } from "@willow/ui-kit";
import { ArrowLeft, ArrowRight, Logout } from "@willow/icons";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import useLogout from "../../../hooks/useLogout";
import { useRecoilValue } from "recoil";
import { prototypeActiveAtom } from "../../../state/prototypeAtoms";

type Props = {
  children: React.ReactNode;
  onNext?: () => void;
  onPrevious?: () => void;
  showPrevious?: boolean;
  isLastQuestion?: boolean;
  isStartPage?: boolean;
  isPreviewPage?: boolean;
  isSubmitting?: boolean;
};

const PersonalityQuizLayout: React.FC<Props> = ({
  children,
  onNext,
  onPrevious,
  showPrevious,
  isLastQuestion,
  isStartPage,
  isPreviewPage,
  isSubmitting,
}) => {
  const { mobile } = useWindowDimensions();
  const { logout } = useLogout();
  const prototypeActive = useRecoilValue(prototypeActiveAtom);
  const toolbarOffset = prototypeActive ? 44 : 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: Slate[700],
        px: 2,
        pb: 1,
        pt: `${toolbarOffset}px`,
        overflowY: "scroll",
      }}
    >
      <AppBar
        position="static"
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          pt: 2,
          border: "none",
          "&:hover": { bgcolor: "transparent", border: "none" },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", display: "flex", alignItems: "center", position: "relative" }}>
          <Box sx={{ height: 40, width: 40 }}>
            <img
              src="/static/images/branding/willow-bare-icon.svg"
              alt="Willow Logo"
              width="100%"
              height="100%"
              style={{ filter: "brightness(0) saturate(100%) invert(100%)" }}
            />
          </Box>
          {!mobile && (
            <WillowTypography
              variant="body-lg"
              weight="semibold"
              sx={{
                color: neutral[25],
                textAlign: "center",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translateX(-50%) translateY(-50%)",
              }}
            >
              Willow's Personality Quiz
            </WillowTypography>
          )}
          <TextButton variant="on-dark" sx={{ gap: 0.5 }} onClick={logout} leadingIcon={<Logout />}>
            Log Out
          </TextButton>
        </Toolbar>
      </AppBar>

      {!mobile ? (
        <Box>
          <Grid container justifyContent="center" sx={{ mt: 0 }} columns={24}>
            <Grid size={{ xs: 24, sm: isPreviewPage ? 2 : 4, md: isPreviewPage ? 4 : 5, lg: isPreviewPage ? 4 : 6 }}>
              {showPrevious && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    height: "calc(100vh - 72px)",
                  }}
                >
                  <TextButton variant="on-dark" onClick={onPrevious} sx={{ ml: 4 }} leadingIcon={<ArrowLeft />}>
                    Back
                  </TextButton>
                </Box>
              )}
            </Grid>
            <Grid size={{ xs: 24, sm: isPreviewPage ? 20 : 16, md: isPreviewPage ? 16 : 14, lg: isPreviewPage ? 16 : 12 }}>
              {children}
            </Grid>
            <Grid size={{ xs: 24, sm: isPreviewPage ? 2 : 4, md: isPreviewPage ? 4 : 5, lg: isPreviewPage ? 4 : 6 }}>
              {!isStartPage && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    height: "calc(100vh - 72px)",
                  }}
                >
                  <TextButton
                    variant="on-dark"
                    sx={{ mr: 4, minWidth: 120 }}
                    trailingIcon={isSubmitting ? undefined : <ArrowRight />}
                    onClick={onNext}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={20} sx={{ color: essentials.white }} />
                    ) : isLastQuestion ? (
                      "Submit"
                    ) : (
                      "Next"
                    )}
                  </TextButton>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      ) : (
        <>
          <Box>{children}</Box>
          {!isStartPage && (
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, alignItems: "center" }}>
              {showPrevious && (
                <TextButton variant="on-dark" onClick={onPrevious} sx={{ ml: 4 }} leadingIcon={<ArrowLeft />}>
                  Back
                </TextButton>
              )}
              <TextButton
                variant="on-dark"
                sx={{ mr: 4, minWidth: 120 }}
                trailingIcon={isSubmitting ? undefined : <ArrowRight />}
                onClick={onNext}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={20} sx={{ color: essentials.white }} />
                ) : isLastQuestion ? (
                  "Submit"
                ) : (
                  "Next"
                )}
              </TextButton>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default PersonalityQuizLayout;
