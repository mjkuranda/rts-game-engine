import Agent, { AgentId, AgentType } from "./classes/Agent";
import City from "./classes/City";
import Human, { HumanId, SpouseId } from "./classes/entities/Human";
import Vector2 from "./classes/Vector2";

import { people, cities, agents } from './GameData';
import Database, {DatabaseResult} from "./databases/Database";
import DatabaseObjectNotFoundError from "./errors/DatabaseObjectNotFoundError";

interface GameObject<T> {
    id: string;
    /**
     * Type of result object.
     * One of them: City | Human | Agent
     */
    object: T;
};

interface GameOperationResult<GameObjectType> {
    success: boolean;
    message: string;
    gameObject?: GameObject<GameObjectType>;
}

export default class GameManager {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    public settle(name: string, agentId: AgentId, v: Vector2): GameOperationResult<City> {
        try {
            const result = this.db.get(agentId, "agents");

            if (!result.object) {
                return {
                    success: false,
                    message: "Agent not found."
                };
            }

            const agent = result.object as Agent;

            const city = new City(name, agent.getEntitiesIds() ?? []);
            const id = `${v.getX()}:${v.getY()}`;

            try {
                this.db.set<City>(city, v);
                this.db.delete(agentId, "agents");
            }
            catch (err) {
                if (err instanceof DatabaseObjectNotFoundError) {
                    return {
                        success: false,
                        message: err.message
                    };
                }

                return {
                    success: false,
                    message: "Settle new city failed."
                };
            }

            return {
                success: true,
                message: `Settled new city: ${city.getName()}.`,
                gameObject: {
                    id,
                    object: city
                }
            };
        }
        catch (err) {
            if (err instanceof DatabaseObjectNotFoundError) {
                return {
                    success: false,
                    message: err.message
                };
            }
        }
        
        return {
            success: false,
            message: "Settle new city failed."
        };
    }
    
    public born(name: string, age: number, isMale?: boolean): GameObject<Human> {
        const child = new Human(name, age, isMale);
        const childId = String.fromCharCode(people.size);
        
        people.set(childId, child);
        
        return {
            id: childId,
            object: child
        };
    }
    
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
    
    public setAgent(type: AgentType, v: Vector2, humanIds: string[]): GameObject<Agent> {
        const agent = new Agent(type, v, humanIds);
        const agentId = String.fromCharCode(agents.size);
        agents.set(agentId, agent);
        
        return {
            id: agentId,
            object: agent
        };
    }
    
    public getAgent(agentId: AgentId): Agent | null {
        return agents.get(agentId) ?? null;
    }
    
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