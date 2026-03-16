import React from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import { Heart } from "@willow/icons";
import { Slate, neutral } from "@willow/ui-kit";

interface RelationshipTipsSectionProps {
  parsedRelationshipTips: string[];
}

const RelationshipTipsSection: React.FC<RelationshipTipsSectionProps> = ({
  parsedRelationshipTips,
}) => {
  if (parsedRelationshipTips.length === 0) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box sx={{ color: Slate[900], mr: 1 }}>
          <Heart size={24} />
        </Box>
        <WillowTypography
          variant="heading"
          sx={{ color: Slate[900], fontWeight: "bold", fontSize: { xs: "1.5rem", md: "2rem" } }}
        >
          Relationship tips
        </WillowTypography>
      </Box>

      <Box>
        {parsedRelationshipTips.map((tip, index) => (
          <Box key={index}>
            <WillowTypography variant="body" sx={{ color: neutral[600], lineHeight: 1.6 }}>
              {tip}
            </WillowTypography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RelationshipTipsSection;
