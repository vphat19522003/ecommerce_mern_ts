/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [],
  //Tailwind with MUI config
  corePlugins: {
    preflight: false
  },
  important: '#root'
};
