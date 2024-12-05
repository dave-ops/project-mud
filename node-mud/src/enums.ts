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
}

// Placeholder for enums like Position, Sex, Class, etc.
export enum Position {
  UNKNOWN = -1,
  DEAD = 0,
  MORTAL,
  INCAP,
  STUNNED,
  SLEEPING,
  RESTING,
  SITTING,
  FIGHTING,
  STANDING
}

export enum Sex {
  UNKNOWN = -1,
  NEUTRAL = 0,
  MALE,
  FEMALE
}

export enum Class {
  MAGE,
  CLERIC,
  THIEF,
  WARRIOR
  // Add more classes as needed
}

export enum Race {
  HUMAN,
  ELF,
  DWARF,
  // Add more races as needed
}

// For affect locations
export enum AffectLocation {
  APPLY_NONE = 0,
  APPLY_STR,
  APPLY_DEX,
  APPLY_INT,
  APPLY_WIS,
  APPLY_CON,
  APPLY_SEX,
  APPLY_CLASS,
  APPLY_LEVEL,
  APPLY_AGE,
  APPLY_HEIGHT,
  APPLY_WEIGHT,
  APPLY_MANA,
  APPLY_HIT,
  APPLY_MOVE,
  APPLY_GOLD,
  APPLY_EXP,
  APPLY_AC,
  APPLY_HITROLL,
  APPLY_DAMROLL,
  APPLY_SAVING_PARA,
  APPLY_SAVING_ROD,
  APPLY_SAVING_PETRI,
  APPLY_SAVING_BREATH,
  APPLY_SAVING_SPELL
}

// For affect bitvectors
export enum AffectBitvector {
  AFF_BLIND = 1 << 0,
  AFF_INVISIBLE = 1 << 1,
  AFF_DETECT_EVIL = 1 << 2,
  // Add more affects as needed
}
