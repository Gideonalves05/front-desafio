import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/transfer': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/users': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/deposit': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/withdrawal': {
        target: 'http://localhost:8080', 
        changeOrigin: true,
      },
      '/getId': {
        target: 'http://localhost:8080', 
        changeOrigin: true,
    },
    '/statement': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    
  },
}});

