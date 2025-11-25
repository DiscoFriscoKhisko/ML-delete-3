/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        // MlBrandKit - Primary Colors
        'void': '#050505',        // Void Black - Deepest background
        'oled': '#090909',        // OLED Black - Surface level
        'surface': '#1a1d21',     // Surface Dark - Card backgrounds
        'ghost': '#fefefe',       // Ghost White - Primary white
        'alabaster': '#d5dada',   // Alabaster Grey - Structure
        'smoke': '#f3f4f4',       // White Smoke - Light grey
        'laser': '#17f7f7',       // Laser Cyan - Primary accent

        // MlBrandKit - Spectral Neon Series
        'neon': {
          red: '#ff2a6d',         // Destructive / Critical
          green: '#05f7a5',       // Success / Positive
          blue: '#0a84ff',        // Info / Links
          violet: '#bf5af2',      // Spectrum / Secondary
        },

        // Legacy aliases (for backwards compatibility)
        'mint': '#17f7f7',        // Cyan Glow (alias for laser)
        'black': '#050505',       // Now maps to Void Black
        'white-smoke': '#f3f4f4', // White Smoke
        'white': '#fefefe',       // White

        // MlBrandKit - Grey Scale
        'grey': {
          50: '#fefefe',          // Ghost White
          100: '#f3f4f4',         // White Smoke
          200: '#e0e0e0',         // Light border
          300: '#d5dada',         // Alabaster
          400: '#888888',         // Muted text
          500: '#737373',         // Nickel
          600: '#525252',         // Dark muted
          700: '#333333',         // Border subtle
          800: '#1a1d21',         // Surface dark
          900: '#090909',         // OLED Black
          950: '#050505',         // Void Black
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'serif': ['Merriweather', 'Georgia', 'serif'],
        'mono': ['Inter', 'monospace'],  // MlBrandKit uses Inter as mono
      },
      letterSpacing: {
        'tightish': '-0.02em',
        'widest': '0.2em',        // MlBrandKit mono labels
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'expo-out': 'cubic-bezier(0.19, 1, 0.22, 1)',  // MlBrandKit viscous motion
      },
      screens: {
        'pointer-fine': { 'raw': '(pointer: fine)' },
      },
    },
  },
  plugins: [],
}
