import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'https://dre-backend-49rf.onrender.com', // URL do backend
        changeOrigin: true, // Ajusta a origem para corresponder ao backend
        secure: false, // Caso o backend use HTTPS com certificado autoassinado
      },
      '/api': {
        target: 'https://dre-backend-49rf.onrender.com', // URL do backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
