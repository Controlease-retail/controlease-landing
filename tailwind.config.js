/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
        'primary-dark': 'var(--color-primary-dark)',
        secondary: 'var(--color-secondary)',
        'secondary-light': 'var(--color-secondary-light)',
        'secondary-dark': 'var(--color-secondary-dark)',
        accent: 'var(--color-accent)',
        'accent-light': 'var(--color-accent-light)',
        'accent-dark': 'var(--color-accent-dark)',
        'accent-alt': 'var(--color-accent-alt)',
        bg: 'var(--color-bg)',
        'bg-alt': 'var(--color-bg-alt)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        divider: 'var(--color-divider)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        'inverted-text': 'var(--color-inverted-text)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
        info: 'var(--color-info)',
        'brand-navy': {
          950: '#0B1120',
          900: '#111827',
          800: '#1F2937',
        },
        'brand-slate': {
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
        },
        'brand-cyan': {
          400: '#22D3EE',
          500: '#06B6D4',
        },
        'brand-indigo': {
          500: '#6366F1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        neon: '0 0 10px rgba(34, 211, 238, 0.5)',
      },
      backgroundImage: {
        'gradient-primary': 'var(--color-gradient-primary)',
        'gradient-brand': 'var(--color-gradient-brand)',
      },
    },
  },
  plugins: [],
}

