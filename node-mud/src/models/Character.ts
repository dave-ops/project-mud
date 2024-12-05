import ICharacter from '../interfaces/ICharacter';
import { Class, Position, Sex, Race, exp_per_level, MAX_LEVEL } from '../enums' // Assuming you've created these enums
import { IAffect } from '../interfaces/IAffect';
import { IItem } from '../interfaces/IItem';
import { IPlayerCondition, COND_FULL, COND_THIRST, COND_DRUNK } from '../interfaces/IPlayerCondition';
import { Socket } from 'net'; // If using Node.js for socket communication
import { IRoom } from '../interfaces/IRoom';
import { WEAR_MAX } from '../constants';

class Character implements ICharacter {
    private socket?: Socket; // This would be the character's network connection
    public desc?: Socket; // Assuming 'desc' for descriptor or connection

    id: number = -1;
    name: string;

    act: number; // Bitfield for various player flags
    affected: IAffect[] = []; // Active affects on the character
    affected_by: number; // Bitfield for affects
    armor: number[] = [0, 0, 0, 0]; 
    carrying: IItem[] = []; // Items carried by the character
    class: Class;
    damroll: number = 0;
    deaf: boolean; // If character is deaf
    description: string;
    exp: number;
    fighting?: ICharacter;
    gold: number;
    hit: number = 0;
    hitroll: number = 0;
    isNPC: boolean;
    level: number;
    long_descr: string;
    mana: number;
    maxMana: number = -1;
    maxMove: number = -1;
    max_hit: number = 0;
    max_mana: number;
    max_move: number;
    move: number;
    position: Position; // e.g., 'standing', 'sitting', 'sleeping'
    race: Race;
    room?: IRoom; // Current room
    save_time: number; // Last save time
    saving_throw: number = -1;
    sex: Sex = Sex.UNKNOWN;
    short_descr: string;
    timer: number; // Timer for inactivity
    trust: number = -1;
    was_in_room?: IRoom; // Previous room before moving to limbo or similar
    wimpy: number; // When to flee

    // Player-specific data
    pcdata: {
        pwd: string;
        bamfin: string;
        bamfout: string;
        title: string;
        perm_str: number;
        perm_int: number;
        perm_wis: number;
        perm_dex: number;
        perm_con: number;
        mod_str: number;
        mod_int: number;
        mod_wis: number;
        mod_dex: number;
        mod_con: number;
        condition: IPlayerCondition;
        learned: { [key: string]: number };
    };


    constructor(name: string, level: number = 1, sex: Sex = Sex.NEUTRAL, race: Race = Race.HUMAN, classType: Class = Class.MAGE, isNpc: boolean) {
        this.name = name;
        this.level = level;
        this.sex = sex;
        this.race = race;
        this.class = classType;

        this.short_descr = `${name} the ${this.getClassName()}`;
        this.short_descr = `${name} is here.`;

        this.long_descr = `${name} stands here.`;
        this.description = `You see nothing special about ${name}.`;
        this.desc = new Socket();

        this.hit = 100;
        this.max_hit = 100;
        this.mana = 100;
        this.max_mana = 100;
        this.move = 100;
        this.max_move = 100;
        this.isNPC = isNpc;

        this.position = Position.STANDING;
        this.gold = 0;
        this.exp = 0;
        this.act = 0; // Default to no flags set
        this.affected_by = 0;
        this.timer = 0;
        this.wimpy = 0;
        this.deaf = false;

        this.pcdata = {
            bamfin: "",
            bamfout: "",
            condition: {
                [COND_DRUNK]: 0,
                [COND_FULL]: 48,
                [COND_THIRST]: 48,
            },
            learned: {},
            mod_con: 0,
            mod_dex: 0,
            mod_int: 0,
            mod_str: 0,
            mod_wis: 0,
            perm_con: 13,
            perm_dex: 13,
            perm_int: 13,
            perm_str: 13,
            perm_wis: 13,
            pwd: "", // Should be hashed in real implementation
            title: "",
        };

        this.save_time = Date.now();

        for (let i = 0; i < WEAR_MAX; i++) {
            this.equiped_items[i] = null;
        }

    }

    equiped_items: { [key: number]: IItem | null; } = {};


    // Method to send messages to the character
    public send(text: string): void {
        if (!text || !this) {
            return; // Early return if text or character is null/undefined
        }

        if (this.desc) {
            this.desc.write(text + '\n\r');
        } else {
            console.log(`Attempted to send message "${text}" to character without a descriptor.`);
            // Or handle this case in another way, like storing messages for later or logging
        }

        console.log(`${this.name} receives: ${text}`);

        if (this.socket) {
            this.socket.write(message + '\n\r'); // '\n\r' for MUD style line endings
        } else {
            console.log(`Character ${this.name} has no socket to send message: ${message}`);
        }
    }

