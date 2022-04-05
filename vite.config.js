import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const path = require('path')

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '~style': path.resolve(__dirname, './src/assets/style'),
      '~images': path.resolve(__dirname, './src/assets/images'),
      '~config': path.resolve(__dirname, './src/config'),
      '~utils': path.resolve(__dirname, './src/utils'),
      '~components': path.resolve(__dirname, './src/components'),
      '~api': path.resolve(__dirname, './src/api'),
    },
  },
})
