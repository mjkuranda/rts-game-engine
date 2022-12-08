/**
 * Map Tile Resources
 * */
interface IMapTileResource {
    name: string;
    key: string;
}

let mapTileResources = new Map<string, IMapTileResource>();

export const setMapTileResource = (name: string): void => {
    const key = String.fromCodePoint(mapTileResources.size);

    mapTileResources.set(key, { name, key });
};

export const getMapTileResource = (key: string): IMapTileResource => {
    return mapTileResources.get(key) ?? { name: "Unknown", key: String.fromCharCode(65535) };
};

export const resetMapTileResource = (): void => {
    mapTileResources = new Map<string, IMapTileResource>();
};

/**
 * Map Tile Types
 * */
interface IMapTileType {
    name: string;
    key: string;
}

let mapTileTypes = new Map<string, IMapTileType>();

export const setMapTileType = (name: string): void => {
    const key = String.fromCodePoint(mapTileTypes.size);

    mapTileTypes.set(key, { name, key });
};

export const getMapTileType = (key: string): IMapTileType => {
    return mapTileTypes.get(key) ?? { name: "Unknown", key: String.fromCharCode(65535) };
};

export const resetMapTileType = (): void => {
    mapTileTypes = new Map<string, IMapTileType>();
};