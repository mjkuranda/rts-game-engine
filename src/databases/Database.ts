import GameObjectConverter from "../entities/GameObjectConverter";
import GameObject from "../entities/GameObject";

export type MapChunkData = string;

export interface IDatabaseQuery<GameObjectClass extends GameObject, GameObjectStruct> {
    key: string;
    table: string;
    converter: GameObjectConverter<GameObjectClass, GameObjectStruct>;
}

export default abstract class Database {
    abstract get<GameObjectClass extends GameObject>(query: IDatabaseQuery<GameObjectClass, any>): Promise<GameObjectClass>;
}

export class DatabaseResult {
    constructor(private readonly object: GameObject) {}
}
