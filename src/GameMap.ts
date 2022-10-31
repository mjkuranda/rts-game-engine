import Agent from "./classes/Agent";
import City from "./classes/City";
import Vector2 from "./classes/Vector2";

class GameMap {
    /* Key: `x:y`, value: Agent object */
    private agents: Map<string, Agent>;
    
    /* Key: `x:y`, value: City array */
    private cities: Map<string, City>;
    
    /* Two-dimensional array */
    private provinces: number[][];
    
    constructor() {
        this.agents = new Map();
        this.cities = new Map();
        this.provinces = [];
    }

    public getAgents(): Map<string, Agent> {
        return this.agents;
    }
    
    public getCities(): Map<string, City> {
        return this.cities;
    }
    
    public settle(agent: Agent, v: Vector2): void {
        const city = new City('noname', agent.getEntitiesIds());
        this.cities.set(`${v.getX()}:${v.getY()}`, city);
        
        console.info(`Settled new city: ${city.getName()}`);
    }
}

export default GameMap;