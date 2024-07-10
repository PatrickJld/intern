/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': {
                    DEFAULT: '#CAF0F8',
                    '100': '#ADE8F4',
                    '200': '#90E0EF',
                    '300': '#33CCFF',
                    '400': '#00B4D8',
                    '500': '#0096C7',
                    '600': '#0077B6',
                    '700': '#023E8A',
                    '800': '#032174',
                    '900': '#03045E',
                    '1000': '#030343'
                },
                'background': {
                    '50': '#FCFCFC',
                    '100': '#E3FCF9',
                    '200': '#CCF9F4',
                    '300': '#E0E0E0',
                    '400': '#F6F6F6'
                },
                'red': {
                    '100': '#ff4917',
                },
                'foreground-3': {
                    '100': '#46E1E7',
                    '300': '#1DD6DD',
                    '400': '#1AC0C6',
                    '500': '#ACDBE3'
                },
                'foreground-4': {
                    '10': '#A7EFEF',
                    '50': '#17EFDF',
                    '100': '#1F3370',
                    '200': '#112255',
                    '300': '#5A5A5A',
                    '800': '#373737'
                },
                'stroke': {
                    '100': '#8B8B8B',
                    '200': '#B4B4B4'
                },
                'safe': '#24952F',
                'secondary': '#F2401C'
            },
            inset: {
                '-4' : '-1rem',
            },
            transitionDuration: {
                '2000' : '2000ms'
            },
            height: {
                '1/10': '10%',
                '2/10': '20%',
                '3/10': '30%',
                '4/10': '40%',
                '5/10': '50%',
                '6/10': '60%',
                '7/10': '70%',
                '8/10': '80%',
                '9/10': '90%',
                '144' : '36rem'
            }
        },
    },
    plugins: [],
}
