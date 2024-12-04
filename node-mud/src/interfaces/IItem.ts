import { ICharacter } from './ICharacter'; // Assuming you have an Affect model

export interface IItem {
    id: number;
    name: string;
    description: string;
    weight: number;
    value: number; // Monetary value
    itemType: string; // e.g., 'weapon', 'armor', 'potion'
    canBeEquipped: boolean; // If true, this item can be equipped
    equipmentSlot?: string; // If canBeEquipped, what slot it occupies, e.g., 'head', 'hand'
    obscures(other: IItem): boolean;

    // Methods
    use(character: ICharacter): void; // For items that can be 'used' like potions
    equip(character: ICharacter): boolean; // Returns true if successfully equipped
    unequip(character: ICharacter): boolean; // Returns true if successfully unequipped
    getDescription(): string;
    isWearable(): boolean; // Checks if the item can be equipped based on itemType and canBeEquipped
}