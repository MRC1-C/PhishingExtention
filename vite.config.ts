import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";
import { crx } from "@crxjs/vite-plugin";
// Node 14 & 16
import manifest from './manifest.json'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [crx({ manifest })],
  build: {
    rollupOptions: {
      input: {
        panel: resolve(__dirname, "src/panel/index.html"),
      },
    },
  },
})
