import { people } from '../GameData';
import GameManager from '../GameManager';
import Human from './entities/Human';

class City {
    constructor(private readonly name: string,
                private readonly inhabitants: string[]) {
        this.name = name;
        this.inhabitants = inhabitants;
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
        this.inhabitants.push(humanId);
    }
}

export default City;