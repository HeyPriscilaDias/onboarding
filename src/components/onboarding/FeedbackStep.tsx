import React, { memo } from "react";
import { ButtonGroup } from "@mui/material";
import { Box, TextButton, WillowTypography, red } from "@willow/ui-kit";
import OnboardingLayout from "./OnboardingLayout";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import useFeedbackStep from "../../hooks/onboarding/useFeedbackStep";

const FeedbackStep: React.FC = () => {
  const { mobile } = useWindowDimensions();
  const {
    clarity, setClarity, preparedness, setPreparedness,
    error, setError, handleBack, handleContinue, isFirstQuestion, isLoading,
  } = useFeedbackStep();

  const renderButtons = (value: number | null, setter: (value: number) => void) => {
    const buttons = Array.from({ length: 10 }, (_, index) => {
      const buttonValue = index + 1;
      const isSelected = value === buttonValue;
      return (
        <TextButton
          key={buttonValue}
          variant={isSelected ? "primary" : "secondary"}
          onClick={() => { setter(buttonValue); setError(false); }}
          sx={{ height: 40 }}
        >
          {buttonValue}
        </TextButton>
      );
    });

    return mobile ? (
      <Box sx={{ width: "100%", boxSizing: "border-box", px: 0 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0.5, width: "100%", ml: -1, mt: 1 }}>
          {buttons}
        </Box>
      </Box>
    ) : (
      <ButtonGroup fullWidth>{buttons}</ButtonGroup>
    );
  };

  const currentQuestionText = isFirstQuestion
    ? "How clear are you on what you want your career and life after high school to be like?"
    : "How prepared do you feel for life after high school?";
  const helperText = isFirstQuestion
    ? { left: "Not clear at all", right: "Completely clear" }
    : { left: "Not prepared at all", right: "Completely prepared" };
  const currentValue = isFirstQuestion ? clarity : preparedness;
  const currentSetter = isFirstQuestion ? setClarity : setPreparedness;

  return (
    <OnboardingLayout currentStep={4} handleContinue={handleContinue} handleBack={handleBack} isLoading={isLoading}>
      <Box component="form" sx={{ textAlign: "left" }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: 500, mx: "auto" }}>
          <WillowTypography variant="display" color="primary">{currentQuestionText}</WillowTypography>
        </Box>

        <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 3, width: "100%", maxWidth: 500, mx: "auto" }}>
          <Box>
            {renderButtons(currentValue, currentSetter)}
            <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <WillowTypography variant="body" color="secondary">{helperText.left}</WillowTypography>
              <WillowTypography variant="body" color="secondary">{helperText.right}</WillowTypography>
            </Box>
            {error && (
              <WillowTypography sx={{ textAlign: "center", mt: 2 }} style={{ color: red[600] }}>
                Please select an option before continuing.
              </WillowTypography>
            )}
          </Box>
        </Box>
      </Box>
    </OnboardingLayout>
  );
};

export default memo(FeedbackStep);
