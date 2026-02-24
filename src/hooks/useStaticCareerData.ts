import { useState, useEffect, useMemo } from "react";
import { RecommendationStage } from "../state/prototypeAtoms";

export type CareerTag = {
  id: string;
  name: string;
  description: string;
};

export type PressingChallenge = {
  id: string;
  title: string;
  tag: string;
  guidingQuestion: string;
  focus: string[];
  sampleCareers: string[];
  imageName: string;
};

export type CareerData = {
  id: string;
  title: string;
  description: string;
  medianSalary: number;
  medianHourly: number;
  startingSalary: number;
  startingHourly: number;
  bright_outlook: boolean;
  green_occupation: boolean;
  projectedGrowth: string;
  projectedOpenings: number;
  competition: number;
  industry_id: number;
  industry_sub_id: number;
  zone: number;
  tags: { id: string; description: string }[];
  pressingChallenges: { id: string; description: string }[];
  attainment: {
    associates: string;
    bachelors: string;
    highSchool: string;
    masters: string;
    phd: string;
  };
  cip_codes: string[];
  createdAt: string;
  lastUpdatedAt: string;
};

// Interest tags that the mock student selected during onboarding
const MOCK_INTEREST_TAGS = ["high_growth", "creative", "hands_on"];

// Pressing challenge IDs that map to the student's GPC ratings
const MOCK_GPC_INTERESTS = ["health", "tech", "education"];

// Careers the personality type recommends (titles to match against)
const PERSONALITY_CAREER_TITLES = [
  "Registered Nurse",
  "Mental Health Counselor",
  "Social Worker",
  "Health Educator",
  "Elementary School Teacher",
  "Career Counselor",
  "Community Service Manager",
  "Dietitian and Nutritionist",
  "Physical Therapist",
  "Athletic Trainer",
  "Recreational Therapist",
  "Marriage and Family Therapist",
];

export const useStaticCareerData = (recStage: RecommendationStage) => {
  const [allCareers, setAllCareers] = useState<CareerData[]>([]);
  const [careerTags, setCareerTags] = useState<CareerTag[]>([]);
  const [pressingChallenges, setPressingChallenges] = useState<PressingChallenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [jobs, tags, challenges] = await Promise.all([
          fetch("/assets/data/jobs.json").then((r) => r.json()),
          fetch("/assets/data/jobTags.json").then((r) => r.json()),
          fetch("/assets/data/pressingChallenges.json").then((r) => r.json()),
        ]);
        setAllCareers(jobs);
        setCareerTags(tags);
        setPressingChallenges(challenges);
      } catch (err) {
        console.warn("Failed to load career data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const recommendations = useMemo(() => {
    if (allCareers.length === 0) return [];

    switch (recStage) {
      case "interest-only": {
        // Filter by interest tags
        const matched = allCareers.filter((career) =>
          career.tags?.some((t) => MOCK_INTEREST_TAGS.includes(t.id))
        );
        // Sort by salary descending and take top 6
        return matched.sort((a, b) => b.medianSalary - a.medianSalary).slice(0, 6);
      }

      case "interest-personality": {
        // First priority: careers matching personality type recommendations
        const personalityMatches = allCareers.filter((career) =>
          PERSONALITY_CAREER_TITLES.some(
            (title) => career.title.toLowerCase() === title.toLowerCase()
          )
        );
        // Fill remaining with interest tag matches
        const personalityIds = new Set(personalityMatches.map((c) => c.id));
        const interestMatches = allCareers
          .filter(
            (career) =>
              !personalityIds.has(career.id) &&
              career.tags?.some((t) => MOCK_INTEREST_TAGS.includes(t.id))
          )
          .sort((a, b) => b.medianSalary - a.medianSalary);

        return [...personalityMatches.slice(0, 4), ...interestMatches.slice(0, 2)];
      }

      case "interest-personality-gpc": {
        // Personality matches first
        const personalityMatches = allCareers.filter((career) =>
          PERSONALITY_CAREER_TITLES.some(
            (title) => career.title.toLowerCase() === title.toLowerCase()
          )
        );
        // GPC-related careers
        const personalityIds = new Set(personalityMatches.map((c) => c.id));
        const gpcMatches = allCareers
          .filter(
            (career) =>
              !personalityIds.has(career.id) &&
              career.pressingChallenges?.some((pc) => MOCK_GPC_INTERESTS.includes(pc.id))
          )
          .sort((a, b) => b.medianSalary - a.medianSalary);

        return [...personalityMatches.slice(0, 3), ...gpcMatches.slice(0, 3)];
      }

      default:
        return allCareers.slice(0, 6);
    }
  }, [allCareers, recStage]);

  const recLabel = useMemo(() => {
    switch (recStage) {
      case "interest-only":
        return "Because you're interested in Healthcare and Technology";
      case "interest-personality":
        return "Based on your interests and personality type";
      case "interest-personality-gpc":
        return "Personalized for you — based on your interests, personality, and values";
      default:
        return "You may like";
    }
  }, [recStage]);

  return { recommendations, recLabel, careerTags, pressingChallenges, isLoading };
};
