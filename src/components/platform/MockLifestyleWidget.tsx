import React from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import { Slate } from "@willow/ui-kit";

const LIFESTYLE_TAGS = [
  { id: "no_degree_needed", label: "No degree required", imageName: "no-degree.jpg" },
  { id: "often_remote", label: "For Introverts", imageName: "remote.jpg" },
  { id: "hands_on", label: "Hands-on", imageName: "hands-on.jpg" },
];

const MockLifestyleWidget: React.FC = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <WillowTypography variant="heading" color="primary" sx={{ mb: 3 }}>
        Explore by lifestyle
      </WillowTypography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 1,
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {LIFESTYLE_TAGS.map((tag) => (
          <Box
            key={tag.id}
            sx={{
              flex: "0 0 auto",
              width: 300,
              height: 300,
              borderRadius: "12px",
              bgcolor: Slate[600],
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflow: "hidden",
              cursor: "pointer",
              "&:hover": { opacity: 0.95 },
            }}
          >
            <Box sx={{ pt: 2, px: 2 }}>
              <WillowTypography variant="body-lg" weight="semibold" sx={{ color: "#fff" }}>
                {tag.label}
              </WillowTypography>
            </Box>
            <Box sx={{ p: 2 }}>
              <img
                src={`/assets/images/lifestyles/${tag.imageName}`}
                alt={tag.label}
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  objectPosition: "50% 20%",
                  borderRadius: 12,
                  display: "block",
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MockLifestyleWidget;
