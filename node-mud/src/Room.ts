import Character from './Character';
import Item from './Item';

class Room {
    // Basic room properties
    id: number;
    name: string;
    description: string;

    // Room flags or properties
    room_flags: number; // Bitfield for special room properties like safe, dark, etc.
    sector_type: number; // Type of terrain or environment

    // Exits
    exits: {
    [key: string]: {
      direction: string; // 'north', 'south', etc.
      to_room_id: number; // ID of the room this exit leads to
      description?: string; // Optional description of the exit
      exit_info: number; // Bitfield for exit properties like closed, locked, etc.
    }
  };

    // Characters and objects in the room
    people: Character[];
    contents: object[];

    // Additional properties for game mechanics
    light: number; // How much light in the room, affects visibility

    constructor(id: number, name: string, description: string, sector_type: number = 0) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.room_flags = 0; // Default to no special flags
        this.sector_type = sector_type;
        this.exits = {};
        this.people = [];
        this.contents = [];
        this.light = 0; // Default to no extra light
    }

    // Add a character to the room
    addCharacter(char: Character): void {
        if (!this.people.includes(char)) {
            this.people.push(char);
            char.room = this;
        }
    }

    // Remove a character from the room
    removeCharacter(char: Character): void {
        const index = this.people.indexOf(char);
        if (index > -1) {
            this.people.splice(index, 1);
            if (char.room === this) {
                delete char.room;
            }
        }
    }

    // Add an object to the room
    addObject(obj: object): void {
        if (!this.contents.includes(obj)) {
            this.contents.push(obj);
            obj.in_room = this;
        }
    }

    // Remove an object from the room
    removeObject(obj: object): void {
        const index = this.contents.indexOf(obj);
        if (index > -1) {
            this.contents.splice(index, 1);
            if (obj.in_room === this) {
                delete obj.in_room;
            }
        }
    }

    // Add an exit to the room
    addExit(direction: string, to_room_id: number, description?: string, exit_info: number = 0): void {
        this.exits[direction] = { direction, to_room_id, description, exit_info };
    }

    // Check if an exit exists in a given direction
    hasExit(direction: string): boolean {
        return direction in this.exits;
    }

    // Get the room ID for an exit given a direction
    getExitRoomId(direction: string): number | undefined {
        return this.exits[direction]?.to_room_id;
    }

    // Method to describe the room to a character
    describeTo(char: Character): void {
        char.send(`\n\r${this.name}\n\r${this.description}\n\r`);

        if (this.people.length > 1) {
            const visibleChars = this.people.filter(c => c !== char && char.canSee(c));
            if (visibleChars.length > 0) {
                char.send(`Also here: ${visibleChars.map(c => c.name).join(', ')}.\n\r`);
            }
        }

        if (this.contents.length > 0) {
            char.send(`You see: ${this.contents.map(o => o.name).join(', ')}.\n\r`);
        }

        const visibleExits = Object.keys(this.exits).filter(dir => this.exits[dir].exit_info === 0 || !this.exits[dir].exit_info & 1); // Assuming 1 is EX_CLOSED
        if (visibleExits.length > 0) {
            char.send(`Obvious exits: ${visibleExits.join(', ')}.\n\r`);
        }
    }
}

export default Room;