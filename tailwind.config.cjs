module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      // 用于显示标题的字体样式
      display: ['Trebuchet MS', 'Helvetica', 'sans-serif'],
      // 用于显示小字和简单描述的字体样式
      body: ['Trebuchet MS', 'Helvetica', 'sans-serif'],
      // 用于显示博客文章的内容的字体样式
      article: ['Verdana', 'Geneva', 'sans-serif'],
    },
  },
  plugins: [require("daisyui"), require('@tailwindcss/typography')],
}