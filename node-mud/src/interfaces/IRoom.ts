interface IRoom {
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