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
      workbox: {
        globPatterns: ['**\/*.{js,html,css}']
      }

    })
  ]
});