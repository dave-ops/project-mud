// models/Area.ts
import { IArea } from '../interfaces/IArea';

export class Area implements IArea {
    constructor(
        public name: string,
        public author: string,
        public levelRange: [number, number]
    ) {}
}
