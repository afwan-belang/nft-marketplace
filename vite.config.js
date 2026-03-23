import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import webfontDownload from 'vite-plugin-webfont-dl'

export default defineConfig({
  plugins: [react(), tailwindcss(), webfontDownload()],
  build: {
    // Membuang console.log dan debugger otomatis saat build production
    esbuild: {
      drop: ['console', 'debugger'],
    },
    // Konfigurasi pembagian chunk (potongan file)
    rollupOptions: {
      output: {
        manualChunks: {
          // Pisahkan React core
          'vendor-react': ['react', 'react-dom'],
          // Pisahkan library animasi (karena ukurannya lumayan besar)
          'vendor-framer': ['framer-motion'],
          // Pisahkan ikon
          'vendor-icons': ['lucide-react']
        }
      }
    }
  }
})