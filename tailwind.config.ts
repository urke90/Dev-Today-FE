import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './styles/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      screens: {
        xxl: '1440px',
      },
      colors: {
        primary: {
          100: '#E8E1ff',
          500: '#825EF6',
        },
        black: {
          600: '#2E3757',
          700: '#393E4F',
          800: '#262935',
          900: '#1F2128',
        },
        white: {
          100: '#FFFFFF',
          200: '#F8FAFC',
          300: '#C5D0E6',
          400: '#808191',
          500: '#55597D',
        },
        darkBorder: 'rgba(57, 62, 79, 0.4)',
        whiteBorder: 'rgba(197, 208, 230, 0.4)',
        orangeRed: '#F65E5E',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
