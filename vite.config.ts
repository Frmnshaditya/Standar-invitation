import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

function musicFolderPlugin() {
  const virtualModuleId = 'virtual:wedding-music';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'wedding-music-folder',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        const musicDir = path.resolve(__dirname, 'public/music');
        let selectedFile = '';
        if (fs.existsSync(musicDir)) {
          const files = fs
            .readdirSync(musicDir)
            .filter((name) => /\.(mp3|m4a|ogg|wav)$/i.test(name))
            .sort();
          if (files.includes('wedding-song.mp3')) {
            selectedFile = 'wedding-song.mp3';
          } else if (files.length > 0) {
            selectedFile = files[0];
          }
        }
        const url = selectedFile ? `/music/${encodeURIComponent(selectedFile)}` : '';
        return `export const MUSIC_FILE_URL = ${JSON.stringify(url)};`;
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      musicFolderPlugin(),
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
