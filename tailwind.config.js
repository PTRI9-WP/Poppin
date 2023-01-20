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
        Tertiary: '#140700',
        Secondary: '#D27F4B',
        Primary: '#F3E0C4',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
