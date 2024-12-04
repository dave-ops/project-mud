import ICharacter from './interfaces/ICharacter';
import { IAffect } from './interfaces/IAffect';
import { IItem } from './interfaces/IItem';

// Define constants for affect locations
const enum AffectLocation {
  APPLY_STR = 0,
  APPLY_INT,
  APPLY_WIS,
  APPLY_DEX,
  APPLY_CON,
  APPLY_HIT,
  APPLY_MANA,
  APPLY_MOVE,
  APPLY_AC, // Armor Class
  APPLY_HITROLL,
  APPLY_DAMROLL,
  APPLY_SAVING_SPELL,
  // Add more as needed
}

// Define constants for common affect bitvectors
// eslint-disable-next-line
const enum AffectBitvector {
  AFF_BLIND = 1 << 0,
  AFF_INVISIBLE = 1 << 1,
  AFF_DETECT_EVIL = 1 << 2,
  // Add more as needed
}

/**
 * Represents an affect in the game, which can modify character or item properties.
 */
class Affect implements IAffect {
    // Basic properties of an affect
    appliesTo: 'character' | 'item';
    type: string;
    duration: number;
    modifier: number;
    location: AffectLocation;
    bitvector: number;

    // Optional properties for more complex affects
    caster?: ICharacter;

    constructor(type: string, duration: number, modifier: number, location: AffectLocation, bitvector: number = 0) {
        this.type = type;
        this.duration = duration;
        this.modifier = modifier;
        this.location = location;
        this.bitvector = bitvector;
        this.appliesTo = 'character'; // Defaulting to character, adjust as needed
    }

    // Implementation of IAffect methods
    apply(char: ICharacter | IItem): void {
        if (char instanceof ICharacter) {
            this.applyTo(char);
        } else if (char instanceof IItem) {
            // Placeholder for item affects
            console.log("Applying affect to item not implemented yet.");
        }
    }

    remove(char: ICharacter | IItem): void {
        if (char instanceof ICharacter) {
            this.removeFrom(char);
        } else if (char instanceof IItem) {
            // Placeholder for item affects
            console.log("Removing affect from item not implemented yet.");
        }
    }

    isActive(): boolean {
        return this.duration > 0;
    }

    getDescription(): string {
        return `Affect of type ${this.type} with modifier ${this.modifier} at location ${AffectLocation[this.location]} for ${this.duration} turns.`;
    }

    // Apply the affect to a character
    private applyTo(char: ICharacter): void {
        switch (this.location) {
        case AffectLocation.APPLY_STR:
            char.pcdata.mod_str += this.modifier;
            break;
        case AffectLocation.APPLY_INT:
            char.pcdata.mod_int += this.modifier;
            break;
        case AffectLocation.APPLY_WIS:
            char.pcdata.mod_wis += this.modifier;
            break;
        case AffectLocation.APPLY_DEX:
            char.pcdata.mod_dex += this.modifier;
            break;
        case AffectLocation.APPLY_CON:
            char.pcdata.mod_con += this.modifier;
            break;
        case AffectLocation.APPLY_HIT:
            char.max_hit += this.modifier;
            break;
        case AffectLocation.APPLY_MANA:
            char.max_mana += this.modifier;
            break;
        case AffectLocation.APPLY_MOVE:
            char.max_move += this.modifier;
            break;
        case AffectLocation.APPLY_AC:
            char.armor += this.modifier; // Assuming lower AC is better, adjust if not
            break;
        case AffectLocation.APPLY_HITROLL:
            char.hitroll += this.modifier;
            break;
        case AffectLocation.APPLY_DAMROLL:
            char.damroll += this.modifier;
            break;
        case AffectLocation.APPLY_SAVING_SPELL:
            char.saving_throw += this.modifier; // Assuming lower saving throw is better
            break;
        default:
            console.warn(`Unknown affect location: ${this.location}`);
        }

        // Set any bitvector flags
        char.affected_by |= this.bitvector; // Bitwise OR to set flag

        // Add this affect to the character's affected array
        if (!char.affected) char.affected = [];
        char.affected.push(this);
    }

    // Remove the affect from a character
    private removeFrom(char: ICharacter): void {
        switch (this.location) {
        case AffectLocation.APPLY_STR:
            char.pcdata.mod_str -= this.modifier;
            break;
        case AffectLocation.APPLY_INT:
            char.pcdata.mod_int -= this.modifier;
            break;
        case AffectLocation.APPLY_WIS:
            char.pcdata.mod_wis -= this.modifier;
            break;
        case AffectLocation.APPLY_DEX:
            char.pcdata.mod_dex -= this.modifier;
            break;
        case AffectLocation.APPLY_CON:
            char.pcdata.mod_con -= this.modifier;
            break;
        case AffectLocation.APPLY_HIT:
            char.max_hit -= this.modifier;
            break;
        case AffectLocation.APPLY_MANA:
            char.max_mana -= this.modifier;
            break;
        case AffectLocation.APPLY_MOVE:
            char.max_move -= this.modifier;
            break;
        case AffectLocation.APPLY_AC:
            char.armor -= this.modifier; // Assuming lower AC is better, adjust if not
            break;
        case AffectLocation.APPLY_HITROLL:
            char.hitroll -= this.modifier;
            break;
        case AffectLocation.APPLY_DAMROLL:
            char.damroll -= this.modifier;
            break;
        case AffectLocation.APPLY_SAVING_SPELL:
            char.saving_throw -= this.modifier; // Assuming lower saving throw is better
            break;
        default:
            console.warn(`Unknown affect location during removal: ${this.location}`);
        }

        // Clear the bitvector flags
        char.affected_by &= ~this.bitvector; // Bitwise AND with the complement to clear flag

        // Remove this affect from the character's affected array
        if (char.affected) {
            const index = char.affected.indexOf(this);
            if (index !== -1) {
                char.affected.splice(index, 1);
            }
        }
    }

    // Method to decrease duration and check if affect should be removed
    tick(): boolean {
        this.duration--;
        return this.duration <= 0;
    }
}

export default { Affect };