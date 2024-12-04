import Room from './Room';
import Item from './Item'; // Assuming you have an Object model
import { IAffect } from '../interfaces/IAffect';
import { IItem } from '../interfaces/IItem'; 
import ICharacter from '../interfaces/ICharacter';
import { IPlayerCondition, COND_FULL, COND_THIRST, COND_DRUNK } from '../interfaces/IPlayerCondition';
import { Socket } from 'net';
import { Class } from '../enums/Class';

const LEVEL_HERO = 50

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

// Constants for targets, etc., would be defined elsewhere or inlined here
const TARGET_IGNORE = 0; // Example value, adjust according to your enum or constants
const TARGET_CHAR = 1;
const TARGET_OBJ = 2;
const TAR_CHAR_OFFENSIVE = 3; 

/**
 * Represents a character in the game, implementing the ICharacter interface.
 * This class includes both player characters and NPCs.
 */
class Character implements ICharacter {
    id: number;
    name: string;
    description: string;

    act: number; // Bitfield for various player flags
    affected: IAffect[] = []; // Active affects on the character
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
        this.act = 0; // Default to no flags set
        this.affected = [];
        this.affected_by = 0;
        this.class = classType;
        this.deaf = false;
        this.description = `You see nothing special about ${name}.`;
        this.exp = 0;
        this.gold = 0;
        this.hit = 100;
        this.level = level;
        this.long_descr = `${name} stands here.`;
        this.mana = 100;
        this.max_hit = 100;
        this.max_mana = 100;
        this.max_move = 100;
        this.move = 100;
        this.name = name;
        this.pcdata = {
            bamfin: "",
            bamfout: "",
            condition: {
                [COND_DRUNK]: 0,
                [COND_FULL]: 48,
                [COND_THIRST]: 48,
            },
            learned: {},
            mod_con: 0,
            mod_dex: 0,
            mod_int: 0,
            mod_str: 0,
            mod_wis: 0,
            perm_con: 13,
            perm_dex: 13,
            perm_int: 13,
            perm_str: 13,
            perm_wis: 13,
            pwd: "", // Should be hashed in real implementation
            title: "",
        };
        this.position = Position.STANDING;
        this.race = race;
        this.save_time = Date.now();
        this.sex = sex;
        this.short_descr = `${name} the ${this.getClassName()}`;
        this.timer = 0;
        this.wimpy = 0;
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

    public castSpell(spellId: number, level: number, target: number, targetObject: ICharacter | IItem | null): void {
        if (spellId < 0) return;

        if (!this.isNpc && this.level < skillTable[spellId].skillLevel[this.class]) {
            this.send("You can't do that.");
            return;
        }

        if (this.position < 'standing') {
            this.send("You can't concentrate enough.");
            return;
        }

        const manaCost = manaTable[this.level][this.class] / 2;
        if (!this.isNpc && this.mana < manaCost) {
            this.send("You don't have enough mana.");
            return;
        }

        this.addWaitState(skillTable[spellId].beats);

        if (!skillTable[spellId].spellFunction) {
            console.error(`Cast Spell: no spell function for spell ID ${spellId} '${skillTable[spellId].name}'`);
            return;
        }

        if (target === TARGET_IGNORE) {
            if (targetObject instanceof Character) {
                skillTable[spellId].spellFunction(spellId, level, this, targetObject, TARGET_CHAR);
            } else if (targetObject instanceof Item) {
                skillTable[spellId].spellFunction(spellId, level, this, targetObject, TARGET_OBJ);
            } else {
                console.error(`Cast Spell: target is IGNORE but targetObject is NULL for '${skillTable[spellId].name}'`);
                return;
            }
        } else {
            skillTable[spellId].spellFunction(spellId, level, this, targetObject, target);
        }

        if (skillTable[spellId].target === TAR_CHAR_OFFENSIVE && targetObject instanceof Character && targetObject !== this) {
            // Check if the spell is offensive and handle combat rules
            for (const vch of this.room.characters) {
                if (targetObject === vch && !this.isSafeSpell(this, vch)) {
                    this.checkKiller(vch);
                    break;
                }
            }
        }

        if (!this.isNpc && Math.random() * 100 > this.getSkill(spellId)) {
            this.send("You lost your concentration.");
            this.checkImprovement(spellId, false);
            this.mana -= manaCost / 2;
        } else {
            this.mana -= manaCost;
            this.checkImprovement(spellId, true);
        }

        if (skillTable[spellId].target === TAR_CHAR 
            && targetObject instanceof Character
            && targetObject !== this
            && !this.isNpc
            && targetObject.master !== this
            && Math.random() < 0.125) { // 1 in 8 chance
            this.room.broadcast(`${this.name}'s eyes briefly glow red.`, this);
        }
    }

    public gainExperience(gain: number): void {
        if (this.isNPC || this.level >= LEVEL_HERO) return;

        this.exp = Math.min(this.exp + gain, this.expPerLevel[this.level] * 4);

        if (this.exp < 0) {
            this.exp = 0;
        }

        while (this.exp >= this.expPerLevel[this.level] * 4) {
            this.level += 1;
            this.exp -= this.expPerLevel[this.level - 1] * 4; // Adjusting for zero-based index in array
            this.max_hit += this.getRandomNumber(10, 20);
            this.max_mana += this.getRandomNumber(10, 20);
            this.max_move += this.getRandomNumber(10, 20);
            this.pcdata.perm_str += 1;
            this.pcdata.perm_int += 1;
            this.pcdata.perm_wis += 1;
            this.pcdata.perm_dex += 1;
            this.pcdata.perm_con += 1;

            this.advanceLevel(false);
            this.send("You raise a level!!  ");
            console.log(`${this.name} gained level ${this.level}`);
        }
    }

    // Helper methods and properties:

    private getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private advanceLevel(isTraining: boolean): void {
        // Implementation of how a character advances in level, 
        // including any additional benefits or changes not covered here
    }

    private send(message: string): void {
        // Method to send messages to the character, adjust based on your communication system
    }

    private expPerLevel: number[] = []; // Assuming this is defined elsewhere in your project

    private isNPC: boolean;
    private name: string;

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