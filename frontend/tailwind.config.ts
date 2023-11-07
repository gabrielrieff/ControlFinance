import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors: {
      black: {
        100: '#000000'
      },
      white: {
        100: '#FFFFFF'
      },
      grey: {
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
        200: '#FFA4A4'
      }
    },
    screens: {
      '2xl': { max: '1536px' },
      xl: { max: '1280px' },
      lg: { max: '1024px' },
      md: { max: '768px' },
      sm: { max: '640px' }
    }
  },
  plugins: []
};
export default config;
