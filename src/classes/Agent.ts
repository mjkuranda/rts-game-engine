import Entity from "./entities/Entity";
import Vector2 from "./Vector2";

interface IAgent {
    addEntity(entity: Entity): Agent;
}

class Agent implements IAgent {
    private entitiesIds: string[];
    
    private readonly v: Vector2;
    
    constructor(v: Vector2) {
        this.entitiesIds = [];
        this.v = v;
    }
    
    public addEntity(entity: Entity): Agent {
        this.entitiesIds.push("id");
        
        return this;
    }
    
    public getEntitiesIds(): string[] {
        return this.entitiesIds;
    }
}

export default Agent;