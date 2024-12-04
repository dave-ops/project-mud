import ICharacter from './interfaces/ICharacter';
import { IAffect } from './interfaces/IAffect';
import { IItem } from './interfaces/IItem'

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

class Affect implements IAffect {
    // Basic properties of an affect
    appliesTo: 'character' | 'item'; // Implement this property
    type: string; // The type of affect, could be mapped to a spell or skill
    duration: number; // How long the affect lasts in game ticks or real time
    modifier: number; // The numerical change to apply (e.g., +5 to strength)
    location: AffectLocation; // Where the affect applies (e.g., APPLY_STR for strength)
    bitvector: number; // Bitfield for special affect flags like AFF_BLIND

    // Optional properties for more complex affects
    caster?: ICharacter; // Who or what cast this affect (optional for tracking)

    constructor(type: string, duration: number, modifier: number, location: AffectLocation, bitvector: number = 0) {
        this.type = type;
        this.duration = duration;
        this.modifier = modifier;
        this.location = location;
        this.bitvector = bitvector;
    }

    apply(char: ICharacter | IItem): void {
        // Implementation
    }

    remove(char: ICharacter | IItem): void {
        // Implementation
    }
    isActive(): boolean {
        // Implementation
    }
    getDescription(): string {
        // Implementation
    }

    // Apply the affect to a character
    applyTo(char: ICharacter): void {
    // Here you would implement logic to apply the affect based on location and modifier
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
    removeFrom(char: ICharacter): void {
    // Reverse the affect based on location and modifier
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