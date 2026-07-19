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
        fetch: "readonly",
        IntersectionObserver: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        requestAnimationFrame: "readonly",
        Swiper: "readonly"
      }
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["error", { args: "none", ignoreRestSiblings: true }],
      "no-redeclare": "error",
      "no-unreachable": "error",
      eqeqeq: ["error", "always"]
    }
  },
  // Игнорируем минифицированные библиотеки
  {
    files: ["src/assets/js/swiper-bundle.min.js"],
    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
      "eqeqeq": "off"
    }
  }
]; 
