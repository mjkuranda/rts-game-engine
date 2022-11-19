interface IDatabase {
    // set(table: DataTables, obj: Human | City | Agent): void;
    // get(human: Human): void;
    // deleteHuman(human: Human): void;
    set<T>(object: T): void;
}

export default abstract class Database implements IDatabase {
    abstract set<T>(object: T): void;
};