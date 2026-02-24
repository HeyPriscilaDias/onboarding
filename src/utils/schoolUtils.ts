import { GradeLevel, SchoolRecord } from "../types";

export const findDistrictIdBySchoolId = (schools: SchoolRecord[], schoolId: string): string | null | undefined => {
  return schools.find((school) => school.id === schoolId)?.districtId;
};

export const getAllGradeLevels = (): GradeLevel[] => {
  return Object.values(GradeLevel);
};

export const validateSchoolInfo = (
  school: string,
  gradeLevel: string,
): { isValid: boolean; errors: { school: boolean; gradeLevel: boolean } } => {
  const hasSchool = !!school;
  const hasGradeLevel = !!gradeLevel;
  return {
    isValid: hasSchool && hasGradeLevel,
    errors: { school: !hasSchool, gradeLevel: !hasGradeLevel },
  };
};