    private levelUp(): void {
        const expNeeded = this.expPerLevel[this.level];
        this.level++;
        this.exp -= expNeeded * 4;
        this.max_hit += this.getRandomNumber(10, 20);
        this.max_mana += this.getRandomNumber(10, 20);
        this.max_move += this.getRandomNumber(10, 20);
        this.pcdata.perm_str += 1;
        this.pcdata.perm_int += 1;
        this.pcdata.perm_wis += 1;
        this.pcdata.perm_dex += 1;
        this.pcdata.perm_con += 1;

        //this.advanceLevel();
        console.log(`${this.name} gained level ${this.level}`);
    }

    private advanceLevel(): void {
        // Logic for improving skills, spells, etc.
    }

    public addItem(item: IItem): void {
        this.carrying.push(item);
    }

    public addItemToInventory(item: IItem): void {
        this.carrying.push(item);
        item.carried_by = this; // Assuming carried_by is part of IItem now
    }

    public addToInventory(item: IItem): void {
        this.carrying.push(item);
        item.carriedBy = this;
    }

    // Method to attack another character
    public attack(target: Character): void {
        if (this.hit <= 0) return; // Dead characters can't attack
        if (target.hit <= 0) return; // Don't attack already dead targets

        const hitChance = this.calculateHitChance(target);
        if (Math.random() < hitChance) {
            const damage = this.calculateDamage();
            this.dealDamage(target, damage);
        } else {
            this.send(`${this.name} misses ${target.name}.`);
        }
    }

    private calculateHitChance(target: Character): number {
        // Simplified hit calculation, adjust based on your combat system
        return Math.min(1, (this.hitroll - target.armor[0]) / 100);
    }

    private calculateDamage(): number {
        return Math.max(1, Math.floor(Math.random() * (this.damroll + 1)) + 1);
    }

    private dealDamage(target: Character, damage: number): void {
        const reducedDamage = Math.max(1, damage - Math.floor(Math.random() * (target.armor[1] + 1)));
        target.hit = Math.max(0, target.hit - reducedDamage);
        this.send(`${this.name} hits ${target.name} for ${reducedDamage} damage.`);
        target.send(`${this.name} hits you for ${reducedDamage} damage.`);

        if (target.hit === 0) {
            this.kill(target);
        }
    }

    private kill(target: Character): void {
        this.send(`${target.name} has been slain by ${this.name}!`);
        target.send(`You have been slain by ${this.name}!`);
        this.stopFighting();
        target.stopFighting();
        // Here you would handle death mechanics, like experience gain, loot, etc.
    }

    public stopFighting(): void {
        if (this.fighting) {
            this.fighting.fighting = undefined;
            this.fighting = undefined;
        }
    }

    // Example of a special combat move (backstab)
    public backstab(target: Character): void {
        if (this.hit <= 0 || target.hit <= 0) return; // Check if either is dead

        // Assuming backstab has a higher hit chance
        if (Math.random() < this.calculateHitChance(target) + 0.3) {
            const damage = this.calculateDamage() * 2; // Double damage for backstab
            this.dealDamage(target, damage);
            this.send(`You backstab ${target.name} for ${damage} damage!`);
            target.send(`${this.name} backstabs you for ${damage} damage!`);
        } else {
            this.send(`Your attempt to backstab ${target.name} fails.`);
            target.send(`${this.name} tries to backstab you but misses!`);
        }
    }

    public canSee(): boolean {
        // Placeholder for level advancement logic. Should include updating skills, spells, etc.
        return false;
    }

    private canEquipItem(item: IItem, wearLocation: number): boolean {
        return !!(item.wearFlags & (1 << wearLocation));
    }

    private calculateDamage(): number {
        // Simplified damage calculation
        return Math.max(0, Math.floor(Math.random() * (this.damroll + 1)) + 1);
    }

    public castSpell(): void {
        // Placeholder for level advancement logic. Should include updating skills, spells, etc.
    }

    private checkAlignmentConflict(item: IItem): boolean {
        // Assuming alignment is stored in values[3] where 1 might mean anti-evil, 2 anti-good
        return (item.values[3] === 1 && this.isEvil()) || (item.values[3] === 2 && this.isGood());
    }

    private checkCombatStatus(target: Character): void {
        if (target.hit <= 0) {
            this.stopFighting();
        }
    }

