import Entity from "./entities/Entity";
import Vector2 from "./Vector2";

interface IAgent {
    addEntity(entity: Entity): Agent;
}

/*
    Every instance of this object needs to assign about 66B.
    It consist of:
    coords: 2B
    entitiesIds: (each 2B) and max. 32? them, then 64B.
*/
export default class Agent implements IAgent {
    private entitiesIds: string[];
    
    private readonly v: Vector2;
    
    constructor(v: Vector2, entitiesId?: string[]) {
        this.entitiesIds = entitiesId ?? [];
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