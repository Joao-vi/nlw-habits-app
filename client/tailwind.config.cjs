/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#09090A',
        },
      },
    },
  },
  plugins: [],
};
