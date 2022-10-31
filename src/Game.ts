class Game {
    /* An age in the game */
    private age: number;
    
    constructor() {
        this.age = 0;
    }
    
    public getAge(): number {
        return this.age;
    }
    
    public nextAge(): void {
        console.info(`New age: ${++this.age}`);
        console.info(`The current season is ${this.age % 4}`);
    }
}

export default Game;