// vite.config.ts (repo root)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: "client",                 // your index.html is in /client
  base: "/",                      // correct asset URLs on Vercel
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  server: {
    port: 5173,                   // optional; whatever you’re using
    proxy: {
      // http://localhost:5173/redirect -> https://.../Prod/redirect
      "/redirect": {
        target: "https://ze5go02q36.execute-api.us-east-2.amazonaws.com",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/redirect/, "/Prod/redirect"),
      },
      // if you call these later, keep them here too
      "/vendor-referral": {
        target: "https://ze5go02q36.execute-api.us-east-2.amazonaws.com",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/vendor-referral/, "/Prod/vendor-referral"),
      },
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
