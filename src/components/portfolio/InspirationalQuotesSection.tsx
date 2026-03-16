import React from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import { Quotes } from "@willow/icons";
import { Slate, neutral, ui } from "@willow/ui-kit";

interface InspirationalQuotesSectionProps {
  inspirationalQuotes: Array<{
    quote: string;
    name: string;
    description: string;
  }>;
}

const InspirationalQuotesSection: React.FC<InspirationalQuotesSectionProps> = ({
  inspirationalQuotes,
}) => {
  if (inspirationalQuotes.length === 0) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <WillowTypography variant="heading" weight="semibold" sx={{ mb: 3 }}>
        Inspiration from famous mentors
      </WillowTypography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {inspirationalQuotes.map((quote, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: neutral[100],
              borderRadius: "12px",
              padding: "24px",
            }}
          >
            <WillowTypography variant="body-lg" sx={{ color: neutral[700] }}>
              &ldquo;{quote.quote}&rdquo;
            </WillowTypography>

            <Box sx={{ marginTop: "32px", display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: `3px solid ${ui.mint}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: neutral[300],
                    overflow: "hidden",
                  }}
                >
                  <WillowTypography
                    variant="subheading"
                    weight="semibold"
                    color="secondary"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {quote.name.charAt(0).toUpperCase()}
                  </WillowTypography>
                </Box>

                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: -32,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: ui.mint,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Quotes size={20} color={Slate[900]} />
                </Box>
              </Box>

              <Box sx={{ flex: 1, ml: 4 }}>
                <WillowTypography
                  variant="body-lg"
                  weight="semibold"
                  sx={{ color: neutral[900], margin: 0, lineHeight: 1, display: "block" }}
                >
                  {quote.name}
                </WillowTypography>
                <WillowTypography
                  variant="body-sm"
                  sx={{
                    color: neutral[700],
                    margin: 0,
                    marginTop: "4px",
                    lineHeight: "16px",
                    display: "block",
                  }}
                >
                  {quote.description}
                </WillowTypography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default InspirationalQuotesSection;
