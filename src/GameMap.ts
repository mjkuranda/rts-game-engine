import Vector2 from "./classes/Vector2";
import MapTile from "./map/MapTile";
import MapChunk from "./map/MapChunk";
import ChunkNotFoundError from "./errors/map/ChunkNotFoundError";
import InvalidChunkDataError from "./errors/map/InvalidChunkDataError";
import {getMapTileResource} from "./GameGlobalConfig";

interface IGameMap {
    getChunk(v: Vector2): MapChunk;
    getChunks(): Map<string, MapChunk>;
    getTile(v: Vector2): MapTile;
    moveTo(v: Vector2): void;
    decode(data: string): MapChunk;
    encode(chunk: MapChunk): string;
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
     * @param v {Vector2} refers to central chunk
     * */
    public moveTo(v: Vector2): void {
        const oldChunks = Array.from(this.chunks.keys());
        const newChunks = ["0:0", "0:1", "0:2", "1:0", "1:1", "1:2", "2:0", "2:1", "2:2"];
        const chunkCoords = new Set<string>([...oldChunks, ...newChunks ]);

        for (let el of chunkCoords) {
            // There is no a such chunk, so generate it
            if (!this.chunks.has(el)) {
                // FIXME: data from the database and decoding tiles
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
            for (let x = 0; x < MapChunk.SIZE; x++) {
                const el = y * 16 + x;
                const provinceId = data.at(el)!;
                const tileType = data.at(el + 1)!;
                const resourceData = data.at(el + 2)!;

                tiles[y].push(new MapTile(tileType, provinceId, resourceData));
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

}