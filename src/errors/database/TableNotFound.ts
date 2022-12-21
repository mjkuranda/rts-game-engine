export default class TableNotFoundError extends Error {
    constructor(table: string) {
        const message = `Table "${table}" does not exist.`;

        super(message);
    }
}