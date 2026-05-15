import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import jsxWrapStringProps from './.eslint-rules/jsx-wrap-string-props.js';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      prettier: prettierPlugin,
      custom: {
        rules: {
          'jsx-wrap-string-props': jsxWrapStringProps
        }
      }
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettierConfig
    ],
    rules: {
      'custom/jsx-wrap-string-props': 'error',
      quotes: ['error', 'single', { avoidEscape: true }],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'prettier/prettier': 'error',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/purity': 'off'
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    }
  }
]);
