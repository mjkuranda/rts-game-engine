import Agent, {AgentId, AgentType, AgentTypes} from "./classes/Agent";
import City from "./classes/City";
import Human, { HumanId, SpouseId } from "./classes/entities/Human";
import Vector2 from "./classes/Vector2";

import { people, cities, agents } from './GameData';
import Database from "./databases/Database";
import DatabaseObjectNotFoundError from "./errors/DatabaseObjectNotFoundError";
import InMemoryDatabase from "./databases/InMemoryDatabase";
import GameConfig from "./GameConfig";

interface GameObject<T> {
    id?: string;
    /**
     * Type of result object.
     * One of them: City | Human | Agent
     */
    object: T;
};

export class GameOperationResult<GameObjectType> {
    private success: boolean;
    private message: string;
    private gameObject?: GameObject<GameObjectType>;

    constructor(message: string) {
        this.success = false;
        this.message = message;
    }

    public setGameObject(gameObject: GameObject<GameObjectType>): GameOperationResult<GameObjectType> {
        this.gameObject = gameObject;

        return this;
    }

    public getGameObject(): GameObject<GameObjectType> | undefined {
        return this.gameObject;
    }

    public succeed(): GameOperationResult<GameObjectType> {
        this.success = true;

        return this;
    }

    public isSucceeded(): boolean {
        return this.success;
    }
}

export default class GameManager {
    private db: Database;
    private config: GameConfig;

    constructor(db?: Database, config?: GameConfig) {
        this.config = config ?? new GameConfig();
        this.db = db ?? new InMemoryDatabase(this.config);
    }

    public settle(name: string, agent: Agent, v: Vector2): GameOperationResult<City> {
        if (agent.getType() !== AgentTypes.TRIBE) {
            return new GameOperationResult<City>("Invalid agent type to settle a new city.");
        }

        const city = new City(name, agent.getEntitiesIds() ?? []);
        const id = `${v.getX()}:${v.getY()}`;

        try {
            this.db.set<City>(city, v);
            this.db.delete(id, "agents");
        } catch (err) {
            if (err instanceof DatabaseObjectNotFoundError) {
                return new GameOperationResult<City>(err.message);
            }

            return new GameOperationResult<City>("Settling new city failed.");
        }

        const message = `Settled new city: ${city.getName()}.`;

        return new GameOperationResult<City>(message).setGameObject({ id, object: city }).succeed();
    }

    public born(name: string, age: number, isMale?: boolean): GameOperationResult<Human> {
        const child = new Human(name, age, isMale);

        try {
            this.db.set<Human>(child);

            return new GameOperationResult<Human>("New child has been born!").setGameObject({ object: child }).succeed();
        }
        catch(err) {
            if (err instanceof DatabaseObjectNotFoundError) {
                return new GameOperationResult<Human>(err.message);
            }
        }

        return new GameOperationResult<Human>("Something went wrong while born.");
    }

    public marriage(spouseId1: SpouseId, spouseId2: SpouseId): GameOperationResult<null> {
        try {
            const spouse1 = this.db.get(spouseId1, "people").object as Human;
            const spouse2 = this.db.get(spouseId2, "people").object as Human;

            if (!spouse1 || !spouse2) {
                return new GameOperationResult<null>("Error: Marriage failed.");
            }

            if (spouse1.getGender() === spouse2.getGender()) {
                return new GameOperationResult<null>("Error: They has the same gender.")
            }

            spouse1.marriage(spouseId2);
            spouse2.marriage(spouseId1);

            this.db.update<Human>(spouseId1, spouse1);
            this.db.update<Human>(spouseId2, spouse2);

            return new GameOperationResult<null>("All good for new marriage!").succeed();
        }
        catch(err) {
            if (err instanceof DatabaseObjectNotFoundError) {
                return new GameOperationResult<null>(err.message);
            }
        }

        return new GameOperationResult<null>("Error: Marriage operation failed.")
    }

    public handleDeath(id: HumanId): GameOperationResult<null> {
        try {
            const result = this.db.get(id, "people");
            const human = result.object as Human;

            const spouseId = human.getSpouseId();

            if (spouseId) {
                const spouseResult = this.db.get(spouseId, "people");
                const spouse = spouseResult.object as Human;
                spouse.dissolveMarriage();
            }

            this.db.delete(id, "people");
            const message = `Unfortunately, ${people.get(id)} died.`;

            return new GameOperationResult<null>(message);
        }
        catch(err) {
            if (err instanceof DatabaseObjectNotFoundError) {
                return new GameOperationResult<null>(err.message);
            }
        }

        return new GameOperationResult<null>("Fortunately the death wasn't handled.");
    }
    
    // TODO: Add new method: gainSkill
    
    public setAgent(type: AgentType, v: Vector2, humanIds: string[]): GameOperationResult<Agent> {
        const agent = new Agent(type, v, humanIds);
        const agentId = `${v.getX()}:${v.getY()}`;

        try {
            this.db.set<Agent>(agent, v);
        }
        catch (err) {
            return new GameOperationResult<Agent>("Setting a new agent failed.");
        }

        return new GameOperationResult<Agent>("New agent was successfully created.").setGameObject({ id: agentId,
            object: agent }).succeed();
    }

    // FIXME: Change return type
    public getAgent(agentId: AgentId): Agent | null {
        return agents.get(agentId) ?? null;
    }

    // FIXME: Change return type
    public deleteAgent(agentId: AgentId): void {
        agents.delete(agentId);
    }
    
    public nextAge(age: number): void {
        for (let [cityId, city] of cities) {
            city.nextAge(this, age);
        }
        
        console.info('All cities updated');
    }

    public switchDatabase(db: Database) {
        this.db = db;
    }

    public getDatabase(): Database {
        return this.db;
    }
}