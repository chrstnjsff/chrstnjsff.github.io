// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { codeFrame } from './src/lib/code-frame.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://chrstnjsff.github.io',
  integrations: [
    sitemap({ filter: (page) => !page.includes('/contact/thanks') }),
  ],
  redirects: {
    '/contact-us': '/contact/',
  },
  markdown: {
    // Guides are copy-paste commands: never turn quotes or "--" into
    // typographic characters.
    processor: satteri({ features: { smartPunctuation: false } }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      transformers: [codeFrame()],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
