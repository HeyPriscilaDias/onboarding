import { useQueryClient } from "@tanstack/react-query";
import { useCurrentStudent } from "../useCurrentStudent";
import { studentService } from "../../mock/mockServices";
import { useCallback } from "react";

export const useOnboarding = () => {
  const { data: student, refetch } = useCurrentStudent();
  const queryClient = useQueryClient();

  const updateStudentData = useCallback(
    async (data: Record<string, unknown>) => {
      if (!student) throw new Error("No student logged in");
      await studentService.updateStudentGoldenPath(student.id, data);
      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();
    },
    [student, queryClient, refetch],
  );

  return { updateStudentData };
};
