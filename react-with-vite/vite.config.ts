/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    target: ['chrome90', 'firefox89', 'safari15'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    // coverage: {
    //   provider: 'v8',
    //   reporter: ['text', 'json', 'html'],
    // },
  },
})
