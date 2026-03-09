// Mock personality quiz data for prototype
// Adapted from willow-vercel-migration personality quiz

export type QuestionOption = {
  optionId: string;
  optionText: string;
  optionAlignment: string | null;
};

export type QuestionRecord = {
  id: string;
  questionText: string;
  options: QuestionOption[];
  order: number;
  helperText?: string;
};

export type PersonalityTypeRecord = {
  id: string;
  title: string;
  shortDescription: string;
  superpowers: string;
};

// 10 representative personality quiz questions
export const MOCK_QUIZ_QUESTIONS: QuestionRecord[] = [
  {
    id: "q1",
    questionText: "When you have free time, what do you enjoy most?",
    order: 1,
    options: [
      { optionId: "q1a", optionText: "Building or fixing things with my hands", optionAlignment: "Realistic" },
      { optionId: "q1b", optionText: "Reading or researching a topic I'm curious about", optionAlignment: "Investigative" },
      { optionId: "q1c", optionText: "Creating art, music, or writing", optionAlignment: "Artistic" },
      { optionId: "q1d", optionText: "Hanging out and helping friends", optionAlignment: "Social" },
    ],
  },
  {
    id: "q2",
    questionText: "In a group project, which role do you naturally take?",
    order: 2,
    options: [
      { optionId: "q2a", optionText: "The leader who organizes everything", optionAlignment: "Enterprising" },
      { optionId: "q2b", optionText: "The one who keeps track of details and deadlines", optionAlignment: "Conventional" },
      { optionId: "q2c", optionText: "The creative who comes up with ideas", optionAlignment: "Artistic" },
      { optionId: "q2d", optionText: "The peacemaker who makes sure everyone gets along", optionAlignment: "Social" },
    ],
  },
  {
    id: "q3",
    questionText: "Which best describes how you approach new challenges?",
    order: 3,
    options: [
      { optionId: "q3a", optionText: "I dive right in and figure it out as I go", optionAlignment: "Openness" },
      { optionId: "q3b", optionText: "I make a plan and follow it step by step", optionAlignment: "Conscientiousness" },
    ],
  },
  {
    id: "q4",
    questionText: "At a party, you're most likely to...",
    order: 4,
    options: [
      { optionId: "q4a", optionText: "Be the center of attention, talking to everyone", optionAlignment: "Extraversion" },
      { optionId: "q4b", optionText: "Have a deep conversation with one or two people", optionAlignment: "Introversion" },
    ],
  },
  {
    id: "q5",
    questionText: "When a friend is going through a tough time, you tend to...",
    order: 5,
    options: [
      { optionId: "q5a", optionText: "Listen patiently and offer emotional support", optionAlignment: "Agreeableness" },
      { optionId: "q5b", optionText: "Give them direct, honest advice", optionAlignment: "Low Agreeableness" },
    ],
  },
  {
    id: "q6",
    questionText: "Which type of work environment appeals to you most?",
    order: 6,
    options: [
      { optionId: "q6a", optionText: "A science lab or tech workspace", optionAlignment: "Investigative" },
      { optionId: "q6b", optionText: "A design studio or creative agency", optionAlignment: "Artistic" },
      { optionId: "q6c", optionText: "A school, hospital, or community center", optionAlignment: "Social" },
      { optionId: "q6d", optionText: "A startup or business office", optionAlignment: "Enterprising" },
    ],
  },
  {
    id: "q7",
    questionText: "When things don't go as planned, you usually...",
    order: 7,
    options: [
      { optionId: "q7a", optionText: "Stay calm and find a new approach", optionAlignment: "Emotional Stability" },
      { optionId: "q7b", optionText: "Feel stressed but push through anyway", optionAlignment: "Neuroticism" },
    ],
  },
  {
    id: "q8",
    questionText: "What motivates you the most?",
    order: 8,
    options: [
      { optionId: "q8a", optionText: "Discovering something nobody else has found", optionAlignment: "Investigative" },
      { optionId: "q8b", optionText: "Expressing myself in a unique way", optionAlignment: "Artistic" },
      { optionId: "q8c", optionText: "Making a real difference in people's lives", optionAlignment: "Social" },
      { optionId: "q8d", optionText: "Achieving goals and being recognized for it", optionAlignment: "Enterprising" },
    ],
  },
  {
    id: "q9",
    questionText: "How do you prefer to learn new things?",
    order: 9,
    options: [
      { optionId: "q9a", optionText: "Trying things out and experimenting", optionAlignment: "Openness" },
      { optionId: "q9b", optionText: "Following a structured course or tutorial", optionAlignment: "Conscientiousness" },
      { optionId: "q9c", optionText: "Working with others and discussing ideas", optionAlignment: "Extraversion" },
      { optionId: "q9d", optionText: "Observing and reflecting on my own", optionAlignment: "Introversion" },
    ],
  },
  {
    id: "q10",
    questionText: "Which of these strengths do people notice in you?",
    order: 10,
    options: [
      { optionId: "q10a", optionText: "I'm practical and good with my hands", optionAlignment: "Realistic" },
      { optionId: "q10b", optionText: "I'm curious and love solving puzzles", optionAlignment: "Investigative" },
      { optionId: "q10c", optionText: "I'm empathetic and a great listener", optionAlignment: "Agreeableness" },
      { optionId: "q10d", optionText: "I'm ambitious and persuasive", optionAlignment: "Enterprising" },
    ],
  },
];

