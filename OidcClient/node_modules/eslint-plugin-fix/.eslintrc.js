module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:jsdoc/recommended',
    "plugin:@typescript-eslint/recommended"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'jsdoc'
  ],
  rules: {
    "jsdoc/require-param-type": "off",
    "jsdoc/require-returns-type": "off"
  },
  settings: {
    jsdoc: {
      node: "typescript"
    }
  }
};
