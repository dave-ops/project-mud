import { IAffect } from "../interfaces/IAffect";
import ICharacter from "../interfaces/ICharacter";
import { Character } from "./sendToChar";

// Utility class for game mechanics
export class GameHandler {
    // Function to determine if a number is within a range (number_range)
    static numberRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Function to check if a character is affected by a specific affect (is_affected)
    static isAffectedBy(character: ICharacter, affectLocation: number): boolean {
        return character.affected.some(affect => affect.location === affectLocation);
    }

    // Function to apply an affect to a character
    static applyAffect(character: Character, affect: IAffect): void {
        character.affected.push(affect);
        character.applyAffects(); // Reapply affects to update character stats
    }

    // Function to remove an affect from a character
    static removeAffect(character: Character, affectLocation: number): void {
        character.affected = character.affected.filter(affect => affect.location !== affectLocation);
        character.applyAffects(); // Reapply affects to update character stats after removal
    }
}

/*
// Example usage
const player = new Character("Player");
const strengthAffect: IAffect = {
    location: 0, // Assuming 0 is for strength or hit points
    modifier: 10,
};

GameHandler.applyAffect(player, strengthAffect);
console.log(`Player's hit after affect: ${player.hit}`);

GameHandler.removeAffect(player, 0);
console.log(`Player's hit after removing affect: ${player.hit}`);
*/