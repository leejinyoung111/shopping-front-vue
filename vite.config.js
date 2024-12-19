import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.1.72:8085/shopApi", // 백엔드 서버 주소
        changeOrigin: true, // CORS 문제 해결
        rewrite: (path) => path.replace(/^\/api/, "/api"), // '/api' 경로 유지
      },
    },
  },
});
