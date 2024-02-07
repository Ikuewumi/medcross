import { defineConfig } from 'astro/config';

import svelte from "@astrojs/svelte";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    AstroPWA({
      /* your pwa options */
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      mode: "production",
      workbox: {
        globPatterns: ['**\/*.{js,html,css}']
      }

    })
  ]
});