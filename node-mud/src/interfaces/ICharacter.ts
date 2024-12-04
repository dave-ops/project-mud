import { IItem } from './IItem'; // Assuming you have an Affect model
import { IRoom } from './IRoom'; // Assuming you have an Affect model
import { ISpell } from './ISpell'; // Assuming you have an Affect model

export default interface ICharacter {
    class: string; // based on class system in the game
    description: string;
    exp: number;
    gold: number;
    hitpoints: number;
    id: number;
    level: number;
    mana: number;
    maxHitpoints: number;
    maxMana: number;
    maxMove: number;
    move: number;
    name: string;
    position: string; // e.g., 'standing', 'sitting', 'sleeping'
    sex: string; // 'male', 'female', 'neutral'
    armor: number;
    damroll: number;
    hitroll: number;
    max_mana: number;
    max_move: number;
    saving_throw: number;
    pcdata: {
        mod_str: number;
        mod_int: number;
        mod_wis: number;
        mod_dex: number;
        mod_con: number;
        mod_chr: number;
        mod_lck: number;
        max_hit: number;
    };

    // Methods that might be abstract or implemented in derived classes:
    attack(target: ICharacter): void;
    castSpell(spell: ISpell, target: ICharacter): void;
    equip(item: IItem, slot?: string): boolean; // Returns true if equipped successfully
    gainExperience(amount: number): void;
    getInventory(): Array<IItem>;
    heal(amount: number): void;
    look(): void;
    moveTo(room: IRoom): void;
    save(): void; // Save character data
    say(message: string): void;
    send(message: string): void;
    unequip(item: IItem): boolean; // Returns true if unequipped successfully
}