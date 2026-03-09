import React from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import { Slate, neutral, essentials } from "@willow/ui-kit";
import { Award } from "@willow/icons";

const DurableSkillsSection: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: Slate[600],
        borderRadius: "12px",
        p: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Award size={24} color={essentials.white} />
        <WillowTypography variant="subheading" sx={{ color: essentials.white }}>
          Durable Skills Assessment
        </WillowTypography>
      </Box>
      <WillowTypography variant="body-lg" sx={{ color: essentials.white, opacity: 0.9 }}>
        Discover and develop the skills employers value most. Assess your strengths in
        communication, teamwork, and problem-solving.
      </WillowTypography>
      <Box
        component="button"
        sx={{
          alignSelf: "flex-start",
          bgcolor: essentials.white,
          color: Slate[700],
          border: "none",
          borderRadius: "8px",
          px: 3,
          py: 1,
          fontWeight: 600,
          fontSize: 14,
          cursor: "pointer",
          fontFamily: "inherit",
          "&:hover": { bgcolor: neutral[100] },
        }}
      >
        Start Assessment
      </Box>
    </Box>
  );
};

export default DurableSkillsSection;
