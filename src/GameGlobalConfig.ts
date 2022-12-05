/**
 * Map Tile Resources
 * */
let mapTileResources = new Map<string, string>();

export const setMapTileResource = (name: string): void => {
    const key = String.fromCodePoint(mapTileResources.size);

    mapTileResources.set(key, name);
};

export const getMapTileResource = (key: string): string => {
    return mapTileResources.get(key) ?? "Unknown";
};

export const resetMapTileResource = (): void => {
    mapTileResources = new Map<string, string>();
};

/**
 * Map Tile Types
 * */
let mapTileTypes = new Map<string, string>();

export const setMapTileType = (name: string): void => {
    const key = String.fromCodePoint(mapTileTypes.size);

    mapTileTypes.set(key, name);
};

export const getMapTileType = (key: string): string => {
    return mapTileTypes.get(key) ?? "Unknown";
};

export const resetMapTileType = (): void => {
    mapTileTypes = new Map<string, string>();
};