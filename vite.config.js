import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://poc-in-github.motikan2010.net',
        changeOrigin: true,
        secure: false,
      },
      '/osv-api': {
        target: 'https://api.osv.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/osv-api/, ''),
      },
    },
  },
})
