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
        target: "http://localhost:8085/shopApi/", // 프록시 요청을 보낼 대상 URL
        rewrite: (path) => path.replace(/^\/api/, ""), // 경로 재작성(Ex. '/api/test' => 'https://서버.com/test')
        changeOrigin: true, // 원본 서버에 요청 시 호스트 헤더 변경
      },
    },
  },
});
