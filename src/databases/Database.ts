import GameObjectConverter from "../entities/GameObjectConverter";
import GameObject from "../entities/GameObject";
import Vector2 from "../classes/Vector2";
import GameConfig from "../GameConfig";

export type MapChunkData = string;

export interface IDatabaseQuery<GameObject, GameObjectStruct> {
    key: string;
    table: string;
    converter: GameObjectConverter<GameObject, GameObjectStruct>;
}

export default abstract class Database {
    abstract get<GameObject>(query: IDatabaseQuery<GameObject, any>): Promise<GameObject>;
}

export class DatabaseResult {
    constructor(private readonly object: GameObject) {}
}
