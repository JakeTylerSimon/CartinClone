// vite.config.ts  (at repo root)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()], // no dev-only Replit plugins in prod
  root: "client", // index.html lives in /client
  base: "/", // correct asset URLs on Vercel
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  build: {
    outDir: "dist", // => outputs to client/dist
    emptyOutDir: true,
  },
});
