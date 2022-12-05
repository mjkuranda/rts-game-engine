import { ProvinceId } from "../classes/Province";
import MapTileResource from "./MapTileResource";
import { getMapTileResource } from "../GameGlobalConfig";

enum MapTileType {
    PLAINS = "Plains",
    FOREST = "Forest",
    HILLS = "Hills",
    MOUNTAIN = "Mountain",
    SEA = "Sea",
    OCEAN = "Ocean"
}

/**
 * @type: define what is a tile type: forest, mountain...
 * @provinceId: returns a province id
 * @data: consists of one character. It is divided into two parts: resource type (1B) and resource amount (1B).
* */
export default class MapTile {
    constructor(
        private readonly type: MapTileType,
        private readonly provinceId: ProvinceId,
        private readonly data: string
    ) {}

    public getType(): MapTileType {
        return this.type;
    }

    public getProvinceId(): ProvinceId {
        return this.provinceId;
    }

    public getResource(): MapTileResource {
        const dataNumber = this.data.charCodeAt(0);
        const resourceNumber = (dataNumber & 0xFF00) >> 0x8;

        const type = getMapTileResource(String.fromCharCode(resourceNumber));
        const amount = dataNumber & 0x00FF;

        return new MapTileResource(type, amount);
    }
}