const { colors } = require(`tailwindcss/defaultTheme`);

module.exports = {
  purge: ["./components/**/*.js", "./pages/**/*.js"],
  theme: {
    extend: {
      colors:{
        orange: {
          100: "#EA8000",
          200: "#ff9100",
          300:'#d36e00',
        },
        myGreen:{
          100:'#005b41',
        }
      },
      container: {
        center: true,
        padding: {
          default: "1rem",
          md: "2rem",
        },
      },
    },
  },
};
