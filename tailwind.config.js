/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        zen: {
          white: '#FAFAF9',
          stone: '#1C1917',
          gray: '#78716C',
          'light-gray': '#E7E5E4',
          moss: '#86EFAC',
          'moss-dark': '#4ADE80',
        },
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        }
      },
      spacing: {
        'zen-xs': '1rem',
        'zen-sm': '2rem',
        'zen-md': '4rem',
        'zen-lg': '6rem',
        'zen-xl': '10rem',
        'zen-2xl': '16rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
