import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      'gsap': path.resolve('/Users/daminirathi/Desktop/ML explore/ML Claude experiments/gsap-public/esm'),
      'gsap/ScrollTrigger': path.resolve('/Users/daminirathi/Desktop/ML explore/ML Claude experiments/gsap-public/esm/ScrollTrigger.js'),
      'gsap/ScrollToPlugin': path.resolve('/Users/daminirathi/Desktop/ML explore/ML Claude experiments/gsap-public/esm/ScrollToPlugin.js')
    }
  }
})