// Personality type title mapping (from personalityTitleConverter.json)
export const PERSONALITY_TITLE_MAP: Record<string, string> = {
  "Realistic_Openness": "Adaptable Experimenter",
  "Realistic_Conscientiousness": "Focused Achiever",
  "Realistic_Extraversion": "Dynamic Doer",
  "Realistic_Agreeableness": "Practical Supporter",
  "Realistic_Emotional Stability": "Resourceful Pragmatist",
  "Investigative_Openness": "Intuitive Explorer",
  "Investigative_Conscientiousness": "Analytical Mastermind",
  "Investigative_Extraversion": "Curious Researcher",
  "Investigative_Agreeableness": "Inquisitive Analyst",
  "Investigative_Emotional Stability": "Methodical Problem-Solver",
  "Artistic_Openness": "Innovative Visionary",
  "Artistic_Conscientiousness": "Imaginative Designer",
  "Artistic_Extraversion": "Expressive Communicator",
  "Artistic_Agreeableness": "Creative Idealist",
  "Artistic_Emotional Stability": "Resilient Creator",
  "Social_Openness": "Thoughtful Guide",
  "Social_Conscientiousness": "Collaborative Diplomat",
  "Social_Extraversion": "Social Creator",
  "Social_Agreeableness": "Compassionate Advocate",
  "Social_Emotional Stability": "Steady Peacemaker",
  "Enterprising_Openness": "Enterprising Adventurer",
  "Enterprising_Conscientiousness": "Disciplined Visionary",
  "Enterprising_Extraversion": "Charismatic Leader",
  "Enterprising_Agreeableness": "Persuasive Strategist",
  "Enterprising_Emotional Stability": "Composed Strategist",
  "Conventional_Openness": "Methodical Organizer",
  "Conventional_Conscientiousness": "Precise Administrator",
  "Conventional_Extraversion": "Efficient Coordinator",
  "Conventional_Agreeableness": "Reliable Executor",
  "Conventional_Emotional Stability": "Steady Organizer",
};

