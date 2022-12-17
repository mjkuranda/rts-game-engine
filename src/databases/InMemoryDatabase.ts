import Database, {IDatabaseQuery} from "./Database";
import GameObject from "../entities/GameObject";

export default class InMemoryDatabase extends Database {
    private tables: Record<string, Map<string, GameObject>>;

    constructor(tables: Record<string, Map<string, GameObject>>) {
        super();

        this.tables = tables;
    }

    public get<GameObject>(query: IDatabaseQuery<GameObject, any>): GameObject {
        const { key, table, converter } = query;
        const data = this.tables[table].get(key);

        return converter.decode(data);
    }

}