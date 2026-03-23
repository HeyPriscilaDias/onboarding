import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentStudent } from "../useCurrentStudent";
import { studentService } from "../../mock/mockServices";
import CAREER_VIDEOS from "../../mock/careerVideoData";

type Reaction = "like" | "dislike";

const MIN_REACTIONS = 0;

const useCareerVideoStep = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: loggedInStudent, refetch } = useCurrentStudent();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [reactions, setReactions] = useState<Map<string, Reaction>>(new Map());
  const [isLoading, setIsLoading] = useState(false);

  const currentVideo = CAREER_VIDEOS[currentIndex];
  const totalVideos = CAREER_VIDEOS.length;
  const totalReactions = reactions.size;
  const canProceed = totalReactions >= MIN_REACTIONS;
  const isLastVideo = currentIndex === totalVideos - 1;
  const currentReaction = currentVideo ? reactions.get(currentVideo.id) : undefined;
  const nextVideoUrl = currentIndex < totalVideos - 1 ? CAREER_VIDEOS[currentIndex + 1].videoUrl : null;

  const likedCategories = useMemo(() => {
    const liked: string[] = [];
    reactions.forEach((reaction, id) => {
      if (reaction === "like") {
        const video = CAREER_VIDEOS.find((v) => v.id === id);
        if (video) liked.push(video.category);
      }
    });
    return liked;
  }, [reactions]);

  const handleLike = useCallback(() => {
    if (!currentVideo) return;
    setReactions((prev) => {
      const next = new Map(prev);
      next.set(currentVideo.id, "like");
      return next;
    });
    if (currentIndex < totalVideos - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentVideo, currentIndex, totalVideos]);

  const handleDislike = useCallback(() => {
    if (!currentVideo) return;
    setReactions((prev) => {
      const next = new Map(prev);
      next.set(currentVideo.id, "dislike");
      return next;
    });
    if (currentIndex < totalVideos - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentVideo, currentIndex, totalVideos]);

  const handleNext = useCallback(() => {
    if (currentIndex < totalVideos - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, totalVideos]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleSkip = useCallback(() => {
    if (currentIndex < totalVideos - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, totalVideos]);

  const handleContinue = useCallback(async () => {
    try {
      if (!loggedInStudent?.id) return;
      setIsLoading(true);

      const tagsToSave =
        likedCategories.length > 0 ? likedCategories : ["Healthcare", "Technology"];

      await studentService.updateStudentGoldenPath(loggedInStudent.id, {
        careerInterestTags: tagsToSave,
        onboardingStage: 9,
        onboardingState: "onboarding-complete",
      });

      await queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
      await refetch();
      navigate("/student/home", { replace: true });
    } catch (error) {
      console.error("Error saving career interests:", error);
    } finally {
      setIsLoading(false);
    }
  }, [loggedInStudent, likedCategories, queryClient, refetch, navigate]);

  const handleBack = useCallback(async () => {
    try {
      if (!loggedInStudent?.id) return;
      navigate("/student/home", { replace: true });
    } catch (error) {
      console.error("Error updating onboarding stage:", error);
    }
  }, [loggedInStudent, queryClient, refetch, navigate]);

  return {
    currentVideo,
    currentIndex,
    totalVideos,
    totalReactions,
    canProceed,
    isLastVideo,
    currentReaction,
    isLoading,
    handleLike,
    handleDislike,
    handleNext,
    handlePrevious,
    handleSkip,
    handleContinue,
    handleBack,
    nextVideoUrl,
    MIN_REACTIONS,
  };
};

export default useCareerVideoStep;
