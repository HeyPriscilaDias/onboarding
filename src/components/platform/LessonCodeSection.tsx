import React from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import { essentials, neutral } from "@willow/ui-kit";
import { BookOpen } from "@willow/icons";

const LessonCodeSection: React.FC = () => {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "10px",
        overflow: "hidden",
        height: "100%",
        minHeight: 300,
        bgcolor: "#2d3748",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top half - icon */}
      <Box
        sx={{
          flex: "1 1 50%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          pl: 3,
          pb: 2,
        }}
      >
        <BookOpen size={40} color="#ACF7B2" />
      </Box>

      {/* Bottom half - content */}
      <Box
        sx={{
          flex: "1 1 50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          px: 3,
          pb: 3,
          color: essentials.white,
        }}
      >
        <WillowTypography variant="subheading" color="inherit" sx={{ textAlign: "center", width: "100%" }}>
          Today's lesson code
        </WillowTypography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          {["w", "e", "7"].map((placeholder, i) => (
            <Box
              key={i}
              sx={{
                width: 56,
                height: 56,
                borderRadius: "12px",
                bgcolor: essentials.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 400,
                color: neutral[400],
              }}
            >
              {placeholder}
            </Box>
          ))}
        </Box>

        <Box
          component="button"
          sx={{
            width: "100%",
            py: 1.25,
            borderRadius: "8px",
            border: `1px solid rgba(255,255,255,0.3)`,
            bgcolor: "rgba(255,255,255,0.1)",
            color: essentials.white,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
          }}
        >
          Join lesson
        </Box>
      </Box>
    </Box>
  );
};

export default LessonCodeSection;
