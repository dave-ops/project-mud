import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { FlatCompat } from '@eslint/eslintrc';
import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
  },
});

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    ...compat.extends('eslint:recommended')[0],
    ...compat.extends('plugin:@typescript-eslint/recommended')[0],
    rules: {
      // Add your custom rules here
      'indent': ['error', 4],
    },
  },
];