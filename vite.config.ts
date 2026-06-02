import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/animal-island-vue'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        paths: [resolve(__dirname, 'src/animal-island-vue')],
      },
    },
  },
})
