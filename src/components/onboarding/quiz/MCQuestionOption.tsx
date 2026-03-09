import React, { useMemo, useCallback } from "react";
import { QuestionOption } from "../../../mock/quizData";
import { Box, WillowTypography } from "@willow/ui-kit";
import { neutral } from "@willow/ui-kit";

type Props = {
  option: QuestionOption;
  selectedOptions: string[];
  onSelect: (optionId: string) => void;
  maxSelections: number;
};

const MCQuestionOption: React.FC<Props> = ({ option, selectedOptions, onSelect, maxSelections }) => {
  const isSelected = useMemo(() => selectedOptions.includes(option.optionId), [selectedOptions, option.optionId]);
  const optionNumber = isSelected ? selectedOptions.indexOf(option.optionId) + 1 : null;

  const handleClick = useCallback(() => {
    onSelect(option.optionId);
  }, [onSelect, option.optionId]);

  const circleStyle = useMemo(
    () => ({
      width: 32,
      height: 32,
      minWidth: 32,
      minHeight: 32,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 1,
      border: `1px solid ${neutral[600]}`,
      bgcolor: neutral[25],
      fontSize: "16px",
      fontWeight: "bold",
      color: neutral[800],
    }),
    [],
  );

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2, cursor: "pointer" }}
      onClick={handleClick}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <Box sx={circleStyle} aria-hidden="true">
        {optionNumber}
      </Box>
      <WillowTypography variant="body" weight={isSelected ? "semibold" : "regular"} color="secondary">
        {option.optionText}
      </WillowTypography>
    </Box>
  );
};

export default React.memo(MCQuestionOption);
