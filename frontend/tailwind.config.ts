import type { Config } from 'tailwindcss';

const config = {
  important: true,
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      screens: {
        '2xl': { max: '1536px' },
        xl: { max: '1280px' },
        lg: { max: '1100px' },
        mlg: { max: '950px' },
        md: { max: '768px' },
        sm: { max: '640px' }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
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
  plugins: [require('tailwindcss-animate')]
} satisfies Config;

export default config;
