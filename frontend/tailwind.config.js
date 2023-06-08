/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'barlow': ['Barlow', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif']
      },
      fontSize: {
        '32': '32px',
        '24': '24px',
      },
      lineHeight: {
        '48': '48px',
        '36': '36px',
      },
      colors: {
        borderWalletBtn: '#0AD312',
        backgroundIconContainer: '#1E1E1E',
        iconContainerDollar: '#8BC34A',
      },
    },
  },
  plugins: [],
}

