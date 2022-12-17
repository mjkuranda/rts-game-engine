import Vector2 from "./classes/Vector2";
import MapTile from "./map/MapTile";
import MapChunk from "./map/MapChunk";
import ChunkNotFoundError from "./errors/map/ChunkNotFoundError";
import InvalidChunkDataError from "./errors/map/InvalidChunkDataError";
import InvalidTileDataError from "./errors/map/InvalidTileDataError";
import DatabaseOld, {MapChunkData} from "./databases/old/DatabaseOld";

interface IGameMap {
    getChunk(v: Vector2): MapChunk;
    getChunks(): Map<string, MapChunk>;
    getTile(v: Vector2): MapTile;
    moveTo(v: Vector2): void;
    decode(data: string): MapChunk;
    encode(chunk: MapChunk): string;
    decodeTile(data: string): MapTile;
}

export default class GameMap implements IGameMap {
    // 3x3 chunks
    private chunks: Map<string, MapChunk>;

    // First chunk coords
    private coords: Vector2;

    // Database reference
    private db: DatabaseOld;

    constructor(db: DatabaseOld, coords: Vector2) {
        this.chunks = new Map<string, MapChunk>();
        this.coords = coords;
        this.db = db;
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
     * @param v {Vector2} refers to central chunk
     * */
    public moveTo(v: Vector2): void {
        const oldChunks = Array.from(this.chunks.keys());
        const newChunks = this.generateNewCoords(v);
        const chunkCoords = new Set<string>([...oldChunks, ...newChunks ]);

        for (let el of chunkCoords) {
            // There is no a such chunk, so generate it
            if (!this.chunks.has(el)) {
                try {
                    const chunkData = this.db.getChunk(v);
                    const chunk = this.decode(chunkData.object as MapChunkData);

                    this.chunks.set(el, chunk);
                }
                catch (err) {
                    if (err instanceof ChunkNotFoundError) {
                        console.error(err.message);
                    }
                }

                continue;
            }

            // It's old chunk and unused one
            if (oldChunks.includes(el) && !newChunks.includes(el)) {
                this.chunks.delete(el);

                continue;
            }
        }

        this.coords = this.generateNewCentralCoords(v);
    }

    /**
     * Converts data string to the MapChunk instance.
     *
     * @param data refers to string variable fetched from the database.
     * @return chunk
     * */
    public decode(data: string): MapChunk {
        if (data.length != MapChunk.DATA_STRING_SIZE) {
            throw new InvalidChunkDataError();
        }

        let tiles: MapTile[][] = [];

        for (let y = 0; y < MapChunk.SIZE; y++) {
            tiles[y] = [];

            for (let x = 0; x < MapChunk.SIZE; x++) {
                const el = y * 16 + x;
                const tile = this.decodeTile(data.substring(el, el + 3));

                tiles[y].push(tile);
            }
        }

        const x = data.charCodeAt(MapChunk.DATA_STRING_SIZE - 2);
        const y = data.charCodeAt(MapChunk.DATA_STRING_SIZE - 1);

        return new MapChunk(tiles, new Vector2(x, y));
    }

    /**
     * Converts chunk to the string data.
     *
     * @param chunk refers to the chunk that will be proceeded.
     * @returns data
     * */
    public encode(chunk: MapChunk): string {
        let tilesData: string[] = [];
        let vectorData: string[] = [];

        for (let y = 0; y < MapChunk.SIZE; y++) {
            for (let x = 0; x < MapChunk.SIZE; x++) {
                const tile = chunk.getTile(new Vector2(x, y));
                tilesData.push(tile.encode());
            }
        }

        tilesData.push(
            String.fromCharCode(chunk.getCoordinates().getX()),
            String.fromCharCode(chunk.getCoordinates().getY())
        );

        return String().concat(...tilesData, ...vectorData);
    }

    /**
     * Returns a tile.
     *
     * @param data
     * @returns MapTile
     * */
    public decodeTile(data: string): MapTile {
        if (data.length != 3) {
            throw new InvalidTileDataError();
        }

        const provinceId = data.at(0)!;
        const tileType = data.at(1)!;
        const resourceData = data.at(2)!;

        return new MapTile(tileType, provinceId, resourceData);
    }

    /**
     * Generates new coordinates.
     *
     * @param v new coordinates (center point)
     * */
    private generateNewCoords(v: Vector2): string[] {
        const vx = (v.getX() % MapChunk.SIZE) - 1;
        const vy = (v.getY() % MapChunk.SIZE) - 1;

        const chunksCoords = [];

        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                chunksCoords.push(`${x + vx}:${y + vy}`);
            }
        }

        return chunksCoords;
    }

    /**
     * Generate new central coords for position
     *
     * @param v Clicked position
     * @returns new chunk coordinates (Vector2)
     * */
    private generateNewCentralCoords(v: Vector2): Vector2 {
        const vx = (v.getX() % MapChunk.SIZE) - 1;
        const vy = (v.getY() % MapChunk.SIZE) - 1;

        return new Vector2(vx, vy);
    }

}