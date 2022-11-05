/*
    Every instance of this object needs to assign about 4B.
    It consists of `string`: `XY`,
    where `X` is 16-bits left part of the string
    and `Y` is 16-bits right part of the string.
*/
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