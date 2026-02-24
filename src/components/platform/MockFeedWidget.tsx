import React from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import { Slate, essentials } from "@willow/ui-kit";
import { useRecoilValue } from "recoil";
import { recommendationStageAtom } from "../../state/prototypeAtoms";

const MockFeedWidget: React.FC = () => {
  const recStage = useRecoilValue(recommendationStageAtom);
  const hasRecommendations = recStage === "interest-personality-gpc";

  return (
    <Box
      sx={{
        bgcolor: Slate[900],
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
        px: 2,
        mb: 4,
      }}
    >
      {hasRecommendations ? (
        <>
          {/* Placeholder video cards */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
            {[1, 2, 3, 4, 5].map((i) => {
              const isCenter = i === 3;
              return (
                <Box
                  key={i}
                  sx={{
                    width: isCenter ? 249 : 206,
                    height: isCenter ? 442 : 366,
                    borderRadius: "16px",
                    bgcolor: Slate[700],
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    pb: 2,
                    opacity: isCenter ? 1 : 0.5,
                    boxShadow: isCenter
                      ? "0px 8px 24px rgba(0,0,0,0.5)"
                      : "0px 4px 12px rgba(0,0,0,0.3)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Gradient overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "50%",
                      background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
                    }}
                  />
                  <WillowTypography
                    variant={isCenter ? "body-lg" : "body"}
                    weight="semibold"
                    sx={{ color: essentials.white, textAlign: "center", position: "relative", zIndex: 1 }}
                  >
                    Career Video
                  </WillowTypography>
                </Box>
              );
            })}
          </Box>
          {/* Controls */}
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: essentials.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 20,
              }}
            >
              &lsaquo;
            </Box>
            <Box
              sx={{
                px: 2.5,
                py: 1,
                borderRadius: "100px",
                bgcolor: essentials.white,
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Learn more
            </Box>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: essentials.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 20,
              }}
            >
              &rsaquo;
            </Box>
          </Box>
        </>
      ) : (
        <>
          <WillowTypography variant="heading" sx={{ color: essentials.white, mb: 2 }}>
            No career videos available yet
          </WillowTypography>
          <WillowTypography variant="body" sx={{ color: "rgba(255,255,255,0.7)" }}>
            Complete your career assessment to see personalized videos
          </WillowTypography>
        </>
      )}
    </Box>
  );
};

export default MockFeedWidget;
