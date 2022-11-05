export default class Vector2 {
    private coords: string;
    
    constructor(private readonly x: number, private readonly y: number) {
        this.coords = String.fromCodePoint(x) + String.fromCodePoint(y);
    }
    
    public getX(): number {
        return this.coords.codePointAt(0) ?? -1;
    }
    
    public getY(): number {
        return this.coords.codePointAt(1) ?? -1;
    }
}