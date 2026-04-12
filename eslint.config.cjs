module.exports = [
  {
    files: ["src/assets/js/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        localStorage: "readonly",
        IntersectionObserver: "readonly",
        console: "readonly",
        setTimeout: "readonly"
      }
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["error", { args: "none", ignoreRestSiblings: true }],
      "no-redeclare": "error",
      "no-unreachable": "error",
      eqeqeq: ["error", "always"]
    }
  }
];
