import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === "production" ? "/gameday-europe-countdown/" : "/",
  resolve: {
    alias: {
      "@compositions": path.resolve(__dirname),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
});
