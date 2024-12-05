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
Status of Conversion:
Character Management: 
Character.ts: We've translated core functionalities like inventory management, equipment, combat, and basic stats manipulation. However, many nuanced behaviors like complex status effects, detailed combat mechanics (e.g., hit locations, special combat moves), or extensive character progression systems might need further development.
Item Management:
Item.ts: Basic item structures and methods like equipping/unequipping are implemented. However, the variety of item effects, properties, and interactions in the original C code could be expanded upon.
Room and World Management:
Room.ts: Room structures are in place with basic navigation. However, more complex room interactions (like triggers, room affects, or special environments) are not fully covered.
Combat System:
fight.c conversion introduced basic combat mechanics, but the depth of the original, including various combat states, special attacks, and damage types, could be expanded.
Communication and Networking:
comm.c: A basic server structure for handling connections was established, but the full range of communication commands, like channel broadcasts, private messages, or more sophisticated echo handling, needs further work.
Database and Game Loading:
db.c: We've set up a framework for loading game data, but the specifics of how Merc MUD loads and uses this data for dynamic world creation, NPC behavior, or item initialization are not fully implemented.
Utility Functions:
handler.c: Some utility functions have been translated, but there's a lot more in terms of game logic helpers, like more detailed affect management, visibility checks, or movement restrictions that remain unconverted.
Magic System:
No specific conversion for magic.c was shown, which would include spell casting mechanics, mana costs, spell effects, and possibly spell learning systems.
Admin/Wizard Commands:
act_wiz.c: Only a few commands were conceptually translated, missing out on many administrative tools for managing players, items, or the game world.

Gaps and Next Steps:
Complex Game Mechanics: Many of the nuanced rules, exceptions, and special cases in MUD gameplay like:
More intricate combat systems (e.g., poison, disease, limb damage).
Magic system details including spell cooldowns, area effects, or spell resistance.
Advanced character progression (skills, spells, class-specific abilities).
Networking: The communication system needs robust error handling, connection management, and possibly more advanced features like session persistence or reconnection logic.
Persistence: There's no mention of how the game state would be saved or loaded between sessions, which is crucial for a MUD.
Performance and Scalability: JavaScript/TypeScript might require optimization strategies different from C, especially for managing many players or large game worlds.
Testing: Comprehensive testing, especially for complex interactions or edge cases in the original code, has not been addressed.

Recommendations for Moving Forward:
Refine Existing Conversions: Flesh out the details of the systems we've started converting, particularly combat, magic, and character progression.
Expand on Admin Tools: Implement more admin commands to manage the game world effectively.
Integrate Persistence: Decide on a database solution or file format for saving game state.
Networking Enhancements: Look into WebSocket or other real-time communication protocols for better performance and scalability.
Testing: Develop both unit and integration tests to ensure the game mechanics match the original intent.
Documentation: As you go, document how your TypeScript version differs or improves upon the C code for future maintainers or contributors.

This review gives you a roadmap for where to focus next in your conversion project. Remember, each MUD has its unique set of features, so tailor these suggestions to match the specific gameplay and mechanics of your MUD.