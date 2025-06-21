// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

import react from '@astrojs/react';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), vue()]
});