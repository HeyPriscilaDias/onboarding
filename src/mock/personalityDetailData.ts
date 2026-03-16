// Comprehensive mock personality detail data for the portfolio personality results page.
// This extends the basic quiz data with work style, goals, tips, careers, and quotes.

export type PersonalityDetailRecord = {
  id: string;
  title: string;
  shortDescription: string;
  superpowers: Array<{ name: string; description: string }>;
  workStyle: string;
  personalGoals: Array<{ title: string; body: string }>;
  studyTips: Array<{ title: string; body: string }>;
  relationshipTips: string[];
  recommendedCareers: Array<{
    id: string;
    title: string;
    medianSalary: number;
    education: string;
    tags: Array<{ id: string; description: string }>;
    isTopPick: boolean;
  }>;
  inspirationalQuotes: Array<{
    quote: string;
    name: string;
    description: string;
  }>;
};

const SOCIAL_AGREEABLENESS: PersonalityDetailRecord = {
  id: "Social_Agreeableness",
  title: "Compassionate Advocate",
  shortDescription:
    "You lead with empathy and have a remarkable ability to understand what others need. People naturally trust and confide in you, making you a powerful force for positive change in your community.",
  superpowers: [
    {
      name: "Natural Empathy",
      description:
        "You instinctively understand how others are feeling and can offer comfort and support in meaningful ways.",
    },
    {
      name: "Strong Listening Skills",
      description:
        "You give people your full attention and make them feel heard, which builds deep trust and connection.",
    },
    {
      name: "Conflict Resolution",
      description:
        "You have a talent for finding common ground and helping people work through disagreements peacefully.",
    },
    {
      name: "Inspiring Others",
      description:
        "Your genuine care motivates people to take positive action and believe in their own potential.",
    },
  ],
  workStyle:
    "You thrive in collaborative environments where teamwork and open communication are valued. You prefer roles that let you connect with people, whether it's mentoring, counseling, or leading a team. You work best when you feel your contributions are making a real difference in someone's life. Structure matters to you, but not as much as the human element — you'll always prioritize relationships and morale over rigid processes.",
  personalGoals: [
    {
      title: "Practice Setting Boundaries",
      body: "Your desire to help everyone can sometimes leave you stretched thin. Learning to say no when needed will protect your energy and let you show up fully for the people who matter most.",
    },
    {
      title: "Improve Self-Advocacy",
      body: "You're great at speaking up for others, but sometimes forget to advocate for your own needs. Practice communicating what you want and need in professional and personal settings.",
    },
    {
      title: "Enhance Resilience",
      body: "Because you feel deeply, setbacks can hit hard. Building emotional resilience through mindfulness or journaling will help you bounce back stronger.",
    },
  ],
  studyTips: [
    {
      title: "Study with Others",
      body: "You learn best through discussion and collaboration. Form study groups or find a study buddy to talk through concepts and quiz each other.",
    },
    {
      title: "Connect Material to People",
      body: "You retain information better when you can relate it to real people and real stories. Look for case studies, interviews, and human-interest angles in your coursework.",
    },
    {
      title: "Take Breaks to Recharge",
      body: "Your empathetic nature means you absorb a lot of emotional energy. Schedule regular breaks during study sessions to decompress and reset.",
    },
  ],
  relationshipTips: [
    "Be open about your feelings — your friends and partners appreciate your honesty and vulnerability.",
    "Remember that not everyone processes emotions the same way you do. Give others space when they need it.",
    "Don't take on others' problems as your own. You can care deeply without carrying the weight of the world.",
    "Seek out relationships with people who reciprocate your energy and support.",
  ],
  recommendedCareers: [
    {
      id: "c1",
      title: "School Counselor",
      medianSalary: 60140,
      education: "Master's Degree",
      tags: [
        { id: "t1", description: "Education" },
        { id: "t2", description: "Mental Health" },
        { id: "t3", description: "Youth Development" },
      ],
      isTopPick: true,
    },
    {
      id: "c2",
      title: "Social Worker",
      medianSalary: 55350,
      education: "Bachelor's Degree",
      tags: [
        { id: "t4", description: "Community Services" },
        { id: "t5", description: "Advocacy" },
      ],
      isTopPick: true,
    },
    {
      id: "c3",
      title: "Human Resources Specialist",
      medianSalary: 64240,
      education: "Bachelor's Degree",
      tags: [
        { id: "t6", description: "Business" },
        { id: "t7", description: "People Management" },
      ],
      isTopPick: false,
    },
    {
      id: "c4",
      title: "Registered Nurse",
      medianSalary: 81220,
      education: "Bachelor's Degree",
      tags: [
        { id: "t8", description: "Healthcare" },
        { id: "t9", description: "Patient Care" },
        { id: "t10", description: "Science" },
      ],
      isTopPick: false,
    },
    {
      id: "c5",
      title: "Community Health Worker",
      medianSalary: 46590,
      education: "High School Diploma",
      tags: [
        { id: "t11", description: "Public Health" },
        { id: "t12", description: "Outreach" },
      ],
      isTopPick: false,
    },
  ],
  inspirationalQuotes: [
    {
      quote:
        "The best way to find yourself is to lose yourself in the service of others.",
      name: "Mahatma Gandhi",
      description: "Civil rights leader and advocate for nonviolent change",
    },
    {
      quote:
        "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
      name: "Maya Angelou",
      description: "Poet, memoirist, and civil rights activist",
    },
  ],
};

