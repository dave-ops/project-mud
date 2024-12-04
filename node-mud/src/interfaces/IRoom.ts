import ICharacter from './ICharacter'; // Assuming you have an Affect model
import { IItem } from './IItem'; // Assuming you have an Affect model
import { INamed } from './INamed'

export interface IRoom {
    getLightLevel(): number;
    setLightLevel(level: number): void;
    id: number;
    name: string;
    contents: INamed[];
    description: string;
    //exits: { [direction: string]: IRoom | null }; // e.g., {'north': room, 'south': null} // old
    exits: { [direction: string]: { 
        exit_info: number; 
        // other properties for exits 
    } };
    characters: ICharacter[];
    items: IItem[];

    // Methods
    addCharacter(character: ICharacter): void;
    removeCharacter(character: ICharacter): void;
    addItem(item: IItem): void;
    removeItem(item: IItem): void;
    look(character?: ICharacter): string; // Returns a description of the room, possibly tailored
}