import GameObjectConverter from "../entities/GameObjectConverter";
import GameObject from "../entities/GameObject";

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
}

export class DatabaseResult {
    constructor(private readonly object: GameObject) {}
}
