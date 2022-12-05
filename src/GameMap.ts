import Vector2 from "./classes/Vector2";
import MapTile from "./map/MapTile";
import MapChunk from "./map/MapChunk";

interface IGameMap {
    getChunk(v: Vector2): MapChunk;
    getChunks(): MapChunk[];
    getTile(v: Vector2): MapTile;
    moveTo(v: Vector2): void;
}

export default class GameMap implements IGameMap {
    // 3x3 chunks
    private chunks: MapChunk[];

    // First chunk coords
    private coords: Vector2;

    constructor(coords: Vector2) {
        this.chunks = [];
        this.coords = coords;
    }

    public getChunk(v: Vector2): MapChunk {
        const x = v.getX() - this.coords.getX();
        const y = v.getY() - this.coords.getY();

        return this.chunks[y * 3 + x];
    }

    public getChunks(): MapChunk[] {
        return this.chunks;
    }

    public getTile(v: Vector2): MapTile {
        return this.getChunk(v).getTile(v);
    }

    /**
     * @params v (Vector2) refers to central chunk
     * */
    public moveTo(v: Vector2): void {
        this.chunks = [];

        this.coords = new Vector2(v.getX() - 1, v.getY() - 1);
        // FIXME: Get the data from the database
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                const tiles = [
                    [
                        new MapTile("Unknown", "X", "X"),
                        new MapTile("Unknown", "X", "X"),
                        new MapTile("Unknown", "X", "X"),
                    ],
                    [
                        new MapTile("Unknown", "X", "X"),
                        new MapTile("Unknown", "X", "X"),
                        new MapTile("Unknown", "X", "X"),
                    ],
                    [
                        new MapTile("Unknown", "X", "X"),
                        new MapTile("Unknown", "X", "X"),
                        new MapTile("Unknown", "X", "X"),
                    ]
                ];
                this.chunks.push(new MapChunk(tiles, new Vector2(x, y)));
            }
        }
    }

}