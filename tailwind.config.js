/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#0a52c7', // Dark Blue color for ITZONE
        },
        yellow: {
          500: '#e48318', // Orange color for ITZONE
        },
        background: {
          light: '#f7f8fa',
        },
        gray: {
          600: '#ffffff',
        },
      },
    },
  },
  plugins: [],
};