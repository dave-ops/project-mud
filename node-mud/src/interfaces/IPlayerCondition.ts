const COND_FULL = 0;
const COND_THIRST = 1;
const COND_DRUNK = 2;

interface IPlayerCondition {
    [COND_FULL]: number;
    [COND_THIRST]: number;
    [COND_DRUNK]: number;
}

export {
    IPlayerCondition, COND_FULL, COND_THIRST, COND_DRUNK
}
