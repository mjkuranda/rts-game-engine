class City {
    constructor(private readonly name: string,
                private readonly inhabitants: string[]) {
        this.name = name;
        this.inhabitants = inhabitants;
    }
    
    public getName(): string {
        return this.name;
    }
    
    public getInhabitants(): string[] {
        return this.inhabitants;
    }
}

export default City;