    private dealDamage(target: Character, damage: number): void {
        target.hit = Math.max(0, target.hit - damage);
        console.log(`${this.name} hits ${target.name} for ${damage} damage.`);

        if (target.hit === 0) {
            this.kill(target);
        }
    }

    public emote(action: string): void {
        if (!this.room) return;

        this.room.broadcast(`${this.name} ${action}`, this);
        this.send(`You ${action}`);
    }

    public equip(item: IItem, wearLocation: number): void {
        if (!this.canEquipItem(item, wearLocation)) {
            console.log(`You can't wear ${item.shortDescr} there.`);
            return;
        }

        if (this.equiped_items[wearLocation]) {
            console.log("You already have something equipped there.");
            return;
        }

        if (this.checkAlignmentConflict(item)) {
            console.log("You can't wear that!");
            return;
        }

        this.removeFromInventory(item);
        this.equiped_items[wearLocation] = item;
        console.log(`You wear ${item.shortDescr}.`);
    }

    public equipment(): void {
        const equipmentSlots = Object.keys(this.equiped_items);
        if (equipmentSlots.every(key => this.equiped_items[key] === null)) {
            this.send("You are not wearing anything.");
        } else {
            this.send("You are using:");
            for (const slot in this.equiped_items) {
                if (this.equiped_items[slot]) {
                    this.send(`  ${slot}: ${this.equiped_items[slot]?.short_descr}`);
                }
            }
        }
    }

    public gainExperience(gain: number): void {
        if (this.isNPC || this.level >= this.LEVEL_HERO) return;

        const expNeeded = this.expPerLevel[this.level];
        this.exp = Math.min(this.exp + gain, expNeeded * 4);

        if (this.exp < 0) {
            this.exp = 0;
        }

        while (this.exp >= expNeeded * 4) {
            this.levelUp();
        }
    }

    private getClassName(): string {
        // Implementation based on enum Class
        return Class[this.class];
    }

    public getInventory(): IItem[] {
        return this.carrying.slice();
    }

    private getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public gossip(message: string): void {
        // In a real game, this would go to all players online
        console.log(`Gossip channel: ${this.name} gossips, '${message}'`);
        this.send(`You gossip, '${message}'`);
    }

    public hasLightSource(): boolean {
        // Placeholder for level advancement logic. Should include updating skills, spells, etc.
        return false;
    }

    public inventory(): void {
        if (this.carrying.length === 0) {
            this.send("You are not carrying anything.");
        } else {
            this.send("You are carrying:");
            this.carrying.forEach(item => this.send(`  ${item.short_descr}`));
        }
    }

    private isBlind(): boolean {
        // Placeholder for level advancement logic. Should include updating skills, spells, etc.
        return false;
    }

    private isEvil(): boolean {
        // Placeholder for checking if character is evil
        return false;
    }

    private isGood(): boolean {
        // Placeholder for checking if character is good
        return false;
    }

    private kill(target: Character): void {
        console.log(`${target.name} has been slain by ${this.name}!`);
        // Handle death mechanics here, like experience gain, loot, etc.
        this.stopFighting();
    }

    public look(): void {
        if (!this.room) {
            this.send("You are in a void.");
            return;
        }

        this.send(this.room.description);
        this.send(`Obvious exits: ${Object.keys(this.room.exits).join(", ")}.`);
        this.lookAtCharacters();
        this.lookAtItems();
    }

    private lookAtCharacters(): void {
        if (this.room?.characters.length) {
            this.send("You see:");
            this.room.characters.forEach(char => this.send(`  ${char.short_descr}`));
        }
    }

    private lookAtItems(): void {
        if (this.room?.items.length) {
            this.send("Items here:");
            this.room.items.forEach(item => this.send(`  ${item.short_descr}`));
        }
    }

    public removeFromInventory(item: IItem): IItem | undefined {
        const index = this.carrying.indexOf(item);
        if (index > -1) {
            this.carrying.splice(index, 1);
            item.carriedBy = undefined;
            return item;
        }
        return undefined;
    }

    public removeItem(item: IItem): boolean {
        const index = this.carrying.indexOf(item);
        if (index > -1) {
            this.carrying.splice(index, 1);
            return true;
        }
        return false;
    }

    public say(message: string): void {
        if (!this.room) return;

        this.room.broadcast(`${this.name} says '${message}'`, this);
        this.send(`You say '${message}'`);
    }

    public stopFighting(): void {
        if (this.fighting) {
            this.fighting.fighting = undefined;
            this.fighting = undefined;
        }
    }

    public unequip(wearLocation: number): IItem | null {
        const item = this.equiped_items[wearLocation];
        if (!item) {
            console.log("You aren't wearing anything there.");
            return null;
        }

        this.equiped_items[wearLocation] = null;
        this.addToInventory(item);
        console.log(`You remove ${item.short_descr}.`);
        return item;
    }

