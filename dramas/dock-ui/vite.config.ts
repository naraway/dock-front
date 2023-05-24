import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const packageJson = require('./package.json');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react({
      exclude: /\.stories\.(mdx|[tj]sx?)$/,
      include: [/\.tsx?$/, /\.jsx?$/, /\.css$/],
    }),
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      name: packageJson.name,
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        '@emotion/react',
        '@emotion/styled',
        '@mui/icons-material',
        '@mui/lab',
        '@mui/material',
        '@mui/styles',
        '@tanstack/react-query',
        'ag-grid-community',
        'ag-grid-react',
        'axios',
        'i18next',
        'muibox',
        'notistack',
        'react',
        'react-dom',
        'react-i18next',
      ],
      output: {
        globals: {},
      },
    },
  },
});
