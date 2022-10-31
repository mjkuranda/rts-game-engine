class City {
    constructor(private readonly name: string,
                private readonly inhabitants: string[]) {
        this.name = name;
        this.inhabitants = inhabitants;
    }
    
    public getNext(): void {
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