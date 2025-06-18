import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  server: {
    host: '0.0.0.0',      // Enables access on local network (mobile)
    port: 3000,           // Optional: any open port
  },
  build: {
    outDir: 'build'       // Output directory for production
  },
  base: mode === 'production' ? '/dentia-frontend-demo/' : '/dentia-frontend-demo/',  // Use correct base
  plugins: [react()]
}));
