import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
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
    AstroPWA({
      /* your pwa options */
      registerType: 'autoUpdate',
      injectRegister: 'script',
      workbox: {
        globPatterns: ['**\/*.{js,css,woff,woff2}']
      },
      selfDestroying: true

    })
  ]
});
