import { people } from '../../GameData';

export type HumanId = string;

export type SpouseId = string;

/*
    Every instance of this object needs to assign about 42B.
    It consist of:
    name: (max 16 chars), then: 32B maximally
    age: 8B
    spouseId: 2B
*/
export default class Human {
    // Human id
    private spouseId: SpouseId | null;
    
    // TODO: Gender: male or female. String id consist the oldest byte as a gender:
    // TODO: Gender: Gxxxxxxxxxxxxxxxx, G - 0 male, 1 female, x as ids.
    
    // TODO: If someone dies, then his/her spouse becoming a single and spouse should be deleted
    // TODO: from PEOPLE object.
    
    constructor(
        private readonly name: string,
        private readonly age?: number) {
        this.name = name.slice(0, 16);
        this.age = age ?? 0;
        this.spouseId = null;
    }
    
    public getName(): string {
        return this.name;
    }

    // NOTE: Died human is deleted and there is no need to calculate his/her age
    public getAge(year: number): number {
        return year - this.age!;
    }
    
    public getSpouseId(): SpouseId | null {
        return this.spouseId;
    }
    
    public marriage(humanId: string): void {
        if (!people.get(humanId)) {
            console.error('Error: There is no such human.');
            
            return;
        }
        
        this.spouseId = humanId;
    }
}