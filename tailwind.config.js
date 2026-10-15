/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f5ff',
          100: '#e0ebfe',
          200: '#bad5fd',
          300: '#7cb5fb',
          400: '#378ff6',
          500: '#0f6fed',
          600: '#0252cf',
          700: '#0341a7',
          800: '#073686',
          900: '#0c2e6f',
          950: '#081c47',
        },
        navy: {
          800: '#14213d',
          900: '#0d1829',
          950: '#08101d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
