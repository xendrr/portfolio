// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://alexandrebahar.com',
  output: 'static',
  // La page /profil a été supprimée : on renvoie vers l'accueil pour ne pas
  // casser les liens déjà partagés ou indexés.
  redirects: {
    '/profil': '/',
  },
  integrations: [sitemap()]
});