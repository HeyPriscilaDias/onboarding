import React, { memo } from "react";
import { Box, WillowTypography, Slate, hexToRgba } from "@willow/ui-kit";
import OnboardingLayout from "./OnboardingLayout";
import useCareerInterestTagsStep from "../../hooks/onboarding/useCareerInterestTagsStep";

const CareerInterestTagsStep: React.FC = () => {
  const { selectedTags, toggleTag, handleContinue, handleBack, isLoading, CAREER_TAGS } =
    useCareerInterestTagsStep();

  return (
    <OnboardingLayout currentStep={6} handleContinue={handleContinue} handleBack={handleBack} isLoading={isLoading} continueLabel="Start exploring">
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: 500, mx: "auto" }}>
        <WillowTypography variant="display" color="primary">
          What kind of careers interest you?
        </WillowTypography>
        <WillowTypography variant="body" color="secondary" sx={{ mt: 1.5 }}>
          Pick at least three — you can change these later.
        </WillowTypography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 4 }}>
          {CAREER_TAGS.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <Box
                key={tag}
                component="button"
                type="button"
                onClick={() => toggleTag(tag)}
                sx={{
                  bgcolor: isSelected ? Slate[700] : "transparent",
                  color: isSelected ? "#fff" : Slate[700],
                  border: `1px solid ${isSelected ? Slate[700] : hexToRgba(Slate[700], 0.2)}`,
                  borderRadius: 100,
                  padding: "8px 20px",
                  cursor: "pointer",
                  transition: "background-color 0.2s, color 0.2s",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              >
                <WillowTypography variant="body" sx={{ color: "inherit" }}>
                  {tag}
                </WillowTypography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </OnboardingLayout>
  );
};

export default memo(CareerInterestTagsStep);
