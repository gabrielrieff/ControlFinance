import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  important: true,
  theme: {
    colors: {
      black: {
        100: '#000000'
      },
      white: {
        100: '#FFFFFF'
      },
      grey: {
        200: '#FCFCFC',
        300: '#E8E8E8',
        400: '#AAAAAA',
        500: '#959595',
        600: '#505050',
        700: '#292D32'
      },
      green: {
        200: '#ABFFC3',
        400: '#08C804',
        500: '#03A200'
      },
      blue: {
        200: '#D1ECFF',
        300: '#E4F1F2',
        500: '#0500FF'
      },
      red: {
        200: '#FFA4A4',
        500: '#FF0000'
      },
      orenge: {
        500: '#FF9900'
      }
    },
    screens: {
      '2xl': { max: '1536px' },
      xl: { max: '1280px' },
      lg: { max: '1024px' },
      md: { max: '768px' },
      sm: { max: '640px' }
    },
    keyframes: {
      overlayShow: {
        from: { opacity: '0' },
        to: { opacity: '1' }
      },
      contentShow: {
        from: { opacity: '0', transform: 'translate(-50%, -48%) scale(0.96)' },
        to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' }
      },
      spin: {
        from: { transform: 'rotate(0deg)', color: 'red' },
        to: { transform: 'rotate(360deg)', color: 'green' }
      }
    },
    animation: {
      overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      spin: 'spin 1s linear infinite;'
    }
  },
  plugins: []
};
export default config;
