export default class InvalidChunkDataError extends Error {
    constructor() {
        super("Invalid Chunk Data input.");
    }
}