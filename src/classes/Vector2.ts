class Vector2 {
    constructor(private readonly x: number, private readonly y: number) {
        this.x = x;
        this.y = y;
    }
    
    public getX(): number {
        return this.x;
    }
    
    public getY(): number {
        return this.y;
    }
}

export default Vector2;