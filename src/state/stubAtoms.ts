import { atom } from "recoil";
import { UserType } from "../types";

export const userTypeAtom = atom<UserType | null>({
  key: "userTypeAtom",
  default: UserType.STUDENT,
});

export enum LoadingPhase {
  AUTH = "auth",
  USER = "user",
  SITE = "site",
}

export const loadingStateAtom = atom({
  key: "loadingStateAtom",
  default: {
    phase: LoadingPhase.AUTH,
    isComplete: true,
    message: "",
  },
});

export const activeRoleAtom = atom<UserType | null>({
  key: "activeRoleAtom",
  default: UserType.STUDENT,
});

export { LoadingPhase as LoadingPhaseEnum };
