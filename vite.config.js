import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '/common-frontend/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: path.resolve(__dirname, 'src/library.js'),
      name: 'CibCommonFrontend',
      fileName: (format) => `cib-common-frontend.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'axios', 'bootstrap', 'vue-i18n', 'vue-router'],
      output: {
        globals: {
          vue: 'Vue',
          axios: 'axios',
          bootstrap: 'bootstrap',
          'vue-i18n': 'VueI18n',
          'vue-router': 'VueRouter'
        }
      }
    }
  }
})