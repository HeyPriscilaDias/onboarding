import React from "react";
import { Box, Grid, WillowTypography } from "@willow/ui-kit";
import { Slate, neutral, essentials } from "@willow/ui-kit";
import { Star, PersonalityType } from "@willow/icons";
import { useRecoilValue } from "recoil";
import { recommendationStageAtom } from "../../state/prototypeAtoms";
import { useStaticPersonalityData } from "../../hooks/useStaticPersonalityData";
import { useCurrentStudentData } from "../../hooks/useCurrentStudent";

const PERSONALITY_TYPE_KEY = "SOCIAL_AGREEABLENESS";

const SuperpowersSection: React.FC = () => {
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
          mb: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Star size={24} color={essentials.white} />
          <WillowTypography variant="subheading" sx={{ color: essentials.white }}>
            Unlock your superpowers
          </WillowTypography>
        </Box>
        <WillowTypography variant="body-lg" sx={{ color: essentials.white, opacity: 0.9 }}>
          Everyone has unique strengths that make them stand out. Complete the personality quiz
          to discover yours — and see how they connect to careers you'll love.
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
  const superpowers = personalityData.superpowers;

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1 }}>
        <Star size={24} color={Slate[900]} />
        <WillowTypography
          variant="heading"
          sx={{ color: Slate[900], fontWeight: 700 }}
        >
          Your super powers
        </WillowTypography>
      </Box>

      {superpowers.length > 0 ? (
        <Grid container spacing={2}>
          {superpowers.map((sp, i) => (
            <Grid size={{ xs: 12, sm: 6 }} key={i}>
              <Box
                sx={{
                  bgcolor: neutral[100],
                  borderRadius: "12px",
                  p: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <WillowTypography variant="subheading" sx={{ color: neutral[900], fontWeight: 600 }}>
                  {sp.name}
                </WillowTypography>
                <WillowTypography variant="body" sx={{ color: neutral[600] }}>
                  {sp.description}
                </WillowTypography>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <WillowTypography variant="body" sx={{ color: neutral[600], fontStyle: "italic", textAlign: "center", py: 4 }}>
          No superpowers available.
        </WillowTypography>
      )}
    </Box>
  );
};

export default SuperpowersSection;