const INVESTIGATIVE_OPENNESS: PersonalityDetailRecord = {
  id: "Investigative_Openness",
  title: "Intuitive Explorer",
  shortDescription:
    "You have a natural gift for asking the right questions and seeing connections others miss. Your curiosity drives you to explore new ideas and perspectives, making you a natural innovator.",
  superpowers: [
    {
      name: "Deep Curiosity",
      description:
        "You're driven by an insatiable desire to understand how things work and why things are the way they are.",
    },
    {
      name: "Pattern Recognition",
      description:
        "You quickly spot connections and trends that others overlook, giving you a unique analytical edge.",
    },
    {
      name: "Open-Mindedness",
      description:
        "You welcome new ideas and perspectives without judgment, making you a great collaborator and learner.",
    },
    {
      name: "Creative Problem-Solving",
      description:
        "You approach challenges from unexpected angles and come up with innovative solutions.",
    },
  ],
  workStyle:
    "You thrive in environments that give you intellectual freedom and the space to explore ideas independently. You prefer deep, focused work over constant meetings, though you value meaningful collaboration. You're at your best when tackling complex problems that require research and creative thinking. Routine tasks can feel draining — you need variety and intellectual stimulation to stay engaged.",
  personalGoals: [
    {
      title: "Practice Following Through",
      body: "Your love of new ideas sometimes means you start more projects than you finish. Build habits that help you see things through to completion.",
    },
    {
      title: "Improve Decision-Making Speed",
      body: "With so many options and angles to consider, decisions can feel overwhelming. Practice setting time limits for decisions and trusting your instincts.",
    },
    {
      title: "Enhance Communication Skills",
      body: "Your ideas are brilliant, but not everyone follows your leaps of logic. Practice explaining complex ideas in simple, accessible terms.",
    },
  ],
  studyTips: [
    {
      title: "Explore the 'Why' Behind the 'What'",
      body: "You learn best when you understand the deeper principles behind facts. Look for underlying theories and frameworks instead of memorizing information.",
    },
    {
      title: "Use Mind Maps and Visual Tools",
      body: "Your brain loves making connections. Use mind maps, diagrams, and visual organizers to see how concepts relate to each other.",
    },
    {
      title: "Teach What You Learn",
      body: "Explaining concepts to others helps solidify your understanding and reveals gaps in your knowledge. Try teaching a friend or recording yourself.",
    },
  ],
  relationshipTips: [
    "Share your excitement about ideas, but also make space for emotional conversations.",
    "Not everyone needs a logical solution — sometimes people just want to be heard.",
    "Your independence is a strength, but remember to invest time in your close relationships.",
    "Be patient with people who think differently than you. Different perspectives make your world richer.",
  ],
  recommendedCareers: [
    {
      id: "c6",
      title: "Data Scientist",
      medianSalary: 103500,
      education: "Master's Degree",
      tags: [
        { id: "t13", description: "Technology" },
        { id: "t14", description: "Analytics" },
        { id: "t15", description: "Research" },
      ],
      isTopPick: true,
    },
    {
      id: "c7",
      title: "Research Scientist",
      medianSalary: 95570,
      education: "Doctoral Degree",
      tags: [
        { id: "t16", description: "Science" },
        { id: "t17", description: "Innovation" },
      ],
      isTopPick: true,
    },
    {
      id: "c8",
      title: "UX Researcher",
      medianSalary: 83200,
      education: "Bachelor's Degree",
      tags: [
        { id: "t18", description: "Design" },
        { id: "t19", description: "Technology" },
        { id: "t20", description: "Psychology" },
      ],
      isTopPick: false,
    },
    {
      id: "c9",
      title: "Environmental Scientist",
      medianSalary: 76480,
      education: "Bachelor's Degree",
      tags: [
        { id: "t21", description: "Science" },
        { id: "t22", description: "Sustainability" },
      ],
      isTopPick: false,
    },
    {
      id: "c10",
      title: "Software Engineer",
      medianSalary: 127260,
      education: "Bachelor's Degree",
      tags: [
        { id: "t23", description: "Technology" },
        { id: "t24", description: "Problem Solving" },
      ],
      isTopPick: false,
    },
  ],
  inspirationalQuotes: [
    {
      quote:
        "The important thing is not to stop questioning. Curiosity has its own reason for existing.",
      name: "Albert Einstein",
      description: "Theoretical physicist and Nobel Prize laureate",
    },
    {
      quote:
        "Research is formalized curiosity. It is poking and prying with a purpose.",
      name: "Zora Neale Hurston",
      description: "Author, anthropologist, and folklorist",
    },
  ],
};

