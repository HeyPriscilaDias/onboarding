import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import EmailAndPasswordStep from "../components/onboarding/EmailAndPasswordStep";
import PasswordStep from "../components/onboarding/PasswordStep";
import PersonalInfoStep from "../components/onboarding/PersonalInfoStep";
import GpaStep from "../components/onboarding/GpaStep";
import MyWhyStep from "../components/onboarding/MyWhyStep";
import FeedbackStep from "../components/onboarding/FeedbackStep";
import CareerVideoStep from "../components/onboarding/CareerVideoStep";
import PersonalityQuizStart from "../components/onboarding/quiz/PersonalityQuizStart";
import PersonalityQuizTake from "../components/onboarding/quiz/PersonalityQuizTake";
import PersonalityQuizPreview from "../components/onboarding/quiz/PersonalityQuizPreview";
import PersonalizationStep from "../components/onboarding/PersonalizationStep";
import StudentHomeRouter from "../components/platform/StudentHomeRouter";
import ExploreCareersPage from "../components/platform/ExploreCareersPage";
import PersonalityTypePage from "../components/portfolio/PersonalityTypePage";
import { useAuth } from "../mock/MockAuthProvider";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentAuthUser } = useAuth();
  if (!currentAuthUser) {
    return <Navigate to="/student/onboarding/signup" replace />;
  }
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/student/onboarding/signup" element={<EmailAndPasswordStep />} />
      <Route path="/student/onboarding/password" element={<PasswordStep />} />

      {/* Lesson 1: Onboarding flow */}
      <Route path="/student/onboarding/basic-info" element={<ProtectedRoute><PersonalInfoStep /></ProtectedRoute>} />
      <Route path="/student/onboarding/gpa" element={<ProtectedRoute><GpaStep /></ProtectedRoute>} />
      <Route path="/student/onboarding/my-why" element={<ProtectedRoute><MyWhyStep /></ProtectedRoute>} />
      <Route path="/student/onboarding/feedback" element={<ProtectedRoute><FeedbackStep /></ProtectedRoute>} />
      <Route path="/student/onboarding/career-interests" element={<ProtectedRoute><CareerVideoStep /></ProtectedRoute>} />
      <Route path="/student/onboarding/personalization" element={<ProtectedRoute><PersonalizationStep /></ProtectedRoute>} />

      {/* Lesson 2: Personality quiz */}
      <Route path="/student/onboarding/personality-quiz/start" element={<ProtectedRoute><PersonalityQuizStart /></ProtectedRoute>} />
      <Route path="/student/onboarding/personality-quiz/take" element={<ProtectedRoute><PersonalityQuizTake /></ProtectedRoute>} />
      <Route path="/student/onboarding/personality-quiz/preview" element={<ProtectedRoute><PersonalityQuizPreview /></ProtectedRoute>} />

      {/* Platform */}
      <Route path="/student/home" element={<ProtectedRoute><StudentHomeRouter /></ProtectedRoute>} />
      <Route path="/student/explore-careers" element={<ProtectedRoute><ExploreCareersPage /></ProtectedRoute>} />
      <Route path="/student/portfolio/personality-type" element={<ProtectedRoute><PersonalityTypePage /></ProtectedRoute>} />

      {/* Default */}
      <Route path="/" element={<Navigate to="/student/onboarding/signup" replace />} />
      <Route path="*" element={<Navigate to="/student/onboarding/signup" replace />} />
    </Routes>
  );
};

export default AppRoutes;
