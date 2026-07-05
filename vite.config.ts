import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'skip-unavailable-public-files',
      configureServer() {},
      generateBundle() {},
      writeBundle: {
        sequential: true,
        handler() {},
      },
      closeBundle() {},
    },
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  publicDir: (() => {
    const publicDir = path.resolve(__dirname, 'public');
    const safeDir = path.resolve(__dirname, '.public-safe');
    if (!fs.existsSync(safeDir)) fs.mkdirSync(safeDir);
    const entries = fs.readdirSync(publicDir);
    for (const entry of entries) {
      const safeName = entry.replace(/\s+/g, '_');
      const src = path.join(publicDir, entry);
      const dest = path.join(safeDir, safeName);
      try {
        fs.accessSync(src, fs.constants.R_OK);
        if (!fs.existsSync(dest)) fs.copyFileSync(src, dest);
      } catch {}
    }
    return safeDir;
  })(),
});
