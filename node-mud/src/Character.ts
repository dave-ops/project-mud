import Room from './Room';
import Item from './Item'; // Assuming you have an Object model
import IAffect from './interfaces/IAffect'; // Assuming you have an Affect model

// Define constants for positions, sex, etc. for clarity and type safety
const enum Position {
  DEAD = 0,
  MORTAL,
  INCAP,
  STUNNED,
  SLEEPING,
  RESTING,
  FIGHTING,
  STANDING,
}

const enum Sex {
  NEUTRAL = 0,
  MALE,
  FEMALE,
}

const enum Race {
  // Add races from your game here
  HUMAN = 0,
  ELF,
  // etc.
}

const enum Class {
  // Add classes from your game here
  MAGE = 0,
  WARRIOR,
  // etc.
}

interface PlayerCondition {
  [COND_FULL]: number;
  [COND_THIRST]: number;
  [COND_DRUNK]: number;
}

const COND_FULL = 0;
const COND_THIRST = 1;
const COND_DRUNK = 2;

class Character {
    // Basic attributes
    name: string;
    short_descr: string;
    long_descr: string;
    description: string;

    // Stats
    level: number;
    trust: number;
    sex: Sex;
    race: Race;
    class: Class;

    // Health and resources
    hit: number;
    max_hit: number;
    mana: number;
    max_mana: number;
    move: number;
    max_move: number;

    // Position and combat
    position: Position;
    fighting?: Character; // Optional if in combat

    // Wealth and experience
    gold: number;
    exp: number;

    // Flags
    act: number; // Bitfield for various player flags
    affected_by: number; // Bitfield for affects

    // Game mechanics
    timer: number; // Timer for inactivity
    wimpy: number; // When to flee
    deaf: boolean; // If character is deaf

    // Player-specific data
    pcdata: {
    pwd: string; // Password hash for player characters
    bamfin: string; // String for entering a room
    bamfout: string; // String for leaving a room
    title: string; // Character's title
    perm_str: number;
    perm_int: number;
    perm_wis: number;
    perm_dex: number;
    perm_con: number;
    mod_str: number;
    mod_int: number;
    mod_wis: number;
    mod_dex: number;
    mod_con: number;
    condition: PlayerCondition; // Player's condition
    learned: { [key: string]: number }; // Skills learned by the player
  };

    // Game state
    room?: Room; // Current room
    was_in_room?: Room; // Previous room before moving to limbo or similar
    carrying?: Item[]; // Items carried by the character
    affected?: IAffect[]; // Active affects on the character
    save_time: number; // Last save time

    // Constructor
    constructor(name: string, level: number = 1, sex: Sex = Sex.NEUTRAL, race: Race = Race.HUMAN, classType: Class = Class.MAGE) {
        this.name = name;
        this.level = level;
        this.sex = sex;
        this.race = race;
        this.class = classType;
        this.short_descr = `${name} the ${this.getClassName()}`;
        this.long_descr = `${name} stands here.`;
        this.description = `You see nothing special about ${name}.`;

        this.hit = 100;
        this.max_hit = 100;
        this.mana = 100;
        this.max_mana = 100;
        this.move = 100;
        this.max_move = 100;

        this.position = Position.STANDING;
        this.gold = 0;
        this.exp = 0;
        this.act = 0; // Default to no flags set
        this.affected_by = 0;
        this.timer = 0;
        this.wimpy = 0;
        this.deaf = false;

        this.pcdata = {
            pwd: "", // Should be hashed in real implementation
            bamfin: "",
            bamfout: "",
            title: "",
            perm_str: 13,
            perm_int: 13,
            perm_wis: 13,
            perm_dex: 13,
            perm_con: 13,
            mod_str: 0,
            mod_int: 0,
            mod_wis: 0,
            mod_dex: 0,
            mod_con: 0,
            condition: {
                [COND_FULL]: 48,
                [COND_THIRST]: 48,
                [COND_DRUNK]: 0,
            },
            learned: {},
        };

        this.save_time = Date.now();
    }

    // Helper method to get class name
    private getClassName(): string {
        switch (this.class) {
        case Class.MAGE: return "Mage";
        case Class.WARRIOR: return "Warrior";
            // Add more cases as needed
        default: return "Unknown";
        }
    }

    // TODO: IMPLEMENT
    // Add methods for game mechanics like moving, combat, etc.
    // eslint-disable-next-line
    moveToRoom(room: Room) {
        // Implementation for moving character to another room
        return;
    }

    // TODO: IMPLEMENT
    // eslint-disable-next-line
    attack(target: Character) {
        // Implementation for attacking another character
        return;
    }

    // ... other methods like heal, castSpell, saveCharacter, etc.
}

export default { Character };