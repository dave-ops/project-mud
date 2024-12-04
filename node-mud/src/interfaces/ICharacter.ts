import { IRoom } from './IRoom'; // Assuming you have an Affect model
import { IItem } from './IItem'; // Assuming you have an Affect model
import { ISpell } from './ISpell'; // Assuming you have an Affect model

export interface ICharacter {
    id: number;
    name: string;
    description: string;
    level: number;
    hitpoints: number;
    maxHitpoints: number;
    mana: number;
    maxMana: number;
    move: number;
    maxMove: number;
    gold: number;
    exp: number;
    position: string; // e.g., 'standing', 'sitting', 'sleeping'
    sex: string; // 'male', 'female', 'neutral'
    class: string; // based on class system in the game

    // Methods that might be abstract or implemented in derived classes:
    moveTo(room: IRoom): void;
    attack(target: ICharacter): void;
    gainExperience(amount: number): void;
    heal(amount: number): void;
    castSpell(spell: ISpell, target: ICharacter): void;
    say(message: string): void;
    look(): void;
    getInventory(): Array<IItem>;
    equip(item: IItem, slot?: string): boolean; // Returns true if equipped successfully
    unequip(item: IItem): boolean; // Returns true if unequipped successfully
    save(): void; // Save character data
}