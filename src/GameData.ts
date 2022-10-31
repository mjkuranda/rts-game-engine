import Agent from "./classes/Agent";
import City from "./classes/City";
import Human from "./classes/entities/Human";

/* Key: `String.fromCharCode(size) + 32`, value: Human object */
export const people: Map<string, Human> = new Map();

/* Key: `x:y`, value: City array */
export const cities: Map<string, City> = new Map();

/* Key: `x:y`, value: Agent object */
export const agents: Map<string, Agent> = new Map();
    
/* Two-dimensional array */
export const provinces: number[][] = [];