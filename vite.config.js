import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative base so the build works on any host or sub-path (GitHub Pages, Netlify, Vercel).
  base: './',
  // Your images live in public/assets/, so keep Vite's own bundles out of that folder.
  build: { assetsDir: 'static' },
});
