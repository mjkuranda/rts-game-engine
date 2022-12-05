import MapTile from "./MapTile";
import Vector2 from "../classes/Vector2";

export default class MapChunk {
    private static readonly SIZE = 16;

    constructor(private readonly tiles: MapTile[][], private readonly coords: Vector2) {
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
}