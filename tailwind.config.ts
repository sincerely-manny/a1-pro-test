import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
    content: ['./src/**/*.tsx'],
    theme: {
        colors: {
            black: '#2B2C36',
            white: '#FFFFFF',
            grey: '#BAC1CC',
            primary: {
                1: '#34C4F6',
                2: '#47C2E9',
            },
        },
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)', ...fontFamily.sans],
            },
            keyframes: {
                fadeIn: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(1rem)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                fadeOut: {
                    '0%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                    '100%': {
                        opacity: '0',
                        transform: 'translateY(1rem)',
                    },
                },
            },
            animation: {
                fadeIn: 'fadeIn 150ms ease-in-out forwards 1',
                fadeOut: 'fadeOut 150ms ease-in-out forwards 1',
            },
        },
    },
    plugins: [],
} satisfies Config;
