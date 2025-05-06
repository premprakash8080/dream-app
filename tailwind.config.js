/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#4B2B88',
          light: '#EAE6FF',
          background: '#F4F2FF',
          dark: '#351F6', // optional darker purple
        },
      },
    },
  },
  plugins: [],
};
