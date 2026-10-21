import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/dist/**', '**/*.crdownload', '**/*.tmp'],
      usePolling: true,
      interval: 1000,
    },
  },
  build: {
    outDir: 'dist'
  }
})
