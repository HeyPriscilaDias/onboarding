import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../mock/MockAuthProvider";
import { studentService } from "../mock/mockServices";
import { StudentRecord, UserType } from "../types";
import { useRecoilValue } from "recoil";
import { activeRoleAtom } from "../state/stubAtoms";

export const useCurrentStudent = () => {
  const { currentAuthUser } = useAuth();
  const activeRole = useRecoilValue(activeRoleAtom);
  const isStudent = activeRole === UserType.STUDENT;

  return useQuery({
    queryKey: ["student", "profile"],
    queryFn: (): Promise<StudentRecord> => studentService.getCurrentProfile(),
    enabled: !!currentAuthUser && isStudent,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useCurrentStudentData = () => {
  const { data: student, isLoading, error } = useCurrentStudent();
  return {
    student: (student || null) as StudentRecord | null,
    isLoading,
    error,
    isLoggedIn: !!student,
  };
};
