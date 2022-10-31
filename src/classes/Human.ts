class Human {
    constructor(private readonly name: string,
                private readonly age: number) {
        this.name = name;
        this.age = age;
    }
    
    public getName(): string {
        return this.name;
    }
    
    public getAge(year: number): number {
        return year - this.age;
    }
}

export default Human;