import MapTile from "./MapTile";
import Vector2 from "../classes/Vector2";

export default class MapChunk {
    private tiles: MapTile[][];

    constructor(tiles: MapTile[][], private readonly coords: Vector2) {
        this.tiles = tiles;
    }
}