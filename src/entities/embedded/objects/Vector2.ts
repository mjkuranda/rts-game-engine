import GameObject from "../../GameObject";

/*
    Every instance of this object needs to assign about 4B.
    It consists of `string`: `XY`,
    where `X` is 16-bits left part of the string
    and `Y` is 16-bits right part of the string.
*/
export default class Vector2 extends GameObject {
    private coords: string;

    public static readonly SIZE = 2;

    constructor(private readonly x: number, private readonly y: number) {
        super();

        const xSign = (x >= 0) ? 0 : 1;
        const ySign = (y >= 0) ? 0 : 1;

        const xx = Math.abs(x) | (xSign << 15);
        const yy = Math.abs(y) | (ySign << 15);

        this.coords = String.fromCodePoint(xx) + String.fromCodePoint(yy);
    }

    /**
     * Returns a number in the range between -32767 and 32767.
     * @returns x
     * */
    public getX(): number {
        const code = this.coords.codePointAt(0)!;
        const signCode = ((code & 0x8000) >> 7) as number;
        const sign = (signCode === 1) ? 1 : -1;
        const x = code & 0x7FFF;

        return x * sign;
    }

    /**
     * Returns a number int the range between -32767 and 32767.
     * @returns y
     * */
    public getY(): number {
        const code = this.coords.codePointAt(1)!;
        const signCode = ((code & 0x8000) >> 15) as number;
        const sign = (signCode === 0) ? 1 : -1;
        const y = code & 0x7FFF;

        return y * sign;
    }
    
    public toString(): string {
        return `Vector2 object, (x: ${this.getX()}, y: ${this.getY()})`;
    }
}