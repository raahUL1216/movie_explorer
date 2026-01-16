import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    // This creates a clean path that works on both Windows and Linux
    setupFiles: [fileURLToPath(new URL('./src/tests/setupTests.ts', import.meta.url))],
  },
});