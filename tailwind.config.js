module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.md", "./src/**/*.njk"],
  theme: {
    extend: {
      colors: {
        blue: {
          100: "#F1F6F7",
          200: "#DCE8EC",
          300: "#C7D9E0",
          400: "#9DBDC9",
          500: "#73A1B2",
          600: "#6891A0",
          700: "#45616B",
          800: "#344850",
          900: "#233035",
        },
        teal: {
          100: "#F1F7F6",
          200: "#DCECE8",
          300: "#C7E0DB",
          400: "#9EC9BF",
          500: "#74B2A4",
          600: "#68A094",
          700: "#466B62",
          800: "#34504A",
          900: "#233531",
        },
        orange: {
          100: "#F7F3F1",
          200: "#ECE1DC",
          300: "#E0CEC7",
          400: "#C9AA9E",
          500: "#B28574",
          600: "#A07868",
          700: "#6B5046",
          800: "#503C34",
          900: "#352823",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
