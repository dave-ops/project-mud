import ICharacter from './ICharacter'; // Assuming you have an Affect model
import { IItem } from './IItem'; // Assuming you have an Affect model

export interface IAffect {
    type: string; // Type of affect, like 'poison', 'strength', 'invisibility'
    duration: number; // Duration in game ticks or turns
    modifier: number; // Can be positive or negative, affects stats or attributes
    affectedStat?: string; // The stat or attribute being affected, e.g., 'hitpoints', 'strength'
    appliesTo: 'character' | 'item'; // What this affect can be applied to

    // Methods
    apply(character: ICharacter | IItem): void; // Applies the affect to the target
    remove(character: ICharacter | IItem): void; // Removes the affect from the target
    tick(): void; // Handles what happens each game tick while the affect is active, like reducing duration
    isActive(): boolean; // Checks if the affect is still active (duration > 0)
    getDescription(): string; // Returns a string description of the effect for display to players
}