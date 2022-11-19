import Agent from "../classes/Agent";
import City from "../classes/City";
import Human from "../classes/entities/Human";
import Vector2 from "../classes/Vector2";
import { IGameConfig } from "../GameConfig";
import Database from "./Database";

export default class InMemoryDatabase extends Database {
    /* Key: `String.fromCharCode(size)`, value: Human object */
    private people: Map<string, Human>;

    /* Key: `x:y`, value: City array */
    private cities: Map<string, City>;

    /* Key: `x:y`, value: Agent object */
    private agents: Map<string, Agent>;
        
    /* Two-dimensional array */
    private provinces: number[][];

    constructor(config: IGameConfig) {
        super(config);
        
        this.people = new Map();
        this.cities = new Map();
        this.agents = new Map();
        this.provinces = [];
    }
    
    public set<T>(object: T, vector?: Vector2): void {    
        if (object instanceof Human) {
            const key = this.getConfig().databases['inMemory'].keys.peopleLastKey;
            
            this.people.set(key, object);
            this.getConfig().databases['inMemory'].keys.peopleLastKey = this.generateNextKey(key);
            
            return;
        }
        
        if (object instanceof City) {
            if (!vector) {
                console.error('Error: Missing coordinates for a new city.');
                
                return;
            }
            
            const key = `${vector?.getX()}:${vector?.getY()}`;
            this.cities.set(key, object);
            
            return;
        }
        
        if (object instanceof Agent) {
            const key = this.getConfig().databases['inMemory'].keys.agentsLastKey;
            
            this.agents.set(key, object);
            this.getConfig().databases['inMemory'].keys.agentsLastKey = this.generateNextKey(key);
            
            return;
        }
        
        console.error('Error: Invalid object type.');
    }
    
    public status(): void {
        console.info("Database status: connected to \"InMemoryDatabase\".");
        console.table({
            ["People"]: { ["Number"]: this.people.size },
            ["Cities"]: { ["Number"]: this.cities.size },
            ["Agents"]: { ["Number"]: this.agents.size }
        });
    }
    
}