module.exports = {
  extends: ["airbnb", "prettier", "prettier/flowtype", "prettier/react"],
  plugins: ["react-hooks"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "import/prefer-default-export": [0],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    // save hassel on custom resolver rules which eslint can't read
    "import/no-unresolved": [0],
    // For quicker start at begnining
    "react/forbid-prop-types": [0],
  },
  env: {
    browser: true
  }
};
