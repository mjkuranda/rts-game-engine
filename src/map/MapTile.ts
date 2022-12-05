enum MapTileType {
    PLAINS = "Plains",
    FOREST = "Forest",
    HILLS = "Hills",
    MOUNTAIN = "Mountain",
    SEA = "Sea",
    OCEAN = "Ocean"
}

export default class MapTile {
    constructor(private readonly type: MapTileType, private readonly data: string) {}
}