const ENTERPRISING_EXTRAVERSION: PersonalityDetailRecord = {
  id: "Enterprising_Extraversion",
  title: "Charismatic Leader",
  shortDescription:
    "You're a natural-born leader who energizes everyone around you. Your confidence and vision make people want to follow your lead, and your enthusiasm is truly contagious.",
  superpowers: [
    {
      name: "Infectious Energy",
      description:
        "You light up every room you walk into and naturally motivate the people around you to give their best.",
    },
    {
      name: "Strong Communication",
      description:
        "You know how to get your message across clearly and persuasively, whether speaking to one person or a crowd.",
    },
    {
      name: "Quick Decision-Making",
      description:
        "You trust your instincts and can make confident decisions under pressure when others hesitate.",
    },
    {
      name: "Big-Picture Vision",
      description:
        "You see where things are headed and can articulate a compelling vision that inspires others to join you.",
    },
  ],
  workStyle:
    "You thrive in fast-paced, dynamic environments where you can take initiative and lead. You prefer action over analysis and are energized by competition and challenge. You're at your best when managing teams, pitching ideas, or driving projects forward. Slow, bureaucratic processes frustrate you — you want to move fast and make things happen.",
  personalGoals: [
    {
      title: "Practice Active Listening",
      body: "Your natural tendency to lead can sometimes mean you talk more than you listen. Make a conscious effort to hear others out before sharing your own ideas.",
    },
    {
      title: "Improve Patience",
      body: "Not every problem needs an immediate solution. Learning to sit with uncertainty and gather more information before acting will make your decisions even stronger.",
    },
    {
      title: "Enhance Emotional Awareness",
      body: "Your drive to achieve can sometimes overshadow the emotional needs of your team. Check in with people regularly and show that you value them beyond their output.",
    },
  ],
  studyTips: [
    {
      title: "Set Competitive Goals",
      body: "You're motivated by achievement. Set clear targets for each study session and reward yourself when you hit them.",
    },
    {
      title: "Lead a Study Group",
      body: "You learn best when you're in charge. Organize study sessions, assign topics, and lead group discussions.",
    },
    {
      title: "Apply What You Learn",
      body: "Abstract theory can feel boring. Look for ways to apply your learning to real-world projects, businesses, or challenges.",
    },
  ],
  relationshipTips: [
    "Make space for others to lead sometimes — relationships are a partnership, not a hierarchy.",
    "Show vulnerability. Your strength is admirable, but people connect with authenticity.",
    "Be mindful of steamrolling quieter people in group settings. Their ideas matter too.",
    "Celebrate others' successes as enthusiastically as your own.",
  ],
  recommendedCareers: [
    {
      id: "c11",
      title: "Marketing Manager",
      medianSalary: 133380,
      education: "Bachelor's Degree",
      tags: [
        { id: "t25", description: "Business" },
        { id: "t26", description: "Creative Strategy" },
        { id: "t27", description: "Leadership" },
      ],
      isTopPick: true,
    },
    {
      id: "c12",
      title: "Entrepreneur / Startup Founder",
      medianSalary: 98500,
      education: "Varies",
      tags: [
        { id: "t28", description: "Business" },
        { id: "t29", description: "Innovation" },
      ],
      isTopPick: true,
    },
    {
      id: "c13",
      title: "Sales Director",
      medianSalary: 127490,
      education: "Bachelor's Degree",
      tags: [
        { id: "t30", description: "Business" },
        { id: "t31", description: "Negotiation" },
      ],
      isTopPick: false,
    },
    {
      id: "c14",
      title: "Public Relations Specialist",
      medianSalary: 67440,
      education: "Bachelor's Degree",
      tags: [
        { id: "t32", description: "Communications" },
        { id: "t33", description: "Media" },
      ],
      isTopPick: false,
    },
    {
      id: "c15",
      title: "Event Planner",
      medianSalary: 56920,
      education: "Bachelor's Degree",
      tags: [
        { id: "t34", description: "Hospitality" },
        { id: "t35", description: "Project Management" },
      ],
      isTopPick: false,
    },
  ],
  inspirationalQuotes: [
    {
      quote:
        "A leader is one who knows the way, goes the way, and shows the way.",
      name: "John C. Maxwell",
      description: "Author, speaker, and leadership expert",
    },
    {
      quote:
        "The greatest leader is not the one who does the greatest things, but the one who gets people to do the greatest things.",
      name: "Ronald Reagan",
      description: "40th President of the United States",
    },
  ],
};

