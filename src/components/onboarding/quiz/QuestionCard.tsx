import React from "react";
import { QuestionRecord } from "../../../mock/quizData";
import { Box, WillowTypography } from "@willow/ui-kit";
import MCQuestionOption from "./MCQuestionOption";

type Props = {
  question: QuestionRecord;
  selectedOptions: string[];
  onOptionSelect: (optionId: string) => void;
};

const QuestionCard: React.FC<Props> = ({ question, selectedOptions, onOptionSelect }) => {
  const maxSelections = question.options.length === 2 ? 1 : 2;

  return (
    <Box sx={{ mt: 2 }}>
      <WillowTypography variant="heading" color="primary">
        {question.questionText}
      </WillowTypography>
      <WillowTypography variant="body-lg" color="secondary" sx={{ mt: 3 }}>
        Select your top {maxSelections === 1 ? "option" : "and second top option"} that best describes you.
      </WillowTypography>
      <Box sx={{ mt: 1.5 }}>
        {question.options.map((option, index) => (
          <MCQuestionOption
            key={index}
            option={option}
            selectedOptions={selectedOptions}
            onSelect={onOptionSelect}
            maxSelections={maxSelections}
          />
        ))}
      </Box>
    </Box>
  );
};

export default QuestionCard;
