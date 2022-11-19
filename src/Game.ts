import GameManager from "./GameManager";
import GameConfig, { IGameConfig } from "./GameConfig";

import Database from "./databases/Database";
import InMemoryDatabase from "./databases/InMemoryDatabase";

// TODO: Printing game objects i. e.: Human, Agent, City...

// TODO: Increase quality and amount of the tests

export default class Game {
    /* Configuration of the game */
    private config: IGameConfig;
    
    /* A manager of the game */
    private manager: GameManager;
    
    /* Main database using in the game */
    private database: Database;
    
    constructor(database?: Database) {
        this.config = new GameConfig();
        this.manager = new GameManager();
        this.database = database ?? new InMemoryDatabase(this.config);
    }
    
    public getConfig() {
        return this.config;
    }
    
    public getAge(): number {
        return this.config.age;
    }
    
    public getManager(): GameManager {
        return this.manager;
    }
    
    public getDatabase(): Database {
        return this.database;
    }
    
    public nextAge(): void {
        console.info(`New age: ${++this.config.age}`);
        console.info(`The current season is ${this.config.age % 4}`);
        this.manager.nextAge(this.config.age);
    }
    
    public status(): void {
        console.info(`Game year ${this.config.age}, season ${this.config.age % 4}.`);
        this.database.status();
        
        // console.info('People status:', people);
        // console.info('Cities status:', cities);
        // console.info('Agents status:', agents);
    }
}