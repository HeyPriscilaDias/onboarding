import React from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import { Slate, neutral, essentials } from "@willow/ui-kit";

const MockAlmaSidebar: React.FC = () => {
  return (
    <Box
      sx={{
        width: 324,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderLeft: `1px solid ${neutral[200]}`,
        bgcolor: essentials.white,
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 2,
          borderBottom: `1px solid ${neutral[200]}`,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            bgcolor: Slate[600],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: essentials.white,
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          A
        </Box>
        <WillowTypography variant="subheading" color="primary">
          Alma
        </WillowTypography>
      </Box>

      {/* Chat area */}
      <Box sx={{ flex: 1, px: 2, py: 2, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Alma message */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              bgcolor: Slate[600],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: essentials.white,
              fontSize: 12,
              fontWeight: 700,
              flexShrink: 0,
              mt: 0.5,
            }}
          >
            A
          </Box>
          <Box
            sx={{
              bgcolor: neutral[100],
              borderRadius: "12px",
              borderTopLeftRadius: "4px",
              px: 2,
              py: 1.5,
              maxWidth: "85%",
            }}
          >
            <WillowTypography variant="body" color="primary" sx={{ lineHeight: 1.5 }}>
              Hey! I'm Alma, your career exploration guide. I can help you discover careers,
              explore your strengths, or answer questions about your personality type results.
              What would you like to explore?
            </WillowTypography>
          </Box>
        </Box>

        {/* Suggestion buttons */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, pl: 4.5 }}>
          {["Tell me about my personality type", "Suggest careers for me", "What are superpowers?"].map(
            (suggestion) => (
              <Box
                key={suggestion}
                sx={{
                  px: 1.5,
                  py: 0.75,
                  borderRadius: "100px",
                  border: `1px solid ${neutral[300]}`,
                  fontSize: 13,
                  color: Slate[700],
                  cursor: "pointer",
                  "&:hover": { bgcolor: neutral[100] },
                }}
              >
                {suggestion}
              </Box>
            )
          )}
        </Box>
      </Box>

      {/* Input area */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderTop: `1px solid ${neutral[200]}`,
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            px: 2,
            py: 1,
            borderRadius: "24px",
            border: `1px solid ${neutral[300]}`,
            fontSize: 14,
            color: neutral[400],
          }}
        >
          Ask Alma anything...
        </Box>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            bgcolor: Slate[600],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: essentials.white,
            fontSize: 16,
          }}
        >
          &#8593;
        </Box>
      </Box>
    </Box>
  );
};

export default MockAlmaSidebar;
