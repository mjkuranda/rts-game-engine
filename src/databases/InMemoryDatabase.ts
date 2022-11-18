import Agent from "../classes/Agent";
import City from "../classes/City";
import Human from "../classes/entities/Human";
import Database, { DataTables } from "./Database"

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
    
    public set(table: DataTables, obj: Human | City | Agent): void {
        if (table === DataTables.PEOPLE) {
            this[table].set('x', (<any>window)["Human"]);   
        }
    }
    
    // public set<T>(table: DataTables, object: T): void {
    //     if (table === DataTables.PEOPLE) {
    //         this.people.set('x', object);
    //     }
    // }
    
    // delete<K>(table: DataTables, key: K): void {
    //     throw new Error("Method not implemented.");
    // }
    // get<K>(table: DataTables, key: K): DataObject {
    //     throw new Error("Method not implemented.");
    // }
    
}