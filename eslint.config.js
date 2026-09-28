import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['dist/'] },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'max-len': ['error', { code: 80, ignoreUrls: true, ignoreStrings: true }],
    },
  },
  {
    files: ['scripts/**/*.js', '*.config.js'],
    languageOptions: { globals: globals.node },
  },
  {
    // Bookmarklets run in the browser page.
    files: ['bookmarklets/**/*.js'],
    languageOptions: { globals: globals.browser },
  },
];
