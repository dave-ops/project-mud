export const MAX_LEVEL: number = 50;

export const exp_per_level: number[] = [
    0,
    1000,  // Example values, adjust according to your game's leveling system
    2000,
    4000,
    8000,
    16000,
    // ... more levels
];

export enum AffectLocation {
  APPLY_STR = 0,
  APPLY_INT = 1,
  APPLY_WIS = 2,
  APPLY_DEX = 3,
  APPLY_CON = 4,
APPLY_HIT,
  APPLY_MANA,
  APPLY_MOVE,
  APPLY_AC, // Armor Class
  APPLY_HITROLL,
  APPLY_DAMROLL,
  APPLY_SAVING_SPELL,
  // Add more as needed
}


export enum Class {
    // Your class definitions here
    MAGE = 'MAGE',
    WARRIOR = 'WARRIOR',
    CLERIC = 'CLERIC',
    THIEF = 'THIEF',
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
    UNKNOWN = -1,
    DEAD = 0,
    MORTAL,
    INCAP,
    STUNNED,
    SLEEPING,
    RESTING,
    FIGHTING,
    STANDING,
  }
  
export const enum Sex {
  UNKNOWN = -1,
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

// Define constants for item types
export const enum ItemType {
  UNKNOWN = -1,
  LIGHT = 0,
  SCROLL,
  WAND,
  STAFF,
  WEAPON,
  TREASURE,
  ARMOR,
  POTION,
  FURNITURE,
  TRASH,
  CONTAINER,
  DRINK_CON,
  KEY,
  FOOD,
  MONEY,
  PEN,
  BOAT,
  CORPSE_NPC,
  CORPSE_PC,
  FOUNTAIN,
  PILL,
  // Add more types as needed
}

export enum WearLocation {
  WEAR_LIGHT = 0,
  WEAR_FINGER_L,
  WEAR_FINGER_R,
  WEAR_NECK_1,
  WEAR_NECK_2,
  WEAR_BODY,
  WEAR_HEAD,
  WEAR_LEGS,
  WEAR_FEET,
  WEAR_HANDS,
  WEAR_ARMS,
  WEAR_SHIELD,
  WEAR_ABOUT,
  WEAR_WAIST,
  WEAR_WRIST_L,
  WEAR_WRIST_R,
  WEAR_WIELD,
  WEAR_HOLD,
  WEAR_FLOAT,
  WEAR_MAX
}