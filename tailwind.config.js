/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in-out': 'fadeInOut 3s ease-in-out',
        'bounce': 'bounce 1s ease-in-out',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInOut: {
          '0%': { opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        glow: {
          '0%, 100%': {
            textShadow: '0 0 10px rgba(255, 191, 0, 0.5)',
            boxShadow: '0 0 15px rgba(255, 191, 0, 0.3)',
          },
          '50%': {
            textShadow: '0 0 20px rgba(255, 191, 0, 0.8)',
            boxShadow: '0 0 25px rgba(255, 191, 0, 0.5)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'parchment': "url('https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg')",
        'fantasy-dark': "url('https://images.pexels.com/photos/1693095/pexels-photo-1693095.jpeg')",
      },
    },
  },
  plugins: [],
};