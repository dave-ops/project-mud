"use strict";
module.exports = {
  name: "Guild Area",
  id: "guild",
  type: ["safe"],
  levels: "All",
  description:
    "The central guild area where adventurers gather, train, and plan their quests.",
  reloads: 0,
  created: "",
  saved: "",
  author: "coffeenexus",
  messages: [
    {
      msg: "The air is filled with the scent of old books and the echo of footsteps.",
    },
    { msg: "Whispers of past adventures seem to resonate through the halls." },
  ],
  respawnOn: 8,
  persistence: false,
  rooms: [
    {
      id: "1",
      title: "The Guild Bazaar",
      light: true,
      area: "guild",
      content:
        "Nestled right outside the guild is a market where the air hums with the sounds and the aroma of exotic fungi. Here, under the glow of phosphorescent moss, kobolds trade everything from enchanted mushrooms to cleverly designed traps, making it a vibrant hub of commerce and culture.",
      outdoors: true,
      exits: [
        {
          cmd: "east",
          id: "2",
        },
      ],
      playersInRoom: [],
      monsters: [],
      items: [],
    },
    {
      id: "2",
      title: "Guild Hall",
      light: true,
      area: "guild",
      content:
        "This huge room is the meeting place for all known adventurers of the world.  Due to special magics set upon the room, going north will allow you instant transport to your hometown, no matter what your race may be.  The room is filled with many people, most of them wannabe adventurers, but scattered amongst the throng of people you spot more than a few living legends.  It is rumored that even immortals visit this place upon occasion.",
      outdoors: false,
      exits: [
        {
          cmd: "west",
          id: "1",
        },
        {
          cmd: "east",
          id: "3",
        },
        {
          cmd: "north",
          id: "6",
        },
        {
          cmd: "south",
          id: "5",
        },
      ],
      playersInRoom: [],
      monsters: [
        {
          name: "Guild Guardian",
          level: 10,
          short: "a vigilant guardian of the guild",
          long: "A vigilant guardian stands watch over the hall, ensuring peace and order.",
          description:
            "The guardian is clad in ceremonial armor, equipped with a staff of authority.",
          race: "human",
          charClass: "fighter",
          id: 1,
          area: "guild",
          weight: 180,
          baseStr: 15,
          position: "standing",
          attackType: "staff",
          damroll: 5,
          hitroll: 5,
          trainer: true,
          ac: 10,
          behaviors: [
            {
              module: "guard",
            },
          ],
        },
      ],
      items: [
        {
          name: "Guild Banner",
          short: "a decorative guild banner",
          long: "A banner with the guild's emblem hangs on the wall",
          area: "guild",
          id: "201",
          level: 1,
          itemType: "ornament",
          material: "cloth",
          weight: 1,
          value: 0,
        },
      ],
    },
    {
      id: "3",
      title: "Empty Room",
      light: true,
      area: "guild",
      content: "Another empty room with nothing of particular note.",
      outdoors: false,
      exits: [
        {
          cmd: "west",
          id: "2",
        },
      ],
      playersInRoom: [],
      monsters: [
        {
          name: "pip the ogre child",
          displayName: "Pip",
          level: 1,
          short: "Pip",
          long: "Pip the ogre tries to pick your pocket",
          inName: "Pip",
          race: "ogre",
          id: "36",
          area: "guild",
          weight: 10,
          hp: 5,
          damroll: -1,
          meleeRes: -1,
          position: "standing",
          attackType: "bite",
          baseStr: 1,
          size: { value: 1, display: "small" },
          runOnAliveWhenEmpty: true,
          behaviors: [
            {
              module: "wander",
              moveDirections: ["north", "east", "west", "south"],
            },
          ],
        },
      ],
      items: [],
    },
    {
      id: "4",
      title: "The Pit",
      light: true,
      area: "guild",
      content:
        "This is the room of last resort.  If you are weaponless, armorless, or in need of something you can't afford, this is where you go to depend on the generosity of others.  Veteran adventurers often come here to unload equipment they can't use, can't sell, or just want to donate to the less fortunate.  Be warned, less scrupulous individuals have been known to dump cursed equipment here, merely for the pleasure of seeing the poor suffer.  Less than vigilant janitors have left grim evidence that a choice piece of equipment is occasionally wanted by more than one person.",
      outdoors: false,
      exits: [
        {
          cmd: "east",
          id: "5",
        },
      ],
      playersInRoom: [],
      monsters: [],
      items: [
        {
          name: "donation pit",
          short: "A pit for donations dominates the room.",
          long: "a pit is in the floor filled with discarded equipment",
          area: "guild",
          id: "427",
          level: 1,
          isOpen: true,
          carryLimit: 50,
          itemType: "container",
          weight: 10000,
          isContainer: true,
          items: [
            {
              name: "sewer key",
              short: "a small rusty key",
              long: "A small rusty key made iron was left here",
              area: "midgaard",
              id: "101",
              level: 1,
              itemType: "key",
              material: "iron",
              weight: 0,
              slot: "",
              value: 1,
              equipped: false,
              isKey: true,
            },
            {
              name: "short sword",
              displayName: "a short sword",
              short: "a common looking short sword",
              long: "A short sword with a hilt wrapped in leather straps was left on the ground",
              area: "midgaard",
              id: "8",
              level: 1,
              itemType: "weapon",
              weaponType: "sword",
              material: "iron",
              diceNum: 1,
              diceSides: 6,
              attackType: "slash",
              attackElement: "",
              weight: 4,
              slot: "hands",
              equipped: false,
              modifiers: {
                damroll: 1,
                hitroll: 1,
              },
            },
            {
              name: "leather armor",
              displayName: "leather armor",
              short: "a leather chestplate",
              long: "ome leather armor was left here",
              area: "midgaard",
              id: "111",
              level: 1,
              itemType: "armor",
              material: "leather",
              ac: 3,
              weight: 1,
              slot: "body",
              equipped: false,
              value: 5,
            },
            {
              name: "burlap sack",
              displayName: "a burlap sack",
              short: "a worn, tan, burlap sack",
              long: "A tan burlap sack with frizzed edges and various stains lies here",
              area: "midgaard",
              id: "27",
              level: 1,
              itemType: "container",
              weight: 1,
              items: [
                {
                  name: "Sewer key",
                  short: "small rusty key",
                  long: "A small rusty key made iron was left here",
                  area: "midgaard",
                  id: "101",
                  level: 1,
                  itemType: "key",
                  material: "iron",
                  weight: 0,
                  slot: "",
                  value: 1,
                  equipped: false,
                  isKey: true,
                },
              ],
              isOpen: true,
              isContainer: true,
              carryLimit: 50,
            },
          ],
        },
      ],
    },
    {
      id: "5",
      title: "Hallway",
      light: true,
      area: "guild",
      content:
        "This hallway must have been built by giants!  It is huge!  Then again, there are more than a few giants that belong to The Guild, so it may just be so.  There are doors to your left and right leading to other places in the guild designed to serve the needs of all adventurers. A stairway leads down to a hallway below. You barely see the last wisp of smoke of something disintegrating.",
      outdoors: false,
      exits: [
        {
          cmd: "west",
          id: "4",
        },
        {
          cmd: "east",
          id: "6",
        },
        {
          cmd: "north",
          id: "2",
        },
        {
          cmd: "south",
          id: "9",
        },
      ],
      playersInRoom: [],
      monsters: [],
      items: [],
    },
    {
      id: "6",
      title: "Newbie",
      light: true,
      area: "guild",
      content: "The hall here seems to have a notable echo.",
      outdoors: false,
      playersInRoom: [],
      monsters: [
        {
          name: "Glenda",
          level: 10,
          short: "a vigilant guardian of the newbies",
          long: "Glenda stands heres",
          description:
            "The guardian is clad in ceremonial armor, equipped with a staff of authority.",
          race: "human",
          charClass: "cleric",
          id: 61,
          area: "guild",
          weight: 180,
          baseStr: 15,
          position: "standing",
          attackType: "staff",
          damroll: 5,
          hitroll: 5,
          ac: 10,
          behaviors: [
            {
              module: "guard",
            },
          ],
        },
      ],
      items: [],
      exits: [
        {
          cmd: "west",
          id: "5",
        },
      ],
    },
    {
      id: "7",
      title: "Empty Room",
      light: true,
      area: "guild",
      content: "This room is empty, save for the dust on the floor.",
      outdoors: false,
      exits: [
        {
          cmd: "west",
          id: "6",
        },
      ],
      playersInRoom: [],
      monsters: [],
      items: [],
    },
    {
      id: "8",
      title: "Library",
      light: true,
      area: "guild",
      content: "Shelves filled with ancient tomes and scrolls.",
      outdoors: false,
      exits: [
        {
          cmd: "east",
          id: "9",
        },
      ],
      playersInRoom: [],
      monsters: [
        {
          name: "Librarian",
          level: 5,
          short: "an old librarian",
          long: "The librarian, keeper of knowledge, is sorting books.",
          description:
            "She has glasses perched on her nose, surrounded by books.",
          race: "human",
          charClass: "mage",
          id: 2,
          area: "guild",
          weight: 120,
          baseStr: 10,
          position: "standing",
          attackType: "book",
          damroll: 1,
          hitroll: 1,
          ac: 5,
          behaviors: [
            {
              module: "librarian",
            },
          ],
        },
        {
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
          }
      ],
      items: [
        {
          name: "Ancient Tome",
          short: "an old dusty tome",
          long: "An ancient tome filled with arcane secrets lies here",
          area: "guild",
          id: "202",
          level: 1,
          itemType: "book",
          material: "paper",
          weight: 2,
          value: 20,
        },
      ],
    },
    {
      id: "9",
      title: "Hallway",
      light: true,
      area: "guild",
      content: "The final hall leads to a significant place within the guild.",
      outdoors: false,
      exits: [
        {
          cmd: "west",
          id: "8",
        },
        {
          cmd: "east",
          id: "10",
        },
        {
          cmd: "north",
          id: "3",
        },
      ],
      playersInRoom: [],
      monsters: [],
      items: [],
    },
    {
      id: "10",
      title: "Recall",
      light: true,
      area: "guild",
      content: "A magical circle on the ground, perfect for recalling.",
      outdoors: false,
      exits: [
        {
          cmd: "west",
          id: "9",
        },
      ],
      playersInRoom: [],
      monsters: [],
      items: [
        {
          name: "Magic Circle",
          short: "a shimmering magic circle",
          long: "A circle of runes glows softly on the floor",
          area: "guild",
          id: "203",
          level: 1,
          itemType: "teleporter",
          material: "stone",
          weight: 0,
          value: 0,
        },
      ],
    },
    {
      id: "bizaar_weapon",
      name: "Bazaar - Weapon Vendor",
      description:
        "The clang of metal and the sharp smell of oil dominate here. A weapon vendor displays an array of blades and armor.",
      exits: {
        north: "bizaar_magic",
      },
    },
    {
      id: "bizaar_armor",
      name: "Bazaar - Armor Vendor",
      description:
        "This section of the bazaar is filled with the dull gleam of metal. An armor vendor has his wares laid out for inspection.",
      exits: {
        north: "bizaar_weapon",
      },
    },
    {
      id: "bizaar_tent",
      name: "Bazaar - Guru's Tent",
      description:
        "A large tent set up in the corner of the bazaar, where a wise guru offers guidance and training in ancient arts.",
      exits: {
        north: "bizaar_armor",
      },
    },
  ],
};
