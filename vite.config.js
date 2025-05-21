import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'build'  // This changes output folder from dist to build
  },
  base:'/dentia-frontend-demo/',
  plugins: [react()],
})
