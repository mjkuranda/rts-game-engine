import Vector2 from "./classes/Vector2";
import MapTile from "./map/MapTile";
import MapChunk from "./map/MapChunk";
import ChunkNotFoundError from "./errors/map/ChunkNotFoundError";

interface IGameMap {
    getChunk(v: Vector2): MapChunk;
    getChunks(): Map<string, MapChunk>;
    getTile(v: Vector2): MapTile;
    moveTo(v: Vector2): void;
}

export default class GameMap implements IGameMap {
    // 3x3 chunks
    private chunks: Map<string, MapChunk>;

    // First chunk coords
    private coords: Vector2;

    constructor(coords: Vector2) {
        this.chunks = new Map<string, MapChunk>();
        this.coords = coords;
    }

    public getChunk(v: Vector2): MapChunk {
        const x = v.getX() - this.coords.getX();
        const y = v.getY() - this.coords.getY();
        const key = `${x}:${y}`;

        if (!this.chunks.has(key)) {
            throw new ChunkNotFoundError(x, y);
        }

        return this.chunks.get(key)!;
    }

    public getChunks(): Map<string, MapChunk> {
        return this.chunks;
    }

    public getTile(v: Vector2): MapTile {
         return this.getChunk(v).getTile(v);
    }

    /**
     * @params v (Vector2) refers to central chunk
     * */
    public moveTo(v: Vector2): void {
        // Old and new chunk coords as strings
        const oldChunks = Array.from(this.chunks.keys());
        const newChunks = [];

        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                newChunks.push(`${this.coords.getX() + x}:${this.coords.getY() + y}`);
            }
        }

        const chunkCoords = new Set<string>([...oldChunks, ...newChunks ]);

        // Iterate the set
        for (let el of chunkCoords) {
            // There is no a such chunk, so generate it
            if (!this.chunks.has(el)) {
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
                ]; // Data
                const [x, y] = el.split(":").map(c => Number(c));

                this.chunks.set(el, new MapChunk(tiles, new Vector2(x, y)));

                continue;
            }

            // It's old chunk and unused one
            if (oldChunks.includes(el) && !newChunks.includes(el)) {
                this.chunks.delete(el);

                continue;
            }
        }

        this.coords = new Vector2(v.getX() - 1, v.getY() - 1);
    }

}