import React from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import { Divider } from "@mui/material";
import { BookOpen } from "@willow/icons";
import { Slate, neutral } from "@willow/ui-kit";

interface StudyTipsSectionProps {
  parsedStudyTips: Array<{ title: string; body: string }>;
}

const StudyTipsSection: React.FC<StudyTipsSectionProps> = ({ parsedStudyTips }) => {
  if (parsedStudyTips.length === 0) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box sx={{ color: Slate[900], mr: 1 }}>
          <BookOpen size={24} />
        </Box>
        <WillowTypography
          variant="heading"
          sx={{ color: Slate[900], fontWeight: "bold", fontSize: { xs: "1.5rem", md: "2rem" } }}
        >
          Study tips
        </WillowTypography>
      </Box>

      <Box>
        {parsedStudyTips.map((tip, index) => (
          <Box key={index}>
            <Box>
              <WillowTypography
                variant="body"
                weight="semibold"
                sx={{ color: neutral[900], mb: 2 }}
              >
                {tip.title}
              </WillowTypography>
              <br />
              {tip.body && (
                <WillowTypography variant="body" sx={{ color: neutral[700], lineHeight: 1.6 }}>
                  {tip.body}
                </WillowTypography>
              )}
            </Box>
            {index < parsedStudyTips.length - 1 && (
              <Divider sx={{ borderColor: neutral[200], my: 2 }} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StudyTipsSection;
