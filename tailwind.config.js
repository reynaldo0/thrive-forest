import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#90C444",
                },
                secondary: {
                    200: "#3F3313",
                },
            },
            fontFamily: {
                nunito: ['Nunito Sans', 'sans-serif'],
            },
        },
    },

    plugins: [forms],
};
