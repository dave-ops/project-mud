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
```

### Gap Analysis: node-mud vs. Merc_21
#### Structural Comparison
##### Modularity: 
node-mud employs a modular approach with classes and interfaces, contrasting with Merc_21's more monolithic, function-based C code. This provides better organization but might require adjustments in data and logic handling.
Object-Oriented vs. Procedural: 
Moving to OOP in TypeScript, methods are now class members rather than standalone functions, potentially altering flow control or data management.

#### Functional Gaps
##### Character Handling
##### Combat Mechanics:
Merc_21: Utilizes functions like one_hit, damage, hit, with detailed logic for hit chances, damage calculation, and special combat states (e.g., stunning, bleeding).
node-mud: The combat system appears simplified. Ensure all nuances like backstabbing, multiple opponents, or special conditions are included.
Affects on Combat: 
In Merc_21, affects can significantly impact combat (e.g., blindness, invisibility). TypeScript should replicate these mechanics.

##### Magic System
##### Spell Casting: 
Merc_21: Spells have intricate effects, costs, and conditions, including wait states, failure rates, and improvement mechanisms.
node-mud: If implemented, ensure spells reflect similar mechanics, particularly in terms of timing and resource management.
Affect Management: 
The original uses bit manipulation for affects; translate or adapt this for TypeScript.

##### Item Management
##### Equipping and Unequipping: 
Merc_21 includes detailed logic for item wearability with flags and alignment checks. Ensure this is present in TypeScript.
Item Effects: 
Items in Merc_21 can affect character stats or abilities; this needs to be managed in TypeScript.

##### Room and World Management
##### Room Transitions: 
Combat in Merc_21 can be influenced by room properties or character movement. Check if these interactions are handled in node-mud.
NPC Behavior: 
There might be gaps in NPC combat engagement or reaction to player actions, managed through flags and states in C.

##### Communication and Feedback
Merc_21 uses functions like act and send_to_char for combat messages. Ensure node-mud provides equivalent real-time combat feedback.

##### Game Mechanics
##### Time-Based Effects: 
Combat in Merc_21 often involves timing mechanics (e.g., cooldowns, regeneration). Adapt these for Node.js's time handling.
Randomness: 
Ensure combat randomness translates well from C's RNG to JavaScript's Math.random().

##### Implementation Details
##### Memory Management: 
JavaScript's automatic garbage collection vs. C's manual management means no need for explicit memory freeing, but careful reference management is necessary.
##### Error Handling: 
Ensure robust error checks and logging in TypeScript similar to Merc_21.
##### Performance: 
Some operations might perform differently in JavaScript; consider this for large-scale combat scenarios.

##### Recommendations
##### Review Each Combat Function: 
Map combat functions from Merc_21 to TypeScript, ensuring all scenarios are covered.
##### Testing: 
Implement comprehensive unit tests for combat to catch discrepancies.
##### Documentation: 
Document any deviations or simplifications from Merc_21, explaining the rationale.
##### Performance Tuning: 
Monitor and optimize performance for complex combat interactions.