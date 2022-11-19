import Agent from "../classes/Agent";
import City from "../classes/City";
import Human from "../classes/entities/Human";
import Database from "./Database";

export default class InMemoryDatabase implements Database {
    /* Key: `String.fromCharCode(size)`, value: Human object */
    private people: Map<string, Human>;

    /* Key: `x:y`, value: City array */
    private cities: Map<string, City>;

    /* Key: `x:y`, value: Agent object */
    private agents: Map<string, Agent>;
        
    /* Two-dimensional array */
    private provinces: number[][];

    constructor() {
        this.people = new Map();
        this.cities = new Map();
        this.agents = new Map();
        this.provinces = [];
    }
    
    public set<T>(object: T): void {
        if (object instanceof Human) {
            this.people.set('x', object);
            
            return;
        }
        
        if (object instanceof City) {
            this.cities.set('x', object);
            
            return;
        }
        
        if (object instanceof Agent) {
            this.agents.set('x', object);
            
            return;
        }
        
        console.error('Error: Invalid object type.');
    }
    
}