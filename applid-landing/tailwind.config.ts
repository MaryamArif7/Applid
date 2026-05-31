import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
         'hero-base':   '#020f0f',
         'hero-mid':    '#041a1a',
         'hero-teal':   '#0d9488',
         'hero-bright': '#14b8a6',
        bg: '#071a15',
        bgDark: '#040f0c',
        bgLight: '#0a2118',
        accent: '#00e5a0',
        accentDim: '#00c484',
        surface: '#0d2b20',
        surfaceLight: '#143528',
        textPrimary: '#ffffff',
        textSecondary: '#b8cfc8',
        textMuted: '#6b9080',
        yellow: '#f5c842',
        sand: '#f5f0e8',
        sandDark: '#e8e2d8',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'slide-in': 'slideIn 0.5s ease forwards',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.85)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
