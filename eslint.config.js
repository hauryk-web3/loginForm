// eslint.config.js
import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

export default [
  {
    files: ['src/ui-kit/**'],
    ignores: ['**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: {
      ...ts.configs.recommended.rules,
    },
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/src/ui-kit/src/**',
      '**/coverage/**',
      '**/public/**',
      '**/.output/**',
      '**/*.config.js',
      '**/*.d.ts',
    ],
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        project: './tsconfig.json',
      },
    },
    plugins: {
      vue,
    },
    rules: {
      ...vue.configs.base.rules,
      ...vue.configs.recommended.rules,
    },
  },
  prettier,
];
