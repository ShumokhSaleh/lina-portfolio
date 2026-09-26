// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sanity({
      projectId: '8t1sl8zv',
      dataset: 'production',
      // false: نجيب أحدث نسخة وقت البناء (الموقع ثابت، فما نحتاج سرعة الـ CDN)
      useCdn: false,
    })
  ]});