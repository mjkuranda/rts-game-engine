import GameMap from "./GameMap";

import { people } from './GameData';

class Game {
    /* An age in the game */
    private age: number;
    
    /* A map of the game */
    private map: GameMap;
    
    constructor() {
        this.age = 0;
        this.map = new GameMap();
    }
    
    public getAge(): number {
        return this.age;
    }
    
    public getMap(): GameMap {
        return this.map;
    }
    
    public nextAge(): void {
        console.info(`New age: ${++this.age}`);
        console.info(`The current season is ${this.age % 4}`);
    }
    
    public status(): void {
        console.info('People status:', people);
    }
}

export default Game;