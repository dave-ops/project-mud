// Define constants for item wear flags (bitwise)
const enum WearFlag {
  TAKE = 1 << 0,
  FINGER = 1 << 1,
  NECK = 1 << 2,
  BODY = 1 << 3,
  HEAD = 1 << 4,
  LEGS = 1 << 5,
  FEET = 1 << 6,
  HANDS = 1 << 7,
  ARMS = 1 << 8,
  SHIELD = 1 << 9,
  ABOUT = 1 << 10,
  WAIST = 1 << 11,
  WRIST = 1 << 12,
  WIELD = 1 << 13,
  HOLD = 1 << 14,
  // Add more wear flags as needed
}

export default WearFlag;