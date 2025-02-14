import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    cors: true,
    hmr: {
      clientPort: 443,
    },
    allowedHosts: ['.grok-free.app','565d-2804-29b8-540d-29c5-9034-abc4-560-2135.ngrok-free.app'],
    proxy: {
      '/api': { // Prefixo das requisições
        target: 'http://192.168.0.9:8001', // URL do backend
        changeOrigin: true,
        secure: false, // Permite conexões HTTP sem erro de SSL
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
});
