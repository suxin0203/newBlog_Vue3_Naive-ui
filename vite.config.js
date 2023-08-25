import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// console.log("path", path);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0", //内网访问
  },
  resolve: {
    alias: {
      // 关键代码
      "@": resolve(__dirname, "src")
    },
  },
});