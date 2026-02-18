import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://db.cs.pitt.edu",
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('.pdf') && !page.includes('404'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});