import React from "react";
import { useRecoilValue } from "recoil";
import { prototypeActiveAtom, journeyMomentAtom } from "../../state/prototypeAtoms";
import PlatformHomepage from "./PlatformHomepage";
import CompletionPage from "../CompletionPage";

/**
 * Conditionally renders PlatformHomepage (with career recs, personality,
 * superpowers sections) when in a post-onboarding prototype state,
 * or the original CompletionPage otherwise.
 */
const StudentHomeRouter: React.FC = () => {
  const prototypeActive = useRecoilValue(prototypeActiveAtom);
  const journeyMoment = useRecoilValue(journeyMomentAtom);

  const isPostOnboarding =
    prototypeActive && journeyMoment?.startsWith("post-onboarding");

  if (isPostOnboarding) {
    return <PlatformHomepage />;
  }

  return <CompletionPage />;
};

export default StudentHomeRouter;
