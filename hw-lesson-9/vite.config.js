import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    fs: {
      allow: ['..'], // Allow serving files from one level up to the project root
    },
  },
  json: {
    stringify: true
  }
})
