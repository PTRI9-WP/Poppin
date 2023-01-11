/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./client/src/**/*.{js,jsx,ts,tsx}', './client/public/index.html'],
  theme: {
    extend: {
      colors: {
        dark: '#2d3b46',
        blue: '#28354f',
        gray: '#e0e0db',
        pink: '#b19b8c',
        green: '#598c83',
        peach: '#f1c9ba',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
