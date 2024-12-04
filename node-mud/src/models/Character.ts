import Room from './Room';
import Item from './Item'; // Assuming you have an Object model
import { IAffect } from '../interfaces/IAffect';
import { IItem } from '../interfaces/IItem'; 
import ICharacter from '../interfaces/ICharacter';
import { IPlayerCondition, COND_FULL, COND_THIRST, COND_DRUNK } from '../interfaces/IPlayerCondition';
import { Socket } from 'net';

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

/**
 * Represents a character in the game, implementing the ICharacter interface.
 * This class includes both player characters and NPCs.
 */
class Character implements ICharacter {
    id: number;
    name: string;
    description: string;

    act: number; // Bitfield for various player flags
    affected?: IAffect[]; // Active affects on the character
    affected_by: number; // Bitfield for affects
    armor: number;
    carrying?: Item[]; // Items carried by the character
    class: Class;
    damroll: number;
    deaf: boolean; // If character is deaf
    exp: number;
    fighting?: ICharacter; // Optional if in combat
    gold: number;
    hit: number;
    hitpoints: number;
    hitroll: number;
    level: number;
    mana: number;
    maxHitpoints: number;
    maxMana: number;
    maxMove: number;
    max_hit: number;
    max_mana: number;
    max_move: number;
    move: number;
    pcdata: {
      bamfin: string; // String for entering a room
      bamfout: string; // String for leaving a room
      condition: IPlayerCondition; // Player's condition
      learned: { [key: string]: number }; // Skills learned by the player
      mod_con: number;
      mod_dex: number;
      mod_int: number;
      mod_str: number;
      mod_wis: number;
      perm_con: number;
      perm_dex: number;
      perm_int: number;
      perm_str: number;
      perm_wis: number;
      pwd: string; // Password hash for player characters
      title: string; // Character's title
    };
    position: string; // e.g., 'standing', 'sitting', 'sleeping'
    race: Race;
    room?: Room; // Current room
    save_time: number; // Last save time
    saving_throw: number;
    sex: Sex;
    short_descr: string;
    timer: number; // Timer for inactivity
    trust: number;
    was_in_room?: Room; // Previous room before moving to limbo or similar
    wimpy: number; // When to flee

    // Private properties
    private socket: Socket | null = null; // Assuming you're using sockets for communication
    private inventory: IItem[] = [];

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

    // Game mechanics methods
    public moveToRoom(room: Room): void {
    // Implementation for moving character to another room
        console.log(`${this.name} is moving to ${room.name}`);
    }

    public attack(target: ICharacter): void {
    // Implementation for attacking another character
        console.log(`${this.name} attacks ${target.name}`);
    }

    public canSee(other: IItem | ICharacter): boolean {
        if (other instanceof Character) {
            // Logic for character visibility
            return true; // or your specific logic
        } else {
            // Logic for item visibility
            return true; // or your specific logic for items
        }
    }

    public hasLightSource(): boolean {
    // Logic to determine if the character has a light source
    // This could check for equipped items, spells, or other conditions
    // Example:
        return this.inventory.some(item => item.isLightSource);
    }

    public isBlind(): boolean {
    // Logic to determine if the character is blind
    // This could check for conditions, spells, or disabilities
    // Example:
    // Assuming 'conditions' is an array of conditions on the character
        return this.conditions.some(condition => condition === 'blind');
    }

    public removeItem(item: IItem): void {
        const index = this.inventory.indexOf(item);
        if (index > -1) {
            this.inventory.splice(index, 1);
            // @ts-expect-error who knows
            item.carried_by = null; 
        }
    }

    public send(message: string): void {
        if (this.socket) {
            // Send the message over the socket if it exists
            this.socket.write(message + '\n\r'); // '\n\r' for standard MUD line endings
        } else {
            // Logging or handling for characters without sockets (like NPCs)
            console.log(`Character without socket attempted to send: ${message}`);
        }
    }

    // ... other methods like heal, castSpell, saveCharacter, etc.
}

export default Character;