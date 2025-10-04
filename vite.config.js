import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/EbookV1/', // 👈 exact repo name (case-sensitive)
})