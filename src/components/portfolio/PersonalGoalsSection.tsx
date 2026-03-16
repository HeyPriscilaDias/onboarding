import React from "react";
import { Box, Grid, WillowTypography } from "@willow/ui-kit";
import { Target, Brain, TrendingUp, Butterfly } from "@willow/icons";
import { Slate, neutral, ui } from "@willow/ui-kit";

interface PersonalGoalsSectionProps {
  parsedPersonalGoals: Array<{ title: string; body: string }>;
}

const GOAL_ICONS = [Brain, TrendingUp, Butterfly];

const PersonalGoalsSection: React.FC<PersonalGoalsSectionProps> = ({ parsedPersonalGoals }) => {
  if (parsedPersonalGoals.length === 0) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box sx={{ color: Slate[900], mr: 1 }}>
          <Target size={24} />
        </Box>
        <WillowTypography
          variant="heading"
          sx={{ color: Slate[900], fontWeight: "bold", fontSize: { xs: "1.5rem", md: "2rem" } }}
        >
          Personal development goals
        </WillowTypography>
      </Box>

      <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
        {parsedPersonalGoals.map((goal, index) => {
          const Icon = GOAL_ICONS[index % GOAL_ICONS.length];
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: "flex" }}>
              <Box
                sx={{
                  border: `1px solid ${neutral[300]}`,
                  borderRadius: "12px",
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: ui.mint,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1,
                  }}
                >
                  <Icon size={20} color={Slate[900]} />
                </Box>
                <WillowTypography
                  variant="body"
                  weight="semibold"
                  sx={{ color: neutral[900], fontWeight: "bold", fontSize: "1rem" }}
                >
                  {goal.title}
                </WillowTypography>
                {goal.body && (
                  <WillowTypography variant="body" sx={{ color: neutral[600], lineHeight: 1.5 }}>
                    {goal.body}
                  </WillowTypography>
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default PersonalGoalsSection;
