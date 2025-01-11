/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy()
  ],
  css: {
    postcss: './postcss.config.cjs',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'services': path.resolve(__dirname, './resources/services/'),
      'router': path.resolve(__dirname, './src/router'),
      'public': path.resolve(__dirname, './public'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
  define: {
    'import.meta.env.VITE_API_ADDRESS': JSON.stringify(process.env.VITE_API_ADDRESS || 'http://localhost:5217')
  }
})
