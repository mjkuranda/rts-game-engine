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
    
    // FIXME: Perhaps better implementation divides below methods into smaller function, i.e. setHuman, setAgent etc.
    public set<T>(object: T, vector?: Vector2): void {    
        if (object instanceof Human) {
            const key = this.getConfig().getLastKey('people', 'inMemory');
            
            this.people.set(key, object);
            this.getConfig().setNewKey(this.generateNextKey(key), 'people');
            
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
            const key = this.getConfig().getLastKey('agents', 'inMemory');
            
            this.agents.set(key, object);
            this.getConfig().setNewKey(this.generateNextKey(key), 'agents');
            
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