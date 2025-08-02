import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'client-simple',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    historyApiFallback: true
  }
})