const colors = require('tailwindcss/colors')
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        gray: colors.neutral,
      },
    },
  },
  plugins: [],
}
