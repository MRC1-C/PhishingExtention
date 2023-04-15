// vite.config.ts
import { defineConfig } from "file:///home/quan/Documents/Hackathon2023/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import { crx } from "file:///home/quan/Documents/Hackathon2023/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  version: "1.0.0",
  name: "Hackathon2023",
  description: "NMTDDM",
  icons: {
    "128": "icon-128.png"
  },
  options_page: "src/options/index.html",
  background: {
    service_worker: "src/background/index.tsx",
    type: "module"
  },
  chrome_url_overrides: {
    newtab: "src/newtab/index.html"
  },
  action: { default_popup: "src/popup/index.html" },
  devtools_page: "src/devtools/index.html",
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content/index.tsx"],
      media: []
    }
  ],
  permissions: [
    "activeTab",
    "scripting",
    "alarms",
    "notifications",
    "storage"
  ]
};

// vite.config.ts
var __vite_injected_original_dirname = "/home/quan/Documents/Hackathon2023";
var vite_config_default = defineConfig({
  plugins: [crx({ manifest: manifest_default })],
  build: {
    rollupOptions: {
      input: {
        panel: resolve(__vite_injected_original_dirname, "src/panel/index.html")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3F1YW4vRG9jdW1lbnRzL0hhY2thdGhvbjIwMjNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3F1YW4vRG9jdW1lbnRzL0hhY2thdGhvbjIwMjMvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvcXVhbi9Eb2N1bWVudHMvSGFja2F0aG9uMjAyMy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGNyeCB9IGZyb20gXCJAY3J4anMvdml0ZS1wbHVnaW5cIjtcbi8vIE5vZGUgMTQgJiAxNlxuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4vbWFuaWZlc3QuanNvbidcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbY3J4KHsgbWFuaWZlc3QgfSldLFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIHBhbmVsOiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvcGFuZWwvaW5kZXguaHRtbFwiKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pXG4iLCAie1xuICAgIFwibWFuaWZlc3RfdmVyc2lvblwiOiAzLFxuICAgIFwidmVyc2lvblwiOiBcIjEuMC4wXCIsXG4gICAgXCJuYW1lXCI6IFwiSGFja2F0aG9uMjAyM1wiLFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJOTVRERE1cIixcbiAgICBcImljb25zXCI6IHtcbiAgICAgIFwiMTI4XCI6IFwiaWNvbi0xMjgucG5nXCJcbiAgICB9LFxuICAgIFwib3B0aW9uc19wYWdlXCI6IFwic3JjL29wdGlvbnMvaW5kZXguaHRtbFwiLFxuICAgIFwiYmFja2dyb3VuZFwiOiB7XG4gICAgICBcInNlcnZpY2Vfd29ya2VyXCI6IFwic3JjL2JhY2tncm91bmQvaW5kZXgudHN4XCIsXG4gICAgICBcInR5cGVcIjogXCJtb2R1bGVcIlxuICAgIH0sXG4gICAgXCJjaHJvbWVfdXJsX292ZXJyaWRlc1wiOiB7XG4gICAgICAgIFwibmV3dGFiXCI6IFwic3JjL25ld3RhYi9pbmRleC5odG1sXCJcbiAgICAgIH0sXG4gICAgXCJhY3Rpb25cIjogeyBcImRlZmF1bHRfcG9wdXBcIjogXCJzcmMvcG9wdXAvaW5kZXguaHRtbFwiIH0sXG4gICAgXCJkZXZ0b29sc19wYWdlXCI6IFwic3JjL2RldnRvb2xzL2luZGV4Lmh0bWxcIixcbiAgICBcImNvbnRlbnRfc2NyaXB0c1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwibWF0Y2hlc1wiOiBbXCI8YWxsX3VybHM+XCJdLFxuICAgICAgICBcImpzXCI6IFtcInNyYy9jb250ZW50L2luZGV4LnRzeFwiXSxcbiAgICAgICAgXCJtZWRpYVwiOiBbXVxuICAgICAgfVxuICAgIF0sXG4gICAgXCJwZXJtaXNzaW9uc1wiOiBbXG4gICAgICBcImFjdGl2ZVRhYlwiLFxuICAgICAgXCJzY3JpcHRpbmdcIixcbiAgICAgIFwiYWxhcm1zXCIsXG4gICAgICBcIm5vdGlmaWNhdGlvbnNcIixcbiAgICAgIFwic3RvcmFnZVwiXG4gICAgXVxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1IsU0FBUyxvQkFBb0I7QUFFclQsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsV0FBVzs7O0FDSHBCO0FBQUEsRUFDSSxrQkFBb0I7QUFBQSxFQUNwQixTQUFXO0FBQUEsRUFDWCxNQUFRO0FBQUEsRUFDUixhQUFlO0FBQUEsRUFDZixPQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsY0FBZ0I7QUFBQSxFQUNoQixZQUFjO0FBQUEsSUFDWixnQkFBa0I7QUFBQSxJQUNsQixNQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0Esc0JBQXdCO0FBQUEsSUFDcEIsUUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUNGLFFBQVUsRUFBRSxlQUFpQix1QkFBdUI7QUFBQSxFQUNwRCxlQUFpQjtBQUFBLEVBQ2pCLGlCQUFtQjtBQUFBLElBQ2pCO0FBQUEsTUFDRSxTQUFXLENBQUMsWUFBWTtBQUFBLE1BQ3hCLElBQU0sQ0FBQyx1QkFBdUI7QUFBQSxNQUM5QixPQUFTLENBQUM7QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUFBLEVBQ0EsYUFBZTtBQUFBLElBQ2I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNKOzs7QURoQ0EsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLElBQUksRUFBRSwyQkFBUyxDQUFDLENBQUM7QUFBQSxFQUMzQixPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixPQUFPO0FBQUEsUUFDTCxPQUFPLFFBQVEsa0NBQVcsc0JBQXNCO0FBQUEsTUFDbEQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
