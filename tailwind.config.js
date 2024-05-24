/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      maxHeight: {
        '73': '73%', // 新增 max-h-73 類別，對應於 73% 高度
      },
    },
  },
  plugins: [],
}

