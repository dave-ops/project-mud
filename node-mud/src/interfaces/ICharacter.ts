import { Class, Position, Sex, } from '../enums'
import { IAffect } from './IAffect'; // Assuming you have an Affect model
import { IItem } from './IItem'; // Assuming you have an Affect model
import { IPlayerCondition } from './IPlayerCondition';

export default interface ICharacter {
    id: number;
    name: string;
    description: string;

    affected_by: number; // Assuming it's a bit flag
    affected: IAffect[];    
    armor: number[];
    class: Class; // based on class system in the game
    damroll: number;
    exp: number;
    gold: number;
    hitpoints: number;
    hitroll: number;
    isNPC: boolean;
    level: number;
    mana: number;
    maxMana: number;
    maxMove: number;
    max_hit: number;
    max_mana: number;
    max_move: number;
    move: number;
    position: Position; // e.g., 'standing', 'sitting', 'sleeping'
    saving_throw: number;
    sex: Sex;
    short_descr: string;
    long_descr: string;
    trust: number;
    race: number;
    carrying: IItem[];
    equipment: { [key: number]: IItem | null };
    fighting?: ICharacter;
    hit: number;
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

    // Methods that might be abstract or implemented in derived classes:
    attack(target: ICharacter): void;
    canSee(other: IItem | ICharacter): boolean;
    castSpell(spellId: number, level: number, target: number, targetObject: ICharacter | IItem | null): void;
    gainExperience(gain: number): void;
    hasLightSource(): boolean;
    isBlind(): boolean;
    send(message: string): void;
    removeItem(item: IItem): void;
    send(message: string): void;
}