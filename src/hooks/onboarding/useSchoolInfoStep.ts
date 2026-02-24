import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSchools } from "../useSchools";
import { useCurrentStudent } from "../useCurrentStudent";
import { studentService } from "../../mock/mockServices";
import { GradeLevel, SchoolRecord } from "../../types";
import { useOnboardingLogging } from "../../mock/mockLogging";
import { findDistrictIdBySchoolId, getAllGradeLevels, validateSchoolInfo } from "../../utils/schoolUtils";

interface SchoolInfoFormState {
  school: string;
  gradeLevel: string;
  externalId: string;
}

interface SchoolInfoErrors {
  school: boolean;
  gradeLevel: boolean;
}

const useSchoolInfoStep = () => {
  const [formState, setFormState] = useState<SchoolInfoFormState>({
    school: "",
    gradeLevel: "",
    externalId: "",
  });
  const [errors, setErrors] = useState<SchoolInfoErrors>({ school: false, gradeLevel: false });
  const [isLoading, setIsLoading] = useState(false);

  const { data: allSchools = [] as SchoolRecord[] } = useSchools();
  const { data: loggedInStudent, refetch } = useCurrentStudent();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logEducationInfoSubmitted, logEducationInfoError } = useOnboardingLogging();

  const schools = allSchools;
  const { school, gradeLevel, externalId } = formState;
  const gradeLevels = useMemo(() => getAllGradeLevels(), []);

  const studentData = useMemo(() => ({
    studentSchoolId: loggedInStudent?.schoolId || "",
    studentGradeLevel: loggedInStudent?.gradeLevel || "",
    studentExternalId: loggedInStudent?.externalId || "",
    studentId: loggedInStudent?.id || "",
  }), [loggedInStudent]);

  const isPendingStudent = useMemo(() => {
    return !!(loggedInStudent?.schoolId && loggedInStudent?.gradeLevel);
  }, [loggedInStudent]);

  const isSchoolDisabled = isPendingStudent;

  useEffect(() => {
    setFormState({
      school: studentData.studentSchoolId,
      gradeLevel: studentData.studentGradeLevel,
      externalId: studentData.studentExternalId,
    });
  }, [studentData]);

  const setSchool = useCallback((value: string) => {
    if (isSchoolDisabled) return;
    setFormState((prev) => ({ ...prev, school: value }));
    setErrors((prev) => ({ ...prev, school: !value }));
  }, [isSchoolDisabled]);

  const setGradeLevel = useCallback((value: string) => {
    setFormState((prev) => ({ ...prev, gradeLevel: value }));
    setErrors((prev) => ({ ...prev, gradeLevel: !value }));
  }, []);

  const setExternalId = useCallback((value: string) => {
    setFormState((prev) => ({ ...prev, externalId: value }));
  }, []);

  const handleBlur = useCallback((field: keyof SchoolInfoErrors) => {
    const fieldValues = { school, gradeLevel };
    setErrors((prev) => ({ ...prev, [field]: !fieldValues[field] }));
  }, [school, gradeLevel]);

  const handleContinue = useCallback(async () => {
    const validation = validateSchoolInfo(school, gradeLevel);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      if (!loggedInStudent?.id) return;
      setIsLoading(true);

      const districtId = findDistrictIdBySchoolId(schools, school);
      await studentService.updateStudentGoldenPath(loggedInStudent.id, {
        schoolId: school,
        gradeLevel: gradeLevel as GradeLevel,
        externalId,
        onboardingStage: 4,
        onboardingState: "my-why",
        districtId,
      });

      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();
      logEducationInfoSubmitted({ studentId: loggedInStudent.id });
      navigate("/student/onboarding/my-why", { replace: true });
    } catch (error) {
      logEducationInfoError({ error });
    } finally {
      setIsLoading(false);
    }
  }, [school, gradeLevel, externalId, schools, loggedInStudent, queryClient, refetch, navigate, logEducationInfoSubmitted, logEducationInfoError]);

  const handleBack = useCallback(async () => {
    try {
      if (!loggedInStudent?.id) return;
      await studentService.updateStudentGoldenPath(loggedInStudent.id, {
        onboardingStage: 2,
        onboardingState: "personal-info",
      });
      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();
      navigate("/student/onboarding/personal-info", { replace: true });
    } catch (error) {
      console.error("Error updating onboarding stage:", error);
    }
  }, [loggedInStudent, queryClient, refetch, navigate]);

  return {
    handleContinue,
    handleBack,
    school,
    setSchool,
    gradeLevel,
    setGradeLevel,
    externalId,
    setExternalId,
    errors,
    handleBlur,
    gradeLevels,
    schools,
    isSchoolDisabled,
    isPendingStudent,
    isViewAsStudentMode: false,
    isLoading,
  };
};

export default useSchoolInfoStep;
