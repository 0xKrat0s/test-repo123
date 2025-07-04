/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0071C5',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fade-in 1s cubic-bezier(0.4,0,0.2,1) both',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          'from': { opacity: 0, transform: 'translateY(32px)' },
          'to': { opacity: 1, transform: 'translateY(0)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      },
      backgroundImage: {
        "hero-pattern": "url('/bg-abstract.png')",
      },
      letterSpacing: {
        tightest: "-.075em",
        tighter: "-.05em",
        normal: "0",
        wider: ".05em",
        widest: ".5em",
      },
    },
  },
  variants: {
    extend: {
      fontFamily: ["hover", "focus"],
    },
  },
  plugins: [],
  corePlugins: {
    fontFamily: true,
  },
};
      fontFamily: ["hover", "focus"],
    },
  },
  plugins: [],
  corePlugins: {
    fontFamily: true,
  },
};
