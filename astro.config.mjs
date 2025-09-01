import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mem-shibata.github.io',
  base: './',
  output: 'static',
  vite: {
    build: {
      cssMinify: false,
      minify: false,
    },
    css: {
      postcss: false,
    },
  },
});
