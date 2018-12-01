module.exports = {
  extends: ["airbnb", "prettier", "prettier/flowtype", "prettier/react"],
  plugins: ["react-hooks"],
  parser: "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  }
};
