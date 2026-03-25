import React from "react";
import { Box } from "@willow/ui-kit";

export const ACCOUNT_SETUP_BG = {
  backgroundColor: "#F5F5F6",
  backgroundImage: "radial-gradient(circle, #C9C9CC 1px, transparent 1px)",
  backgroundSize: "22px 22px",
};

const AccountSetupHeader: React.FC = () => (
  <Box sx={{ py: 2, px: 2 }}>
    <Box sx={{ width: 116, height: "auto" }}>
      <img src="/static/images/branding/willow-logotype.svg" alt="Willow" width="100%" />
    </Box>
  </Box>
);

export default AccountSetupHeader;
