// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://sacpm.github.io',
  base: 'Spanish_Tutor',
  integrations: [react()],
});