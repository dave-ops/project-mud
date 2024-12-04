import { IAffect } from './IAffect'; // Assuming you have an Affect model
import { IItem } from './IItem'; // Assuming you have an Affect model
import { IRoom } from './IRoom'; // Assuming you have an Affect model
import { ISpell } from './ISpell'; // Assuming you have an Affect model

export default interface ICharacter {
    affected_by: number; // Assuming it's a bit flag
    affected: IAffect[];    
    armor: number;
    class: string; // based on class system in the game
    damroll: number;
    description: string;
    exp: number;
    gold: number;
    hitpoints: number;
    hitroll: number;
    id: number;
    level: number;
    mana: number;
    maxHitpoints: number;
    maxMana: number;
    maxMove: number;
    max_hit: number;
    max_mana: number;
    max_move: number;
    move: number;
    name: string;
    position: string; // e.g., 'standing', 'sitting', 'sleeping'
    removeItem(item: IItem): void;    
    saving_throw: number;
    sex: string; // 'male', 'female', 'neutral'
    pcdata: {
        mod_chr: number;
        mod_con: number;
        mod_dex: number;
        mod_int: number;
        mod_lck: number;
        mod_str: number;
        mod_wis: number;
        max_hit: number;
    };

    // Methods that might be abstract or implemented in derived classes:
    attack(target: ICharacter): void;
    canSee(other: IItem | ICharacter): boolean;
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
    addItem(item: IItem): void;
    removeItem(item: IItem): void;
    send(message: string): void;
}