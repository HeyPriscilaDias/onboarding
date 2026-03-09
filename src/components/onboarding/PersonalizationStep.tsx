import React, { memo, useState } from "react";
import { Box, WillowTypography, Slate, hexToRgba, Checkbox } from "@willow/ui-kit";
import { FormControlLabel } from "@mui/material";
import OnboardingLayout from "./OnboardingLayout";
import { useUpdatePersonalization } from "../../hooks/useUpdatePersonalization";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentStudentData } from "../../hooks/useCurrentStudent";
import { studentService } from "../../mock/mockServices";
import type { IncomeBracket } from "../../types";

const INCOME_OPTIONS: { label: string; description: string; bracket: NonNullable<IncomeBracket> }[] = [
  { label: "Lower income", description: "Typically receives free/reduced lunch, SNAP, or government-assisted housing.", bracket: "lower" },
  { label: "Middle income", description: "Typically pays for most household expenses, may receive some tax credits.", bracket: "middle" },
  { label: "Higher income", description: "Has savings, can handle unexpected expenses comfortably.", bracket: "higher" },
];

const PersonalizationStep: React.FC = () => {
  const { student: loggedInStudent } = useCurrentStudentData();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const initialIncomeBracket = loggedInStudent?.incomeBracket;
  const [selectedBracket, setSelectedBracket] = useState<"lower" | "middle" | "higher" | null>(
    initialIncomeBracket === null || initialIncomeBracket === undefined ? null : initialIncomeBracket,
  );
  const [preferNotToAnswer, setPreferNotToAnswer] = useState(initialIncomeBracket === null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: updatePersonalization } = useUpdatePersonalization();

  const handleSelectBracket = (bracket: NonNullable<IncomeBracket>) => {
    setSelectedBracket(bracket);
    setPreferNotToAnswer(false);
  };

  const handlePreferNotToAnswer = (checked: boolean) => {
    setPreferNotToAnswer(checked);
    if (checked) {
      setSelectedBracket(null);
    }
  };

  const handleContinue = async () => {
    if (!loggedInStudent?.id) return;
    setIsSubmitting(true);

    const incomeBracketToSubmit = preferNotToAnswer ? null : (selectedBracket || "middle");

    updatePersonalization(
      { studentId: loggedInStudent.id, incomeBracket: incomeBracketToSubmit },
      {
        onSuccess: async () => {
          await studentService.updateStudentGoldenPath(loggedInStudent.id, {
            onboardingStage: 7,
            onboardingState: "career-interests",
          });
          await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
          setIsSubmitting(false);
          navigate("/student/onboarding/career-interests", { replace: true });
        },
        onError: () => { setIsSubmitting(false); },
      },
    );
  };

  const handleBack = async () => {
    if (!loggedInStudent?.id) return;
    await studentService.updateStudentGoldenPath(loggedInStudent.id, {
      onboardingStage: 5,
      onboardingState: "my-why",
    });
    await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
    navigate("/student/onboarding/my-why", { replace: true });
  };

  return (
    <OnboardingLayout currentStep={4} handleContinue={handleContinue} handleBack={handleBack} isLoading={isSubmitting}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: 500, mx: "auto" }}>
        <WillowTypography variant="display" color="primary">
          Which best describes your family's financial situation?
        </WillowTypography>
        <WillowTypography variant="body" color="secondary" sx={{ mt: 1.5 }}>
          This helps Willow personalize college cost and ROI estimates for you. It is not an official financial aid calculator.
        </WillowTypography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 4 }}>
          {INCOME_OPTIONS.map(({ label, description, bracket }) => {
            const isSelected = selectedBracket === bracket && !preferNotToAnswer;
            return (
              <Box
                key={bracket}
                component="button"
                type="button"
                onClick={() => handleSelectBracket(bracket)}
                sx={{
                  bgcolor: isSelected ? Slate[700] : "transparent",
                  color: isSelected ? "#fff" : Slate[700],
                  border: `1px solid ${isSelected ? Slate[700] : hexToRgba(Slate[700], 0.2)}`,
                  borderRadius: "12px",
                  padding: "14px 20px",
                  cursor: "pointer",
                  transition: "background-color 0.2s, color 0.2s",
                  outline: "none",
                  fontFamily: "inherit",
                  textAlign: "left",
                }}
              >
                <WillowTypography variant="body" weight="semibold" sx={{ color: "inherit" }}>
                  {label}
                </WillowTypography>
                <WillowTypography variant="body" sx={{ color: isSelected ? "rgba(255,255,255,0.75)" : "inherit", opacity: isSelected ? 1 : 0.6, mt: 0.5 }}>
                  {description}
                </WillowTypography>
              </Box>
            );
          })}
        </Box>

        <Box sx={{ mt: 2 }}>
          <FormControlLabel
            control={<Checkbox checked={preferNotToAnswer} onChange={(e) => handlePreferNotToAnswer(e.target.checked)} />}
            label="I prefer not to answer"
            sx={{ color: Slate[700], opacity: 0.6 }}
          />
        </Box>
      </Box>
    </OnboardingLayout>
  );
};

export default memo(PersonalizationStep);
