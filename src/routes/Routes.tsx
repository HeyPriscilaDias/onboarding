import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../components/auth/LoginPage";
import EmailAndPasswordStep from "../components/onboarding/EmailAndPasswordStep";
import PersonalInfoStep from "../components/onboarding/PersonalInfoStep";
import MyWhyStep from "../components/onboarding/MyWhyStep";
import CareerInterestTagsStep from "../components/onboarding/CareerInterestTagsStep";
import PersonalityQuizStart from "../components/onboarding/quiz/PersonalityQuizStart";
import PersonalityQuizTake from "../components/onboarding/quiz/PersonalityQuizTake";
import PersonalityQuizPreview from "../components/onboarding/quiz/PersonalityQuizPreview";
import PersonalizationStep from "../components/onboarding/PersonalizationStep";
import StudentHomeRouter from "../components/platform/StudentHomeRouter";
import ExploreCareersPage from "../components/platform/ExploreCareersPage";
import PrototypeHomepage from "../components/prototype/PrototypeHomepage";
import { useAuth } from "../mock/MockAuthProvider";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentAuthUser } = useAuth();
  if (!currentAuthUser) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Prototype testing layer */}
      <Route path="/prototype" element={<PrototypeHomepage />} />

      {/* Auth routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<EmailAndPasswordStep />} />

      {/* Lesson 1: Onboarding flow */}
      <Route path="/student/onboarding/basic-info" element={<ProtectedRoute><PersonalInfoStep /></ProtectedRoute>} />
      <Route path="/student/onboarding/my-why" element={<ProtectedRoute><MyWhyStep /></ProtectedRoute>} />
      <Route path="/student/onboarding/career-interests" element={<ProtectedRoute><CareerInterestTagsStep /></ProtectedRoute>} />
      <Route path="/student/onboarding/personalization" element={<ProtectedRoute><PersonalizationStep /></ProtectedRoute>} />

      {/* Lesson 2: Personality quiz */}
      <Route path="/student/onboarding/personality-quiz/start" element={<ProtectedRoute><PersonalityQuizStart /></ProtectedRoute>} />
      <Route path="/student/onboarding/personality-quiz/take" element={<ProtectedRoute><PersonalityQuizTake /></ProtectedRoute>} />
      <Route path="/student/onboarding/personality-quiz/preview" element={<ProtectedRoute><PersonalityQuizPreview /></ProtectedRoute>} />

      {/* Platform */}
      <Route path="/student/home" element={<ProtectedRoute><StudentHomeRouter /></ProtectedRoute>} />
      <Route path="/student/explore-careers" element={<ProtectedRoute><ExploreCareersPage /></ProtectedRoute>} />

      {/* Default: go to prototype homepage */}
      <Route path="/" element={<Navigate to="/prototype" replace />} />
      <Route path="*" element={<Navigate to="/prototype" replace />} />
    </Routes>
  );
};

export default AppRoutes;
