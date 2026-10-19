import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const ghPagesBase = '/Lakaaz-Lamer/'

export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  base: command === 'build' || mode === 'production' ? ghPagesBase : '/',
  server: {
    port: 5173,
  },
}))
