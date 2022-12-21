import GameConfig from "./GameConfig";

import DatabaseOld from "./databases/old/DatabaseOld";
import InMemoryDatabase from "./databases/old/InMemoryDatabase";

export default class Game {
    /* Configuration of the game */
    private config: GameConfig;
    
    /* Main database using in the game */
    private database: DatabaseOld;
    
    constructor(config?: GameConfig, database?: DatabaseOld) {
        this.config = config ?? new GameConfig();
        this.database = database ?? new InMemoryDatabase(this.config);
    }
    
    public getConfig() {
        return this.config;
    }
    
    public getAge(): number {
        return this.config.age;
    }
    
    public switchDatabase(db: DatabaseOld) {
        this.database = db;
    }
    
    public getDatabase(): DatabaseOld {
        return this.database;
    }
    
    public nextAge(): void {
        console.info(`New age: ${++this.config.age}`);
        console.info(`The current season is ${this.config.age % 4}`);
    }
    
    public status(): void {
        console.info(`Game year ${this.config.age}, season ${this.config.age % 4}.`);
        this.database.status();
    }
}