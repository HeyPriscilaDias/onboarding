import React from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import { neutral } from "@willow/ui-kit";
import { useRecoilValue } from "recoil";
import { recommendationStageAtom } from "../../state/prototypeAtoms";

const GpcPrompt: React.FC = () => {
  const recStage = useRecoilValue(recommendationStageAtom);

  // Only show in interest-personality stage
  if (recStage !== "interest-personality") return null;

  return (
    <Box
      sx={{
        bgcolor: "#f0fdf4",
        border: "1px solid #bbf7d0",
        borderRadius: "10px",
        px: 3,
        py: 2,
        mb: 4,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box sx={{ fontSize: 24, flexShrink: 0 }}>&#127793;</Box>
      <WillowTypography variant="body" sx={{ color: neutral[700] }}>
        As you learn about global challenges, your recommendations will get even more
        personalized. Explore the curriculum to unlock the full picture.
      </WillowTypography>
    </Box>
  );
};

export default GpcPrompt;
