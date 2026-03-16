import React from "react";
import { Box, Grid } from "@willow/ui-kit";
import PlatformLayout from "../platform/PlatformLayout";
import { useCurrentStudentData } from "../../hooks/useCurrentStudent";
import { getPersonalityDetail } from "../../mock/personalityDetailData";
import PersonalityTypeHeader from "./PersonalityTypeHeader";
import SuperPowersSection from "./SuperPowersSection";
import WorkStyleSection from "./WorkStyleSection";
import PersonalGoalsSection from "./PersonalGoalsSection";
import StudyTipsSection from "./StudyTipsSection";
import RelationshipTipsSection from "./RelationshipTipsSection";
import RecommendedCareersSection from "./RecommendedCareersSection";
import InspirationalQuotesSection from "./InspirationalQuotesSection";

const PersonalityTypePage: React.FC = () => {
  const { student } = useCurrentStudentData();
  const typeKey = student?.personalityType;
  const detail = getPersonalityDetail(typeKey);

  return (
    <PlatformLayout activePage="portfolio" breadcrumb="Home > Portfolio > Personality Type">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mb: 5,
        }}
      >
        <PersonalityTypeHeader personalityType={detail} />

        <SuperPowersSection parsedSuperpowers={detail.superpowers} />

        <WorkStyleSection workStyle={detail.workStyle} />

        <PersonalGoalsSection parsedPersonalGoals={detail.personalGoals} />

        <Box sx={{ mt: 4 }}>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 6 }}>
              <StudyTipsSection parsedStudyTips={detail.studyTips} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RelationshipTipsSection parsedRelationshipTips={detail.relationshipTips} />
            </Grid>
          </Grid>
        </Box>

        <RecommendedCareersSection recommendedCareers={detail.recommendedCareers} />

        <InspirationalQuotesSection inspirationalQuotes={detail.inspirationalQuotes} />
      </Box>
    </PlatformLayout>
  );
};

export default PersonalityTypePage;
