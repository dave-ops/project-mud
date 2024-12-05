import Character from './Character'; // Assuming you've created the Character model
import Room from './Room'; // Assuming you've created the Room model
import { AffectLocation, ItemType, Position, WearFlag } from '../enums';
import { IAffect } from '../interfaces/IAffect';
import ICharacter from '../interfaces/ICharacter';
import { IItem } from '../interfaces/IItem';
import { IRoom } from '../interfaces/IRoom';

class Item implements IItem {
    id: number;
    name: string;
    description: string;
    position: Position = Position.UNKNOWN;
    size: number;
    weight: number;
    itemType: ItemType = ItemType.UNKNOWN;
    canBeEquipped: boolean;
    equipmentSlot?: string;
 
    // Values for different item types
    value: {
        base: number;
        sell: number;
        buy: number;
        special: number;
    };

    constructor(id: number, 
        name: string, 
        item_type: ItemType, 
        level: number = 1, 
        canBeEquipped: boolean, 
        size: number
    ) {
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

        this.value = {
            base: -1,
            sell: -1,
            buy: -1,
            special: -1,
        }; // Default values for item specifics

        this.hidden = false; // or whatever default state you want
        this.canBeEquipped = canBeEquipped;
        this.size = size;
    }
    shortDescr: string = "null";
    wearFlags: number = -1;
    values: number[] = [];
    carriedBy?: ICharacter | undefined;
    inRoom?: IRoom | undefined;

    hidden: boolean = false; // Default to not hidden
    visibilityCondition?: (char: ICharacter) => boolean;

    // If you decide to use visibilityCondition, you might want to implement it like this:
    setVisibilityCondition(condition: (char: ICharacter) => boolean): void {
        this.visibilityCondition = condition;
    }

    short_descr: string;

    // Item type and properties
    item_type: ItemType;
    extra_flags: number; // Bitfield for extra properties like ITEM_GLOW, ITEM_HUM, etc.
    wear_flags: number; // Bitfield for where the item can be worn
    wear_loc: number; // Current wear location (-1 means not worn)

    // Stats
    level: number;
    cost: number;
    timer: number; // How long until the item decays or disappears


    // Location
    in_room?: Room; // If the item is in a room
    carried_by?: Character; // If the item is carried by a character
    in_object?: Item; // If the item is inside another item (container)

    // Affects
    affected?: IAffect[];

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
        switch (location) {
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

    use(character: ICharacter): void {
        // For items that can be 'used' like potions
        return;
    }

    equip(character: ICharacter): boolean {
        // Returns true if successfully equipped
        return false;
    }

    unequip(character: ICharacter): boolean {
        return false;
    } // Returns true if successfully unequipped

    getDescription(): string {
        return 'unknown';
    }

    isWearable(): boolean {
        return false;
    } // Checks if the item can be equipped based on itemType and canBeEquipped

}

export default Item;