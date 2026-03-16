export type CareerVideo = {
  id: string;
  jobTitle: string;
  oneLiner: string;
  category: string;
  videoUrl: string;
};

const CAREER_VIDEOS: CareerVideo[] = [
  {
    id: "cv-01",
    jobTitle: "Marine Biologist",
    oneLiner: "Explore ocean ecosystems and protect marine life",
    category: "Science",
    videoUrl: "/assets/videos/career_01.mp4",
  },
  {
    id: "cv-02",
    jobTitle: "UX Designer",
    oneLiner: "Shape how people interact with technology every day",
    category: "Technology",
    videoUrl: "/assets/videos/career_02.mp4",
  },
  {
    id: "cv-03",
    jobTitle: "Robotics Engineer",
    oneLiner: "Build machines that solve real-world problems",
    category: "Engineering",
    videoUrl: "/assets/videos/career_01.mp4",
  },
  {
    id: "cv-04",
    jobTitle: "Physical Therapist",
    oneLiner: "Help people recover, move, and live pain-free",
    category: "Healthcare",
    videoUrl: "/assets/videos/career_02.mp4",
  },
  {
    id: "cv-05",
    jobTitle: "High School Counselor",
    oneLiner: "Guide students through their most important decisions",
    category: "Education",
    videoUrl: "/assets/videos/career_01.mp4",
  },
  {
    id: "cv-06",
    jobTitle: "Product Manager",
    oneLiner: "Turn ideas into products millions of people use",
    category: "Business",
    videoUrl: "/assets/videos/career_02.mp4",
  },
  {
    id: "cv-07",
    jobTitle: "Motion Graphics Artist",
    oneLiner: "Bring stories to life through animation and design",
    category: "Arts & Design",
    videoUrl: "/assets/videos/career_01.mp4",
  },
  {
    id: "cv-08",
    jobTitle: "Investigative Journalist",
    oneLiner: "Uncover the truth and hold power accountable",
    category: "Writing & Communication",
    videoUrl: "/assets/videos/career_02.mp4",
  },
  {
    id: "cv-09",
    jobTitle: "Public Defender",
    oneLiner: "Stand up for people who can't afford a voice",
    category: "Law & Government",
    videoUrl: "/assets/videos/career_01.mp4",
  },
  {
    id: "cv-10",
    jobTitle: "Crisis Counselor",
    oneLiner: "Be the calm in someone's hardest moment",
    category: "Social Services",
    videoUrl: "/assets/videos/career_02.mp4",
  },
  {
    id: "cv-11",
    jobTitle: "Electrician",
    oneLiner: "Power the homes and buildings everyone depends on",
    category: "Trades & Construction",
    videoUrl: "/assets/videos/career_01.mp4",
  },
  {
    id: "cv-12",
    jobTitle: "Wildlife Conservationist",
    oneLiner: "Protect endangered species and their habitats",
    category: "Agriculture & Environment",
    videoUrl: "/assets/videos/career_02.mp4",
  },
  {
    id: "cv-13",
    jobTitle: "Podcast Producer",
    oneLiner: "Create audio experiences that captivate audiences",
    category: "Media & Entertainment",
    videoUrl: "/assets/videos/career_01.mp4",
  },
  {
    id: "cv-14",
    jobTitle: "Firefighter Paramedic",
    oneLiner: "Run toward danger to save lives every shift",
    category: "Military & Public Safety",
    videoUrl: "/assets/videos/career_02.mp4",
  },
  {
    id: "cv-15",
    jobTitle: "Sports Nutritionist",
    oneLiner: "Fuel athletes to perform at their absolute best",
    category: "Sports & Fitness",
    videoUrl: "/assets/videos/career_01.mp4",
  },
];

export default CAREER_VIDEOS;
