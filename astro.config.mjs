import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // site: "https://db.cs.pitt.edu",
  site: "https://sarrisv.github.io",
  base: '/temp-website',
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('.pdf') && !page.includes('404'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});