const ARTISTIC_OPENNESS: PersonalityDetailRecord = {
  id: "Artistic_Openness",
  title: "Innovative Visionary",
  shortDescription:
    "You see the world differently and aren't afraid to express it. Your creativity and openness to new experiences fuel everything you do, making you a true original.",
  superpowers: [
    {
      name: "Boundless Creativity",
      description:
        "Your imagination knows no limits. You can envision possibilities that others can't even conceive of.",
    },
    {
      name: "Thinking Outside the Box",
      description:
        "You naturally challenge conventions and find innovative approaches to any problem.",
    },
    {
      name: "Emotional Depth",
      description:
        "You experience and express emotions richly, which gives your work authenticity and resonance.",
    },
    {
      name: "Courage to Be Different",
      description:
        "You're not afraid to stand out or take creative risks, even when it means going against the grain.",
    },
  ],
  workStyle:
    "You thrive in environments that value creativity, autonomy, and self-expression. Rigid schedules and micromanagement stifle you — you need the freedom to work in your own way and at your own pace. You're at your best when you can bring original ideas to life, whether through design, writing, art, or innovative problem-solving. You value aesthetics and quality over speed.",
  personalGoals: [
    {
      title: "Practice Time Management",
      body: "Creative flow doesn't follow a clock, but deadlines are real. Build routines that help you balance inspiration with productivity.",
    },
    {
      title: "Improve Handling Criticism",
      body: "Your work is personal, so feedback can sting. Practice separating constructive criticism from personal attacks and using feedback to grow.",
    },
    {
      title: "Enhance Practical Skills",
      body: "Big ideas need execution. Develop practical skills like budgeting, project management, or technical tools to bring your visions to life.",
    },
  ],
  studyTips: [
    {
      title: "Make It Visual and Creative",
      body: "Transform your notes into sketches, infographics, or color-coded systems. Engaging your creative side helps information stick.",
    },
    {
      title: "Find the Story",
      body: "Every subject has a narrative. Look for the human stories behind the facts — it makes dry material come alive.",
    },
    {
      title: "Create a Stimulating Environment",
      body: "Your surroundings affect your focus. Study in spaces that inspire you — a coffee shop, a park, or a workspace you've personalized.",
    },
  ],
  relationshipTips: [
    "Share your creative world with the people you love — it helps them understand you better.",
    "Be patient with people who are more practical or conventional. They bring balance to your life.",
    "Don't retreat into your own world when things get hard. Stay present and communicate.",
    "Appreciate friends who give you honest feedback — they're helping you grow.",
  ],
  recommendedCareers: [
    {
      id: "c16",
      title: "Graphic Designer",
      medianSalary: 57990,
      education: "Bachelor's Degree",
      tags: [
        { id: "t36", description: "Design" },
        { id: "t37", description: "Visual Arts" },
        { id: "t38", description: "Technology" },
      ],
      isTopPick: true,
    },
    {
      id: "c17",
      title: "UX/UI Designer",
      medianSalary: 83200,
      education: "Bachelor's Degree",
      tags: [
        { id: "t39", description: "Technology" },
        { id: "t40", description: "Design" },
      ],
      isTopPick: true,
    },
    {
      id: "c18",
      title: "Film / Video Editor",
      medianSalary: 62680,
      education: "Bachelor's Degree",
      tags: [
        { id: "t41", description: "Media" },
        { id: "t42", description: "Creative Arts" },
      ],
      isTopPick: false,
    },
    {
      id: "c19",
      title: "Architect",
      medianSalary: 82840,
      education: "Master's Degree",
      tags: [
        { id: "t43", description: "Design" },
        { id: "t44", description: "Engineering" },
      ],
      isTopPick: false,
    },
    {
      id: "c20",
      title: "Creative Director",
      medianSalary: 100890,
      education: "Bachelor's Degree",
      tags: [
        { id: "t45", description: "Advertising" },
        { id: "t46", description: "Leadership" },
      ],
      isTopPick: false,
    },
  ],
  inspirationalQuotes: [
    {
      quote: "Creativity takes courage.",
      name: "Henri Matisse",
      description: "French artist and pioneer of modern art",
    },
    {
      quote:
        "The chief enemy of creativity is good sense.",
      name: "Pablo Picasso",
      description: "Spanish painter, sculptor, and co-founder of Cubism",
    },
  ],
};

// Default detail data used when the student's personality type doesn't have a specific entry
const DEFAULT_DETAIL: PersonalityDetailRecord = INVESTIGATIVE_OPENNESS;

export const PERSONALITY_DETAIL_MAP: Record<string, PersonalityDetailRecord> = {
  Social_Agreeableness: SOCIAL_AGREEABLENESS,
  Investigative_Openness: INVESTIGATIVE_OPENNESS,
  Enterprising_Extraversion: ENTERPRISING_EXTRAVERSION,
  Artistic_Openness: ARTISTIC_OPENNESS,
};

/**
 * Get personality detail data for a given type key.
 * Falls back to default (Intuitive Explorer) if the type isn't found.
 */
export function getPersonalityDetail(typeKey: string | undefined): PersonalityDetailRecord {
  if (!typeKey) return DEFAULT_DETAIL;

  // Normalize key: "SOCIAL_AGREEABLENESS" -> "Social_Agreeableness"
  const normalized = typeKey
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("_")
    .replace("Emotionalstability", "Emotional Stability");

  return PERSONALITY_DETAIL_MAP[normalized] ?? DEFAULT_DETAIL;
}
