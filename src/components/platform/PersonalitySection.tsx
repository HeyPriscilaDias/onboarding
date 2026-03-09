import React from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import { Slate, neutral, essentials } from "@willow/ui-kit";
import { PersonalityType } from "@willow/icons";
import { useRecoilValue } from "recoil";
import { recommendationStageAtom } from "../../state/prototypeAtoms";
import { useStaticPersonalityData } from "../../hooks/useStaticPersonalityData";
import { useCurrentStudentData } from "../../hooks/useCurrentStudent";

const PERSONALITY_TYPE_KEY = "SOCIAL_AGREEABLENESS";

const PersonalitySection: React.FC = () => {
  const recStage = useRecoilValue(recommendationStageAtom);
  const { student } = useCurrentStudentData();
  const typeKey = student?.personalityType || PERSONALITY_TYPE_KEY;
  const { personalityData } = useStaticPersonalityData(
    recStage !== "interest-only" ? typeKey : undefined
  );

  // Empty state for interest-only
  if (recStage === "interest-only" || !personalityData) {
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
          <PersonalityType size={24} color={essentials.white} />
          <WillowTypography variant="subheading" sx={{ color: essentials.white }}>
            Discover your personality type
          </WillowTypography>
        </Box>
        <WillowTypography variant="body-lg" sx={{ color: essentials.white, opacity: 0.9 }}>
          Take the personality quiz to uncover your unique strengths, communication style, and
          the careers that match who you are. It only takes a few minutes and the results might
          surprise you.
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
          Take Quiz
        </Box>
      </Box>
    );
  }

  // Populated state
  return (
    <Box
      sx={{
        bgcolor: Slate[600],
        borderRadius: "12px",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <PersonalityType size={24} color={essentials.white} />
        <WillowTypography variant="body" sx={{ color: essentials.white, fontWeight: 600 }}>
          Your personality type
        </WillowTypography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3, mt: 1 }}>
        {/* Personality type image */}
        <Box sx={{ flexShrink: 0 }}>
          <img
            src={`/assets/images/personality-types/${typeKey.toUpperCase()}.jpg`}
            alt={personalityData.title}
            style={{
              width: "100%",
              maxWidth: 340,
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

        {/* Info */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
          <WillowTypography
            variant="heading"
            sx={{
              color: essentials.white,
              fontWeight: 700,
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            {personalityData.title}
          </WillowTypography>
          <WillowTypography
            variant="body"
            sx={{ color: essentials.white, lineHeight: 1.6, opacity: 0.9 }}
          >
            {personalityData.shortDescription}
          </WillowTypography>
        </Box>
      </Box>
    </Box>
  );
};

export default PersonalitySection;
