import React from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import { FatArrow } from "@willow/icons";
import { Slate, neutral } from "@willow/ui-kit";

interface WorkStyleSectionProps {
  workStyle: string | null;
}

const WorkStyleSection: React.FC<WorkStyleSectionProps> = ({ workStyle }) => {
  if (!workStyle) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box sx={{ color: Slate[900], mr: 1 }}>
          <FatArrow size={24} />
        </Box>
        <WillowTypography
          variant="heading"
          sx={{ color: Slate[900], fontWeight: "bold", fontSize: { xs: "1.5rem", md: "2rem" } }}
        >
          Your work style
        </WillowTypography>
      </Box>

      <WillowTypography variant="body" sx={{ color: neutral[700], lineHeight: 1.6 }}>
        {workStyle}
      </WillowTypography>
    </Box>
  );
};

export default WorkStyleSection;
