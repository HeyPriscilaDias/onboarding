import React from "react";
import { Box, WillowTypography, Chip } from "@willow/ui-kit";
import { Slate, neutral } from "@willow/ui-kit";
import { Careers } from "@willow/icons";
import { CareerData, CareerTag } from "../../hooks/useStaticCareerData";

type Props = {
  career: CareerData;
  careerTags: CareerTag[];
};

const getHighestAttainment = (attainment?: CareerData["attainment"]): string => {
  if (!attainment) return "No Education Data Available";
  const levels = {
    highSchool: Number(attainment.highSchool) || 0,
    associates: Number(attainment.associates) || 0,
    bachelors: Number(attainment.bachelors) || 0,
    masters: Number(attainment.masters) || 0,
    phd: Number(attainment.phd) || 0,
  };
  const highest = Object.entries(levels).reduce(
    (max, [key, value]) => (value > max.value ? { key, value } : max),
    { key: "highSchool", value: levels.highSchool }
  ).key;
  switch (highest) {
    case "phd":
    case "masters":
      return "6+ Years Advanced Degree";
    case "bachelors":
      return "4 Year Bachelors";
    case "associates":
      return "2 Year Associates";
    default:
      return "No Degree Required";
  }
};

const formatCurrency = (amount: number | undefined): string => {
  if (!amount) return "N/A";
  return `$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
};

const MockCareerCard: React.FC<Props> = ({ career, careerTags }) => {
  const { title, description, medianSalary, tags, attainment } = career;

  const resolvedTags = (tags || [])
    .map((t) => {
      const found = careerTags.find((ct) => ct.id === t.id);
      return found ? found.name : null;
    })
    .filter(Boolean)
    .slice(0, 4);

  return (
    <Box
      sx={{
        borderRadius: "12px",
        overflow: "hidden",
        border: `1px solid ${neutral[300]}`,
        cursor: "pointer",
        transition: "box-shadow 0.2s, border-color 0.2s",
        height: 500,
        minWidth: 280,
        maxWidth: 320,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        bgcolor: "#fff",
        "&:hover": {
          borderColor: Slate[400],
          boxShadow: "0px 4px 6px -2px rgba(10, 13, 18, 0.03)",
        },
      }}
    >
      {/* Top area - icon placeholder instead of video */}
      <Box
        sx={{
          height: 180,
          bgcolor: Slate[700],
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <Careers size={32} color="#ACF7B2" />
      </Box>

      {/* Content */}
      <Box sx={{ px: 2, pt: 2, display: "flex", flexDirection: "column", flex: 1 }}>
        <WillowTypography variant="subheading" color="primary" sx={{ mb: 0.5 }}>
          {title}
        </WillowTypography>
        <WillowTypography
          variant="body"
          color="secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            mb: 1.5,
          }}
        >
          {description}
        </WillowTypography>

        <Box sx={{ mb: 1.5 }}>
          <WillowTypography variant="body" weight="semibold" color="secondary" sx={{ mb: 0.25 }}>
            Median Salary
          </WillowTypography>
          <WillowTypography
            variant="body"
            sx={{ color: medianSalary >= 60000 ? Slate[400] : "#b45309" }}
          >
            {formatCurrency(medianSalary)}
          </WillowTypography>
        </Box>

        <Box>
          <WillowTypography variant="body" weight="semibold" color="secondary" sx={{ mb: 0.25 }}>
            Education
          </WillowTypography>
          <WillowTypography variant="body" color="secondary">
            {getHighestAttainment(attainment)}
          </WillowTypography>
        </Box>

        {/* Tags */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.75,
            mt: "auto",
            pt: 2,
            pb: 2,
          }}
        >
          {resolvedTags.map((tag) => (
            <Chip key={tag} label={tag} color="primary" variant="outlined" size="small" />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MockCareerCard;
