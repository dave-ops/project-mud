'use strict';
module.exports = {
    name: 'Guild Area',
    id: 'guild',
    type: ['camp'],
    levels: 'All',
    description: 'The central guild area where adventurers gather, train, and plan their quests.',
    reloads: 0,
    created: '',
    saved: '',
    author: 'coffeenexus',
    messages: [
        {msg: 'The air is filled with the scent of old books and the echo of footsteps.'},
        {msg: 'Whispers of past adventures seem to resonate through the halls.'}
    ],
    respawnOn: 8,
    persistence: false,
    rooms: [
        {
            id: '1',
            title: 'Empty Room',
            light: true,
            area: 'guild',
            content: 'An empty room with nothing of interest.',
            outdoors: false,
            exits: [
                {
                    cmd: 'east',
                    id: '2'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: []
        },
        {
            id: '2',
            title: 'Hall',
            light: true,
            area: 'guild',
            content: 'A central hall connecting various parts of the guild.',
            outdoors: false,
            exits: [
                {
                    cmd: 'west',
                    id: '1'
                },
                {
                    cmd: 'east',
                    id: '3'
                },
                {
                    cmd: 'north',
                    id: '6'
                },
                {
                    cmd: 'south',
                    id: '5'
                }
            ],
            playersInRoom: [],
            monsters: [
                {
                    name: 'Guild Guardian',
                    level: 10,
                    short: 'a vigilant guardian of the guild',
                    long: 'A vigilant guardian stands watch over the hall, ensuring peace and order.',
                    description: 'The guardian is clad in ceremonial armor, equipped with a staff of authority.',
                    race: 'human',
                    charClass: "fighter",
                    id: 1,
                    area: 'guild',
                    weight: 180,
                    baseStr: 15,
                    position: 'standing',
                    attackType: 'staff',
                    damroll: 5,
                    hitroll: 5,
                    ac: 10,
                    behaviors: [{
                        module: 'guard'
                    }]
                }
            ],
            items: [
                {
                    name: 'Guild Banner',
                    short: 'a decorative guild banner',
                    long: 'A banner with the guild\'s emblem hangs on the wall',
                    area: 'guild',
                    id: '201',
                    level: 1,
                    itemType: 'ornament',
                    material: 'cloth',
                    weight: 1,
                    value: 0
                }
            ]
        },
        {
            id: '3',
            title: 'Empty Room',
            light: true,
            area: 'guild',
            content: 'Another empty room with nothing of particular note.',
            outdoors: false,
            exits: [
                {
                    cmd: 'west',
                    id: '2'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: []
        },
        {
            id: '4',
            title: 'Pit',
            light: false,
            area: 'guild',
            content: 'A deep pit, possibly dangerous to fall into.',
            outdoors: false,
            exits: [
                {
                    cmd: 'east',
                    id: '5'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: [
                {
                    name: 'the pit',
                    short: 'a pit is in the floor',
                    long: 'a pit is in the floor filled with discarded equipment',
                    area: 'guild',
                    id: '427',
                    level: 1,
                    itemType: 'container',
                    weight: 10000,
                    items: [{
                        name: 'Sewer key', 
                        short: 'small rusty key',
                        long: 'A small rusty key made iron was left here',
                        area: 'midgaard',
                        id: '101',
                        level: 1,
                        itemType: 'key',
                        material: 'iron', 
                        weight: 0,
                        slot: '',
                        value: 1,
                        equipped: false,
                        isKey: true
                    }],
                    isOpen: true,
                    carryLimit: 50
                }            
            ]        
        },
        {
            id: '5',
            title: 'Hall',
            light: true,
            area: 'guild',
            content: 'Another segment of the guild\'s hall.',
            outdoors: false,
            exits: [
                {
                    cmd: 'west',
                    id: '4'
                },
                {
                    cmd: 'east',
                    id: '6'
                },
                {
                    cmd: 'north',
                    id: '2'
                },
                {
                    cmd: 'south',
                    id: '8'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: []
        },
        {
            id: '6',
            title: 'Hall',
            light: true,
            area: 'guild',
            content: 'The hall here seems to have a notable echo.',
            outdoors: false,
            exits: [
                {
                    cmd: 'west',
                    id: '5'
                },
                {
                    cmd: 'east',
                    id: '7'
                },
                {
                    cmd: 'south',
                    id: '2'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: []
        },
        {
            id: '7',
            title: 'Empty Room',
            light: true,
            area: 'guild',
            content: 'This room is empty, save for the dust on the floor.',
            outdoors: false,
            exits: [
                {
                    cmd: 'west',
                    id: '6'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: []
        },
        {
            id: '8',
            title: 'Library',
            light: true,
            area: 'guild',
            content: 'Shelves filled with ancient tomes and scrolls.',
            outdoors: false,
            exits: [
                {
                    cmd: 'east',
                    id: '9'
                },
                {
                    cmd: 'north',
                    id: '5'
                }
            ],
            playersInRoom: [],
            monsters: [
                {
                    name: 'Librarian',
                    level: 5,
                    short: 'an old librarian',
                    long: 'The librarian, keeper of knowledge, is sorting books.',
                    description: 'She has glasses perched on her nose, surrounded by books.',
                    race: 'human',
                    charClass: "mage",
                    id: 2,
                    area: 'guild',
                    weight: 120,
                    baseStr: 10,
                    position: 'standing',
                    attackType: 'book',
                    damroll: 1,
                    hitroll: 1,
                    ac: 5,
                    behaviors: [{
                        module: 'librarian'
                    }]
                }
            ],
            items: [
                {
                    name: 'Ancient Tome',
                    short: 'an old dusty tome',
                    long: 'An ancient tome filled with arcane secrets lies here',
                    area: 'guild',
                    id: '202',
                    level: 1,
                    itemType: 'book',
                    material: 'paper',
                    weight: 2,
                    value: 20
                }
            ]
        },
        {
            id: '9',
            title: 'Hall',
            light: true,
            area: 'guild',
            content: 'The final hall leads to a significant place within the guild.',
            outdoors: false,
            exits: [
                {
                    cmd: 'west',
                    id: '8'
                },
                {
                    cmd: 'east',
                    id: '10'
                },
                {
                    cmd: 'north',
                    id: '3'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: []
        },
        {
            id: '10',
            title: 'Recall',
            light: true,
            area: 'guild',
            content: 'A magical circle on the ground, perfect for recalling.',
            outdoors: false,
            exits: [
                {
                    cmd: 'west',
                    id: '9'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: [
                {
                    name: 'Magic Circle',
                    short: 'a shimmering magic circle',
                    long: 'A circle of runes glows softly on the floor',
                    area: 'guild',
                    id: '203',
                    level: 1,
                    itemType: 'teleporter',
                    material: 'stone',
                    weight: 0,
                    value: 0
                }
            ]
        }
    ]
};