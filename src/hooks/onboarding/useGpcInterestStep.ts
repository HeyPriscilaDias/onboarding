import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentStudent } from "../useCurrentStudent";
import { studentService } from "../../mock/mockServices";

type GpcReaction = "interested" | "not-interested" | "unsure";

type PressingChallenge = {
  id: string;
  title: string;
  tag: string;
  guidingQuestion: string;
  focus: string[];
  sampleCareers: string[];
  imageName: string;
};

const useGpcInterestStep = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: loggedInStudent, refetch } = useCurrentStudent();

  const [challenges, setChallenges] = useState<PressingChallenge[]>([]);
  const [reactions, setReactions] = useState<Map<string, GpcReaction>>(new Map());
  const [freeText, setFreeText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load GPC data
  useEffect(() => {
    fetch("/assets/data/pressingChallenges.json")
      .then((r) => r.json())
      .then((data: PressingChallenge[]) => setChallenges(data))
      .catch((err) => console.error("Failed to load pressing challenges:", err));
  }, []);

  const setReaction = useCallback((challengeId: string, reaction: GpcReaction) => {
    setReactions((prev) => {
      const next = new Map(prev);
      // Toggle off if already set to this value
      if (prev.get(challengeId) === reaction) {
        next.delete(challengeId);
      } else {
        next.set(challengeId, reaction);
      }
      return next;
    });
  }, []);

  const handleContinue = useCallback(async () => {
    try {
      if (!loggedInStudent?.id) return;
      setIsLoading(true);

      // Convert reactions to scores: interested=1, not-interested=-1, unsure=0
      const scores = Array.from(reactions.entries()).map(([id, reaction]) => ({
        id,
        score: reaction === "interested" ? 1 : reaction === "not-interested" ? -1 : 0,
      }));

      await studentService.updateStudentGoldenPath(loggedInStudent.id, {
        pressingChallengeScores: scores,
        pressingChallengesComplete: true,
        careerFreeTextResponse: freeText || "",
        onboardingStage: 9,
        onboardingState: "onboarding-complete" as const,
      });

      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();
      navigate("/student/home", { replace: true });
    } catch (error) {
      console.error("Error saving GPC interests:", error);
    } finally {
      setIsLoading(false);
    }
  }, [loggedInStudent, reactions, freeText, queryClient, refetch, navigate]);

  const handleBack = useCallback(() => {
    navigate("/student/onboarding/career-interests", { replace: true });
  }, [navigate]);

  return {
    challenges,
    reactions,
    freeText,
    setFreeText,
    setReaction,
    isLoading,
    handleContinue,
    handleBack,
  };
};

export default useGpcInterestStep;
