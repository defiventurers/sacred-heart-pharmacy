import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    // Turn OFF the Replit-only plugins on Vercel so they don't break the build
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? []
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  // Keep using the "client" folder as the app root
  root: path.resolve(__dirname, "client"),
  build: {
    // Build into "dist" (what Vercel expects)
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
