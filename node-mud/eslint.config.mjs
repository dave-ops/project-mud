import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { FlatCompat } from '@eslint/eslintrc';
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ["src/*.{mjs,cjs,ts}"] },
    { files: ["src/*.js"], 
        languageOptions: { 
            sourceType: "commonjs" 
        },
        rules: {
            "no-undef": 1,
        }
    },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            // Add your custom rules here
            indent: ["error", 4],
        },
    },
];
