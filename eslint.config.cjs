module.exports = [
  {
    files: ["scripts/blog-generator/*.js", "tests/**/*.js", "playwright.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        __dirname: "readonly", process: "readonly", console: "readonly",
        URL: "readonly", URLSearchParams: "readonly",
        window: "readonly", document: "readonly"
      }
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["error", { args: "none", ignoreRestSiblings: true }],
      "no-unreachable": "error",
      eqeqeq: ["error", "always"]
    }
  },
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
        sessionStorage: "readonly",
        crypto: "readonly",
        URLSearchParams: "readonly",
        fetch: "readonly",
        IntersectionObserver: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        requestAnimationFrame: "readonly"
        // Swiper убрали отсюда!
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
      "eqeqeq": "off",
      "no-redeclare": "off"  // Добавили отключение этой ошибки
    }
  }
];
