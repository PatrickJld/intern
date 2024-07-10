import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import removeConsole from 'vite-plugin-remove-console'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    removeConsole()
  ],
  build: {
    chunkSizeWarningLimit:1500,
    outDir: "./dist"
  },
  server: {
    hmr: {
      clientPort: 222 
    },

    host: ''
  }
})
