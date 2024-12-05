import { readFileSync } from 'fs';

interface Area {
    name: string;
    author: string;
    levelRange: [number, number];
    mobiles: Mobile[];
    objects: ObjectItem[];
    rooms: Room[];
    resets: Reset[];
}

interface Mobile {
    vnum: number;
    name: string;
    shortDescription: string;
    longDescription: string;
    level: number;
    hitpoints: number;
}

interface ObjectItem {
    vnum: number;
    name: string;
    shortDescription: string;
    description: string;
    itemType: string;
    weight: number;
    cost: number;
    values: number[];
}

interface Room {
    vnum: number;
    name: string;
    description: string;
    exits: { [direction: string]: { roomId: number; closed: boolean } };
}

interface Reset {
    command: string;
    arg1: number;
    arg2: number;
    arg3: number;
}

function parseAreaContent(filePath: string): Area {
    const content = readFileSync(filePath, 'utf-8').split('\n');
    let area: Area = {
        name: '',
        author: '',
        levelRange: [0, 0],
        mobiles: [],
        objects: [],
        rooms: [],
        resets: []
    };
    let currentSection = '';
    let currentItem: Mobile | ObjectItem | Room | null = null;

    for (const line of content) {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith('#')) {
            if (trimmedLine === '#AREA') {
                currentSection = 'area';
            } else if (trimmedLine === '#MOBILES') {
                currentSection = 'mobiles';
            } else if (trimmedLine === '#OBJECTS') {
                currentSection = 'objects';
            } else if (trimmedLine === '#ROOMS') {
                currentSection = 'rooms';
            } else if (trimmedLine === '#RESETS') {
                currentSection = 'resets';
            } else {
                const vnum = parseInt(trimmedLine.slice(3), 10);
                switch (currentSection) {
                    case 'mobiles':
                        currentItem = { 
                            vnum: vnum, 
                            name: '', 
                            shortDescription: '', 
                            longDescription: '', 
                            level: 0, 
                            hitpoints: 0 
                        };
                        area.mobiles.push(currentItem);
                        break;
                    case 'objects':
                        currentItem = {
                            vnum: vnum,
                            name: '',
                            shortDescription: '',
                            description: '',
                            itemType: '',
                            weight: 0,
                            cost: 0,
                            values: [0, 0, 0, 0]
                        };
                        area.objects.push(currentItem);
                        break;
                    case 'rooms':
                        currentItem = {
                            vnum: vnum,
                            name: '',
                            description: '',
                            exits: {}
                        };
                        area.rooms.push(currentItem);
                        break;
                }
            }
        } else if (trimmedLine === 'S' || trimmedLine === '$') {
            // End of entity definition
            currentItem = null;
        } else {
            const parts = trimmedLine.split(' ');
            switch (currentSection) {
                case 'area':
                    if (parts[0] === 'Name') area.name = parts.slice(1).join(' ');
                    if (parts[0] === 'Author') area.author = parts.slice(1).join(' ');
                    if (parts[0] === 'Levels') {
                        const levels = parts[1].split('-').map(Number);
                        area.levelRange = [levels[0] || 0, levels[1] || 0];
                    }
                    break;
                case 'mobiles':
                    if (currentItem && currentItem instanceof Mobile) {
                        if (parts[0] === 'Name') currentItem.name = parts.slice(1).join(' ');
                        if (parts[0] === 'Short') currentItem.shortDescription = parts.slice(1).join(' ');
                        if (parts[0] === 'Long') currentItem.longDescription = parts.slice(1).join(' ');
                        if (parts[0] === 'Level') currentItem.level = parseInt(parts[1], 10) || 0;
                        if (parts[0] === 'Hit') currentItem.hitpoints = parseInt(parts[1], 10) || 0;
                        // Add more mobile properties parsing here as needed
                    }
                    break;
                case 'objects':
                    if (currentItem && currentItem instanceof ObjectItem) {
                        if (parts[0] === 'Name') currentItem.name = parts.slice(1).join(' ');
                        if (parts[0] === 'Short') currentItem.shortDescription = parts.slice(1).join(' ');
                        if (parts[0] === 'Long') currentItem.description = parts.slice(1).join(' ');
                        if (parts[0] === 'Type') currentItem.itemType = parts[1];
                        if (parts[0] === 'Weight') currentItem.weight = parseInt(parts[1], 10) || 0;
                        if (parts[0] === 'Cost') currentItem.cost = parseInt(parts[1], 10) || 0;
                        if (parts[0] === 'Values') {
                            currentItem.values = parts.slice(1, 5).map(Number).filter(val => !isNaN(val));
                            // Ensure the array has exactly 4 elements by padding with zeros if necessary
                            while (currentItem.values.length < 4) currentItem.values.push(0);
                        }
                        // Add more object properties parsing here as needed
                    }
                    break;
                case 'rooms':
                    if (currentItem && currentItem instanceof Room) {
                        if (parts[0] === 'Name') currentItem.name = parts.slice(1).join(' ');
                        if (parts[0] === 'Desc') currentItem.description = parts.slice(1).join(' ');
                        if (parts[0] === 'Exit') {
                            const [, direction, to, status] = parts;
                            currentItem.exits[direction] = {
                                roomId: parseInt(to, 10),
                                closed: status === 'closed'
                            };
                        }
                        // Add more room properties parsing here as needed
                    }
                    break;
                case 'resets':
                    if (trimmedLine.length >= 10) {
                        area.resets.push({
                            command: trimmedLine[0],
                            arg1: parseInt(trimmedLine.slice(1, 5), 10),
                            arg2: parseInt(trimmedLine.slice(5, 9), 10),
                            arg3: parseInt(trimmedLine.slice(9, 13), 10)
                        });
                    }
                    break;
            }
        }
    }

    return area;
}

// Example usage:
const areaData = parseAreaContent('midgaard.are');
console.log(JSON.stringify(areaData, null, 2));