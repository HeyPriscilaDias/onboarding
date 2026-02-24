import React, { useState } from "react";
import { Box, Button, Modal, WillowTypography } from "@willow/ui-kit";
import { TextField } from "@mui/material";
import { useAuth } from "../../mock/MockAuthProvider";

interface ResetPasswordDialogProps {
  open: boolean;
  onClose: () => void;
}

const ResetPasswordDialog: React.FC<ResetPasswordDialogProps> = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = () => {
    if (!email) return;
    resetPassword(email);
    setSent(true);
  };

  const handleClose = () => {
    setEmail("");
    setSent(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
        {!sent ? (
          <>
            <WillowTypography variant="body" weight="semibold" color="primary">Reset Password</WillowTypography>
            <WillowTypography variant="body" color="secondary">
              Enter your email address and we'll send you a link to reset your password.
            </WillowTypography>
            <TextField
              variant="outlined" fullWidth placeholder="Email address"
              value={email} onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
              <Button variant="secondary" onClick={handleClose}>Cancel</Button>
              <Button variant="primary" onClick={handleSubmit}>Send Reset Link</Button>
            </Box>
          </>
        ) : (
          <>
            <WillowTypography variant="body" weight="semibold" color="primary">Check your email!</WillowTypography>
            <WillowTypography variant="body" color="secondary">
              We've sent a password reset link to <strong>{email}</strong>. (In test mode, no actual email is sent.)
            </WillowTypography>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="primary" onClick={handleClose}>Close</Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ResetPasswordDialog;
