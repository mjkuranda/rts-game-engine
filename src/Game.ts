import GameConfig from "./GameConfig";
import Database from "./databases/Database";
import InMemoryDatabase from "./databases/InMemoryDatabase";
import GameObject from "./entities/GameObject";

export default class Game {
    /* Configuration of the game */
    private config: GameConfig;
    
    /* Main database using in the game */
    private database: Database;
    
    constructor(config?: GameConfig, database?: Database, tables?: Record<string, Map<string, GameObject>>) {
        this.config = config ?? new GameConfig();
        this.database = database ?? new InMemoryDatabase(this.config, tables ?? {});
    }
    
    public getConfig() {
        return this.config;
    }
    
    public getAge(): number {
        return this.config.age;
    }
    
    public switchDatabase(db: Database) {
        this.database = db;
    }
    
    public getDatabase(): Database {
        return this.database;
    }
    
    public nextAge(): void {
        console.info(`New age: ${++this.config.age}`);
        console.info(`The current season is ${this.config.age % 4}`);
    }
    
    public status(): void {
        console.info(`Game year ${this.config.age}, season ${this.config.age % 4}.`);
    }
}