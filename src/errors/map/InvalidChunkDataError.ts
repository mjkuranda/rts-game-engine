export default class InvalidChunkDataError extends Error {
    constructor() {
        super("Invalid chunk data input.");
    }
}