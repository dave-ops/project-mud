// models/Mob.ts
import { IMob } from '../interfaces/IMob';

export class Mob implements IMob {
    constructor(
        public name: string,
        public shortDescr: string,
        public longDescr: string,
        public level: number
    ) {}
}
