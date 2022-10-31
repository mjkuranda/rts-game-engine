import Agent from "./classes/Agent";

class GameMap {
    private agents: Agent[];
    
    private provinces: number[][];
    
    constructor() {
        this.agents = [];
        this.provinces = [];
    }
}

export default GameMap;