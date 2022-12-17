import GameObjectConverter from "../entities/GameObjectConverter";

export interface IDatabaseQuery<GameObject, GameObjectStruct> {
    key: string;
    table: string;
    converter: GameObjectConverter<GameObject, GameObjectStruct>;
}

interface IDatabase {
    get<GameObject>(query: IDatabaseQuery<GameObject, any>): GameObject;
}

export default abstract class Database implements IDatabase {
    abstract get<GameObject>(query: IDatabaseQuery<GameObject, any>): GameObject;
}
