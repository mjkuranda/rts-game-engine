export default class ChunkNotFoundError extends Error {
    constructor(x: number, y: number) {
        const message = `Chunk at "${x}:${y}" position has not been found.`;

        super(message);
    }
}