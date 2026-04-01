/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cyber: {
                    black: '#0b0f14',
                    gray: '#111827',
                    card: 'rgba(22, 27, 34, 0.7)',
                    card_hover: 'rgba(22, 27, 34, 0.9)',
                    primary: '#ff0055',    // Neon Red/Pink
                    primary_dim: '#cc0044',
                    secondary: '#00f3ff',  // Cyan
                    purple: '#bc13fe',     // Neon Purple
                    text: '#f0f6fc',
                    muted: '#8b949e',
                    border: '#30363d'
                }
            },
            fontFamily: {
                mono: ['"Fira Code"', 'monospace'],
                sans: ['"Inter"', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(255, 0, 85, 0.5)' },
                    '100%': { boxShadow: '0 0 20px rgba(255, 0, 85, 0.8), 0 0 10px rgba(255, 0, 85, 0.5)' },
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'cyber-gradient': 'linear-gradient(to bottom right, #0b0f14, #111827)',
            }
        },
    },
    plugins: [],
}
