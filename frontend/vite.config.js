import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    // 💡 Maps process.env globally so legacy or CRA code doesn't crash in Vite
    'process.env': {},
  },
})