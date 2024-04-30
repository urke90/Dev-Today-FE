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
      boxShadow: {
        'header-menu':
          '0px 3px 80px 0px #0000004D, dark:0px 7px 80px 0px #0000001A',
        'search-dialog':
          '0px 0px 0px 1px #1212124D, dark:0px 0px 0px 1px #1212120D',
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
        /** RADIX UI ANIMATION */
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: '0', transform: 'translateX(2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: '0', transform: 'translateY(2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: '0', transform: 'translateX(-2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        /** RADIX UI ANIMATION */
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        /** RADIX UI ANIMATION */
        slideDownAndFade:
          'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade:
          'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade:
          'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        /** RADIX UI ANIMATION */
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
