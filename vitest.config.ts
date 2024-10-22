import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from "url";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
})
