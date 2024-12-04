import ICharacter from './ICharacter'; // Assuming you have an Affect model
import { IRoom } from './IRoom'; // Assuming you have an Affect model

export interface ISpell {
    name: string;
    level: number; // Minimum level required to cast
    manaCost: number;
    spellType: string; // e.g., 'damage', 'heal', 'buff'
    targetType: 'self' | 'character' | 'area'; // Defines how the spell can be cast

    // Methods
    cast(caster: ICharacter, target?: ICharacter | IRoom): void; // target is optional based on targetType
    getDescription(): string;
    canCast(caster: ICharacter): boolean; // Checks if the caster can cast this spell
}