type FormatPhoneNumberProps = { phoneNumber: string };

export const formatPhoneNumber = ({ phoneNumber }: FormatPhoneNumberProps) => {
  const cleaned = phoneNumber.replace(/\D/g, "");
  if (cleaned.length === 0) return "";
  const match = cleaned.match(/^1?(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (match) {
    const part1 = match[1] ? `(${match[1]}` : "";
    const part2 = match[2] ? `) ${match[2]}` : "";
    const part3 = match[3] ? `-${match[3]}` : "";
    return `+1${part1}${part2}${part3}`.trim();
  }
  return `+1${cleaned}`;
};
