/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '.admin-dark'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Hanken Grotesk"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['"Hanken Grotesk"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      colors: {
        /* ——— Ink & Current design system ——— */
        ink: {
          DEFAULT: '#0B1221',
          950: '#070D18',
          900: '#0B1221',
          800: '#141F38',
          700: '#1E2C4E',
          600: '#2C3C63',
          500: '#41527D',
          400: '#66779E',
          300: '#93A1BE',
          200: '#C3CCDE',
          100: '#E4E8F0',
        },
        mist: {
          DEFAULT: '#F5F7FA',
          deep: '#EDF0F5',
        },
        accent: {
          DEFAULT: '#2E5BFF',
          deep: '#1F46E0',
          soft: '#5C81FF',
          wash: '#EEF2FF',
        },
        /* Legacy tokens kept so untouched views continue to compile */
        navy: {
          900: '#0B1221',
          950: '#070D18',
        },
        brand: {
          cyan: '#0ea5e9',
          'cyan-dim': '#0284c7',
          cobalt: '#0c4a8a',
          'cobalt-dark': '#082f5f',
          bg: '#0a1628',
          surface: '#f0f7ff',
          'surface-2': '#e0f2fe',
          border: 'rgba(14,165,233,0.15)',
          muted: '#4a7fa8',
          green: '#10b981',
          emerald: '#10b981',
          rose: '#f43f5e',
          sky: '#38bdf8',
          amber: '#f59e0b',
          teal: '#06b6d4',
        },
      },
      letterSpacing: {
        tightest: '-0.045em',
        snug: '-0.025em',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(11,18,33,0.04), 0 8px 24px -8px rgba(11,18,33,0.10)',
        lift: '0 2px 4px rgba(11,18,33,0.05), 0 18px 44px -14px rgba(11,18,33,0.18)',
        frame: '0 1px 2px rgba(11,18,33,0.06), 0 32px 80px -24px rgba(11,18,33,0.28)',
        pill: '0 1px 2px rgba(11,18,33,0.18), 0 8px 20px -8px rgba(11,18,33,0.45)',
      },
      transitionTimingFunction: {
        swift: 'cubic-bezier(0.32, 0.72, 0, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.32, 0.72, 0, 1) forwards',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.32, 0.72, 0, 1) forwards',
        'slide-up-fast': 'slideUp 0.4s cubic-bezier(0.32, 0.72, 0, 1) forwards',
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        marquee: 'marquee 42s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
