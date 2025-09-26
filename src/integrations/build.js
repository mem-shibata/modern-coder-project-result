import { rm } from 'node:fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

let projectRootPath;

// ビルド時に実行する処理
export const astroBuild = () => {
  return {
    name: 'astro-build',
    hooks: {
      'astro:config:setup': async ({ config }) => {
        projectRootPath = fileURLToPath(config.root);
      },

      'astro:build:before': async ({ logger }) => {
        const cssFilename = path.resolve(projectRootPath, 'public/styles/');
        console.log(config);

        try {
          await rm(cssFilename, { recursive: true, force: true });
          logger.info(`✅ 開発用CSSを削除: ${cssFilename.pathname}`);
        } catch (error) {
          logger.error(`❌ CSSを削除できませんでした: ${cssFilename.pathname}`);
          logger.error(error);
        }
      },

      'astro:build:done': async ({ dir, logger }) => {
        // パーツリストの削除
        const partslistPath = new URL('partslist/', dir);
        try {
          await rm(partslistPath, { recursive: true, force: true });
          logger.info(`✅ パーツリストを削除: ${partslistPath.pathname}`);
        } catch (error) {
          logger.error(`❌ パーツリストを削除できませんでした: ${partslistPath.pathname}`);
          logger.error(error);
        }
      },
    },
  };
};
