import { useMutation } from "@tanstack/react-query";
import { personalizationService } from "../mock/mockServices";

export const useUpdatePersonalization = () => {
  return useMutation({
    mutationFn: async ({
      studentId,
      incomeBracket,
    }: {
      studentId: string;
      incomeBracket: "lower" | "middle" | "higher" | null;
    }) => {
      await personalizationService.updatePersonalization(studentId, incomeBracket);
    },
  });
};
