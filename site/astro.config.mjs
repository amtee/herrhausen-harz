import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://herrhausen-harz.de',
  output: 'static',
  trailingSlash: 'always',
  redirects: {
    '/herrhausen-black-white/index.php/veranstaltungen/505-abschied-muss-man-ueben-konzert-in-der-herrhaeuser-kirche': '/veranstaltungen/abschied-muss-man-ueben/',
    '/herrhausen-black-white/index.php/veranstaltungen/506-singbeteiligung-im-gemischten-chor-gut-aber-maennerstimmen-dringend-gesucht': '/aktuelles/singbeteiligung-im-gemischten-chor/',
    '/herrhausen-black-white/index.php/veranstaltungen/507-kinderfasching-2026': '/veranstaltungen/kinderfasching-2026/',
    '/herrhausen-black-white/index.php/veranstaltungen/508-drk-herrhausen-zieht-bilanz-4': '/aktuelles/drk-herrhausen-zieht-bilanz/',
    '/herrhausen-black-white/index.php/veranstaltungen/509-protokoll-der-ortsratssitzung-vom-23-april-2026': '/aktuelles/protokoll-ortsrat/',
  },
  integrations: [sitemap()],
});