/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF9',
          100: '#FAF4EB',
          200: '#F5E9D9', // Vanilla Cream Primary
          300: '#EAD7BF',
          400: '#DEC4A4',
          500: '#C7A680',
        },
        pistachio: {
          50: '#F5F8EF',
          100: '#EBF2DC',
          200: '#D7E4B5', // Primary Pistachio
          300: '#BFD392',
          400: '#A4BE6C',
          500: '#7E9C43',
          800: '#3F521E',
          900: '#2A3813',
        },
        strawberry: {
          50: '#FCF3F2',
          100: '#F9E6E4',
          200: '#E9A5A1', // Primary Strawberry
          300: '#DE817B',
          400: '#CE5E57',
          700: '#8E2F29',
          900: '#531915',
        },
        chocolate: {
          50: '#F5F2F1',
          100: '#E2DBD8',
          200: '#C1B2AD',
          300: '#9B847C',
          400: '#72564F',
          500: '#50352F', // Primary Chocolate Text
          600: '#422B26',
          700: '#35221E',
          800: '#271916',
          900: '#1A100E',
        },
        butter: {
          50: '#FEFDF8',
          100: '#FDF6DE',
          200: '#FBE9B6',
          300: '#F4D88B', // Primary Butter Yellow
          400: '#ECC662',
          500: '#DEB038',
        },
        warmWhite: '#FFFDF8',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        'widest-xl': '0.25em',
        'widest-2xl': '0.35em',
      },
      boxShadow: {
        'soft-lift': '0 20px 40px -15px rgba(80, 53, 47, 0.08)',
        'luxe': '0 30px 60px -20px rgba(80, 53, 47, 0.12), 0 10px 20px -10px rgba(80, 53, 47, 0.05)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.6)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
      }
    },
  },
  plugins: [],
}
