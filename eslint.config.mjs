import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.node
    },
    plugins: {
      prettier
    },
    rules: {
      ...js.configs.recommended.rules,
      ...prettier.configs.recommended.rules
    }
  }
]);