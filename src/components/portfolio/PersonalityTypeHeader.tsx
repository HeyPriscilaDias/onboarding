import React from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import { PersonalityType } from "@willow/icons";
import { Slate } from "@willow/ui-kit";

interface PersonalityTypeHeaderProps {
  personalityType: {
    id: string;
    title: string;
    shortDescription: string;
  } | null;
}

const PersonalityTypeHeader: React.FC<PersonalityTypeHeaderProps> = ({ personalityType }) => {
  return (
    <Box
      sx={{
        backgroundColor: Slate[600],
        borderRadius: "12px",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <PersonalityType size={24} color="#ffffff" />
        <WillowTypography
          variant="body"
          sx={{ color: "#ffffff", fontWeight: "bold", ml: 1 }}
        >
          Your personality type
        </WillowTypography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <Box sx={{ width: "fit-content" }}>
          <img
            src={
              personalityType?.id
                ? `/assets/images/personality-types/${personalityType.id.toUpperCase()}.jpg`
                : "/assets/images/personality-types/personality-type-demo.jpg"
            }
            alt="Personality type"
            style={{
              width: "100%",
              maxWidth: 400,
              height: "auto",
              borderRadius: 12,
              display: "block",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/images/personality-types/personality-type-demo.jpg";
            }}
          />
        </Box>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, ml: 3 }}>
          {personalityType ? (
            <>
              <WillowTypography
                variant="heading"
                sx={{
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: { xs: "1.5rem", md: "2rem" },
                }}
              >
                {personalityType.title}
              </WillowTypography>
              <WillowTypography
                variant="body"
                sx={{ color: "#ffffff", lineHeight: 1.6 }}
              >
                {personalityType.shortDescription}
              </WillowTypography>
            </>
          ) : (
            <WillowTypography
              variant="body"
              sx={{ color: "#ffffff", fontStyle: "italic" }}
            >
              No personality type data available. Please complete your personality quiz.
            </WillowTypography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PersonalityTypeHeader;
