/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      maxHeight: {
        '70': '70%', // 新增 max-h-70 類別，對應於 70% 高度
      },
    },
  },
  plugins: [],
}

