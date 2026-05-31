/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#4f9da6',
                'primary-dark': '#2c6e76',
                sidebar: '#1a1f2e',
                'sidebar-dark': '#0f121c',
                text: '#1a1f2e',
                'text-secondary': '#6c7a8e',
            },
        },
    },
    plugins: [],
}