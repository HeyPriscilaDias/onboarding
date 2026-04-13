import React, { memo } from "react";
import { Box, WillowTypography, Slate, hexToRgba, essentials, ui } from "@willow/ui-kit";
import { TextField } from "@mui/material";
import { ThumbsUp, ThumbsDown } from "@willow/icons";
import OnboardingLayout from "./OnboardingLayout";
import useGpcInterestStep from "../../hooks/onboarding/useGpcInterestStep";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const GpcInterestStep: React.FC = () => {
  const {
    challenges,
    reactions,
    freeText,
    setFreeText,
    setReaction,
    isLoading,
    handleContinue,
    handleBack,
  } = useGpcInterestStep();

  const { mobile } = useWindowDimensions();

  const reactionBtnSx = (active: boolean, activeColor: string) => ({
    width: 36,
    height: 36,
    borderRadius: "10px",
    border: `1.5px solid ${active ? activeColor : hexToRgba(essentials.white, 0.12)}`,
    bgcolor: active ? hexToRgba(activeColor, 0.15) : "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      borderColor: activeColor,
      bgcolor: hexToRgba(activeColor, 0.1),
      transform: "scale(1.08)",
    },
    "&:active": { transform: "scale(0.94)" },
  });

  return (
    <OnboardingLayout
      currentStep={6}
      handleContinue={handleContinue}
      handleBack={handleBack}
      isLoading={isLoading}
      continueLabel="Start exploring"
      fullBleed
      bgOverride={Slate[900]}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 880,
          mx: "auto",
          px: 2,
          pb: 12,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", pt: mobile ? 2 : 4 }}>
          <WillowTypography
            variant="caption"
            sx={{
              color: ui.mint,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              mb: 1.5,
              display: "block",
            }}
          >
            What matters to you
          </WillowTypography>
          <WillowTypography
            variant="display"
            sx={{
              color: essentials.white,
              fontWeight: 700,
              lineHeight: 1.2,
              mb: 1,
            }}
          >
            Which of these challenges speak to you?
          </WillowTypography>
          <WillowTypography
            variant="body"
            sx={{
              color: hexToRgba(essentials.white, 0.5),
              maxWidth: 480,
              mx: "auto",
            }}
          >
            These are big global challenges that careers can help solve. No wrong answers — just go with your gut.
          </WillowTypography>
        </Box>

        {/* GPC Cards Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
            gap: 2,
          }}
        >
          {challenges.map((challenge) => {
            const reaction = reactions.get(challenge.id);
            return (
              <Box
                key={challenge.id}
                sx={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: `1.5px solid ${
                    reaction === "interested"
                      ? hexToRgba(ui.mint, 0.4)
                      : reaction === "not-interested"
                        ? hexToRgba(essentials.white, 0.15)
                        : hexToRgba(essentials.white, 0.06)
                  }`,
                  bgcolor: hexToRgba(essentials.white, 0.03),
                  transition: "border-color 0.2s ease",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Image */}
                <Box
                  sx={{
                    height: 120,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={`/static/images/challenges/${challenge.imageName}`}
                    alt={challenge.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "50% 30%",
                      display: "block",
                    }}
                  />
                  {/* Gradient overlay for legibility */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "60%",
                      background: `linear-gradient(transparent, ${hexToRgba(Slate[900], 0.8)})`,
                    }}
                  />
                </Box>

                {/* Content */}
                <Box sx={{ px: 2, py: 2, flex: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
                  <Box>
                    {/* Tag pill */}
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        px: 1,
                        py: 0.25,
                        borderRadius: "6px",
                        bgcolor: hexToRgba(ui.mint, 0.1),
                        mb: 0.75,
                      }}
                    >
                      <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: ui.mint }} />
                      <WillowTypography
                        variant="caption"
                        sx={{ color: ui.mint, fontWeight: 600, fontSize: "0.7rem" }}
                      >
                        {challenge.tag}
                      </WillowTypography>
                    </Box>

                    <WillowTypography
                      variant="body"
                      sx={{
                        color: essentials.white,
                        fontWeight: 600,
                        lineHeight: 1.3,
                        display: "block",
                      }}
                    >
                      {challenge.title}
                    </WillowTypography>
                  </Box>

                  {/* Reaction buttons */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: "auto" }}>
                    {/* Like / Interested */}
                    <Box
                      component="button"
                      onClick={() => setReaction(challenge.id, "interested")}
                      sx={reactionBtnSx(reaction === "interested", ui.mint)}
                    >
                      <ThumbsUp
                        size={16}
                        color={reaction === "interested" ? ui.mint : hexToRgba(essentials.white, 0.35)}
                      />
                    </Box>

                    {/* Dislike / Not interested */}
                    <Box
                      component="button"
                      onClick={() => setReaction(challenge.id, "not-interested")}
                      sx={reactionBtnSx(reaction === "not-interested", hexToRgba(essentials.white, 0.5))}
                    >
                      <ThumbsDown
                        size={16}
                        color={
                          reaction === "not-interested"
                            ? essentials.white
                            : hexToRgba(essentials.white, 0.35)
                        }
                      />
                    </Box>

                    {/* Don't know */}
                    <Box
                      component="button"
                      onClick={() => setReaction(challenge.id, "unsure")}
                      sx={reactionBtnSx(reaction === "unsure", hexToRgba(essentials.white, 0.35))}
                    >
                      <WillowTypography
                        variant="caption"
                        sx={{
                          color:
                            reaction === "unsure"
                              ? essentials.white
                              : hexToRgba(essentials.white, 0.35),
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          lineHeight: 1,
                        }}
                      >
                        ?
                      </WillowTypography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Optional free text */}
        <Box sx={{ mt: 1 }}>
          <WillowTypography
            variant="body"
            sx={{
              color: hexToRgba(essentials.white, 0.6),
              mb: 1.5,
              display: "block",
            }}
          >
            Are there any specific careers you already know you're interested in or not interested in?
          </WillowTypography>
          <TextField
            placeholder="Optional — e.g. 'I definitely want to be a nurse' or 'I know I don't want a desk job'"
            multiline
            rows={3}
            variant="outlined"
            fullWidth
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: essentials.white,
                borderRadius: "12px",
                bgcolor: hexToRgba(essentials.white, 0.04),
                "& fieldset": {
                  borderColor: hexToRgba(essentials.white, 0.1),
                },
                "&:hover fieldset": {
                  borderColor: hexToRgba(essentials.white, 0.2),
                },
                "&.Mui-focused fieldset": {
                  borderColor: hexToRgba(ui.mint, 0.5),
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: hexToRgba(essentials.white, 0.3),
                opacity: 1,
              },
            }}
          />
        </Box>
      </Box>
    </OnboardingLayout>
  );
};

export default memo(GpcInterestStep);
