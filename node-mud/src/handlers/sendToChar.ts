import ICharacter from "../interfaces/ICharacter";
import Character from "../models/Character";

// If you want this as a standalone function:
function sendToChar(text: string, character: ICharacter): void {
    if (!text || !character) {
        return;
    }

    if (!(character as Character).desc) {
        return;
    }

    (character as Character).writeToBuffer(text);
}

export { Character, sendToChar };