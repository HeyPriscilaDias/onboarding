import React from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import { essentials, neutral } from "@willow/ui-kit";
import { BookOpen } from "@willow/icons";

const LessonCodeSection: React.FC = () => {
  return (
    <Box
      sx={{
        borderRadius: "10px",
        bgcolor: "#2d3748",
        display: "flex",
        alignItems: "center",
        gap: 3,
        px: 3,
        py: 2,
        mb: 3,
      }}
    >
      <BookOpen size={32} color="#ACF7B2" />

      <WillowTypography variant="subheading" sx={{ color: essentials.white, flexShrink: 0 }}>
        Today's lesson code
      </WillowTypography>

      <Box sx={{ display: "flex", gap: 1 }}>
        {["w", "e", "7"].map((placeholder, i) => (
          <Box
            key={i}
            sx={{
              width: 48,
              height: 48,
              borderRadius: "10px",
              bgcolor: essentials.white,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 400,
              color: neutral[400],
            }}
          >
            {placeholder}
          </Box>
        ))}
      </Box>

      <Box sx={{ flex: 1 }} />

      <Box
        component="button"
        sx={{
          px: 3,
          py: 1.25,
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.3)",
          bgcolor: "rgba(255,255,255,0.1)",
          color: essentials.white,
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "inherit",
          whiteSpace: "nowrap",
          "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
        }}
      >
        Join lesson
      </Box>
    </Box>
  );
};

export default LessonCodeSection;
