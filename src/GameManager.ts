import Agent from "./classes/Agent";
import City from "./classes/City";
import Human from "./classes/entities/Human";
import Vector2 from "./classes/Vector2";

import { people, cities, agents } from './GameData';

export default class GameManager {
    public settle(name: string, agentId: string | null, v: Vector2): void {
        if (agentId === null) {
            console.error('Error: Nullish agent object. Unable to settle a city');
            
            return;
        }
        
        const city = new City(name, agents.get(agentId)?.getEntitiesIds() ?? []);
        cities.set(`${v.getX()}:${v.getY()}`, city);
        agents.delete(agentId);
        
        console.info(`Settled new city: ${city.getName()}`);
    }
    
    public born(name: string, age: number): string {
        const child = new Human(name, age);
        const childId = String.fromCharCode(people.size + 32);

        people.set(childId, child);
        
        return childId;
    }
    
    public marriage(spouseId1: string, spouseId2: string): void {
        people.get(spouseId1)?.marriage(spouseId2);
        people.get(spouseId2)?.marriage(spouseId1);
    }
    
    public setAgent(v: Vector2, humanIds: string[]): string {
        const agent = new Agent(v, humanIds);
        const agentId = String.fromCharCode(agents.size + 32);
        agents.set(agentId, agent);
        
        return agentId;
    }
    
    public getAgent(agentId: string): Agent | null {
        return agents.get(agentId) ?? null;
    }
    
    public deleteAgent(agentId: string): void {
        agents.delete(agentId);
    }
    
    public nextAge(age: number): void {
        for (let [cityId, city] of cities) {
            city.nextAge(this, age);
        }
        
        console.info('All cities updated');
    }
}