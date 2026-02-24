export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateAuthFields = ({
  email,
  password,
  confirmPassword,
}: {
  email: string;
  password: string;
  confirmPassword?: string;
}): { isValid: boolean; errorMessage: string | null } => {
  if (!email) return { isValid: false, errorMessage: "Email is required." };
  if (!password) return { isValid: false, errorMessage: "Password is required." };
  if (!isValidEmail(email)) return { isValid: false, errorMessage: "Please enter a valid email address." };
  if (!isValidPassword(password)) return { isValid: false, errorMessage: "Password must be at least 6 characters long." };
  if (confirmPassword !== undefined) {
    if (!confirmPassword) return { isValid: false, errorMessage: "Please confirm your password." };
    if (password !== confirmPassword) return { isValid: false, errorMessage: "Passwords do not match." };
  }
  return { isValid: true, errorMessage: null };
};
