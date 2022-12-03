import GameManager from "./GameManager";
import GameConfig from "./GameConfig";

import Database from "./databases/Database";
import InMemoryDatabase from "./databases/InMemoryDatabase";

// TODO: Printing game objects i. e.: Human, Agent, City...

// TODO: Increase quality and amount of the tests

export default class Game {
    /* Configuration of the game */
    private config: GameConfig;
    
    /* A manager of the game */
    private manager: GameManager;
    
    /* Main database using in the game */
    private database: Database;
    
    constructor(config?: GameConfig, manager?: GameManager, database?: Database) {
        this.config = config ?? new GameConfig();
        this.database = database ?? new InMemoryDatabase(this.config);
        this.manager = manager ?? new GameManager(this.database, this.config);
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

    public switchDatabase(db: Database) {
        this.database = db;
        this.getManager().switchDatabase(db);
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
    }
}