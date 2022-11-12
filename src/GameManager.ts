import Agent, { AgentId, AgentType } from "./classes/Agent";
import City from "./classes/City";
import Human, { HumanId, SpouseId } from "./classes/entities/Human";
import Vector2 from "./classes/Vector2";

import { people, cities, agents } from './GameData';

export default class GameManager {
    public settle(name: string, agentId: AgentId, v: Vector2): void {
        const city = new City(name, agents.get(agentId)?.getEntitiesIds() ?? []);
        cities.set(`${v.getX()}:${v.getY()}`, city);
        agents.delete(agentId);
        
        console.info(`Settled new city: ${city.getName()}`);
    }
    
    // TODO: childId should start with '\x00' code as 0.
    public born(name: string, age: number, isMale?: boolean): string {
        const child = new Human(name, age, isMale);
        const childId = String.fromCharCode(people.size + 32);

        people.set(childId, child);
        
        return childId;
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
    
    public setAgent(type: AgentType, v: Vector2, humanIds: string[]): string {
        const agent = new Agent(type, v, humanIds);
        const agentId = String.fromCharCode(agents.size + 32);
        agents.set(agentId, agent);
        
        return agentId;
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
}