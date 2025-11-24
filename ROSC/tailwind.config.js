/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        'mint': '#00FFFF',
        'grey': {
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      fontFamily: {
        'sans': ['Saans', 'system-ui', '-apple-system', 'sans-serif'],
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
