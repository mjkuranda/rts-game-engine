import MapTile from "./MapTile";
import Vector2 from "../../../../classes/Vector2";
import GameObject from "../../../GameObject";

export default class MapChunk extends GameObject {
    public static readonly SIZE = 16;
    public static readonly DATA_STRING_SIZE = MapChunk.SIZE * MapChunk.SIZE * 3 + Vector2.SIZE;

    constructor(private readonly tiles: MapTile[][], private readonly coords: Vector2) {
        super();

        this.tiles = tiles;
    }

    public setTile(tile: MapTile, v: Vector2): void {
        const x = v.getX() - (this.coords.getX() * MapChunk.SIZE);
        const y = v.getY() - (this.coords.getY() * MapChunk.SIZE);

        this.tiles[x][y] = tile;
    }

    public getTile(v: Vector2): MapTile {
        const x = v.getX() - (this.coords.getX() * MapChunk.SIZE);
        const y = v.getY() - (this.coords.getY() * MapChunk.SIZE);

        return this.tiles[x][y];
    }

    public getTiles(): MapTile[][] {
        return this.tiles;
    }

    public getCoordinates(): Vector2 {
        return this.coords;
    }

    public toString(): string {
        return `Chunk object (x: ${this.getCoordinates().getY()}, y: ${this.getCoordinates().getY()})`;
    }
}