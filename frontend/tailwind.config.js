/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
const tailwindCssConfig = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        gray: {
          50: '#C1C2C5',
          100: '#A6A7AB',
          200: '#909296',
          300: '#5C5F66',
          400: '#373A40',
          500: '#2C2E33',
          600: '#25262B',
          700: '#1A1B1E',
          800: '#141517',
          900: '#101113',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide'),require('@tailwindcss/typography')],
}
module.exports = tailwindCssConfig
