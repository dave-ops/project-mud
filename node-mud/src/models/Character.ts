import ICharacter from '../interfaces/ICharacter';
import { Class, Position, Sex, Race } from '../enums' // Assuming you've created these enums
import { IAffect } from '../interfaces/IAffect';
import { IItem } from '../interfaces/IItem';
import { IPlayerCondition, COND_FULL, COND_THIRST, COND_DRUNK } from '../interfaces/IPlayerCondition';

class Character implements ICharacter {
    id: number;
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
    fighting?: ICharacter; // Optional if in combat

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
        pwd: string;
        bamfin: string;
        bamfout: string;
        title: string;
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
        condition: IPlayerCondition;
        learned: { [key: string]: number };
    };

    // Game state
    room?: IRoom; // Current room
    was_in_room?: IRoom; // Previous room before moving to limbo or similar
    carrying: IItem[] = []; // Items carried by the character
    affected: IAffect[] = []; // Active affects on the character
    save_time: number; // Last save time

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

    private getClassName(): string {
        return Class[this.class];
    }

    public gainExperience(gain: number): void {
        if (this.isNPC || this.level >= LEVEL_HERO) return;

        const expNeeded = this.expPerLevel[this.level];
        this.exp = Math.min(this.exp + gain, expNeeded * 4);

        if (this.exp < 0) {
            this.exp = 0;
        }

        while (this.exp >= expNeeded * 4) {
            this.levelUp();
        }
    }

    private levelUp(): void {
        const expNeeded = this.expPerLevel[this.level];
        this.level++;
        this.exp -= expNeeded * 4;
        this.max_hit += this.getRandomNumber(10, 20);
        this.max_mana += this.getRandomNumber(10, 20);
        this.max_move += this.getRandomNumber(10, 20);
        this.pcdata.perm_str += 1;
        this.pcdata.perm_int += 1;
        this.pcdata.perm_wis += 1;
        this.pcdata.perm_dex += 1;
        this.pcdata.perm_con += 1;

        this.advanceLevel();
        console.log(`${this.name} gained level ${this.level}`);
    }

    private advanceLevel(): void {
        // Placeholder for level advancement logic. Should include updating skills, spells, etc.
    }

    private getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public getInventory(): IItem[] {
        return this.carrying.slice();
    }

    public addItemToInventory(item: IItem): void {
        this.carrying.push(item);
        item.carried_by = this; // Assuming carried_by is part of IItem now
    }

    public removeItem(item: IItem): IItem | undefined {
        const index = this.carrying.indexOf(item);
        if (index > -1) {
            const removedItem = this.carrying.splice(index, 1)[0];
            if (removedItem.carried_by === this) {
                removedItem.carried_by = undefined;
            }
            return removedItem;
        }
        return undefined;
    }

    // ... other methods like equip, unequip, etc.
}

export default Character;