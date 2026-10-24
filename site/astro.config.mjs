import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://herrhausen-harz.de',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
});