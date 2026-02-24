import React from "react";
import { Box, WillowTypography } from "@willow/ui-kit";
import { neutral, essentials } from "@willow/ui-kit";
import { useRecoilValue } from "recoil";
import { prototypeActiveAtom } from "../../state/prototypeAtoms";
import MockSidebar from "./MockSidebar";
import MockAlmaSidebar from "./MockAlmaSidebar";

type Props = {
  children: React.ReactNode;
  activePage?: string;
  breadcrumb?: string;
};

const PlatformLayout: React.FC<Props> = ({ children, activePage = "home", breadcrumb = "Home" }) => {
  const prototypeActive = useRecoilValue(prototypeActiveAtom);
  const toolbarOffset = prototypeActive ? 44 : 0;

  return (
    <Box
      sx={{
        display: "flex",
        height: `calc(100vh - ${toolbarOffset}px)`,
        pt: `${toolbarOffset}px`,
        position: "fixed",
        top: 0,
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
