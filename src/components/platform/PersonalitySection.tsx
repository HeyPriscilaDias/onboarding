import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, WillowTypography } from "@willow/ui-kit";
import { Slate, neutral, essentials } from "@willow/ui-kit";
import { PersonalityType } from "@willow/icons";
import { useRecoilValue } from "recoil";
import { recommendationStageAtom } from "../../state/prototypeAtoms";
import { useStaticPersonalityData } from "../../hooks/useStaticPersonalityData";
import { useCurrentStudentData } from "../../hooks/useCurrentStudent";

const PERSONALITY_TYPE_KEY = "SOCIAL_AGREEABLENESS";

const PersonalitySection: React.FC = () => {
  const navigate = useNavigate();
  const recStage = useRecoilValue(recommendationStageAtom);
  const { student } = useCurrentStudentData();
  const typeKey = student?.personalityType || PERSONALITY_TYPE_KEY;
  const { personalityData } = useStaticPersonalityData(
    recStage !== "interest-only" ? typeKey : undefined
  );

  // Quiz completed — results are now accessible via Portfolio nav item
  if (recStage !== "interest-only" && personalityData) {
    return null;
  }

  // Empty state — quiz not yet taken
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
      <WillowTypography variant="body-lg" sx={{ color: essentials.white, opacity: 0.9, fontSize: 14 }}>
        Take the personality quiz to uncover your unique strengths, communication style, and
        the careers that match who you are. It only takes a few minutes and the results might
        surprise you.
      </WillowTypography>
      <Box
        component="button"
        onClick={() => navigate("/student/onboarding/personality-quiz/start")}
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
};

export default PersonalitySection;
