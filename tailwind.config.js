/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2828FF',
        secondary: '#0F64FD',
        textPrimary: '#FFFFFF',
        textSecondary: '#C4D0FF',
        background: {
          main: '#2828FF',
          card: '#2828FF',
        },
        dot: {
          active: '#0F64FD',
          inactive: '#6B84FF',
        },
      },
      fontFamily: {
        vazir: ['Vazirmatn', 'sans-serif'],
      },
    },
  },
  plugins: [],
};