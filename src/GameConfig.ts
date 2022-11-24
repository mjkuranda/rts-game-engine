type DatabaseType = "inMemory";

interface IDatabaseConfig {
    name: string;
    keys: { peopleLastKey: string, citiesLastKey: string, agentsLastKey: string }
};

export interface IGameConfig {
    age: number;
    database: DatabaseType;
    databases: {
        inMemory: IDatabaseConfig
    };
    setNewKey: (key: string, table: TableType, database?: DatabaseType) => void;
    getLastKey: (table: TableType, database?: DatabaseType) => string;
};

type TableType = "people" | "cities" | "agents";

/**
    GameConfig includes basic configuration,
    i.e. current using database, age in the game,
    and also handles keys in the tables - set and get operation.
*/
export default class GameConfig implements IGameConfig {
    public age: number;
    
    public database: DatabaseType;
    
    public databases: {
        inMemory: IDatabaseConfig
    };
    
    constructor() {
        this.age = 0;                             // Age in the game
        this.database = "inMemory",               // Main database
        this.databases = {                        // Configurations of the all possible databases
            inMemory: {
                name: "InMemoryDatabase",
                keys: {
                    peopleLastKey: "\x00",
                    citiesLastKey: "\x00",
                    agentsLastKey: "\x00"
                }
            }
        }
    }
    
    public setNewKey(key: string, table: TableType, database?: DatabaseType): void {    
        this.databases[database ?? this.database].keys[`${table}LastKey`] = key;
    }
    
    public getLastKey(table: TableType, database?: DatabaseType): string {
        return this.databases[database ?? this.database].keys[`${table}LastKey`];
    };
};