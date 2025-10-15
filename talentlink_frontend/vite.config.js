import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === "production" ? "/TalentLink/" : "/",
  // keeps /TalentLink/ for both local & production
  server: {
    port: 5173,
    strictPort: true
  }
});
