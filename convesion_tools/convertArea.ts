import * as fs from 'fs';
import * as path from 'path';

class BaseEntity {
    vnum: number;
    name: string;
    exits: { [direction: string]: { to: number, closed: boolean } };
    hitpoints: number;
    itemType: string;
    level: number;
    longDescription: string;
    mana: number;
    move: number;
    shortDescription: string;
    description: string;

    constructor(vnum: number, 
                name: string = '',
                exits: { [direction: string]: { to: number, closed: boolean } } = {},
                hitpoints: number = 0,
                itemType: string = '', 
                longDescription: string = '',
                level: number = 0,
                mana: number = 0,
                move: number = 0,
                shortDescription: string = '', 
                description: string = '') {
        this.vnum = vnum;
        this.name = name;
        this.exits = exits;
        this.hitpoints = hitpoints;
        this.itemType = itemType;
        this.level = level;
        this.longDescription = longDescription;
        this.mana = mana;
        this.move = move;
        this.shortDescription = shortDescription;
        this.description = description;
    }
}

interface Area extends BaseEntity {
    author: string;
    levelRange: [number, number];
    mobiles: Mobile[];
    objects: ObjectItem[];
    resets: Reset[];
    rooms: Room[];
}

interface Mobile extends BaseEntity {
    sectorType: string;
}

interface ObjectItem extends BaseEntity {
    affects: { location: string, modifier: number }[];
    cost: number;
    sectorType: string;
    values: number[];
    wearFlags: string[];
    weight: number;
    // Add more properties as needed
}

interface Room extends BaseEntity {
    mobiles: number[];
    objects: number[];
    roomFlags: string[]; // Placeholder for room flags, would need to be parsed from bits
    sectorType: string;
}
interface Reset {
    command: string;
    arg1: number;
    arg2: number;
    arg3: number;
}

function parseAreaFile(filePath: string): Area {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const area: Area = {
        name: '',
        author: '',
        levelRange: [0, 0],
        mobiles: [],
        objects: [],
        rooms: [],
        resets: []
    };

    let currentSection: 'area' | 'mobiles' | 'objects' | 'rooms' | 'resets' = 'area';
    let currentItem: Mobile | ObjectItem | Room | null = null;
    let currentReset: Reset | null = null;

    for (const line of lines) {
        if (line.startsWith('#')) {
            switch (line) {
            case '#AREA':
                currentSection = 'area';
                break;
            case '#MOBILES':
                currentSection = 'mobiles';
                break;
            case '#OBJECTS':
                currentSection = 'objects';
                break;
            case '#ROOMS':
                currentSection = 'rooms';
                break;
            case '#RESETS':
                currentSection = 'resets';
                break;
            default:
                if (line.startsWith('#M ')) {
                    currentItem = { 
                        vnum: parseInt(line.slice(3), 10),
                        name: '',
                        shortDescription: '',
                        longDescription: '',
                        level: 0,
                        hitpoints: 0,
                        mana: 0,
                    } as Mobile;
                } else if (line.startsWith('#O ')) {
                    currentItem = { 
                        vnum: parseInt(line.slice(3), 10), 
                        name: '',  
                        shortDescription: '', 
                        description: '', 
                        itemType: '', 
                        wearFlags: [], 
                        values: [], 
                        weight: 0, 
                        cost: 0, 
                        affects: [] 
                    } as ObjectItem;
                } else if (line.startsWith('#R ')) {
                    currentItem = { 
                        vnum: parseInt(line.slice(3), 10), 
                        name: '', description: '', 
                        exits: {}, 
                        sectorType: '', 
                        roomFlags: [], 
                        mobiles: [], 
                        objects: [] 
                    };
                }
            }
        } else {
            if (currentSection === 'area') {
                if (line.startsWith('Name')) area.name = line.split(' ').slice(1).join(' ');
                if (line.startsWith('Author')) area.author = line.split(' ').slice(1).join(' ');
                if (line.startsWith('Levels')) {
                    const levels = line.split(' ').slice(1).join(' ').split('-').map(Number);
                    area.levelRange = [levels[0] || 0, levels[1] || 0];
                }
            } else if (currentItem) {
                switch (currentSection) {
                case 'mobiles':
                    if (line.startsWith('Name')) currentItem.name = line.slice(5).trim();
                    if (line.startsWith('Short')) currentItem.shortDescription = line.slice(6).trim();
                    if (line.startsWith('Long')) currentItem.longDescription = line.slice(5).trim();
                    if (line.startsWith('Level')) currentItem.level = parseInt(line.slice(6), 10);
                    if (line.startsWith('Hit')) currentItem.hitpoints = parseInt(line.slice(4), 10);
                    if (line.startsWith('Mana')) currentItem.mana = parseInt(line.slice(5), 10);
                    if (line.startsWith('Move')) currentItem.move = parseInt(line.slice(5), 10);
                    // Add more parsing for other mobile attributes as needed
                    break;
                case 'objects':
                    if (line.startsWith('Name')) currentItem.name = line.slice(5).trim();
                    if (line.startsWith('Short')) currentItem.shortDescription = line.slice(6).trim();
                    if (line.startsWith('Long')) currentItem.description = line.slice(5).trim();
                    if (line.startsWith('Type')) currentItem.itemType = line.slice(5).trim();
                    // Parsing wear flags, values, weight, cost, affects would need more complex logic here
                    break;
                case 'rooms':
                    if (line.startsWith('Name')) currentItem.name = line.slice(5).trim();
                    if (line.startsWith('Desc')) currentItem.description = line.slice(5).trim();
                    if (line.startsWith('Sector')) currentItem.sectorType = line.slice(7).trim();
                    if (line.startsWith('Exit')) {
                        const [direction, to, closed] = line.slice(5).split(' ');
                        currentItem.exits[direction] = { to: parseInt(to, 10), closed: closed === 'closed' };
                    }
                    // Handle mobiles and objects in rooms
                    break;
                }

                // Add the item to the respective array when a new item starts or section changes
                if (line.trim() === 'S' || line.trim() === '$') {
                    switch (currentSection) {
                    case 'mobiles':
                        if (currentItem) area.mobiles.push(currentItem as Mobile);
                        break;
                    case 'objects':
                        if (currentItem) area.objects.push(currentItem as ObjectItem);
                        break;
                    case 'rooms':
                        if (currentItem) area.rooms.push(currentItem as Room);
                        break;
                    }
                    currentItem = null;
                }
            } else if (currentSection === 'resets') {
                if (line.trim() === 'S') break; // End of resets
                if (line.length >= 3) {
                    currentReset = {
                        command: line[0],
                        arg1: parseInt(line.slice(1, 5), 10),
                        arg2: parseInt(line.slice(5, 9), 10),
                        arg3: parseInt(line.slice(9, 13), 10)
                    };
                    area.resets.push(currentReset);
                }
            }
        }
    }

    return area;
}

// Example usage:
const areaFilePath = path.join(__dirname, 'midgaard.are');
const areaData = parseAreaFile(areaFilePath);
fs.writeFileSync('midgaard.json', JSON.stringify(areaData, null, 2));
console.log('Area file converted to JSON successfully.');