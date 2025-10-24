import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // base: "/dashboard/",
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          excel: ['exceljs'],
          filesaver: ['file-saver'],
          vue: ['vue', 'vue-router', 'pinia'],
          charts: ['chart.js', 'vue3-apexcharts'],
          leaflet: ['leaflet'],
          icons: ['@mdi/js'],
        },
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  preview: {
    port: 5004,
    host: true,
    allowedHosts: ['aqmsbandung.info', 'www.aqmsbandung.info'],
  },
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
