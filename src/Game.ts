import GameManager from "./GameManager";

import { people, cities, agents } from './GameData';

export default class Game {
    /* An age in the game */
    private age: number;
    
    /* A manager of the game */
    private manager: GameManager;
    
    constructor() {
        this.age = 0;
        this.manager = new GameManager();
    }
    
    public getAge(): number {
        return this.age;
    }
    
    public getManager(): GameManager {
        return this.manager;
    }
    
    public nextAge(): void {
        console.info(`New age: ${++this.age}`);
        console.info(`The current season is ${this.age % 4}`);
        this.manager.nextAge(this.age);
    }
    
    public status(): void {
        console.info('People status:', people);
        console.info('Cities status:', cities);
        console.info('Agents status:', agents);
    }
}