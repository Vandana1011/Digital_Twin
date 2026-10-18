export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060a14',
          900: '#0a1222',
          850: '#0f1a32',
          800: '#152445',
          750: '#1b2d56',
          700: '#223867',
          600: '#2f4b87',
        },
        electric: {
          blue: '#00d2ff',
          sky: '#38bdf8',
          indigo: '#6366f1',
          purple: '#a855f7',
          violet: '#8b5cf6',
          magenta: '#d946ef',
          pink: '#f43f5e',
          rose: '#fb7185',
        },
        cyan: {
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        teal: {
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
        },
        pulse: {
          red: '#ef4444',
          rose: '#f43f5e',
          amber: '#f59e0b',
          emerald: '#10b981',
          violet: '#8b5cf6',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -4px rgba(6, 182, 212, 0.35)',
        'glow-teal': '0 0 25px -4px rgba(20, 184, 166, 0.35)',
        'glow-rose': '0 0 25px -4px rgba(244, 63, 94, 0.35)',
        'glow-violet': '0 0 25px -4px rgba(139, 92, 246, 0.35)',
        'glow-blue': '0 0 25px -4px rgba(0, 210, 255, 0.4)',
        'glow-purple': '0 0 25px -4px rgba(168, 85, 247, 0.4)',
        'card-glow': '0 10px 30px -10px rgba(3, 7, 18, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'card-hover': '0 20px 40px -15px rgba(6, 182, 212, 0.2), 0 0 0 1px rgba(34, 211, 238, 0.3)',
        'card-purple-hover': '0 20px 40px -15px rgba(168, 85, 247, 0.25), 0 0 0 1px rgba(168, 85, 247, 0.35)',
      },
      backgroundImage: {
        'radial-gradient-navy': 'radial-gradient(circle at 50% 0%, rgba(14, 165, 233, 0.15) 0%, rgba(168, 85, 247, 0.08) 35%, rgba(6, 10, 20, 0) 75%)',
        'radial-hero-heart': 'radial-gradient(circle at 50% 50%, rgba(0, 210, 255, 0.15) 0%, rgba(168, 85, 247, 0.12) 30%, rgba(244, 63, 94, 0.05) 55%, transparent 70%)',
      },
    },
  },
  plugins: [],
};
