import React, { memo, useState, useEffect } from "react";
import { Box, Card, neutral, Slate, essentials, WillowTypography, TextButton, CircularProgress, Checkbox } from "@willow/ui-kit";
import { FormControlLabel, AppBar, Toolbar } from "@mui/material";
import { Circle, RadioCheckFill } from "@willow/icons";
import IncomeConfirmationModal from "./IncomeConfirmationModal";
import { useUpdatePersonalization } from "../../hooks/useUpdatePersonalization";
import { useRecoilState } from "recoil";
import { incomeConfirmationModalAtom } from "../../state/onboardingAtoms";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentStudentData } from "../../hooks/useCurrentStudent";
import type { IncomeBracket } from "../../types";

interface IncomeBracketCardProps {
  title: string;
  description: string;
  bracket: NonNullable<IncomeBracket>;
  isSelected: boolean;
  onSelect: (bracket: NonNullable<IncomeBracket>) => void;
}

const IncomeBracketCard: React.FC<IncomeBracketCardProps> = ({ title, description, bracket, isSelected, onSelect }) => {
  return (
    <Card
      component="button"
      onClick={(e: React.MouseEvent) => { e.preventDefault(); onSelect(bracket); }}
      sx={{
        width: "100%", p: 2, cursor: "pointer",
        border: isSelected ? "2px solid #2D8A7E" : `2px solid ${neutral[200]}`,
        backgroundColor: isSelected ? "#E6F7F5" : "transparent",
        transition: "all 0.2s",
        "&:hover": { borderColor: isSelected ? "#2D8A7E" : neutral[400], boxShadow: 2 },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
        <Box sx={{ pt: 0.5 }}>
          {isSelected ? <RadioCheckFill size={24} color="#2D8A7E" /> : <Circle size={24} color={neutral[400]} />}
        </Box>
        <Box sx={{ flex: 1, textAlign: "left" }}>
          <WillowTypography variant="body" weight="semibold" color="primary" sx={{ mb: 1 }}>{title}</WillowTypography>
          <WillowTypography variant="body" color="secondary">{description}</WillowTypography>
        </Box>
      </Box>
    </Card>
  );
};

const PersonalizationStep: React.FC = () => {
  const { student: loggedInStudent } = useCurrentStudentData();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const initialIncomeBracket = loggedInStudent?.incomeBracket;
  const [selectedBracket, setSelectedBracket] = useState<"lower" | "middle" | "higher" | null>(
    initialIncomeBracket === null || initialIncomeBracket === undefined ? null : initialIncomeBracket,
  );
  const [preferNotToAnswer, setPreferNotToAnswer] = useState(initialIncomeBracket === null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: updatePersonalization } = useUpdatePersonalization();
  const [modalState, setModalState] = useRecoilState(incomeConfirmationModalAtom);
  const { logout } = useLogout();

  useEffect(() => {
    if (modalState.wentBack) {
      setPreferNotToAnswer(false);
      setModalState((prev) => ({ ...prev, wentBack: false }));
    }
  }, [modalState.wentBack, setModalState]);

  const handleSelectBracket = (incomeBracket: "lower" | "middle" | "higher") => {
    setSelectedBracket(incomeBracket);
    setPreferNotToAnswer(false);
    if (modalState.isOpen && modalState.incomeBracket === null) {
      setModalState({ isOpen: false, incomeBracket: null });
    }
  };

  const handlePreferNotToAnswer = (checked: boolean) => {
    setPreferNotToAnswer(checked);
    if (checked) {
      setModalState({ isOpen: true, incomeBracket: null });
      setSelectedBracket(null);
    } else if (modalState.isOpen && modalState.incomeBracket === null) {
      setModalState({ isOpen: false, incomeBracket: null });
    }
  };

  const handleContinue = async () => {
    // Prototype mode: default to "middle" if nothing selected
    if (!selectedBracket && !preferNotToAnswer) {
      setSelectedBracket("middle");
    }
    const bracketToUse = selectedBracket || "middle";
    if (!loggedInStudent?.id) return;
    setIsSubmitting(true);
    const incomeBracketToSubmit = preferNotToAnswer ? null : (selectedBracket || bracketToUse);

    updatePersonalization(
      { studentId: loggedInStudent.id, incomeBracket: incomeBracketToSubmit },
      {
        onSuccess: () => {
          setIsSubmitting(false);
          queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
          if (incomeBracketToSubmit === null) {
            navigate("/student/home", { replace: true });
            return;
          }
          setModalState({ isOpen: true, incomeBracket: incomeBracketToSubmit });
        },
        onError: () => { setIsSubmitting(false); },
      },
    );
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100vh", bgcolor: Slate[25], px: 2, pb: 4 }}>
        <Box>
          <AppBar position="sticky" sx={{ bgcolor: "transparent", boxShadow: "none", border: "none", py: 2 }}>
            <Toolbar sx={{ justifyContent: "space-between", display: "flex", alignItems: "center" }}>
              <Box sx={{ height: 48, width: 48 }}>
                <img src="/static/images/branding/willow-bare-icon.svg" alt="Willow Logo" width="100%" height="100%" />
              </Box>
              <TextButton variant="ghost" onClick={logout}>Log Out</TextButton>
            </Toolbar>
          </AppBar>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 0 }}>
            <Box sx={{ bgcolor: essentials.white, borderRadius: "12px", boxShadow: "0px 2px 8px -1px rgba(16, 24, 40, 0.08)", width: "800px", maxWidth: "800px", padding: "56px", boxSizing: "border-box" }}>
              <Box component="form" onSubmit={(e) => e.preventDefault()}>
                <WillowTypography variant="display" color="primary">
                  Personalize your estimates for college cost and return on investment
                </WillowTypography>
                <WillowTypography variant="body" color="secondary" sx={{ mt: 2 }}>
                  Willow matches you with college and career programs by using your family income to calculate personalized costs and ROI.
                </WillowTypography>
                <WillowTypography variant="body" weight="semibold" color="secondary" sx={{ mt: 1.5 }}>
                  This is for cost estimation only, and is not an official financial aid calculator.
                </WillowTypography>

                <Box sx={{ mt: 4 }}>
                  <WillowTypography variant="body-lg" weight="semibold" color="primary" sx={{ mb: 2.5 }}>
                    Which best describes your family's financial situation?
                  </WillowTypography>
                </Box>

                <Box sx={{ mt: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                  <IncomeBracketCard title="Lower income" description="A low income family typically receives free/reduced lunch, SNAP, or government-assisted housing." bracket="lower" isSelected={selectedBracket === "lower"} onSelect={handleSelectBracket} />
                  <IncomeBracketCard title="Middle income" description="A middle income family typically pays for most household expenses, may receive some tax credits." bracket="middle" isSelected={selectedBracket === "middle"} onSelect={handleSelectBracket} />
                  <IncomeBracketCard title="Higher income" description="A high income family has savings, can handle unexpected expenses comfortably." bracket="higher" isSelected={selectedBracket === "higher"} onSelect={handleSelectBracket} />

                  <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                    <FormControlLabel
                      control={<Checkbox checked={preferNotToAnswer} onChange={(e) => handlePreferNotToAnswer(e.target.checked)} />}
                      label="I prefer not to answer"
                      sx={{ color: neutral[600] }}
                    />
                  </Box>
                </Box>

                <TextButton variant="primary" fullWidth onClick={handleContinue} disabled={isSubmitting} sx={{ mt: 4 }}>
                  {isSubmitting ? <CircularProgress size={20} color="inherit" /> : "Continue"}
                </TextButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <IncomeConfirmationModal />
    </>
  );
};

export default memo(PersonalizationStep);
