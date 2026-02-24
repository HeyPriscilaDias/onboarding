// No-op logging hooks for test environment

const noop = () => {};
const noopWithArgs = (..._args: unknown[]) => {};

export const useOnboardingLogging = () => ({
  logPersonalInfoSubmitted: noopWithArgs,
  logPersonalInfoError: noopWithArgs,
  logEducationInfoSubmitted: noopWithArgs,
  logEducationInfoError: noopWithArgs,
  logMyWhySubmitted: noopWithArgs,
  logMyWhyError: noopWithArgs,
  logFeedbackSubmitted: noopWithArgs,
  logFeedbackError: noopWithArgs,
  logOnboardingCompleted: noopWithArgs,
});

export const useAuthLogging = () => ({
  logUserCreated: noopWithArgs,
  logUserCreationError: noopWithArgs,
  logSignupError: noopWithArgs,
  logLoginSuccess: noopWithArgs,
  logLoginError: noopWithArgs,
});

export default useOnboardingLogging;
