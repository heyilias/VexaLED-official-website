import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  // Expose VITE_* (Vite default) AND NEXT_PUBLIC_* (so the same keys work if
  // we ever migrate to Next.js, and so Supabase keys can use either prefix).
  envPrefix: ["VITE_", "NEXT_PUBLIC_"],
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
