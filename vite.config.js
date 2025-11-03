import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // auto update SW
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "My Progressive Web App",
        short_name: "MyPWA",
        description: "A PWA built with Vite + React",
        theme_color: "#000000",
        background_color: "#ffffff",
        display: "standalone",
        start_url: ".",
        icons: [
          { src: "logo192.png", sizes: "192x192", type: "image/png" },
          { src: "logo512.png", sizes: "512x512", type: "image/png" }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst",
            options: { cacheName: "html-cache" }
          },
          {
            urlPattern: ({ request }) =>
              request.destination === "image" || request.destination === "script" || request.destination === "style",
            handler: "CacheFirst",
            options: { cacheName: "asset-cache", expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 } }
          }
        ]
      }
    })
  ]
});
