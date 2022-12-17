import GameMap from "../src/GameMap";
import Vector2 from "../src/classes/Vector2";
import { ProvinceId } from "../src/classes/Province";
import { getMapTileResource } from "../src/GameGlobalConfig";
import { MapTileType } from "../src/entities/embedded/objects/map/MapTile";
import MapChunk from "../src/entities/embedded/objects/map/MapChunk";
// import InMemoryDatabase from "../src/databases/InMemoryDatabase";
import ChunkConverter from "../src/entities/embedded/converters/ChunkConverter";

const tables = {
    chunks: new Map<string, string>()
};

// const gameMap = new GameMap(new InMemoryDatabase(tables), new Vector2(1, 1));

const chunkConverter = new ChunkConverter();

describe('GameMap', () => {
    describe('Managing chunks', () => {
        it('Should return decoded chunk', () => {
            // Given
            const expectedCoords = new Vector2(88, 88);
            const encodedChunk = generateEncodedChunk("XXX", 88, 88);

            // When
            const chunk = chunkConverter.decode(encodedChunk);

            // Then
            expect(chunk.getCoordinates().getX()).toBe(expectedCoords.getX());
            expect(chunk.getCoordinates().getY()).toBe(expectedCoords.getY());
        });
    });

    describe('Managing tiles', () => {
        it('Should decode a tile', () => {
            // Given
            const encodedTile = "XXX";

            const expectedProvinceId: ProvinceId = "X";
            const expectedTileType: MapTileType = "X";
            const expectedResourceType = getMapTileResource(String.fromCharCode(("X".charCodeAt(0) & 0xFF00) >> 8));
            const expectedResourceAmount: number = "X".charCodeAt(0) & 0x00FF;

            // When
            const tile = chunkConverter.decodeTile(encodedTile);

            // Then
            expect(tile.getProvinceId()).toBe(expectedProvinceId);
            expect(tile.getType()).toBe(expectedTileType);
            expect("Unknown").toBe(expectedResourceType.name);
            expect(tile.getResource().getAmount()).toBe(expectedResourceAmount);
        });
    });
});

const generateEncodedChunk = (tileData?: string | undefined, x?: number | undefined, y?: number | undefined): string => {
    const tilesData: string[] = [];
    const data = (tileData) ? ( (tileData.length != 3) ? "XXX" : tileData ) : "XXX";

    for (let y = 0; y < MapChunk.SIZE; y++) {
        for (let x = 0; x < MapChunk.SIZE; x++) {
            tilesData.push(data);
        }
    }

    // X -> 88 as char code
    tilesData.push(x ? String.fromCharCode(x) : "X");
    tilesData.push(y ? String.fromCharCode(y) : "X");

    return String().concat(...tilesData);
};