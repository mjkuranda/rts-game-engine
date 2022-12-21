export default class ObjectNotFoundError extends Error {
    constructor(id: string, table: string) {
        const objId = id.charCodeAt(0);
        const objectType = table;

        const message = `Object in table "${objectType}" with id "${objId}" was not found.`;

        super(message);
    }
}