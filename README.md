# Project: project-mud

## Overview
Convert original diku Merc_21.tar.gz to Node.js / TypeScript. 
Add MongoDB instead of file based system

## Project Structure
```
project-mud/
├── src/
│   ├── models/
│   │   ├── Affect.ts
│   │   ├── Character.ts
│   │   ├── Item.ts
│   │   ├── Room.ts
│   │   └── Spell.ts
│   ├── interfaces/
│   │   ├── IAffect.ts
│   │   ├── ICharacter.ts
│   │   ├── IItem.ts
│   │   ├── IRoom.ts
│   │   └── ISpell.ts
│   └── main.ts  # or whatever is your entry point
├── package.json
└── tsconfig.json
```

### Explanation of Structure:
- **src/**: Contains all the source code for your project.
  - **models/**: Houses model classes representing game entities like `Affect`, `Character`, etc.
  - **interfaces/**: Includes TypeScript interface definitions for type checking.
- **main.ts**: The entry point of the application. Adjust if different.
- **package.json**: Manages Node.js package dependencies.
- **tsconfig.json**: Configures TypeScript compiler options.

This structure promotes separation of concerns, enhancing code navigation and maintenance.

## ESLint Configuration (Flat Config System)

```javascript
import globals from "globals";
import pluginJs from "@eslint/js";
import { configs } from "@typescript-eslint/eslint-plugin";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  { 
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"], 
    languageOptions: { sourceType: "commonjs" } 
  },
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

