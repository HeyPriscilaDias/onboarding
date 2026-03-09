import React, { memo } from "react";
import { Box, CircularProgress } from "@willow/ui-kit";
import { neutral, essentials } from "@willow/ui-kit";
import PersonalityQuizLayout from "./PersonalityQuizLayout";
import QuestionCard from "./QuestionCard";
import QuizProgressBar from "./QuizProgressBar";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import usePersonalityQuizTake from "../../../hooks/onboarding/usePersonalityQuizTake";

const PersonalityQuizTake: React.FC = () => {
  const { mobile } = useWindowDimensions();
  const {
    loading,
    submitting,
    questions,
    currentQuestion,
    currentQuestionIndex,
    isLastQuestion,
    selectedOptions,
    handleOptionSelect,
    handleNext,
    handlePrevious,
  } = usePersonalityQuizTake();

  return (
    <PersonalityQuizLayout
      onNext={handleNext}
      onPrevious={handlePrevious}
      showPrevious={currentQuestionIndex > 0}
      isLastQuestion={isLastQuestion}
      isSubmitting={submitting}
    >
      {!mobile ? (
        <Box sx={{ height: "calc(100vh - 72px)", position: "relative" }}>
          {/* Background decorative card */}
          <Box
            sx={{
              background: "#D8FBDB",
              height: "110%",
              width: "90%",
              maxWidth: "600px",
              transform: "rotate(-6deg)",
              borderRadius: "24px",
              position: "absolute",
              mt: 6,
              top: 0,
              left: 0,
            }}
            aria-hidden="true"
          />

          {/* Main content card */}
          <Box
            sx={{
              display: "flex",
              transform: "rotate(-2deg)",
              padding: "56px",
              height: "110%",
              mt: 0.5,
              flexDirection: "column",
              maxWidth: "700px",
              alignItems: "flex-start",
              flexShrink: 0,
              borderRadius: "24px",
              background: neutral[25],
              boxShadow: "0px 25px 60px 0px rgba(16, 24, 40, 0.20)",
            }}
            role="main"
            aria-live="polite"
          >
            {loading ? (
              <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress size={80} />
              </Box>
            ) : (
              currentQuestion && (
                <>
                  <QuizProgressBar questionNumber={currentQuestionIndex + 1} totalQuestions={questions.length} />
                  <QuestionCard
                    question={currentQuestion}
                    selectedOptions={selectedOptions}
                    onOptionSelect={handleOptionSelect}
                  />
                </>
              )
            )}
          </Box>
        </Box>
      ) : (
        currentQuestion && (
          <>
            {loading ? (
              <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress size={80} />
              </Box>
            ) : (
              <Box sx={{ mt: 2 }} role="main" aria-live="polite">
                <QuizProgressBar questionNumber={currentQuestionIndex + 1} totalQuestions={questions.length} />
                <Box sx={{ m: 1, mt: 2, backgroundColor: essentials.white, borderRadius: 4, p: 3 }}>
                  <QuestionCard
                    question={currentQuestion}
                    selectedOptions={selectedOptions}
                    onOptionSelect={handleOptionSelect}
                  />
                </Box>
              </Box>
            )}
          </>
        )
      )}
    </PersonalityQuizLayout>
  );
};

export default memo(PersonalityQuizTake);
