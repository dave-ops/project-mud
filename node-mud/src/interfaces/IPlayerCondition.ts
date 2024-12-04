const COND_FULL = 0;
const COND_THIRST = 1;
const COND_DRUNK = 2;

export interface PlayerCondition {
    [COND_FULL]: number;
    [COND_THIRST]: number;
    [COND_DRUNK]: number;
  }
  