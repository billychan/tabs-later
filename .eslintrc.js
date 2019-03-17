module.exports = {
  extends: ["airbnb", "plugin:jest/recommended"],
  plugins: ["react-hooks", "jest"],
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
    // Save time on dealing with custom attributes which might start with _
    "no-underscore-dangle": [0],

    // Disable these two for now temporially
    "jsx-a11y/click-events-have-key-events": [0],
    "jsx-a11y/no-noninteractive-element-interactions": [0]
  },
  env: {
    browser: true,
    "jest/globals": true
  }
};
