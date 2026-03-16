import React from "react";
import { Box, Grid, WillowTypography } from "@willow/ui-kit";
import { Slate, neutral } from "@willow/ui-kit";
import { Star } from "@willow/icons";
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

  // Empty state — quiz not yet taken
  if (recStage === "interest-only" || !personalityData) {
    return (
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1 }}>
          <Star size={24} color={neutral[400]} />
          <WillowTypography
            variant="heading"
            sx={{ color: neutral[400], fontWeight: 700 }}
          >
            Your super powers
          </WillowTypography>
        </Box>
        <Box
          sx={{
            border: `2px dashed ${neutral[300]}`,
            borderRadius: "12px",
            py: 5,
            px: 3,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <WillowTypography variant="body" sx={{ color: neutral[500] }}>
            Take the personality quiz to unlock your superpowers
          </WillowTypography>
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
