import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#09060E',
        foreground: '#F3EAFB',
        magenta: '#DB2BCF',
        autumn: '#FF8B3D'
      },
      backgroundImage: {
        'blur-gradient': 'radial-gradient(circle at 10% 20%, rgba(219,43,207,.35), transparent 40%), radial-gradient(circle at 90% 10%, rgba(255,139,61,.22), transparent 35%), radial-gradient(circle at 50% 100%, rgba(106,36,157,.28), transparent 45%)'
      },
      boxShadow: {
        glow: '0 0 50px rgba(219,43,207,.2)'
      }
    }
  },
  plugins: []
};

export default config;
