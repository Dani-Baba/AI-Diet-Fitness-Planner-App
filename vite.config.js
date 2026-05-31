import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'], // Ye Vite ko batata hai ke .jsx files ko dhundna hai
  },
  server: {
    port: 5173,
    hmr: {
      overlay: true,
    },
  },
});