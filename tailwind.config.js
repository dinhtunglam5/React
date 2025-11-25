/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // ⭐️ Đã đổi màu chủ đạo sang Indigo
        primaryAccent: '#4f46e5',
        // secondaryBrown: "#8A8475", // Có thể xóa hoặc comment dòng này
      },
    },
  },
  plugins: ["@tailwindcss/forms"],
};