/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.jsx'],
  theme: {
    extend: {
      colors: {
        olive: {
          600: '#708238',
          700: '#606c30',
        },
      },
    },
  },
  plugins: [],
}

