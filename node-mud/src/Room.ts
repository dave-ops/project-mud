import ICharacter from './interfaces/ICharacter'; // Assuming you have this export
import Item from './Item'; // Assuming you have this export
import { IRoom } from './interfaces/IRoom'; // Assuming you have this interface


/**
 * Represents a room in the MUD game world.
 * Contains characters, items, and exits.
 */
class Room implements IRoom {
    private _id: number;
    private _name: string;
    private _description: string;
    private _exits: { [direction: string]: { exit_info: number; room: Room } };
    private _people: ICharacter[];
    private _contents: (Item | ICharacter)[];

    constructor(id: number, name: string, description: string) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._exits = {};
        this._people = [];
        this._contents = [];
    }

    // Getters
    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get exits(): { [direction: string]: { exit_info: number; room: Room } } {
        return this._exits;
    }

    get people(): ICharacter[] {
        return this._people;
    }

    get contents(): (Item | ICharacter)[] {
        return this._contents;
    }

    // Methods for managing exits
    addExit(direction: string, exitInfo: number, exitRoom: Room): void {
        this._exits[direction] = { exit_info: exitInfo, room: exitRoom };
    }

    removeExit(direction: string): void {
        delete this._exits[direction];
    }

    // Methods for managing people in the room
    addCharacter(char: ICharacter): void {
        if (!this._people.includes(char)) {
            this._people.push(char);
        }
    }

    removeCharacter(char: ICharacter): void {
        this._people = this._people.filter(c => c !== char);
    }

    // Methods for managing contents (items or characters)
    addObject(obj: Item | ICharacter): void {
        if (obj instanceof Item) {
            obj.in_room = this;
        }
        this._contents.push(obj);
    }

    removeObject(obj: Item | ICharacter): void {
        if (obj instanceof Item && obj.in_room === this) {
            delete obj.in_room;
        }
        this._contents = this._contents.filter(o => o !== obj);
    }

    // Methods for describing the room
    describe(char: ICharacter): void {
        char.send(this._description);
        this.describeExits(char);
        this.describeContents(char);
    }

    private describeExits(char: ICharacter): void {
        const visibleExits = Object.keys(this._exits).filter(dir => 
            this._exits[dir].exit_info === 0 || !(this._exits[dir].exit_info & 1)
        );
        char.send(`Obvious exits: ${visibleExits.join(', ')}.\n\r`);
    }

    private describeContents(char: ICharacter): void {
        const visibleChars = this._people.filter(c => c !== char && char.canSee(c));
        const visibleItems = this._contents.filter(o => o instanceof Item && char.canSee(o as Item));
        
        if (visibleChars.length > 0) {
            char.send(`You see: ${visibleChars.map(c => c.name).join(', ')}.\n\r`);
        }
        if (visibleItems.length > 0) {
            char.send(`Items here: ${visibleItems.map(i => (i as Item).name).join(', ')}.\n\r`);
        }
    }

    // In Room.ts or wherever you decide to place this logic
    private itemIsVisibleTo(char: ICharacter, item: IItem): boolean {
    // Basic visibility check
        if (item.hidden) return false; // If the item is explicitly marked as hidden

        // Light level check (assuming rooms have a light level and characters can carry light sources)
        if (this._lightLevel <= 0 && !char.hasLightSource()) {
            return false; // If the room is dark and the character has no light source
        }

        // Check if the character's vision is obstructed or impaired
        if (char.isBlind()) return false;

        // Item-specific visibility conditions
        // For example, if items can have visibility conditions based on character attributes:
        if (item.visibilityCondition && !item.visibilityCondition(char)) {
            return false;
        }

        // Check if the item is obscured by other items or environmental factors
        // This could be more complex, depending on how detailed your game world is:
        if (this._contents.filter(o => o instanceof Item).some(i => 
            (i as IItem).obscures(item)
        )) {
            return false;
        }

        return true; // If none of the above conditions prevent visibility, the item is visible
    }
    
}

export default Room;