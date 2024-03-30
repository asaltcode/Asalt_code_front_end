import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Configure the port
    port: 5173,
    
    // Enable hot module replacement (HMR) for faster development
    hmr: true,
    proxy: {
      '/api': {
        target: 'https://asalt-code-back-end-d9ge.vercel.app',
        changeOrigin: true,
        secure: true
      },
    },
  },
})
