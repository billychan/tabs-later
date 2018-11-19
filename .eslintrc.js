module.exports = {
  extends: ["airbnb", "prettier", "prettier/flowtype", "prettier/react"],
  plugins: [ "react-hooks", "react-hot-loader/babel" ],
  parser: "babel-eslint",
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  }
};
