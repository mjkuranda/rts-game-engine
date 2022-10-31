import Entity from "./Entity";
import Vector2 from "./Vector2";

interface IAgent {
    addEntity(entity: Entity): Agent;
}

class Agent {
    private entitiesIds: string[];
    
    private readonly vec: Vector2;
    
    constructor(vec: Vector2) {
        this.entitiesIds = [];
        this.vec = vec;
    }
    
    public addEntity(entity: Entity): Agent {
        this.entitiesIds.push("id");
        
        return this;
    }
}

export default Agent;