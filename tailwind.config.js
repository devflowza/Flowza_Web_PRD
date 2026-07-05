/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '.admin-dark'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
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
      backgroundImage: {
        'cyan-gradient': 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
        'violet-gradient': 'linear-gradient(135deg, #0ea5e9 0%, #0c4a8a 100%)',
        'cobalt-gradient': 'linear-gradient(135deg, #0c4a8a 0%, #082f5f 100%)',
        'hero-aurora': 'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(14,165,233,0.55) 0%, rgba(6,182,212,0.28) 40%, transparent 70%)',
        'hero-aurora-bottom': 'radial-gradient(ellipse 70% 50% at 50% 120%, rgba(12,74,138,0.35) 0%, transparent 60%)',
        'glow-cyan': 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(14,165,233,0.18) 0%, transparent 70%)',
        'glow-cobalt': 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(12,74,138,0.22) 0%, transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'slide-up-fast': 'slideUp 0.4s ease-out forwards',
        'shimmer': 'shimmer 3s linear infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        'orbit': 'orbit 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
        'portal-expand': 'portalExpand 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'portal-collapse': 'portalCollapse 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'portal-text-in': 'portalTextIn 0.4s ease-out 0.3s forwards',
        'portal-flash': 'portalFlash 0.3s ease-out forwards',
        'counter-up': 'counterUp 0.6s ease-out forwards',
        'ticker': 'ticker 25s linear infinite',
        'card-shimmer': 'cardShimmer 2.5s ease-in-out infinite',
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
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(60px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(60px) rotate(-360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        portalExpand: {
          '0%': { transform: 'scale(0)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        portalCollapse: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0)', opacity: '0' },
        },
        portalTextIn: {
          '0%': { opacity: '0', transform: 'translateY(16px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        portalFlash: {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        counterUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        cardShimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.44, 0, 0.56, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      boxShadow: {
        'glow-cyan': '0 0 32px rgba(14,165,233,0.45)',
        'glow-cyan-lg': '0 0 60px rgba(14,165,233,0.4)',
        'glow-cobalt': '0 0 32px rgba(12,74,138,0.5)',
        'glow-cobalt-lg': '0 0 60px rgba(12,74,138,0.4)',
      },
    },
  },
  plugins: [],
};
