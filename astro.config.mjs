import { defineConfig } from 'astro/config';
import {resolve} from "path"

import svelte from "@astrojs/svelte";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '/fonts': resolve('./public/fonts')
      }
    }
  },
  integrations: [
    svelte(),
    AstroPWA({
      /* your pwa options */
      registerType: 'autoUpdate',
      injectRegister: 'script',
      workbox: {
        globPatterns: ['**\/*.{js,css,woff,woff2}']
      }

    })
  ]
});