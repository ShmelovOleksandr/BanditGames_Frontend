const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"

    ],
    theme: {
        extend: {
            colors: {
                danger: {
                    10: "#000000",
                    50: "#310413",
                    100: "#610726",
                    200: "#920b3a",
                    300: "#c20e4d",
                    400: "#f31260",
                    500: "#f51480",
                    600: "#f817a0",
                    700: "#faa0bf",
                    800: "#fdd0df",
                    900: "#fee7ef",
                },
            },
        }
    },
    darkMode: "class",
    plugins: [nextui()]
}