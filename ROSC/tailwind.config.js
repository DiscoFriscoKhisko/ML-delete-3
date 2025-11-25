/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        'mint': '#17f7f7',        // Cyan Glow
        'black': '#090909',       // Black
        'white-smoke': '#f3f4f4', // White Smoke
        'alabaster': '#d5dada',   // Alabaster Grey
        'white': '#fefefe',       // White
        'grey': {
          50: '#fefefe',          // White
          100: '#f3f4f4',         // White Smoke
          200: '#d5dada',         // Alabaster Grey
          300: '#d5dada',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#1a1a1a',
          800: '#111111',
          900: '#090909',         // Black
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'serif': ['Merriweather', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'tightish': '-0.02em',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      screens: {
        'pointer-fine': { 'raw': '(pointer: fine)' },
      },
    },
  },
  plugins: [],
}
