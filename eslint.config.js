import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    // Override for tailwind.config.js file
    files: ['tailwind.config.js'],
    languageOptions: {
      globals: globals.node,
    },
    env: {
      node: true,
    },
    parserOptions: {
      sourceType: 'script', // tailwind.config.js uses CommonJS 'module.exports'
      ecmaVersion: 2020,
    },
    rules: {
      // You can add or relax rules specifically for this file here if needed
    },
  },
])
