import { defineConfig } from 'astro/config';
import { astroBuild } from './src/integrations/build';
import { astroDev } from './src/integrations/dev';

export default defineConfig({
  site: 'https://mem-shibata.github.io',
  base: '/',
  output: 'static',
  integrations: [astroBuild(), astroDev()],
  vite: {
    build: {
      cssMinify: false, // CSSを圧縮しない
      minify: false, // HTMLを圧縮しない
    },
    css: {
      postcss: false, // PostCSSを使用しない
    },
    // plugins: [process.env.NODE_ENV === 'development' ? astroDev() : undefined],
  },
});
