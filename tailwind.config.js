/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--ion-color-primary)',
          shade: 'var(--ion-color-primary-shade)',
          tint: 'var(--ion-color-primary-tint)',
          50: 'rgba(var(--ion-color-primary-rgb), 0.05)',
          100: 'rgba(var(--ion-color-primary-rgb), 0.1)',
          200: 'rgba(var(--ion-color-primary-rgb), 0.2)',
          300: 'rgba(var(--ion-color-primary-rgb), 0.3)',
          400: 'rgba(var(--ion-color-primary-rgb), 0.4)',
          500: 'rgba(var(--ion-color-primary-rgb), 0.5)',
          600: 'rgba(var(--ion-color-primary-rgb), 0.6)',
          700: 'rgba(var(--ion-color-primary-rgb), 0.7)',
          800: 'rgba(var(--ion-color-primary-rgb), 0.8)',
          900: 'rgba(var(--ion-color-primary-rgb), 0.9)',
        },
        secondary: {
          DEFAULT: 'var(--ion-color-secondary)',
          shade: 'var(--ion-color-secondary-shade)',
          tint: 'var(--ion-color-secondary-tint)',
        },
        success: {
          DEFAULT: 'var(--ion-color-success)',
          shade: 'var(--ion-color-success-shade)',
          tint: 'var(--ion-color-success-tint)',
        },
        warning: {
          DEFAULT: 'var(--ion-color-warning)',
          shade: 'var(--ion-color-warning-shade)',
          tint: 'var(--ion-color-warning-tint)',
        },
        danger: {
          DEFAULT: 'var(--ion-color-danger)',
          shade: 'var(--ion-color-danger-shade)',
          tint: 'var(--ion-color-danger-tint)',
        },
      },
      borderRadius: {
        'sm': 'var(--border-radius-sm)',
        'md': 'var(--border-radius-md)',
        'lg': 'var(--border-radius-lg)',
        'xl': 'var(--border-radius-xl)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        'fast': 'var(--transition-fast)',
        'normal': 'var(--transition-normal)',
        'slow': 'var(--transition-slow)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}