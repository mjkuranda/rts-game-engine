import { people } from '../GameData';
import GameManager from '../GameManager';

/*
    Every instance of this object needs to assign about 150B.
    It consist of:
    name: (max 16 chars), then: 32B maximally
    inhabitants: (each 2B) and max. 64? them, then 128B.
*/
class City {
    constructor(private readonly name: string,
                private readonly inhabitants: string[]) {
        this.name = name.slice(0, 16);
        this.inhabitants = inhabitants; // TODO: Only 16 inhabitants!!!
    }
    
    public nextAge(manager: GameManager, age: number): void {
        // Manage inhabitants
        for (let humanId of this.inhabitants) {
            if (!people.get(humanId)?.getSpouseId()) continue;
            
            // Try to born a new inhabitant
            this.inhabitants.push(manager.born('child', age));
        }
        
        console.info(`${this.name} city was updated!`);
    }
    
    public getName(): string {
        return this.name;
    }
    
    public getInhabitants(): string[] {
        return this.inhabitants;
    }
    
    public addInhabitant(humanId: string): void {
        if (this.inhabitants.length > 16) {
            console.error('Error: Too many inhabitants in the city!');
            
            return;
        }
        
        this.inhabitants.push(humanId);
    }
}

export default City;