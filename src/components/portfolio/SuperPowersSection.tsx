import React from "react";
import { Box, Grid, WillowTypography } from "@willow/ui-kit";
import { Star } from "@willow/icons";
import { Slate, neutral } from "@willow/ui-kit";

interface SuperPowersSectionProps {
  parsedSuperpowers: Array<{ name: string; description: string }>;
}

const SuperPowersSection: React.FC<SuperPowersSectionProps> = ({ parsedSuperpowers }) => {
  if (parsedSuperpowers.length === 0) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box sx={{ color: Slate[900], mr: 1 }}>
          <Star size={24} />
        </Box>
        <WillowTypography
          variant="heading"
          sx={{ color: Slate[900], fontWeight: "bold", fontSize: { xs: "1.5rem", md: "2rem" } }}
        >
          Your super powers
        </WillowTypography>
      </Box>

      <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
        {parsedSuperpowers.map((superpower, index) => (
          <Grid size={{ xs: 12, sm: 6 }} key={index} sx={{ display: "flex" }}>
            <Box
              sx={{
                backgroundColor: neutral[100],
                borderRadius: "12px",
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                flex: 1,
              }}
            >
              <WillowTypography
                variant="subheading"
                sx={{ color: neutral[900], fontWeight: 600 }}
              >
                {superpower.name}
              </WillowTypography>
              <WillowTypography variant="body" sx={{ color: neutral[600] }}>
                {superpower.description}
              </WillowTypography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SuperPowersSection;
