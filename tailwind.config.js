/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    screens: {
      'xs': {
        max: '575px'
      },
      'sm': {
        min: '576px',
      },
      'md': {
        min: '768px'
      },
      'lg': {
        min: '992px'
      },
      'xl': {
        min: '1200px'
      },
      '2xl': {
        min: '1600px'
      },
    }
  },
  plugins: [],
}

