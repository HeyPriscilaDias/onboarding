import React, { memo, useRef, useEffect } from "react";
import { Box, WillowTypography, Slate, hexToRgba, essentials, ui } from "@willow/ui-kit";
import { ThumbsUp, ThumbsDown, ArrowRight, ArrowLeft } from "@willow/icons";
import OnboardingLayout from "./OnboardingLayout";
import useCareerVideoStep from "../../hooks/onboarding/useCareerVideoStep";

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

  const videoRef = useRef<HTMLVideoElement>(null);

  // Restart video when navigating between cards
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentIndex]);

  // Preload next video
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

  const progressPercent = ((currentIndex + 1) / totalVideos) * 100;
  const reactionsRemaining = Math.max(0, MIN_REACTIONS - totalReactions);

  return (
    <OnboardingLayout
      currentStep={6}
      handleContinue={canProceed ? handleContinue : undefined}
      handleBack={handleBack}
      isLoading={isLoading}
      continueLabel="Start exploring"
      disableContinue={!canProceed}
    >
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: 380, mx: "auto" }}>
        {/* Header */}
        <WillowTypography variant="display" color="primary" sx={{ mb: 0.5 }}>
          Discover careers
        </WillowTypography>
        <WillowTypography variant="body" color="secondary" sx={{ mb: 3 }}>
          Like or dislike at least {MIN_REACTIONS} to continue.
        </WillowTypography>

        {/* Progress bar + counter */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <Box sx={{ flex: 1, height: 4, borderRadius: 2, bgcolor: hexToRgba(Slate[700], 0.12) }}>
            <Box
              sx={{
                width: `${progressPercent}%`,
                height: "100%",
                borderRadius: 2,
                bgcolor: Slate[700],
                transition: "width 0.3s ease",
              }}
            />
          </Box>
          <WillowTypography variant="caption" color="secondary" sx={{ whiteSpace: "nowrap" }}>
            {currentIndex + 1} / {totalVideos}
          </WillowTypography>
        </Box>

        {/* Video card */}
        {currentVideo && (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "9 / 16",
              borderRadius: "16px",
              overflow: "hidden",
              bgcolor: Slate[900],
            }}
          >
            {/* Video or placeholder */}
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
                }}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(135deg, ${hexToRgba(ui.mint, 0.4)} 0%, ${hexToRgba(Slate[700], 0.9)} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <WillowTypography variant="caption" sx={{ color: hexToRgba(essentials.white, 0.3) }}>
                  Video placeholder
                </WillowTypography>
              </Box>
            )}

            {/* Bottom gradient overlay */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "50%",
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
                pointerEvents: "none",
              }}
            />

            {/* Career info overlay */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                p: 3,
                pb: 4,
              }}
            >
              <WillowTypography variant="heading" sx={{ color: essentials.white, fontWeight: 700, mb: 0.5 }}>
                {currentVideo.jobTitle}
              </WillowTypography>
              <WillowTypography variant="body" sx={{ color: hexToRgba(essentials.white, 0.8) }}>
                {currentVideo.oneLiner}
              </WillowTypography>
            </Box>

            {/* Navigation arrows on the card */}
            {currentIndex > 0 && (
              <Box
                component="button"
                onClick={handlePrevious}
                sx={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: hexToRgba(essentials.black, 0.4),
                  border: "none",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: essentials.white,
                  "&:hover": { bgcolor: hexToRgba(essentials.black, 0.6) },
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
                  bgcolor: hexToRgba(essentials.black, 0.4),
                  border: "none",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: essentials.white,
                  "&:hover": { bgcolor: hexToRgba(essentials.black, 0.6) },
                }}
              >
                <ArrowRight size={18} color={essentials.white} />
              </Box>
            )}
          </Box>
        )}

        {/* Controls bar */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3, mt: 2.5 }}>
          <Box
            component="button"
            onClick={handleDislike}
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              border: `2px solid ${currentReaction === "dislike" ? Slate[700] : hexToRgba(Slate[700], 0.2)}`,
              bgcolor: currentReaction === "dislike" ? hexToRgba(Slate[700], 0.1) : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: Slate[700],
                bgcolor: hexToRgba(Slate[700], 0.05),
              },
            }}
          >
            <ThumbsDown size={24} color={currentReaction === "dislike" ? Slate[700] : hexToRgba(Slate[700], 0.5)} />
          </Box>

          <Box
            component="button"
            onClick={handleLike}
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              border: `2px solid ${currentReaction === "like" ? ui.mint : hexToRgba(Slate[700], 0.2)}`,
              bgcolor: currentReaction === "like" ? hexToRgba(ui.mint, 0.15) : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: ui.mint,
                bgcolor: hexToRgba(ui.mint, 0.08),
              },
            }}
          >
            <ThumbsUp size={24} color={currentReaction === "like" ? Slate[900] : hexToRgba(Slate[700], 0.5)} />
          </Box>
        </Box>

        {/* Skip link */}
        {!isLastVideo && (
          <Box sx={{ textAlign: "center", mt: 1.5 }}>
            <Box
              component="button"
              onClick={handleSkip}
              sx={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 8px",
              }}
            >
              <WillowTypography variant="caption" color="secondary" sx={{ textDecoration: "underline" }}>
                Skip
              </WillowTypography>
            </Box>
          </Box>
        )}

        {/* Reactions counter */}
        {!canProceed && (
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <WillowTypography variant="caption" color="secondary">
              {reactionsRemaining} more reaction{reactionsRemaining !== 1 ? "s" : ""} to unlock continue
            </WillowTypography>
          </Box>
        )}
      </Box>
    </OnboardingLayout>
  );
};

export default memo(CareerVideoStep);
