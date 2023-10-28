import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://spm-g9t5-9yf6a.ondigitalocean.app",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
})
