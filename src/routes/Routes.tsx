import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../components/auth/LoginPage";
import EmailAndPasswordStep from "../components/onboarding/EmailAndPasswordStep";
import PersonalInfoStep from "../components/onboarding/PersonalInfoStep";
import SchoolInfoStep from "../components/onboarding/SchoolInfoStep";
import MyWhyStep from "../components/onboarding/MyWhyStep";
import FeedbackStep from "../components/onboarding/FeedbackStep";
import ThankYouStep from "../components/onboarding/ThankYouStep";
import QuizPlaceholder from "../components/onboarding/QuizPlaceholder";
import PersonalizationStep from "../components/onboarding/PersonalizationStep";
import CompletionPage from "../components/CompletionPage";
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

      {/* Original routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<EmailAndPasswordStep />} />

      <Route path="/student/onboarding/personal-info" element={<ProtectedRoute><PersonalInfoStep /></ProtectedRoute>} />
      <Route path="/student/onboarding/school-info" element={<ProtectedRoute><SchoolInfoStep /></ProtectedRoute>} />
      <Route path="/student/onboarding/my-why" element={<ProtectedRoute><MyWhyStep /></ProtectedRoute>} />
      <Route path="/student/onboarding/feedback" element={<ProtectedRoute><FeedbackStep /></ProtectedRoute>} />
      <Route path="/student/onboarding/thank-you" element={<ProtectedRoute><ThankYouStep /></ProtectedRoute>} />
      <Route path="/student/onboarding/quiz-placeholder" element={<ProtectedRoute><QuizPlaceholder /></ProtectedRoute>} />
      <Route path="/student/onboarding/personality-quiz/*" element={<ProtectedRoute><QuizPlaceholder /></ProtectedRoute>} />
      <Route path="/student/onboarding/personalization" element={<ProtectedRoute><PersonalizationStep /></ProtectedRoute>} />
      <Route path="/student/onboarding/recommendation-preferences" element={<ProtectedRoute><CompletionPage /></ProtectedRoute>} />
      <Route path="/student/home" element={<ProtectedRoute><StudentHomeRouter /></ProtectedRoute>} />
      <Route path="/student/explore-careers" element={<ProtectedRoute><ExploreCareersPage /></ProtectedRoute>} />

      {/* Default: go to prototype homepage */}
      <Route path="/" element={<Navigate to="/prototype" replace />} />
      <Route path="*" element={<Navigate to="/prototype" replace />} />
    </Routes>
  );
};

export default AppRoutes;
