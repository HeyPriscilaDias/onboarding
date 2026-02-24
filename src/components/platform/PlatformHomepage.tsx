import React from "react";
import { Box, WillowTypography, Grid } from "@willow/ui-kit";
import { Slate, neutral, essentials } from "@willow/ui-kit";
import { useRecoilValue } from "recoil";
import { prototypeActiveAtom, recommendationStageAtom } from "../../state/prototypeAtoms";
import { useCurrentStudentData } from "../../hooks/useCurrentStudent";
import { PersonalityType } from "@willow/icons";
import PlatformLayout from "./PlatformLayout";
import PersonalitySection from "./PersonalitySection";
import SuperpowersSection from "./SuperpowersSection";
import GpcPrompt from "./GpcPrompt";
import LessonCodeSection from "./LessonCodeSection";

const PlatformHomepage: React.FC = () => {
  const { student } = useCurrentStudentData();
  const recStage = useRecoilValue(recommendationStageAtom);

  // Show personality quiz prompt card on homepage when quiz not done
  const showQuizPrompt = recStage === "interest-only";

  return (
    <PlatformLayout activePage="home" breadcrumb="Home">
      {/* Welcome heading */}
      <WillowTypography variant="display" color="primary" sx={{ mb: 3 }}>
        Welcome back, {student?.firstName || "Student"}!
      </WillowTypography>

      {/* Personality quiz prompt — only when quiz not done (mirrors real HomeContainer) */}
      {showQuizPrompt && (
        <Box
          sx={{
            bgcolor: Slate[600],
            borderRadius: "10px",
            p: 3,
            mb: 3,
            color: essentials.white,
            border: `1px solid ${neutral[300]}`,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <PersonalityType size={24} color={essentials.white} />
            <WillowTypography variant="subheading" color="inherit">
              Personality Quiz
            </WillowTypography>
          </Box>
          <WillowTypography variant="body-lg" color="inherit" sx={{ mb: 2 }}>
            You haven't finished your personality quiz yet. Complete it to discover your
            personality type and unlock personalized career recommendations.
          </WillowTypography>
          <Box
            component="button"
            sx={{
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
      )}

      {/* GPC encouragement prompt (only shows for interest+personality stage) */}
      <GpcPrompt />

      {/* Personality results */}
      <PersonalitySection />

      {/* Superpowers */}
      <SuperpowersSection />

      {/* Two column layout: Career Readiness / Durable Skills + Lesson Code */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Career Readiness placeholder */}
            <Box
              sx={{
                border: `1px solid ${neutral[300]}`,
                borderRadius: "10px",
                p: 3,
                bgcolor: essentials.white,
              }}
            >
              <WillowTypography variant="subheading" color="primary" sx={{ mb: 1 }}>
                Career Readiness
              </WillowTypography>
              <WillowTypography variant="body" color="secondary">
                Track your progress across career readiness competencies.
              </WillowTypography>
            </Box>
            {/* Durable Skills placeholder */}
            <Box
              sx={{
                border: `1px solid ${neutral[300]}`,
                borderRadius: "10px",
                p: 3,
                bgcolor: essentials.white,
              }}
            >
              <WillowTypography variant="subheading" color="primary" sx={{ mb: 1 }}>
                Durable Skills Assessment
              </WillowTypography>
              <WillowTypography variant="body" color="secondary">
                Discover and develop the skills employers value most.
              </WillowTypography>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <LessonCodeSection />
        </Grid>
      </Grid>

      {/* Goals placeholder */}
      <Box sx={{ mb: 4 }}>
        <WillowTypography variant="heading" color="primary" sx={{ mb: 2 }}>
          Your goals
        </WillowTypography>
        <Grid container spacing={2}>
          {[1, 2, 3].map((i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <Box
                sx={{
                  border: `2px dashed ${neutral[300]}`,
                  borderRadius: "12px",
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 120,
                  cursor: "pointer",
                  "&:hover": { borderColor: Slate[400], bgcolor: neutral[50] },
                }}
              >
                <WillowTypography variant="body" sx={{ color: neutral[500] }}>
                  + Set a SMART Goal
                </WillowTypography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </PlatformLayout>
  );
};

export default PlatformHomepage;
