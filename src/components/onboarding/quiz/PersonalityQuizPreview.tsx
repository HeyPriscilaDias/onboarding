import React, { memo, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Box, TextButton, WillowTypography } from "@willow/ui-kit";
import { neutral } from "@willow/ui-kit";
import PersonalityQuizLayout from "./PersonalityQuizLayout";
import { useCurrentStudent } from "../../../hooks/useCurrentStudent";
import { studentService } from "../../../mock/mockServices";
import { MOCK_PERSONALITY_TYPES, DEFAULT_PERSONALITY_TYPE, PERSONALITY_TITLE_MAP } from "../../../mock/quizData";

const PersonalityQuizPreview: React.FC = () => {
  const { data: loggedInStudent, refetch } = useCurrentStudent();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const personalityType = useMemo(() => {
    const typeId = loggedInStudent?.personalityType;
    if (!typeId) return DEFAULT_PERSONALITY_TYPE;
    if (MOCK_PERSONALITY_TYPES[typeId]) return MOCK_PERSONALITY_TYPES[typeId];
    // Build from title map
    const title = PERSONALITY_TITLE_MAP[typeId] ?? "Intuitive Explorer";
    return { ...DEFAULT_PERSONALITY_TYPE, id: typeId, title };
  }, [loggedInStudent?.personalityType]);

  const superpowers = useMemo(() => {
    return personalityType.superpowers
      .split(/\s*[-*]\s*/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }, [personalityType]);

  const handleContinue = useCallback(async () => {
    if (!loggedInStudent?.id) return;
    await studentService.updateStudentGoldenPath(loggedInStudent.id, {
      quizComplete: true,
      pressingChallengesComplete: true,
      onboardingState: "personalization" as const,
      onboardingStage: 8,
    });
    await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
    await refetch();
    navigate("/student/onboarding/personalization", { replace: true });
  }, [loggedInStudent, queryClient, refetch, navigate]);

  return (
    <PersonalityQuizLayout isStartPage={true} isPreviewPage={true}>
      <Box
        sx={{
          maxWidth: "800px",
          mx: "auto",
          px: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "calc(100vh - 120px)",
        }}
      >
        <Box>
          <WillowTypography variant="subheading" sx={{ color: neutral[25] }}>
            {loggedInStudent?.firstName || "You"}, you are a...
          </WillowTypography>

          <WillowTypography variant="heading" sx={{ color: neutral[25], mt: 1 }}>
            {personalityType.title}
          </WillowTypography>

          <WillowTypography variant="body" sx={{ color: neutral[25], mt: 4 }}>
            {personalityType.shortDescription} Your Superpowers:
          </WillowTypography>
        </Box>

        <Box sx={{ mt: 4 }}>
          {superpowers.map((power, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 1.5 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: neutral[25],
                  flexShrink: 0,
                }}
              />
              <WillowTypography variant="body" sx={{ color: neutral[25] }}>
                {power}
              </WillowTypography>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "end", mt: 6 }}>
          <TextButton variant="on-dark" onClick={handleContinue}>
            Continue
          </TextButton>
        </Box>
      </Box>
    </PersonalityQuizLayout>
  );
};

export default memo(PersonalityQuizPreview);
