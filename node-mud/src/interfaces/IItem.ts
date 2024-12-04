import ICharacter from './ICharacter'; // Assuming you have an Affect model
import { Position, ItemType } from '../enums'
import Character from '../models/Character';

export interface IItem {
    id: number;
    carried_by?: Character;
    name: string;
    description: string;
    position: Position;
    weight: number;
    size: number;
    value: {
        base: number;
        sell: number;
        buy: number;
        special: number;
    };
    itemType: ItemType; // e.g., 'weapon', 'armor', 'potion'
    canBeEquipped: boolean; // If true, this item can be equipped
    equipmentSlot?: string; // If canBeEquipped, what slot it occupies, e.g., 'head', 'hand'
    hidden: boolean;
    visibilityCondition?: (char: ICharacter) => boolean; // Optional, since not all items might need this
    obscures(other: IItem): boolean;

    // Methods
    use(character: ICharacter): void; // For items that can be 'used' like potions
    equip(character: ICharacter): boolean; // Returns true if successfully equipped
    unequip(character: ICharacter): boolean; // Returns true if successfully unequipped
    getDescription(): string;
    isWearable(): boolean; // Checks if the item can be equipped based on itemType and canBeEquipped
}