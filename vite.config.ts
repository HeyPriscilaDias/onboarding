import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@willow/ui-kit": path.resolve(
        __dirname,
        "../willow-vercel-migration/packages/ui-kit/dist/ui-kit.es.js"
      ),
      "@willow/icons": path.resolve(
        __dirname,
        "../willow-vercel-migration/packages/icons/dist/index.js"
      ),
      "@willow/types": path.resolve(__dirname, "./src/types"),
    },
  },
  server: {
    fs: {
      // Allow serving files from the parent directory (for ui-kit/icons dist)
      allow: [
        path.resolve(__dirname, ".."),
      ],
    },
  },
  css: {
    // Import ui-kit styles
  },
});
