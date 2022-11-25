import { TableType } from "../GameConfig";

function getObjectType(table: TableType): string {
    return  (table === "cities") ? "City" :
            (table === "people") ? "Human" :
            (table === "agents") ? "Agent" : "undefined";
}

export default class DatabaseObjectNotFoundError extends Error {
    constructor(id: string, table: TableType) {
        const objId = id.charCodeAt(0);
        const objectType = getObjectType(table);

        const message = `Object ${objectType} with id ${objId} not found.`;

        super(message);
    }
}