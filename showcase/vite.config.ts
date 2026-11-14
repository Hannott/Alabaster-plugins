import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import { alabasterPlugin } from './alabaster.vite.ts'

export default defineConfig({
  plugins: [vue(), alabasterPlugin()],
})