    public who(): void {
        // This would require access to all characters in the game
        // For simplicity, we'll simulate:
        this.send("Players online:");
        this.send(`  ${this.name} (Level ${this.level})`);
    }

    public whisper(target: ICharacter, message: string): void {
        if (!this.room || !target.room || this.room !== target.room) {
            this.send("They aren't here.");
            return;
        }

        this.send(`You whisper to ${target.name}, '${message}'`);
        target.send(`${this.name} whispers to you, '${message}'`);
    }

    public writeToBuffer(text: string): void {
        if (this.desc) {
            this.desc.write(text + '\n\r'); // Example implementation
        }
    }

    public yell(message: string): void {
        if (!this.room) return;

        // In a real game, this would broadcast to multiple rooms
        this.room.broadcast(`${this.name} shouts '${message.toUpperCase()}'`, this);
        this.send(`You shout '${message.toUpperCase()}'`);
    }

    // Method for switching into another character's body
    public switchTo(character: ICharacter): void {
        if (this.level < 51) { // Example level check for admin commands
            this.send("You are not powerful enough to switch into another body.");
            return;
        }
        // Logic to switch bodies or perspectives - in practice, you'd need to manage the state
        console.log(`${this.name} has switched into ${character.name}'s body.`);
        // Here you might want to swap some properties or create a new game state for this
    }

    // Method for returning to original body after switching
    public returnToSelf(): void {
        if (!this.isSwitched()) {
            this.send("You are already in your own body.");
            return;
        }
        console.log(`${this.name} has returned to their original body.`);
        // Reset any switched state here
    }

    // Helper method to check if character is switched
    private isSwitched(): boolean {
        // Placeholder logic to check if character is currently switched
        return false; // Implement actual check based on game state
    }

    // Method for teleporting to another character
    public teleportTo(character: ICharacter): void {
        if (this.level < 51) {
            this.send("You don't have the power to teleport to others.");
            return;
        }
        if (!character.room) {
            this.send("That character is not in any room.");
            return;
        }
        // Move this character to the target's room
        this.moveToRoom(character.room);
    }

    // Method to move character to a specified room
    private moveToRoom(room: IRoom): void {
        // Remove from current room if applicable
        if (this.room) {
            this.room.characters = this.room.characters.filter(char => char !== this);
        }

        // Add to new room
        this.room = room;
        room.characters.push(this);

        // Notify character of new location
        this.send(`You teleport to ${room.name}.`);
        room.broadcast(`${this.name} suddenly appears.`, this);
    }

    // Method to set time (day/night cycle)
    public setTime(time: 'day' | 'night'): void {
        if (this.level < 51) {
            this.send("You can't control time.");
            return;
        }
        // Here you'd update the game's time state
        console.log(`${this.name} has set the time to ${time}.`);
        // Broadcast to all players or update game state
    }

    // Method for global messages (godspeak)
    public godspeak(message: string): void {
        if (this.level < 51) {
            this.send("You are not a god.");
            return;
        }
        console.log(`The gods speak: "${message}"`);
        // In a real game, you'd broadcast this message to all players
    }

    // Method for creating items out of thin air (poof)
    public poof(itemName: string): IItem {
        if (this.level < 51) {
            this.send("You can't create items from nothing.");
            return null as unknown as IItem;
        }

        // Here you'd create an item with default values or pull from a database
        const newItem: IItem = {
            name: itemName,
            short_descr: `${itemName} appears out of thin air`,
            description: `A magically created ${itemName}.`,
            weight: 1,
            cost: 0,
            // ... other item properties
        };

        console.log(`${this.name} has created ${newItem.name}.`);
        this.carrying.push(newItem); // Assuming characters have a carrying array for items
        return newItem;
    }

    // Echo functionality for toggling character's echo
    public toggleEcho(on: boolean): void {
        if (this.socket) {
            if (on) {
                this.socket.setNoDelay(false); // Assume echo off means no delay for performance, though this is an oversimplification
                this.send("Echo is now ON.");
            } else {
                this.socket.setNoDelay(true); // Enable Nagle's algorithm, which is kind of like echo off, but not really
                this.send("Echo is now OFF.");
            }
        } else {
            console.log(`${this.name} attempted to toggle echo without a socket connection.`);
        }
    }

    // Placeholder for method to handle input from character
    public handleInput(command: string): void {
        // Here you'd parse and execute the command
        console.log(`${this.name} entered command: ${command}`);
    }

    // ... other methods like equip, unequip, etc.
}

export default Character;