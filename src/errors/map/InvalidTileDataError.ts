export default class InvalidTileDataError extends Error {
    constructor() {
        super("Invalid tile data input.");
    }
}