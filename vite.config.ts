import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    // Ensure public assets are copied
    copyPublicDir: true,
    
    // Explicitly include video files
    assetsInclude: ['**/*.mp4', '**/*.webm', '**/*.ogg'],
    
    // Rollup options for asset naming
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.(mp4|webm|ogg)$/.test(assetInfo.name)) {
            return 'assets/videos/[name][extname]';
          }
          return 'assets/[name][extname]';
        }
      }
    }
  }
});