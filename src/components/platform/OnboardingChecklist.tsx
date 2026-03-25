import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, WillowTypography } from "@willow/ui-kit";
import { neutral, essentials, Slate } from "@willow/ui-kit";
import { PersonalityType, Careers, BookOpen, Award, Settings, CheckCircle, CircleDashed } from "@willow/icons";
import { useCurrentStudentData } from "../../hooks/useCurrentStudent";

const OnboardingChecklist: React.FC = () => {
  const navigate = useNavigate();
  const { student } = useCurrentStudentData();

  const items = [
    {
      label: "Set up your account",
      description: "Add your basic info, school details, and GPA to personalize your Willow experience.",
      icon: <Settings size={20} />,
      done: true,
      onClick: undefined,
      time: "Completed",
    },
    {
      label: "Take the Personality Quiz",
      description: "Answer a series of fun questions to discover your unique learning style, strengths, and preferences.",
      icon: <PersonalityType size={20} />,
      done: !!student?.quizComplete,
      onClick: () => navigate("/student/onboarding/personality-quiz/start"),
      time: "~15 min",
    },
    {
      label: "Set up your career interests",
      description: "Browse career categories and select the ones that spark your curiosity. We'll use these to personalize your experience.",
      icon: <Careers size={20} />,
      done: (student?.careerInterestTags?.length ?? 0) > 0,
      onClick: () => navigate("/student/onboarding/career-interests"),
      time: "~5 min",
    },
    {
      label: "Complete the Lorem Ipsum survey",
      description: "Share your personal motivations, goals, and what inspires you so we can tailor your recommendations.",
      icon: <BookOpen size={20} />,
      done: !!student?.myWhy && (student?.personalFeedback?.length ?? 0) > 0,
      onClick: () => navigate("/student/onboarding/my-why"),
      time: "~10 min",
    },
    {
      label: "Complete the AI User Agreement",
      description: "Review and accept the terms for using AI-powered features in Willow. Quick and straightforward.",
      icon: <Award size={20} />,
      done: false,
      onClick: undefined,
      time: "~2 min",
    },
  ];

  const completedCount = items.filter((i) => i.done).length;
  const firstIncomplete = items.findIndex((i) => !i.done);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(firstIncomplete >= 0 ? firstIncomplete : null);

  const progressPercent = (completedCount / items.length) * 100;

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          borderRadius: "12px",
          border: `1px solid ${neutral[200]}`,
          overflow: "hidden",
        }}
      >
        <Box sx={{ px: 2.5, pt: 2.5, pb: 2 }}>
          <WillowTypography variant="heading" color="primary">
            Get started
          </WillowTypography>
          <WillowTypography variant="body" sx={{ color: neutral[500], mt: 0.5 }}>
            Great job setting up your account! Let's finish getting you ready.
          </WillowTypography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 2 }}>
            <Box
              sx={{
                flex: 1,
                height: 6,
                borderRadius: 3,
                backgroundColor: neutral[200],
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: `${progressPercent}%`,
                  height: "100%",
                  borderRadius: 3,
                  backgroundColor: Slate[500],
                  transition: "width 0.4s ease",
                }}
              />
            </Box>
            <WillowTypography variant="caption" sx={{ color: neutral[500], whiteSpace: "nowrap" }}>
              {completedCount} of {items.length}
            </WillowTypography>
          </Box>
        </Box>
        {items.map((item, i) => {
          const isExpanded = expandedIndex === i;
          return (
            <Box key={item.label}>
              {/* Header row */}
              <Box
                component="button"
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  px: 2.5,
                  py: 2,
                  width: "100%",
                  bgcolor: item.done ? neutral[50] : isExpanded ? `${Slate[600]}05` : "#fff",
                  border: "none",
                  borderBottom: i < items.length - 1 ? `1px solid ${neutral[100]}` : "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                  transition: "background-color 0.15s",
                  "&:hover": { bgcolor: item.done ? neutral[100] : neutral[50] },
                }}
              >
                {/* Status indicator */}
                {item.done ? (
                  <CheckCircle size={24} color="#10b981" />
                ) : (
                  <CircleDashed size={24} color={neutral[300]} />
                )}

                <WillowTypography
                  variant="body-lg"
                  sx={{
                    flex: 1,
                    fontWeight: 500,
                    color: item.done ? neutral[400] : neutral[800],
                    textDecoration: item.done ? "line-through" : "none",
                    textDecorationColor: neutral[300],
                  }}
                >
                  {item.label}
                </WillowTypography>

                <WillowTypography variant="body" sx={{ color: neutral[400], fontSize: 12, mr: 1 }}>
                  {item.time}
                </WillowTypography>

                {/* Chevron */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                >
                  <path d="M4 6L8 10L12 6" stroke={neutral[400]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Box>

              {/* Expanded content */}
              <Box
                sx={{
                  maxHeight: isExpanded ? 200 : 0,
                  opacity: isExpanded ? 1 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.3s ease, opacity 0.25s ease",
                }}
              >
                <Box
                  sx={{
                    px: 2.5,
                    py: 2,
                    pl: 7.5,
                    bgcolor: "#fff",
                    borderBottom: i < items.length - 1 ? `1px solid ${neutral[100]}` : "none",
                  }}
                >
                  <WillowTypography variant="body" sx={{ color: neutral[600], lineHeight: 1.6, mb: item.onClick ? 2 : 0 }}>
                    {item.description}
                  </WillowTypography>

                  {!item.done && item.onClick && (
                    <Box
                      component="button"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        item.onClick?.();
                      }}
                      sx={{
                        px: 2.5,
                        py: 1,
                        borderRadius: "8px",
                        bgcolor: Slate[600],
                        color: essentials.white,
                        fontSize: 13,
                        fontWeight: 600,
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        "&:hover": { opacity: 0.9 },
                      }}
                    >
                      Start →
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default OnboardingChecklist;
