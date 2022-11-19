interface IDatabaseConfig {
    name: string,
    keys: { peopleLastKey: string, citiesLastKey: string, agentsLastKey: string }
};

export interface IGameConfig {
    age: number,
    database: string,
    databases: {
        inMemory: IDatabaseConfig
    };
};

/*
    You can explicitly refer to this variable
    as GameConfig, but we recommend you to refer to this confugration,
    using Game instance i. e. `game.getConfig()`.
*/
const GameConfig: IGameConfig = {
    age: 0,                             // Age in the game
    database: "InMemory",               // Main database
    databases: {                        // Configurations of the all possible databases
        inMemory: {
            name: "InMemoryDatabase",
            keys: {
                peopleLastKey: "\x00",
                citiesLastKey: "\x00",
                agentsLastKey: "\x00"
            }
        }
    }
};

export default GameConfig;