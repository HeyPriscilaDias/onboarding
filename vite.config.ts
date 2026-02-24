import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@willow/ui-kit": path.resolve(
        __dirname,
        "vendor/ui-kit/ui-kit.es.js"
      ),
      "@willow/icons": path.resolve(
        __dirname,
        "vendor/icons/index.js"
      ),
      "@willow/types": path.resolve(__dirname, "./src/types"),
    },
  },
  server: {},
  css: {
    // Import ui-kit styles
  },
});
