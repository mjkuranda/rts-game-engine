import Vector2 from "../classes/Vector2";
import GameConfig, { TableType} from "../GameConfig";
import City from "../classes/City";
import Human from "../classes/entities/Human";
import Agent from "../classes/Agent";

type DatabaseResultType = City | Human | Agent;

interface IDatabaseResult {
    object: DatabaseResultType;
}

export class DatabaseResult implements IDatabaseResult {
    public object: DatabaseResultType;

    constructor(object: DatabaseResultType) {
        this.object = object;
    }
}

interface IDatabase {    
    set<T>(object: T): void;
    get(id: string, type: TableType): DatabaseResult;
    delete(id: string, type: TableType): void;
    update<T>(id: string, object: T, type: TableType): void;
    
    getConfig(): GameConfig;
    status(): void;
}

export default abstract class Database implements IDatabase {
    private config: GameConfig;
    
    constructor(config: GameConfig) {
        this.config = config;
    }
    
    abstract set<T>(object: T, vector?: Vector2): void;

    abstract get(id: string, type: TableType): DatabaseResult;

    abstract delete(id: string, type: TableType): void;

    abstract update<T>(id: string, object: T): void;
    
    public getConfig(): GameConfig {
        return this.config;
    }
    
    /* Super method occurring in all database classes */
    public generateNextKey(key: string): string {
        let keyCode = key.charCodeAt(0);
        
        return String.fromCharCode(++keyCode);
    }
    
    abstract status(): void;
};