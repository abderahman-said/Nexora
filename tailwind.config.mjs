/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#29725f',
        'brand-lightblue': '#82a0ff',
        'brand-darkblue': '#4b69f0',
        'brand-lightgreen': '#e6fab9',
        'brand-orange': '#f5693c',
        'brand-maroon': '#a0325a',
        'brand-pink': '#f0befa',
        'brand-bg': '#f0ebe6',
        'brand-white': '#ffffff',
        'brand-black': '#03081f',
        'brand-dark': '#03081f',
        'brand-black-soft': '#0f3460',
        'brand-black-deep': '#0d1b2a',
      },
      fontFamily: {
        inter: ['var(--next-font-inter)', 'sans-serif'],
        cairo: ['var(--next-font-cairo)', 'sans-serif'],
        dmsans: ['DM Sans', 'sans-serif'],
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(15px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'float-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'grain-shift': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(-5%, -5%)' },
        },
        'draw-oval-underline': {
          '0%': { strokeDashoffset: '1400' },
          '100%': { strokeDashoffset: '0' },
        },
        'marqueeUp': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' }
        },
        'marqueeDown': {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease forwards',
        'float-y': 'float-y 6s ease-in-out infinite',
        'grain-shift': 'grain-shift 1s steps(2) infinite',
        'draw-oval-underline': 'draw-oval-underline 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'marquee-up': 'marqueeUp 22s linear infinite',
        'marquee-down': 'marqueeDown 22s linear infinite',
      },
    },
  },
  plugins: [],
}
