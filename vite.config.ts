import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/taxCalculator/',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/index.scss";`,
      },
    },
  },
  server: {
    host: true,
  },
})
