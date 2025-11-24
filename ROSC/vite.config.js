import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  base: '/ML-delete-3/',
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
      'gsap/SplitText': path.resolve('/Users/daminirathi/Desktop/ML explore/ML Claude experiments/gsap-public/esm/SplitText.js'),
      'gsap/ScrollToPlugin': path.resolve('/Users/daminirathi/Desktop/ML explore/ML Claude experiments/gsap-public/esm/ScrollToPlugin.js')
    }
  }
})
