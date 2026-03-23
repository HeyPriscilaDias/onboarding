import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, WillowTypography } from "@willow/ui-kit";
import { Slate, neutral, essentials } from "@willow/ui-kit";
import { PersonalityType, Careers, BookOpen, Award, Settings } from "@willow/icons";
import { useCurrentStudentData } from "../../hooks/useCurrentStudent";

type ChecklistItem = {
  label: string;
  icon: React.ReactNode;
  done: boolean;
  disabled?: boolean;
  disabledLabel?: string;
  onClick?: () => void;
};

const OnboardingChecklist: React.FC = () => {
  const navigate = useNavigate();
  const { student } = useCurrentStudentData();

  const items: ChecklistItem[] = [
    {
      label: "Account setup",
      icon: <Settings size={20} color={essentials.white} />,
      done: true,
    },
    {
      label: "Personality Quiz",
      icon: <PersonalityType size={20} color={student?.quizComplete ? essentials.white : Slate[500]} />,
      done: !!student?.quizComplete,
      onClick: () => navigate("/student/onboarding/personality-quiz/start"),
    },
    {
      label: "Career Interests",
      icon: <Careers size={20} color={(student?.careerInterestTags?.length ?? 0) > 0 ? essentials.white : Slate[500]} />,
      done: (student?.careerInterestTags?.length ?? 0) > 0,
      onClick: () => navigate("/student/onboarding/career-interests"),
    },
    {
      label: "Survey",
      icon: <BookOpen size={20} color={!!student?.myWhy && (student?.personalFeedback?.length ?? 0) > 0 ? essentials.white : Slate[500]} />,
      done: !!student?.myWhy && (student?.personalFeedback?.length ?? 0) > 0,
      onClick: () => navigate("/student/onboarding/my-why"),
    },
    {
      label: "AI Use Agreement",
      icon: <Award size={20} color={Slate[500]} />,
      done: false,
    },
  ];

  const completedCount = items.filter((i) => i.done).length;

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <WillowTypography variant="heading" color="primary">
          Get started
        </WillowTypography>
        <WillowTypography variant="body" sx={{ color: neutral[500] }}>
          {completedCount} of {items.length} complete
        </WillowTypography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {items.map((item) => (
          <Box
            key={item.label}
            component={item.disabled ? "div" : "button"}
            onClick={item.disabled ? undefined : item.done ? undefined : item.onClick}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 2.5,
              py: 2,
              borderRadius: "10px",
              border: `1px solid ${item.done ? Slate[600] : item.disabled ? neutral[200] : neutral[300]}`,
              bgcolor: item.done ? Slate[600] : item.disabled ? neutral[50] : "#fff",
              cursor: item.disabled ? "default" : item.done ? "default" : "pointer",
              opacity: item.disabled ? 0.6 : 1,
              textAlign: "left" as const,
              fontFamily: "inherit",
              width: "100%",
              transition: "border-color 0.15s, box-shadow 0.15s",
              ...(!item.disabled && !item.done
                ? {
                    "&:hover": {
                      borderColor: Slate[400],
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    },
                  }
                : {}),
            }}
          >
            {/* Checkbox circle */}
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: item.done
                  ? `2px solid ${essentials.white}`
                  : `2px solid ${item.disabled ? neutral[300] : neutral[400]}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                bgcolor: item.done ? "rgba(255,255,255,0.15)" : "transparent",
              }}
            >
              {item.done && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2.5 7L5.5 10L11.5 4"
                    stroke={essentials.white}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </Box>

            {/* Icon */}
            {item.icon}

            {/* Label */}
            <WillowTypography
              variant="body-lg"
              sx={{
                color: item.done ? essentials.white : item.disabled ? neutral[500] : neutral[900],
                fontWeight: 500,
                flex: 1,
                textDecoration: item.done ? "line-through" : "none",
                textDecorationColor: "rgba(255,255,255,0.4)",
              }}
            >
              {item.label}
            </WillowTypography>

            {/* Status */}
            {item.disabled && item.disabledLabel && (
              <WillowTypography
                variant="body"
                sx={{ color: neutral[400], fontSize: 12, fontStyle: "italic" }}
              >
                {item.disabledLabel}
              </WillowTypography>
            )}
            {item.done && (
              <WillowTypography
                variant="body"
                sx={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}
              >
                Done
              </WillowTypography>
            )}
            {!item.done && !item.disabled && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4L10 8L6 12"
                  stroke={neutral[400]}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default OnboardingChecklist;
