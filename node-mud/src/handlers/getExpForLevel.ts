import { MAX_LEVEL, exp_per_level } from "../enums";

export function getExpForLevel(level: number): number {
    if (level < 0 || level >= MAX_LEVEL) {
        console.warn(`Level ${level} is out of bounds for exp calculation.`);
        return -1; // Or throw an error, or return some default value
    }
    return exp_per_level[level];
}