import React, { useRef } from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import { Slate } from "@willow/ui-kit";

const PRESSING_CHALLENGES = [
  { id: "climate", title: "Protect Our Planet", imageName: "environmental.jpg" },
  { id: "health", title: "Strengthen Health & Well-Being for All", imageName: "nurse.jpg" },
  { id: "education", title: "Empower Lives Through Education", imageName: "teacher.jpg" },
  { id: "business", title: "Expand Economic Opportunity & Entrepreneurship", imageName: "business.jpg" },
  { id: "tech", title: "Harness Technology & Science Ethically", imageName: "tech.jpg" },
  { id: "justice", title: "Build Strong, Just Communities", imageName: "protect.jpg" },
  { id: "culture", title: "Enrich Lives Through Arts, Culture, & Entertainment", imageName: "culture.jpg" },
  { id: "transit", title: "Keep Society Moving & Connected", imageName: "transit.jpg" },
];

const MockPurposeWidget: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <Box sx={{ mb: 4, position: "relative" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WillowTypography variant="heading" color="primary">
            Explore by purpose
          </WillowTypography>
          <WillowTypography
            variant="body"
            sx={{ color: Slate[400], cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
          >
            View all
          </WillowTypography>
        </Box>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Box
            onClick={() => scroll("left")}
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: `1px solid ${Slate[200]}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: 16,
              "&:hover": { bgcolor: Slate[25] },
            }}
          >
            &lsaquo;
          </Box>
          <Box
            onClick={() => scroll("right")}
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: `1px solid ${Slate[200]}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: 16,
              "&:hover": { bgcolor: Slate[25] },
            }}
          >
            &rsaquo;
          </Box>
        </Box>
      </Box>

      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 1,
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {PRESSING_CHALLENGES.map((challenge) => (
          <Box
            key={challenge.id}
            sx={{
              flex: "0 0 auto",
              width: 300,
              height: 300,
              borderRadius: "12px",
              bgcolor: Slate[600],
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              cursor: "pointer",
              "&:hover": { opacity: 0.95 },
            }}
          >
            <Box sx={{ pt: 2, px: 2, height: 60 }}>
              <WillowTypography variant="body-lg" weight="semibold" sx={{ color: "#fff" }}>
                {challenge.title}
              </WillowTypography>
            </Box>
            <Box sx={{ p: 2, flex: 1, overflow: "hidden", borderRadius: "12px" }}>
              <img
                src={`/static/images/challenges/${challenge.imageName}`}
                alt={challenge.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "50% 20%",
                  borderRadius: 12,
                  display: "block",
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MockPurposeWidget;
