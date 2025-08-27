// client/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/", // correct asset URLs in prod
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // if you import from these, keep them; otherwise remove:
      "@shared": path.resolve(__dirname, "../shared"),
      "@assets": path.resolve(__dirname, "../attached_assets"),
    },
  },
  build: {
    outDir: "dist", // <— Vercel will publish this folder
    emptyOutDir: true,
  },
});
