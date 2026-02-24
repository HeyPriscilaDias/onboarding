import React from "react";
import { Box, WillowTypography, Skeleton } from "@willow/ui-kit";
import { Slate, neutral, essentials } from "@willow/ui-kit";
import { useRecoilValue } from "recoil";
import { recommendationStageAtom } from "../../state/prototypeAtoms";
import PlatformLayout from "./PlatformLayout";
import CareerRecommendations from "./CareerRecommendations";
import MockPurposeWidget from "./MockPurposeWidget";
import MockLifestyleWidget from "./MockLifestyleWidget";
import MockFeedWidget from "./MockFeedWidget";

const ExploreCareersPage: React.FC = () => {
  const recStage = useRecoilValue(recommendationStageAtom);

  return (
    <PlatformLayout activePage="careers" breadcrumb="Home / Explore Careers">
      {/* Search / Filters header placeholder */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <Box
          sx={{
            flex: 1,
            px: 2,
            py: 1.25,
            borderRadius: "10px",
            border: `1px solid ${neutral[300]}`,
            fontSize: 14,
            color: neutral[400],
            bgcolor: essentials.white,
          }}
        >
          Search careers...
        </Box>
        <Box
          sx={{
            px: 3,
            py: 1.25,
            borderRadius: "10px",
            border: `1px solid ${neutral[300]}`,
            fontSize: 14,
            fontWeight: 600,
            color: Slate[700],
            cursor: "pointer",
            bgcolor: essentials.white,
            "&:hover": { bgcolor: neutral[50] },
          }}
        >
          Filter
        </Box>
      </Box>

      {/* Career Recommendations */}
      <CareerRecommendations />

      {/* Explore by purpose (GPC challenges) */}
      <MockPurposeWidget />

      {/* Bookmarked Careers — empty state */}
      <Box sx={{ mb: 4 }}>
        <WillowTypography variant="heading" color="primary" sx={{ mb: 2 }}>
          Bookmarked careers
        </WillowTypography>
        <Box
          sx={{
            borderRadius: "12px",
            bgcolor: neutral[100],
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box sx={{ fontSize: 28, opacity: 0.4 }}>&#128278;</Box>
          <WillowTypography variant="body" sx={{ color: neutral[500] }}>
            No bookmarks yet
          </WillowTypography>
          <WillowTypography variant="body" sx={{ color: neutral[400], fontSize: 13 }}>
            Careers you bookmark will appear here.
          </WillowTypography>
        </Box>
      </Box>

      {/* Explore by lifestyle */}
      <MockLifestyleWidget />

      {/* Feed / Videos widget */}
      <MockFeedWidget />
    </PlatformLayout>
  );
};

export default ExploreCareersPage;
