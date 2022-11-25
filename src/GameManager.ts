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
    id: string;
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

    // FIXME: GameOperationResult as a return type
    public born(name: string, age: number, isMale?: boolean): GameObject<Human> {
        const child = new Human(name, age, isMale);
        // Fixme: config.lastIndex instead of people.size
        const childId = String.fromCharCode(people.size);
        
        people.set(childId, child);
        
        return {
            id: childId,
            object: child
        };
    }

    // FIXME: GameOperationResult as a return type
    public marriage(spouseId1: SpouseId, spouseId2: SpouseId): void {
        if (!people.get(spouseId1) || !people.get(spouseId2)) {
            console.error("Error: Marriage failed.");
            
            return;
        }
        
        if (people.get(spouseId1)!.getGender() === people.get(spouseId2)!.getGender()) {
            console.error("Error: Nupturients has the same gender!");
            
            return;
        }
        
        people.get(spouseId1)!.marriage(spouseId2);
        people.get(spouseId2)!.marriage(spouseId1);
    }

    // FIXME: GameOperationResult as a return type
    public handleDeath(id: HumanId): void {
        if (people.get(id) === undefined) return;
        console.info(`Unfortunately, ${people.get(id)} died.`);
        
        const spouseId = people.get(id)!.getSpouseId();
        if (spouseId) {
            people.get(spouseId)!.dissolveMarriage();   
        }
        
        people.delete(id);
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