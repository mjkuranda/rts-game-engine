import Database, { IDatabaseQuery } from "./Database";
import GameObject from "../entities/GameObject";
import TableNotFoundError from "../errors/database/TableNotFound";
import ObjectNotFoundError from "../errors/database/ObjectNotFoundError";
import Game from "../Game";
import InvalidQueryError from "../errors/database/InvalidQueryError";
import GameConfig from "../GameConfig";

export default class InMemoryDatabase extends Database {
    private readonly tables: Record<string, Map<string, GameObject>>;

    constructor(config: GameConfig, tables: Record<string, Map<string, GameObject>>) {
        super(config);

        this.tables = tables;
    }

    public get<GameObjectClass extends GameObject>(query: IDatabaseQuery<GameObjectClass, any>): Promise<GameObjectClass> {
        const { params: { key, table }, converter } = query;

        if (!this.tables[table]) {
            throw new TableNotFoundError(table);
        }

        const data = this.tables[table].get(key);

        if (!data) {
            throw new ObjectNotFoundError(key, table);
        }

        return Promise.resolve(converter.decode(data));
    }

    public set<GameObjectClass extends GameObject>(query: IDatabaseQuery<GameObjectClass, any>): Promise<void> {
        const { params: { table, object }, converter } = query;
        const key = this.getConfig().getLastKey('people', 'inMemory');

        if (this.tables[table]) {
            throw new TableNotFoundError(table);
        }

        if (!object) {
            throw new InvalidQueryError([ "object" ]);
        }

        const data = converter.encode(object);
        this.tables[table].set(key, data);
        this.getConfig().setNewKey(this.generateNextKey(key), 'people');

        return Promise.resolve();
    }

}