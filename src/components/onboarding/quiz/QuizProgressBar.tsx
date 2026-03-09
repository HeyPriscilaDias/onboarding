import React from "react";
import { Box, Slate } from "@willow/ui-kit";
import { neutral } from "@willow/ui-kit";

type Props = {
  questionNumber: number;
  totalQuestions: number;
};

const QuizProgressBar: React.FC<Props> = ({ questionNumber, totalQuestions }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        mt: 0,
        gap: 0.5,
      }}
    >
      {[...Array(totalQuestions)].map((_, index) => (
        <Box
          key={index}
          sx={{
            backgroundColor: index < questionNumber ? Slate[700] : neutral[300],
            height: 4,
            flex: 1,
            borderRadius: "999px",
            transition: "background-color 0.3s ease-in-out",
          }}
        />
      ))}
    </Box>
  );
};

export default QuizProgressBar;
