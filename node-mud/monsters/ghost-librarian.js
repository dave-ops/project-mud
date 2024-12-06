// ghost_librarian.js

module.exports = {
  id: 'ghost_librarian',
  name: 'Ghost Librarian',
  description: "A spectral figure draped in tattered robes, her eyes glowing with an ethereal light, surrounded by floating tomes and ancient scrolls.",
  type: 'monster',
  level: 10,
  health: 150,
  mana: 200,
  defense: 10,
  attack: 15,
  xp: 100,
  gold: 50,
  respawn: 300,
  
  // Behaviors
  behaviors: {
    spells: {
      'chill_touch': {
        chance: 0.3, // 30% chance to cast this spell during combat
        manaCost: 20,
        damage: 10,
        description: "The Ghost Librarian extends her icy hand, chilling your very soul."
      },
      'mystical_barrier': {
        chance: 0.1, // 10% chance to cast for defense when health is low
        manaCost: 30,
        effect: 'shield',
        description: "The Ghost Librarian conjures a mystical barrier around herself."
      }
    }
  },
  
  // Items that might drop upon defeat
  drops: [
    // Example items, adjust based on your game's economy
    { id: 'spectral_tome', chance: 0.05 }, // 5% chance to drop
    { id: 'enchanted_ink', chance: 0.1 }   // 10% chance to drop
  ],
  
  // If you want to add any special abilities or resistances
  abilities: {
    'spectral_essence': {
      description: "Due to her ethereal nature, physical attacks are less effective.",
      damageReduction: 0.2 // 20% damage reduction from physical attacks
    }
  },
  
  // If your system supports dialogues or interactions
  dialogue: {
    default: "What knowledge do you seek, mortal?",
    defeated: "The library... remembers."
  }
};