import GameObjectConverter from "../entities/GameObjectConverter";
import GameObject from "../entities/GameObject";
import GameConfig from "../GameConfig";

export type MapChunkData = string;

export interface IDatabaseQuery<GameObjectClass extends GameObject, GameObjectStruct> {
    converter: GameObjectConverter<GameObjectClass, GameObjectStruct>;
    params: {
        key: string;
        object?: GameObjectClass;
        table: string;
    };
}

export default abstract class Database {
    abstract get<GameObjectClass extends GameObject>(query: IDatabaseQuery<GameObjectClass, any>): Promise<GameObjectClass>;
    abstract set<GameObjectClass extends GameObject>(object: GameObject): Promise<void>;

    protected constructor(private readonly config: GameConfig) {}

    public getConfig(): GameConfig {
        return this.config;
    }

    /* Super method occurring in all database classes */
    public generateNextKey(key: string): string {
        let keyCode = key.charCodeAt(0);

        return String.fromCharCode(++keyCode);
    }
}

export class DatabaseResult {
    constructor(private readonly object: GameObject) {}
}
