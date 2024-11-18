import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: false,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const HugeLibraries = ['@mui'];
          if (
            HugeLibraries.some((libName) =>
              id.includes(`node_modules/${libName}`),
            )
          ) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/graphql': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/subscriptions': {
        target: 'ws://localhost:3000/graphql',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace('/subscriptions', ''),
      },
    },
  },
});
