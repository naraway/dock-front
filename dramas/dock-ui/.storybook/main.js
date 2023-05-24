const { loadConfigFromFile, mergeConfig } = require('vite');
const path = require('path');

module.exports = {
  stories: [
    '../storybook/**/*.stories.mdx',
    '../storybook/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: { name: '@storybook/react-vite', options: {} },
  docs: { autodocs: 'tag' },
  core: { builder: '@storybook/builder-vite' },
  viteFinal: async (config, { configType }) => {
    const { config: userConfig } = await loadConfigFromFile(path.resolve(__dirname, '../vite.config.ts'));

    return mergeConfig(config, {
      ...userConfig,
      // manually specify plugins to avoid conflict
      plugins: [],
      resolve: {
        alias: {
          '~': path.resolve(__dirname, '../src'),
          '@nara-way/dock-ui': path.resolve(__dirname, '../src'),
        },
      },
      server: {
        proxy: {
          '/api/checkpoint': {
            target: 'http://localhost:9002',
            rewrite: (path) => path.replace('/api/checkpoint', '/'),
            changeOrigin: true,
            configure: (proxy) =>
              proxy.on('proxyReq', (proxy) => console.log(`-> ${proxy.protocol}//${proxy.host}${proxy.path}`)),
          },
          '/api/metro': {
            target: 'http://localhost:9001',
            rewrite: (path) => path.replace('/api/metro', '/'),
            changeOrigin: true,
            configure: (proxy) =>
              proxy.on('proxyReq', (proxy) => console.log(`-> ${proxy.protocol}//${proxy.host}${proxy.path}`)),
          },
          '/api/herald': {
            target: 'http://localhost:9093',
            rewrite: (path) => path.replace('/api/herald', '/'),
            changeOrigin: true,
            configure: (proxy) =>
                proxy.on('proxyReq', (proxy) => console.log(`-> ${proxy.protocol}//${proxy.host}${proxy.path}`)),
          },
          '/api': {
            target: 'http://demo.dev.naraway.io',
            rewrite: (path) => path.replace('/api', '/api'),
            crossOrigin: true,
            configure: (proxy) =>
              proxy.on('proxyReq', (proxy) =>
                console.log(`-> ${proxy.protocol}//${proxy.host}${proxy.port ? ':' + proxy.port : ''}${proxy.path}`),
              ),
          },
        },
      },
    });
  },
};
