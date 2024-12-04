# project-mud
convert original diku Merc_21.tar.gz to node.js

# eslint (flat config system)
~~~
import globals from "globals";
import pluginJs from "@eslint/js";
import { configs } from "@typescript-eslint/eslint-plugin";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  { files: ["**/*.js", "**/*.mjs", "**/*.cjs"], languageOptions: { sourceType: "commonjs" } },
  { 
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"], 
    languageOptions: { globals: globals.browser },
    ...pluginJs.configs.recommended
  },
  { 
    files: ["**/*.ts"], 
    languageOptions: { 
      globals: globals.browser,
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname
      }
    },
    ...configs.recommended,
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "no-empty-function": "off",
      "@typescript-eslint/no-empty-function": "error"
    }
  }
];
~~~

## eslint todo
- Imports Updated:
    - Removed unused imports like parser from @typescript-eslint/parser.
    - Imported configs directly from @typescript-eslint/eslint-plugin instead of using the tseslint alias.
- Configuration Structure:
    - Added a new configuration object specifically for TypeScript files (**/*.ts).
    - Specified the parser as @typescript-eslint/parser for TypeScript files.
    - Set up parserOptions for the TypeScript parser, including the project and tsconfig root directory.
- Globals and Language Options:
    - Moved the globals configuration into the appropriate languageOptions block for both JavaScript and TypeScript files.
- Rules:
    - Added some TypeScript-specific rules like @typescript-eslint/no-explicit-any and @typescript-eslint/consistent-type-imports.
- File Patterns:
    - Clearly defined which files each set of rules should apply to by specifying files patterns.