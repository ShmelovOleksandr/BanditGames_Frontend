// const {nextui} = require("@nextui-org/react");
import { nextui } from "@nextui-org/react";

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
                secondary: {
                    50: '#180828',
                    100: '#310150',
                    200: '#431878',
                    300: '#6020a0',
                    400: '#7828c8',
                    500: '#9533d3',
                    600: '#ae7ede',
                    700: '#c9a9e9',
                    800: '#e4d4f4',
                    900: '#f2eafa',
                },
            },
        }
    },
    darkMode: "class",
    plugins: [nextui()]
}