import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import partytown from "@astrojs/partytown";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://medcross.netlify.app",
  redirects: {
    "/archive": "/archive/crossword"
  },
  publicDir: "./www",
  integrations: [
    svelte(),
    partytown({ config: { forward: ['dataLayer.push'] } }),
    AstroPWA({
      /* your pwa options */
      registerType: 'autoUpdate',
      injectRegister: 'script',
      workbox: {
        globPatterns: ['**/*.{woff,woff2}']
      },
      selfDestroying: true,
      manifest: {
        name: 'medcross',
        short_name: 'medcross',
        description: 'Crosswords for Medical Students and Professionals',
        theme_color: '#ecedef',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png']

    })
  ]
});
