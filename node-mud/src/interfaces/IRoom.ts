import { ICharacter } from './ICharacter'; // Assuming you have an Affect model
import { IItem } from './IItem'; // Assuming you have an Affect model

export interface IRoom {
    id: number;
    name: string;
    description: string;
    exits: { [direction: string]: IRoom | null }; // e.g., {'north': room, 'south': null}
    characters: ICharacter[];
    items: IItem[];

    // Methods
    addCharacter(character: ICharacter): void;
    removeCharacter(character: ICharacter): void;
    addItem(item: IItem): void;
    removeItem(item: IItem): void;
    look(character?: ICharacter): string; // Returns a description of the room, possibly tailored
}