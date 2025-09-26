import path from 'path';

export const astroDev = () => {
  const resolvedPath = path.resolve(process.cwd(), 'public/styles/');

  return {
    name: 'custom-dev',
    hooks: {
      'astro:server:setup': ({ server }) => {
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
