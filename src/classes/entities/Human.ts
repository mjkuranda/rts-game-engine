import { people } from '../../GameData';

class Human {
    private spouseId: string | null;
    
    constructor(
        private readonly name: string,
        private readonly age?: number) {
        this.name = name;
        this.age = (age) ? age: 0;
        this.spouseId = null;
    }
    
    public getName(): string {
        return this.name;
    }
    
    public getAge(year: number): number {
        return year - this.age!;
    }
    
    public getSpouseId(): string | null {
        return this.spouseId;
    }
    
    public marriage(humanId: string): void {
        if (!people.get(humanId)) {
            console.error('There is no such human.');
            
            return;
        }
        
        this.spouseId = humanId;
    }
}

export default Human;