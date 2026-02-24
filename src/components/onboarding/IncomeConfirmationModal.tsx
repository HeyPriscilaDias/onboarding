import React, { memo } from "react";
import { Box, Button, Modal, WillowTypography, lavender } from "@willow/ui-kit";
import { useRecoilState } from "recoil";
import { incomeConfirmationModalAtom } from "../../state/onboardingAtoms";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const IncomeConfirmationModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(incomeConfirmationModalAtom);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleCloseUnlockedModal = () => {
    setModalState({ isOpen: false, incomeBracket: null });
    queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
    navigate("/student/home", { replace: true });
  };

  const handleCloseWarningModal = () => {
    setModalState({ isOpen: false, incomeBracket: null });
  };

  const handleGoBack = () => {
    setModalState({ isOpen: false, incomeBracket: null, wentBack: true });
  };

  const isIncomeSelected = modalState.incomeBracket !== null;

  return (
    <>
      <Modal open={modalState.isOpen && isIncomeSelected} onClose={handleCloseUnlockedModal} maxWidth="sm" fullWidth>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", p: "32px" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Box sx={{ display: "flex", gap: "4px", alignItems: "center", flexWrap: "wrap" }}>
              <WillowTypography variant="body" weight="semibold" color="primary">You've unlocked the</WillowTypography>
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: "4px", px: "6px", py: "3px", backgroundColor: lavender[100], borderRadius: "4px" }}>
                <WillowTypography variant="caption" sx={{ color: lavender[900], whiteSpace: "nowrap" }}>Personalized</WillowTypography>
              </Box>
              <WillowTypography variant="body" weight="semibold" color="primary">tag!</WillowTypography>
            </Box>
            <WillowTypography variant="body" color="secondary">
              Whenever you see this tag, it means data is personalized to you based on your estimated household income.
            </WillowTypography>
          </Box>
          <Box sx={{ display: "flex", gap: "8px", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="secondary" onClick={handleCloseUnlockedModal}>Ok</Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={modalState.isOpen && !isIncomeSelected} onClose={handleCloseWarningModal} maxWidth="sm" fullWidth>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", p: "32px" }}>
          <WillowTypography variant="body" weight="semibold" color="primary">
            Personalized college costs and ROI estimates are off
          </WillowTypography>
          <WillowTypography variant="body" color="secondary">
            You will see general cost of attendance based on standard data.
          </WillowTypography>
          <Box sx={{ display: "flex", gap: "8px", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="primary" onClick={handleGoBack}>Go back</Button>
            <Button variant="secondary" onClick={handleCloseWarningModal}>Ok</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default memo(IncomeConfirmationModal);
