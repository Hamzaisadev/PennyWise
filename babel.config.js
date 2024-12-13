module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    // other plugins can be added here
  ],
  jsc: {
    transform: {
      react: {
        throwIfNamespace: false,
      },
    },
  },
};