// Mock personality type descriptions
export const MOCK_PERSONALITY_TYPES: Record<string, PersonalityTypeRecord> = {
  "Investigative_Openness": {
    id: "Investigative_Openness",
    title: "Intuitive Explorer",
    shortDescription: "You have a natural gift for asking the right questions and seeing connections others miss. Your curiosity drives you to explore new ideas and perspectives.",
    superpowers: "- Deep curiosity that drives discovery\n- Ability to see patterns and connections\n- Open-mindedness to new ideas\n- Strong analytical thinking\n- Creative problem-solving approach",
  },
  "Social_Agreeableness": {
    id: "Social_Agreeableness",
    title: "Compassionate Advocate",
    shortDescription: "You lead with empathy and have a remarkable ability to understand what others need. People naturally trust and confide in you.",
    superpowers: "- Natural empathy and emotional intelligence\n- Strong listening skills\n- Ability to build trust quickly\n- Talent for resolving conflicts\n- Inspiring others to take action",
  },
  "Enterprising_Extraversion": {
    id: "Enterprising_Extraversion",
    title: "Charismatic Leader",
    shortDescription: "You're a natural-born leader who energizes everyone around you. Your confidence and vision make people want to follow your lead.",
    superpowers: "- Infectious energy and enthusiasm\n- Strong communication skills\n- Natural ability to motivate others\n- Quick decision-making\n- Vision for the big picture",
  },
  "Artistic_Openness": {
    id: "Artistic_Openness",
    title: "Innovative Visionary",
    shortDescription: "You see the world differently and aren't afraid to express it. Your creativity and openness to new experiences fuel everything you do.",
    superpowers: "- Boundless creativity and imagination\n- Ability to think outside the box\n- Strong aesthetic sensibility\n- Emotional depth and expression\n- Courage to challenge conventions",
  },
};

// Fallback personality type for when no clear winner emerges
export const DEFAULT_PERSONALITY_TYPE: PersonalityTypeRecord = {
  id: "Investigative_Openness",
  title: "Intuitive Explorer",
  shortDescription: "You have a natural gift for asking the right questions and seeing connections others miss. Your curiosity drives you to explore new ideas and perspectives.",
  superpowers: "- Deep curiosity that drives discovery\n- Ability to see patterns and connections\n- Open-mindedness to new ideas\n- Strong analytical thinking\n- Creative problem-solving approach",
};

/**
 * Simplified quiz result calculation for the prototype.
 * Counts alignment occurrences from selected options and picks the
 * highest Holland code + Big Five trait combination.
 */
export function calculatePersonalityType(
  answers: Map<string, string[]>, // questionId -> selected optionIds
  questions: QuestionRecord[],
): PersonalityTypeRecord {
  const hollandCodes = ["Realistic", "Investigative", "Artistic", "Social", "Enterprising", "Conventional"];
  const bigFiveTraits = ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Emotional Stability"];
  const negativeTraits: Record<string, string> = {
    "Introversion": "Extraversion",
    "Neuroticism": "Emotional Stability",
    "Low Agreeableness": "Agreeableness",
  };

  const counts: Record<string, number> = {};

  for (const [questionId, selectedIds] of answers.entries()) {
    const question = questions.find((q) => q.id === questionId);
    if (!question) continue;

    for (let i = 0; i < selectedIds.length; i++) {
      const option = question.options.find((o) => o.optionId === selectedIds[i]);
      if (!option?.optionAlignment) continue;

      const points = i === 0 ? 3 : 1; // first pick = 3 pts, second = 1 pt
      let alignment = option.optionAlignment;

      // Handle negative traits
      if (negativeTraits[alignment]) {
        const positive = negativeTraits[alignment]!;
        counts[positive] = (counts[positive] ?? 0) - points;
        continue;
      }

      counts[alignment] = (counts[alignment] ?? 0) + points;
    }
  }

  // Find top Holland code and top Big Five trait
  let topHolland = "Investigative";
  let topHollandScore = -Infinity;
  for (const code of hollandCodes) {
    if ((counts[code] ?? 0) > topHollandScore) {
      topHollandScore = counts[code] ?? 0;
      topHolland = code;
    }
  }

  let topTrait = "Openness";
  let topTraitScore = -Infinity;
  for (const trait of bigFiveTraits) {
    if ((counts[trait] ?? 0) > topTraitScore) {
      topTraitScore = counts[trait] ?? 0;
      topTrait = trait;
    }
  }

  const key = `${topHolland}_${topTrait}`;
  if (MOCK_PERSONALITY_TYPES[key]) {
    return MOCK_PERSONALITY_TYPES[key];
  }

  // Build a type from the title map
  const title = PERSONALITY_TITLE_MAP[key] ?? "Intuitive Explorer";
  return {
    id: key,
    title,
    shortDescription: DEFAULT_PERSONALITY_TYPE.shortDescription,
    superpowers: DEFAULT_PERSONALITY_TYPE.superpowers,
  };
}
