import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://api.waqi.info',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    allowedHosts: [
      'traffichivetest.onrender.com',
      'traffichive-frontend.onrender.com',
      'traffic-hive.onrender.com',
      'localhost',
      '127.0.0.1'
    ]
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  preview: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
  }
})
