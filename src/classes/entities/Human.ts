import { people } from '../../GameData';

export type HumanId = string;

export type SpouseId = string;

export enum Gender {
    MALE = "Male",
    FEMALE = "Female"
};

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
    
    // Gender (true - male, false - female)
    private readonly gender: boolean;
    
    constructor(
        private readonly name: string,
        private readonly age?: number,
        isMale?: boolean) {
        this.name = name.slice(0, 16);
        this.age = age ?? 0;
        this.gender = isMale ?? true;
        this.spouseId = null;
    }
    
    public getName(): string {
        return this.name;
    }

    // NOTE: Died human is deleted and there is no need to calculate his/her age
    public getAge(year: number): number {
        return year - this.age!;
    }
    
    public getGender(): string {
        return (this.gender) ? Gender.MALE : Gender.FEMALE;
    }
    
    public isMale(): boolean {
        return true;
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
    
    public dissolveMarriage(): void {
        this.spouseId = null;
    }
}