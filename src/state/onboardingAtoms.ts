import { atom } from "recoil";
import type { IncomeBracket } from "../types";

export const aiUseAgreementCompleteAtom = atom<boolean>({
  key: "aiUseAgreementCompleteAtom",
  default: false,
});

export const incomeConfirmationModalAtom = atom<{
  isOpen: boolean;
  incomeBracket: IncomeBracket | null;
  wentBack?: boolean;
}>({
  key: "incomeConfirmationModalAtom",
  default: {
    isOpen: false,
    incomeBracket: null,
    wentBack: false,
  },
});
