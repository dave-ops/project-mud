import { Character } from '../models/Character';

export class CombatHandler {
    static fightRound(): void {
        // Simulate a combat round where all fighting characters attack
        // This would be part of a game loop or tick system
        Character.instances.forEach((char: Character) => {
            if (char.fighting) {
                char.attack(char.fighting);
            }
        });
    }

    static handleDeath(attacker: Character, defender: Character): void {
        // Handle post-death effects like experience, loot, etc.
    }

    // Additional methods for combat mechanics like status effects, magic, etc.
}

// Assuming you have a way to track all characters, like a static array or map in Character class
Character.instances = []; // Or some other way to access all characters in combat