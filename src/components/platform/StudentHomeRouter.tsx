import React from "react";
import PlatformHomepage from "./PlatformHomepage";

/**
 * Entry point for /student/home.
 * Always renders the platform homepage after onboarding.
 */
const StudentHomeRouter: React.FC = () => {
  return <PlatformHomepage />;
};

export default StudentHomeRouter;
