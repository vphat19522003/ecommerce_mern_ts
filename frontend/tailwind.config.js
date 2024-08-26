/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      }
    },
    screens: {
      xs: '400px',
      sm: '600px',
      md: '960px',
      lg: '1280px',
      xl: '1920px'
    },
    fontSize: {
      xs: '11px',
      sm: '13px',
      md: '14px',
      base: '15px',
      lg: '16px',
      xl: '18px',
      '2xl': '1.5rem',
      '3xl': '1.8rem',
      '4xl': '2.25rem',
      '5xl': '2.75rem',
      '6xl': '4rem',
      '7xl': '5rem'
    }
  },
  plugins: [],
  //Tailwind with MUI config
  corePlugins: {
    preflight: false
  },
  important: '#root'
};
