import React from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import { useCurrentStudentData } from "../../hooks/useCurrentStudent";
import PlatformLayout from "./PlatformLayout";
import OnboardingChecklist from "./OnboardingChecklist";
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

      {/* Onboarding checklist */}
      <OnboardingChecklist />

      {/* Superpowers */}
      <SuperpowersSection />
    </PlatformLayout>
  );
};

export default PlatformHomepage;
