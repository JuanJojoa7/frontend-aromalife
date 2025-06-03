/** @type {import('tailwindcss').Config} */ 
module.exports = 
{   
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}',   ],
    theme: {
        extend: {
          colors: {
            'brand-beige': '#F5F5F3',
            'brand-dark': '#3A3A3A',
            'brand-green': '#86A37E',
            'footer-bg': '#2D2D2D',
            'footer-text': '#E0E0E0',
          },
        },
      },
    plugins: [],
};