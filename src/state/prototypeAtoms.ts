import { atom, AtomEffect } from "recoil";

export type JourneyMoment =
  | "lesson-1"
  | "lesson-2"
  | "post-onboarding-lesson1"
  | "post-onboarding-lesson2"
  | "post-onboarding-gpc";

export type RecommendationStage =
  | "interest-only"
  | "interest-personality"
  | "interest-personality-gpc";

// Persist Recoil atoms to localStorage so they survive full page reloads
// (needed because post-onboarding moments use window.location.href to force auth reload)
const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const saved = localStorage.getItem(key);
    if (saved != null) {
      try {
        setSelf(JSON.parse(saved));
      } catch {
        // ignore parse errors
      }
    }
    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const journeyMomentAtom = atom<JourneyMoment | null>({
  key: "journeyMomentAtom",
  default: null,
  effects: [localStorageEffect<JourneyMoment | null>("proto_journeyMoment")],
});

export const recommendationStageAtom = atom<RecommendationStage>({
  key: "recommendationStageAtom",
  default: "interest-only",
  effects: [localStorageEffect<RecommendationStage>("proto_recStage")],
});

export const prototypeActiveAtom = atom<boolean>({
  key: "prototypeActiveAtom",
  default: false,
  effects: [localStorageEffect<boolean>("proto_active")],
});
