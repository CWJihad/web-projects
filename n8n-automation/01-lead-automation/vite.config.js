import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      'https://speech-bike-appropriate-eight.trycloudflare.com',
      '.trycloudflare.com'
    ]
  }
})