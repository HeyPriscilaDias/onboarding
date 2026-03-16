import React from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import { Slate, neutral } from "@willow/ui-kit";
import { Home, BookOpen, Award, Careers, Settings } from "@willow/icons";
import { useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { id: "home", label: "Home", Icon: Home, route: "/student/home" },
  { id: "lessons", label: "Lessons", Icon: BookOpen, route: null },
  { id: "portfolio", label: "Portfolio", Icon: Award, route: "/student/portfolio/personality-type" },
  { id: "careers", label: "Careers", Icon: Careers, route: "/student/explore-careers" },
  { id: "settings", label: "Preferences", Icon: Settings, route: null },
];

type Props = {
  activePage?: string;
};

const MockSidebar: React.FC<Props> = ({ activePage = "home" }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 200,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <Box sx={{ px: 2, py: 2, mb: 1 }}>
        <img
          src="/static/images/branding/willow-bare-icon.svg"
          alt="Willow"
          style={{ width: 32, height: 32 }}
        />
      </Box>

      {/* Nav items */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, px: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.id;
          return (
            <Box
              key={item.id}
              onClick={() => item.route && navigate(item.route)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 1,
                borderRadius: "24px",
                bgcolor: isActive ? neutral[200] : "transparent",
                cursor: item.route ? "pointer" : "default",
                opacity: item.route ? 1 : 0.6,
                "&:hover": {
                  bgcolor: item.route
                    ? isActive
                      ? neutral[200]
                      : "rgba(0,0,0,0.04)"
                    : "transparent",
                },
              }}
            >
              <Box sx={{ color: isActive ? Slate[700] : neutral[500], display: "flex" }}>
                <item.Icon size={20} />
              </Box>
              <WillowTypography
                variant="body"
                weight={isActive ? "semibold" : "regular"}
                sx={{ color: isActive ? Slate[700] : neutral[700], whiteSpace: "nowrap" }}
              >
                {item.label}
              </WillowTypography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default MockSidebar;
