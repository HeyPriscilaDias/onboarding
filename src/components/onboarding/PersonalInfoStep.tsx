import React, { memo } from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import { TextField } from "@mui/material";
import OnboardingLayout from "./OnboardingLayout";
import usePersonalInfoStep from "../../hooks/onboarding/usePersonalInfoStep";

const PersonalInfoStep: React.FC = () => {
  const {
    firstName, lastName, displayBirthday, address, phoneNumber, errors,
    handleTextChange, handleBirthdayChange, handlePhoneChange, handleContinue,
    handleAddressChange, handleBlur, isLoading,
  } = usePersonalInfoStep();

  return (
    <OnboardingLayout currentStep={2} handleContinue={handleContinue} isLoading={isLoading}>
      <Box component="form" sx={{ textAlign: "left" }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: 500, mx: "auto" }}>
          <WillowTypography variant="display" color="primary">
            {firstName ? `A little bit about you, ${firstName}` : "A little bit about you"}
          </WillowTypography>
          <WillowTypography variant="body" color="secondary" sx={{ mt: 1.5 }}>Fill in your personal details to continue.</WillowTypography>
        </Box>

        <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 500, mx: "auto" }}>
          <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
            <Box sx={{ flex: 1 }}>
              <WillowTypography variant="body" weight="semibold" color="primary" sx={{ mb: 1 }}>First name</WillowTypography>
              <TextField
                variant="outlined" name="firstName" fullWidth value={firstName}
                onChange={handleTextChange} onBlur={() => handleBlur("firstName")}
                error={errors.firstName} helperText={errors.firstName ? "First name is required" : ""}
                required
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <WillowTypography variant="body" weight="semibold" color="primary" sx={{ mb: 1 }}>Last name</WillowTypography>
              <TextField
                name="lastName" variant="outlined" fullWidth value={lastName}
                onChange={handleTextChange} onBlur={() => handleBlur("lastName")}
                error={errors.lastName} helperText={errors.lastName ? "Last name is required" : ""}
                required
              />
            </Box>
          </Box>

          <Box>
            <WillowTypography variant="body" weight="semibold" color="primary" sx={{ mb: 1 }}>Birthday</WillowTypography>
            <TextField
              type="date" variant="outlined" fullWidth value={displayBirthday}
              onChange={handleBirthdayChange} onBlur={() => handleBlur("birthday")}
              error={errors.birthday} helperText={errors.birthday ? "Please enter a valid birthday (age 10-20)" : ""}
              required
            />
          </Box>

          <Box>
            <WillowTypography variant="body" weight="semibold" color="primary" sx={{ mb: 1 }}>Address</WillowTypography>
            <TextField
              variant="outlined" fullWidth value={address.address || ""}
              onChange={handleAddressChange} onBlur={() => handleBlur("address")}
              error={errors.address}
              helperText={errors.address ? "Address is required" : "Enter any address (no autocomplete in test mode)"}
              placeholder="123 Main St, City, ST 12345"
            />
          </Box>

          <Box>
            <WillowTypography variant="body" weight="semibold" color="primary" sx={{ mb: 1 }}>Phone</WillowTypography>
            <TextField
              fullWidth variant="outlined" value={phoneNumber}
              onChange={handlePhoneChange} onBlur={() => handleBlur("phoneNumber")}
              inputProps={{ maxLength: 16 }}
              error={errors.phoneNumber} helperText={errors.phoneNumber ? "Phone number is required" : ""}
              placeholder="(555) 123-4567" required
            />
          </Box>
        </Box>
      </Box>
    </OnboardingLayout>
  );
};

export default memo(PersonalInfoStep);
