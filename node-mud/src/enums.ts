// src/interfaces/AffectLocation.ts (or wherever you prefer to keep it)

export enum AffectLocation {
    APPLY_STR = 0, // Assuming these are the correct numeric values you want to use
    APPLY_INT = 1,
    APPLY_WIS = 2,
    APPLY_DEX = 3,
    APPLY_CON = 4,
    // Add more as needed
}
export enum Class {
    // Your class definitions here
    MAGE = 'Mage',
    WARRIOR = 'Warrior',
    CLERIC = 'Cleric',
    THIEF = 'Thief',
}

// Define constants for item wear flags (bitwise)
export const enum WearFlag {
    TAKE = 1 << 0,
    FINGER = 1 << 1,
    NECK = 1 << 2,
    BODY = 1 << 3,
    HEAD = 1 << 4,
    LEGS = 1 << 5,
    FEET = 1 << 6,
    HANDS = 1 << 7,
    ARMS = 1 << 8,
    SHIELD = 1 << 9,
    ABOUT = 1 << 10,
    WAIST = 1 << 11,
    WRIST = 1 << 12,
    WIELD = 1 << 13,
    HOLD = 1 << 14,
    // Add more wear flags as needed
  }
  
// Define constants for positions, sex, etc. for clarity and type safety
export const enum Position {
    DEAD = 0,
    MORTAL,
    INCAP,
    STUNNED,
    SLEEPING,
    RESTING,
    FIGHTING,
    STANDING,
  }
  
export   const enum Sex {
    NEUTRAL = 0,
    MALE,
    FEMALE,
  }
  
export const enum Race {
    // Add races from your game here
    HUMAN = 0,
    ELF,
    // etc.
  }