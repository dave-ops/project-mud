import Character from './Character'; // Assuming you've created the Character model
import Room from './Room'; // Assuming you've created the Room model
import Affect from './Affect'; // Assuming you have an Affect model
import { AffectLocation } from './enums/AffectLocation';
import IItem from './interfaces/IItem'; 

// Define constants for item types
const enum ItemType {
  LIGHT = 0,
  SCROLL,
  WAND,
  STAFF,
  WEAPON,
  TREASURE,
  ARMOR,
  POTION,
  FURNITURE,
  TRASH,
  CONTAINER,
  DRINK_CON,
  KEY,
  FOOD,
  MONEY,
  PEN,
  BOAT,
  CORPSE_NPC,
  CORPSE_PC,
  FOUNTAIN,
  PILL,
  // Add more types as needed
}

// Define constants for item wear flags (bitwise)
const enum WearFlag {
  TAKE = 1 << 0,
  FINGER = 1 << 1,
  NECK = 1 << 2,
  BODY = 1 << 3,
  HEAD = 1 << 4,
  LEGS = 1 << 5,
  FEET = 1 << 6,
  HANDS = 1 << 7,
  ARMS = 1 << 8,
  SHIELD = 1 << 9,
  ABOUT = 1 << 10,
  WAIST = 1 << 11,
  WRIST = 1 << 12,
  WIELD = 1 << 13,
  HOLD = 1 << 14,
  // Add more wear flags as needed
}

class Item implements IItem {
    // Basic properties
    id: number;
    name: string;
    short_descr: string;
    description: string;

    // Item type and properties
    item_type: ItemType; 
    extra_flags: number; // Bitfield for extra properties like ITEM_GLOW, ITEM_HUM, etc.
    wear_flags: number; // Bitfield for where the item can be worn
    wear_loc: number; // Current wear location (-1 means not worn)

    // Stats
    level: number;
    weight: number;
    cost: number;
    timer: number; // How long until the item decays or disappears

    // Values for different item types
    value: [number, number, number, number];

    // Location
    in_room?: Room; // If the item is in a room
    carried_by?: Character; // If the item is carried by a character
    in_object?: Item; // If the item is inside another item (container)

    // Affects
    affected?: Affect[];

    constructor(id: number, name: string, item_type: ItemType, level: number = 1) {
        this.id = id;
        this.name = name;
        this.short_descr = `a ${name}`;
        this.description = `You see nothing special about this ${name}.`;

        this.item_type = item_type;
        this.extra_flags = 0; // No extra flags by default
        this.wear_flags = 0; // No wear flags by default
        this.wear_loc = -1; // Not worn by default

        this.level = level;
        this.weight = 0;
        this.cost = 0;
        this.timer = 0; // No timer by default

        this.value = [0, 0, 0, 0]; // Default values for item specifics
    }

    // Methods for item manipulation
    moveToRoom(room: Room): void {
        if (this.in_room) {
            this.in_room.removeItem(this);
        }
        room.addItem(this);
    }

    moveToCharacter(char: Character): void {
        if (this.in_room) {
            this.in_room.removeItem(this);
        }
        if (this.carried_by) {
            this.carried_by.removeItem(this);
        }
        char.addItem(this);
    }

    // Placeholder methods for adding/removing from room or character
    addToRoom(room: Room): void {
        this.in_room = room;
        if (!room.contents) room.contents = [];
        room.contents.push(this);
    }

    removeFromRoom(room: Room): void {
        if (room.contents) {
            const index = room.contents.indexOf(this);
            if (index > -1) {
                room.contents.splice(index, 1);
            }
        }
        delete this.in_room;
    }

    addToCharacter(char: Character): void {
        this.carried_by = char;
        if (!char.carrying) char.carrying = [];
        char.carrying.push(this);
    }

    removeFromCharacter(char: Character): void {
        if (char.carrying) {
            const index = char.carrying.indexOf(this);
            if (index > -1) {
                char.carrying.splice(index, 1);
            }
        }
        delete this.carried_by;
    }

    // Method to describe the item
    describeTo(char: Character): void {
        char.send(`${this.short_descr}\n\r${this.description}\n\r`);
        if (this.affected) {
            this.affected.forEach(aff => {
                char.send(`It has an affect: ${aff.modifier} to ${this.getAffectLocationName(aff.location)}\n\r`);
            });
        }
    }

    // Helper method to get a human-readable name for affect locations
    private getAffectLocationName(location: number): string {
        switch(location) {
        case AffectLocation.APPLY_STR: return "strength";
        case AffectLocation.APPLY_INT: return "intelligence";
        case AffectLocation.APPLY_WIS: return "wisdom";
        case AffectLocation.APPLY_DEX: return "dexterity";
        case AffectLocation.APPLY_CON: return "constitution";
            // Add more cases for other locations
        default: return "unknown";
        }
    }

    // Check if item can be worn in a specific location
    canWear(location: WearFlag): boolean {
        return !!(this.wear_flags & location);
    }

    public obscures(other: IItem): boolean {
        // Logic to determine if this item obscures another item
        // This could be based on size, position, or any game-specific rules
        // For example:
        if (this.size > other.size && this.position === other.position) {
            return true; // Example: larger items at the same position obscure smaller ones
        }
        return false;
    }
}

export default Item;