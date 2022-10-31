import Human from "./classes/entities/Human";

const h1 = new Human('hum1');
const h2 = new Human('hum2');

export const people: Map<string, Human> = new Map([
    ['1', h1],
    ['2', h2]
]);