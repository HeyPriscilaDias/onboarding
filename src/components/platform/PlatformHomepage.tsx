import React from "react";
import { Box, WillowTypography, Grid } from "@willow/ui-kit";
import { Slate, neutral } from "@willow/ui-kit";
import { useCurrentStudentData } from "../../hooks/useCurrentStudent";
import PlatformLayout from "./PlatformLayout";
import PersonalitySection from "./PersonalitySection";
import DurableSkillsSection from "./DurableSkillsSection";
import SuperpowersSection from "./SuperpowersSection";
import GpcPrompt from "./GpcPrompt";
import LessonCodeSection from "./LessonCodeSection";

const PlatformHomepage: React.FC = () => {
  const { student } = useCurrentStudentData();

  return (
    <PlatformLayout activePage="home" breadcrumb="Home">
      {/* Welcome heading */}
      <WillowTypography variant="display" color="primary" sx={{ mb: 3 }}>
        Welcome, {student?.firstName || "Student"}!
      </WillowTypography>

      {/* Lesson Code — first card */}
      <LessonCodeSection />

      {/* GPC encouragement prompt (only shows for interest+personality stage) */}
      <GpcPrompt />

      {/* Personality + Durable Skills row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <PersonalitySection />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <DurableSkillsSection />
        </Grid>
      </Grid>

      {/* Superpowers */}
      <SuperpowersSection />

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
