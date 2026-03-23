import React from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import { Slate, neutral, essentials } from "@willow/ui-kit";
import { useRecoilValue } from "recoil";
import { aiUseAgreementCompleteAtom } from "../../state/onboardingAtoms";

const MockAlmaSidebar: React.FC = () => {
  const agreementComplete = useRecoilValue(aiUseAgreementCompleteAtom);

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

      {/* Chat + input area — locked until AI use agreement is complete */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
        {/* Blurred content */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            filter: agreementComplete ? "none" : "blur(4px)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
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
                color: essentials.white,
                fontSize: 16,
              }}
            >
              &#8593;
            </Box>
          </Box>
        </Box>

        {/* Lock overlay */}
        {!agreementComplete && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
              px: 3,
              bgcolor: "rgba(255, 255, 255, 0.6)",
              pointerEvents: "none",
            }}
          >
            <WillowTypography
              variant="body"
              sx={{ color: neutral[700], fontWeight: 500, textAlign: "center", lineHeight: 1.5, px: 3 }}
            >
              Complete your{" "}
              <Box
                component="a"
                href="#"
                onClick={(e: React.MouseEvent) => e.preventDefault()}
                sx={{
                  pointerEvents: "auto",
                  color: Slate[600],
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                AI Use Agreement
              </Box>{" "}
              to chat with Alma.
            </WillowTypography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MockAlmaSidebar;
