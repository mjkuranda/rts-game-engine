let mapTileResource = new Map<string, string>();

export const setMapTileResource = (name: string): void => {
    const key = String.fromCodePoint(mapTileResource.size);

    mapTileResource.set(key, name);
};

export const getMapTileResource = (key: string): string => {
    return mapTileResource.get(key) ?? "Unknown";
};

export const resetMapTileResource = (): void => {
    mapTileResource = new Map<string, string>();
};