import React from "react";
import { Box, Grid, WillowTypography, Chip } from "@willow/ui-kit";
import { Star } from "@willow/icons";
import { Slate, neutral, essentials, ui } from "@willow/ui-kit";

interface RecommendedCareersSectionProps {
  recommendedCareers: Array<{
    id: string;
    title: string;
    medianSalary: number;
    education: string;
    tags: Array<{ id: string; description: string }>;
    isTopPick: boolean;
  }>;
}

const RecommendedCareersSection: React.FC<RecommendedCareersSectionProps> = ({
  recommendedCareers,
}) => {
  if (recommendedCareers.length === 0) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <WillowTypography variant="heading" weight="semibold" sx={{ mb: 3 }}>
        Recommended Careers
      </WillowTypography>

      <Box>
        {/* Column Headers */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "flex-end",
            px: 2,
            py: 1,
            borderBottom: `1px solid ${neutral[300]}`,
          }}
        >
          <Box sx={{ display: "flex", gap: 4, minWidth: 280 }}>
            <WillowTypography
              variant="body"
              weight="semibold"
              color="secondary"
              sx={{ textAlign: "center", flex: 1 }}
            >
              Median Salary
            </WillowTypography>
            <WillowTypography
              variant="body"
              weight="semibold"
              color="secondary"
              sx={{ textAlign: "center", flex: 1 }}
            >
              Education
            </WillowTypography>
          </Box>
        </Box>

        {/* Career Cards */}
        <Grid container spacing={0}>
          {recommendedCareers.map((career, index) => (
            <Grid size={{ xs: 12 }} key={career.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  borderTop: index === 0 ? "none" : `1px solid ${neutral[300]}`,
                  borderBottom:
                    index === recommendedCareers.length - 1
                      ? `1px solid ${neutral[300]}`
                      : "none",
                  backgroundColor: essentials.white,
                  cursor: "pointer",
                  transition: "background-color 0.2s ease-in-out",
                  "&:hover": { backgroundColor: neutral[50] },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: ui.mint,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Star size={20} color={Slate[900]} />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <WillowTypography variant="subheading" weight="semibold" sx={{ mb: 1 }}>
                      {career.title}
                    </WillowTypography>

                    {career.isTopPick && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          backgroundColor: "#F0FFAC",
                          borderRadius: 1,
                          px: 1,
                          py: 0.5,
                          mb: 1,
                          width: "fit-content",
                        }}
                      >
                        <WillowTypography variant="body" weight="semibold">
                          Top pick for you
                        </WillowTypography>
                      </Box>
                    )}

                    {career.tags.length > 0 && (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {career.tags.slice(0, 3).map((tag) => (
                          <Chip
                            key={tag.id}
                            label={tag.description}
                            variant="outlined"
                            sx={{ fontSize: "0.75rem", borderColor: neutral[300] }}
                          />
                        ))}
                        {career.tags.length > 3 && (
                          <WillowTypography variant="body" color="muted">
                            +{career.tags.length - 3} more
                          </WillowTypography>
                        )}
                      </Box>
                    )}
                  </Box>
                </Box>

                <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4, minWidth: 280 }}>
                  <Box sx={{ textAlign: "center", flex: 1 }}>
                    <WillowTypography variant="body-lg" weight="semibold">
                      ${career.medianSalary.toLocaleString()}
                    </WillowTypography>
                  </Box>
                  <Box sx={{ textAlign: "center", flex: 1 }}>
                    <WillowTypography variant="body-lg" weight="semibold">
                      {career.education}
                    </WillowTypography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default RecommendedCareersSection;
