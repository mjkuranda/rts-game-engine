import Vector2 from "./classes/Vector2";
import MapTile from "./map/MapTile";
import MapChunk from "./map/MapChunk";

interface IGameMap {
    getChunk(v: Vector2): MapChunk;
    getChunks(): MapChunk[];
    getTile(v: Vector2): MapTile;
    moveTo(v: Vector2): void;
}

export default class GameMap {}