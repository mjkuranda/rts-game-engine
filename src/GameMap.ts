import Vector2 from "./entities/embedded/objects/Vector2";
import MapTile from "./entities/embedded/objects/map/MapTile";
import MapChunk from "./entities/embedded/objects/map/MapChunk";
import ChunkNotFoundError from "./errors/map/ChunkNotFoundError";
import Database from "./databases/Database";
import ChunkConverter from "./entities/embedded/converters/ChunkConverter";

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

    // Database reference
    private db: Database;

    constructor(db: Database, coords: Vector2) {
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
     * @param v refers to central chunk
     * */
    public async moveTo(v: Vector2): Promise<void> {
        const converter = new ChunkConverter();
        const oldChunks = Array.from(this.chunks.keys());
        const newChunks = converter.generateNewCoords(v);
        const chunkCoords = new Set<string>([...oldChunks, ...newChunks ]);

        for (let el of chunkCoords) {
            // There is no a such chunk, so generate it
            if (!this.chunks.has(el)) {
                try {
                    const coordsKey = `${v.getX()}:${v.getY()}`;
                    const chunk = await this.db.get<MapChunk>({ key: coordsKey, table: "chunks", converter: converter });

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

        this.coords = converter.generateNewCentralCoords(v);
    }

}