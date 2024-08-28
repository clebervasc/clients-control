/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('./src/assets/login-bg.svg')",
      },
      colors: {
        current: 'currentColor',
        dashboard: '#F4F7FE',
      },
    },
  },
  plugins: [],
}
