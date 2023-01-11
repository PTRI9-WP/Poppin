/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./client/src/**/*.{js,jsx,ts,tsx}', './client/public/index.html'],
  theme: {
    extend: {
      colors: {
        dark: '#2a2829',
        blue: '#28354f',
        gray: '#e0e0db',
        white: '#ffffff',
        pink: '#b19b8c',
        green: '#8e9379',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
