import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'fluid-h1': 'var(--font-size-h1)',
        'fluid-h2': 'var(--font-size-h2)',
        'fluid-h3': 'var(--font-size-h3)',
        'fluid-h4': 'var(--font-size-h4)',
        'fluid-body': 'var(--font-size-body)',
        'fluid-small': 'var(--font-size-small)',
        'fluid-skill-title': 'var(--font-size-skill-title)',
      },
      spacing: {
        'fluid-xs': 'var(--space-xs)',
        'fluid-sm': 'var(--space-sm)',
        'fluid-md': 'var(--space-md)',
        'fluid-lg': 'var(--space-lg)',
        'fluid-xl': 'var(--space-xl)',
        'fluid-2xl': 'var(--space-2xl)',
      },
      colors: {
        'bg': 'var(--color-bg)',
        'text': 'var(--color-text)',
        'border': 'var(--color-border)',
        'button-bg': 'var(--color-button-bg)',
        'button-text': 'var(--color-button-text)',
        'card-bg': 'var(--color-card-bg)',
        'muted': 'var(--color-muted)',
        'hover': 'var(--color-hover)',
      },
      fontFamily: {
        'header': 'var(--font-header)',
        'body': 'var(--font-body)',
      }
    },
  },
  plugins: [],
} satisfies Config;