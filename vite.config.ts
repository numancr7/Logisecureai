import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const API_URL = process.env.VITE_API_URL || "http://127.0.0.1:8000";

export default defineConfig({
  tanstackStart: {
    server: { 
      entry: "server",
      preset: "vercel",
    },
  },
  vite: {
    server: {
      proxy: {
        "/api": { target: API_URL, changeOrigin: true, secure: false },
        "/agent-analyze": { target: API_URL, changeOrigin: true, secure: false },
        "/agent-status": { target: API_URL, changeOrigin: true, secure: false },
        "/health": { target: API_URL, changeOrigin: true, secure: false },
      },
    },
  },
});