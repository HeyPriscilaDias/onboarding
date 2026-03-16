/**
 * V3: "Split Stage" — Video + editorial info side by side
 *
 * A horizontal split layout: the video takes the left side at full height
 * with generous rounded corners, while the right side has career details,
 * category, reaction controls, and progress in an editorial layout.
 * Dark background, clean typography, spacious and calm.
 * On narrow screens it stacks vertically.
 */
import React, { memo, useRef, useEffect, useState } from "react";
import { Box, WillowTypography, Slate, hexToRgba, essentials, ui } from "@willow/ui-kit";
import { ThumbsUp, ThumbsDown, ArrowRight, ArrowLeft } from "@willow/icons";
import OnboardingLayout from "./OnboardingLayout";
import useCareerVideoStep from "../../hooks/onboarding/useCareerVideoStep";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const CareerVideoStep: React.FC = () => {
  const {
    currentVideo,
    currentIndex,
    totalVideos,
    totalReactions,
    canProceed,
    isLastVideo,
    currentReaction,
    isLoading,
    handleLike,
    handleDislike,
    handleNext,
    handlePrevious,
    handleSkip,
    handleContinue,
    handleBack,
    nextVideoUrl,
    MIN_REACTIONS,
  } = useCareerVideoStep();

  const { mobile } = useWindowDimensions();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentIndex]);

  useEffect(() => {
    if (nextVideoUrl) {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "video";
      link.href = nextVideoUrl;
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [nextVideoUrl]);

  useEffect(() => {
    setTransitioning(true);
    const t = setTimeout(() => setTransitioning(false), 300);
    return () => clearTimeout(t);
  }, [currentIndex]);

  const reactionsRemaining = Math.max(0, MIN_REACTIONS - totalReactions);

  // Shared reaction button styles
  const reactionBtnSx = (active: boolean, activeColor: string) => ({
    width: 60,
    height: 60,
    borderRadius: "16px",
    border: `2px solid ${active ? activeColor : hexToRgba(essentials.white, 0.12)}`,
    bgcolor: active ? hexToRgba(activeColor, 0.15) : "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      borderColor: activeColor,
      bgcolor: hexToRgba(activeColor, 0.1),
      transform: "scale(1.06)",
    },
    "&:active": { transform: "scale(0.95)" },
  });

  return (
    <OnboardingLayout
      currentStep={6}
      handleContinue={canProceed ? handleContinue : undefined}
      handleBack={handleBack}
      isLoading={isLoading}
      continueLabel="Start exploring"
      disableContinue={!canProceed}
      fullBleed
      bgOverride={Slate[900]}
    >
      {currentVideo && (
        <Box
          sx={{
            display: "flex",
            flexDirection: mobile ? "column" : "row",
            alignItems: mobile ? "center" : "center",
            gap: mobile ? 3 : 5,
            width: "100%",
            maxWidth: 820,
            mx: "auto",
            flex: 1,
            minHeight: 0,
            pb: 8,
            px: 2,
          }}
        >
          {/* Left — Video */}
          <Box
            sx={{
              position: "relative",
              flex: mobile ? "none" : "1 1 55%",
              width: mobile ? "100%" : "auto",
              maxWidth: mobile ? 360 : "none",
              aspectRatio: "9 / 14",
              maxHeight: mobile ? "60vh" : "100%",
              minHeight: 0,
              borderRadius: "24px",
              overflow: "hidden",
              bgcolor: Slate[800],
              boxShadow: `0 16px 48px rgba(0,0,0,0.4)`,
              opacity: transitioning ? 0.75 : 1,
              transform: transitioning ? "translateX(-8px)" : "translateX(0)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {currentVideo.videoUrl ? (
              <video
                ref={videoRef}
                src={currentVideo.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(160deg, ${Slate[800]} 0%, ${Slate[900]} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <WillowTypography variant="caption" sx={{ color: hexToRgba(essentials.white, 0.2) }}>
                  Video placeholder
                </WillowTypography>
              </Box>
            )}

            {/* Navigation arrows on the video */}
            {currentIndex > 0 && (
              <Box
                component="button"
                onClick={handlePrevious}
                sx={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: hexToRgba(essentials.black, 0.35),
                  backdropFilter: "blur(8px)",
                  border: `1px solid ${hexToRgba(essentials.white, 0.1)}`,
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: essentials.white,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: hexToRgba(essentials.black, 0.55),
                  },
                }}
              >
                <ArrowLeft size={18} color={essentials.white} />
              </Box>
            )}
            {!isLastVideo && (
              <Box
                component="button"
                onClick={handleNext}
                sx={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: hexToRgba(essentials.black, 0.35),
                  backdropFilter: "blur(8px)",
                  border: `1px solid ${hexToRgba(essentials.white, 0.1)}`,
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: essentials.white,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: hexToRgba(essentials.black, 0.55),
                  },
                }}
              >
                <ArrowRight size={18} color={essentials.white} />
              </Box>
            )}
          </Box>

          {/* Right — Editorial info panel */}
          <Box
            sx={{
              flex: mobile ? "none" : "1 1 45%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 4,
              py: mobile ? 0 : 4,
              width: mobile ? "100%" : "auto",
              maxWidth: mobile ? 360 : "none",
            }}
          >
            {/* Progress — step counter */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <WillowTypography
                variant="caption"
                sx={{
                  color: ui.mint,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Discover Careers
              </WillowTypography>
              <Box sx={{ flex: 1 }} />
              <WillowTypography
                variant="caption"
                sx={{
                  color: hexToRgba(essentials.white, 0.35),
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {currentIndex + 1} of {totalVideos}
              </WillowTypography>
            </Box>

            {/* Segmented progress */}
            <Box sx={{ display: "flex", gap: "3px" }}>
              {Array.from({ length: totalVideos }, (_, i) => (
                <Box
                  key={i}
                  sx={{
                    flex: 1,
                    height: 2,
                    borderRadius: 1,
                    bgcolor: i <= currentIndex
                      ? ui.mint
                      : hexToRgba(essentials.white, 0.08),
                    transition: "background-color 0.3s ease",
                  }}
                />
              ))}
            </Box>

            {/* Career details */}
            <Box>
              {/* Category */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.75,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "8px",
                  bgcolor: hexToRgba(ui.mint, 0.1),
                  mb: 2,
                }}
              >
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: ui.mint }} />
                <WillowTypography variant="caption" sx={{ color: ui.mint, fontWeight: 600 }}>
                  {currentVideo.category}
                </WillowTypography>
              </Box>

              <WillowTypography
                variant="display"
                sx={{
                  color: essentials.white,
                  fontWeight: 700,
                  mb: 1.5,
                  display: "block",
                  lineHeight: 1.15,
                }}
              >
                {currentVideo.jobTitle}
              </WillowTypography>
              <WillowTypography
                variant="body"
                sx={{
                  color: hexToRgba(essentials.white, 0.6),
                  lineHeight: 1.5,
                }}
              >
                {currentVideo.oneLiner}
              </WillowTypography>
            </Box>

            {/* Reaction controls */}
            <Box>
              <WillowTypography
                variant="caption"
                sx={{
                  color: hexToRgba(essentials.white, 0.35),
                  mb: 1.5,
                  display: "block",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Interested?
              </WillowTypography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                {/* Dislike */}
                <Box
                  component="button"
                  onClick={handleDislike}
                  sx={reactionBtnSx(currentReaction === "dislike", hexToRgba(essentials.white, 0.5))}
                >
                  <ThumbsDown
                    size={24}
                    color={currentReaction === "dislike" ? essentials.white : hexToRgba(essentials.white, 0.4)}
                  />
                </Box>

                {/* Like */}
                <Box
                  component="button"
                  onClick={handleLike}
                  sx={reactionBtnSx(currentReaction === "like", ui.mint)}
                >
                  <ThumbsUp
                    size={24}
                    color={currentReaction === "like" ? ui.mint : hexToRgba(essentials.white, 0.4)}
                  />
                </Box>

                {/* Skip */}
                {!isLastVideo && (
                  <Box
                    component="button"
                    onClick={handleSkip}
                    sx={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      px: 2,
                      py: 1,
                      borderRadius: "8px",
                      ml: 1,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: hexToRgba(essentials.white, 0.06),
                      },
                    }}
                  >
                    <WillowTypography
                      variant="caption"
                      sx={{
                        color: hexToRgba(essentials.white, 0.3),
                        textDecoration: "underline",
                        textDecorationColor: hexToRgba(essentials.white, 0.15),
                        textUnderlineOffset: "3px",
                      }}
                    >
                      Skip this one
                    </WillowTypography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Reactions remaining */}
            {!canProceed && (
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: "12px",
                  bgcolor: hexToRgba(essentials.white, 0.04),
                  border: `1px solid ${hexToRgba(essentials.white, 0.06)}`,
                  alignSelf: "flex-start",
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: hexToRgba(ui.mint, 0.5),
                  }}
                />
                <WillowTypography variant="caption" sx={{ color: hexToRgba(essentials.white, 0.4) }}>
                  {reactionsRemaining} more reaction{reactionsRemaining !== 1 ? "s" : ""} to continue
                </WillowTypography>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </OnboardingLayout>
  );
};

export default memo(CareerVideoStep);
