export default class MarriageFailedError extends Error {
    constructor(additionalMessage: string) {
        super(`Error: Marriage failed. ${additionalMessage}`);
    }
}