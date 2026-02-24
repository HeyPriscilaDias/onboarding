import React from "react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createWillowTheme } from "@willow/ui-kit";
import { MockAuthProvider } from "./mock/MockAuthProvider";
import AppRoutes from "./routes/Routes";
import PrototypeToolbar from "./components/prototype/PrototypeToolbar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Try to create the Willow theme, fall back to empty object if it fails
let theme: ReturnType<typeof createWillowTheme>;
try {
  theme = createWillowTheme();
} catch {
  // Fallback if createWillowTheme is not available from the dist
  theme = {} as ReturnType<typeof createWillowTheme>;
}

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <MockAuthProvider>
              <PrototypeToolbar />
              <AppRoutes />
            </MockAuthProvider>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
