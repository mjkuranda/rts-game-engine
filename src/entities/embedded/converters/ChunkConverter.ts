import GameObjectConverter from "../../GameObjectConverter";
import MapChunk from "../objects/map/MapChunk";
import InvalidChunkDataError from "../../../errors/map/InvalidChunkDataError";
import MapTile from "../objects/map/MapTile";
import Vector2 from "../objects/Vector2";
import InvalidTileDataError from "../../../errors/map/InvalidTileDataError";

export default class ChunkConverter extends GameObjectConverter<MapChunk, string> {
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
    public generateNewCoords(v: Vector2): string[] {
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
    public generateNewCentralCoords(v: Vector2): Vector2 {
        const vx = (v.getX() % MapChunk.SIZE) - 1;
        const vy = (v.getY() % MapChunk.SIZE) - 1;

        return new Vector2(vx, vy);
    }

}