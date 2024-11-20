import {tv} from "tailwind-variants";

export const title = tv({
    base: "tracking-tight inline font-semibold",
    variants: {
        color: {
            white: "text-white",
            gradient:
                "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400",

        },
        size: {
            sm: "text-1xl lg:text-2xl",
            md: "text-[2.3rem] lg:text-5xl leading-9",
            lg: "text-4xl lg:text-6xl",
        },
        fullWidth: {
            true: "w-full block",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

export const subtitle = tv({
    base: "w-full md:w-1/2 my-2 text-lg lg:text-xl block max-w-full",
    variants: {
        color: {
            muted: "text-purple-300", // Muted Lavender
            vibrant: "text-gray-400", // Vibrant Pink
            neutral: "text-gray-300", // Light Gray
        },
        fullWidth: {
            true: "!w-full",
        },
    },
    defaultVariants: {
        fullWidth: true,
    },
});