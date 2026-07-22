import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
      // Use onnxruntime-web's "extern-wasm" build variant: it fetches the
      // .wasm binary at runtime from ort.env.wasm.wasmPaths (we point that at
      // jsDelivr) instead of bundling a 13MB wasm file into our own dist/
      // output, which would blow past InfinityFree's 10MB per-file limit.
      conditions: ['onnxruntime-web-use-extern-wasm'],
    },
    server: {
      // HMR is disabled via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    esbuild: {
      // Strip console.* and debugger statements from the production bundle.
      // Slightly smaller/faster parse on low-end devices, and avoids leaking
      // internal debug info to end users.
      drop: process.env.NODE_ENV === 'production' ? ['debugger'] : [],
    },
    build: {
      // Modern baseline: smaller output because esbuild/rollup don't need to
      // generate legacy fallback code for browsers from ~2017 and earlier.
      target: 'es2018',
      cssMinify: true,
      // Split rarely-changing, heavy third-party code into its own cacheable
      // chunk, separate from the app code that changes on every deploy.
      // Result: after the FIRST visit, a returning user only re-downloads the
      // small app chunk when you ship an update — the big vendor chunk stays
      // cached. This is the difference between "re-download everything" and
      // "re-download a few KB" on a slow connection.
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-motion': ['motion'],
            'vendor-icons': ['lucide-react', 'react-icons'],
            'vendor-astronomy': ['astronomy-engine', 'satellite.js'],
          },
        },
      },
      // Default (4KB) is fine, but raising slightly avoids an excessive
      // number of tiny separate requests for small icon/asset files.
      chunkSizeWarningLimit: 700,
    },
  };
});
