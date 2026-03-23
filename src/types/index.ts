// Minimal types extracted from willow-vercel-migration for onboarding test env

export enum UserType {
  ADMIN = "admin",
  SCHOOL_ADMIN = "school-admin",
  DISTRICT_ADMIN = "district-admin",
  STUDENT = "student",
  TEACHER = "teacher",
  MENTOR = "mentor",
  PROVIDER = "provider",
  PROVIDER_USER = "provider_user",
  MENTOR_USER = "mentor_user",
  DEVELOPER = "developer",
  PUBLIC = "public",
  STAFF = "staff",
  CURRICULUM_WRITER = "curriculum_writer",
  WILLOW_ADMIN = "willow-admin",
}

export enum GradeLevel {
  NINTH = "9th Grade",
  TENTH = "10th Grade",
  ELEVENTH = "11th Grade",
  TWELFTH = "12th Grade",
}

export enum FRLStatus {
  ReceivesFreeOrReducedMeals = "I receive free or reduced meals at my public school",
  DoesNotReceiveFreeOrReducedMeals = "I do not receive free or reduced meals at my public school",
  UnknownOrDoesNotAttendPublicSchool = "I don't know or I don't attend public school",
}

export enum PageRoute {
  LOGIN = "/student/onboarding/signup",
  STUDENT_HOME = "/student/home",
  STUDENT_SIGNUP = "/student-signup",
}

export type AddressComponents = {
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  county?: string;
  lat: number;
  lon: number;
};

export type PersonalFeedback = {
  questionText: string;
  score: number;
  submittedOn: string;
  questionId: number;
};

export type OnboardingState =
  | "signup"
  | "basic-info"
  | "personal-info"
  | "school-info"
  | "my-why"
  | "career-interests"
  | "feedback"
  | "quiz-start"
  | "quiz-in-progress"
  | "quiz-results"
  | "pressing-challenges"
  | "personalization"
  | "preferences"
  | "complete";

export type IncomeBracket = "lower" | "middle" | "higher" | null | undefined;

export type Student = {
  firstName: string;
  lastName: string;
  avatar: string;
  avatarURL?: string;
  coverBackground: string;
  coverBackgroundURL?: string;
  schoolId: string | null;
  externalId: string | null;
  schoolGroups: string[];
  districtId: string | null;
  gradeLevel: GradeLevel | "";
  userType: UserType;
  enrolled: boolean;
  email: string;
  authUid?: string | null;
  status?: "onboarding" | "invited" | "active" | "archived" | "graduated";
  schoolEmail: string;
  phone: string;
  address: AddressComponents;
  optInTextMessages: boolean;
  agreeTermsOfService: boolean;
  consentToContact: string;
  gpaValue: number | null;
  gpaMax: number | null;
  frlStatus: string;
  firstGen: boolean;
  birthday: string | null;
  personalityType: string;
  myWhy: string;
  whatDescribesMe: string;
  lastQuestionId: string | null;
  lastActivity: string;
  preQuizComplete: boolean;
  intakeComplete: boolean;
  quizComplete: boolean;
  pressingChallengesComplete: boolean;
  pressingChallengeScores: { id: string; score: number }[];
  setupComplete: boolean;
  onboardingStage: number;
  willowRecommendedProgramIds: string[];
  willowRecommendedJobIds: string[];
  staffRecommendedJobIds: string[];
  removedProgramIds: string[];
  favoriteJobIds: string[];
  dislikedJobIds: string[];
  statesForRecommendations: string[];
  citiesForRecommendations: string[];
  includeOnlineOnly: boolean;
  programTypeForRecommendations: string;
  bookmarkedACareer: boolean;
  careerInterestTags: string[];
  personalFeedback: PersonalFeedback[];
  active?: boolean;
  incomeBracket?: "lower" | "middle" | "higher" | null;
  incomeBracketUpdatedAt?: string | null;
  isRetakingQuiz?: boolean;
  onboardingState?: OnboardingState;
};

export type StudentRecord = Student & {
  id: string;
  createdAt: string;
  lastUpdatedAt: string;
};

export type SchoolRecord = {
  id: string;
  name: string;
  districtId: string;
  createdAt: string;
  lastUpdatedAt: string;
};
