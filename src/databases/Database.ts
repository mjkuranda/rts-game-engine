import Vector2 from "../classes/Vector2";
import { IGameConfig } from "../GameConfig";

interface IDatabase {    
    set<T>(object: T): void;
    
    getConfig(): IGameConfig;
    status(): void;
}

export default abstract class Database implements IDatabase {
    private config: IGameConfig;
    
    constructor(config: IGameConfig) {
        this.config = config;
    }
    
    abstract set<T>(object: T, vector?: Vector2): void;
    
    public getConfig(): IGameConfig {
        return this.config;
    }
    
    /* Supermethod occurring in all database classes */
    public generateNextKey(key: string): string {
        let keyCode = key.charCodeAt(0);
        
        return String.fromCharCode(++keyCode);
    }
    
    abstract status(): void;
};