/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-charcoal': '#2D2A32',
        'warm-navy': '#1E3A5F',
        'amber-gold': '#D4A03E',
        'soft-gold': '#E8C87D',
        'warm-white': '#FAF7F2',
        'warm-gray': '#6B6570',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #2D2A32 0%, #1E3A5F 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4A03E 0%, #E8C87D 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-gold': 'glow-gold 3s ease-in-out infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-gold': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'glow-gold': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 160, 62, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 160, 62, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}