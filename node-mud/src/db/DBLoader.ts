import { Area } from '../models/Area';
import { Mob } from '../models/Mob';
import Item from '../models/Item';
import Room from '../models/Room';
import { readFileSync } from 'fs';
import { join } from 'path';

export class DBLoader {
    private areas: Area[] = [];
    private mobs: Mob[] = [];
    private items: Item[] = [];
    private rooms: { [key: number]: Room } = {};

    public load(): void {
        this.loadAreas();
        this.loadMobs();
        this.loadItems();
        this.loadRooms();
        console.log(`Loaded ${this.areas.length} areas, ${this.mobs.length} mobs, ${this.items.length} items, and ${Object.keys(this.rooms).length} rooms.`);
    }

    private loadAreas(): void {
        const areaFiles = this.getFiles('areas');
        areaFiles.forEach(file => {
            const content = readFileSync(file, 'utf-8');
            const areaData = this.parseArea(content);
            this.areas.push(areaData);
        });
    }

    private parseArea(content: string): Area {
        // Implementation for parsing area data from text format
        const lines = content.split('\n');
        const name = lines.find(line => line.startsWith('#AREA'))?.split('#AREA ')[1] || 'Unnamed Area';
        const author = lines.find(line => line.startsWith('#AUTHOR'))?.split('#AUTHOR ')[1] || 'Unknown Author';
        const levels = lines.find(line => line.startsWith('#LEVELS'))?.split('#LEVELS ')[1].split('-').map(Number) || [0, 0];
        return new Area(name, author, [levels[0], levels[1]]);
    }

    private loadMobs(): void {
        const mobFiles = this.getFiles('mobs');
        mobFiles.forEach(file => {
            const content = readFileSync(file, 'utf-8');
            this.mobs.push(...this.parseMobs(content));
        });
    }

    private parseMobs(content: string): Mob[] {
        // Implementation for parsing mob data from text format
        return [];
    }

    private loadItems(): void {
        const itemFiles = this.getFiles('items');
        itemFiles.forEach(file => {
            const content = readFileSync(file, 'utf-8');
            this.items.push(...this.parseItems(content));
        });
    }

    private parseItems(content: string): Item[] {
        // Implementation for parsing item data from text format
        return [];
    }

    private loadRooms(): void {
        const roomFiles = this.getFiles('rooms');
        roomFiles.forEach(file => {
            const content = readFileSync(file, 'utf-8');
            this.parseRooms(content);
        });
    }

    private parseRooms(content: string): void {
        const lines = content.split('\n');
        let currentRoom: Room | null = null;

        for (const line of lines) {
            if (line.startsWith('#ROOM ')) {
                if (currentRoom) this.rooms[currentRoom.id] = currentRoom;
                const id = parseInt(line.split('#ROOM ')[1], 10);
                currentRoom = new Room(id, '', '');
            } else if (currentRoom) {
                if (line.startsWith('NAME ')) currentRoom.name = line.slice(5).trim();
                if (line.startsWith('DESC ')) currentRoom.description = line.slice(5).trim();
                if (line.startsWith('EXIT ')) {
                    const [direction, roomId, status] = line.slice(5).split(' ');
                    currentRoom.exits[direction] = { roomId: parseInt(roomId, 10), closed: status === 'closed' };
                }
            }
        }
        if (currentRoom) this.rooms[currentRoom.id] = currentRoom;
    }

    private getFiles(folder: string): string[] {
        // Placeholder for loading files from a specific directory
        return []; // Implement actual file system operations
    }
}

// Usage
const dbLoader = new DBLoader();
dbLoader.load();