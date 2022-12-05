export type MapTileResourceType = string;

export default class MapTileResource {
    constructor(private readonly type: MapTileResourceType, private readonly amount: number) {}

    public getType(): MapTileResourceType {
        return this.type;
    }

    public getAmount(): number {
        return this.amount;
    }
}