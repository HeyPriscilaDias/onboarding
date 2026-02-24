import { useQuery } from "@tanstack/react-query";
import { MOCK_SCHOOLS } from "../mock/mockData";

export const useSchools = () => {
  return useQuery({
    queryKey: ["schools"],
    queryFn: async () => MOCK_SCHOOLS,
    staleTime: Infinity,
  });
};
