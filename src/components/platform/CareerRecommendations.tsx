import React, { useRef, useState } from "react";
import { Box, WillowTypography, Skeleton } from "@willow/ui-kit";
import { Slate } from "@willow/ui-kit";
import { useRecoilValue } from "recoil";
import { recommendationStageAtom } from "../../state/prototypeAtoms";
import { useStaticCareerData } from "../../hooks/useStaticCareerData";
import MockCareerCard from "./MockCareerCard";

const CareerRecommendations: React.FC = () => {
  const recStage = useRecoilValue(recommendationStageAtom);
  const { recommendations, recLabel, careerTags, isLoading } = useStaticCareerData(recStage);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 20);
    setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
  };

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -340 : 340, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width={300} height={32} />
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rectangular" width={300} height={500} sx={{ borderRadius: 2 }} />
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <WillowTypography variant="heading" color="primary">
          You may like
        </WillowTypography>
        <WillowTypography
          variant="body"
          sx={{ color: Slate[400], cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
        >
          View all
        </WillowTypography>
      </Box>

      {/* Recommendation context label */}
      <WillowTypography variant="body" color="secondary" sx={{ mb: 2 }}>
        {recLabel}
      </WillowTypography>

      {/* Horizontal scrollable cards */}
      <Box sx={{ position: "relative" }}>
        {/* Left arrow */}
        {showLeftArrow && (
          <Box
            onClick={() => scroll("left")}
            sx={{
              position: "absolute",
              left: -16,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 36,
              height: 36,
              borderRadius: "50%",
              bgcolor: "#fff",
              border: `1px solid ${Slate[200]}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              fontSize: 18,
              "&:hover": { bgcolor: Slate[25] },
            }}
          >
            &lsaquo;
          </Box>
        )}

        <Box
          ref={scrollRef}
          onScroll={handleScroll}
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            pb: 1,
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          {recommendations.map((career) => (
            <Box key={career.id} sx={{ scrollSnapAlign: "start" }}>
              <MockCareerCard career={career} careerTags={careerTags} />
            </Box>
          ))}
        </Box>

        {/* Right arrow */}
        {showRightArrow && recommendations.length > 3 && (
          <Box
            onClick={() => scroll("right")}
            sx={{
              position: "absolute",
              right: -16,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 36,
              height: 36,
              borderRadius: "50%",
              bgcolor: "#fff",
              border: `1px solid ${Slate[200]}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              fontSize: 18,
              "&:hover": { bgcolor: Slate[25] },
            }}
          >
            &rsaquo;
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CareerRecommendations;
