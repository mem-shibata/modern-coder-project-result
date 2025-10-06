import path from 'path';

export const astroDev = () => {
  return {
    name: 'custom-dev',
    hooks: {
      'astro:server:setup': ({ server }) => {
        // 開発用CSSの変更を検知
        const resolvedPath = path.resolve(process.cwd(), 'public/styles/');

        server.watcher.on('change', (file) => {
          if (file.startsWith(resolvedPath)) {
            server.ws.send({
              type: 'full-reload',
              path: '*',
            });
          }
        });
      },
    },
  };
};
