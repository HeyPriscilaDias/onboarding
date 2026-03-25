import React from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import { neutral, essentials } from "@willow/ui-kit";
import MockSidebar from "./MockSidebar";
import MockAlmaSidebar from "./MockAlmaSidebar";

type Props = {
  children: React.ReactNode;
  activePage?: string;
  breadcrumb?: string;
};

const PlatformLayout: React.FC<Props> = ({ children, activePage = "home", breadcrumb = "Home" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        position: "fixed",
        top: 44,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: essentials.white,
      }}
    >
      {/* Left sidebar - Navigation */}
      <MockSidebar activePage={activePage} />

      {/* Main content area */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          borderLeft: `1px solid ${neutral[200]}`,
          borderRight: `1px solid ${neutral[200]}`,
        }}
      >
        {/* Breadcrumbs bar */}
        <Box
          sx={{
            px: 4,
            py: 1.5,
            borderBottom: `1px solid ${neutral[200]}`,
          }}
        >
          <WillowTypography variant="body" sx={{ color: neutral[500], fontSize: 13 }}>
            {breadcrumb}
          </WillowTypography>
        </Box>

        {/* Page content */}
        <Box sx={{ px: 4, py: 3 }}>
          {children}
        </Box>
      </Box>

      {/* Right sidebar - Alma */}
      <MockAlmaSidebar />
    </Box>
  );
};

export default PlatformLayout;
