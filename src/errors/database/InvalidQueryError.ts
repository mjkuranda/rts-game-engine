export default class InvalidQueryError extends Error {
    constructor(params: string[]) {
        super(`Invalid query. Following params are missing: ${params.join(", ")}`);
    }
}